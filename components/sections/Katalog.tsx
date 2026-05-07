"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

/**
 * 5 resmin layout pozisyonları ve delta değerleri birebir
 * kaynak projedeki parallax-images CSS'inden alınmıştır.
 * delta: mousemove parallax için GSAP duration (0.5=hızlı, 1=yavaş)
 */
const IMAGES_BASE = [
  {
    src: "/images/etlikyaylakasabi_1629920256_2648285513519960057_39180567620_1.jpg",
    style: { top: "12%",    left: "9%",  width: "22.4vw", height: "59.3vh" },
    mobileStyle: { top: "15%", left: "5%", width: "40vw", height: "30vh" },
    delta: 1,
  },
  {
    src: "/images/etlikyaylakasabi_1636185918_2700845699765988878_39180567620_1.jpg",
    style: { top: "1%",     left: "45%", width: "23.4vw", height: "29.6vh" },
    mobileStyle: { top: "5%", left: "55%", width: "35vw", height: "20vh" },
    delta: 0.5,
  },
  {
    src: "/images/etlikyaylakasabi_1644649384_2771842393604421646_39180567620_1.jpg",
    style: { top: "-3%",    left: "76%", width: "20.8vw", height: "54.6vh" },
    mobileStyle: { top: "50%", left: "60%", width: "38vw", height: "35vh" },
    delta: 0.75,
  },
  {
    src: "/images/etlikyaylakasabi_1661684832_2914746089249312712_39180567620_1.jpg",
    style: { bottom: "-5%", left: "36%", width: "20.1vw", height: "47.7vh" },
    mobileStyle: { bottom: "5%", left: "10%", width: "45vw", height: "35vh" },
    delta: 1,
  },
  {
    src: "/images/etlikyaylakasabi_1663510893_2930064202811506642_39180567620_1.jpg",
    style: { bottom: "-1%", left: "72%", width: "15.6vw", height: "41.7vh" },
    mobileStyle: { bottom: "15%", left: "65%", width: "30vw", height: "25vh" },
    delta: 1,
  },
];

export default function Katalog() {
  const sectionRef  = useRef<HTMLElement>(null);
  const galleryRef  = useRef<HTMLDivElement>(null);
  const wrapRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef  = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const gallery = galleryRef.current;
    if (!gallery) return;

    const wraps  = wrapRefs.current.filter(Boolean)  as HTMLDivElement[];
    const inners = innerRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {

      /**
       * REVEAL ANİMASYONU (orijinal: initImagesIntro)
       * ─────────────────────────────────────────────
       * Wrapper:  polygon tek nokta → tam dikdörtgen  (kare büyür)
       * Image:    scale 1.3 → 1.1                    (zoom out yerleşir)
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top 50%",
        },
      });

      tl.addLabel("start")
        .fromTo(
          wraps,
          { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            stagger:  0.15,
            duration: 0.8,
            ease:     "power2.out",
          },
          "start"
        )
        .fromTo(
          inners,
          { scale: 1.3 },
          {
            scale:    1.1,
            stagger:  0.15,
            duration: 0.8,
            ease:     "power2.out",
          },
          "start+=0.2"
        );

      /**
       * MOUSE PARALLAx (orijinal: initParallax + parallaxIt)
       * ─────────────────────────────────────────────────────
       * Wrapper'lar: offset -50, duration = delta değeri
       * Inner img'ler: offset -35, duration = 0.5 (sabit)
       *
       * Formül: x = (mouseX - containerCenter) / containerWidth * offset
       */
      const parallaxIt = (
        e: MouseEvent,
        target: HTMLElement,
        offset: number,
        duration: number
      ) => {
        const rect = gallery.getBoundingClientRect();
        const d = e.pageX - (rect.left + window.scrollX);
        const f = e.pageY - (rect.top  + window.scrollY);
        gsap.to(target, {
          x: (d - rect.width  / 2) / rect.width  * offset,
          y: (f - rect.height / 2) / rect.height * offset,
          duration,
          overwrite: "auto",
        });
      };

      const onMove = (e: MouseEvent) => {
        wraps.forEach((el, i) => {
          parallaxIt(e, el, -50, IMAGES_BASE[i].delta);
        });
        inners.forEach((el) => {
          parallaxIt(e, el, -35, 0.5);
        });
      };

      const onEnter = () => {};
      const onLeave = () => {
        wraps.forEach(el =>
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "power3.out" })
        );
        inners.forEach(el =>
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "power3.out" })
        );
      };

      gallery.addEventListener("mousemove",  onMove);
      gallery.addEventListener("mouseenter", onEnter);
      gallery.addEventListener("mouseleave", onLeave);

      return () => {
        gallery.removeEventListener("mousemove",  onMove);
        gallery.removeEventListener("mouseenter", onEnter);
        gallery.removeEventListener("mouseleave", onLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Özel imleç (Sadece Desktop) */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 z-[200] w-20 h-20 rounded-full bg-primary pointer-events-none flex items-center justify-center"
          style={{ opacity: 0, transform: "scale(0)", willChange: "transform" }}
        >
          <span className="text-white text-[10px] font-bold tracking-widest uppercase">Keşfet</span>
        </div>
      )}

      <section
        id="katalog"
        ref={sectionRef}
        className={`relative bg-white ${isMobile ? "py-20" : "min-h-[110vh]"}`}
      >
        {isMobile ? (
          /* ── MOBİL: Karo (Grid) Düzeni ── */
          <div className="px-6 flex flex-col gap-10">
            {/* Üst 2 resim */}
            <div className="grid grid-cols-2 gap-4">
              {IMAGES_BASE.slice(0, 2).map((img, i) => (
                <div key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <Image src={img.src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Orta Yazı (GooeyText) */}
            <div className="flex justify-center py-6 h-32 items-center">
              <GooeyText
                texts={["doğal.", "taze.", "lezzetli."]}
                morphTime={1.2}
                cooldownTime={1.5}
                className="w-full max-w-[280px] font-serif"
                textClassName="font-serif text-primary text-[3.2rem] text-center"
              />
            </div>

            {/* Alt 3 resim (1 büyük, 2 küçük veya tersi) */}
            <div className="grid grid-cols-2 gap-4">
               <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg col-span-2">
                 <Image src={IMAGES_BASE[2].src} alt="" fill className="object-cover" />
               </div>
               {IMAGES_BASE.slice(3, 5).map((img, i) => (
                <div key={i+3} className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image src={img.src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: Parallax Galeri Düzeni ── */
          <>
            <div
              ref={galleryRef}
              className="absolute left-0 right-0 bottom-0 overflow-hidden"
              style={{ zIndex: 1, top: "5vh" }}
            >
              {IMAGES_BASE.map((img, i) => (
                <div
                  key={i}
                  ref={(el) => { wrapRefs.current[i] = el; }}
                  className="absolute overflow-hidden shadow-2xl"
                  style={{
                    ...img.style,
                    borderRadius: "0.52vw",
                  }}
                >
                  <div
                    ref={(el) => { innerRefs.current[i] = el; }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ borderRadius: "0.52vw" }}
                      sizes="25vw"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* GooeyText — Desktop Ortada */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 2 }}
            >
              <GooeyText
                texts={["doğal.", "taze.", "lezzetli."]}
                morphTime={1.2}
                cooldownTime={1.5}
                className="w-[260px] md:w-[420px] lg:w-[560px] h-28 md:h-36 lg:h-44 font-serif"
                textClassName="font-serif text-primary text-[3rem] md:text-[5rem] lg:text-[7rem]"
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
