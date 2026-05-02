// site/lib/types.ts
export interface Urun {
  isim: string;
  fiyat: string;
  gorsel: string;
  kategoriSlug: string;
}

export interface Kategori {
  isim: string;
  slug: string;
  gorsel: string;
}

export interface MusteriGorseli {
  src: string;
  alt: string;
}
