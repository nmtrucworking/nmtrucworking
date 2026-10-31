import profileData from './data/profile.json';
import projectsData from './data/projects.json';
import experiencesData from './data/experiences.json';
import siteData from './data/site.json';
import mediaData from './data/media.json';
import rolesData from './data/roles.json';
import journeyData from './data/journey.json';
import awardsData from './data/awards.json';
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

export interface Experience {
  id: string;
  organization: Record<Locale, string>;
  organizationShort: string;
  role: Record<Locale, string>;
  period: {
    start: string;
    end: string | null;
  };
  tags: string[];
  summary: Record<Locale, string>;
  dimensions: {
    label: string;
    value: Record<Locale, string>;
  }[];
  activities: {
    id: string;
    year: number;
    month: string | null;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
  }[];
  contributions: {
    id: string;
    title: Record<Locale, string>;
    subtitle: Record<Locale, string>;
    description: Record<Locale, string>;
    evidence: string[];
  }[];
  relatedProjects: string[];
}

export type MediaAssetType =
  | 'portrait'
  | 'logo'
  | 'activity'
  | 'event'
  | 'team-project'
  | 'certificate'
  | 'archive'
  | 'diagram';

export interface MediaAsset {
  id: string;
  src: string | null;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  width: number;
  height: number;
  type: MediaAssetType;
  credits: Record<Locale, string> | null;
  visibility: 'public' | 'private';
  status: 'verified' | 'pending-upload';
}

export type RoleCategory =
  | 'political-civic'
  | 'leadership-organizations'
  | 'professional-technical'
  | 'community-volunteering';

export type RoleType = 'membership' | 'leadership' | 'specialist';

export interface EvidenceLink {
  label: Record<Locale, string>;
  url: string;
  type: 'live' | 'repository' | 'document' | 'article' | 'certificate' | 'case-study';
  visibility: 'public' | 'private';
}

export interface RoleContribution {
  id: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  description: Record<Locale, string>;
  evidence: string[];
}

export interface RoleAffiliation {
  id: string;
  title: Record<Locale, string>;
  organization: Record<Locale, string>;
  organizationShort: string;
  organizationLogo: string | null;
  category: RoleCategory;
  roleType: RoleType;
  startDate: string | null;
  startDateNote: Record<Locale, string> | null;
  endDate: string | null;
  isCurrent: boolean;
  shortDescription: Record<Locale, string>;
  detailedDescription: Record<Locale, string>;
  responsibilities: Record<Locale, string>[];
  contributions: RoleContribution[];
  relatedProjects: string[];
  relatedActivityIds: string[];
  relatedAwardIds: string[];
  coverImage: string | null;
  galleryImages: string[];
  evidenceLinks: EvidenceLink[];
  visibility: 'public' | 'private';
  verificationStatus: 'verified' | 'partial-pending-documents';
}

export interface RolePrivacySettings {
  showPoliticalMembershipByDefault: boolean;
  allowVisitorPoliticalToggle: boolean;
}

export type JourneyCategory =
  | 'academic'
  | 'organizations'
  | 'events'
  | 'leadership'
  | 'milestones';

export interface VerifiedMetric {
  label: Record<Locale, string>;
  value: string;
  sourceNote: Record<Locale, string>;
}

export interface JourneyItem {
  id: string;
  slug: string;
  category: JourneyCategory;
  year: number;
  dateDisplay: Record<Locale, string>;
  sortOrder: number;
  title: Record<Locale, string>;
  organization: Record<Locale, string>;
  role: Record<Locale, string>;
  roleType: RoleType;
  isCurrent: boolean;
  summary: Record<Locale, string>;
  overview: Record<Locale, string>;
  personalRoleDetail: Record<Locale, string>;
  executedWork: Record<Locale, string>[];
  outcomesAndImpact: Record<Locale, string>[];
  verifiedMetrics: VerifiedMetric[];
  coverImage: string | null;
  galleryImages: string[];
  evidenceLinks: EvidenceLink[];
  tags: string[];
  relatedRoleIds: string[];
  relatedProjectIds: string[];
  relatedAwardIds: string[];
  visibility: 'public' | 'private';
  hasDetailedView: boolean;
}

export type AwardCategory =
  | 'academic'
  | 'competitions'
  | 'leadership-contributions'
  | 'certifications'
  | 'other-recognitions';

export type AwardType =
  | 'award'
  | 'nomination'
  | 'completion-certificate'
  | 'participation'
  | 'recognition';

export type AwardLevel =
  | 'institutional'
  | 'local'
  | 'national'
  | 'international'
  | 'program-verified'
  | 'pending-verification';

export interface AwardItem {
  id: string;
  title: Record<Locale, string>;
  category: AwardCategory;
  awardType: AwardType;
  organizer: Record<Locale, string>;
  competitionOrProgram: Record<Locale, string>;
  level: AwardLevel;
  levelLabel: Record<Locale, string>;
  awardDate: string;
  awardRank: Record<Locale, string>;
  individualOrTeam: 'individual' | 'team';
  teamSize: number | null;
  description: Record<Locale, string>;
  myContribution: Record<Locale, string>;
  certificateImage: string | null;
  awardImages: string[];
  verificationUrl: string | null;
  relatedProjectId: string | null;
  relatedActivityId: string | null;
  relatedRoleId: string | null;
  visibility: 'public' | 'private';
  verificationStatus: 'verified' | 'evidence-pending';
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

export function loadExperiences(): Experience[] {
  return experiencesData.experiences as unknown as Experience[];
}

export function loadMediaAssets(): MediaAsset[] {
  return mediaData.assets as unknown as MediaAsset[];
}

export function loadRolesData(): {
  privacySettings: RolePrivacySettings;
  roles: RoleAffiliation[];
} {
  return rolesData as unknown as {
    privacySettings: RolePrivacySettings;
    roles: RoleAffiliation[];
  };
}

export function loadJourneyItems(): JourneyItem[] {
  return (journeyData.items as unknown as JourneyItem[]).sort(
    (a, b) => b.year - a.year || a.sortOrder - b.sortOrder
  );
}

export function loadAwards(): AwardItem[] {
  return awardsData.awards as unknown as AwardItem[];
}

export function loadSiteConfig(): SiteConfig {
  return siteData as unknown as SiteConfig;
}

export function loadMessages(locale: Locale) {
  return locale === 'vi' ? messagesVi : messagesEn;
}
