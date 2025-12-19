import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import sokLogo from "@/assets/sok-logo.webp";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { fetchCollections, ShopifyCollection } from "@/lib/shopify";

const navItems = [
  { label: "Solar Systems", href: "#" },
  { label: "Off-Grid", href: "#" },
  { label: "RV & Marine", href: "#" },
  { label: "Industrial", href: "#" },
  { label: "Accessories", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      const data = await fetchCollections();
      setCollections(data);
    };
    loadCollections();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground"></div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src={sokLogo}
              alt="SOK Battery - New Zealand"
              className="h-12 lg:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* All Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="nav" size="default">
                  All Products
                  <ChevronDown className="h-3 w-3 ml-0.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 max-h-80 overflow-y-auto">
                <DropdownMenuItem asChild>
                  <Link to="/products" className="cursor-pointer font-medium">
                    View All Products
                  </Link>
                </DropdownMenuItem>
                {collections.length > 0 && (
                  <div className="my-1 h-px bg-border" />
                )}
                {collections.map((collection) => (
                  <DropdownMenuItem key={collection.node.id} asChild>
                    <Link
                      to={`/collections/${collection.node.handle}`}
                      className="cursor-pointer"
                    >
                      {collection.node.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link key={item.label} to={item.href}>
                  <Button variant="nav" size="default">
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Button key={item.label} variant="nav" size="default">
                  {item.label}
                  <ChevronDown className="h-3 w-3 ml-0.5 opacity-50" />
                </Button>
              )
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Search batteries..."
                    className="w-48 lg:w-64 h-9 px-4 text-sm bg-secondary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <CartDrawer />

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {/* Mobile Search */}
              <div className="px-2 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search batteries..."
                    className="w-full h-10 pl-10 pr-4 text-sm bg-secondary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* All Products - Mobile */}
              <div className="px-2">
                <button
                  onClick={() => setCollectionsOpen(!collectionsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <span className="font-medium">All Products</span>
                  <ChevronDown
                    className={`h-4 w-4 opacity-50 transition-transform ${
                      collectionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {collectionsOpen && (
                  <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                    <Link
                      to="/products"
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Products
                    </Link>
                    {collections.map((collection) => (
                      <Link
                        key={collection.node.id}
                        to={`/collections/${collection.node.handle}`}
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {collection.node.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown className="h-4 w-4 opacity-50 -rotate-90" />
                  </a>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
