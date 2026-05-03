// site/lib/config.ts
import type { Urun, Kategori, MusteriGorseli } from "./types";

export const SITE = {
  marka: "Etlik Yayla Kasabı",
  sehir: "Ankara / Etlik",
  adres: "Yayla Mah. Bağcı Cad. 52/B Keçiören, Ankara 06010",
  saat: "09:00 – 21:00",
  ctaLink:
    "https://www.yemeksepeti.com/shop/uowf/etlik-yayla-kasabi-and-mandira",
  ctaMetin: "Sipariş Ver",
  googleMapsLink: "https://maps.app.goo.gl/WZsE7EFuYxmFqpSq8",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12228.24482963435!2d32.81730701973721!3d39.98473748738348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34c14dac052bf%3A0x7746d7fa8f43dea8!2sEtlik%20Yayla%20Kasab%C4%B1!5e0!3m2!1str!2str!4v1777739784745!5m2!1str!2str",
};

export const HERO = {
  baslik: "Ankara'nın En Taze Eti",
  altMetin: "Günlük taze, özel kesim, hijyen garantili.",
  buton: "Kataloğu Gör",
};

export const HERO_SLIDES = [
  "/images/hero.jpg",
  "/images/katalog-1.jpg",
  "/images/katalog-2.jpg",
  "/images/katalog-3.jpg",
  "/images/etlikyaylakasabi_1644649384_2771842393604421646_39180567620_1.jpg",
];

export const KARSILAMA = {
  baslik: "Ankara'da Yılın Kasabı",
  metin:
    "Her sabah taze gelen etler, ustaca kesim ve hijyen garantisiyle sofranıza geliyor. Kalite bizim önceliğimiz.",
};

export const KATEGORILER: Kategori[] = [
  { isim: "Kırmızı Et", slug: "kirmizi-et", gorsel: "/product_images/Dana Biftek 1 kg.jpg" },
  { isim: "Beyaz Et", slug: "beyaz-et", gorsel: "/product_images/Kemiksiz Piliç Göğüs 1 kg.jpg" },
  { isim: "Sakatat", slug: "sakatat", gorsel: "/product_images/Dana Ciğer 1 kg.jpg" },
  { isim: "Şarküteri", slug: "sarküteri", gorsel: "/product_images/Dana Kavurma 1 kg.jpg" },
];

export const ONE_CIKANLAR: Urun[] = [
  { isim: "Dana Bonfile", fiyat: "3.100,00 TL", gorsel: "/product_images/Dana Bonfile 1 kg.jpg", kategoriSlug: "kirmizi-et" },
  { isim: "Kuzu Pirzola", fiyat: "2.850,00 TL", gorsel: "/product_images/Kuzu Pirzola 1 kg.jpg", kategoriSlug: "kirmizi-et" },
  { isim: "Dana Antrikot", fiyat: "1.790,00 TL", gorsel: "/product_images/Dana Antrikot 1 kg.jpg", kategoriSlug: "kirmizi-et" },
  { isim: "Tavuk Bonfile", fiyat: "550,00 TL", gorsel: "/product_images/Tavuk Bonfile 1 kg.jpg", kategoriSlug: "beyaz-et" },
  { isim: "Piliç Biftek", fiyat: "700,00 TL", gorsel: "/product_images/Piliç Biftek 1 kg.jpg", kategoriSlug: "beyaz-et" },
  { isim: "Dana Ciğer", fiyat: "990,00 TL", gorsel: "/product_images/Dana Ciğer 1 kg.jpg", kategoriSlug: "sakatat" },
  { isim: "Dana Kavurma", fiyat: "2.500,00 TL", gorsel: "/product_images/Dana Kavurma 1 kg.jpg", kategoriSlug: "sarküteri" },
  { isim: "Kasap Köfte", fiyat: "1.400,00 TL", gorsel: "/product_images/Kasap Köfte 1 kg.jpg", kategoriSlug: "kirmizi-et" },
];

export const KATALOG = {
  gorsel1: "/images/katalog-1.jpg",
  gorsel2: "/images/katalog-2.jpg",
  gorsel3: "/images/katalog-3.jpg",
  ortaYazi: "doğal. taze. lezzetli.",
  altMetin: "Ankara'nın en kaliteli kasabından.",
};

export const MUSTERI_GORSELLERI: MusteriGorseli[] = [
  { src: "/images/etlikyaylakasabi_1629920256_2648285513519960057_39180567620_1.jpg", alt: "Müşteri 1" },
  { src: "/images/etlikyaylakasabi_1630223435_2650828766525996029_39180567620_1.jpg", alt: "Müşteri 2" },
  { src: "/images/etlikyaylakasabi_1630585603_2653866853242422657_39180567620_1.jpg", alt: "Müşteri 3" },
  { src: "/images/etlikyaylakasabi_1631284916_2659733112244150071_39180567620_1.jpg", alt: "Müşteri 4" },
  { src: "/images/etlikyaylakasabi_1631284916_2659733112269481042_39180567620_2.jpg", alt: "Müşteri 5" },
  { src: "/images/etlikyaylakasabi_1632318703_2668405144322981207_39180567620_1.jpg", alt: "Müşteri 6" },
  { src: "/images/etlikyaylakasabi_1632664278_2671304038975395169_39180567620_1.jpg", alt: "Müşteri 7" },
  { src: "/images/etlikyaylakasabi_1633689666_2679905620838807136_39180567620_2.jpg", alt: "Müşteri 8" },
  { src: "/images/etlikyaylakasabi_1633689666_2679905620880785268_39180567620_1.jpg", alt: "Müşteri 9" },
  { src: "/images/etlikyaylakasabi_1636185918_2700845699765988878_39180567620_1.jpg", alt: "Müşteri 10" },
  { src: "/images/etlikyaylakasabi_1636185918_2700845699782737337_39180567620_2.jpg", alt: "Müşteri 11" },
  { src: "/images/etlikyaylakasabi_1636185918_2700845699791071875_39180567620_4.jpg", alt: "Müşteri 12" },
  { src: "/images/etlikyaylakasabi_1636185918_2700845699791310441_39180567620_3.jpg", alt: "Müşteri 13" },
  { src: "/images/etlikyaylakasabi_1644649384_2771842393604421646_39180567620_1.jpg", alt: "Müşteri 14" },
  { src: "/images/etlikyaylakasabi_1646560952_2787877790033717237_39180567620_3.jpg", alt: "Müşteri 15" },
  { src: "/images/etlikyaylakasabi_1646560952_2787877790218413064_39180567620_2.jpg", alt: "Müşteri 16" },
  { src: "/images/etlikyaylakasabi_1646560952_2787877790226776627_39180567620_1.jpg", alt: "Müşteri 17" },
  { src: "/images/etlikyaylakasabi_1647953444_2799558860747739971_39180567620_1.jpg", alt: "Müşteri 18" },
  { src: "/images/etlikyaylakasabi_1652007096_2833563355181516159_39180567620_1.jpg", alt: "Müşteri 19" },
  { src: "/images/etlikyaylakasabi_1659780415_2898770685694857605_39180567620_1.jpg", alt: "Müşteri 20" },
  { src: "/images/etlikyaylakasabi_1660396633_2903939899053545993_39180567620_1.jpg", alt: "Müşteri 21" },
  { src: "/images/etlikyaylakasabi_1661684832_2914746089249312712_39180567620_1.jpg", alt: "Müşteri 22" },
  { src: "/images/etlikyaylakasabi_1661770804_2915467280419210050_39180567620_1.jpg", alt: "Müşteri 23" },
  { src: "/images/etlikyaylakasabi_1661961140_2917063928362761524_39180567620_1.jpg", alt: "Müşteri 24" },
  { src: "/images/etlikyaylakasabi_1663510893_2930064202811506642_39180567620_1.jpg", alt: "Müşteri 25" },
];

export const NAV_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Katalog", href: "/#katalog" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];
