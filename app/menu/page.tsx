import TaslakSayfa from "@/components/TaslakSayfa";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Menü — Etlik Yayla Kasabı" };
export default function MenuSayfasi() {
  return (<><TaslakSayfa baslik="Menü" /><Footer /></>);
}
