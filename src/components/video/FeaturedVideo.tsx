import React from 'react';
import { Play, ArrowUpRight, ExternalLink } from 'lucide-react';
import { VideoProjectItem } from '../../types';

interface FeaturedVideoProps {
  project: VideoProjectItem;
  onInspect?: () => void;
  onShowNotice?: (message: string) => void;
}

export const FeaturedVideo: React.FC<FeaturedVideoProps> = ({
  project,
  onInspect,
  onShowNotice,
}) => {
  const handleViewVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.videoLink) {
      window.open(project.videoLink, '_blank', 'noopener,noreferrer');
    } else {
      if (onShowNotice) {
        onShowNotice('Google Drive video link coming soon for this cut.');
      } else {
        alert('VIDEO LINK COMING SOON');
      }
    }
  };

  const handleWherePosted = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.socialMediaLink) {
      window.open(project.socialMediaLink, '_blank', 'noopener,noreferrer');
    } else {
      if (onShowNotice) {
        onShowNotice('Social media publication link coming soon.');
      } else {
        alert('WHERE POSTED LINK COMING SOON');
      }
    }
  };

  return (
    <div className="w-full my-12">
      <div
        id={`featured-video-${project.id}`}
        onClick={onInspect}
        className="group relative bg-[#080808] border border-[#22252A] hover:border-[#F5A623]/50 rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* ========================================================
              LEFT COLUMN: LARGE 16:9 CINEMATIC THUMBNAIL
              ======================================================== */}
          <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-[#050505] border-b lg:border-b-0 lg:border-r border-[#17191D]">
            {/* Cinematic Image */}
            <img
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-90 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />

            {/* Subtle Cinematic Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent pointer-events-none" />

            {/* Top Bar: Technical Duration Stamp & Quality Tag */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#F2F4F7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] animate-pulse" />
                {project.duration}
              </span>

              <span className="px-2.5 py-1 rounded-[4px] bg-[#000000]/80 backdrop-blur-md border border-[#22252A] text-[#8FB8E8]">
                CINEMATIC MASTER
              </span>
            </div>

            {/* Centered Minimal Frosted Play Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#000000]/70 backdrop-blur-md border border-[#F2F4F7]/25 flex items-center justify-center text-[#F2F4F7] group-hover:scale-110 group-hover:bg-[#F5A623] group-hover:text-[#000000] group-hover:border-[#F5A623] transition-all duration-300 shadow-2xl">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Scrubber / Timeline Line Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#17191D]">
              <div className="h-full w-2/5 bg-gradient-to-r from-[#E5484D] to-[#F5A623]" />
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: METADATA & ACTIONS
              ======================================================== */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#080808]">
            <div className="space-y-5">
              {/* Category Subtitle */}
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                <span className="text-[#F5A623]">
                  {project.categoryLabel || 'FEST & CONCERT // FEATURE'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F2F4F7] uppercase tracking-tight leading-tight group-hover:text-[#FFFFFF]">
                {project.title}
              </h2>

              {/* Short Description */}
              <p className="font-body text-sm text-[#A7ADB7] leading-relaxed">
                {project.description}
              </p>

              {/* Post-Production Tools */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682] block">
                    POST-PRODUCTION PIPELINE
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-[4px] bg-[#0D0D0D] border border-[#22252A] font-mono text-[10px] text-[#8FB8E8] uppercase tracking-wider"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#17191D] space-y-2.5">
              {/* View Video Button */}
              {project.videoLink ? (
                <a
                  href={project.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-[0.1em] rounded-[4px] transition-transform hover:scale-[1.01] cursor-pointer shadow-md"
                >
                  <span>VIEW VIDEO</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleViewVideo}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#111111] hover:bg-[#17191D] border border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] font-mono text-[11px] font-bold uppercase tracking-[0.1em] rounded-[4px] transition-colors cursor-pointer"
                >
                  <span>VIEW VIDEO ▷</span>
                  <span className="text-[9px] text-[#F5A623] font-normal normal-case">
                    (COMING SOON)
                  </span>
                </button>
              )}

              {/* Where Posted Button */}
              {project.socialMediaLink ? (
                <a
                  href={project.socialMediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
                >
                  <span>WHERE POSTED [{project.socialPlatformName || 'YOUTUBE'}]</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8FB8E8]" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleWherePosted}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0D0D0D] hover:bg-[#141414] border border-[#17191D] hover:border-[#22252A] text-[#6F7682] hover:text-[#A7ADB7] font-mono text-[10px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
                >
                  <span>WHERE POSTED [{project.socialPlatformName || 'YOUTUBE'}]</span>
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
