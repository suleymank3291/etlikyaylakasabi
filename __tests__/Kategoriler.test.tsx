import { render, screen } from "@testing-library/react";
import Kategoriler from "@/components/sections/Kategoriler";

describe("Kategoriler", () => {
  it("tüm kategorileri render eder", () => {
    render(<Kategoriler />);
    expect(screen.getAllByText("Kırmızı Et").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Beyaz Et").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sakatat").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Şarküteri").length).toBeGreaterThan(0);
  });
});
