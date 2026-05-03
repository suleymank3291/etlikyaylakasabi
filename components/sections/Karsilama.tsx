"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KARSILAMA } from "@/lib/config";

export default function Karsilama() {
  const sectionRef = useRef<HTMLElement>(null);
  const baslikRef = useRef<HTMLDivElement>(null);
  const metinRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      [baslikRef.current, metinRef.current].filter(Boolean).forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(100% 0 0 0)",
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-40 md:py-56 bg-white px-6 relative z-10 overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <div className="overflow-hidden">
          <div ref={baslikRef}>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif leading-tight text-primary">
              {KARSILAMA.baslik}
            </h2>
          </div>
        </div>

        <div className="overflow-hidden mt-10">
          <p
            ref={metinRef}
            className="text-lg md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed italic"
          >
            {KARSILAMA.metin}
          </p>
        </div>
      </div>
    </section>
  );
}
