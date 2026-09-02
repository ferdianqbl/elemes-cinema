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
});
