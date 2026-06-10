import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Package, Truck, MapPin, RotateCcw, AlertCircle, CreditCard, Clock } from "lucide-react";

export default function ShippingReturns() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Shipping & Returns" description="Shipping rates, delivery times, and return policy for SOK Battery NZ. Free shipping on select orders across New Zealand." />
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shipping & Returns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our shipping options, pickup locations, and return policies.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 md:py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Place Your Order</h3>
                <p className="text-sm text-muted-foreground">Order online through our secure checkout</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Choose Shipping or Collect</h3>
                <p className="text-sm text-muted-foreground">Select delivery or pickup option</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Pickup in Nelson</h3>
                <p className="text-sm text-muted-foreground">Collect from our Nelson warehouse</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              
              {/* Shipping */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Shipping</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Unfortunately due to the ever increasing cost of shipping dangerous goods through couriers and bulk freight, we are no longer able to offer free shipping.
                  </p>
                  <p>
                    <strong className="text-foreground">Rural Deliveries:</strong> New Zealand Post is no longer accepting LiFePO4 batteries for rural deliveries. If you live rurally, please provide an alternative town/city address for delivery. If a rural address is supplied we will ship the battery to the nearest Main Freight or Post Haste depot.
                  </p>
                  <p>Other items will be shipped to rural addresses as normal.</p>
                  <p>
                    <strong className="text-foreground">Island Deliveries:</strong> We do not ship to Stewart Island and Great Barrier Island, but we can deliver to the nearest Post Haste, Mainfreight or Sealink depot.
                  </p>
                  <p>
                    <strong className="text-foreground">Pacific Islands:</strong> For shipping to the Pacific Islands we are happy to deliver items to any Freight Forwarder of your choice. We do not deliver to the Chathams or Stewart Islands.
                  </p>
                </div>
              </div>

              {/* Pick Up */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Pick Up</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Pickup is available from our Nelson warehouse by appointment. Please contact us for details.
                </p>
              </div>

              {/* Returns */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Returns</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <p className="text-foreground">
                      <strong>Restocking Fee:</strong> A restocking fee of 20% applies to orders that were made in error or due to a change of heart. If an item is returned so it can be replaced with an alternative product the 20% does not apply.
                    </p>
                  </div>
                  <p>If you should need to return a product please do so within 14 days of receiving your order.</p>
                  <p>
                    To be eligible for a return, your item must be in the same condition that you received it, unused, unopened, and in its original packaging. Shipping charges, credit card fees and fees from buy now pay later services like Afterpay and Laybuy are not included in the credit and it is your responsibility to pay for all shipping costs back to us. You'll also need the receipt or proof of purchase.
                  </p>
                  <p>
                    To start a return, you can contact us at{" "}
                    <a href="mailto:info@sogenenergy.co.nz" className="text-primary hover:underline">info@sogenenergy.co.nz</a>. 
                    If your return is accepted, you will need to send it back to us at your own expense. You will receive instructions on how and where to send it once your claim is accepted. Items sent back to us without first requesting a return will not be accepted.
                  </p>
                </div>
              </div>

              {/* Damages and Issues */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Damages and Issues</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item so that we can evaluate the issue and make it right.
                  </p>
                  <p>
                    If outside of the DOA (Defective on Arrival) period of 14 days from receipt of the item, it will be repaired under warranty. The warranty period can be found on each item's product page.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium text-foreground mb-2">Exceptions / Non-returnable Items:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>We cannot accept returns on sale items</li>
                      <li>SOK Battery NZ does not provide refunds or returns if you change your mind</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Refund Policy</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.
                </p>
              </div>

              {/* Uncollected Items */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Uncollected Items</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Items purchased but not collected within 90 days of purchase will be considered forfeited by the customer, and no refunds will be issued unless otherwise agreed upon by Solagen NZ Ltd.
                </p>
              </div>

              {/* Warranty Returns */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Warranty Returns</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  It is at the buyer's expense the cost of returning any faulty goods to us. For goods sent overseas, the buyer is responsible for returning the faulty goods to us and covering the cost of freight for any items that we have to send overseas.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
