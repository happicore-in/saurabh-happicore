import React from 'react';
import { WorkCategory } from '../../types';

interface WorkHeroProps {
  activeCategory: WorkCategory;
  onSelectCategory: (category: WorkCategory) => void;
  categoryCounts: {
    all: number;
    web: number;
    video: number;
    graphic: number;
  };
}

export const WorkHero: React.FC<WorkHeroProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const filters: { id: WorkCategory; label: string; count: string }[] = [
    { id: 'all', label: 'ALL', count: `${categoryCounts.all}+` },
    { id: 'web', label: 'WEB', count: `0${categoryCounts.web}` },
    { id: 'video', label: 'VIDEO', count: `0${categoryCounts.video}` },
    { id: 'graphic', label: 'GRAPHIC', count: `0${categoryCounts.graphic}` },
  ];

  return (
    <div className="w-full pt-12 pb-10 border-b border-[#17191D]">
      {/* Small Index Tag / Monospace Marker */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#080808] border border-[#22252A] font-mono text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
          <span>PORTFOLIO ARCHIVE</span>
          <span className="text-[#6F7682]">//</span>
          <span className="text-[#6F7682]">INDEXED 2024 — 2026</span>
        </div>

        <div className="font-mono text-[11px] text-[#6F7682] tracking-[0.12em] uppercase">
          01 / WORK
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F2F4F7] uppercase tracking-[-0.02em] leading-tight max-w-4xl mb-4">
        SELECTED WORK
      </h1>

      {/* Short Editorial Description */}
      <p className="font-body text-base sm:text-lg text-[#A7ADB7] max-w-2xl leading-relaxed mb-10">
        Videos, graphics, and websites I've worked on for campus festivals, collegiate sports societies, and independent brands.
      </p>

      {/* Category Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Editorial Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap items-center gap-2"
        >
          {filters.map((filter) => {
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                id={`filter-${filter.id}`}
                aria-selected={isActive}
                onClick={() => onSelectCategory(filter.id)}
                className={`
                  inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] font-mono text-[12px] uppercase tracking-[0.08em]
                  transition-all duration-200 cursor-pointer border
                  ${
                    isActive
                      ? 'bg-[#0D0D0D] border-[#8FB8E8] text-[#F2F4F7] shadow-sm'
                      : 'bg-[#080808] border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7] hover:border-[#383C45]'
                  }
                `}
              >
                <span>{filter.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isActive
                      ? 'bg-[#F5A623] text-[#000000] font-semibold'
                      : 'bg-[#17191D] text-[#6F7682]'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Format Indicator on Right */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#6F7682] uppercase tracking-[0.1em]">
          <span>FORMAT:</span>
          <span className="flex items-center gap-1.5 text-[#A7ADB7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            Curated Production Reel
          </span>
        </div>
      </div>
    </div>
  );
};
