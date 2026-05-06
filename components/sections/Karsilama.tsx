"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KARSILAMA } from "@/lib/config";

export default function Karsilama() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const baslikRef  = useRef<HTMLDivElement>(null);
  const metinRef   = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Görsel: soldan gelir
      gsap.from(imgRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: imgRef.current, start: "top 88%" },
      });

      // Başlık + metin: clip reveal
      [baslikRef.current, metinRef.current].filter(Boolean).forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(100% 0 0 0)",
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-white px-6 relative z-10 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 md:gap-20 justify-center">

        {/* Ödül görseli */}
        <div ref={imgRef} className="flex-shrink-0 w-48 md:w-64 lg:w-72 relative">
          <Image
            src="/images/odul.png"
            alt="Ödül"
            width={320}
            height={320}
            className="object-contain w-full h-auto drop-shadow-xl"
          />
        </div>

        {/* Metin bloğu */}
        <div className="text-left md:text-left max-w-2xl">
          <div className="overflow-hidden">
            <div ref={baslikRef}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-primary">
                {KARSILAMA.baslik}
              </h2>
            </div>
          </div>

          <div className="overflow-hidden mt-8">
            <p
              ref={metinRef}
              className="text-lg md:text-2xl text-neutral-600 leading-relaxed italic"
            >
              {KARSILAMA.metin}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
