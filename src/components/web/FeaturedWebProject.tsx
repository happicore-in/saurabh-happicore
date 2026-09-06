import React from 'react';
import { ExternalLink, Github, Lock, RotateCw, Share2, ArrowUpRight, Activity } from 'lucide-react';
import { WebProjectItem } from '../../types';

interface FeaturedWebProjectProps {
  project: WebProjectItem;
  onInspect?: () => void;
}

export const FeaturedWebProject: React.FC<FeaturedWebProjectProps> = ({
  project,
  onInspect,
}) => {
  return (
    <div className="w-full my-12">
      <div
        id={`featured-project-${project.id}`}
        className="group relative bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/40 rounded-[8px] overflow-hidden transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* ========================================================
              LEFT COLUMN: METADATA, TITLE, TELEMETRY & ACTIONS
              ======================================================== */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8 bg-[#080808] border-b lg:border-b-0 lg:border-r border-[#17191D]">
            <div className="space-y-6">
              {/* Badge & Index */}
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                <span className="text-[#F5A623]">{project.badgeLabel || 'FLAGSHIP RELEASE // 2024'}</span>
              </div>

              {/* Title & Subheading */}
              <div className="space-y-1.5">
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight leading-tight group-hover:text-[#FFFFFF]">
                  {project.title}
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8FB8E8] block">
                  WEB DEVELOPMENT // FULL STACK
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-[#A7ADB7] leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-wider block">
                  STACK ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-[4px] bg-[#0D0D0D] border border-[#22252A] font-mono text-[11px] text-[#8FB8E8] uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Telemetry Metric Box with SVG Wave (From Reference web.png) */}
              <div className="p-3.5 bg-[#050505] border border-[#17191D] rounded-[6px] flex items-center justify-between">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
                    TELEMETRY LATENCY
                  </div>
                  <div className="font-mono font-bold text-sm text-[#8FB8E8] flex items-center gap-1.5 pt-0.5">
                    <Activity className="w-3.5 h-3.5 text-[#8FB8E8]" />
                    <span>{project.telemetryLatency || '< 42ms sync'}</span>
                  </div>
                </div>

                {/* Micro sparkline SVG */}
                <div className="w-28 h-7 flex items-center">
                  <svg
                    viewBox="0 0 100 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#8FB8E8]"
                  >
                    <path
                      d="M0 16 L20 18 L35 8 L50 14 L65 4 L80 12 L100 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="100" cy="6" r="3" fill="#8FB8E8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Actions: Live Website & GitHub Repo */}
            <div className="pt-6 border-t border-[#17191D] flex flex-wrap items-center gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[11px] font-bold uppercase tracking-[0.1em] rounded-[4px] transition-transform hover:scale-[1.02] cursor-pointer shadow-md"
                >
                  <span>LIVE WEBSITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#000000]" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#17191D] text-[#6F7682] font-mono text-[11px] uppercase tracking-[0.1em] rounded-[4px] cursor-not-allowed opacity-60"
                >
                  <span>STAGING DEPLOYMENT SOON</span>
                </button>
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-[#A7ADB7]" />
                  <span>GITHUB REPO</span>
                  <ExternalLink className="w-3 h-3 text-[#6F7682]" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D0D0D] border border-[#17191D] text-[#6F7682] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[4px] cursor-not-allowed opacity-60"
                >
                  <span>PRIVATE REPO</span>
                </button>
              )}

              {onInspect && (
                <button
                  type="button"
                  onClick={onInspect}
                  className="text-xs font-mono text-[#6F7682] hover:text-[#A7ADB7] transition-colors ml-auto underline cursor-pointer"
                >
                  INSPECT ARCHITECTURE
                </button>
              )}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: LARGE BROWSER / DEVICE MOCKUP
              ======================================================== */}
          <div className="lg:col-span-7 bg-[#050505] p-5 sm:p-8 flex items-center justify-center">
            <div className="w-full rounded-[10px] overflow-hidden border border-[#22252A] bg-[#000000] shadow-2xl transition-all duration-500 group-hover:border-[#8FB8E8]/30">
              {/* Browser Window Header */}
              <div className="h-9 bg-[#0D0D0D] border-b border-[#1A1D22] px-3.5 flex items-center justify-between">
                {/* 3 Window Controls */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#46A758]/80" />
                </div>

                {/* Minimalist Browser Address Bar */}
                <div className="flex-1 max-w-[340px] mx-3 h-6 bg-[#000000] border border-[#22252A] rounded-[4px] px-2.5 flex items-center justify-between font-mono text-[10px] text-[#A7ADB7]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Lock className="w-2.5 h-2.5 text-[#46A758] flex-shrink-0" />
                    <span className="truncate text-[#8FB8E8]/90">
                      {project.browserUrl || 'sportify.iitm.ac.in/championship/live'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6F7682]">
                    <RotateCw className="w-2.5 h-2.5 hover:text-[#F2F4F7] cursor-pointer" />
                    <Share2 className="w-2.5 h-2.5 hover:text-[#F2F4F7] cursor-pointer" />
                  </div>
                </div>

                {/* Subtle Right Indicator */}
                <div className="w-10 text-right">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#46A758] inline-block" title="System Online" />
                </div>
              </div>

              {/* Main Screenshot Canvas */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Live Ticker Bar Overlay at Bottom of Screenshot */}
                {project.scoreTicker && (
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#000000]/90 backdrop-blur-md border border-[#22252A] rounded-[4px] flex items-center justify-between font-mono text-[10px] text-[#F2F4F7]">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#E5484D] text-[#FFFFFF] text-[9px] font-bold uppercase tracking-wider">
                        LIVE FINAL
                      </span>
                      <span className="text-[#F2F4F7] font-semibold">
                        Mandakini Bulls <span className="text-[#8FB8E8]">78 : 72</span> Alakananda Knights
                      </span>
                    </div>
                    <span className="text-[#6F7682] hidden sm:inline">Q4 02:18</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
