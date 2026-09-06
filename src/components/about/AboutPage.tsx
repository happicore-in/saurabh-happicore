import React from 'react';
import { AboutHero } from './AboutHero';
import { AboutMainSection } from './AboutMainSection';
import { AboutWhatIDo } from './AboutWhatIDo';
import { AboutApproach } from './AboutApproach';
import { AboutTools } from './AboutTools';
import { AboutEducationAndCerts } from './AboutEducationAndCerts';
import { AboutHappicore } from './AboutHappicore';
import { AboutExperienceTransition } from './AboutExperienceTransition';
import { AboutAvailabilityAndContact } from './AboutAvailabilityAndContact';
import { AboutCTA } from './AboutCTA';

interface AboutPageProps {
  onContactClick: () => void;
  onNavigate: (id: string) => void;
  onShowNotice?: (msg: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onContactClick,
  onNavigate,
  onShowNotice,
}) => {
  return (
    <main id="about-page" className="w-full bg-[#000000] text-[#F2F4F7]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO SECTION */}
        <AboutHero />

        {/* 2. MAIN ABOUT SECTION (PORTRAIT + BIOGRAPHY + QUICK PROFILE) */}
        <AboutMainSection />

        {/* 3. WHAT I DO (VIDEO, GRAPHIC, WEB) */}
        <AboutWhatIDo onNavigate={onNavigate} />

        {/* 4. MY APPROACH (STORY, DESIGN, TECH, LEARNING) */}
        <AboutApproach />

        {/* 5. TOOLS & TECHNOLOGIES (VIDEO, DESIGN, WEB) */}
        <AboutTools />

        {/* 6. EDUCATION (IIT MADRAS) & CERTIFICATIONS */}
        <AboutEducationAndCerts />

        {/* 7. HAPPICORE (INDEPENDENT ATELIER) */}
        <AboutHappicore />

        {/* 8. EXPERIENCE TRANSITION (LINK TO PART 7) */}
        <AboutExperienceTransition onNavigate={onNavigate} />

        {/* 9. AVAILABILITY & DIRECT CONTACT CHANNELS */}
        <AboutAvailabilityAndContact onContactClick={onContactClick} />

        {/* 10. CLOSING CTA */}
        <AboutCTA
          onContactClick={onContactClick}
          onNavigate={onNavigate}
        />

      </div>
    </main>
  );
};
