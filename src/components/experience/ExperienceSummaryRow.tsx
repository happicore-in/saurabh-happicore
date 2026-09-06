import React from 'react';
import { Award, Compass, GraduationCap, Zap } from 'lucide-react';
import { EXPERIENCE_SUMMARY_STATS } from '../../data/experienceData';

export const ExperienceSummaryRow: React.FC = () => {
  return (
    <div className="py-8 sm:py-10 border-b border-[#17191D]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Block 1: Roles & Chairs */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {EXPERIENCE_SUMMARY_STATS[0].label}
            </span>
            <Award className="w-4 h-4 text-[#F5A623]" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] tracking-tight mb-1">
              {EXPERIENCE_SUMMARY_STATS[0].value}
            </div>
            <p className="font-body text-xs text-[#6F7682] leading-relaxed">
              {EXPERIENCE_SUMMARY_STATS[0].subtext}
            </p>
          </div>
        </div>

        {/* Block 2: Campaigns */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {EXPERIENCE_SUMMARY_STATS[1].label}
            </span>
            <Compass className="w-4 h-4 text-[#8FB8E8]" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] tracking-tight mb-1">
              {EXPERIENCE_SUMMARY_STATS[1].value}
            </div>
            <p className="font-body text-xs text-[#6F7682] leading-relaxed">
              {EXPERIENCE_SUMMARY_STATS[1].subtext}
            </p>
          </div>
        </div>

        {/* Block 3: Affiliation */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {EXPERIENCE_SUMMARY_STATS[2].label}
            </span>
            <GraduationCap className="w-4 h-4 text-[#F2F4F7]" />
          </div>
          <div>
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] tracking-tight mb-1">
              {EXPERIENCE_SUMMARY_STATS[2].value}
            </div>
            <p className="font-body text-xs text-[#6F7682] leading-relaxed">
              {EXPERIENCE_SUMMARY_STATS[2].subtext}
            </p>
          </div>
        </div>

        {/* Block 4: Output Velocity */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {EXPERIENCE_SUMMARY_STATS[3].label}
            </span>
            <span className="font-mono text-[11px] font-bold text-[#F5A623]">
              {EXPERIENCE_SUMMARY_STATS[3].value}
            </span>
          </div>

          <div className="space-y-3">
            {/* Visual SLA Bars */}
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-4 flex-1 bg-[#17191D] rounded-sm" />
              <div className="h-4 flex-1 bg-[#22252A] rounded-sm" />
              <div className="h-4 flex-1 bg-[#2C313A] rounded-sm" />
              <div className="h-4 flex-1 bg-[#8FB8E8] rounded-sm" />
              <div className="h-4 flex-1 bg-[#F5A623] rounded-sm" />
            </div>

            <div className="flex items-center justify-between font-mono text-[9px] text-[#6F7682] uppercase tracking-wider">
              <span>Identity / Broadcast</span>
              <span className="text-[#F5A623] font-bold">HIGH YIELD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
