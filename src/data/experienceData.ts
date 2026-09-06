import { ExperienceItem, CertificationItem } from '../types';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'deputy-head-design-media',
    sysRole: 'SYS.ROLE / 01',
    role: 'DEPUTY HEAD — DESIGN & MEDIA',
    organization: 'The Sportify',
    organizationSubtext: 'IIT Madras BS Degree Sports Society',
    date: 'Nov 2025 — Jun 2026',
    location: 'Chennai / Hybrid',
    statusBadge: 'CURRENT TENURE',
    badgeType: 'current',
    responsibilities: [
      'Led end-to-end visual direction, editorial identity, and integrated media campaigns for university-wide sports championships.',
      'Spearheaded post-production video editing pipelines, social design workflows, and real-time event coverage frameworks.',
      'Standardized design guidelines ensuring cross-channel consistency from print banners to short-form reel assets.',
      'Directed editing pipeline for sports/event aftermovies and promotional videos, working from footage selection through final export.',
      'Led design and media for RKM Lucknow Chapter aftermovie, annual Sportify recap video, certificates, meetup posters, and social media creatives.',
    ],
    tags: ['Art Direction', 'After Effects', 'Typography Systems', 'Media Production'],
  },
  {
    id: 'lead-creative-design',
    sysRole: 'SYS.ROLE / 02',
    role: 'LEAD — CREATIVE & DESIGN',
    organization: 'The Sportify',
    organizationSubtext: 'IIT Madras BS Degree Sports Society',
    date: 'Feb 2026 — Mar 2026',
    location: 'Chennai',
    responsibilities: [
      'Supervised a team of graphic designers and motion editors in executing rapid-deployment tournament visual assets.',
      'Delivered tournament collateral, team jersey graphics, matchday announcements, and high-impact social teasers.',
      'Coordinated creative and design delivery on strict event timelines while overseeing visual and pacing consistency across video content.',
    ],
    tags: ['Merchandise Design', 'Visual Identity', 'Creative Leadership'],
  },
  {
    id: 'lead-coordinator-lucknow',
    sysRole: 'SYS.ROLE / 03',
    role: 'LEAD COORDINATOR',
    organization: 'The Sportify',
    organizationSubtext: 'IIT Madras BS Degree Sports Society',
    date: 'Feb 2026',
    location: 'Lucknow Chapter',
    responsibilities: [
      'Coordinated regional chapter operational activities, athlete schedules, and live venue media setup in Lucknow.',
      'Oversaw on-ground media capture, photography direction, and community member engagement during match play.',
      'Supported regional event operations and expedited media requirements.',
    ],
    tags: ['Regional Operations', 'Field Production', 'Event Management'],
  },
  {
    id: 'head-tech-digital',
    sysRole: 'SYS.ROLE / 04',
    role: 'HEAD — TECHNOLOGY & DIGITAL INNOVATION',
    organization: 'The Sportify',
    organizationSubtext: 'IIT Madras BS Degree Sports Society',
    date: 'Nov 2025 — Present',
    location: 'Digital Core',
    statusBadge: 'ENGINEERING LEAD',
    badgeType: 'engineering',
    responsibilities: [
      'Directed web portal development, automated registration portals, and digital scoring display interfaces.',
      'Integrated low-latency fixtures API, player bio management, and real-time public leaderboard dashboards.',
      'Supported web/digital experiences and technical implementation across society initiatives.',
    ],
    tags: ['Frontend Architecture', 'Responsive UI', 'API Integration', 'Tailwind CSS'],
  },
  {
    id: 'volunteer-campusrun',
    sysRole: 'SYS.ROLE / 05',
    role: 'VOLUNTEER',
    organization: 'The CampusRun',
    organizationSubtext: 'Paradox 2025',
    date: '2025 Edition',
    location: 'Campus Marathon',
    statusBadge: '2025 Edition',
    badgeType: 'edition',
    responsibilities: [
      'Supported logistics, athlete engagement, and live media capture during the flagship campus marathon event.',
      'Curated fast-action photography packages and short reel snippets for social release within hours of race completion.',
    ],
    tags: ['Live Dispatch', 'Athlete Support', 'Photography'],
  },
  {
    id: 'deputy-head-badminton-league',
    sysRole: 'SYS.ROLE / 06',
    role: 'DEPUTY HEAD — PARADOX BADMINTON LEAGUE',
    organization: 'Paradox 2026',
    organizationSubtext: 'Flagship Annual Festival',
    date: '2026 Season',
    location: 'Arena League',
    statusBadge: '2026 Season',
    badgeType: 'season',
    responsibilities: [
      'Managed tournament fixture design, player auction graphics, and comprehensive promotional media rollouts.',
      'Generated high-contrast broadcast cards, player statistic overlays, and audience interaction mechanics.',
    ],
    tags: ['Auction Visuals', 'Fixture Typography', 'Broadcast Graphics'],
  },
];

export const EXPERIENCE_SUMMARY_STATS = [
  {
    value: '3+',
    label: 'ROLES & CHAIRS',
    subtext: 'Leadership & Executive Roles across media & technology',
    accentColor: '#F5A623',
  },
  {
    value: '6+',
    label: 'CAMPAIGNS',
    subtext: 'Major Tournaments & Flagship University Events Directed',
    accentColor: '#8FB8E8',
  },
  {
    value: 'IIT Madras BS',
    label: 'AFFILIATION',
    subtext: 'The Sportify Society Executive Core Board Member',
    accentColor: '#F2F4F7',
  },
  {
    value: '99.4% SLA',
    label: 'OUTPUT VELOCITY',
    subtext: 'Identity / Broadcast • High Yield Delivery',
    accentColor: '#8FB8E8',
    isVelocityChart: true,
  },
];

export const EXPERIENCE_SKILLS = [
  'VIDEO PRODUCTION',
  'GRAPHIC DESIGN',
  'WEB DEVELOPMENT',
  'CREATIVE LEADERSHIP',
  'EVENT MEDIA',
  'DIGITAL INNOVATION',
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'canva-essentials',
    title: 'CANVA ESSENTIALS',
    issuer: 'Design & Visual Communication',
    type: 'CREATIVE',
  },
  {
    id: 'rift-26-hackathon',
    title: "RIFT'26 HACKATHON — PARTICIPANT",
    issuer: 'Technical Problem Solving',
    type: 'ENGINEERING',
  },
  {
    id: 'fullstack-foundations',
    title: 'FOUNDATIONS OF FULL STACK DEVELOPMENT',
    issuer: 'Web Architecture & Modern APIs',
    type: 'DEVELOPMENT',
  },
  {
    id: 'appreciation-tech',
    title: 'CERTIFICATE OF APPRECIATION — TECHNOLOGY & DIGITAL INNOVATION',
    issuer: 'The Sportify Society • IIT Madras BS',
    type: 'LEADERSHIP',
  },
];

export const EDUCATION_ENTRY = {
  institution: 'INDIAN INSTITUTE OF TECHNOLOGY MADRAS',
  degree: 'BS DEGREE IN DATA SCIENCE AND APPLICATIONS',
  status: 'ONGOING',
  details: 'Interdisciplinary curriculum spanning algorithmic data structures, software architecture, mathematics, and digital media applications.',
};
