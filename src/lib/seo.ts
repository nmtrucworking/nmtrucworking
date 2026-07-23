import type { Metadata } from 'next';
import { Locale, loadSiteConfig } from '@/content/load';

interface LocalizedMetadataInput {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}

function localizedUrl(locale: Locale, path = '') {
  const { baseUrl } = loadSiteConfig();
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path;
  return `${baseUrl}/${locale}${normalizedPath}`;
}

export function buildLocalizedMetadata({
  locale,
  path = '',
  title,
  description,
}: LocalizedMetadataInput): Metadata {
  const site = loadSiteConfig();
  const canonical = localizedUrl(locale, path);
  const imageUrl = `${site.baseUrl}/og.png`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: localizedUrl('en', path),
        vi: localizedUrl('vi', path),
        'x-default': localizedUrl(site.defaultLocale, path),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: site.siteName,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

