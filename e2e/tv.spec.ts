import { test, expect } from "@playwright/test";

test.describe("TV Shows Catalog & Season Guide", () => {
  test("should render TV catalog and category filters", async ({ page }) => {
    await page.goto("/tv");

    await expect(page.getByRole("heading", { name: "TV Shows Catalog" })).toBeVisible();

    const popularTab = page.getByRole("button", { name: "Popular" });
    const airingTodayTab = page.getByRole("button", { name: "Airing Today" });

    await expect(popularTab).toBeVisible();
    await expect(airingTodayTab).toBeVisible();

    await airingTodayTab.click();
    await page.waitForTimeout(500);

    const tvCards = page.locator("a[href*='/tv/']");
    await expect(tvCards.first()).toBeVisible({ timeout: 10000 });
  });

  test("should navigate to TV detail page with seasons breakdown", async ({ page }) => {
    await page.goto("/tv");

    const firstTvCard = page.locator("a[href*='/tv/']").first();
    await expect(firstTvCard).toBeVisible({ timeout: 10000 });
    await firstTvCard.click();

    await expect(page).toHaveURL(/\/tv\/\d+/);
    await expect(page.getByRole("link", { name: /Back to TV Shows/i })).toBeVisible();
  });
});
