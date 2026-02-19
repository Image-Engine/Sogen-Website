import type { PKCEParams, ShopifyAuthTokens } from "@/types/shopifyCustomer";

const TOKEN_KEY = "shopify_customer_token";
const REFRESH_KEY = "shopify_customer_refresh";
const EXPIRY_KEY = "shopify_customer_expiry";
const PKCE_KEY = "shopify_pkce_params";

function base64URLEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generatePKCEParams(): Promise<PKCEParams> {
  const verifierBytes = crypto.getRandomValues(new Uint8Array(32));
  const codeVerifier = base64URLEncode(verifierBytes.buffer);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  const codeChallenge = base64URLEncode(digest);
  const stateBytes = crypto.getRandomValues(new Uint8Array(16));
  const state = base64URLEncode(stateBytes.buffer);
  return { codeVerifier, codeChallenge, state };
}

export function storePKCEParams(params: PKCEParams): void {
  sessionStorage.setItem(PKCE_KEY, JSON.stringify(params));
}

export function retrievePKCEParams(): PKCEParams | null {
  const raw = sessionStorage.getItem(PKCE_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(PKCE_KEY);
  return JSON.parse(raw);
}

export function storeTokens(tokens: ShopifyAuthTokens): void {
  localStorage.setItem(TOKEN_KEY, tokens.access_token);
  if (tokens.refresh_token) localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
  const expiresAt = Date.now() + tokens.expires_in * 1000;
  localStorage.setItem(EXPIRY_KEY, expiresAt.toString());
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

export function isTokenExpiringSoon(bufferMs = 60_000): boolean {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() + bufferMs > parseInt(expiry, 10);
}

export function getRedirectUri(): string {
  return `${window.location.origin}/auth/callback`;
}

export async function callEdgeFunction(functionName: string, body: Record<string, unknown>): Promise<any> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const res = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export async function buildAuthorizationUrl(): Promise<string> {
  const { clientId } = await callEdgeFunction("shopify-oauth", { action: "getClientId" });
  const pkce = await generatePKCEParams();
  storePKCEParams(pkce);
  const { authorizationEndpoint } = await callEdgeFunction("shopify-oauth", { action: "getAuthConfig" });
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: getRedirectUri(),
    scope: "openid email customer-account-api:full",
    state: pkce.state,
    code_challenge: pkce.codeChallenge,
    code_challenge_method: "S256",
  });
  return `${authorizationEndpoint}?${params.toString()}`;
}
