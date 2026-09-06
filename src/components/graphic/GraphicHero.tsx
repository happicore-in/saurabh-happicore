import React from 'react';
import { GraphicFilterType } from '../../types';
import { Layers } from 'lucide-react';

interface GraphicHeroProps {
  activeFilter: GraphicFilterType;
  onFilterChange: (filter: GraphicFilterType) => void;
  counts: {
    all: number;
    posters: number;
    branding: number;
    social: number;
    merchandise: number;
  };
}

export const GraphicHero: React.FC<GraphicHeroProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const filterTabs: {
    id: GraphicFilterType;
    label: string;
    countKey: keyof typeof counts;
  }[] = [
    { id: 'all', label: 'ALL VISUALS', countKey: 'all' },
    { id: 'posters', label: 'EVENT POSTERS', countKey: 'posters' },
    { id: 'branding', label: 'TOURNAMENT BRANDING', countKey: 'branding' },
    { id: 'social', label: 'SOCIAL CREATIVES', countKey: 'social' },
    { id: 'merchandise', label: 'MERCHANDISE & JERSEY', countKey: 'merchandise' },
  ];

  return (
    <div className="pt-12 sm:pt-16 pb-8 border-b border-[#17191D]">
      {/* 1. Monospace Sub-Header & Catalog Reference */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8FB8E8]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
          <span>PORTFOLIO // 03 VISUAL IDENTITY &amp; PRINT</span>
        </div>

        <div className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
          CATALOG REF: <span className="text-[#A7ADB7]">SAU-GD-2025/26</span> / CURATED &amp; HIGHLIGHTS
        </div>
      </div>

      {/* 2. Headline & Prepress Fidelity Stamp */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="font-mono text-[11px] text-[#6F7682] uppercase tracking-[0.16em]">
            01 / GRAPHIC DESIGN
          </div>

          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F2F4F7] uppercase leading-[0.92]">
            GRAPHIC<br />
            DESIGN
          </h1>

          <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed max-w-2xl pt-2">
            Selected visual work across posters, social media creatives, tournament branding, and typography systems crafted with editorial restraint.
          </p>
        </div>

        {/* Prepress & Color Lab Stamp (From Reference graphic work.png) */}
        <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
          <div className="px-5 py-4 bg-[#080808] border border-[#22252A] rounded-[6px] min-w-[240px]">
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
                COLOR LAB &amp; PREPRESS
              </span>
            </div>

            <div className="font-heading font-bold text-lg text-[#F2F4F7] tracking-wide">
              300 DPI CMYK / RGB WEB
            </div>

            <div className="font-mono text-[10px] text-[#8FB8E8] uppercase tracking-wider pt-1">
              PANTONE SPOT • BLEED SAFE
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Navigation (Thin Borders & Monospace) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
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
                      : 'bg-[#080808] text-[#A7ADB7] hover:text-[#F2F4F7] border border-[#22252A] hover:border-[#8FB8E8]/50'
                  }
                `}
              >
                {tab.label} ({counts[tab.countKey]})
              </button>
            );
          })}
        </div>

        {/* Right Layout Indicator */}
        <div className="hidden xl:flex items-center gap-2 font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
          <span>GRID SPEC: 12-COL ASYMMETRIC / OPT RHYTHM</span>
        </div>
      </div>
    </div>
  );
};
