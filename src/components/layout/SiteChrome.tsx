"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Routes that render without the shared site chrome (header/footer). */
const CHROMELESS_PREFIXES = ["/auth/callback"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const chromeless = CHROMELESS_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (chromeless) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
