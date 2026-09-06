import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, Image as ImageIcon, Video as VideoIcon, Link2, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadToCloudinary } from '../../services/cloudinaryService';

interface CloudinaryImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  required?: boolean;
  aspectRatioGuide?: string;
  className?: string;
  acceptTypes?: string;
}

export const CloudinaryImageUploader: React.FC<CloudinaryImageUploaderProps> = ({
  label,
  value,
  onChange,
  required = false,
  aspectRatioGuide,
  className = '',
  acceptTypes = 'image/png, image/jpeg, image/webp, image/gif, image/svg+xml, video/mp4, video/webm, video/quicktime',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideoUrl = (url?: string): boolean => {
    if (!url) return false;
    return (
      url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i) !== null ||
      url.includes('/video/upload/')
    );
  };

  const isVideo = isVideoUrl(value);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      const result = await uploadToCloudinary(file, undefined, (percent) => {
        setUploadProgress(percent);
      });
      onChange(result.url);
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      setUploadError('Upload failed. Check preset or paste a direct media URL.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setUploadError(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase">
          {label} {required && <span className="text-[#FF4D4D]">*</span>}
        </label>
        {aspectRatioGuide && (
          <span className="font-mono text-[10px] text-[#6F7682] uppercase">
            {aspectRatioGuide}
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptTypes}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Current Preview or Empty State */}
      {value ? (
        <div className="relative group bg-[#0D0E11] border border-[#22252A] rounded-lg overflow-hidden p-3">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative w-28 h-20 sm:w-36 sm:h-24 bg-[#080808] rounded border border-[#22252A] overflow-hidden flex-shrink-0 flex items-center justify-center">
              {isVideo ? (
                <video
                  src={value}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={value}
                  alt="Media Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-1 right-1 bg-[#000000]/80 rounded px-1.5 py-0.5 font-mono text-[9px] text-[#22C55E] flex items-center gap-1 border border-[#22C55E]/30">
                <CheckCircle2 className="w-2.5 h-2.5" /> CLOUDINARY
              </div>
              {isVideo && (
                <div className="absolute bottom-1 left-1 bg-[#000000]/80 rounded px-1.5 py-0.5 font-mono text-[8px] text-[#8FB8E8] flex items-center gap-0.5 border border-[#8FB8E8]/30">
                  <VideoIcon className="w-2.5 h-2.5" /> VIDEO
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#22C55E] uppercase bg-[#22C55E]/10 border border-[#22C55E]/30 px-2 py-0.5 rounded">
                  {isVideo ? 'Video Asset' : 'Image Asset'}
                </span>
                <span className="font-mono text-[10px] text-[#6F7682] truncate">
                  preset: portfolio_upload
                </span>
              </div>
              <p className="font-mono text-xs text-[#A7ADB7] truncate max-w-full">
                {value}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-2.5 py-1 bg-[#1A1D23] hover:bg-[#22252A] text-[#F2F4F7] text-xs font-mono rounded flex items-center gap-1.5 transition-colors border border-[#22252A] cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isUploading ? 'animate-spin text-[#F5A623]' : ''}`} />
                  {isUploading ? `UPLOADING ${uploadProgress !== null ? `${uploadProgress}%` : ''}...` : 'REPLACE'}
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-2.5 py-1 bg-[#2D1515] hover:bg-[#3D1A1A] text-[#FF6B6B] text-xs font-mono rounded flex items-center gap-1 transition-colors border border-[#501A1A] cursor-pointer"
                >
                  <X className="w-3 h-3" /> REMOVE
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#22252A] hover:border-[#8FB8E8]/50 bg-[#0A0C0F] rounded-lg p-5 transition-colors text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#14171D] border border-[#22252A] flex items-center justify-center mx-auto text-[#8FB8E8]">
            {isUploading ? (
              <RefreshCw className="w-5 h-5 animate-spin text-[#F5A623]" />
            ) : (
              <ImageIcon className="w-5 h-5" />
            )}
          </div>

          <div>
            <p className="font-sans text-sm font-medium text-[#F2F4F7]">
              {isUploading
                ? `Uploading to Cloudinary ${uploadProgress !== null ? `(${uploadProgress}%)` : ''}...`
                : 'Upload or Select Media'}
            </p>
            <p className="font-mono text-[11px] text-[#6F7682] mt-0.5">
              JPG, PNG, WEBP, SVG or MP4 / WEBM Video • Cloudinary pegfrsqo / portfolio_upload
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3.5 py-1.5 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              {isUploading ? `UPLOADING ${uploadProgress !== null ? `${uploadProgress}%` : ''}...` : 'UPLOAD MEDIA'}
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-1.5 bg-[#14171D] hover:bg-[#1C2028] text-[#A7ADB7] hover:text-[#F2F4F7] text-xs font-mono rounded flex items-center gap-1.5 border border-[#22252A] transition-colors cursor-pointer"
            >
              <Link2 className="w-3.5 h-3.5" />
              PASTE URL
            </button>
          </div>

          {showUrlInput && (
            <form onSubmit={handleManualUrlSubmit} className="pt-2 flex gap-2 max-w-md mx-auto">
              <input
                type="url"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/pegfrsqo/..."
                className="flex-1 bg-[#050505] border border-[#22252A] text-xs text-[#F2F4F7] px-3 py-1.5 rounded font-mono focus:border-[#8FB8E8] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#F5A623] text-[#000000] text-xs font-mono font-bold rounded cursor-pointer"
              >
                APPLY
              </button>
            </form>
          )}

          {uploadError && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#FF4D4D] pt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {uploadError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

