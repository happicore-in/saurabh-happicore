import React from 'react';
import { Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  GRAPHIC_APPROACH_PRINCIPLES,
  TOOLKIT_ITEMS,
  PREPRESS_FIDELITY,
} from '../../data/graphicProjects';

export const GraphicApproachSection: React.FC = () => {
  return (
    <div className="w-full my-16 space-y-12">
      {/* ========================================================
          1. DESIGN SYSTEM FIDELITY BAR
          ======================================================== */}
      <div className="p-5 bg-[#080808] border border-[#22252A] rounded-[6px] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#0D0D0D] border border-[#22252A] text-[#8FB8E8]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-[#F2F4F7] uppercase tracking-wider">
              DESIGN SYSTEM FIDELITY
            </div>
            <div className="text-[10px] text-[#A7ADB7] hidden sm:block">
              Strict compliance with bleed safety, Pantone spot swatches, and pixel-grid rendering.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] uppercase text-[#6F7682]">
          {PREPRESS_FIDELITY.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span>{item.label}:</span>
              <span className="text-[#8FB8E8] font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          2. DESIGN APPROACH (3 CONCISE PRINCIPLES)
          ======================================================== */}
      <div className="py-10 border-y border-[#17191D] space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#17191D]">
          <div className="flex items-center gap-2">
            <span className="text-[#8FB8E8] font-mono text-sm">☵</span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide">
              DESIGN APPROACH
            </h2>
          </div>

          <div className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
            METHODOLOGY // 03 CORE PILLARS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GRAPHIC_APPROACH_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-6 bg-[#080808] border border-[#1F2228] hover:border-[#8FB8E8]/40 rounded-[6px] transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#8FB8E8] font-bold">
                  {principle.number} //
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6F7682]" />
              </div>

              <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wide">
                {principle.label}
              </h3>

              <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. DESIGN ARSENAL & TOOLKIT (FROM REFERENCE GRAPHIC WORK.PNG)
          ======================================================== */}
      <div className="space-y-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#F5A623] uppercase tracking-[0.16em]">
              <span>●</span>
              <span>STACK SPECIFICATION</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-tight">
              DESIGN ARSENAL &amp; TOOLKIT
            </h3>
          </div>

          <div className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
            VERSION CONTROL: PROD 2026.1
          </div>
        </div>

        <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] max-w-2xl leading-relaxed">
          Engineered visual output requiring rigorous execution across raster manipulation, scalable vector structures, rapid client iteration, and flawless commercial print output.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {TOOLKIT_ITEMS.map((tool) => (
            <div
              key={tool.name}
              className="p-5 bg-[#080808] border border-[#1F2228] hover:border-[#8FB8E8]/40 rounded-[6px] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-[#F2F4F7]">
                    {tool.name}
                  </h4>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#111111] border border-[#22252A] text-[#8FB8E8] font-bold">
                    {tool.badge}
                  </span>
                </div>

                <p className="font-body text-[11px] text-[#A7ADB7] leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#17191D] font-mono text-[10px] text-[#8FB8E8] tracking-wider">
                {tool.expertise}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
