import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';

interface VideoCTAProps {
  onContactClick?: () => void;
}

export const VideoCTA: React.FC<VideoCTAProps> = ({ onContactClick }) => {
  return (
    <div className="w-full my-16 bg-[#080808] border border-[#22252A] rounded-[8px] p-8 sm:p-12 lg:p-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading & Text */}
        <div className="lg:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#F5A623]">
            <span>🎬</span>
            <span>HAVE A VIDEO PROJECT?</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-tight leading-tight">
            LET&apos;S TURN YOUR FOOTAGE INTO<br className="hidden sm:inline" /> SOMETHING WORTH WATCHING.
          </h2>

          <p className="font-body text-sm sm:text-base text-[#A7ADB7] leading-relaxed max-w-xl">
            Available for festival aftermovies, high-tempo sports recap edits, promotional event launches, and vertical short-form retained reels.
          </p>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-[#F5A623] hover:bg-[#E5991C] text-[#000000] font-mono text-[12px] font-bold uppercase tracking-[0.1em] rounded-[4px] transition-transform hover:scale-[1.02] cursor-pointer shadow-xl"
          >
            <span>LET&apos;S WORK</span>
            <ArrowRight className="w-4 h-4 text-[#000000]" />
          </button>

          <a
            href={`mailto:${IDENTITY.emailWork}?subject=Video%20Editing%20Project%20Inquiry`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-[11px] uppercase tracking-[0.08em] rounded-[4px] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#8FB8E8]" />
            <span>EMAIL DIRECTLY</span>
          </a>
        </div>
      </div>
    </div>
  );
};
