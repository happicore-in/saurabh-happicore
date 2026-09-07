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
} from '../types/admin';
import { FLAGSHIP_WEB_PROJECT, SELECTED_WEB_PROJECTS } from '../data/webProjects';
import { FEATURED_VIDEO_PROJECT, SELECTED_VIDEO_PROJECTS } from '../data/videoProjects';
import { FEATURED_GRAPHIC_PROJECT, SELECTED_GRAPHIC_PROJECTS } from '../data/graphicProjects';
import { EXPERIENCE_ITEMS } from '../data/experienceData';
import { ABOUT_PROFILE, WHAT_I_DO_ITEMS } from '../data/aboutData';
import {
  WebProjectItem,
  VideoProjectItem,
  GraphicProjectItem,
  ExperienceItem,
} from '../types';
import { deleteCloudinaryAsset, setMemoryCloudinaryConfig } from './cloudinaryService';

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
    featured: true,
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
    featured: idx < 2,
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
    featured: true,
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
    featured: true,
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
    featured: idx < 2,
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
  },
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

export const BASELINE_SITE_SETTINGS: AdminSiteSettings = {
  id: 'global',
  siteName: 'SAURABH // CREATIVE MULTIDISCIPLINARY',
  logoMark: 'S // M',
  favicon: '/favicon.ico',
  primaryEmail: 'happicore.in@gmail.com',
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
    featuredWorkIds: [
      'sportify-digital-platform',
      'paradox-2026-aftermovie',
      'campusrun-2025-marathon-poster',
    ],
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
}

const memoryCache: MemoryCacheStore = {};
const inFlightPromises: { [key: string]: Promise<any> | undefined } = {};

/**
 * Invalidate in-memory cache when data changes or force-refresh is requested.
 */
export function invalidatePortfolioDataCache(
  type?: 'web' | 'video' | 'graphic' | 'experience' | 'about' | 'settings' | 'all'
) {
  if (!type || type === 'all') {
    delete memoryCache.web;
    delete memoryCache.video;
    delete memoryCache.graphic;
    delete memoryCache.experience;
    delete memoryCache.about;
    delete memoryCache.settings;
    delete memoryCache.featuredHome;
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
  }
}

// Resilient promise timeout to prevent hanging when offline or experiencing network delay
async function withFirestoreTimeout<T>(promise: Promise<T>, ms = 7000): Promise<T> {
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
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'webProjects')), 7000);
      const list: AdminWebProject[] = [];
      snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminWebProject));
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
    updatedAt: nowIso,
    createdAt: project.createdAt || nowIso,
  };

  // Authoritative write to Firestore FIRST. If this throws, nothing is mutated.
  await setDoc(doc(db, 'webProjects', id), data);

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
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'videoProjects')), 7000);
      const list: AdminVideoProject[] = [];
      snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminVideoProject));
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
    updatedAt: nowIso,
    createdAt: project.createdAt || nowIso,
  };

  await setDoc(doc(db, 'videoProjects', id), data);

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
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'graphicProjects')), 7000);
      const list: AdminGraphicProject[] = [];
      snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminGraphicProject));
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
    updatedAt: nowIso,
    createdAt: project.createdAt || nowIso,
  };

  await setDoc(doc(db, 'graphicProjects', id), data);

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
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'experiences')), 7000);
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

  await setDoc(doc(db, 'experiences', id), data);

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
    await setDoc(doc(db, 'experiences', item.id), item);
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
      const snap = await withFirestoreTimeout(getDoc(doc(db, 'aboutData', 'main')), 7000);
      let data: AdminAboutData;
      if (snap.exists()) {
        data = snap.data() as AdminAboutData;
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

export async function saveAboutData(data: AdminAboutData): Promise<AdminAboutData> {
  await setDoc(doc(db, 'aboutData', 'main'), data);

  memoryCache.about = data;
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
      const snap = await withFirestoreTimeout(getDoc(doc(db, 'siteSettings', 'global')), 7000);
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

  await setDoc(doc(db, 'siteSettings', 'global'), updated);

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
  const featuredIds: string[] =
    rawHome.featuredWorkIds ||
    rawHome.featuredProjectIds ||
    settings.home?.featuredWorkIds ||
    settings.home?.featuredProjectIds ||
    [];

  const resolved: PublicHomeFeaturedItem[] = [];

  // Match IDs against currently existing Firestore projects. Skip any deleted or missing IDs!
  if (featuredIds.length > 0) {
    for (const id of featuredIds) {
      const vid = videos.find((v) => v.id === id);
      if (vid) {
        resolved.push({
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
        continue;
      }

      const web = webs.find((w) => w.id === id);
      if (web) {
        resolved.push({
          id: web.id,
          type: 'web',
          title: web.title,
          categoryLabel: web.category ? `WEB / ${web.category.toUpperCase()}` : 'WEB / INTERACTIVE',
          year: web.year || '2026',
          image: web.image || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
          description: web.description || 'Modern responsive digital presence with bespoke interactions and scalable architecture.',
          badgeLabel: web.badgeLabel || 'WEB INTERFACE',
          tags: web.technologies && web.technologies.length > 0 ? web.technologies.slice(0, 2) : ['REACT', 'TAILWIND'],
          role: web.role || 'FULL-STACK DEVELOPMENT',
          liveUrl: web.liveUrl,
          deliverables: web.deliverables,
          tools: web.technologies,
        });
        continue;
      }

      const grp = graphics.find((g) => g.id === id);
      if (grp) {
        resolved.push({
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
        continue;
      }
    }
  }

  // If no explicit matches from featured IDs, resolve items marked as featured from live projects
  if (resolved.length === 0) {
    const featuredVid = videos.find((v) => v.featured);
    const featuredWeb = webs.find((w) => w.featured);
    const featuredGraphic = graphics.find((g) => g.featured);

    if (featuredVid) {
      resolved.push({
        id: featuredVid.id,
        type: 'video',
        title: featuredVid.title,
        categoryLabel: featuredVid.category ? `VIDEO / ${featuredVid.category.toUpperCase()}` : 'VIDEO / FESTIVAL AFTERMOVIE',
        year: featuredVid.year || '2026',
        image: featuredVid.thumbnail || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
        description: featuredVid.description || 'High-retention cinematic video production with rhythmic pacing and color grading.',
        badgeLabel: featuredVid.aspectRatio === '9:16' ? 'REEL • 9:16' : 'AFTERMOVIE • 4K',
        tags: featuredVid.tools && featuredVid.tools.length > 0 ? featuredVid.tools.slice(0, 2) : ['PACING & SOUND DESIGN', 'COLOR GRADING'],
        role: featuredVid.role || 'DIRECTION & EDIT',
        aspectRatio: featuredVid.aspectRatio,
        stats: featuredVid.duration ? `Runtime: ${featuredVid.duration}` : undefined,
        googleDriveUrl: featuredVid.googleDriveUrl,
        deliverables: featuredVid.deliverables,
        tools: featuredVid.tools,
      });
    }

    if (featuredWeb) {
      resolved.push({
        id: featuredWeb.id,
        type: 'web',
        title: featuredWeb.title,
        categoryLabel: featuredWeb.category ? `WEB / ${featuredWeb.category.toUpperCase()}` : 'WEB / INTERACTIVE',
        year: featuredWeb.year || '2026',
        image: featuredWeb.image || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
        description: featuredWeb.description || 'Modern responsive digital presence with bespoke interactions and scalable architecture.',
        badgeLabel: featuredWeb.badgeLabel || 'WEB INTERFACE',
        tags: featuredWeb.technologies && featuredWeb.technologies.length > 0 ? featuredWeb.technologies.slice(0, 2) : ['REACT', 'TAILWIND'],
        role: webRole(featuredWeb),
        liveUrl: featuredWeb.liveUrl,
        deliverables: featuredWeb.deliverables,
        tools: featuredWeb.technologies,
      });
    }

    if (featuredGraphic) {
      resolved.push({
        id: featuredGraphic.id,
        type: 'graphic',
        title: featuredGraphic.title,
        categoryLabel: featuredGraphic.category ? `GRAPHIC / ${featuredGraphic.category.toUpperCase()}` : 'GRAPHIC / POSTERS & PRINT',
        year: featuredGraphic.year || '2026',
        image: featuredGraphic.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
        description: featuredGraphic.description || 'Deliberate typography and visual hierarchy crafted for print and digital campaigns.',
        badgeLabel: featuredGraphic.badgeLabel || 'POSTERS & IDENTITY',
        tags: featuredGraphic.tools && featuredGraphic.tools.length > 0 ? featuredGraphic.tools.slice(0, 2) : ['PHOTOSHOP', 'TYPOGRAPHY'],
        role: featuredGraphic.role || 'CREATIVE DIRECTION',
        deliverables: featuredGraphic.deliverables,
        tools: featuredGraphic.tools,
      });
    }
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
    const [webSnap, vidSnap, grpSnap, expSnap, setSnap, abtSnap] = await Promise.all([
      getDocs(collection(db, 'webProjects')),
      getDocs(collection(db, 'videoProjects')),
      getDocs(collection(db, 'graphicProjects')),
      getDocs(collection(db, 'experiences')),
      getDoc(doc(db, 'siteSettings', 'global')),
      getDoc(doc(db, 'aboutData', 'main')),
    ]);

    const writes: Promise<any>[] = [];

    if (webSnap.empty) {
      for (const p of BASELINE_WEB_PROJECTS) {
        writes.push(setDoc(doc(db, 'webProjects', p.id), p));
      }
      seededCollections.push('webProjects');
    }

    if (vidSnap.empty) {
      for (const p of BASELINE_VIDEO_PROJECTS) {
        writes.push(setDoc(doc(db, 'videoProjects', p.id), p));
      }
      seededCollections.push('videoProjects');
    }

    if (grpSnap.empty) {
      for (const p of BASELINE_GRAPHIC_PROJECTS) {
        writes.push(setDoc(doc(db, 'graphicProjects', p.id), p));
      }
      seededCollections.push('graphicProjects');
    }

    if (expSnap.empty) {
      for (const p of BASELINE_EXPERIENCES) {
        writes.push(setDoc(doc(db, 'experiences', p.id), p));
      }
      seededCollections.push('experiences');
    }

    if (!setSnap.exists()) {
      writes.push(
        setDoc(doc(db, 'siteSettings', 'global'), {
          ...BASELINE_SITE_SETTINGS,
          homeContent: BASELINE_SITE_SETTINGS.home,
        })
      );
      seededCollections.push('siteSettings');
    }

    if (!abtSnap.exists()) {
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
