import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  Zap, Shield, Battery, Home, Wifi, CheckCircle2, ArrowRight, 
  Volume2, Layers, Sun
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

const rackBatteryFeatures = [
  "Compact 3U Size — The smallest 3U size server rack mounted battery on the market.",
  "Bluetooth OTA Upgrade — Supports over-the-air firmware updates via Bluetooth.",
  "Bluetooth Inverter Protocol Selection — Users can switch inverter protocols via Bluetooth.",
  "Custom Terminals, M8 size — Proprietary self-designed terminals enable flexible wiring.",
  "Self-Heater Pad Built-in for working in cold locations.",
  "Battery to Battery Communication Cable included.",
  "Pre-Charge Circuit to Prevent BMS Damage.",
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
  const [bundleProducts, setBundleProducts] = useState<ShopifyProduct[]>([]);
  const [bundleLoading, setBundleLoading] = useState(true);

  useEffect(() => {
    async function loadBundles() {
      setBundleLoading(true);
      const collection = await fetchCollectionByHandle("48v-bundles", 20);
      setBundleProducts(collection?.products || []);
      setBundleLoading(false);
    }
    loadBundles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Sun className="h-4 w-4" />
                Solar Power Solutions
              </div>
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

        {/* SOK Rack Batteries Section */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                    SOK Rack Batteries
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    High-performance LiFePO₄ storage for home, solar, and off-grid systems
                  </p>
                </div>

                <div className="text-foreground/80 space-y-4 leading-relaxed text-sm">
                  <p>
                    SOK rack batteries are one of New Zealand's most trusted lithium energy storage options, 
                    combining premium LiFePO₄ technology with a durable, fully serviceable design. Engineered 
                    for both off-grid and on-grid applications, these modular rack batteries deliver reliable 
                    power, high usable capacity, and excellent long-term value.
                  </p>
                  <p>
                    Paired with Solagen's Energy Hub 2 cabinet, SOK batteries create a complete, scalable 
                    energy system built for homes, tiny houses, workshops, remote sites, and commercial installations.
                  </p>
                </div>

                {/* Spec Card */}
                <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <h4 className="font-semibold text-foreground text-sm tracking-wide">
                    SOK 48V100Ah Server Rack Battery
                  </h4>
                  <ul className="space-y-2">
                    {rackBatteryFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  These features make SOK rack batteries one of the most cost-effective and dependable 
                  lithium storage options in the country.
                </p>
              </div>

              {/* Right Card — 48V Rack Batteries */}
              <div className="lg:sticky lg:top-28">
                <div className="rounded-3xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[4/3] bg-secondary/30 flex items-center justify-center p-8">
                    <img
                      src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80"
                      alt="SOK 48V Rack Battery"
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">
                      48V Rack Batteries
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Secure your energy needs with the SOK 48v 5kWh Lithium Server Rack Battery. 
                      Scalable, reliable &amp; safe LiFePO4 technology. Ideal for off-grid, emergency 
                      &amp; back up power systems. IEC 62619:2022 Certified.
                    </p>
                    <Link to="/collection/48v-lithium-batteries">
                      <Button className="w-full gap-2 mt-2" size="lg">
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

        {/* Off-Grid Living + 48V Bundles Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container max-w-6xl">
            {/* Text Content */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                  Designed for Off-Grid Living
                </h2>
                <div className="text-foreground/80 space-y-4 leading-relaxed text-sm">
                  <p>
                    SOK rack batteries handle deep daily cycling, winter load spikes, and seasonal 
                    temperature variations common in New Zealand installations. The lithium battery 
                    management system ensures clean, stable power delivery, while the serviceable 
                    aluminium casing provides added durability for long-term off-grid use.
                  </p>
                  <p>
                    When combined with Solagen's Energy Hub 2 cabinet, you gain an integrated power 
                    solution with neat cable management, AC/DC protection, and intelligent 
                    battery-to-inverter communications for precise voltage control.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Modular 5 kWh Storage You Can Grow Over Time
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Start with a single 5 kWh SOK battery or build a larger rack system exceeding 
                  30 kWh. Expansion is simple — just add additional modules as your home, workshop, 
                  or off-grid setup grows. This makes SOK batteries ideal for solar upgrades, EV 
                  charging, and long-term energy independence.
                </p>
              </div>
            </div>

            {/* Bundle Products Carousel */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    SOK 48V Battery Bundles
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose from our range of battery bundles — rack, cables, and communication included.
                  </p>
                </div>
                <Link to="/collection/48v-lithium-battery-bundles" className="hidden sm:flex">
                  <Button variant="outline" className="gap-2">
                    View 48V Bundles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {bundleLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ProductGridSkeleton count={4} />
                </div>
              ) : bundleProducts.length > 0 ? (
                <Carousel
                  opts={{ align: "start", loop: bundleProducts.length > 4 }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {bundleProducts.map((product) => (
                      <CarouselItem
                        key={product.node.id}
                        className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
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
                <p className="text-muted-foreground text-sm py-8 text-center">
                  No bundle products available at the moment.
                </p>
              )}

              <div className="sm:hidden mt-6 text-center">
                <Link to="/collection/48v-lithium-battery-bundles">
                  <Button variant="outline" className="gap-2 w-full">
                    View 48V Bundles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Perfect Match: Energy Hub 2 */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                    The Perfect Match: Solagen Energy Hub 2
                  </h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Our Energy Hub 2 cabinet is designed specifically to pair with SOK rack batteries. 
                    It arrives pre-wired, pre-tested, and ready to install, with generator input options, 
                    Victron monitoring, and weather-resistant construction. Together, they create a turnkey 
                    energy system that offers outstanding value and performance.
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
              </div>

              {/* Right Card — Energy Hub */}
              <div className="rounded-3xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] bg-secondary/30 flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&q=80"
                    alt="Solagen Energy Hub 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Solagen Energy Hub
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Discover Solagen's new generation Outdoor Cabinet. A powerful and expandable system 
                    designed to cater to urban, rural, and commercial situations — whether you are on-grid 
                    or off-grid.
                  </p>
                  <Link to="/energy-hub-2">
                    <Button className="w-full gap-2 mt-2" size="lg">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
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

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-foreground">
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
