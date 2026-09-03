import { describe, it, expect, beforeEach } from "vitest";
import { useWatchlistStore } from "../use-watchlist-store";

describe("useWatchlistStore (Zustand with LocalStorage)", () => {
  beforeEach(() => {
    useWatchlistStore.getState().clearWatchlist();
  });

  it("should initialize with an empty array of items", () => {
    const items = useWatchlistStore.getState().items;
    expect(items).toEqual([]);
  });

  it("should add a movie item to watchlist with default want_to_watch status", () => {
    useWatchlistStore.getState().addItem({
      id: 101,
      title: "Inception",
      poster_path: "/inception.jpg",
      backdrop_path: "/inception-bg.jpg",
      vote_average: 8.8,
      release_date: "2010-07-16",
      media_type: "movie",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology...",
    });

    const items = useWatchlistStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Inception");
    expect(items[0].status).toBe("want_to_watch");
    expect(useWatchlistStore.getState().isInWatchlist(101, "movie")).toBe(true);
  });

  it("should toggle watched status between want_to_watch and watched", () => {
    useWatchlistStore.getState().addItem({
      id: 101,
      title: "Inception",
      poster_path: "/inception.jpg",
      backdrop_path: null,
      vote_average: 8.8,
      release_date: "2010-07-16",
      media_type: "movie",
      overview: "Overview",
    });

    expect(useWatchlistStore.getState().items[0].status).toBe("want_to_watch");

    // Toggle to watched
    useWatchlistStore.getState().toggleWatchedStatus(101, "movie");
    expect(useWatchlistStore.getState().items[0].status).toBe("watched");

    // Toggle back to want_to_watch
    useWatchlistStore.getState().toggleWatchedStatus(101, "movie");
    expect(useWatchlistStore.getState().items[0].status).toBe("want_to_watch");
  });

  it("should remove an item from watchlist", () => {
    useWatchlistStore.getState().addItem({
      id: 202,
      title: "Breaking Bad",
      poster_path: "/bb.jpg",
      backdrop_path: null,
      vote_average: 9.5,
      release_date: "2008-01-20",
      media_type: "tv",
      overview: "A chemistry teacher diagnosed with cancer turns to manufacturing methamphetamine...",
    });

    expect(useWatchlistStore.getState().items.length).toBe(1);

    useWatchlistStore.getState().removeItem(202, "tv");
    expect(useWatchlistStore.getState().items.length).toBe(0);
    expect(useWatchlistStore.getState().isInWatchlist(202, "tv")).toBe(false);
  });

  it("should toggle item in and out of watchlist", () => {
    const sampleItem = {
      id: 303,
      title: "Interstellar",
      poster_path: "/interstellar.jpg",
      backdrop_path: "/interstellar-bg.jpg",
      vote_average: 8.7,
      release_date: "2014-11-07",
      media_type: "movie" as const,
      overview: "A team of explorers travel through a wormhole in space...",
    };

    // Toggle IN
    useWatchlistStore.getState().toggleItem(sampleItem);
    expect(useWatchlistStore.getState().isInWatchlist(303, "movie")).toBe(true);

    // Toggle OUT
    useWatchlistStore.getState().toggleItem(sampleItem);
    expect(useWatchlistStore.getState().isInWatchlist(303, "movie")).toBe(false);
  });

  it("should clear all items in watchlist", () => {
    useWatchlistStore.getState().addItem({
      id: 1,
      title: "Movie 1",
      poster_path: null,
      backdrop_path: null,
      vote_average: 7,
      release_date: "2020-01-01",
      media_type: "movie",
      overview: "Overview 1",
    });

    useWatchlistStore.getState().addItem({
      id: 2,
      title: "TV 1",
      poster_path: null,
      backdrop_path: null,
      vote_average: 8,
      release_date: "2021-01-01",
      media_type: "tv",
      overview: "Overview 2",
    });

    expect(useWatchlistStore.getState().items.length).toBe(2);

    useWatchlistStore.getState().clearWatchlist();
    expect(useWatchlistStore.getState().items.length).toBe(0);
  });
});
