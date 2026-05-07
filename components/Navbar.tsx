"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { NAV_LINKS, SITE } from "@/lib/config";

const FULL  = { w: 146, h: 224, logo: 96, logoMt: 12 };
const SMALL = { w: 72,  h: 72,  logo: 60, logoMt: 6  };

/* ── Kayan-çizgi nav link ──────────────────────── */
function NavLink({ href, label, scrolled }: { href: string; label: string; scrolled: boolean }) {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "power3.out", overwrite: true });
  };

  const onLeave = () => {
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in", overwrite: true });
  };

  return (
    <Link
      ref={wrapRef}
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-flex flex-col items-center py-1 group"
      style={{ fontFamily: "var(--font-josefin)" }}
    >
      <span
        className={`font-light text-sm tracking-[0.22em] uppercase transition-colors duration-300 ${
          scrolled ? "text-primary" : "text-white"
        }`}
        style={{ display: "inline-block" }}
      >
        {label}
      </span>
      {/* Kayan alt çizgi */}
      <span
        ref={lineRef}
        className={`absolute bottom-0 left-0 w-full h-[1.5px] origin-left transition-colors duration-300 ${
          scrolled ? "bg-primary" : "bg-white"
        }`}
        style={{ transform: "scaleX(0)" }}
      />
    </Link>
  );
}

/* ── Ana bileşen ───────────────────────────────────────────── */
export default function Navbar() {
  const boxRef       = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const isScrolledRef = useRef(false);
  const isHoveredRef  = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Diğer sayfalarda her zaman "scrolled" (kırmızı) modda olsun
  const effectiveScrolled = !isHome || scrolled;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const expand = () => {
    if (window.innerWidth < 768) return; // mobilde animasyon yok
    gsap.to(boxRef.current,  { width: FULL.w, height: FULL.h, duration: 0.5, ease: "power3.out" });
    gsap.to(logoRef.current, { width: FULL.logo, height: FULL.logo, marginTop: FULL.logoMt, duration: 0.5, ease: "power3.out" });
    gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.4, delay: 0.18, ease: "power2.out" });
  };

  const collapse = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    gsap.to(boxRef.current,  { width: SMALL.w, height: SMALL.h, duration: 0.45, ease: "power2.inOut" });
    gsap.to(logoRef.current, { width: SMALL.logo, height: SMALL.logo, marginTop: SMALL.logoMt, duration: 0.45, ease: "power2.inOut" });
    gsap.to(textRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" });
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Blur arka planı: Ana sayfada scroll ile, diğer sayfalarda hep görünür
      gsap.to(bgRef.current, {
        opacity: (!isHome || y > 1) ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });

      // Link rengi için state güncelle
      setScrolled(y > 1);

      // Logo kutusu collapse/expand: 80px eşiği
      const isScrolled = y > 80;
      if (isScrolled === isScrolledRef.current) return;
      isScrolledRef.current = isScrolled;
      if (!isHoveredRef.current) {
        if (isScrolled) collapse();
        else expand();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleEnter = () => { if (typeof window !== "undefined" && window.innerWidth >= 768) { isHoveredRef.current = true;  if (isScrolledRef.current) expand(); } };
  const handleLeave = () => { if (typeof window !== "undefined" && window.innerWidth >= 768) { isHoveredRef.current = false; if (isScrolledRef.current) collapse(); } };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 h-16 md:h-24 md:px-10 transition-all duration-300">
        {/* Arka plan */}
        <div
          ref={bgRef}
          className="absolute inset-0 -z-10"
          style={{
            opacity: isHome ? 0 : 1,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        />

        {/* SOL: Hamburger (Sadece Mobil) */}
        <div className="flex md:hidden items-center z-[110]">
          <button
            onClick={toggleMenu}
            className="flex flex-col gap-1.5 p-3 -ml-2"
            aria-label="Menü"
          >
            <span 
              className="w-7 h-0.5 transition-all duration-300" 
              style={{ 
                backgroundColor: isMenuOpen ? "#FFFFFF" : (effectiveScrolled ? "#BD2333" : "#FFFFFF"),
                transform: isMenuOpen ? "rotate(45deg) translateY(8px)" : "none"
              }} 
            />
            <span 
              className="w-7 h-0.5 transition-all duration-300" 
              style={{ 
                backgroundColor: isMenuOpen ? "#FFFFFF" : (effectiveScrolled ? "#BD2333" : "#FFFFFF"),
                opacity: isMenuOpen ? 0 : 1
              }} 
            />
            <span 
              className="w-7 h-0.5 transition-all duration-300" 
              style={{ 
                backgroundColor: isMenuOpen ? "#FFFFFF" : (effectiveScrolled ? "#BD2333" : "#FFFFFF"),
                transform: isMenuOpen ? "rotate(-45deg) translateY(-8px)" : "none"
              }} 
            />
          </button>
        </div>

        {/* SOL: Desktop Linkler */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} scrolled={effectiveScrolled} />
            </li>
          ))}
        </ul>

        {/* MERKEZ: Logo Kutusu */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-[105]">
          <Link href="/" aria-label={SITE.marka}>
            <div
              ref={boxRef}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              className="bg-primary flex flex-col items-center overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 ease-in-out"
              style={{ 
                width: scrolled ? SMALL.w : (isMenuOpen ? SMALL.w : (isMobile ? 110 : FULL.w)), 
                height: scrolled ? SMALL.h : (isMenuOpen ? SMALL.h : (isMobile ? 180 : FULL.h)),
                borderRadius: "0 0 12px 12px",
              }}
            >
              <div
                ref={logoRef}
                className="relative shrink-0 transition-all duration-500"
                style={{ 
                  width: scrolled ? SMALL.logo : (isMobile ? 76 : FULL.logo), 
                  height: scrolled ? SMALL.logo : (isMobile ? 76 : FULL.logo), 
                  marginTop: scrolled ? SMALL.logoMt : (isMobile ? 14 : FULL.logoMt) 
                }}
              >
                <Image
                  src="/logo.jpg"
                  alt={SITE.marka}
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                  sizes="120px"
                />
              </div>

              <div 
                ref={textRef} 
                className={`mt-2 text-center leading-none transition-all duration-500 ${scrolled || isMenuOpen ? 'opacity-0 scale-75' : 'opacity-1 scale-100'}`}
              >
                <p className="text-white font-serif text-[20px] md:text-[26px] font-bold leading-tight">Etlik</p>
                <p className="text-white font-serif text-[20px] md:text-[26px] font-bold leading-tight">Yayla</p>
                <p className="text-white font-serif text-[20px] md:text-[26px] font-bold leading-tight">Kasabı</p>
              </div>
            </div>
          </Link>
        </div>

        {/* SAĞ: Desktop Linkler + Mobil CTA */}
        <div className="flex items-center gap-4 md:gap-10">
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.slice(2).map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} scrolled={effectiveScrolled} />
            </li>
          ))}
          </ul>
          <a
            href={SITE.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white text-[10px] md:text-sm font-black tracking-widest uppercase rounded-full hover:bg-dark transition-all duration-300 shadow-lg active:scale-95"
          >
            {SITE.ctaMetin}
          </a>
        </div>
      </nav>

      {/* MOBİL MENÜ OVERLAY (Full Screen) */}
      <div 
        className={`fixed inset-0 z-[90] bg-primary flex flex-col items-center justify-center transition-all duration-500 ease-expo ${isMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-110'}`}
      >
        <div className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-4xl font-serif italic tracking-wider hover:text-white/70 transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

