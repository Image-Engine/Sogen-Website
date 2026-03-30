import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { Link } from "react-router-dom";
import { 
  Zap, Shield, Wifi, ArrowRight, Package, 
  Sun, Battery, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchProductsByVendor, ShopifyProduct } from "@/lib/shopify";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollectionsSidebar } from "@/components/products/CollectionsSidebar";

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

const Victron = () => {
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const products = await fetchProductsByVendor("Victron");
      setAllProducts(products);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const hiddenTypes = ["DC- DC Converters / Chargers", "DC-DC Chargers", "DC-DC Converters"];

  // Dynamically extract product types from fetched products
  const productTypes = Array.from(
    new Set(
      allProducts
        .map((p) => p.node.productType)
        .filter((t) => t && t.trim() !== "" && !hiddenTypes.includes(t))
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
          onClick={() => setActiveCategory("all")}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          All Victron
          <span className="ml-auto float-right text-xs opacity-70">
            {loading ? "—" : allProducts.length}
          </span>
        </button>
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveCategory(type)}
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
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <PageBreadcrumb />
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
                    {activeCategory === "all" ? "All Victron Products" : activeCategory}
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
