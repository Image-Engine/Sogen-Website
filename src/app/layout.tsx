import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Script from "next/script";
import { Providers } from "./providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "SOK Battery NZ | LiFePO4 Lithium Batteries & Solar Solutions",
  description:
    "Shop SOK Battery LiFePO4 lithium batteries, solar panels, and energy storage solutions in New Zealand. High-performance batteries for RV, marine, off-grid, and industrial use.",
  authors: [{ name: "Sogen Energy" }],
  verification: { google: "fTXwZsHloq2A9lSKq1pY2fo2BRct7v3Da19le9IWAws" },
  openGraph: { type: "website" },
  twitter: { card: "summary_large_image", site: "@SogenEnergy" },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="" />
        <link
          rel="preconnect"
          href="https://sokbattery-frontline-shine-zq4jf.myshopify.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9JV3MBV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M9JV3MBV');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D550KYJ1GW"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D550KYJ1GW');`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
