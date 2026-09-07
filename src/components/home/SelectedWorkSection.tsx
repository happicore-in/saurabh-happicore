import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ExternalLink, Sparkles } from 'lucide-react';
import paradoxImg from '../../assets/images/paradox_aftermovie_1788625281034.jpg';
import webDevImg from '../../assets/images/web_dev_project_1788625300809.jpg';
import { getPublicHomeFeaturedProjects, PublicHomeFeaturedItem } from '../../services/portfolioDataService';
import { SelectedWorkSectionSkeleton } from '../common/Skeletons';

interface SelectedWorkSectionProps {
  onViewAllWork?: () => void;
  onProjectClick?: (projectId: string) => void;
}

const DEFAULT_FEATURED: PublicHomeFeaturedItem[] = [
  {
    id: 'paradox-2026-aftermovie',
    type: 'video',
    title: 'Paradox 2026 Aftermovie',
    categoryLabel: 'VIDEO / FESTIVAL AFTERMOVIE',
    year: '2026',
    image: paradoxImg,
    description:
      'Official energetic festival aftermovie capturing raw crowd euphoria, stage pyrotechnics, and live musical momentum with rhythmic cutting and deep color grading.',
    badgeLabel: 'AFTERMOVIE • 4K',
    tags: ['PACING & SOUND DESIGN', 'COLOR GRADING'],
    role: 'DIRECTION & EDIT',
  },
  {
    id: 'spotify-recap',
    type: 'video',
    title: 'Spotify Annual Recap',
    categoryLabel: 'VIDEO / SPORTS EVENT',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    description:
      'High-retention sports promotional recap film with dynamic pacing, synchronized beat markers, and high-contrast color grading.',
    badgeLabel: 'SPORTS RECAP',
    tags: ['FAST-CUT EDITING', 'PACING'],
    role: 'FAST-CUT EDITING',
  },
  {
    id: 'event-reels',
    type: 'video',
    title: 'Promotional Event Reels',
    categoryLabel: 'MOTION / CLUB EXPERIENCE',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    description:
      'High-conversion promotional short-form motion editorial content for live entertainment venues, driving viral social reach and ticket conversions.',
    badgeLabel: 'CLUB EXPERIENCE',
    tags: ['SOCIAL CAMPAIGN', '9:16 REELS'],
    role: 'SOCIAL CAMPAIGN',
  },
  {
    id: 'lucknow-aftermovie',
    type: 'video',
    title: 'Reel / Lucknow Chapter Aftermovie',
    categoryLabel: 'VIDEOGRAPHY / EVENT FILM',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    description:
      'Cinematic event documentation and brand recap film with sound design, attendee voiceovers, and crowd energy.',
    badgeLabel: 'EVENT DOCUMENTARY',
    tags: ['CINEMATIC DOCUMENTARY', 'AUDIO MASTER'],
    role: 'CINEMATIC DOCUMENTARY',
  },
  {
    id: 'web-dev-interactive',
    type: 'web',
    title: 'A Web Development Project',
    categoryLabel: 'WEB / INTERACTIVE',
    year: '2024',
    image: webDevImg,
    description:
      'Modern responsive system and high-performance digital presence with bespoke interactions, modular architecture, and micro-animations.',
    badgeLabel: 'WEB INTERFACE',
    tags: ['REACT & TAILWIND', 'TYPESCRIPT'],
    role: 'REACT & TAILWIND',
  },
];

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onViewAllWork,
  onProjectClick,
}) => {
  const [projects, setProjects] = useState<PublicHomeFeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const loadFeatured = async (silent = false) => {
      try {
        const list = await getPublicHomeFeaturedProjects();
        if (isMounted) {
          setProjects(list || []);
          if (!silent) {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.warn('SelectedWorkSection load notice:', err);
        if (isMounted && !silent) {
          setProjects([]);
          setIsLoading(false);
        }
      }
    };

    loadFeatured(false);

    const handleUpdate = () => {
      loadFeatured(true);
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const heroProject = projects[0];
  const gridProjects = projects.slice(1);

  const renderBadgeIcon = (type: string, isHero = false) => {
    const sizeClass = isHero ? 'w-3 h-3' : 'w-2.5 h-2.5';
    if (type === 'video') {
      return <Play className={`${sizeClass} text-[#F5A623] fill-[#F5A623]`} />;
    }
    if (type === 'web') {
      return <ExternalLink className={`${sizeClass} text-[#8FB8E8]`} />;
    }
    return <Sparkles className={`${sizeClass} text-[#F5A623]`} />;
  };

  return (
    <section id="work" className="w-full bg-[#000000] py-24 border-t border-[#17191D]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#17191D]">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block">
              01 / SELECTED WORK
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] uppercase tracking-[-0.02em]">
              WORK THAT SPEAKS
            </h2>
          </div>
          <p className="font-body text-base text-[#A7ADB7] max-w-md">
            A selection of projects across video editing, graphic design, and web development.
          </p>
        </div>

        {/* WORK GRID OR SKELETON */}
        <div className="pt-12 space-y-12">
          {isLoading ? (
            <SelectedWorkSectionSkeleton />
          ) : heroProject ? (
            <>
              {/* 1. LARGE HERO CARD */}
              <div
                onClick={() => onProjectClick?.(heroProject.id)}
                className="group relative w-full bg-[#080808] border border-[#22252A] rounded-[8px] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#8FB8E8]/40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Image side (16:9 on mobile, span 7 or 8 on desktop) */}
                  <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-[#0D0D0D]">
                    <img
                      src={heroProject.image}
                      alt={heroProject.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#080808]/90 pointer-events-none" />
                    
                    {/* Play indicator badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#000000]/80 backdrop-blur-md border border-[#22252A] rounded-full font-mono text-[11px] text-[#F2F4F7] tracking-wider uppercase">
                      {renderBadgeIcon(heroProject.type, true)}
                      <span>{heroProject.badgeLabel}</span>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.14em] uppercase text-[#8FB8E8]">
                        <span>{heroProject.categoryLabel}</span>
                        <span className="text-[#6F7682]">{heroProject.year}</span>
                      </div>

                      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#8FB8E8] transition-colors">
                        {heroProject.title}
                      </h3>

                      <p className="font-body text-[14px] sm:text-[15px] text-[#A7ADB7] leading-relaxed">
                        {heroProject.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {heroProject.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-[#111111] border border-[#22252A] rounded text-[10px] font-mono text-[#6F7682] uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#17191D] flex items-center justify-between">
                      <span className="group-hover:translate-x-1 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-all">
                        <span>VIEW PROJECT</span>
                        <ArrowRight className="w-4 h-4 text-[#8FB8E8]" />
                      </span>
                      <span className="font-mono text-[11px] text-[#6F7682]">
                        {heroProject.role}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 2. TWO-COLUMN ROW / REMAINING FEATURED PROJECTS */}
              {gridProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {gridProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => onProjectClick?.(proj.id)}
                      className="group relative bg-[#080808] border border-[#22252A] rounded-[8px] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#8FB8E8]/40 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center filter contrast-[1.1] brightness-85 transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#000000]/80 backdrop-blur-md border border-[#22252A] rounded-full font-mono text-[10px] text-[#F2F4F7] tracking-wider uppercase">
                          {renderBadgeIcon(proj.type, false)}
                          <span>{proj.badgeLabel}</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.12em] uppercase text-[#8FB8E8]">
                            <span>{proj.categoryLabel}</span>
                            <span className="text-[#6F7682]">{proj.year}</span>
                          </div>
                          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F2F4F7] uppercase tracking-wide group-hover:text-[#8FB8E8] transition-colors">
                            {proj.title}
                          </h3>
                          <p className="font-body text-[14px] text-[#A7ADB7] leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#17191D] flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-colors">
                            <span>VIEW PROJECT</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                          <span className="font-mono text-[10px] text-[#6F7682]">
                            {proj.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : null}

          {/* VIEW ALL WORK BUTTON */}
          <div className="pt-8 text-center">
            <button
              onClick={onViewAllWork}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0D0D0D] hover:bg-[#15171B] text-[#F2F4F7] border border-[#2A2E35] hover:border-[#8FB8E8] rounded-[4px] font-mono text-[13px] uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer group"
            >
              <span>VIEW ALL WORK</span>
              <ArrowRight className="w-4 h-4 text-[#8FB8E8] transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

