// site/__tests__/Navbar.test.tsx
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Navbar", () => {
  it("tüm nav linklerini render eder", () => {
    render(<Navbar />);
    expect(screen.getByText("Anasayfa")).toBeInTheDocument();
    expect(screen.getByText("Katalog")).toBeInTheDocument();
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });

  it("Sipariş Ver butonunu render eder", () => {
    render(<Navbar />);
    expect(screen.getByText("Sipariş Ver")).toBeInTheDocument();
  });

  it("logo görselini render eder", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Etlik Yayla Kasabı")).toBeInTheDocument();
  });

  it("marka adını render eder", () => {
    render(<Navbar />);
    expect(screen.getByText("ETLİK YAYLA KASABI")).toBeInTheDocument();
  });
});
