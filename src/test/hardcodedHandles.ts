import fs from "fs";
import path from "path";

export const BLOG_SITE_URL = "https://blog.sogenenergy.co.nz";

/** Collection handles hardcoded in Footer.tsx */
export const FOOTER_COLLECTION_HANDLES = [
  "solar-systems",
  "off-grid-batteries",
  "rv-marine",
  "industrial",
  "accessories",
];

/** Collection handles hardcoded in EnergyHub.tsx */
export const ENERGY_HUB_COLLECTION_HANDLES = [
  "solar-panels",
  "bundles",
  "solar-accessories-copy",
  "solar-charge-controllers",
];

/** Collection handles hardcoded in HomeBackup.tsx and EnergyHub2.tsx */
export const HOME_BACKUP_COLLECTION_HANDLES = [
  "48v-lithium-batteries",
  "48v-bundles",
  "energy-hub",
];

/** Collection handles from RVCampers.tsx and Industrial.tsx voltage options */
export const VOLTAGE_COLLECTION_HANDLES = [
  "12v-lithium-batteries",
  "24v-lithium-batteries",
  "48v-lithium-batteries",
];

export function getAllHardcodedCollectionHandles(): string[] {
  return [
    ...new Set([
      ...FOOTER_COLLECTION_HANDLES,
      ...ENERGY_HUB_COLLECTION_HANDLES,
      ...HOME_BACKUP_COLLECTION_HANDLES,
      ...VOLTAGE_COLLECTION_HANDLES,
    ]),
  ];
}

/** Extract unique blog article handles from FAQ.tsx link fields */
export function extractFaqBlogHandles(): string[] {
  const faqPath = path.resolve(process.cwd(), "src/views/FAQ.tsx");
  const content = fs.readFileSync(faqPath, "utf-8");
  const handles = new Set<string>();
  const pattern = /blog\.sogenenergy\.co\.nz\/FAQ\/([a-z0-9-]+)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    handles.add(match[1]);
  }
  return [...handles].sort();
}

export function blogArticlePath(blogHandle: string, articleHandle: string): string {
  return `/FAQ/${articleHandle}`;
}

/** Static app routes on main site for E2E smoke tests */
export const STATIC_E2E_ROUTES = [
  "/",
  "/faq",
  "/products",
  "/contact",
  "/terms-conditions",
  "/shipping-returns",
  "/warranty",
  "/privacy-policy",
  "/energy-hub-2",
  "/rv-campers",
  "/solar-systems",
  "/home-backup",
  "/industrial",
  "/accessories",
  "/victron",
  "/video-reviews",
  "/account/login",
];

/** Blog subdomain routes for E2E smoke tests */
export const BLOG_E2E_ROUTES = ["/"];

/** Links rendered in Footer.tsx (internal only) */
export const FOOTER_STATIC_LINKS = [
  "/collections/solar-systems",
  "/collections/off-grid-batteries",
  "/collections/rv-marine",
  "/collections/industrial",
  "/collections/accessories",
  "/contact",
  "/shipping-returns",
  "/warranty",
  "/terms-conditions",
  "/faq",
  "/privacy-policy",
];
