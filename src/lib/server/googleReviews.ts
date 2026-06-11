import { unstable_cache } from "next/cache";

export interface CachedGoogleReview {
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

export interface GoogleReviewsPayload {
  reviews: CachedGoogleReview[];
  stats: {
    averageRating: number;
    totalCount: number;
    recommendPercentage: number;
  };
  cached?: boolean;
  stale?: boolean;
  error?: string;
}

interface GoogleApiReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
}

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function starRatingToNumber(
  rating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE",
): number {
  const map: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return map[rating] || 5;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

async function createJWT(
  serviceAccount: ServiceAccountKey,
  scope: string,
): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const signatureInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;

  const pemContents = serviceAccount.private_key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryKey = Buffer.from(pemContents, "base64");
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signatureInput),
  );

  const signatureB64 = Buffer.from(signature)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${signatureInput}.${signatureB64}`;
}

async function getGoogleAccessToken(
  serviceAccount: ServiceAccountKey,
): Promise<string> {
  const jwt = await createJWT(
    serviceAccount,
    "https://www.googleapis.com/auth/business.manage",
  );
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function fetchAllGoogleReviews(
  accessToken: string,
  accountId: string,
  locationId: string,
): Promise<GoogleApiReview[]> {
  const allReviews: GoogleApiReview[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
    );
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    url.searchParams.set("pageSize", "50");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${await response.text()}`);
    }

    const data = await response.json();
    if (data.reviews) allReviews.push(...data.reviews);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return allReviews;
}

function buildStats(reviews: CachedGoogleReview[]) {
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating =
    reviews.length > 0 ? totalRating / reviews.length : 0;
  const recommendCount = reviews.filter((r) => r.rating >= 4).length;
  const recommendPercentage =
    reviews.length > 0
      ? Math.round((recommendCount / reviews.length) * 100)
      : 0;

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalCount: reviews.length,
    recommendPercentage,
  };
}

async function fetchReviewsFromGoogle(): Promise<GoogleReviewsPayload> {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;

  if (!serviceAccountJson || !accountId || !locationId) {
    return {
      reviews: [],
      stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 },
      error: "Google credentials not configured",
    };
  }

  let serviceAccount: ServiceAccountKey;
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch {
    return {
      reviews: [],
      stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 },
      error: "Invalid service account JSON",
    };
  }

  const accessToken = await getGoogleAccessToken(serviceAccount);
  const googleReviews = await fetchAllGoogleReviews(
    accessToken,
    accountId,
    locationId,
  );

  const now = new Date().toISOString();
  const reviews: CachedGoogleReview[] = googleReviews.map((review) => ({
    id: review.reviewId,
    review_id: review.reviewId,
    author_name: review.reviewer.displayName,
    profile_photo_url: review.reviewer.profilePhotoUrl ?? null,
    rating: starRatingToNumber(review.starRating),
    review_text: review.comment ?? null,
    relative_time: getRelativeTime(review.createTime),
    create_time: review.createTime,
    fetched_at: now,
  }));

  return {
    reviews,
    stats: buildStats(reviews),
    cached: false,
  };
}

const getCachedGoogleReviews = unstable_cache(
  async () => fetchReviewsFromGoogle(),
  ["google-reviews"],
  { revalidate: 3600 },
);

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  try {
    const result = await getCachedGoogleReviews();
    return { ...result, cached: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      reviews: [],
      stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 },
      error: message,
    };
  }
}
