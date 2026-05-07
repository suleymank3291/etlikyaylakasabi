"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

export default function FlexAnimasyon() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgLeftRef  = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    // GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      const isMob = window.innerWidth < 768;
      
      // Başlangıç durumları
      gsap.set(imgLeftRef.current, { 
        x: isMob ? "-100vw" : "-100vw", 
        y: isMob ? "-10vh" : 0, 
        rotation: -45,
        scale: isMob ? 0.6 : 1
      });
      gsap.set(imgRightRef.current, { 
        x: isMob ? "100vw" : "100vw", 
        y: isMob ? "15vh" : 0, 
        rotation: 45,
        scale: isMob ? 0.6 : 1
      });

      // Animasyon tetikleyici
      gsap.to(imgLeftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
        },
        x: isMob ? "-25vw" : "-38vw",
        rotation: -10,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.to(imgRightRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
        },
        x: isMob ? "25vw" : "38vw",
        rotation: 10,
        duration: 0.8,
        ease: "power3.out"
      });
    });

    return () => {
      window.removeEventListener("resize", check);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center bg-[#F5F0E8]"
      style={{ minHeight: isMobile ? "90vh" : "80vh" }}
    >
      {/* İçerik */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8 py-24"
        style={{ maxWidth: isMobile ? "90vw" : "min(60vw, 700px)" }}
      >
        <p className="text-primary/60 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-5">
          Etlik Yayla Kasabı
        </p>

        <h2
          className="font-serif font-black text-neutral-900 leading-[1.1] mb-10 tracking-tight"
          style={{ fontSize: isMobile ? "3rem" : "clamp(3rem, 7vw, 6.5rem)" }}
        >
          Taze Et,{" "}
          <em className="text-primary not-italic block md:inline mt-2 md:mt-0">Doğru Kesim</em>
        </h2>

        <a
          href={SITE.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-serif tracking-widest uppercase text-xs md:text-sm rounded-full shadow-xl transition-all duration-500 hover:bg-dark hover:scale-105 active:scale-95"
        >
          {SITE.ctaMetin}
        </a>
      </div>

      {/* Sol resim */}
      <div
        ref={imgLeftRef}
        className="absolute pointer-events-none shadow-2xl overflow-hidden z-20"
        style={{
          top: isMobile ? "22%" : "50%",
          left: "50%",
          marginLeft: isMobile ? "-100px" : "-140px",
          marginTop: isMobile ? "-130px" : "-190px",
          width: isMobile ? 200 : 280,
          height: isMobile ? 260 : 380,
          borderRadius: 16,
        }}
      >
        <Image
          src="/images/kategori/dry-aged-steak.jpg"
          alt=""
          fill
          className="object-cover"
          sizes={isMobile ? "200px" : "280px"}
        />
      </div>

      {/* Sağ resim */}
      <div
        ref={imgRightRef}
        className="absolute pointer-events-none shadow-2xl overflow-hidden z-20"
        style={{
          top: isMobile ? "78%" : "50%",
          left: "50%",
          marginLeft: isMobile ? "-100px" : "-140px",
          marginTop: isMobile ? "-130px" : "-190px",
          width: isMobile ? 200 : 280,
          height: isMobile ? 260 : 380,
          borderRadius: 16,
        }}
      >
        <Image
          src="/images/kategori/kuzu-pirzola.jpg"
          alt=""
          fill
          className="object-cover"
          sizes={isMobile ? "200px" : "280px"}
        />
      </div>
    </section>
  );
}
