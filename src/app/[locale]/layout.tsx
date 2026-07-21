import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/content/load';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (locale !== 'en' && locale !== 'vi') {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-signal selection:text-ink">
      <Header locale={typedLocale} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">{children}</main>
      <Footer locale={typedLocale} />
    </div>
  );
}
