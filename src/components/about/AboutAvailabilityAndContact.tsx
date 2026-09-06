import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, Sparkles } from 'lucide-react';
import { ABOUT_PROFILE } from '../../data/aboutData';
import { getSiteSettings, getAboutData } from '../../services/portfolioDataService';
import { AdminSiteSettings } from '../../types/admin';

interface AboutAvailabilityAndContactProps {
  onContactClick: () => void;
}

export const AboutAvailabilityAndContact: React.FC<AboutAvailabilityAndContactProps> = ({ onContactClick }) => {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const [availabilityStatus, setAvailabilityStatus] = useState<string>('AVAILABLE FOR WORK');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [s, a] = await Promise.all([getSiteSettings(), getAboutData()]);
        if (isMounted) {
          if (s) setSettings(s);
          if (s?.availability?.status) {
            setAvailabilityStatus(s.availability.status);
          } else if (a?.availabilityStatus) {
            setAvailabilityStatus(a.availabilityStatus);
          }
        }
      } catch (err) {
        console.warn('AboutAvailabilityAndContact load error:', err);
      }
    };

    load();

    const handleUpdate = () => {
      load();
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const phone = settings?.contactDetails?.phone || ABOUT_PROFILE.phone;
  const personalEmail =
    settings?.contactDetails?.personalEmail ||
    settings?.primaryEmail ||
    ABOUT_PROFILE.personalEmail;
  const workEmail =
    settings?.contactDetails?.workEmail ||
    ABOUT_PROFILE.workEmail;

  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ========================================================
            LEFT: AVAILABILITY OVERVIEW & ACTION
            ======================================================== */}
        <div className="lg:col-span-6 bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30 font-mono text-[10px] text-[#F5A623] uppercase tracking-wider font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span>● {availabilityStatus}</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-tight">
              {availabilityStatus}
            </h3>

            <p className="font-body text-xs sm:text-sm text-[#A7ADB7] leading-relaxed">
              Open to freelance projects, creative collaborations and selected web, video and graphic design opportunities.
            </p>
          </div>

          <button
            onClick={onContactClick}
            className="self-start inline-flex items-center gap-2 py-3 px-6 bg-[#8FB8E8] hover:bg-[#A6C8F0] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors group cursor-pointer shadow-md"
          >
            <span>LET&apos;S WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* ========================================================
            RIGHT: COMPACT DIRECT CONTACT CHANNELS
            ======================================================== */}
        <div className="lg:col-span-6 bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682] block">
              DIRECT CHANNELS
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-tight">
              CONTACT DETAILS
            </h3>
          </div>

          <div className="space-y-3">
            {/* Phone Item */}
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-3.5 bg-[#0D0D0D] hover:bg-[#111317] border border-[#1C1F24] hover:border-[#8FB8E8]/50 rounded-[6px] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#17191D] flex items-center justify-center text-[#8FB8E8]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7682] block">
                    PHONE
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] text-[#F2F4F7] font-semibold group-hover:text-[#8FB8E8] transition-colors">
                    {phone}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#6F7682] group-hover:text-[#8FB8E8] uppercase tracking-wider">
                DIAL →
              </span>
            </a>

            {/* Personal Email */}
            <a
              href={`mailto:${personalEmail}`}
              className="flex items-center justify-between p-3.5 bg-[#0D0D0D] hover:bg-[#111317] border border-[#1C1F24] hover:border-[#8FB8E8]/50 rounded-[6px] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#17191D] flex items-center justify-center text-[#F5A623]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7682] block">
                    PERSONAL EMAIL
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] text-[#F2F4F7] font-semibold group-hover:text-[#F5A623] transition-colors">
                    {personalEmail}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#6F7682] group-hover:text-[#F5A623] uppercase tracking-wider">
                WRITE →
              </span>
            </a>

            {/* Work Email */}
            <a
              href={`mailto:${workEmail}`}
              className="flex items-center justify-between p-3.5 bg-[#0D0D0D] hover:bg-[#111317] border border-[#1C1F24] hover:border-[#8FB8E8]/50 rounded-[6px] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#17191D] flex items-center justify-center text-[#8FB8E8]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7682] block">
                    WORK EMAIL
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] text-[#F2F4F7] font-semibold group-hover:text-[#8FB8E8] transition-colors">
                    {workEmail}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#6F7682] group-hover:text-[#8FB8E8] uppercase tracking-wider">
                WRITE →
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

