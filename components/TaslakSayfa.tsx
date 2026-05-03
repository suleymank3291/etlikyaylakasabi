import Link from "next/link";

interface TaslakSayfaProps {
  baslik: string;
}

export default function TaslakSayfa({ baslik }: TaslakSayfaProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white pt-20">
      <div className="text-center px-6">
        <p className="text-xs text-neutral-300 font-medium tracking-[0.3em] uppercase mb-6">
          Yapım Aşamasında
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-neutral-900 mb-6">{baslik}</h1>
        <p className="text-lg text-neutral-400 mb-12 max-w-md mx-auto">
          Bu sayfa yakında hizmetinize girecektir.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium tracking-wider uppercase rounded-full hover:bg-dark transition-colors duration-300"
        >
          ← Anasayfaya Dön
        </Link>
      </div>
    </main>
  );
}
