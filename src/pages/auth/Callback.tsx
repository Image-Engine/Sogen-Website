import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { exchangeCodeForToken, fetchCustomer } = useShopifyCustomer();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (!code || !state) {
      setError("Missing authorization code or state.");
      return;
    }
    (async () => {
      const ok = await exchangeCodeForToken(code, state);
      if (!ok) {
        setError("Failed to exchange authorization code.");
        return;
      }
      await fetchCustomer();
      navigate("/account", { replace: true });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">{error}</p>
          <a href="/" className="text-primary underline">Go home</a>
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
