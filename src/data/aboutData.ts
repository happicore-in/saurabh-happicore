export interface AboutProfileData {
  name: string;
  titles: string[];
  bioHeading: string;
  bioParagraph1: string;
  bioParagraph2: string;
  location: string;
  coordinates: string;
  education: {
    institution: string;
    degree: string;
    status: string;
    details: string;
    focusAreas: string[];
  };
  focus: string;
  availability: string;
  phone: string;
  personalEmail: string;
  workEmail: string;
  happicoreUrl: string;
  profileImage?: string;
}

export const ABOUT_PROFILE: AboutProfileData = {
  name: 'SAURABH',
  titles: ['Video Editor', 'Graphic Designer', 'Web Developer'],
  bioHeading: 'Bridging creative work with digital technology.',
  bioParagraph1:
    'I work across video editing, graphic design and web development, combining visual storytelling with clean digital execution. Currently pursuing a BS Degree in Data Science and Applications at the Indian Institute of Technology Madras (IIT Madras).',
  bioParagraph2:
    'I enjoy transforming raw ideas, footage and concepts into polished experiences for events, creators, brands and digital projects across India.',
  location: 'Mau, Uttar Pradesh, India',
  coordinates: 'LAT 25.9436° N | LON 83.5606° E | MAU • UTTAR PRADESH',
  education: {
    institution: 'Indian Institute of Technology Madras',
    degree: 'BS Degree in Data Science and Applications',
    status: 'Ongoing since 2025',
    details:
      'Immersed in an elite quantitative and technological curriculum balancing rigorous algorithms with applied systems. Bridging technical computation with high-aesthetic design architecture.',
    focusAreas: ['Computational Thinking', 'Data Visualization', 'Web Architecture', 'Digital Media Systems'],
  },
  focus: 'Video • Graphic • Web',
  availability: 'Available for freelance work & selective collaborations',
  phone: '+91 8127122102',
  personalEmail: 'saurabhcore31@gmail.com',
  workEmail: 'happicore.in@gmail.com',
  happicoreUrl: 'https://happicore.in',
};

export interface WhatIDoItem {
  number: string;
  title: string;
  category: 'video' | 'graphic' | 'web';
  skills: string[];
  actionNavId: string;
}

export const WHAT_I_DO_ITEMS: WhatIDoItem[] = [
  {
    number: '01',
    title: 'VIDEO EDITING',
    category: 'video',
    skills: ['Aftermovies', 'Promotional Videos', 'Event Recaps', 'Short-form Content'],
    actionNavId: 'video',
  },
  {
    number: '02',
    title: 'GRAPHIC DESIGN',
    category: 'graphic',
    skills: ['Posters', 'Social Media Creatives', 'Branding', 'Visual Systems'],
    actionNavId: 'graphic',
  },
  {
    number: '03',
    title: 'WEB DEVELOPMENT',
    category: 'web',
    skills: ['Websites', 'Frontend Development', 'Digital Experiences', 'Interactive Interfaces'],
    actionNavId: 'web',
  },
];

export interface ApproachPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
  footerTag: string;
}

export const APPROACH_PRINCIPLES: ApproachPrinciple[] = [
  {
    number: '01',
    title: 'STORY',
    tagline: 'Emotional Rhythm',
    description:
      'Start with the purpose and message. I focus on clear communication through visuals that connect with viewers emotionally and rhythmically.',
    footerTag: 'PACING & NARRATIVE →',
  },
  {
    number: '02',
    title: 'DESIGN',
    tagline: 'Architectural Space',
    description:
      'Keep visual communication clear and intentional, with deliberate typography, mathematical contrast, and generous negative whitespace.',
    footerTag: 'GRID & RESTRAINT →',
  },
  {
    number: '03',
    title: 'TECH',
    tagline: 'Modern Web',
    description:
      'Use modern tools and technology to build fast, responsive, and intuitive digital experiences with near-zero latency.',
    footerTag: 'CODE & LATENCY →',
  },
  {
    number: '04',
    title: 'LEARNING',
    tagline: 'Iterative Craft',
    description:
      'Continuously improve through projects, experimentation, and new technology to push boundaries across film, design, and code.',
    footerTag: 'GROWTH & EVOLUTION →',
  },
];

export interface ToolCategory {
  category: string;
  tools: { name: string; tag?: string }[];
}

export const TOOLS_CATEGORIES: ToolCategory[] = [
  {
    category: 'VIDEO',
    tools: [
      { name: 'CapCut PC', tag: 'Primary Timeline' },
      { name: 'Adobe Premiere Pro', tag: 'Editorial' },
      { name: 'After Effects', tag: 'Motion & FX' },
    ],
  },
  {
    category: 'DESIGN',
    tools: [
      { name: 'Canva', tag: 'Rapid Layout' },
      { name: 'Adobe Photoshop', tag: 'Compositing' },
      { name: 'Adobe Illustrator', tag: 'Vector Systems' },
    ],
  },
  {
    category: 'WEB',
    tools: [
      { name: 'HTML5 / CSS3', tag: 'Core Standards' },
      { name: 'JavaScript / TS', tag: 'Runtime' },
      { name: 'React', tag: 'UI Architecture' },
      { name: 'Tailwind CSS', tag: 'Styling Engine' },
      { name: 'Firebase', tag: 'Data & Auth' },
    ],
  },
];

export interface CertItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
  statusType: 'verified' | 'participant' | 'honored';
}

export const ABOUT_CERTIFICATIONS: CertItem[] = [
  {
    id: 'canva',
    category: 'VISUAL DESIGN',
    title: 'Canva Essentials Certified',
    description:
      'Comprehensive mastery in rapid asset production, brand consistency, layout structuring, and modern marketing graphics.',
    status: 'Verified',
    statusType: 'verified',
  },
  {
    id: 'rift26',
    category: 'HACKATHON // ENGINEERING',
    title: "RIFT'26 Hackathon",
    description:
      'Competitive development sprint focused on building low-latency solutions, real-time UI/UX, and rapid computational prototypes.',
    status: 'Participant',
    statusType: 'participant',
  },
  {
    id: 'fullstack',
    category: 'WEB ARCHITECTURE',
    title: 'Foundations of Full Stack Development',
    description:
      'In-depth credential covering client-server paradigms, RESTful interfaces, modern frontend component architecture, and deployment protocols.',
    status: 'Verified',
    statusType: 'verified',
  },
  {
    id: 'appreciation',
    category: 'INSTITUTIONAL HONOR',
    title: 'Certificate of Appreciation',
    description:
      'Technology & Digital Innovation award presented by IIT Madras BS Degree Sports Society for driving visual media, design systems, and digital operations.',
    status: 'Honored',
    statusType: 'honored',
  },
];
