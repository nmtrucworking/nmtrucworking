'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  FolderGit2,
  Award,
  Users,
  GraduationCap,
  Sparkles,
  Flag,
  Compass,
} from 'lucide-react';
import type { JourneyCategory, Locale } from '@/content/load';
import type { getJourneyItems } from '@/content/selectors';
import { MediaItemFrame } from '@/components/media/MediaGallery';

type LocalizedJourneyItem = ReturnType<typeof getJourneyItems>[number];

interface JourneyTimelineProps {
  locale: Locale;
  items: LocalizedJourneyItem[];
  messages: any;
  sectionNumber?: string;
}

const categoryIcons: Record<JourneyCategory, React.ElementType> = {
  academic: GraduationCap,
  organizations: Users,
  events: Sparkles,
  leadership: Compass,
  milestones: Flag,
};

export function JourneyTimeline({
  locale,
  items,
  messages,
  sectionNumber = '02',
}: JourneyTimelineProps) {
  const [selectedYear, setSelectedYear] = useState<'all' | number>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | JourneyCategory>('all');

  const years = Array.from(new Set(items.map((i) => i.year))).sort((a, b) => b - a);
  const categories: ('all' | JourneyCategory)[] = [
    'all',
    'leadership',
    'organizations',
    'events',
    'academic',
    'milestones',
  ];

  const filteredItems = items.filter((item) => {
    if (selectedYear !== 'all' && item.year !== selectedYear) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const groupedYears = Array.from(new Set(filteredItems.map((i) => i.year))).sort(
    (a, b) => b - a
  );

  return (
    <section id="timeline" className="scroll-mt-20 space-y-5">
      {/* Header */}
      <div className="space-y-1 border-b border-line pb-4">
        <span className="mono-label text-[11px] text-muted">
          {sectionNumber} // {messages.journey.eyebrow}
        </span>
        <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
          {messages.journey.title}
        </h2>
        <p className="max-w-3xl text-xs leading-relaxed text-muted sm:text-sm">
          {messages.journey.subtitle}
        </p>
      </div>

      {/* Compact Filters */}
      <div className="space-y-3 rounded-xl border border-line bg-paper p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mono-label mr-1 text-[10px] font-semibold text-muted">
              {messages.journey.filterYear}:
            </span>
            <button
              type="button"
              onClick={() => setSelectedYear('all')}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-all ${
                selectedYear === 'all'
                  ? 'bg-ink font-semibold text-canvas'
                  : 'border border-line bg-canvas text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {messages.journey.allYears}
            </button>
            {years.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-all ${
                  selectedYear === yr
                    ? 'bg-ink font-semibold text-canvas'
                    : 'border border-line bg-canvas text-muted hover:border-ink/40 hover:text-ink'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          <span className="font-mono text-[11px] text-muted">
            {filteredItems.length}{' '}
            {locale === 'vi' ? 'mục' : filteredItems.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-line/60 pt-2.5">
          <span className="mono-label mr-1 text-[10px] font-semibold text-muted">
            {messages.journey.filterCategory}:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = messages.journey.categories[cat] || cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded px-2 py-0.5 font-mono text-[11px] transition-all ${
                  isActive
                    ? 'bg-graphite font-semibold text-canvas'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="space-y-8">
        {groupedYears.map((year) => {
          const yearItems = filteredItems.filter((item) => item.year === year);

          return (
            <div
              key={year}
              className="grid grid-cols-1 gap-4 lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-6"
            >
              {/* Sticky Year Pill */}
              <div className="lg:sticky lg:top-20 lg:self-start">
                <div className="inline-flex items-baseline gap-2 rounded-lg border border-line bg-paper px-3 py-2 lg:flex lg:flex-col lg:gap-0">
                  <span className="font-display text-xl font-bold text-ink">{year}</span>
                  <span className="font-mono text-[10px] text-muted">
                    {yearItems.length}{' '}
                    {locale === 'vi' ? 'dấu mốc' : yearItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              {/* Timeline Spine & Cards */}
              <div className="relative space-y-4 border-l border-line pl-4 sm:pl-6">
                {yearItems.map((item) => {
                  const CategoryIcon = categoryIcons[item.category] || Compass;
                  const hasVerifiedCover = Boolean(
                    item.coverAsset && item.coverAsset.src && item.coverAsset.status === 'verified'
                  );

                  return (
                    <article
                      key={item.id}
                      className="group relative rounded-xl border border-line bg-paper p-4 transition-all duration-200 hover:border-ink/40 hover:shadow-sm sm:p-5"
                    >
                      {/* Subtle Timeline Node Dot */}
                      <span
                        className="absolute -left-[1.32rem] top-5 hidden h-2.5 w-2.5 rounded-full border-2 border-paper bg-ink sm:block sm:-left-[1.82rem]"
                        aria-hidden="true"
                      />

                      <div
                        className={`grid grid-cols-1 gap-4 ${
                          hasVerifiedCover ? 'lg:grid-cols-12' : ''
                        }`}
                      >
                        <div
                          className={`flex flex-col justify-between space-y-3 ${
                            hasVerifiedCover ? 'lg:col-span-8' : ''
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Meta Badges */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 rounded bg-graphite px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-canvas">
                                <CategoryIcon className="h-3 w-3" />
                                <span>{messages.journey.categories[item.category]}</span>
                              </span>

                              <span className="inline-flex items-center gap-1 rounded border border-line bg-canvas px-2 py-0.5 font-mono text-[10px] text-muted">
                                <Calendar className="h-3 w-3" />
                                <span>{item.dateDisplayText}</span>
                              </span>

                              {item.isCurrent && (
                                <span className="rounded-full border border-[#157A48]/25 bg-[#157A48]/10 px-2 py-0.5 font-mono text-[10px] font-medium text-[#157A48]">
                                  {messages.rolesAffiliations.statusCurrent}
                                </span>
                              )}
                            </div>

                            {/* Title & Role */}
                            <div className="space-y-0.5">
                              <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                                <Link
                                  href={`/${locale}/journey/${item.slug}`}
                                  className="hover:underline"
                                >
                                  {item.titleText}
                                </Link>
                              </h3>
                              <p className="text-xs text-muted">
                                <strong className="font-semibold text-ink/85">
                                  {item.roleText}
                                </strong>{' '}
                                · {item.organizationText}
                              </p>
                            </div>

                            {/* Summary */}
                            <p className="text-xs leading-relaxed text-muted sm:text-sm">
                              {item.summaryText}
                            </p>

                            {/* Outcomes */}
                            {item.outcomesAndImpactLocalized.length > 0 && (
                              <ul className="space-y-1 pt-0.5 text-xs text-ink/90">
                                {item.outcomesAndImpactLocalized.map((outcome, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          {/* Footer Tags & Links */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {item.relatedProjectsLocalized.map((proj) => (
                                <Link
                                  key={proj.id}
                                  href={`/${locale}/work/${proj.slug}`}
                                  className="inline-flex items-center gap-1 rounded border border-line bg-canvas px-2 py-0.5 font-mono text-[10px] font-medium text-ink hover:border-ink"
                                >
                                  <FolderGit2 className="h-3 w-3 text-muted" />
                                  <span>{proj.slug}</span>
                                </Link>
                              ))}

                              {item.relatedAwardsLocalized.map((aw) => (
                                <a
                                  key={aw.id}
                                  href="#awards"
                                  className="inline-flex items-center gap-1 rounded border border-line bg-canvas px-2 py-0.5 font-mono text-[10px] font-medium text-ink hover:border-ink"
                                >
                                  <Award className="h-3 w-3 text-muted" />
                                  <span className="max-w-[10rem] truncate">{aw.titleText}</span>
                                </a>
                              ))}

                              {item.evidenceLinksLocalized.map((link, i) =>
                                link.url.startsWith('/') ? (
                                  <Link
                                    key={i}
                                    href={`/${locale}${link.url}`}
                                    className="inline-flex items-center gap-1 font-mono text-[10px] text-muted hover:text-ink"
                                  >
                                    <span>{link.labelText}</span>
                                    <ArrowUpRight className="h-3 w-3" />
                                  </Link>
                                ) : (
                                  <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-mono text-[10px] text-muted hover:text-ink"
                                  >
                                    <span>{link.labelText}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )
                              )}
                            </div>

                            <Link
                              href={`/${locale}/journey/${item.slug}`}
                              className="inline-flex items-center gap-1 rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
                            >
                              <span>{messages.journey.viewActivityDetail}</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Only render right media column when a verified image exists */}
                        {hasVerifiedCover && item.coverAsset && (
                          <div className="lg:col-span-4">
                            <MediaItemFrame
                              asset={item.coverAsset}
                              locale={locale}
                              fallbackTitle={item.titleText}
                              compact
                            />
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
