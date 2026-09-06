import React from 'react';
import { WEB_APPROACH_POINTS } from '../../data/webProjects';

export const WebApproachSection: React.FC = () => {
  return (
    <div className="w-full my-16 py-12 border-y border-[#17191D] bg-[#050505]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block">
              ENGINEERING PHILOSOPHY
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight">
              HOW I BUILD
            </h2>
            <p className="font-body text-sm text-[#A7ADB7] leading-relaxed max-w-sm pt-1">
              Methodical interface design paired with robust full-stack web standards.
            </p>
          </div>

          {/* Right Column: 3 Concise Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {WEB_APPROACH_POINTS.map((item) => (
              <div
                key={item.number}
                className="p-6 bg-[#0A0A0A] border border-[#1F2228] rounded-[6px] space-y-3"
              >
                <div className="font-mono text-[13px] text-[#8FB8E8] font-bold">
                  {item.number}
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#F2F4F7] uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#A7ADB7] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
