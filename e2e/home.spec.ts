import { test, expect } from "@playwright/test";

test.describe("Home Page & Discovery Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render the site header and branding correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Elemes/);
    const brand = page.getByRole("link", { name: /Elemes/i }).first();
    await expect(brand).toBeVisible();
  });

  test("should display featured hero banner and discovery shelves", async ({ page }) => {
    // Featured Hero
    const featuredBadge = page.getByText(/Featured Premiere/i);
    await expect(featuredBadge).toBeVisible({ timeout: 10000 });

    // Popular Movies shelf
    const popularSection = page.getByRole("heading", { name: "Popular Movies" });
    await expect(popularSection).toBeVisible();

    // Top Rated TV Shows shelf
    const tvSection = page.getByRole("heading", { name: "Top Rated TV Series" });
    await expect(tvSection).toBeVisible();

    // Trending Stars shelf
    const starsSection = page.getByRole("heading", { name: "Trending Stars & Creators" });
    await expect(starsSection).toBeVisible();
  });

  test("should navigate to movies catalog when clicking 'View all movies'", async ({ page }) => {
    const viewAllMovies = page.getByRole("link", { name: /View all movies/i });
    await viewAllMovies.click();
    await expect(page).toHaveURL(/\/movies/);
    await expect(page.getByRole("heading", { name: "Movies Catalog" })).toBeVisible();
  });

  test("should render mobile bottom navigation on mobile viewport", async ({ page, isMobile }) => {
    if (isMobile) {
      const bottomNav = page.getByRole("navigation", { name: "Mobile Bottom Navigation" });
      await expect(bottomNav).toBeVisible();
      const moviesTab = bottomNav.getByRole("link", { name: "Movies" });
      await expect(moviesTab).toBeVisible();
      await moviesTab.click();
      await expect(page).toHaveURL(/\/movies/);
    }
  });
});
