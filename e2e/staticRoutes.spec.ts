import { test, expect } from "./fixtures";
import { STATIC_E2E_ROUTES } from "../src/test/hardcodedHandles";

for (const route of STATIC_E2E_ROUTES) {
  test(`static route loads: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);

    await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
    await expect(page.locator("h1").first()).toBeVisible();
  });
}
