import { describe, expect, it, vi } from "vitest";
import {
  blogArticleUrl,
  blogIndexUrl,
  legacyBlogPathToSubdomain,
} from "@/lib/blogUrls";

describe("blogUrls", () => {
  it("builds blog index URL", () => {
    expect(blogIndexUrl()).toBe("https://blog.sogenenergy.co.nz/");
  });

  it("builds blog article URL", () => {
    expect(blogArticleUrl("FAQ", "changing-over-to-lithium")).toBe(
      "https://blog.sogenenergy.co.nz/FAQ/changing-over-to-lithium"
    );
  });

  it("maps legacy main-site paths to subdomain", () => {
    expect(legacyBlogPathToSubdomain("/blog")).toBe("https://blog.sogenenergy.co.nz/");
    expect(legacyBlogPathToSubdomain("/blog/FAQ/test-article")).toBe(
      "https://blog.sogenenergy.co.nz/FAQ/test-article"
    );
  });

  it("detects blog subdomain hostname", async () => {
    const { isBlogSubdomain } = await import("@/lib/blogUrls");
    vi.stubGlobal("location", { hostname: "blog.sogenenergy.co.nz" });
    expect(isBlogSubdomain()).toBe(true);
    vi.unstubAllGlobals();
  });
});
