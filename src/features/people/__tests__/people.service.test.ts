import { describe, it, expect, vi, beforeEach } from "vitest";
import { PeopleService } from "../services/people.service";
import { apiClient } from "@/lib/axios";

vi.mock("@/lib/axios", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("PeopleService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPopular should call /person/popular", async () => {
    const mockData = { page: 1, results: [{ id: 1, name: "Actor" }] };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockData });

    const res = await PeopleService.getPopular({ page: 1 });
    expect(apiClient.get).toHaveBeenCalledWith("/person/popular", { params: { page: 1 } });
    expect(res.results[0].name).toBe("Actor");
  });

  it("getDetails should call /person/:id", async () => {
    const mockDetail = { id: 1, name: "Actor", biography: "Bio" };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockDetail });

    const res = await PeopleService.getDetails(1);
    expect(apiClient.get).toHaveBeenCalledWith("/person/1");
    expect(res.name).toBe("Actor");
  });

  it("getCombinedCredits should call /person/:id/combined_credits", async () => {
    const mockCredits = { id: 1, cast: [{ id: 550, title: "Movie" }] };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockCredits });

    const res = await PeopleService.getCombinedCredits(1);
    expect(apiClient.get).toHaveBeenCalledWith("/person/1/combined_credits");
    expect(res.cast[0].title).toBe("Movie");
  });
});
