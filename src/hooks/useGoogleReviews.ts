import { useQuery } from "@tanstack/react-query";

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
  const res = await fetch("/api/google-reviews");
  const data = (await res.json()) as GoogleReviewsResponse;

  if (!res.ok && !data.reviews?.length) {
    console.error("Error fetching Google reviews:", data.error);
    throw new Error(data.error || res.statusText);
  }

  return (
    data || {
      reviews: [],
      stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 },
    }
  );
}

export function useGoogleReviews() {
  return useQuery({
    queryKey: ["google-reviews"],
    queryFn: fetchGoogleReviews,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  });
}
