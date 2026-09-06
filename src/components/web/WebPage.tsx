import React, { useState, useEffect } from 'react';
import { WebFilterType, WebProjectItem } from '../../types';
import {
  FLAGSHIP_WEB_PROJECT,
  SELECTED_WEB_PROJECTS,
} from '../../data/webProjects';
import { getPublicWebProjects } from '../../services/portfolioDataService';
import { WebHero } from './WebHero';
import { FeaturedWebProject } from './FeaturedWebProject';
import { WebProjectCard } from './WebProjectCard';
import { WebApproachSection } from './WebApproachSection';
import { ProductionTechStrip } from './ProductionTechStrip';
import { WebCTA } from './WebCTA';
import { WebDetailModal } from './WebDetailModal';
import { Layers, ArrowUpDown, FolderGit2 } from 'lucide-react';

interface WebPageProps {
  onContactClick?: () => void;
  onNavigate?: (id: string) => void;
}

export const WebPage: React.FC<WebPageProps> = ({
  onContactClick,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<WebFilterType>('all');
  const [selectedProject, setSelectedProject] = useState<WebProjectItem | null>(null);
  const [allWebProjects, setAllWebProjects] = useState<WebProjectItem[]>([
    FLAGSHIP_WEB_PROJECT,
    ...SELECTED_WEB_PROJECTS,
  ]);

  useEffect(() => {
    getPublicWebProjects().then((items) => {
      if (items && items.length > 0) {
        setAllWebProjects(items);
      }
    });

    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent;
      if (!ce.detail || ce.detail.type === 'web') {
        getPublicWebProjects().then((items) => {
          if (items && items.length > 0) {
            setAllWebProjects(items);
          }
        });
      }
    };
    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, []);

  const flagshipProject =
    allWebProjects.find((p) => p.isFlagship) || allWebProjects[0] || FLAGSHIP_WEB_PROJECT;
  const selectedWebProjects = allWebProjects.filter((p) => p.id !== flagshipProject.id);

  // Calculate counts for filters
  const counts = {
    all: allWebProjects.length,
    fullstack: allWebProjects.filter((p) => p.filterType === 'fullstack').length,
    portfolios: allWebProjects.filter((p) => p.filterType === 'portfolios').length,
    tools: allWebProjects.filter((p) => p.filterType === 'tools').length,
  };

  // Filter projects for the grid
  const filteredGridProjects =
    activeFilter === 'all'
      ? selectedWebProjects
      : selectedWebProjects.filter((p) => p.filterType === activeFilter);

  const showFlagship =
    activeFilter === 'all' || flagshipProject.filterType === activeFilter;

  return (
    <div className="w-full bg-[#000000] text-[#F2F4F7]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. WEB DEVELOPMENT HERO
            ======================================================== */}
        <WebHero
          activeFilter={activeFilter}
          onFilterChange={(f) => setActiveFilter(f)}
          counts={counts}
        />

        {/* ========================================================
            2. FEATURED WEB PROJECT (FLAGSHIP PLATFORM)
            ======================================================== */}
        {showFlagship && (
          <FeaturedWebProject
            project={flagshipProject}
            onInspect={() => setSelectedProject(flagshipProject)}
          />
        )}

        {/* ========================================================
            3. REGISTRY INDEX // FEATURED ARCHITECTURE (GRID)
            ======================================================== */}
        <div id="selected-web-projects" className="pt-8 pb-12">
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[#17191D]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8FB8E8]">
                REGISTRY INDEX
              </span>
              <span className="text-[#22252A]">—</span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide">
                FEATURED ARCHITECTURE
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
              <ArrowUpDown className="w-3 h-3 text-[#6F7682]" />
              <span>SORT: CHRONOLOGICAL // DESC</span>
            </div>
          </div>

          {/* Grid Layout */}
          {filteredGridProjects.length === 0 ? (
            <div className="w-full py-20 text-center border border-[#17191D] rounded-[8px] bg-[#080808] my-8">
              <FolderGit2 className="w-9 h-9 text-[#6F7682] mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wider mb-2">
                NO PROJECTS IN THIS CATEGORY YET
              </h3>
              <p className="font-body text-xs text-[#6F7682] max-w-xs mx-auto mb-5">
                Switch back to view all web developments or check back soon.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] rounded font-mono text-[11px] uppercase tracking-wider text-[#8FB8E8]"
              >
                VIEW ALL PROJECTS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {filteredGridProjects.map((project) => (
                <WebProjectCard
                  key={project.id}
                  project={project}
                  onInspect={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ========================================================
            4. CORE TOOLSET & ENGINE (PRODUCTION TECH STRIP)
            ======================================================== */}
        <ProductionTechStrip />

        {/* ========================================================
            5. WEB DEVELOPMENT APPROACH (HOW I BUILD)
            ======================================================== */}
        <WebApproachSection />

        {/* ========================================================
            6. CTA (HAVE A WEB PROJECT IN MIND?)
            ======================================================== */}
        <WebCTA onContactClick={onContactClick} />
      </div>

      {/* ========================================================
          7. WEB PROJECT DETAIL MODAL
          ======================================================== */}
      <WebDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={onContactClick}
      />
    </div>
  );
};
