import { handleShopifyOAuthAction } from "@/lib/server/shopifyOAuthHandler";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, status } = await handleShopifyOAuthAction(body);
    return NextResponse.json(data, { status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
