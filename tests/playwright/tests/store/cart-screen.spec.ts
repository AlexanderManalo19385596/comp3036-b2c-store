import { expect, test } from "@playwright/test";

test.describe("CART SCREEN", () => {

    test.beforeEach(async ({ page }) => {
    await page.goto("/store");
    await page.evaluate(() => localStorage.clear());
  });

  test(
    "Cart page loads @s1",
    async ({ page }) => {
      await page.goto("/store/cart");
      await expect(page.getByRole("heading", { name: "Your Cart", exact: true })).toBeVisible();
    },
  );

  test(
    "Empty cart shows message @s1",
    async ({ page }) => {
      await page.goto("/store/cart");
      await expect(page.getByText("Your cart is empty")).toBeVisible();
      await expect(page.getByText("Browse Products")).toBeVisible();
    },
  );

  test(
    "Adding product appears in cart @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.waitForLoadState("networkidle");
      await page.getByText("+ Add to Cart").first().click();
      await page.goto("/store/cart");
      await expect(page.getByText("MacBook Pro Stand")).toBeVisible();
    },
  ),

  test(
    "Cart shows proceed to checkout button @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.waitForLoadState("networkidle");
      await page.getByText("+ Add to Cart").first().click();
      await page.goto("/store/cart");
      await expect(page.getByText("Proceed to Checkout")).toBeVisible();
    },
  );

  test(
    "Proceed to checkout navigates to checkout page @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.waitForLoadState("networkidle");
      await page.getByText("+ Add to Cart").first().click();
      await page.goto("/store/cart");
      await page.getByText("Proceed to Checkout").click();
      await expect(page).toHaveURL("/store/checkout");
    },
  );
});