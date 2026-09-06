import React from 'react';
import { VideoFilterType } from '../../types';
import { Activity } from 'lucide-react';

interface VideoHeroProps {
  activeFilter: VideoFilterType;
  onFilterChange: (filter: VideoFilterType) => void;
  counts: {
    all: number;
    aftermovies: number;
    sports: number;
    shortForm: number;
    promotional: number;
  };
}

export const VideoHero: React.FC<VideoHeroProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const filterTabs: {
    id: VideoFilterType;
    label: string;
    countKey: keyof typeof counts;
  }[] = [
    { id: 'all', label: 'ALL EDITS', countKey: 'all' },
    { id: 'aftermovies', label: 'AFTERMOVIES', countKey: 'aftermovies' },
    { id: 'sports', label: 'SPORTS RECAPS', countKey: 'sports' },
    { id: 'short-form', label: 'SOCIAL 9:16 REELS', countKey: 'shortForm' },
    { id: 'promotional', label: 'PROMOTIONAL TEASERS', countKey: 'promotional' },
  ];

  return (
    <div className="pt-12 sm:pt-16 pb-8 border-b border-[#17191D]">
      {/* 1. Monospace Sub-Header & Live Production Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5A623]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
          <span>PORTFOLIO // 02 MOTION &amp; CINEMA</span>
        </div>

        {/* Technical Broadcast Specs */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
          <span>TIMELINE: 24.000 FPS</span>
          <span className="text-[#22252A]">|</span>
          <span className="text-[#8FB8E8]">SOUND DESIGN: SYNCED</span>
        </div>
      </div>

      {/* 2. Headline & Master Status Waveform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
        <div className="lg:col-span-8 space-y-4">
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F2F4F7] uppercase leading-[0.92]">
            VIDEO<br />
            EDITING
          </h1>

          <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed max-w-2xl pt-2">
            Selected edits, aftermovies, promotional videos and short-form content engineered with rhythmic sound and color grading.
          </p>
        </div>

        {/* Master Reel Status Widget (From Reference video work.png) */}
        <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
          <div className="px-5 py-3.5 bg-[#080808] border border-[#22252A] rounded-[6px] min-w-[240px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6F7682]">
                MASTER REEL STATUS
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#E5484D] uppercase font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] animate-ping" />
                REC • LIVE
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <div className="font-heading font-bold text-xl text-[#F2F4F7]">
                {counts.all} CUTS
              </div>
              <div className="font-mono text-[10px] text-[#8FB8E8] uppercase tracking-wider">
                COLOR: REC.709
              </div>
            </div>

            {/* Audio Waveform Sparkline */}
            <div className="w-full h-6 flex items-center">
              <svg
                viewBox="0 0 200 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#F5A623]"
              >
                <path
                  d="M0 12 L20 12 L28 4 L36 20 L44 8 L52 16 L60 12 L90 12 L98 2 L106 22 L114 6 L122 18 L130 12 L160 12 L168 6 L176 18 L184 9 L192 14 L200 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Navigation (Minimal & Editorial) */}
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
                    ? 'bg-[#F5A623] text-[#000000] font-bold shadow-md'
                    : 'bg-[#080808] text-[#A7ADB7] hover:text-[#F2F4F7] border border-[#22252A] hover:border-[#F5A623]/40'
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
