"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SITE } from "@/lib/config";

export default function FlexAnimasyon() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgLeftRef  = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set(imgLeftRef.current,  { x: "-100vw", rotation: -45 });
    gsap.set(imgRightRef.current, { x:  "100vw", rotation:  45 });
  }, []);

  const onEnter = () => {
    gsap.to(imgLeftRef.current,  { x: "-38vw", rotation: -10, duration: 0.65, ease: "power3.out" });
    gsap.to(imgRightRef.current, { x:  "38vw", rotation:  10, duration: 0.65, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to(imgLeftRef.current,  { x: "-100vw", rotation: -45, duration: 0.5, ease: "power2.in" });
    gsap.to(imgRightRef.current, { x:  "100vw", rotation:  45, duration: 0.5, ease: "power2.in" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: "70vh", backgroundColor: "#F5F0E8" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* İçerik */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8 py-24 cursor-default"
        style={{ minWidth: "min(60vw, 700px)" }}
      >
        <p className="text-primary/60 text-xs font-black tracking-[0.3em] uppercase mb-5">
          Etlik Yayla Kasabı
        </p>

        <h2
          className="font-serif font-black text-neutral-900 leading-none mb-10 tracking-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          Taze Et,{" "}
          <em className="text-primary not-italic">Doğru Kesim</em>
        </h2>

        <a
          href={SITE.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-serif tracking-widest uppercase text-sm rounded-full shadow-xl transition-colors duration-500 hover:bg-dark"
        >
          {SITE.ctaMetin}
        </a>
      </div>

      {/* Sol resim */}
      <div
        ref={imgLeftRef}
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          marginLeft: "-140px",
          marginTop: "-190px",
          width: 280,
          height: 380,
          borderRadius: 16,
          overflow: "hidden",
          zIndex: 5,
        }}
      >
        <Image
          src="/images/kategori/dry-aged-steak.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Sağ resim */}
      <div
        ref={imgRightRef}
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          marginLeft: "-140px",
          marginTop: "-190px",
          width: 280,
          height: 380,
          borderRadius: 16,
          overflow: "hidden",
          zIndex: 5,
        }}
      >
        <Image
          src="/images/kategori/kuzu-pirzola.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>
    </section>
  );
}
