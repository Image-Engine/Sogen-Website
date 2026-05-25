import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  /**
   * Path or absolute URL for this page's canonical. When omitted, defaults to
   * the current pathname so every route is self-referencing (never the homepage).
   * Pass a path like "/product/foo" or an absolute "https://..." URL.
   */
  canonical?: string;
  noIndex?: boolean;
  /** Optional JSON-LD structured data object (e.g. Product, Article, BreadcrumbList). */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_NAME = "SOK Battery NZ";
const SITE_URL = "https://sogenenergy.co.nz";
const DEFAULT_DESCRIPTION =
  "Shop SOK Battery LiFePO4 lithium batteries, solar panels, and energy storage solutions in New Zealand. High-performance batteries for RV, marine, off-grid, and industrial use.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/placeholder.svg`;

function toAbsolute(url: string | undefined, fallback: string): string {
  if (!url) return fallback;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage,
  ogType = "website",
  canonical,
  noIndex = false,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | LiFePO4 Lithium Batteries & Solar Solutions`;

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const canonicalUrl = canonical
    ? /^https?:\/\//i.test(canonical)
      ? canonical
      : `${SITE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical}`
    : `${SITE_URL}${currentPath}`;

  const absoluteOgImage = toAbsolute(ogImage, DEFAULT_OG_IMAGE);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      <link rel="canonical" href={canonicalUrl} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
