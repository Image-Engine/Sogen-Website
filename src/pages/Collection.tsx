import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, Package, Filter, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { CollectionsSidebar } from "@/components/products/CollectionsSidebar";
import { fetchCollectionByHandle, CollectionWithProducts } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Collection background images based on handle/keywords
const getCollectionBackground = (handle: string, title: string): string => {
  const text = `${handle} ${title}`.toLowerCase();
  
  if (text.includes('12v') || text.includes('12-v')) {
    return 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80';
  }
  if (text.includes('24v') || text.includes('24-v')) {
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80';
  }
  if (text.includes('48v') || text.includes('48-v')) {
    return 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80';
  }
  if (text.includes('solar') || text.includes('panel') || text.includes('mppt')) {
    return 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80';
  }
  if (text.includes('victron')) {
    return 'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=1920&q=80';
  }
  if (text.includes('inverter') || text.includes('charger') || text.includes('dc-dc')) {
    return 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920&q=80';
  }
  if (text.includes('circuit') || text.includes('fuse') || text.includes('breaker') || text.includes('protection')) {
    return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80';
  }
  if (text.includes('cable') || text.includes('connector') || text.includes('wire') || text.includes('lug')) {
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80';
  }
  if (text.includes('rv') || text.includes('camper') || text.includes('caravan') || text.includes('motorhome')) {
    return 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&q=80';
  }
  if (text.includes('marine') || text.includes('boat') || text.includes('yacht')) {
    return 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=1920&q=80';
  }
  if (text.includes('off-grid') || text.includes('offgrid') || text.includes('remote')) {
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';
  }
  if (text.includes('accessory') || text.includes('accessories') || text.includes('mount')) {
    return 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1920&q=80';
  }
  if (text.includes('lithium') || text.includes('lifepo4') || text.includes('battery') || text.includes('batteries')) {
    return 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80';
  }
  
  return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80';
};

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<CollectionWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadCollection() {
      if (!handle) return;
      setLoading(true);
      const data = await fetchCollectionByHandle(handle);
      setCollection(data);
      setLoading(false);
    }
    loadCollection();
  }, [handle]);

  const filteredProducts = collection?.products.filter((product) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.node.title.toLowerCase().includes(query) ||
      product.node.description?.toLowerCase().includes(query)
    );
  }) || [];

  const backgroundImage = collection 
    ? getCollectionBackground(collection.handle, collection.title)
    : '';

  const sidebarContent = (
    <div>
      <CollectionsSidebar standalone />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={collection?.title || "Collection"}
        description={collection?.description || `Browse our ${handle} collection of premium batteries and solar products.`}
      />
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
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
              ) : collection ? (
                <>
                  <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
                    Collection
                  </p>
                  <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-foreground mb-4">
                    {collection.title}
                  </h1>
                  {collection.description && (
                    <p className="text-body-sm sm:text-body-md text-muted-foreground max-w-2xl mx-auto mb-8">
                      {collection.description}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-foreground mb-4">
                    Collection Not Found
                  </h1>
                  <p className="text-muted-foreground">
                    The collection you're looking for doesn't exist.
                  </p>
                </>
              )}

              {collection && (
                <div className="mt-6 sm:mt-8 max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={`Search in ${collection.title}...`}
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
        <section className="py-10 lg:py-16">
          <div className="container">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    Browse Collections
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 pt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Collections</h2>
                  </div>
                  {sidebarContent}
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-[240px] shrink-0">
                <div className="sticky top-24 space-y-2">
                  <h2 className="text-lg font-semibold mb-4">Browse Collections</h2>
                  {sidebarContent}
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {collection?.title || "Collection"}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {loading ? "Loading..." : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <ProductGridSkeleton count={8} />
                  </div>
                ) : !collection ? (
                  <div className="py-16 sm:py-24 text-center">
                    <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Collection not found</h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                      The collection you're looking for doesn't exist or has been removed.
                    </p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="py-16 sm:py-24 text-center">
                    <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {searchQuery ? "No products found" : "No products in this collection"}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                      {searchQuery 
                        ? `No products match "${searchQuery}". Try a different search term.`
                        : "This collection doesn't have any products yet. Check back soon!"
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
