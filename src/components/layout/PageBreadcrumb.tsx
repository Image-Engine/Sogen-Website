import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items?: BreadcrumbItem[];
}

const routeLabels: Record<string, string> = {
  products: "Products",
  product: "Product",
  collections: "Collections",
  collection: "Collection",
  faq: "FAQ",
  blog: "Blog",
  contact: "Contact Us",
  "terms-conditions": "Terms & Conditions",
  "shipping-returns": "Shipping & Returns",
  warranty: "Warranty",
  "privacy-policy": "Privacy Policy",
  "energy-hub-2": "Energy Hub 2",
  "rv-campers": "RV & Campers",
  "solar-systems": "Solar Systems",
  "home-backup": "Home Backup",
  industrial: "Industrial",
  accessories: "Accessories",
  victron: "Victron",
  "video-reviews": "Video Reviews",
  account: "My Account",
  orders: "Orders",
  addresses: "Addresses",
  profile: "Profile",
};

function formatSegment(segment: string): string {
  return (
    routeLabels[segment] ||
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  const location = useLocation();

  const breadcrumbs: { label: string; href?: string }[] = [];

  if (items) {
    breadcrumbs.push(...items);
  } else {
    // Routes that only exist with a child param — never link to them directly
    const nonLinkableSegments = new Set(["product", "auth"]);

    const segments = location.pathname.split("/").filter(Boolean);
    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;
      const isNonLinkable = nonLinkableSegments.has(segment);

      // Skip segments that are just dynamic IDs (e.g. Shopify GIDs, blog handles mid-path)
      // For blog paths like /blog/blogHandle/articleHandle, skip the middle blogHandle segment
      if (
        segments[0] === "blog" &&
        segments.length === 3 &&
        index === 1
      ) {
        return; // skip the blogHandle segment — it has no route
      }

      breadcrumbs.push({
        label: formatSegment(segment),
        href: isLast || isNonLinkable ? undefined : href,
      });
    });
  }

  if (breadcrumbs.length === 0) return null;

  return (
    <div className="container max-w-6xl pt-4 pb-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((item, index) => (
            <span key={index} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
