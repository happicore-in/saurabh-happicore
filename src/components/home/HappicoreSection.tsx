import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, FolderGit2, Video, Palette } from 'lucide-react';
import workspaceImg from '../../assets/images/happicore_workspace_1788625252800.jpg';
import { IDENTITY } from '../../design-system/tokens';
import { getSiteSettings } from '../../services/portfolioDataService';
import { AdminSiteSettings } from '../../types/admin';

export const HappicoreSection: React.FC = () => {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const s = await getSiteSettings();
        if (isMounted) setSettings(s);
      } catch (err) {
        console.warn('HappicoreSection settings load error:', err);
      }
    };

    loadSettings();

    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.type === 'settings') {
        loadSettings();
      }
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const studioName = settings?.happicore?.name || 'HAPPICORE';
  const studioDesc =
    settings?.happicore?.description ||
    'Happicore serves as my open creative workspace — an ongoing archive of unfiltered creative output, rapid prototypes, typographic research, and social-first video reels.';
  const studioUrl = settings?.happicore?.url || IDENTITY.website;
  const cleanUrl = studioUrl.replace(/^https?:\/\//, '');
  const externalHref = studioUrl.startsWith('http') ? studioUrl : `https://${studioUrl}`;

  return (
    <section id="happicore" className="w-full bg-[#000000] py-16 sm:py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block">
              05 / CREATIVE WORKSPACE
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              MORE OF MY WORK — {studioName}
            </h2>
          </div>
          <p className="font-body text-base text-[#A7ADB7] max-w-md">
            My personal creative studio and digital laboratory where I publish visual experiments, posters, and motion explorations.
          </p>
        </div>

        {/* WORKSPACE SHOWCASE: Image + Studio Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch pt-8 sm:pt-12">
          
          {/* Visual Workspace Image */}
          <div className="lg:col-span-7 relative group rounded-[8px] overflow-hidden border border-[#22252A] bg-[#080808]">
            <div className="relative aspect-[4/3] w-full h-full min-h-[260px] sm:min-h-[340px] overflow-hidden bg-[#0D0D0D]">
              <img
                src={workspaceImg}
                alt={`${studioName} Creative Studio Setup`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-[#000000]/80 backdrop-blur-md border border-[#22252A] rounded-full font-mono text-[10px] sm:text-[11px] text-[#F2F4F7] uppercase">
                <Sparkles className="w-3 h-3 text-[#F5A623]" />
                <span>{studioName} CREATIVE LAB</span>
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#A7ADB7] backdrop-blur-sm bg-[#000000]/70 p-2.5 sm:p-3 rounded border border-[#22252A]">
                <span className="truncate max-w-[200px] sm:max-w-none">URL: {cleanUrl}</span>
                <span className="text-[#8FB8E8]">ACTIVE REPOSITORY</span>
              </div>
            </div>
          </div>

          {/* Studio Profile & Activities */}
          <div className="lg:col-span-5 bg-[#080808] border border-[#22252A] rounded-[8px] p-5 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#8FB8E8] uppercase tracking-[0.14em]">
                  INDEPENDENT STUDIO
                </span>
                <span className="font-mono text-[11px] text-[#6F7682] uppercase">
                  EST. 2024
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide">
                {studioName}
              </h3>

              <p className="font-body text-[14px] sm:text-[15px] text-[#A7ADB7] leading-relaxed">
                {studioDesc}
              </p>

              {/* Exploration pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-[13px] text-[#F2F4F7]">
                  <Palette className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Graphic Experiments:</span>
                    <span className="text-[#A7ADB7] ml-1.5">Editorial posters, album covers, and type anatomy studies.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[13px] text-[#F2F4F7]">
                  <Video className="w-4 h-4 text-[#8FB8E8] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Motion Rhythms:</span>
                    <span className="text-[#A7ADB7] ml-1.5">Sound design syncing, micro-transitions, and color lookup tables.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[13px] text-[#F2F4F7]">
                  <FolderGit2 className="w-4 h-4 text-[#A7ADB7] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Bespoke Web:</span>
                    <span className="text-[#A7ADB7] ml-1.5">Interactive digital sandboxes and UI component labs.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Happicore button */}
            <div className="pt-6 border-t border-[#17191D]">
              <a
                href={externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 bg-[#E8EEF7] hover:bg-[#FFFFFF] text-[#050505] font-mono text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] rounded-[4px] transition-colors text-center"
              >
                <span>VISIT {studioName} ({cleanUrl})</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] shrink-0" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
