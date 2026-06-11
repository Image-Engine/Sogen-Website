import {
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { fetchProductByHandle } from "@/lib/shopify";

const STALE_TIME = 5 * 60 * 1000;

export const productKeys = {
  all: ["products"] as const,
  detail: (handle: string) => [...productKeys.all, handle] as const,
};

export function prefetchProduct(queryClient: QueryClient, handle: string) {
  return queryClient.prefetchQuery({
    queryKey: productKeys.detail(handle),
    queryFn: () => fetchProductByHandle(handle),
    staleTime: STALE_TIME,
  });
}

export function useProduct(handle: string | undefined) {
  return useQuery({
    queryKey: productKeys.detail(handle ?? ""),
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
    staleTime: STALE_TIME,
  });
}
