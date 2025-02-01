import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should be able to search for products", async ({ page }) => {
    const beforeSearch = await page
      .locator('[data-testid="product-item"]')
      .count();

    expect(beforeSearch).toBeGreaterThan(10);

    await page.fill("input", "laptop");
    await page.press("input", "Enter");

    const afterSearch = await page
      .locator('[data-testid="product-item"]')
      .count();
    expect(afterSearch).toEqual(1);
  });

  test("should display a no results message when nothing is found", async ({
    page,
  }) => {
    await page.fill("input", "randomstring1234");
    await page.press("input", "Enter");

    const noResults = page.locator('[data-testid="empty-list"]');
    await expect(noResults).toBeVisible();
  });

  test("should reset the products with a empty search query", async ({
    page,
  }) => {
    await page.fill("input", "laptop");
    await page.press("input", "Enter");

    const item = await page.locator('[data-testid="product-item"]').count();
    expect(item).toEqual(1);

    await page.fill("input", "");
    await page.press("input", "Enter");

    const items = await page.locator('[data-testid="product-item"]').count();
    expect(items).toBeGreaterThan(10);
  });

  test("should reset the products when clearing the search query", async ({
    page,
  }) => {
    await page.fill("input", "laptop");
    await page.press("input", "Enter");

    const item = await page.locator('[data-testid="product-item"]').count();
    expect(item).toEqual(1);

    await page.getByTestId("clear").click();

    const items = await page.locator('[data-testid="product-item"]').count();
    expect(items).toBeGreaterThan(10);
  });
});
