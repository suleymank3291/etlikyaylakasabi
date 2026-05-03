import { render, screen } from "@testing-library/react";
import OneCikanlar from "@/components/sections/OneCikanlar";

describe("OneCikanlar", () => {
  it("bölüm başlığını render eder", () => {
    render(<OneCikanlar />);
    expect(screen.getByText("Öne Çıkan")).toBeInTheDocument();
  });

  it("Dana Bonfile ürününü render eder", () => {
    render(<OneCikanlar />);
    expect(screen.getByText("Dana Bonfile")).toBeInTheDocument();
  });

  it("tüm ürün fiyatlarını render eder", () => {
    render(<OneCikanlar />);
    const fiyatlar = screen.getAllByText(/TL/);
    expect(fiyatlar.length).toBe(8);
  });
});
