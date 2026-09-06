import React, { useEffect } from 'react';
import { X, Play, ArrowRight, ArrowUpRight, ExternalLink, Clock } from 'lucide-react';
import { VideoProjectItem } from '../../types';

interface VideoDetailModalProps {
  project: VideoProjectItem | null;
  onClose: () => void;
  onInquire?: () => void;
  onShowNotice?: (message: string) => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  project,
  onClose,
  onInquire,
  onShowNotice,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVertical = project.aspectRatio === '9:16';

  const handleViewVideo = () => {
    if (project.videoLink) {
      window.open(project.videoLink, '_blank', 'noopener,noreferrer');
    } else {
      onShowNotice?.('Google Drive video link coming soon for this cut.');
    }
  };

  const handleWherePosted = () => {
    if (project.socialMediaLink) {
      window.open(project.socialMediaLink, '_blank', 'noopener,noreferrer');
    } else {
      onShowNotice?.('Social media publication link coming soon.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#000000]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#080808] border border-[#22252A] rounded-[8px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#17191D] bg-[#0D0D0D]">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span className="text-[#F5A623]">VIDEO //</span>
            <span className="text-[#F2F4F7]">{project.categoryLabel || project.category}</span>
            <span className="px-2 py-0.5 rounded bg-[#17191D] text-[#8FB8E8] text-[9px] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {project.duration}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[4px] text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#17191D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Media Presentation: Cinematic Thumbnail Frame */}
          <div
            className={`
              relative w-full overflow-hidden rounded-[6px] border border-[#22252A] bg-[#000000]
              ${isVertical ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[16/9]'}
            `}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.04]"
            />

            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent pointer-events-none" />

            {/* Play Button Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={handleViewVideo}
                className="w-16 h-16 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#F2F4F7]/30 hover:border-[#F5A623] hover:bg-[#F5A623] text-[#F2F4F7] hover:text-[#000000] flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer"
                title="View Video Cut"
              >
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h2
              id="video-modal-title"
              className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide"
            >
              {project.title}
            </h2>

            <p className="font-body text-base text-[#A7ADB7] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Post-Production Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#17191D]">
              <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-wider block">
                EDITING WORKFLOW &amp; SOFTWARE
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-[#0D0D0D] border border-[#22252A] rounded-[4px] font-mono text-[11px] text-[#8FB8E8] uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-[#17191D] bg-[#0D0D0D]">
          <div className="flex items-center gap-3">
            {project.videoLink ? (
              <button
                type="button"
                onClick={handleViewVideo}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F5A623] hover:bg-[#E5991C] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
              >
                <span>VIEW VIDEO</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleViewVideo}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#17191D] hover:bg-[#22252A] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
              >
                <span>VIDEO LINK COMING SOON</span>
              </button>
            )}

            {project.socialMediaLink ? (
              <button
                type="button"
                onClick={handleWherePosted}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#17191D] hover:bg-[#22252A] border border-[#22252A] text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
              >
                <span>WHERE POSTED [{project.socialPlatformName || 'POSTED'}]</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8FB8E8]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleWherePosted}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#111111] border border-[#17191D] text-[#6F7682] font-mono text-[10px] uppercase tracking-wider rounded-[4px] cursor-pointer"
              >
                <span>WHERE POSTED [{project.socialPlatformName || 'POSTED'}]</span>
                <ExternalLink className="w-3 h-3 text-[#6F7682]" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire?.();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-wider rounded-[4px] transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <span>INQUIRE ABOUT THIS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#000000]" />
          </button>
        </div>
      </div>
    </div>
  );
};
