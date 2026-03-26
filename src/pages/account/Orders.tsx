import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ShopifyOrder } from "@/types/shopifyCustomer";

export default function Orders() {
  const { fetchOrders } = useShopifyCustomer();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().then((o) => { setOrders(o); setLoading(false); });
  }, [fetchOrders]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
            ) : orders.length === 0 ? (
              <p className="text-muted-foreground py-4">No orders found.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <Link key={o.id} to={`/account/orders/${encodeURIComponent(o.id)}`} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                    <div>
                      <p className="font-semibold">{o.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(o.processedAt).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">{o.lineItems.edges.length} item(s)</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold">${parseFloat(o.totalPrice.amount).toFixed(2)} {o.totalPrice.currencyCode}</p>
                      <Badge variant="secondary">{o.fulfillmentStatus || "Unfulfilled"}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
