import { MetadataRoute } from 'next';
import { loadProjects, loadSiteConfig } from '@/content/load';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = loadSiteConfig();
  const projects = loadProjects();
  const baseUrl = site.baseUrl;

  const routes = ['', '/work', '/about', '/contact', '/cv', '/privacy'];
  const locales = ['en', 'vi'];

  const sitemapItems: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapItems.push({
        url: `${baseUrl}/${locale}${route}`,
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            vi: `${baseUrl}/vi${route}`,
          },
        },
      });
    }

    for (const project of projects) {
      if (project.status === 'published') {
        sitemapItems.push({
          url: `${baseUrl}/${locale}/work/${project.slug}`,
          changeFrequency: 'monthly',
          priority: 0.9,
          alternates: {
            languages: {
              en: `${baseUrl}/en/work/${project.slug}`,
              vi: `${baseUrl}/vi/work/${project.slug}`,
            },
          },
        });
      }
    }
  }

  return sitemapItems;
}
