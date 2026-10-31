import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, loadMessages, loadProfile, loadSiteConfig } from '@/content/load';
import { getProfile, getFeaturedProjects } from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { ProtectedPortrait } from '@/components/brand/ProtectedPortrait';
import { SignalTicker } from '@/components/brand/SignalTicker';
import { SignalFlow } from '@/components/brand/SignalFlow';
import { ProjectMedia } from '@/components/projects/ProjectMedia';
import { ArrowRight, Award, CheckCircle2, Compass, Cpu, Database, Layers, LineChart, Shield } from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return buildLocalizedMetadata({
    locale,
    title:
      locale === 'vi'
        ? 'Nguyễn Minh Trúc | Dữ liệu, Hệ thống & Sản phẩm'
        : 'Nguyễn Minh Trúc | Data, Systems & Product',
    description:
      locale === 'vi'
        ? 'Portfolio của Nguyễn Minh Trúc về phân tích dữ liệu, khoa học dữ liệu, phân tích nghiệp vụ, kiến trúc hệ thống và quản lý sản phẩm.'
        : 'Nguyễn Minh Trúc’s portfolio across data analysis, data science, business analysis, system architecture, and product management.',
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = getProfile(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const rawProfile = loadProfile();
  const site = loadSiteConfig();
  const sameAs = site.socials
    .filter((social) => ['github', 'linkedin', 'twitter', 'facebook'].includes(social.type))
    .map((social) => social.url);
  const profilePageUrl = `${site.baseUrl}/${locale}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${profilePageUrl}/#profile`,
        url: profilePageUrl,
        name:
          locale === 'vi'
            ? 'Hồ sơ Nguyễn Minh Trúc'
            : 'Nguyễn Minh Trúc — Professional Profile',
        inLanguage: locale,
        mainEntity: { '@id': `${site.baseUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${site.baseUrl}/#person`,
        name: rawProfile.displayName,
        alternateName: ['Trúc', 'Jin'],
        url: profilePageUrl,
        image: `${site.baseUrl}/og.png`,
        description: rawProfile.positioning[locale],
        homeLocation: {
          '@type': 'Place',
          name: rawProfile.location[locale],
        },
        sameAs,
        knowsAbout: [
          'Data Analysis',
          'Data Science',
          'Business Analysis',
          'System Architecture',
          'Product Management',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.baseUrl}/#website`,
        url: site.baseUrl,
        name: site.siteName,
        alternateName: 'TRÚC.',
        inLanguage: ['en', 'vi'],
        publisher: { '@id': `${site.baseUrl}/#person` },
      },
    ],
  };

  const roleIcons = {
    DA: LineChart,
    DS: Cpu,
    BA: CheckCircle2,
    SA: Layers,
    PRODUCT: Database,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <div className="home-page">
        {/* Hero Viewport */}
        <section className="home-hero">
          <div className="home-hero-stage">
            <div className="home-hero-copy">
              <div className="space-y-1.5">
                <img
                  src="/brand/01-truc-wordmark-dark.svg"
                  width="152"
                  height="40"
                  alt="Nguyễn Minh Trúc — TRÚC."
                  className="h-auto w-[9.5rem]"
                />
                <p className="mono-label text-[11px] tracking-[0.2em] text-canvas/55">
                  NGUYỄN MINH TRÚC
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-canvas/75">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                <span>{profile.availabilityLabel}</span>
              </div>

              <h1 className="home-hero-title font-display font-medium text-canvas">
                {locale === 'en' ? (
                  <>
                    <span className="block">I turn complex</span>
                    <span className="block text-signal">data</span>
                    <span className="block">into meaningful</span>
                    <span className="block text-signal">solutions.</span>
                  </>
                ) : (
                  <>
                    <span className="block">Biến dữ liệu</span>
                    <span className="block text-signal">phức tạp</span>
                    <span className="block">thành giải pháp</span>
                    <span className="block text-signal">thực tế.</span>
                  </>
                )}
              </h1>

              <p className="home-hero-description max-w-xl font-light leading-relaxed text-canvas/62">
                {profile.positioningText}
              </p>

              <div className="home-hero-disciplines" aria-label="Data, Systems, Product">
                <span>DATA</span><i>/</i><span>SYSTEMS</span><i>/</i><span>PRODUCT</span>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:items-center sm:gap-4">
                <Link
                  href={`/${locale}/work`}
                  className="group flex min-h-12 items-center justify-center gap-2 rounded-lg bg-canvas px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white min-[420px]:justify-start"
                >
                  <span>{messages.hero.ctaWork}</span>
                  <ArrowRight className="w-4 h-4 text-signal group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-canvas transition-all hover:border-signal hover:bg-white/10"
                >
                  {messages.hero.ctaContact}
                </Link>

                <Link
                  href={`/${locale}/cv`}
                  className="flex min-h-12 items-center justify-center rounded-lg px-4 py-3.5 text-xs text-canvas/55 transition-all hover:text-canvas"
                >
                  {messages.nav.cv} →
                </Link>
              </div>
            </div>

            <div className="home-hero-visual">
              <div className="home-hero-location mono-label text-canvas/50" aria-label={profile.locationText}>
                <span>{profile.locationText}</span>
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              </div>

              <div className="home-portrait-effects" aria-hidden="true">
                <span className="home-portrait-orbit home-portrait-orbit-primary" />
                <span className="home-portrait-orbit home-portrait-orbit-secondary" />
                <span className="home-portrait-node home-portrait-node-one" />
                <span className="home-portrait-node home-portrait-node-two" />
                <span className="home-portrait-node home-portrait-node-three" />
              </div>

              <span className="home-hero-slash" aria-hidden="true" />

              <ProtectedPortrait
                alt={locale === 'vi' ? 'Chân dung Nguyễn Minh Trúc' : 'Portrait of Nguyễn Minh Trúc'}
              />

              <div className="home-hero-traits" aria-label={locale === 'vi' ? 'Giá trị thương hiệu' : 'Brand values'}>
                <div><LineChart /><span><strong>{locale === 'vi' ? 'PHÂN TÍCH' : 'ANALYTICAL'}</strong><small>{locale === 'vi' ? 'Tư duy phân tích' : 'Evidence first'}</small></span></div>
                <div><Layers /><span><strong>{locale === 'vi' ? 'HỆ THỐNG' : 'SYSTEMATIC'}</strong><small>{locale === 'vi' ? 'Hệ thống & logic' : 'Systems & logic'}</small></span></div>
                <div><Database /><span><strong>{locale === 'vi' ? 'SẢN PHẨM' : 'PRODUCT-DRIVEN'}</strong><small>{locale === 'vi' ? 'Tạo ra giá trị thực tế' : 'Built for outcomes'}</small></span></div>
                <div><CheckCircle2 /><span><strong>{locale === 'vi' ? 'TÁC ĐỘNG' : 'IMPACTFUL'}</strong><small>{locale === 'vi' ? 'Tạo ảnh hưởng tích cực' : 'Positive impact'}</small></span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Transitional Infinite Signal Loop Ticker */}
        <SignalTicker locale={locale} />

        {/* Main Content Container */}
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 space-y-12 sm:space-y-16">
          {/* Role Lenses Section */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-line/60 pb-3">
              <div>
                <span className="mono-label text-[11px] text-muted">Core Specializations</span>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {locale === 'en' ? 'Target Role Lenses' : 'Các Góc nhìn Vai trò Chuyên môn'}
                </h2>
              </div>
              <p className="text-xs text-muted max-w-md sm:text-sm">
                {locale === 'en'
                  ? 'Select a role lens to inspect targeted capabilities, deliverables, and case study evidence.'
                  : 'Chọn một vai trò chuyên môn để xem chi tiết năng lực và minh chứng tình huống tương ứng.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {profile.targetRoles.map((roleKey) => {
                const Icon = roleIcons[roleKey as keyof typeof roleIcons] || Layers;
                const roleTitle = messages.roles[roleKey as keyof typeof messages.roles];

                return (
                  <Link
                    key={roleKey}
                    href={`/${locale}/work?role=${roleKey}`}
                    className="group relative flex flex-col justify-between space-y-3 overflow-hidden rounded-xl border border-line/60 bg-paper p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-canvas">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="mono-label text-[11px] font-bold text-muted transition-colors group-hover:text-ink">
                        {roleKey}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-display text-sm font-semibold text-ink">
                        {roleTitle}
                      </h3>
                      <span className="flex items-center gap-1 text-[11px] text-muted transition-colors group-hover:text-ink">
                        <span>{locale === 'en' ? 'View projects' : 'Xem dự án'}</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured Flagship Case Studies Section */}
          <section className="space-y-6">
            <div className="flex flex-col gap-2 border-b border-line/60 pb-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mono-label text-[11px] text-muted">Evidence & Outcomes</span>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {locale === 'en' ? 'Flagship Case Studies' : 'Dự án & Case Study Nổi bật'}
                </h2>
              </div>
              <Link
                href={`/${locale}/work`}
                className="flex min-h-9 w-fit items-center gap-1 text-xs font-mono font-semibold text-muted transition-colors hover:text-ink"
              >
                {locale === 'en' ? 'View all projects' : 'Xem tất cả dự án'} →
              </Link>
            </div>

            <div className="space-y-6">
              {featuredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group relative grid grid-cols-1 gap-5 overflow-hidden rounded-xl border border-line/60 bg-paper p-5 transition-all duration-300 hover:border-ink/40 hover:shadow-md sm:p-6 lg:grid-cols-12 lg:gap-6"
                >
                  {/* Left Column: Details & Copy */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mono-label text-[10px] px-2 py-0.5 rounded bg-ink text-canvas font-semibold">
                          {project.roles.primary}
                        </span>
                        {project.roles.secondary.map((sec) => (
                          <span
                            key={sec}
                            className="mono-label text-[10px] px-1.5 py-0.5 rounded border border-line text-muted"
                          >
                            {sec}
                          </span>
                        ))}
                        <span className="text-[11px] text-muted font-mono ml-auto">
                          {project.yearStart} {project.yearEnd ? `– ${project.yearEnd}` : ''}
                        </span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-ink hover:underline">
                        <Link href={`/${locale}/work/${project.slug}`}>
                          {project.localizedContent.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {project.localizedContent.summary}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    {project.metrics.length > 0 && (
                      <div className="grid grid-cols-1 gap-3 border-t border-line/40 pt-3 min-[420px]:grid-cols-3">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="font-display font-bold text-base sm:text-lg text-ink">
                              {m.value}
                            </div>
                            <div className="text-[11px] text-muted leading-tight">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-1">
                      <Link
                        href={`/${locale}/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink hover:underline transition-colors group/link"
                      >
                        <span>{messages.work.viewProject}</span>
                        <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <ProjectMedia
                      asset={project.heroAsset}
                      projectTitle={project.localizedContent.title}
                      projectSlug={project.slug}
                      role={project.roles.primary}
                      locale={locale}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Signal Flow Sequence */}
          <section className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-line/60 pb-3">
              <div>
                <span className="mono-label text-[11px] text-muted">Methodology & Execution</span>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {locale === 'en' ? 'Signal Flow & Problem-Solving System' : 'Quy trình Tiếp cận & Luồng Xử lý Dữ liệu'}
                </h2>
              </div>
              <p className="text-xs text-muted max-w-md sm:text-sm">
                {locale === 'en'
                  ? 'A disciplined five-stage sequence converting complex data problems into verifiable production impact.'
                  : 'Trình tự 5 bước chuyển hóa bài toán nghiệp vụ phức tạp thành giải pháp thực tế có thể đo lường.'}
              </p>
            </div>
            <SignalFlow locale={locale} />
          </section>

          {/* Capability Constellation Section */}
          <section className="space-y-5 rounded-xl border border-line/60 bg-paper p-5 sm:p-6">
            <div className="space-y-1.5">
              <span className="mono-label text-[11px] text-muted">Capability Architecture</span>
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {locale === 'en' ? 'Skill & Domain Constellation' : 'Ma trận Năng lực & Miền Chuyên môn'}
              </h2>
              <p className="text-xs text-muted max-w-2xl sm:text-sm">
                {locale === 'en'
                  ? 'Every claimed capability is tied directly to underlying technologies, architectural patterns, and verified deliverables.'
                  : 'Mọi năng lực chuyên môn đều được liên kết trực tiếp với các công nghệ nền tảng và minh chứng thực hiện.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-canvas border border-line/60 space-y-2">
                <h3 className="font-bold text-sm text-ink font-display">System Architecture</h3>
                <ul className="space-y-1.5 text-muted text-[11px]">
                  <li>• Multi-Tenant Domain Isolation</li>
                  <li>• Service Boundaries & Microservices</li>
                  <li>• RBAC & Membership Models</li>
                  <li>• REST API & Data Schema Design</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-line/60 space-y-2">
                <h3 className="font-bold text-sm text-ink font-display">Data & Intelligence</h3>
                <ul className="space-y-1.5 text-muted text-[11px]">
                  <li>• Machine Learning (XGBoost/LightGBM)</li>
                  <li>• SHAP Model Explainability</li>
                  <li>• dbt & Star-Schema Data Modeling</li>
                  <li>• SQL ETL & Funnel Telemetry</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-line/60 space-y-2">
                <h3 className="font-bold text-sm text-ink font-display">Product Strategy</h3>
                <ul className="space-y-1.5 text-muted text-[11px]">
                  <li>• Product Discovery & Requirement Specs</li>
                  <li>• RICE Backlog Prioritization</li>
                  <li>• Checkout Conversion Optimization</li>
                  <li>• User Journey Telemetry Mapping</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Non-Duplicative Gateway Banner to Journey, Roles & Recognitions */}
          <section className="flex flex-col justify-between gap-5 rounded-xl bg-graphite p-5 text-canvas sm:p-6 lg:flex-row lg:items-center">
            <div className="space-y-1.5 max-w-2xl">
              <span className="mono-label text-[10px] text-canvas/65">
                BEYOND CODE // ROLES · JOURNEY · RECOGNITIONS
              </span>
              <h2 className="font-display text-lg font-bold text-canvas sm:text-xl">
                {locale === 'vi'
                  ? 'Khám phá Vai trò Tổ chức, Hành trình Cá nhân & Thành tích'
                  : 'Explore Organizational Roles, Personal Journey & Recognitions'}
              </h2>
              <p className="text-xs text-canvas/70 leading-relaxed sm:text-sm">
                {locale === 'vi'
                  ? 'Xem chi tiết tư cách thành viên, trách nhiệm tại các tổ chức (NJEC, NIIC, Đảng Cộng sản Việt Nam), dòng thời gian hoạt động và các ghi nhận đã xác thực.'
                  : 'Inspect verified organizational affiliations (NJEC, NIIC, CPV membership), chronological activity milestones, and recognitions.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={`/${locale}/journey#roles`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-xs font-semibold text-canvas hover:border-white/40"
              >
                <Shield className="h-3.5 w-3.5 text-canvas/80" />
                <span>{locale === 'vi' ? 'Vai trò & Tổ chức' : 'Roles'}</span>
              </Link>
              <Link
                href={`/${locale}/journey#timeline`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-xs font-semibold text-canvas hover:border-white/40"
              >
                <Compass className="h-3.5 w-3.5 text-canvas/80" />
                <span>{locale === 'vi' ? 'Hành trình' : 'Timeline'}</span>
              </Link>
              <Link
                href={`/${locale}/journey#awards`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-canvas px-3.5 py-2 font-mono text-xs font-bold text-ink hover:bg-white"
              >
                <Award className="h-3.5 w-3.5 text-ink" />
                <span>{locale === 'vi' ? 'Thành tích' : 'Honors'} →</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
