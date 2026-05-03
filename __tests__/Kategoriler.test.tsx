import { render, screen } from "@testing-library/react";
import Kategoriler from "@/components/sections/Kategoriler";

describe("Kategoriler", () => {
  it("tüm kategorileri render eder", () => {
    render(<Kategoriler />);
    expect(screen.getByText("Kırmızı Et")).toBeInTheDocument();
    expect(screen.getByText("Beyaz Et")).toBeInTheDocument();
    expect(screen.getByText("Sakatat")).toBeInTheDocument();
    expect(screen.getByText("Şarküteri")).toBeInTheDocument();
  });
});
