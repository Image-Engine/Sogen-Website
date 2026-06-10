import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "@/lib/router";
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

const rackBatterySpecs = [
  "Compact 3U Size — The smallest 3U server rack mounted battery on the market.",
  "Bluetooth OTA Upgrade — Supports over-the-air firmware updates via Bluetooth.",
  "Bluetooth Inverter Protocol Selection — Switch inverter protocols via Bluetooth on the phone.",
  "Custom Terminals, M8 size — Proprietary self-designed terminals enable flexible wiring in multiple directions.",
  "Self-Heater Pad Built-in for working in cold locations.",
  "Battery to Battery Communication Cable included.",
  "Pre-Charge Circuit to Prevent BMS Damage: 100000μF.",
];

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
      <SEOHead title="Home Backup" description="Home backup battery systems from SOK Battery NZ. Reliable LiFePO4 energy storage for power outages and off-grid homes." />
      <Header />
      <PageBreadcrumb />
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
          <div className="container relative z-10 py-20 lg:py-28">
            <div className="max-w-2xl space-y-5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Home Backup
              </h1>
              <p className="text-lg lg:text-xl text-white/90 font-light tracking-wide leading-relaxed">
                Harness the Power of the Sun
              </p>
              <p className="text-[15px] text-white/65 max-w-lg leading-[1.8]">
                Store every watt your solar panels produce with reliable LiFePO₄ battery systems. From grid-tied backup to fully off-grid living, our batteries maximize your solar investment.
              </p>
            </div>
          </div>
        </section>

        {/* SOK 48V Rack Batteries — Info + Product Card */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              {/* Left: Description */}
              <div className="flex flex-col justify-between space-y-0">
                <div>
                  <div className="space-y-3 mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2]">
                      SOK Rack Batteries
                    </h2>
                    <p className="text-[15px] text-muted-foreground leading-[1.7]">
                      High-performance LiFePO₄ storage for home, solar, and off-grid systems
                    </p>
                  </div>

                  <div className="space-y-4 text-[15px] text-foreground/75 leading-[1.85] mb-10">
                    <p>
                      SOK rack batteries are one of New Zealand's most trusted lithium energy storage options, combining premium LiFePO₄ technology with a durable, fully serviceable design. Engineered for both off-grid and on-grid applications, these modular rack batteries deliver reliable power, high usable capacity, and excellent long-term value.
                    </p>
                    <p>
                      Paired with Solagen's Energy Hub cabinet, SOK batteries create a complete, scalable energy system built for homes, tiny houses, workshops, remote sites, and commercial installations.
                    </p>
                  </div>
                </div>

                {/* Spec Card */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground tracking-wide">
                    SOK 48V100Ah Server Rack Battery
                  </h3>
                  <ul className="space-y-2.5">
                    {rackBatterySpecs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-[1.7]">
                        <span className="mt-2 h-1 w-1 rounded-full bg-foreground/30 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Product Card */}
              <div className="flex flex-col">
                <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col h-full">
                  <div className="flex-1 bg-secondary/10 flex items-center justify-center p-10">
                    {rackProducts[0]?.node.images.edges[0]?.node.url ? (
                      <img
                        src={rackProducts[0].node.images.edges[0].node.url}
                        alt="SOK 48V Rack Battery"
                        className="w-full h-full object-contain max-h-[400px]"
                      />
                    ) : (
                      <Battery className="w-16 h-16 text-muted-foreground/20" />
                    )}
                  </div>
                  <div className="p-7 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground leading-snug">
                      48V Rack Batteries
                    </h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.75]">
                      Secure your energy needs with the SOK 48v 5kWh Lithium Server Rack Battery. Scalable | Reliable & Safe LiFePO4 Technology | Ideal for Off-Grid, Emergency & Back Up Power Systems.
                    </p>
                    <Link to="/collection/48v-lithium-batteries">
                      <Button className="w-full gap-2 mt-1">
                        Shop Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Off-Grid Context Section */}
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80"
                  alt="Off-grid cabin powered by solar and battery storage"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2]">
                    Designed for Off-Grid Living
                  </h3>
                  <p className="text-[15px] text-foreground/70 leading-[1.85]">
                    SOK rack batteries handle deep daily cycling, winter load spikes, and seasonal temperature variations common in New Zealand installations. The lithium battery management system ensures clean, stable power delivery, while the serviceable aluminium casing provides added durability for long-term off-grid use.
                  </p>
                  <p className="text-[15px] text-foreground/70 leading-[1.85]">
                    When combined with Solagen's Energy Hub cabinet, you gain an integrated power solution with neat cable management, AC/DC protection, and intelligent battery-to-inverter communications for precise voltage control.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2]">
                    Modular 5 kWh Storage You Can Grow Over Time
                  </h3>
                  <p className="text-[15px] text-foreground/70 leading-[1.85]">
                    Start with a single 5 kWh SOK battery or build a larger rack system exceeding 30 kWh. Expansion is simple — just add additional modules as your home, workshop, or off-grid setup grows. This makes SOK batteries ideal for solar upgrades, EV charging, and long-term energy independence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 48V Battery Bundles */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2]">
                  SOK 48V Battery Bundles
                </h2>
                <p className="text-[15px] text-muted-foreground max-w-xl leading-[1.75]">
                  Complete kits with heavy duty rack, battery link cables, and communication cables — everything you need for a full energy storage system.
                </p>
              </div>
              <Link to="/collection/48v-bundles" className="shrink-0">
                <Button className="gap-2">
                  Shop 48V Bundles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {bundleLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProductGridSkeleton count={4} />
              </div>
            ) : bundleProducts.length > 0 ? (
              <Carousel opts={{ align: "start", loop: bundleProducts.length > 4 }} className="w-full">
                <CarouselContent className="-ml-6">
                  {bundleProducts.map((product) => (
                    <CarouselItem key={product.node.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4">
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
              <p className="text-muted-foreground text-[15px] py-8 text-center">No bundle products available.</p>
            )}

            <div className="mt-8 flex justify-end">
              <Link to="/collection/48v-bundles">
                <Button variant="outline" size="sm" className="gap-2">
                  View 48V Bundles
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Energy Hub */}
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-start">
              <div className="space-y-10 lg:pr-4">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2]">
                    The Perfect Match: Solagen Energy Hub
                  </h2>
                  <p className="text-[15px] text-foreground/70 leading-[1.85] max-w-xl">
                    Our Energy Hub cabinet is designed specifically to pair with SOK rack batteries.
                    It arrives pre-wired, pre-tested, and ready to install, with generator input options,
                    Victron monitoring, and weather-resistant construction.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {energyHubFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/60 px-4 py-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-[14px] text-foreground/75">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link to="/energy-hub-2" className="inline-flex w-full sm:w-auto">
                    <Button className="gap-2 w-full sm:w-auto" size="lg">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center p-6">
                  <img
                    src="https://solagen.co.nz/wp-content/uploads/SGEH-cabinet-display800x800.jpg"
                    alt="Solagen Energy Hub Cabinet"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="p-7 space-y-2.5">
                  <h3 className="text-lg font-semibold text-foreground leading-snug">
                    Solagen Energy Hub
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.75]">
                    A powerful and expandable outdoor cabinet for urban, rural, and commercial situations — on-grid or off-grid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2] mb-4">
                Reliable Home Energy Storage
              </h2>
              <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto leading-[1.75]">
                Our LiFePO₄ batteries provide safe, silent, and long-lasting backup power for your home
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-7 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-300"
                >
                  <feature.icon className="h-5 w-5 text-primary mb-5" />
                  <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.75]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container max-w-3xl text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground tracking-tight leading-[1.2]">
              Need Help Setting Up Home Backup?
            </h2>
            <p className="text-[15px] text-primary-foreground/65 max-w-xl mx-auto leading-[1.8]">
              Our experts can help you design the perfect home backup system. Get personalized
              recommendations based on your home's energy needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  Contact Our Experts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent text-primary-foreground border-primary-foreground/25 hover:bg-primary-foreground/10"
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
