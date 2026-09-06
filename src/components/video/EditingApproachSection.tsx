import React from 'react';
import { Volume2, Sparkles, Activity, Layers } from 'lucide-react';
import { EDITING_APPROACH_PRINCIPLES, PRODUCTION_SPECS } from '../../data/videoProjects';

export const EditingApproachSection: React.FC = () => {
  const icons = [
    <Activity className="w-4 h-4 text-[#8FB8E8]" />,
    <Sparkles className="w-4 h-4 text-[#F5A623]" />,
    <Volume2 className="w-4 h-4 text-[#8FB8E8]" />,
  ];

  return (
    <div className="w-full my-16 py-12 border-y border-[#17191D] bg-[#050505]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Top Header & Software Suite */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#17191D]">
          <div className="flex items-center gap-3">
            <span className="text-[#F5A623] font-mono text-sm">☵</span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide">
              HOW I EDIT // EDITING METHODOLOGY
            </h2>
          </div>

          <div className="px-3 py-1 bg-[#0A0A0A] border border-[#22252A] rounded-[4px] font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
            SUITE: CAPCUT PC • PREMIERE PRO • DAVINCI RESOLVE
          </div>
        </div>

        {/* 3 Concise Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EDITING_APPROACH_PRINCIPLES.map((item, idx) => (
            <div
              key={item.number}
              className="p-6 bg-[#080808] border border-[#1F2228] hover:border-[#F5A623]/40 rounded-[6px] transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#F5A623] font-bold">
                  {item.number} //
                </span>
                {icons[idx] || <Layers className="w-4 h-4 text-[#8FB8E8]" />}
              </div>

              <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wide">
                {item.label}
              </h3>

              <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Export & Broadcast Delivery Strip */}
        <div className="pt-4 border-t border-[#17191D] flex flex-wrap items-center justify-between gap-y-3 gap-x-6 font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
          {PRODUCTION_SPECS.map((spec) => (
            <div key={spec.label} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
              <span>{spec.label}:</span>
              <span className="text-[#F2F4F7]">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
