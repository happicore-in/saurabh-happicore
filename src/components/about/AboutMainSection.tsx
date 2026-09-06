import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import portraitImg from '../../assets/images/saurabh_portrait_1788625229418.jpg';
import { ABOUT_PROFILE } from '../../data/aboutData';
import { getAboutData, getSiteSettings } from '../../services/portfolioDataService';
import { AdminAboutData, AdminSiteSettings } from '../../types/admin';

export const AboutMainSection: React.FC = () => {
  const [about, setAbout] = useState<AdminAboutData | null>(null);
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [a, s] = await Promise.all([getAboutData(), getSiteSettings()]);
        if (isMounted) {
          if (a) setAbout(a);
          if (s) setSettings(s);
        }
      } catch (err) {
        console.warn('AboutMainSection load error:', err);
      }
    };

    load();

    const handleUpdate = () => {
      load();
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const imageSrc = about?.profileImage || portraitImg;
  const name = settings?.siteName || 'Saurabh';
  const location = settings?.contactDetails?.location || about?.location || ABOUT_PROFILE.location;
  const city = location.split(',')[0] || 'Mau';
  const institution = about?.education?.institution || ABOUT_PROFILE.education.institution;
  const degree = about?.education?.degree || ABOUT_PROFILE.education.degree;
  const happicoreName = settings?.happicore?.name || 'Happicore';
  const availability = about?.availabilityStatus || settings?.availability?.status || ABOUT_PROFILE.availability;
  const focusText =
    about?.focusAreas && about.focusAreas.length > 0
      ? about.focusAreas.join(' • ')
      : ABOUT_PROFILE.focus;

  // Bio split or fallback
  const bioParagraphs = about?.aboutDescription
    ? about.aboutDescription.split('\n\n').filter(Boolean)
    : [ABOUT_PROFILE.bioParagraph1, ABOUT_PROFILE.bioParagraph2];

  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* ========================================================
            LEFT COLUMN: PORTRAIT IN TECHNICAL EDITORIAL FRAME
            ======================================================== */}
        <div className="lg:col-span-5 relative">
          <div className="relative bg-[#080808] border border-[#22252A] rounded-[8px] p-3 sm:p-4 overflow-hidden group hover:border-[#343842] transition-colors">
            
            {/* Top Frame Tech Header */}
            <div className="flex items-center justify-between pb-3 px-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
              <span className="text-[#A7ADB7] font-semibold">POS.01 // {name.toUpperCase()}</span>
              <span className="px-2 py-0.5 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] rounded font-bold text-[9px]">
                2026 // ACTIVE
              </span>
            </div>

            {/* Portrait Container */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[4px] bg-[#0D0D0D]">
              <img
                src={imageSrc}
                alt={`${name} — Video Editor, Graphic Designer & Web Developer`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Viewfinder corner brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#8FB8E8]/60 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#8FB8E8]/60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#8FB8E8]/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#8FB8E8]/60 pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Caption Card at bottom */}
            <div className="mt-3 p-3.5 bg-[#0D0D0D] border border-[#1C1F24] rounded-[6px] flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-[#F2F4F7] uppercase tracking-wide">
                  {name}
                </h3>
                <p className="font-mono text-[11px] text-[#8FB8E8] uppercase tracking-wider">
                  Director of Craft // Multi-Discipline
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/40 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: EDITORIAL BIOGRAPHY & QUICK PROFILE
            ======================================================== */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
              <span className="px-2 py-0.5 bg-[#8FB8E8]/10 border border-[#8FB8E8]/30 rounded font-bold text-[9px]">
                BIOGRAPHY
              </span>
              <span className="text-[#6F7682]">/ /</span>
              <span className="text-[#A7ADB7]">Precision Across Film, Identity &amp; Code</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F2F4F7] uppercase tracking-tight leading-snug">
              {about?.shortIntro || 'Bridging raw conceptual intuition with digital engineering and editorial clarity.'}
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 font-body text-sm sm:text-base text-[#A7ADB7] leading-relaxed">
            {bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Quick Profile Summary Blocks (Matching Reference Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-[#080808] border border-[#22252A] rounded-[6px] space-y-1">
              <span className="font-mono text-[9px] text-[#6F7682] uppercase tracking-[0.14em] block">
                ACADEMIC TRACK
              </span>
              <div className="font-heading font-bold text-sm text-[#F2F4F7] truncate">
                {degree.includes('Data Science') ? 'Data Science' : degree}
              </div>
              <div className="font-mono text-[10px] text-[#8FB8E8] truncate">
                {institution}
              </div>
            </div>

            <div className="p-4 bg-[#080808] border border-[#22252A] rounded-[6px] space-y-1">
              <span className="font-mono text-[9px] text-[#6F7682] uppercase tracking-[0.14em] block">
                BASE STUDIO
              </span>
              <div className="font-heading font-bold text-sm text-[#F2F4F7] truncate">
                {city}
              </div>
              <div className="font-mono text-[10px] text-[#A7ADB7]">
                Pan-India Reach
              </div>
            </div>

            <div className="p-4 bg-[#080808] border border-[#22252A] rounded-[6px] space-y-1">
              <span className="font-mono text-[9px] text-[#6F7682] uppercase tracking-[0.14em] block">
                CREATIVE SANDBOX
              </span>
              <div className="font-heading font-bold text-sm text-[#F5A623] truncate">
                {happicoreName}
              </div>
              <div className="font-mono text-[10px] text-[#A7ADB7]">
                Independent R&amp;D
              </div>
            </div>
          </div>

          {/* Section 4 Quick Profile Details Grid */}
          <div className="p-5 sm:p-6 bg-[#080808] border border-[#22252A] rounded-[8px] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em] block mb-1">
                BASED IN
              </span>
              <p className="font-body text-xs sm:text-[13px] text-[#F2F4F7] font-medium">
                {location}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em] block mb-1">
                EDUCATION
              </span>
              <p className="font-body text-xs sm:text-[13px] text-[#F2F4F7] font-medium">
                {degree} • {institution}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em] block mb-1">
                CORE FOCUS
              </span>
              <p className="font-body text-xs sm:text-[13px] text-[#F2F4F7] font-medium">
                {focusText}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em] block mb-1">
                AVAILABILITY
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                <p className="font-body text-xs sm:text-[13px] text-[#F5A623] font-semibold">
                  {availability}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
