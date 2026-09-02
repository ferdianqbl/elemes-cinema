import { describe, it, expect } from "vitest";
import {
  cn,
  formatDate,
  formatYear,
  formatRating,
  formatRuntime,
  formatCurrency,
} from "../utils";

describe("Utils library tests", () => {
  describe("cn (classnames merger)", () => {
    it("should merge tailwind classes properly without duplicates", () => {
      const result = cn("px-2 py-1", "px-4", { "bg-black": true, "text-white": false });
      expect(result).toBe("py-1 px-4 bg-black");
    });
  });

  describe("formatDate", () => {
    it("should format valid ISO date strings to human-readable format", () => {
      const formatted = formatDate("2024-05-15");
      expect(formatted).toContain("2024");
      expect(formatted).toContain("May");
    });

    it("should return N/A for null or invalid dates", () => {
      expect(formatDate(null)).toBe("N/A");
      expect(formatDate("")).toBe("N/A");
    });
  });

  describe("formatYear", () => {
    it("should extract 4-digit year from date string", () => {
      expect(formatYear("2026-11-20")).toBe("2026");
      expect(formatYear("1999-03-31")).toBe("1999");
    });

    it("should return N/A for empty strings or invalid input", () => {
      expect(formatYear(null)).toBe("N/A");
      expect(formatYear("")).toBe("N/A");
    });
  });

  describe("formatRating", () => {
    it("should format ratings to 1 decimal place", () => {
      expect(formatRating(8.56)).toBe("8.6");
      expect(formatRating(7)).toBe("7.0");
      expect(formatRating(9.99)).toBe("10.0");
    });

    it("should handle null or zero rating", () => {
      expect(formatRating(null)).toBe("0.0");
      expect(formatRating(0)).toBe("0.0");
    });
  });

  describe("formatRuntime", () => {
    it("should format minutes into hours and minutes", () => {
      expect(formatRuntime(142)).toBe("2h 22m");
      expect(formatRuntime(60)).toBe("1h 0m");
      expect(formatRuntime(45)).toBe("45m");
    });

    it("should return N/A for invalid minutes", () => {
      expect(formatRuntime(null)).toBe("N/A");
      expect(formatRuntime(0)).toBe("N/A");
    });
  });

  describe("formatCurrency", () => {
    it("should format numbers into USD currency format", () => {
      expect(formatCurrency(150000000)).toBe("$150,000,000");
      expect(formatCurrency(1000)).toBe("$1,000");
    });

    it("should return N/A for null or zero values", () => {
      expect(formatCurrency(null)).toBe("N/A");
      expect(formatCurrency(0)).toBe("N/A");
    });
  });
});
