import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Copy, ExternalLink, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { IDENTITY } from '../../design-system/tokens';
import { getSiteSettings } from '../../services/portfolioDataService';
import { AdminSiteSettings } from '../../types/admin';
import studioDeskImg from '../../assets/images/happicore_workspace_1788625252800.jpg';

interface ContactLeftColumnProps {
  onShowNotice?: (msg: string) => void;
}

export const ContactLeftColumn: React.FC<ContactLeftColumnProps> = ({ onShowNotice }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const s = await getSiteSettings();
        if (isMounted && s) setSettings(s);
      } catch (err) {
        console.warn('ContactLeftColumn load error:', err);
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

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    if (onShowNotice) onShowNotice(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const location = settings?.contactDetails?.location || IDENTITY.location;
  const phone = settings?.contactDetails?.phone || IDENTITY.phone;
  const whatsappNum = settings?.contactDetails?.whatsappNumber || phone.replace(/[^\d]/g, '');
  const emailPersonal =
    settings?.contactDetails?.personalEmail ||
    settings?.primaryEmail ||
    IDENTITY.emailPersonal;
  const emailWork =
    settings?.contactDetails?.workEmail ||
    IDENTITY.emailWork;
  const linkedinUrl =
    settings?.socialLinks?.linkedin ||
    settings?.contactDetails?.linkedin ||
    IDENTITY.linkedin;
  const linkedinUsername = linkedinUrl.split('/in/')[1]?.replace(/\/$/, '') || 'saurabh-0732a8372';
  const happicoreName = settings?.happicore?.name || 'Happicore';
  const happicoreUrl = settings?.happicore?.url || IDENTITY.website;
  const cleanHappicoreUrl = happicoreUrl.replace(/^https?:\/\//, '');
  const fullHappicoreUrl = happicoreUrl.startsWith('http') ? happicoreUrl : `https://${happicoreUrl}`;
  const availabilityStatus =
    settings?.availability?.status || 'CURRENTLY AVAILABLE FOR FREELANCE & COMMISSIONS';

  return (
    <div className="space-y-6">
      
      {/* ========================================================
          1. AVAILABILITY STATUS CARD
          ======================================================== */}
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
          <span>OPERATIONAL STATUS</span>
          <span className="text-[#8FB8E8]">UTC+05:30 IST</span>
        </div>

        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30 font-mono text-xs text-[#F5A623] font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
          <span>● {availabilityStatus.toUpperCase()}</span>
        </div>

        <div className="flex items-start gap-2.5 pt-1 text-xs font-mono text-[#A7ADB7]">
          <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
          <span>{location} • Open for pan-India &amp; global remote collaborations</span>
        </div>
      </div>

      {/* ========================================================
          2. CONTACT INFORMATION CARDS
          ======================================================== */}
      <div className="space-y-3">
        
        {/* Phone & WhatsApp */}
        <div className="p-4 sm:p-5 bg-[#080808] hover:bg-[#0C0E11] border border-[#22252A] hover:border-[#343842] rounded-[8px] transition-colors group">
          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
            <span>PHONE &amp; WHATSAPP</span>
            <button
              onClick={() => handleCopy(phone, 'Phone number')}
              className="flex items-center gap-1 text-[#8FB8E8] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              title="Copy phone number"
            >
              {copiedKey === 'Phone number' ? (
                <>
                  <Check className="w-3 h-3 text-[#52BD95]" />
                  <span className="text-[9px] text-[#52BD95]">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[9px]">COPY</span>
                </>
              )}
            </button>
          </div>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="font-heading font-extrabold text-xl sm:text-2xl text-[#F2F4F7] tracking-tight hover:text-[#8FB8E8] transition-colors block"
          >
            {phone}
          </a>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#17191D] text-[11px] font-mono text-[#6F7682]">
            <span>Click to dial or initiate high-priority dialog</span>
            <a
              href={`https://wa.me/${whatsappNum.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8FB8E8] hover:underline"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>

        {/* Personal Email */}
        <div className="p-4 sm:p-5 bg-[#080808] hover:bg-[#0C0E11] border border-[#22252A] hover:border-[#343842] rounded-[8px] transition-colors group">
          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
            <span>PERSONAL DISPATCH</span>
            <button
              onClick={() => handleCopy(emailPersonal, 'Personal Email')}
              className="flex items-center gap-1 text-[#8FB8E8] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              title="Copy personal email"
            >
              {copiedKey === 'Personal Email' ? (
                <>
                  <Check className="w-3 h-3 text-[#52BD95]" />
                  <span className="text-[9px] text-[#52BD95]">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[9px]">COPY</span>
                </>
              )}
            </button>
          </div>

          <a
            href={`mailto:${emailPersonal}`}
            className="font-mono text-sm sm:text-base font-bold text-[#F2F4F7] hover:text-[#F5A623] transition-colors break-all block"
          >
            {emailPersonal}
          </a>

          <p className="font-body text-[11px] text-[#6F7682] mt-1.5">
            General queries, mentorship, and creative conversations
          </p>
        </div>

        {/* Work Email */}
        <div className="p-4 sm:p-5 bg-[#080808] hover:bg-[#0C0E11] border border-[#22252A] hover:border-[#343842] rounded-[8px] transition-colors group">
          <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
            <span>WORK &amp; COMMISSIONS</span>
            <button
              onClick={() => handleCopy(emailWork, 'Work Email')}
              className="flex items-center gap-1 text-[#8FB8E8] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              title="Copy work email"
            >
              {copiedKey === 'Work Email' ? (
                <>
                  <Check className="w-3 h-3 text-[#52BD95]" />
                  <span className="text-[9px] text-[#52BD95]">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[9px]">COPY</span>
                </>
              )}
            </button>
          </div>

          <a
            href={`mailto:${emailWork}`}
            className="font-mono text-sm sm:text-base font-bold text-[#F5A623] hover:text-[#FFFFFF] transition-colors break-all block"
          >
            {emailWork}
          </a>

          <p className="font-body text-[11px] text-[#6F7682] mt-1.5">
            Dedicated inbox for agency productions &amp; enterprise client sprints
          </p>
        </div>

        {/* LinkedIn & Happicore Row */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#080808] hover:bg-[#0C0E11] border border-[#22252A] hover:border-[#8FB8E8]/50 rounded-[8px] transition-colors group"
          >
            <div className="flex items-center justify-between font-mono text-[9px] text-[#6F7682] uppercase mb-1">
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8FB8E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-mono text-xs font-bold text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-colors truncate">
              {linkedinUsername}
            </div>
            <div className="font-mono text-[10px] text-[#6F7682] mt-0.5">
              Professional Network
            </div>
          </a>

          <a
            href={fullHappicoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#080808] hover:bg-[#0C0E11] border border-[#22252A] hover:border-[#F5A623]/50 rounded-[8px] transition-colors group"
          >
            <div className="flex items-center justify-between font-mono text-[9px] text-[#6F7682] uppercase mb-1">
              <span>WORKSPACE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-mono text-xs font-bold text-[#F5A623] group-hover:text-[#FFFFFF] transition-colors truncate">
              {cleanHappicoreUrl}
            </div>
            <div className="font-mono text-[10px] text-[#6F7682] mt-0.5">
              {happicoreName} Atelier
            </div>
          </a>
        </div>

      </div>

      {/* ========================================================
          3. STUDIO DESK VISUAL CARD
          ======================================================== */}
      <div className="relative bg-[#080808] border border-[#22252A] rounded-[8px] p-3 overflow-hidden group">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-[#0D0D0D]">
          <img
            src={studioDeskImg}
            alt="Saurabh Production Studio Desk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-xs font-mono">
            <div>
              <span className="text-[9px] uppercase tracking-[0.14em] text-[#A7ADB7] block">
                STUDIO DESK
              </span>
              <span className="font-bold text-[#F2F4F7] text-xs">
                Digital Craft Hub • {location.split(',')[0]}
              </span>
            </div>
            <span className="px-2 py-0.5 bg-[#8FB8E8]/20 border border-[#8FB8E8]/40 text-[#8FB8E8] rounded font-bold text-[9px] uppercase">
              ACTIVE RIG
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

