import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, loadMessages } from '@/content/load';
import { getProfile } from '@/content/selectors';
import { buildLocalizedMetadata } from '@/lib/seo';
import { ArrowRight, Award, Compass, Database, Layers, LineChart, Shield } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return buildLocalizedMetadata({
    locale,
    path: '/about',
    title: locale === 'vi' ? 'Giới thiệu Nguyễn Minh Trúc' : 'About Nguyễn Minh Trúc',
    description:
      locale === 'vi'
        ? 'Tìm hiểu định hướng, triết lý làm việc, ma trận năng lực và phương pháp luận hệ thống của Nguyễn Minh Trúc.'
        : 'Learn about Nguyễn Minh Trúc’s positioning, philosophy, capabilities matrix, and system methodology.',
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = getProfile(locale);

  return (
    <div className="space-y-10 py-2 sm:space-y-14 sm:py-4">
      {/* Title */}
      <div className="space-y-2.5 border-b border-line/60 pb-6">
        <span className="mono-label text-[11px] text-muted">About & Background</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          {messages.about.title}
        </h1>
        <p className="max-w-3xl text-sm font-normal leading-relaxed text-muted sm:text-base">
          {messages.about.subtitle}
        </p>
      </div>

      {/* 01 // Positioning & Philosophy */}
      <section className="grid grid-cols-1 items-start gap-5 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 space-y-1.5">
          <span className="mono-label text-[11px] text-muted">01 // PHILOSOPHY</span>
          <h2 className="font-display text-xl font-bold text-ink">
            {messages.about.positioningHeading}
          </h2>
        </div>

        <div className="space-y-4 rounded-xl border border-line/60 bg-paper p-5 sm:p-6 md:col-span-8">
          <p className="text-base text-ink font-serif leading-relaxed italic">
            &ldquo;{profile.positioningText}&rdquo;
          </p>
          <div className="space-y-3 text-muted text-xs sm:text-sm leading-relaxed font-sans">
            <p>
              {locale === 'en'
                ? 'Modern organizations produce vast amounts of data, yet struggle with architectural fragmentation and ambiguous business requirements. My approach bridges the gap between software design, data modeling, and business execution.'
                : 'Các tổ chức hiện đại tạo ra khối lượng dữ liệu khổng lồ nhưng thường gặp khó khăn với sự phân mảnh kiến trúc và yêu cầu nghiệp vụ chưa rõ ràng. Phương pháp của tôi là cầu nối giữa thiết kế phần mềm, mô hình hóa dữ liệu và thực thi sản phẩm.'}
            </p>
            <p>
              {locale === 'en'
                ? 'Whether acting as a System Analyst designing multi-tenant SaaS boundaries, a Data Scientist building explainable ML models, or a Product Manager steering feature discovery, I focus on measurable evidence and sustainable structures.'
                : 'Dù ở vai trò Phân tích Hệ thống (SA) thiết kế ranh giới SaaS đa tổ chức, Khoa học Dữ liệu (DS) xây dựng mô hình ML giải trình được, hay Quản lý Sản phẩm (Product) dẫn dắt Product Discovery, tôi luôn tập trung vào minh chứng có thể đo lường và cấu trúc bền vững.'}
            </p>
          </div>
        </div>
      </section>

      {/* 02 // Target Roles Breakdown */}
      <section className="space-y-5">
        <div className="border-b border-line/60 pb-3">
          <span className="mono-label text-[11px] text-muted">02 // CAPABILITIES MATRIX</span>
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
            {messages.about.capabilitiesHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-xl border border-line/60 bg-paper space-y-2">
            <div className="flex items-start justify-between gap-3">
              <span className="mono-label min-w-0 text-[11px] font-bold text-ink">DATA ANALYST (DA) & DATA SCIENTIST (DS)</span>
              <LineChart className="h-4 w-4 shrink-0 text-muted" />
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {locale === 'en'
                ? 'Exploratory data analysis, SQL/dbt data modeling, predictive modeling (XGBoost/LightGBM), SHAP model interpretability, and operational BI dashboards.'
                : 'Phân tích dữ liệu khám phá, mô hình hóa SQL/dbt, dự báo ML (XGBoost/LightGBM), giải trình SHAP và dashboard BI vận hành.'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-line/60 bg-paper space-y-2">
            <div className="flex items-start justify-between gap-3">
              <span className="mono-label min-w-0 text-[11px] font-bold text-ink">BUSINESS ANALYST (BA) & SYSTEM ANALYST (SA)</span>
              <Layers className="h-4 w-4 shrink-0 text-muted" />
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {locale === 'en'
                ? 'Use-case baseline definition, domain service boundaries, multi-tenant RBAC policies, business rule validation, and REST API schemas.'
                : 'Xác định use-case baseline, ranh giới dịch vụ miền, chính sách RBAC đa tenant, chuẩn hóa business rule và schema REST API.'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-line/60 bg-paper space-y-2 md:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <span className="mono-label text-[11px] font-bold text-ink">PRODUCT MANAGER (PRODUCT)</span>
              <Database className="h-4 w-4 shrink-0 text-muted" />
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {locale === 'en'
                ? 'Product discovery, telemetry funnel mapping, checkout conversion optimization, RICE backlog prioritization, and cross-functional team alignment.'
                : 'Product discovery, theo dõi telemetry phễu chuyển đổi, tối ưu thanh toán e-commerce, ưu tiên backlog RICE và phối hợp liên phòng ban.'}
            </p>
          </div>
        </div>
      </section>

      {/* 03 // System Methodology */}
      <section className="space-y-4 rounded-xl bg-graphite p-5 text-canvas sm:p-6">
        <span className="mono-label text-[11px] text-canvas/65">03 // SYSTEM METHODOLOGY</span>
        <h2 className="font-display text-xl font-bold sm:text-2xl">
          {messages.about.methodologyHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs text-canvas/80 pt-2">
          <div className="p-3.5 rounded-lg bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-canvas">1. INPUT</div>
            <div className="text-[11px] text-canvas/65">Gather requirements, telemetry, raw domain signals</div>
          </div>
          <div className="p-3.5 rounded-lg bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-canvas">2. INTERPRET</div>
            <div className="text-[11px] text-canvas/65">Identify bottlenecks, noise, data distributions</div>
          </div>
          <div className="p-3.5 rounded-lg bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-canvas">3. STRUCTURE</div>
            <div className="text-[11px] text-canvas/65">Design schemas, service bounds, RBAC rules</div>
          </div>
          <div className="p-3.5 rounded-lg bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-canvas">4. BUILD</div>
            <div className="text-[11px] text-canvas/65">Implement code, models, pipelines, & UX</div>
          </div>
          <div className="p-3.5 rounded-lg bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-canvas">5. EVALUATE</div>
            <div className="text-[11px] text-canvas/65">Measure ROC-AUC, latency, conversion lift</div>
          </div>
        </div>
      </section>

      {/* 04 // Leadership, Organizations & Personal Journey Hub Gateway (No duplicate cards) */}
      <section className="space-y-6 border-t border-line/60 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="space-y-1.5 md:col-span-4">
            <span className="mono-label text-[11px] text-muted">04 // ROLES, JOURNEY &amp; HONORS</span>
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {messages.about.communityHeading}
            </h2>
          </div>
          <div className="space-y-2.5 md:col-span-8">
            <p className="max-w-3xl font-serif text-base italic leading-relaxed text-ink sm:text-lg">
              “{messages.about.communityLead}”
            </p>
            <p className="max-w-3xl text-xs leading-relaxed text-muted sm:text-sm">
              {messages.about.communityIntro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href={`/${locale}/journey#roles`}
            className="group flex flex-col justify-between space-y-3 rounded-xl border border-line/60 bg-paper p-5 transition-all hover:border-ink/40"
          >
            <div className="space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink">
                <Shield className="h-4 w-4" />
              </div>
              <span className="mono-label block text-[10px] text-muted">
                01 // ROLES &amp; AFFILIATIONS
              </span>
              <h3 className="font-display text-base font-bold text-ink group-hover:underline">
                {messages.rolesAffiliations.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'vi'
                  ? 'Tư cách Đảng viên ĐCSVN, Thành viên Ban Công nghệ NJEC, Technical Lead tại NIIC và các hoạt động cộng đồng.'
                  : 'CPV membership, NJEC Technology Committee, Technical Lead at NIIC, and student community engagement.'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-ink">
              <span>{locale === 'vi' ? 'Xem phân hệ Vai trò' : 'Inspect Roles'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link
            href={`/${locale}/journey#timeline`}
            className="group flex flex-col justify-between space-y-3 rounded-xl border border-line/60 bg-paper p-5 transition-all hover:border-ink/40"
          >
            <div className="space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink">
                <Compass className="h-4 w-4" />
              </div>
              <span className="mono-label block text-[10px] text-muted">
                02 // MY JOURNEY TIMELINE
              </span>
              <h3 className="font-display text-base font-bold text-ink group-hover:underline">
                {locale === 'vi' ? 'Lịch sử Cá nhân & Hoạt động' : 'Personal & Activity Timeline'}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'vi'
                  ? 'Dòng thời gian tương tác các cột mốc học thuật, hoạt động câu lạc bộ, sự kiện tập huấn và dẫn dắt kỹ thuật.'
                  : 'Interactive chronological timeline across academic training, club operations, events, and leadership milestones.'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-ink">
              <span>{locale === 'vi' ? 'Xem dòng thời gian' : 'Explore Timeline'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link
            href={`/${locale}/journey#awards`}
            className="group flex flex-col justify-between space-y-3 rounded-xl border border-line/60 bg-paper p-5 transition-all hover:border-ink/40"
          >
            <div className="space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-canvas text-ink">
                <Award className="h-4 w-4" />
              </div>
              <span className="mono-label block text-[10px] text-muted">
                03 // HONORS &amp; RECOGNITIONS
              </span>
              <h3 className="font-display text-base font-bold text-ink group-hover:underline">
                {messages.awards.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'vi'
                  ? 'Các ghi nhận triển khai thực tế, đóng góp tổ chức và tham gia cuộc thi học thuật kèm minh chứng.'
                  : 'Verified institutional deployments, organizational contribution records, and academic hackathon participation.'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-ink">
              <span>{locale === 'vi' ? 'Xem thành tích & minh chứng' : 'View Recognitions'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-line/60 bg-paper p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="min-w-0 space-y-1">
          <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
            {messages.about.contactHeading}
          </h3>
          <p className="text-xs text-muted sm:text-sm">
            {locale === 'en'
              ? 'Available for full-time opportunities, high-impact consulting, and technical collaboration.'
              : 'Sẵn sàng thảo luận về cơ hội công việc chính thức, tư vấn giải pháp và hợp tác kỹ thuật.'}
          </p>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-lg bg-ink px-5 py-2.5 text-xs font-semibold text-canvas transition-all hover:bg-graphite sm:w-auto"
        >
          {messages.hero.ctaContact} →
        </Link>
      </section>
    </div>
  );
}
