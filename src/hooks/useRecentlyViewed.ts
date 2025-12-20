import { useEffect, useState } from "react";

interface RecentProduct {
  id: string;
  handle: string;
  title: string;
  imageUrl?: string;
  price: string;
  currencyCode: string;
}

const STORAGE_KEY = "recently-viewed-products";
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addProduct = (product: RecentProduct) => {
    setRecentlyViewed((prev) => {
      // Remove existing entry if present
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add to beginning
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentlyViewed([]);
  };

  return { recentlyViewed, addProduct, clearHistory };
}
