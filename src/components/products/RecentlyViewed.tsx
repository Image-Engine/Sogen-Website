import { Link } from "@/lib/router";
import { Clock } from "lucide-react";

interface RecentProduct {
  id: string;
  handle: string;
  title: string;
  imageUrl?: string;
  price: string;
  currencyCode: string;
}

interface RecentlyViewedProps {
  products: RecentProduct[];
  currentHandle: string;
}

export function RecentlyViewed({ products, currentHandle }: RecentlyViewedProps) {
  // Filter out current product
  const filteredProducts = products.filter((p) => p.handle !== currentHandle);

  if (filteredProducts.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground">Recently Viewed</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.handle}`}
              className="group"
            >
              <div className="aspect-square bg-secondary/10 rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-colors mb-2">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-sm font-semibold text-primary mt-1">
                {product.currencyCode} ${parseFloat(product.price).toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
