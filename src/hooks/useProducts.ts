import { useEffect, useState, useCallback, useRef } from "react";
import { fetchProducts, fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";

const POLL_INTERVAL = 60_000; // 60 seconds

interface UseProductsOptions {
  query?: string;
  collectionHandle?: string;
  pollInterval?: number;
  maxProducts?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { query, collectionHandle, pollInterval = POLL_INTERVAL, maxProducts = 999 } = options;
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const loadProducts = useCallback(async (isPolling = false) => {
    if (!isPolling) setLoading(true);
    try {
      let result: ShopifyProduct[];
      if (collectionHandle) {
        const collection = await fetchCollectionByHandle(collectionHandle, 250);
        result = collection?.products || [];
      } else {
        result = await fetchProducts(maxProducts, query);
      }
      if (mountedRef.current) {
        setProducts(result);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [query, collectionHandle, maxProducts]);

  useEffect(() => {
    mountedRef.current = true;
    loadProducts();

    const interval = setInterval(() => {
      loadProducts(true);
    }, pollInterval);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [loadProducts, pollInterval]);

  return { products, loading, refresh: () => loadProducts(false) };
}
