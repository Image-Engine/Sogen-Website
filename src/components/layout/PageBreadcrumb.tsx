import type { ReactNode } from "react";
import { Link, useLocation } from "@/lib/router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { isBlogSubdomain, isExternalUrl, MAIN_SITE_URL } from "@/lib/blogUrls";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items?: BreadcrumbItemType[];
}

const routeLabels: Record<string, string> = {
  products: "Products",
  product: "Product",
  collections: "Collections",
  collection: "Collection",
  faq: "FAQ",
  FAQ: "Blog",
  blog: "Blog",
  contact: "Contact Us",
  "terms-conditions": "Terms & Conditions",
  "shipping-returns": "Shipping & Returns",
  warranty: "Warranty",
  "privacy-policy": "Privacy Policy",
  "energy-hub-2": "Energy Hub",
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

function BreadcrumbHref({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (isExternalUrl(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  const location = useLocation();
  const onBlogHost = isBlogSubdomain();

  const breadcrumbs: BreadcrumbItemType[] = [];

  if (items) {
    breadcrumbs.push(...items);
  } else if (onBlogHost) {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 2) {
      breadcrumbs.push({ label: "Blog", href: "/" });
      breadcrumbs.push({ label: formatSegment(segments[1]) });
    }
  } else {
    const nonLinkableSegments = new Set(["product", "auth", "collections", "collection"]);
    const segments = location.pathname.split("/").filter(Boolean);

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;
      const isNonLinkable = nonLinkableSegments.has(segment);

      if (
        segments[0] === "blog" &&
        segments.length === 3 &&
        index === 1
      ) {
        return;
      }

      breadcrumbs.push({
        label: formatSegment(segment),
        href: isLast || isNonLinkable ? undefined : href,
      });
    });
  }

  if (breadcrumbs.length === 0) return null;

  const homeHref = onBlogHost ? MAIN_SITE_URL : "/";

  return (
    <div className="container max-w-6xl pt-4 pb-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <BreadcrumbHref
                href={homeHref}
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </BreadcrumbHref>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((item, index) => (
            <span key={index} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <BreadcrumbHref
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item.label}
                    </BreadcrumbHref>
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
