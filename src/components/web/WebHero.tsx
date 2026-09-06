import React from 'react';
import { WebFilterType } from '../../types';

interface WebHeroProps {
  activeFilter: WebFilterType;
  onFilterChange: (filter: WebFilterType) => void;
  counts: {
    all: number;
    fullstack: number;
    portfolios: number;
    tools: number;
  };
}

export const WebHero: React.FC<WebHeroProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const techPills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Firebase',
    'GitHub',
  ];

  const filterTabs: { id: WebFilterType; label: string; countKey: keyof typeof counts }[] = [
    { id: 'all', label: 'ALL WEB', countKey: 'all' },
    { id: 'fullstack', label: 'FULL STACK APPS', countKey: 'fullstack' },
    { id: 'portfolios', label: 'PORTFOLIOS', countKey: 'portfolios' },
    { id: 'tools', label: 'INTERACTIVE TOOLS', countKey: 'tools' },
  ];

  return (
    <div className="pt-12 sm:pt-16 pb-10 border-b border-[#17191D]">
      {/* 1. Monospace Section Index & Live Marker */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8FB8E8]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
          <span>PORTFOLIO // 01 WEB ARCHITECTURE</span>
        </div>

        {/* Small Technical System Stamp */}
        <div className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
          FRONTEND • RESPONSIVE • APIS
        </div>
      </div>

      {/* 2. Hero Typography & Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
        <div className="lg:col-span-8 space-y-4">
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F2F4F7] uppercase leading-[0.92]">
            WEB<br />
            DEVELOPMENT
          </h1>

          <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed max-w-2xl pt-2">
            Websites and digital interfaces built with a focus on clean design, responsive experiences and modern technology.
          </p>
        </div>

        {/* 3. Performance & Deployment Metrics (From Reference web.png) */}
        <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3">
          <div className="px-4 py-3 bg-[#080808] border border-[#22252A] rounded-[6px] min-w-[120px]">
            <div className="font-heading font-bold text-2xl text-[#8FB8E8]">
              85+
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
              LIVE DEPLOYMENTS
            </div>
          </div>

          <div className="px-4 py-3 bg-[#080808] border border-[#22252A] rounded-[6px] min-w-[120px]">
            <div className="font-heading font-bold text-2xl text-[#F5A623]">
              99.8%
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
              LIGHTHOUSE PERF
            </div>
          </div>
        </div>
      </div>

      {/* 4. Requirement 3: Small Technical Metadata Strip */}
      <div className="pt-2 pb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-[#6F7682] border-t border-[#17191D]">
        <span className="text-[#A7ADB7] uppercase tracking-[0.14em]">
          CORE STACK //
        </span>
        {techPills.map((tech, idx) => (
          <React.Fragment key={tech}>
            <span className="text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors cursor-default">
              {tech}
            </span>
            {idx < techPills.length - 1 && (
              <span className="text-[#22252A]">/</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 5. Category Filter Navigation (ALL WEB, FULL STACK APPS, etc.) */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange(tab.id)}
              className={`
                px-3.5 py-1.5 rounded-[4px] font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? 'bg-[#F2F4F7] text-[#000000] font-bold shadow-md'
                    : 'bg-[#080808] text-[#A7ADB7] hover:text-[#F2F4F7] border border-[#22252A] hover:border-[#8FB8E8]/40'
                }
              `}
            >
              {tab.label} ({counts[tab.countKey]})
            </button>
          );
        })}
      </div>
    </div>
  );
};
