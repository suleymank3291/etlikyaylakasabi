"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO, SITE } from "@/lib/config";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-900">

      {/* Arka plan resmi */}
      <Image
        src="/images/hero1.png"
        alt={SITE.marka}
        fill
        priority
        quality={95}
        className="object-cover object-center"
      />

      {/* Gradient kaplama */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75 pointer-events-none" />

      {/* Metin — ekranın üst-orta alanında, navbar + logoyu aşacak kadar alta konumlandı */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-[60%] md:-translate-y-[68%] flex flex-col items-center text-center px-6 pointer-events-none">
        <p
          className="text-white/60 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-4 md:mb-5"
          style={{ fontFamily: "var(--font-josefin, sans-serif)" }}
        >
          {SITE.sehir}
        </p>
        <h1
          className="text-white font-serif text-4xl md:text-7xl lg:text-[6.5rem] max-w-4xl leading-[1.1] md:leading-[1.05] tracking-tight"
        >
          {HERO.baslik}
        </h1>
        <p className="text-white/75 text-sm md:text-xl mt-4 md:mt-6 max-w-lg leading-relaxed">
          {HERO.altMetin}
        </p>
      </div>

      {/* CTA dairesi — alt orta, metinden ayrı konumlandı */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/katalog"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-32 h-32 rounded-full border-2 flex items-center justify-center text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${
            isHovered
              ? "bg-primary border-primary text-white scale-110"
              : "bg-transparent border-white/70 text-white"
          }`}
          style={{ fontFamily: "var(--font-josefin, sans-serif)" }}
        >
          <span className="text-center leading-snug px-2">{HERO.buton}</span>
        </Link>
      </div>

    </section>
  );
}
