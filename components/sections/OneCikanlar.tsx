"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ONE_CIKANLAR } from "@/lib/config";

export default function OneCikanlar() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardEnter = (i: number) => {
    setActiveCard(i);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    gsap.to(imgRefs.current[i], { scale: 1.07, duration: 0.5, ease: "power2.out" });
  };

  const handleCardLeave = (i: number) => {
    setActiveCard(null);
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    gsap.to(imgRefs.current[i], { scale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] w-20 h-20 rounded-full bg-primary flex items-center justify-center pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <span className="text-white text-xs font-semibold tracking-widest uppercase">İncele</span>
      </div>

      <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-900">
              Öne Çıkan <span className="text-primary italic">Lezzetler</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {ONE_CIKANLAR.map((urun, i) => (
              <div
                key={urun.isim}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseEnter={() => handleCardEnter(i)}
                onMouseLeave={() => handleCardLeave(i)}
                className="group cursor-none"
              >
                <Link href={`/menu#${urun.kategoriSlug}`}>
                  <div className="overflow-hidden rounded-2xl bg-neutral-50 mb-4 aspect-square relative">
                    <div
                      ref={(el) => { imgRefs.current[i] = el; }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={urun.gorsel}
                        alt={urun.isim}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`absolute inset-0 bg-primary/20 transition-opacity duration-300 ${
                        activeCard === i ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  <h3 className="font-serif text-lg text-neutral-900 group-hover:text-primary transition-colors duration-300">
                    {urun.isim}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">{urun.fiyat}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
