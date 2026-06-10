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
import { useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <ShopifyCustomerProvider>
            <ErrorBoundary>
              <WelcomeDialog />
              {children}
            </ErrorBoundary>
          </ShopifyCustomerProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
