import React from 'react';
import { ArrowUpRight, Maximize2, ExternalLink, Sparkles } from 'lucide-react';
import { GraphicProjectItem } from '../../types';

interface FeaturedGraphicWorkProps {
  project: GraphicProjectItem;
  onOpenLightbox: () => void;
  onShowNotice?: (message: string) => void;
}

export const FeaturedGraphicWork: React.FC<FeaturedGraphicWorkProps> = ({
  project,
  onOpenLightbox,
  onShowNotice,
}) => {
  const handleWherePosted = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.externalPostLink) {
      window.open(project.externalPostLink, '_blank', 'noopener,noreferrer');
    } else {
      onShowNotice?.('External publication archive link coming soon.');
    }
  };

  return (
    <div className="w-full my-12">
      <div
        id={`featured-graphic-${project.id}`}
        onClick={onOpenLightbox}
        className="group relative bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/50 rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* ========================================================
              LEFT COLUMN: LARGE 3:4 PORTRAIT ARTWORK CANVAS
              ======================================================== */}
          <div className="lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto min-h-[500px] sm:min-h-[580px] overflow-hidden bg-[#050505] border-b lg:border-b-0 lg:border-r border-[#17191D] flex items-center justify-center">
            {/* Artwork Image */}
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-[#000000]/30 pointer-events-none" />

            {/* Top Bar: Print Spec & Flagship Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] text-[#F2F4F7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
                {project.badgeLabel || '3:4 PRINT POSTER'}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#F5A623]/50 text-[#F5A623] font-bold">
                <Sparkles className="w-3 h-3 text-[#F5A623]" />
                FLAGSHIP
              </span>
            </div>

            {/* Bottom Floating Technical Specification */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#A7ADB7] uppercase tracking-wider pointer-events-none">
              <span className="px-2.5 py-1 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A]">
                {project.specLabel || 'SPEC: A1 594x841mm • 300DPI CMYK'}
              </span>

              <span className="p-2 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#F2F4F7] group-hover:bg-[#8FB8E8] group-hover:text-[#000000] transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: EDITORIAL METADATA & ACTIONS
              ======================================================== */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-[#080808]">
            <div className="space-y-6">
              {/* Category & Edition Stamp */}
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em]">
                <span className="text-[#8FB8E8]">
                  {project.category}
                </span>
                <span className="text-[#6F7682]">
                  {project.editionLabel || 'EDITION 2025'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight leading-tight group-hover:text-[#FFFFFF]">
                {project.title}
              </h2>

              {/* Description */}
              <p className="font-body text-base text-[#A7ADB7] leading-relaxed">
                {project.description}
              </p>

              {/* Production Software Tools */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#17191D]">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682] block">
                    DESIGN SYSTEM ARSENAL
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-[4px] bg-[#0D0D0D] border border-[#22252A] font-mono text-[10px] text-[#A7ADB7] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-Image Indicator if available */}
              {project.images && project.images.length > 1 && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0D0D0D] border border-[#17191D] rounded font-mono text-[10px] text-[#8FB8E8]">
                  <span>MULTI-IMAGE SET:</span>
                  <span className="text-[#F2F4F7] font-bold">{project.images.length} ARTWORKS</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#17191D] space-y-3">
              {/* View Full Resolution / Lightbox */}
              <button
                type="button"
                onClick={onOpenLightbox}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-[0.1em] rounded-[4px] transition-transform hover:scale-[1.01] cursor-pointer shadow-md"
              >
                <span>{project.viewActionLabel || 'VIEW FULL RESOLUTION'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#000000]" />
              </button>

              {/* Where Posted */}
              {project.externalPostLink ? (
                <a
                  href={project.externalPostLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
                >
                  <span>WHERE POSTED [{project.platformName || 'ARCHIVE'}]</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FB8E8]" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleWherePosted}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0D0D0D] hover:bg-[#141414] border border-[#17191D] hover:border-[#22252A] text-[#6F7682] hover:text-[#A7ADB7] font-mono text-[10px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
                >
                  <span>WHERE POSTED [{project.platformName || 'BEHANCE / DRIVE'}]</span>
                  <ExternalLink className="w-3 h-3 text-[#6F7682]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
