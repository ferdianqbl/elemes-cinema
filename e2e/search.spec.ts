import { test, expect } from "@playwright/test";

test.describe("Multi-Search Engine & Command Dialog", () => {
  test("should perform search and render matching results", async ({ page }) => {
    await page.goto("/search?q=Avatar");

    const searchInput = page.getByPlaceholder(/Type movie, TV series, or actor name/i);
    await expect(searchInput).toHaveValue("Avatar");

    // Check filter tabs
    const moviesTab = page.getByRole("button", { name: /Movies \(/i });
    await expect(moviesTab).toBeVisible({ timeout: 10000 });

    // Verify results exist
    const cards = page.locator(".group.relative");
    await expect(cards.first()).toBeVisible();
  });

  test("should open quick search modal on clicking navbar search bar", async ({ page }) => {
    await page.goto("/");

    const quickSearchBtn = page.getByRole("button", { name: /Search catalog/i }).first();
    await quickSearchBtn.click();

    const dialogInput = page.getByPlaceholder(/Search movies, TV shows, actors/i);
    await expect(dialogInput).toBeVisible();

    await dialogInput.fill("Nolan");
    await page.waitForTimeout(600);

    const resultRow = page.locator("button:has-text('Nolan')").first();
    await expect(resultRow).toBeVisible({ timeout: 10000 });
  });
});
