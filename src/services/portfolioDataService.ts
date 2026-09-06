import {
  db,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
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

// Initial baseline web projects mapped to AdminWebProject
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

// Initial baseline video projects mapped to AdminVideoProject
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

// Initial baseline graphic projects mapped to AdminGraphicProject
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

// Initial baseline experience mapped to AdminExperience
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

// Baseline site settings
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

// Keys for local storage caching
const STORAGE_KEYS = {
  WEB: 'saurabh_admin_web_projects',
  VIDEO: 'saurabh_admin_video_projects',
  GRAPHIC: 'saurabh_admin_graphic_projects',
  EXPERIENCE: 'saurabh_admin_experiences',
  SETTINGS: 'saurabh_admin_settings',
  ABOUT: 'saurabh_portfolio_about',
};

// In-memory cache for instant subsequent reads and cross-component sharing
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
export function invalidatePortfolioDataCache(type?: 'web' | 'video' | 'graphic' | 'experience' | 'about' | 'settings' | 'all') {
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

// Resilient promise timeout to prevent hanging when offline or experiencing intermittent connectivity
async function withFirestoreTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
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

// Web Projects API
export async function getWebProjects(forceRefresh = false): Promise<AdminWebProject[]> {
  if (!forceRefresh && memoryCache.web && memoryCache.web.length > 0) {
    return memoryCache.web;
  }

  if (inFlightPromises.web) {
    return inFlightPromises.web;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'webProjects')), 3000);
      if (!snap.empty) {
        const list: AdminWebProject[] = [];
        snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminWebProject));
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        localStorage.setItem(STORAGE_KEYS.WEB, JSON.stringify(list));
        memoryCache.web = list;
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch web projects notice (using cache/baseline):', err);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.WEB);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        memoryCache.web = parsed;
        return parsed;
      } catch {
        // ignore
      }
    }
    memoryCache.web = BASELINE_WEB_PROJECTS;
    return BASELINE_WEB_PROJECTS;
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

  try {
    await setDoc(doc(db, 'webProjects', id), data);
  } catch (err) {
    console.warn('Firestore save web project error, updating local cache:', err);
  }

  // Update cache
  invalidatePortfolioDataCache('web');
  const list = await getWebProjects(true);
  const updated = isNew ? [...list, data] : list.map((p) => (p.id === id ? data : p));
  localStorage.setItem(STORAGE_KEYS.WEB, JSON.stringify(updated));
  memoryCache.web = updated;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'web', item: data } }));
  return data;
}

export async function deleteWebProject(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'webProjects', id));
  } catch (err) {
    console.warn('Firestore delete error:', err);
  }
  invalidatePortfolioDataCache('web');
  const list = await getWebProjects(true);
  const filtered = list.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.WEB, JSON.stringify(filtered));
  memoryCache.web = filtered;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'web', deletedId: id } }));
  return true;
}

// Video Projects API
export async function getVideoProjects(forceRefresh = false): Promise<AdminVideoProject[]> {
  if (!forceRefresh && memoryCache.video && memoryCache.video.length > 0) {
    return memoryCache.video;
  }

  if (inFlightPromises.video) {
    return inFlightPromises.video;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'videoProjects')), 3000);
      if (!snap.empty) {
        const list: AdminVideoProject[] = [];
        snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminVideoProject));
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(list));
        memoryCache.video = list;
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch video projects notice (using cache/baseline):', err);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.VIDEO);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        memoryCache.video = parsed;
        return parsed;
      } catch {
        // ignore
      }
    }
    memoryCache.video = BASELINE_VIDEO_PROJECTS;
    return BASELINE_VIDEO_PROJECTS;
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

  try {
    await setDoc(doc(db, 'videoProjects', id), data);
  } catch (err) {
    console.warn('Firestore save video project error:', err);
  }

  invalidatePortfolioDataCache('video');
  const list = await getVideoProjects(true);
  const updated = isNew ? [...list, data] : list.map((p) => (p.id === id ? data : p));
  localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(updated));
  memoryCache.video = updated;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'video', item: data } }));
  return data;
}

export async function deleteVideoProject(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'videoProjects', id));
  } catch (err) {
    console.warn('Firestore delete error:', err);
  }
  invalidatePortfolioDataCache('video');
  const list = await getVideoProjects(true);
  const filtered = list.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(filtered));
  memoryCache.video = filtered;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'video', deletedId: id } }));
  return true;
}

// Graphic Projects API
export async function getGraphicProjects(forceRefresh = false): Promise<AdminGraphicProject[]> {
  if (!forceRefresh && memoryCache.graphic && memoryCache.graphic.length > 0) {
    return memoryCache.graphic;
  }

  if (inFlightPromises.graphic) {
    return inFlightPromises.graphic;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'graphicProjects')), 3000);
      if (!snap.empty) {
        const list: AdminGraphicProject[] = [];
        snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminGraphicProject));
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        localStorage.setItem(STORAGE_KEYS.GRAPHIC, JSON.stringify(list));
        memoryCache.graphic = list;
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch graphic projects notice (using cache/baseline):', err);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.GRAPHIC);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        memoryCache.graphic = parsed;
        return parsed;
      } catch {
        // ignore
      }
    }
    memoryCache.graphic = BASELINE_GRAPHIC_PROJECTS;
    return BASELINE_GRAPHIC_PROJECTS;
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

  try {
    await setDoc(doc(db, 'graphicProjects', id), data);
  } catch (err) {
    console.warn('Firestore save graphic project error:', err);
  }

  invalidatePortfolioDataCache('graphic');
  const list = await getGraphicProjects(true);
  const updated = isNew ? [...list, data] : list.map((p) => (p.id === id ? data : p));
  localStorage.setItem(STORAGE_KEYS.GRAPHIC, JSON.stringify(updated));
  memoryCache.graphic = updated;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'graphic', item: data } }));
  return data;
}

export async function deleteGraphicProject(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'graphicProjects', id));
  } catch (err) {
    console.warn('Firestore delete error:', err);
  }
  invalidatePortfolioDataCache('graphic');
  const list = await getGraphicProjects(true);
  const filtered = list.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.GRAPHIC, JSON.stringify(filtered));
  memoryCache.graphic = filtered;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'graphic', deletedId: id } }));
  return true;
}

// Experience API
export async function getExperiences(forceRefresh = false): Promise<AdminExperience[]> {
  if (!forceRefresh && memoryCache.experience && memoryCache.experience.length > 0) {
    return memoryCache.experience;
  }

  if (inFlightPromises.experience) {
    return inFlightPromises.experience;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDocs(collection(db, 'experiences')), 3000);
      if (!snap.empty) {
        const list: AdminExperience[] = [];
        snap.forEach((d) => list.push({ ...d.data(), id: d.id } as AdminExperience));
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(list));
        memoryCache.experience = list;
        return list;
      }
    } catch (err) {
      console.warn('Firestore fetch experiences notice (using cache/baseline):', err);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        memoryCache.experience = parsed;
        return parsed;
      } catch {
        // ignore
      }
    }
    memoryCache.experience = BASELINE_EXPERIENCES;
    return BASELINE_EXPERIENCES;
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

  try {
    await setDoc(doc(db, 'experiences', id), data);
  } catch (err) {
    console.warn('Firestore save experience error:', err);
  }

  invalidatePortfolioDataCache('experience');
  const list = await getExperiences(true);
  const updated = isNew ? [...list, data] : list.map((e) => (e.id === id ? data : e));
  localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(updated));
  memoryCache.experience = updated;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'experience', item: data } }));
  return data;
}

export async function deleteExperience(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'experiences', id));
  } catch (err) {
    console.warn('Firestore delete error:', err);
  }
  invalidatePortfolioDataCache('experience');
  const list = await getExperiences(true);
  const filtered = list.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(filtered));
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

  try {
    for (const item of updatedItems) {
      await setDoc(doc(db, 'experiences', item.id), item);
    }
  } catch (err) {
    console.warn('Firestore reorder experiences error:', err);
  }

  invalidatePortfolioDataCache('experience');
  localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(updatedItems));
  memoryCache.experience = updatedItems;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'experience', reordered: true } }));
  return updatedItems;
}

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

export async function getAboutData(forceRefresh = false): Promise<AdminAboutData> {
  if (!forceRefresh && memoryCache.about) {
    return memoryCache.about;
  }

  if (inFlightPromises.about) {
    return inFlightPromises.about;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDoc(doc(db, 'aboutData', 'main')), 3000);
      if (snap.exists()) {
        const data = snap.data() as AdminAboutData;
        localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data));
        memoryCache.about = data;
        return data;
      }
    } catch (err) {
      console.warn('Firestore fetch about notice (using cache/baseline):', err);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.ABOUT);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        memoryCache.about = parsed;
        return parsed;
      } catch {
        // ignore
      }
    }
    memoryCache.about = BASELINE_ABOUT_DATA;
    return BASELINE_ABOUT_DATA;
  })();

  inFlightPromises.about = promise;
  try {
    return await promise;
  } finally {
    delete inFlightPromises.about;
  }
}

export async function saveAboutData(data: AdminAboutData): Promise<AdminAboutData> {
  try {
    await setDoc(doc(db, 'aboutData', 'main'), data);
  } catch (err) {
    console.warn('Firestore save about error:', err);
  }

  invalidatePortfolioDataCache('about');
  localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data));
  memoryCache.about = data;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'about', item: data } }));
  return data;
}

// Site Settings API
export async function getSiteSettings(forceRefresh = false): Promise<AdminSiteSettings> {
  if (!forceRefresh && memoryCache.settings) {
    return memoryCache.settings;
  }

  if (inFlightPromises.settings) {
    return inFlightPromises.settings;
  }

  const promise = (async () => {
    try {
      const snap = await withFirestoreTimeout(getDoc(doc(db, 'siteSettings', 'global')), 3000);
      if (snap.exists()) {
        const data = snap.data() as AdminSiteSettings;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
        memoryCache.settings = data;
        return data;
      }
    } catch (err) {
      console.warn('Firestore fetch settings notice (using cache/baseline):', err);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.cloudinary?.cloudName === 'dpxq9o7kv' || !parsed.cloudinary?.cloudName) {
          parsed.cloudinary = {
            cloudName: 'pegfrsqo',
            uploadPreset: 'portfolio_upload',
          };
        }
        memoryCache.settings = parsed;
        return parsed;
      } catch {
        // ignore
      }
    }
    memoryCache.settings = BASELINE_SITE_SETTINGS;
    return BASELINE_SITE_SETTINGS;
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
  const updated: AdminSiteSettings = {
    ...current,
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'siteSettings', 'global'), updated);
  } catch (err) {
    console.warn('Firestore save settings error:', err);
  }

  invalidatePortfolioDataCache('settings');
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  memoryCache.settings = updated;
  window.dispatchEvent(new CustomEvent('portfolio_data_updated', { detail: { type: 'settings', item: updated } }));
  return updated;
}

// ========================================================
// Public Data Reflection Helpers (syncs Admin edits to Public UI)
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
    image: p.image || FLAGSHIP_WEB_PROJECT.image,
    technologies: p.technologies && p.technologies.length > 0 ? p.technologies : ['React', 'Tailwind CSS'],
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    isFlagship: p.featured ?? idx === 0,
    telemetryLatency: '< 45ms sync',
    browserUrl: p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, '') : undefined,
  }));
}

export async function getPublicVideoProjects(): Promise<{
  featured: VideoProjectItem;
  selected: VideoProjectItem[];
}> {
  const adminVideos = await getVideoProjects();
  const converted: VideoProjectItem[] = adminVideos.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category || 'Event Aftermovie',
    duration: p.duration || '02:30',
    description: p.description,
    thumbnail: p.thumbnail || FEATURED_VIDEO_PROJECT.thumbnail,
    technologies: p.tools && p.tools.length > 0 ? p.tools : ['CapCut PC', 'Premiere Pro'],
    filterCategory: (p.category === 'aftermovies' || p.category === 'sports' || p.category === 'short-form' || p.category === 'promotional')
      ? p.category
      : 'aftermovies',
    aspectRatio: p.aspectRatio === '9:16' ? '9:16' : '16:9',
    videoLink: p.googleDriveUrl,
    socialPlatformName: p.wherePosted || 'Instagram / Fest Media',
    socialMediaLink: p.socialMediaLink || 'https://instagram.com',
  }));

  const featured = converted.find((v) => {
    const adminMatch = adminVideos.find((a) => a.id === v.id);
    return adminMatch?.featured;
  }) || converted[0] || FEATURED_VIDEO_PROJECT;

  const selected = converted.filter((v) => v.id !== featured.id);

  return { featured, selected };
}

export async function getPublicGraphicProjects(): Promise<{
  featured: GraphicProjectItem;
  selected: GraphicProjectItem[];
}> {
  const adminGraphics = await getGraphicProjects();
  const converted: GraphicProjectItem[] = adminGraphics.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category || 'Posters & Print',
    description: p.description,
    image: p.image || FEATURED_GRAPHIC_PROJECT.image,
    technologies: p.tools && p.tools.length > 0 ? p.tools : ['Photoshop', 'Canva'],
    filterCategory: (p.category === 'posters' || p.category === 'branding' || p.category === 'social' || p.category === 'merchandise')
      ? p.category
      : 'posters',
    badgeLabel: p.badgeLabel || 'CREATIVE ARTIFACT',
    categoryLabel: p.wherePosted || 'PRINT & DIGITAL',
    externalPostLink: p.socialMediaLink,
  }));

  const featured = converted.find((g) => {
    const adminMatch = adminGraphics.find((a) => a.id === g.id);
    return adminMatch?.featured;
  }) || converted[0] || FEATURED_GRAPHIC_PROJECT;

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
  const [settings, webs, videos, graphics] = await Promise.all([
    getSiteSettings(),
    getWebProjects(),
    getVideoProjects(),
    getGraphicProjects(),
  ]);

  const featuredIds: string[] =
    settings.home?.featuredWorkIds ||
    settings.home?.featuredProjectIds ||
    [];

  const resolved: PublicHomeFeaturedItem[] = [];

  if (featuredIds.length > 0) {
    for (const id of featuredIds) {
      // Check video
      const vid = videos.find((v) => v.id === id);
      if (vid) {
        resolved.push({
          id: vid.id,
          type: 'video',
          title: vid.title,
          categoryLabel: vid.category ? `VIDEO / ${vid.category.toUpperCase()}` : 'VIDEO / FESTIVAL AFTERMOVIE',
          year: vid.year || '2024',
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

      // Check web
      const web = webs.find((w) => w.id === id);
      if (web) {
        resolved.push({
          id: web.id,
          type: 'web',
          title: web.title,
          categoryLabel: web.category ? `WEB / ${web.category.toUpperCase()}` : 'WEB / INTERACTIVE',
          year: web.year || '2024',
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

      // Check graphic
      const grp = graphics.find((g) => g.id === id);
      if (grp) {
        resolved.push({
          id: grp.id,
          type: 'graphic',
          title: grp.title,
          categoryLabel: grp.category ? `GRAPHIC / ${grp.category.toUpperCase()}` : 'GRAPHIC / POSTERS & PRINT',
          year: grp.year || '2024',
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

  return resolved;
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
