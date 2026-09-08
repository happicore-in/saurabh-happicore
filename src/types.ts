/**
 * Global Design System Types for Saurabh Portfolio
 * Part 1 — Global Design System
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  dropdown?: {
    id: string;
    label: string;
    href: string;
  }[];
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type BadgeVariant = 'warm' | 'blue' | 'neutral' | 'outline';

export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  border?: string;
  textColor?: string;
}

export interface TypographyRole {
  role: string;
  font: string;
  description: string;
  sample: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  pixel: number;
  useCase: string;
}

export type WorkCategory = 'all' | 'web' | 'video' | 'graphic';

export interface WorkProject {
  id: string;
  index: string;
  title: string;
  category: 'web' | 'video' | 'graphic';
  subcategory: string;
  description: string;
  image: string;
  tags: string[];
  duration?: string;
  institutionOrLocation?: string;
  badgeLabel?: string;
  extraBadge?: string;
  featured?: boolean;
  aspectRatio?: 'featured-wide' | 'standard' | 'tall-poster' | 'horizontal-split';
  metrics?: { label: string; value: string }[];
  actionLabel?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export type WebFilterType = 'all' | 'fullstack' | 'portfolios' | 'tools';

export interface WebProjectItem {
  id: string;
  index: string;
  title: string;
  badgeLabel?: string;
  filterType: 'fullstack' | 'portfolios' | 'tools';
  categoryLabel: string;
  category?: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFlagship?: boolean;
  telemetryLatency?: string;
  browserUrl?: string;
  scoreTicker?: string;
  isComingSoon?: boolean;
}

export type VideoFilterType =
  | 'all'
  | 'aftermovies'
  | 'sports'
  | 'short-form'
  | 'promotional';

export interface VideoProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  filterCategory: 'aftermovies' | 'sports' | 'short-form' | 'promotional';
  description: string;
  duration: string;
  thumbnail: string;
  videoLink?: string;
  socialMediaLink?: string;
  socialPlatformName?: string;
  technologies?: string[];
  isFeatured?: boolean;
  aspectRatio?: '16:9' | '9:16';
  retentionRate?: string;
  batchLabel?: string;
}

export type GraphicFilterType =
  | 'all'
  | 'posters'
  | 'branding'
  | 'social'
  | 'merchandise';

export interface GraphicProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  filterCategory: 'posters' | 'branding' | 'social' | 'merchandise';
  description: string;
  image: string;
  images?: { url: string; label: string; caption?: string }[];
  date?: string;
  badgeLabel?: string;
  specLabel?: string;
  editionLabel?: string;
  technologies?: string[];
  externalPostLink?: string;
  platformName?: string;
  isFeatured?: boolean;
  aspectRatio?: '3:4' | '16:9' | '1:1' | '4:3' | 'split';
  viewActionLabel?: string;
}

export interface ExperienceItem {
  id: string;
  sysRole: string;
  role: string;
  organization: string;
  organizationSubtext?: string;
  date: string;
  location?: string;
  statusBadge?: string;
  badgeType?: 'current' | 'engineering' | 'edition' | 'season';
  description?: string;
  responsibilities: string[];
  tags: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer?: string;
  type?: string;
}

