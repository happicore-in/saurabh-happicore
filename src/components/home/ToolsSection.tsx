import React from 'react';
import { CREATIVE_TOOLS, DEV_TOOLS } from '../../utils/toolLogos';

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" className="w-full bg-[#000000] py-16 sm:py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block">
              03 / TOOLS &amp; TECHNOLOGIES
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              TOOLS I USE
            </h2>
          </div>
          <p className="font-body text-base text-[#A7ADB7] max-w-md">
            Production-tested creative software and modern web development stack with official application toolsets.
          </p>
        </div>

        {/* TWO DISTINCT CATEGORY GROUPS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 pt-8 sm:pt-12">
          
          {/* GROUP 1: VIDEO / DESIGN SUITE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                  VIDEO &amp; DESIGN SUITE
                </h3>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#6F7682] uppercase">
                5 PRODUCTION APPS
              </span>
            </div>

            <div className="space-y-3">
              {CREATIVE_TOOLS.map((tool) => {
                const cardId = `tool-card-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                return (
                  <div
                    key={tool.name}
                    id={cardId}
                    className="group bg-[#080808] border border-[#22252A] hover:border-[#F5A623]/50 rounded-[8px] p-3 sm:p-4 transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 hover:shadow-[0_4px_20px_rgba(245,166,35,0.06)]"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      {/* Authentic App Logo Box */}
                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-[8px] bg-[#111317] border border-[#242831] flex items-center justify-center p-2 group-hover:border-[#F5A623]/40 group-hover:scale-105 transition-all flex-shrink-0 shadow-inner">
                        <img
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain drop-shadow-sm select-none"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] truncate">
                            {tool.name}
                          </h4>
                          {tool.badge && (
                            <span className="hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 rounded uppercase tracking-wider">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] sm:text-[11px] text-[#6F7682] truncate group-hover:text-[#A7ADB7] transition-colors">
                          {tool.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#A7ADB7] bg-[#0D0D0D] px-2 py-1 border border-[#22252A] rounded uppercase tracking-wider">
                        {tool.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GROUP 2: WEB & DEVELOPMENT SUITE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8FB8E8]" />
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                  WEB &amp; CODE TECH
                </h3>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#6F7682] uppercase">
                6 WEB TECHNOLOGIES
              </span>
            </div>

            <div className="space-y-3">
              {DEV_TOOLS.map((tool) => {
                const cardId = `tool-card-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                return (
                  <div
                    key={tool.name}
                    id={cardId}
                    className="group bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/50 rounded-[8px] p-3 sm:p-4 transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 hover:shadow-[0_4px_20px_rgba(143,184,232,0.06)]"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      {/* Authentic App Logo Box */}
                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-[8px] bg-[#111317] border border-[#242831] flex items-center justify-center p-2 group-hover:border-[#8FB8E8]/40 group-hover:scale-105 transition-all flex-shrink-0 shadow-inner">
                        <img
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain drop-shadow-sm select-none"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] truncate">
                            {tool.name}
                          </h4>
                          {tool.badge && (
                            <span className="hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 text-[#8FB8E8] bg-[#8FB8E8]/10 border border-[#8FB8E8]/20 rounded uppercase tracking-wider">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] sm:text-[11px] text-[#6F7682] truncate group-hover:text-[#A7ADB7] transition-colors">
                          {tool.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#A7ADB7] bg-[#0D0D0D] px-2 py-1 border border-[#22252A] rounded uppercase tracking-wider">
                        {tool.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
