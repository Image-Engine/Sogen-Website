function readEnv(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env[name]) {
    return process.env[name];
  }
  return undefined;
}

export const BLOG_HOST_DEV =
  readEnv("NEXT_PUBLIC_BLOG_HOST_DEV") ?? readEnv("VITE_BLOG_HOST_DEV");
