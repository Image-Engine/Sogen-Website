import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      {
        protocol: "https",
        hostname: "sokbattery-frontline-shine-zq4jf.myshopify.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "https://blog.sogenenergy.co.nz/",
        permanent: true,
      },
      {
        source: "/blog/:blogHandle/:articleHandle",
        destination:
          "https://blog.sogenenergy.co.nz/:blogHandle/:articleHandle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
