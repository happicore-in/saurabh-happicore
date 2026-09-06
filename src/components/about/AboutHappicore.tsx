import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { ABOUT_PROFILE } from '../../data/aboutData';
import { getSiteSettings } from '../../services/portfolioDataService';
import { AdminSiteSettings } from '../../types/admin';

export const AboutHappicore: React.FC = () => {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const s = await getSiteSettings();
        if (isMounted && s) setSettings(s);
      } catch (err) {
        console.warn('AboutHappicore load error:', err);
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

  const studioName = settings?.happicore?.name || 'Happicore';
  const rawUrl = settings?.happicore?.url || ABOUT_PROFILE.happicoreUrl;
  const cleanUrl = rawUrl.replace(/^https?:\/\//, '');
  const externalHref = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
  const description =
    settings?.happicore?.shortDescription ||
    `${studioName} is my creative workspace where I share more of my design, video and digital work. Here, ideas develop without client constraints—testing cutting-edge web frameworks, kinetic typography, and editorial layouts.`;
  const buttonLabel = settings?.happicore?.buttonText || `VISIT ${studioName.toUpperCase()}`;

  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Heading & Description */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#F5A623]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              <span>INDEPENDENT LAB // {studioName.toUpperCase()}</span>
              <span className="text-[#6F7682]">/</span>
              <span className="text-[#A7ADB7]">MORE OF MY WORK</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F2F4F7] uppercase tracking-tight">
              {studioName}: The Digital Playground &amp; Experimental Atelier
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#A7ADB7] leading-relaxed max-w-2xl">
              <strong className="text-[#F2F4F7] font-semibold">{studioName}</strong> (
              <a
                href={externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8FB8E8] hover:underline"
              >
                {cleanUrl}
              </a>
              ) {description.includes(studioName) ? description.replace(studioName, '') : `is ${description}`}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-[#0D0D0D] border border-[#1C1F24] rounded-full font-mono text-[10px] text-[#A7ADB7] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
                Graphic Experiments
              </span>
              <span className="px-3 py-1 bg-[#0D0D0D] border border-[#1C1F24] rounded-full font-mono text-[10px] text-[#A7ADB7] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                Visual Essays
              </span>
              <span className="px-3 py-1 bg-[#0D0D0D] border border-[#1C1F24] rounded-full font-mono text-[10px] text-[#A7ADB7] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
                Creative Engineering
              </span>
            </div>
          </div>

          {/* Right: Workspace Card & Visit Button */}
          <div className="lg:col-span-4 bg-[#0D0D0D] border border-[#1C1F24] rounded-[6px] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
                <span>WORKSPACE URL</span>
                <span className="text-[#F5A623] font-bold">LIVE R&amp;D</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#F2F4F7]">
                Explore {studioName}
              </h3>
              <p className="font-mono text-xs text-[#8FB8E8]">
                {cleanUrl}
              </p>
            </div>

            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors group cursor-pointer shadow-lg"
            >
              <span>{buttonLabel}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
