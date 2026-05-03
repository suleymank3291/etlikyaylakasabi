import Hero from "@/components/sections/Hero";
import Karsilama from "@/components/sections/Karsilama";
import Kategoriler from "@/components/sections/Kategoriler";
import OneCikanlar from "@/components/sections/OneCikanlar";
import Katalog from "@/components/sections/Katalog";
import FlexAnimasyon from "@/components/sections/FlexAnimasyon";
import MusteriYorumlari from "@/components/sections/MusteriYorumlari";
import Footer from "@/components/Footer";

export default function AnaSayfa() {
  return (
    <main>
      <Hero />
      <Karsilama />
      <Kategoriler />
      <OneCikanlar />
      <Katalog />
      <FlexAnimasyon />
      <MusteriYorumlari />
      <Footer />
    </main>
  );
}
