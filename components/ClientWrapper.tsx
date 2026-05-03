"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <Navbar />
        {children}
      </div>
    </>
  );
}
