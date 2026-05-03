"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

// Navbar.tsx ile senkronize tutulmalı
const BOX = { w: 140, h: 218, logoSize: 84, logoMt: 16 };

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

    // sessionStorage veya prefers-reduced-motion → atla
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (sessionStorage.getItem("loaderSeen") || prefersReduced) {
      overlay.style.display = "none";
      sessionStorage.setItem("loaderSeen", "1");
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;

    // Loader'daki başlangıç logo boyutu
    const LOGO_SIZE = isMobile
      ? Math.min(240, vw * 0.55)
      : Math.min(420, vw * 0.28);

    logo.style.width = `${LOGO_SIZE}px`;
    logo.style.height = `${LOGO_SIZE}px`;

    // FAZ 2 hesapları: logo navbar kutusunun içindeki konumuna gitmeli
    const logoCenter = BOX.logoMt + BOX.logoSize / 2; // kutu tepesinden itibaren
    const deltaY = logoCenter - vh / 2;               // negatif = yukarı
    const scaleTarget = BOX.logoSize / LOGO_SIZE;

    // FAZ 3 hesapları: overlay clip-path navbar kutusuna daralır
    const insetLR = (vw - BOX.w) / 2;
    const insetBottom = vh - BOX.h;

    const MOBILE_OFFSET = isMobile ? -0.5 : 0;

    const tl = gsap.timeline();

    // FAZ 1: Logo fade-in (300ms gecikmeli, 400ms süre)
    tl.fromTo(
      logo,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
      0.3
    );

    // FAZ 2: Logo küçülür + yukarı kayar
    tl.to(
      logo,
      {
        scale: scaleTarget,
        y: deltaY,
        duration: isMobile ? 1.0 : 1.3,
        ease: "power2.inOut",
      },
      2.5 + MOBILE_OFFSET
    );

    // FAZ 3: Overlay clip-path ile kutu boyutuna daralır
    tl.to(
      overlay,
      {
        clipPath: `inset(0px ${insetLR}px ${insetBottom}px ${insetLR}px)`,
        duration: isMobile ? 1.2 : 1.7,
        ease: "power3.inOut",
      },
      isMobile ? 3.3 : 3.8
    );

    // FAZ 4: Overlay solar, navbar ortaya çıkar
    const revealAt = isMobile ? 4.5 : 5.5;
    tl.to(overlay, { opacity: 0, duration: 0.25, ease: "none" }, revealAt);

    tl.add(() => {
      document.body.style.overflow = "";
      sessionStorage.setItem("loaderSeen", "1");
      onComplete();
    }, revealAt + 0.25);

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
        />
      </div>
    </div>
  );
}
