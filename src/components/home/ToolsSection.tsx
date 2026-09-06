import React from 'react';
import { Layers, Terminal, Sparkles, Sliders, Scissors, Video, Palette, Code, Flame, GitBranch } from 'lucide-react';

export const ToolsSection: React.FC = () => {
  const creativeTools = [
    {
      name: 'CapCut',
      role: 'Short-form pacing, audio ducking, viral social reels',
      type: 'VIDEO',
      icon: Scissors,
      tag: 'MOBILE & DESKTOP',
    },
    {
      name: 'Adobe Premiere Pro',
      role: 'Multi-cam editing, lumetri color grading, dynamic sound design',
      type: 'NLE SUITE',
      icon: Video,
      tag: 'INDUSTRY STANDARD',
    },
    {
      name: 'Photoshop',
      role: 'Thumbnail composition, texture blending, photo manipulation',
      type: 'RASTER GRAPHICS',
      icon: Layers,
      tag: 'IMAGE POST-PRODUCTION',
    },
    {
      name: 'Alight Motion',
      role: 'Keyframe curve animation, visual motion graphics, typography transitions',
      type: 'MOTION GRAPHICS',
      icon: Sliders,
      tag: 'VECTOR ANIMATION',
    },
    {
      name: 'Canva',
      role: 'Rapid brand asset prototyping, social grid templates, pitch decks',
      type: 'LAYOUT & COLLAB',
      icon: Palette,
      tag: 'RAPID COMPOSITION',
    },
  ];

  const devTools = [
    {
      name: 'HTML5 & Semantic Web',
      role: 'Accessible document structure, SEO markup, ARIA standards',
      type: 'CORE WEB',
      icon: Code,
      tag: 'FOUNDATION',
    },
    {
      name: 'CSS3 / Tailwind CSS',
      role: 'Utility-first styling, design system tokens, responsive breakpoints',
      type: 'STYLING ENGINE',
      icon: Sparkles,
      tag: 'RESPONSIVE UI',
    },
    {
      name: 'JavaScript (ES6+)',
      role: 'Asynchronous event loops, DOM manipulation, client logic',
      type: 'SCRIPTING',
      icon: Terminal,
      tag: 'DYNAMIC RUNTIME',
    },
    {
      name: 'React.js',
      role: 'Component architecture, reactive state management, virtual DOM',
      type: 'FRAMEWORK',
      icon: Code,
      tag: 'APPLICATION UI',
    },
    {
      name: 'Firebase',
      role: 'Authentication, Firestore realtime database, cloud storage',
      type: 'BACKEND AS SERVICE',
      icon: Flame,
      tag: 'CLOUD BACKEND',
    },
    {
      name: 'Git & GitHub',
      role: 'Version control, atomic commits, branch workflows, deployment pipelines',
      type: 'VERSION CONTROL',
      icon: GitBranch,
      tag: 'COLLABORATION',
    },
  ];

  return (
    <section id="tools" className="w-full bg-[#000000] py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block">
              03 / TOOLS & TECHNOLOGIES
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              TOOLS I USE
            </h2>
          </div>
          <p className="font-body text-base text-[#A7ADB7] max-w-md">
            Production-tested creative software and modern web development stack. No fluff, just daily drivers.
          </p>
        </div>

        {/* TWO DISTINCT CATEGORY GROUPS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
          
          {/* GROUP 1: VIDEO / DESIGN SUITE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wide">
                  VIDEO & DESIGN SUITE
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#6F7682] uppercase">
                5 PRODUCTION APPS
              </span>
            </div>

            <div className="space-y-3">
              {creativeTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group bg-[#080808] border border-[#22252A] hover:border-[#F5A623]/40 rounded-[6px] p-4 transition-all duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded bg-[#0D0D0D] border border-[#22252A] flex items-center justify-center text-[#A7ADB7] group-hover:text-[#F5A623] group-hover:border-[#F5A623]/30 transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-base text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] truncate">
                          {tool.name}
                        </h4>
                        <p className="font-mono text-[11px] text-[#6F7682] truncate">
                          {tool.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="font-mono text-[10px] text-[#A7ADB7] bg-[#0D0D0D] px-2 py-0.5 border border-[#22252A] rounded uppercase tracking-wider">
                        {tool.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GROUP 2: WEB & DEVELOPMENT SUITE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8FB8E8]" />
                <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wide">
                  WEB & CODE TECH
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#6F7682] uppercase">
                6 WEB TECHNOLOGIES
              </span>
            </div>

            <div className="space-y-3">
              {devTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group bg-[#080808] border border-[#22252A] hover:border-[#8FB8E8]/40 rounded-[6px] p-4 transition-all duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded bg-[#0D0D0D] border border-[#22252A] flex items-center justify-center text-[#A7ADB7] group-hover:text-[#8FB8E8] group-hover:border-[#8FB8E8]/30 transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-base text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#FFFFFF] truncate">
                          {tool.name}
                        </h4>
                        <p className="font-mono text-[11px] text-[#6F7682] truncate">
                          {tool.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="font-mono text-[10px] text-[#A7ADB7] bg-[#0D0D0D] px-2 py-0.5 border border-[#22252A] rounded uppercase tracking-wider">
                        {tool.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
