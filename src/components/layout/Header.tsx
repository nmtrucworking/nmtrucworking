'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, loadMessages } from '@/content/load';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const pathname = usePathname();
  const messages = loadMessages(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <Link href={`/${locale}`} className="group flex shrink-0 items-center gap-3">
          <div className="w-8 h-8 rounded bg-graphite flex items-center justify-center text-signal font-mono font-bold text-sm group-hover:scale-105 transition-transform">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-ink text-lg leading-tight tracking-tight">
              JIN
            </span>
            <span className="mono-label hidden text-[10px] text-muted tracking-widest uppercase sm:block">
              Systems in Motion
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden min-w-0 items-center gap-5 md:flex lg:gap-8" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex min-h-11 items-center text-sm font-medium transition-colors ${
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
            aria-label={`Switch language to ${locale === 'en' ? 'Vietnamese' : 'English'}`}
            className="flex min-h-11 items-center gap-1.5 rounded border border-line bg-paper px-3 py-1.5 text-xs font-mono font-semibold transition-all hover:border-ink hover:bg-canvas"
          >
            <span className={locale === 'en' ? 'text-ink font-bold' : 'text-muted'}>EN</span>
            <span className="text-muted/40">/</span>
            <span className={locale === 'vi' ? 'text-ink font-bold' : 'text-muted'}>VI</span>
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-paper text-ink transition-colors hover:border-ink md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${isMenuOpen ? 'grid' : 'hidden'} grid-cols-1 gap-1 border-t border-line/60 bg-canvas px-4 py-3 sm:grid-cols-2 sm:px-6 md:hidden`}
      >
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive ? 'bg-graphite text-signal' : 'text-muted hover:bg-paper hover:text-ink'
              }`}
            >
              {item.label}
              <span className="font-mono text-xs" aria-hidden="true">→</span>
            </Link>
          );
        })}
        <Link
          href={getOtherLocaleHref()}
          aria-label={`Switch language to ${locale === 'en' ? 'Vietnamese' : 'English'}`}
          className="flex min-h-11 items-center justify-between rounded-lg border border-line bg-paper px-3 text-sm font-mono font-semibold text-ink sm:col-span-2"
        >
          <span>{locale === 'en' ? 'Tiếng Việt' : 'English'}</span>
          <span aria-hidden="true">{locale === 'en' ? 'VI' : 'EN'}</span>
        </Link>
      </nav>
    </header>
  );
};
