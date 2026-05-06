"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/config";

export default function Iletisim() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Mesajınız iletildi. En kısa sürede size döneceğiz.");
  };

  return (
    <>
      <main
        className="min-h-screen flex flex-col items-center pt-[120px] md:pt-[160px] pb-20"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        {/* Başlık */}
        <div className="w-full max-w-[1800px] px-4 md:px-8 text-left mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            style={{ color: "#BD2333" }}
          >
            İletişim
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-lg md:text-xl max-w-2xl"
          >
            Sorularınız, siparişleriniz veya özel talepleriniz için bize ulaşın.
            Ankara'nın her yerine taze et ulaştırıyoruz.
          </motion.p>
        </div>

        <div className="w-full max-w-[1800px] px-4 md:px-8 space-y-16">
          {/* İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-neutral-200/50 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#BD2333" }}>Adres</span>
              <p className="text-neutral-700 font-medium leading-relaxed text-lg">
                {SITE.adres}
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-neutral-200/50 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#BD2333" }}>Çalışma Saatleri</span>
              <p className="text-neutral-700 font-medium text-lg">
                Haftanın Her Günü<br />
                {SITE.saat}
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-neutral-200/50 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#BD2333" }}>Telefon</span>
              <a href="tel:03123220606" className="text-neutral-700 font-bold text-2xl hover:text-primary transition-colors">
                0 (312) 322 06 06
              </a>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-neutral-200/50 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#BD2333" }}>Sosyal Medya</span>
              <a href="https://instagram.com/etlikyaylakasabi" target="_blank" className="text-neutral-700 font-bold text-2xl hover:text-primary transition-colors">
                @etlikyaylakasabi
              </a>
            </div>
          </motion.div>

          {/* Harita */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <iframe
              src={SITE.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
