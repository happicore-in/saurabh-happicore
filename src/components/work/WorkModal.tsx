import React, { useEffect } from 'react';
import { X, Play, ExternalLink, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WorkProject } from '../../types';

interface WorkModalProps {
  project: WorkProject | null;
  onClose: () => void;
  onContactClick?: () => void;
}

export const WorkModal: React.FC<WorkModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
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
            <span className="text-[#8FB8E8]">{project.index} //</span>
            <span className="text-[#F2F4F7]">{project.subcategory}</span>
            {project.badgeLabel && (
              <span className="px-2 py-0.5 rounded bg-[#17191D] text-[#A7ADB7] text-[9px]">
                {project.badgeLabel}
              </span>
            )}
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
          {/* Media Presentation */}
          <div className="relative w-full aspect-[16/9] rounded-[6px] overflow-hidden bg-[#000000] border border-[#22252A]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {project.category === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/30 backdrop-blur-[1px]">
                <div className="w-14 h-14 rounded-full bg-[#000000]/80 border border-[#8FB8E8]/60 flex items-center justify-center text-[#F2F4F7] shadow-xl">
                  <Play className="w-6 h-6 fill-current ml-1 text-[#F5A623]" />
                </div>
              </div>
            )}
            {project.duration && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#000000]/85 backdrop-blur-md rounded font-mono text-[10px] text-[#F2F4F7] border border-[#22252A]">
                {project.duration}
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h2
              id="modal-project-title"
              className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide"
            >
              {project.title}
            </h2>
            <p className="font-body text-base text-[#A7ADB7] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics if present */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 bg-[#0D0D0D] border border-[#17191D] rounded-[4px] space-y-1 text-center"
                >
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
                    {m.label}
                  </span>
                  <span className="block font-heading font-bold text-lg text-[#F2F4F7]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Technology & Tooling */}
          <div className="space-y-2 pt-2 border-t border-[#17191D]">
            <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-wider block">
              STACK & PRODUCTION SUITE
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#0D0D0D] border border-[#22252A] rounded-[4px] font-mono text-[11px] text-[#8FB8E8] uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-[#17191D] bg-[#0D0D0D]">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#17191D] hover:bg-[#22252A] border border-[#22252A] text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded-[4px] transition-colors"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#17191D] hover:bg-[#22252A] border border-[#22252A] text-[#F2F4F7] font-mono text-[11px] uppercase tracking-wider rounded-[4px] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onContactClick?.();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-wider rounded-[4px] transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <span>INQUIRE ABOUT THIS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#000000]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
