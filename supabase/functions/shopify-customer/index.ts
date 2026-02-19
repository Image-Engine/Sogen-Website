import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, customerId } = body;

    // Require a Shopify customer accessToken to prove the caller is authenticated
    if (!body.accessToken || typeof body.accessToken !== "string") {
      return json({ error: "Unauthorized: missing accessToken" }, 401);
    }

    // Validate the caller's token by making a lightweight call to Shopify Customer Account API
    const storeId = Deno.env.get("SHOPIFY_STORE_ID");
    if (storeId) {
      const verifyUrl = `https://shopify.com/${storeId}/account/customer/api/2025-01/graphql`;
      const verifyRes = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.accessToken}`,
        },
        body: JSON.stringify({ query: "{ customer { id } }" }),
      });
      if (!verifyRes.ok) {
        return json({ error: "Unauthorized: invalid accessToken" }, 401);
      }
    }

    const shopDomain = Deno.env.get("SHOPIFY_STORE_DOMAIN") || "sokbattery-frontline-shine-zq4jf.myshopify.com";
    const adminToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!adminToken) throw new Error("Missing SHOPIFY_ACCESS_TOKEN");

    const adminApi = async (endpoint: string, method = "GET", payload?: unknown) => {
      const url = `https://${shopDomain}/admin/api/2025-01/${endpoint}`;
      const opts: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
      };
      if (payload) opts.body = JSON.stringify(payload);
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error(`Admin API error: ${res.status}`);
      return res.json();
    };

    if (action === "getCustomerByEmail") {
      const { email } = body;
      const data = await adminApi(`customers/search.json?query=email:${encodeURIComponent(email)}`);
      return json(data.customers?.[0] || null);
    }

    if (action === "getCustomerTags") {
      const data = await adminApi(`customers/${customerId}.json`);
      return json({ tags: data.customer?.tags || "" });
    }

    if (action === "getCustomerMarketingStatus") {
      const data = await adminApi(`customers/${customerId}.json`);
      return json({
        emailMarketingConsent: data.customer?.email_marketing_consent,
        smsMarketingConsent: data.customer?.sms_marketing_consent,
      });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
});
