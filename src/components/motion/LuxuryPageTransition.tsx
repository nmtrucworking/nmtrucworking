'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface LuxuryPageTransitionProps {
  children: React.ReactNode;
}

export function LuxuryPageTransition({ children }: LuxuryPageTransitionProps) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!page || shouldReduceMotion) return;

    const revealItems = Array.from(
      page.querySelectorAll<HTMLElement>('section, article, [data-luxury-reveal]'),
    ).filter((item) => !item.matches('.home-hero') && !item.closest('.home-hero'));

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('luxury-reveal', 'is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const item = entry.target as HTMLElement;
          item.classList.add('is-visible');
          observer.unobserve(item);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealItems.forEach((item, index) => {
      const isAlreadyVisible = item.getBoundingClientRect().top < window.innerHeight * 0.88;
      item.style.setProperty('--luxury-reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
      item.classList.add('luxury-reveal');

      if (isAlreadyVisible) {
        item.classList.add('is-visible');
      } else {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      key={pathname}
      ref={pageRef}
      className="luxury-page luxury-page--entering"
    >
      {children}
    </div>
  );
}
