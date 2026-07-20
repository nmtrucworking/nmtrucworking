'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, loadMessages } from '@/content/load';

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const pathname = usePathname();
  const messages = loadMessages(locale);

  // Helper to switch locale while preserving path
  const getOtherLocaleHref = () => {
    const targetLocale = locale === 'en' ? 'vi' : 'en';
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || `/${targetLocale}`;
  };

  const navItems = [
    { id: 'work', href: `/${locale}/work`, label: messages.nav.work },
    { id: 'about', href: `/${locale}/about`, label: messages.nav.about },
    { id: 'contact', href: `/${locale}/contact`, label: messages.nav.contact },
    { id: 'cv', href: `/${locale}/cv`, label: messages.nav.cv },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-canvas/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Mark */}
        <Link href={`/${locale}`} className="group flex shrink-0 items-center gap-3">
          <div className="w-8 h-8 rounded bg-graphite flex items-center justify-center text-signal font-mono font-bold text-sm group-hover:scale-105 transition-transform">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-ink text-lg leading-tight tracking-tight">
              JIN
            </span>
            <span className="mono-label text-[10px] text-muted tracking-widest uppercase">
              Systems in Motion
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="min-w-0 flex items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-8">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal" />
                )}
              </Link>
            );
          })}

          {/* Locale Switcher Button */}
          <Link
            href={getOtherLocaleHref()}
            aria-label="Switch language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-line bg-paper hover:bg-canvas text-xs font-mono font-semibold transition-all hover:border-ink"
          >
            <span className={locale === 'en' ? 'text-ink font-bold' : 'text-muted'}>EN</span>
            <span className="text-muted/40">/</span>
            <span className={locale === 'vi' ? 'text-ink font-bold' : 'text-muted'}>VI</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
