import React, { useState } from 'react';
import {
  AdminSiteSettings,
  AdminWebProject,
  AdminVideoProject,
  AdminGraphicProject,
} from '../../types/admin';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Shield,
  Star,
  CheckCircle2,
  Share2,
  Sparkles,
} from 'lucide-react';

interface SiteSettingsManagementProps {
  settings: AdminSiteSettings;
  webProjects: AdminWebProject[];
  videoProjects: AdminVideoProject[];
  graphicProjects: AdminGraphicProject[];
  onSave: (settings: AdminSiteSettings) => Promise<void>;
  showToast: (msg: string) => void;
}

export const SiteSettingsManagement: React.FC<SiteSettingsManagementProps> = ({
  settings,
  webProjects,
  videoProjects,
  graphicProjects,
  onSave,
  showToast,
}) => {
  const [formData, setFormData] = useState<any>(() => {
    const rawHome = settings.home || (settings as any).homeContent || {
      tagline: 'CREATIVE MULTIDISCIPLINARY',
      shortIntro: 'Video Editor, Graphic Designer & Web Developer based in Mau, UP. Bridging creative storytelling with modern computational web interfaces.',
      profileImage: '',
      featuredWorkIds: ['sportify-digital-platform', 'paradox-2026-aftermovie', 'campusrun-2025-marathon-poster'],
      happicoreDescription: 'Independent creative atelier and digital development practice founded by Saurabh.',
      availability: 'AVAILABLE FOR WORK',
    };
    const workIds = rawHome.featuredWorkIds || rawHome.featuredProjectIds || [];
    const mergedHome = {
      ...rawHome,
      featuredWorkIds: workIds,
      featuredProjectIds: workIds,
    };
    const defaultStats = [
      { id: 'stat-roles', label: 'ROLES & CHAIRS', value: '3+', order: 1 },
      { id: 'stat-campaigns', label: 'CAMPAIGNS', value: '6+', order: 2 },
      { id: 'stat-affiliation', label: 'AFFILIATION', value: 'IIT Madras BS', order: 3 },
      { id: 'stat-velocity', label: 'OUTPUT VELOCITY', value: '99.4% SLA', order: 4 },
    ];
    return {
      ...settings,
      siteTitle: settings.siteTitle || settings.siteName || 'SAURABH // CREATIVE MULTIDISCIPLINARY',
      metaDescription: settings.metaDescription || 'Multidisciplinary portfolio of Saurabh — Video Editor, Graphic Designer & Web Developer.',
      logoMark: settings.logoMark || (settings as any).logoText || 'S // M',
      logoText: (settings as any).logoText || settings.logoMark || 'S // M',
      footerText: (settings as any).footerText || settings.footerCopyright || '© 2026 SAURABH // HAPPICORE. ALL RIGHTS RESERVED.',
      footerCopyright: settings.footerCopyright || (settings as any).footerText || '© 2026 SAURABH // HAPPICORE. ALL RIGHTS RESERVED.',
      experienceSummaryStats: settings.experienceSummaryStats && settings.experienceSummaryStats.length > 0
        ? settings.experienceSummaryStats
        : defaultStats,
      home: mergedHome,
      homeContent: mergedHome,
    };
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<
    'general' | 'experienceStats' | 'happicore' | 'contact' | 'availability' | 'home' | 'cloudinary'
  >('general');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const workIds =
        formData.home?.featuredWorkIds ||
        formData.homeContent?.featuredProjectIds ||
        [];
      const homeData = {
        ...(formData.home || {}),
        ...(formData.homeContent || {}),
        featuredWorkIds: workIds,
      };
      const cleanedData: AdminSiteSettings = {
        ...formData,
        siteTitle: formData.siteTitle || formData.siteName,
        metaDescription: formData.metaDescription,
        footerCopyright: formData.footerCopyright || formData.footerText,
        experienceSummaryStats: formData.experienceSummaryStats,
        logoMark: formData.logoMark || formData.logoText || 'S // M',
        home: homeData,
      };
      await onSave(cleanedData);
      showToast('Site settings updated and saved to Firestore.');
    } catch (err) {
      console.error(err);
      showToast('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFeaturedProject = (projectId: string) => {
    const current =
      formData.homeContent?.featuredProjectIds ||
      formData.home?.featuredWorkIds ||
      [];
    let updated: string[];
    if (current.includes(projectId)) {
      updated = current.filter((id: string) => id !== projectId);
    } else {
      if (current.length >= 5) {
        showToast('Maximum 5 projects can be featured on homepage.');
        return;
      }
      updated = [...current, projectId];
    }
    const updatedHome = {
      ...(formData.home || {}),
      ...(formData.homeContent || {}),
      featuredProjectIds: updated,
      featuredWorkIds: updated,
    };
    setFormData({
      ...formData,
      home: updatedHome,
      homeContent: updatedHome,
    });
  };

  // Combine projects for the featured picker
  const allProjects = [
    ...webProjects.map((p) => ({ id: p.id, title: p.title, type: 'Web Development' })),
    ...videoProjects.map((p) => ({ id: p.id, title: p.title, type: 'Video Editing' })),
    ...graphicProjects.map((p) => ({ id: p.id, title: p.title, type: 'Graphic Design' })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#8FB8E8] uppercase tracking-widest">
            PORTFOLIO ENGINE // GLOBAL CONFIGURATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            SITE SETTINGS
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-lg"
        >
          {isSaving ? 'SAVING...' : 'SAVE ALL SETTINGS'}
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1C1F26] pb-3 font-mono text-xs">
        {[
          { id: 'general', label: 'GENERAL & BRAND' },
          { id: 'experienceStats', label: 'EXPERIENCE STATS' },
          { id: 'happicore', label: 'HAPPICORE AGENCY' },
          { id: 'contact', label: 'CONTACT & SOCIAL' },
          { id: 'availability', label: 'AVAILABILITY' },
          { id: 'home', label: 'HOME PAGE CONTENT' },
          { id: 'cloudinary', label: 'CLOUDINARY STORAGE' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer uppercase ${
              activeSubTab === tab.id
                ? 'bg-[#151922] border-[#8FB8E8] text-[#8FB8E8] font-bold'
                : 'bg-[#0A0C0F] border-[#22252A] text-[#A7ADB7] hover:text-[#F2F4F7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SUBTAB 1: General & Brand */}
        {activeSubTab === 'general' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
            <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#8FB8E8]" /> GENERAL BRAND IDENTITY & SEO
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  SITE / OWNER NAME
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  BRAND MONOGRAM / LOGO TEXT
                </label>
                <input
                  type="text"
                  value={formData.logoText || formData.logoMark || ''}
                  onChange={(e) => setFormData({ ...formData, logoText: e.target.value, logoMark: e.target.value })}
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  HTML PAGE TITLE (BROWSER TAB / SEO)
                </label>
                <input
                  type="text"
                  value={formData.siteTitle || ''}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  placeholder="e.g. SAURABH // CREATIVE MULTIDISCIPLINARY"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  FOOTER STATEMENT / COPYRIGHT
                </label>
                <input
                  type="text"
                  value={formData.footerText || formData.footerCopyright || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      footerText: e.target.value,
                      footerCopyright: e.target.value,
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                META DESCRIPTION (SEO / OPEN GRAPH)
              </label>
              <textarea
                rows={2}
                value={formData.metaDescription || ''}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none"
                placeholder="Brief summary displayed in search engines and social shares"
              />
            </div>
          </div>
        )}

        {/* SUBTAB: Experience Summary Stats */}
        {activeSubTab === 'experienceStats' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
            <div>
              <h2 className="font-mono text-sm font-bold text-[#F5A623] uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4" /> EXPERIENCE SUMMARY METRICS (4 SLOTS)
              </h2>
              <p className="text-xs text-[#A7ADB7] font-sans mt-1">
                These four metric cards are displayed horizontally across the Experience page hero header.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(formData.experienceSummaryStats || []).map((stat: any, idx: number) => (
                <div
                  key={stat.id || idx}
                  className="bg-[#050608] border border-[#22252A] p-4 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8FB8E8]">
                      METRIC 0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] text-[#6F7682] uppercase border border-[#22252A] px-2 py-0.5 rounded">
                      SLOT {idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#A7ADB7] uppercase">
                      LABEL (HEADER)
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...formData.experienceSummaryStats];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setFormData({ ...formData, experienceSummaryStats: updated });
                      }}
                      className="w-full bg-[#0A0C0F] border border-[#22252A] focus:border-[#F5A623] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#A7ADB7] uppercase">
                      VALUE / STAT
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...formData.experienceSummaryStats];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setFormData({ ...formData, experienceSummaryStats: updated });
                      }}
                      className="w-full bg-[#0A0C0F] border border-[#22252A] focus:border-[#F5A623] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: Happicore Agency Settings */}
        {activeSubTab === 'happicore' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
            <div>
              <h2 className="font-mono text-sm font-bold text-[#F5A623] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> HAPPICORE AGENCY SETTINGS
              </h2>
              <p className="text-xs text-[#A7ADB7] font-sans mt-1">
                Happicore is Saurabh's independent creative studio and digital banner.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  AGENCY NAME
                </label>
                <input
                  type="text"
                  value={formData.happicore.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      happicore: { ...formData.happicore, name: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  AGENCY URL (DEFAULT HTTPS://HAPPICORE.IN)
                </label>
                <input
                  type="url"
                  value={formData.happicore.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      happicore: { ...formData.happicore, url: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                SHORT AGENCY DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={formData.happicore.shortDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    happicore: { ...formData.happicore, shortDescription: e.target.value },
                  })
                }
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  AGENCY SOCIAL / INSTAGRAM LINK
                </label>
                <input
                  type="url"
                  value={formData.happicore.socialLink || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      happicore: { ...formData.happicore, socialLink: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/happicore.in"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  BUTTON TEXT
                </label>
                <input
                  type="text"
                  value={formData.happicore.buttonText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      happicore: { ...formData.happicore, buttonText: e.target.value },
                    })
                  }
                  placeholder="VISIT HAPPICORE →"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: Contact & Social Links */}
        {activeSubTab === 'contact' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
            <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#8FB8E8]" /> CONTACT DETAILS & SOCIAL CHANNELS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  value={formData.contactDetails.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: { ...formData.contactDetails, phone: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  LOCATION
                </label>
                <input
                  type="text"
                  value={formData.contactDetails.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: { ...formData.contactDetails, location: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  PERSONAL EMAIL
                </label>
                <input
                  type="email"
                  value={formData.contactDetails.personalEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: { ...formData.contactDetails, personalEmail: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  WORK EMAIL
                </label>
                <input
                  type="email"
                  value={formData.contactDetails.workEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: { ...formData.contactDetails, workEmail: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-[#1C1F26] pt-4 space-y-3">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                SOCIAL MEDIA PROFILES
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-[#6F7682] uppercase">LINKEDIN</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="w-full bg-[#050608] border border-[#22252A] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#6F7682] uppercase">GITHUB</label>
                  <input
                    type="url"
                    value={formData.socialLinks.github || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, github: e.target.value },
                      })
                    }
                    className="w-full bg-[#050608] border border-[#22252A] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#6F7682] uppercase">YOUTUBE</label>
                  <input
                    type="url"
                    value={formData.socialLinks.youtube || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                      })
                    }
                    className="w-full bg-[#050608] border border-[#22252A] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#6F7682] uppercase">INSTAGRAM</label>
                  <input
                    type="url"
                    value={formData.socialLinks.instagram || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full bg-[#050608] border border-[#22252A] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#6F7682] uppercase">BEHANCE</label>
                  <input
                    type="url"
                    value={formData.socialLinks.behance || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, behance: e.target.value },
                      })
                    }
                    className="w-full bg-[#050608] border border-[#22252A] rounded py-1.5 px-2.5 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: Availability Status */}
        {activeSubTab === 'availability' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
            <h2 className="font-mono text-sm font-bold text-[#22C55E] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> AVAILABILITY STATUS MANAGEMENT
            </h2>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                STATUS DROPDOWN
              </label>
              <select
                value={formData.availability.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: { ...formData.availability, status: e.target.value as any },
                  })
                }
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#22C55E] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none cursor-pointer"
              >
                <option value="AVAILABLE FOR WORK">AVAILABLE FOR WORK (Green status beacon)</option>
                <option value="LIMITED AVAILABILITY">LIMITED AVAILABILITY (Amber beacon)</option>
                <option value="NOT AVAILABLE">NOT AVAILABLE (Offline)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                SHORT AVAILABILITY MESSAGE / NOTE
              </label>
              <input
                type="text"
                value={formData.availability.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: { ...formData.availability, message: e.target.value },
                  })
                }
                placeholder="Accepting new client contracts for Q2-Q3 2026."
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#22C55E] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* SUBTAB 5: Home Page Content & Featured Work */}
        {activeSubTab === 'home' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-6">
            <h2 className="font-mono text-sm font-bold text-[#8FB8E8] uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4" /> HOME PAGE HERO & FEATURED SELECTION
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  HERO TAGLINE
                </label>
                <input
                  type="text"
                  value={formData.homeContent.tagline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homeContent: { ...formData.homeContent, tagline: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  HERO SHORT INTRO
                </label>
                <textarea
                  rows={3}
                  value={formData.homeContent.shortIntro}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homeContent: { ...formData.homeContent, shortIntro: e.target.value },
                    })
                  }
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none"
                />
              </div>

              <CloudinaryImageUploader
                label="HOME PROFILE IMAGE (CLOUDINARY)"
                value={formData.homeContent.profileImage}
                onChange={(url) =>
                  setFormData({
                    ...formData,
                    homeContent: { ...formData.homeContent, profileImage: url },
                  })
                }
                aspectRatioGuide="1:1 Avatar"
              />

              {/* Requirement 11: Featured work: allow admin to choose up to 5 projects to feature on the homepage from existing projects without duplication */}
              <div className="border-t border-[#1C1F26] pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase">
                    FEATURED HOMEPAGE WORK (CHOOSE UP TO 5 PROJECTS)
                  </label>
                  <span className="font-mono text-[11px] text-[#F5A623]">
                    {formData.homeContent.featuredProjectIds?.length || 0} / 5 SELECTED
                  </span>
                </div>

                <p className="font-mono text-[11px] text-[#6F7682]">
                  Select from existing Web, Video, or Graphic projects without duplication.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {allProjects.map((proj) => {
                    const isSelected =
                      formData.homeContent.featuredProjectIds?.includes(proj.id) || false;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => toggleFeaturedProject(proj.id)}
                        className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#151B27] border-[#8FB8E8] text-[#F2F4F7]'
                            : 'bg-[#050608] border-[#1C1F26] text-[#A7ADB7] hover:border-[#2A2E37]'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="font-medium truncate">{proj.title}</div>
                          <div className="text-[10px] text-[#6F7682]">{proj.type}</div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-[#8FB8E8] border-[#8FB8E8] text-[#000000]'
                              : 'border-[#2A2E37]'
                          }`}
                        >
                          {isSelected && <Star className="w-2.5 h-2.5 fill-current" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: Cloudinary Config */}
        {activeSubTab === 'cloudinary' && (
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
            <div>
              <h2 className="font-mono text-sm font-bold text-[#8FB8E8] uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4" /> CLOUDINARY MEDIA CREDENTIALS
              </h2>
              <p className="text-xs text-[#A7ADB7] font-sans mt-1">
                Used for client-side unsigned uploads of project screenshots, posters, profile imagery, and video clips.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[#22C55E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>DEFAULT: pegfrsqo // portfolio_upload (asset folder: portfolio_upload)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  CLOUD NAME
                </label>
                <input
                  type="text"
                  value={formData.cloudinary.cloudName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cloudinary: { ...formData.cloudinary, cloudName: e.target.value },
                    })
                  }
                  placeholder="pegfrsqo"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  UPLOAD PRESET (UNSIGNED)
                </label>
                <input
                  type="text"
                  value={formData.cloudinary.uploadPreset}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cloudinary: { ...formData.cloudinary, uploadPreset: e.target.value },
                    })
                  }
                  placeholder="portfolio_upload"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-[#050608] border border-[#1A1E26] rounded-lg text-xs font-mono text-[#6F7682] space-y-1">
              <div className="text-[#8FB8E8]">CLOUDINARY PIPELINE STATUS</div>
              <p>
                If Cloud Name or Upload Preset are unconfigured, the upload interface provides direct URL input and local data fallbacks.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22252A]">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
          >
            {isSaving ? 'SAVING...' : 'SAVE ALL SETTINGS'}
          </button>
        </div>
      </form>
    </div>
  );
};
