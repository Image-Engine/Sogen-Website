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
    vendor: string;
    productType: string;
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
    compareAtPriceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    } | null;
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice: {
            amount: string;
            currencyCode: string;
          } | null;
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

export interface ShopifyCollection {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
    image: {
      url: string;
      altText: string | null;
    } | null;
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
  query GetProducts($first: Int!, $query: String, $after: String) @inContext(country: NZ) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          vendor
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
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
                compareAtPrice {
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
  mutation cartCreate($input: CartInput!) @inContext(country: NZ) {
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

const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $first: Int!) @inContext(country: NZ) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            vendor
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
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
                  compareAtPrice {
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
  }
`;

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) @inContext(country: NZ) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      productType
      vendor
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            compareAtPrice {
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
      collections(first: 25) {
        edges {
          node {
            id
            handle
            title
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_RECOMMENDATIONS = `
  query GetProductRecommendations($productId: ID!) @inContext(country: NZ) {
    productRecommendations(productId: $productId) {
      id
      title
      description
      handle
      vendor
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
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
            compareAtPrice {
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
`;

// Fetch products with cursor-based pagination to get ALL products
export async function fetchProducts(first: number = 250, query?: string): Promise<ShopifyProduct[]> {
  try {
    let allProducts: ShopifyProduct[] = [];
    let cursor: string | null = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: Math.min(first, 250), query, after: cursor });
      if (!data) break;
      const edges = data.data.products.edges;
      allProducts = [...allProducts, ...edges];
      hasNextPage = data.data.products.pageInfo.hasNextPage;
      cursor = data.data.products.pageInfo.endCursor;
      
      // If caller requested a specific limit and we've hit it, stop
      if (first <= 250 && allProducts.length >= first) {
        allProducts = allProducts.slice(0, first);
        break;
      }
    }
    return allProducts;
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

// Fetch collections
export async function fetchCollections(first: number = 50): Promise<ShopifyCollection[]> {
  try {
    const data = await storefrontApiRequest(GET_COLLECTIONS, { first });
    if (!data) return [];
    return data.data.collections.edges;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

// Fetch collection by handle with products
export interface CollectionWithProducts {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  products: ShopifyProduct[];
}

export async function fetchCollectionByHandle(handle: string, first: number = 50): Promise<CollectionWithProducts | null> {
  try {
    const data = await storefrontApiRequest(GET_COLLECTION_BY_HANDLE, { handle, first });
    if (!data || !data.data.collection) return null;
    const collection = data.data.collection;
    return {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description,
      image: collection.image,
      products: collection.products.edges.map((edge: { node: ShopifyProduct['node'] }) => ({ node: edge.node })),
    };
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

// Fetch product by handle
export interface ProductCollection {
  id: string;
  handle: string;
  title: string;
}

export interface ProductDetails {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
  vendor: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  } | null;
  images: Array<{ url: string; altText: string | null }>;
  variants: Array<{
    id: string;
    title: string;
    sku: string | null;
    price: { amount: string; currencyCode: string };
    compareAtPrice: { amount: string; currencyCode: string } | null;
    availableForSale: boolean;
    selectedOptions: Array<{ name: string; value: string }>;
  }>;
  options: Array<{ name: string; values: string[] }>;
  collections: ProductCollection[];
  tags: string[];
}

export async function fetchProductByHandle(handle: string): Promise<ProductDetails | null> {
  try {
    const data = await storefrontApiRequest(GET_PRODUCT_BY_HANDLE, { handle });
    if (!data || !data.data.product) return null;
    const product = data.data.product;
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      handle: product.handle,
      productType: product.productType || '',
      vendor: product.vendor || '',
      priceRange: product.priceRange,
      compareAtPriceRange: product.compareAtPriceRange || null,
      images: product.images.edges.map((edge: { node: { url: string; altText: string | null } }) => edge.node),
      variants: product.variants.edges.map((edge: { node: ProductDetails['variants'][0] }) => edge.node),
      options: product.options,
      collections: product.collections?.edges?.map((edge: { node: ProductCollection }) => edge.node) || [],
      tags: product.tags || [],
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch product recommendations
export async function fetchProductRecommendations(productId: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(GET_PRODUCT_RECOMMENDATIONS, { productId });
    if (!data || !data.data.productRecommendations) return [];
    return data.data.productRecommendations.map((product: ShopifyProduct['node']) => ({ node: product }));
  } catch (error) {
    console.error('Error fetching product recommendations:', error);
    return [];
  }
}

// Fetch products by vendor (paginated)
export async function fetchProductsByVendor(vendor: string, first: number = 250): Promise<ShopifyProduct[]> {
  return fetchProducts(first, `vendor:${vendor}`);
}

// Quick search for autocomplete: lightweight product matches
export interface QuickSearchProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  imageUrl: string | null;
  price: { amount: string; currencyCode: string } | null;
}

const QUICK_SEARCH_QUERY = `
  query QuickSearch($first: Int!, $query: String!) @inContext(country: NZ) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          vendor
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

export async function searchProductsQuick(term: string, limit: number = 6): Promise<QuickSearchProduct[]> {
  const trimmed = term.trim();
  if (!trimmed) return [];
  // Match title, vendor, product type, and tag with a wildcard prefix
  const safe = trimmed.replace(/["\\]/g, '');
  const query = `title:*${safe}* OR vendor:*${safe}* OR product_type:*${safe}* OR tag:*${safe}*`;
  try {
    const data = await storefrontApiRequest(QUICK_SEARCH_QUERY, { first: limit, query });
    if (!data?.data?.products?.edges) return [];
    return data.data.products.edges.map((e: any) => ({
      id: e.node.id,
      handle: e.node.handle,
      title: e.node.title,
      vendor: e.node.vendor,
      imageUrl: e.node.featuredImage?.url ?? null,
      price: e.node.priceRange?.minVariantPrice ?? null,
    }));
  } catch (err) {
    console.error('Quick search failed:', err);
    return [];
  }
}
