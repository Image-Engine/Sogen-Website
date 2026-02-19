import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { exchangeCodeForToken, fetchCustomer } = useShopifyCustomer();
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("[Callback] code present:", !!code, "state present:", !!state);

    if (!code || !state) {
      setError("Missing authorization code or state.");
      return;
    }

    (async () => {
      try {
        console.log("[Callback] Exchanging code for token...");
        const ok = await exchangeCodeForToken(code, state);
        console.log("[Callback] Token exchange result:", ok);

        if (!ok) {
          setError("Failed to exchange authorization code. Please try signing in again.");
          return;
        }

        console.log("[Callback] Fetching customer...");
        const customer = await fetchCustomer();
        console.log("[Callback] Customer result:", customer ? "success" : "failed");

        if (!customer) {
          // Token exchange succeeded but customer fetch failed
          // Still navigate to account - the provider will retry on mount
          console.warn("[Callback] Customer fetch failed, navigating anyway");
        }

        navigate("/account", { replace: true });
      } catch (err) {
        console.error("[Callback] Error during auth flow:", err);
        setError("An error occurred during sign in. Please try again.");
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <p className="text-destructive font-medium">{error}</p>
          <div className="flex gap-3 justify-center">
            <a href="/account/login" className="text-primary underline">
              Try again
            </a>
            <a href="/" className="text-muted-foreground underline">
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}
