import { expect, test } from "@playwright/test";

test.describe("HISTORY SCREEN", () => {
  test(
    "History page loads @s1",
    async ({ page }) => {
      await page.goto("/store/history");
      await expect(page.getByRole("heading", { name: "Purchase History" })).toBeVisible();
    },
  );

  test(
    "History shows lock when not logged in @s1",
    async ({ page }) => {
      await page.goto("/store/history");
      await expect(page.getByText("Sign in to view your orders")).toBeVisible();
    },
  );

  test(
    "History shows orders when logged in @s1",
    async ({ page }) => {
      // Login first
      await page.goto("/store/login");
      await page.getByPlaceholder("user@techstore.com").fill("user@techstore.com");
      await page.getByPlaceholder("••••••••").fill("password123");
      await page.getByRole("button", { name: "Sign In" }).click();
      // Wait for redirect to store
      await expect(page).toHaveURL("/store");
      // Then go to history
      await page.goto("/store/history");
      await expect(page.getByText("ORD-001")).toBeVisible();
    },
  );
});

test.describe("CHECKOUT SCREEN", () => {
  test(
    "Checkout page loads @s1",
    async ({ page }) => {
      await page.goto("/store/checkout");
      await expect(page.getByRole("heading", { name: "Complete Your Order" })).toBeVisible();
    },
  );

  test(
    "Empty cart shows message on checkout @s1",
    async ({ page }) => {
      await page.goto("/store/checkout");
      await expect(page.getByText("Your cart is empty")).toBeVisible();
    },
  );
});