import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WatchProviders } from "../watch-providers";
import { TooltipProvider } from "../tooltip";

describe("WatchProviders Component", () => {
  it("renders null when results are undefined or empty", () => {
    const { container } = render(
      <TooltipProvider>
        <WatchProviders results={undefined} />
      </TooltipProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders streaming platforms when country flatrate is available", () => {
    const mockResults = {
      ID: {
        link: "https://www.themoviedb.org/movie/550/watch?locale=ID",
        flatrate: [
          {
            logo_path: "/netflix.jpg",
            provider_id: 8,
            provider_name: "Netflix",
            display_priority: 0,
          },
          {
            logo_path: "/disney.jpg",
            provider_id: 337,
            provider_name: "Disney Plus",
            display_priority: 1,
          },
        ],
      },
    };

    render(
      <TooltipProvider>
        <WatchProviders results={mockResults} />
      </TooltipProvider>
    );

    expect(screen.getByText("Where to Watch")).toBeInTheDocument();
    expect(screen.getByText("Stream Subscription")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /JustWatch/i })).toHaveAttribute(
      "href",
      "https://www.themoviedb.org/movie/550/watch?locale=ID"
    );
  });
});
