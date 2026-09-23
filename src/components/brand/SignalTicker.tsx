'use client';

import React from 'react';
import { Locale } from '@/content/load';

interface SignalTickerProps {
  locale: Locale;
}

export const SignalTicker: React.FC<SignalTickerProps> = ({ locale }) => {
  const items = locale === 'vi'
    ? [
        'PHÂN TÍCH DỮ LIỆU',
        'KHOA HỌC DỮ LIỆU',
        'KIẾN TRÚC HỆ THỐNG',
        'PHÂN TÍCH NGHIỆP VỤ',
        'CHIẾN LƯỢC SẢN PHẨM',
        'MÔ HÌNH HÓA DBT & STAR-SCHEMA',
        'MACHINE LEARNING & GIẢI TRÌNH SHAP',
        'THIẾT KẾ RBAC & ĐA TỔ CHỨC',
        'TỐI ƯU HÓA CHUYỂN ĐỔI PHỄU',
        'ĐO LƯỜNG TELEMETRY & SQL ETL',
      ]
    : [
        'DATA ANALYSIS',
        'DATA SCIENCE',
        'SYSTEM ARCHITECTURE',
        'BUSINESS ANALYSIS',
        'PRODUCT STRATEGY',
        'DBT & STAR-SCHEMA MODELING',
        'MACHINE LEARNING & SHAP EXPLAINABILITY',
        'RBAC & MULTI-TENANT DESIGN',
        'FUNNEL CONVERSION OPTIMIZATION',
        'TELEMETRY METRICS & SQL ETL',
      ];

  // Duplicate items to ensure seamless infinite loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="signal-ticker relative w-full overflow-hidden border-b border-white/10 bg-[#0B0B0D] py-3 text-canvas selection:bg-signal selection:text-ink"
      aria-label="Capabilities and skills ticker"
    >
      {/* Soft gradient edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0B0B0D] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0B0B0D] to-transparent sm:w-24" />

      <div className="signal-ticker-track flex w-max items-center gap-6 hover:[animation-play-state:paused]">
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 text-xs font-medium tracking-[0.18em] text-canvas/70 transition-colors hover:text-signal"
          >
            <span>{item}</span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
