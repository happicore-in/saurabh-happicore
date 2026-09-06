import React from 'react';
import { ArrowRight, History } from 'lucide-react';

interface AboutExperienceTransitionProps {
  onNavigate: (id: string) => void;
}

export const AboutExperienceTransition: React.FC<AboutExperienceTransitionProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8FB8E8]">
            <History className="w-3.5 h-3.5" />
            <span>WANT TO SEE MY JOURNEY?</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-tight">
            Explore Leadership &amp; Creative Tenures
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#A7ADB7]">
            Explore my experience across creative production, leadership and technology across premier collegiate and digital organizations.
          </p>
        </div>

        <button
          onClick={() => {
            onNavigate('experience');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#0D0D0D] hover:bg-[#15171C] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-all group cursor-pointer whitespace-nowrap"
        >
          <span>VIEW EXPERIENCE</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#8FB8E8]" />
        </button>
      </div>
    </div>
  );
};
