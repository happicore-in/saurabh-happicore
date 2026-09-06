import React, { useState, useEffect } from 'react';
import { X, Play, ExternalLink, Calendar, Tag, ShieldCheck, Sparkles, Film, ArrowRight } from 'lucide-react';
import paradoxImg from '../../assets/images/paradox_aftermovie_1788625281034.jpg';
import webDevImg from '../../assets/images/web_dev_project_1788625300809.jpg';
import { getAnyProjectDetails } from '../../services/portfolioDataService';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
  onInquire?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  projectId,
  onClose,
  onInquire,
}) => {
  if (!projectId) return null;

  const [dynamicProject, setDynamicProject] = useState<{
    title: string;
    category: string;
    year: string;
    image: string;
    overview: string;
    deliverables: string[];
    tools: string[];
    role: string;
    stats?: string;
  } | null>(null);

  const projectDetails: Record<
    string,
    {
      title: string;
      category: string;
      year: string;
      image: string;
      overview: string;
      deliverables: string[];
      tools: string[];
      role: string;
      stats?: string;
    }
  > = {
    'paradox-2024': {
      title: 'Paradox 2024 Aftermovie',
      category: 'VIDEO / FESTIVAL AFTERMOVIE',
      year: '2024',
      image: paradoxImg,
      overview:
        'The official high-energy aftermovie for Paradox 2024. Produced to capture live artist stages, crowd euphoria, and night festival momentum with beat-synchronized jump cuts, lumetri grading, and punchy audio transients.',
      deliverables: [
        'Full 4K Festival Aftermovie (Main Cut)',
        '3x 9:16 Viral Social Teasers for Instagram Reels',
        'Custom Sound Design & Multi-Track Audio Master',
        'LUT Color Grading conforming to night stage lighting',
      ],
      tools: ['Adobe Premiere Pro', 'CapCut Pro', 'Lumetri Color', 'Audition'],
      role: 'Lead Video Editor & Pacing Specialist',
      stats: '150,000+ Social Impressions across campaign run',
    },
    'spotify-recap': {
      title: 'Spotify Annual Recap',
      category: 'VIDEO / SPORTS & MUSIC EVENT',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
      overview:
        'A fast-paced recap combining athletic basketball movement with dynamic musical rhythm. Built with sharp match-cuts, speed ramps, and frame-rate shifts to sustain 90%+ view retention.',
      deliverables: [
        '60-second High Retention Highlight Reel',
        'Custom Sound FX and Beat-Drop Syncing',
        'Motion Typography overlays and scoreboard graphics',
      ],
      tools: ['Adobe Premiere Pro', 'Alight Motion', 'Photoshop'],
      role: 'Video Editor & Motion Designer',
      stats: 'High-retention editorial pacing',
    },
    'event-reels': {
      title: 'Promotional Event Reels',
      category: 'MOTION / CLUB EXPERIENCE',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      overview:
        'A continuous series of viral nightlife reels crafted for venue promotion and ticket conversions. Emphasizes bass-responsive flash frames, dark aesthetic tones, and kinetic typography.',
      deliverables: [
        'Vertical 9:16 Social Reel Suite',
        'Event Lineup Announcements',
        'Real-time Story Teasers for Instagram',
      ],
      tools: ['CapCut', 'Alight Motion', 'Canva'],
      role: 'Content Creator & Reel Editor',
      stats: 'Over 2.4x increase in ticket conversions',
    },
    'lucknow-aftermovie': {
      title: 'Reel / Lucknow Chapter Aftermovie',
      category: 'VIDEOGRAPHY / EVENT FILM',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
      overview:
        'Comprehensive regional event documentation capturing keynote lectures, attendee interviews, and community networking. Blended documentary realism with sleek cinematic pacing.',
      deliverables: [
        'Cinematic Recap Film (16:9 4K)',
        'Keynote Speaker Highlights',
        'Event Archival Package',
      ],
      tools: ['Adobe Premiere Pro', 'Photoshop'],
      role: 'Editor & Colorist',
      stats: 'Official Chapter Documentary Record',
    },
    'web-dev-interactive': {
      title: 'A Web Development Project',
      category: 'WEB / INTERACTIVE EXPERIENCE',
      year: '2024',
      image: webDevImg,
      overview:
        'A high-performance modern web application featuring tactile micro-interactions, responsive design systems, and modular TypeScript components. Engineered with strict adherence to design tokens and fast load times.',
      deliverables: [
        'Complete Frontend Codebase in React & TypeScript',
        'Custom Tailwind CSS Theme Token Architecture',
        'Cross-Browser & Mobile Touchscreen Optimization',
        'Semantic HTML & Accessibility Compliance',
      ],
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub'],
      role: 'Full Frontend Developer & Designer',
      stats: '100% Lighthouse Performance Score',
    },
  };

  useEffect(() => {
    let isMounted = true;
    if (projectId && !projectDetails[projectId]) {
      getAnyProjectDetails(projectId).then((details) => {
        if (isMounted && details) {
          setDynamicProject(details);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const project = dynamicProject || projectDetails[projectId] || projectDetails['paradox-2024'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#000000]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#080808] border border-[#22252A] rounded-[10px] overflow-hidden shadow-2xl my-auto">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#17191D] flex items-center justify-between bg-[#000000]/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[#8FB8E8] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-[#22252A]">•</span>
            <span className="font-mono text-[11px] text-[#6F7682]">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#6F7682] hover:text-[#F2F4F7] hover:bg-[#111111] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Media Preview */}
        <div className="relative aspect-[16/9] w-full bg-[#0D0D0D] overflow-hidden">
          <img
            src={project.image || paradoxImg}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />

          {/* Overlay indicator */}
          <div className="absolute bottom-4 left-6 inline-flex items-center gap-2 px-3 py-1.5 bg-[#000000]/80 backdrop-blur-md border border-[#22252A] rounded-full font-mono text-[11px] text-[#F2F4F7]">
            <Film className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>ROLE: {project.role}</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-wide">
              {project.title}
            </h3>
            <p className="font-body text-[15px] text-[#A7ADB7] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Deliverables & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#17191D]">
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6F7682] block">
                KEY DELIVERABLES
              </span>
              <ul className="space-y-2 font-mono text-[12px] text-[#A7ADB7]">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8FB8E8] mt-0.5">■</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6F7682] block">
                SOFTWARE &amp; ENVIRONMENT
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-[#0D0D0D] border border-[#22252A] text-[#F2F4F7] font-mono text-[11px] uppercase rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.stats && (
                <div className="pt-3">
                  <span className="font-mono text-[10px] text-[#F5A623] uppercase tracking-wider block">
                    HIGHLIGHT STAT
                  </span>
                  <p className="font-mono text-[12px] text-[#F2F4F7]">
                    {project.stats}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-6 border-t border-[#17191D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[11px] text-[#6F7682]">
              DIRECT COMMISSIONS VIA SAURABH / HAPPICORE
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0D0D0D] hover:bg-[#15171B] border border-[#22252A] text-[#A7ADB7] font-mono text-[12px] uppercase rounded transition-colors cursor-pointer"
              >
                CLOSE
              </button>

              <button
                onClick={() => {
                  onClose();
                  onInquire?.();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E8EEF7] hover:bg-[#FFFFFF] text-[#050505] font-mono text-[12px] font-semibold uppercase rounded transition-colors cursor-pointer"
              >
                <span>COMMISSION SIMILAR PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
