import { test, expect } from "./fixtures";

test("unauthenticated /account redirects to login", async ({ page }) => {
  await page.goto("/account");
  await expect(page).toHaveURL(/\/account\/login/);
});

test("protected /account/orders redirects to login", async ({ page }) => {
  await page.goto("/account/orders");
  await expect(page).toHaveURL(/\/account\/login/);
});

test("/auth/callback without code shows error", async ({ page }) => {
  await page.goto("/auth/callback");
  await expect(page.getByText("Missing authorization code or state.")).toBeVisible();
  await expect(page.locator('a[href="/account/login"]')).toContainText("Try again");
});

test("/account/login page renders sign in", async ({ page }) => {
  await page.goto("/account/login");
  await expect(page.getByRole("heading", { name: /sign in to your account/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});
