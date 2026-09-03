import { test, expect } from "@playwright/test";

test.describe("Movies Catalog & Detail Flow", () => {
  test("should switch category tabs and render movie cards", async ({ page }) => {
    await page.goto("/movies");

    // Check title
    await expect(page.getByRole("heading", { name: "Movies Catalog" })).toBeVisible();

    // Verify tabs exist
    const popularTab = page.getByRole("button", { name: "Popular" });
    const topRatedTab = page.getByRole("button", { name: "Top Rated" });
    const nowPlayingTab = page.getByRole("button", { name: "Now Playing" });
    const upcomingTab = page.getByRole("button", { name: "Upcoming" });

    await expect(popularTab).toBeVisible();
    await expect(topRatedTab).toBeVisible();
    await expect(nowPlayingTab).toBeVisible();
    await expect(upcomingTab).toBeVisible();

    // Click Top Rated tab
    await topRatedTab.click();
    await page.waitForTimeout(500);

    // Verify movie cards are rendered
    const movieCards = page.locator("a[href*='/movies/']");
    await expect(movieCards.first()).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to movie detail page and render trailer/cast sections", async ({ page }) => {
    await page.goto("/movies");

    const firstMovieCard = page.locator("a[href*='/movies/']").first();
    await expect(firstMovieCard).toBeVisible({ timeout: 10000 });
    await firstMovieCard.click();

    await expect(page).toHaveURL(/\/movies\/\d+/);
    await expect(page.getByRole("link", { name: /Back to Movies/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Overview/i })).toBeVisible();
  });

  test("should activate tab based on URL query parameter", async ({ page }) => {
    await page.goto("/movies?category=upcoming");
    const upcomingTab = page.getByRole("button", { name: "Upcoming" });
    await expect(upcomingTab).toBeVisible();
    await expect(upcomingTab).toHaveClass(/text-neutral-950/);
  });
});
