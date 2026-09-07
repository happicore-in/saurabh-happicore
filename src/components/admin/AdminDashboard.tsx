import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  AdminWebProject,
  AdminVideoProject,
  AdminGraphicProject,
  AdminExperience,
  AdminAboutData,
  AdminSiteSettings,
} from '../../types/admin';
import {
  getWebProjects,
  saveWebProject,
  deleteWebProject,
  getVideoProjects,
  saveVideoProject,
  deleteVideoProject,
  getGraphicProjects,
  saveGraphicProject,
  deleteGraphicProject,
  getExperiences,
  saveExperience,
  deleteExperience,
  reorderExperiences,
  getAboutData,
  saveAboutData,
  getSiteSettings,
  saveSiteSettings,
  ensureFirestoreDataSeeded,
  invalidatePortfolioDataCache,
} from '../../services/portfolioDataService';
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  ProjectEnquiry,
  clearEnquiryMemoryCache,
} from '../../services/enquiryService';

// Subcomponents
import { DashboardOverview } from './DashboardOverview';
import { WebManagement } from './WebManagement';
import { VideoManagement } from './VideoManagement';
import { GraphicManagement } from './GraphicManagement';
import { ExperienceManagement } from './ExperienceManagement';
import { AboutManagement } from './AboutManagement';
import { ContactEnquiriesManagement } from './ContactEnquiriesManagement';
import { SiteSettingsManagement } from './SiteSettingsManagement';

// Icons
import {
  LayoutDashboard,
  Globe,
  Video,
  Layers,
  Briefcase,
  User,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPublic: (route?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPublic }) => {
  const { user, logout } = useAdminAuth();

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data states
  const [isLoading, setIsLoading] = useState(true);
  const [webProjects, setWebProjects] = useState<AdminWebProject[]>([]);
  const [videoProjects, setVideoProjects] = useState<AdminVideoProject[]>([]);
  const [graphicProjects, setGraphicProjects] = useState<AdminGraphicProject[]>([]);
  const [experiences, setExperiences] = useState<AdminExperience[]>([]);
  const [aboutData, setAboutData] = useState<AdminAboutData | null>(null);
  const [settings, setSettings] = useState<AdminSiteSettings | null>(null);
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);

  // Selected enquiry for details modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<ProjectEnquiry | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load all initial data from portfolioDataService
  const loadAllData = async () => {
    setIsLoading(true);
    invalidatePortfolioDataCache('all');
    clearEnquiryMemoryCache();
    try {
      const [webs, vids, graphics, exps, abt, sett, enqs] = await Promise.all([
        getWebProjects(true),
        getVideoProjects(true),
        getGraphicProjects(true),
        getExperiences(true),
        getAboutData(true),
        getSiteSettings(true),
        getEnquiries(true),
      ]);

      setWebProjects(webs);
      setVideoProjects(vids);
      setGraphicProjects(graphics);
      setExperiences(exps);
      setAboutData(abt);
      setSettings(sett);
      setEnquiries(enqs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showToast('Error loading some database records.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    setIsLoading(true);
    try {
      const res = await ensureFirestoreDataSeeded();
      if (res.seeded) {
        showToast(`Baseline seeded into: ${res.collections.join(', ')}`, 'success');
      } else {
        showToast('All Firestore collections already contain documents.', 'success');
      }
      await loadAllData();
    } catch (err: any) {
      console.error('Failed to seed database:', err);
      showToast(err?.message || 'Error seeding database.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [user]);

  // Web Handlers
  const handleSaveWebProject = async (project: AdminWebProject) => {
    try {
      const updated = await saveWebProject(project);
      setWebProjects((prev) => {
        const exists = prev.some((p) => p.id === updated.id);
        return exists ? prev.map((p) => (p.id === updated.id ? updated : p)) : [...prev, updated];
      });
      showToast('Web project saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to save web project:', err);
      showToast(err?.message || 'Failed to save web project.', 'error');
      throw err;
    }
  };

  const handleDeleteWebProject = async (id: string) => {
    try {
      await deleteWebProject(id);
      setWebProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Web project deleted from Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to delete web project:', err);
      showToast(err?.message || 'Failed to delete web project.', 'error');
      throw err;
    }
  };

  // Video Handlers
  const handleSaveVideoProject = async (video: AdminVideoProject) => {
    try {
      const updated = await saveVideoProject(video);
      setVideoProjects((prev) => {
        const exists = prev.some((v) => v.id === updated.id);
        return exists ? prev.map((v) => (v.id === updated.id ? updated : v)) : [...prev, updated];
      });
      showToast('Video project saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to save video project:', err);
      showToast(err?.message || 'Failed to save video project.', 'error');
      throw err;
    }
  };

  const handleDeleteVideoProject = async (id: string) => {
    try {
      await deleteVideoProject(id);
      setVideoProjects((prev) => prev.filter((v) => v.id !== id));
      showToast('Video project deleted from Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to delete video project:', err);
      showToast(err?.message || 'Failed to delete video project.', 'error');
      throw err;
    }
  };

  // Graphic Handlers
  const handleSaveGraphicProject = async (graphic: AdminGraphicProject) => {
    try {
      const updated = await saveGraphicProject(graphic);
      setGraphicProjects((prev) => {
        const exists = prev.some((g) => g.id === updated.id);
        return exists ? prev.map((g) => (g.id === updated.id ? updated : g)) : [...prev, updated];
      });
      showToast('Graphic project saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to save graphic project:', err);
      showToast(err?.message || 'Failed to save graphic project.', 'error');
      throw err;
    }
  };

  const handleDeleteGraphicProject = async (id: string) => {
    try {
      await deleteGraphicProject(id);
      setGraphicProjects((prev) => prev.filter((g) => g.id !== id));
      showToast('Graphic project deleted from Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to delete graphic project:', err);
      showToast(err?.message || 'Failed to delete graphic project.', 'error');
      throw err;
    }
  };

  // Experience Handlers
  const handleSaveExperience = async (exp: AdminExperience) => {
    try {
      const updated = await saveExperience(exp);
      setExperiences((prev) => {
        const exists = prev.some((e) => e.id === updated.id);
        return exists ? prev.map((e) => (e.id === updated.id ? updated : e)) : [...prev, updated];
      });
      showToast('Experience saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to save experience:', err);
      showToast(err?.message || 'Failed to save experience.', 'error');
      throw err;
    }
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      showToast('Experience deleted from Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to delete experience:', err);
      showToast(err?.message || 'Failed to delete experience.', 'error');
      throw err;
    }
  };

  const handleReorderExperiences = async (reordered: AdminExperience[]) => {
    try {
      await reorderExperiences(reordered);
      setExperiences(reordered);
      showToast('Experience order saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to reorder experiences:', err);
      showToast(err?.message || 'Failed to reorder experiences.', 'error');
      throw err;
    }
  };

  // About Handler
  const handleSaveAbout = async (data: AdminAboutData) => {
    try {
      const updated = await saveAboutData(data);
      setAboutData(updated);
      showToast('About information saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to save about data:', err);
      showToast(err?.message || 'Failed to save about data.', 'error');
      throw err;
    }
  };

  // Settings Handler
  const handleSaveSettings = async (data: AdminSiteSettings) => {
    try {
      const updated = await saveSiteSettings(data);
      setSettings(updated);
      showToast('Site settings saved to Firestore.', 'success');
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      showToast(err?.message || 'Failed to save settings.', 'error');
      throw err;
    }
  };

  // Enquiry Handlers
  const handleUpdateEnquiryStatus = async (id: string, status: ProjectEnquiry['status']) => {
    await updateEnquiryStatus(id, status);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    await deleteEnquiry(id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'work-web', label: 'WEB WORK', icon: Globe, count: webProjects.length },
    { id: 'work-video', label: 'VIDEO WORK', icon: Video, count: videoProjects.length },
    { id: 'work-graphic', label: 'GRAPHIC WORK', icon: Layers, count: graphicProjects.length },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase, count: experiences.length },
    { id: 'about', label: 'ABOUT', icon: User },
    {
      id: 'contact',
      label: 'CONTACT ENQUIRIES',
      icon: Mail,
      count: enquiries.filter((e) => e.status === 'NEW').length || undefined,
      badgeColor: '#22C55E',
    },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#F2F4F7] flex flex-col selection:bg-[#F5A623] selection:text-[#000000]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`px-4 py-3 rounded-lg border shadow-2xl flex items-center gap-2.5 font-mono text-xs ${
              toastType === 'success'
                ? 'bg-[#08120B] border-[#22C55E] text-[#22C55E]'
                : 'bg-[#180A0A] border-[#FF4D4D] text-[#FF4D4D]'
            }`}
          >
            {toastType === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="h-16 border-b border-[#22252A] bg-[#050608] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#A7ADB7] hover:text-[#F2F4F7] rounded-lg border border-[#22252A] bg-[#0A0C0F]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#121620] border border-[#22252A] flex items-center justify-center font-mono font-bold text-xs text-[#8FB8E8]">
              S // M
            </div>
            <div>
              <div className="font-mono text-xs font-bold tracking-wider text-[#F2F4F7] flex items-center gap-2">
                SAURABH ADMIN
                <span className="hidden sm:inline-block font-mono text-[9px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 px-1.5 py-0.2 rounded font-normal">
                  PART 10
                </span>
              </div>
              <div className="font-mono text-[10px] text-[#6F7682] hidden sm:block">
                PORTFOLIO MANAGEMENT DASHBOARD
              </div>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Public site quick link */}
          <button
            onClick={() => onBackToPublic()}
            className="flex items-center gap-1.5 text-[#A7ADB7] hover:text-[#F2F4F7] px-3 py-1.5 rounded-lg border border-[#22252A] bg-[#0A0C0F] hover:bg-[#12151C] transition-colors cursor-pointer"
          >
            <span>PUBLIC SITE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* User info & Logout */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#22252A]">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-[#A7ADB7] text-[11px] max-w-[140px] truncate">
              {user?.email || 'admin'}
            </span>
          </div>

          <button
            onClick={logout}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-[#FF6B6B] hover:bg-[#FF4D4D]/10 rounded-lg border border-[#FF4D4D]/25 transition-colors flex items-center gap-1 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main App Layout with Sidebar and Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-[#22252A] bg-[#050608] p-4 space-y-6 flex-shrink-0 justify-between">
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#6F7682] uppercase tracking-widest px-3 mb-2">
              NAVIGATION
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#151922] text-[#8FB8E8] font-bold border border-[#8FB8E8]/30 shadow-sm'
                      : 'text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#0E1015]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded border ${
                        item.badgeColor
                          ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30 font-bold'
                          : 'bg-[#12151C] text-[#6F7682] border-[#22252A]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Database Sync Status Widget */}
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-3.5 space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#A7ADB7]">
              <span className="flex items-center gap-1.5 text-[#22C55E]">
                <ShieldCheck className="w-3.5 h-3.5" /> FIRESTORE
              </span>
              <button
                onClick={loadAllData}
                className="text-[#6F7682] hover:text-[#F2F4F7] p-0.5"
                title="Refresh database records"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-[#6F7682] text-[10px] leading-relaxed">
              Real-time Firestore cloud synchronization active. Zero uncommitted changes.
            </p>
          </div>
        </aside>

        {/* Mobile Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-[#000000]/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-[#08090C] border-r border-[#22252A] p-5 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#22252A] pb-3">
                  <span className="font-mono text-xs text-[#8FB8E8] font-bold uppercase">
                    ADMIN MENU
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#6F7682] hover:text-[#F2F4F7]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#151922] text-[#8FB8E8] font-bold border border-[#8FB8E8]/30'
                            : 'text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#0E1015]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#12151C] text-[#A7ADB7] border border-[#22252A]">
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#22252A]">
                <button
                  onClick={logout}
                  className="w-full py-2 bg-[#2D1212] hover:bg-[#3D1818] text-[#FF6B6B] font-mono text-xs rounded border border-[#501D1D] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> LOGOUT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="py-24 text-center space-y-3 font-mono text-xs text-[#6F7682]">
                <RefreshCw className="w-8 h-8 animate-spin text-[#8FB8E8] mx-auto" />
                <p>Loading portfolio database records...</p>
              </div>
            ) : (
              <>
                {/* 1. Dashboard Overview */}
                {activeTab === 'dashboard' && (
                  <DashboardOverview
                    webProjects={webProjects}
                    videoProjects={videoProjects}
                    graphicProjects={graphicProjects}
                    experiences={experiences}
                    enquiries={enquiries}
                    onNavigateTab={(tab) => setActiveTab(tab)}
                    onSelectEnquiry={(enq) => {
                      setSelectedEnquiry(enq);
                      setActiveTab('contact');
                    }}
                    onRefreshData={loadAllData}
                    onSeedDatabase={handleSeedDatabase}
                  />
                )}

                {/* 2. Web Projects Management */}
                {activeTab === 'work-web' && (
                  <WebManagement
                    projects={webProjects}
                    onSave={handleSaveWebProject}
                    onDelete={handleDeleteWebProject}
                    onPreviewPublic={() => onBackToPublic('/web')}
                    showToast={showToast}
                  />
                )}

                {/* 3. Video Projects Management */}
                {activeTab === 'work-video' && (
                  <VideoManagement
                    videos={videoProjects}
                    onSave={handleSaveVideoProject}
                    onDelete={handleDeleteVideoProject}
                    onPreviewPublic={() => onBackToPublic('/video')}
                    showToast={showToast}
                  />
                )}

                {/* 4. Graphic Projects Management */}
                {activeTab === 'work-graphic' && (
                  <GraphicManagement
                    graphics={graphicProjects}
                    onSave={handleSaveGraphicProject}
                    onDelete={handleDeleteGraphicProject}
                    onPreviewPublic={() => onBackToPublic('/graphic')}
                    showToast={showToast}
                  />
                )}

                {/* 5. Experience Management */}
                {activeTab === 'experience' && (
                  <ExperienceManagement
                    experiences={experiences}
                    onSave={handleSaveExperience}
                    onDelete={handleDeleteExperience}
                    onReorder={handleReorderExperiences}
                    showToast={showToast}
                  />
                )}

                {/* 6. About Management */}
                {activeTab === 'about' && aboutData && (
                  <AboutManagement
                    aboutData={aboutData}
                    onSave={handleSaveAbout}
                    showToast={showToast}
                  />
                )}

                {/* 7. Contact Enquiries Management */}
                {activeTab === 'contact' && (
                  <ContactEnquiriesManagement
                    enquiries={enquiries}
                    selectedEnquiry={selectedEnquiry}
                    onSelectEnquiry={setSelectedEnquiry}
                    onUpdateStatus={handleUpdateEnquiryStatus}
                    onDeleteEnquiry={handleDeleteEnquiry}
                    showToast={showToast}
                  />
                )}

                {/* 8. Site Settings */}
                {activeTab === 'settings' && settings && (
                  <SiteSettingsManagement
                    settings={settings}
                    webProjects={webProjects}
                    videoProjects={videoProjects}
                    graphicProjects={graphicProjects}
                    onSave={handleSaveSettings}
                    showToast={showToast}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
