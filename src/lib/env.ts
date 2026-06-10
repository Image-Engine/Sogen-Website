function readEnv(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env[name]) {
    return process.env[name];
  }
  try {
    const viteEnv = (import.meta as { env?: Record<string, string> }).env;
    if (viteEnv?.[name]) return viteEnv[name];
  } catch {
    // import.meta unavailable outside Vite
  }
  return undefined;
}

export const SUPABASE_URL =
  readEnv("NEXT_PUBLIC_SUPABASE_URL") ?? readEnv("VITE_SUPABASE_URL");

export const SUPABASE_PUBLISHABLE_KEY =
  readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
  readEnv("VITE_SUPABASE_PUBLISHABLE_KEY");

export const BLOG_HOST_DEV =
  readEnv("NEXT_PUBLIC_BLOG_HOST_DEV") ?? readEnv("VITE_BLOG_HOST_DEV");
