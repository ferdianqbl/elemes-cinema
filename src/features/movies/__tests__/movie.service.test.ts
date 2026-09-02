import { describe, it, expect, vi, beforeEach } from "vitest";
import { MovieService } from "../services/movie.service";
import { apiClient } from "@/lib/axios";

vi.mock("@/lib/axios", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("MovieService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPopular should call /movie/popular with pagination params", async () => {
    const mockData = { page: 1, results: [{ id: 1, title: "Mock Movie" }], total_pages: 10 };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockData });

    const result = await MovieService.getPopular({ page: 2 });
    expect(apiClient.get).toHaveBeenCalledWith("/movie/popular", {
      params: { page: 2 },
    });
    expect(result.results[0].title).toBe("Mock Movie");
  });

  it("getDetails should fetch movie by ID", async () => {
    const mockDetail = { id: 550, title: "Fight Club", budget: 63000000 };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockDetail });

    const result = await MovieService.getDetails(550);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/550");
    expect(result.title).toBe("Fight Club");
  });

  it("getCredits should fetch movie credits", async () => {
    const mockCredits = { id: 550, cast: [{ id: 287, name: "Brad Pitt" }] };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockCredits });

    const result = await MovieService.getCredits(550);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/550/credits");
    expect(result.cast[0].name).toBe("Brad Pitt");
  });

  it("getVideos should fetch movie video trailers", async () => {
    const mockVideos = { id: 550, results: [{ id: "v1", key: "trailerKey", site: "YouTube" }] };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockVideos });

    const result = await MovieService.getVideos(550);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/550/videos");
    expect(result.results[0].key).toBe("trailerKey");
  });
});
