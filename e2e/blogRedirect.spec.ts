import { test, expect } from "./fixtures";
import { BLOG_SITE_URL } from "../src/test/hardcodedHandles";

test("/blog redirects to blog subdomain on main site", async ({ request }) => {
  const response = await request.get("/blog", { maxRedirects: 0 });
  expect(response.status()).toBeGreaterThanOrEqual(301);
  expect(response.status()).toBeLessThan(400);
  expect(response.headers().location).toContain("blog.sogenenergy.co.nz");
});

test("/blog article path redirects to blog subdomain", async ({ request }) => {
  const response = await request.get("/blog/FAQ/example-article", {
    maxRedirects: 0,
  });
  expect(response.status()).toBeGreaterThanOrEqual(301);
  expect(response.status()).toBeLessThan(400);
  expect(response.headers().location).toBe(
    `${BLOG_SITE_URL}/FAQ/example-article`,
  );
});
