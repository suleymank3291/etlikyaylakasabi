"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { HERO, HERO_SLIDES } from "@/lib/config";

const INTERVAL_MS = 5000;

// Parallax hız katsayıları — image yavaş, text hızlı
const IMG_DUR = 1.5;   // saniye
const TXT_DUR = 0.85;  // saniye
const IMG_IN_X = "45%";   // image başlangıç ofseti (daha az → daha yavaş görünür)
const IMG_OUT_X = "-18%";
const TXT_IN_X = "100%";  // text başlangıç ofseti (daha fazla → daha hızlı görünür)
const TXT_OUT_X = "-100%";

export default function Hero() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback((next: number) => {
    const prev = currentRef.current;
    if (prev === next) return;

    const prevCont = containerRefs.current[prev];
    const nextCont = containerRefs.current[next];
    const prevImg = imageRefs.current[prev];
    const nextImg = imageRefs.current[next];
    const prevTxt = textRefs.current[prev];
    const nextTxt = textRefs.current[next];

    // Gelen slide'ı üste al, başlangıç pozisyonları
    gsap.set(nextCont, { zIndex: 2 });
    gsap.set(nextImg, { x: IMG_IN_X });
    gsap.set(nextTxt, { x: TXT_IN_X, opacity: 1 });

    // Gelen: image yavaş, text hızlı (parallax farkı burada)
    gsap.to(nextImg, { x: "0%", duration: IMG_DUR, ease: "power2.out" });
    gsap.to(nextTxt, { x: "0%", duration: TXT_DUR, ease: "power3.out" });

    // Giden: image yavaş sola, text hızlı sola
    gsap.to(prevImg, { x: IMG_OUT_X, duration: IMG_DUR, ease: "power2.in" });
    gsap.to(prevTxt, {
      x: TXT_OUT_X,
      duration: TXT_DUR,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(prevCont, { zIndex: 0 });
        gsap.set(prevImg, { x: "0%" });
        gsap.set(prevTxt, { x: "0%", opacity: 1 });
      },
    });

    currentRef.current = next;
    setActiveDot(next);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
  }, [goTo]);

  // İlk slide giriş animasyonu
  useEffect(() => {
    const firstImg = imageRefs.current[0];
    const firstTxt = textRefs.current[0];
    gsap.set(firstImg, { x: IMG_IN_X });
    gsap.set(firstTxt, { x: TXT_IN_X });
    gsap.to(firstImg, { x: "0%", duration: IMG_DUR, delay: 0.2, ease: "power2.out" });
    gsap.to(firstTxt, { x: "0%", duration: TXT_DUR, delay: 0.2, ease: "power3.out" });

    // CTA fade-in
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power2.out" });

    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleDotClick = (i: number) => {
    goTo(i);
    startTimer();
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Slide'lar */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          ref={(el) => { containerRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ zIndex: i === 0 ? 1 : 0 }}
        >
          {/* Görsel — yavaş parallax katmanı */}
          <div
            ref={(el) => { imageRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ willChange: "transform" }}
          >
            <Image
              src={slide.src}
              alt={slide.baslik}
              fill
              priority={i === 0}
              quality={90}
              className="object-cover object-center opacity-70"
            />
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]" />

          {/* Metin — hızlı parallax katmanı */}
          <div
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6 mt-20"
            style={{ willChange: "transform" }}
          >
            <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-9xl max-w-5xl leading-[1.05] tracking-tight">
              {slide.baslik}
            </h1>
            <p className="text-white/80 text-lg md:text-2xl mt-6 max-w-xl leading-relaxed">
              {slide.altMetin}
            </p>
          </div>
        </div>
      ))}

      {/* CTA — sabit katman */}
      <div className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-none mt-20">
        <div className="flex flex-col items-center justify-end h-full pb-24">
          <Link
            ref={ctaRef}
            href="#katalog"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`pointer-events-auto w-36 h-36 rounded-full border-2 flex items-center justify-center text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 ${
              isHovered
                ? "bg-primary border-primary text-white scale-105"
                : "bg-transparent border-white/70 text-white"
            }`}
          >
            {HERO.buton}
          </Link>
        </div>
      </div>

      {/* Dot navigasyonu */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[11] flex items-center gap-3">
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
