import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GoogleReview {
  id: string;
  review_id: string;
  author_name: string;
  profile_photo_url: string | null;
  rating: number;
  review_text: string | null;
  relative_time: string | null;
  create_time: string | null;
  fetched_at: string;
}

export interface ReviewStats {
  averageRating: number;
  totalCount: number;
  recommendPercentage: number;
}

interface GoogleReviewsResponse {
  reviews: GoogleReview[];
  stats: ReviewStats;
  cached?: boolean;
  stale?: boolean;
  error?: string;
}

async function fetchGoogleReviews(): Promise<GoogleReviewsResponse> {
  const { data, error } = await supabase.functions.invoke<GoogleReviewsResponse>(
    "fetch-google-reviews"
  );

  if (error) {
    console.error("Error fetching Google reviews:", error);
    throw error;
  }

  return data || { reviews: [], stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 } };
}

export function useGoogleReviews() {
  return useQuery({
    queryKey: ["google-reviews"],
    queryFn: fetchGoogleReviews,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 2,
  });
}
