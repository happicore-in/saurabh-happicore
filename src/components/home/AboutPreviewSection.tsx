import React, { useState, useEffect } from 'react';
import { ArrowRight, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';
import { getAboutData, getSiteSettings, resolveAuthoritativeProfileImage } from '../../services/portfolioDataService';
import { AdminAboutData, AdminSiteSettings } from '../../types/admin';

interface AboutPreviewSectionProps {
  onMoreAboutClick?: () => void;
}

export const AboutPreviewSection: React.FC<AboutPreviewSectionProps> = ({ onMoreAboutClick }) => {
  const [about, setAbout] = useState<AdminAboutData | null>(null);
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const [location, setLocation] = useState<string>('MAU, UP, INDIA');
  const [availability, setAvailability] = useState<string>(IDENTITY.availability);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageHasFailed, setImageHasFailed] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [a, s] = await Promise.all([getAboutData(), getSiteSettings()]);
        if (isMounted) {
          if (a) setAbout(a);
          if (s) setSettings(s);
          if (s?.contactDetails?.location) setLocation(s.contactDetails.location);
          if (s?.availability?.status) setAvailability(s.availability.status);
          setImageHasFailed(false);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('AboutPreviewSection load error:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const profileImg = resolveAuthoritativeProfileImage(about, settings);
  const quoteTitle = about?.name || 'Saurabh';
  const roleText = about?.tagline || 'Video Editor, Graphic Designer and Web Developer';
  const institution = about?.education?.institution || 'IIT Madras';
  const degree = about?.education?.degree || 'BS Degree in Data Science & Applications';
  const bioIntro =
    about?.bio && about.bio.length > 0
      ? about.bio[0]
      : 'I work across visuals, video and web to create clean and engaging digital experiences. My process balances technical precision with aesthetic intuition.';
  const bioSecond =
    about?.bio && about.bio.length > 1
      ? about.bio[1]
      : 'Whether cutting high-octane aftermovies with tight rhythmic sync, designing identity systems and event posters with deliberate typography, or engineering modern responsive web interfaces, I focus on work that feels authentic, energetic, and durable.';

  return (
    <section id="about" className="w-full bg-[#000000] py-16 sm:py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block">
              04 / ABOUT
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              A LITTLE ABOUT ME
            </h2>
          </div>
          <p className="font-body text-base text-[#A7ADB7] max-w-md">
            The intersection of analytical rigor, video rhythm, and digital interface design.
          </p>
        </div>

        {/* TWO-COLUMN EDITORIAL COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center pt-8 sm:pt-12">
          
          {/* LEFT: Portrait in Editorial Frame */}
          <div className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative bg-[#080808] border border-[#22252A] rounded-[8px] p-3 overflow-hidden group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-[#0D0D0D]">
                {isLoading ? (
                  <div className="w-full h-full bg-[#0D0D0D] flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-[#22252A] border-t-[#8FB8E8]/40 animate-spin" />
                  </div>
                ) : profileImg && !imageHasFailed ? (
                  <img
                    src={profileImg}
                    alt={`${quoteTitle} — Portrait`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageHasFailed(true)}
                    className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0D0D0D]" />
                )}
                
                {/* Viewfinder corner lines */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#8FB8E8]/60 pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#8FB8E8]/60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#8FB8E8]/60 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#8FB8E8]/60 pointer-events-none" />
              </div>

              {/* Technical Caption underneath */}
              <div className="pt-3 px-1 flex items-center justify-between font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
                <span>FIG 01. // PORTRAIT</span>
                <span>{location.split(',')[0]} • {institution.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Bio Statement & Technical Credentials */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Primary Quote */}
              <blockquote className="font-heading font-medium text-xl sm:text-3xl text-[#F2F4F7] leading-snug tracking-[-0.01em]">
                &ldquo;I&apos;m <span className="text-[#8FB8E8] font-bold">{quoteTitle}</span>, a {roleText} currently pursuing {degree} from <span className="text-[#F5A623] font-bold">{institution}</span>.&rdquo;
              </blockquote>

              {/* Second Statement */}
              <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed">
                {bioIntro}
              </p>

              <p className="font-body text-[15px] text-[#6F7682] leading-relaxed">
                {bioSecond}
              </p>
            </div>

            {/* Structured Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#17191D]">
              <div className="bg-[#080808] border border-[#22252A] p-3.5 rounded space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-[#F5A623]" />
                  <span>ORIGIN</span>
                </div>
                <p className="font-heading font-bold text-[13px] text-[#F2F4F7] uppercase tracking-wide truncate">
                  {location}
                </p>
              </div>

              <div className="bg-[#080808] border border-[#22252A] p-3.5 rounded space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
                  <GraduationCap className="w-3 h-3 text-[#8FB8E8]" />
                  <span>EDUCATION</span>
                </div>
                <p className="font-heading font-bold text-[13px] text-[#F2F4F7] uppercase tracking-wide truncate" title={`${institution} (${degree})`}>
                  {institution.toUpperCase()}
                </p>
              </div>

              <div className="bg-[#080808] border border-[#22252A] p-3.5 rounded space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#F5A623]" />
                  <span>AVAILABILITY</span>
                </div>
                <p className="font-heading font-bold text-[13px] text-[#F5A623] uppercase tracking-wide truncate">
                  {availability}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onMoreAboutClick}
                className="group inline-flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors cursor-pointer"
              >
                <span>MORE ABOUT ME</span>
                <ArrowRight className="w-4 h-4 text-[#8FB8E8] transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
