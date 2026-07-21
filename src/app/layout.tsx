import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { headers } from 'next/headers';
import '@/styles/globals.css';

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'jin-systems.dev';
  const protocol = requestHeaders.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  const metadataBase = new URL(`${protocol}://${host}`);
  const description = 'Nguyễn Minh Trúc — biến dữ liệu phức tạp thành giải pháp thực tế và sản phẩm tạo ra tác động.';
  const imageUrl = new URL('/og.png', metadataBase).toString();

  return {
    metadataBase,
    title: 'TRÚC. — Data / Systems / Product',
    description,
    icons: {
      icon: '/brand/05-favicon.svg',
    },
    openGraph: {
      type: 'website',
      title: 'TRÚC. — Data / Systems / Product',
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: 'TRÚC. — Data / Systems / Product' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TRÚC. — Data / Systems / Product',
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
