import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, loadMessages, loadProjects } from '@/content/load';
import { getProjectBySlug } from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { ArrowLeft, ExternalLink, Github, Layers, ShieldCheck, Terminal } from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const projects = loadProjects();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of ['en', 'vi']) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return { title: locale === 'vi' ? 'Không tìm thấy dự án' : 'Project not found', robots: { index: false } };
  }

  return buildLocalizedMetadata({
    locale,
    path: `/work/${slug}`,
    title: project.localizedContent.seoTitle,
    description: project.localizedContent.seoDescription,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  const allProjects = loadProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="space-y-12 py-3 sm:space-y-16 sm:py-6">
      {/* Back Button */}
      <div>
        <Link
          href={`/${locale}/work`}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale === 'en' ? 'Back to All Projects' : 'Quay lại danh sách dự án'}</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="space-y-8 border-b border-line/60 pb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mono-label text-xs px-3 py-1 rounded bg-graphite text-signal font-bold">
            {project.roles.primary} ROLE
          </span>
          {project.roles.secondary.map((sec) => (
            <span key={sec} className="mono-label text-xs px-2.5 py-1 rounded border border-line text-muted">
              {sec}
            </span>
          ))}
          <span className="mono-label w-full text-xs text-muted sm:ml-auto sm:w-auto">
            {project.yearStart} {project.yearEnd ? `– ${project.yearEnd}` : ''} • STAGE: {project.stage.toUpperCase()}
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
          {project.localizedContent.title}
        </h1>

        <p className="max-w-4xl text-lg font-light leading-relaxed text-muted sm:text-xl">
          {project.localizedContent.summary}
        </p>

        {/* Metadata Summary Box */}
        <div className="grid grid-cols-1 gap-5 rounded-xl border border-line/60 bg-paper p-4 font-mono text-xs sm:p-6 md:grid-cols-3 md:gap-6">
          <div className="space-y-1">
            <span className="text-muted block text-[10px] uppercase">My Contribution</span>
            <span className="text-ink font-sans text-sm block font-medium">
              {project.localizedContent.contribution}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-muted block text-[10px] uppercase">Tech Stack</span>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-canvas border border-line/40 text-muted">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-muted block text-[10px] uppercase">Team & Artifacts</span>
            <div className="text-ink text-sm font-sans">
              {project.team.type === 'solo' ? 'Solo Lead' : `Team of ${project.team.size}`}
            </div>
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-ink hover:underline pt-1 font-mono"
              >
                {link.label[locale] || link.label.en}
                <ExternalLink className="w-3 h-3 text-muted" />
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Metrics Banner */}
      {project.metrics.length > 0 && (
        <section className="space-y-6 rounded-2xl bg-graphite p-5 text-canvas sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-canvas/20 pb-4">
            <span className="mono-label text-xs text-signal">SYSTEM IMPACT & MEASURED METRICS</span>
            <ShieldCheck className="w-5 h-5 text-signal" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-display font-bold text-3xl sm:text-4xl text-signal">
                  {m.value}
                </div>
                <div className="text-xs font-mono text-canvas/80">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Study Story Blocks */}
      <section className="space-y-12 max-w-4xl">
        {project.caseStudyLocalized.map((block) => (
          <div
            key={block.id}
            className={`space-y-4 rounded-2xl border p-5 sm:p-8 ${
              block.type === 'decision'
                ? 'border-signal bg-paper/90 shadow-sm'
                : block.type === 'architecture'
                ? 'border-line/60 bg-canvas'
                : 'border-line/60 bg-paper'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-graphite" />
              <span className="mono-label text-xs text-muted uppercase">
                // {block.type.toUpperCase()}
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold text-ink">
              {block.heading}
            </h2>

            <p className="text-base text-muted leading-relaxed font-sans">
              {block.body}
            </p>
          </div>
        ))}
      </section>

      {/* Next Case Study Navigation */}
      <footer className="flex flex-col items-start gap-6 border-t border-line/60 pt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-12">
        <div className="min-w-0">
          <span className="mono-label text-xs text-muted block">Up Next</span>
          <Link
            href={`/${locale}/work/${nextProject.slug}`}
            className="font-display text-xl font-bold text-ink hover:underline sm:text-2xl"
          >
            {nextProject.localized[locale]?.title || nextProject.localized.en.title} →
          </Link>
        </div>
        <Link
          href={`/${locale}/work`}
          className="flex min-h-11 items-center rounded border border-line px-4 py-2 text-xs font-mono font-semibold hover:border-ink"
        >
          View All Projects
        </Link>
      </footer>
    </article>
  );
}
