// site/components/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { NAV_LINKS, SITE } from "@/lib/config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isScrolled) {
        setIsScrolled(true);
        gsap.to(logoBoxRef.current, {
          width: "68px",
          paddingLeft: "8px",
          paddingRight: "8px",
          duration: 0.45,
          ease: "power2.inOut",
        });
        gsap.to(logoTextRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (logoTextRef.current) logoTextRef.current.style.display = "none";
          },
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const handleLogoEnter = () => {
    if (!isScrolled) return;
    setIsLogoHovered(true);
    if (logoTextRef.current) logoTextRef.current.style.display = "block";
    gsap.to(logoBoxRef.current, { width: "180px", paddingLeft: "16px", paddingRight: "16px", duration: 0.4, ease: "power2.out" });
    gsap.to(logoTextRef.current, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
  };

  const handleLogoLeave = () => {
    if (!isScrolled) return;
    setIsLogoHovered(false);
    gsap.to(logoBoxRef.current, { width: "68px", paddingLeft: "8px", paddingRight: "8px", duration: 0.4, ease: "power2.inOut" });
    gsap.to(logoTextRef.current, {
      opacity: 0,
      x: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (logoTextRef.current && !isLogoHovered) logoTextRef.current.style.display = "none";
      },
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-6 md:px-10 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Sol: Nav linkleri */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.slice(0, 2).map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                isScrolled ? "text-neutral-900 hover:text-primary" : "text-white hover:text-white/70"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Orta: Logo kutusu */}
      <div
        ref={logoBoxRef}
        onMouseEnter={handleLogoEnter}
        onMouseLeave={handleLogoLeave}
        className="flex items-center gap-3 bg-primary rounded-full px-4 py-2 cursor-pointer overflow-hidden"
        style={{ width: "180px" }}
      >
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src="/logo.jpg"
            alt="Etlik Yayla Kasabı"
            fill
            className="object-contain rounded-full"
          />
        </div>
        <span
          ref={logoTextRef}
          className="text-white text-[10px] font-serif tracking-[0.15em] uppercase leading-tight whitespace-nowrap"
        >
          ETLİK YAYLA KASABI
        </span>
      </div>

      {/* Sağ: Nav linkleri + CTA */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                isScrolled ? "text-neutral-900 hover:text-primary" : "text-white hover:text-white/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href={SITE.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 md:px-5 md:py-2 px-4 py-2 bg-primary text-white text-xs md:text-sm font-medium tracking-wider uppercase rounded-full hover:bg-dark transition-colors duration-300"
        >
          {SITE.ctaMetin}
        </a>
      </div>
    </nav>
  );
}
