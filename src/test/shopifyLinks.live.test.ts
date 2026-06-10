import { describe, expect, it } from "vitest";
import {
  fetchArticleByHandle,
  fetchCollectionByHandle,
  fetchCollections,
  fetchProducts,
} from "@/lib/shopify";
import {
  BLOG_SITE_URL,
  extractFaqBlogHandles,
  getAllHardcodedCollectionHandles,
} from "./hardcodedHandles";

const LIVE_TIMEOUT = 60_000;

describe("@live Shopify API link validation", () => {
  it(
    "resolves all hardcoded collection handles",
    async () => {
      const handles = getAllHardcodedCollectionHandles();
      const failures: string[] = [];

      for (const handle of handles) {
        const collection = await fetchCollectionByHandle(handle, 1);
        if (!collection) {
          failures.push(`/collections/${handle} — collection not found`);
        }
      }

      expect(failures, failures.join("\n")).toEqual([]);
    },
    LIVE_TIMEOUT
  );

  it(
    "resolves all FAQ blog article handles",
    async () => {
      const handles = extractFaqBlogHandles();
      expect(handles.length).toBeGreaterThan(0);

      const failures: string[] = [];
      for (const handle of handles) {
        const article = await fetchArticleByHandle("FAQ", handle);
        if (!article) {
          failures.push(`${BLOG_SITE_URL}/FAQ/${handle} — article not found`);
        }
      }

      expect(failures, failures.join("\n")).toEqual([]);
    },
    LIVE_TIMEOUT
  );

  it(
    "resolves at least one product for dynamic route smoke test",
    async () => {
      const products = await fetchProducts(1);
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].node.handle).toBeTruthy();
    },
    LIVE_TIMEOUT
  );

  it(
    "resolves all nav collection handles from Shopify",
    async () => {
      const collections = await fetchCollections();
      const failures: string[] = [];

      for (const collection of collections) {
        const handle = collection.node.handle;
        const result = await fetchCollectionByHandle(handle, 1);
        if (!result) {
          failures.push(`/collections/${handle} — nav collection not found`);
        }
      }

      expect(failures, failures.join("\n")).toEqual([]);
    },
    LIVE_TIMEOUT
  );
});
