import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

describe("Hero", () => {
  it("başlığı render eder", () => {
    render(<Hero />);
    expect(screen.getByText("Ankara'nın En Taze Eti")).toBeInTheDocument();
  });

  it("alt metni render eder", () => {
    render(<Hero />);
    expect(screen.getByText("Günlük taze, özel kesim, hijyen garantili.")).toBeInTheDocument();
  });

  it("Kataloğu Gör CTA linkini render eder", () => {
    render(<Hero />);
    expect(screen.getByText("Kataloğu Gör")).toBeInTheDocument();
  });
});
