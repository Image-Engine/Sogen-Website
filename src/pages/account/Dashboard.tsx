import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, MapPin, UserCircle } from "lucide-react";
import type { ShopifyOrder } from "@/types/shopifyCustomer";

export default function Dashboard() {
  const { customer, fetchOrders } = useShopifyCustomer();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().then((o) => { setOrders(o.slice(0, 5)); setLoading(false); });
  }, [fetchOrders]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome{customer ? `, ${customer.firstName}` : ""}
        </h1>
        <p className="text-muted-foreground mb-8">Manage your account, orders, and addresses.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <Link to="/account/orders">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex items-center gap-3 pt-6">
                <Package className="h-8 w-8 text-primary" />
                <div><p className="font-semibold">Orders</p><p className="text-sm text-muted-foreground">View order history</p></div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/account/addresses">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex items-center gap-3 pt-6">
                <MapPin className="h-8 w-8 text-primary" />
                <div><p className="font-semibold">Addresses</p><p className="text-sm text-muted-foreground">Manage addresses</p></div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/account/profile">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex items-center gap-3 pt-6">
                <UserCircle className="h-8 w-8 text-primary" />
                <div><p className="font-semibold">Profile</p><p className="text-sm text-muted-foreground">Edit your details</p></div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card>
          <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
            ) : orders.length === 0 ? (
              <p className="text-muted-foreground py-4">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <Link key={o.id} to={`/account/orders/${encodeURIComponent(o.id)}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                    <div>
                      <p className="font-medium">{o.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(o.processedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{o.fulfillmentStatus || "Unfulfilled"}</Badge>
                      <span className="font-medium">${parseFloat(o.totalPrice.amount).toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {orders.length > 0 && (
              <div className="mt-4">
                <Link to="/account/orders"><Button variant="outline" size="sm">View All Orders</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
