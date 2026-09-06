import { GraphicProjectItem } from '../types';

import marathonPosterImg from '../assets/images/marathon_poster_graphic_1788625796892.jpg';
import marathonActionImg from '../assets/images/marathon_cinematic_highlight_1788626655128.jpg';
import badmintonBrandingImg from '../assets/images/badminton_branding_pack_1788625847655.jpg';
import badmintonActionImg from '../assets/images/badminton_teaser_cinematic_1788626637422.jpg';
import paradoxPosterImg from '../assets/images/paradox_social_poster_1788627015044.jpg';
import paradoxCrowdImg from '../assets/images/paradox_aftermovie_1788625281034.jpg';
import jerseyImg from '../assets/images/sportify_jersey_spec_1788627048375.jpg';
import brochureImg from '../assets/images/rkm_brochure_print_1788627068015.jpg';
import swissPosterImg from '../assets/images/happicore_swiss_poster_1788627089753.jpg';
import workspaceImg from '../assets/images/happicore_workspace_1788625252800.jpg';

export const FEATURED_GRAPHIC_PROJECT: GraphicProjectItem = {
  id: 'campusrun-2025-marathon-poster',
  title: 'CampusRun 2025 Flagship Marathon Poster',
  category: 'EVENT POSTER & TYPOGRAPHIC SYSTEM',
  editionLabel: 'EDITION 2025',
  badgeLabel: '3:4 PRINT POSTER',
  specLabel: 'SPEC: A1 594x841mm • 300DPI CMYK',
  filterCategory: 'posters',
  description:
    'Full visual identity for campus 10k marathon: route infographics, typographic billboard series, and volunteer credentials.',
  image: marathonPosterImg,
  images: [
    {
      url: marathonPosterImg,
      label: 'IMAGE 01 // OFFICIAL A1 POSTER',
      caption: 'Vector cartography route map, elevation profile, and registration typography.',
    },
    {
      url: marathonActionImg,
      label: 'IMAGE 02 // OUTDOOR BILLBOARD SERIES',
      caption: 'High-contrast typography system prepared for avenue billboards and lamp post banners.',
    },
  ],
  technologies: ['Adobe Photoshop', 'Illustrator', 'Vector Route Cartography'],
  isFeatured: true,
  aspectRatio: '3:4',
  externalPostLink: undefined,
  platformName: 'BEHANCE / DRIVE',
  viewActionLabel: 'VIEW FULL RESOLUTION',
};

export const SELECTED_GRAPHIC_PROJECTS: GraphicProjectItem[] = [
  {
    id: 'badminton-league-2026-identity-suite',
    title: 'Badminton League 2026 Identity Suite',
    category: 'TOURNAMENT BRANDING',
    editionLabel: 'SEASON 04',
    badgeLabel: 'TOURNAMENT KIT',
    specLabel: 'SUITE: 24 GRAPHIC TEMPLATES',
    filterCategory: 'branding',
    description:
      'Complete tournament graphics toolkit including digital fixture scorecards, player profile stat cards, and court perimeter banners.',
    image: badmintonBrandingImg,
    images: [
      {
        url: badmintonBrandingImg,
        label: 'IMAGE 01 // DIGITAL TEMPLATE SUITE',
        caption: 'Match schedule fixtures, player stat cards, and court perimeter digital boards.',
      },
      {
        url: badmintonActionImg,
        label: 'IMAGE 02 // ON-COURT SMASH SPOTLIGHT',
        caption: 'Fast-turnaround graphic asset for social media match point highlights.',
      },
    ],
    technologies: ['Canva Pro', 'Photoshop', 'Motion Ready'],
    aspectRatio: '16:9',
    externalPostLink: undefined,
    platformName: 'INSTAGRAM',
    viewActionLabel: 'VIEW ASSETS',
  },
  {
    id: 'paradox-2026-stage-announcement',
    title: 'Paradox 2026 Stage & Artist Announcement Series',
    category: 'SOCIAL MEDIA CREATIVES',
    editionLabel: 'CONCERT LINEUP',
    badgeLabel: '1:1 CAROUSEL',
    specLabel: '1080x1080px INSTAGRAM',
    filterCategory: 'social',
    description:
      'High-contrast neon & dark slate concert artist reveals optimized for mobile Instagram feeds.',
    image: paradoxPosterImg,
    images: [
      {
        url: paradoxPosterImg,
        label: 'IMAGE 01 // CONCERT LINEUP CAROUSEL',
        caption: 'Cyberpunk geometric typography, artist hierarchy, and stage timetable reveal.',
      },
      {
        url: paradoxCrowdImg,
        label: 'IMAGE 02 // FESTIVAL ATMOSPHERE ASSET',
        caption: 'Pyrotechnic stage photo composite and festival countdown graphic.',
      },
    ],
    technologies: ['Photoshop', 'Canva', 'Grid Alignment'],
    aspectRatio: '1:1',
    externalPostLink: undefined,
    platformName: 'INSTAGRAM',
    viewActionLabel: 'VIEW POSTERS',
  },
  {
    id: 'sportify-official-jersey-design',
    title: 'The Sportify Society Official Jersey Design',
    category: 'APPAREL & MERCHANDISE',
    editionLabel: 'FABRIC SYSTEM',
    badgeLabel: 'APPAREL SPEC',
    specLabel: 'SUBLIMATION VECTOR READY',
    filterCategory: 'merchandise',
    description:
      'Minimal collegiate athletic wear typography and vector emblem placement.',
    image: jerseyImg,
    images: [
      {
        url: jerseyImg,
        label: 'IMAGE 01 // SUBLIMATION VECTOR SHEET',
        caption: 'Vector placement blueprint with collegiate Ravens lettering and number layout.',
      },
    ],
    technologies: ['Illustrator', 'Print Prep', 'Vector Patches'],
    aspectRatio: '4:3',
    externalPostLink: undefined,
    platformName: 'ARCHIVE',
    viewActionLabel: 'VIEW MOCKUP',
  },
  {
    id: 'rkm-lucknow-annual-convention-brochure',
    title: 'RKM Lucknow Annual Convention Brochure & Print Kit',
    category: 'PRINT & PUBLICATION',
    editionLabel: 'ANNUAL SESSION',
    badgeLabel: 'EDITORIAL BOOKLET',
    specLabel: '32-PAGE SADDLE STITCH',
    filterCategory: 'posters',
    description:
      'Dignified editorial booklet and physical lanyard badges.',
    image: brochureImg,
    images: [
      {
        url: brochureImg,
        label: 'IMAGE 01 // 32-PAGE SADDLE STITCH PROGRAM',
        caption: 'Speakers & sessions agenda spread, grid alignment, and typography hierarchy.',
      },
    ],
    technologies: ['Photoshop', 'InDesign Principles', 'Pre-Press Proofs'],
    aspectRatio: '4:3',
    externalPostLink: undefined,
    platformName: 'ARCHIVE',
    viewActionLabel: 'VIEW PRINT PDF',
  },
  {
    id: 'happicore-abstract-typographic-posters',
    title: 'Happicore Abstract Experimental Typographic Posters',
    category: 'CREATIVE SANDBOX',
    editionLabel: 'HAPPICORE LAB',
    badgeLabel: 'SWISS BRUTALISM',
    specLabel: 'SERIES: 08 VECTOR STUDIES',
    filterCategory: 'branding',
    description:
      'Brutalist and modern Swiss-inspired typographic layout experiments. Exploring micro-grids, asymmetric title weights, and intentional optical collisions.',
    image: swissPosterImg,
    images: [
      {
        url: swissPosterImg,
        label: 'IMAGE 01 // SWISS BRUTALISM STUDY',
        caption: 'Monochrome typographic collision with experimental grid coordinates.',
      },
      {
        url: workspaceImg,
        label: 'IMAGE 02 // HAPPICORE ATELIER',
        caption: 'Development studio environment and print proof inspection.',
      },
    ],
    technologies: ['Photoshop', 'Custom Vectors', 'Type Experimentation'],
    aspectRatio: 'split',
    externalPostLink: undefined,
    platformName: 'HAPPICORE.IN',
    viewActionLabel: 'VIEW EXPERIMENTS',
  },
];

export const GRAPHIC_APPROACH_PRINCIPLES = [
  {
    number: '01',
    label: 'CLEAR VISUAL HIERARCHY',
    description:
      'Structuring visual order so the viewer immediately absorbs primary information, secondary context, and call to action.',
  },
  {
    number: '02',
    label: 'STRONG TYPOGRAPHY',
    description:
      'Pairing expressive display lettering with calibrated body scales, intentional tracking, and optical kerning.',
  },
  {
    number: '03',
    label: 'PURPOSEFUL DESIGN',
    description:
      'Every geometric container, color accent, and negative space margin serves communication rather than decorative clutter.',
  },
];

export const TOOLKIT_ITEMS = [
  {
    name: 'Adobe Photoshop',
    badge: 'PS',
    description: 'High-res comping, color grading, poster layout, and atmospheric texture design.',
    expertise: 'Expertise: 95%',
  },
  {
    name: 'Adobe Illustrator',
    badge: 'AI',
    description: 'Vector logos, bespoke athletic jersey emblems, typographic experiments, and icons.',
    expertise: 'Expertise: 92%',
  },
  {
    name: 'Canva Pro',
    badge: 'CV',
    description: 'Rapid tournament turnaround kits, dynamic social templates, and collaborative assets.',
    expertise: 'Expertise: 98%',
  },
  {
    name: 'Print Preparation',
    badge: 'PRE',
    description: 'Color separations, bleed specifications, spot UV finishes, and press-ready CMYK PDF/X.',
    expertise: 'Calibration: 100%',
  },
  {
    name: 'Brand Guidelines',
    badge: 'DOC',
    description: 'Scale hierarchies, clearspace formulas, color palettes, and typographic rulebooks.',
    expertise: 'Systems: Active',
  },
];

export const PREPRESS_FIDELITY = [
  { label: 'COLOR ACCURACY', value: 'Delta-E < 1.5' },
  { label: 'EXPORT FORMATS', value: 'SVG / PDF-X / PNG' },
  { label: 'RATIOS', value: '3:4 / 1:1 / 16:9' },
];
