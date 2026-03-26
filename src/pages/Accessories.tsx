import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { Link } from "react-router-dom";
import { 
  Cable, Shield, Wrench, CheckCircle2, ArrowRight, Package, 
  Plug, Award, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollectionsSidebar } from "@/components/products/CollectionsSidebar";

const features = [
  {
    icon: Plug,
    title: "Plug & Play",
    description: "Pre-terminated connectors and cables for quick, hassle-free installation with any SOK battery system.",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Award,
    title: "OEM Quality",
    description: "Every accessory is manufactured to the same exacting standards as our batteries — no compromises.",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Shield,
    title: "Safety Certified",
    description: "All components are UL-listed and meet international safety standards for complete peace of mind.",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  {
    icon: Cable,
    title: "Perfect Fit",
    description: "Designed specifically for SOK batteries, ensuring optimal connectivity and performance.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description: "Clear documentation and intuitive design means anyone can install with basic tools.",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Heavy-duty construction and premium materials ensure long-lasting reliability in any environment.",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];

const collectionOptions = [
  { label: "12V Accessories", handle: "12v-lithium-batteries", description: "Cables, connectors, and components for 12V systems" },
  { label: "24V Accessories", handle: "24v-lithium-batteries", description: "Components and cables for 24V battery setups" },
  { label: "48V Accessories", handle: "48v-lithium-batteries", description: "Heavy-duty accessories for 48V installations" }
];

interface CollectionProducts { [key: string]: ShopifyProduct[] }

const Accessories = () => {
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
          All Accessories
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
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80)` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Cable className="h-4 w-4" />
                Battery Accessories
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">Accessories & Components</h1>
              <p className="text-lg lg:text-xl text-white/90 font-light">Complete Your Battery System</p>
              <p className="text-sm text-white/70 max-w-lg">From heavy-duty cables and connectors to chargers and circuit protection — everything you need to build, expand, and maintain your SOK battery system.</p>
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
                    {activeCategory === "all" ? "All Accessories" : activeCategory}
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
                      Check back soon for our accessories selection.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quality Components, Perfect Fit</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Every accessory is designed and tested to work seamlessly with SOK battery systems</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">Need Help Finding the Right Accessories?</h2>
              <p className="text-lg text-background/70 mb-8">Not sure which cables, connectors, or chargers you need? Our team can recommend the perfect accessories for your specific battery setup.</p>
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

export default Accessories;
