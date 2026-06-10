import fs from "fs";
import path from "path";

export type LinkCategory =
  | "static"
  | "dynamic"
  | "external"
  | "asset"
  | "mailto"
  | "tel"
  | "unknown";

export interface DiscoveredLink {
  path: string;
  category: LinkCategory;
  sourceFile: string;
}

export interface RouteDefinition {
  staticRoutes: string[];
  dynamicRoutes: string[];
  dynamicPatterns: RegExp[];
}

const SRC_DIR = path.resolve(process.cwd(), "src");
const APP_DIR = path.resolve(SRC_DIR, "app");
const NEXT_CONFIG = path.resolve(process.cwd(), "next.config.ts");

const LINK_PATTERNS = [
  /(?:to|href)=["'](\/[^"'?#]+)["']/g,
  /link:\s*["'](\/[^"']+)["']/g,
];

const INTERNAL_ROUTE_SEGMENTS = new Set(["blog-host"]);

function routePathToRegex(routePath: string): RegExp {
  const regexStr =
    "^" + routePath.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/") + "$";
  return new RegExp(regexStr);
}

function segmentToRoutePart(segment: string): string | null {
  if (segment.startsWith("(") && segment.endsWith(")")) return null;
  if (INTERNAL_ROUTE_SEGMENTS.has(segment)) return null;
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return `:${segment.slice(1, -1)}`;
  }
  return segment;
}

function collectAppRoutes(
  dir: string,
  routePrefix = "",
): RouteDefinition {
  const staticRoutes: string[] = [];
  const dynamicRoutes: string[] = [];
  const dynamicPatterns: RegExp[] = [];

  if (fs.existsSync(path.join(dir, "page.tsx"))) {
    const routePath = routePrefix || "/";
    if (routePath.includes(":")) {
      dynamicRoutes.push(routePath);
      dynamicPatterns.push(routePathToRegex(routePath));
    } else {
      staticRoutes.push(routePath);
    }
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const part = segmentToRoutePart(entry.name);
    if (part === null) {
      const child = collectAppRoutes(path.join(dir, entry.name), routePrefix);
      staticRoutes.push(...child.staticRoutes);
      dynamicRoutes.push(...child.dynamicRoutes);
      dynamicPatterns.push(...child.dynamicPatterns);
      continue;
    }

    const nextPrefix = routePrefix
      ? `${routePrefix}/${part}`
      : `/${part}`;
    const child = collectAppRoutes(path.join(dir, entry.name), nextPrefix);
    staticRoutes.push(...child.staticRoutes);
    dynamicRoutes.push(...child.dynamicRoutes);
    dynamicPatterns.push(...child.dynamicPatterns);
  }

  return { staticRoutes, dynamicRoutes, dynamicPatterns };
}

function collectRedirectRoutes(): string[] {
  if (!fs.existsSync(NEXT_CONFIG)) return [];
  const content = fs.readFileSync(NEXT_CONFIG, "utf-8");
  const routes: string[] = [];
  const sourceRegex = /source:\s*["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = sourceRegex.exec(content)) !== null) {
    const source = match[1];
    if (!source.includes(":")) routes.push(source);
  }
  return routes;
}

export function parseRoutesFromApp(appContent: string): RouteDefinition {
  void appContent;
  return getRouteDefinition();
}

export function getRouteDefinition(): RouteDefinition {
  const fromApp = collectAppRoutes(APP_DIR);
  const redirectRoutes = collectRedirectRoutes();

  return {
    staticRoutes: [...new Set([...fromApp.staticRoutes, ...redirectRoutes])],
    dynamicRoutes: fromApp.dynamicRoutes,
    dynamicPatterns: fromApp.dynamicPatterns,
  };
}

function categorizePath(linkPath: string): LinkCategory {
  if (linkPath.startsWith("mailto:")) return "mailto";
  if (linkPath.startsWith("tel:")) return "tel";
  if (linkPath.startsWith("http://") || linkPath.startsWith("https://")) {
    return "external";
  }
  if (/\.(pdf|png|jpg|jpeg|gif|webp|svg|ico)$/i.test(linkPath)) return "asset";
  return "static";
}

function walkTsxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkTsxFiles(fullPath));
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      if (!fullPath.includes(`${path.sep}test${path.sep}`)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

export function scanSourceFiles(srcDir = SRC_DIR): DiscoveredLink[] {
  const links: DiscoveredLink[] = [];
  const seen = new Set<string>();

  for (const filePath of walkTsxFiles(srcDir)) {
    const content = fs.readFileSync(filePath, "utf-8");
    const relativeFile = path.relative(process.cwd(), filePath);

    for (const pattern of LINK_PATTERNS) {
      pattern.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(content)) !== null) {
        const linkPath = match[1];
        const key = `${linkPath}::${relativeFile}`;
        if (seen.has(key)) continue;
        seen.add(key);

        links.push({
          path: linkPath,
          category: categorizePath(linkPath),
          sourceFile: relativeFile,
        });
      }
    }
  }

  return links;
}

export function matchesRoute(
  linkPath: string,
  routes: RouteDefinition,
): boolean {
  if (routes.staticRoutes.includes(linkPath)) return true;
  return routes.dynamicPatterns.some((pattern) => pattern.test(linkPath));
}

export function classifyLinkAgainstRoutes(
  link: DiscoveredLink,
  routes: RouteDefinition,
): LinkCategory {
  if (link.category === "external" || link.category === "mailto" || link.category === "tel") {
    return link.category;
  }
  if (link.category === "asset") return "asset";
  if (matchesRoute(link.path, routes)) return "static";
  if (
    link.path.startsWith("/product/") ||
    link.path.startsWith("/collections/") ||
    link.path.startsWith("/collection/") ||
    link.path.startsWith("/blog/") ||
    link.path.startsWith("/FAQ/") ||
    link.path.startsWith("/account/orders/")
  ) {
    return "dynamic";
  }
  return "unknown";
}

export function findOrphanLinks(links: DiscoveredLink[], routes: RouteDefinition): DiscoveredLink[] {
  return links.filter((link) => {
    const category = classifyLinkAgainstRoutes(link, routes);
    return category === "unknown";
  });
}

export function getStaticInternalLinks(links: DiscoveredLink[], routes: RouteDefinition): string[] {
  const staticPaths = new Set<string>();
  for (const link of links) {
    if (classifyLinkAgainstRoutes(link, routes) === "static") {
      staticPaths.add(link.path);
    }
  }
  return [...staticPaths].sort();
}

export function getDynamicInternalLinks(links: DiscoveredLink[]): string[] {
  const dynamicPaths = new Set<string>();
  for (const link of links) {
    if (
      link.path.startsWith("/product/") ||
      link.path.startsWith("/collections/") ||
      link.path.startsWith("/collection/") ||
      link.path.startsWith("/blog/") ||
      link.path.startsWith("/FAQ/")
    ) {
      dynamicPaths.add(link.path);
    }
  }
  return [...dynamicPaths].sort();
}

export function buildLinkInventory() {
  const routes = getRouteDefinition();
  const links = scanSourceFiles();
  const orphans = findOrphanLinks(links, routes);
  const staticLinks = getStaticInternalLinks(links, routes);
  const dynamicLinks = getDynamicInternalLinks(links);

  return {
    routes,
    links,
    orphans,
    staticLinks,
    dynamicLinks,
  };
}
