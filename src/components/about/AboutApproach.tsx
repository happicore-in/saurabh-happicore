import React from 'react';
import { Compass, Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';
import { APPROACH_PRINCIPLES } from '../../data/aboutData';

export const AboutApproach: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block mb-2 font-semibold">
            METHODOLOGY
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight">
            MY APPROACH
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-[#A7ADB7] max-w-xl">
          A disciplined framework balancing emotional cadence in post-production with micro-precision in typography and technical systems.
        </p>
      </div>

      {/* Four Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {APPROACH_PRINCIPLES.map((principle, idx) => (
          <div
            key={principle.number}
            className="group bg-[#080808] hover:bg-[#0B0C0E] border border-[#22252A] hover:border-[#343842] rounded-[8px] p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-colors"
          >
            {/* Top: Number & Subtle Icon */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#F5A623] tracking-widest">
                {principle.number}
              </span>
              <div className="w-7 h-7 rounded bg-[#0D0D0D] border border-[#1C1F24] flex items-center justify-center text-[#6F7682] group-hover:text-[#F2F4F7] transition-colors">
                {idx === 0 ? (
                  <Compass className="w-3.5 h-3.5 text-[#8FB8E8]" />
                ) : idx === 1 ? (
                  <Layers className="w-3.5 h-3.5 text-[#8FB8E8]" />
                ) : idx === 2 ? (
                  <Terminal className="w-3.5 h-3.5 text-[#8FB8E8]" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5 text-[#8FB8E8]" />
                )}
              </div>
            </div>

            {/* Middle: Title & Tagline & Description */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7682] block">
                {principle.tagline}
              </span>
              <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-tight">
                {principle.title}
              </h3>
              <p className="font-body text-xs text-[#A7ADB7] leading-relaxed">
                {principle.description}
              </p>
            </div>

            {/* Bottom Footer Tag */}
            <div className="pt-3 border-t border-[#17191D] font-mono text-[10px] text-[#F5A623] uppercase tracking-wider font-semibold">
              {principle.footerTag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
