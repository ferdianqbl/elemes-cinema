import { describe, it, expect } from "vitest";
import {
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
  getYouTubeEmbedUrl,
} from "../tmdb";

describe("TMDB image and media URL helpers", () => {
  describe("getPosterUrl", () => {
    it("should construct full TMDB image URL with correct size", () => {
      const url = getPosterUrl("/sample-poster.jpg", "w500");
      expect(url).toContain("https://image.tmdb.org/t/p/w500/sample-poster.jpg");
    });

    it("should fallback to placeholder when path is null or empty", () => {
      expect(getPosterUrl(null)).toBe("/placeholder-poster.png");
      expect(getPosterUrl("")).toBe("/placeholder-poster.png");
    });
  });

  describe("getBackdropUrl", () => {
    it("should construct full backdrop URL with default original size", () => {
      const url = getBackdropUrl("/sample-backdrop.jpg");
      expect(url).toContain("https://image.tmdb.org/t/p/original/sample-backdrop.jpg");
    });

    it("should fallback to placeholder when path is null", () => {
      expect(getBackdropUrl(null)).toBe("/placeholder-backdrop.png");
    });
  });

  describe("getProfileUrl", () => {
    it("should construct full profile URL for cast portraits", () => {
      const url = getProfileUrl("/sample-actor.jpg", "h632");
      expect(url).toContain("https://image.tmdb.org/t/p/h632/sample-actor.jpg");
    });

    it("should fallback to avatar placeholder when path is null", () => {
      expect(getProfileUrl(null)).toBe("/placeholder-avatar.png");
    });
  });

  describe("getYouTubeEmbedUrl", () => {
    it("should return YouTube embed URL with key", () => {
      const url = getYouTubeEmbedUrl("dQw4w9WgXcQ");
      expect(url).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0");
    });
  });
});
