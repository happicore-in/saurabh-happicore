import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { IDENTITY, NAVIGATION_ITEMS } from '../design-system/tokens';
import { getSiteSettings } from '../services/portfolioDataService';
import { AdminSiteSettings } from '../types/admin';

interface FooterProps {
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const s = await getSiteSettings();
        if (isMounted && s) setSettings(s);
      } catch (err) {
        console.warn('Footer load settings error:', err);
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

  const handleNav = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const brandName = settings?.siteName || IDENTITY.name;
  const happicoreName = settings?.happicore?.name || IDENTITY.workspace;
  const rawHappicoreUrl = settings?.happicore?.url || IDENTITY.website;
  const cleanHappicoreUrl = rawHappicoreUrl.replace(/^https?:\/\//, '');
  const fullHappicoreUrl = rawHappicoreUrl.startsWith('http') ? rawHappicoreUrl : `https://${rawHappicoreUrl}`;
  const phone = settings?.contactDetails?.phone || IDENTITY.phone;
  const emailWork = settings?.contactDetails?.workEmail || IDENTITY.emailWork;
  const emailPersonal =
    settings?.contactDetails?.personalEmail ||
    settings?.primaryEmail ||
    IDENTITY.emailPersonal;
  const linkedinUrl =
    settings?.socialLinks?.linkedin ||
    settings?.contactDetails?.linkedin ||
    IDENTITY.linkedin;
  const copyright = settings?.footerCopyright || IDENTITY.copyright;

  return (
    <footer id="global-footer" className="w-full bg-[#000000] border-t border-[#17191D] pt-16 pb-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand Identity & Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#17191D]">
          {/* Col 1: Identity & Roles */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#F2F4F7] tracking-[0.04em] uppercase">
              {brandName}
            </h2>
            <div className="space-y-1 font-mono text-[13px] text-[#A7ADB7] tracking-[0.1em] uppercase">
              {IDENTITY.disciplines.map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <span className="text-[#6F7682] text-[10px]">■</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-[14px] text-[#6F7682] max-w-sm pt-2">
              Creative workspace: <span className="text-[#F2F4F7] font-mono">{happicoreName}</span> (<a href={fullHappicoreUrl} target="_blank" rel="noopener noreferrer" className="text-[#8FB8E8] hover:underline">{cleanHappicoreUrl}</a>)
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6F7682]">
              NAVIGATION
            </div>
            <ul className="space-y-2 font-mono text-[13px] uppercase tracking-[0.08em] text-[#A7ADB7]">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNav(item.id, e)}
                    className="hover:text-[#F2F4F7] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Inquiries & Contact */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6F7682]">
              DIRECT INQUIRIES
            </div>

            <div className="space-y-2.5 font-mono text-[12px] text-[#A7ADB7]">
              {/* Phone */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#6F7682]" />
                <span>{phone}</span>
              </a>

              {/* Work Email */}
              <div className="space-y-0.5 pt-1">
                <span className="text-[10px] text-[#6F7682] uppercase tracking-wider block">WORK EMAIL:</span>
                <a
                  href={`mailto:${emailWork}`}
                  className="flex items-center gap-2 text-[#F2F4F7] hover:text-[#8FB8E8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#6F7682]" />
                  <span>{emailWork}</span>
                </a>
              </div>

              {/* Personal Email */}
              <div className="space-y-0.5 pt-1">
                <span className="text-[10px] text-[#6F7682] uppercase tracking-wider block">PERSONAL EMAIL:</span>
                <a
                  href={`mailto:${emailPersonal}`}
                  className="flex items-center gap-2 text-[#A7ADB7] hover:text-[#F2F4F7] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#6F7682]" />
                  <span>{emailPersonal}</span>
                </a>
              </div>
            </div>

            {/* Social / Contact links */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.1em]">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#F2F4F7] hover:text-[#8FB8E8] px-2.5 py-1 bg-[#080808] border border-[#22252A] rounded-[4px] transition-colors"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={fullHappicoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#F2F4F7] hover:text-[#8FB8E8] px-2.5 py-1 bg-[#080808] border border-[#22252A] rounded-[4px] transition-colors"
              >
                <span>{happicoreName.toUpperCase()}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={`mailto:${emailWork}`}
                className="inline-flex items-center gap-1 text-[#F2F4F7] hover:text-[#8FB8E8] px-2.5 py-1 bg-[#080808] border border-[#22252A] rounded-[4px] transition-colors"
              >
                <span>EMAIL</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Workspace, System Status, Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="font-mono text-[11px] text-[#6F7682] tracking-[0.1em] uppercase flex items-center gap-2">
            <span>WORKSPACE:</span>
            <span className="text-[#F2F4F7]">{happicoreName}</span>
            <span className="text-[#22252A]">/</span>
            <span className="text-[#8FB8E8]">{cleanHappicoreUrl}</span>
          </div>

          <div className="font-mono text-[11px] text-[#6F7682] tracking-[0.08em] uppercase flex items-center gap-3">
            <span>{copyright}</span>
            <span className="text-[#22252A]">/</span>
            <button
              id="footer-setup-link"
              onClick={(e) => handleNav('admin', e)}
              className="text-[#6F7682] hover:text-[#A7ADB7] transition-colors cursor-pointer text-[11px] uppercase tracking-[0.08em]"
              title="Admin Setup"
            >
              SETUP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

