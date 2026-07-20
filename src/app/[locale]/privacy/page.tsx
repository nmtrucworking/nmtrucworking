import React from 'react';
import { Locale, loadMessages } from '@/content/load';

interface PrivacyPageProps {
  params: { locale: string };
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = params.locale as Locale;
  const messages = loadMessages(locale);

  return (
    <div className="space-y-8 py-6 max-w-3xl">
      <div className="space-y-2 border-b border-line/60 pb-6">
        <span className="mono-label text-xs text-muted">Legal & Systems</span>
        <h1 className="font-display text-4xl font-bold text-ink">
          {messages.footer.privacy}
        </h1>
      </div>

      <div className="space-y-6 text-sm text-muted leading-relaxed font-sans">
        <p>
          {locale === 'en'
            ? 'This personal portfolio is designed with privacy-first principles. We do not use third-party tracking cookies or store personal browser data without consent.'
            : 'Trang thông tin cá nhân này được thiết kế theo nguyên tắc ưu tiên quyền riêng tư. Chúng tôi không sử dụng cookie theo dõi của bên thứ ba hoặc lưu trữ dữ liệu cá nhân khi chưa được cho phép.'}
        </p>

        <h2 className="font-display font-bold text-lg text-ink pt-2">
          {locale === 'en' ? 'Data Collection & Analytics' : 'Thu thập Dữ liệu & Phân tích'}
        </h2>
        <p>
          {locale === 'en'
            ? 'Analytics are turned off by default. If optional telemetry is enabled in future releases, it will only collect aggregate, anonymized metrics (e.g., page views, locale preference) without personal identification.'
            : 'Hệ thống phân tích mặc định được tắt. Nếu tính năng đo lường tùy chọn được bật trong các bản phát hành sau, hệ thống chỉ thu thập chỉ số tổng hợp ẩn danh (như số lượt xem trang, lựa chọn ngôn ngữ) mà không định danh cá nhân.'}
        </p>

        <h2 className="font-display font-bold text-lg text-ink pt-2">
          {locale === 'en' ? 'Contact Inquiries' : 'Thông tin Phản hồi & Liên hệ'}
        </h2>
        <p>
          {locale === 'en'
            ? 'Information submitted through the contact form is used exclusively for communication regarding professional opportunities and project inquiries.'
            : 'Thông tin được gửi qua biểu mẫu liên hệ chỉ được sử dụng duy nhất cho mục đích trao đổi công việc và cơ hội hợp tác dự án.'}
        </p>
      </div>
    </div>
  );
}
