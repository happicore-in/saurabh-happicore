import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';
import { getSiteSettings, getAboutData, resolveAuthoritativeProfileImage } from '../../services/portfolioDataService';
import { AdminSiteSettings, AdminAboutData } from '../../types/admin';

interface HeroSectionProps {
  onExploreWork?: () => void;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onContactClick,
}) => {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const [about, setAbout] = useState<AdminAboutData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageHasFailed, setImageHasFailed] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [s, a] = await Promise.all([getSiteSettings(), getAboutData()]);
        if (isMounted) {
          setSettings(s);
          setAbout(a);
          setImageHasFailed(false);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('HeroSection data load error:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.type === 'settings' || detail.type === 'about') {
        loadData();
      }
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const availabilityStatus =
    settings?.availability?.status ||
    settings?.home?.availability ||
    IDENTITY.availability;

  const locationText =
    settings?.contactDetails?.location ||
    'MAU, UP, INDIA';

  const profileImageUrl = resolveAuthoritativeProfileImage(about, settings);

  const siteDisplayName =
    settings?.siteName ? settings.siteName.split('//')[0].trim() : 'SAURABH';

  const studioName =
    settings?.happicore?.name || 'HAPPICORE';

  return (
    <section
      id="home-hero"
      className="relative w-full min-h-0 sm:min-h-[calc(100vh-4rem)] lg:min-h-screen bg-[#000000] flex flex-col justify-start sm:justify-between overflow-hidden px-2 xs:px-2.5 sm:px-6 lg:px-8 pt-1.5 xs:pt-2 sm:pt-8 pb-3 xs:pb-4 sm:pb-10"
    >
      {/* Subtle ambient lighting - very soft and non-distracting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full opacity-15 blur-[120px] bg-gradient-to-b from-[#8FB8E8]/20 via-[#F5A623]/10 to-transparent"
        aria-hidden="true"
      />

      {/* CENTER EDITORIAL COMPOSITION: Asymmetric Columns + Integrated Portrait + Giant Typography */}
      <div className="w-full max-w-[1360px] mx-auto my-0 sm:my-auto relative py-1 xs:py-2 sm:py-6 lg:py-10 z-10">
        <div className="grid grid-cols-[1fr_auto_1fr] lg:grid-cols-12 gap-1 xs:gap-1.5 sm:gap-4 lg:gap-4 items-center relative">
          
          {/* LEFT COLUMN: Discipline Breakdown & Craft Metadata (Left of portrait on all viewports) */}
          <div className="order-1 lg:col-span-3 space-y-1.5 xs:space-y-2 sm:space-y-4 lg:space-y-6 text-left w-full z-20">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] lg:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#8FB8E8] block">
                [01 / DISCIPLINE]
              </span>
              <h3 className="font-heading font-bold text-[9px] xs:text-[10.5px] sm:text-base lg:text-lg text-[#F2F4F7] uppercase tracking-wide leading-tight">
                VIDEO EDITOR
              </h3>
              <p className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[10px] lg:text-[11px] text-[#6F7682] uppercase tracking-wider leading-tight">
                CINEMATIC RHYTHM & PACING
              </p>
            </div>

            <div className="h-px w-5 xs:w-6 sm:w-8 lg:w-12 bg-[#22252A]" />

            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-heading font-bold text-[9px] xs:text-[10.5px] sm:text-base lg:text-lg text-[#F2F4F7] uppercase tracking-wide leading-tight">
                GRAPHIC DESIGNER
              </h3>
              <p className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[10px] lg:text-[11px] text-[#6F7682] uppercase tracking-wider leading-tight">
                EDITORIAL & TYPOGRAPHY
              </p>
            </div>

            <div className="h-px w-5 xs:w-6 sm:w-8 lg:w-12 bg-[#22252A]" />

            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-heading font-bold text-[9px] xs:text-[10.5px] sm:text-base lg:text-lg text-[#F2F4F7] uppercase tracking-wide leading-tight">
                WEB DEVELOPER
              </h3>
              <p className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[10px] lg:text-[11px] text-[#6F7682] uppercase tracking-wider leading-tight">
                CLEAN INTERACTIVE EXPERIENCES
              </p>
            </div>
          </div>

          {/* CENTER: Integrated Portrait with Editorial 'HEY, I'M' script (Centered between left and right columns) */}
          <div className="order-2 lg:col-span-6 relative flex flex-col items-center justify-center flex-shrink-0 z-10">
            
            {/* Editorial Greeting: 'HEY, I'M' */}
            <div className="w-full text-center lg:text-left lg:absolute lg:-top-6 lg:left-8 z-30 pointer-events-none mb-0.5 xs:mb-1 sm:mb-2 lg:mb-0">
              <span className="font-editorial text-3xl xs:text-4xl sm:text-4xl lg:text-6xl text-[#E8EEF7]/90 tracking-wide select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Hey, I&apos;m
              </span>
            </div>

            {/* Seamless Portrait Container - NO CARDS, NO BROWSER FRAMES, PURE INTEGRATION */}
            <div className="relative w-[165px] xs:w-[185px] sm:w-[240px] md:w-[320px] lg:w-[410px] max-w-[calc(100vw-2.5rem)] aspect-[3/4] mx-auto select-none bg-[#000000]">
              {isLoading ? (
                /* Neutral loading state / pure black area matching background */
                <div className="w-full h-full bg-[#050608] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-[#22252A] border-t-[#8FB8E8]/40 animate-spin" />
                </div>
              ) : profileImageUrl && !imageHasFailed ? (
                <img
                  src={profileImageUrl}
                  alt="Saurabh — Video Editor, Graphic Designer, Web Developer"
                  referrerPolicy="no-referrer"
                  onError={() => setImageHasFailed(true)}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.98]"
                />
              ) : (
                /* Pure black empty state if image is null/empty/failed */
                <div className="w-full h-full bg-[#000000]" />
              )}

              {/* Seamless gradient mask at the bottom dissolving the torso into pure black */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/20 to-transparent pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.85) 12%, rgba(0,0,0,0) 45%), radial-gradient(ellipse at center, transparent 65%, #000000 100%)',
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Education, Coordinates & Tech Credentials (Right of portrait on all viewports) */}
          <div className="order-3 lg:col-span-3 space-y-1.5 xs:space-y-2 sm:space-y-4 lg:space-y-6 text-right w-full z-20">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] lg:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#F5A623] block">
                [02 / EDUCATION & TECH]
              </span>
              <h3 className="font-heading font-bold text-[9px] xs:text-[10.5px] sm:text-base lg:text-lg text-[#F2F4F7] uppercase tracking-wide leading-tight">
                BS DATA SCIENCE
              </h3>
              <p className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[10px] lg:text-[11px] text-[#6F7682] uppercase tracking-wider leading-tight">
                IIT MADRAS (2022–PRESENT)
              </p>
            </div>

            <div className="h-px w-5 xs:w-6 sm:w-8 lg:w-12 bg-[#22252A] ml-auto" />

            <div className="space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] lg:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#6F7682] block">
                LOCATION
              </span>
              <p className="font-mono text-[7.5px] xs:text-[8.5px] sm:text-[11px] lg:text-[12px] text-[#F2F4F7] uppercase tracking-wider leading-tight break-words">
                {locationText}
              </p>
              <p className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[10px] lg:text-[11px] text-[#6F7682] leading-tight break-words">
                ORIGIN: {IDENTITY.location}
              </p>
            </div>

            <div className="h-px w-5 xs:w-6 sm:w-8 lg:w-12 bg-[#22252A] ml-auto" />

            <div className="space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] lg:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#F5A623] block">
                ● FREELANCE STATUS
              </span>
              <p className="font-mono text-[7.5px] xs:text-[8.5px] sm:text-[11px] lg:text-[12px] text-[#F2F4F7] uppercase tracking-wider font-semibold leading-tight">
                {availabilityStatus}
              </p>
              <p className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[10px] lg:text-[11px] text-[#6F7682] leading-tight break-words">
                CREATIVE STUDIO: {studioName}
              </p>
            </div>
          </div>

        </div>

        {/* OVERSIZED TYPOGRAPHY: 'SAURABH' ACROSS FULL HERO WIDTH */}
        <div className="w-full text-center relative -mt-6 xs:-mt-8 sm:-mt-10 lg:-mt-10 z-20 pointer-events-none overflow-hidden px-1 sm:px-2">
          <h1 className="font-heading font-extrabold text-[13.5vw] xs:text-[14vw] lg:text-[14.5vw] text-[#F2F4F7] uppercase tracking-[-0.03em] lg:tracking-[-0.04em] leading-[0.88] lg:leading-[0.85] select-none break-words">
            {siteDisplayName}
          </h1>
        </div>
      </div>

      {/* BOTTOM ROW: Refined Text-Arrow Links + Technical Geographic Coordinates */}
      <div className="w-full max-w-[1360px] mx-auto pt-2.5 xs:pt-3 sm:pt-6 border-t border-[#17191D]/80 flex flex-col sm:flex-row items-center justify-between gap-1.5 xs:gap-2 sm:gap-4 z-20">
        <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 font-mono text-[10px] xs:text-[11px] sm:text-[12px] uppercase tracking-[0.1em]">
          <button
            onClick={onExploreWork}
            className="group inline-flex items-center gap-1.5 text-[#8FB8E8] hover:text-[#A8CCFC] transition-colors duration-200 cursor-pointer py-1 sm:py-0 min-h-[36px] sm:min-h-[44px]"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
          </button>
          <span className="text-[#22252A]">/</span>
          <button
            onClick={onContactClick}
            className="group inline-flex items-center gap-1.5 text-[#F5A623] hover:text-[#FFAE33] transition-colors duration-200 cursor-pointer py-1 sm:py-0 min-h-[36px] sm:min-h-[44px]"
          >
            <span>LET&apos;S WORK</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px] xs:text-[10px] sm:text-[11px] text-[#6F7682] tracking-[0.08em] uppercase">
          <Compass className="w-3.5 h-3.5 text-[#8FB8E8]" />
          <span>{IDENTITY.location}</span>
        </div>
      </div>
    </section>
  );
};
