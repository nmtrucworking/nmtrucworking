import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, loadMessages } from '@/content/load';
import {
  getAwards,
  getJourneyItems,
  getRolesAndAffiliations,
} from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { RolesSection } from '@/components/roles/RolesSection';
import { JourneyTimeline } from '@/components/journey/JourneyTimeline';
import { AwardsShowcase } from '@/components/awards/AwardsShowcase';
import { Award, Compass, Shield, ArrowRight } from 'lucide-react';

interface JourneyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: JourneyPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return buildLocalizedMetadata({
    locale,
    path: '/journey',
    title:
      locale === 'vi'
        ? 'Hành trình, Vai trò & Thành tích — Nguyễn Minh Trúc'
        : 'Roles, Personal Journey & Recognitions — Nguyễn Minh Trúc',
    description:
      locale === 'vi'
        ? 'Lịch sử hoạt động, vai trò tổ chức (NJEC, NIIC Platform, Đảng viên ĐCSVN), dòng thời gian học thuật và các ghi nhận đã xác thực của Nguyễn Minh Trúc.'
        : 'Organizational roles, technical leadership (NIIC Platform, NJEC), personal timeline, and verified recognitions of Nguyễn Minh Trúc.',
  });
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);

  const { privacySettings, roles } = getRolesAndAffiliations(locale);
  const journeyItems = getJourneyItems(locale);
  const awards = getAwards(locale);

  return (
    <div className="space-y-10 py-2 sm:space-y-14 sm:py-4">
      {/* Page Hero & Quick Section Jump Bar */}
      <header className="space-y-4 border-b border-line/60 pb-6">
        <div className="space-y-2">
          <span className="mono-label text-[11px] text-muted">
            Portfolio Archive // Roles · Journey · Recognitions
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {locale === 'vi'
              ? 'Vai trò, Hành trình & Thành tích'
              : 'Roles, Personal Journey & Recognitions'}
          </h1>
          <p className="max-w-3xl text-xs leading-relaxed text-muted sm:text-sm">
            {locale === 'vi'
              ? 'Hồ sơ đối chiếu toàn diện về các vai trò chuyên môn, hoạt động tổ chức câu lạc bộ, dấu mốc phát triển cá nhân và các ghi nhận thực tế.'
              : 'A traceable record of organizational affiliations, technical leadership, chronological milestones, and verified recognitions.'}
          </p>
        </div>

        {/* Section Anchor Navigation */}
        <nav
          aria-label={locale === 'vi' ? 'Điều hướng phân hệ' : 'Section navigation'}
          className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-3"
        >
          <a
            href="#roles"
            className="group flex items-center justify-between rounded-xl border border-line/70 bg-paper p-3 transition-all hover:border-ink/40"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink">
                <Shield className="h-3.5 w-3.5" />
              </span>
              <div>
                <span className="mono-label block text-[10px] text-muted">01 // ROLES</span>
                <span className="font-display text-xs font-bold text-ink sm:text-sm">
                  {locale === 'vi' ? 'Vai trò & Tổ chức' : 'Roles & Affiliations'}
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-muted group-hover:text-ink">↓</span>
          </a>

          <a
            href="#timeline"
            className="group flex items-center justify-between rounded-xl border border-line/70 bg-paper p-3 transition-all hover:border-ink/40"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink">
                <Compass className="h-3.5 w-3.5" />
              </span>
              <div>
                <span className="mono-label block text-[10px] text-muted">02 // TIMELINE</span>
                <span className="font-display text-xs font-bold text-ink sm:text-sm">
                  {locale === 'vi' ? 'Lịch sử & Hoạt động' : 'My Journey Timeline'}
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-muted group-hover:text-ink">↓</span>
          </a>

          <a
            href="#awards"
            className="group flex items-center justify-between rounded-xl border border-line/70 bg-paper p-3 transition-all hover:border-ink/40"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink">
                <Award className="h-3.5 w-3.5" />
              </span>
              <div>
                <span className="mono-label block text-[10px] text-muted">03 // HONORS</span>
                <span className="font-display text-xs font-bold text-ink sm:text-sm">
                  {locale === 'vi' ? 'Giải thưởng & Ghi nhận' : 'Honors & Recognitions'}
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-muted group-hover:text-ink">↓</span>
          </a>
        </nav>
      </header>

      {/* 01. Roles & Affiliations */}
      <RolesSection
        locale={locale}
        roles={roles}
        privacySettings={privacySettings}
        messages={messages}
        sectionNumber="01"
      />

      {/* 02. My Journey Interactive Timeline */}
      <JourneyTimeline
        locale={locale}
        items={journeyItems}
        messages={messages}
        sectionNumber="02"
      />

      {/* 03. Honors & Awards Showcase */}
      <AwardsShowcase
        locale={locale}
        awards={awards}
        messages={messages}
        sectionNumber="03"
      />

      {/* Footer CTA */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-line/60 bg-paper p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="space-y-1">
          <span className="mono-label text-[10px] text-muted">CASE STUDIES & ARTIFACTS</span>
          <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
            {locale === 'vi'
              ? 'Khám phá sâu hơn qua các Dự án & Nghiên cứu tình huống'
              : 'Inspect the Underlying Engineering Case Studies'}
          </h2>
          <p className="text-xs text-muted sm:text-sm">
            {locale === 'vi'
              ? 'Mỗi vai trò và dấu mốc đều liên kết trực tiếp với kiến trúc hệ thống và sản phẩm thực tế.'
              : 'Every role and milestone connects directly to system architectures and software deliverables.'}
          </p>
        </div>

        <Link
          href={`/${locale}/work`}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-4 py-2.5 font-mono text-xs font-semibold text-canvas transition-colors hover:bg-graphite"
        >
          <span>{messages.hero.ctaWork}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  );
}
