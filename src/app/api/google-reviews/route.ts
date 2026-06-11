import { getGoogleReviews } from "@/lib/server/googleReviews";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const result = await getGoogleReviews();
  const status = result.error && result.reviews.length === 0 ? 500 : 200;
  return NextResponse.json(result, { status });
}
