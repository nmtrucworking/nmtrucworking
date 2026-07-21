import React from 'react';
import Link from 'next/link';
import { Locale, loadMessages } from '@/content/load';
import { getProfile } from '@/content/selectors';
import { ArrowUpRight, CheckCircle2, Cpu, Database, Layers, LineChart } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);
  const profile = getProfile(locale);

  return (
    <div className="space-y-12 py-3 sm:space-y-16 sm:py-6">
      {/* Title */}
      <div className="space-y-4 border-b border-line/60 pb-8">
        <span className="mono-label text-xs text-muted">About & Background</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          {messages.about.title}
        </h1>
        <p className="max-w-3xl text-lg font-light leading-relaxed text-muted sm:text-xl">
          {messages.about.subtitle}
        </p>
      </div>

      {/* Positioning & Philosophy */}
      <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 space-y-2">
          <span className="mono-label text-xs text-muted">01 // PHILOSOPHY</span>
          <h2 className="font-display text-2xl font-bold text-ink">
            {messages.about.positioningHeading}
          </h2>
        </div>

        <div className="space-y-6 rounded-2xl border border-line/60 bg-paper p-5 sm:p-8 md:col-span-8">
          <p className="text-lg text-ink font-serif leading-relaxed italic">
            "{profile.positioningText}"
          </p>
          <div className="space-y-4 text-muted text-base leading-relaxed font-sans">
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

      {/* Target Roles Breakdown */}
      <section className="space-y-8">
        <div className="border-b border-line/60 pb-4">
          <span className="mono-label text-xs text-muted">02 // CAPABILITIES MATRIX</span>
          <h2 className="font-display text-3xl font-bold text-ink">
            {messages.about.capabilitiesHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-line/60 bg-paper space-y-3">
            <div className="flex items-start justify-between gap-3">
              <span className="mono-label min-w-0 text-xs font-bold text-ink">DATA ANALYST (DA) & DATA SCIENTIST (DS)</span>
              <LineChart className="h-5 w-5 shrink-0 text-muted" />
            </div>
            <p className="text-sm text-muted">
              {locale === 'en'
                ? 'Exploratory data analysis, SQL/dbt data modeling, predictive modeling (XGBoost/LightGBM), SHAP model interpretability, and operational BI dashboards.'
                : 'Phân tích dữ liệu khám phá, mô hình hóa SQL/dbt, dự báo ML (XGBoost/LightGBM), giải trình SHAP và dashboard BI vận hành.'}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-line/60 bg-paper space-y-3">
            <div className="flex items-start justify-between gap-3">
              <span className="mono-label min-w-0 text-xs font-bold text-ink">BUSINESS ANALYST (BA) & SYSTEM ANALYST (SA)</span>
              <Layers className="h-5 w-5 shrink-0 text-muted" />
            </div>
            <p className="text-sm text-muted">
              {locale === 'en'
                ? 'Use-case baseline definition, domain service boundaries, multi-tenant RBAC policies, business rule validation, and REST API schemas.'
                : 'Xác định use-case baseline, ranh giới dịch vụ miền, chính sách RBAC đa tenant, chuẩn hóa business rule và schema REST API.'}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-line/60 bg-paper space-y-3 md:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <span className="mono-label text-xs font-bold text-ink">PRODUCT MANAGER (PRODUCT)</span>
              <Database className="h-5 w-5 shrink-0 text-muted" />
            </div>
            <p className="text-sm text-muted">
              {locale === 'en'
                ? 'Product discovery, telemetry funnel mapping, checkout conversion optimization, RICE backlog prioritization, and cross-functional team alignment.'
                : 'Product discovery, theo dõi telemetry phễu chuyển đổi, tối ưu thanh toán e-commerce, ưu tiên backlog RICE và phối hợp liên phòng ban.'}
            </p>
          </div>
        </div>
      </section>

      {/* System Methodology */}
      <section className="space-y-6 rounded-2xl bg-graphite p-5 text-canvas sm:p-8">
        <span className="mono-label text-xs text-signal">03 // SYSTEM METHODOLOGY</span>
        <h2 className="font-display text-3xl font-bold">
          {messages.about.methodologyHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 font-mono text-xs text-canvas/80 pt-4">
          <div className="p-4 rounded bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-signal">1. INPUT</div>
            <div className="text-[11px]">Gather requirements, telemetry, raw domain signals</div>
          </div>
          <div className="p-4 rounded bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-signal">2. INTERPRET</div>
            <div className="text-[11px]">Identify bottlenecks, noise, data distributions</div>
          </div>
          <div className="p-4 rounded bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-signal">3. STRUCTURE</div>
            <div className="text-[11px]">Design schemas, service bounds, RBAC rules</div>
          </div>
          <div className="p-4 rounded bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-signal">4. BUILD</div>
            <div className="text-[11px]">Implement code, models, pipelines, & UX</div>
          </div>
          <div className="p-4 rounded bg-canvas/5 border border-canvas/10 space-y-1">
            <div className="font-bold text-signal">5. EVALUATE</div>
            <div className="text-[11px]">Measure ROC-AUC, latency, conversion lift</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line/60 bg-paper p-5 sm:flex-row sm:items-center sm:p-8">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold text-ink">
            {messages.about.contactHeading}
          </h3>
          <p className="text-sm text-muted">
            {locale === 'en'
              ? 'Available for full-time opportunities, high-impact consulting, and technical collaboration.'
              : 'Sẵn sàng thảo luận về cơ hội công việc chính thức, tư vấn giải pháp và hợp tác kỹ thuật.'}
          </p>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-all hover:bg-graphite sm:w-auto"
        >
          {messages.hero.ctaContact} →
        </Link>
      </section>
    </div>
  );
}
