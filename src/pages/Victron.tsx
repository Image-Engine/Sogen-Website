import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  Zap, Shield, Wifi, CheckCircle2, ArrowRight, Package, 
  Sun, Battery, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const features = [
  {
    icon: Zap,
    title: "Proven Reliability",
    description: "Victron Energy products are trusted by professionals worldwide for off-grid, marine, and industrial power systems.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Shield,
    title: "Advanced Protection",
    description: "Built-in safety features including overload protection, short circuit protection, and intelligent battery management.",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  },
  {
    icon: Wifi,
    title: "Smart Monitoring",
    description: "Remote monitoring and control via Victron's VRM portal and smartphone apps for complete system visibility.",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  },
  {
    icon: Sun,
    title: "Solar Integration",
    description: "MPPT solar charge controllers and EasySolar units for seamless solar power integration with SOK batteries.",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Battery,
    title: "SOK Compatible",
    description: "All Victron products are tested and configured for optimal performance with SOK LiFePO₄ batteries.",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Industry-leading warranty backed by Victron's global support network and local NZ expertise.",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10"
  }
];

const collectionOptions = [
  { label: "Inverters & Chargers", handle: "victron-inverters", description: "MultiPlus, EasySolar, and Phoenix inverter-chargers" },
  { label: "Solar Controllers", handle: "victron-solar", description: "MPPT and BlueSolar charge controllers" },
  { label: "Monitoring", handle: "victron-monitoring", description: "Cerbo GX, SmartShunt, and monitoring accessories" },
  { label: "Accessories", handle: "victron-accessories", description: "Cables, connectors, and system components" }
];

interface CollectionProducts { [key: string]: ShopifyProduct[] }

const Victron = () => {
  const [collectionProducts, setCollectionProducts] = useState<CollectionProducts>({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    async function loadAllCollections() {
      setLoading(true);
      const results: CollectionProducts = {};
      for (const option of collectionOptions) {
        const collection = await fetchCollectionByHandle(option.handle, 50);
        results[option.label] = collection?.products || [];
      }
      setCollectionProducts(results);
      setLoading(false);
    }
    loadAllCollections();
  }, []);

  const handleCategoryClick = (label: string) => {
    setActiveCategory(label);
    if (label === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = sectionRefs.current[label];
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      }
    }
  };

  const getAllProducts = () => {
    return collectionOptions.flatMap(opt => collectionProducts[opt.label] || []);
  };

  const getProductsToShow = () => {
    if (activeCategory === "all") return getAllProducts();
    return collectionProducts[activeCategory] || [];
  };

  const productsToShow = getProductsToShow();

  const sidebarContent = (
    <div>
      <nav className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Category
        </h3>
        <button
          onClick={() => handleCategoryClick("all")}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          All Victron
          <span className="ml-auto float-right text-xs opacity-70">
            {loading ? "—" : getAllProducts().length}
          </span>
        </button>
        {collectionOptions.map((option) => {
          const count = (collectionProducts[option.label] || []).length;
          return (
            <button
              key={option.label}
              onClick={() => handleCategoryClick(option.label)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === option.label
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {option.label}
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
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004b93] via-[#003570] to-[#001f42]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,120,215,0.3),transparent_70%)]" />
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Zap className="h-4 w-4" />
                Official Victron Energy Dealer
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">Victron Energy Products</h1>
              <p className="text-lg lg:text-xl text-white/90 font-light">Professional Power Electronics</p>
              <p className="text-sm text-white/70 max-w-lg">
                Inverters, solar charge controllers, battery monitors, and system accessories from the world's most trusted power electronics brand — perfectly paired with SOK LiFePO₄ batteries.
              </p>
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
                    Filter by Category
                    {activeCategory !== "all" && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                        {activeCategory}
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
                  <h2 className="text-lg font-semibold mb-4">Shop by Category</h2>
                  {sidebarContent}
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {activeCategory === "all" ? "All Victron Products" : activeCategory}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {activeCategory === "all" 
                      ? `Showing all ${productsToShow.length} products`
                      : collectionOptions.find(o => o.label === activeCategory)?.description
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
                      Check back soon for our Victron Energy product selection.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {productsToShow.map((product) => (
                      <ProductCard key={product.node.id} product={product} />
                    ))}
                  </div>
                )}

                {activeCategory !== "all" && productsToShow.length > 0 && (
                  <div className="text-center mt-8">
                    <Link to={`/collections/${collectionOptions.find(o => o.label === activeCategory)?.handle}`}>
                      <Button variant="outline" size="lg" className="gap-2">
                        View Full Collection
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Victron Energy?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Industry-leading power electronics trusted by professionals worldwide</p>
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
        <section className="py-16 lg:py-24 bg-[#004b93]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Help Designing Your System?</h2>
              <p className="text-lg text-white/70 mb-8">Our team specialises in pairing Victron power electronics with SOK batteries for optimal performance. Get expert advice on the perfect system configuration.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact"><Button size="lg" className="bg-white text-[#004b93] hover:bg-white/90 gap-2">Contact Our Experts<ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/products"><Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">Browse All Products</Button></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Victron;
