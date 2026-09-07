import React from 'react';
import { Film, Layout, Code2, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onServiceSelect?: (serviceKey: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServiceSelect }) => {
  const services = [
    {
      index: '01',
      id: 'video',
      title: 'VIDEO EDITING',
      subtitle: 'CINEMATIC RHYTHM & PACING',
      description:
        'End-to-end video editing for live events, brand promotions, high-retention social media reels, and energetic festival aftermovies with sharp sound design.',
      icon: Film,
      tags: ['EVENT AFTERMOVIES', 'PROMOTIONAL REELS', 'RHYTHMIC CUTTING', 'COLOR GRADING'],
      highlight: 'Turn raw multicam footage into immersive, beat-synced visual stories.',
    },
    {
      index: '02',
      id: 'graphic',
      title: 'GRAPHIC DESIGN',
      subtitle: 'EDITORIAL & TYPOGRAPHY',
      description:
        'Visceral event posters, social media creatives, visual identities, and promotional graphics executed with deliberate typographic hierarchy and disciplined negative space.',
      icon: Layout,
      tags: ['EDITORIAL POSTERS', 'SOCIAL CREATIVES', 'BRAND IDENTITY', 'TYPOGRAPHY'],
      highlight: 'Design systems and graphics that command attention without unnecessary visual noise.',
    },
    {
      index: '03',
      id: 'web',
      title: 'WEB DEVELOPMENT',
      subtitle: 'CLEAN INTERACTIVE EXPERIENCES',
      description:
        'Modern, high-performance responsive web applications and digital interfaces built with modern web technologies, modular code, and fluid user interactions.',
      icon: Code2,
      tags: ['REACT ARCHITECTURE', 'RESPONSIVE SYSTEMS', 'TAILWIND STYLING', 'CLEAN CODE'],
      highlight: 'Fast, accessible, and responsive interfaces that feel tactile and intuitive.',
    },
  ];

  return (
    <section id="services" className="w-full bg-[#000000] py-16 sm:py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block">
              02 / SERVICES & CAPABILITIES
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              WHAT I DO
            </h2>
          </div>
          <p className="font-body text-base text-[#A7ADB7] max-w-md">
            Specialized craft across visual pacing, static editorial design, and modern interactive code.
          </p>
        </div>

        {/* THREE COLUMNS OF SPECIALIZED CRAFT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.index}
                onClick={() => onServiceSelect?.(svc.id)}
                className="group relative bg-[#080808] border border-[#22252A] rounded-[8px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#8FB8E8]/50 hover:bg-[#0C0E11] cursor-pointer"
              >
                {/* Top Number + Icon */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-bold text-[#6F7682] group-hover:text-[#8FB8E8] transition-colors">
                      {svc.index}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#22252A] flex items-center justify-between p-2.5 text-[#A7ADB7] group-hover:text-[#F2F4F7] group-hover:border-[#8FB8E8]/40 transition-colors">
                      <Icon className="w-full h-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6F7682] block">
                      {svc.subtitle}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#8FB8E8] transition-colors">
                      {svc.title}
                    </h3>
                  </div>

                  <p className="font-body text-[14px] text-[#A7ADB7] leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2 border-t border-[#17191D]">
                    <p className="font-mono text-[11px] text-[#8FB8E8]/90 italic">
                      &ldquo;{svc.highlight}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Tags & Arrow */}
                <div className="pt-8 mt-6 border-t border-[#17191D] space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#0D0D0D] border border-[#22252A] text-[#6F7682] group-hover:text-[#A7ADB7] text-[10px] font-mono uppercase tracking-wider rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.1em] text-[#6F7682] group-hover:text-[#F2F4F7] pt-2">
                    <span>EXPLORE CAPABILITY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8FB8E8]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
