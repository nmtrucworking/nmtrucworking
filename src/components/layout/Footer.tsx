'use client';

import React from 'react';
import Link from 'next/link';
import { Locale, loadMessages, loadProfile, loadSiteConfig } from '@/content/load';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const messages = loadMessages(locale);
  const profile = loadProfile();
  const site = loadSiteConfig();

  return (
    <footer className="w-full border-t border-line/60 bg-paper py-16 text-ink">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Availability & Identity */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-graphite text-canvas text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse-slow" />
              <span>{profile.availability.label[locale]}</span>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {profile.positioning[locale]}
            </h3>
          </div>
          <p className="text-sm text-muted">
            {profile.location[locale]} — {profile.descriptor}
          </p>
        </div>

        {/* Quick Links & Socials */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="mono-label text-xs font-semibold text-muted">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {site.navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-ink hover:text-muted flex items-center gap-1 transition-colors"
                >
                  {messages.nav[item.id as keyof typeof messages.nav] || item.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="mono-label text-xs font-semibold text-muted">Direct Contact</h4>
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-2 font-mono text-ink hover:underline"
            >
              <Mail className="w-4 h-4 text-muted" />
              {profile.contact.email}
            </a>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-line bg-canvas hover:border-ink transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-line bg-canvas hover:border-ink transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-line/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
        <div>
          © {new Date().getFullYear()} JIN. {messages.footer.rights}
        </div>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/privacy`} className="hover:text-ink transition-colors">
            {messages.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};
