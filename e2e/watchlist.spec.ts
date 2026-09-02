import { test, expect } from "@playwright/test";

test.describe("Watchlist Persistence Flow", () => {
  test("should add item from Home and verify persistence in Watchlist page", async ({ page }) => {
    await page.goto("/");

    // Toggle watchlist button on the hero or first movie card
    const watchlistBtn = page.getByRole("button", { name: /Add to Watchlist/i }).first();
    await expect(watchlistBtn).toBeVisible({ timeout: 10000 });
    await watchlistBtn.click();

    // Verify button state changes to 'In Watchlist'
    await expect(page.getByRole("button", { name: /In Watchlist/i }).first()).toBeVisible();

    // Navigate to Watchlist page
    await page.goto("/watchlist");

    // Verify movie card is present in watchlist view
    const watchlistItems = page.locator(".group.relative");
    await expect(watchlistItems.first()).toBeVisible();

    // Refresh page to verify LocalStorage persistence
    await page.reload();
    await expect(watchlistItems.first()).toBeVisible();
  });
});
