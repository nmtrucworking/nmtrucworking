'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  X,
  FolderGit2,
  Milestone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { AwardCategory, AwardType, Locale } from '@/content/load';
import type { getAwards } from '@/content/selectors';
import { MediaGallery, MediaItemFrame } from '@/components/media/MediaGallery';

type LocalizedAward = ReturnType<typeof getAwards>[number];

interface AwardsShowcaseProps {
  locale: Locale;
  awards: LocalizedAward[];
  messages: any;
  sectionNumber?: string;
}

interface CardVisualConfig {
  visualSrc: string;
  accentColor: string;
  pillBg: string;
  pillText: string;
  barFill: string;
  progressLabel: { en: string; vi: string };
  progressRatio: string;
  progressPercent: number;
  badgeText: { en: string; vi: string };
}

function getCardVisualConfig(item: LocalizedAward): CardVisualConfig {
  switch (item.category) {
    case 'academic':
      return {
        visualSrc: '/media/certificates/cert-academic-is.svg',
        accentColor: '#157A48',
        pillBg: 'rgba(21, 122, 72, 0.1)',
        pillText: '#157A48',
        barFill: 'linear-gradient(90deg, #157A48 0%, #34D399 100%)',
        progressLabel: {
          en: 'Core Curriculum & Capstones Completed',
          vi: 'Hoàn thành Học phần & Đồ án Cốt lõi',
        },
        progressRatio: '100%',
        progressPercent: 100,
        badgeText: { en: 'Academic', vi: 'Nền tảng' },
      };
    case 'competitions':
      return {
        visualSrc: '/media/certificates/trophy-hackathon-sprint.svg',
        accentColor: '#B45309',
        pillBg: 'rgba(180, 83, 9, 0.1)',
        pillText: '#B45309',
        barFill: 'linear-gradient(90deg, #B45309 0%, #F59E0B 100%)',
        progressLabel: {
          en: '36-Hour Sprint Prototype Delivered',
          vi: 'Hoàn thành Sprint 36 Giờ & Báo cáo Demo',
        },
        progressRatio: '36/36h',
        progressPercent: 100,
        badgeText: { en: 'Hackathon', vi: 'Thực chiến' },
      };
    case 'other-recognitions':
      return {
        visualSrc: '/media/certificates/trophy-niic-flagship.svg',
        accentColor: '#9A6E27',
        pillBg: 'rgba(184, 142, 68, 0.16)',
        pillText: '#7D5618',
        barFill: 'linear-gradient(90deg, #0F1115 0%, #B88E44 100%)',
        progressLabel: {
          en: 'Verified Institutional Deployment',
          vi: 'Đã xác thực Vận hành Thực tế',
        },
        progressRatio: '100/100',
        progressPercent: 100,
        badgeText: { en: 'Flagship', vi: 'Tiêu biểu' },
      };
    case 'leadership-contributions':
      return {
        visualSrc: '/media/certificates/cert-njec-contribution.svg',
        accentColor: '#3730A3',
        pillBg: 'rgba(55, 48, 163, 0.1)',
        pillText: '#3730A3',
        barFill: 'linear-gradient(90deg, #3730A3 0%, #6366F1 100%)',
        progressLabel: {
          en: 'Portal & Training Recorded (Scan Pending)',
          vi: 'Đã đối chiếu Hoạt động (Chờ bản scan)',
        },
        progressRatio: '4/5',
        progressPercent: 80,
        badgeText: { en: 'Contribution', vi: 'Đóng góp' },
      };
    case 'certifications':
    default:
      return {
        visualSrc: '/media/certificates/cert-cpv-milestone.svg',
        accentColor: '#991B1B',
        pillBg: 'rgba(153, 27, 27, 0.1)',
        pillText: '#991B1B',
        barFill: 'linear-gradient(90deg, #991B1B 0%, #DC2626 100%)',
        progressLabel: {
          en: 'Confirmed Milestone (ID Protected)',
          vi: 'Đã xác nhận Cột mốc (Bảo mật số thẻ)',
        },
        progressRatio: 'Verified',
        progressPercent: 100,
        badgeText: { en: 'Milestone', vi: 'Cột mốc' },
      };
  }
}

export function AwardsShowcase({
  locale,
  awards,
  messages,
  sectionNumber = '03',
}: AwardsShowcaseProps) {
  const defaultIndex = awards.length >= 3 ? Math.floor(awards.length / 2) : 0;
  const [focusedIndex, setFocusedIndex] = useState<number>(defaultIndex);
  const [viewMode, setViewMode] = useState<'focus' | 'grid'>('focus');
  const [selectedCategory, setSelectedCategory] = useState<'all' | AwardCategory>('all');
  const [selectedType, setSelectedType] = useState<'all' | AwardType>('all');
  const [activeAwardModal, setActiveAwardModal] = useState<LocalizedAward | null>(null);
  const [mounted, setMounted] = useState(false);

  // Continuous 60/120fps physics state refs (no React re-render lag during scroll)
  const stageHoverAreaRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const targetPosRef = useRef<number>(defaultIndex);
  const currentPosRef = useRef<number>(defaultIndex);
  const lastRestingIntRef = useRef<number>(defaultIndex);
  const wheelSnapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isPointerDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartTargetRef = useRef<number>(0);
  const dragMovedRef = useRef<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories: ('all' | AwardCategory)[] = [
    'all',
    'academic',
    'competitions',
    'other-recognitions',
    'leadership-contributions',
    'certifications',
  ];

  const awardTypes: ('all' | AwardType)[] = [
    'all',
    'recognition',
    'participation',
    'completion-certificate',
    'nomination',
    'award',
  ];

  const filteredAwards = awards.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedType !== 'all' && item.awardType !== selectedType) return false;
    return true;
  });

  const totalCards = filteredAwards.length;

  // Normalize any float index into [0, totalCards - 1]
  const normalizeIndex = useCallback(
    (val: number) => {
      if (totalCards <= 0) return 0;
      return ((Math.round(val) % totalCards) + totalCards) % totalCards;
    },
    [totalCards]
  );

  // Move target smoothly to a specific card index via shortest circular path
  const glideToCardIndex = useCallback(
    (targetIdx: number) => {
      if (totalCards <= 1) return;
      const currentMod =
        ((targetPosRef.current % totalCards) + totalCards) % totalCards;
      let diff = targetIdx - currentMod;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;
      const nextInt = Math.round(targetPosRef.current + diff);
      targetPosRef.current = nextInt;
      lastRestingIntRef.current = nextInt;
      setFocusedIndex(normalizeIndex(nextInt));
    },
    [totalCards, normalizeIndex]
  );

  const handlePrev = useCallback(() => {
    if (totalCards <= 1) return;
    const nextInt = Math.round(targetPosRef.current) - 1;
    targetPosRef.current = nextInt;
    lastRestingIntRef.current = nextInt;
    setFocusedIndex(normalizeIndex(nextInt));
  }, [totalCards, normalizeIndex]);

  const handleNext = useCallback(() => {
    if (totalCards <= 1) return;
    const nextInt = Math.round(targetPosRef.current) + 1;
    targetPosRef.current = nextInt;
    lastRestingIntRef.current = nextInt;
    setFocusedIndex(normalizeIndex(nextInt));
  }, [totalCards, normalizeIndex]);

  // Reset positions when category filter changes
  useEffect(() => {
    const startIdx = totalCards >= 3 ? Math.floor(totalCards / 2) : 0;
    targetPosRef.current = startIdx;
    currentPosRef.current = startIdx;
    lastRestingIntRef.current = startIdx;
    setFocusedIndex(startIdx);
  }, [selectedCategory, selectedType, totalCards]);

  // 60/120fps requestAnimationFrame loop updating card transforms directly on DOM
  useEffect(() => {
    if (viewMode !== 'focus' || totalCards === 0) return;

    let active = true;

    const updateCardsDOM = () => {
      if (!active) return;

      // Smooth exponential damping (lerp) toward targetPosRef
      const diffToTarget = targetPosRef.current - currentPosRef.current;
      if (Math.abs(diffToTarget) > 0.0008) {
        currentPosRef.current += diffToTarget * 0.14;
      } else {
        currentPosRef.current = targetPosRef.current;
      }

      const pos = currentPosRef.current;
      const activeIdx = ((Math.round(pos) % totalCards) + totalCards) % totalCards;
      setFocusedIndex((prev) => (prev !== activeIdx ? activeIdx : prev));

      const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
      const baseSpacing = vw < 640 ? 175 : vw < 1024 ? 210 : 235;

      for (let i = 0; i < totalCards; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // Shortest circular distance d in [-totalCards/2, +totalCards/2]
        let d = 0;
        if (totalCards > 1) {
          d = (((i - pos) % totalCards) + totalCards) % totalCards;
          if (d > totalCards / 2) d -= totalCards;
        }

        const absD = Math.abs(d);

        // Smoothly compress outer cards slightly like a real coverflow curve
        const curvedOffset =
          Math.sign(d) * Math.pow(absD, 0.92) * baseSpacing;
        const translateY = Math.min(absD, 2.5) * 11;
        const scale = Math.max(0.72, 1 - absD * 0.13);
        const rotateY = Math.max(-18, Math.min(18, d * -7));

        // Smooth fade to 0 before the wrap-around boundary (|d| = 2.48) so wrap is invisible
        let opacity = 1;
        if (absD <= 1) {
          opacity = 1 - absD * 0.12;
        } else if (absD <= 2) {
          opacity = 0.88 - (absD - 1) * 0.36;
        } else {
          opacity = Math.max(0, 0.52 * (1 - (absD - 2) / 0.46));
        }

        const zIndex = Math.round(100 - absD * 25);

        el.style.transform = `translate3d(${curvedOffset.toFixed(
          2
        )}px, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(
          4
        )}) rotateY(${rotateY.toFixed(2)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = opacity < 0.15 ? 'none' : 'auto';

        // Smoothly interpolate surface brightness between center and side cards
        if (absD < 0.45) {
          el.style.backgroundColor = '#FFFFFF';
          el.style.boxShadow =
            '0 24px 54px -12px rgba(15, 17, 21, 0.16), 0 4px 16px -2px rgba(15, 17, 21, 0.06)';
        } else {
          el.style.backgroundColor = '#F1F3F7';
          el.style.boxShadow = '0 12px 28px -8px rgba(15, 17, 21, 0.09)';
        }
      }

      rafIdRef.current = window.requestAnimationFrame(updateCardsDOM);
    };

    rafIdRef.current = window.requestAnimationFrame(updateCardsDOM);

    return () => {
      active = false;
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [viewMode, totalCards]);

  // Continuous mouse wheel handler when hovering anywhere in the achievements showcase
  useEffect(() => {
    const hoverEl = stageHoverAreaRef.current;
    if (!hoverEl || viewMode !== 'focus' || activeAwardModal || totalCards <= 1) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      // Lock page vertical scroll while hovering over the achievements showcase
      e.preventDefault();
      e.stopPropagation();

      // Support both vertical wheel (deltaY) and horizontal trackpad scroll (deltaX)
      const rawDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // Normalize deltaMode (1 = lines, 2 = pages, 0 = pixels)
      const pixelDelta =
        e.deltaMode === 1
          ? rawDelta * 36
          : e.deltaMode === 2
          ? rawDelta * 320
          : rawDelta;

      const clampedDelta = Math.max(-140, Math.min(140, pixelDelta));

      // Continuously advance targetPosRef proportional to wheel movement
      targetPosRef.current += clampedDelta * 0.0052;

      // When user pauses scrolling for 140ms, softly magnetic-snap to nearest card
      if (wheelSnapTimeoutRef.current) {
        clearTimeout(wheelSnapTimeoutRef.current);
      }
      wheelSnapTimeoutRef.current = setTimeout(() => {
        const deltaFromLastInt =
          targetPosRef.current - lastRestingIntRef.current;
        let snappedInt: number;

        // Even a single gentle wheel notch (>= 0.14 cards) advances a full card
        if (
          Math.abs(deltaFromLastInt) >= 0.14 &&
          Math.abs(deltaFromLastInt) < 0.5
        ) {
          snappedInt =
            lastRestingIntRef.current + Math.sign(deltaFromLastInt);
        } else {
          snappedInt = Math.round(targetPosRef.current);
        }

        targetPosRef.current = snappedInt;
        lastRestingIntRef.current = snappedInt;
      }, 140);
    };

    hoverEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      hoverEl.removeEventListener('wheel', handleWheel);
      if (wheelSnapTimeoutRef.current) {
        clearTimeout(wheelSnapTimeoutRef.current);
      }
    };
  }, [viewMode, activeAwardModal, totalCards]);

  // Pointer drag / touch swipe support for continuous horizontal gliding
  const handlePointerDown = (e: React.PointerEvent) => {
    if (totalCards <= 1) return;
    isPointerDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartTargetRef.current = targetPosRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDraggingRef.current || totalCards <= 1) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      dragMovedRef.current = true;
    }
    targetPosRef.current = dragStartTargetRef.current - dx / 220;
  };

  const handlePointerUp = () => {
    if (!isPointerDraggingRef.current) return;
    isPointerDraggingRef.current = false;
    const deltaFromStart = targetPosRef.current - dragStartTargetRef.current;
    let snappedInt: number;
    if (Math.abs(deltaFromStart) >= 0.15 && Math.abs(deltaFromStart) < 0.5) {
      snappedInt =
        Math.round(dragStartTargetRef.current) + Math.sign(deltaFromStart);
    } else {
      snappedInt = Math.round(targetPosRef.current);
    }
    targetPosRef.current = snappedInt;
    lastRestingIntRef.current = snappedInt;
  };

  useEffect(() => {
    if (!activeAwardModal) {
      document.body.style.overflow = '';
      return;
    }
    const handleModalEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveAwardModal(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleModalEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleModalEsc);
    };
  }, [activeAwardModal]);

  return (
    <section
      id="awards"
      className="scroll-mt-16 flex flex-col justify-between py-2 sm:py-3"
    >
      {/* Entire Hoverable Showcase Area — Hovering & Scrolling Mouse Wheel Glides Cards Horizontally */}
      <div ref={stageHoverAreaRef} className="relative w-full">
        {/* Top Bar: Eyebrow + "Tổng quan >" Pill */}
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label text-[10px] text-muted">
            {sectionNumber} // {messages.awards.eyebrow}
          </span>

          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'focus' ? 'grid' : 'focus')}
            className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1 font-mono text-[11px] font-semibold text-ink shadow-xs transition-all hover:bg-ink hover:text-canvas"
          >
            <span>
              {viewMode === 'focus'
                ? locale === 'vi'
                  ? 'Tổng quan'
                  : 'Overview'
                : locale === 'vi'
                ? 'Chế độ Tiêu điểm'
                : 'Focus Stage'}
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Compact Centered Title & Subtitle */}
        <div className="mx-auto mt-1 max-w-2xl text-center">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {locale === 'vi'
              ? 'Thành tích, Chứng nhận & Sự Ghi nhận'
              : messages.awards.title}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {locale === 'vi'
              ? 'Những bước tiến học thuật, vận hành thực tế và đóng góp tổ chức tạo nên các cột mốc đã xác thực'
              : 'Verified academic foundations, production deployments, and organizational contributions'}
          </p>

          <div className="mx-auto mt-2 flex max-w-[14rem] items-center justify-center gap-2">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
            <span className="h-1 w-1 rotate-45 bg-muted/60" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
          </div>
        </div>

        {/* Compact Category Filter Pills */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = messages.awards.categories[cat] || cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 font-mono text-[11px] transition-all ${
                  isActive
                    ? 'bg-ink font-semibold text-canvas shadow-xs'
                    : 'bg-paper/80 text-muted hover:bg-paper hover:text-ink'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* VIEW 1: CONTINUOUS 60FPS HORIZONTAL FOCUS STAGE */}
        {viewMode === 'focus' ? (
          filteredAwards.length === 0 ? (
            <div className="my-6 p-6 text-center">
              <p className="text-xs text-muted">{messages.awards.emptyCategoryNote}</p>
            </div>
          ) : (
            <div
              className="relative mt-2 select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
              aria-roledescription="carousel"
              aria-label={messages.awards.title}
            >
              {/* 3D Perspective Stage Container */}
              <div
                style={{ perspective: '1200px' }}
                className="relative mx-auto flex h-[23rem] sm:h-[24rem] w-full max-w-6xl cursor-grab active:cursor-grabbing items-center justify-center overflow-x-clip overflow-y-visible"
              >
                {filteredAwards.map((item, idx) => {
                  const isFocused = idx === focusedIndex;
                  const config = getCardVisualConfig(item);
                  const hasVerifiedPhoto = Boolean(
                    item.certificateAsset &&
                      item.certificateAsset.src &&
                      item.certificateAsset.status === 'verified'
                  );

                  return (
                    <article
                      key={item.id}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      onClick={() => {
                        if (dragMovedRef.current) return;
                        if (!isFocused) {
                          glideToCardIndex(idx);
                        } else {
                          setActiveAwardModal(item);
                        }
                      }}
                      style={{
                        willChange: 'transform, opacity',
                        transformStyle: 'preserve-3d',
                      }}
                      className="absolute flex w-[17.5rem] sm:w-[19.5rem] md:w-[21rem] cursor-pointer flex-col justify-between rounded-2xl p-4 sm:p-5"
                    >
                      {/* Top Row: Subtle Index + Category Badge Pill */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                          0{idx + 1} · {messages.awards.types[item.awardType]}
                        </span>

                        <span
                          style={{
                            backgroundColor: config.pillBg,
                            color: config.pillText,
                          }}
                          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold"
                        >
                          {config.badgeText[locale]}
                        </span>
                      </div>

                      {/* Visual Showcase: Trophy Cup or Certificate Image */}
                      <div className="relative my-2 flex h-28 sm:h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#F8F9FB] to-[#EEF0F5]">
                        {hasVerifiedPhoto && item.certificateAsset?.src ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={item.certificateAsset.src}
                              alt={item.certificateAsset.altText}
                              fill
                              sizes="340px"
                              draggable={false}
                              className="object-cover object-top opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            <img
                              src={config.visualSrc}
                              alt={item.titleText}
                              draggable={false}
                              className="absolute bottom-1 right-2 h-16 w-24 object-contain drop-shadow-lg"
                            />
                            <span className="absolute bottom-2 left-2.5 rounded bg-black/70 px-2 py-0.5 font-mono text-[9px] font-semibold text-white backdrop-blur-xs">
                              {locale === 'vi' ? 'Minh chứng thực tế' : 'Verified Release'}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={config.visualSrc}
                            alt={item.titleText}
                            draggable={false}
                            className="h-28 sm:h-32 w-auto object-contain"
                          />
                        )}
                      </div>

                      {/* Title, Organizer & Concise Description */}
                      <div className="space-y-1 text-center">
                        <h3 className="font-display text-sm sm:text-base font-bold leading-snug text-ink line-clamp-2">
                          {item.titleText}
                        </h3>
                        <p className="font-mono text-[10px] font-medium text-muted line-clamp-1">
                          {item.organizerText}
                        </p>
                        <p className="mx-auto text-[11px] leading-relaxed text-muted line-clamp-2">
                          {item.descriptionText}
                        </p>
                      </div>

                      {/* Progress / Verification Bar */}
                      <div className="mt-2.5 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${config.progressPercent}%`,
                                background: config.barFill,
                              }}
                            />
                          </div>
                          <span className="font-mono text-[10px] font-bold text-ink">
                            {config.progressRatio}
                          </span>
                        </div>
                        <div className="text-left font-mono text-[9px] text-muted line-clamp-1">
                          {config.progressLabel[locale]}
                        </div>
                      </div>

                      {/* Bottom Metadata Row */}
                      <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 text-[10px]">
                        <div className="min-w-0">
                          <span className="font-mono font-bold text-ink">
                            {item.verificationStatus === 'verified'
                              ? locale === 'vi'
                                ? 'Đã xác thực'
                                : 'Verified'
                              : locale === 'vi'
                              ? 'Chờ bản scan'
                              : 'Scan pending'}
                          </span>
                          <span className="mx-1.5 text-muted">·</span>
                          <span className="font-mono text-muted">{item.awardDate}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isFocused) {
                              glideToCardIndex(idx);
                            } else {
                              setActiveAwardModal(item);
                            }
                          }}
                          className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-[10px] font-semibold transition-colors ${
                            isFocused
                              ? 'bg-ink text-canvas hover:bg-graphite'
                              : 'bg-black/[0.06] text-ink/70 hover:bg-ink hover:text-canvas'
                          }`}
                        >
                          {isFocused
                            ? locale === 'vi'
                              ? 'Xem minh chứng'
                              : 'Details'
                            : locale === 'vi'
                            ? 'Chọn'
                            : 'Focus'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Compact Bottom Navigation: Left Button, Pagination Dots, Right Button */}
              <div className="mx-auto mt-1 flex max-w-3xl items-center justify-between gap-4 px-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={filteredAwards.length <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink shadow-xs transition-all hover:bg-ink hover:text-canvas disabled:opacity-40"
                  aria-label={locale === 'vi' ? 'Mục trước' : 'Previous'}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  {filteredAwards.map((item, idx) => {
                    const isActive = idx === focusedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => glideToCardIndex(idx)}
                        aria-label={`${locale === 'vi' ? 'Chọn' : 'Select'} ${
                          item.titleText
                        }`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-6 bg-ink'
                            : 'w-1.5 bg-ink/20 hover:bg-ink/45'
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={filteredAwards.length <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink shadow-xs transition-all hover:bg-ink hover:text-canvas disabled:opacity-40"
                  aria-label={locale === 'vi' ? 'Mục tiếp theo' : 'Next'}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        ) : (
          /* VIEW 2: OVERVIEW GRID MODE ("Tổng quan") */
          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="mono-label mr-1 text-[10px] font-semibold text-muted">
                {messages.awards.filterType}:
              </span>
              {awardTypes.map((t) => {
                const isActive = selectedType === t;
                const label = messages.awards.types[t] || t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-all ${
                      isActive
                        ? 'bg-graphite font-semibold text-canvas'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAwards.map((item, idx) => {
                const config = getCardVisualConfig(item);
                const hasVerifiedCert = Boolean(
                  item.certificateAsset &&
                    item.certificateAsset.src &&
                    item.certificateAsset.status === 'verified'
                );

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col justify-between rounded-2xl bg-paper p-4 shadow-xs transition-all duration-200 hover:shadow-md"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          style={{
                            backgroundColor: config.pillBg,
                            color: config.pillText,
                          }}
                          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold"
                        >
                          {messages.awards.types[item.awardType]}
                        </span>
                        <span className="font-mono text-[11px] text-muted">
                          {item.awardDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={config.visualSrc}
                          alt={item.titleText}
                          className="h-14 w-20 shrink-0 rounded-lg bg-canvas object-contain p-1"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display text-sm font-bold text-ink line-clamp-2">
                            <button
                              type="button"
                              onClick={() => setActiveAwardModal(item)}
                              className="text-left hover:underline"
                            >
                              {item.titleText}
                            </button>
                          </h3>
                          <p className="font-mono text-[10px] text-muted line-clamp-1">
                            {item.organizerText}
                          </p>
                        </div>
                      </div>

                      {hasVerifiedCert && item.certificateAsset && (
                        <MediaItemFrame
                          asset={item.certificateAsset}
                          locale={locale}
                          fallbackTitle={item.titleText}
                          preserveAspectRatio
                          compact
                          onInspect={() => setActiveAwardModal(item)}
                        />
                      )}

                      <p className="text-xs leading-relaxed text-muted line-clamp-2">
                        {item.descriptionText}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          targetPosRef.current = idx;
                          currentPosRef.current = idx;
                          lastRestingIntRef.current = idx;
                          setFocusedIndex(idx);
                          setViewMode('focus');
                        }}
                        className="font-mono text-[11px] text-muted hover:text-ink"
                      >
                        {locale === 'vi' ? 'Đưa vào tiêu điểm' : 'Focus card'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveAwardModal(item)}
                        className="rounded-lg bg-canvas px-2.5 py-1 font-mono text-[11px] font-semibold text-ink hover:bg-ink hover:text-canvas"
                      >
                        {locale === 'vi' ? 'Chi tiết' : 'Details'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeAwardModal &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="award-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveAwardModal(null);
            }}
          >
            <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-paper text-ink shadow-2xl">
              <div className="flex items-start justify-between gap-4 bg-canvas px-5 py-3.5 sm:px-6">
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-canvas">
                      {messages.awards.types[activeAwardModal.awardType]}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {activeAwardModal.awardDate}
                    </span>
                  </div>
                  <h3
                    id="award-modal-title"
                    className="font-display text-lg font-bold text-ink sm:text-xl"
                  >
                    {activeAwardModal.titleText}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveAwardModal(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-ink shadow-xs hover:bg-ink hover:text-canvas"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
                {activeAwardModal.awardAssets.length > 0 ? (
                  <MediaGallery
                    assets={activeAwardModal.awardAssets}
                    locale={locale}
                    title={activeAwardModal.titleText}
                    preserveAspectRatio
                    mode={activeAwardModal.awardAssets.length > 1 ? 'carousel' : 'grid'}
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-xl bg-canvas p-6">
                    <img
                      src={getCardVisualConfig(activeAwardModal).visualSrc}
                      alt={activeAwardModal.titleText}
                      className="h-36 w-auto object-contain"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 rounded-xl bg-canvas p-4 text-xs sm:grid-cols-2">
                  <div>
                    <span className="mono-label block text-[10px] text-muted">
                      {messages.awards.organizerLabel}
                    </span>
                    <span className="font-semibold text-ink">
                      {activeAwardModal.organizerText}
                    </span>
                  </div>
                  <div>
                    <span className="mono-label block text-[10px] text-muted">
                      {messages.awards.programLabel}
                    </span>
                    <span className="font-semibold text-ink">
                      {activeAwardModal.competitionOrProgramText}
                    </span>
                  </div>
                  <div>
                    <span className="mono-label block text-[10px] text-muted">
                      {messages.awards.levelLabel}
                    </span>
                    <span className="text-ink">{activeAwardModal.levelLabelText}</span>
                  </div>
                  <div>
                    <span className="mono-label block text-[10px] text-muted">
                      {messages.awards.rankLabel}
                    </span>
                    <span className="font-semibold text-ink">
                      {activeAwardModal.awardRankText}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="mono-label text-[10px] font-bold text-muted">
                      // OVERVIEW
                    </h4>
                    <p className="text-xs leading-relaxed text-ink sm:text-sm">
                      {activeAwardModal.descriptionText}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="mono-label text-[10px] font-bold text-muted">
                      // {messages.awards.myContributionLabel}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">
                      {activeAwardModal.myContributionText}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeAwardModal.relatedProjectLocalized && (
                    <Link
                      href={`/${locale}/work/${activeAwardModal.relatedProjectLocalized.slug}`}
                      onClick={() => setActiveAwardModal(null)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-canvas px-3 py-1.5 font-mono text-xs font-medium text-ink hover:bg-ink hover:text-canvas"
                    >
                      <FolderGit2 className="h-3.5 w-3.5" />
                      <span>{activeAwardModal.relatedProjectLocalized.title}</span>
                    </Link>
                  )}

                  {activeAwardModal.relatedActivityLocalized && (
                    <Link
                      href={`/${locale}/journey/${activeAwardModal.relatedActivityLocalized.slug}`}
                      onClick={() => setActiveAwardModal(null)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-canvas px-3 py-1.5 font-mono text-xs font-medium text-ink hover:bg-ink hover:text-canvas"
                    >
                      <Milestone className="h-3.5 w-3.5" />
                      <span>{activeAwardModal.relatedActivityLocalized.title}</span>
                    </Link>
                  )}

                  {activeAwardModal.verificationUrl &&
                    (activeAwardModal.verificationUrl.startsWith('/') ? (
                      <Link
                        href={`/${locale}${activeAwardModal.verificationUrl}`}
                        onClick={() => setActiveAwardModal(null)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 font-mono text-xs font-semibold text-canvas hover:bg-graphite"
                      >
                        <span>
                          {locale === 'vi' ? 'Xem hồ sơ đối chiếu' : 'View Reference'}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={activeAwardModal.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 font-mono text-xs font-semibold text-canvas hover:bg-graphite"
                      >
                        <span>
                          {locale === 'vi' ? 'Mở liên kết xác thực' : 'Verification Link'}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
