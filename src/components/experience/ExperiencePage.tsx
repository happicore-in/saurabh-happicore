import React from 'react';
import { ExperienceHero } from './ExperienceHero';
import { ExperienceSummaryRow } from './ExperienceSummaryRow';
import { ExecutiveSidebar } from './ExecutiveSidebar';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ExperienceSkillsAndCredentials } from './ExperienceSkillsAndCredentials';
import { ExperienceCTA } from './ExperienceCTA';

interface ExperiencePageProps {
  onContactClick?: () => void;
  onNavigate?: (id: string) => void;
  onShowNotice?: (msg: string) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  onContactClick,
  onShowNotice,
}) => {
  const handleDownloadDossier = () => {
    if (onShowNotice) {
      onShowNotice('Career Dossier (March 2026 Edition) initiated. Emailing summary to happicore.in@gmail.com');
    } else {
      window.open('mailto:happicore.in@gmail.com?subject=Request%20Career%20Dossier%20/%20CV', '_blank');
    }
  };

  return (
    <div className="w-full bg-[#000000] text-[#F2F4F7] selection:bg-[#F5A623]/20 selection:text-[#F2F4F7]">
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HERO */}
        <ExperienceHero onDownloadDossier={handleDownloadDossier} />

        {/* 2. SUMMARY STATISTICS ROW */}
        <ExperienceSummaryRow />

        {/* 3. TWO-COLUMN MAIN EXPERIENCE ARCHIVE */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Executive Summary & Atelier Studio Card */}
            <aside className="lg:col-span-4 w-full">
              <ExecutiveSidebar />
            </aside>

            {/* Right Column: Detailed Career Timeline */}
            <section className="lg:col-span-8 w-full" aria-label="Career Timeline">
              <ExperienceTimeline />
            </section>
          </div>
        </div>

        {/* 4. KEY SKILLS, EDUCATION & CERTIFICATIONS */}
        <ExperienceSkillsAndCredentials />

        {/* 5. PHILOSOPHICAL HIGHLIGHT & COLLABORATION CTA */}
        <ExperienceCTA onContactClick={onContactClick} />
      </main>
    </div>
  );
};
