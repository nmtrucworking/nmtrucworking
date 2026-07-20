import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';

const fontBricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const fontGeist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JIN / Systems in Motion',
  description: 'Bilingual personal portfolio — Information Systems × Data × Product',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontBricolage.variable} ${fontGeist.variable} ${fontMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
