import { toast } from "sonner";

// Shopify Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'sokbattery-frontline-shine-zq4jf.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Products & Checkout (Lovable Integration)
const SHOPIFY_STOREFRONT_TOKEN = '256f91dfddaeb67d0754c2f244378c30';

// Blog Content (Blog Reader App - has unauthenticated_read_content scope)
const SHOPIFY_BLOG_TOKEN = 'a8338a20b12c0be60e50caaf1c8c67b3';

// Types
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface ShopifyArticle {
  node: {
    id: string;
    title: string;
    handle: string;
    publishedAt: string;
    excerpt: string | null;
    contentHtml: string;
    image: {
      url: string;
      altText: string | null;
    } | null;
    author: {
      name: string;
    };
    blog: {
      handle: string;
    };
  };
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

// Storefront API helper function (Products & Checkout)
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Your store needs to be upgraded to a paid plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// Blog API helper function (Blog Reader App)
async function blogApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_BLOG_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// GraphQL Queries
const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_BLOG_ARTICLES = `
  query GetBlogArticles($blogHandle: String!, $first: Int!) {
    blog(handle: $blogHandle) {
      title
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            publishedAt
            excerpt
            contentHtml
            image {
              url
              altText
            }
            author {
              name
            }
            blog {
              handle
            }
          }
        }
      }
    }
  }
`;

const GET_ARTICLE_BY_HANDLE = `
  query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        handle
        publishedAt
        contentHtml
        image {
          url
          altText
        }
        author {
          name
        }
        blog {
          handle
        }
      }
    }
  }
`;

// Fetch products
export async function fetchProducts(first: number = 20, query?: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
    if (!data) return [];
    return data.data.products.edges;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Create checkout
export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { lines },
    });

    if (!cartData) {
      throw new Error('Failed to create cart');
    }

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}

// Fetch blog articles (uses Blog Reader token)
export async function fetchBlogArticles(blogHandle: string = 'faq', first: number = 20): Promise<ShopifyArticle[]> {
  try {
    const data = await blogApiRequest(GET_BLOG_ARTICLES, { blogHandle, first });
    if (!data || !data.data.blog) return [];
    return data.data.blog.articles.edges;
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return [];
  }
}

// Fetch single article by handle (uses Blog Reader token)
export async function fetchArticleByHandle(blogHandle: string, articleHandle: string): Promise<ShopifyArticle['node'] | null> {
  try {
    const data = await blogApiRequest(GET_ARTICLE_BY_HANDLE, { blogHandle, articleHandle });
    if (!data || !data.data.blog) return null;
    return data.data.blog.articleByHandle;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}
