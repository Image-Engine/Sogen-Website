import { useEffect, useState } from "react";
import { useParams, Link } from "@/lib/router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ShopifyOrder } from "@/types/shopifyCustomer";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { fetchOrder } = useShopifyCustomer();
  const [order, setOrder] = useState<ShopifyOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchOrder(decodeURIComponent(id)).then((o) => { setOrder(o); setLoading(false); });
  }, [id, fetchOrder]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12 text-center">
          <p className="text-muted-foreground">Order not found.</p>
          <Link to="/account/orders"><Button variant="link">Back to orders</Button></Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb items={[
        { label: "My Account", href: "/account" },
        { label: "Orders", href: "/account/orders" },
        { label: order.name }
      ]} />
      <main className="container py-12 max-w-4xl">
        <Link to="/account/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to orders
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{order.name}</h1>
          <Badge variant="secondary">{order.fulfillmentStatus || "Unfulfilled"}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="text-lg">Order Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{new Date(order.processedAt).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="capitalize">{order.financialStatus}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-semibold">${parseFloat(order.totalPrice.amount).toFixed(2)} {order.totalPrice.currencyCode}</span></div>
            </CardContent>
          </Card>

          {order.shippingAddress && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Shipping Address</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address1}</p>
                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">Items</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.lineItems.edges.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                  {item.node.variant?.image?.url && (
                    <img src={item.node.variant.image.url} alt={item.node.title} className="w-16 h-16 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.node.title}</p>
                    {item.node.variant?.title && item.node.variant.title !== "Default Title" && (
                      <p className="text-sm text-muted-foreground">{item.node.variant.title}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Qty: {item.node.quantity}</p>
                  </div>
                  <p className="font-medium">${parseFloat(item.node.originalTotalPrice.amount).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {order.statusPageUrl && (
          <div className="mt-6">
            <a href={order.statusPageUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">View Order Status Page</Button>
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
