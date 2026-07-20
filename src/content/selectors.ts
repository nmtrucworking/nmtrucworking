import { loadProfile, loadProjects, loadSiteConfig, loadMessages, Locale, Project } from './load';

export function getProfile(locale: Locale) {
  const profile = loadProfile();
  return {
    ...profile,
    positioningText: profile.positioning[locale] || profile.positioning.en,
    locationText: profile.location[locale] || profile.location.en,
    availabilityLabel: profile.availability.label[locale] || profile.availability.label.en,
    cvPath: profile.cv.files[locale] || profile.cv.files.en,
  };
}

export function getSite(locale: Locale) {
  const site = loadSiteConfig();
  const messages = loadMessages(locale);
  return {
    ...site,
    messages,
  };
}

export function getProjects(
  locale: Locale,
  filters?: { role?: string; domain?: string; query?: string }
) {
  const allProjects = loadProjects();

  return allProjects
    .filter((project) => {
      if (project.status !== 'published') return false;

      if (filters?.role && filters.role !== 'all') {
        const matchesPrimary = project.roles.primary === filters.role;
        const matchesSecondary = project.roles.secondary.includes(filters.role as any);
        if (!matchesPrimary && !matchesSecondary) return false;
      }

      if (filters?.domain && filters.domain !== 'all') {
        if (!project.domains.includes(filters.domain)) return false;
      }

      if (filters?.query && filters.query.trim() !== '') {
        const q = filters.query.toLowerCase();
        const loc = project.localized[locale] || project.localized.en;
        const titleMatch = loc.title.toLowerCase().includes(q);
        const summaryMatch = loc.summary.toLowerCase().includes(q);
        const techMatch = project.technologies.some((t) => t.toLowerCase().includes(q));
        const capMatch = project.capabilities.some((c) => c.toLowerCase().includes(q));
        if (!titleMatch && !summaryMatch && !techMatch && !capMatch) return false;
      }

      return true;
    })
    .map((project) => ({
      ...project,
      localizedContent: project.localized[locale] || project.localized.en,
      heroAsset: project.assets.find((a) => a.purpose === 'hero') || project.assets[0],
    }));
}

export function getProjectBySlug(slug: string, locale: Locale) {
  const projects = loadProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  return {
    ...project,
    localizedContent: project.localized[locale] || project.localized.en,
    heroAsset: project.assets.find((a) => a.purpose === 'hero') || project.assets[0],
    caseStudyLocalized: project.caseStudy.map((block) => ({
      id: block.id,
      type: block.type,
      heading: block.localized[locale]?.heading || block.localized.en.heading,
      body: block.localized[locale]?.body || block.localized.en.body,
    })),
  };
}

export function getFeaturedProjects(locale: Locale) {
  return getProjects(locale).filter((p) => p.featured);
}
