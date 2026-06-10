import { useEffect, useState } from "react";
import { Link, useLocation } from "@/lib/router";
import { fetchCollections, ShopifyCollection } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

interface CollectionsSidebarProps {
  standalone?: boolean;
}

export const CollectionsSidebar = ({ standalone = false }: CollectionsSidebarProps) => {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function load() {
      const data = await fetchCollections();
      setCollections(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <nav className={`space-y-1 ${standalone ? '' : 'mt-6 pt-6 border-t border-border'}`}>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
          All Collections
        </h3>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-lg" />
        ))}
      </nav>
    );
  }

  if (collections.length === 0) return null;

    return (
    <nav className={`space-y-1 ${standalone ? '' : 'mt-6 pt-6 border-t border-border'}`}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
        All Collections
      </h3>
      {collections.map((collection) => {
        const path = `/collections/${collection.node.handle}`;
        const isActive = location.pathname === path;
        return (
          <Link
            key={collection.node.id}
            to={path}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent"
            }`}
          >
            {collection.node.title}
          </Link>
        );
      })}
      <Link
        to="/products"
        className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-accent transition-colors mt-2"
      >
        View All Products →
      </Link>
    </nav>
  );
};
