"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MUSTERI_GORSELLERI, SITE } from "@/lib/config";

export default function MusteriYorumlari() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: { destroy?: () => void } | null = null;

    const initSwiper = async () => {
      const { default: Swiper } = await import("swiper");
      const { Autoplay, FreeMode } = await import("swiper/modules");
      await import("swiper/css");
      await import("swiper/css/free-mode");

      if (!swiperRef.current) return;

      swiperInstance = new (Swiper as unknown as new (el: HTMLElement, opts: unknown) => { destroy?: () => void })(swiperRef.current, {
        modules: [Autoplay, FreeMode],
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: true,
        freeMode: true,
        autoplay: { delay: 0, disableOnInteraction: false },
        speed: 4000,
      });
    };

    initSwiper();

    return () => {
      swiperInstance?.destroy?.();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative z-20">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-4">
          Misafirlerimizin{" "}
          <span className="italic text-primary">Deneyimleri</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto italic">
          Bizi sosyal medyadan etiketleyen misafirlerimizin kareleri.
        </p>
      </div>

      <div ref={swiperRef} className="swiper w-full">
        <div className="swiper-wrapper">
          {[...MUSTERI_GORSELLERI, ...MUSTERI_GORSELLERI].map((g, i) => (
            <div
              key={i}
              className="swiper-slide"
              style={{ width: "300px", height: "380px" }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                <Image src={g.src} alt={g.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center px-6">
        <h3 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-3 text-center">
          BİZİ DEĞERLENDİRİN
        </h3>
        <a
          href={SITE.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-serif tracking-widest uppercase text-sm hover:bg-dark transition-colors duration-500 rounded-full shadow-xl"
        >
          Google&apos;da Yorum Yaz
        </a>
      </div>
    </section>
  );
}
