import { MetadataRoute } from 'next';
import { loadSiteConfig } from '@/content/load';

export default function robots(): MetadataRoute.Robots {
  const site = loadSiteConfig();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site.baseUrl}/sitemap.xml`,
  };
}
