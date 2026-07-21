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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink/95 text-canvas backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <Link href={`/${locale}`} className="group flex shrink-0 items-center gap-3" aria-label="TRÚC. home">
          <div className="flex flex-col">
            <img
              src="/brand/01-truc-wordmark-dark.svg"
              width="92"
              height="24"
              alt="TRÚC."
              className="h-auto w-[5.75rem] transition-transform group-hover:translate-x-0.5"
            />
            <span className="mono-label mt-1 hidden text-[9px] tracking-[0.2em] text-canvas/55 sm:block">
              Data / Systems / Product
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
                    ? 'font-semibold text-canvas'
                    : 'text-canvas/60 hover:text-canvas'
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
            className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-canvas transition-all hover:border-signal/70 hover:bg-white/10"
          >
            <span className={locale === 'en' ? 'font-bold text-signal' : 'text-canvas/50'}>EN</span>
            <span className="text-canvas/25">/</span>
            <span className={locale === 'vi' ? 'font-bold text-signal' : 'text-canvas/50'}>VI</span>
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-canvas transition-colors hover:border-signal md:hidden"
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
        className={`${isMenuOpen ? 'grid' : 'hidden'} grid-cols-1 gap-1 border-t border-white/10 bg-ink px-4 py-3 sm:grid-cols-2 sm:px-6 md:hidden`}
      >
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive ? 'bg-graphite text-signal' : 'text-canvas/65 hover:bg-white/5 hover:text-canvas'
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
          className="flex min-h-11 items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 text-sm font-semibold text-canvas sm:col-span-2"
        >
          <span>{locale === 'en' ? 'Tiếng Việt' : 'English'}</span>
          <span aria-hidden="true">{locale === 'en' ? 'VI' : 'EN'}</span>
        </Link>
      </nav>
    </header>
  );
};
