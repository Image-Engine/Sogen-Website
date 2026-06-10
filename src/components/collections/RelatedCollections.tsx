import { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import { fetchCollections, ShopifyCollection } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedCollectionsProps {
  currentHandle: string;
}

export function RelatedCollections({ currentHandle }: RelatedCollectionsProps) {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      setLoading(true);
      const data = await fetchCollections(20);
      // Filter out current collection
      const filtered = data.filter(c => c.node.handle !== currentHandle);
      setCollections(filtered.slice(0, 6));
      setLoading(false);
    }
    loadCollections();
  }, [currentHandle]);

  if (loading) {
    return (
      <section className="py-12 md:py-16 border-t border-border bg-muted/30">
        <div className="container">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-8">
            Explore More Collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border bg-muted/30">
      <div className="container">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-8">
          Explore More Collections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.node.id}
              to={`/collections/${collection.node.handle}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-secondary/50"
            >
              {collection.node.image?.url ? (
                <img
                  src={collection.node.image.url}
                  alt={collection.node.image.altText || collection.node.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <h3 className="text-white font-semibold text-xs sm:text-sm text-center line-clamp-2">
                  {collection.node.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
