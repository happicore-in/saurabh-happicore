import React from 'react';
import { Download } from 'lucide-react';

interface ExperienceHeroProps {
  onDownloadDossier?: () => void;
}

export const ExperienceHero: React.FC<ExperienceHeroProps> = ({ onDownloadDossier }) => {
  return (
    <div className="pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#17191D]">
      {/* Editorial Index / Category Stamp */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
          <span className="w-2 h-2 rounded-full bg-[#8FB8E8] inline-block animate-pulse" />
          <span>LEADERSHIP &amp; CAREER</span>
          <span className="text-[#6F7682]">/</span>
          <span className="text-[#A7ADB7]">CHRONOLOGY 2024–2026</span>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682] hidden sm:block">
          SYS.ARCHIVE // VERIFIED TENURES
        </div>
      </div>

      {/* Main Title & Action Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-[#F2F4F7] uppercase leading-[0.9] break-words">
            EXPERIENCE
          </h1>
          <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed">
            My journey across design, media production, frontend technology, and creative leadership across university societies and collegiate initiatives.
          </p>
        </div>

        {/* Download Dossier / CV Button */}
        <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onDownloadDossier}
            className="group flex items-center gap-2.5 px-5 py-2.5 bg-[#080808] hover:bg-[#0D0D0D] border border-[#22252A] hover:border-[#8FB8E8] rounded text-[#F2F4F7] font-mono text-[12px] uppercase tracking-[0.1em] transition-all cursor-pointer shadow-sm active:scale-98"
          >
            <Download className="w-3.5 h-3.5 text-[#8FB8E8] transition-transform group-hover:translate-y-0.5" />
            <span>Download Dossier / CV</span>
          </button>
          <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
            UPDATED • MARCH 2026
          </span>
        </div>
      </div>
    </div>
  );
};
