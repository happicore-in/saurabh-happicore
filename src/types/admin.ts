export interface AdminWebProject {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  order: number;
  category?: string;
  badgeLabel?: string;
  year?: string;
  role?: string;
  deliverables?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminVideoProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  googleDriveUrl: string;
  wherePosted?: string;
  socialMediaLink?: string;
  tools: string[];
  featured?: boolean;
  order: number;
  category?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  year?: string;
  role?: string;
  deliverables?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminGraphicProject {
  id: string;
  title: string;
  description: string;
  image: string;
  wherePosted?: string;
  socialMediaLink?: string;
  tools: string[];
  featured?: boolean;
  order: number;
  category?: string;
  badgeLabel?: string;
  year?: string;
  role?: string;
  deliverables?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminExperience {
  id: string;
  role: string;
  organization: string;
  organizationSubtext?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  responsibilities: string[];
  tags: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminAboutData {
  profileImage?: string;
  shortIntro: string;
  aboutDescription: string;
  focusAreas: string[];
  location: string;
  availabilityStatus: 'AVAILABLE FOR WORK' | 'LIMITED AVAILABILITY' | 'NOT AVAILABLE';
  education: {
    institution: string;
    degree: string;
    status: string;
    details: string;
  };
  tools: {
    name: string;
    category: 'video' | 'design' | 'web' | 'core';
  }[];
  services: {
    title: string;
    badge?: string;
    description: string;
  }[];
}

export interface AdminAboutSettings {
  profileImage?: string;
  shortIntro: string;
  aboutDescription: string;
  focusAreas: string[];
  location: string;
  education: {
    institution: string;
    degree: string;
    status: string;
    details: string;
    focusAreas: string[];
  };
  availabilityStatus: 'AVAILABLE FOR WORK' | 'LIMITED AVAILABILITY' | 'NOT AVAILABLE';
  availabilityMessage: string;
  services: {
    id: string;
    title: string;
    category: 'video' | 'graphic' | 'web';
    skills: string[];
  }[];
  tools: string[];
}

export interface AdminContactDetails {
  phone: string;
  personalEmail: string;
  workEmail: string;
  location: string;
  linkedin: string;
  whatsappNumber?: string;
}

export interface AdminHappicoreSettings {
  name: string;
  url: string;
  shortDescription: string;
  socialLink: string;
  buttonText: string;
}

export interface AdminHomeContent {
  tagline: string;
  shortIntro: string;
  profileImage?: string;
  featuredWorkIds: string[]; // references up to 5 project IDs
  featuredProjectIds?: string[];
  servicesOverview?: string;
  happicoreDescription: string;
  availability: string;
}

export interface AdminSiteSettings {
  id: string;
  siteName: string;
  logoMark: string;
  favicon?: string;
  primaryEmail: string;
  socialLinks: {
    linkedin: string;
    github?: string;
    youtube?: string;
    instagram?: string;
    behance?: string;
  };
  happicore: AdminHappicoreSettings;
  contactDetails: AdminContactDetails;
  availability: {
    status: 'AVAILABLE FOR WORK' | 'LIMITED AVAILABILITY' | 'NOT AVAILABLE';
    message: string;
  };
  about: AdminAboutSettings;
  home: AdminHomeContent;
  homeContent?: AdminHomeContent;
  cloudinary: {
    cloudName: string;
    uploadPreset: string;
  };
  updatedAt?: string;
}
