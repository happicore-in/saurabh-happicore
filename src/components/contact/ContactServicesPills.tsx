import React from 'react';
import { ArrowRight, Film, Globe, Palette } from 'lucide-react';

interface ContactServicesPillsProps {
  onNavigate?: (navId: string) => void;
}

export const ContactServicesPills: React.FC<ContactServicesPillsProps> = ({ onNavigate }) => {
  const services = [
    {
      id: '/video',
      navId: 'video',
      tag: 'DISCIPLINE 01',
      title: 'VIDEO EDITING',
      desc: 'Aftermovies, YouTube storytelling, high-retention reels & event recaps',
      icon: Film,
      color: '#F5A623',
    },
    {
      id: '/web',
      navId: 'web',
      tag: 'DISCIPLINE 02',
      title: 'WEB ARCHITECTURE',
      desc: 'High-performance React/Vite frontends, interactive UI/UX & portfolios',
      icon: Globe,
      color: '#8FB8E8',
    },
    {
      id: '/graphic',
      navId: 'graphic',
      tag: 'DISCIPLINE 03',
      title: 'GRAPHIC DESIGN',
      desc: 'Event posters, comprehensive visual systems, branding & vector assets',
      icon: Palette,
      color: '#F5A623',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6F7682]">
          EXPLORE DEDICATED WORK ARCHIVES
        </div>
        <span className="font-mono text-[10px] text-[#A7ADB7]">3 ACTIVE DOMAINS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <button
              key={srv.id}
              onClick={() => onNavigate && onNavigate(srv.navId)}
              className="p-5 bg-[#080808] hover:bg-[#0E1014] border border-[#22252A] hover:border-[#383E4A] rounded-[8px] text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7682]">
                    {srv.tag}
                  </span>
                  <div className="p-1.5 rounded bg-[#17191D] text-[#A7ADB7] group-hover:text-[#FFFFFF] transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-extrabold text-lg text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-colors tracking-tight">
                    {srv.title}
                  </h4>
                  <p className="font-body text-xs text-[#A7ADB7] mt-1 line-clamp-2">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#17191D] flex items-center justify-between font-mono text-[11px] text-[#8FB8E8] group-hover:translate-x-1 transition-transform">
                <span>VIEW REPOSITORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
