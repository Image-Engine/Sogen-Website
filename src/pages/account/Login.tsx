import { useEffect } from "react";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";

export default function Login() {
  const { initiateLogin, isAuthenticated } = useShopifyCustomer();

  useEffect(() => {
    if (!isAuthenticated) {
      initiateLogin();
    }
  }, [isAuthenticated, initiateLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
}
