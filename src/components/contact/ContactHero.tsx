import React from 'react';

export const ContactHero: React.FC = () => {
  return (
    <div className="pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#17191D]">
      {/* Editorial Index / Category Stamp */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#F5A623]">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] inline-block animate-pulse" />
          <span>INQUIRIES &amp; COLLABORATION</span>
          <span className="text-[#6F7682]">/</span>
          <span className="text-[#8FB8E8]">05 // CONTACT</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#080808] border border-[#22252A] rounded font-mono text-[10px] text-[#A7ADB7] tracking-wider uppercase">
          <span className="text-[#8FB8E8]">●</span>
          <span>RESPONSE SLA: WITHIN 24 HOURS</span>
        </div>
      </div>

      {/* Main Title & Supporting Statement */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-[#F2F4F7] uppercase leading-[0.95] sm:leading-[0.9] break-words">
          LET&apos;S CREATE SOMETHING.
        </h1>
        <p className="font-body text-base sm:text-lg text-[#A7ADB7] leading-relaxed max-w-2xl">
          Have a project, collaboration or opportunity in mind? I&apos;d love to hear about it. Whether it&apos;s high-tempo video editing, brand identity graphics, or a fast modern website.
        </p>
      </div>
    </div>
  );
};
