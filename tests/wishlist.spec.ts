import { test, expect } from "@playwright/test";

test.describe("Wishlist", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/wishlists");
  });

  test("should be able to add a new wishlist", async ({ page }) => {
    const wishlistsBefore = await page
      .locator('[data-testid="product-item"]')
      .count();

    await page.locator('[data-testid="add-wishlist"]').click();

    await page.waitForSelector('[data-testid="add-wishlist-form"]');
    const modal = page.getByRole("dialog");
    expect(modal).toBeInViewport();

    await page.getByLabel("Name").fill("new wishlist");
    await page.press("input", "Enter");

    await page.waitForTimeout(1000);

    const wishlistsAfter = await page
      .locator('[data-testid="product-item"]')
      .count();
    await page.waitForTimeout(1000);
    expect(wishlistsAfter).toBeGreaterThan(wishlistsBefore);
  });

  test("should be able to remove a wishlist", async ({ page }) => {
    const wishlistsBefore = page.locator('[data-testid="product-item"]');
    await wishlistsBefore.last().click();

    await page.locator('[data-testid="delete-wishlist"]').click();

    const wishlistsAfter = await page
      .locator('[data-testid="product-item"]')
      .count();
    await page.waitForTimeout(1000);
    expect(wishlistsAfter).toBeLessThan(5);
  });

  test("should be able to add a product to a wishlist", async ({ page }) => {
    await page.goto("/");

    const products = page.locator('[data-testid="product-item"]');
    await products.first().click();

    await page.locator('[data-testid="add-to-wishlist"]').click();

    const modal = page.getByRole("dialog");
    expect(modal).toBeInViewport();

    await page.selectOption("#wishlists", { index: 4 });
    await page.locator('[data-testid="add-product"]').click();
    await page.waitForTimeout(1000);

    await page.goto("/wishlists");
    await page.waitForTimeout(1000);

    const wishlists = page.locator('[data-testid="product-item"]');
    await wishlists.last().click();

    const productsOnWishlist = await page
      .locator('[data-testid="product-item"]')
      .count();
    await page.waitForTimeout(1000);
    expect(productsOnWishlist).toBeGreaterThan(5);
  });

  test("should be able to remove a product from a wishlist", async ({
    page,
  }) => {
    await page.goto("/wishlist/1");

    const buttons = page.locator('[data-testid="remove-from-wishlist"]');
    await buttons.first().click();
    await page.waitForTimeout(1000);

    const productsAfter = await page
      .locator('[data-testid="product-item"]')
      .count();
    expect(productsAfter).toBeLessThan(5);
  });
});
