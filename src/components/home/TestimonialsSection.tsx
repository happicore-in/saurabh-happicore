import React, { useState, useEffect } from 'react';
import { Quote, Database, ShieldCheck } from 'lucide-react';
import { AdminTestimonial } from '../../types/admin';
import {
  getPublicTestimonials,
  BASELINE_TESTIMONIALS,
} from '../../services/portfolioDataService';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(BASELINE_TESTIMONIALS);

  const loadTestimonials = async () => {
    try {
      const data = await getPublicTestimonials();
      if (data && data.length > 0) {
        setTestimonials(data);
      }
    } catch {
      // Fallback kept intact
    }
  };

  useEffect(() => {
    loadTestimonials();

    const handleDataUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (!customEvt.detail?.type || customEvt.detail.type === 'testimonials' || customEvt.detail.type === 'all') {
        loadTestimonials();
      }
    };

    window.addEventListener('portfolio_data_updated', handleDataUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleDataUpdate);
  }, []);

  return (
    <section id="testimonials" className="w-full bg-[#000000] py-16 sm:py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
              <span>06 / TESTIMONIALS</span>
              <span className="text-[#22252A]">•</span>
              <span className="text-[#6F7682]">CLIENT & COLLABORATOR FEEDBACK</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              WHAT PEOPLE SAY
            </h2>
          </div>
          
          {/* Admin Dashboard Integration Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#080808] border border-[#22252A] rounded font-mono text-[10px] sm:text-[11px] text-[#A7ADB7]">
            <Database className="w-3.5 h-3.5 text-[#8FB8E8]" />
            <span>CONNECTS TO ADMIN DASHBOARD</span>
          </div>
        </div>

        {/* DYNAMIC EDITORIAL TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#080808] border border-[#22252A] rounded-[8px] p-5 sm:p-7 flex flex-col justify-between space-y-6 sm:space-y-8 hover:border-[#8FB8E8]/30 transition-colors"
            >
              {/* Quote Top */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 text-[#8FB8E8]/60" />
                  <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-widest border border-[#22252A] px-2 py-0.5 rounded">
                    [{item.slotLabel || `SLOT 0${idx + 1}`}]
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
                  {item.verified !== false && <ShieldCheck className="w-3.5 h-3.5 text-[#8FB8E8]" />}
                </div>
                <p className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
                  {item.role && item.organization
                    ? `${item.role} • ${item.organization}`
                    : item.organization || item.role || ''}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
