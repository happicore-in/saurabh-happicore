// Cloudinary Media Service for Admin Asset Management

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
}

// Default configuration for portfolio uploads
export const DEFAULT_CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: 'pegfrsqo',
  uploadPreset: 'portfolio_upload',
  folder: 'portfolio_upload',
};

// In-memory runtime-only configuration (disappears when page/tab is closed)
let memoryCloudinaryConfig: CloudinaryConfig | null = null;

export function setMemoryCloudinaryConfig(config: CloudinaryConfig | null | undefined): void {
  if (config && config.cloudName && config.uploadPreset) {
    memoryCloudinaryConfig = {
      cloudName: config.cloudName,
      uploadPreset: config.uploadPreset,
      folder: config.folder || 'portfolio_upload',
    };
  } else {
    memoryCloudinaryConfig = null;
  }
}

// Retrieve active configuration (prioritizing in-memory runtime settings if set, otherwise default)
export function getActiveCloudinaryConfig(): CloudinaryConfig {
  if (memoryCloudinaryConfig?.cloudName && memoryCloudinaryConfig?.uploadPreset) {
    return memoryCloudinaryConfig;
  }
  return DEFAULT_CLOUDINARY_CONFIG;
}

/**
 * Extracts the Cloudinary asset public ID from a full Cloudinary URL.
 * Handles folders, versions (e.g. /v1788625281/), and file extensions.
 * Returns null if the URL is not a valid Cloudinary asset URL.
 */
export function extractCloudinaryPublicId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  if (!url.includes('cloudinary.com') && !url.includes('res.cloudinary.com')) {
    return null;
  }

  try {
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return null;

    // Everything after '/upload/'
    let path = url.substring(uploadIndex + '/upload/'.length);

    // If there are transformation parameters before the version or folder, skip them
    // Cloudinary standard format: /upload/[transformations/]v[version]/[folder/]public_id.ext
    // or /upload/[folder/]public_id.ext
    const segments = path.split('/');

    // Look for version segment (starts with 'v' followed by digits)
    const versionIndex = segments.findIndex((seg) => /^v\d+$/.test(seg));
    if (versionIndex !== -1) {
      path = segments.slice(versionIndex + 1).join('/');
    } else {
      // If first segment looks like transformations (e.g., w_500, c_fill or q_auto), strip until non-transformation
      const nonTransformIndex = segments.findIndex(
        (seg) => !seg.includes(',') && !seg.includes('_') && !seg.startsWith('v')
      );
      if (nonTransformIndex > 0) {
        path = segments.slice(nonTransformIndex).join('/');
      }
    }

    // Strip file extension at the end (.jpg, .png, .webp, .mp4, etc.)
    const dotIndex = path.lastIndexOf('.');
    if (dotIndex > 0) {
      path = path.substring(0, dotIndex);
    }

    return path.trim() || null;
  } catch (err) {
    console.warn('Failed to parse Cloudinary publicId from URL:', url, err);
    return null;
  }
}

/**
 * Attempts deletion of a Cloudinary asset by URL or public ID.
 * Wrapped safely so network or credential restrictions never crash or block Firestore operations.
 */
export async function deleteCloudinaryAsset(
  identifierOrUrl: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<{ success: boolean; message?: string }> {
  if (!identifierOrUrl) {
    return { success: false, message: 'No identifier or URL provided' };
  }

  const publicId = identifierOrUrl.includes('cloudinary.com')
    ? extractCloudinaryPublicId(identifierOrUrl)
    : identifierOrUrl;

  if (!publicId) {
    return { success: false, message: 'Not a recognized Cloudinary asset' };
  }

  const config = getActiveCloudinaryConfig();
  if (!config.cloudName) {
    return { success: false, message: 'Cloudinary cloudName missing' };
  }

  try {
    const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/destroy`;
    const formData = new FormData();
    formData.append('public_id', publicId);
    if (config.uploadPreset) {
      formData.append('upload_preset', config.uploadPreset);
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      return { success: true, message: 'Cloudinary asset deleted successfully' };
    } else {
      const errorText = await res.text().catch(() => '');
      console.info(
        `[Cloudinary Cleanup] API response status ${res.status}: ${errorText}. Continuing database lifecycle.`
      );
      return { success: false, message: `Status ${res.status}` };
    }
  } catch (err: any) {
    console.warn('[Cloudinary Cleanup] Notice during asset cleanup (continuing Firestore lifecycle):', err);
    return { success: false, message: err?.message || String(err) };
  }
}

export async function uploadToCloudinary(
  file: File,
  config?: CloudinaryConfig,
  onProgress?: (percent: number) => void
): Promise<{ url: string; publicId?: string; resourceType?: 'image' | 'video' | string }> {
  const activeConfig: CloudinaryConfig = {
    ...DEFAULT_CLOUDINARY_CONFIG,
    ...(config || getActiveCloudinaryConfig()),
  };

  // Unsigned upload to Cloudinary REST API
  if (activeConfig.cloudName && activeConfig.uploadPreset) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', activeConfig.uploadPreset);
      formData.append('folder', activeConfig.folder || 'portfolio_upload');

      // Direct endpoint based on file MIME type (images and videos supported)
      const isVideo = file.type.startsWith('video/');
      const endpoint = `https://api.cloudinary.com/v1_1/${activeConfig.cloudName}/${isVideo ? 'video' : 'image'}/upload`;

      // Use XMLHttpRequest when onProgress is requested, otherwise standard fetch
      if (onProgress) {
        return await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', endpoint);

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100);
              onProgress(percent);
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                resolve({
                  url: data.secure_url || data.url,
                  publicId: data.public_id,
                  resourceType: data.resource_type,
                });
              } catch (e) {
                reject(e);
              }
            } else {
              console.warn('Cloudinary upload status:', xhr.status, xhr.responseText);
              reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error('Cloudinary upload network error'));
          xhr.send(formData);
        });
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          url: data.secure_url || data.url,
          publicId: data.public_id,
          resourceType: data.resource_type,
        };
      } else {
        const errorText = await response.text();
        console.warn('Cloudinary direct upload response:', errorText);
        throw new Error(`Cloudinary upload error: ${response.status}`);
      }
    } catch (err) {
      console.warn('Cloudinary upload network error, falling back to local file URL:', err);
    }
  }

  // Fallback: Read as data URL for instant zero-config preview & storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result as string });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

