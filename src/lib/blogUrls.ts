import { BLOG_HOST_DEV } from "@/lib/env";

export const BLOG_SITE_URL =
  process.env.NEXT_PUBLIC_BLOG_SITE_URL ??
  process.env.VITE_BLOG_SITE_URL ??
  "https://blog.sogenenergy.co.nz";

export const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_SITE_URL ??
  process.env.VITE_MAIN_SITE_URL ??
  "https://sogenenergy.co.nz";

export function isBlogSubdomain(hostname?: string): boolean {
  if (BLOG_HOST_DEV === "true") return true;
  const host =
    hostname ??
    (typeof window !== "undefined" ? window.location.hostname : "");
  if (host === "blog.sogenenergy.co.nz") return true;
  if (host.startsWith("blog-host")) return true;
  return false;
}

export function blogIndexUrl(): string {
  return `${BLOG_SITE_URL}/`;
}

export function blogArticleUrl(blogHandle: string, articleHandle: string): string {
  return `${BLOG_SITE_URL}/${blogHandle}/${articleHandle}`;
}

export function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** Map legacy main-site /blog paths to the blog subdomain. */
export function legacyBlogPathToSubdomain(pathname: string): string {
  if (pathname === "/blog" || pathname === "/blog/") {
    return blogIndexUrl();
  }
  const match = pathname.match(/^\/blog\/([^/]+)\/([^/]+)\/?$/);
  if (match) {
    return blogArticleUrl(match[1], match[2]);
  }
  return blogIndexUrl();
}
