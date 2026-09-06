import React from 'react';
import { Quote, Database, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  // Configured placeholder slots designed for Admin Dashboard population (Part 10)
  const testimonialSlots = [
    {
      slotId: 'SLOT 01',
      status: 'ADMIN EDITABLE',
      quote:
        'Saurabh brought immense rhythmic energy to our event aftermovie. The pacing was flawless, and the turnaround time exceeded all our expectations.',
      name: 'Event Lead / Festival Producer',
      organization: 'Cultural Festival Organization',
      verified: true,
    },
    {
      slotId: 'SLOT 02',
      status: 'ADMIN EDITABLE',
      quote:
        'The social promotional graphics and posters created for our campaign had an authentic editorial feel that stood out cleanly in feeds and boosted engagement.',
      name: 'Marketing Director',
      organization: 'Digital Brand Agency',
      verified: true,
    },
    {
      slotId: 'SLOT 03',
      status: 'ADMIN EDITABLE',
      quote:
        'A rare hybrid of sharp technical development and aesthetic sensitivity. The website was delivered clean, responsive, and completely on brand.',
      name: 'Startup Founder',
      organization: 'Tech Venture Studio',
      verified: true,
    },
  ];

  return (
    <section id="testimonials" className="w-full bg-[#000000] py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
              <span>06 / TESTIMONIALS</span>
              <span className="text-[#22252A]">•</span>
              <span className="text-[#6F7682]">CLIENT & COLLABORATOR FEEDBACK</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              WHAT PEOPLE SAY
            </h2>
          </div>
          
          {/* Admin Dashboard Integration Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#080808] border border-[#22252A] rounded font-mono text-[11px] text-[#A7ADB7]">
            <Database className="w-3.5 h-3.5 text-[#8FB8E8]" />
            <span>CONNECTS TO ADMIN DASHBOARD</span>
          </div>
        </div>

        {/* THREE EDITORIAL TESTIMONIAL SLOTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {testimonialSlots.map((item) => (
            <div
              key={item.slotId}
              className="bg-[#080808] border border-[#22252A] rounded-[8px] p-7 flex flex-col justify-between space-y-8 hover:border-[#8FB8E8]/30 transition-colors"
            >
              {/* Quote Top */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 text-[#8FB8E8]/60" />
                  <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-widest border border-[#22252A] px-2 py-0.5 rounded">
                    [{item.slotId}]
                  </span>
                </div>

                <p className="font-body text-[14.5px] text-[#F2F4F7] leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Organization Bottom */}
              <div className="pt-4 border-t border-[#17191D] space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-[14px] text-[#F2F4F7] uppercase tracking-wide">
                    {item.name}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8FB8E8]" />
                </div>
                <p className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
                  {item.organization}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
