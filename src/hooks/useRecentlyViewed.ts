import { useState } from "react";

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

function readStoredProducts(): RecentProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentProduct[]>(
    readStoredProducts,
  );

  const addProduct = (product: RecentProduct) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
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
