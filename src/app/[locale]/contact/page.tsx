'use client';

import React, { use, useState } from 'react';
import { Locale, loadMessages, loadProfile } from '@/content/load';
import { Mail, Github, Linkedin, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = use(params);
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = loadProfile();

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <div className="space-y-16 py-6">
      {/* Title */}
      <div className="space-y-4 border-b border-line/60 pb-8">
        <span className="mono-label text-xs text-muted">Direct Channel</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          {messages.contact.title}
        </h1>
        <p className="text-xl text-muted max-w-3xl leading-relaxed font-light">
          {messages.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Direct Channels Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl border border-line/60 bg-paper space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite text-canvas text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse-slow" />
              <span>{profile.availability.label[locale]}</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="mono-label text-xs text-muted">{messages.contact.emailLabel}</span>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-lg font-mono font-bold text-ink hover:underline block"
                >
                  {profile.contact.email}
                </a>
              </div>

              <div className="space-y-1 pt-2">
                <span className="mono-label text-xs text-muted">Location</span>
                <p className="text-sm font-sans text-ink">
                  {profile.location[locale]}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-line/40">
                <span className="mono-label text-xs text-muted block">Online Profiles</span>
                <div className="flex gap-4">
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-canvas hover:border-ink font-mono text-xs font-semibold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-canvas hover:border-ink font-mono text-xs font-semibold transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl border border-line/60 bg-paper space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">
              {messages.contact.formHeading}
            </h2>

            {status === 'success' && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-success text-sm flex items-center gap-3 font-mono">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{messages.contact.success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="mono-label text-xs text-muted font-semibold block">
                  {messages.contact.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-lg border border-line bg-canvas text-sm font-sans focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="mono-label text-xs text-muted font-semibold block">
                  {messages.contact.email}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-line bg-canvas text-sm font-sans focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="mono-label text-xs text-muted font-semibold block">
                  {messages.contact.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, system architecture requirements, or role opportunities..."
                  className="w-full px-4 py-3 rounded-lg border border-line bg-canvas text-sm font-sans focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-lg bg-ink text-canvas font-semibold text-sm hover:bg-graphite transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-signal" />
                <span>{status === 'submitting' ? 'Sending...' : messages.contact.send}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
