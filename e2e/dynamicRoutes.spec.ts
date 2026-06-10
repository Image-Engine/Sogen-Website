import { test, expect } from "./fixtures";
import {
  fetchCollectionByHandle,
  fetchProducts,
} from "../src/lib/shopify";
import { getAllHardcodedCollectionHandles } from "../src/test/hardcodedHandles";

let productHandle = "";
let collectionHandle = "";

test.beforeAll(async () => {
  const products = await fetchProducts(1);
  productHandle = products[0]?.node.handle ?? "";

  const handles = getAllHardcodedCollectionHandles();
  for (const handle of handles) {
    const collection = await fetchCollectionByHandle(handle, 1);
    if (collection) {
      collectionHandle = handle;
      break;
    }
  }

});

test("product page renders from Shopify handle", async ({ page }) => {
  test.skip(!productHandle, "No product handle available");
  await page.goto(`/product/${productHandle}`);
  await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("collection page renders from Shopify handle", async ({ page }) => {
  test.skip(!collectionHandle, "No collection handle available");
  await page.goto(`/collections/${collectionHandle}`);
  await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("collection alias route works", async ({ page }) => {
  test.skip(!collectionHandle, "No collection handle available");
  await page.goto(`/collection/${collectionHandle}`);
  await expect(page.locator("text=Oops! Page not found")).toHaveCount(0);
});
