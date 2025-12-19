import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

export default function Products() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await fetchProducts(50);
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-surface-sunken border-b border-border">
          <div className="container py-8 sm:py-12 lg:py-16">
            <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
              Shop
            </p>
            <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-foreground">
              All Products
            </h1>
            <p className="mt-3 sm:mt-4 text-body-sm sm:text-body-md text-muted-foreground max-w-2xl">
              Browse our complete range of premium LiFePO4 batteries and solar power solutions.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <ProductGridSkeleton count={8} />
              </div>
            ) : products.length === 0 ? (
              <div className="py-16 sm:py-24 text-center">
                <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products yet</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                  Your store doesn't have any products yet. Check back soon!
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {products.length} products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product) => (
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
