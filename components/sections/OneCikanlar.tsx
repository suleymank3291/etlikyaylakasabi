"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOLAR = [
  { src: "/media/etlikyaylakasabi_1776076291_3874330842868928823_39180567620_1.mp4",  yazi: "Et, ustalığın ve titizliğin buluştuğu noktada hazırlanır." },
  { src: "/media/etlikyaylakasabi_1776172390_3875135712140122026_39180567620_1.mp4",  yazi: "Doğru kesim, doğru lezzet demektir." },
  { src: "/media/etlikyaylakasabi_1776501901_3877900972467043840_39180567620_1.mp4",  yazi: "Aynı et, farklı elde başka hikâye yazar." },
  { src: "/media/etlikyaylakasabi_1776779815_3880231688286669663_39180567620_1.mp4",  yazi: "Taze et, saygının en saf halidir." },
  { src: "/media/etlikyaylakasabi_1776930372_3881495377899876953_39180567620_1.mp4",  yazi: "Her kesim, yılların deneyimini taşır." },
  { src: "/media/etlikyaylakasabi_1777138762_3883242658449761867_39180567620_1.mp4",  yazi: "Kalite, görünmeyende gizlidir." },
  { src: "/media/etlikyaylakasabi_1777365068_3885140999819424416_39180567620_1.mp4",  yazi: "Lezzet bir sabah başlar, ustalıkla olgunlaşır." },
  { src: "/media/etlikyaylakasabi_1777540707_3886614523006337878_39180567620_1.mp4",  yazi: "En iyi et, en iyi eller tarafından seçilir." },
  { src: "/media/etlikyaylakasabi_1777704688_3887990715932395119_39180567620_1.mp4",  yazi: "Sofranızdaki her dilim, bir özenin ürünüdür." },
];

const N        = VIDEOLAR.length;           // 9
const ITEMS    = [...VIDEOLAR, ...VIDEOLAR, ...VIDEOLAR]; // 27
// Sabitler (Desktop değerleri)
const SIDE_W_BASE   = 220;
const SIDE_H_BASE   = 380;
const ACTIVE_W_BASE = 300;
const ACTIVE_H_BASE = 500;
const GAP           = 20;

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const DUR  = "0.65s";

export default function OneCikanlar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const SIDE_W   = isMobile ? 140 : SIDE_W_BASE;
  const SIDE_H   = isMobile ? 240 : SIDE_H_BASE;
  const ACTIVE_W = isMobile ? 200 : ACTIVE_W_BASE;
  const ACTIVE_H = isMobile ? 340 : ACTIVE_H_BASE;
  const STEP     = SIDE_W + GAP;

  const [aktif, setAktif]   = useState(N);       // orta setten başla
  const [canAnim, setCanAnim] = useState(true);  // false = anlık jump
  const videoRefs  = useRef<(HTMLVideoElement | null)[]>([]);
  const advancing  = useRef(false);
  const jumpRef    = useRef(false);

  // Video oynat/durdur — saf ref işlemi, DOM dışı state olmadan
  const syncVideos = useCallback((idx: number) => {
    ITEMS.forEach((_, i) => {
      const v = videoRefs.current[i];
      if (!v) return;
      if (i === idx) { v.currentTime = 0; v.play().catch(() => {}); }
      else           { v.pause(); v.currentTime = 0; }
    });
  }, []);

  const goTo = useCallback((idx: number, animate = true) => {
    if (jumpRef.current) return;
    setCanAnim(animate);
    setAktif(idx);
  }, []);

  useEffect(() => {
    advancing.current = false;
    syncVideos(aktif);

    if (!canAnim) return; // zaten anlık jump, döngü kontrolüne gerek yok

    // Kenara ulaştıysak animasyon bittikten sonra sessizce orta sete atla
    const t = setTimeout(() => {
      if (aktif < N || aktif >= N * 2) {
        jumpRef.current = true;
        const mid = ((aktif % N) + N) % N + N;
        setCanAnim(false);
        setAktif(mid);
        // videoları da güncelle (state tetiklemeden)
        setTimeout(() => {
          syncVideos(mid);
          jumpRef.current = false;
        }, 32);
      }
    }, 700);
    return () => clearTimeout(t);
  }, [aktif, canAnim, syncVideos]);

  // İlk yükleme: sessiz scroll yok, sadece doğru video
  useEffect(() => { syncVideos(N); }, []); // eslint-disable-line

  const handleEnded = useCallback(() => {
    if (advancing.current) return;
    advancing.current = true;
    goTo(aktif + 1);
  }, [aktif, goTo]);

  const realIdx = ((aktif % N) + N) % N;

  // margin-left: aktif kartın merkezi tam 50%'de kalacak şekilde
  const stripML = `calc(50% - ${aktif * STEP + ACTIVE_W / 2}px)`;

  return (
    <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "#BD2333" }}>

      {/* Başlık */}
      <div className="text-center mb-12 px-6">
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          Mutfaktan Sofraya
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
          Ellerin{" "}
          <span className="italic" style={{ color: "rgba(0,0,0,0.28)" }}>Anlattığı Lezzet</span>
        </h2>
      </div>

      {/*
        Sarmalayıcı: sabit yükseklik → section yüksekliği değişmez → dikey zıplama yok.
        overflow:hidden yatay taşmayı kesiyor ama strip kocaman olduğundan yan kartlar hâlâ görünür.
        margin-left ile yatay kaydırma; scroll/scrollIntoView YOK.
      */}
      <div
        style={{
          overflow: "hidden",
          height: ACTIVE_H + 80, // video + yazı alanı — sabit
        }}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          (window as any)._touchX = touch.clientX;
        }}
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0];
          const deltaX = (window as any)._touchX - touch.clientX;
          if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) goTo(aktif + 1);
            else goTo(aktif - 1);
          }
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: GAP,
            height: "100%",
            marginLeft: stripML,
            transition: canAnim ? `margin-left ${DUR} ${EASE}` : "none",
          }}
        >
          {ITEMS.map((v, i) => {
            const isAktif = i === aktif;
            const itemReal = i % N;
            return (
              <div
                key={i}
                onClick={() => goTo(i)}
                className="flex-shrink-0 flex flex-col items-center cursor-pointer"
                style={{
                  width:      isAktif ? ACTIVE_W : SIDE_W,
                  transition: canAnim ? `width ${DUR} ${EASE}` : "none",
                }}
              >
                {/* Video kutusu */}
                <div
                  style={{
                    width:      "100%",
                    height:     isAktif ? ACTIVE_H : SIDE_H,
                    borderRadius: 16,
                    overflow:   "hidden",
                    flexShrink: 0,
                    transition: canAnim ? `height ${DUR} ${EASE}` : "none",
                    position:   "relative",
                  }}
                >
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={v.src}
                    muted
                    playsInline
                    loop={false}
                    onEnded={isAktif ? handleEnded : undefined}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Yazı */}
                <div
                  className="text-center mt-3 px-1"
                  style={{
                    opacity:    isAktif ? 1 : 0.4,
                    transition: `opacity ${DUR} ease`,
                    minHeight:  52,
                    width:      "100%",
                  }}
                >
                  <p
                    className="font-serif italic leading-snug"
                    style={{
                      fontSize:   isAktif ? 14 : 10,
                      color:      "rgba(255,255,255,0.92)",
                      transition: `font-size ${DUR} ease`,
                    }}
                  >
                    "{VIDEOLAR[itemReal].yazi}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nokta nav */}
      <div className="flex justify-center gap-2 mt-6">
        {VIDEOLAR.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(N + i)}
            style={{
              width:           i === realIdx ? 28 : 8,
              height:          8,
              borderRadius:    4,
              border:          "none",
              cursor:          "pointer",
              backgroundColor: i === realIdx ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.3)",
              transition:      "width 0.4s ease, background-color 0.3s ease",
              padding:         0,
            }}
          />
        ))}
      </div>

    </section>
  );
}
