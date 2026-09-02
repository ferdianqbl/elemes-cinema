import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchService } from "../services/search.service";
import { apiClient } from "@/lib/axios";

vi.mock("@/lib/axios", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("SearchService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("multiSearch should call /search/multi with encoded query and page", async () => {
    const mockData = {
      page: 1,
      results: [
        { id: 1, media_type: "movie", title: "Avatar" },
        { id: 2, media_type: "person", name: "James Cameron" },
      ],
      total_pages: 3,
    };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockData });

    const result = await SearchService.multiSearch({ query: "Avatar", page: 1 });
    expect(apiClient.get).toHaveBeenCalledWith("/search/multi", {
      params: { query: "Avatar", page: 1 },
    });
    expect(result.results.length).toBe(2);
  });
});
