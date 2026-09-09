export interface ToolItem {
  name: string;
  logo: string;
  role: string;
  type: string;
  tag: string;
  badge?: string;
  category: 'creative' | 'dev';
}

export const CREATIVE_TOOLS: ToolItem[] = [
  {
    name: 'CapCut',
    logo: '/logos/capcut.svg',
    role: 'Short-form pacing, audio ducking, viral social reels',
    type: 'VIDEO',
    tag: 'MOBILE & DESKTOP',
    badge: 'Video Editor',
    category: 'creative',
  },
  {
    name: 'Adobe Premiere Pro',
    logo: '/logos/premierepro.svg',
    role: 'Multi-cam editing, lumetri color grading, dynamic sound design',
    type: 'NLE SUITE',
    tag: 'INDUSTRY STANDARD',
    badge: 'Pro NLE',
    category: 'creative',
  },
  {
    name: 'Adobe Photoshop',
    logo: '/logos/photoshop.svg',
    role: 'Thumbnail composition, texture blending, photo manipulation',
    type: 'RASTER GRAPHICS',
    tag: 'IMAGE POST-PRODUCTION',
    badge: 'Raster Studio',
    category: 'creative',
  },
  {
    name: 'Alight Motion',
    logo: '/logos/alightmotion.svg',
    role: 'Keyframe curve animation, visual motion graphics, typography transitions',
    type: 'MOTION GRAPHICS',
    tag: 'VECTOR ANIMATION',
    badge: 'Motion FX',
    category: 'creative',
  },
  {
    name: 'Canva',
    logo: '/logos/canva.svg',
    role: 'Rapid brand asset prototyping, social grid templates, pitch decks',
    type: 'LAYOUT & COLLAB',
    tag: 'RAPID COMPOSITION',
    badge: 'Visual Design',
    category: 'creative',
  },
];

export const DEV_TOOLS: ToolItem[] = [
  {
    name: 'HTML5',
    logo: '/logos/html5.svg',
    role: 'Accessible document structure, semantic markup, web standards',
    type: 'CORE WEB',
    tag: 'FOUNDATION',
    badge: 'Markup Standard',
    category: 'dev',
  },
  {
    name: 'CSS3',
    logo: '/logos/css3.svg',
    role: 'Utility-first styling, design system tokens, responsive breakpoints',
    type: 'STYLING ENGINE',
    tag: 'RESPONSIVE UI',
    badge: 'Modern Layouts',
    category: 'dev',
  },
  {
    name: 'JavaScript',
    logo: '/logos/javascript.svg',
    role: 'Asynchronous event loops, DOM manipulation, client logic',
    type: 'SCRIPTING',
    tag: 'DYNAMIC RUNTIME',
    badge: 'ES6+ Engine',
    category: 'dev',
  },
  {
    name: 'React',
    logo: '/logos/react.svg',
    role: 'Component architecture, reactive state management, virtual DOM',
    type: 'FRAMEWORK',
    tag: 'APPLICATION UI',
    badge: 'UI Library',
    category: 'dev',
  },
  {
    name: 'Firebase',
    logo: '/logos/firebase.svg',
    role: 'Authentication, Firestore realtime database, cloud storage',
    type: 'BACKEND AS SERVICE',
    tag: 'CLOUD BACKEND',
    badge: 'Serverless Cloud',
    category: 'dev',
  },
  {
    name: 'GitHub',
    logo: '/logos/github.svg',
    role: 'Version control, atomic commits, branch workflows, deployment pipelines',
    type: 'VERSION CONTROL',
    tag: 'COLLABORATION',
    badge: 'DevOps & Git',
    category: 'dev',
  },
];

export const ALL_TOOLS_MAP: Record<string, string> = {
  capcut: '/logos/capcut.svg',
  'capcut pc': '/logos/capcut.svg',
  'adobe premiere pro': '/logos/premierepro.svg',
  'premiere pro': '/logos/premierepro.svg',
  premiere: '/logos/premierepro.svg',
  photoshop: '/logos/photoshop.svg',
  'adobe photoshop': '/logos/photoshop.svg',
  'alight motion': '/logos/alightmotion.svg',
  canva: '/logos/canva.svg',
  'canva pro': '/logos/canva.svg',
  html: '/logos/html5.svg',
  html5: '/logos/html5.svg',
  css: '/logos/css3.svg',
  css3: '/logos/css3.svg',
  'tailwind css': '/logos/css3.svg',
  javascript: '/logos/javascript.svg',
  js: '/logos/javascript.svg',
  'javascript (es6+)': '/logos/javascript.svg',
  react: '/logos/react.svg',
  'react.js': '/logos/react.svg',
  firebase: '/logos/firebase.svg',
  github: '/logos/github.svg',
  git: '/logos/github.svg',
  'git & github': '/logos/github.svg',
};

export function getToolLogo(name: string): string | null {
  const normalized = name.toLowerCase().trim();
  return ALL_TOOLS_MAP[normalized] || null;
}
