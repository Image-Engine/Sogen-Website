import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearTokens,
  generatePKCEParams,
  getRedirectUri,
  getStoredRefreshToken,
  getStoredToken,
  isTokenExpiringSoon,
  retrievePKCEParams,
  storePKCEParams,
  storeTokens,
} from "@/lib/shopifyOAuth";
import type { PKCEParams } from "@/types/shopifyCustomer";

describe("shopifyOAuth PKCE", () => {
  it("generates valid base64url PKCE params", async () => {
    const params = await generatePKCEParams();
    const base64url = /^[A-Za-z0-9_-]+$/;

    expect(params.codeVerifier).toMatch(base64url);
    expect(params.codeChallenge).toMatch(base64url);
    expect(params.state).toMatch(base64url);
    expect(params.codeVerifier.length).toBeGreaterThan(20);
  });

  it("generates unique state values", async () => {
    const a = await generatePKCEParams();
    const b = await generatePKCEParams();
    expect(a.state).not.toBe(b.state);
    expect(a.codeVerifier).not.toBe(b.codeVerifier);
  });
});

describe("shopifyOAuth storage", () => {
  const samplePKCE: PKCEParams = {
    codeVerifier: "verifier-abc",
    codeChallenge: "challenge-xyz",
    state: "state-123",
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("stores and retrieves PKCE params once", () => {
    storePKCEParams(samplePKCE);
    const retrieved = retrievePKCEParams();
    expect(retrieved).toEqual(samplePKCE);
    expect(retrievePKCEParams()).toBeNull();
  });

  it("stores and clears tokens", () => {
    storeTokens({
      access_token: "access-123",
      refresh_token: "refresh-456",
      expires_in: 3600,
      token_type: "Bearer",
    });

    expect(getStoredToken()).toBe("access-123");
    expect(getStoredRefreshToken()).toBe("refresh-456");
    expect(isTokenExpiringSoon(120_000)).toBe(false);

    clearTokens();
    expect(getStoredToken()).toBeNull();
    expect(getStoredRefreshToken()).toBeNull();
    expect(isTokenExpiringSoon()).toBe(true);
  });

  it("detects expiring tokens within buffer", () => {
    const expiresInMs = 30_000;
    storeTokens({
      access_token: "access",
      expires_in: expiresInMs / 1000,
      token_type: "Bearer",
    });
    expect(isTokenExpiringSoon(60_000)).toBe(true);
  });
});

describe("shopifyOAuth redirect URI", () => {
  it("returns origin-based callback path", () => {
    vi.stubGlobal("location", { origin: "https://www.sogenenergy.co.nz" });
    expect(getRedirectUri()).toBe("https://www.sogenenergy.co.nz/auth/callback");
    vi.unstubAllGlobals();
  });
});
