import { describe, expect, it } from "vitest";
import {
  buildLinkInventory,
  getRouteDefinition,
  scanSourceFiles,
} from "./linkInventory";
import { STATIC_E2E_ROUTES } from "./hardcodedHandles";

describe("route definitions", () => {
  it("defines all expected static routes in the Next.js app", () => {
    const { staticRoutes } = getRouteDefinition();
    for (const route of STATIC_E2E_ROUTES) {
      expect(staticRoutes, `missing route: ${route}`).toContain(route);
    }
    expect(staticRoutes).toContain("/blog");
  });

  it("defines dynamic route patterns for Shopify content", () => {
    const { dynamicRoutes } = getRouteDefinition();
    expect(dynamicRoutes.some((r) => r.includes("product"))).toBe(true);
    expect(dynamicRoutes.some((r) => r.includes("collections"))).toBe(true);
    expect(
      dynamicRoutes.some(
        (r) => r.includes("articleHandle") || r.includes("blogHandle"),
      ),
    ).toBe(true);
  });
});

describe("link inventory", () => {
  it("has no orphan internal links", () => {
    const { orphans } = buildLinkInventory();
    expect(
      orphans.map((o) => `${o.path} (${o.sourceFile})`),
      "orphan links with no matching route"
    ).toEqual([]);
  });

  it("discovers internal links from source files", () => {
    const links = scanSourceFiles();
    const internal = links.filter((l) => l.path.startsWith("/"));
    expect(internal.length).toBeGreaterThan(20);
  });

  it("matches link inventory snapshot", () => {
    const { staticLinks, dynamicLinks } = buildLinkInventory();
    expect(staticLinks).toMatchSnapshot();
    expect(dynamicLinks).toMatchSnapshot();
  });
});
