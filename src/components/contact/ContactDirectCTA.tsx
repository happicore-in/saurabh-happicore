import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, MessageSquare, Phone } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';
import { getSiteSettings } from '../../services/portfolioDataService';
import { AdminSiteSettings } from '../../types/admin';

export const ContactDirectCTA: React.FC = () => {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const s = await getSiteSettings();
        if (isMounted && s) setSettings(s);
      } catch (err) {
        console.warn('ContactDirectCTA load error:', err);
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

  const phone = settings?.contactDetails?.phone || IDENTITY.phone;
  const emailWork = settings?.contactDetails?.workEmail || IDENTITY.emailWork;
  const whatsappNum = settings?.contactDetails?.whatsappNumber || phone.replace(/[^\d]/g, '');

  return (
    <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-1 max-w-xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8FB8E8]">
          FAST-TRACK COMMUNICATIONS
        </div>
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-tight">
          PREFER A DIRECT MESSAGE?
        </h3>
        <p className="font-body text-xs sm:text-sm text-[#A7ADB7]">
          Skip the form and reach out immediately via direct phone, WhatsApp chat, or priority work inbox.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#F2F4F7]">
            <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F2F4F7]">
            <Mail className="w-3.5 h-3.5 text-[#8FB8E8]" />
            <span>{emailWork}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <a
          href={`https://wa.me/${whatsappNum.replace(/[^\d]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0D0D0D] hover:bg-[#16181D] border border-[#22252A] hover:border-[#F5A623]/50 text-[#F2F4F7] hover:text-[#F5A623] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CALL / WHATSAPP →</span>
        </a>

        <a
          href={`mailto:${emailWork}`}
          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0D0D0D] hover:bg-[#16181D] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] hover:text-[#8FB8E8] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>EMAIL →</span>
        </a>
      </div>
    </div>
  );
};

