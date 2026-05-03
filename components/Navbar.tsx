"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { NAV_LINKS, SITE } from "@/lib/config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      if (scrolled === isScrolled) return;
      setIsScrolled(scrolled);

      if (scrolled) {
        gsap.to(logoWrapRef.current, { width: 52, height: 52, duration: 0.45, ease: "power2.inOut" });
        gsap.to(logoTextRef.current, { opacity: 0, y: -6, duration: 0.25, ease: "power2.in", pointerEvents: "none" });
      } else {
        gsap.to(logoWrapRef.current, { width: 110, height: 110, duration: 0.45, ease: "power2.out" });
        gsap.to(logoTextRef.current, { opacity: 1, y: 0, duration: 0.35, delay: 0.15, ease: "power2.out", pointerEvents: "auto" });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrolled]);

  const handleLogoEnter = () => {
    if (!isScrolled) return;
    gsap.to(logoWrapRef.current, { width: 90, height: 90, duration: 0.35, ease: "power2.out" });
  };

  const handleLogoLeave = () => {
    if (!isScrolled) return;
    gsap.to(logoWrapRef.current, { width: 52, height: 52, duration: 0.35, ease: "power2.inOut" });
  };

  const linkClass = `text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
    isScrolled ? "text-neutral-900 hover:text-primary" : "text-white hover:text-white/70"
  }`;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
        isScrolled ? "h-16 bg-white/95 backdrop-blur-md shadow-sm" : "h-24 bg-transparent"
      }`}
    >
      {/* Sol nav */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.slice(0, 2).map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Merkez: Logo (kutu yok) */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group">
        <div
          ref={logoWrapRef}
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          className="relative cursor-pointer overflow-hidden"
          style={{ width: 110, height: 110 }}
        >
          <Image
            src="/logo.jpg"
            alt={SITE.marka}
            fill
            className="object-contain"
            priority
          />
        </div>
        <span
          ref={logoTextRef}
          className={`text-[10px] font-serif tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${
            isScrolled ? "text-primary" : "text-white"
          }`}
        >
          {SITE.marka.toLocaleUpperCase("tr-TR")}
        </span>
      </Link>

      {/* Sağ nav + CTA */}
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.slice(2).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
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
