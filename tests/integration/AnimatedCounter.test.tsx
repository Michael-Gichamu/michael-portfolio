import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

describe("AnimatedCounter", () => {
  it("renders the initial value as 0 with the provided suffix", () => {
    render(<AnimatedCounter to={90} suffix="%" />);
    // Initial render before useEffect / inView, value is 0.
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });

  it("supports a prefix", () => {
    render(<AnimatedCounter to={6} prefix="~" suffix="×" />);
    expect(screen.getByText(/~0×/)).toBeInTheDocument();
  });
});
