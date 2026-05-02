import { render, screen } from "@testing-library/react";
import Loader from "@/components/Loader";

describe("Loader", () => {
  it("logo ve marka adını render eder", () => {
    render(<Loader onComplete={jest.fn()} />);
    expect(screen.getByAltText("Etlik Yayla Kasabı")).toBeInTheDocument();
    expect(screen.getByText("ETLİK YAYLA KASABI")).toBeInTheDocument();
  });

  it("onComplete prop'u alır", () => {
    const onComplete = jest.fn();
    render(<Loader onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
