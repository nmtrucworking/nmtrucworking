import {
  loadAwards,
  loadExperiences,
  loadJourneyItems,
  loadMediaAssets,
  loadMessages,
  loadProfile,
  loadProjects,
  loadRolesData,
  loadSiteConfig,
  Locale,
  MediaAsset,
} from './load';

export interface LocalizedMediaAsset extends MediaAsset {
  altText: string;
  captionText: string;
  creditsText: string | null;
}

export function getMediaAssetById(id: string | null | undefined, locale: Locale): LocalizedMediaAsset | null {
  if (!id) return null;
  const asset = loadMediaAssets().find((a) => a.id === id && a.visibility === 'public');
  if (!asset) return null;

  return {
    ...asset,
    altText: asset.alt[locale] || asset.alt.en,
    captionText: asset.caption[locale] || asset.caption.en,
    creditsText: asset.credits ? asset.credits[locale] || asset.credits.en : null,
  };
}

export function getMediaAssetsByIds(ids: string[], locale: Locale): LocalizedMediaAsset[] {
  return ids
    .map((id) => getMediaAssetById(id, locale))
    .filter((asset): asset is LocalizedMediaAsset => asset !== null);
}

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

export function getExperiences(locale: Locale) {
  const projects = loadProjects();

  return loadExperiences().map((experience) => ({
    ...experience,
    organizationText: experience.organization[locale] || experience.organization.en,
    roleText: experience.role[locale] || experience.role.en,
    summaryText: experience.summary[locale] || experience.summary.en,
    dimensionsLocalized: experience.dimensions.map((dimension) => ({
      ...dimension,
      valueText: dimension.value[locale] || dimension.value.en,
    })),
    activitiesLocalized: experience.activities.map((activity) => ({
      ...activity,
      titleText: activity.title[locale] || activity.title.en,
      descriptionText: activity.description[locale] || activity.description.en,
    })),
    contributionsLocalized: experience.contributions.map((contribution) => ({
      ...contribution,
      titleText: contribution.title[locale] || contribution.title.en,
      subtitleText: contribution.subtitle[locale] || contribution.subtitle.en,
      descriptionText: contribution.description[locale] || contribution.description.en,
    })),
    relatedProjectsLocalized: experience.relatedProjects.flatMap((projectId) => {
      const project = projects.find((candidate) => candidate.id === projectId && candidate.status === 'published');
      if (!project) return [];

      return [
        {
          id: project.id,
          slug: project.slug,
          title: (project.localized[locale] || project.localized.en).title,
          summary: (project.localized[locale] || project.localized.en).summary,
        },
      ];
    }),
  }));
}

export function getRolesAndAffiliations(locale: Locale) {
  const { privacySettings, roles } = loadRolesData();
  const projects = loadProjects();
  const journeyItems = loadJourneyItems();
  const awards = loadAwards();

  const localizedRoles = roles
    .filter((role) => role.visibility === 'public')
    .map((role) => ({
      ...role,
      titleText: role.title[locale] || role.title.en,
      organizationText: role.organization[locale] || role.organization.en,
      startDateNoteText: role.startDateNote ? role.startDateNote[locale] || role.startDateNote.en : null,
      shortDescriptionText: role.shortDescription[locale] || role.shortDescription.en,
      detailedDescriptionText: role.detailedDescription[locale] || role.detailedDescription.en,
      responsibilitiesLocalized: role.responsibilities.map((r) => r[locale] || r.en),
      contributionsLocalized: role.contributions.map((c) => ({
        ...c,
        titleText: c.title[locale] || c.title.en,
        subtitleText: c.subtitle[locale] || c.subtitle.en,
        descriptionText: c.description[locale] || c.description.en,
      })),
      coverAsset: getMediaAssetById(role.coverImage, locale),
      galleryAssets: getMediaAssetsByIds(role.galleryImages, locale),
      evidenceLinksLocalized: role.evidenceLinks
        .filter((link) => link.visibility === 'public')
        .map((link) => ({
          ...link,
          labelText: link.label[locale] || link.label.en,
        })),
      relatedProjectsLocalized: role.relatedProjects.flatMap((projectId) => {
        const project = projects.find((p) => p.id === projectId && p.status === 'published');
        if (!project) return [];
        return [
          {
            id: project.id,
            slug: project.slug,
            title: (project.localized[locale] || project.localized.en).title,
            summary: (project.localized[locale] || project.localized.en).summary,
            primaryRole: project.roles.primary,
          },
        ];
      }),
      relatedActivitiesLocalized: role.relatedActivityIds.flatMap((actId) => {
        const act = journeyItems.find((j) => j.id === actId && j.visibility === 'public');
        if (!act) return [];
        return [
          {
            id: act.id,
            slug: act.slug,
            year: act.year,
            dateDisplayText: act.dateDisplay[locale] || act.dateDisplay.en,
            titleText: act.title[locale] || act.title.en,
            category: act.category,
          },
        ];
      }),
      relatedAwardsLocalized: role.relatedAwardIds.flatMap((awardId) => {
        const award = awards.find((a) => a.id === awardId && a.visibility === 'public');
        if (!award) return [];
        return [
          {
            id: award.id,
            titleText: award.title[locale] || award.title.en,
            awardType: award.awardType,
            awardDate: award.awardDate,
          },
        ];
      }),
    }));

  return {
    privacySettings,
    roles: localizedRoles,
  };
}

export function getJourneyItems(locale: Locale) {
  const items = loadJourneyItems();
  const projects = loadProjects();
  const { roles } = loadRolesData();
  const awards = loadAwards();

  return items
    .filter((item) => item.visibility === 'public')
    .map((item) => ({
      ...item,
      dateDisplayText: item.dateDisplay[locale] || item.dateDisplay.en,
      titleText: item.title[locale] || item.title.en,
      organizationText: item.organization[locale] || item.organization.en,
      roleText: item.role[locale] || item.role.en,
      summaryText: item.summary[locale] || item.summary.en,
      overviewText: item.overview[locale] || item.overview.en,
      personalRoleDetailText: item.personalRoleDetail[locale] || item.personalRoleDetail.en,
      executedWorkLocalized: item.executedWork.map((w) => w[locale] || w.en),
      outcomesAndImpactLocalized: item.outcomesAndImpact.map((o) => o[locale] || o.en),
      verifiedMetricsLocalized: item.verifiedMetrics.map((m) => ({
        value: m.value,
        labelText: m.label[locale] || m.label.en,
        sourceNoteText: m.sourceNote[locale] || m.sourceNote.en,
      })),
      coverAsset: getMediaAssetById(item.coverImage, locale),
      galleryAssets: getMediaAssetsByIds(item.galleryImages, locale),
      evidenceLinksLocalized: item.evidenceLinks
        .filter((l) => l.visibility === 'public')
        .map((l) => ({
          ...l,
          labelText: l.label[locale] || l.label.en,
        })),
      relatedRolesLocalized: item.relatedRoleIds.flatMap((roleId) => {
        const role = roles.find((r) => r.id === roleId && r.visibility === 'public');
        if (!role) return [];
        return [
          {
            id: role.id,
            titleText: role.title[locale] || role.title.en,
            organizationText: role.organization[locale] || role.organization.en,
            organizationShort: role.organizationShort,
            roleType: role.roleType,
            category: role.category,
          },
        ];
      }),
      relatedProjectsLocalized: item.relatedProjectIds.flatMap((projectId) => {
        const project = projects.find((p) => p.id === projectId && p.status === 'published');
        if (!project) return [];
        return [
          {
            id: project.id,
            slug: project.slug,
            title: (project.localized[locale] || project.localized.en).title,
            summary: (project.localized[locale] || project.localized.en).summary,
            primaryRole: project.roles.primary,
            stage: project.stage,
          },
        ];
      }),
      relatedAwardsLocalized: item.relatedAwardIds.flatMap((awardId) => {
        const award = awards.find((a) => a.id === awardId && a.visibility === 'public');
        if (!award) return [];
        return [
          {
            id: award.id,
            titleText: award.title[locale] || award.title.en,
            awardType: award.awardType,
            awardDate: award.awardDate,
            organizerText: award.organizer[locale] || award.organizer.en,
          },
        ];
      }),
    }));
}

export function getJourneyItemBySlug(slug: string, locale: Locale) {
  const items = getJourneyItems(locale);
  return items.find((item) => item.slug === slug) || null;
}

export function getAwards(locale: Locale) {
  const awards = loadAwards();
  const projects = loadProjects();
  const journeyItems = loadJourneyItems();
  const { roles } = loadRolesData();

  return awards
    .filter((award) => award.visibility === 'public')
    .map((award) => {
      const relatedProject = award.relatedProjectId
        ? projects.find((p) => p.id === award.relatedProjectId && p.status === 'published')
        : null;
      const relatedActivity = award.relatedActivityId
        ? journeyItems.find((j) => j.id === award.relatedActivityId && j.visibility === 'public')
        : null;
      const relatedRole = award.relatedRoleId
        ? roles.find((r) => r.id === award.relatedRoleId && r.visibility === 'public')
        : null;

      return {
        ...award,
        titleText: award.title[locale] || award.title.en,
        organizerText: award.organizer[locale] || award.organizer.en,
        competitionOrProgramText: award.competitionOrProgram[locale] || award.competitionOrProgram.en,
        levelLabelText: award.levelLabel[locale] || award.levelLabel.en,
        awardRankText: award.awardRank[locale] || award.awardRank.en,
        descriptionText: award.description[locale] || award.description.en,
        myContributionText: award.myContribution[locale] || award.myContribution.en,
        certificateAsset: getMediaAssetById(award.certificateImage, locale),
        awardAssets: getMediaAssetsByIds(award.awardImages, locale),
        relatedProjectLocalized: relatedProject
          ? {
              id: relatedProject.id,
              slug: relatedProject.slug,
              title: (relatedProject.localized[locale] || relatedProject.localized.en).title,
            }
          : null,
        relatedActivityLocalized: relatedActivity
          ? {
              id: relatedActivity.id,
              slug: relatedActivity.slug,
              title: relatedActivity.title[locale] || relatedActivity.title.en,
            }
          : null,
        relatedRoleLocalized: relatedRole
          ? {
              id: relatedRole.id,
              title: relatedRole.title[locale] || relatedRole.title.en,
              organizationShort: relatedRole.organizationShort,
            }
          : null,
      };
    });
}
