'use client';

import React, { use, useState } from 'react';
import { Locale, loadMessages, loadProfile } from '@/content/load';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = use(params);
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = loadProfile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) return;

    const mailSubject = `[Portfolio] ${subject}`;
    const mailBody =
      locale === 'vi'
        ? [
            'Chào Trúc,',
            '',
            `Tôi là ${name}.`,
            `Email liên hệ: ${email}`,
            '',
            `Tôi liên hệ về: ${subject}`,
            '',
            message,
            '',
            'Trân trọng,',
            name,
          ].join('\n')
        : [
            'Hello Trúc,',
            '',
            `My name is ${name}.`,
            `Contact email: ${email}`,
            '',
            `I am reaching out regarding: ${subject}`,
            '',
            message,
            '',
            'Best regards,',
            name,
          ].join('\n');

    const mailtoUrl = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <div className="space-y-12 py-3 sm:space-y-16 sm:py-6">
      {/* Title */}
      <div className="space-y-4 border-b border-line/60 pb-8">
        <span className="mono-label text-xs text-muted">Direct Channel</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {messages.contact.title}
        </h1>
        <p className="max-w-3xl text-lg font-light leading-relaxed text-muted sm:text-xl">
          {messages.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
        {/* Direct Channels Column */}
        <div className="space-y-8 lg:col-span-5">
          <div className="min-w-0 space-y-6 rounded-2xl border border-line/60 bg-paper p-5 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-graphite px-3 py-1 font-mono text-xs text-canvas">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse-slow" />
              <span>{profile.availability.label[locale]}</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="mono-label text-xs text-muted">
                  {messages.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="group flex items-center gap-2 break-all font-mono text-base font-bold text-ink hover:underline sm:text-lg"
                >
                  <span>{profile.contact.email}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="space-y-1 pt-2">
                <span className="mono-label text-xs text-muted">Location</span>
                <p className="font-sans text-sm text-ink">{profile.location[locale]}</p>
              </div>

              <div className="space-y-3 border-t border-line/40 pt-4">
                <span className="mono-label block text-xs text-muted">Online Profiles</span>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-line bg-canvas px-4 py-2 font-mono text-xs font-semibold transition-colors hover:border-ink"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-line bg-canvas px-4 py-2 font-mono text-xs font-semibold transition-colors hover:border-ink"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* External Mail Composer */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line/60 bg-paper">
            <div className="flex items-start justify-between gap-4 border-b border-line/50 p-5 sm:p-8">
              <div className="space-y-2">
                <span className="mono-label text-xs text-muted">
                  {messages.contact.formEyebrow}
                </span>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {messages.contact.formHeading}
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  {messages.contact.formDescription}
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas">
                <Mail className="h-5 w-5 text-ink" />
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-8">
              <div className="rounded-xl border border-line/60 bg-canvas/60 px-4 py-3.5">
                <div className="grid grid-cols-[72px_1fr] items-center gap-3 text-sm">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                    {messages.contact.recipientLabel}
                  </span>
                  <span className="break-all font-mono font-semibold text-ink">
                    {profile.contact.email}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="mono-label block text-xs font-semibold text-muted"
                    >
                      {messages.contact.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={messages.contact.namePlaceholder}
                      className="w-full rounded-lg border border-line bg-canvas px-4 py-3 font-sans text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="mono-label block text-xs font-semibold text-muted"
                    >
                      {messages.contact.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={messages.contact.emailPlaceholder}
                      className="w-full rounded-lg border border-line bg-canvas px-4 py-3 font-sans text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="mono-label block text-xs font-semibold text-muted"
                  >
                    {messages.contact.subject}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    maxLength={120}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={messages.contact.subjectPlaceholder}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-3 font-sans text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="mono-label block text-xs font-semibold text-muted"
                  >
                    {messages.contact.message}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={7}
                    maxLength={1200}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={messages.contact.messagePlaceholder}
                    className="w-full resize-y rounded-lg border border-line bg-canvas px-4 py-3 font-sans text-sm leading-relaxed text-ink transition-colors placeholder:text-muted/60 focus:border-ink focus:outline-none"
                  />
                  <div className="flex justify-end font-mono text-[11px] text-muted">
                    {formData.message.length}/1200
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-line/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex max-w-md items-start gap-2.5 text-xs leading-relaxed text-muted">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    <span>{messages.contact.mailHint}</span>
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-canvas transition-all hover:bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    <span>{messages.contact.send}</span>
                    <ExternalLink className="h-4 w-4 text-signal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
