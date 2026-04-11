import { corsHeaders } from '@supabase/supabase-js/cors';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const getEnv = (key: string) => {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`${key} is not configured`);
  return value;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const SHOPIFY_ACCESS_TOKEN = getEnv('SHOPIFY_ACCESS_TOKEN');
    const SHOPIFY_STOREFRONT_ACCESS_TOKEN = getEnv('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
    const SHOPIFY_STORE_ID = getEnv('SHOPIFY_STORE_ID');
    const storeDomain = `sokbattery-frontline-shine-zq4jf.myshopify.com`;

    const body = await req.json().catch(() => ({}));
    const title = typeof body?.title === 'string' && body.title.trim()
      ? body.title.trim()
      : 'SOK 48V 100Ah 5kwh battery x4';

    const adminQuery = `
      query ProductVisibility($query: String!) {
        products(first: 10, query: $query) {
          edges {
            node {
              id
              legacyResourceId
              title
              handle
              status
              publishedAt
              vendor
              productType
              tags
              category { fullName }
              collections(first: 20) {
                edges {
                  node {
                    id
                    title
                    handle
                  }
                }
              }
              resourcePublicationsCount {
                count
              }
              resourcePublications(first: 20) {
                edges {
                  node {
                    isPublished
                    publishDate
                    publication {
                      id
                      name
                      supportsFuturePublishing
                      catalog {
                        ... on AppCatalog {
                          id
                          title
                        }
                        ... on MarketCatalog {
                          id
                          title
                          status
                        }
                        ... on CompanyLocationCatalog {
                          id
                          title
                          status
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const adminRes = await fetch(`https://${storeDomain}/admin/api/2025-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: adminQuery,
        variables: { query: `title:'${title.replace(/'/g, "\\'")}'` },
      }),
    });

    const adminData = await adminRes.json();

    const storefrontQuery = `
      query StorefrontCheck($query: String!) @inContext(country: NZ) {
        products(first: 10, query: $query) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `;

    const storefrontRes = await fetch(`https://${storeDomain}/api/2025-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: storefrontQuery,
        variables: { query: `title:'${title.replace(/'/g, "\\'")}'` },
      }),
    });

    const storefrontData = await storefrontRes.json();

    return json({
      title,
      storeId: SHOPIFY_STORE_ID,
      admin: adminData,
      storefront: storefrontData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return json({ error: message }, 500);
  }
});