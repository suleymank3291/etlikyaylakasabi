import { render, screen } from "@testing-library/react";
import MusteriYorumlari from "@/components/sections/MusteriYorumlari";

describe("MusteriYorumlari", () => {
  it("bölüm başlığını render eder", () => {
    render(<MusteriYorumlari />);
    expect(screen.getByText(/Misafirlerimizin/)).toBeInTheDocument();
  });

  it("Google yorum CTA'sını render eder", () => {
    render(<MusteriYorumlari />);
    expect(screen.getByText("Google'da Yorum Yaz")).toBeInTheDocument();
  });
});
