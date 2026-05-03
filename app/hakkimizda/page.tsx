import TaslakSayfa from "@/components/TaslakSayfa";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Hakkımızda — Etlik Yayla Kasabı" };
export default function HakkimizdaSayfasi() {
  return (<><TaslakSayfa baslik="Hakkımızda" /><Footer /></>);
}
