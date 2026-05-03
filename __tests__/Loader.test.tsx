import { render, screen } from "@testing-library/react";
import Loader from "@/components/Loader";

describe("Loader", () => {
  it("logo görselini render eder", () => {
    render(<Loader onComplete={jest.fn()} />);
    expect(screen.getByAltText("Etlik Yayla Kasabı")).toBeInTheDocument();
  });

  it("onComplete prop'u alır ama hemen çağırmaz", () => {
    const onComplete = jest.fn();
    render(<Loader onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
