"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { HERO } from "@/lib/config";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, subRef.current, ctaRef.current], {
        opacity: 0,
        y: 40,
      });
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

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Arka plan görseli */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO.gorsel}
          alt={HERO.baslik}
          fill
          priority
          quality={90}
          className="object-cover object-center opacity-60"
        />
      </div>

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
    </section>
  );
}
