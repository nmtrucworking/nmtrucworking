'use client';

import React from 'react';
import Link from 'next/link';
import { Locale, loadMessages, loadProfile, loadSiteConfig } from '@/content/load';
import { Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const messages = loadMessages(locale);
  const profile = loadProfile();
  const site = loadSiteConfig();

  return (
    <footer className="w-full border-t border-white/10 bg-ink py-12 text-canvas sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-12 md:gap-12 lg:px-8">
        {/* Availability & Identity */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <img
              src="/brand/01-truc-wordmark-dark.svg"
              width="122"
              height="32"
              alt="TRÚC."
              className="h-auto w-[7.6rem]"
            />
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-canvas">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse-slow" />
              <span>{profile.availability.label[locale]}</span>
            </div>
            <h3 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-canvas">
              {profile.positioning[locale]}
            </h3>
          </div>
          <p className="text-sm text-canvas/55">
            {profile.location[locale]} — {profile.descriptor}
          </p>
        </div>

        {/* Quick Links & Socials */}
        <div className="sm:col-span-1 md:col-span-3 space-y-4">
          <h4 className="mono-label text-xs font-semibold text-signal">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {site.navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="flex items-center gap-1 text-canvas/70 transition-colors hover:text-canvas"
                >
                  {messages.nav[item.id as keyof typeof messages.nav] || item.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 sm:col-span-1 md:col-span-3 space-y-4">
          <h4 className="mono-label text-xs font-semibold text-signal">Direct Contact</h4>
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex min-h-11 min-w-0 items-center gap-2 break-all text-canvas/75 hover:text-canvas hover:underline"
            >
              <Mail className="h-4 w-4 text-signal" />
              {profile.contact.email}
            </a>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/15 bg-white/5 p-2 transition-colors hover:border-signal"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/15 bg-white/5 p-2 transition-colors hover:border-signal"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 px-4 pt-6 text-xs text-canvas/45 sm:mt-12 sm:flex-row sm:items-center sm:px-6 sm:pt-8 lg:px-8">
        <div>
          © {new Date().getFullYear()} NGUYỄN MINH TRÚC. {messages.footer.rights}
        </div>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/privacy`} className="transition-colors hover:text-canvas">
            {messages.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};
