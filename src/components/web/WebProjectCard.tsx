import React from 'react';
import { ArrowUpRight, Github, ExternalLink, Code2, Clock } from 'lucide-react';
import { WebProjectItem } from '../../types';

interface WebProjectCardProps {
  project: WebProjectItem;
  onInspect?: () => void;
}

export const WebProjectCard: React.FC<WebProjectCardProps> = ({
  project,
  onInspect,
}) => {
  const isComingSoon = project.isComingSoon;

  return (
    <div
      id={`web-card-${project.id}`}
      onClick={onInspect}
      className={`
        group relative flex flex-col justify-between bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/40
        rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer h-full
        ${isComingSoon ? 'border-dashed border-[#22252A]/80 opacity-90' : ''}
      `}
    >
      {/* ========================================================
          MEDIA SCREENSHOT PREVIEW
          ======================================================== */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#050505] border-b border-[#17191D]">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className={`
            w-full h-full object-cover object-top filter contrast-[1.03] brightness-95
            transition-transform duration-700 ease-out group-hover:scale-[1.03]
            ${isComingSoon ? 'grayscale opacity-40' : ''}
          `}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {project.badgeLabel && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#000000]/85 backdrop-blur-md border border-[#22252A] font-mono text-[9px] uppercase tracking-wider text-[#F2F4F7]">
              <span className={`w-1.5 h-1.5 rounded-full ${isComingSoon ? 'bg-[#6F7682]' : 'bg-[#8FB8E8]'}`} />
              {project.badgeLabel}
            </span>
          )}

          {isComingSoon && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#F5A623]/20 border border-[#F5A623]/40 font-mono text-[9px] uppercase tracking-wider text-[#F5A623]">
              <Clock className="w-2.5 h-2.5" />
              IN PIPELINE
            </span>
          )}
        </div>
      </div>

      {/* ========================================================
          CARD BODY CONTENT
          ======================================================== */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-5">
        <div className="space-y-3">
          {/* Index & Category Label */}
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
            <div className="flex items-center gap-2">
              <span className="text-[#8FB8E8]">{project.index} //</span>
              <span className="text-[#A7ADB7]">{project.categoryLabel}</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]/70" />
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] transition-colors leading-tight">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="font-body text-[13px] sm:text-[14px] text-[#A7ADB7] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-[#0D0D0D] border border-[#22252A] rounded-[4px] font-mono text-[10px] text-[#8FB8E8] uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================
            CARD ACTION FOOTER
            ======================================================== */}
        <div className="pt-4 border-t border-[#17191D] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.1em]">
          {/* Live Link */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors cursor-pointer"
            >
              <span>LIVE WEBSITE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-[#6F7682] cursor-not-allowed">
              {isComingSoon ? 'COMING SOON' : 'PREVIEW UNAVAILABLE'}
            </span>
          )}

          {/* GitHub Action */}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[#A7ADB7] hover:text-[#F2F4F7] transition-colors cursor-pointer"
            >
              <Github className="w-3 h-3" />
              <span>GITHUB</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#6F7682]" />
            </a>
          ) : (
            <span className="text-[#6F7682] text-[10px]">
              {isComingSoon ? 'REPO SOON' : 'PRIVATE'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
