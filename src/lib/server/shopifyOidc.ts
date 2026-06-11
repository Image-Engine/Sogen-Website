const DEFAULT_STORE_DOMAIN = "sokbattery-frontline-shine-zq4jf.myshopify.com";

let oidcConfigCache: Record<string, string> | null = null;

export function getStoreDomain(): string {
  return process.env.SHOPIFY_STORE_DOMAIN ?? DEFAULT_STORE_DOMAIN;
}

export async function getOidcConfig(
  storeDomain = getStoreDomain(),
): Promise<Record<string, string>> {
  if (oidcConfigCache) return oidcConfigCache;
  const res = await fetch(
    `https://${storeDomain}/.well-known/openid-configuration`,
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch OpenID configuration from ${storeDomain}`,
    );
  }
  oidcConfigCache = await res.json();
  return oidcConfigCache!;
}

export function extractStoreId(issuer: string): string {
  const match = issuer.match(/\/(\d+)$/);
  if (!match) {
    throw new Error(
      `Could not extract numeric store ID from issuer: ${issuer}`,
    );
  }
  return match[1];
}
