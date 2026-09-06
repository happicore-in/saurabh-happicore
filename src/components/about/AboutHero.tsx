import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { ABOUT_PROFILE } from '../../data/aboutData';
import { getAboutData, getSiteSettings } from '../../services/portfolioDataService';

export const AboutHero: React.FC = () => {
  const [coords, setCoords] = useState<string>(ABOUT_PROFILE.coordinates);
  const [subheading, setSubheading] = useState<string>(
    'Video editor, graphic designer and web developer focused on turning ideas into clear visual and digital experiences.'
  );

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [about, settings] = await Promise.all([getAboutData(), getSiteSettings()]);
        if (isMounted) {
          if (settings?.contactDetails?.location) {
            setCoords(settings.contactDetails.location);
          } else if (about?.location) {
            setCoords(about.location);
          }
          if (about?.shortIntro) {
            setSubheading(about.shortIntro);
          }
        }
      } catch (err) {
        console.warn('AboutHero load error:', err);
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

  return (
    <div className="pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#17191D]">
      {/* Editorial Index / Category Stamp & Geolocation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
          <span className="w-2 h-2 rounded-full bg-[#8FB8E8] inline-block animate-pulse" />
          <span>DISCIPLINE DOSSIER // 04</span>
          <span className="text-[#6F7682]">/</span>
          <span className="text-[#A7ADB7]">ABOUT</span>
        </div>

        {/* Geolocation metadata from reference */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#080808] border border-[#22252A] rounded font-mono text-[10px] text-[#A7ADB7] tracking-wider uppercase">
          <MapPin className="w-3 h-3 text-[#F5A623]" />
          <span>{coords}</span>
        </div>
      </div>

      {/* Main Title & Supporting Statement */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-[#F2F4F7] uppercase leading-[0.9]">
          ABOUT ME
        </h1>
        <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed max-w-2xl">
          {subheading}
        </p>
      </div>
    </div>
  );
};
