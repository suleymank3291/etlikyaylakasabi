"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   Veri tanımları
───────────────────────────────────────────── */
type AltKategori = {
  slug: string;
  navLabel: string; // kısa, alt nav için
  baslik: string;
  icerik: string;
  altMetin: string;
  gorsel: string;
};

type UstKategori = {
  slug: string;
  isim: string;
  layout: "image-left" | "image-right"; // kırmızı et → image-left
  altlar: AltKategori[];
};

const KATEGORILER: UstKategori[] = [
  {
    slug: "kirmizi-et",
    isim: "Kırmızı Et",
    layout: "image-left",
    altlar: [
      {
        slug: "dry-aged",
        navLabel: "Dry Aged & Steak",
        baslik: "Dry Aged & Premium Steak",
        icerik:
          "Kasabın soğuk hücrelerinde günlerce dinlendirilen etler, lif lif yumuşarken içindeki tüm lezzeti derinleştirir. T-Bone, Dallas ve Antrikot — bıçak değer değmez fark edilir bu fark.",
        altMetin:
          "Özel bir akşam için sofranızı kurmadan önce bir kez deneyin. Geri dönüşü olmayan bir lezzet bu.",
        gorsel: "/images/kategori/dry-aged-steak.jpg",
      },
      {
        slug: "mangal-atesi",
        navLabel: "Mangal Ateşi",
        baslik: "Mangal Ateşi — Izgaralıklar",
        icerik:
          "Kuzu pirzola, antrikot, külbastı, şişlik etler. Doğru kesim, doğru kalınlık, doğru mermer dağılımı — ateşin üstünde izi çıkar, içi pembe kalır.",
        altMetin:
          "Bu hafta sonu misafir mi var? Mangalı yakın, gerisini biz hallettik.",
        gorsel: "/images/kategori/kuzu-pirzola.jpg",
      },
      {
        slug: "kofte-sucuk",
        navLabel: "Köfte & Sucuk",
        baslik: "Kasabın Köfteleri & Sucuk",
        icerik:
          "İnegöl, kaşarlı, kasap köftesi ve ev yapımı sucuk — tamamı bizim özel baharatımızla, sabah yoğrulan taze kıymadan. Hazır köfte miydi demeyin, bir tadın.",
        altMetin:
          "Çocuklar için, hızlı bir akşam yemeği için ya da sırf kendinizi şımartmak için. Her lokmada emeğimiz var.",
        gorsel: "/images/kategori/kofte-sucuk.jpg",
      },
      {
        slug: "ev-yemeklik",
        navLabel: "Ev Yemeklik",
        baslik: "Günlük Ev Yemeklik",
        icerik:
          "Kıyma, kuşbaşı, sote, kemikli et — evin eksiği neyse biz buradayız. Her sabah taze gelen parçalardan istediğiniz gramajda, kasap kesimi.",
        altMetin:
          "Pazarda zaman kaybetmeyin. Sabah sipariş verin, akşam sofranızda taze et olsun.",
        gorsel: "/images/kategori/gunluk-et.jpg",
      },
    ],
  },
  {
    slug: "beyaz-et",
    isim: "Beyaz Et",
    layout: "image-right",
    altlar: [
      {
        slug: "mangallik-izgara",
        navLabel: "Mangallık & Izgara",
        baslik: "Mangallık & Izgara",
        icerik:
          "Kanat, kelebek, kemiksiz ızgara tava, tavuk şiş — ateşte kararıp kokusu etrafa yayılsın diye özel hazırlanmış parçalar. Derisini altın sarısına çevirenler için.",
        altMetin:
          "Mangal kurmadan önce et seçin — geri kalanı zaten kolay.",
        gorsel: "/images/kategori/tavuk-kanat.jpg",
      },
      {
        slug: "marine-lezzetler",
        navLabel: "Marine Lezzetler",
        baslik: "Marine & Soslu Lezzetler",
        icerik:
          "Köri, barbekü, kekik — kasapta marine edilmiş, tavaya atmaya hazır. Sosun içine sinmiş lezzet, kendiniz yapmaya çalışınca hep bir şeylerin eksik kaldığını hissedersiniz. Biz zaten yaptık.",
        altMetin:
          "Zamanınız mı yok? Tepsiye dök, fırına ver — 35 dakika sonra sofrada.",
        gorsel: "/images/kategori/marine-tavuk.jpg",
      },
      {
        slug: "tencere-sote",
        navLabel: "Tencere & Sote",
        baslik: "Günlük Tencere & Sote",
        icerik:
          "Kuşbaşı doğranmış tavuk, sote eti, haşlamalık baget, çorbalık sırt. Sotelemelik ince dilimler, çorbaya girecek parçalar, sulu yemek için tam doğrulmuş etler — her biri ayrı ayrı hazır.",
        altMetin:
          "Akşam yemeği planınız ne olursa olsun, doğru kesim burada sizi bekliyor.",
        gorsel: "/images/kategori/tavuk-sote.jpg",
      },
      {
        slug: "firinlik",
        navLabel: "Fırınlık",
        baslik: "Fırınlık & Bütün Lezzetler",
        icerik:
          "Bütün fırınlık piliç, kalçalı but, fırın torbasında pişmeye hazır baharatlı tavuk. Pazar öğleni fırından çıkan o kokunun sırrı büyük ölçüde doğru etten geçiyor.",
        altMetin:
          "Aile sofrasını hazırlarken zamandan kazanın — eti alın, fırına verin, kokuyu siz yapın.",
        gorsel: "/images/kategori/firinlik-pilis.jpg",
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Slide varyantı — resim+metin BİR BÜTÜN olarak
   dir > 0 (ileri): mevcut sola gider, yeni sağdan gelir
   dir < 0 (geri):  mevcut sağa gider, yeni soldan gelir
───────────────────────────────────────────── */
const unitVariants = {
  initial: (dir: number) => ({ x: dir >= 0 ? "100vw" : "-100vw", opacity: 0 }),
  animate: { x: "0vw", opacity: 1 },
  exit:    (dir: number) => ({ x: dir >= 0 ? "-100vw" : "100vw", opacity: 0 }),
};

const transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ─────────────────────────────────────────────
   Başlık: özel kelimeleri kırmızıya boyar
   (ilk iki anlamlı kelimeyi otomatik vurgular)
───────────────────────────────────────────── */
function StyledTitle({ text }: { text: string }) {
  // İlk '&' veya ikinci kelime grubundan sonrasını kırmızı yap
  const parts = text.split(/(&|–|:)/);
  return (
    <h3 className="font-serif font-black text-2xl md:text-3xl lg:text-4xl leading-tight mb-5 tracking-tight">
      {parts.map((part, i) =>
        i === 0 ? (
          <span key={i} className="text-neutral-900">{part}</span>
        ) : i === 1 ? (
          <span key={i} className="text-primary">{part}</span>
        ) : (
          <span key={i} className="text-neutral-900">{part}</span>
        )
      )}
    </h3>
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function Kategoriler() {
  const [aktifKat, setAktifKat] = useState<string>(KATEGORILER[0].slug);
  const [aktifAlt, setAktifAlt] = useState<number>(0);
  const dirRef = useRef<number>(1);
  const cursorRef = useRef<HTMLDivElement>(null);
  const imgAreaRef = useRef<HTMLDivElement>(null);

  /* Özel imleç */
  useEffect(() => {
    const area = imgAreaRef.current;
    const cursor = cursorRef.current;
    if (!area || !cursor) return;
    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX - 40, y: e.clientY - 40, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };
    const onEnter = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
    const onLeave = () => gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.25 });
    area.addEventListener("mousemove", onMove);
    area.addEventListener("mouseenter", onEnter);
    area.addEventListener("mouseleave", onLeave);
    return () => {
      area.removeEventListener("mousemove", onMove);
      area.removeEventListener("mouseenter", onEnter);
      area.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const ustKat = KATEGORILER.find((k) => k.slug === aktifKat)!;
  const altKat = ustKat.altlar[aktifAlt];
  const isImageLeft = ustKat.layout === "image-left";

  const goToKat = (slug: string) => {
    const mevcutIdx = KATEGORILER.findIndex((k) => k.slug === aktifKat);
    const hedefIdx  = KATEGORILER.findIndex((k) => k.slug === slug);
    dirRef.current  = hedefIdx >= mevcutIdx ? 1 : -1;
    setAktifKat(slug);
    setAktifAlt(0);
  };

  const goToAlt = (idx: number) => {
    dirRef.current = idx >= aktifAlt ? 1 : -1;
    setAktifAlt(idx);
  };

  const animKey = aktifKat + "-" + aktifAlt;

  /* Nav buton stili */
  const navBtn = (aktif: boolean) =>
    `font-black text-sm md:text-base tracking-widest uppercase transition-all duration-300 border-b-2 ${
      aktif
        ? "opacity-100 border-primary text-primary"
        : "border-transparent opacity-40 hover:opacity-80 text-primary"
    }`;

  /* Alt nav buton */
  const altBtn = (aktif: boolean) =>
    `text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 border-b-2 pb-0.5 ${
      aktif
        ? "opacity-100 border-primary text-primary"
        : "border-transparent opacity-40 hover:opacity-80 text-primary"
    }`;

  return (
    <>
      {/* Özel imleç */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[200] w-20 h-20 rounded-full bg-primary pointer-events-none flex items-center justify-center"
        style={{ opacity: 0, transform: "scale(0)", willChange: "transform" }}
      >
        <span className="text-white text-[10px] font-bold tracking-widest uppercase">Keşfet</span>
      </div>

      <section
        className="relative w-full overflow-hidden flex flex-col"
        style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}
      >

        {/* ── ÜST KATEGORİ NAVİGASYONU ── */}
        <div className="w-full flex justify-center items-center pt-16 pb-6 z-30">
          <div className="flex items-center gap-10 md:gap-16">

            {/* Sol: Kırmızı Et */}
            <button
              onClick={() => goToKat("kirmizi-et")}
              className={navBtn(aktifKat === "kirmizi-et")}
            >
              Kırmızı Et
            </button>

            {/* Merkez: E logosu */}
            <div
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ backgroundColor: "#BD2333" }}
            >
              <span className="text-white font-serif font-black text-2xl md:text-3xl leading-none">E</span>
            </div>

            {/* Sağ: Beyaz Et */}
            <button
              onClick={() => goToKat("beyaz-et")}
              className={navBtn(aktifKat === "beyaz-et")}
            >
              Beyaz Et
            </button>
          </div>
        </div>

        {/* ── ORTA İÇERİK ALANI ── */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pb-10 overflow-hidden">
          <AnimatePresence mode="popLayout" custom={dirRef.current}>
            <motion.div
              key={animKey}
              custom={dirRef.current}
              variants={unitVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24 ${
                isImageLeft ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* GÖRSEL */}
              <div
                ref={imgAreaRef}
                className="relative w-full md:w-1/2 h-[300px] md:h-[420px] lg:h-[520px] flex-shrink-0 group"
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <Image
                    src={altKat.gorsel}
                    alt={altKat.baslik}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ filter: "drop-shadow(0 24px 40px rgba(191,33,48,0.25))" }}
                    priority
                  />
                </div>
              </div>

              {/* METİN */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                {/* Üst etiket */}
                <p className="text-primary text-xs font-black tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                  <span className="inline-block w-6 h-px bg-primary" />
                  {ustKat.isim}
                </p>

                {/* Başlık */}
                <StyledTitle text={altKat.baslik} />

                {/* Ana metin */}
                <p
                  className="text-neutral-700 text-base md:text-lg leading-relaxed mb-5"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {altKat.icerik}
                </p>

                {/* İkinci paragraf — çağrı niteliğinde */}
                <p className="text-primary font-semibold text-sm md:text-base italic leading-relaxed border-l-2 border-primary pl-4">
                  {altKat.altMetin}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── ALT KATEGORİ NAVİGASYONU ── */}
        <div className="w-full flex justify-center pb-10 z-30 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={aktifKat + "-altlar"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12"
            >
              {ustKat.altlar.map((alt, idx) => (
                <button
                  key={alt.slug}
                  onClick={() => goToAlt(idx)}
                  className={altBtn(aktifAlt === idx)}
                >
                  {alt.navLabel}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </section>
    </>
  );
}
