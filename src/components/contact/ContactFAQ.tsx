import React from 'react';
import { Clock, Network, Landmark } from 'lucide-react';

export const ContactFAQ: React.FC = () => {
  const faqs = [
    {
      icon: Clock,
      label: 'TURNAROUND TIMES',
      question: 'What kind of projects do you work on?',
      answer:
        'Video editing, graphic design and web development projects. Standard short-form video reels and motion edits take 24–48 hours. Comprehensive web architectures or full graphic identity packages typically operate in 1–3 week focused sprint cycles.',
      tag: '● RUSH DELIVERY AVAILABLE ON DEMAND',
    },
    {
      icon: Network,
      label: 'COLLABORATION PIPELINE',
      question: 'Can I hire you for a complete project?',
      answer:
        'Yes, depending on scope and timeline. Seamlessly operating across Indian time zones via high-bandwidth optical sync for uncompressed ProRes rushes, Frame.io review cuts, Figma live canvases, and GitHub pull requests.',
      tag: '● HIGH-SPEED FIBER • FRAME.IO ENABLED',
    },
    {
      icon: Landmark,
      label: 'ASSET TRANSFER & REFS',
      question: 'How can I share project references?',
      answer:
        'Add links directly into the enquiry form or describe them in the brief field. Google Drive folders, Figma boards, YouTube unlisted cuts, or Instagram references are immediately welcomed.',
      tag: '● ACADEMIC & BRAND PARTNERSHIPS OPEN',
    },
  ];

  return (
    <div className="space-y-6 pt-6 border-t border-[#17191D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8FB8E8]">
            02 // TRANSPARENT ENGAGEMENT
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS &amp; PROTOCOLS
          </h3>
        </div>
        <p className="font-body text-xs text-[#A7ADB7] max-w-sm">
          Standard operational workflows for clients, production teams, and collegiate initiatives across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {faqs.map((faq, idx) => {
          const Icon = faq.icon;
          return (
            <div
              key={idx}
              className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-9 h-9 rounded bg-[#17191D] border border-[#262A32] flex items-center justify-center text-[#8FB8E8]">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7682]">
                    {faq.label}
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-[#F2F4F7] tracking-tight">
                    {faq.question}
                  </h4>
                </div>

                <p className="font-body text-xs text-[#A7ADB7] leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="pt-3 border-t border-[#17191D] font-mono text-[9px] tracking-wider text-[#F5A623] uppercase">
                {faq.tag}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
