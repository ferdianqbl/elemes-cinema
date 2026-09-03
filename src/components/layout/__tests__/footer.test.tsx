import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../footer";

describe("Footer Component", () => {
  it("renders shortened brand name Elemes", () => {
    render(<Footer />);
    expect(screen.getAllByText("Elemes")[0]).toBeInTheDocument();
  });

  it("renders catalog navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Movies" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "TV Shows" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Watchlist" })).toBeInTheDocument();
  });

  it("renders TMDB attribution disclaimer", () => {
    render(<Footer />);
    expect(screen.getByText(/Powered by TMDB API/i)).toBeInTheDocument();
  });
});
