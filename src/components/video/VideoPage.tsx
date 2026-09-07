import React, { useState, useEffect } from 'react';
import { VideoFilterType, VideoProjectItem } from '../../types';
import { getPublicVideoProjects } from '../../services/portfolioDataService';
import { VideoHero } from './VideoHero';
import { FeaturedVideo } from './FeaturedVideo';
import { VideoProjectCard } from './VideoProjectCard';
import { EditingApproachSection } from './EditingApproachSection';
import { VideoCTA } from './VideoCTA';
import { VideoDetailModal } from './VideoDetailModal';
import { ArrowUpDown, Video, Film } from 'lucide-react';
import { FeaturedHeroSkeleton, ProjectCardSkeleton } from '../common/Skeletons';

interface VideoPageProps {
  onContactClick?: () => void;
  onNavigate?: (id: string) => void;
  onShowNotice?: (message: string) => void;
}

export const VideoPage: React.FC<VideoPageProps> = ({
  onContactClick,
  onNavigate,
  onShowNotice,
}) => {
  const [activeFilter, setActiveFilter] = useState<VideoFilterType>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoProjectItem | null>(null);
  const [videoData, setVideoData] = useState<{
    featured: VideoProjectItem | null;
    selected: VideoProjectItem[];
  }>({
    featured: null,
    selected: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async (silent = false) => {
      try {
        const res = await getPublicVideoProjects();
        if (isMounted) {
          setVideoData(res || { featured: null, selected: [] });
          if (!silent) {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.warn('VideoPage load notice:', err);
        if (isMounted && !silent) {
          setVideoData({ featured: null, selected: [] });
          setIsLoading(false);
        }
      }
    };

    loadVideos(false);

    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent;
      if (!ce.detail || ce.detail.type === 'video') {
        loadVideos(true);
      }
    };
    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const allProjects = videoData.featured ? [videoData.featured, ...videoData.selected] : [];

  const counts = {
    all: allProjects.length,
    aftermovies: allProjects.filter((p) => p.filterCategory === 'aftermovies').length,
    sports: allProjects.filter((p) => p.filterCategory === 'sports').length,
    shortForm: allProjects.filter((p) => p.filterCategory === 'short-form').length,
    promotional: allProjects.filter((p) => p.filterCategory === 'promotional').length,
  };

  // Filter projects for the grid
  const filteredGridProjects =
    activeFilter === 'all'
      ? videoData.selected
      : videoData.selected.filter((p) => p.filterCategory === activeFilter);

  const showFeatured =
    videoData.featured && (activeFilter === 'all' || videoData.featured.filterCategory === activeFilter);

  // Split into Row 1 (horizontal balanced cards) and Row 2 (with vertical highlight)
  const isAllFilter = activeFilter === 'all';
  const row1Projects = isAllFilter
    ? filteredGridProjects.slice(0, 2)
    : filteredGridProjects;
  const row2Projects = isAllFilter
    ? filteredGridProjects.slice(2)
    : [];

  return (
    <div className="w-full bg-[#000000] text-[#F2F4F7]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. VIDEO EDITING HERO
            ======================================================== */}
        <VideoHero
          activeFilter={activeFilter}
          onFilterChange={(f) => setActiveFilter(f)}
          counts={counts}
        />

        {/* Loading state: Render skeletons instead of hardcoded baseline flash */}
        {isLoading ? (
          <div className="py-6 space-y-12">
            <FeaturedHeroSkeleton aspect="16/9" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCardSkeleton aspectRatio="16/9" />
              <ProjectCardSkeleton aspectRatio="16/9" />
            </div>
          </div>
        ) : (
          <>
            {/* ========================================================
                2. FEATURED VIDEO (PARADOX 2026 AFTERMOVIE)
                ======================================================== */}
            {showFeatured && videoData.featured && (
              <FeaturedVideo
                project={videoData.featured}
                onInspect={() => setSelectedVideo(videoData.featured)}
                onShowNotice={onShowNotice}
              />
            )}

            {/* ========================================================
                3. REGISTRY INDEX // SELECTED VIDEOS
                ======================================================== */}
            <div id="selected-videos-section" className="pt-8 pb-12">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#17191D]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5A623]">
                    SELECTED VIDEOS
                  </span>
                  <span className="text-[#22252A]">—</span>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide">
                    CURATED MOTION ARCHIVE
                  </h2>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-[#6F7682] uppercase tracking-[0.14em]">
                  <ArrowUpDown className="w-3 h-3 text-[#6F7682]" />
                  <span>SORT: CHRONOLOGICAL // REC</span>
                </div>
              </div>

              {/* Empty State per Requirement 18 */}
              {filteredGridProjects.length === 0 && !showFeatured ? (
                <div className="w-full py-20 text-center border border-[#17191D] rounded-[8px] bg-[#080808] my-8">
                  <Film className="w-9 h-9 text-[#6F7682] mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-lg text-[#F2F4F7] uppercase tracking-wider mb-2">
                    NO VIDEOS YET
                  </h3>
                  <p className="font-body text-xs text-[#6F7682] max-w-xs mx-auto mb-5">
                    Switch back to view all edits or check back soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#141414] border border-[#22252A] rounded font-mono text-[11px] uppercase tracking-wider text-[#F5A623] cursor-pointer"
                  >
                    VIEW ALL EDITS
                  </button>
                </div>
              ) : isAllFilter ? (
                /* Editorial Curated Layout (Matching Reference video work.png) */
                <div className="space-y-8">
                  {/* Row 1: Two-column cinematic horizontal cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {row1Projects.map((project) => (
                      <VideoProjectCard
                        key={project.id}
                        project={project}
                        onInspect={() => setSelectedVideo(project)}
                        onShowNotice={onShowNotice}
                      />
                    ))}
                  </div>

                  {/* Row 2: 3-column curated row with vertical 9:16 reel highlight */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* 9:16 Vertical Highlight (Span 4 on large screens) */}
                    {row2Projects[0] && (
                      <div className="lg:col-span-4">
                        <VideoProjectCard
                          project={row2Projects[0]}
                          onInspect={() => setSelectedVideo(row2Projects[0])}
                          onShowNotice={onShowNotice}
                        />
                      </div>
                    )}

                    {/* Two 16:9 cards in remaining 8 columns */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
                      {row2Projects.slice(1).map((project) => (
                        <VideoProjectCard
                          key={project.id}
                          project={project}
                          onInspect={() => setSelectedVideo(project)}
                          onShowNotice={onShowNotice}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Filtered Category Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {filteredGridProjects.map((project) => (
                <VideoProjectCard
                  key={project.id}
                  project={project}
                  onInspect={() => setSelectedVideo(project)}
                  onShowNotice={onShowNotice}
                />
              ))}
            </div>
          )}
        </div>
          </>
        )}

        {/* ========================================================
            4. HOW I EDIT // EDITING APPROACH
            ======================================================== */}
        <EditingApproachSection />

        {/* ========================================================
            5. BOTTOM CTA // HAVE A VIDEO PROJECT?
            ======================================================== */}
        <VideoCTA onContactClick={onContactClick} />
      </div>

      {/* ========================================================
          6. VIDEO DETAIL MODAL
          ======================================================== */}
      <VideoDetailModal
        project={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onInquire={onContactClick}
        onShowNotice={onShowNotice}
      />
    </div>
  );
};
