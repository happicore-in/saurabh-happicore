import React from 'react';
import { ArrowRight, Film, Palette, Terminal } from 'lucide-react';
import { WHAT_I_DO_ITEMS } from '../../data/aboutData';

interface AboutWhatIDoProps {
  onNavigate?: (id: string) => void;
}

export const AboutWhatIDo: React.FC<AboutWhatIDoProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block mb-2 font-semibold">
            DISCIPLINES // CORE SERVICES
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight">
            WHAT I DO
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-[#A7ADB7] max-w-md">
          Three specialized creative and engineering disciplines delivered with end-to-end craftsmanship.
        </p>
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WHAT_I_DO_ITEMS.map((item) => (
          <div
            key={item.number}
            onClick={() => onNavigate && onNavigate(item.actionNavId)}
            className="group relative bg-[#080808] hover:bg-[#0B0C0E] border border-[#22252A] hover:border-[#8FB8E8]/60 rounded-[8px] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-1"
          >
            {/* Top Row: Number & Icon */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#8FB8E8] tracking-widest">
                {item.number}
              </span>
              <div className="w-8 h-8 rounded bg-[#0D0D0D] border border-[#1C1F24] flex items-center justify-center text-[#A7ADB7] group-hover:text-[#F2F4F7] group-hover:border-[#8FB8E8]/40 transition-colors">
                {item.category === 'video' ? (
                  <Film className="w-4 h-4" />
                ) : item.category === 'graphic' ? (
                  <Palette className="w-4 h-4" />
                ) : (
                  <Terminal className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Middle: Title & List */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#F2F4F7] uppercase tracking-tight group-hover:text-[#FFFFFF] transition-colors">
                {item.title}
              </h3>

              <ul className="space-y-2 font-body text-xs sm:text-[13px] text-[#A7ADB7]">
                {item.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22252A] group-hover:bg-[#8FB8E8] transition-colors" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom: Action Arrow */}
            <div className="pt-4 border-t border-[#17191D] flex items-center justify-between text-xs font-mono text-[#6F7682] group-hover:text-[#8FB8E8] transition-colors">
              <span className="uppercase tracking-wider text-[11px] font-semibold">
                EXPLORE WORK
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
