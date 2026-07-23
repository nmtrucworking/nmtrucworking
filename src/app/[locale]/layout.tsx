import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/content/load';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryPageTransition } from '@/components/motion/LuxuryPageTransition';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'vi') {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <div lang={typedLocale} className="min-h-screen flex flex-col justify-between selection:bg-signal selection:text-ink">
      <Header locale={typedLocale} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <LuxuryPageTransition>{children}</LuxuryPageTransition>
      </main>
      <Footer locale={typedLocale} />
    </div>
  );
}
