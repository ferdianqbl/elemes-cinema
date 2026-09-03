import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WatchlistButton } from "../components/watchlist-button";
import { useWatchlistStore } from "@/store/use-watchlist-store";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

describe("WatchlistButton Component", () => {
  const mockItem = {
    id: 101,
    title: "Interstellar",
    poster_path: "/interstellar.jpg",
    backdrop_path: "/interstellar-backdrop.jpg",
    vote_average: 8.7,
    release_date: "2014-11-07",
    media_type: "movie" as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useWatchlistStore.setState({ items: [] });
  });

  it("renders Add to Watchlist state initially", () => {
    render(<WatchlistButton item={mockItem} variant="full" />);
    expect(screen.getByText("Add to Watchlist")).toBeInTheDocument();
  });

  it("toggles item and triggers toast.success on add", () => {
    render(<WatchlistButton item={mockItem} variant="full" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(useWatchlistStore.getState().isInWatchlist(101, "movie")).toBe(true);
    expect(toast.success).toHaveBeenCalledWith(
      'Added "Interstellar" to Watchlist',
      expect.objectContaining({
        action: expect.objectContaining({ label: "Undo" }),
      })
    );
  });

  it("toggles item and triggers toast.info on removal", () => {
    useWatchlistStore.getState().addItem(mockItem);
    render(<WatchlistButton item={mockItem} variant="full" />);

    const button = screen.getByRole("button");
    expect(screen.getByText("In Watchlist")).toBeInTheDocument();

    fireEvent.click(button);
    expect(useWatchlistStore.getState().isInWatchlist(101, "movie")).toBe(false);
    expect(toast.info).toHaveBeenCalledWith(
      'Removed "Interstellar" from Watchlist',
      expect.objectContaining({
        action: expect.objectContaining({ label: "Undo" }),
      })
    );
  });
});
