import { expect, test } from "@playwright/test";

test.describe("ADMIN STORE LOGIN", () => {
  test(
    "Admin login page loads @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await expect(page.getByRole("heading", { name: "TechStore Admin" })).toBeVisible();
    },
  );

  test(
    "Wrong credentials shows error @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await page.getByPlaceholder("admin@techstore.com").fill("wrong@email.com");
      await page.getByPlaceholder("••••••••").fill("wrongpassword");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page.getByText("Invalid email or password.")).toBeVisible();
    },
  );

  test(
    "Correct credentials redirects to admin store @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await page.getByPlaceholder("admin@techstore.com").fill("admin@techstore.com");
      await page.getByPlaceholder("••••••••").fill("admin123");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page).toHaveURL("/store");
    },
  );
});

test.describe("ADMIN STORE MANAGEMENT", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/store/login");
    await page.getByPlaceholder("admin@techstore.com").fill("admin@techstore.com");
    await page.getByPlaceholder("••••••••").fill("admin123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/store");
  });

  test(
    "Admin store page loads @s1",
    async ({ page }) => {
      await expect(page.getByRole("heading", { name: "Store Management" })).toBeVisible();
    },
  );

  test(
    "Products tab shows products @s1",
    async ({ page }) => {
      await expect(page.getByRole("heading", { name: "MacBook Pro Stand" }).or(page.getByText("MacBook Pro Stand"))).toBeVisible();
    },
  );

  test(
    "Orders tab shows orders @s1",
    async ({ page }) => {
      await page.getByRole("button", { name: "Orders" }).click();
      await expect(page.getByText("ORD-001")).toBeVisible();
    },
  );

  test(
    "Add product form appears @s1",
    async ({ page }) => {
      await page.getByRole("button", { name: "+ Add Product" }).click();
      await expect(page.getByText("Add New Product")).toBeVisible();
    },
  );
});