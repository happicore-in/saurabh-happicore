import React, { useState, useEffect } from 'react';
import { GraphicFilterType, GraphicProjectItem } from '../../types';
import { getPublicGraphicProjects } from '../../services/portfolioDataService';
import { GraphicHero } from './GraphicHero';
import { FeaturedGraphicWork } from './FeaturedGraphicWork';
import { GraphicProjectCard } from './GraphicProjectCard';
import { GraphicLightbox } from './GraphicLightbox';
import { GraphicApproachSection } from './GraphicApproachSection';
import { GraphicCTA } from './GraphicCTA';
import { ArrowUpDown, Image as ImageIcon } from 'lucide-react';
import { FeaturedHeroSkeleton, ProjectCardSkeleton } from '../common/Skeletons';

interface GraphicPageProps {
  onContactClick?: () => void;
  onNavigate?: (id: string) => void;
  onShowNotice?: (message: string) => void;
}

export const GraphicPage: React.FC<GraphicPageProps> = ({
  onContactClick,
  onNavigate,
  onShowNotice,
}) => {
  const [activeFilter, setActiveFilter] = useState<GraphicFilterType>('all');
  const [lightboxProject, setLightboxProject] = useState<GraphicProjectItem | null>(null);
  const [graphicData, setGraphicData] = useState<{
    featured: GraphicProjectItem | null;
    selected: GraphicProjectItem[];
  }>({
    featured: null,
    selected: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadGraphics = async (silent = false) => {
      try {
        const res = await getPublicGraphicProjects();
        if (isMounted) {
          setGraphicData(res || { featured: null, selected: [] });
          if (!silent) {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.warn('GraphicPage load notice:', err);
        if (isMounted && !silent) {
          setGraphicData({ featured: null, selected: [] });
          setIsLoading(false);
        }
      }
    };

    loadGraphics(false);

    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent;
      if (!ce.detail || ce.detail.type === 'graphic') {
        loadGraphics(true);
      }
    };
    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const allProjects = graphicData.featured ? [graphicData.featured, ...graphicData.selected] : [];

  const counts = {
    all: allProjects.length,
    posters: allProjects.filter((p) => p.filterCategory === 'posters').length,
    branding: allProjects.filter((p) => p.filterCategory === 'branding').length,
    social: allProjects.filter((p) => p.filterCategory === 'social').length,
    merchandise: allProjects.filter((p) => p.filterCategory === 'merchandise').length,
  };

  const filteredGridProjects =
    activeFilter === 'all'
      ? graphicData.selected
      : graphicData.selected.filter((p) => p.filterCategory === activeFilter);

  const showFeatured =
    graphicData.featured && (activeFilter === 'all' || graphicData.featured.filterCategory === activeFilter);

  // Split selected projects dynamically into editorial rows for the curated 'all' layout
  const isAllFilter = activeFilter === 'all';
  const selectedList = graphicData.selected;

  // Dynamic Row 1 (wide hero showcase): 1st available selected project
  const topWideProject = selectedList.length > 0 ? selectedList[0] : null;

  // Dynamic Row 2 (3-column curated row): next up to 3 projects
  const middleRowProjects = selectedList.slice(1, 4);

  // Dynamic Row 3 (wide split showcase): 5th project (index 4) if available
  const splitProject = selectedList.length > 4 ? selectedList[4] : null;

  // Dynamic Row 4 (extra projects beyond 5): any remaining projects rendered gracefully
  const extraProjects = selectedList.slice(5);

  return (
    <div className="w-full bg-[#000000] text-[#F2F4F7]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. GRAPHIC DESIGN HERO
            ======================================================== */}
        <GraphicHero
          activeFilter={activeFilter}
          onFilterChange={(f) => setActiveFilter(f)}
          counts={counts}
        />

        {/* Loading state: Render skeletons instead of hardcoded baseline flash */}
        {isLoading ? (
          <div className="py-6 space-y-12">
            <FeaturedHeroSkeleton aspect="4/5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCardSkeleton aspectRatio="16/9" />
              <ProjectCardSkeleton aspectRatio="16/9" />
            </div>
          </div>
        ) : (
          <>
            {/* ========================================================
                2. FEATURED GRAPHIC WORK (CAMPUSRUN 2025 MARATHON POSTER)
                ======================================================== */}
            {showFeatured && graphicData.featured && (
              <FeaturedGraphicWork
                project={graphicData.featured}
                onOpenLightbox={() => setLightboxProject(graphicData.featured)}
                onShowNotice={onShowNotice}
              />
            )}

        {/* ========================================================
            3. SELECTED GRAPHIC WORK // CURATED EDITORIAL GRID
            ======================================================== */}
        <div id="selected-graphic-section" className="pt-8 pb-12">
          {/* Section Sub-Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#17191D]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8FB8E8]">
                SELECTED GRAPHIC WORK
              </span>
              <span className="text-[#22252A]">—</span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide">
                EDITORIAL ART ARCHIVE
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
              <ArrowUpDown className="w-3 h-3 text-[#6F7682]" />
              <span>SORT: CHRONOLOGICAL // CURATED</span>
            </div>
          </div>

          {/* Empty State per Requirement 13 */}
          {filteredGridProjects.length === 0 && !showFeatured ? (
            <div className="w-full py-20 text-center border border-[#17191D] rounded-[8px] bg-[#080808] my-8">
              <ImageIcon className="w-9 h-9 text-[#6F7682] mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wider mb-2">
                MORE WORK COMING SOON
              </h3>
              <p className="font-body text-xs text-[#6F7682] max-w-xs mx-auto mb-5">
                New design systems are currently in pre-press review. Switch back to view all visual work.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] rounded font-mono text-[11px] uppercase tracking-wider text-[#8FB8E8] cursor-pointer"
              >
                VIEW ALL VISUALS
              </button>
            </div>
          ) : isAllFilter ? (
            /* Curated Editorial Asymmetric Grid */
            <div className="space-y-8">
              {/* Row 1: Top Wide Project (16:9 Landscape) */}
              {topWideProject && (
                <div className="w-full">
                  <GraphicProjectCard
                    project={topWideProject}
                    onOpenLightbox={() => setLightboxProject(topWideProject)}
                    onShowNotice={onShowNotice}
                  />
                </div>
              )}

              {/* Row 2: 3-column curated row */}
              {middleRowProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {middleRowProjects.map((project) => (
                    <GraphicProjectCard
                      key={project.id}
                      project={project}
                      onOpenLightbox={() => setLightboxProject(project)}
                      onShowNotice={onShowNotice}
                    />
                  ))}
                </div>
              )}

              {/* Row 3: Wide Horizontal Split */}
              {splitProject && (
                <div className="w-full">
                  <GraphicProjectCard
                    project={splitProject}
                    onOpenLightbox={() => setLightboxProject(splitProject)}
                    onShowNotice={onShowNotice}
                  />
                </div>
              )}

              {/* Row 4: Any extra projects dynamically rendered */}
              {extraProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
                  {extraProjects.map((project) => (
                    <GraphicProjectCard
                      key={project.id}
                      project={project}
                      onOpenLightbox={() => setLightboxProject(project)}
                      onShowNotice={onShowNotice}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Filtered Category Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredGridProjects.map((project) => (
                <GraphicProjectCard
                  key={project.id}
                  project={project}
                  onOpenLightbox={() => setLightboxProject(project)}
                  onShowNotice={onShowNotice}
                />
              ))}
            </div>
          )}
        </div>
          </>
        )}

        {/* ========================================================
            4. DESIGN APPROACH & ARSENAL
            ======================================================== */}
        <GraphicApproachSection />

        {/* ========================================================
            5. NEED A DESIGN? // CTA
            ======================================================== */}
        <GraphicCTA onContactClick={onContactClick} />
      </div>

      {/* ========================================================
          6. FULL-RESOLUTION MULTI-IMAGE LIGHTBOX VIEWER
          ======================================================== */}
      <GraphicLightbox
        project={lightboxProject}
        onClose={() => setLightboxProject(null)}
        onInquire={onContactClick}
        onShowNotice={onShowNotice}
      />
    </div>
  );
};
