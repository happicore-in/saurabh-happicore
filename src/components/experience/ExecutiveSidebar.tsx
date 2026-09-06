import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import workspaceImg from '../../assets/images/happicore_workspace_1788625252800.jpg';

export const ExecutiveSidebar: React.FC = () => {
  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      {/* 1. EXECUTIVE SUMMARY CARD */}
      <div className="p-6 sm:p-8 bg-[#080808] border border-[#22252A] rounded-[8px] space-y-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5A623] block mb-2 font-semibold">
            EXECUTIVE SUMMARY
          </span>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] leading-snug tracking-tight">
            Bridging Creative Art Direction &amp; Technological Frameworks.
          </h3>
        </div>

        <p className="font-body text-sm text-[#A7ADB7] leading-relaxed">
          Across consecutive athletic cycles, campus marathons, and collegiate league broadcasts, I have owned the lifecycle from typography spec and high-density motion reels to web portal architecture.
        </p>

        {/* Core Pillars Checkmarks */}
        <div className="space-y-3 pt-2 border-t border-[#17191D]">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#8FB8E8] shrink-0 mt-0.5" />
            <span className="font-body text-xs sm:text-[13px] text-[#F2F4F7]">
              Unified design systems for broadcast &amp; social
            </span>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#8FB8E8] shrink-0 mt-0.5" />
            <span className="font-body text-xs sm:text-[13px] text-[#F2F4F7]">
              Dynamic player auctions &amp; tournament branding
            </span>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#8FB8E8] shrink-0 mt-0.5" />
            <span className="font-body text-xs sm:text-[13px] text-[#F2F4F7]">
              Multi-chapter field coordination &amp; coverage
            </span>
          </div>
        </div>
      </div>

      {/* 2. STUDIO AT WORK CARD */}
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] overflow-hidden group hover:border-[#343842] transition-colors">
        <div className="p-4 border-b border-[#17191D] flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
            STUDIO AT WORK
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
          <img
            src={workspaceImg}
            alt="The Sportify Atelier — Creative &amp; Technical Production Desk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
        </div>

        <div className="p-5 space-y-1.5">
          <h4 className="font-heading font-bold text-sm sm:text-base text-[#F2F4F7] uppercase tracking-wide">
            The Sportify Atelier
          </h4>
          <p className="font-body text-xs text-[#6F7682] leading-relaxed">
            Delivering rapid-turnaround motion reels, real-time scoreboards, and physical apparel graphics.
          </p>
        </div>
      </div>
    </div>
  );
};
