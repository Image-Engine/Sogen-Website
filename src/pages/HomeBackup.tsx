import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  Zap, Shield, Battery, Wifi, CheckCircle2, ArrowRight, 
  Volume2, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const energyHubFeatures = [
  "Pre-Wired & Certified",
  "Victron Power Electronics",
  "Scalable Storage",
  "Built for NZ Conditions",
  "Generator Ready",
  "Smart Monitoring",
];

const whyChooseFeatures = [
  {
    icon: Zap,
    title: "Seamless Switchover",
    description: "Automatic transfer switch compatibility ensures uninterrupted power when the grid goes down.",
  },
  {
    icon: Volume2,
    title: "Silent Operation",
    description: "Zero noise, zero fumes — unlike generators, LiFePO₄ batteries operate in complete silence.",
  },
  {
    icon: Layers,
    title: "Scalable Storage",
    description: "Start with one battery and expand your system as needed. Easily connect batteries in parallel.",
  },
  {
    icon: Shield,
    title: "Grid Independence",
    description: "Reduce reliance on the grid with stored solar energy, cutting electricity bills and carbon footprint.",
  },
  {
    icon: Wifi,
    title: "Smart Monitoring",
    description: "Monitor battery health, charge cycles, and energy usage in real-time via Bluetooth.",
  },
  {
    icon: Battery,
    title: "20-Year Lifespan",
    description: "With 4,000–8,000 cycles, our batteries provide decades of reliable home backup power.",
  },
];

const HomeBackup = () => {
  const [rackProducts, setRackProducts] = useState<ShopifyProduct[]>([]);
  const [rackLoading, setRackLoading] = useState(true);
  const [bundleProducts, setBundleProducts] = useState<ShopifyProduct[]>([]);
  const [bundleLoading, setBundleLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setRackLoading(true);
      setBundleLoading(true);
      const [rackCollection, bundleCollection] = await Promise.all([
        fetchCollectionByHandle("48v-lithium-batteries", 20),
        fetchCollectionByHandle("48v-bundles", 20),
      ]);
      setRackProducts(rackCollection?.products || []);
      setRackLoading(false);
      setBundleProducts(bundleCollection?.products || []);
      setBundleLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-2xl space-y-5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Home Backup
              </h1>
              <p className="text-lg lg:text-xl text-white/90 font-light">
                Harness the Power of the Sun
              </p>
              <p className="text-sm text-white/70 max-w-lg">
                Store every watt your solar panels produce with reliable LiFePO₄ battery systems. From grid-tied backup to fully off-grid living, our batteries maximize your solar investment.
              </p>
            </div>
          </div>
        </section>

        {/* SOK 48V Rack Batteries */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
                SOK 48V Rack Batteries
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                High-performance LiFePO₄ storage for home, solar, and off-grid systems. Modular, serviceable, and built to last.
              </p>
            </div>

            {rackLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ProductGridSkeleton count={4} />
              </div>
            ) : rackProducts.length > 0 ? (
              <Carousel opts={{ align: "start", loop: rackProducts.length > 4 }} className="w-full">
                <CarouselContent className="-ml-4">
                  {rackProducts.map((product) => (
                    <CarouselItem key={product.node.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {rackProducts.length > 4 && (
                  <>
                    <CarouselPrevious className="-left-4 hidden md:flex" />
                    <CarouselNext className="-right-4 hidden md:flex" />
                  </>
                )}
              </Carousel>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">No products available.</p>
            )}

            <div className="mt-6 flex justify-end">
              <Link to="/collection/48v-lithium-batteries">
                <Button variant="outline" size="sm" className="gap-2">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 48V Battery Bundles */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
                48V Battery Bundles
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete kits with rack, cables, and communication included — everything you need to get started.
              </p>
            </div>

            {bundleLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ProductGridSkeleton count={4} />
              </div>
            ) : bundleProducts.length > 0 ? (
              <Carousel opts={{ align: "start", loop: bundleProducts.length > 4 }} className="w-full">
                <CarouselContent className="-ml-4">
                  {bundleProducts.map((product) => (
                    <CarouselItem key={product.node.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {bundleProducts.length > 4 && (
                  <>
                    <CarouselPrevious className="-left-4 hidden md:flex" />
                    <CarouselNext className="-right-4 hidden md:flex" />
                  </>
                )}
              </Carousel>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">No bundle products available.</p>
            )}

            <div className="mt-6 flex justify-end">
              <Link to="/collection/48v-bundles">
                <Button variant="outline" size="sm" className="gap-2">
                  View 48V Bundles
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Energy Hub 2 */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                    Solagen Energy Hub 2
                  </h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Our Energy Hub 2 cabinet is designed specifically to pair with SOK rack batteries.
                    Pre-wired, pre-tested, and ready to install with generator input options,
                    Victron monitoring, and weather-resistant construction.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {energyHubFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/energy-hub-2">
                  <Button className="gap-2" size="lg">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-3xl border border-border bg-card overflow-hidden">
                <div className="aspect-[4/3] bg-secondary/30 flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&q=80"
                    alt="Solagen Energy Hub 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Solagen Energy Hub
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A powerful and expandable outdoor cabinet for urban, rural, and commercial situations — on-grid or off-grid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                Reliable Home Energy Storage
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our LiFePO₄ batteries provide safe, silent, and long-lasting backup power for your home
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyChooseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
                >
                  <feature.icon className="h-6 w-6 text-primary mb-5" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-foreground">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-background mb-4">
              Need Help Setting Up Home Backup?
            </h2>
            <p className="text-lg text-background/60 mb-8 leading-relaxed">
              Our experts can help you design the perfect home backup system. Get personalized
              recommendations based on your home's energy needs and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="gap-2">
                  Contact Our Experts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-background border-background/30 hover:bg-background/10"
                >
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeBackup;
