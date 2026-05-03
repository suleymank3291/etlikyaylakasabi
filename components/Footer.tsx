import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_LINKS } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16 relative z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Marka */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image src="/logo.jpg" alt={SITE.marka} fill className="object-contain rounded-full" />
            </div>
            <span className="text-xl font-serif font-bold tracking-widest">{SITE.marka}</span>
          </div>
          <p className="text-sm text-white/50 max-w-xs leading-relaxed">
            {SITE.sehir} — Günlük taze et, özel kesim, hijyen garantisi.
          </p>
          <p className="text-sm text-white/40">🏆 Ankara&apos;da Yılın Kasabı</p>
        </div>

        {/* Linkler */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-base font-serif mb-2 text-primary">Sayfalar</h4>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-300">
              {link.label}
            </Link>
          ))}
          <a href={SITE.ctaLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-white transition-colors duration-300 font-medium">
            Sipariş Ver →
          </a>
        </div>

        {/* İletişim */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h4 className="text-base font-serif mb-2 text-primary">Bize Ulaşın</h4>
          <p className="text-sm text-white/60 max-w-[260px] leading-relaxed">{SITE.adres}</p>
          <p className="text-sm text-white/60">{SITE.saat}</p>
          <a href={SITE.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
            Haritada Gör →
          </a>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {SITE.marka}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
