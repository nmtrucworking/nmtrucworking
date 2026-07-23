import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { loadSiteConfig } from '@/content/load';
import '@/styles/globals.css';

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export function generateMetadata(): Metadata {
  const site = loadSiteConfig();
  const metadataBase = new URL(site.baseUrl);
  const description = 'Nguyễn Minh Trúc — biến dữ liệu phức tạp thành giải pháp thực tế và sản phẩm tạo ra tác động.';
  const imageUrl = new URL('/og.png', metadataBase).toString();

  return {
    metadataBase,
    title: 'Nguyễn Minh Trúc — Data / Systems / Product',
    description,
    icons: {
      icon: '/brand/05-favicon.svg',
    },
    openGraph: {
      type: 'website',
      title: 'Nguyễn Minh Trúc — Data / Systems / Product',
      description,
      siteName: site.siteName,
      url: site.baseUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: 'Nguyễn Minh Trúc — Data / Systems / Product' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nguyễn Minh Trúc — Data / Systems / Product',
      description,
      images: [imageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSpaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
