import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  Cable, Shield, Wrench, CheckCircle2, ArrowRight, Package, 
  Plug, Award, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";

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

const PRODUCTS_PER_PAGE = 4;

interface CollectionProducts { [key: string]: ShopifyProduct[] }
interface PaginationState { [key: string]: number }

const Accessories = () => {
  const [collectionProducts, setCollectionProducts] = useState<CollectionProducts>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PaginationState>(
    Object.fromEntries(collectionOptions.map(o => [o.label, 1]))
  );

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

  const handlePageChange = (label: string, page: number) => {
    setCurrentPage(prev => ({ ...prev, [label]: page }));
  };

  const getPaginatedProducts = (label: string) => {
    const products = collectionProducts[label] || [];
    const startIndex = (currentPage[label] - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  };

  const getTotalPages = (label: string) => {
    const products = collectionProducts[label] || [];
    return Math.ceil(products.length / PRODUCTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80)` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="container relative z-10 py-20 lg:py-32">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Cable className="h-4 w-4" />
                Battery Accessories
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">Accessories & Components</h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">Complete Your Battery System</p>
              <p className="text-base text-white/70 max-w-lg">From heavy-duty cables and connectors to chargers and circuit protection — everything you need to build, expand, and maintain your SOK battery system.</p>
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 border-y border-border">
          <div className="container py-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-foreground">OEM Quality</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-foreground">Plug & Play</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-foreground">Safety Certified</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-foreground">Perfect Fit for SOK</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /><span className="text-foreground">Easy Installation</span></div>
            </div>
          </div>
        </section>

        {collectionOptions.map((option, index) => {
          const allProducts = collectionProducts[option.label] || [];
          const paginatedProducts = getPaginatedProducts(option.label);
          const totalPages = getTotalPages(option.label);
          const page = currentPage[option.label];
          return (
            <section key={option.label} className={`py-16 lg:py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}>
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{option.label}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{option.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {loading ? <ProductGridSkeleton count={4} /> : allProducts.length === 0 ? (
                    <div className="col-span-full py-16 text-center"><Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" /><h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products yet</h3><p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">Check back soon for our accessories selection.</p></div>
                  ) : paginatedProducts.map((product) => <ProductCard key={product.node.id} product={product} />)}
                </div>
                {!loading && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button variant="outline" size="icon" onClick={() => handlePageChange(option.label, page - 1)} disabled={page === 1} className="h-10 w-10"><ChevronLeft className="h-4 w-4" /></Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (<Button key={pageNum} variant={pageNum === page ? "default" : "outline"} size="icon" onClick={() => handlePageChange(option.label, pageNum)} className="h-10 w-10">{pageNum}</Button>))}
                    <Button variant="outline" size="icon" onClick={() => handlePageChange(option.label, page + 1)} disabled={page === totalPages} className="h-10 w-10"><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                )}
                {allProducts.length > 0 && (<div className="text-center mt-6"><Link to={`/collections/${option.handle}`}><Button variant="outline" size="lg" className="gap-2">View All {option.label}<ArrowRight className="h-4 w-4" /></Button></Link></div>)}
              </div>
            </section>
          );
        })}

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
