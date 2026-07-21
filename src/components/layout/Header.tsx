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
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => setIsScrolling(false), 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, []);

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
    <header className={`site-header sticky top-0 z-50 w-full ${isScrolling ? 'site-header--scrolling text-ink' : 'text-canvas'}`}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <Link href={`/${locale}`} className="group flex shrink-0 items-center gap-3" aria-label="TRÚC. home">
          <div className="flex flex-col">
            <img
              src={`/brand/01-truc-wordmark-${isScrolling ? 'light' : 'dark'}.svg`}
              width="84"
              height="22"
              alt="TRÚC."
              className="h-auto w-[5.25rem] transition-transform group-hover:translate-x-0.5"
            />
            <span className={`mono-label mt-0.5 hidden text-[8px] tracking-[0.18em] sm:block ${isScrolling ? 'text-muted' : 'text-canvas/55'}`}>
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
                className={`relative flex min-h-10 items-center text-sm font-medium transition-colors ${
                  isActive
                    ? isScrolling ? 'font-semibold text-ink' : 'font-semibold text-canvas'
                    : isScrolling ? 'text-muted hover:text-ink' : 'text-canvas/60 hover:text-canvas'
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
            className={`flex min-h-10 items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-all ${isScrolling ? 'border-line bg-paper text-ink hover:border-ink' : 'border-white/15 bg-white/5 text-canvas hover:border-signal/70 hover:bg-white/10'}`}
          >
            <span className={locale === 'en' ? 'font-bold text-signal' : isScrolling ? 'text-muted' : 'text-canvas/50'}>EN</span>
            <span className={isScrolling ? 'text-muted/50' : 'text-canvas/25'}>/</span>
            <span className={locale === 'vi' ? 'font-bold text-signal' : isScrolling ? 'text-muted' : 'text-canvas/50'}>VI</span>
          </Link>
        </nav>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors md:hidden ${isScrolling ? 'border-line bg-paper text-ink hover:border-ink' : 'border-white/15 bg-white/5 text-canvas hover:border-signal'}`}
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
        className={`${isMenuOpen ? 'grid' : 'hidden'} grid-cols-1 gap-1 border-t px-4 py-3 sm:grid-cols-2 sm:px-6 md:hidden ${isScrolling ? 'border-line bg-canvas' : 'border-white/10 bg-ink'}`}
      >
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive
                  ? isScrolling ? 'bg-paper text-ink' : 'bg-graphite text-signal'
                  : isScrolling ? 'text-muted hover:bg-paper hover:text-ink' : 'text-canvas/65 hover:bg-white/5 hover:text-canvas'
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
          className={`flex min-h-11 items-center justify-between rounded-lg border px-3 text-sm font-semibold sm:col-span-2 ${isScrolling ? 'border-line bg-paper text-ink' : 'border-white/15 bg-white/5 text-canvas'}`}
        >
          <span>{locale === 'en' ? 'Tiếng Việt' : 'English'}</span>
          <span aria-hidden="true">{locale === 'en' ? 'VI' : 'EN'}</span>
        </Link>
      </nav>
    </header>
  );
};
