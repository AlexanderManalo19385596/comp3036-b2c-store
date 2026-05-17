import { expect, test } from "@playwright/test";

test.describe("STORE HOME SCREEN", () => {
  test(
    "Store page loads @s1",
    async ({ page }) => {
      await page.goto("/store");
      await expect(page.getByRole("heading", { name: "Upgrade Your Setup" })).toBeVisible();
    },
  );

  test(
  "Products are displayed @s1",
  async ({ page }) => {
    await page.goto("/store");
    await expect(page.getByText("+ Add to Cart").first()).toBeVisible();
  },
);

  test(
    "Search filters products @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.getByPlaceholder("Search products...").fill("Keyboard");
      await expect(page.getByRole("heading", { name: "Mechanical Keyboard" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "MacBook Pro Stand" })).not.toBeVisible();
    },
  );

  test(
    "Category filter works @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.getByRole("button", { name: "Keyboards" }).click();
      await expect(page.getByRole("heading", { name: "Mechanical Keyboard" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "MacBook Pro Stand" })).not.toBeVisible();
    },
  );

  test(
    "Add to cart updates count @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.getByRole("button", { name: "+ Add to Cart" }).first().click();
      await expect(page.getByText("Cart (1)")).toBeVisible();
    },
  );

  test(
    "Out of stock products cannot be added @s1",
    async ({ page }) => {
      await page.goto("/store");
      const outOfStockButton = page.getByRole("button", { name: "Out of Stock" }).first();
      await expect(outOfStockButton).toBeVisible();
      await expect(outOfStockButton).toBeDisabled();
    },
  );

  test(
    "No products found message shows when search has no results @s1",
    async ({ page }) => {
      await page.goto("/store");
      await page.getByPlaceholder("Search products...").fill("xyznotaproduct");
      await expect(page.getByText("No products found.")).toBeVisible();
    },
  );
});