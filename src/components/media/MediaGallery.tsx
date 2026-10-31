'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Maximize2,
  X,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Camera,
  Award,
  Layers,
  ImageOff,
  Clock,
} from 'lucide-react';
import type { LocalizedMediaAsset } from '@/content/selectors';
import type { Locale } from '@/content/load';

interface MediaItemFrameProps {
  asset: LocalizedMediaAsset | null;
  locale: Locale;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  preserveAspectRatio?: boolean;
  compact?: boolean;
  onInspect?: () => void;
}

const mediaTypeLabels: Record<string, { en: string; vi: string }> = {
  portrait: { en: 'PORTRAIT', vi: 'CHÂN DUNG' },
  logo: { en: 'ORGANIZATION LOGO', vi: 'LOGO TỔ CHỨC' },
  activity: { en: 'ACTIVITY MEDIA', vi: 'HÌNH ẢNH HOẠT ĐỘNG' },
  event: { en: 'EVENT ARCHIVE', vi: 'TƯ LIỆU SỰ KIỆN' },
  'team-project': { en: 'PROJECT & TEAM', vi: 'DỰ ÁN & ĐỘI NGŨ' },
  certificate: { en: 'CERTIFICATE / EVIDENCE', vi: 'CHỨNG NHẬN / MINH CHỨNG' },
  archive: { en: 'HISTORICAL ARCHIVE', vi: 'TƯ LIỆU THỜI GIAN' },
  diagram: { en: 'SYSTEM BLUEPRINT', vi: 'SƠ ĐỒ KIẾN TRÚC' },
};

export function MediaItemFrame({
  asset,
  locale,
  fallbackTitle,
  fallbackSubtitle,
  preserveAspectRatio = false,
  compact = false,
  onInspect,
}: MediaItemFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isCertificateOrDiagram =
    preserveAspectRatio || asset?.type === 'certificate' || asset?.type === 'diagram';
  const hasValidImage = Boolean(asset && asset.src && asset.status === 'verified' && !hasError);
  const typeBadge = asset
    ? mediaTypeLabels[asset.type]?.[locale] || asset.type.toUpperCase()
    : locale === 'vi'
    ? 'ĐANG CHỜ MINH CHỨNG'
    : 'EVIDENCE PENDING';

  const TypeIcon =
    asset?.type === 'certificate'
      ? Award
      : asset?.type === 'diagram'
      ? Layers
      : asset?.type === 'event' || asset?.type === 'activity'
      ? Camera
      : FileCheck2;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-line/70 bg-[#101114] text-canvas transition-all ${
        compact ? 'min-h-[8.5rem]' : 'min-h-[11rem]'
      } ${hasValidImage && onInspect ? 'cursor-zoom-in hover:border-white/30' : ''}`}
      onClick={() => {
        if (hasValidImage && onInspect) onInspect();
      }}
      role={hasValidImage && onInspect ? 'button' : undefined}
      tabIndex={hasValidImage && onInspect ? 0 : undefined}
      onKeyDown={(e) => {
        if (hasValidImage && onInspect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onInspect();
        }
      }}
      aria-label={hasValidImage ? asset?.altText : fallbackTitle}
    >
      {/* Top Badge Bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 bg-gradient-to-b from-black/75 via-black/35 to-transparent px-3 py-2">
        <span className="inline-flex items-center gap-1.5 rounded bg-black/65 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-canvas/85 backdrop-blur-sm border border-white/10">
          <TypeIcon className="h-3 w-3" />
          <span>{typeBadge}</span>
        </span>
        {hasValidImage && asset && (
          <span className="rounded bg-black/65 px-2 py-0.5 font-mono text-[10px] text-canvas/70 backdrop-blur-sm border border-white/10">
            {asset.width}×{asset.height}
          </span>
        )}
      </div>

      {hasValidImage && asset && asset.src ? (
        <div
          className={`relative w-full ${
            compact ? 'aspect-[16/10]' : isCertificateOrDiagram ? 'aspect-[4/3]' : 'aspect-[16/10]'
          } bg-[#0B0C0F]`}
        >
          {/* Skeleton Loading Shimmer */}
          {!isLoaded && (
            <div
              className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-[#141519] via-[#22242A] to-[#141519]"
              aria-hidden="true"
            />
          )}

          <Image
            src={asset.src}
            alt={asset.altText}
            fill
            loading="lazy"
            sizes={
              compact
                ? '(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw'
                : '(max-width: 1024px) 100vw, 800px'
            }
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`transition-all duration-500 ${
              isCertificateOrDiagram
                ? 'object-contain p-2 sm:p-3'
                : 'object-cover object-top group-hover:scale-[1.02]'
            } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Hover Inspect Hint */}
          {onInspect && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/85 px-3 py-1 font-mono text-[11px] font-medium text-canvas shadow-lg backdrop-blur-sm">
                <Maximize2 className="h-3.5 w-3.5 text-canvas" />
                <span>{locale === 'vi' ? 'Nhấn để phóng to' : 'Click to inspect'}</span>
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Structured Missing / Pending Evidence State (Never fake or AI-generated) */
        <div
          className={`relative flex flex-col justify-between p-3.5 sm:p-4 ${
            compact ? 'min-h-[8.5rem]' : 'min-h-[11rem]'
          } bg-gradient-to-br from-[#16171B] via-[#101114] to-[#0A0B0D]`}
        >
          <div className="project-media__grid opacity-20" aria-hidden="true" />
          <div className="relative z-10 pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-canvas/75">
              {hasError ? (
                <>
                  <ImageOff className="h-3 w-3" />
                  <span>{locale === 'vi' ? 'Không tải được ảnh' : 'Media unavailable'}</span>
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3" />
                  <span>
                    {locale === 'vi'
                      ? 'Chờ cập nhật ảnh / bản scan thực tế'
                      : 'Awaiting verified photo / document scan'}
                  </span>
                </>
              )}
            </span>
          </div>

          <div className="relative z-10 space-y-1 pt-3">
            <div className="font-display text-xs font-semibold text-canvas sm:text-sm line-clamp-2">
              {asset ? asset.altText : fallbackTitle}
            </div>
            <p className="text-[11px] text-canvas/55 line-clamp-2 leading-relaxed">
              {asset
                ? asset.captionText
                : fallbackSubtitle ||
                  (locale === 'vi'
                    ? 'Không sử dụng ảnh giả lập AI. Khung tư liệu sẽ hiển thị ngay khi chủ sở hữu bổ sung ảnh gốc.'
                    : 'No AI-generated placeholder used. This slot renders automatically once the owner uploads original media.')}
            </p>
          </div>
        </div>
      )}

      {/* Caption Bar for Verified Images */}
      {hasValidImage && asset && !compact && (
        <div className="border-t border-white/10 bg-[#0D0E11] px-3 py-2">
          <p className="text-xs text-canvas/80 leading-relaxed line-clamp-2">{asset.captionText}</p>
          {asset.creditsText && (
            <p className="mt-0.5 font-mono text-[10px] text-canvas/45">{asset.creditsText}</p>
          )}
        </div>
      )}
    </div>
  );
}

interface MediaGalleryProps {
  assets: LocalizedMediaAsset[];
  locale: Locale;
  title?: string;
  mode?: 'grid' | 'carousel';
  preserveAspectRatio?: boolean;
}

export function MediaGallery({
  assets,
  locale,
  title,
  mode = 'grid',
  preserveAspectRatio = false,
}: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  const verifiedAssets = assets.filter((a) => Boolean(a.src && a.status === 'verified'));

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomLevel(1);
  }, []);

  const showPrev = useCallback(() => {
    if (verifiedAssets.length <= 1) return;
    setZoomLevel(1);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + verifiedAssets.length) % verifiedAssets.length
    );
  }, [verifiedAssets.length]);

  const showNext = useCallback(() => {
    if (verifiedAssets.length <= 1) return;
    setZoomLevel(1);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % verifiedAssets.length
    );
  }, [verifiedAssets.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === '+' || e.key === '=') setZoomLevel((z) => Math.min(z + 0.35, 3));
      if (e.key === '-') setZoomLevel((z) => Math.max(z - 0.35, 0.75));
      if (e.key === '0') setZoomLevel(1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  if (assets.length === 0) return null;

  const activeLightboxAsset =
    lightboxIndex !== null && verifiedAssets[lightboxIndex]
      ? verifiedAssets[lightboxIndex]
      : null;

  const openAssetInLightbox = (assetId: string) => {
    const idx = verifiedAssets.findIndex((a) => a.id === assetId);
    if (idx !== -1) {
      setZoomLevel(1);
      setLightboxIndex(idx);
    }
  };

  const currentCarouselAsset = assets[carouselIndex] || assets[0];

  return (
    <div className="space-y-4">
      {mode === 'carousel' && assets.length > 1 ? (
        <div className="space-y-3">
          <div className="relative">
            <MediaItemFrame
              asset={currentCarouselAsset}
              locale={locale}
              fallbackTitle={title || currentCarouselAsset.altText}
              preserveAspectRatio={preserveAspectRatio}
              onInspect={
                currentCarouselAsset.src && currentCarouselAsset.status === 'verified'
                  ? () => openAssetInLightbox(currentCarouselAsset.id)
                  : undefined
              }
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCarouselIndex((i) => (i - 1 + assets.length) % assets.length)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-paper text-ink transition-colors hover:border-signal"
                  aria-label={locale === 'vi' ? 'Ảnh trước' : 'Previous image'}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCarouselIndex((i) => (i + 1) % assets.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-paper text-ink transition-colors hover:border-signal"
                  aria-label={locale === 'vi' ? 'Ảnh tiếp theo' : 'Next image'}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs text-muted">
                  {carouselIndex + 1} / {assets.length}
                </span>
              </div>

              {currentCarouselAsset.src && currentCarouselAsset.status === 'verified' && (
                <button
                  type="button"
                  onClick={() => openAssetInLightbox(currentCarouselAsset.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 font-mono text-xs font-semibold text-ink transition-colors hover:border-signal"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-signal" />
                  <span>{locale === 'vi' ? 'Mở Lightbox' : 'Open Lightbox'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-4 ${
            assets.length > 1 ? 'sm:grid-cols-2' : ''
          }`}
        >
          {assets.map((asset) => (
            <MediaItemFrame
              key={asset.id}
              asset={asset}
              locale={locale}
              fallbackTitle={title || asset.altText}
              preserveAspectRatio={preserveAspectRatio}
              onInspect={
                asset.src && asset.status === 'verified'
                  ? () => openAssetInLightbox(asset.id)
                  : undefined
              }
            />
          ))}
        </div>
      )}

      {/* Accessible Fullscreen Lightbox Portal */}
      {activeLightboxAsset &&
        activeLightboxAsset.src &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex flex-col bg-black/95 text-canvas backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxAsset.altText}
          >
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-[#0B0B0E]/95 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <span className="mono-label block truncate text-xs font-bold text-signal">
                  {title || activeLightboxAsset.altText}
                </span>
                <span className="font-mono text-[11px] text-canvas/55">
                  {verifiedAssets.length > 1
                    ? `${(lightboxIndex ?? 0) + 1} / ${verifiedAssets.length} • `
                    : ''}
                  {activeLightboxAsset.width} × {activeLightboxAsset.height} px
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-0.5">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.35, 0.75))}
                    className="flex h-7 w-7 items-center justify-center rounded text-canvas/80 hover:bg-white/10 hover:text-canvas"
                    aria-label={locale === 'vi' ? 'Thu nhỏ' : 'Zoom out'}
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-11 text-center font-mono text-[11px] text-canvas/75">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.35, 3))}
                    className="flex h-7 w-7 items-center justify-center rounded text-canvas/80 hover:bg-white/10 hover:text-canvas"
                    aria-label={locale === 'vi' ? 'Phóng to' : 'Zoom in'}
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="flex h-7 w-7 items-center justify-center rounded text-canvas/80 hover:bg-white/10 hover:text-canvas"
                    aria-label={locale === 'vi' ? 'Đặt lại tỷ lệ' : 'Reset zoom'}
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>

                <a
                  href={activeLightboxAsset.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 text-xs font-medium text-canvas hover:border-signal"
                >
                  <span className="hidden sm:inline">
                    {locale === 'vi' ? 'Mở ảnh gốc' : 'Original'}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-signal" />
                </a>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-canvas hover:border-signal hover:bg-white/15"
                  aria-label={locale === 'vi' ? 'Đóng' : 'Close'}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Viewport */}
            <div
              className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              {verifiedAssets.length > 1 && (
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-canvas transition-colors hover:border-signal sm:left-6"
                  aria-label={locale === 'vi' ? 'Ảnh trước' : 'Previous image'}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div
                className="origin-center transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={activeLightboxAsset.src}
                  alt={activeLightboxAsset.altText}
                  className="max-h-[78vh] w-auto max-w-full rounded-lg border border-white/10 object-contain shadow-2xl"
                />
              </div>

              {verifiedAssets.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-canvas transition-colors hover:border-signal sm:right-6"
                  aria-label={locale === 'vi' ? 'Ảnh tiếp theo' : 'Next image'}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Caption & Keyboard Hint Footer */}
            <div className="border-t border-white/10 bg-[#0B0B0E]/95 px-4 py-3 text-center sm:px-6">
              <p className="mx-auto max-w-3xl text-xs text-canvas/85">
                {activeLightboxAsset.captionText}
              </p>
              <p className="mt-1 font-mono text-[11px] text-canvas/45">
                {activeLightboxAsset.creditsText ? `${activeLightboxAsset.creditsText} • ` : ''}
                {locale === 'vi'
                  ? 'Phím tắt: ←/→ chuyển ảnh, +/- phóng to/thu nhỏ, ESC để đóng'
                  : 'Shortcuts: ←/→ navigate, +/- zoom, ESC to close'}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
