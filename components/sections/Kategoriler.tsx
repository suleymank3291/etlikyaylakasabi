"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KATEGORILER } from "@/lib/config";

export default function Kategoriler() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length < 2) return;

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.from(panel, { yPercent: 100, duration: 1 });
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${(panels.length - 1) * window.innerHeight}`,
        animation: tl,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen overflow-hidden">
      {KATEGORILER.map((kat, i) => (
        <div
          key={kat.slug}
          ref={(el) => { panelRefs.current[i] = el; }}
          className="absolute inset-0 bg-primary flex flex-col items-center justify-center"
          style={{ zIndex: i + 1 }}
        >
          <span className="absolute text-[20vw] font-serif text-white/5 select-none pointer-events-none uppercase tracking-wider">
            {kat.isim}
          </span>

          <div className="relative w-48 h-48 md:w-72 md:h-72 mb-8 z-10">
            <Image
              src={kat.gorsel}
              alt={kat.isim}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>

          <h2 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight z-10">
            {kat.isim}
          </h2>

          <div className="absolute bottom-10 flex gap-6 z-10">
            {KATEGORILER.filter((k) => k.slug !== kat.slug).map((k) => (
              <Link
                key={k.slug}
                href={`/menu#${k.slug}`}
                className="text-white/50 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300"
              >
                {k.isim}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
