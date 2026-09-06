import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

interface ExperienceCTAProps {
  onContactClick?: () => void;
}

export const ExperienceCTA: React.FC<ExperienceCTAProps> = ({ onContactClick }) => {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* ========================================================
          1. SECTION 11: EXPERIENCE HIGHLIGHT EDITORIAL STATEMENT
          ======================================================== */}
      <div className="p-8 sm:p-12 bg-gradient-to-r from-[#080808] to-[#040404] border border-[#17191D] rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8FB8E8]">
            PHILOSOPHICAL ANCHOR
          </span>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F2F4F7] uppercase tracking-tight">
            FROM CREATIVE PRODUCTION TO DIGITAL TECHNOLOGY.
          </h3>
          <p className="font-body text-sm sm:text-base text-[#A7ADB7] leading-relaxed">
            Experience across video, graphic design, web development and creative leadership.
          </p>
        </div>

        <div className="shrink-0">
          <span className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider block">
            EST. 2024–2026 • CHENNAI / MAU
          </span>
        </div>
      </div>

      {/* ========================================================
          2. SECTION 12: READY TO COLLABORATE (Matches reference image)
          ======================================================== */}
      <div className="p-8 sm:p-12 lg:p-14 bg-[#080808] border border-[#22252A] rounded-[8px] relative overflow-hidden">
        {/* Subtle grid accent background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#8FB8E8]/5 via-transparent to-transparent pointer-events-none" />

        {/* Top Stamp */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#6F7682] uppercase tracking-[0.16em] mb-6">
          <div className="flex items-center gap-2 text-[#F5A623]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            <span>READY TO COLLABORATE</span>
          </div>
          <span className="text-[#A7ADB7] hidden sm:block">+ EXP_D8C_VERIFIED_2026</span>
        </div>

        {/* Main Content & Button */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F2F4F7] uppercase tracking-tight leading-snug">
              Interested in creative leadership or technical execution for your next venture?
            </h2>
            <p className="font-body text-sm sm:text-base text-[#A7ADB7] leading-relaxed">
              Available for select visual identity, media production, and web engineering mandates. Let&apos;s engineer impactful experiences.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onContactClick}
              className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-heading font-bold text-sm uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg active:scale-98"
            >
              <span>Initialize Contact</span>
              <ArrowRight className="w-4 h-4 text-[#000000] transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="mailto:happicore.in@gmail.com"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#6F7682] hover:text-[#8FB8E8] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>contact@saurabh.studio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
