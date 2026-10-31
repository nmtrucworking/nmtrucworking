import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, loadJourneyItems, loadMessages } from '@/content/load';
import { getJourneyItemBySlug, getJourneyItems } from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { MediaGallery, MediaItemFrame } from '@/components/media/MediaGallery';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FolderGit2,
  Award,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface ActivityDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const items = loadJourneyItems();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of ['en', 'vi']) {
    for (const item of items) {
      if (item.visibility === 'public') {
        params.push({ locale, slug: item.slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ActivityDetailPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const item = getJourneyItemBySlug(slug, locale);

  if (!item) {
    return {
      title: locale === 'vi' ? 'Không tìm thấy hoạt động' : 'Activity not found',
      robots: { index: false },
    };
  }

  return buildLocalizedMetadata({
    locale,
    path: `/journey/${slug}`,
    title: `${item.titleText} — Nguyễn Minh Trúc`,
    description: item.summaryText,
  });
}

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const item = getJourneyItemBySlug(slug, locale);

  if (!item) {
    notFound();
  }

  const allItems = getJourneyItems(locale);
  const currentIdx = allItems.findIndex((i) => i.slug === slug);
  const nextItem = allItems[(currentIdx + 1) % allItems.length];

  return (
    <article className="space-y-8 py-2 sm:space-y-12 sm:py-4">
      {/* Back Link */}
      <div>
        <Link
          href={`/${locale}/journey`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{messages.journey.backToJourney}</span>
        </Link>
      </div>

      {/* Activity Header & Cover Image */}
      <header className="space-y-5 border-b border-line/60 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-ink px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-canvas">
            {messages.journey.categories[item.category]}
          </span>
          <span className="rounded border border-line bg-paper px-2 py-0.5 font-mono text-[10px] text-ink">
            {messages.rolesAffiliations.roleTypes[item.roleType]}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted sm:ml-auto">
            <Calendar className="h-3.5 w-3.5 text-muted" />
            <span>{item.dateDisplayText}</span>
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
            {item.titleText}
          </h1>
          <p className="font-mono text-xs font-medium text-muted">
            <strong className="text-ink">{item.roleText}</strong> · {item.organizationText}
          </p>
        </div>

        <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {item.summaryText}
        </p>

        {/* Cover Image */}
        <MediaItemFrame
          asset={item.coverAsset}
          locale={locale}
          fallbackTitle={item.titleText}
        />
      </header>

      {/* Source-Verified Metrics Banner (only rendered when verified metrics exist) */}
      {item.verifiedMetricsLocalized.length > 0 && (
        <section className="space-y-4 rounded-xl bg-graphite p-4 text-canvas sm:p-6">
          <div className="flex items-center justify-between border-b border-canvas/15 pb-2.5">
            <span className="mono-label text-[10px] text-canvas/70">
              // {messages.journey.metricsHeading}
            </span>
            <ShieldCheck className="h-4 w-4 text-signal" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {item.verifiedMetricsLocalized.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="font-display text-xl font-bold text-canvas sm:text-2xl">
                  {m.value}
                </div>
                <div className="font-mono text-xs font-semibold text-canvas/90">
                  {m.labelText}
                </div>
                <div className="text-[11px] text-canvas/55">{m.sourceNoteText}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2-Column Editorial Detail Layout */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Main Content Column */}
        <div className="min-w-0 space-y-6 lg:col-span-8">
          {/* 01. Overview */}
          <section className="space-y-2.5 rounded-xl border border-line/60 bg-paper p-4 sm:p-6">
            <span className="mono-label text-[10px] text-muted">
              // 01. {messages.journey.overviewHeading}
            </span>
            <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
              {messages.journey.overviewHeading}
            </h2>
            <p className="text-xs leading-relaxed text-muted sm:text-sm">
              {item.overviewText}
            </p>
          </section>

          {/* 02. Personal Role */}
          <section className="space-y-2.5 rounded-xl border border-line bg-paper p-4 shadow-sm sm:p-6">
            <span className="mono-label text-[10px] text-muted">
              // 02. {messages.journey.personalRoleHeading}
            </span>
            <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
              {item.roleText}
            </h2>
            <p className="text-xs leading-relaxed text-ink sm:text-sm">
              {item.personalRoleDetailText}
            </p>
          </section>

          {/* 03. Executed Work */}
          {item.executedWorkLocalized.length > 0 && (
            <section className="space-y-3 rounded-xl border border-line/60 bg-paper p-4 sm:p-6">
              <span className="mono-label text-[10px] text-muted">
                // 03. {messages.journey.executedWorkHeading}
              </span>
              <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
                {messages.journey.executedWorkHeading}
              </h2>
              <ul className="space-y-2">
                {item.executedWorkLocalized.map((work, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-line/60 bg-canvas/60 p-3 text-xs leading-relaxed text-ink sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 04. Verified Outcomes & Impact */}
          {item.outcomesAndImpactLocalized.length > 0 && (
            <section className="space-y-3 rounded-xl border border-line/60 bg-paper p-4 sm:p-6">
              <span className="mono-label text-[10px] text-muted">
                // 04. {messages.journey.outcomesHeading}
              </span>
              <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
                {messages.journey.outcomesHeading}
              </h2>
              <ul className="space-y-2">
                {item.outcomesAndImpactLocalized.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-line/60 bg-canvas/60 p-3 text-xs leading-relaxed text-ink sm:text-sm"
                  >
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 05. Image Gallery */}
          {item.galleryAssets.length > 0 && (
            <section className="space-y-3">
              <span className="mono-label text-[10px] text-muted">
                // 05. {messages.journey.galleryHeading}
              </span>
              <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
                {messages.journey.galleryHeading}
              </h2>
              <MediaGallery
                assets={item.galleryAssets}
                locale={locale}
                title={item.titleText}
                mode={item.galleryAssets.length > 1 ? 'carousel' : 'grid'}
              />
            </section>
          )}
        </div>

        {/* Right Sidebar: Related Roles, Projects, Awards & Evidence Links */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
          {/* Related Roles */}
          {item.relatedRolesLocalized.length > 0 && (
            <div className="space-y-2.5 rounded-xl border border-line/60 bg-paper p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-line/40 pb-2">
                <span className="mono-label text-[10px] font-bold text-muted">
                  {messages.journey.relatedRolesHeading}
                </span>
                <Users className="h-3.5 w-3.5 text-muted" />
              </div>
              <div className="space-y-2">
                {item.relatedRolesLocalized.map((role) => (
                  <Link
                    key={role.id}
                    href={`/${locale}/journey#roles`}
                    className="block rounded-lg border border-line/70 bg-canvas p-2.5 transition-colors hover:border-ink/40"
                  >
                    <span className="mono-label block text-[10px] font-bold text-muted">
                      {role.organizationShort}
                    </span>
                    <div className="font-display text-xs font-bold text-ink">
                      {role.titleText}
                    </div>
                    <div className="text-[11px] text-muted">{role.organizationText}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {item.relatedProjectsLocalized.length > 0 && (
            <div className="space-y-2.5 rounded-xl border border-line/60 bg-paper p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-line/40 pb-2">
                <span className="mono-label text-[10px] font-bold text-muted">
                  {messages.journey.relatedProjectsHeading}
                </span>
                <FolderGit2 className="h-3.5 w-3.5 text-muted" />
              </div>
              <div className="space-y-2">
                {item.relatedProjectsLocalized.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/${locale}/work/${proj.slug}`}
                    className="group flex items-center justify-between gap-2.5 rounded-lg border border-line/70 bg-canvas p-2.5 transition-colors hover:border-ink/40"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-display text-xs font-bold text-ink">
                        {proj.title}
                      </div>
                      <span className="font-mono text-[10px] uppercase text-muted">
                        {proj.primaryRole} · {proj.stage}
                      </span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-ink" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Awards / Recognitions */}
          {item.relatedAwardsLocalized.length > 0 && (
            <div className="space-y-2.5 rounded-xl border border-line/60 bg-paper p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-line/40 pb-2">
                <span className="mono-label text-[10px] font-bold text-muted">
                  {messages.journey.relatedAwardsHeading}
                </span>
                <Award className="h-3.5 w-3.5 text-muted" />
              </div>
              <div className="space-y-2">
                {item.relatedAwardsLocalized.map((aw) => (
                  <Link
                    key={aw.id}
                    href={`/${locale}/journey#awards`}
                    className="block rounded-lg border border-line/70 bg-canvas p-2.5 transition-colors hover:border-ink/40"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase text-muted">
                      {messages.awards.types[aw.awardType]} · {aw.awardDate}
                    </span>
                    <div className="font-display text-xs font-bold text-ink">
                      {aw.titleText}
                    </div>
                    <div className="text-[11px] text-muted">{aw.organizerText}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Evidence & Reference Links */}
          {item.evidenceLinksLocalized.length > 0 && (
            <div className="space-y-2.5 rounded-xl border border-line/60 bg-paper p-4 shadow-sm">
              <div className="border-b border-line/40 pb-2">
                <span className="mono-label text-[10px] font-bold text-muted">
                  {messages.journey.evidenceLinksHeading}
                </span>
              </div>
              <div className="space-y-1.5">
                {item.evidenceLinksLocalized.map((link, i) =>
                  link.url.startsWith('/') ? (
                    <Link
                      key={i}
                      href={`/${locale}${link.url}`}
                      className="flex items-center justify-between rounded-lg border border-line px-2.5 py-1.5 font-mono text-[11px] font-medium text-ink hover:border-ink/40 hover:bg-canvas"
                    >
                      <span>{link.labelText}</span>
                      <ArrowUpRight className="h-3 w-3 text-muted" />
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-line px-2.5 py-1.5 font-mono text-[11px] font-medium text-ink hover:border-ink/40 hover:bg-canvas"
                    >
                      <span>{link.labelText}</span>
                      <ExternalLink className="h-3 w-3 text-muted" />
                    </a>
                  )
                )}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Next Milestone Footer */}
      {nextItem && nextItem.slug !== item.slug && (
        <footer className="flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-8 sm:flex-row sm:items-center">
          <div>
            <span className="mono-label block text-[10px] text-muted">
              {locale === 'vi' ? 'Hoạt động tiếp theo' : 'Next Journey Milestone'}
            </span>
            <Link
              href={`/${locale}/journey/${nextItem.slug}`}
              className="font-display text-base font-bold text-ink hover:underline sm:text-lg"
            >
              {nextItem.titleText} →
            </Link>
          </div>

          <Link
            href={`/${locale}/journey`}
            className="inline-flex min-h-9 items-center rounded-lg border border-line px-3.5 py-1.5 font-mono text-xs font-semibold text-ink hover:border-ink"
          >
            {messages.journey.backToJourney}
          </Link>
        </footer>
      )}
    </article>
  );
}
