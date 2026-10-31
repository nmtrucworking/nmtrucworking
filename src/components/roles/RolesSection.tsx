'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  Shield,
  Users,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  ArrowUpRight,
  ExternalLink,
  X,
  Eye,
  EyeOff,
  Calendar,
  FolderGit2,
  Milestone,
  Clock,
} from 'lucide-react';
import type { Locale, RoleCategory, RoleType, RolePrivacySettings } from '@/content/load';
import type { getRolesAndAffiliations } from '@/content/selectors';
import { MediaGallery, MediaItemFrame } from '@/components/media/MediaGallery';

type LocalizedRole = ReturnType<typeof getRolesAndAffiliations>['roles'][number];

interface RolesSectionProps {
  locale: Locale;
  roles: LocalizedRole[];
  privacySettings: RolePrivacySettings;
  messages: any;
  sectionNumber?: string;
}

const categoryIcons: Record<RoleCategory, React.ElementType> = {
  'professional-technical': Cpu,
  'leadership-organizations': Users,
  'political-civic': Shield,
  'community-volunteering': HeartHandshake,
};

export function RolesSection({
  locale,
  roles,
  privacySettings,
  messages,
  sectionNumber = '01',
}: RolesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | RoleCategory>('all');
  const [activeRoleType, setActiveRoleType] = useState<'all' | RoleType>('all');
  const [showPolitical, setShowPolitical] = useState<boolean>(
    privacySettings.showPoliticalMembershipByDefault
  );
  const [selectedRole, setSelectedRole] = useState<LocalizedRole | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedRole) {
      document.body.style.overflow = '';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRole(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedRole]);

  const categoriesOrder: ('all' | RoleCategory)[] = [
    'all',
    'professional-technical',
    'leadership-organizations',
    'political-civic',
    'community-volunteering',
  ];

  const roleTypesOrder: ('all' | RoleType)[] = [
    'all',
    'leadership',
    'specialist',
    'membership',
  ];

  const filteredRoles = roles.filter((role) => {
    if (role.category === 'political-civic' && !showPolitical) return false;
    if (activeCategory !== 'all' && role.category !== activeCategory) return false;
    if (activeRoleType !== 'all' && role.roleType !== activeRoleType) return false;
    return true;
  });

  const getRoleTypeBadgeStyle = (roleType: RoleType) => {
    switch (roleType) {
      case 'leadership':
        return 'bg-ink text-canvas border-ink';
      case 'specialist':
        return 'bg-canvas text-ink border-line';
      case 'membership':
        return 'bg-paper text-muted border-line';
    }
  };

  return (
    <section id="roles" className="scroll-mt-20 space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 lg:flex-row lg:items-end">
        <div className="space-y-1">
          <span className="mono-label text-[11px] text-muted">
            {sectionNumber} // {messages.rolesAffiliations.eyebrow}
          </span>
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
            {messages.rolesAffiliations.title}
          </h2>
          <p className="max-w-3xl text-xs leading-relaxed text-muted sm:text-sm">
            {messages.rolesAffiliations.subtitle}
          </p>
        </div>

        {/* Owner / Visitor Privacy Toggle for Political Affiliation */}
        {privacySettings.allowVisitorPoliticalToggle && (
          <div className="flex items-center gap-2.5 rounded-lg border border-line bg-paper px-3 py-2">
            <span className="mono-label text-[10px] text-muted">
              {messages.rolesAffiliations.politicalToggleLabel}:
            </span>
            <button
              type="button"
              onClick={() => setShowPolitical((prev) => !prev)}
              aria-pressed={showPolitical}
              className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[11px] font-medium transition-all ${
                showPolitical
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line bg-canvas text-muted hover:text-ink'
              }`}
            >
              {showPolitical ? (
                <>
                  <Eye className="h-3 w-3" />
                  <span>{messages.rolesAffiliations.politicalShown}</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" />
                  <span>{messages.rolesAffiliations.politicalHidden}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Compact Filter Toolbar */}
      <div className="space-y-3 rounded-xl border border-line bg-paper p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mono-label mr-1 text-[10px] font-semibold text-muted">
            {messages.rolesAffiliations.filterCategory}:
          </span>
          {categoriesOrder.map((cat) => {
            if (cat === 'political-civic' && !showPolitical) return null;
            const isActive = activeCategory === cat;
            const label = messages.rolesAffiliations.categories[cat] || cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-all ${
                  isActive
                    ? 'bg-ink font-semibold text-canvas'
                    : 'border border-line bg-canvas text-muted hover:border-ink/40 hover:text-ink'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mono-label mr-1 text-[10px] font-semibold text-muted">
              {messages.rolesAffiliations.filterRoleType}:
            </span>
            {roleTypesOrder.map((rt) => {
              const isActive = activeRoleType === rt;
              const label = messages.rolesAffiliations.roleTypes[rt] || rt;
              return (
                <button
                  key={rt}
                  type="button"
                  onClick={() => setActiveRoleType(rt)}
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

          <span className="text-[11px] italic text-muted">
            {messages.rolesAffiliations.politicalNote}
          </span>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredRoles.map((role) => {
          const CategoryIcon = categoryIcons[role.category] || Cpu;
          const hasVerifiedCover = Boolean(
            role.coverAsset && role.coverAsset.src && role.coverAsset.status === 'verified'
          );
          const periodLabel = role.startDate
            ? `${role.startDate} — ${
                role.isCurrent ? messages.about.present : role.endDate || ''
              }`
            : locale === 'vi'
            ? 'Đã xác nhận tư cách'
            : 'Confirmed membership';

          return (
            <article
              key={role.id}
              className="group flex flex-col justify-between rounded-xl border border-line bg-paper p-4 transition-all duration-200 hover:border-ink/40 hover:shadow-sm sm:p-5"
            >
              <div className="space-y-3.5">
                {/* Top Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-ink">
                      <CategoryIcon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="mono-label block text-[10px] font-bold text-ink">
                        {role.organizationShort}
                      </span>
                      <span className="text-[11px] text-muted">
                        {messages.rolesAffiliations.categories[role.category]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-medium uppercase ${getRoleTypeBadgeStyle(
                        role.roleType
                      )}`}
                    >
                      {messages.rolesAffiliations.roleTypes[role.roleType]}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${
                        role.isCurrent
                          ? 'border border-[#157A48]/25 bg-[#157A48]/10 text-[#157A48]'
                          : 'border border-line bg-canvas text-muted'
                      }`}
                    >
                      {role.isCurrent && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#157A48]" />
                      )}
                      {role.isCurrent
                        ? messages.rolesAffiliations.statusCurrent
                        : messages.rolesAffiliations.statusPast}
                    </span>
                  </div>
                </div>

                {/* Title & Organization */}
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                    <button
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className="text-left hover:underline focus:outline-none"
                    >
                      {role.titleText}
                    </button>
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span className="font-medium text-ink/80">{role.organizationText}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="h-3 w-3" />
                      {periodLabel}
                    </span>
                  </div>
                </div>

                {/* Optional Verified Cover Thumbnail (No giant empty box when pending) */}
                {hasVerifiedCover && role.coverAsset && (
                  <MediaItemFrame
                    asset={role.coverAsset}
                    locale={locale}
                    fallbackTitle={role.titleText}
                    compact
                    onInspect={() => setSelectedRole(role)}
                  />
                )}

                {/* Short Description */}
                <p className="text-xs leading-relaxed text-muted sm:text-sm">
                  {role.shortDescriptionText}
                </p>

                {/* Contributions Summary List */}
                {role.contributionsLocalized.length > 0 && (
                  <div className="space-y-1.5 rounded-lg border border-line/70 bg-canvas/60 p-3">
                    <span className="mono-label block text-[10px] font-semibold text-muted">
                      {messages.rolesAffiliations.contributionsHeading}
                    </span>
                    <ul className="space-y-1 text-xs text-ink">
                      {role.contributionsLocalized.map((c) => (
                        <li key={c.id} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                          <span>
                            <strong className="font-semibold">{c.titleText}:</strong>{' '}
                            <span className="text-muted">{c.subtitleText}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {role.relatedProjectsLocalized.map((proj) => (
                    <Link
                      key={proj.id}
                      href={`/${locale}/work/${proj.slug}`}
                      className="inline-flex items-center gap-1 rounded border border-line bg-canvas px-2 py-0.5 font-mono text-[10px] font-medium text-ink hover:border-ink"
                    >
                      <FolderGit2 className="h-3 w-3 text-muted" />
                      <span>{proj.slug}</span>
                    </Link>
                  ))}
                  {!hasVerifiedCover && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
                      <Clock className="h-3 w-3" />
                      <span>
                        {locale === 'vi' ? 'Ảnh tư liệu chờ bổ sung' : 'Media pending'}
                      </span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className="inline-flex items-center gap-1 rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
                >
                  <span>{messages.rolesAffiliations.inspectRole}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Role Detail Modal */}
      {selectedRole &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedRole(null);
            }}
          >
            <div className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-line bg-paper text-ink shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-line bg-canvas px-5 py-3.5 sm:px-6">
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mono-label text-[10px] font-bold text-ink">
                      {selectedRole.organizationShort}
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-medium uppercase ${getRoleTypeBadgeStyle(
                        selectedRole.roleType
                      )}`}
                    >
                      {messages.rolesAffiliations.roleTypes[selectedRole.roleType]}
                    </span>
                  </div>
                  <h3
                    id="role-modal-title"
                    className="font-display text-lg font-bold text-ink sm:text-xl"
                  >
                    {selectedRole.titleText}
                  </h3>
                  <p className="text-xs text-muted">{selectedRole.organizationText}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-ink hover:border-ink"
                  aria-label={messages.rolesAffiliations.closeModal}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed text-ink">
                    {selectedRole.detailedDescriptionText}
                  </p>
                  {selectedRole.startDateNoteText && (
                    <p className="rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-[11px] text-muted">
                      {selectedRole.startDateNoteText}
                    </p>
                  )}
                </div>

                {/* Responsibilities */}
                {selectedRole.responsibilitiesLocalized.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="mono-label text-[11px] font-bold text-muted">
                      // {messages.rolesAffiliations.responsibilitiesHeading}
                    </h4>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selectedRole.responsibilitiesLocalized.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 rounded-lg border border-line bg-canvas/50 p-3 text-xs leading-relaxed text-ink"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contributions */}
                {selectedRole.contributionsLocalized.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="mono-label text-[11px] font-bold text-muted">
                      // {messages.rolesAffiliations.contributionsHeading}
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {selectedRole.contributionsLocalized.map((c, index) => (
                        <div
                          key={c.id}
                          className="space-y-2 rounded-lg border border-line bg-paper p-3.5"
                        >
                          <div>
                            <span className="font-mono text-[10px] font-bold text-muted">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h5 className="font-display text-sm font-bold text-ink">
                              {c.titleText}
                            </h5>
                            <p className="text-[11px] text-muted">{c.subtitleText}</p>
                          </div>
                          <p className="text-xs leading-relaxed text-muted">
                            {c.descriptionText}
                          </p>
                          {c.evidence.length > 0 && (
                            <div className="flex flex-wrap gap-1 border-t border-line/60 pt-2">
                              {c.evidence.map((ev) => (
                                <span
                                  key={ev}
                                  className="rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] text-ink"
                                >
                                  {ev}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Gallery */}
                {selectedRole.galleryAssets.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="mono-label text-[11px] font-bold text-muted">
                      // {messages.rolesAffiliations.galleryHeading}
                    </h4>
                    <MediaGallery
                      assets={selectedRole.galleryAssets}
                      locale={locale}
                      title={selectedRole.titleText}
                      mode={selectedRole.galleryAssets.length > 1 ? 'carousel' : 'grid'}
                    />
                  </div>
                )}

                {/* Related Links */}
                <div className="grid grid-cols-1 gap-4 border-t border-line pt-4 sm:grid-cols-2">
                  {selectedRole.relatedProjectsLocalized.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="mono-label text-[10px] font-bold text-muted">
                        // {messages.rolesAffiliations.relatedProjectsHeading}
                      </h4>
                      <div className="space-y-1.5">
                        {selectedRole.relatedProjectsLocalized.map((proj) => (
                          <Link
                            key={proj.id}
                            href={`/${locale}/work/${proj.slug}`}
                            onClick={() => setSelectedRole(null)}
                            className="flex items-center justify-between gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-xs font-medium text-ink hover:border-ink"
                          >
                            <span className="truncate">{proj.title}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedRole.relatedActivitiesLocalized.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="mono-label text-[10px] font-bold text-muted">
                        // {messages.rolesAffiliations.relatedActivitiesHeading}
                      </h4>
                      <div className="space-y-1.5">
                        {selectedRole.relatedActivitiesLocalized.map((act) => (
                          <Link
                            key={act.id}
                            href={`/${locale}/journey/${act.slug}`}
                            onClick={() => setSelectedRole(null)}
                            className="flex items-center justify-between gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-xs font-medium text-ink hover:border-ink"
                          >
                            <span className="truncate">
                              {act.dateDisplayText}: {act.titleText}
                            </span>
                            <Milestone className="h-3.5 w-3.5 shrink-0 text-muted" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedRole.evidenceLinksLocalized.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                    {selectedRole.evidenceLinksLocalized.map((link, i) =>
                      link.url.startsWith('/') ? (
                        <Link
                          key={i}
                          href={`/${locale}${link.url}`}
                          onClick={() => setSelectedRole(null)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 py-1.5 font-mono text-xs font-medium text-ink hover:border-ink"
                        >
                          <span>{link.labelText}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 py-1.5 font-mono text-xs font-medium text-ink hover:border-ink"
                        >
                          <span>{link.labelText}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
