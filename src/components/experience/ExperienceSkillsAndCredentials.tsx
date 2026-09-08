import React, { useState, useEffect } from 'react';
import { GraduationCap, Layers } from 'lucide-react';
import {
  EXPERIENCE_SKILLS,
  EDUCATION_ENTRY,
} from '../../data/experienceData';
import { getAboutData } from '../../services/portfolioDataService';

export const ExperienceSkillsAndCredentials: React.FC = () => {
  const [education, setEducation] = useState(EDUCATION_ENTRY);

  const loadData = async () => {
    try {
      const data = await getAboutData();
      if (data && data.education) {
        setEducation({
          institution: data.education.institution || EDUCATION_ENTRY.institution,
          degree: data.education.degree || EDUCATION_ENTRY.degree,
          status: data.education.status || EDUCATION_ENTRY.status,
          details: data.education.details || EDUCATION_ENTRY.details,
        });
      }
    } catch {
      // Keep baseline fallbacks
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (!customEvt.detail?.type || customEvt.detail.type === 'about' || customEvt.detail.type === 'all') {
        loadData();
      }
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, []);

  return (
    <div className="py-14 sm:py-20 border-t border-[#17191D] space-y-16">
      {/* ========================================================
          1. KEY SKILLS FROM EXPERIENCE (Section 8)
          ======================================================== */}
      <div>
        <div className="flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
          <Layers className="w-3.5 h-3.5 text-[#8FB8E8]" />
          <span>EXPERIENCE ACROSS</span>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {EXPERIENCE_SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/60 rounded font-mono text-[11px] sm:text-xs text-[#F2F4F7] uppercase tracking-[0.1em] transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================
          2. ACADEMIC FOUNDATION (Section 9)
          ======================================================== */}
      <div className="max-w-2xl p-6 sm:p-8 bg-[#080808] border border-[#22252A] rounded-[8px] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8FB8E8]">
            <GraduationCap className="w-4 h-4 text-[#8FB8E8]" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <span className="px-2 py-0.5 bg-[#8FB8E8]/10 border border-[#8FB8E8]/30 rounded font-mono text-[9px] uppercase tracking-wider text-[#8FB8E8] font-bold">
            {education.status}
          </span>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg sm:text-xl text-[#F2F4F7] uppercase tracking-tight mb-1">
            {education.institution}
          </h4>
          <div className="font-mono text-xs sm:text-[13px] text-[#F5A623] uppercase tracking-wider font-semibold">
            {education.degree}
          </div>
        </div>

        <p className="font-body text-xs text-[#6F7682] leading-relaxed pt-2 border-t border-[#17191D]">
          {education.details}
        </p>
      </div>
    </div>
  );
};

