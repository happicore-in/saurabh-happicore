import React from 'react';
import { Play, ArrowUpRight, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { WorkProject } from '../../types';

interface WorkCardProps {
  project: WorkProject;
  onClick?: () => void;
  onSelectCategory?: (cat: 'web' | 'video' | 'graphic') => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  project,
  onClick,
  onSelectCategory,
}) => {
  const isVideo = project.category === 'video';
  const isWeb = project.category === 'web';
  const isGraphic = project.category === 'graphic';

  // Handle Horizontal Split layout (e.g. Card 08 Reels)
  if (project.aspectRatio === 'horizontal-split') {
    return (
      <div
        id={`project-card-${project.id}`}
        onClick={onClick}
        className="group relative w-full bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/40 rounded-[8px] overflow-hidden transition-colors duration-300 cursor-pointer"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          {/* Left: 9:16 Phone/Vertical Media Container */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex justify-center bg-[#050505] border-b lg:border-b-0 lg:border-r border-[#17191D]">
            <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-[16px] overflow-hidden border border-[#22252A] shadow-2xl bg-[#000000]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Media Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A] font-mono text-[9px] uppercase tracking-wider text-[#F2F4F7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                  {project.badgeLabel || '9:16 VERTICAL REEL'}
                </span>
              </div>

              {/* Bottom Reel metric overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-[#A7ADB7] px-2 py-1 rounded bg-[#000000]/80 backdrop-blur-md border border-[#22252A]">
                <span className="text-[#8FB8E8]">120K+ Total Organic Views</span>
              </div>
            </div>
          </div>

          {/* Right: Metadata, Metrics, Actions */}
          <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              {/* Category & Subcategory Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                <div className="flex items-center gap-2">
                  <span className="text-[#8FB8E8]">{project.index} //</span>
                  <span className="text-[#F2F4F7]">{project.subcategory}</span>
                </div>
                {project.extraBadge && (
                  <span className="px-2 py-0.5 rounded bg-[#111111] border border-[#22252A] text-[#A7ADB7] text-[10px]">
                    {project.extraBadge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] transition-colors">
                {project.title}
              </h3>

              {/* Short Description */}
              <p className="font-body text-[14px] sm:text-[15px] text-[#A7ADB7] leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Metrics Highlights */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 bg-[#0D0D0D] border border-[#17191D] rounded-[4px] space-y-1"
                    >
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
                        {m.label}
                      </span>
                      <span className="block font-heading font-bold text-base sm:text-lg text-[#F2F4F7]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-[#0D0D0D] border border-[#22252A] rounded-[4px] font-mono text-[10px] text-[#A7ADB7] uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-[#17191D] flex items-center justify-between">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] group-hover:bg-[#17191D] border border-[#22252A] group-hover:border-[#8FB8E8]/50 rounded-[4px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#F2F4F7] transition-all cursor-pointer"
              >
                <span>{project.actionLabel || 'View Reels Suite'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8FB8E8] transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <span className="font-mono text-[11px] text-[#6F7682]">
                {project.duration || '00:45 RUNTIME'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard or Asymmetric Card
  return (
    <div
      id={`project-card-${project.id}`}
      onClick={onClick}
      className={`
        group relative flex flex-col justify-between bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/40
        rounded-[8px] overflow-hidden transition-colors duration-300 cursor-pointer
        ${project.featured ? 'h-full' : 'h-full'}
      `}
    >
      {/* Media Box */}
      <div
        className={`
          relative w-full overflow-hidden bg-[#0D0D0D]
          ${project.aspectRatio === 'tall-poster' ? 'aspect-[3/4]' : project.featured ? 'aspect-[16/9] lg:min-h-[340px]' : 'aspect-[16/10] sm:aspect-[16/9]'}
        `}
      >
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            {project.badgeLabel && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] font-mono text-[10px] uppercase tracking-wider text-[#F2F4F7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                {project.badgeLabel}
              </span>
            )}
            {project.institutionOrLocation && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] font-mono text-[10px] uppercase tracking-wider text-[#A7ADB7]">
                {project.institutionOrLocation}
              </span>
            )}
          </div>

          {project.extraBadge && (
            <span className="px-2 py-0.5 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] font-mono text-[9px] uppercase tracking-wider text-[#F5A623]">
              {project.extraBadge}
            </span>
          )}
        </div>

        {/* Play Icon for Videos */}
        {isVideo && (
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#22252A] flex items-center justify-center text-[#F2F4F7] group-hover:bg-[#8FB8E8] group-hover:text-[#000000] transition-colors">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>
        )}
      </div>

      {/* Content & Metadata Area */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-3">
          {/* Index & Subcategory Row */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
            <div className="flex items-center gap-2">
              <span className="text-[#8FB8E8]">{project.index} //</span>
              <span className="text-[#F2F4F7]">{project.subcategory}</span>
            </div>
            {project.duration && (
              <span className="text-[#6F7682]">{project.duration}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] transition-colors">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="font-body text-[13px] sm:text-[14px] text-[#A7ADB7] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#0D0D0D] border border-[#17191D] rounded-[4px] font-mono text-[10px] text-[#8FB8E8] uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-[#17191D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-colors">
              <span>{project.actionLabel || 'VIEW PROJECT'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          {/* Discipline Direct Link Trigger */}
          {onSelectCategory && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory(project.category);
              }}
              className="font-mono text-[10px] text-[#6F7682] hover:text-[#A7ADB7] uppercase tracking-wider transition-colors"
              title={`Filter to ${project.category.toUpperCase()}`}
            >
              {project.category.toUpperCase()} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
