import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { IDENTITY, NAVIGATION_ITEMS } from '../design-system/tokens';
import { PrimaryButton } from './Button';
import { getSiteSettings } from '../services/portfolioDataService';
import { AdminSiteSettings } from '../types/admin';

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection = 'home',
  onNavigate,
}) => {
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const s = await getSiteSettings();
        if (isMounted && s) setSettings(s);
      } catch (err) {
        console.warn('Header load settings error:', err);
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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setWorkDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
    setWorkDropdownOpen(false);
  };

  const brandName = settings?.siteName || IDENTITY.name;
  const availabilityText = settings?.availability?.status || IDENTITY.availability;

  return (
    <header
      id="global-header"
      className="sticky top-0 z-50 w-full bg-[#000000]/90 backdrop-blur-md border-b border-[#17191D]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-baseline gap-3 cursor-pointer" onClick={(e) => handleLinkClick('home', e)}>
          <span className="font-heading font-bold text-lg sm:text-xl text-[#F2F4F7] tracking-[0.05em] uppercase hover:text-[#FFFFFF] transition-colors">
            {brandName}
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.14em] text-[#6F7682] uppercase border-l border-[#22252A] pl-3 py-0.5">
            {IDENTITY.descriptor}
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-mono tracking-[0.08em] uppercase text-[#A7ADB7]" aria-label="Main Navigation">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeSection === item.id || (item.dropdown && item.dropdown.some(d => d.id === activeSection));

            if (item.dropdown) {
              return (
                <div
                  key={item.id}
                  ref={dropdownRef}
                  className="relative group"
                  onMouseEnter={() => setWorkDropdownOpen(true)}
                  onMouseLeave={() => setWorkDropdownOpen(false)}
                >
                  <button
                    id={`nav-${item.id}`}
                    type="button"
                    onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                    aria-expanded={workDropdownOpen}
                    className={`
                      inline-flex items-center gap-1.5 py-1 transition-colors duration-200 cursor-pointer
                      ${isActive ? 'text-[#F2F4F7] font-semibold' : 'hover:text-[#F2F4F7]'}
                    `}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${workDropdownOpen ? 'rotate-180 text-[#8FB8E8]' : 'text-[#6F7682]'}`} />
                    {isActive && (
                      <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#8FB8E8]" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {workDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-44 rounded-[6px] bg-[#0D0D0D] border border-[#22252A] shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      <div className="px-3 py-1 text-[9px] font-mono text-[#6F7682] tracking-[0.12em] uppercase border-b border-[#17191D] mb-1">
                        DISCIPLINES
                      </div>
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.id}
                          id={`nav-sub-${subItem.id}`}
                          onClick={(e) => handleLinkClick(subItem.id, e)}
                          className="w-full text-left px-3 py-2 text-[12px] font-mono text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#111111] hover:pl-4 transition-all duration-150 cursor-pointer flex items-center justify-between"
                        >
                          <span>{subItem.label}</span>
                          <span className="text-[10px] text-[#6F7682]">0{subItem.id === 'work-web' ? '1' : subItem.id === 'work-video' ? '2' : '3'}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.id}
                id={`nav-${item.id}`}
                href={item.href}
                onClick={(e) => handleLinkClick(item.id, e)}
                className={`
                  relative py-1 transition-colors duration-200 cursor-pointer
                  ${isActive ? 'text-[#F2F4F7] font-semibold' : 'hover:text-[#F2F4F7]'}
                `}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#8FB8E8]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Availability & Action Button */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Availability Indicator */}
          <div
            id="header-availability"
            className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#080808] border border-[#17191D]"
            title="Saurabh is currently taking on new projects"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A623]"></span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#F2F4F7] font-medium">
              {availabilityText}
            </span>
          </div>

          {/* Primary CTA */}
          <PrimaryButton
            id="header-cta"
            size="sm"
            onClick={(e) => handleLinkClick('contact', e)}
          >
            LET'S WORK
          </PrimaryButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#080808] border border-[#17191D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse"></span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#A7ADB7]">OPEN</span>
          </div>
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A7ADB7] hover:text-[#F2F4F7] focus:outline-none focus:ring-1 focus:ring-[#8FB8E8] rounded-[4px]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-[#080808] border-b border-[#22252A] px-4 py-6 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#6F7682] pb-2 border-b border-[#17191D]">
            NAVIGATION // {brandName.toUpperCase()} PORTFOLIO
          </div>

          <div className="flex flex-col space-y-1 font-mono text-[14px] uppercase tracking-wider">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={(e) => handleLinkClick(item.id, e)}
                  className={`text-left min-h-[44px] py-2 px-1 w-full flex items-center justify-between ${
                    activeSection === item.id ? 'text-[#8FB8E8] font-semibold' : 'text-[#F2F4F7]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-[#6F7682]">→</span>
                </button>

                {item.dropdown && (
                  <div className="pl-4 py-1 space-y-1 border-l border-[#22252A] ml-2">
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={(e) => handleLinkClick(sub.id, e)}
                        className="block text-left min-h-[40px] flex items-center text-[12px] text-[#A7ADB7] hover:text-[#8FB8E8] py-1 px-1 w-full"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#17191D] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A7ADB7]">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
              <span>{availabilityText}</span>
            </div>
            <PrimaryButton
              id="mobile-cta"
              size="md"
              className="w-full"
              onClick={(e) => handleLinkClick('contact', e)}
            >
              LET'S WORK
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
};

