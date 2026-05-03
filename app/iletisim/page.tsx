import TaslakSayfa from "@/components/TaslakSayfa";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "İletişim — Etlik Yayla Kasabı" };
export default function IletisimSayfasi() {
  return (<><TaslakSayfa baslik="İletişim" /><Footer /></>);
}
