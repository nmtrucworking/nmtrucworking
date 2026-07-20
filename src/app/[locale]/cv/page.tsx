import React from 'react';
import { Locale, loadMessages, loadProfile } from '@/content/load';
import { Download, FileText, Calendar, MapPin, Mail, ExternalLink } from 'lucide-react';

interface CVPageProps {
  params: { locale: string };
}

export default function CVPage({ params }: CVPageProps) {
  const locale = params.locale as Locale;
  const messages = loadMessages(locale);
  const profile = loadProfile();

  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto">
      {/* Title & Download Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-line/60 pb-8">
        <div className="space-y-2">
          <span className="mono-label text-xs text-muted">Curriculum Vitae</span>
          <h1 className="font-display text-4xl font-bold text-ink tracking-tight">
            {messages.cv.title}
          </h1>
          <p className="text-sm text-muted">
            {messages.cv.updated}: {profile.cv.updatedAt}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.cv.files.en}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-ink text-canvas text-xs font-mono font-bold hover:bg-graphite transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-signal" />
            <span>{messages.cv.downloadEN}</span>
          </a>
          <a
            href={profile.cv.files.vi}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg border border-line bg-paper text-ink text-xs font-mono font-bold hover:bg-canvas transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-muted" />
            <span>{messages.cv.downloadVI}</span>
          </a>
        </div>
      </div>

      {/* Online CV Card View */}
      <div className="p-8 sm:p-12 rounded-2xl border border-line/60 bg-paper space-y-12 shadow-sm font-sans">
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

        {/* Practical Experience Highlights */}
        <div className="space-y-6">
          <h3 className="mono-label text-xs text-muted font-bold tracking-wider">// SELECTED PROJECT EXPERIENCE</h3>

          <div className="space-y-8 font-sans">
            <div className="space-y-2 border-l-2 border-line/80 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-ink">
                  Operations Hub — Lead System Analyst
                </h4>
                <span className="mono-label text-xs text-muted">2026</span>
              </div>
              <p className="text-sm text-muted">
                {locale === 'en'
                  ? 'Designed tenant isolation model, domain service boundaries, and RBAC security rules for multi-organization SaaS architecture.'
                  : 'Thiết kế mô hình cô lập tenant, ranh giới dịch vụ miền và quy tắc bảo mật RBAC cho kiến trúc SaaS đa tổ chức.'}
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-line/80 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-ink">
                  Customer Churn Intelligence — Data Scientist
                </h4>
                <span className="mono-label text-xs text-muted">2025 - 2026</span>
              </div>
              <p className="text-sm text-muted">
                {locale === 'en'
                  ? 'Developed predictive XGBoost churn engine (ROC-AUC 0.892) with SHAP explainability for proactive retention targeting.'
                  : 'Phát triển mô hình dự báo rời bỏ XGBoost (ROC-AUC 0.892) kết hợp giải trình SHAP hỗ trợ giữ chân khách hàng.'}
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-line/80 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-ink">
                  Supply Chain Analytics — Data Analyst
                </h4>
                <span className="mono-label text-xs text-muted">2025</span>
              </div>
              <p className="text-sm text-muted">
                {locale === 'en'
                  ? 'Built unified Star-Schema dbt models and Power BI dashboards reducing stockout rates by 34%.'
                  : 'Xây dựng mô hình dữ liệu dbt Star-Schema và Power BI dashboard giúp giảm 34% tỷ lệ đứt gãy hàng tồn kho.'}
              </p>
            </div>
          </div>
        </div>

        {/* Education & Training */}
        <div className="space-y-3">
          <h3 className="mono-label text-xs text-muted font-bold tracking-wider">// EDUCATION & FOUNDATIONS</h3>
          <div className="space-y-1 text-sm text-ink">
            <div className="font-bold">Information Systems / Computer Science</div>
            <div className="text-muted text-xs font-mono">B.S. Information Systems Degree</div>
          </div>
        </div>
      </div>
    </div>
  );
}
