"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { HERO, HERO_SLIDES } from "@/lib/config";

const INTERVAL_MS = 5000;

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Görseller arası geçiş
  const goTo = useCallback((next: number) => {
    const prev = currentRef.current;
    if (prev === next) return;

    const prevEl = slideRefs.current[prev];
    const nextEl = slideRefs.current[next];

    gsap.to(prevEl, { opacity: 0, duration: 1.2, ease: "power2.inOut" });
    gsap.fromTo(nextEl, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.inOut" });

    currentRef.current = next;
    setActiveDot(next);
  }, []);

  // Otomatik geçiş
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
  }, [goTo]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // Metin giriş animasyonu
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 40 });
      gsap.to([headingRef.current, subRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleDotClick = (i: number) => {
    goTo(i);
    startTimer(); // timer'ı sıfırla
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Slider görselleri */}
      {HERO_SLIDES.map((src, i) => (
        <div
          key={src}
          ref={(el) => { slideRefs.current[i] = el; }}
          className="absolute inset-0 z-0"
          style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
        >
          <Image
            src={src}
            alt={`${HERO.baslik} — ${i + 1}`}
            fill
            priority={i === 0}
            quality={90}
            className="object-cover object-center opacity-70"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* İçerik */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6 mt-20">
        <h1
          ref={headingRef}
          className="text-white font-serif text-5xl md:text-7xl lg:text-9xl max-w-5xl leading-[1.05] tracking-tight"
        >
          {HERO.baslik}
        </h1>

        <p
          ref={subRef}
          className="text-white/80 text-lg md:text-2xl mt-6 max-w-xl leading-relaxed"
        >
          {HERO.altMetin}
        </p>

        <Link
          ref={ctaRef}
          href="#katalog"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`mt-16 w-36 h-36 rounded-full border-2 flex items-center justify-center text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 ${
            isHovered
              ? "bg-primary border-primary text-white scale-105"
              : "bg-transparent border-white/70 text-white"
          }`}
        >
          {HERO.buton}
        </Link>
      </div>

      {/* Dot navigasyonu */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Slayt ${i + 1}`}
            className="group p-1"
          >
            <span
              className={`block rounded-full transition-all duration-400 ${
                i === activeDot
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
