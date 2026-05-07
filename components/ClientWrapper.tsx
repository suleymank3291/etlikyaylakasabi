"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {/* Loader: overlay olarak her şeyin üstünde, z-9999 */}
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      {/* Navbar her zaman DOM'da — loader arkasında kalır, sonunda açığa çıkar */}
      <div style={{ pointerEvents: loaderDone ? "auto" : "none" }}>
        <Navbar />
        {children}
      </div>
    </>
  );
}
