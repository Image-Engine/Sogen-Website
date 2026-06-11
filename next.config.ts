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
