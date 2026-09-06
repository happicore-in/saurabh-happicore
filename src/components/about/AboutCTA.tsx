import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AboutCTAProps {
  onContactClick: () => void;
  onNavigate: (id: string) => void;
}

export const AboutCTA: React.FC<AboutCTAProps> = ({ onContactClick, onNavigate }) => {
  return (
    <div className="py-16 sm:py-20">
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-64 bg-[#8FB8E8]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block font-semibold">
            LET&apos;S CREATE SOMETHING.
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-tight leading-tight">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#A7ADB7] max-w-md">
            Let&apos;s turn the idea into something people remember. Open for brand identities, video post-production, full-stack creative web engineering, and collegiate initiatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 py-3.5 px-6 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors group cursor-pointer shadow-lg"
          >
            <span>LET&apos;S WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              onNavigate('work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 py-3.5 px-6 bg-[#0D0D0D] hover:bg-[#15171C] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-all cursor-pointer"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-4 h-4 text-[#8FB8E8]" />
          </button>
        </div>

      </div>
    </div>
  );
};
