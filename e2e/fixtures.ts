import { test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.setItem("sogen-welcome-dismissed", "true");
    });
    await use(page);
  },
});

export { expect } from "@playwright/test";
