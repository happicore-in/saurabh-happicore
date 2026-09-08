import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HeroSection } from './components/home/HeroSection';
import { SelectedWorkSection } from './components/home/SelectedWorkSection';
import { ServicesSection } from './components/home/ServicesSection';
import { ToolsSection } from './components/home/ToolsSection';
import { AboutPreviewSection } from './components/home/AboutPreviewSection';
import { HappicoreSection } from './components/home/HappicoreSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { ProjectDetailModal } from './components/home/ProjectDetailModal';
import { WorkPage } from './components/work/WorkPage';
import { WebPage } from './components/web/WebPage';
import { VideoPage } from './components/video/VideoPage';
import { GraphicPage } from './components/graphic/GraphicPage';
import { ExperiencePage } from './components/experience/ExperiencePage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { LoadingExperience } from './components/ui/LoadingExperience';
import { WorkCategory } from './types';
import { Info } from 'lucide-react';
import { getSiteSettings } from './services/portfolioDataService';

function AppContent() {
  const { user } = useAdminAuth();

  // Detect initial route if /admin or /admin/login or explicit route/hash
  const getInitialPage = (): 'contact' | 'about' | 'experience' | 'graphic' | 'video' | 'web' | 'work' | 'home' | 'admin' => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/login') return 'admin';
      if (path === '/contact') return 'contact';
      if (path === '/about') return 'about';
      if (path === '/experience') return 'experience';
      if (path === '/work') return 'work';
      if (path === '/web') return 'web';
      if (path === '/video') return 'video';
      if (path === '/graphic') return 'graphic';
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact') return 'contact';
      if (hash === '#about') return 'about';
      if (hash === '#experience') return 'experience';
      if (hash === '#work') return 'work';
      if (hash === '#web' || hash === '#work-web') return 'web';
      if (hash === '#video' || hash === '#work-video') return 'video';
      if (hash === '#graphic' || hash === '#work-graphic') return 'graphic';
    }
    return 'home';
  };

  // Part 10: ADMIN DASHBOARD (protected separate interface)
  const [currentPage, setCurrentPage] = useState<'contact' | 'about' | 'experience' | 'graphic' | 'video' | 'web' | 'work' | 'home' | 'admin'>(getInitialPage);
  const [showLoadingExperience, setShowLoadingExperience] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/login') {
        return false;
      }
    }
    return true;
  });
  const [workFilter, setWorkFilter] = useState<WorkCategory>('all');
  const [activeSection, setActiveSection] = useState(getInitialPage() === 'admin' ? 'home' : getInitialPage());
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Unified navigation handler
  const handleNavigate = (navId: string) => {
    if (navId === 'admin' || navId === '/admin' || navId === '/admin/login') {
      setCurrentPage('admin');
      if (typeof window !== 'undefined' && window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'home' || navId === '/home') {
      setCurrentPage('home');
      setActiveSection('home');
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'work-graphic' || navId === 'graphic' || navId === '/graphic') {
      setCurrentPage('graphic');
      setActiveSection('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'work-video' || navId === 'video' || navId === '/video') {
      setCurrentPage('video');
      setActiveSection('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'work-web' || navId === 'web' || navId === '/web') {
      setCurrentPage('web');
      setActiveSection('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      navId === 'work' ||
      navId === '/work'
    ) {
      setCurrentPage('work');
      setActiveSection('work');
      setWorkFilter('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'experience' || navId === '/experience') {
      setCurrentPage('experience');
      setActiveSection('experience');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'about' || navId === '/about') {
      setCurrentPage('about');
      setActiveSection('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (navId === 'contact' || navId === '/contact') {
      setCurrentPage('contact');
      setActiveSection('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  // Synchronize dynamic title & SEO meta tags from site settings
  useEffect(() => {
    const syncSeo = async () => {
      try {
        const settings = await getSiteSettings();
        if (settings?.siteTitle) {
          document.title = settings.siteTitle;
        }
        if (settings?.metaDescription) {
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', settings.metaDescription);
          const ogDesc = document.querySelector('meta[property="og:description"]');
          if (ogDesc) ogDesc.setAttribute('content', settings.metaDescription);
        }
        if (settings?.siteTitle) {
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) ogTitle.setAttribute('content', settings.siteTitle);
        }
      } catch {
        // Fallback to static HTML defaults
      }
    };

    syncSeo();
    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (!customEvt.detail?.type || customEvt.detail.type === 'settings' || customEvt.detail.type === 'all') {
        syncSeo();
      }
    };
    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, []);

  // Listen for browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/login') {
        setCurrentPage('admin');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll spy for home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = [
        'home-hero',
        'work',
        'services',
        'tools',
        'about',
        'happicore',
        'testimonials',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            const mappedId = section === 'home-hero' ? 'home' : section;
            setActiveSection(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // ========================================================
  // PART 10: ADMIN DASHBOARD (SEPARATE PROTECTED INTERFACE)
  // Unauthenticated users trying to access /admin are shown AdminLoginPage.
  // Authenticated users are shown AdminDashboard.
  // ========================================================
  if (currentPage === 'admin') {
    if (!user) {
      return (
        <AdminLoginPage
          onSuccess={() => setCurrentPage('admin')}
          onBackToSite={() => handleNavigate('home')}
        />
      );
    }
    return (
      <AdminDashboard
        onBackToPublic={(route) => handleNavigate(route || 'home')}
      />
    );
  }

  return (
    <>
      {showLoadingExperience && (
        <LoadingExperience
          onComplete={() => setShowLoadingExperience(false)}
          onLoadingComplete={() => setShowLoadingExperience(false)}
        />
      )}
      <Layout
        activeSection={
          currentPage === 'home'
            ? activeSection
            : currentPage === 'contact'
            ? 'contact'
            : currentPage === 'about'
            ? 'about'
            : currentPage === 'experience'
            ? 'experience'
            : 'work'
        }
        onNavigate={handleNavigate}
      >
      <div className="w-full bg-[#000000] text-[#F2F4F7]">
        {/* ========================================================
            CONDITIONALLY RENDER CONTACT (PART 9), ABOUT (PART 8), EXPERIENCE (PART 7), GRAPHIC (PART 6), VIDEO (PART 5), WEB (PART 4), WORK (PART 3), HOME (PART 2)
            ======================================================== */}
        {currentPage === 'contact' ? (
          <ContactPage
            onNavigate={handleNavigate}
            onShowNotice={(msg) => showToast(msg)}
          />
        ) : currentPage === 'about' ? (
          <AboutPage
            onContactClick={() => {
              showToast('Ready to collaborate! Phone: +91 8127122102 • Email: happicore.in@gmail.com');
            }}
            onNavigate={handleNavigate}
            onShowNotice={(msg) => showToast(msg)}
          />
        ) : currentPage === 'experience' ? (
          <ExperiencePage
            onContactClick={() => {
              showToast('Ready to collaborate! Phone: +91 8127122102 • Email: happicore.in@gmail.com');
            }}
            onNavigate={handleNavigate}
            onShowNotice={(msg) => showToast(msg)}
          />
        ) : currentPage === 'graphic' ? (
          <GraphicPage
            onContactClick={() => {
              showToast('Ready to collaborate! Phone: +91 8127122102 • Email: happicore.in@gmail.com');
            }}
            onNavigate={handleNavigate}
            onShowNotice={(msg) => showToast(msg)}
          />
        ) : currentPage === 'video' ? (
          <VideoPage
            onContactClick={() => {
              showToast('Ready to collaborate! Phone: +91 8127122102 • Email: happicore.in@gmail.com');
            }}
            onNavigate={handleNavigate}
            onShowNotice={(msg) => showToast(msg)}
          />
        ) : currentPage === 'web' ? (
          <WebPage
            onContactClick={() => {
              showToast('Ready to collaborate! Phone: +91 8127122102 • Email: happicore.in@gmail.com');
            }}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'work' ? (
          <WorkPage
            initialCategory={workFilter}
            onContactClick={() => {
              showToast('Ready to collaborate! Phone: +91 8127122102 • Email: happicore.in@gmail.com');
            }}
            onNavigate={handleNavigate}
          />
        ) : (
          <div>
            {/* 1. HERO SECTION */}
            <HeroSection
              onExploreWork={() => handleNavigate('work')}
              onContactClick={() => handleNavigate('contact')}
            />

            {/* 2. SELECTED WORK PREVIEW */}
            <SelectedWorkSection
              onViewAllWork={() => handleNavigate('work')}
              onProjectClick={(id) => setSelectedProjectId(id)}
            />

            {/* 3. SPECIALIZED SERVICES */}
            <ServicesSection
              onServiceSelect={(serviceKey) => {
                showToast(`Selected ${serviceKey.toUpperCase()} service. Ready to discuss scope.`);
                handleNavigate('contact');
              }}
            />

            {/* 4. TOOLS & TECHNOLOGIES */}
            <ToolsSection />

            {/* 5. A LITTLE ABOUT ME */}
            <AboutPreviewSection
              onMoreAboutClick={() => {
                handleNavigate('about');
              }}
            />

            {/* 6. HAPPICORE WORKSPACE */}
            <HappicoreSection />

            {/* 7. WHAT PEOPLE SAY */}
            <TestimonialsSection />

            {/* PROJECT DETAIL MODAL (FOR HOME) */}
            <ProjectDetailModal
              projectId={selectedProjectId}
              onClose={() => setSelectedProjectId(null)}
              onInquire={() => {
                setSelectedProjectId(null);
                handleNavigate('contact');
              }}
            />
          </div>
        )}

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="fixed bottom-6 right-5 z-50 max-w-sm bg-[#080808] border border-[#8FB8E8]/50 text-[#F2F4F7] p-3.5 rounded-[6px] shadow-2xl flex items-center gap-3 font-mono text-[12px] animate-in fade-in slide-in-from-bottom-2">
            <Info className="w-4 h-4 text-[#8FB8E8] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </Layout>
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}

