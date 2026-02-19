export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyAddress {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  provinceCode?: string;
  country: string;
  countryCode?: string;
  zip: string;
  phone?: string;
  isDefault?: boolean;
}

export interface ShopifyOrderLineItem {
  title: string;
  quantity: number;
  variant?: {
    title: string;
    image?: { url: string; altText?: string };
    price: ShopifyMoney;
  };
  originalTotalPrice: ShopifyMoney;
}

export interface ShopifyFulfillment {
  status: string;
  trackingInfo: Array<{
    number?: string;
    url?: string;
    company?: string;
  }>;
}

export interface ShopifyOrder {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: ShopifyMoney;
  lineItems: {
    edges: Array<{ node: ShopifyOrderLineItem }>;
  };
  fulfillments: ShopifyFulfillment[];
  shippingAddress?: ShopifyAddress;
  statusPageUrl?: string;
}

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress?: { emailAddress: string };
  phoneNumber?: { phoneNumber: string };
  defaultAddress?: ShopifyAddress;
  addresses: {
    edges: Array<{ node: ShopifyAddress }>;
  };
}

export interface ShopifyAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token?: string;
}

export interface PKCEParams {
  codeVerifier: string;
  codeChallenge: string;
  state: string;
}
