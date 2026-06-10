import { Navigate } from "@/lib/router";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useShopifyCustomer();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/account/login" replace />;

  return <>{children}</>;
}
