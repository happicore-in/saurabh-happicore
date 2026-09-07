import React from 'react';
import { MapPin } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, index }) => {
  return (
    <div
      id={`experience-entry-${item.id}`}
      className="relative group bg-[#080808] hover:bg-[#0B0C0E] border border-[#22252A] hover:border-[#8FB8E8]/60 rounded-[8px] p-4 sm:p-8 transition-all duration-200 shadow-sm hover:shadow-lg"
    >
      {/* 1. TOP METADATA ROW */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#17191D]">
        {/* Left: Sys Role Index & Optional Status Badge */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#6F7682] uppercase">
            {item.sysRole}
          </span>

          {item.statusBadge && (
            <span
              className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.12em] font-bold ${
                item.badgeType === 'current'
                  ? 'bg-[#8FB8E8]/15 text-[#8FB8E8] border border-[#8FB8E8]/30'
                  : item.badgeType === 'engineering'
                  ? 'bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30'
                  : 'bg-[#17191D] text-[#A7ADB7] border border-[#22252A]'
              }`}
            >
              {item.statusBadge}
            </span>
          )}
        </div>

        {/* Right: Date & Location */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#A7ADB7] flex-wrap">
          <span className="text-[#F2F4F7] font-semibold">{item.date}</span>
          {item.location && (
            <div className="flex items-center gap-1 text-[#6F7682]">
              <span className="text-[#22252A]">•</span>
              <MapPin className="w-3 h-3 text-[#F5A623]" />
              <span>{item.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. ROLE & ORGANIZATION */}
      <div className="pt-5 pb-4">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] tracking-tight group-hover:text-[#FFFFFF] transition-colors mb-1.5 uppercase">
          {item.role}
        </h3>

        <div className="flex flex-wrap items-center gap-2 font-body text-sm sm:text-[15px]">
          <span className="font-semibold text-[#8FB8E8]">{item.organization}</span>
          {item.organizationSubtext && (
            <>
              <span className="text-[#6F7682]">•</span>
              <span className="text-[#A7ADB7]">{item.organizationSubtext}</span>
            </>
          )}
        </div>
      </div>

      {/* 3. KEY RESPONSIBILITIES (List with arrows) */}
      <div className="space-y-2.5 pt-2 pb-5">
        {item.responsibilities.map((resp, rIdx) => (
          <div key={rIdx} className="flex items-start gap-3">
            <span className="font-mono text-[#8FB8E8] font-bold text-sm shrink-0 leading-snug">
              →
            </span>
            <p className="font-body text-xs sm:text-[13.5px] text-[#A7ADB7] leading-relaxed">
              {resp}
            </p>
          </div>
        ))}
      </div>

      {/* 4. DISCIPLINE & TOOL TAGS */}
      <div className="pt-4 border-t border-[#17191D] flex flex-wrap items-center gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-[#0D0D0D] border border-[#1C1F24] rounded font-mono text-[10px] tracking-wider text-[#A7ADB7] uppercase group-hover:border-[#2A2E36] transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
