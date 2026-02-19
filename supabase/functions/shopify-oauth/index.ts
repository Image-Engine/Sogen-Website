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

function getEnv(key: string): string {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}

// GraphQL helper for Customer Account API
async function customerGql(storeId: string, accessToken: string, query: string, variables: Record<string, unknown> = {}) {
  const url = `https://shopify.com/${storeId}/account/customer/api/2025-01/graphql`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) throw new Error(data.errors.map((e: any) => e.message).join(", "));
  return data.data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action } = body;
    const clientId = getEnv("SHOPIFY_CUSTOMER_API_CLIENT_ID");
    const clientSecret = getEnv("SHOPIFY_CUSTOMER_API_CLIENT_SECRET");
    const storeId = getEnv("SHOPIFY_STORE_ID");

    // ── getClientId ──
    if (action === "getClientId") return json({ clientId });

    // ── getStoreId ──
    if (action === "getStoreId") return json({ storeId });

    // ── exchangeToken ──
    if (action === "exchangeToken") {
      const { code, codeVerifier, redirectUri } = body;
      const tokenUrl = `https://shopify.com/${storeId}/auth/oauth/token`;
      const res = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });
      const tokens = await res.json();
      if (!res.ok) return json({ error: tokens.error_description || tokens.error || "Token exchange failed" }, 400);
      return json(tokens);
    }

    // ── refreshToken ──
    if (action === "refreshToken") {
      const { refreshToken } = body;
      const tokenUrl = `https://shopify.com/${storeId}/auth/oauth/token`;
      const res = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
      });
      const tokens = await res.json();
      if (!res.ok) return json({ error: tokens.error_description || "Refresh failed" }, 400);
      return json(tokens);
    }

    // ── getCustomer ──
    if (action === "getCustomer") {
      const data = await customerGql(storeId, body.accessToken, `{
        customer {
          id firstName lastName
          emailAddress { emailAddress }
          phoneNumber { phoneNumber }
          defaultAddress { id firstName lastName company address1 address2 city province provinceCode country countryCode zip phone }
          addresses(first: 20) { edges { node { id firstName lastName company address1 address2 city province provinceCode country countryCode zip phone } } }
        }
      }`);
      return json(data.customer);
    }

    // ── getOrders ──
    if (action === "getOrders") {
      const data = await customerGql(storeId, body.accessToken, `{
        customer {
          orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
            edges { node {
              id name processedAt financialStatus fulfillmentStatus
              totalPrice { amount currencyCode }
              lineItems(first: 10) { edges { node {
                title quantity
                originalTotalPrice { amount currencyCode }
                variant { title price { amount currencyCode } image { url altText } }
              } } }
              fulfillments { status trackingInfo { number url company } }
              shippingAddress { firstName lastName address1 city province country zip }
              statusPageUrl
            } }
          }
        }
      }`);
      return json(data.customer.orders.edges.map((e: any) => e.node));
    }

    // ── getOrder ──
    if (action === "getOrder") {
      const data = await customerGql(storeId, body.accessToken, `query($id: ID!) {
        order(id: $id) {
          id name processedAt financialStatus fulfillmentStatus
          totalPrice { amount currencyCode }
          lineItems(first: 50) { edges { node {
            title quantity
            originalTotalPrice { amount currencyCode }
            variant { title price { amount currencyCode } image { url altText } }
          } } }
          fulfillments { status trackingInfo { number url company } }
          shippingAddress { firstName lastName address1 address2 city province country zip phone }
          statusPageUrl
        }
      }`, { id: body.orderId });
      return json(data.order);
    }

    // ── getAddresses ──
    if (action === "getAddresses") {
      const data = await customerGql(storeId, body.accessToken, `{
        customer {
          defaultAddress { id }
          addresses(first: 20) { edges { node { id firstName lastName company address1 address2 city province provinceCode country countryCode zip phone } } }
        }
      }`);
      const defaultId = data.customer.defaultAddress?.id;
      const addresses = data.customer.addresses.edges.map((e: any) => ({
        ...e.node,
        isDefault: e.node.id === defaultId,
      }));
      return json(addresses);
    }

    // ── createAddress ──
    if (action === "createAddress") {
      const { address } = body;
      const data = await customerGql(storeId, body.accessToken, `mutation($address: CustomerAddressInput!) {
        customerAddressCreate(address: $address) {
          customerAddress { id firstName lastName company address1 address2 city province provinceCode country countryCode zip phone }
          userErrors { field message }
        }
      }`, { address });
      if (data.customerAddressCreate.userErrors?.length) {
        return json({ error: data.customerAddressCreate.userErrors[0].message }, 400);
      }
      return json(data.customerAddressCreate.customerAddress);
    }

    // ── updateAddress ──
    if (action === "updateAddress") {
      const { addressId, address } = body;
      const data = await customerGql(storeId, body.accessToken, `mutation($addressId: ID!, $address: CustomerAddressInput!) {
        customerAddressUpdate(addressId: $addressId, address: $address) {
          customerAddress { id firstName lastName company address1 address2 city province provinceCode country countryCode zip phone }
          userErrors { field message }
        }
      }`, { addressId, address });
      if (data.customerAddressUpdate.userErrors?.length) {
        return json({ error: data.customerAddressUpdate.userErrors[0].message }, 400);
      }
      return json(data.customerAddressUpdate.customerAddress);
    }

    // ── deleteAddress ──
    if (action === "deleteAddress") {
      const data = await customerGql(storeId, body.accessToken, `mutation($addressId: ID!) {
        customerAddressDelete(addressId: $addressId) {
          deletedAddressId
          userErrors { field message }
        }
      }`, { addressId: body.addressId });
      if (data.customerAddressDelete.userErrors?.length) {
        return json({ error: data.customerAddressDelete.userErrors[0].message }, 400);
      }
      return json({ success: true });
    }

    // ── setDefaultAddress ──
    if (action === "setDefaultAddress") {
      const data = await customerGql(storeId, body.accessToken, `mutation($addressId: ID!) {
        customerDefaultAddressUpdate(addressId: $addressId) {
          customer { defaultAddress { id } }
          userErrors { field message }
        }
      }`, { addressId: body.addressId });
      if (data.customerDefaultAddressUpdate.userErrors?.length) {
        return json({ error: data.customerDefaultAddressUpdate.userErrors[0].message }, 400);
      }
      return json({ success: true });
    }

    // ── updateCustomer ──
    if (action === "updateCustomer") {
      const { firstName, lastName, phone } = body;
      const input: Record<string, unknown> = {};
      if (firstName !== undefined) input.firstName = firstName;
      if (lastName !== undefined) input.lastName = lastName;
      if (phone !== undefined) input.phoneNumber = phone;
      const data = await customerGql(storeId, body.accessToken, `mutation($input: CustomerUpdateInput!) {
        customerUpdate(input: $input) {
          customer { id firstName lastName phoneNumber { phoneNumber } }
          userErrors { field message }
        }
      }`, { input });
      if (data.customerUpdate.userErrors?.length) {
        return json({ error: data.customerUpdate.userErrors[0].message }, 400);
      }
      return json(data.customerUpdate.customer);
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
});
