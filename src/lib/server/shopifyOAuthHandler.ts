import { customerGql } from "@/lib/server/shopifyCustomerApi";
import {
  extractStoreId,
  getOidcConfig,
  getStoreDomain,
} from "@/lib/server/shopifyOidc";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
}

export type ShopifyOAuthResult = {
  data: unknown;
  status: number;
};

export async function handleShopifyOAuthAction(
  body: Record<string, unknown>,
): Promise<ShopifyOAuthResult> {
  const { action } = body;
  const clientId = requireEnv("SHOPIFY_CUSTOMER_API_CLIENT_ID");
  const clientSecret = requireEnv("SHOPIFY_CUSTOMER_API_CLIENT_SECRET");
  const storeDomain = getStoreDomain();

  const oidc = await getOidcConfig(storeDomain);
  const storeId = extractStoreId(oidc.issuer);

  if (action === "getClientId") {
    return { data: { clientId }, status: 200 };
  }
  if (action === "getStoreId") {
    return { data: { storeId }, status: 200 };
  }
  if (action === "getAuthConfig") {
    return {
      data: {
        authorizationEndpoint: oidc.authorization_endpoint,
        tokenEndpoint: oidc.token_endpoint,
      },
      status: 200,
    };
  }

  const protectedActions = [
    "getCustomer",
    "getOrders",
    "getOrder",
    "getAddresses",
    "createAddress",
    "updateAddress",
    "deleteAddress",
    "setDefaultAddress",
    "updateCustomer",
  ];
  if (protectedActions.includes(action as string)) {
    if (!body.accessToken || typeof body.accessToken !== "string") {
      return { data: { error: "Missing or invalid accessToken" }, status: 401 };
    }
  }

  if (action === "exchangeToken") {
    if (!body.code || !body.codeVerifier || !body.redirectUri) {
      return {
        data: { error: "Missing required parameters for token exchange" },
        status: 400,
      };
    }
    const res = await fetch(oidc.token_endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code: String(body.code),
        redirect_uri: String(body.redirectUri),
        code_verifier: String(body.codeVerifier),
      }),
    });
    const tokens = await res.json();
    if (!res.ok) {
      return {
        data: {
          error:
            tokens.error_description || tokens.error || "Token exchange failed",
        },
        status: 400,
      };
    }
    return { data: tokens, status: 200 };
  }

  if (action === "refreshToken") {
    if (!body.refreshToken) {
      return { data: { error: "Missing refreshToken" }, status: 400 };
    }
    const res = await fetch(oidc.token_endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: String(body.refreshToken),
      }),
    });
    const tokens = await res.json();
    if (!res.ok) {
      return {
        data: { error: tokens.error_description || "Refresh failed" },
        status: 400,
      };
    }
    return { data: tokens, status: 200 };
  }

  const accessToken = body.accessToken as string;

  if (action === "getCustomer") {
    const data = await customerGql(
      storeId,
      accessToken,
      `{
          customer {
            id firstName lastName
            emailAddress { emailAddress }
            phoneNumber { phoneNumber }
            defaultAddress { id firstName lastName company address1 address2 city province country zip }
            addresses(first: 20) { edges { node { id firstName lastName company address1 address2 city province country zip } } }
          }
        }`,
    );
    return { data: data.customer, status: 200 };
  }

  if (action === "getOrders") {
    const data = await customerGql(
      storeId,
      accessToken,
      `{
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
      }`,
    );
    return {
      data: data.customer.orders.edges.map(
        (e: { node: unknown }) => e.node,
      ),
      status: 200,
    };
  }

  if (action === "getOrder") {
    const data = await customerGql(
      storeId,
      accessToken,
      `query($id: ID!) {
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
      }`,
      { id: body.orderId },
    );
    return { data: data.order, status: 200 };
  }

  if (action === "getAddresses") {
    const data = await customerGql(
      storeId,
      accessToken,
      `{
        customer {
          defaultAddress { id }
          addresses(first: 20) { edges { node { id firstName lastName company address1 address2 city province country zip } } }
        }
      }`,
    );
    const defaultId = data.customer.defaultAddress?.id;
    const addresses = data.customer.addresses.edges.map(
      (e: { node: Record<string, unknown> }) => ({
        ...e.node,
        isDefault: e.node.id === defaultId,
      }),
    );
    return { data: addresses, status: 200 };
  }

  if (action === "createAddress") {
    const data = await customerGql(
      storeId,
      accessToken,
      `mutation($address: CustomerAddressInput!) {
        customerAddressCreate(address: $address) {
          customerAddress { id firstName lastName company address1 address2 city province country zip }
          userErrors { field message }
        }
      }`,
      { address: body.address },
    );
    if (data.customerAddressCreate.userErrors?.length) {
      return {
        data: { error: data.customerAddressCreate.userErrors[0].message },
        status: 400,
      };
    }
    return { data: data.customerAddressCreate.customerAddress, status: 200 };
  }

  if (action === "updateAddress") {
    const data = await customerGql(
      storeId,
      accessToken,
      `mutation($addressId: ID!, $address: CustomerAddressInput!) {
        customerAddressUpdate(addressId: $addressId, address: $address) {
          customerAddress { id firstName lastName company address1 address2 city province country zip }
          userErrors { field message }
        }
      }`,
      { addressId: body.addressId, address: body.address },
    );
    if (data.customerAddressUpdate.userErrors?.length) {
      return {
        data: { error: data.customerAddressUpdate.userErrors[0].message },
        status: 400,
      };
    }
    return { data: data.customerAddressUpdate.customerAddress, status: 200 };
  }

  if (action === "deleteAddress") {
    const data = await customerGql(
      storeId,
      accessToken,
      `mutation($addressId: ID!) {
        customerAddressDelete(addressId: $addressId) {
          deletedAddressId
          userErrors { field message }
        }
      }`,
      { addressId: body.addressId },
    );
    if (data.customerAddressDelete.userErrors?.length) {
      return {
        data: { error: data.customerAddressDelete.userErrors[0].message },
        status: 400,
      };
    }
    return { data: { success: true }, status: 200 };
  }

  if (action === "setDefaultAddress") {
    const data = await customerGql(
      storeId,
      accessToken,
      `mutation($addressId: ID!) {
        customerDefaultAddressUpdate(addressId: $addressId) {
          customer { defaultAddress { id } }
          userErrors { field message }
        }
      }`,
      { addressId: body.addressId },
    );
    if (data.customerDefaultAddressUpdate.userErrors?.length) {
      return {
        data: { error: data.customerDefaultAddressUpdate.userErrors[0].message },
        status: 400,
      };
    }
    return { data: { success: true }, status: 200 };
  }

  if (action === "updateCustomer") {
    const { firstName, lastName } = body;
    const input: Record<string, unknown> = {};
    if (firstName !== undefined) input.firstName = firstName;
    if (lastName !== undefined) input.lastName = lastName;

    if (Object.keys(input).length === 0) {
      return { data: { error: "No fields to update" }, status: 400 };
    }

    const data = await customerGql(
      storeId,
      accessToken,
      `mutation($input: CustomerUpdateInput!) {
        customerUpdate(input: $input) {
          customer { id firstName lastName }
          userErrors { field message }
        }
      }`,
      { input },
    );

    if (data.customerUpdate.userErrors?.length) {
      return {
        data: { error: data.customerUpdate.userErrors[0].message },
        status: 400,
      };
    }

    const customer = data.customerUpdate.customer;
    return {
      data: {
        id: customer?.id,
        firstName: customer?.firstName,
        lastName: customer?.lastName,
      },
      status: 200,
    };
  }

  return { data: { error: "Unknown action" }, status: 400 };
}
