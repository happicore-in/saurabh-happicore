import { WebProjectItem } from '../types';

import sportifyImg from '../assets/images/sportify_browser_app_1788626202244.jpg';
import creativeHubImg from '../assets/images/creative_hub_nextjs_1788626253942.jpg';
import auctionEngineImg from '../assets/images/auction_engine_ui_1788626224474.jpg';
import riftDashboardImg from '../assets/images/web_dev_project_1788625300809.jpg';
import swissPortfolioImg from '../assets/images/swiss_portfolio_v1_1788626239019.jpg';

export const FLAGSHIP_WEB_PROJECT: WebProjectItem = {
  id: 'sportify-digital-platform',
  index: '01',
  title: 'SPORTIFY DIGITAL PLATFORM',
  badgeLabel: 'FLAGSHIP RELEASE // 2024',
  filterType: 'fullstack',
  categoryLabel: 'CENTRAL SPORTS REGISTRY',
  description:
    'Central sports tournament registry and live bracket tracker for IIT Madras sports society. Engineered for real-time score updates, low-latency telemetry, and smooth responsive mobile views.',
  image: sportifyImg,
  technologies: ['React', 'Tailwind CSS', 'Firebase', 'Vite'],
  liveUrl: 'https://sportify.iitm.ac.in',
  githubUrl: 'https://github.com/happicore/sportify-platform',
  isFlagship: true,
  telemetryLatency: '< 42ms sync',
  browserUrl: 'sportify.iitm.ac.in/championship/live',
  scoreTicker: 'LIVE FINAL Mandakini Bulls 78 : 72 Alakananda Knights Q4 02:18',
};

export const SELECTED_WEB_PROJECTS: WebProjectItem[] = [
  {
    id: 'happicore-creative-hub',
    index: '02',
    title: 'HAPPICORE CREATIVE HUB',
    badgeLabel: 'NEXT.JS FRAMEWORK',
    filterType: 'portfolios',
    categoryLabel: 'ATELIER HUB',
    description:
      'Fast, responsive, and tactile web interfaces constructed with clean modern frameworks and fluid animations.',
    image: creativeHubImg,
    technologies: ['Next.js', 'Framer Motion', 'Tailwind'],
    liveUrl: 'https://happicore.in',
    githubUrl: 'https://github.com/happicore/atelier-hub',
  },
  {
    id: 'paradox-badminton-league',
    index: '03',
    title: 'PARADOX BADMINTON LEAGUE PORTAL',
    badgeLabel: 'LIVE AUCTION ENGINE',
    filterType: 'tools',
    categoryLabel: 'TOURNAMENT AUCTION',
    description:
      'Live player auction room, team roster organizer, and digital scoring display. Built for low-latency bidding wars and dynamic purse calculations.',
    image: auctionEngineImg,
    technologies: ['JavaScript (ES6+)', 'HTML5/CSS3', 'Firebase'],
    liveUrl: 'https://paradox-badminton.web.app',
    githubUrl: 'https://github.com/happicore/badminton-auction-engine',
  },
  {
    id: 'rift26-computational-dashboard',
    index: '04',
    title: "RIFT'26 COMPUTATIONAL DASHBOARD",
    badgeLabel: 'ALGORITHMIC VIZ',
    filterType: 'tools',
    categoryLabel: 'HACKATHON CORE',
    description:
      'Hackathon prototype displaying rapid algorithmic data visualizations and real-time interface widgets.',
    image: riftDashboardImg,
    technologies: ['React', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://rift26-dashboard.web.app',
    githubUrl: 'https://github.com/happicore/rift26-telemetry',
  },
  {
    id: 'modern-multidisciplinary-portfolio-v1',
    index: '05',
    title: 'MODERN MULTIDISCIPLINARY PORTFOLIO V1',
    badgeLabel: 'SEMANTIC ZERO-FAT',
    filterType: 'portfolios',
    categoryLabel: 'MINIMAL SHOWCASE',
    description:
      'Ultra-lightweight static portfolio built with semantic HTML, CSS utility architecture, and minimal JS footprint.',
    image: swissPortfolioImg,
    technologies: ['HTML5', 'CSS3', 'Vanilla JS'],
    liveUrl: 'https://saurabh-v1.web.app',
    githubUrl: 'https://github.com/happicore/saurabh-portfolio-v1',
  },
  {
    id: 'web-project-coming-soon',
    index: '06',
    title: 'WEB PROJECT COMING SOON',
    badgeLabel: 'ACTIVE DEVELOPMENT',
    filterType: 'fullstack',
    categoryLabel: 'INCUBATION LAB',
    description:
      'New full-stack web application prototype currently in active development. Staging deployment and public repository arriving soon.',
    image: riftDashboardImg,
    technologies: ['TypeScript', 'React', 'Firebase'],
    isComingSoon: true,
  },
];

export const CORE_WEB_TECHNOLOGIES = [
  { name: 'HTML5 / Semantic', dotColor: '#8FB8E8' },
  { name: 'CSS3 / Tailwind', dotColor: '#38BDF8' },
  { name: 'JavaScript (ES6+)', dotColor: '#F5A623' },
  { name: 'React', dotColor: '#61DAFB' },
  { name: 'Firebase', dotColor: '#FFCA28' },
  { name: 'GitHub CI/CD', dotColor: '#F2F4F7' },
];

export const WEB_APPROACH_POINTS = [
  {
    number: '01',
    title: 'CLEAN INTERFACES',
    description:
      'Crafted with high typographic contrast, mathematical spacing, and zero superfluous decoration.',
  },
  {
    number: '02',
    title: 'RESPONSIVE EXPERIENCES',
    description:
      'Fluid layouts designed from mobile touchscreens to ultra-wide desktop viewports.',
  },
  {
    number: '03',
    title: 'MODERN TECHNOLOGY',
    description:
      'Built on modern component architectures, resilient state management, and fast bundle outputs.',
  },
];
