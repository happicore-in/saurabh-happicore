import { VideoProjectItem } from '../types';

import paradoxImg from '../assets/images/paradox_aftermovie_1788625281034.jpg';
import basketballImg from '../assets/images/basketball_sports_action_1788625811034.jpg';
import documentaryImg from '../assets/images/documentary_gathering_1788625828976.jpg';
import verticalReelImg from '../assets/images/vertical_reel_mockup_1788625867922.jpg';
import badmintonImg from '../assets/images/badminton_teaser_cinematic_1788626637422.jpg';
import marathonImg from '../assets/images/marathon_cinematic_highlight_1788626655128.jpg';

export const FEATURED_VIDEO_PROJECT: VideoProjectItem = {
  id: 'paradox-2026-aftermovie',
  title: 'Paradox 2026 Aftermovie',
  category: 'AFTERMOVIE',
  categoryLabel: 'FEST & CONCERT // FEATURE',
  filterCategory: 'aftermovies',
  description:
    'High-octane concert and fest recap edited with synchronized sound design, dynamic speed ramps, and pyrotechnic color stabilization.',
  duration: '03:42 • 4K 60FPS',
  thumbnail: paradoxImg,
  // When real Google Drive link is connected via backend, it populates here.
  // When undefined, UI renders "VIDEO LINK COMING SOON" per user instructions.
  videoLink: undefined,
  socialMediaLink: undefined,
  socialPlatformName: 'YOUTUBE',
  technologies: ['CapCut PC', 'Premiere Pro', 'DaVinci Resolve'],
  isFeatured: true,
  aspectRatio: '16:9',
};

export const SELECTED_VIDEO_PROJECTS: VideoProjectItem[] = [
  {
    id: 'sportify-annual-recap-2025',
    title: 'Sportify Annual Recap 2025',
    category: 'SPORTS RECAP',
    categoryLabel: 'CHAMPIONSHIP HIGHLIGHT',
    filterCategory: 'sports',
    description:
      'Rhythmic highlight reel capturing championship athletics, intensity, and team spirits crafted for viral collegiate reach.',
    duration: '02:18 • 1080P',
    thumbnail: basketballImg,
    videoLink: undefined,
    socialMediaLink: undefined,
    socialPlatformName: 'INSTAGRAM',
    technologies: ['CapCut PC', 'Premiere Pro'],
    aspectRatio: '16:9',
  },
  {
    id: 'rkm-lucknow-chapter-aftermovie',
    title: 'RKM Lucknow Chapter Aftermovie',
    category: 'AFTERMOVIE',
    categoryLabel: 'DOCUMENTARY RECAP // LONG FORM',
    filterCategory: 'aftermovies',
    description:
      'Documentary-style narrative recap weaving keynote speeches, emotional portraits, and architectural atmosphere.',
    duration: '04:18 • 4K',
    thumbnail: documentaryImg,
    videoLink: undefined,
    socialMediaLink: undefined,
    socialPlatformName: 'DRIVE',
    technologies: ['Premiere Pro', 'Color Grading'],
    aspectRatio: '16:9',
  },
  {
    id: 'promotional-event-reels',
    title: 'Promotional Event Reels (Batch of 8)',
    category: 'SHORT-FORM',
    categoryLabel: 'SHORT-FORM VIRALITY',
    filterCategory: 'short-form',
    description:
      'Fast-paced kinetic typography and beat-matched cuts designed for maximum retention on Instagram Reels and YouTube Shorts.',
    duration: '30s Cuts',
    thumbnail: verticalReelImg,
    videoLink: undefined,
    socialMediaLink: undefined,
    socialPlatformName: 'INSTAGRAM',
    technologies: ['Alight Motion', 'CapCut PC'],
    aspectRatio: '9:16',
    retentionRate: 'RETENTION 84%',
    batchLabel: '9:16 VERTICAL BATCH',
  },
  {
    id: 'paradox-badminton-league-teaser',
    title: 'Paradox Badminton League Teaser',
    category: 'PROMOTIONAL',
    categoryLabel: 'TOURNAMENT TEASER // LEAGUE HYPE',
    filterCategory: 'promotional',
    description:
      'Intense player spotlights with bass drops and quick motion graphic title reveals.',
    duration: '01:15 • 1080P',
    thumbnail: badmintonImg,
    videoLink: undefined,
    socialMediaLink: undefined,
    socialPlatformName: 'INSTAGRAM',
    technologies: ['Premiere Pro', 'Motion Titles'],
    aspectRatio: '16:9',
  },
  {
    id: 'campusrun-marathon-highlight',
    title: 'CampusRun Marathon Highlight',
    category: 'SPORTS RECAP',
    categoryLabel: 'ENDURANCE CINEMATIC // AUDIO DRIVEN',
    filterCategory: 'sports',
    description:
      'Documentary athletics pacing with ambient crowd noise and high-tempo musical build-ups.',
    duration: '01:45 • 1080P',
    thumbnail: marathonImg,
    videoLink: undefined,
    socialMediaLink: undefined,
    socialPlatformName: 'DRIVE',
    technologies: ['CapCut PC', 'Sound Design'],
    aspectRatio: '16:9',
  },
];

export const EDITING_APPROACH_PRINCIPLES = [
  {
    number: '01',
    label: 'STORY & PACING',
    description:
      'Every edit follows an emotional rhythm, balancing high-tempo dynamic cuts with intentional breathing room.',
  },
  {
    number: '02',
    label: 'CLEAN VISUALS',
    description:
      'Color stabilization, film grain emulation, and purposeful framing that elevate raw footage into cinematic grade.',
  },
  {
    number: '03',
    label: 'MUSIC & RHYTHM',
    description:
      'Precision beat matching, layered foley sound design, and sub-bass transients that pull viewers into the screen.',
  },
];

export const PRODUCTION_SPECS = [
  { label: 'EXPORT CODECS', value: 'ProRes 422HQ & H.264 High Profile' },
  { label: 'AUDIO MASTERS', value: '-14 LUFS Integrated' },
  { label: 'DELIVERY LATENCY', value: '< 48HR Turnaround' },
];
