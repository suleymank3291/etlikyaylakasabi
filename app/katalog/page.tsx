"use client";

import { useState, useRef, useCallback, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/config";

/* ═══════════════════════════════════════════════
   VERİ
═══════════════════════════════════════════════ */
type Urun     = { isim: string; fiyat: string };
type AltGrup  = { baslik: string; gorselSol: boolean; urunler: Urun[]; gorsel: string };
type Kategori = { slug: string; isim: string; altGruplar: AltGrup[] };

const KATEGORILER: Kategori[] = [
  {
    slug: "dana",
    isim: "Dana Eti",
    altGruplar: [
      {
        baslik: "Premium Dana Kesimleri",
        gorselSol: true,
        gorsel: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800",
        urunler: [
          { isim: "Dana Antrikot (1 kg)",  fiyat: "1.790,00 TL" },
          { isim: "Dana Bonfile (1 kg)",   fiyat: "3.100,00 TL" },
          { isim: "Dana Lokum (1 kg)",     fiyat: "2.950,00 TL" },
          { isim: "Dana Kontrfile (1 kg)", fiyat: "1.950,00 TL" },
          { isim: "Dana T-Bone (1 kg)",    fiyat: "2.200,00 TL" },
        ],
      },
      {
        baslik: "Günlük Dana Yemeklik",
        gorselSol: false,
        gorsel: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800",
        urunler: [
          { isim: "Dana Kıyma (1 kg)",      fiyat: "890,00 TL"  },
          { isim: "Dana Kuşbaşı (1 kg)",    fiyat: "1.100,00 TL" },
          { isim: "Dana Sote (1 kg)",       fiyat: "1.050,00 TL" },
          { isim: "Dana Haşlamalık (1 kg)", fiyat: "750,00 TL"  },
          { isim: "Dana Kemikli (1 kg)",    fiyat: "720,00 TL"  },
        ],
      },
      {
        baslik: "Dana Mangallık",
        gorselSol: true,
        gorsel: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        urunler: [
          { isim: "Dana Biftek (1 kg)",   fiyat: "1.850,00 TL" },
          { isim: "Dana Şiş (1 kg)",      fiyat: "1.200,00 TL" },
          { isim: "Dana Külbastı (1 kg)", fiyat: "1.300,00 TL" },
        ],
      },
    ],
  },
  {
    slug: "kuzu",
    isim: "Kuzu Eti",
    altGruplar: [
      {
        baslik: "Kuzu Özel Kesimleri",
        gorselSol: true,
        gorsel: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=800",
        urunler: [
          { isim: "Kuzu Pirzola (1 kg)", fiyat: "2.850,00 TL" },
          { isim: "Kuzu Rack (1 kg)",    fiyat: "3.200,00 TL" },
          { isim: "Kuzu Lokum (1 kg)",   fiyat: "2.700,00 TL" },
          { isim: "Kuzu Bonfile (1 kg)", fiyat: "3.100,00 TL" },
        ],
      },
      {
        baslik: "Kuzu Yemeklik",
        gorselSol: false,
        gorsel: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=800",
        urunler: [
          { isim: "Kuzu Kol (1 kg)",   fiyat: "1.400,00 TL" },
          { isim: "Kuzu But (1 kg)",   fiyat: "1.350,00 TL" },
          { isim: "Kuzu Kıyma (1 kg)", fiyat: "1.250,00 TL" },
          { isim: "Kuzu Şiş (1 kg)",   fiyat: "1.500,00 TL" },
        ],
      },
    ],
  },
  {
    slug: "beyaz",
    isim: "Beyaz Et",
    altGruplar: [
      {
        baslik: "Tavuk Kesimleri",
        gorselSol: true,
        gorsel: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800",
        urunler: [
          { isim: "Tavuk Göğsü (1 kg)",    fiyat: "450,00 TL" },
          { isim: "Tavuk Pirzola (1 kg)",   fiyat: "520,00 TL" },
          { isim: "Tavuk Kanat (1 kg)",     fiyat: "380,00 TL" },
          { isim: "Kelebek Tavuk (1 kg)",   fiyat: "490,00 TL" },
        ],
      },
      {
        baslik: "Marine & Fırınlık",
        gorselSol: false,
        gorsel: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?q=80&w=800",
        urunler: [
          { isim: "Marine Tavuk Şiş (1 kg)", fiyat: "580,00 TL" },
          { isim: "Köri Marine (1 kg)",      fiyat: "600,00 TL" },
          { isim: "Fırınlık Piliç (1 kg)",   fiyat: "620,00 TL" },
          { isim: "Barbekü Kanat (1 kg)",    fiyat: "550,00 TL" },
        ],
      },
    ],
  },
  {
    slug: "diger",
    isim: "Diğer",
    altGruplar: [
      {
        baslik: "Köfte & Sucuk",
        gorselSol: true,
        gorsel: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=800",
        urunler: [
          { isim: "Kasap Köftesi (1 kg)", fiyat: "1.400,00 TL" },
          { isim: "İnegöl Köfte (1 kg)", fiyat: "1.350,00 TL" },
          { isim: "Adana Köfte (1 kg)",  fiyat: "1.300,00 TL" },
          { isim: "Sucuk (1 kg)",        fiyat: "1.600,00 TL" },
        ],
      },
      {
        baslik: "Şarküteri",
        gorselSol: false,
        gorsel: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800",
        urunler: [
          { isim: "Pastırma (1 kg)",           fiyat: "2.200,00 TL" },
          { isim: "Dana Kavurma (1 kg)",        fiyat: "2.500,00 TL" },
          { isim: "Küçük Baş Kavurma (1 kg)",  fiyat: "2.350,00 TL" },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════
   YARDIMCI BİLEŞENLER
═══════════════════════════════════════════════ */
function ResimKutusu() {
  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-2xl"
      style={{
        border: "2px dashed rgba(189,35,51,0.25)",
        backgroundColor: "rgba(189,35,51,0.04)",
      }}
    >
      <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#BD2333" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round"/>
          <path d="M17 8L12 3L7 8" stroke="#BD2333" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3V15" stroke="#BD2333" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round"/>
        </svg>
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "rgba(189,35,51,0.35)" }}>
          Fotoğraf
        </span>
      </div>
    </div>
  );
}

function UrunSatiri({ isim, fiyat }: Urun) {
  return (
    <div className="flex items-end py-[18px] border-b border-neutral-200">
      <span
        className="shrink-0 italic font-semibold text-neutral-800 text-base md:text-lg leading-tight pb-[3px]"
        style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", letterSpacing: "0.01em" }}
      >
        {isim}
      </span>
      {/* Noktalı lider — satır tabanında */}
      <span
        className="flex-1 mx-4 md:mx-6"
        style={{
          display: "inline-block",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.52) 1.5px, transparent 1.5px)",
          backgroundSize: "7px 7px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "left bottom 4px",
          height: "1.1em",
          minWidth: 0,
        }}
      />
      <span
        className="shrink-0 font-bold text-base md:text-lg tabular-nums text-neutral-900 pb-[3px]"
        style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", letterSpacing: "0.02em" }}
      >
        {fiyat}
      </span>
    </div>
  );
}

function AltGrupBlok({ grup }: { grup: AltGrup }) {
  const resimSol = grup.gorselSol;

  return (
    <div className="mb-20 md:mb-28">
      {/* Alt başlık */}
      <div className="flex items-center gap-4 mb-8">
        <span
          className="inline-block w-5 h-px shrink-0"
          style={{ backgroundColor: "#BD2333" }}
        />
        <h3
          className="text-xl md:text-2xl font-semibold italic text-primary leading-none"
          style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", letterSpacing: "0.01em" }}
        >
          {grup.baslik}
        </h3>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(189,35,51,0.15)" }} />
      </div>

      {/* Resim + Ürünler yan yana — resim ürün listesiyle aynı yükseklikte uzar */}
      <div
        className={`flex flex-col md:flex-row items-stretch gap-8 md:gap-12 lg:gap-16 ${
          !resimSol ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Resim kutusu */}
        <div className="shrink-0 w-full md:w-[300px] rounded-2xl overflow-hidden self-stretch min-h-[260px] relative">
          <Image
            src={grup.gorsel}
            alt={grup.baslik}
            fill
            className="object-cover"
          />
        </div>

        {/* Ürün listesi */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {grup.urunler.map((u) => (
            <UrunSatiri key={u.isim} {...u} />
          ))}
        </div>
      </div>
    </div>
  );
}

const N = KATEGORILER.length; // 4

/* ═══════════════════════════════════════════════
   PANEL İÇERİĞİ (ayrı bileşen — şerit'te 4x render)
═══════════════════════════════════════════════ */
function KategoriPanel({ kat }: { kat: (typeof KATEGORILER)[0] }) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <div className="mb-12 md:mb-16">
        <p
          className="text-[10px] font-black tracking-[0.25em] uppercase mb-3"
          style={{ color: "rgba(189,35,51,0.5)" }}
        >
          Et Kataloğu
        </p>
        <h2
          className="text-5xl md:text-7xl font-black leading-none text-neutral-900"
          style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", letterSpacing: "-0.02em" }}
        >
          {kat.isim}
        </h2>
        <div className="mt-4 h-[2px] w-24" style={{ backgroundColor: "#BD2333" }} />
      </div>
      {kat.altGruplar.map((grup) => (
        <AltGrupBlok key={grup.baslik} grup={grup} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ANA SAYFA
═══════════════════════════════════════════════ */
export default function KatalogSayfasi() {
  const [aktifIdx, setAktifIdx] = useState(0);
  const aktifIdxRef   = useRef(0);
  const stripRef      = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const panelRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef      = useRef<gsap.core.Tween | null>(null);
  const progressObj   = useRef({ v: 0 });

  /* İlk yüklemede container yüksekliğini ayarla */
  useLayoutEffect(() => {
    const panel = panelRefs.current[0];
    if (containerRef.current && panel) {
      containerRef.current.style.height = `${panel.scrollHeight}px`;
    }
  }, []);

  /* Aktif panel değişince container yüksekliği güncelle */
  useEffect(() => {
    const panel = panelRefs.current[aktifIdx];
    if (containerRef.current && panel) {
      containerRef.current.style.height = `${panel.scrollHeight}px`;
    }
  }, [aktifIdx]);

  const goToKat = useCallback((slug: string) => {
    const tgtIdx = KATEGORILER.findIndex((k) => k.slug === slug);
    if (tgtIdx === aktifIdxRef.current) return;

    tweenRef.current?.kill();
    aktifIdxRef.current = tgtIdx;
    setAktifIdx(tgtIdx);

    const dist = Math.abs(tgtIdx - progressObj.current.v);
    /* Mesafeye göre hız: 1 adım 0.55 s, her ek adım +0.12 s (sabit hız hissi) */
    const dur  = 0.55 + dist * 0.12;

    tweenRef.current = gsap.to(progressObj.current, {
      v: tgtIdx,
      duration: dur,
      ease: "power3.inOut",
      onUpdate() {
        if (stripRef.current) {
          gsap.set(stripRef.current, {
            x: `-${progressObj.current.v * (100 / N)}%`,
          });
        }
      },
      onComplete() {
        /* Animasyon bitince yüksekliği güncelle */
        const panel = panelRefs.current[tgtIdx];
        if (containerRef.current && panel) {
          containerRef.current.style.height = `${panel.scrollHeight}px`;
        }
      },
    });
  }, []);

  return (
    <main style={{ backgroundColor: "#F5F0E8", paddingTop: 240 }}>

      {/* ── KATEGORİ NAVİGASYONU ─────────────────────── */}
      <div
        className="sticky top-16 z-40"
        style={{ backgroundColor: "#F5F0E8", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center gap-10 md:gap-16 py-5">
            {KATEGORILER.map((k, i) => {
              const aktif = i === aktifIdx;
              return (
                <button
                  key={k.slug}
                  onClick={() => goToKat(k.slug)}
                  className="relative pb-2"
                  style={{
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: aktif ? "#BD2333" : "rgba(0,0,0,0.4)",
                    fontStyle: "italic",
                    transition: "color 0.3s",
                  }}
                >
                  {k.isim}
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left"
                    style={{
                      transform: aktif ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── GSAP ŞERİT ALANI ─────────────────────────── */}
      {/*
        overflow: hidden → şeridin dışı kliplenir
        height: JS ile aktif panelin scrollHeight'ına eşitlenir
        Böylece sayfa dikey scroll'u tam çalışır, yatay taşma gizlenir
      */}
      <div ref={containerRef} style={{ overflow: "hidden", position: "relative" }}>
        <div
          ref={stripRef}
          style={{ display: "flex", width: `${N * 100}%`, alignItems: "flex-start" }}
        >
          {KATEGORILER.map((kat, i) => (
            <div
              key={kat.slug}
              ref={(el) => { panelRefs.current[i] = el; }}
              style={{ width: `${100 / N}%`, flexShrink: 0 }}
            >
              <KategoriPanel kat={kat} />
            </div>
          ))}
        </div>
      </div>

      {/* ── SİPARİŞ VER KUTUSU ───────────────────────── */}
      <div style={{ backgroundColor: "#BD2333" }} className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Etlik Yayla Kasabı
          </p>
          <h2
            className="text-4xl md:text-6xl font-black text-white leading-none mb-4"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", letterSpacing: "-0.02em" }}
          >
            Taze Eti Kapınıza
            <em className="block not-italic" style={{ color: "rgba(0,0,0,0.25)" }}>Getirelim</em>
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Yemeksepeti üzerinden sipariş verin, kasap kesimi taze etiniz en kısa sürede
            sofraya gelsin.
          </p>
          <a
            href={SITE.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-black text-sm tracking-widest uppercase rounded-full shadow-2xl hover:bg-neutral-100 transition-colors duration-300"
            style={{ fontFamily: "var(--font-josefin, sans-serif)" }}
          >
            {SITE.ctaMetin}
          </a>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────── */}
      <Footer />

    </main>
  );
}
