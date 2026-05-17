import { expect, test } from "@playwright/test";

test.describe("LOGIN SCREEN", () => {
  test(
    "Login page loads @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    },
  );

  test(
    "Wrong credentials shows error @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await page.getByPlaceholder("user@techstore.com").fill("wrong@email.com");
      await page.getByPlaceholder("••••••••").fill("wrongpassword");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page.getByText("Invalid email or password.")).toBeVisible();
    },
  );

  test(
    "Empty fields shows error @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page.getByText("Please fill in all fields.")).toBeVisible();
    },
  );

  test(
    "Correct credentials redirects to store @s1",
    async ({ page }) => {
      await page.goto("/store/login");
      await page.getByPlaceholder("user@techstore.com").fill("user@techstore.com");
      await page.getByPlaceholder("••••••••").fill("password123");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page).toHaveURL("/store");
    },
  );
});

test.describe("REGISTER SCREEN", () => {
  test(
    "Register page loads @s1",
    async ({ page }) => {
      await page.goto("/store/register");
      await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
    },
  );

  test(
    "Passwords not matching shows error @s1",
    async ({ page }) => {
      await page.goto("/store/register");
      await page.getByPlaceholder("Alex M").fill("Test User");
      await page.getByPlaceholder("you@example.com").fill("test@example.com");
      await page.getByPlaceholder("••••••••").first().fill("password123");
      await page.getByPlaceholder("••••••••").last().fill("differentpassword");
      await page.getByRole("button", { name: "Create Account" }).click();
      await expect(page.getByText("Passwords do not match.")).toBeVisible();
    },
  );

  test(
    "Empty fields shows error @s1",
    async ({ page }) => {
      await page.goto("/store/register");
      await page.getByRole("button", { name: "Create Account" }).click();
      await expect(page.getByText("Please fill in all fields.")).toBeVisible();
    },
  );
});