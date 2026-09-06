import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ContactClosingCTAProps {
  onScrollToForm?: () => void;
}

export const ContactClosingCTA: React.FC<ContactClosingCTAProps> = ({ onScrollToForm }) => {
  const handleClick = () => {
    if (onScrollToForm) {
      onScrollToForm();
    } else {
      const el = document.getElementById('project-enquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="pt-6 border-t border-[#17191D]">
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5A623]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>READY WHEN YOU ARE</span>
          </div>

          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-tight">
            HAVE A PROJECT IN MIND?
          </h3>

          <p className="font-body text-xs sm:text-sm text-[#A7ADB7] max-w-lg mx-auto">
            Send the details and let&apos;s discuss what we can build together. From rapid turnaround festival cuts to complete digital identity systems.
          </p>

          <div className="pt-2">
            <button
              onClick={handleClick}
              className="inline-flex items-center gap-2 py-3 px-7 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-all hover:scale-[1.02] cursor-pointer shadow-lg"
            >
              <span>SEND AN ENQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
