"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    gsap.set(logoRef.current, { y: -120, opacity: 0 });
    gsap.set(textRef.current, { y: 60, opacity: 0 });

    tl
      .to(logoRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .to(textRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .to({}, { duration: 0.8 })
      .to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
      .to(containerRef.current, { height: "80px", duration: 0.6, ease: "power3.inOut" }, "-=0.2")
      .to(logoRef.current, { scale: 0.55, duration: 0.6, ease: "power3.inOut" }, "<")
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-primary flex items-start justify-center overflow-hidden"
    >
      <div
        ref={containerRef}
        className="w-full h-screen flex flex-col items-center justify-center"
      >
        <div ref={logoRef} className="relative w-24 h-24">
          <Image
            src="/logo.jpg"
            alt="Etlik Yayla Kasabı"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span
          ref={textRef}
          className="mt-4 text-white font-serif text-xl tracking-[0.3em] uppercase"
        >
          ETLİK YAYLA KASABI
        </span>
      </div>
    </div>
  );
}
