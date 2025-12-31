import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Shield, 
  Battery, 
  Thermometer, 
  Wifi,
  CheckCircle2,
  ArrowRight,
  Package,
  Sun,
  Gauge,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";
import rvHeroBg from "@/assets/rv-hero-bg.jpg";

const features = [
  {
    icon: Battery,
    title: "High Capacity Storage",
    description: "Up to 400Ah per 12V battery with 5.12kWh capacity — enough to power your adventures for days.",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Thermometer,
    title: "Built-In Self-Heating",
    description: "Charge safely in cold climates with integrated heating — batteries remain operational in freezing temperatures.",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  {
    icon: Shield,
    title: "Vibration Resistant",
    description: "Engineered to withstand the rigors of the road with advanced vibration dampening technology.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Wifi,
    title: "Bluetooth Monitoring",
    description: "Monitor your battery health, charge status, and capacity in real-time from your smartphone.",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    icon: Sun,
    title: "Solar Compatible",
    description: "Seamlessly integrate with solar panels and MPPT controllers for sustainable off-grid power.",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Gauge,
    title: "IP65 Protection",
    description: "Water and dust resistant design ensures reliable performance in any environment.",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];

const voltageOptions = [
  { voltage: "12V", handle: "12v-lithium-batteries", description: "Most popular for RVs, campers, and vans" },
  { voltage: "24V", handle: "24v-lithium-batteries", description: "Higher efficiency for larger systems" },
  { voltage: "48V", handle: "48v-lithium-batteries", description: "Maximum power for heavy-duty setups" }
];

const PRODUCTS_PER_PAGE = 4;

interface CollectionProducts {
  [key: string]: ShopifyProduct[];
}

interface PaginationState {
  [key: string]: number;
}

const RVCampers = () => {
  const [collectionProducts, setCollectionProducts] = useState<CollectionProducts>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PaginationState>({
    "12V": 1,
    "24V": 1,
    "48V": 1
  });

  useEffect(() => {
    async function loadAllCollections() {
      setLoading(true);
      const results: CollectionProducts = {};
      
      for (const option of voltageOptions) {
        const collection = await fetchCollectionByHandle(option.handle, 50);
        // Show all products regardless of images (only homepage filters by images)
        results[option.voltage] = collection?.products || [];
      }
      
      setCollectionProducts(results);
      setLoading(false);
    }
    loadAllCollections();
  }, []);

  const handlePageChange = (voltage: string, page: number) => {
    setCurrentPage(prev => ({ ...prev, [voltage]: page }));
  };

  const getPaginatedProducts = (voltage: string) => {
    const products = collectionProducts[voltage] || [];
    const startIndex = (currentPage[voltage] - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  };

  const getTotalPages = (voltage: string) => {
    const products = collectionProducts[voltage] || [];
    return Math.ceil(products.length / PRODUCTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${rvHeroBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          
          <div className="container relative z-10 py-20 lg:py-32">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Zap className="h-4 w-4" />
                RV & Camper Power Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                RV, Vans & Campers
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                The Freedom To Unplug
              </p>
              <p className="text-base text-white/70 max-w-lg">
                Power your adventures with reliable LiFePO₄ battery systems designed specifically for mobile living. 
                From weekend getaways to full-time van life, we have the perfect battery solution for your setup.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Highlights Bar */}
        <section className="bg-secondary/50 border-y border-border">
          <div className="container py-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground">5.12kWh & 400Ah per 12V Battery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground">Inverter Communications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground">Built-In Self-Heating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground">Vibration Resistant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground">IP65 Protection</span>
              </div>
            </div>
          </div>
        </section>

        {/* All Battery Collections - Stacked */}
        {voltageOptions.map((option, index) => {
          const allProducts = collectionProducts[option.voltage] || [];
          const paginatedProducts = getPaginatedProducts(option.voltage);
          const totalPages = getTotalPages(option.voltage);
          const page = currentPage[option.voltage];

          return (
            <section 
              key={option.voltage} 
              className={`py-16 lg:py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}
            >
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {option.voltage} Lithium Batteries
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {option.description}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {loading ? (
                    <ProductGridSkeleton count={4} />
                  ) : allProducts.length === 0 ? (
                    <div className="col-span-full py-16 text-center">
                      <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products yet</h3>
                      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                        Check back soon for our {option.voltage} battery selection.
                      </p>
                    </div>
                  ) : (
                    paginatedProducts.map((product) => (
                      <ProductCard key={product.node.id} product={product} />
                    ))
                  )}
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(option.voltage, page - 1)}
                      disabled={page === 1}
                      className="h-10 w-10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePageChange(option.voltage, pageNum)}
                        className="h-10 w-10"
                      >
                        {pageNum}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(option.voltage, page + 1)}
                      disabled={page === totalPages}
                      className="h-10 w-10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* View All Link */}
                {allProducts.length > 0 && (
                  <div className="text-center mt-6">
                    <Link to={`/collections/${option.handle}`}>
                      <Button variant="outline" size="lg" className="gap-2">
                        View All {option.voltage} Batteries
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Why Choose Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built for Life on the Road
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our LiFePO₄ batteries are engineered to handle the unique demands of RV and camper applications
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
                Need Help Choosing the Right Battery?
              </h2>
              <p className="text-lg text-background/70 mb-8">
                Our team of experts can help you design the perfect power system for your RV, van, or camper. 
                Get personalized recommendations based on your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Contact Our Experts
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="bg-transparent text-background border-background/30 hover:bg-background/10">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RVCampers;
