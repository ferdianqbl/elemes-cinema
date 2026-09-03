import { describe, it, expect, vi, beforeEach } from "vitest";
import { TvService } from "../services/tv.service";
import { apiClient } from "@/lib/axios";

vi.mock("@/lib/axios", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("TvService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPopular should call /tv/popular with params", async () => {
    const mockData = { page: 1, results: [{ id: 10, name: "Mock TV Show" }], total_pages: 5 };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockData });

    const result = await TvService.getPopular({ page: 1 });
    expect(apiClient.get).toHaveBeenCalledWith("/tv/popular", {
      params: { page: 1 },
    });
    expect(result.results[0].name).toBe("Mock TV Show");
  });

  it("getDetails should fetch TV show by ID", async () => {
    const mockDetail = { id: 1399, name: "Game of Thrones", number_of_seasons: 8 };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockDetail });

    const result = await TvService.getDetails(1399);
    expect(apiClient.get).toHaveBeenCalledWith("/tv/1399");
    expect(result.name).toBe("Game of Thrones");
    expect(result.number_of_seasons).toBe(8);
  });

  it("getWatchProviders should call /tv/:id/watch/providers", async () => {
    const mockProviders = { id: 1399, results: { ID: { link: "https://tmdb.org" } } };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockProviders });

    const result = await TvService.getWatchProviders(1399);
    expect(apiClient.get).toHaveBeenCalledWith("/tv/1399/watch/providers");
    expect(result.results.ID.link).toBe("https://tmdb.org");
  });

  it("discoverByGenre should call /discover/tv with with_genres parameter", async () => {
    const mockData = { page: 1, results: [{ id: 10, name: "Animation Series" }] };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockData });

    const result = await TvService.discoverByGenre(16, 1);
    expect(apiClient.get).toHaveBeenCalledWith("/discover/tv", {
      params: { with_genres: 16, page: 1, sort_by: "popularity.desc" },
    });
    expect(result.results[0].name).toBe("Animation Series");
  });

  it("getByCategory, getOnTheAir, getAiringToday, getCredits, getVideos, getSimilar should call correct endpoints", async () => {
    (apiClient.get as any).mockResolvedValue({ data: { page: 1, results: [] } });

    await TvService.getOnTheAir();
    expect(apiClient.get).toHaveBeenCalledWith("/tv/on_the_air", { params: undefined });

    await TvService.getAiringToday();
    expect(apiClient.get).toHaveBeenCalledWith("/tv/airing_today", { params: undefined });

    await TvService.getByCategory("top_rated");
    expect(apiClient.get).toHaveBeenCalledWith("/tv/top_rated", { params: undefined });

    await TvService.getCredits(1399);
    expect(apiClient.get).toHaveBeenCalledWith("/tv/1399/credits");

    await TvService.getVideos(1399);
    expect(apiClient.get).toHaveBeenCalledWith("/tv/1399/videos");

    await TvService.getSimilar(1399);
    expect(apiClient.get).toHaveBeenCalledWith("/tv/1399/similar", { params: undefined });
  });
});
