import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, loadMessages, loadProjects } from '@/content/load';
import { getProjectBySlug } from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { ArrowLeft, ExternalLink, Layers, ShieldCheck } from 'lucide-react';
import { ProjectMedia } from '@/components/projects/ProjectMedia';
import { DiagramViewer } from '@/components/projects/DiagramViewer';

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

  const diagramAsset = project.assets.find(
    (a) => a.purpose === 'diagram' || a.type === 'diagram'
  );
  const additionalAssets = project.assets.filter(
    (a) => a.id !== project.heroAsset?.id && a.id !== diagramAsset?.id
  );
  const hasArchitectureBlock = project.caseStudyLocalized.some(
    (b) => b.type === 'architecture'
  );

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

        <ProjectMedia
          asset={project.heroAsset}
          projectTitle={project.localizedContent.title}
          projectSlug={project.slug}
          role={project.roles.primary}
          locale={locale}
          variant="hero"
        />

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

      {/* 2-Column Editorial Grid: Main Case Study Narrative + Sticky Sidebar */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Left Column: Story Blocks & Architecture Diagram */}
        <div className="lg:col-span-8 space-y-10 min-w-0">
          {project.caseStudyLocalized.map((block, idx) => (
            <section
              key={block.id}
              id={block.id}
              className={`scroll-mt-24 space-y-4 rounded-2xl border p-5 sm:p-8 transition-all ${
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
                  // 0{idx + 1}. {block.type.toUpperCase()}
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {block.heading}
              </h2>

              <p className="text-base text-muted leading-relaxed font-sans sm:text-lg">
                {block.body}
              </p>

              {/* Architecture Diagram Blueprint Embedding */}
              {block.type === 'architecture' && diagramAsset && (
                <div className="pt-2">
                  <DiagramViewer
                    asset={diagramAsset}
                    locale={locale}
                    projectTitle={project.localizedContent.title}
                  />
                </div>
              )}
            </section>
          ))}

          {/* Fallback Architecture Diagram Section if not attached to a block */}
          {!hasArchitectureBlock && diagramAsset && (
            <section id="architecture-blueprint" className="scroll-mt-24 space-y-4 rounded-2xl border border-line/60 bg-canvas p-5 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span className="mono-label text-xs text-muted uppercase">
                  // ARCHITECTURE & SYSTEM BLUEPRINT
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {locale === 'vi' ? 'Sơ đồ Kiến trúc & Thiết kế Hệ thống' : 'System Architecture & Technical Blueprint'}
              </h2>
              <DiagramViewer
                asset={diagramAsset}
                locale={locale}
                projectTitle={project.localizedContent.title}
              />
            </section>
          )}

          {/* Additional Project Artifacts & Gallery */}
          {additionalAssets.length > 0 && (
            <section className="space-y-6 pt-4">
              <h2 className="font-display text-2xl font-bold text-ink">
                {locale === 'vi' ? 'Tài liệu & Hình ảnh Minh họa' : 'Artifacts & Project Gallery'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {additionalAssets.map((asset) => (
                  <ProjectMedia
                    key={asset.id}
                    asset={asset}
                    projectTitle={project.localizedContent.title}
                    projectSlug={project.slug}
                    role={project.roles.primary}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Navigation & System Context Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Box 1: Table of Contents / Quick Jump */}
          <div className="rounded-xl border border-line/60 bg-paper p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-line/40 pb-2">
              <span className="mono-label text-[11px] font-bold text-muted">
                {locale === 'vi' ? 'MỤC LỤC TÌNH HUỐNG' : 'CASE STUDY CONTENTS'}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            </div>
            <nav className="space-y-1 font-mono text-xs">
              {project.caseStudyLocalized.map((block, idx) => (
                <a
                  key={block.id}
                  href={`#${block.id}`}
                  className="group flex items-center justify-between py-1.5 px-2 rounded-lg text-muted hover:bg-canvas hover:text-ink transition-colors"
                >
                  <span className="truncate pr-2">
                    0{idx + 1}. {block.heading}
                  </span>
                  <span className="text-[10px] text-muted/60 uppercase group-hover:text-signal transition-colors shrink-0">
                    {block.type}
                  </span>
                </a>
              ))}
              {diagramAsset && (
                <a
                  href={hasArchitectureBlock ? '#architecture' : '#architecture-blueprint'}
                  className="group flex items-center justify-between py-1.5 px-2 rounded-lg text-signal font-semibold bg-signal/10 hover:bg-signal/15 transition-colors mt-2"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3 w-3" />
                    <span>{locale === 'vi' ? 'Xem sơ đồ kiến trúc' : 'View Blueprint Diagram'}</span>
                  </span>
                  <span className="text-[10px] font-mono">↓</span>
                </a>
              )}
            </nav>
          </div>

          {/* Box 2: System Spec & Project Parameters */}
          <div className="rounded-xl border border-line/60 bg-paper p-5 space-y-4 shadow-sm font-mono text-xs">
            <div className="border-b border-line/40 pb-2">
              <span className="mono-label text-[11px] font-bold text-muted">
                {locale === 'vi' ? 'THÔNG SỐ HỆ THỐNG' : 'SYSTEM PARAMETERS'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-muted block text-[10px] uppercase">Primary Role</span>
                <span className="font-sans font-semibold text-ink text-sm">
                  {project.roles.primary} ({project.roles.secondary.join(', ')})
                </span>
              </div>

              <div>
                <span className="text-muted block text-[10px] uppercase">Stage & Lifecycle</span>
                <span className="text-ink font-semibold">
                  {project.stage.toUpperCase()} ({project.yearStart} {project.yearEnd ? `– ${project.yearEnd}` : ''})
                </span>
              </div>

              <div>
                <span className="text-muted block text-[10px] uppercase">Domain Scope</span>
                <div className="flex flex-wrap gap-1 pt-1 font-sans">
                  {project.domains.map((d) => (
                    <span key={d} className="rounded bg-canvas px-2 py-0.5 text-[11px] border border-line/50 text-muted">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-muted block text-[10px] uppercase">Core Capabilities</span>
                <div className="flex flex-wrap gap-1 pt-1 font-sans">
                  {project.capabilities.map((c) => (
                    <span key={c} className="rounded bg-graphite text-canvas px-2 py-0.5 text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Live Verification & Links */}
          {project.links.length > 0 && (
            <div className="rounded-xl border border-line/60 bg-paper p-5 space-y-3 shadow-sm">
              <div className="border-b border-line/40 pb-2">
                <span className="mono-label text-[11px] font-bold text-muted">
                  {locale === 'vi' ? 'TRUY CẬP TRỰC TIẾP' : 'LIVE VERIFICATION'}
                </span>
              </div>
              <div className="space-y-2">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-xs font-mono font-medium text-ink hover:border-signal hover:bg-canvas transition-colors"
                  >
                    <span>{link.label[locale] || link.label.en}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-signal" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

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
