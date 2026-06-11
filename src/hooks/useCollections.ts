import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/lib/shopify";

const STALE_TIME = 10 * 60 * 1000;

export const collectionKeys = {
  all: ["collections"] as const,
  list: () => [...collectionKeys.all, "list"] as const,
};

export function useCollections() {
  return useQuery({
    queryKey: collectionKeys.list(),
    queryFn: () => fetchCollections(),
    staleTime: STALE_TIME,
  });
}
