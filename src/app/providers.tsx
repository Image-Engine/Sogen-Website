"use client";

import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ShopifyCustomerProvider } from "@/contexts/ShopifyCustomerContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { WelcomeDialog } from "@/components/WelcomeDialog";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <ShopifyCustomerProvider>
            <SiteChrome>
              <ErrorBoundary>
                <WelcomeDialog />
                {children}
              </ErrorBoundary>
            </SiteChrome>
          </ShopifyCustomerProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
