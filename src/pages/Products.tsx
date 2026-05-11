import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, Filter } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchProducts, fetchCollections, fetchCollectionByHandle, ShopifyProduct, ShopifyCollection } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollectionsSidebar } from "@/components/products/CollectionsSidebar";
import { useScrollToRef } from "@/hooks/useScrollToRef";

export default function Products() {
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  useEffect(() => {
    const urlQuery = searchParams.get("search") ?? "";
    setSearchQuery(urlQuery);
    if (urlQuery) {
      setActiveCollection(null);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [productsData, collectionsData] = await Promise.all([
        fetchProducts(999),
        fetchCollections()
      ]);
      setAllProducts(productsData);
      setDisplayedProducts(productsData);
      setCollections(collectionsData);
      setLoading(false);
    }
    loadData();

    // Poll for new products every 60 seconds
    const interval = setInterval(async () => {
      const productsData = await fetchProducts(999);
      setAllProducts(productsData);
      if (!activeCollection) {
        setDisplayedProducts(productsData);
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const { ref: productsRef, scrollToRef } = useScrollToRef<HTMLElement>();

  const handleCollectionClick = async (handle: string | null) => {
    setActiveCollection(handle);
    setSearchQuery("");
    requestAnimationFrame(() => scrollToRef());

    if (!handle) {
      setDisplayedProducts(allProducts);
      return;
    }

    setFilterLoading(true);
    const collection = await fetchCollectionByHandle(handle, 250);
    if (collection) {
      setDisplayedProducts(collection.products);
    }
    setFilterLoading(false);
  };

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

  const sidebarContent = (
    <div>
      <nav className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          Collections
        </h3>
        <button
          onClick={() => handleCollectionClick(null)}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeCollection === null
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          All Products
          <span className="ml-auto float-right text-xs opacity-70">
            {loading ? "—" : allProducts.length}
          </span>
        </button>
        {collections.map((collection) => (
          <button
            key={collection.node.id}
            onClick={() => handleCollectionClick(collection.node.handle)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeCollection === collection.node.handle
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent"
            }`}
          >
            {collection.node.title}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="All Products" description="Browse our full range of LiFePO4 lithium batteries, solar panels, inverters, and accessories. Premium energy solutions for RV, marine, off-grid, and industrial use in New Zealand." />
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1920&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
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

        {/* Main Content: Sidebar + Products */}
        <section ref={productsRef} className="py-10 lg:py-16 scroll-mt-24">
          <div className="container">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    Filter by Collection
                    {activeCollection && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                        {activeCollectionTitle}
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
                  <h2 className="text-lg font-semibold mb-4">Shop by Collection</h2>
                  {sidebarContent}
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {activeCollectionTitle}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {loading || filterLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.node.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
