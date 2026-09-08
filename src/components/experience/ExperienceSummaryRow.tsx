import React, { useState, useEffect } from 'react';
import { Award, Compass, GraduationCap, Zap } from 'lucide-react';
import { EXPERIENCE_SUMMARY_STATS } from '../../data/experienceData';
import { getSiteSettings } from '../../services/portfolioDataService';

export const ExperienceSummaryRow: React.FC = () => {
  const [stats, setStats] = useState(EXPERIENCE_SUMMARY_STATS);

  const loadStats = async () => {
    try {
      const settings = await getSiteSettings();
      if (settings?.experienceSummaryStats && settings.experienceSummaryStats.length > 0) {
        setStats((prev) =>
          prev.map((s, idx) => {
            const match = settings.experienceSummaryStats?.[idx];
            if (match) {
              return {
                ...s,
                label: match.label || s.label,
                value: match.value || s.value,
              };
            }
            return s;
          })
        );
      }
    } catch {
      // Fallback intact
    }
  };

  useEffect(() => {
    loadStats();

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (!customEvt.detail?.type || customEvt.detail.type === 'settings' || customEvt.detail.type === 'all') {
        loadStats();
      }
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, []);

  return (
    <div className="py-8 sm:py-10 border-b border-[#17191D]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Block 1: Roles & Chairs */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {stats[0]?.label || 'ROLES & CHAIRS'}
            </span>
            <Award className="w-4 h-4 text-[#F5A623]" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] tracking-tight mb-1">
              {stats[0]?.value || '3+'}
            </div>
            <p className="font-body text-xs text-[#6F7682] leading-relaxed">
              {stats[0]?.subtext}
            </p>
          </div>
        </div>

        {/* Block 2: Campaigns */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {stats[1]?.label || 'CAMPAIGNS'}
            </span>
            <Compass className="w-4 h-4 text-[#8FB8E8]" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] tracking-tight mb-1">
              {stats[1]?.value || '6+'}
            </div>
            <p className="font-body text-xs text-[#6F7682] leading-relaxed">
              {stats[1]?.subtext}
            </p>
          </div>
        </div>

        {/* Block 3: Affiliation */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {stats[2]?.label || 'AFFILIATION'}
            </span>
            <GraduationCap className="w-4 h-4 text-[#F2F4F7]" />
          </div>
          <div>
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] tracking-tight mb-1">
              {stats[2]?.value || 'IIT Madras BS'}
            </div>
            <p className="font-body text-xs text-[#6F7682] leading-relaxed">
              {stats[2]?.subtext}
            </p>
          </div>
        </div>

        {/* Block 4: Output Velocity */}
        <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#343842] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              {stats[3]?.label || 'OUTPUT VELOCITY'}
            </span>
            <span className="font-mono text-[11px] font-bold text-[#F5A623]">
              {stats[3]?.value || '99.4% SLA'}
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
