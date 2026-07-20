'use client';

import Image from 'next/image';
import nmtrucImg from '@/asset/img/nmtruc.png';

interface ProtectedPortraitProps {
  alt: string;
}

export function ProtectedPortrait({ alt }: ProtectedPortraitProps) {
  return (
    <Image
      src={nmtrucImg}
      alt={alt}
      priority
      draggable={false}
      data-nosnippet
      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 40vw"
      className="home-hero-portrait"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      onAuxClick={(event) => event.preventDefault()}
    />
  );
}
