import { render, screen } from "@testing-library/react";
import Karsilama from "@/components/sections/Karsilama";

describe("Karsilama", () => {
  it("başlığı render eder", () => {
    render(<Karsilama />);
    expect(screen.getByText("Ankara'da Yılın Kasabı")).toBeInTheDocument();
  });

  it("açıklama metnini render eder", () => {
    render(<Karsilama />);
    expect(screen.getByText(/Her sabah taze/)).toBeInTheDocument();
  });
});
