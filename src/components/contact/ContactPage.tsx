import React from 'react';
import { ContactHero } from './ContactHero';
import { ContactLeftColumn } from './ContactLeftColumn';
import { ContactEnquiryForm } from './ContactEnquiryForm';
import { ContactDirectCTA } from './ContactDirectCTA';
import { ContactServicesPills } from './ContactServicesPills';
import { ContactFAQ } from './ContactFAQ';
import { ContactClosingCTA } from './ContactClosingCTA';

interface ContactPageProps {
  onNavigate?: (navId: string) => void;
  onShowNotice?: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onShowNotice,
}) => {
  const handleScrollToForm = () => {
    const el = document.getElementById('project-enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#000000] text-[#F2F4F7] min-h-screen">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pb-20">
        
        {/* ========================================================
            1. CONTACT HERO
            ======================================================== */}
        <ContactHero />

        {/* ========================================================
            2. MAIN DUAL-COLUMN LAYOUT (DESKTOP) / STACKED (MOBILE)
               LEFT: Availability, Contact channels, LinkedIn, Studio Desk
               RIGHT: Project Dispatch Intake Form
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 5 Cols on LG */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ContactLeftColumn onShowNotice={onShowNotice} />
          </div>

          {/* Right Column: 7 Cols on LG */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactEnquiryForm onSuccessNotice={onShowNotice} />
          </div>
        </div>

        {/* ========================================================
            3. DIRECT CONTACT FAST-TRACK CTA
            ======================================================== */}
        <ContactDirectCTA />

        {/* ========================================================
            4. QUICK PROJECT TYPES / ARCHIVE REPOSITORIES
            ======================================================== */}
        <ContactServicesPills onNavigate={onNavigate} />

        {/* ========================================================
            5. PROTOCOLS & FREQUENTLY ASKED QUESTIONS
            ======================================================== */}
        <ContactFAQ />

        {/* ========================================================
            6. FINAL CLOSING CTA
            ======================================================== */}
        <ContactClosingCTA onScrollToForm={handleScrollToForm} />

      </div>
    </div>
  );
};
