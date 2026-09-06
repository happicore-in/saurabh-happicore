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

// Retrieve active configuration (prioritizing site settings if saved, otherwise default)
export function getActiveCloudinaryConfig(): CloudinaryConfig {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('saurabh_admin_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.cloudinary?.cloudName && parsed?.cloudinary?.uploadPreset) {
          return {
            cloudName: parsed.cloudinary.cloudName,
            uploadPreset: parsed.cloudinary.uploadPreset,
            folder: 'portfolio_upload',
          };
        }
      }
    } catch {
      // ignore
    }
  }
  return DEFAULT_CLOUDINARY_CONFIG;
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

