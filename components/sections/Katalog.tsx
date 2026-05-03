"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KATALOG } from "@/lib/config";

export default function Katalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const parallaxItems = [
        { ref: img1Ref, yPercent: -35 },
        { ref: img2Ref, yPercent: -55 },
        { ref: img3Ref, yPercent: -25 },
      ];

      parallaxItems.forEach(({ ref, yPercent }) => {
        gsap.to(ref.current, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="katalog"
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-900"
      style={{ height: "120vh" }}
    >
      {/* Görsel 1 — sol üst */}
      <div
        ref={img1Ref}
        className="absolute top-[8%] left-[2%] w-[44vw] md:w-[30vw] h-[28vh] md:h-[52vh] z-[1]"
      >
        <Image
          src={KATALOG.gorsel1}
          alt=""
          fill
          className="object-cover rounded-[2.5rem] opacity-85"
        />
      </div>

      {/* Görsel 2 — sağ orta */}
      <div
        ref={img2Ref}
        className="absolute top-[38%] right-[2%] w-[48vw] md:w-[28vw] h-[30vh] md:h-[52vh] z-[1]"
      >
        <Image
          src={KATALOG.gorsel2}
          alt=""
          fill
          className="object-cover rounded-[2.5rem] opacity-85"
        />
      </div>

      {/* Görsel 3 — sol alt */}
      <div
        ref={img3Ref}
        className="absolute top-[62%] left-[12%] w-[42vw] md:w-[24vw] h-[24vh] md:h-[40vh] z-[1]"
      >
        <Image
          src={KATALOG.gorsel3}
          alt=""
          fill
          className="object-cover rounded-[2.5rem] opacity-85"
        />
      </div>

      {/* Ortadaki metin */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none px-4">
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-serif text-white text-center leading-[1.05] drop-shadow-2xl">
          {KATALOG.ortaYazi}
        </h2>
        <p className="mt-6 text-white/60 text-lg md:text-xl italic text-center max-w-lg">
          {KATALOG.altMetin}
        </p>
      </div>
    </section>
  );
}
