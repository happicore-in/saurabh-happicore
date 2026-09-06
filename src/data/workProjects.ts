import { WorkProject } from '../types';

import paradoxImg from '../assets/images/paradox_aftermovie_1788625281034.jpg';
import webDevImg from '../assets/images/web_dev_project_1788625300809.jpg';
import marathonImg from '../assets/images/marathon_poster_graphic_1788625796892.jpg';
import basketballImg from '../assets/images/basketball_sports_action_1788625811034.jpg';
import documentaryImg from '../assets/images/documentary_gathering_1788625828976.jpg';
import happicoreImg from '../assets/images/happicore_workspace_1788625252800.jpg';
import badmintonImg from '../assets/images/badminton_branding_pack_1788625847655.jpg';
import verticalReelImg from '../assets/images/vertical_reel_mockup_1788625867922.jpg';

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'paradox-2026',
    index: '01',
    title: 'Paradox 2026 Aftermovie',
    category: 'video',
    subcategory: 'FESTIVAL CINEMA',
    duration: '03:42 RUNTIME',
    institutionOrLocation: 'IIT MADRAS',
    badgeLabel: 'VIDEO PRODUCTION',
    description:
      'High-energy festival cinematic recap capturing 15,000+ attendees. Layered multi-cam synchronization, rhythm-locked speed ramps, color-graded pyrotechnic stages, and bass-heavy audio mastering.',
    tags: ['CapCut PC', 'Premiere Pro', 'Sound Design'],
    actionLabel: 'View Film Project',
    featured: true,
    aspectRatio: 'featured-wide',
    image: paradoxImg,
  },
  {
    id: 'sportify-platform',
    index: '02',
    title: 'Sportify Digital Platform',
    category: 'web',
    subcategory: 'WEB APPLICATION',
    badgeLabel: 'WEB ARCHITECTURE',
    description:
      'Central sports registry and live bracket tracker. Engineered for real-time tournament telemetry, low data latency, and smooth responsive animations.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    actionLabel: 'View System',
    liveUrl: 'https://happicore.in',
    githubUrl: 'https://github.com/happicore',
    image: webDevImg,
  },
  {
    id: 'campus-run-2025',
    index: '03',
    title: 'CampusRun 2025 Campaign',
    category: 'graphic',
    subcategory: 'CAMPAIGN IDENTITY',
    badgeLabel: 'GRAPHIC SYSTEMS',
    description:
      'Full visual identity for campus 10k marathon: route infographics, typographic billboard series, volunteer kit badges, and social media blitz.',
    tags: ['Photoshop', 'Illustrator', 'Print Prep'],
    actionLabel: 'View Posters',
    image: marathonImg,
  },
  {
    id: 'sportify-annual-recap',
    index: '04',
    title: 'Sportify Annual Recap',
    category: 'video',
    subcategory: 'SPORTS HIGHLIGHT',
    duration: '01:45 RUNTIME',
    badgeLabel: 'VIDEO PRODUCTION',
    description:
      'High-tempo sports montage with hard audio cuts, micro impact shakes, synchronized beat transients, and athlete focus spotlights.',
    tags: ['Premiere Pro', 'After Effects'],
    actionLabel: 'Watch Reel',
    image: basketballImg,
  },
  {
    id: 'rkm-lucknow-aftermovie',
    index: '05',
    title: 'RKM Lucknow Aftermovie',
    category: 'video',
    subcategory: 'DOCUMENTARY FILM',
    duration: '04:12 RUNTIME',
    badgeLabel: 'VIDEO PRODUCTION',
    description:
      'Narrative documentary coverage with intimate ambient voiceovers, gentle rhythm-paced cuts, and dignified historical grading.',
    tags: ['DaVinci Resolve', 'Color Grading'],
    actionLabel: 'View Narrative',
    image: documentaryImg,
  },
  {
    id: 'happicore-studio-experience',
    index: '06',
    title: 'Happicore Studio Experience',
    category: 'web',
    subcategory: 'CREATIVE STUDIO',
    badgeLabel: 'WEB ENGINEERING',
    description:
      'High-performance bespoke portfolio platform featuring custom state routers, zero-layout-shift image orchestration, and fluid viewport micro-interactions.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    actionLabel: 'Inspect Build',
    liveUrl: 'https://happicore.in',
    githubUrl: 'https://github.com/happicore',
    image: happicoreImg,
  },
  {
    id: 'badminton-league-branding',
    index: '07',
    title: 'Badminton League 2026 Branding',
    category: 'graphic',
    subcategory: 'IDENTITY SYSTEM',
    badgeLabel: 'GRAPHIC SYSTEMS',
    extraBadge: '14 ASSET BUNDLE',
    description:
      'Complete tournament graphics toolkit including digital fixture scorecards, player profile stat cards, court perimeter banners, and social countdown reels.',
    tags: ['Figma', 'Illustrator', 'Social Assets'],
    actionLabel: 'View Brand Pack',
    image: badmintonImg,
  },
  {
    id: 'promotional-social-reels',
    index: '08',
    title: 'Promotional Social Reels Series',
    category: 'video',
    subcategory: 'SHORT-FORM CAMPAIGN',
    badgeLabel: '9:16 VERTICAL REEL',
    extraBadge: 'SEASON 2025',
    duration: '00:45 RUNTIME',
    description:
      'Engineered for instantaneous retention on Instagram and YouTube Shorts. Kinetic typography with millisecond SFX alignment, motion-tracked subtitles, speed curves, and high-impact hook sequences.',
    metrics: [
      { label: 'AVERAGE RETENTION', value: '84.2%' },
      { label: 'REELS DELIVERED', value: '12 Edits' },
      { label: 'PACING', value: '1.2s avg cut' },
    ],
    tags: ['CapCut PC', 'After Effects', 'Sound FX Foley'],
    actionLabel: 'View Reels Suite',
    aspectRatio: 'horizontal-split',
    image: verticalReelImg,
  },
];
