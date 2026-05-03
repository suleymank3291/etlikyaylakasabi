import { render, screen } from "@testing-library/react";
import Katalog from "@/components/sections/Katalog";

describe("Katalog", () => {
  it("orta yazıyı render eder", () => {
    render(<Katalog />);
    expect(screen.getByText("doğal. taze. lezzetli.")).toBeInTheDocument();
  });

  it("alt metni render eder", () => {
    render(<Katalog />);
    expect(screen.getByText("Ankara'nın en kaliteli kasabından.")).toBeInTheDocument();
  });
});
