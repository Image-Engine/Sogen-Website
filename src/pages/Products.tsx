import { useEffect, useState } from "react";
import { Search, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchProducts, fetchCollections, fetchCollectionByHandle, ShopifyProduct, ShopifyCollection } from "@/lib/shopify";
import { cn } from "@/lib/utils";

export default function Products() {
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [productsData, collectionsData] = await Promise.all([
        fetchProducts(50),
        fetchCollections()
      ]);
      setAllProducts(productsData);
      setDisplayedProducts(productsData);
      setCollections(collectionsData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCollectionClick = async (handle: string | null) => {
    setActiveCollection(handle);
    setSearchQuery("");
    
    if (!handle) {
      setDisplayedProducts(allProducts);
      return;
    }

    setFilterLoading(true);
    const collection = await fetchCollectionByHandle(handle);
    if (collection) {
      setDisplayedProducts(collection.products);
    }
    setFilterLoading(false);
  };

  // Filter products based on search
  const filteredProducts = displayedProducts.filter((product) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.node.title.toLowerCase().includes(query) ||
      product.node.description?.toLowerCase().includes(query)
    );
  });

  const activeCollectionTitle = activeCollection 
    ? collections.find(c => c.node.handle === activeCollection)?.node.title 
    : "All Products";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Background */}
        <section 
          className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-24 bg-muted rounded mx-auto" />
                  <div className="h-10 w-64 bg-muted rounded mx-auto" />
                  <div className="h-6 w-96 bg-muted rounded mx-auto" />
                </div>
              ) : (
                <>
                  <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
                    Shop
                  </p>
                  <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-foreground mb-4">
                    {activeCollectionTitle}
                  </h1>
                  <p className="text-body-sm sm:text-body-md text-muted-foreground max-w-2xl mx-auto mb-8">
                    Browse our complete range of premium LiFePO4 batteries and solar power solutions.
                  </p>
                </>
              )}

              {/* Search Bar */}
              {!loading && (
                <div className="mt-6 sm:mt-8 max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={`Search ${activeCollectionTitle?.toLowerCase()}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 text-sm sm:text-base bg-background/90 backdrop-blur-sm rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Collections */}
        {!loading && collections.length > 0 && (
          <section className="py-6 sm:py-8 border-b border-border/50">
            <div className="container">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {/* All Products Button */}
                <button
                  onClick={() => handleCollectionClick(null)}
                  className={cn(
                    "inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    activeCollection === null
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary hover:bg-secondary/80 border border-border text-foreground"
                  )}
                >
                  All Products
                </button>
                
                {collections.map((collection) => (
                  <button
                    key={collection.node.id}
                    onClick={() => handleCollectionClick(collection.node.handle)}
                    className={cn(
                      "inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                      activeCollection === collection.node.handle
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary hover:bg-secondary/80 border border-border text-foreground"
                    )}
                  >
                    {collection.node.title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container">
            {loading || filterLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <ProductGridSkeleton count={8} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 sm:py-24 text-center">
                <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? "No products found" : "No products yet"}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                  {searchQuery 
                    ? `No products match "${searchQuery}". Try a different search term.`
                    : "This collection doesn't have any products yet."
                  }
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
