import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Search, User, Menu, X, ChevronDown, LogOut, Package, MapPin, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import sokLogo from "@/assets/sogen-energy-logo.png";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { fetchCollections, ShopifyCollection } from "@/lib/shopify";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";

const resourceItems = [
  { label: "Video Reviews", href: "/video-reviews" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const { isAuthenticated, customer, initiateLogin, logout } = useShopifyCustomer();

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
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={sokLogo}
              alt="Sogen Energy"
              className="h-8 lg:h-10 w-auto"
              width="200"
              height="34"
              decoding="async"
              fetchPriority="high"
            />
          </Link>

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

            {/* Energy Hub */}
            <Link to="/energy-hub-2">
              <Button variant="nav" size="default">
                Energy Hub
              </Button>
            </Link>

            {/* Contact Us */}
            <Link to="/contact">
              <Button variant="nav" size="default">
                Contact Us
              </Button>
            </Link>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="nav" size="default">
                  Resources
                  <ChevronDown className="h-3 w-3 ml-0.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {resourceItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link to={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Search batteries..."
                    className="w-40 lg:w-56 h-9 px-4 text-sm bg-secondary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 shrink-0"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setSearchOpen(false)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="shrink-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {customer && (
                    <div className="px-2 py-1.5 text-sm font-medium">{customer.firstName} {customer.lastName}</div>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/account"><UserCircle className="h-4 w-4 mr-2" />My Account</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/account/orders"><Package className="h-4 w-4 mr-2" />Orders</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/account/addresses"><MapPin className="h-4 w-4 mr-2" />Addresses</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/account/profile"><User className="h-4 w-4 mr-2" />Profile</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}><LogOut className="h-4 w-4 mr-2" />Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                disabled={signingIn}
                onClick={() => {
                  setSigningIn(true);
                  initiateLogin();
                }}
              >
                {signingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : <User className="h-5 w-5" />}
              </Button>
            )}

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

              {/* Energy Hub - Mobile */}
              <Link
                to="/energy-hub-2"
                className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Energy Hub</span>
              </Link>

              {/* Contact Us - Mobile */}
              <Link
                to="/contact"
                className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Contact Us</span>
              </Link>

              {/* Resources - Mobile */}
              <div className="px-2 pt-2 border-t border-border mt-2">
                <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Resources
                </span>
                {resourceItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
