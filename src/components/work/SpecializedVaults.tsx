import React from 'react';
import { Code2, Film, LayoutGrid, ArrowRight } from 'lucide-react';

interface SpecializedVaultsProps {
  onSelectDiscipline: (discipline: 'web' | 'video' | 'graphic') => void;
}

export const SpecializedVaults: React.FC<SpecializedVaultsProps> = ({
  onSelectDiscipline,
}) => {
  const vaults = [
    {
      id: 'web' as const,
      icon: Code2,
      title: 'Web Engineering',
      desc: 'Fullstack, UI/UX, React, interactive apps & APIs',
    },
    {
      id: 'video' as const,
      icon: Film,
      title: 'Video Production',
      desc: 'Aftermovies, dynamic social reels & pacing',
    },
    {
      id: 'graphic' as const,
      icon: LayoutGrid,
      title: 'Graphic Systems',
      desc: 'Event identity, sports kits, editorial layouts',
    },
  ];

  return (
    <div className="w-full bg-[#050505] border border-[#17191D] rounded-[8px] p-6 sm:p-10 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading & Subtitle */}
        <div className="lg:col-span-5 space-y-3">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block">
            SPECIALIZED VAULTS
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-tight">
            Looking for custom work in a specific discipline?
          </h2>
          <p className="font-body text-[14px] text-[#A7ADB7] leading-relaxed max-w-md">
            Explore dedicated portfolios with full technical case studies, production breakdowns, and raw timelines.
          </p>
        </div>

        {/* Right Column: 3 Discipline Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {vaults.map((vault) => {
            const Icon = vault.icon;
            return (
              <button
                key={vault.id}
                type="button"
                onClick={() => onSelectDiscipline(vault.id)}
                className="group flex flex-col justify-between p-4 sm:p-5 bg-[#0A0A0A] hover:bg-[#111111] border border-[#22252A] hover:border-[#8FB8E8]/50 rounded-[6px] text-left transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between pb-6">
                  <Icon className="w-5 h-5 text-[#8FB8E8]" />
                  <ArrowRight className="w-4 h-4 text-[#6F7682] group-hover:text-[#8FB8E8] transition-transform group-hover:translate-x-1" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-[14px] sm:text-[15px] text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF]">
                    {vault.title}
                  </h3>
                  <p className="font-body text-[11px] text-[#A7ADB7] leading-normal line-clamp-2">
                    {vault.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
