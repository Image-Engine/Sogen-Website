import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GoogleReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime: string;
}

interface GoogleReviewsResponse {
  reviews?: GoogleReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

interface ServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

// Convert Google's star rating enum to number
function starRatingToNumber(
  rating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"
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

// Calculate relative time string
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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

// Create a JWT for Google API authentication
async function createJWT(
  serviceAccount: ServiceAccountKey,
  scope: string
): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const signatureInput = `${headerB64}.${payloadB64}`;

  // Import the private key
  const privateKeyPem = serviceAccount.private_key;
  const pemContents = privateKeyPem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(signatureInput)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${signatureInput}.${signatureB64}`;
}

// Get access token from Google
async function getAccessToken(
  serviceAccount: ServiceAccountKey
): Promise<string> {
  const scope = "https://www.googleapis.com/auth/business.manage";
  const jwt = await createJWT(serviceAccount, scope);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Failed to get access token:", error);
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Fetch all reviews from Google My Business API
async function fetchAllGoogleReviews(
  accessToken: string,
  accountId: string,
  locationId: string
): Promise<GoogleReview[]> {
  const allReviews: GoogleReview[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`
    );
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }
    url.searchParams.set("pageSize", "50");

    console.log(`Fetching reviews from: ${url.toString()}`);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to fetch reviews:", error);
      throw new Error(`Failed to fetch reviews: ${error}`);
    }

    const data: GoogleReviewsResponse = await response.json();
    console.log(`Fetched ${data.reviews?.length || 0} reviews`);

    if (data.reviews) {
      allReviews.push(...data.reviews);
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  console.log(`Total reviews fetched: ${allReviews.length}`);
  return allReviews;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting fetch-google-reviews function");

    // Initialize Supabase client with service role for write access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if we have fresh cached reviews (less than 1 hour old)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: cachedReviews, error: cacheError } = await supabase
      .from("google_reviews")
      .select("*")
      .gte("fetched_at", oneHourAgo)
      .order("create_time", { ascending: false });

    if (!cacheError && cachedReviews && cachedReviews.length > 0) {
      console.log(`Returning ${cachedReviews.length} cached reviews`);

      // Calculate stats from cached reviews
      const totalRating = cachedReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating =
        cachedReviews.length > 0 ? totalRating / cachedReviews.length : 0;
      const recommendCount = cachedReviews.filter((r) => r.rating >= 4).length;
      const recommendPercentage =
        cachedReviews.length > 0
          ? Math.round((recommendCount / cachedReviews.length) * 100)
          : 0;

      return new Response(
        JSON.stringify({
          reviews: cachedReviews,
          stats: {
            averageRating: Math.round(averageRating * 10) / 10,
            totalCount: cachedReviews.length,
            recommendPercentage,
          },
          cached: true,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get Google credentials from secrets
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    const accountId = Deno.env.get("GOOGLE_BUSINESS_ACCOUNT_ID");
    const locationId = Deno.env.get("GOOGLE_BUSINESS_LOCATION_ID");

    if (!serviceAccountJson || !accountId || !locationId) {
      console.error("Missing Google credentials");

      // Return any existing cached reviews if available (even if stale)
      const { data: staleReviews } = await supabase
        .from("google_reviews")
        .select("*")
        .order("create_time", { ascending: false });

      if (staleReviews && staleReviews.length > 0) {
        const totalRating = staleReviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / staleReviews.length;
        const recommendCount = staleReviews.filter((r) => r.rating >= 4).length;
        const recommendPercentage = Math.round(
          (recommendCount / staleReviews.length) * 100
        );

        return new Response(
          JSON.stringify({
            reviews: staleReviews,
            stats: {
              averageRating: Math.round(averageRating * 10) / 10,
              totalCount: staleReviews.length,
              recommendPercentage,
            },
            cached: true,
            stale: true,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          error: "Google credentials not configured",
          reviews: [],
          stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 },
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse service account JSON
    let serviceAccount: ServiceAccountKey;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch {
      console.error("Invalid service account JSON");
      return new Response(
        JSON.stringify({ error: "Invalid service account JSON" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get access token
    console.log("Getting access token...");
    const accessToken = await getAccessToken(serviceAccount);

    // Fetch all reviews from Google
    console.log("Fetching reviews from Google...");
    const googleReviews = await fetchAllGoogleReviews(
      accessToken,
      accountId,
      locationId
    );

    // Upsert reviews into database
    const now = new Date().toISOString();
    const reviewsToUpsert = googleReviews.map((review) => ({
      review_id: review.reviewId,
      author_name: review.reviewer.displayName,
      profile_photo_url: review.reviewer.profilePhotoUrl || null,
      rating: starRatingToNumber(review.starRating),
      review_text: review.comment || null,
      relative_time: getRelativeTime(review.createTime),
      create_time: review.createTime,
      fetched_at: now,
    }));

    if (reviewsToUpsert.length > 0) {
      const { error: upsertError } = await supabase
        .from("google_reviews")
        .upsert(reviewsToUpsert, {
          onConflict: "review_id",
          ignoreDuplicates: false,
        });

      if (upsertError) {
        console.error("Failed to upsert reviews:", upsertError);
      } else {
        console.log(`Upserted ${reviewsToUpsert.length} reviews`);
      }
    }

    // Fetch all reviews from database (including any existing ones)
    const { data: allReviews, error: fetchError } = await supabase
      .from("google_reviews")
      .select("*")
      .order("create_time", { ascending: false });

    if (fetchError) {
      console.error("Failed to fetch reviews from database:", fetchError);
      throw fetchError;
    }

    // Calculate stats
    const totalRating = allReviews?.reduce((sum, r) => sum + r.rating, 0) || 0;
    const averageRating =
      allReviews && allReviews.length > 0 ? totalRating / allReviews.length : 0;
    const recommendCount =
      allReviews?.filter((r) => r.rating >= 4).length || 0;
    const recommendPercentage =
      allReviews && allReviews.length > 0
        ? Math.round((recommendCount / allReviews.length) * 100)
        : 0;

    console.log(
      `Returning ${allReviews?.length || 0} reviews with avg rating ${averageRating}`
    );

    return new Response(
      JSON.stringify({
        reviews: allReviews || [],
        stats: {
          averageRating: Math.round(averageRating * 10) / 10,
          totalCount: allReviews?.length || 0,
          recommendPercentage,
        },
        cached: false,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in fetch-google-reviews:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: errorMessage,
        reviews: [],
        stats: { averageRating: 0, totalCount: 0, recommendPercentage: 0 },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
