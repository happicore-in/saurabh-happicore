import {
  db,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
} from '../lib/firebase';
import {
  AdminWebProject,
  AdminVideoProject,
  AdminGraphicProject,
  AdminExperience,
  AdminAboutData,
  AdminSiteSettings,
  AdminTestimonial,
  AdminCertification,
} from '../types/admin';
import { FLAGSHIP_WEB_PROJECT, SELECTED_WEB_PROJECTS } from '../data/webProjects';
import { FEATURED_VIDEO_PROJECT, SELECTED_VIDEO_PROJECTS } from '../data/videoProjects';
import { FEATURED_GRAPHIC_PROJECT, SELECTED_GRAPHIC_PROJECTS } from '../data/graphicProjects';
import { EXPERIENCE_ITEMS } from '../data/experienceData';
import { ABOUT_PROFILE, WHAT_I_DO_ITEMS, ABOUT_CERTIFICATIONS } from '../data/aboutData';
import {
  WebProjectItem,
  VideoProjectItem,
  GraphicProjectItem,
  ExperienceItem,
} from '../types';
import { deleteCloudinaryAsset, setMemoryCloudinaryConfig } from './cloudinaryService';

/**
 * Recursively removes JavaScript undefined values from Firestore payloads
 * while preserving null, false, 0, empty strings, arrays, Firestore Timestamps, Dates, and valid nested objects.
 */
export function sanitizeFirestoreData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => sanitizeFirestoreData(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    // Preserve Firestore Timestamps, FieldValues, or JS Date objects
    if (data instanceof Date || typeof (data as any).toMillis === 'function') {
      return data;
    }

    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        cleaned[key] = sanitizeFirestoreData(value);
      }
    }
    return cleaned as T;
  }

  return data;
}

// ========================================================
// Baseline Static Fallback Constants
// (Used ONLY for explicit database seeding or emergency offline zero-cache fallback)
// ========================================================
export const BASELINE_WEB_PROJECTS: AdminWebProject[] = [
  {
    id: FLAGSHIP_WEB_PROJECT.id,
    title: FLAGSHIP_WEB_PROJECT.title,
    description: FLAGSHIP_WEB_PROJECT.description,
    image: FLAGSHIP_WEB_PROJECT.image,
    liveUrl: FLAGSHIP_WEB_PROJECT.liveUrl || 'https://sportify.iitm.ac.in',
    githubUrl: FLAGSHIP_WEB_PROJECT.githubUrl || 'https://github.com/happicore/sportify-platform',
    technologies: FLAGSHIP_WEB_PROJECT.technologies,
    featured: false,
    order: 1,
    badgeLabel: FLAGSHIP_WEB_PROJECT.badgeLabel,
    category: FLAGSHIP_WEB_PROJECT.filterType,
  },
  ...SELECTED_WEB_PROJECTS.map((p, idx) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    technologies: p.technologies,
    featured: false,
    order: idx + 2,
    badgeLabel: p.badgeLabel,
    category: p.filterType,
  })),
];

export const BASELINE_VIDEO_PROJECTS: AdminVideoProject[] = [
  {
    id: FEATURED_VIDEO_PROJECT.id,
    title: FEATURED_VIDEO_PROJECT.title,
    description: FEATURED_VIDEO_PROJECT.description,
    thumbnail: FEATURED_VIDEO_PROJECT.thumbnail,
    duration: FEATURED_VIDEO_PROJECT.duration,
    googleDriveUrl: FEATURED_VIDEO_PROJECT.videoLink || 'https://drive.google.com/file/d/1ParadoxAftermoviePreview/view?usp=sharing',
    wherePosted: 'YouTube & Fest Screens',
    socialMediaLink: FEATURED_VIDEO_PROJECT.socialMediaLink || 'https://youtube.com',
    tools: FEATURED_VIDEO_PROJECT.technologies,
    featured: false,
    order: 1,
    category: FEATURED_VIDEO_PROJECT.category,
    aspectRatio: '16:9',
  },
  ...SELECTED_VIDEO_PROJECTS.map((p, idx) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    thumbnail: p.thumbnail,
    duration: p.duration,
    googleDriveUrl: p.videoLink || 'https://drive.google.com/drive/folders/1SportifyVideoArchive',
    wherePosted: p.socialPlatformName || 'Instagram / Fest Media',
    socialMediaLink: p.socialMediaLink || 'https://instagram.com',
    tools: p.technologies,
    featured: false,
    order: idx + 2,
    category: p.category,
    aspectRatio: (p.aspectRatio === '9:16' ? '9:16' : '16:9') as '16:9' | '9:16',
  })),
];

export const BASELINE_GRAPHIC_PROJECTS: AdminGraphicProject[] = [
  {
    id: FEATURED_GRAPHIC_PROJECT.id,
    title: FEATURED_GRAPHIC_PROJECT.title,
    description: FEATURED_GRAPHIC_PROJECT.description,
    image: FEATURED_GRAPHIC_PROJECT.image,
    wherePosted: 'Campus Billboards & Digital Screens',
    socialMediaLink: 'https://instagram.com',
    tools: FEATURED_GRAPHIC_PROJECT.technologies,
    featured: false,
    order: 1,
    category: FEATURED_GRAPHIC_PROJECT.category,
    badgeLabel: FEATURED_GRAPHIC_PROJECT.badgeLabel,
  },
  ...SELECTED_GRAPHIC_PROJECTS.map((p, idx) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    wherePosted: p.categoryLabel || 'Print & Social',
    socialMediaLink: p.externalPostLink || 'https://behance.net',
    tools: p.technologies,
    featured: false,
    order: idx + 2,
    category: p.category,
    badgeLabel: p.badgeLabel,
  })),
];

export const BASELINE_EXPERIENCES: AdminExperience[] = EXPERIENCE_ITEMS.map((e, idx) => ({
  id: e.id,
  role: e.role,
  organization: e.organization,
  organizationSubtext: e.organizationSubtext,
  startDate: e.date.split('—')[0]?.trim() || e.date,
  endDate: e.date.split('—')[1]?.trim() || '',
  current: e.badgeType === 'current' || e.date.includes('Present') || e.date.includes('Jun 2026'),
  location: e.location,
  description: e.responsibilities.join('\n\n'),
  responsibilities: e.responsibilities,
  tags: e.tags,
  order: idx + 1,
}));

export const BASELINE_ABOUT_CERTIFICATIONS: AdminCertification[] = [
  {
    id: 'canva',
    title: 'Canva Essentials Certified',
    category: 'VISUAL DESIGN',
    issuer: 'Canva Design School',
    description:
      'Comprehensive mastery in rapid asset production, brand consistency, layout structuring, and modern marketing graphics.',
    status: 'Verified',
    statusType: 'verified',
    type: 'Certification',
    verified: true,
    isPublished: true,
    period: '2025',
    order: 1,
  },
  {
    id: 'rift26',
    title: "RIFT'26 Hackathon",
    category: 'HACKATHON // ENGINEERING',
    issuer: 'RIFT Tech Summit',
    description:
      'Competitive development sprint focused on building low-latency solutions, real-time UI/UX, and rapid computational prototypes.',
    status: 'Participant',
    statusType: 'participant',
    type: 'Achievement',
    verified: true,
    isPublished: true,
    period: '2026',
    order: 2,
  },
  {
    id: 'fullstack',
    title: 'Foundations of Full Stack Development',
    category: 'WEB ARCHITECTURE',
    issuer: 'IIT Madras / Computational Systems',
    description:
      'In-depth credential covering client-server paradigms, RESTful interfaces, modern frontend component architecture, and deployment protocols.',
    status: 'Verified',
    statusType: 'verified',
    type: 'Certification',
    verified: true,
    isPublished: true,
    period: '2025',
    order: 3,
  },
  {
    id: 'appreciation',
    title: 'Certificate of Appreciation',
    category: 'INSTITUTIONAL HONOR',
    issuer: 'IIT Madras BS Degree Sports Society',
    description:
      'Technology & Digital Innovation award presented by IIT Madras BS Degree Sports Society for driving visual media, design systems, and digital operations.',
    status: 'Honored',
    statusType: 'honored',
    type: 'Award',
    verified: true,
    isPublished: true,
    period: '2025',
    order: 4,
  },
];

export const BASELINE_ABOUT_DATA: AdminAboutData = {
  profileImage: '',
  shortIntro: ABOUT_PROFILE.bioHeading,
  aboutDescription: `${ABOUT_PROFILE.bioParagraph1}\n\n${ABOUT_PROFILE.bioParagraph2}`,
  focusAreas: [...ABOUT_PROFILE.education.focusAreas],
  location: ABOUT_PROFILE.location,
  availabilityStatus: 'AVAILABLE FOR WORK',
  education: {
    institution: ABOUT_PROFILE.education.institution,
    degree: ABOUT_PROFILE.education.degree,
    status: ABOUT_PROFILE.education.status,
    details: ABOUT_PROFILE.education.details,
    curriculumMetrics: [
      { label: 'Data Science & Algorithmic Foundation', percent: 85 },
      { label: 'Computational Web Systems', percent: 90 },
      { label: 'Digital Media Production & Broadcast', percent: 95 },
    ],
  },
  certifications: BASELINE_ABOUT_CERTIFICATIONS,
  tools: [
    { name: 'CapCut PC', category: 'video' },
    { name: 'Premiere Pro', category: 'video' },
    { name: 'After Effects', category: 'video' },
    { name: 'Photoshop', category: 'design' },
    { name: 'Illustrator', category: 'design' },
    { name: 'Canva', category: 'design' },
    { name: 'React / Vite', category: 'web' },
    { name: 'Tailwind CSS', category: 'web' },
    { name: 'TypeScript', category: 'web' },
    { name: 'HTML5 / Modern JS', category: 'web' },
  ],
  services: WHAT_I_DO_ITEMS.map((item) => ({
    title: item.title,
    badge: item.category.toUpperCase(),
    description: item.skills.join(' • '),
  })),
};

export const BASELINE_TESTIMONIALS: AdminTestimonial[] = [
  {
    id: 'test-01',
    slotLabel: 'SLOT 01',
    quote:
      'Saurabh brought immense rhythmic energy to our event aftermovie. The pacing was flawless, and the turnaround time exceeded all our expectations.',
    name: 'Event Lead / Festival Producer',
    role: 'Festival Producer',
    organization: 'Cultural Festival Organization',
    verified: true,
    isPublic: true,
    order: 1,
  },
  {
    id: 'test-02',
    slotLabel: 'SLOT 02',
    quote:
      'The social promotional graphics and posters created for our campaign had an authentic editorial feel that stood out cleanly in feeds and boosted engagement.',
    name: 'Marketing Director',
    role: 'Marketing Director',
    organization: 'Digital Brand Agency',
    verified: true,
    isPublic: true,
    order: 2,
  },
  {
    id: 'test-03',
    slotLabel: 'SLOT 03',
    quote:
      'A rare hybrid of sharp technical development and aesthetic sensitivity. The website was delivered clean, responsive, and completely on brand.',
    name: 'Startup Founder',
    role: 'Startup Founder',
    organization: 'Tech Venture Studio',
    verified: true,
    isPublic: true,
    order: 3,
  },
];

export const BASELINE_SITE_SETTINGS: AdminSiteSettings = {
  id: 'global',
  siteName: 'SAURABH // CREATIVE MULTIDISCIPLINARY',
  siteTitle: 'SAURABH // CREATIVE MULTIDISCIPLINARY',
  metaDescription: 'Multidisciplinary portfolio of Saurabh — Video Editor, Graphic Designer & Web Developer.',
  footerCopyright: '© 2026 SAURABH // HAPPICORE. ALL RIGHTS RESERVED.',
  logoMark: 'S // M',
  favicon: '/favicon.ico',
  primaryEmail: 'happicore.in@gmail.com',
  experienceSummaryStats: [
    { id: 'stat-roles', label: 'ROLES & CHAIRS', value: '3+', order: 1 },
    { id: 'stat-campaigns', label: 'CAMPAIGNS', value: '6+', order: 2 },
    { id: 'stat-affiliation', label: 'AFFILIATION', value: 'IIT Madras BS', order: 3 },
    { id: 'stat-velocity', label: 'OUTPUT VELOCITY', value: '99.4% SLA', order: 4 },
  ],
  testimonials: BASELINE_TESTIMONIALS,
  socialLinks: {
    linkedin: 'https://linkedin.com/in/saurabh-0732a8372',
    github: 'https://github.com/happicore',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    behance: 'https://behance.net',
  },
  happicore: {
    name: 'HAPPICORE',
    url: 'https://happicore.in',
    shortDescription: 'Independent creative atelier and digital development practice founded by Saurabh.',
    socialLink: 'https://happicore.in',
    buttonText: 'VISIT HAPPICORE →',
  },
  contactDetails: {
    phone: '+91 8127122102',
    personalEmail: 'saurabhcore31@gmail.com',
    workEmail: 'happicore.in@gmail.com',
    location: 'Mau, Uttar Pradesh, India',
    linkedin: 'https://linkedin.com/in/saurabh-0732a8372',
    whatsappNumber: '+918127122102',
  },
  availability: {
    status: 'AVAILABLE FOR WORK',
    message: 'Available for freelance commissions, sprint engagements, and selective remote partnerships.',
  },
  about: {
    profileImage: '',
    shortIntro: ABOUT_PROFILE.bioHeading,
    aboutDescription: `${ABOUT_PROFILE.bioParagraph1}\n\n${ABOUT_PROFILE.bioParagraph2}`,
    focusAreas: ['Data Visualization', 'Web Architecture', 'Digital Media Systems', 'Short-form Storytelling'],
    location: ABOUT_PROFILE.location,
    education: {
      institution: ABOUT_PROFILE.education.institution,
      degree: ABOUT_PROFILE.education.degree,
      status: ABOUT_PROFILE.education.status,
      details: ABOUT_PROFILE.education.details,
      focusAreas: ABOUT_PROFILE.education.focusAreas,
    },
    availabilityStatus: 'AVAILABLE FOR WORK',
    availabilityMessage: ABOUT_PROFILE.availability,
    services: [
      {
        id: 'srv-video',
        title: 'VIDEO EDITING',
        category: 'video',
        skills: ['Aftermovies', 'Promotional Videos', 'Event Recaps', 'Short-form Content'],
      },
      {
        id: 'srv-graphic',
        title: 'GRAPHIC DESIGN',
        category: 'graphic',
        skills: ['Posters', 'Social Media Creatives', 'Branding', 'Visual Systems'],
      },
      {
        id: 'srv-web',
        title: 'WEB DEVELOPMENT',
        category: 'web',
        skills: ['Websites', 'Frontend Development', 'Digital Experiences', 'Interactive Interfaces'],
      },
    ],
    tools: [
      'CapCut PC',
      'Adobe Premiere Pro',
      'Canva',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Firebase',
    ],
  },
  home: {
    tagline: 'CREATIVE MULTIDISCIPLINARY',
    shortIntro: 'Video Editor, Graphic Designer & Web Developer based in Mau, UP. Bridging creative storytelling with modern computational web interfaces.',
    featuredWorkIds: [],
    happicoreDescription: 'Independent creative atelier and digital development practice founded by Saurabh.',
    availability: 'AVAILABLE FOR WORK',
  },
  cloudinary: {
    cloudName: 'pegfrsqo',
    uploadPreset: 'portfolio_upload',
  },
};

// ========================================================
// Storage Sanitization (Purge legacy portfolio localStorage)
// Ensures ZERO portfolio data remains in localStorage.
// ========================================================
function purgeLegacyPortfolioLocalStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove = [
      'saurabh_portfolio_cache_version',
      'saurabh_portfolio_cache_v2_web',
      'saurabh_portfolio_cache_v2_video',
      'saurabh_portfolio_cache_v2_graphic',
      'saurabh_portfolio_cache_v2_experience',
      'saurabh_portfolio_cache_v2_settings',
      'saurabh_portfolio_cache_v2_about',
      'saurabh_portfolio_cache_v2_testimonials',
      'saurabh_admin_web_projects',
      'saurabh_admin_video_projects',
      'saurabh_admin_graphic_projects',
      'saurabh_admin_experiences',
      'saurabh_admin_settings',
      'saurabh_portfolio_about',
      'saurabh_portfolio_enquiries',
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    // ignore
  }
}

purgeLegacyPortfolioLocalStorage();

// In-memory cache store (Runtime-only; disappears when browser page/tab is closed)
interface MemoryCacheStore {
  web?: AdminWebProject[];
  video?: AdminVideoProject[];
  graphic?: AdminGraphicProject[];
  experience?: AdminExperience[];
  about?: AdminAboutData;
  settings?: AdminSiteSettings;
  featuredHome?: PublicHomeFeaturedItem[];
  testimonials?: AdminTestimonial[];
}

const memoryCache: MemoryCacheStore = {};
const inFlightPromises: { [key: string]: Promise<any> | undefined } = {};

/**
 * Invalidate in-memory cache when data changes or force-refresh is requested.
 */
export function invalidatePortfolioDataCache(
  type?: 'web' | 'video' | 'graphic' | 'experience' | 'about' | 'settings' | 'testimonials' | 'all'
) {
  if (!type || type === 'all') {
    delete memoryCache.web;
    delete memoryCache.video;
    delete memoryCache.graphic;
    delete memoryCache.experience;
    delete memoryCache.about;
    delete memoryCache.settings;
    delete memoryCache.featuredHome;
    delete memoryCache.testimonials;
  } else if (type === 'web') {
    delete memoryCache.web;
    delete memoryCache.featuredHome;
  } else if (type === 'video') {
    delete memoryCache.video;
    delete memoryCache.featuredHome;
  } else if (type === 'graphic') {
    delete memoryCache.graphic;
    delete memoryCache.featuredHome;
  } else if (type === 'experience') {
    delete memoryCache.experience;
  } else if (type === 'about') {
    delete memoryCache.about;
  } else if (type === 'settings') {
    delete memoryCache.settings;
    delete memoryCache.featuredHome;
  } else if (type === 'testimonials') {
    delete memoryCache.testimonials;
  }
}

// Resilient promise timeout to prevent hanging when offline or experiencing network delay
async function withFirestoreTimeout<T>(promise: Promise<T>, ms = 12000): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Firestore request timed out after ${ms}ms`));
    }, ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
}

// ========================================================
// 1. Web Projects API
// ========================================================
export async function getWebProjects(forceRefresh = false): Promise<AdminWebProject[]> {
  // 1. Fast memory cache return if already populated and not force-refreshing
  if (!forceRefresh && memoryCache.web !== undefined) {
    return memoryCache.web;
  }

  if (inFlightPromises.web) {
    return inFlightPromises.web;
  }

  const promise = (async () => {
    try {
      // 2. Primary & ONLY persistent source of truth: Firestore database
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'webProjects')), 12000);
      const list: AdminWebProject[] = [];
      snap.forEach((d) => {
        const raw = d.data();
        list.push({
          ...raw,
          id: d.id,
          featured: Boolean(raw.featured),
        } as AdminWebProject);
      });
      list.sort((a, b) => (a.order || 0) - (b.order || 0));

      // Successful Firestore query is authoritative (even if collection is empty [])
      memoryCache.web = list;
      return list;
    } catch (err) {
      console.warn('Firestore fetch webProjects notice:', err);
      // Return memory cache if previously populated, otherwise empty list. Never resurrect deleted baseline data!
      return memoryCache.web || [];
    }
  })();

  inFlightPromises.web = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.web;
  }
}

export async function saveWebProject(project: AdminWebProject): Promise<AdminWebProject> {
  const isNew = !project.id || project.id.startsWith('temp_');
  const nowIso = new Date().toISOString();
  const id = isNew ? `web_${Date.now()}` : project.id;
  const data: AdminWebProject = {
    ...project,
    id,
    featured: Boolean(project.featured),
    updatedAt: nowIso,
    createdAt: project.createdAt || nowIso,
  };

  const sanitized = sanitizeFirestoreData(data);

  // Authoritative write to Firestore FIRST. If this throws, nothing is mutated.
  try {
    await setDoc(doc(db, 'webProjects', id), sanitized);
    console.log('[portfolioDataService.saveWebProject SUCCESS]', {
      id,
      title: data.title,
      featured: data.featured,
      category: data.category,
    });
  } catch (err: any) {
    console.error('[portfolioDataService.saveWebProject ERROR]', {
      code: err?.code,
      message: err?.message,
      name: err?.name,
      id,
      dataKeys: Object.keys(sanitized),
    });
    throw err;
  }

  // Update in-memory runtime cache only
  const currentList = memoryCache.web || [];
  const exists = currentList.some((p) => p.id === id);
  const updated = exists ? currentList.map((p) => (p.id === id ? data : p)) : [...currentList, data];
  updated.sort((a, b) => (a.order || 0) - (b.order || 0));

  memoryCache.web = updated;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'web', item: data } }));
  return data;
}

export async function deleteWebProject(id: string): Promise<boolean> {
  // 1. Identify associated Cloudinary image asset
  const currentList = memoryCache.web || [];
  const project = currentList.find((p) => p.id === id);

  // 2. Safely attempt Cloudinary deletion (failure does not block Firestore)
  if (project?.image) {
    try {
      await deleteCloudinaryAsset(project.image, 'image');
    } catch (err) {
      console.warn('[Cloudinary] Notice during web project asset cleanup:', err);
    }
  }

  // 3. Authoritative delete from Firestore
  await deleteDoc(doc(db, 'webProjects', id));

  // 4. Update in-memory runtime cache
  const filtered = currentList.filter((p) => p.id !== id);
  memoryCache.web = filtered;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'web', deletedId: id } }));
  return true;
}

// ========================================================
// 2. Video Projects API
// ========================================================
export async function getVideoProjects(forceRefresh = false): Promise<AdminVideoProject[]> {
  if (!forceRefresh && memoryCache.video !== undefined) {
    return memoryCache.video;
  }

  if (inFlightPromises.video) {
    return inFlightPromises.video;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'videoProjects')), 12000);
      const list: AdminVideoProject[] = [];
      snap.forEach((d) => {
        const raw = d.data();
        list.push({
          ...raw,
          id: d.id,
          featured: Boolean(raw.featured),
        } as AdminVideoProject);
      });
      list.sort((a, b) => (a.order || 0) - (b.order || 0));

      memoryCache.video = list;
      return list;
    } catch (err) {
      console.warn('Firestore fetch videoProjects notice:', err);
      return memoryCache.video || [];
    }
  })();

  inFlightPromises.video = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.video;
  }
}

export async function saveVideoProject(project: AdminVideoProject): Promise<AdminVideoProject> {
  const isNew = !project.id || project.id.startsWith('temp_');
  const nowIso = new Date().toISOString();
  const id = isNew ? `video_${Date.now()}` : project.id;
  const data: AdminVideoProject = {
    ...project,
    id,
    featured: Boolean(project.featured),
    updatedAt: nowIso,
    createdAt: project.createdAt || nowIso,
  };

  const sanitized = sanitizeFirestoreData(data);

  try {
    await setDoc(doc(db, 'videoProjects', id), sanitized);
    console.log('[portfolioDataService.saveVideoProject SUCCESS]', {
      id,
      title: data.title,
      featured: data.featured,
      category: data.category,
    });
  } catch (err: any) {
    console.error('[portfolioDataService.saveVideoProject ERROR]', {
      code: err?.code,
      message: err?.message,
      name: err?.name,
      id,
      dataKeys: Object.keys(sanitized),
    });
    throw err;
  }

  const currentList = memoryCache.video || [];
  const exists = currentList.some((p) => p.id === id);
  const updated = exists ? currentList.map((p) => (p.id === id ? data : p)) : [...currentList, data];
  updated.sort((a, b) => (a.order || 0) - (b.order || 0));

  memoryCache.video = updated;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'video', item: data } }));
  return data;
}

export async function deleteVideoProject(id: string): Promise<boolean> {
  const currentList = memoryCache.video || [];
  const project = currentList.find((p) => p.id === id);

  if (project?.thumbnail) {
    try {
      await deleteCloudinaryAsset(project.thumbnail, 'image');
    } catch (err) {
      console.warn('[Cloudinary] Notice during video project asset cleanup:', err);
    }
  }

  await deleteDoc(doc(db, 'videoProjects', id));

  const filtered = currentList.filter((p) => p.id !== id);
  memoryCache.video = filtered;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'video', deletedId: id } }));
  return true;
}

// ========================================================
// 3. Graphic Projects API
// ========================================================
export async function getGraphicProjects(forceRefresh = false): Promise<AdminGraphicProject[]> {
  if (!forceRefresh && memoryCache.graphic !== undefined) {
    return memoryCache.graphic;
  }

  if (inFlightPromises.graphic) {
    return inFlightPromises.graphic;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'graphicProjects')), 12000);
      const list: AdminGraphicProject[] = [];
      snap.forEach((d) => {
        const raw = d.data();
        list.push({
          ...raw,
          id: d.id,
          featured: Boolean(raw.featured),
        } as AdminGraphicProject);
      });
      list.sort((a, b) => (a.order || 0) - (b.order || 0));

      memoryCache.graphic = list;
      return list;
    } catch (err) {
      console.warn('Firestore fetch graphicProjects notice:', err);
      return memoryCache.graphic || [];
    }
  })();

  inFlightPromises.graphic = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.graphic;
  }
}

export async function saveGraphicProject(project: AdminGraphicProject): Promise<AdminGraphicProject> {
  const isNew = !project.id || project.id.startsWith('temp_');
  const nowIso = new Date().toISOString();
  const id = isNew ? `graphic_${Date.now()}` : project.id;
  const data: AdminGraphicProject = {
    ...project,
    id,
    featured: Boolean(project.featured),
    updatedAt: nowIso,
    createdAt: project.createdAt || nowIso,
  };

  const sanitized = sanitizeFirestoreData(data);

  try {
    await setDoc(doc(db, 'graphicProjects', id), sanitized);
    console.log('[portfolioDataService.saveGraphicProject SUCCESS]', {
      id,
      title: data.title,
      featured: data.featured,
      category: data.category,
    });
  } catch (err: any) {
    console.error('[portfolioDataService.saveGraphicProject ERROR]', {
      code: err?.code,
      message: err?.message,
      name: err?.name,
      id,
      dataKeys: Object.keys(sanitized),
    });
    throw err;
  }

  const currentList = memoryCache.graphic || [];
  const exists = currentList.some((p) => p.id === id);
  const updated = exists ? currentList.map((p) => (p.id === id ? data : p)) : [...currentList, data];
  updated.sort((a, b) => (a.order || 0) - (b.order || 0));

  memoryCache.graphic = updated;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'graphic', item: data } }));
  return data;
}

export async function deleteGraphicProject(id: string): Promise<boolean> {
  const currentList = memoryCache.graphic || [];
  const project = currentList.find((p) => p.id === id);

  if (project?.image) {
    try {
      await deleteCloudinaryAsset(project.image, 'image');
    } catch (err) {
      console.warn('[Cloudinary] Notice during graphic project asset cleanup:', err);
    }
  }

  await deleteDoc(doc(db, 'graphicProjects', id));

  const filtered = currentList.filter((p) => p.id !== id);
  memoryCache.graphic = filtered;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'graphic', deletedId: id } }));
  return true;
}

// ========================================================
// 4. Experience API
// ========================================================
export async function getExperiences(forceRefresh = false): Promise<AdminExperience[]> {
  if (!forceRefresh && memoryCache.experience !== undefined) {
    return memoryCache.experience;
  }

  if (inFlightPromises.experience) {
    return inFlightPromises.experience;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'experiences')), 12000);
      const list: AdminExperience[] = [];
      snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminExperience));
      list.sort((a, b) => (a.order || 0) - (b.order || 0));

      memoryCache.experience = list;
      return list;
    } catch (err) {
      console.warn('Firestore fetch experiences notice:', err);
      return memoryCache.experience || [];
    }
  })();

  inFlightPromises.experience = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.experience;
  }
}

export async function saveExperience(exp: AdminExperience): Promise<AdminExperience> {
  const isNew = !exp.id || exp.id.startsWith('temp_');
  const nowIso = new Date().toISOString();
  const id = isNew ? `exp_${Date.now()}` : exp.id;
  const data: AdminExperience = {
    ...exp,
    id,
    updatedAt: nowIso,
    createdAt: exp.createdAt || nowIso,
  };

  const sanitized = sanitizeFirestoreData(data);

  try {
    await setDoc(doc(db, 'experiences', id), sanitized);
  } catch (err: any) {
    console.error('[portfolioDataService.saveExperience ERROR]', {
      code: err?.code,
      message: err?.message,
      name: err?.name,
      id,
      dataKeys: Object.keys(sanitized),
    });
    throw err;
  }

  const currentList = memoryCache.experience || [];
  const exists = currentList.some((e) => e.id === id);
  const updated = exists ? currentList.map((e) => (e.id === id ? data : e)) : [...currentList, data];
  updated.sort((a, b) => (a.order || 0) - (b.order || 0));

  memoryCache.experience = updated;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'experience', item: data } }));
  return data;
}

export async function deleteExperience(id: string): Promise<boolean> {
  await deleteDoc(doc(db, 'experiences', id));

  const currentList = memoryCache.experience || [];
  const filtered = currentList.filter((e) => e.id !== id);

  memoryCache.experience = filtered;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'experience', deletedId: id } }));
  return true;
}

export async function reorderExperiences(items: AdminExperience[]): Promise<AdminExperience[]> {
  const updatedItems = items.map((item, index) => ({
    ...item,
    order: index + 1,
    updatedAt: new Date().toISOString(),
  }));

  for (const item of updatedItems) {
    await setDoc(doc(db, 'experiences', item.id), sanitizeFirestoreData(item));
  }

  memoryCache.experience = updatedItems;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'experience', reordered: true } }));
  return updatedItems;
}

// ========================================================
// 5. About Data API
// ========================================================
export async function getAboutData(forceRefresh = false): Promise<AdminAboutData> {
  if (!forceRefresh && memoryCache.about !== undefined) {
    return memoryCache.about;
  }

  if (inFlightPromises.about) {
    return inFlightPromises.about;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDoc(doc(db, 'aboutData', 'main')), 12000);
      let data: AdminAboutData;
      if (snap.exists()) {
        data = snap.data() as AdminAboutData;
        // Ensure certifications are properly populated with baseline about certifications if missing or old placeholder
        if (!data.certifications || data.certifications.length === 0) {
          data.certifications = BASELINE_ABOUT_CERTIFICATIONS;
        } else {
          // If all current certifications are the legacy experience placeholders with no description or category
          const hasRichFields = data.certifications.some((c) => c.category || c.description);
          if (!hasRichFields) {
            data.certifications = BASELINE_ABOUT_CERTIFICATIONS;
          }
        }
      } else {
        // Document does not exist in Firestore yet: return initial application baseline
        data = BASELINE_ABOUT_DATA;
      }
      memoryCache.about = data;
      return data;
    } catch (err) {
      console.warn('Firestore fetch aboutData notice:', err);
      return memoryCache.about || BASELINE_ABOUT_DATA;
    }
  })();

  inFlightPromises.about = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.about;
  }
}

/**
 * Resolves the single authoritative profile image URL.
 * Priority:
 * 1. aboutData/main.profileImage (Authoritative Source of Truth)
 * 2. siteSettings.home.profileImage / homeContent.profileImage (Legacy backward-compatibility fallback)
 */
export function resolveAuthoritativeProfileImage(
  about: AdminAboutData | null | undefined,
  settings: AdminSiteSettings | null | undefined
): string {
  const authoritative = about?.profileImage?.trim();
  if (authoritative) {
    return authoritative;
  }

  const legacy =
    settings?.home?.profileImage?.trim() ||
    (settings as any)?.homeContent?.profileImage?.trim() ||
    settings?.about?.profileImage?.trim() ||
    '';
  return legacy;
}

export async function saveAboutData(data: AdminAboutData): Promise<AdminAboutData> {
  const sanitized = sanitizeFirestoreData(data);
  await setDoc(doc(db, 'aboutData', 'main'), sanitized);

  memoryCache.about = data;

  // Keep siteSettings.home.profileImage synced for backward compatibility
  try {
    const currentSettings = await getSiteSettings();
    if (currentSettings?.home && currentSettings.home.profileImage !== data.profileImage) {
      currentSettings.home.profileImage = data.profileImage;
      if (currentSettings.homeContent) {
        currentSettings.homeContent.profileImage = data.profileImage;
      }
      await setDoc(doc(db, 'siteSettings', 'global'), sanitizeFirestoreData(currentSettings));
      memoryCache.settings = currentSettings;
    }
  } catch (syncErr) {
    console.warn('[Profile Image Sync] siteSettings backward-compatibility notice:', syncErr);
  }

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'about', item: data } }));
  return data;
}

// ========================================================
// 6. Site Settings API
// ========================================================
export async function getSiteSettings(forceRefresh = false): Promise<AdminSiteSettings> {
  if (!forceRefresh && memoryCache.settings !== undefined) {
    return memoryCache.settings;
  }

  if (inFlightPromises.settings) {
    return inFlightPromises.settings;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDoc(doc(db, 'siteSettings', 'global')), 12000);
      let data: AdminSiteSettings;
      if (snap.exists()) {
        data = snap.data() as AdminSiteSettings;
        const rawHome = (data as any).homeContent || data.home || BASELINE_SITE_SETTINGS.home;
        data.home = { ...BASELINE_SITE_SETTINGS.home, ...rawHome };
        data.homeContent = data.home;
      } else {
        data = BASELINE_SITE_SETTINGS;
      }
      if (data.cloudinary) {
        setMemoryCloudinaryConfig(data.cloudinary);
      }
      memoryCache.settings = data;
      return data;
    } catch (err) {
      console.warn('Firestore fetch siteSettings notice:', err);
      return memoryCache.settings || BASELINE_SITE_SETTINGS;
    }
  })();

  inFlightPromises.settings = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.settings;
  }
}

export async function saveSiteSettings(settings: Partial<AdminSiteSettings>): Promise<AdminSiteSettings> {
  const current = await getSiteSettings();
  const rawHome = (settings as any).homeContent || settings.home || current.home || BASELINE_SITE_SETTINGS.home;
  const mergedHome = { ...current.home, ...rawHome };
  const updated: AdminSiteSettings = {
    ...current,
    ...settings,
    home: mergedHome,
    homeContent: mergedHome,
    updatedAt: new Date().toISOString(),
  };

  const sanitized = sanitizeFirestoreData(updated);
  await setDoc(doc(db, 'siteSettings', 'global'), sanitized);

  // If a profileImage is passed in site settings, update the authoritative aboutData/main.profileImage
  if (mergedHome.profileImage) {
    try {
      const currentAbout = await getAboutData();
      if (currentAbout && currentAbout.profileImage !== mergedHome.profileImage) {
        currentAbout.profileImage = mergedHome.profileImage;
        await setDoc(doc(db, 'aboutData', 'main'), sanitizeFirestoreData(currentAbout));
        memoryCache.about = currentAbout;
      }
    } catch (syncErr) {
      console.warn('[Profile Image Sync] aboutData authoritative sync notice:', syncErr);
    }
  }

  if (updated.cloudinary) {
    setMemoryCloudinaryConfig(updated.cloudinary);
  }

  memoryCache.settings = updated;
  delete memoryCache.featuredHome;

  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'settings', item: updated } }));
  return updated;
}

// ========================================================
// 7. Public Data Reflection Helpers (syncs Admin edits to Public UI)
// ========================================================
export async function getPublicWebProjects(): Promise<WebProjectItem[]> {
  const adminProjects = await getWebProjects();
  return adminProjects.map((p, idx) => ({
    id: p.id,
    index: String(idx + 1).padStart(2, '0'),
    title: p.title,
    badgeLabel: p.badgeLabel || 'WEB PLATFORM',
    filterType: (p.category === 'fullstack' || p.category === 'portfolios' || p.category === 'tools')
      ? p.category
      : 'fullstack',
    categoryLabel: p.category ? p.category.toUpperCase() : 'WEB DEVELOPMENT',
    category: p.category || '',
    description: p.description,
    image: p.image || '',
    technologies: p.technologies && p.technologies.length > 0 ? p.technologies : ['React', 'Tailwind CSS'],
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    isFlagship: p.featured ?? idx === 0,
    telemetryLatency: '< 45ms sync',
    browserUrl: p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, '') : undefined,
  }));
}

export async function getPublicVideoProjects(): Promise<{
  featured: VideoProjectItem | null;
  selected: VideoProjectItem[];
}> {
  const adminVideos = await getVideoProjects();
  const converted: VideoProjectItem[] = adminVideos.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category || 'Event Aftermovie',
    duration: p.duration || '02:30',
    description: p.description,
    thumbnail: p.thumbnail || '',
    technologies: p.tools && p.tools.length > 0 ? p.tools : ['CapCut PC', 'Premiere Pro'],
    filterCategory: (p.category === 'aftermovies' || p.category === 'sports' || p.category === 'short-form' || p.category === 'promotional')
      ? p.category
      : 'aftermovies',
    aspectRatio: p.aspectRatio === '9:16' ? '9:16' : '16:9',
    videoLink: p.googleDriveUrl,
    socialPlatformName: p.wherePosted || 'Instagram / Fest Media',
    socialMediaLink: p.socialMediaLink || 'https://instagram.com',
  }));

  if (converted.length === 0) {
    return { featured: null, selected: [] };
  }

  const featured = converted.find((v) => {
    const adminMatch = adminVideos.find((a) => a.id === v.id);
    return adminMatch?.featured;
  }) || converted[0];

  const selected = converted.filter((v) => v.id !== featured.id);

  return { featured, selected };
}

export async function getPublicGraphicProjects(): Promise<{
  featured: GraphicProjectItem | null;
  selected: GraphicProjectItem[];
}> {
  const adminGraphics = await getGraphicProjects();
  const converted: GraphicProjectItem[] = adminGraphics.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category || 'Posters & Print',
    description: p.description,
    image: p.image || '',
    technologies: p.tools && p.tools.length > 0 ? p.tools : ['Photoshop', 'Canva'],
    filterCategory: (p.category === 'posters' || p.category === 'branding' || p.category === 'social' || p.category === 'merchandise')
      ? p.category
      : 'posters',
    badgeLabel: p.badgeLabel || 'CREATIVE ARTIFACT',
    categoryLabel: p.wherePosted || 'PRINT & DIGITAL',
    externalPostLink: p.socialMediaLink,
  }));

  if (converted.length === 0) {
    return { featured: null, selected: [] };
  }

  const featured = converted.find((g) => {
    const adminMatch = adminGraphics.find((a) => a.id === g.id);
    return adminMatch?.featured;
  }) || converted[0];

  const selected = converted.filter((g) => g.id !== featured.id);

  return { featured, selected };
}

export async function getPublicExperiences(): Promise<ExperienceItem[]> {
  const adminExp = await getExperiences();
  return adminExp.map((e) => ({
    id: e.id,
    sysRole: e.role || 'LEAD',
    role: e.role,
    organization: e.organization,
    organizationSubtext: e.organizationSubtext || '',
    date: e.startDate + (e.endDate ? ` — ${e.endDate}` : (e.current ? ' — Present' : '')),
    location: e.location,
    badgeType: (e.current ? 'current' : 'edition') as any,
    responsibilities: e.responsibilities && e.responsibilities.length > 0
      ? e.responsibilities
      : (e.description ? e.description.split('\n\n').filter(Boolean) : []),
    tags: e.tags || [],
  }));
}

export interface PublicHomeFeaturedItem {
  id: string;
  type: 'video' | 'web' | 'graphic';
  title: string;
  categoryLabel: string;
  year: string;
  image: string;
  description: string;
  badgeLabel: string;
  tags: string[];
  role: string;
  aspectRatio?: string;
  stats?: string;
  liveUrl?: string;
  googleDriveUrl?: string;
  deliverables?: string[];
  tools?: string[];
}

export async function getPublicHomeFeaturedProjects(): Promise<PublicHomeFeaturedItem[]> {
  if (memoryCache.featuredHome !== undefined) {
    return memoryCache.featuredHome;
  }

  const [settings, webs, videos, graphics] = await Promise.all([
    getSiteSettings(),
    getWebProjects(),
    getVideoProjects(),
    getGraphicProjects(),
  ]);

  const rawHome = (settings as any).homeContent || settings.home || {};
  const settingsFeaturedIds: string[] =
    rawHome.featuredProjectIds ||
    rawHome.featuredWorkIds ||
    settings.home?.featuredProjectIds ||
    settings.home?.featuredWorkIds ||
    [];

  const formatVideoItem = (vid: AdminVideoProject): PublicHomeFeaturedItem => ({
    id: vid.id,
    type: 'video',
    title: vid.title,
    categoryLabel: vid.category ? `VIDEO / ${vid.category.toUpperCase()}` : 'VIDEO / FESTIVAL AFTERMOVIE',
    year: vid.year || '2026',
    image: vid.thumbnail || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    description: vid.description || 'High-retention cinematic video production with rhythmic pacing and color grading.',
    badgeLabel: vid.aspectRatio === '9:16' ? 'REEL • 9:16' : 'AFTERMOVIE • 4K',
    tags: vid.tools && vid.tools.length > 0 ? vid.tools.slice(0, 2) : ['PACING & SOUND DESIGN', 'COLOR GRADING'],
    role: vid.role || 'DIRECTION & EDIT',
    aspectRatio: vid.aspectRatio,
    stats: vid.duration ? `Runtime: ${vid.duration}` : undefined,
    googleDriveUrl: vid.googleDriveUrl,
    deliverables: vid.deliverables,
    tools: vid.tools,
  });

  const formatWebItem = (web: AdminWebProject): PublicHomeFeaturedItem => ({
    id: web.id,
    type: 'web',
    title: web.title,
    categoryLabel: web.category ? `WEB / ${web.category.toUpperCase()}` : 'WEB / INTERACTIVE',
    year: web.year || '2026',
    image: web.image || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    description: web.description || 'Modern responsive digital presence with bespoke interactions and scalable architecture.',
    badgeLabel: web.badgeLabel || 'WEB INTERFACE',
    tags: web.technologies && web.technologies.length > 0 ? web.technologies.slice(0, 2) : ['REACT', 'TAILWIND'],
    role: web.role || webRole(web),
    liveUrl: web.liveUrl,
    deliverables: web.deliverables,
    tools: web.technologies,
  });

  const formatGraphicItem = (grp: AdminGraphicProject): PublicHomeFeaturedItem => ({
    id: grp.id,
    type: 'graphic',
    title: grp.title,
    categoryLabel: grp.category ? `GRAPHIC / ${grp.category.toUpperCase()}` : 'GRAPHIC / POSTERS & PRINT',
    year: grp.year || '2026',
    image: grp.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    description: grp.description || 'Deliberate typography and visual hierarchy crafted for print and digital campaigns.',
    badgeLabel: grp.badgeLabel || 'POSTERS & IDENTITY',
    tags: grp.tools && grp.tools.length > 0 ? grp.tools.slice(0, 2) : ['PHOTOSHOP', 'TYPOGRAPHY'],
    role: grp.role || 'CREATIVE DIRECTION',
    deliverables: grp.deliverables,
    tools: grp.tools,
  });

  const resolved: PublicHomeFeaturedItem[] = [];
  const addedIds = new Set<string>();

  // 1. Gather all items where featured === true in database
  const featuredVideos = videos.filter((v) => Boolean(v.featured));
  const featuredWebs = webs.filter((w) => Boolean(w.featured));
  const featuredGraphics = graphics.filter((g) => Boolean(g.featured));

  // 2. Prioritize featured video as the Top Hero on homepage
  if (featuredVideos.length > 0) {
    const heroVid = featuredVideos[0];
    resolved.push(formatVideoItem(heroVid));
    addedIds.add(heroVid.id);
  }

  // 3. Add any projects explicitly listed in settingsFeaturedIds
  for (const id of settingsFeaturedIds) {
    if (addedIds.has(id) || resolved.length >= 5) continue;
    const v = videos.find((item) => item.id === id);
    if (v) {
      resolved.push(formatVideoItem(v));
      addedIds.add(v.id);
      continue;
    }
    const w = webs.find((item) => item.id === id);
    if (w) {
      resolved.push(formatWebItem(w));
      addedIds.add(w.id);
      continue;
    }
    const g = graphics.find((item) => item.id === id);
    if (g) {
      resolved.push(formatGraphicItem(g));
      addedIds.add(g.id);
      continue;
    }
  }

  // 4. Add any remaining projects that have featured === true
  const remainingFeatured = [
    ...featuredWebs.filter((w) => !addedIds.has(w.id)),
    ...featuredGraphics.filter((g) => !addedIds.has(g.id)),
    ...featuredVideos.filter((v) => !addedIds.has(v.id)),
  ];

  for (const item of remainingFeatured) {
    if (resolved.length >= 5) break;
    if ('wherePosted' in item && 'aspectRatio' in item) {
      resolved.push(formatVideoItem(item as AdminVideoProject));
    } else if ('liveUrl' in item) {
      resolved.push(formatWebItem(item as AdminWebProject));
    } else {
      resolved.push(formatGraphicItem(item as AdminGraphicProject));
    }
    addedIds.add(item.id);
  }

  // 5. Safe fallback if nothing is marked featured yet
  if (resolved.length === 0) {
    if (videos.length > 0) resolved.push(formatVideoItem(videos[0]));
    if (webs.length > 0) resolved.push(formatWebItem(webs[0]));
    if (graphics.length > 0) resolved.push(formatGraphicItem(graphics[0]));
  }

  memoryCache.featuredHome = resolved;
  return resolved;
}

function webRole(p: AdminWebProject): string {
  return p.role || 'FULL-STACK DEVELOPMENT';
}

/**
 * Ensures Firestore database collections are populated with baseline documents
 * ONLY when explicitly triggered (e.g. initial setup action).
 * Never automatically seeds from normal reads.
 */
export async function ensureFirestoreDataSeeded(): Promise<{ seeded: boolean; collections: string[] }> {
  const seededCollections: string[] = [];
  try {
    const [webSnap, vidSnap, grpSnap, expSnap, setSnap, abtSnap, testSnap] = await Promise.all([
      getDocs(collection(db, 'webProjects')).catch(() => null),
      getDocs(collection(db, 'videoProjects')).catch(() => null),
      getDocs(collection(db, 'graphicProjects')).catch(() => null),
      getDocs(collection(db, 'experiences')).catch(() => null),
      getDoc(doc(db, 'siteSettings', 'global')).catch(() => null),
      getDoc(doc(db, 'aboutData', 'main')).catch(() => null),
      getDocs(collection(db, 'testimonials')).catch(() => null),
    ]);

    const writes: Promise<any>[] = [];

    if (webSnap && webSnap.empty) {
      for (const p of BASELINE_WEB_PROJECTS) {
        writes.push(setDoc(doc(db, 'webProjects', p.id), p));
      }
      seededCollections.push('webProjects');
    }

    if (vidSnap && vidSnap.empty) {
      for (const p of BASELINE_VIDEO_PROJECTS) {
        writes.push(setDoc(doc(db, 'videoProjects', p.id), p));
      }
      seededCollections.push('videoProjects');
    }

    if (grpSnap && grpSnap.empty) {
      for (const p of BASELINE_GRAPHIC_PROJECTS) {
        writes.push(setDoc(doc(db, 'graphicProjects', p.id), p));
      }
      seededCollections.push('graphicProjects');
    }

    if (expSnap && expSnap.empty) {
      for (const p of BASELINE_EXPERIENCES) {
        writes.push(setDoc(doc(db, 'experiences', p.id), p));
      }
      seededCollections.push('experiences');
    }

    if (testSnap && testSnap.empty) {
      for (const t of BASELINE_TESTIMONIALS) {
        writes.push(setDoc(doc(db, 'testimonials', t.id), t).catch(() => null));
      }
      seededCollections.push('testimonials');
    }

    if (setSnap && !setSnap.exists()) {
      writes.push(
        setDoc(doc(db, 'siteSettings', 'global'), {
          ...BASELINE_SITE_SETTINGS,
          homeContent: BASELINE_SITE_SETTINGS.home,
        })
      );
      seededCollections.push('siteSettings');
    }

    if (abtSnap && !abtSnap.exists()) {
      writes.push(setDoc(doc(db, 'aboutData', 'main'), BASELINE_ABOUT_DATA));
      seededCollections.push('aboutData');
    }

    if (writes.length > 0) {
      await Promise.all(writes);
      invalidatePortfolioDataCache('all');
      return { seeded: true, collections: seededCollections };
    }

    return { seeded: false, collections: [] };
  } catch (err) {
    console.error('ensureFirestoreDataSeeded error:', err);
    throw err;
  }
}

export async function getAnyProjectDetails(projectId: string) {
  const [webs, videos, graphics] = await Promise.all([
    getWebProjects(),
    getVideoProjects(),
    getGraphicProjects(),
  ]);

  const vid = videos.find((v) => v.id === projectId);
  if (vid) {
    return {
      title: vid.title,
      category: vid.category ? `VIDEO / ${vid.category.toUpperCase()}` : 'VIDEO / EDITORIAL',
      year: vid.year || '2024',
      image: vid.thumbnail || '',
      overview: vid.description,
      deliverables: vid.deliverables && vid.deliverables.length > 0 ? vid.deliverables : ['Full Video Cut', 'Color Grading', 'Sound Design'],
      tools: vid.tools && vid.tools.length > 0 ? vid.tools : ['Adobe Premiere Pro', 'CapCut Pro'],
      role: vid.role || 'Lead Video Editor & Pacing Specialist',
      stats: vid.duration ? `Duration: ${vid.duration}` : undefined,
      link: vid.googleDriveUrl,
    };
  }

  const web = webs.find((w) => w.id === projectId);
  if (web) {
    return {
      title: web.title,
      category: web.category ? `WEB / ${web.category.toUpperCase()}` : 'WEB / INTERACTIVE',
      year: web.year || '2024',
      image: web.image || '',
      overview: web.description,
      deliverables: web.deliverables && web.deliverables.length > 0 ? web.deliverables : ['Responsive Web App', 'Component Architecture', 'Performance Optimization'],
      tools: web.technologies && web.technologies.length > 0 ? web.technologies : ['React', 'TypeScript', 'Tailwind CSS'],
      role: web.role || 'Full Stack Engineer & Interface Designer',
      stats: web.liveUrl ? 'Live Production System' : undefined,
      link: web.liveUrl,
    };
  }

  const grp = graphics.find((g) => g.id === projectId);
  if (grp) {
    return {
      title: grp.title,
      category: grp.category ? `GRAPHIC / ${grp.category.toUpperCase()}` : 'GRAPHIC / DESIGN',
      year: grp.year || '2024',
      image: grp.image || '',
      overview: grp.description,
      deliverables: grp.deliverables && grp.deliverables.length > 0 ? grp.deliverables : ['Print Deliverable', 'High-Res Asset Suite', 'Vector Deliverables'],
      tools: grp.tools && grp.tools.length > 0 ? grp.tools : ['Photoshop', 'Canva', 'Illustrator'],
      role: grp.role || 'Visual Designer & Art Director',
      stats: 'Custom typography & visual grid',
      link: grp.socialMediaLink,
    };
  }

  return null;
}

// ========================================================
// 7. Testimonials API
// ========================================================
export async function getAllTestimonials(): Promise<AdminTestimonial[]> {
  if (memoryCache.testimonials && memoryCache.testimonials.length > 0) {
    return memoryCache.testimonials;
  }

  let items: AdminTestimonial[] = [];

  // 1. Try reading from collection('testimonials')
  try {
    const snap = await withFirestoreTimeout(getDocs(collection(db, 'testimonials')), 8000);
    if (snap && !snap.empty) {
      snap.forEach((d) => items.push({ ...d.data(), id: d.id } as AdminTestimonial));
    }
  } catch (err) {
    console.warn('Firestore fetch all testimonials collection notice:', err);
  }

  // 2. Fallback to siteSettings.testimonials if collection is empty or restricted
  if (items.length === 0) {
    try {
      const settings = await getSiteSettings();
      if (settings?.testimonials && settings.testimonials.length > 0) {
        items = [...settings.testimonials];
      }
    } catch (err) {
      console.warn('Firestore fetch testimonials from siteSettings notice:', err);
    }
  }

  if (items.length > 0) {
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    memoryCache.testimonials = items;
    return items;
  }

  return BASELINE_TESTIMONIALS;
}

export async function getPublicTestimonials(): Promise<AdminTestimonial[]> {
  const all = await getAllTestimonials();
  return all.filter((t) => t.isPublic !== false);
}

export async function saveTestimonial(testimonial: AdminTestimonial): Promise<void> {
  const clean: AdminTestimonial = sanitizeFirestoreData({
    ...testimonial,
    updatedAt: new Date().toISOString(),
  });

  // 1. Primary: Save to siteSettings.testimonials under /siteSettings/global
  // This guarantees reliable persistence under existing authorized firestore rules
  try {
    const currentSettings = await getSiteSettings();
    const existingList = currentSettings.testimonials || (await getAllTestimonials()) || [];
    const index = existingList.findIndex((t) => t.id === testimonial.id);
    let updatedList: AdminTestimonial[];
    if (index >= 0) {
      updatedList = [...existingList];
      updatedList[index] = clean;
    } else {
      updatedList = [...existingList, clean];
    }
    updatedList.sort((a, b) => (a.order || 0) - (b.order || 0));

    currentSettings.testimonials = updatedList;
    await setDoc(doc(db, 'siteSettings', 'global'), sanitizeFirestoreData(currentSettings));
    memoryCache.settings = currentSettings;
    memoryCache.testimonials = updatedList;
  } catch (settingsSyncErr) {
    console.warn('[Testimonials] siteSettings sync notice:', settingsSyncErr);
  }

  // 2. Secondary: Also save directly to /testimonials/{id} collection
  try {
    await withFirestoreTimeout(setDoc(doc(db, 'testimonials', testimonial.id), clean), 12000);
  } catch (err: any) {
    console.warn('[Testimonials] Direct collection setDoc notice (safely stored in siteSettings):', err?.message || err);
  }

  invalidatePortfolioDataCache('testimonials');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('portfolio_data_updated', {
        detail: { type: 'testimonials' },
      })
    );
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  // 1. Primary: Remove from siteSettings.testimonials under /siteSettings/global
  try {
    const currentSettings = await getSiteSettings();
    if (currentSettings.testimonials) {
      const updatedList = currentSettings.testimonials.filter((t) => t.id !== id);
      currentSettings.testimonials = updatedList;
      await setDoc(doc(db, 'siteSettings', 'global'), sanitizeFirestoreData(currentSettings));
      memoryCache.settings = currentSettings;
      memoryCache.testimonials = updatedList;
    }
  } catch (settingsSyncErr) {
    console.warn('[Testimonials] siteSettings delete sync notice:', settingsSyncErr);
  }

  // 2. Secondary: Also delete from /testimonials/{id} collection
  try {
    await withFirestoreTimeout(deleteDoc(doc(db, 'testimonials', id)), 12000);
  } catch (err: any) {
    console.warn('[Testimonials] Direct collection deleteDoc notice:', err?.message || err);
  }

  invalidatePortfolioDataCache('testimonials');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('portfolio_data_updated', {
        detail: { type: 'testimonials' },
      })
    );
  }
}

// ========================================================
// 8. Certifications & Achievements API (About Page Ownership)
// ========================================================
export async function getPublicCertifications(): Promise<AdminCertification[]> {
  const about = await getAboutData();
  const certs = about?.certifications || BASELINE_ABOUT_CERTIFICATIONS;
  return certs
    .filter((c) => c.isPublished !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllCertifications(): Promise<AdminCertification[]> {
  const about = await getAboutData();
  const certs = about?.certifications || BASELINE_ABOUT_CERTIFICATIONS;
  return [...certs].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function saveCertification(cert: AdminCertification): Promise<AdminCertification> {
  const about = await getAboutData();
  const currentCerts = about?.certifications ? [...about.certifications] : [...BASELINE_ABOUT_CERTIFICATIONS];
  const idx = currentCerts.findIndex((c) => c.id === cert.id);
  const now = new Date().toISOString();
  const cleanCert: AdminCertification = sanitizeFirestoreData({
    ...cert,
    updatedAt: now,
  });

  if (idx >= 0) {
    cleanCert.createdAt = currentCerts[idx].createdAt || now;
    currentCerts[idx] = cleanCert;
  } else {
    cleanCert.createdAt = now;
    currentCerts.push(cleanCert);
  }

  currentCerts.sort((a, b) => (a.order || 0) - (b.order || 0));
  about.certifications = currentCerts;

  await saveAboutData(about);
  return cleanCert;
}

export async function deleteCertification(id: string): Promise<void> {
  const about = await getAboutData();
  const currentCerts = about?.certifications ? [...about.certifications] : [...BASELINE_ABOUT_CERTIFICATIONS];
  about.certifications = currentCerts.filter((c) => c.id !== id);
  await saveAboutData(about);
}

export async function reorderCertifications(reordered: AdminCertification[]): Promise<void> {
  const about = await getAboutData();
  about.certifications = reordered.map((item, idx) => ({
    ...item,
    order: idx + 1,
  }));
  await saveAboutData(about);
}


