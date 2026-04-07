import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = "https://sogenenergy.co.nz";
const SHOPIFY_STORE = "sokbattery-frontline-shine-zq4jf.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STOREFRONT_TOKEN = "256f91dfddaeb67d0754c2f244378c30";
const STOREFRONT_URL = `https://${SHOPIFY_STORE}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/products", priority: "0.9", changefreq: "daily" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/energy-hub-2", priority: "0.7", changefreq: "monthly" },
  { path: "/rv-campers", priority: "0.7", changefreq: "monthly" },
  { path: "/solar-systems", priority: "0.7", changefreq: "monthly" },
  { path: "/home-backup", priority: "0.7", changefreq: "monthly" },
  { path: "/industrial", priority: "0.7", changefreq: "monthly" },
  { path: "/accessories", priority: "0.7", changefreq: "monthly" },
  { path: "/victron", priority: "0.7", changefreq: "monthly" },
  { path: "/video-reviews", priority: "0.6", changefreq: "weekly" },
  { path: "/shipping-returns", priority: "0.4", changefreq: "monthly" },
  { path: "/warranty", priority: "0.4", changefreq: "monthly" },
  { path: "/terms-conditions", priority: "0.3", changefreq: "yearly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
];

async function fetchAllProducts(): Promise<Array<{ handle: string; updatedAt: string }>> {
  const products: Array<{ handle: string; updatedAt: string }> = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const query = `{
      products(first: 250${afterClause}) {
        edges {
          node { handle updatedAt }
          cursor
        }
        pageInfo { hasNextPage }
      }
    }`;

    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    const edges = json?.data?.products?.edges ?? [];
    for (const edge of edges) {
      products.push({ handle: edge.node.handle, updatedAt: edge.node.updatedAt });
      cursor = edge.cursor;
    }
    hasNextPage = json?.data?.products?.pageInfo?.hasNextPage ?? false;
  }

  return products;
}

async function fetchAllCollections(): Promise<Array<{ handle: string; updatedAt: string }>> {
  const collections: Array<{ handle: string; updatedAt: string }> = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const query = `{
      collections(first: 250${afterClause}) {
        edges {
          node { handle updatedAt }
          cursor
        }
        pageInfo { hasNextPage }
      }
    }`;

    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    const edges = json?.data?.collections?.edges ?? [];
    for (const edge of edges) {
      collections.push({ handle: edge.node.handle, updatedAt: edge.node.updatedAt });
      cursor = edge.cursor;
    }
    hasNextPage = json?.data?.collections?.pageInfo?.hasNextPage ?? false;
  }

  return collections;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

serve(async () => {
  try {
    const [products, collections] = await Promise.all([
      fetchAllProducts(),
      fetchAllCollections(),
    ]);

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (const page of STATIC_PAGES) {
      xml += `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    for (const product of products) {
      const lastmod = product.updatedAt ? product.updatedAt.split("T")[0] : today;
      xml += `
  <url>
    <loc>${SITE_URL}/product/${escapeXml(product.handle)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }

    for (const collection of collections) {
      const lastmod = collection.updatedAt ? collection.updatedAt.split("T")[0] : today;
      xml += `
  <url>
    <loc>${SITE_URL}/collections/${escapeXml(collection.handle)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    xml += `
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
});
