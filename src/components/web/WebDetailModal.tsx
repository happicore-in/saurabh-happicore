import React, { useEffect } from 'react';
import { X, ExternalLink, Github, ArrowRight, Lock, RotateCw, Activity } from 'lucide-react';
import { WebProjectItem } from '../../types';

interface WebDetailModalProps {
  project: WebProjectItem | null;
  onClose: () => void;
  onInquire?: () => void;
}

export const WebDetailModal: React.FC<WebDetailModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="web-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-[#080808] border border-[#22252A] rounded-[8px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#17191D] bg-[#0D0D0D]">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] min-w-0">
            <span className="text-[#8FB8E8] shrink-0">{project.index} //</span>
            <span className="text-[#F2F4F7] truncate">{project.categoryLabel}</span>
            {project.badgeLabel && (
              <span className="px-2 py-0.5 rounded bg-[#17191D] text-[#A7ADB7] text-[9px] shrink-0">
                {project.badgeLabel}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[4px] text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#17191D] transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Media Presentation: Browser Frame */}
          <div className="rounded-[6px] overflow-hidden border border-[#22252A] bg-[#000000]">
            <div className="h-7 bg-[#111111] border-b border-[#17191D] px-2.5 sm:px-3 flex items-center justify-between font-mono text-[10px] text-[#6F7682]">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#E5484D]/70" />
                <span className="w-2 h-2 rounded-full bg-[#F5A623]/70" />
                <span className="w-2 h-2 rounded-full bg-[#46A758]/70" />
              </div>
              <div className="flex items-center gap-1 text-[#8FB8E8] min-w-0 px-2">
                <Lock className="w-2.5 h-2.5 text-[#46A758] shrink-0" />
                <span className="truncate max-w-[130px] sm:max-w-xs">{project.browserUrl || 'https://happicore.in'}</span>
              </div>
              <div className="w-6 shrink-0" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2 sm:space-y-3">
            <h2
              id="web-modal-title"
              className="font-heading font-bold text-xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide"
            >
              {project.title}
            </h2>
            <p className="font-body text-sm sm:text-base text-[#A7ADB7] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2 pt-2 border-t border-[#17191D]">
            <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-wider block">
              PRODUCTION TECH STACK
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#0D0D0D] border border-[#22252A] rounded-[4px] font-mono text-[10px] sm:text-[11px] text-[#8FB8E8] uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#17191D] bg-[#0D0D0D]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-[#17191D] hover:bg-[#22252A] border border-[#22252A] text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded-[4px] transition-colors text-center"
              >
                <span>LIVE PREVIEW</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8FB8E8]" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-[#17191D] hover:bg-[#22252A] border border-[#22252A] text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded-[4px] transition-colors text-center"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire?.();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-wider rounded-[4px] transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <span>INQUIRE ABOUT THIS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#000000] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
