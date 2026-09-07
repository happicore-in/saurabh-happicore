import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { GraphicProjectItem } from '../../types';

interface GraphicLightboxProps {
  project: GraphicProjectItem | null;
  onClose: () => void;
  onInquire?: () => void;
  onShowNotice?: (message: string) => void;
}

export const GraphicLightbox: React.FC<GraphicLightboxProps> = ({
  project,
  onClose,
  onInquire,
  onShowNotice,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Reset index when project changes
  useEffect(() => {
    setCurrentImageIdx(0);
  }, [project]);

  // Keyboard navigation support
  useEffect(() => {
    if (!project) return;
    const imagesList = project.images && project.images.length > 0
      ? project.images
      : [{ url: project.image, label: 'IMAGE 01 // PRIMARY ARTWORK' }];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentImageIdx((prev) => (prev + 1) % imagesList.length);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentImageIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const imagesList =
    project.images && project.images.length > 0
      ? project.images
      : [{ url: project.image, label: 'IMAGE 01 // PRIMARY ARTWORK', caption: project.description }];

  const activeImage = imagesList[currentImageIdx] || imagesList[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % imagesList.length);
  };

  const handleWherePosted = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.externalPostLink) {
      window.open(project.externalPostLink, '_blank', 'noopener,noreferrer');
    } else {
      onShowNotice?.('External publication archive link coming soon.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="graphic-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#000000]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[94vh] sm:max-h-[92vh] bg-[#080808] border border-[#22252A] rounded-[8px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* ========================================================
            MODAL TOP BAR
            ======================================================== */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-[#17191D] bg-[#0D0D0D]">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] min-w-0">
            <span className="text-[#8FB8E8] shrink-0">GRAPHIC //</span>
            <span className="text-[#F2F4F7] truncate max-w-[130px] xs:max-w-[200px] sm:max-w-md">
              {project.title}
            </span>
            {imagesList.length > 1 && (
              <span className="px-2 py-0.5 rounded bg-[#17191D] text-[#A7ADB7] text-[9px] sm:text-[10px] shrink-0">
                {String(currentImageIdx + 1).padStart(2, '0')} / {String(imagesList.length).padStart(2, '0')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="p-1.5 rounded text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#17191D] transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            MODAL MAIN ARTWORK STAGE
            ======================================================== */}
        <div className="relative flex-1 min-h-[220px] xs:min-h-[300px] sm:min-h-[460px] max-h-[58vh] sm:max-h-[62vh] overflow-hidden bg-[#030303] flex items-center justify-center p-3 sm:p-4">
          <img
            src={activeImage.url}
            alt={activeImage.label || project.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain rounded-[4px] shadow-2xl filter contrast-[1.03]"
          />

          {/* Left / Right Carousel Controls if multi-image */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous artwork"
                className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#000000]/80 border border-[#22252A] hover:border-[#8FB8E8] hover:bg-[#8FB8E8] hover:text-[#000000] text-[#F2F4F7] flex items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next artwork"
                className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#000000]/80 border border-[#22252A] hover:border-[#8FB8E8] hover:bg-[#8FB8E8] hover:text-[#000000] text-[#F2F4F7] flex items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </>
          )}

          {/* Active Image Label Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] font-mono text-[9px] sm:text-[10px] text-[#F2F4F7] uppercase tracking-wider">
              {activeImage.label}
            </span>
          </div>
        </div>

        {/* ========================================================
            THUMBNAIL SELECTOR STRIP (FOR MULTI-IMAGE PROJECTS)
            ======================================================== */}
        {imagesList.length > 1 && (
          <div className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#090909] border-t border-[#17191D] overflow-x-auto">
            <div className="font-mono text-[9px] text-[#6F7682] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#F5A623]" />
              SERIES:
            </div>
            {imagesList.map((img, idx) => (
              <button
                key={img.label + idx}
                type="button"
                onClick={() => setCurrentImageIdx(idx)}
                className={`
                  px-2.5 sm:px-3 py-1 rounded font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-all cursor-pointer shrink-0
                  ${
                    idx === currentImageIdx
                      ? 'bg-[#8FB8E8] text-[#000000] font-bold shadow'
                      : 'bg-[#111111] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7]'
                  }
                `}
              >
                IMAGE 0{idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* ========================================================
            MODAL FOOTER WITH DETAILS & ACTIONS
            ======================================================== */}
        <div className="p-4 sm:p-6 border-t border-[#17191D] bg-[#0A0A0A] space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
              <h2
                id="graphic-lightbox-title"
                className="font-heading font-bold text-lg sm:text-2xl text-[#F2F4F7] uppercase tracking-wide"
              >
                {project.title}
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#A7ADB7] leading-relaxed">
                {activeImage.caption || project.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleWherePosted}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#111111] hover:bg-[#17191D] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
              >
                <span className="truncate">WHERE POSTED [{project.platformName || 'ARCHIVE'}]</span>
                <ExternalLink className="w-3 h-3 text-[#6F7682] shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire?.();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-wider rounded transition-transform hover:scale-[1.02] cursor-pointer text-center"
              >
                <span>INQUIRE ABOUT DESIGN</span>
                <ArrowRight className="w-3 h-3 text-[#000000] shrink-0" />
              </button>
            </div>
          </div>

          {/* Software Tools */}
          {project.technologies && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#141414]">
              <span className="font-mono text-[9px] text-[#6F7682] uppercase tracking-wider mr-1 self-center">
                TOOLS:
              </span>
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-[#080808] border border-[#22252A] rounded font-mono text-[9px] text-[#8FB8E8] uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
