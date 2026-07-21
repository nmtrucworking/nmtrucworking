import React from 'react';
import Link from 'next/link';
import { Locale, loadMessages } from '@/content/load';
import { getProfile, getFeaturedProjects } from '@/content/selectors';
import { ProtectedPortrait } from '@/components/brand/ProtectedPortrait';
import { ArrowRight, CheckCircle2, Cpu, Database, Layers, LineChart } from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = getProfile(locale);
  const featuredProjects = getFeaturedProjects(locale);

  const roleIcons = {
    DA: LineChart,
    DS: Cpu,
    BA: CheckCircle2,
    SA: Layers,
    PRODUCT: Database,
  };

  return (
    <div className="space-y-14 py-3 sm:space-y-20 sm:py-6">
      {/* Hero Viewport */}
      <section className="home-hero">
        <div className="home-hero-stage">
          <div className="home-hero-copy">
            <img
              src="/brand/01-truc-wordmark-dark.svg"
              width="152"
              height="40"
              alt="TRÚC."
              className="h-auto w-[9.5rem]"
            />
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-canvas/75">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse-slow" />
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

      {/* Role Lenses Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line/60 pb-4">
          <div>
            <span className="mono-label text-xs text-muted">Core Specializations</span>
            <h2 className="font-display text-3xl font-bold text-ink">
              {locale === 'en' ? 'Target Role Lenses' : 'Các Góc nhìn Vai trò Chuyên môn'}
            </h2>
          </div>
          <p className="text-sm text-muted max-w-md">
            {locale === 'en'
              ? 'Select a role lens to inspect targeted capabilities, deliverables, and case study evidence.'
              : 'Chọn một vai trò chuyên môn để xem chi tiết năng lực và minh chứng tình huống tương ứng.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {profile.targetRoles.map((roleKey) => {
            const Icon = roleIcons[roleKey as keyof typeof roleIcons] || Layers;
            const roleTitle = messages.roles[roleKey as keyof typeof messages.roles];

            return (
              <Link
                key={roleKey}
                href={`/${locale}/work?role=${roleKey}`}
                className="p-6 rounded-xl border border-line/60 bg-paper hover:border-ink hover:bg-canvas transition-all group space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-canvas flex items-center justify-center text-ink group-hover:bg-graphite group-hover:text-signal transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="mono-label text-xs font-bold text-muted group-hover:text-ink">
                    {roleKey}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-base text-ink group-hover:text-ink">
                    {roleTitle}
                  </h3>
                  <span className="text-xs text-muted block group-hover:underline">
                    {locale === 'en' ? 'View projects →' : 'Xem dự án →'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Flagship Case Studies Section */}
      <section className="space-y-8">
        <div className="flex flex-col gap-3 border-b border-line/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label text-xs text-muted">Evidence & Outcomes</span>
            <h2 className="font-display text-3xl font-bold text-ink">
              {locale === 'en' ? 'Flagship Case Studies' : 'Dự án & Case Study Nổi bật'}
            </h2>
          </div>
          <Link
            href={`/${locale}/work`}
            className="flex min-h-11 w-fit items-center gap-1 text-sm font-mono font-semibold text-muted transition-colors hover:text-ink"
          >
            {locale === 'en' ? 'View all projects' : 'Xem tất cả dự án'} →
          </Link>
        </div>

        <div className="space-y-12">
          {featuredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="relative grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-line/60 bg-paper p-5 transition-all hover:border-ink sm:p-8 lg:grid-cols-12 lg:gap-8"
            >
              {/* Left Column: Details & Copy */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mono-label text-xs px-2.5 py-1 rounded bg-graphite text-signal font-semibold">
                      {project.roles.primary}
                    </span>
                    {project.roles.secondary.map((sec) => (
                      <span
                        key={sec}
                        className="mono-label text-xs px-2 py-0.5 rounded border border-line text-muted"
                      >
                        {sec}
                      </span>
                    ))}
                    <span className="text-xs text-muted font-mono ml-auto">
                      {project.yearStart} {project.yearEnd ? `– ${project.yearEnd}` : ''}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink hover:underline">
                    <Link href={`/${locale}/work/${project.slug}`}>
                      {project.localizedContent.title}
                    </Link>
                  </h3>

                  <p className="text-base text-muted leading-relaxed">
                    {project.localizedContent.summary}
                  </p>
                </div>

                {/* Metrics Grid */}
                {project.metrics.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 border-t border-line/40 pt-4 min-[420px]:grid-cols-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="font-display font-bold text-xl text-ink">
                          {m.value}
                        </div>
                        <div className="text-xs text-muted leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    href={`/${locale}/work/${project.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-ink hover:text-muted transition-colors"
                  >
                    <span>{messages.work.viewProject}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Diagram / Mock Artifact */}
              <div className="flex min-w-0 flex-col justify-center space-y-4 rounded-xl border border-line/40 bg-canvas p-4 font-mono text-xs sm:p-6 lg:col-span-5">
                <div className="flex min-w-0 items-center justify-between gap-3 border-b border-line/40 pb-2 text-muted">
                  <span className="min-w-0 break-all">SYSTEM_DIAGRAM // {project.slug}</span>
                  <span className="w-2 h-2 rounded-full bg-signal" />
                </div>

                <div className="space-y-2 text-ink">
                  <div className="p-3 rounded bg-paper border border-line/60">
                    <div className="font-bold text-xs">STAGE: {project.stage.toUpperCase()}</div>
                    <div className="text-[11px] text-muted">{project.localizedContent.contribution}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded bg-graphite/5 text-[10px] text-muted">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Capability Constellation Section */}
      <section className="space-y-8 rounded-2xl border border-line/60 bg-paper p-5 sm:p-8">
        <div className="space-y-2">
          <span className="mono-label text-xs text-muted">Capability Architecture</span>
          <h2 className="font-display text-3xl font-bold text-ink">
            {locale === 'en' ? 'Skill & Domain Constellation' : 'Ma trận Năng lực & Miền Chuyên môn'}
          </h2>
          <p className="text-sm text-muted max-w-2xl">
            {locale === 'en'
              ? 'Every claimed capability is tied directly to underlying technologies, architectural patterns, and verified deliverables.'
              : 'Mọi năng lực chuyên môn đều được liên kết trực tiếp với các công nghệ nền tảng và minh chứng thực hiện.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-canvas border border-line/60 space-y-3">
            <h3 className="font-bold text-sm text-ink font-display">System Architecture</h3>
            <ul className="space-y-2 text-muted">
              <li>• Multi-Tenant Domain Isolation</li>
              <li>• Service Boundaries & Microservices</li>
              <li>• RBAC & Membership Models</li>
              <li>• REST API & Data Schema Design</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-canvas border border-line/60 space-y-3">
            <h3 className="font-bold text-sm text-ink font-display">Data & Intelligence</h3>
            <ul className="space-y-2 text-muted">
              <li>• Machine Learning (XGBoost/LightGBM)</li>
              <li>• SHAP Model Explainability</li>
              <li>• dbt & Star-Schema Data Modeling</li>
              <li>• SQL ETL & Funnel Telemetry</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-canvas border border-line/60 space-y-3">
            <h3 className="font-bold text-sm text-ink font-display">Product Strategy</h3>
            <ul className="space-y-2 text-muted">
              <li>• Product Discovery & Requirement Specs</li>
              <li>• RICE Backlog Prioritization</li>
              <li>• Checkout Conversion Optimization</li>
              <li>• User Journey Telemetry Mapping</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
