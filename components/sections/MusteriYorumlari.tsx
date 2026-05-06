"use client";

import { useEffect, useRef } from "react";
import { MUSTERI_YORUMLARI, SITE } from "@/lib/config";

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// İsmin baş harflerini avatar olarak kullan
function Avatar({ isim }: { isim: string }) {
  const initials = isim
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    "#BD2333", "#1a73e8", "#0f9d58", "#f4b400",
    "#9c27b0", "#00897b", "#e64a19", "#3949ab",
  ];
  const color = colors[isim.charCodeAt(0) % colors.length];

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

const DOUBLED = [...MUSTERI_YORUMLARI, ...MUSTERI_YORUMLARI];

export default function MusteriYorumlari() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // CSS animation ile sonsuz kayma — JS overhead yok
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative z-20">
      {/* Başlık */}
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-4">
          Misafirlerimizin{" "}
          <span className="italic text-primary">Deneyimleri</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <GoogleIcon />
          <span className="text-neutral-500 text-sm tracking-wide">Google Yorumları</span>
          <span className="flex items-center gap-0.5 ml-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </span>
          <span className="text-neutral-400 text-sm ml-1">5.0</span>
        </div>
      </div>

      {/* Satır 1 — sola kayar */}
      <div className="relative mb-4">
        <div
          className="flex gap-4"
          style={{
            animation: "scrollLeft 40s linear infinite",
            width: "max-content",
          }}
        >
          {DOUBLED.map((y, i) => (
            <YorumKarti key={i} yorum={y} />
          ))}
        </div>
      </div>

      {/* Satır 2 — sağa kayar (ters) */}
      <div className="relative">
        <div
          className="flex gap-4"
          style={{
            animation: "scrollRight 45s linear infinite",
            width: "max-content",
          }}
        >
          {[...DOUBLED].reverse().map((y, i) => (
            <YorumKarti key={i} yorum={y} />
          ))}
        </div>
      </div>

      {/* Kenar soluklaştırma */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
           style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
           style={{ background: "linear-gradient(to left, white, transparent)" }} />

      {/* CTA */}
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

      <style jsx>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function YorumKarti({ yorum }: { yorum: typeof MUSTERI_YORUMLARI[0] }) {
  return (
    <div
      className="flex-shrink-0 bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col gap-3"
      style={{ width: 320 }}
    >
      {/* Üst: avatar + isim + Google logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar isim={yorum.isim} />
          <div>
            <p className="font-semibold text-neutral-900 text-sm leading-tight">{yorum.isim}</p>
            <p className="text-neutral-400 text-xs">{yorum.sure}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>

      {/* Yıldızlar */}
      <div className="flex gap-0.5">
        {[...Array(yorum.puan)].map((_, i) => <StarIcon key={i} />)}
      </div>

      {/* Yorum */}
      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-4">
        {yorum.yorum}
      </p>
    </div>
  );
}
