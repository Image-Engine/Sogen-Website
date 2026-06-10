import { test, expect } from "./fixtures";
import { fetchArticleByHandle } from "../src/lib/shopify";
import { BLOG_E2E_ROUTES } from "../src/test/hardcodedHandles";

let articleHandle = "";

test.beforeAll(async () => {
  const article = await fetchArticleByHandle("FAQ", "changing-over-to-lithium");
  if (article) {
    articleHandle = article.handle;
  }
});

for (const route of BLOG_E2E_ROUTES) {
  test(`blog subdomain route loads: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
    await expect(page.locator("h1").first()).toBeVisible();
  });
}

test("blog article page renders on subdomain path", async ({ page }) => {
  test.skip(!articleHandle, "No article handle available");
  await page.goto(`/FAQ/${articleHandle}`);
  await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
  await expect(page.locator("h1").first()).toBeVisible();
});
