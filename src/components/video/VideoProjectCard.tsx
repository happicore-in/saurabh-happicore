import React from 'react';
import { Play, ArrowUpRight, ExternalLink, Smartphone } from 'lucide-react';
import { VideoProjectItem } from '../../types';

interface VideoProjectCardProps {
  project: VideoProjectItem;
  onInspect?: () => void;
  onShowNotice?: (message: string) => void;
}

export const VideoProjectCard: React.FC<VideoProjectCardProps> = ({
  project,
  onInspect,
  onShowNotice,
}) => {
  const isVertical = project.aspectRatio === '9:16';

  const handleViewVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.videoLink) {
      window.open(project.videoLink, '_blank', 'noopener,noreferrer');
    } else {
      if (onShowNotice) {
        onShowNotice('Google Drive video link coming soon for this cut.');
      }
    }
  };

  const handleWherePosted = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.socialMediaLink) {
      window.open(project.socialMediaLink, '_blank', 'noopener,noreferrer');
    } else {
      if (onShowNotice) {
        onShowNotice('Social media post link coming soon for this release.');
      }
    }
  };

  return (
    <div
      id={`video-card-${project.id}`}
      onClick={onInspect}
      className={`
        group relative flex flex-col justify-between bg-[#080808] border border-[#22252A] hover:border-[#F5A623]/50
        rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer h-full shadow-lg
        ${isVertical ? 'row-span-1' : ''}
      `}
    >
      {/* ========================================================
          THUMBNAIL CANVAS (16:9 OR 9:16 VERTICAL REEL)
          ======================================================== */}
      <div
        className={`
          relative w-full overflow-hidden bg-[#050505] border-b border-[#17191D]
          ${isVertical ? 'aspect-[9/12] sm:aspect-[9/11]' : 'aspect-[16/10]'}
        `}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-90 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-[#000000]/40 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider pointer-events-none">
          {isVertical ? (
            <>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#F5A623]/40 text-[#F5A623]">
                <Smartphone className="w-2.5 h-2.5" />
                <span>{project.batchLabel || '9:16 VERTICAL BATCH'}</span>
              </span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#F2F4F7]">
                {project.duration}
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] text-[#F2F4F7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                {project.duration}
              </span>
              {project.categoryLabel && (
                <span className="px-2 py-0.5 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#6F7682] hidden sm:inline-block">
                  {project.category}
                </span>
              )}
            </>
          )}
        </div>

        {/* Centered Minimal Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`
              rounded-full bg-[#000000]/70 backdrop-blur-md border border-[#F2F4F7]/25
              flex items-center justify-center text-[#F2F4F7]
              group-hover:scale-110 group-hover:bg-[#F5A623] group-hover:text-[#000000] group-hover:border-[#F5A623]
              transition-all duration-300 shadow-xl
              ${isVertical ? 'w-14 h-14' : 'w-12 h-12 sm:w-14 sm:h-14'}
            `}
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* ========================================================
          CARD METADATA & BODY
          ======================================================== */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2.5">
          {/* Category Stamp & Retention (if available) */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="text-[#8FB8E8]">
              {project.categoryLabel || project.category}
            </span>
            {project.retentionRate && (
              <span className="text-[#46A758] font-bold">
                {project.retentionRate}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] transition-colors leading-tight">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Post-Production Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-[#0D0D0D] border border-[#22252A] rounded-[4px] font-mono text-[9px] text-[#A7ADB7] uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================
            CARD ACTION BUTTONS
            ======================================================== */}
        <div className="pt-4 border-t border-[#17191D] grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-[0.08em]">
          {/* View Video */}
          {project.videoLink ? (
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 py-2 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-bold rounded-[4px] transition-colors cursor-pointer text-center"
            >
              <span>{isVertical ? 'VIEW REELS' : 'VIEW VIDEO'}</span>
              <Play className="w-2.5 h-2.5 fill-current" />
            </a>
          ) : (
            <button
              type="button"
              onClick={handleViewVideo}
              className="inline-flex items-center justify-center gap-1.5 py-2 bg-[#111111] hover:bg-[#17191D] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] rounded-[4px] transition-colors cursor-pointer text-center"
            >
              <span>{isVertical ? 'VIEW REELS' : 'VIEW VIDEO'} ▷</span>
            </button>
          )}

          {/* Where Posted */}
          {project.socialMediaLink ? (
            <a
              href={project.socialMediaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 py-2 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] rounded-[4px] transition-colors cursor-pointer text-center"
            >
              <span>{project.socialPlatformName || 'POSTED'}</span>
              <ArrowUpRight className="w-3 h-3 text-[#8FB8E8]" />
            </a>
          ) : (
            <button
              type="button"
              onClick={handleWherePosted}
              className="inline-flex items-center justify-center gap-1 py-2 bg-[#0D0D0D] hover:bg-[#141414] border border-[#17191D] text-[#6F7682] hover:text-[#A7ADB7] rounded-[4px] transition-colors cursor-pointer text-center"
            >
              <span>{project.socialPlatformName || 'POSTED'}</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#6F7682]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
