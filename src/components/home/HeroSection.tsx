import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Compass, MapPin } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';
import { getSiteSettings, getAboutData } from '../../services/portfolioDataService';
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

  const availabilityMessage =
    settings?.availability?.message ||
    'OPEN FOR SELECT COMMISSIONS';

  const locationText =
    settings?.contactDetails?.location ||
    'MAU, UP, INDIA';

  const profileImageUrl =
    settings?.home?.profileImage?.trim() ||
    (settings as any)?.homeContent?.profileImage?.trim() ||
    about?.profileImage?.trim() ||
    '';

  const siteDisplayName =
    settings?.siteName ? settings.siteName.split('//')[0].trim() : 'SAURABH';

  const studioName =
    settings?.happicore?.name || 'HAPPICORE';

  return (
    <section
      id="home-hero"
      className="relative w-full min-h-[calc(100vh-4rem)] lg:min-h-screen bg-[#000000] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-10"
    >
      {/* Subtle ambient lighting - very soft and non-distracting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px] bg-gradient-to-b from-[#8FB8E8]/20 via-[#F5A623]/10 to-transparent"
        aria-hidden="true"
      />

      {/* TOP ROW: Availability + Academic & Location Metadata (Mobile/Desktop friendly) */}
      <div className="w-full max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4 z-20 pb-4 border-b border-[#17191D]/80">
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-[#A7ADB7]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A623]"></span>
          </span>
          <span className="text-[#F2F4F7] font-semibold">{availabilityStatus}</span>
          <span className="text-[#22252A]">•</span>
          <span className="text-[#6F7682]">{availabilityMessage}</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.1em] text-[#6F7682] uppercase">
          <span className="hidden sm:inline-block">IIT MADRAS // DATA SCIENCE</span>
          <span className="hidden sm:inline-block text-[#22252A]">•</span>
          <span className="flex items-center gap-1 text-[#A7ADB7]">
            <MapPin className="w-3 h-3 text-[#F5A623]" />
            {locationText}
          </span>
        </div>
      </div>

      {/* CENTER EDITORIAL COMPOSITION: Asymmetric Columns + Integrated Portrait + Giant Typography */}
      <div className="w-full max-w-[1360px] mx-auto my-auto relative py-6 lg:py-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative">
          
          {/* LEFT COLUMN: Discipline Breakdown & Craft Metadata */}
          <div className="order-2 lg:order-1 lg:col-span-3 space-y-6 text-left">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8FB8E8] block">
                [01 / DISCIPLINE]
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                VIDEO EDITOR
              </h3>
              <p className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
                CINEMATIC RHYTHM & PACING
              </p>
            </div>

            <div className="h-px w-12 bg-[#22252A]" />

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                GRAPHIC DESIGNER
              </h3>
              <p className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
                EDITORIAL & TYPOGRAPHY
              </p>
            </div>

            <div className="h-px w-12 bg-[#22252A]" />

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                WEB DEVELOPER
              </h3>
              <p className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
                CLEAN INTERACTIVE EXPERIENCES
              </p>
            </div>
          </div>

          {/* CENTER: Integrated Portrait with Editorial 'HEY, I'M' script */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Editorial Greeting: 'HEY, I'M' */}
            <div className="w-full text-center lg:text-left lg:absolute lg:-top-6 lg:left-8 z-30 pointer-events-none mb-4 lg:mb-0">
              <span className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#E8EEF7]/90 tracking-wide select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Hey, I&apos;m
              </span>
            </div>

            {/* Seamless Portrait Container - NO CARDS, NO BROWSER FRAMES, PURE INTEGRATION */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[410px] aspect-[3/4] mx-auto select-none bg-[#000000]">
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

          {/* RIGHT COLUMN: Education, Coordinates & Tech Credentials */}
          <div className="order-3 lg:col-span-3 space-y-6 text-left lg:text-right">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5A623] block">
                [02 / EDUCATION & TECH]
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                BS DATA SCIENCE
              </h3>
              <p className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
                IIT MADRAS (2022–PRESENT)
              </p>
            </div>

            <div className="h-px w-12 bg-[#22252A] lg:ml-auto" />

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6F7682] block">
                LOCATION
              </span>
              <p className="font-mono text-[12px] text-[#F2F4F7] uppercase tracking-wider">
                {locationText}
              </p>
              <p className="font-mono text-[11px] text-[#6F7682]">
                ORIGIN: {IDENTITY.coordinates}
              </p>
            </div>

            <div className="h-px w-12 bg-[#22252A] lg:ml-auto" />

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5A623] block">
                ● FREELANCE STATUS
              </span>
              <p className="font-mono text-[12px] text-[#F2F4F7] uppercase tracking-wider font-semibold">
                {availabilityStatus}
              </p>
              <p className="font-mono text-[11px] text-[#6F7682]">
                CREATIVE STUDIO: {studioName}
              </p>
            </div>
          </div>

        </div>

        {/* OVERSIZED TYPOGRAPHY: 'SAURABH' ACROSS FULL HERO WIDTH */}
        <div className="w-full text-center relative mt-2 lg:-mt-10 z-20 pointer-events-none">
          <h1 className="font-heading font-extrabold text-[15vw] sm:text-[14vw] lg:text-[14.5vw] text-[#F2F4F7] uppercase tracking-[-0.04em] leading-[0.8] select-none">
            {siteDisplayName}
          </h1>
        </div>
      </div>

      {/* BOTTOM ROW: Refined Text-Arrow Links + Technical Geographic Coordinates */}
      <div className="w-full max-w-[1360px] mx-auto pt-6 border-t border-[#17191D]/80 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.1em]">
          <button
            onClick={onExploreWork}
            className="group inline-flex items-center gap-1.5 text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors duration-200 cursor-pointer"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
          </button>
          <span className="text-[#22252A]">/</span>
          <button
            onClick={onContactClick}
            className="group inline-flex items-center gap-1.5 text-[#A7ADB7] hover:text-[#F2F4F7] transition-colors duration-200 cursor-pointer"
          >
            <span>LET&apos;S WORK</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5 text-[#F5A623]" />
          </button>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-[#6F7682] tracking-[0.08em] uppercase">
          <Compass className="w-3.5 h-3.5 text-[#8FB8E8]" />
          <span>{IDENTITY.coordinates}</span>
        </div>
      </div>
    </section>
  );
};
