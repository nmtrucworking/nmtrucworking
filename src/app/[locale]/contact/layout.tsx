import type { Metadata } from 'next';
import { Locale } from '@/content/load';
import { buildLocalizedMetadata } from '@/lib/seo';

interface ContactLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactLayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return buildLocalizedMetadata({
    locale,
    path: '/contact',
    title: locale === 'vi' ? 'Liên hệ Nguyễn Minh Trúc' : 'Contact Nguyễn Minh Trúc',
    description:
      locale === 'vi'
        ? 'Liên hệ Nguyễn Minh Trúc để trao đổi về cơ hội nghề nghiệp, dự án dữ liệu, hệ thống hoặc sản phẩm.'
        : 'Contact Nguyễn Minh Trúc about roles and projects involving data, systems, or product work.',
  });
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return children;
}

