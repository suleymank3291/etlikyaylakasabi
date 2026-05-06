"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

// Navbar.tsx ile senkronize tutulmalı
const BOX = { w: 146, h: 224, logoSize: 96, logoMt: 12 };

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    // prefers-reduced-motion → animasyonsuz geç
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (prefersReduced) {
      overlay.style.display = "none";
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;

    // Loader'daki başlangıç logo boyutu
    const LOGO_SIZE = isMobile
      ? Math.min(260, vw * 0.65)
      : Math.min(480, vw * 0.32);

    logo.style.width = `${LOGO_SIZE}px`;
    logo.style.height = `${LOGO_SIZE}px`;

    // FAZ 2 hesapları: logo navbar kutusunun içindeki konumuna gitmeli
    const logoCenter = BOX.logoMt + BOX.logoSize / 2; // kutu tepesinden itibaren
    const deltaY = logoCenter - vh / 2;               // negatif = yukarı
    const scaleTarget = BOX.logoSize / LOGO_SIZE;

    // FAZ 3 hesapları: overlay clip-path navbar kutusuna daralır
    const insetLR = (vw - BOX.w) / 2;
    const insetBottom = vh - BOX.h;

    const tl = gsap.timeline();

    // FAZ 1: Logo fade-in + slight scale up
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" },
      0.4
    );

    // FAZ 2: Logo küçülür + yukarı kayar (Bekleme süresi kısaltıldı)
    tl.to(
      logo,
      {
        scale: scaleTarget,
        y: deltaY,
        duration: 1.2,
        ease: "expo.inOut",
      },
      1.8
    );

    // FAZ 3: Overlay clip-path ile kutu boyutuna daralır
    tl.to(
      overlay,
      {
        clipPath: `inset(0px ${insetLR}px ${insetBottom}px ${insetLR}px)`,
        duration: 1.4,
        ease: "expo.inOut",
      },
      2.0
    );

    // FAZ 4: Overlay solar, navbar ortaya çıkar
    const revealAt = 3.2;
    tl.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, revealAt);

    tl.add(() => {
      document.body.style.overflow = "";
      onComplete();
    }, revealAt + 0.3);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-primary flex items-center justify-center"
      style={{ clipPath: "inset(0px 0px 0px 0px)", willChange: "clip-path, opacity" }}
    >
      <div
        ref={logoRef}
        className="relative"
        style={{
          width: 420,
          height: 420,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/logo.jpg"
          alt="Etlik Yayla Kasabı"
          fill
          className="object-contain"
          priority
          quality={100}
          sizes="(max-width: 768px) 65vw, 480px"
        />
      </div>
    </div>
  );
}
