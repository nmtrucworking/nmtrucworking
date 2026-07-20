import profileData from './data/profile.json';
import projectsData from './data/projects.json';
import siteData from './data/site.json';
import messagesEn from './data/messages.en.json';
import messagesVi from './data/messages.vi.json';

export type Locale = 'en' | 'vi';

export interface Profile {
  id: string;
  displayName: string;
  positioning: Record<Locale, string>;
  descriptor: string;
  location: Record<Locale, string>;
  availability: {
    status: 'open' | 'selective' | 'unavailable';
    intents: string[];
    label: Record<Locale, string>;
  };
  targetRoles: ('DA' | 'DS' | 'BA' | 'SA' | 'PRODUCT')[];
  capabilities: { id: string; roles: string[] }[];
  cv: {
    updatedAt: string;
    files: Record<Locale, string>;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    zalo?: string;
  };
}

export interface ProjectAsset {
  id: string;
  src: string;
  type: 'image' | 'video' | 'diagram' | 'document';
  width: number;
  height: number;
  purpose: string;
  status: string;
  alt: Record<Locale, string>;
}

export interface ProjectLink {
  type: string;
  url: string;
  visibility: string;
  label: Record<Locale, string>;
}

export interface CaseStudyBlock {
  id: string;
  type: string;
  localized: Record<Locale, { heading: string; body: string }>;
}

export interface Project {
  id: string;
  slug: string;
  status: string;
  stage: 'production' | 'prototype' | 'concept' | 'academic' | 'archived';
  visibility: string;
  featured: boolean;
  order: number;
  yearStart: number;
  yearEnd: number | null;
  domains: string[];
  roles: {
    primary: 'DA' | 'DS' | 'BA' | 'SA' | 'PRODUCT';
    secondary: ('DA' | 'DS' | 'BA' | 'SA' | 'PRODUCT')[];
  };
  capabilities: string[];
  technologies: string[];
  team: {
    type: 'solo' | 'team';
    size: number;
  };
  localized: Record<
    Locale,
    {
      title: string;
      summary: string;
      contribution: string;
      seoTitle: string;
      seoDescription: string;
    }
  >;
  assets: ProjectAsset[];
  links: ProjectLink[];
  caseStudy: CaseStudyBlock[];
  metrics: { label: string; value: string }[];
}

export interface SiteConfig {
  siteName: string;
  baseUrl: string;
  defaultLocale: Locale;
  locales: Locale[];
  navigation: { id: string; href: string }[];
  socials: { type: string; url: string }[];
  features: {
    analytics: boolean;
    contactForm: boolean;
    notes: boolean;
    themeToggle: boolean;
  };
}

export function loadProfile(): Profile {
  return profileData as unknown as Profile;
}

export function loadProjects(): Project[] {
  return (projectsData.projects as unknown as Project[]).sort((a, b) => a.order - b.order);
}

export function loadSiteConfig(): SiteConfig {
  return siteData as unknown as SiteConfig;
}

export function loadMessages(locale: Locale) {
  return locale === 'vi' ? messagesVi : messagesEn;
}
