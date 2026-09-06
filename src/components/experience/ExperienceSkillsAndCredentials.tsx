import React from 'react';
import { Award, GraduationCap, Layers } from 'lucide-react';
import {
  EXPERIENCE_SKILLS,
  CERTIFICATIONS,
  EDUCATION_ENTRY,
} from '../../data/experienceData';

export const ExperienceSkillsAndCredentials: React.FC = () => {
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
          2. EDUCATION & CERTIFICATIONS (Sections 9 & 10)
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Education (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#080808] border border-[#22252A] rounded-[8px] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8FB8E8]">
              <GraduationCap className="w-4 h-4 text-[#8FB8E8]" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <span className="px-2 py-0.5 bg-[#8FB8E8]/10 border border-[#8FB8E8]/30 rounded font-mono text-[9px] uppercase tracking-wider text-[#8FB8E8] font-bold">
              {EDUCATION_ENTRY.status}
            </span>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg sm:text-xl text-[#F2F4F7] uppercase tracking-tight mb-1">
              {EDUCATION_ENTRY.institution}
            </h4>
            <div className="font-mono text-xs sm:text-[13px] text-[#F5A623] uppercase tracking-wider font-semibold">
              {EDUCATION_ENTRY.degree}
            </div>
          </div>

          <p className="font-body text-xs text-[#6F7682] leading-relaxed pt-2 border-t border-[#17191D]">
            {EDUCATION_ENTRY.details}
          </p>
        </div>

        {/* Certifications (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A7ADB7]">
            <Award className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>CERTIFICATIONS &amp; HONORS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-4 sm:p-5 bg-[#080808] hover:bg-[#0B0C0E] border border-[#22252A] hover:border-[#343842] rounded-[8px] flex flex-col justify-between space-y-3 transition-colors"
              >
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7682] mb-1">
                    {cert.type}
                  </div>
                  <h5 className="font-heading font-bold text-[13px] sm:text-sm text-[#F2F4F7] uppercase tracking-wide leading-snug">
                    {cert.title}
                  </h5>
                </div>

                {cert.issuer && (
                  <div className="pt-2 border-t border-[#17191D] font-mono text-[10px] text-[#A7ADB7]">
                    {cert.issuer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
