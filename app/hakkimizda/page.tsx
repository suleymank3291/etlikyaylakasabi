"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Hakkimizda() {
  return (
    <>
      <main
        className="min-h-screen flex flex-col items-center pt-[120px] md:pt-[160px] overflow-hidden"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        {/* Bölüm 1: Ödül - Sol Resim Sağ Yazı */}
        <section className="w-full max-w-[1800px] px-4 md:px-8 mb-32">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image
                src="/images/odul.png"
                alt="2025 Yılı Enleri Ödül Töreni"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <h2 className="font-serif text-primary text-sm font-black uppercase tracking-[0.3em] mb-6">Başarı Hikayemiz</h2>
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-10 leading-[1.1] tracking-tight">
                Ankara'nın <span className="text-primary italic">Zirvesinde</span> Bir Gurur Gecesi
              </h1>
              <div className="space-y-6 text-neutral-700 text-lg md:text-xl leading-relaxed font-light">
                <p>
                  Hilton Garden Inn Ankara'nın büyüleyici atmosferinde gerçekleşen <strong className="text-primary font-bold italic">"2025 Yılı Enleri"</strong> ödül töreninde, 
                  Etlik Yayla Kasabı olarak yılın en başarılı markaları arasında yer almanın haklı gururunu yaşadık. 
                  332+ Reklam ve PR Ajansı tarafından düzenlenen, Emrah Yılmaz'ın organizatörlüğünde hayat bulan bu muhteşem gece, 
                  iş ve sanat dünyasının devlerini bir araya getirdi.
                </p>
                <p>
                  Nefise Karatay ve Kadir Çöpdemir'in eşsiz sunumlarıyla renklenen gecede, sahnede ismimiz yankılanırken sadece bir işletme olarak değil, 
                  yıllardır verdiğimiz <span className="text-primary font-semibold underline decoration-2 underline-offset-4">hijyen, tazelik ve güven</span> sözünün 
                  karşılığını aldığımızı hissettik. Nuri Alço'dan Wilma Elles'e kadar pek çok değerli ismin tanıklık ettiği bu tören, 
                  Etlik Yayla Kasabı'nın sadece bir semt kasabı değil, Ankara'nın <span className="text-primary italic">gastronomi elçisi</span> olduğunun tescili niteliğindeydi.
                </p>
                <p>
                  Bu ödül, sadece bizim değil; her sabah kapımızı çalan, sofrasını bize emanet eden siz değerli müşterilerimizindir. 
                  Geleneksel kasaplık sanatını modern standartlarla birleştirerek, Ankara'nın kalbinde en iyiyi sunmaya devam edeceğiz.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bölüm 2: Full Width Resim */}
        <section className="w-full h-[60vh] md:h-[80vh] relative mb-32 group overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="Etlik Yayla Kasabı Mağaza"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
             <div className="border-2 border-white/50 p-10 backdrop-blur-sm">
                <p className="text-white font-serif text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Ustalık & Tutku</p>
             </div>
          </div>
        </section>

        {/* Bölüm 3: Etin Jönü - Sağ Resim Sol Yazı */}
        <section className="w-full max-w-[1800px] px-4 md:px-8 mb-32">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <h2 className="font-serif text-primary text-sm font-black uppercase tracking-[0.3em] mb-6">Karakterin Sanatı</h2>
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-10 leading-[1.1] tracking-tight">
                Etin <span className="text-primary italic">Jönü:</span> Oğulcan Genç
              </h1>
              <div className="space-y-6 text-neutral-700 text-lg md:text-xl leading-relaxed font-light">
                <p>
                  Kasaplık sadece bir meslek değil, nesiller boyu aktarılan bir disiplin ve estetik anlayışıdır. 
                  Bu geleneğin modern temsilcisi, markamızın vizyoner ismi <strong className="text-primary font-bold uppercase tracking-wider">Oğulcan Genç</strong>, 
                  kasaplık zanaatına getirdiği <span className="italic">"jön"</span> duruşuyla sektörde yeni bir dönem başlatmıştır.
                </p>
                <p>
                  Bıçağın metalle olan dansından, etin en doğru liflerinden ayrılmasına kadar her süreci bir sanatçı titizliğiyle yöneten Oğulcan Genç, 
                  geleneksel ustalığı modern gastronomi trendleriyle harmanlıyor. Onun için her parça et, bir şaheserin başlangıcıdır. 
                  Tezgaha koyduğu her ürünün arkasında, <span className="text-primary font-semibold italic">kaliteye duyulan sarsılmaz bir sadakat</span> yatar.
                </p>
                <p>
                  Sosyal medyada ve günlük işleyişte <span className="text-primary font-bold italic underline decoration-primary/30">"Etin Jönü"</span> lakabıyla tanınan Oğulcan, 
                  kasaplık mesleğinin itibarını yukarı taşımayı ve genç nesillere bu zanaatın ne kadar derin bir bilgi birikimi gerektirdiğini göstermeyi görev edinmiştir. 
                  Etlik Yayla Kasabı'nın dinamizmini ve estetik anlayışını temsil eden Oğulcan Genç, tezgahın arkasında değil, 
                  kalitenin tam kalbinde yer almaktadır.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image
                src="/images/etin jonu.png"
                alt="Oğulcan Genç - Etin Jönü"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
