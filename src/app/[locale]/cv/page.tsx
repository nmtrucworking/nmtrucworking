import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, loadMessages, loadProfile } from '@/content/load';
import { getAwards, getRolesAndAffiliations } from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { Download, MapPin, Mail, ArrowUpRight } from 'lucide-react';

interface CVPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CVPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return buildLocalizedMetadata({
    locale,
    path: '/cv',
    title: locale === 'vi' ? 'CV Nguyễn Minh Trúc' : 'Nguyễn Minh Trúc — CV / Resume',
    description:
      locale === 'vi'
        ? 'Hồ sơ năng lực của Nguyễn Minh Trúc: kinh nghiệm, kỹ năng, vai trò tổ chức và các dự án trong dữ liệu, hệ thống và sản phẩm.'
        : 'Nguyễn Minh Trúc’s resume, experience, organizational affiliations, skills, and roles across data, systems, and product.',
  });
}

export default async function CVPage({ params }: CVPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = loadProfile();
  const { privacySettings, roles } = getRolesAndAffiliations(locale);
  const awards = getAwards(locale);

  const visibleRoles = roles.filter(
    (r) => privacySettings.showPoliticalMembershipByDefault || r.category !== 'political-civic'
  );

  return (
    <div className="mx-auto max-w-4xl space-y-10 py-3 sm:space-y-12 sm:py-6">
      {/* Title & Download Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-line/60 pb-8">
        <div className="space-y-2">
          <span className="mono-label text-xs text-muted">Curriculum Vitae</span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {messages.cv.title}
          </h1>
          <p className="text-sm text-muted">
            {messages.cv.updated}: {profile.cv.updatedAt}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 min-[420px]:flex min-[420px]:w-auto min-[420px]:flex-wrap min-[420px]:items-center">
          <a
            href={profile.cv.files.en}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-xs font-mono font-bold text-canvas transition-all hover:bg-graphite"
          >
            <Download className="w-4 h-4 text-signal" />
            <span>{messages.cv.downloadEN}</span>
          </a>
          <a
            href={profile.cv.files.vi}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-paper px-4 py-2.5 text-xs font-mono font-bold text-ink transition-all hover:bg-canvas"
          >
            <Download className="w-4 h-4 text-muted" />
            <span>{messages.cv.downloadVI}</span>
          </a>
        </div>
      </div>

      {/* Online CV Card View */}
      <div className="space-y-10 rounded-2xl border border-line/60 bg-paper p-5 font-sans shadow-sm sm:space-y-12 sm:p-12">
        {/* Header Block */}
        <div className="space-y-4 border-b border-line/40 pb-8">
          <h2 className="font-display text-3xl font-bold text-ink">{profile.displayName}</h2>
          <p className="text-lg text-muted font-medium">{profile.descriptor}</p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-muted pt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {profile.location[locale]}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {profile.contact.email}
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="mono-label text-xs text-muted font-bold tracking-wider">// SUMMARY</h3>
          <p className="text-base text-ink leading-relaxed font-light">
            {profile.positioning[locale]}
          </p>
        </div>

        {/* Target Roles & Core Skills */}
        <div className="space-y-3">
          <h3 className="mono-label text-xs text-muted font-bold tracking-wider">// TARGET ROLES</h3>
          <div className="flex flex-wrap gap-2">
            {profile.targetRoles.map((r) => (
              <span key={r} className="px-3 py-1 rounded bg-graphite text-signal text-xs font-mono font-bold">
                {r} — {messages.roles[r as keyof typeof messages.roles]}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Roles & Affiliations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="mono-label text-xs text-muted font-bold tracking-wider">
              // ROLES, ORGANIZATIONS &amp; PROJECT LEADERSHIP
            </h3>
            <Link
              href={`/${locale}/journey`}
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink hover:text-signal"
            >
              <span>{locale === 'vi' ? 'Xem hồ sơ đầy đủ' : 'Full Archive'}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-6 font-sans">
            {visibleRoles.map((role) => (
              <div key={role.id} className="space-y-1.5 border-l-2 border-line/80 pl-4">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="font-display text-lg font-bold text-ink">
                    {role.titleText}
                  </h4>
                  <span className="mono-label text-xs text-muted">
                    {role.startDate
                      ? `${role.startDate} — ${
                          role.isCurrent ? messages.about.present : role.endDate || ''
                        }`
                      : locale === 'vi'
                      ? 'Đã xác nhận'
                      : 'Confirmed'}
                  </span>
                </div>
                <p className="font-mono text-xs text-signal">
                  {role.organizationText} · {messages.rolesAffiliations.roleTypes[role.roleType]}
                </p>
                <p className="text-sm text-muted">{role.shortDescriptionText}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recognitions & Participations */}
        <div className="space-y-4">
          <h3 className="mono-label text-xs text-muted font-bold tracking-wider">
            // RECOGNITIONS &amp; PARTICIPATIONS
          </h3>
          <div className="space-y-4">
            {awards.map((item) => (
              <div key={item.id} className="space-y-1 border-l-2 border-line/80 pl-4">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="font-display text-base font-bold text-ink">
                    {item.titleText}
                  </h4>
                  <span className="mono-label text-xs text-muted">{item.awardDate}</span>
                </div>
                <p className="font-mono text-xs text-signal">
                  {messages.awards.types[item.awardType]} · {item.organizerText}
                </p>
                <p className="text-xs text-muted">{item.descriptionText}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Training */}
        <div className="space-y-3">
          <h3 className="mono-label text-xs text-muted font-bold tracking-wider">// EDUCATION &amp; FOUNDATIONS</h3>
          <div className="space-y-1 text-sm text-ink">
            <div className="font-bold">Information Systems / Computer Science</div>
            <div className="text-muted text-xs font-mono">B.S. Information Systems Degree</div>
          </div>
        </div>
      </div>
    </div>
  );
}
