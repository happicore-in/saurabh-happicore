import React from 'react';
import { ArrowUpRight, Maximize2, ExternalLink, Layers } from 'lucide-react';
import { GraphicProjectItem } from '../../types';

interface GraphicProjectCardProps {
  project: GraphicProjectItem;
  onOpenLightbox: () => void;
  onShowNotice?: (message: string) => void;
}

export const GraphicProjectCard: React.FC<GraphicProjectCardProps> = ({
  project,
  onOpenLightbox,
  onShowNotice,
}) => {
  const isSplit = project.aspectRatio === 'split';
  const isSquare = project.aspectRatio === '1:1';
  const is16by9 = project.aspectRatio === '16:9';

  const handleWherePosted = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.externalPostLink) {
      window.open(project.externalPostLink, '_blank', 'noopener,noreferrer');
    } else {
      onShowNotice?.('Social/archive publication link coming soon.');
    }
  };

  if (isSplit) {
    // Wide horizontal split presentation (e.g. Happicore Abstract Posters)
    return (
      <div
        id={`graphic-card-${project.id}`}
        onClick={onOpenLightbox}
        className="group relative col-span-1 md:col-span-2 lg:col-span-3 bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/50 rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer shadow-xl my-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left: Artwork Canvas */}
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#050505] border-b lg:border-b-0 lg:border-r border-[#17191D]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#8FB8E8]">
                {project.badgeLabel || 'SWISS BRUTALISM'}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F5A623] text-[#000000] font-bold">
                LAB R&amp;D
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[#A7ADB7] pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A]">
                {project.specLabel || 'SERIES: 08 VECTOR STUDIES'}
              </span>
              <span className="p-1.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#F2F4F7]">
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Right: Editorial Meta */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#080808]">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-[#8FB8E8]">{project.category}</span>
                <span className="text-[#6F7682]">{project.editionLabel || 'HAPPICORE LAB'}</span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] leading-tight">
                {project.title}
              </h3>

              <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] leading-relaxed">
                {project.description}
              </p>

              {project.technologies && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[#0D0D0D] border border-[#22252A] rounded font-mono text-[9px] text-[#A7ADB7] uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#17191D] grid grid-cols-2 gap-2 font-mono text-[11px] uppercase tracking-wider">
              <button
                type="button"
                onClick={onOpenLightbox}
                className="py-2.5 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-bold rounded text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{project.viewActionLabel || 'VIEW EXPERIMENTS'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={handleWherePosted}
                className="py-2.5 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] rounded text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>WHERE POSTED</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#6F7682]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Presentation (16:9, 1:1, or 4:3)
  return (
    <div
      id={`graphic-card-${project.id}`}
      onClick={onOpenLightbox}
      className="group relative flex flex-col justify-between bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/50 rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer h-full shadow-lg"
    >
      {/* ========================================================
          ARTWORK CANVAS (RESPECTS ORIGINAL RATIO)
          ======================================================== */}
      <div
        className={`
          relative w-full overflow-hidden bg-[#050505] border-b border-[#17191D]
          ${isSquare ? 'aspect-square' : is16by9 ? 'aspect-[16/10]' : 'aspect-[4/3]'}
        `}
      >
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-[#000000]/30 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#8FB8E8]">
            {project.badgeLabel || 'GRAPHIC'}
          </span>
          {project.editionLabel && (
            <span className="px-2 py-0.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#6F7682] hidden sm:inline-block">
              {project.editionLabel}
            </span>
          )}
        </div>

        {/* Bottom Specs & Enlarge Trigger */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[#A7ADB7] pointer-events-none">
          {project.specLabel && (
            <span className="px-2 py-0.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A]">
              {project.specLabel}
            </span>
          )}
          <span className="p-1.5 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#F2F4F7] group-hover:bg-[#8FB8E8] group-hover:text-[#000000] transition-colors ml-auto">
            <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* ========================================================
          CARD METADATA
          ======================================================== */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2.5">
          {/* Category Stamp */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="text-[#8FB8E8]">{project.category}</span>
            {project.images && project.images.length > 1 && (
              <span className="text-[#6F7682] flex items-center gap-1">
                <Layers className="w-2.5 h-2.5 text-[#F5A623]" />
                {project.images.length} SET
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="font-heading font-bold text-xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] transition-colors leading-tight">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tools */}
          {project.technologies && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-[#0D0D0D] border border-[#22252A] rounded font-mono text-[9px] text-[#A7ADB7] uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#17191D] grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-wider">
          <button
            type="button"
            onClick={onOpenLightbox}
            className="py-2 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-bold rounded text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>{project.viewActionLabel || 'VIEW'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={handleWherePosted}
            className="py-2 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] rounded text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>{project.platformName || 'POSTED'}</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#6F7682]" />
          </button>
        </div>
      </div>
    </div>
  );
};
