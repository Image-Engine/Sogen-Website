import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Package, ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { Button } from "@/components/ui/button";
import { fetchCollectionByHandle, CollectionWithProducts } from "@/lib/shopify";

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<CollectionWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadCollection() {
      if (!handle) return;
      
      setLoading(true);
      setNotFound(false);
      
      const data = await fetchCollectionByHandle(handle, 50);
      
      if (!data) {
        setNotFound(true);
      } else {
        setCollection(data);
      }
      
      setLoading(false);
    }
    loadCollection();
  }, [handle]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container py-16 sm:py-24 text-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Collection not found</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              The collection you're looking for doesn't exist.
            </p>
            <Link to="/products">
              <Button variant="outline">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to All Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-surface-sunken border-b border-border">
          <div className="container py-8 sm:py-12 lg:py-16">
            {/* Breadcrumb */}
            <nav className="mb-4 sm:mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/products" className="hover:text-foreground transition-colors">
                    Products
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground">
                  {loading ? "Loading..." : collection?.title}
                </li>
              </ol>
            </nav>

            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-5 w-20 bg-placeholder rounded" />
                <div className="h-10 w-64 bg-placeholder rounded" />
                <div className="h-5 w-96 bg-placeholder rounded" />
              </div>
            ) : (
              <>
                <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
                  Collection
                </p>
                <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-foreground">
                  {collection?.title}
                </h1>
                {collection?.description && (
                  <p className="mt-3 sm:mt-4 text-body-sm sm:text-body-md text-muted-foreground max-w-2xl">
                    {collection.description}
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {/* Collection Image (if exists) */}
        {collection?.image && (
          <section className="border-b border-border">
            <div className="container py-6 sm:py-8">
              <div className="aspect-[21/9] sm:aspect-[21/6] rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/10">
                <img
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <ProductGridSkeleton count={8} />
              </div>
            ) : collection?.products.length === 0 ? (
              <div className="py-16 sm:py-24 text-center">
                <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products in this collection</h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Check back soon for new products!
                </p>
                <Link to="/products">
                  <Button variant="outline">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    View All Products
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {collection?.products.length} products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {collection?.products.map((product) => (
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
