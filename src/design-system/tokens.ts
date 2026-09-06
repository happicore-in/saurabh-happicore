import { ColorToken, NavItem, SpacingToken, TypographyRole } from '../types';

export const IDENTITY = {
  name: 'SAURABH',
  descriptor: 'VIDEO • GRAPHIC • WEB',
  disciplines: ['VIDEO EDITOR', 'GRAPHIC DESIGNER', 'WEB DEVELOPER'] as const,
  workspace: 'HAPPICORE',
  website: 'happicore.in',
  emailWork: 'happicore.in@gmail.com',
  emailPersonal: 'saurabhcore31@gmail.com',
  phone: '+91 8127122102',
  linkedin: 'https://linkedin.com/in/saurabh-0732a8372',
  education: 'BS DATA SCIENCE & APPLICATIONS',
  institution: 'IIT MADRAS',
  location: 'MAU, UTTAR PRADESH, INDIA',
  coordinates: '25.9417° N, 83.5611° E (MAU, IN) • GMT +05:30 IST',
  copyright: '© 2026 SAURABH. ALL RIGHTS RESERVED.',
  availability: 'AVAILABLE FOR WORK',
};

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME', href: '#home' },
  {
    id: 'work',
    label: 'WORK',
    href: '#work',
    dropdown: [
      { id: 'work-web', label: 'WEB', href: '#work-web' },
      { id: 'work-video', label: 'VIDEO', href: '#work-video' },
      { id: 'work-graphic', label: 'GRAPHIC', href: '#work-graphic' },
    ],
  },
  { id: 'experience', label: 'EXPERIENCE', href: '#experience' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Primary Background',
    role: 'Global page canvas (Pure Black)',
    hex: '#000000',
    border: '#22252A',
    textColor: '#F2F4F7',
  },
  {
    name: 'Primary Surface',
    role: 'Standard cards & panels',
    hex: '#080808',
    border: '#22252A',
    textColor: '#F2F4F7',
  },
  {
    name: 'Secondary Surface',
    role: 'Nested/interactive panels',
    hex: '#0D0D0D',
    border: '#22252A',
    textColor: '#F2F4F7',
  },
  {
    name: 'Elevated Surface',
    role: 'Dropdowns, modals, popovers',
    hex: '#111111',
    border: '#22252A',
    textColor: '#F2F4F7',
  },
  {
    name: 'Primary Text',
    role: 'Headings, primary content, high contrast',
    hex: '#F2F4F7',
    border: '#22252A',
    textColor: '#000000',
  },
  {
    name: 'Secondary Text',
    role: 'Paragraphs, descriptions, body copy',
    hex: '#A7ADB7',
    border: '#22252A',
    textColor: '#000000',
  },
  {
    name: 'Muted Text',
    role: 'Technical labels, copyright, subtle notes',
    hex: '#6F7682',
    border: '#22252A',
    textColor: '#FFFFFF',
  },
  {
    name: 'Border Default',
    role: 'Card borders, separators, structural lines',
    hex: '#22252A',
    border: '#22252A',
    textColor: '#F2F4F7',
  },
  {
    name: 'Subtle Border',
    role: 'Header/footer dividers, subtle grid lines',
    hex: '#17191D',
    border: '#22252A',
    textColor: '#F2F4F7',
  },
  {
    name: 'Accent Blue',
    role: 'Technical elements, active code states',
    hex: '#8FB8E8',
    border: '#22252A',
    textColor: '#050505',
  },
  {
    name: 'Warm Accent',
    role: 'Availability, small indicators, metadata highlights',
    hex: '#F5A623',
    border: '#22252A',
    textColor: '#050505',
  },
];

export const TYPOGRAPHY_ROLES: TypographyRole[] = [
  {
    role: 'HEADINGS',
    font: 'Space Grotesk',
    description:
      'Used for Hero headings, Page headings, Section headings, Project titles, Major CTA headings. Large uppercase, tight controlled tracking, confident hierarchy.',
    sample: 'CREATIVE MULTIDISCIPLINARY ARCHITECTURE',
  },
  {
    role: 'BODY',
    font: 'Hanken Grotesk',
    description:
      'Used for Paragraphs, Descriptions, Navigation, Supporting information, Buttons. Clean readability, optical balance, uncrowded line heights (1.6).',
    sample:
      'Establishing a minimal, editorial, and cinematic digital presence with high precision and disciplined execution.',
  },
  {
    role: 'MONOSPACE / TECHNICAL',
    font: 'JetBrains Mono',
    description:
      'Used for Category labels, Project metadata, Dates, Numbers, Technical information, Small section identifiers, Status labels. Compact, uppercase, precise.',
    sample: '[01/10] // STATUS: SYSTEM_ONLINE • WORKSPACE: HAPPICORE.IN',
  },
];

export const SPACING_SYSTEM: SpacingToken[] = [
  { name: 'Small', value: '8px', pixel: 8, useCase: 'Tight element grouping, badge padding, micro gaps' },
  { name: 'Medium', value: '16px', pixel: 16, useCase: 'Standard component padding, card inner spacing' },
  { name: 'Large', value: '24px', pixel: 24, useCase: 'Card spacing, grid column gaps, container gutters' },
  { name: 'XL', value: '32px', pixel: 32, useCase: 'Major component separation, header clearances' },
  { name: 'XXL', value: '48px', pixel: 48, useCase: 'Prominent layout gaps, sub-section spacing' },
  { name: 'Section Spacing', value: '80–140px', pixel: 110, useCase: 'Intentional macro whitespace between page sections' },
];

export const ROADMAP_PARTS = [
  { number: 'PART 1', name: 'GLOBAL DESIGN SYSTEM', status: 'ACTIVE / ESTABLISHED', desc: 'Global tokens, colors, typography, header, footer, cards, buttons, grid' },
  { number: 'PART 2', name: 'HOME', status: 'UPCOMING', desc: 'Hero statement, core discipline focus, featured curation' },
  { number: 'PART 3', name: 'WORK', status: 'UPCOMING', desc: 'Master portfolio index, multidisciplinary showcase' },
  { number: 'PART 4', name: 'WEB DEVELOPMENT', status: 'UPCOMING', desc: 'Frontend engineering, technical architecture, live deployments' },
  { number: 'PART 5', name: 'VIDEO EDITING', status: 'UPCOMING', desc: 'Cinematic showreel, pacing, motion cutting, narrative edits' },
  { number: 'PART 6', name: 'GRAPHIC DESIGN', status: 'UPCOMING', desc: 'Visual identity, editorial posters, brand typography, layouts' },
  { number: 'PART 7', name: 'EXPERIENCE', status: 'UPCOMING', desc: 'Career timeline, creative workspace, client milestones' },
  { number: 'PART 8', name: 'ABOUT', status: 'UPCOMING', desc: 'Editorial philosophy, multidisciplinary background, workspace' },
  { number: 'PART 9', name: 'CONTACT', status: 'UPCOMING', desc: 'Inquiry channels, direct communication, project onboarding' },
  { number: 'PART 10', name: 'GLOBAL POLISH', status: 'UPCOMING', desc: 'Final animation timing, responsiveness audit, performance tuning' },
];
