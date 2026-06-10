import { test, expect } from "./fixtures";
import { BLOG_SITE_URL, FOOTER_STATIC_LINKS } from "../src/test/hardcodedHandles";

test.describe("footer navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  for (const href of FOOTER_STATIC_LINKS) {
    test(`footer link navigates to ${href}`, async ({ page }) => {
      const link = page.locator(`footer a[href="${href}"]`).first();
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(new RegExp(href.replace(/\//g, "\\/")));
      await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
    });
  }
});

test.describe("header navigation", () => {
  test("header links navigate correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await page.locator('header a[href="/energy-hub-2"]').click();
    await expect(page).toHaveURL(/\/energy-hub-2/);

    await page.goto("/");
    await page.locator('header a[href="/contact"]').click();
    await expect(page).toHaveURL(/\/contact/);

    await page.goto("/");
    await page.getByRole("button", { name: "Resources" }).click();
    const blogMenuLink = page.locator('[role="menu"] a[href="https://blog.sogenenergy.co.nz/"]');
    await expect(blogMenuLink).toBeVisible();
  });

  test("footer blog link points to blog subdomain", async ({ page }) => {
    await page.goto("/");
    const blogLink = page.locator(`footer a[href="${BLOG_SITE_URL}/"]`);
    await expect(blogLink).toBeVisible();
  });

  test("mobile menu links navigate correctly", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.locator("header button.lg\\:hidden").first().click();
    await page.locator('header nav.lg\\:hidden a[href="/energy-hub-2"]').click();
    await expect(page).toHaveURL(/\/energy-hub-2/);
  });
});
