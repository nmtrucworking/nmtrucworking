'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Maximize2,
  X,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import type { ProjectAsset } from '@/content/load';

interface DiagramViewerProps {
  asset: ProjectAsset;
  locale: 'en' | 'vi';
  projectTitle: string;
}

export function DiagramViewer({ asset, locale, projectTitle }: DiagramViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);
  const altText = asset.alt[locale] || asset.alt.en;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setZoomLevel(1);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.4, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.4, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  const modalContent = isOpen && mounted ? (
    createPortal(
      <div
        className="fixed inset-0 z-[99999] flex flex-col bg-black/95 text-canvas backdrop-blur-md animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-label={altText}
      >
        {/* Fullscreen Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-[#0B0B0E]/90 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal/20 text-signal">
              <Layers className="h-4 w-4" />
            </span>
            <div>
              <span className="mono-label text-xs font-bold text-signal block">
                {locale === 'vi' ? 'SƠ ĐỒ KIẾN TRÚC TOÀN CẢNH' : 'SYSTEM ARCHITECTURE BLUEPRINT'}
              </span>
              <span className="text-[11px] text-canvas/50 font-mono hidden sm:inline">
                {projectTitle} • {asset.width} × {asset.height} px
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-0.5">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.8}
                className="flex h-7 w-7 items-center justify-center rounded text-canvas/75 hover:bg-white/10 hover:text-canvas disabled:opacity-30"
                title={locale === 'vi' ? 'Thu nhỏ' : 'Zoom out'}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="px-1 text-[11px] font-mono text-canvas/70 min-w-10 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="flex h-7 w-7 items-center justify-center rounded text-canvas/75 hover:bg-white/10 hover:text-canvas disabled:opacity-30"
                title={locale === 'vi' ? 'Phóng to' : 'Zoom in'}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="flex h-7 w-7 items-center justify-center rounded text-canvas/75 hover:bg-white/10 hover:text-canvas"
                title={locale === 'vi' ? 'Đặt lại kích thước' : 'Reset zoom'}
                aria-label="Reset zoom"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>

            <a
              href={asset.src}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 text-xs font-medium text-canvas hover:border-signal hover:bg-white/10"
              title={locale === 'vi' ? 'Mở ảnh gốc trong tab mới' : 'Open original in new tab'}
            >
              <span>{locale === 'vi' ? 'Tab mới' : 'Open Tab'}</span>
              <ExternalLink className="h-3.5 w-3.5 text-signal" />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-canvas hover:border-signal hover:bg-white/15"
              aria-label={locale === 'vi' ? 'Đóng' : 'Close'}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Viewport */}
        <div
          className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 cursor-grab active:cursor-grabbing select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={asset.src}
              alt={altText}
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              draggable={false}
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-white/10 bg-[#0B0B0E]/90 px-4 py-2 text-center text-xs text-canvas/60 font-mono">
          <span>{altText}</span> •{' '}
          <span className="text-canvas/40">
            {locale === 'vi' ? 'Nhấn ESC hoặc nhấp bên ngoài để đóng' : 'Press ESC or click backdrop to close'}
          </span>
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <>
      <figure className="my-6 overflow-hidden rounded-2xl border border-line/70 bg-[#0F1012] text-canvas shadow-xl">
        {/* Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-signal/15 text-signal">
              <Layers className="h-3.5 w-3.5" />
            </span>
            <span className="mono-label text-xs font-semibold tracking-wider text-canvas">
              {locale === 'vi' ? 'SƠ ĐỒ KIẾN TRÚC HỆ THỐNG' : 'SYSTEM ARCHITECTURE BLUEPRINT'}
            </span>
            <span className="hidden rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-canvas/60 sm:inline-block">
              {asset.width} × {asset.height}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-canvas/85 transition-colors hover:border-signal/60 hover:bg-white/10 hover:text-canvas"
              aria-label={locale === 'vi' ? 'Phóng to sơ đồ kiến trúc' : 'Zoom architecture diagram'}
            >
              <ZoomIn className="h-3.5 w-3.5 text-signal" />
              <span>{locale === 'vi' ? 'Phóng to' : 'Expand'}</span>
            </button>

            <a
              href={asset.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-canvas/60 transition-colors hover:border-white/30 hover:text-canvas"
              title={locale === 'vi' ? 'Mở ảnh gốc trong tab mới' : 'Open original image in new tab'}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive Image Frame with Natural Aspect Ratio */}
        <div
          className="group relative cursor-zoom-in overflow-hidden bg-gradient-to-b from-[#141518] to-[#0A0A0C] p-2 sm:p-4"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-[#090A0C]">
            <Image
              src={asset.src}
              alt={altText}
              width={asset.width || 1600}
              height={asset.height || 1000}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              priority
            />
            {/* Subtle overlay hint */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs font-medium text-canvas shadow-xl backdrop-blur-sm">
                <Maximize2 className="h-3.5 w-3.5 text-signal" />
                <span>{locale === 'vi' ? 'Nhấn để xem toàn màn hình' : 'Click to inspect full resolution'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Caption & System Summary */}
        <figcaption className="border-t border-white/10 bg-[#0B0B0D] px-4 py-3 sm:px-6">
          <p className="text-xs text-canvas/75 leading-relaxed">
            <strong className="text-signal font-medium">{projectTitle}:</strong> {altText}
          </p>
        </figcaption>
      </figure>

      {modalContent}
    </>
  );
}
