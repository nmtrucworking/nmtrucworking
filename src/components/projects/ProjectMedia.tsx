'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ArrowUpRight, Database, Layers, LineChart, Maximize2, X, ExternalLink } from 'lucide-react';
import type { ProjectAsset } from '@/content/load';

interface ProjectMediaProps {
  asset?: ProjectAsset;
  projectTitle: string;
  projectSlug: string;
  role: string;
  locale: 'en' | 'vi';
  compact?: boolean;
  variant?: 'default' | 'compact' | 'hero';
}

export function ProjectMedia({
  asset,
  projectTitle,
  projectSlug,
  role,
  locale,
  compact = false,
  variant = 'default',
}: ProjectMediaProps) {
  const isHero = variant === 'hero';
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomOpen(false);
    };

    if (isZoomOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomOpen]);

  const altText = asset ? (asset.alt[locale] || asset.alt.en) : projectTitle;

  if (isHero) {
    return (
      <>
        <div className="group relative w-full overflow-hidden rounded-2xl border border-line/70 bg-[#0E0F12] shadow-2xl transition-all">
          {/* Top Browser / Canvas Chrome */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#141519] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[11px] text-canvas/50">
                {projectSlug} • {asset ? `${asset.width}×${asset.height}` : 'preview'}
              </span>
            </div>

            {asset && (
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="flex items-center gap-1.5 rounded border border-white/15 px-2.5 py-1 text-[11px] font-mono text-canvas/70 transition-colors hover:border-signal hover:text-signal"
                aria-label="Inspect interface full screen"
              >
                <Maximize2 className="h-3 w-3" />
                <span className="hidden sm:inline">{locale === 'vi' ? 'Xem toàn cảnh' : 'Full Screen'}</span>
              </button>
            )}
          </div>

          {/* Hero Image Container with Native Aspect Ratio */}
          <div
            className={`relative w-full aspect-[16/10] max-h-[38rem] bg-gradient-to-b from-[#16171B] to-[#0A0A0D] ${
              asset ? 'cursor-zoom-in' : ''
            }`}
            onClick={() => asset && setIsZoomOpen(true)}
          >
            {asset ? (
              <Image
                src={asset.src}
                alt={altText}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-contain sm:object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              />
            ) : (
              <div className="project-media__fallback" aria-label={projectTitle}>
                <div className="project-media__grid" aria-hidden="true" />
                <div className="project-media__signal" aria-hidden="true" />
                <div className="project-media__fallback-content">
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label text-[10px] text-canvas/55">{role} / {projectSlug}</span>
                    <ArrowUpRight className="h-4 w-4 text-signal" />
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-display text-xl font-semibold text-canvas sm:text-2xl">{projectTitle}</span>
                    {role === 'DA' ? <LineChart className="h-7 w-7 text-signal/80" /> : role === 'SA' ? <Layers className="h-7 w-7 text-signal/80" /> : <Database className="h-7 w-7 text-signal/80" />}
                  </div>
                </div>
              </div>
            )}

            {/* Click to expand hover hint */}
            {asset && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs font-medium text-canvas shadow-xl backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5 text-signal" />
                  <span>{locale === 'vi' ? 'Nhấn để phóng to toàn màn hình' : 'Click to inspect full resolution'}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal via Portal */}
        {isZoomOpen && mounted && asset &&
          createPortal(
            <div
              className="fixed inset-0 z-[99999] flex flex-col bg-black/95 text-canvas backdrop-blur-md animate-fadeIn"
              role="dialog"
              aria-modal="true"
              aria-label={altText}
            >
              <div className="flex items-center justify-between border-b border-white/15 bg-[#0B0B0E]/90 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="mono-label text-xs font-bold text-signal">
                    {projectTitle} — INTERFACE SURFACE
                  </span>
                  <span className="hidden sm:inline font-mono text-xs text-canvas/50">
                    {asset.width} × {asset.height} px
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={asset.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-white/20 px-3 text-xs text-canvas hover:border-signal"
                  >
                    <span>{locale === 'vi' ? 'Mở tab mới' : 'Open Tab'}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 text-canvas hover:border-signal hover:bg-white/10"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div
                className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsZoomOpen(false);
                }}
              >
                <img
                  src={asset.src}
                  alt={altText}
                  className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                />
              </div>

              <div className="border-t border-white/10 bg-[#0B0B0E]/90 px-4 py-2 text-center text-xs text-canvas/60 font-mono">
                {locale === 'vi' ? 'Nhấn ESC hoặc nhấp bên ngoài để đóng' : 'Press ESC or click backdrop to close'}
              </div>
            </div>,
            document.body
          )
        }
      </>
    );
  }

  return (
    <div className={`project-media ${compact ? 'project-media--compact' : ''}`}>
      {asset ? (
        <Image
          src={asset.src}
          alt={altText}
          fill
          sizes={compact ? '(max-width: 767px) 100vw, 42vw' : '(max-width: 1023px) 100vw, 42vw'}
          className="project-media__image"
        />
      ) : (
        <div className="project-media__fallback" aria-label={projectTitle}>
          <div className="project-media__grid" aria-hidden="true" />
          <div className="project-media__signal" aria-hidden="true" />
          <div className="project-media__fallback-content">
            <div className="flex items-center justify-between gap-3">
              <span className="mono-label text-[10px] text-canvas/55">{role} / {projectSlug}</span>
              <ArrowUpRight className="h-4 w-4 text-signal" />
            </div>
            <div className="flex items-end justify-between gap-4">
              <span className="font-display text-xl font-semibold text-canvas sm:text-2xl">{projectTitle}</span>
              {role === 'DA' ? <LineChart className="h-7 w-7 text-signal/80" /> : role === 'SA' ? <Layers className="h-7 w-7 text-signal/80" /> : <Database className="h-7 w-7 text-signal/80" />}
            </div>
          </div>
        </div>
      )}
      <div className="project-media__label mono-label" aria-hidden="true">
        {asset ? (asset.type === 'diagram' ? 'SYSTEM DIAGRAM' : 'PROJECT MEDIA') : locale === 'vi' ? 'ĐANG HOÀN THIỆN MEDIA' : 'MEDIA IN PROGRESS'}
      </div>
    </div>
  );
}