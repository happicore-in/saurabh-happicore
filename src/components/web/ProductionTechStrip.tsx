import React from 'react';
import { CORE_WEB_TECHNOLOGIES } from '../../data/webProjects';

export const ProductionTechStrip: React.FC = () => {
  return (
    <div className="w-full my-12 p-6 sm:p-8 bg-[#080808] border border-[#17191D] rounded-[8px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.16em] block">
            CORE TOOLSET & ENGINE
          </span>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F2F4F7] uppercase tracking-wide">
            Production Grade Technologies
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {CORE_WEB_TECHNOLOGIES.map((item) => (
            <div
              key={item.name}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#000000] border border-[#22252A] font-mono text-[11px] text-[#F2F4F7]"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.dotColor }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
