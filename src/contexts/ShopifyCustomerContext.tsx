import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import type { ShopifyCustomer, ShopifyOrder, ShopifyAddress } from "@/types/shopifyCustomer";
import {
  getStoredToken,
  getStoredRefreshToken,
  clearTokens,
  storeTokens,
  isTokenExpiringSoon,
  callEdgeFunction,
  buildAuthorizationUrl,
  retrievePKCEParams,
  getRedirectUri,
} from "@/lib/shopifyOAuth";

interface ShopifyCustomerContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: ShopifyCustomer | null;
  accessToken: string | null;
  initiateLogin: () => Promise<void>;
  exchangeCodeForToken: (code: string, state: string) => Promise<boolean>;
  refreshAccessToken: () => Promise<boolean>;
  logout: () => void;
  fetchCustomer: () => Promise<ShopifyCustomer | null>;
  fetchOrders: () => Promise<ShopifyOrder[]>;
  fetchOrder: (orderId: string) => Promise<ShopifyOrder | null>;
  fetchAddresses: () => Promise<ShopifyAddress[]>;
  createAddress: (address: Partial<ShopifyAddress>) => Promise<ShopifyAddress | null>;
  updateAddress: (addressId: string, address: Partial<ShopifyAddress>) => Promise<ShopifyAddress | null>;
  deleteAddress: (addressId: string) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
  updateCustomer: (data: { firstName?: string; lastName?: string; phone?: string }) => Promise<boolean>;
}

const ShopifyCustomerContext = createContext<ShopifyCustomerContextValue | null>(null);

export function useShopifyCustomer() {
  const ctx = useContext(ShopifyCustomerContext);
  if (!ctx) throw new Error("useShopifyCustomer must be used within ShopifyCustomerProvider");
  return ctx;
}

export function ShopifyCustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimer = useRef<ReturnType<typeof setInterval>>();

  const getToken = useCallback(() => {
    return accessToken || getStoredToken();
  }, [accessToken]);

  const fetchCustomer = useCallback(async () => {
    const token = getToken();
    if (!token) return null;
    try {
      const c = await callEdgeFunction("shopify-oauth", { action: "getCustomer", accessToken: token });
      setCustomer(c);
      return c;
    } catch {
      return null;
    }
  }, [getToken]);

  const refreshAccessToken = useCallback(async () => {
    const rt = getStoredRefreshToken();
    if (!rt) return false;
    try {
      const tokens = await callEdgeFunction("shopify-oauth", { action: "refreshToken", refreshToken: rt });
      storeTokens(tokens);
      setAccessToken(tokens.access_token);
      return true;
    } catch {
      clearTokens();
      setAccessToken(null);
      setCustomer(null);
      return false;
    }
  }, []);

  // Auto-load customer on mount if token exists
  useEffect(() => {
    const token = getStoredToken();
    setAccessToken(token);
    if (!token) {
      setIsLoading(false);
      return;
    }
    (async () => {
      if (isTokenExpiringSoon()) {
        const ok = await refreshAccessToken();
        if (!ok) {
          setIsLoading(false);
          return;
        }
      }
      await fetchCustomer();
      setIsLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Token refresh interval
  useEffect(() => {
    if (!accessToken) return;
    refreshTimer.current = setInterval(async () => {
      if (isTokenExpiringSoon(120_000)) await refreshAccessToken();
    }, 60_000);
    return () => clearInterval(refreshTimer.current);
  }, [accessToken, refreshAccessToken]);

  const initiateLogin = useCallback(async () => {
    const url = await buildAuthorizationUrl();
    window.location.href = url;
  }, []);

  const exchangeCodeForToken = useCallback(async (code: string, state: string) => {
    const pkce = retrievePKCEParams();
    if (!pkce || pkce.state !== state) return false;
    try {
      const tokens = await callEdgeFunction("shopify-oauth", {
        action: "exchangeToken",
        code,
        codeVerifier: pkce.codeVerifier,
        redirectUri: getRedirectUri(),
      });
      storeTokens(tokens);
      setAccessToken(tokens.access_token);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null);
    setCustomer(null);
  }, []);

  const fetchOrders = useCallback(async () => {
    const token = getToken();
    if (!token) return [];
    return callEdgeFunction("shopify-oauth", { action: "getOrders", accessToken: token });
  }, [getToken]);

  const fetchOrder = useCallback(async (orderId: string) => {
    const token = getToken();
    if (!token) return null;
    return callEdgeFunction("shopify-oauth", { action: "getOrder", accessToken: token, orderId });
  }, [getToken]);

  const fetchAddresses = useCallback(async () => {
    const token = getToken();
    if (!token) return [];
    return callEdgeFunction("shopify-oauth", { action: "getAddresses", accessToken: token });
  }, [getToken]);

  const createAddress = useCallback(async (address: Partial<ShopifyAddress>) => {
    const token = getToken();
    if (!token) return null;
    return callEdgeFunction("shopify-oauth", { action: "createAddress", accessToken: token, address });
  }, [getToken]);

  const updateAddress = useCallback(async (addressId: string, address: Partial<ShopifyAddress>) => {
    const token = getToken();
    if (!token) return null;
    return callEdgeFunction("shopify-oauth", { action: "updateAddress", accessToken: token, addressId, address });
  }, [getToken]);

  const deleteAddress = useCallback(async (addressId: string) => {
    const token = getToken();
    if (!token) return false;
    const res = await callEdgeFunction("shopify-oauth", { action: "deleteAddress", accessToken: token, addressId });
    return !!res.success;
  }, [getToken]);

  const setDefaultAddress = useCallback(async (addressId: string) => {
    const token = getToken();
    if (!token) return false;
    const res = await callEdgeFunction("shopify-oauth", { action: "setDefaultAddress", accessToken: token, addressId });
    return !!res.success;
  }, [getToken]);

  const updateCustomerFn = useCallback(async (data: { firstName?: string; lastName?: string; phone?: string }) => {
    const token = getToken();
    if (!token) return false;
    try {
      const updated = await callEdgeFunction("shopify-oauth", { action: "updateCustomer", accessToken: token, ...data });
      if (updated.id) {
        await fetchCustomer();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [getToken, fetchCustomer]);

  return (
    <ShopifyCustomerContext.Provider
      value={{
        isAuthenticated: !!accessToken && !!customer,
        isLoading,
        customer,
        accessToken,
        initiateLogin,
        exchangeCodeForToken,
        refreshAccessToken,
        logout,
        fetchCustomer,
        fetchOrders,
        fetchOrder,
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        updateCustomer: updateCustomerFn,
      }}
    >
      {children}
    </ShopifyCustomerContext.Provider>
  );
}
