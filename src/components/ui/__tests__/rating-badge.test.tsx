import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RatingBadge } from "../rating-badge";

describe("RatingBadge UI Component", () => {
  it("should render formatted rating", () => {
    render(<RatingBadge rating={8.43} />);
    expect(screen.getByText("8.4")).toBeInTheDocument();
  });

  it("should render vote count when provided", () => {
    render(<RatingBadge rating={7.5} count={1250} />);
    expect(screen.getByText("7.5")).toBeInTheDocument();
    expect(screen.getByText("(1,250)")).toBeInTheDocument();
  });

  it("should apply amber gold style for ratings >= 7.0", () => {
    const { container } = render(<RatingBadge rating={8.5} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("text-amber-400");
  });

  it("should apply cyan style for ratings < 7.0", () => {
    const { container } = render(<RatingBadge rating={6.2} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("text-cyan-400");
  });
});
