import { describe, expect, it } from "vitest";
import { calculateWatchlistStats } from "../analytics";

describe("Analytics Utilities", () => {
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
