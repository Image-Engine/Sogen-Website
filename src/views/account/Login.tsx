import { useState } from "react";
import { Navigate } from "@/lib/router";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Login() {
  const { initiateLogin, isAuthenticated, isLoading } = useShopifyCustomer();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // If already authenticated, go to account dashboard
  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  const handleLogin = async () => {
    setIsRedirecting(true);
    try {
      await initiateLogin();
    } catch (err) {
      console.error("[Login] Failed to initiate login:", err);
      setIsRedirecting(false);
    }
  };

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-20 max-w-md text-center">
        <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
        <p className="text-muted-foreground mb-8">
          Access your orders, addresses, and account settings.
        </p>
        <Button onClick={handleLogin} size="lg" className="w-full">
          Sign In
        </Button>
      </main>
      <Footer />
    </div>
  );
}
