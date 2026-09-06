import React from 'react';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';

interface WorkCTAProps {
  onContactClick?: () => void;
}

export const WorkCTA: React.FC<WorkCTAProps> = ({ onContactClick }) => {
  return (
    <div className="w-full bg-[#080808] border border-[#22252A] rounded-[8px] p-8 sm:p-12 mb-16 text-center">
      <div className="max-w-2xl mx-auto space-y-5">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block">
          COLLABORATION // 2026
        </span>

        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight">
          HAVE A PROJECT IN MIND?
        </h2>

        <p className="font-body text-base text-[#A7ADB7] leading-relaxed max-w-lg mx-auto">
          Let's create something useful, engaging and visually strong.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-[12px] font-bold uppercase tracking-[0.1em] rounded-[4px] transition-transform hover:scale-[1.02] cursor-pointer shadow-lg"
          >
            <span>LET'S WORK</span>
            <ArrowRight className="w-4 h-4 text-[#000000]" />
          </button>

          <a
            href={`mailto:${IDENTITY.emailWork}?subject=Project%20Inquiry%20via%20Work%20Page`}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-[12px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#8FB8E8]" />
            <span>EMAIL DIRECTLY</span>
          </a>
        </div>
      </div>
    </div>
  );
};
