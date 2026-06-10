import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "@/lib/router";
import { 
  Zap, Shield, Battery, Factory, Wifi, CheckCircle2, ArrowRight, Package, 
  Server, Gauge, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollectionsSidebar } from "@/components/products/CollectionsSidebar";

const features = [
  {
    icon: Zap,
    title: "High Power Output",
    description: "Continuous high discharge rates designed for demanding commercial and industrial loads.",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Server,
    title: "Server Rack Compatible",
    description: "Standard 19-inch rack-mountable designs for seamless integration into existing infrastructure.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Wifi,
    title: "Remote Monitoring",
    description: "Bluetooth and CAN bus communication for centralized fleet monitoring and management.",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    icon: Shield,
    title: "Industrial Grade BMS",
    description: "Military-grade Battery Management System with redundant safety protections for mission-critical applications.",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  {
    icon: Battery,
    title: "Massive Scalability",
    description: "Connect up to 16 batteries in parallel for industrial-scale energy storage solutions.",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Gauge,
    title: "Consistent Performance",
    description: "Flat discharge curve delivers stable voltage throughout the entire cycle for sensitive equipment.",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];

const voltageOptions = [
  { voltage: "12V", handle: "12v-lithium-batteries", description: "Compact power modules for distributed industrial systems" },
  { voltage: "24V", handle: "24v-lithium-batteries", description: "Efficient mid-range solutions for commercial equipment" },
  { voltage: "48V", handle: "48v-lithium-batteries", description: "High-voltage systems for heavy-duty industrial applications" }
];

interface CollectionProducts { [key: string]: ShopifyProduct[] }

const Industrial = () => {
  const [collectionProducts, setCollectionProducts] = useState<CollectionProducts>({});
  const [loading, setLoading] = useState(true);
  const [activeVoltage, setActiveVoltage] = useState<string>("all");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    async function loadAllCollections() {
      setLoading(true);
      const results: CollectionProducts = {};
      for (const option of voltageOptions) {
        const collection = await fetchCollectionByHandle(option.handle, 250);
        results[option.voltage] = collection?.products || [];
      }
      setCollectionProducts(results);
      setLoading(false);
    }
    loadAllCollections();

    const interval = setInterval(async () => {
      const results: CollectionProducts = {};
      for (const option of voltageOptions) {
        const collection = await fetchCollectionByHandle(option.handle, 250);
        results[option.voltage] = collection?.products || [];
      }
      setCollectionProducts(results);
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (voltage: string) => {
    setActiveVoltage(voltage);
    if (voltage === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = sectionRefs.current[voltage];
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      }
    }
  };

  const getAllProducts = () => {
    return voltageOptions.flatMap(opt => collectionProducts[opt.voltage] || []);
  };

  const getProductsToShow = () => {
    if (activeVoltage === "all") return getAllProducts();
    return collectionProducts[activeVoltage] || [];
  };

  const productsToShow = getProductsToShow();

  const sidebarContent = (
    <div>
      <nav className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Battery Voltage
        </h3>
        <button
          onClick={() => handleCategoryClick("all")}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeVoltage === "all"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          All Batteries
          <span className="ml-auto float-right text-xs opacity-70">
            {loading ? "—" : getAllProducts().length}
          </span>
        </button>
        {voltageOptions.map((option) => {
          const count = (collectionProducts[option.voltage] || []).length;
          return (
            <button
              key={option.voltage}
              onClick={() => handleCategoryClick(option.voltage)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeVoltage === option.voltage
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {option.voltage} Batteries
              <span className="ml-auto float-right text-xs opacity-70">
                {loading ? "—" : count}
              </span>
            </button>
          );
        })}
      </nav>
      <CollectionsSidebar />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Industrial & Commercial" description="Industrial-grade LiFePO4 batteries for commercial and industrial applications. High-capacity energy storage from SOK Battery NZ." />
      <Header />
      <PageBreadcrumb />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80)` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Factory className="h-4 w-4" />
                Industrial Power Solutions
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">Industrial & Commercial</h1>
              <p className="text-lg lg:text-xl text-white/90 font-light">Heavy-Duty Power You Can Rely On</p>
              <p className="text-sm text-white/70 max-w-lg">Enterprise-grade LiFePO₄ battery systems built for demanding industrial, commercial, and telecommunications applications. Rack-mountable, scalable, and built to last.</p>
            </div>
          </div>
        </section>

        {/* Main Content: Sidebar + Products */}
        <section className="py-10 lg:py-16">
          <div className="container">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    Filter by Voltage
                    {activeVoltage !== "all" && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                        {activeVoltage}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 pt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Filter Products</h2>
                  </div>
                  {sidebarContent}
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-[240px] shrink-0">
                <div className="sticky top-24 space-y-2">
                  <h2 className="text-lg font-semibold mb-4">Shop by Voltage</h2>
                  {sidebarContent}
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {activeVoltage === "all" ? "All Industrial Batteries" : `${activeVoltage} Lithium Batteries`}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {activeVoltage === "all" 
                      ? `Showing all ${productsToShow.length} products`
                      : voltageOptions.find(o => o.voltage === activeVoltage)?.description
                    }
                  </p>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <ProductGridSkeleton count={8} />
                  </div>
                ) : productsToShow.length === 0 ? (
                  <div className="py-16 text-center">
                    <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products yet</h3>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                      Check back soon for our {activeVoltage === "all" ? "" : `${activeVoltage} `}battery selection.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {productsToShow.map((product) => (
                      <ProductCard key={product.node.id} product={product} />
                    ))}
                  </div>
                )}

                {activeVoltage !== "all" && productsToShow.length > 0 && (
                  <div className="text-center mt-8">
                    <Link to={`/collections/${voltageOptions.find(o => o.voltage === activeVoltage)?.handle}`}>
                      <Button variant="outline" size="lg" className="gap-2">
                        View Full {activeVoltage} Collection
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Industrial Demands</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our LiFePO₄ batteries deliver enterprise-grade reliability for the most demanding applications</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5`}><feature.icon className={`h-6 w-6 ${feature.iconColor}`} /></div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">Need a Custom Industrial Solution?</h2>
              <p className="text-lg text-background/70 mb-8">Our engineering team specializes in custom battery configurations for industrial and commercial projects. Contact us for bulk pricing and tailored solutions.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact"><Button size="lg" variant="secondary" className="gap-2">Contact Our Experts<ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/products"><Button size="lg" variant="outline" className="bg-transparent text-background border-background/30 hover:bg-background/10">Browse All Products</Button></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Industrial;
