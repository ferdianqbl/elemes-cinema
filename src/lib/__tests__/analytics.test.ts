import { describe, it, expect } from "vitest";
import { calculateBoxOfficeRoi, calculateWatchlistStats } from "../analytics";

describe("Analytics Utilities", () => {
  describe("calculateBoxOfficeRoi", () => {
    it("should classify blockbuster when multiplier >= 3.0x", () => {
      const result = calculateBoxOfficeRoi(165000000, 701000000); // Interstellar-like
      expect(result.multiplier).toBe(4.2);
      expect(result.status).toBe("blockbuster");
      expect(result.label).toContain("Blockbuster Hit");
      expect(result.profit).toBe(536000000);
    });

    it("should classify strong profit when multiplier between 1.5x and 2.9x", () => {
      const result = calculateBoxOfficeRoi(100000000, 200000000);
      expect(result.multiplier).toBe(2.0);
      expect(result.status).toBe("profitable");
      expect(result.label).toContain("Strong Profit");
    });

    it("should classify breakeven when multiplier between 1.0x and 1.4x", () => {
      const result = calculateBoxOfficeRoi(100000000, 110000000);
      expect(result.multiplier).toBe(1.1);
      expect(result.status).toBe("breakeven");
    });

    it("should classify deficit when multiplier < 1.0x", () => {
      const result = calculateBoxOfficeRoi(100000000, 60000000);
      expect(result.multiplier).toBe(0.6);
      expect(result.status).toBe("deficit");
    });

    it("should handle missing or zero budget/revenue gracefully", () => {
      expect(calculateBoxOfficeRoi(0, 500000).status).toBe("unavailable");
      expect(calculateBoxOfficeRoi(100000, 0).status).toBe("unavailable");
      expect(calculateBoxOfficeRoi(null, null).status).toBe("unavailable");
    });
  });

  describe("calculateWatchlistStats", () => {
    it("should return zeros for empty list", () => {
      const stats = calculateWatchlistStats([]);
      expect(stats.totalCount).toBe(0);
      expect(stats.averageRating).toBe(0);
      expect(stats.movieCount).toBe(0);
      expect(stats.tvCount).toBe(0);
      expect(stats.watchedCount).toBe(0);
      expect(stats.completionRate).toBe(0);
    });

    it("should compute average score, highest score, media counts and completion rate accurately", () => {
      const items = [
        { media_type: "movie", vote_average: 8.5, status: "watched" },
        { media_type: "movie", vote_average: 7.5, status: "want_to_watch" },
        { media_type: "tv", vote_average: 9.0, status: "watched" },
      ];
      const stats = calculateWatchlistStats(items);
      expect(stats.totalCount).toBe(3);
      expect(stats.movieCount).toBe(2);
      expect(stats.tvCount).toBe(1);
      expect(stats.averageRating).toBe(8.3);
      expect(stats.highestRating).toBe(9.0);
      expect(stats.watchedCount).toBe(2);
      expect(stats.completionRate).toBe(67);
    });
  });
});
