"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { NAV_LINKS, SITE } from "@/lib/config";

const FULL = { w: 140, h: 196 };
const SMALL = { w: 72, h: 72 };

export default function Navbar() {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isScrolledRef = useRef(false);
  const isHoveredRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  const expand = () => {
    gsap.to(boxRef.current, { width: FULL.w, height: FULL.h, duration: 0.5, ease: "power3.out" });
    gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.4, delay: 0.18, ease: "power2.out" });
  };

  const collapse = () => {
    gsap.to(boxRef.current, { width: SMALL.w, height: SMALL.h, duration: 0.45, ease: "power2.inOut" });
    gsap.to(textRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" });
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      if (scrolled === isScrolledRef.current) return;
      isScrolledRef.current = scrolled;

      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.08)" : "none",
          duration: 0.4,
          ease: "power2.inOut",
        });
      }

      if (!isHoveredRef.current) {
        if (scrolled) collapse();
        else expand();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = () => {
    isHoveredRef.current = true;
    if (isScrolledRef.current) expand();
  };

  const handleLeave = () => {
    isHoveredRef.current = false;
    if (isScrolledRef.current) collapse();
  };

  const linkClass =
    "text-sm font-medium tracking-wider uppercase text-white hover:text-white/70 transition-colors duration-300";

  const scrolledLinkClass =
    "text-sm font-medium tracking-wider uppercase text-neutral-900 hover:text-primary transition-colors duration-300";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Sol nav */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.slice(0, 2).map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={isScrolledRef.current ? scrolledLinkClass : linkClass}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Merkez: Kırmızı dikdörtgen logo kutusu */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
        <Link href="/" aria-label={SITE.marka}>
          <div
            ref={boxRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="bg-primary flex flex-col items-center overflow-hidden cursor-pointer shadow-xl"
            style={{ width: FULL.w, height: FULL.h }}
          >
            {/* Logo görseli */}
            <div className="relative shrink-0 mt-4" style={{ width: 80, height: 80 }}>
              <Image
                src="/logo.jpg"
                alt={SITE.marka}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Büyük isim yazısı */}
            <div ref={textRef} className="mt-2 text-center leading-none">
              <p className="text-white font-serif text-[26px] font-bold leading-tight">
                Etlik
              </p>
              <p className="text-white font-serif text-[26px] font-bold leading-tight">
                Yayla
              </p>
              <p className="text-white font-serif text-[26px] font-bold leading-tight">
                Kasabı
              </p>
            </div>

            {/* Erişilebilirlik için gizli tam isim */}
            <span className="sr-only">{SITE.marka.toLocaleUpperCase("tr-TR")}</span>
          </div>
        </Link>
      </div>

      {/* Sağ nav + CTA */}
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.slice(2).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isScrolledRef.current ? scrolledLinkClass : linkClass}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={SITE.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-primary text-white text-xs md:text-sm font-medium tracking-wider uppercase rounded-full hover:bg-dark transition-colors duration-300"
        >
          {SITE.ctaMetin}
        </a>
      </div>
    </nav>
  );
}
