import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "@/lib/router";
import { 
  Cable, Shield, Wrench, CheckCircle2, ArrowRight, Package, 
  Plug, Award, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollectionsSidebar } from "@/components/products/CollectionsSidebar";
import { useScrollToRef } from "@/hooks/useScrollToRef";

const features = [
  {
    icon: Cable,
    title: "Premium Cables & Connectors",
    description: "Heavy-duty battery cables and connectors rated for high-current applications with corrosion-resistant terminals.",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Shield,
    title: "Circuit Protection",
    description: "Fuses, breakers, and disconnect switches to safeguard your battery system from overcurrent and short circuits.",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  {
    icon: Plug,
    title: "Chargers & Converters",
    description: "Smart chargers and DC-DC converters optimized for LiFePO₄ chemistry with proper charge profiles.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Wrench,
    title: "Mounting & Hardware",
    description: "Battery trays, hold-downs, and mounting hardware engineered for secure installation in any application.",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: CheckCircle2,
    title: "Guaranteed Compatibility",
    description: "Every accessory is tested and verified to work perfectly with SOK Battery systems.",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    icon: Award,
    title: "Built to Last",
    description: "Commercial-grade materials and construction ensure your accessories match the longevity of your batteries.",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];

const Accessories = () => {
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref: productsRef, scrollToRef } = useScrollToRef<HTMLElement>();
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    requestAnimationFrame(() => scrollToRef());
  };

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const products = await fetchProducts(999, "accessory OR accessories OR charger OR cable OR connector OR inverter");
      setAllProducts(products);
      setLoading(false);
    }
    loadProducts();

    const interval = setInterval(async () => {
      const products = await fetchProducts(999, "accessory OR accessories OR charger OR cable OR connector OR inverter");
      setAllProducts(products);
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  // Dynamically extract product types from fetched products
  const allTypes = Array.from(
    new Set(
      allProducts
        .map((p) => p.node.productType)
        .filter((t) => t && t.trim() !== "")
    )
  ).sort();

  const getProductsToShow = () => {
    if (activeCategory === "all") return allProducts;
    return allProducts.filter((p) => p.node.productType === activeCategory);
  };

  const productsToShow = getProductsToShow();

  const getCountForType = (type: string) =>
    allProducts.filter((p) => p.node.productType === type).length;

  const sidebarContent = (
    <div>
      <nav className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Product Type
        </h3>
        <button
          onClick={() => handleCategoryChange("all")}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          All Accessories
          <span className="ml-auto float-right text-xs opacity-70">
            {loading ? "—" : allProducts.length}
          </span>
        </button>
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleCategoryChange(type)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === type
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent"
            }`}
          >
            {type}
            <span className="ml-auto float-right text-xs opacity-70">
              {loading ? "—" : getCountForType(type)}
            </span>
          </button>
        ))}
      </nav>
      <CollectionsSidebar />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Accessories" description="Battery accessories, cables, connectors, chargers, and inverters. Complete your solar and battery setup with SOK Battery NZ." />
      <Header />
      <PageBreadcrumb />
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
        <section ref={productsRef} className="py-10 lg:py-16 scroll-mt-24">
          <div className="container">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    Filter by Type
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
                  <h2 className="text-lg font-semibold mb-4">Shop by Type</h2>
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
                    Showing {productsToShow.length} product{productsToShow.length !== 1 ? "s" : ""}
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
