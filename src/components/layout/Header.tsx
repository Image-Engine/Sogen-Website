import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Solar Systems", href: "#" },
  { label: "Off-Grid", href: "#" },
  { label: "RV & Marine", href: "#" },
  { label: "Industrial", href: "#" },
  { label: "Accessories", href: "#" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container py-2 text-center">
          <p className="text-caption tracking-wide">
            Free Shipping on Orders Over $500 — Trusted by 10,000+ NZ Customers
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                  <path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 16H9V6h2v2h2V6h2v14zm-3-8h2v6h-2v-6z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                  SOK Battery
                </span>
                <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                  Power Solutions NZ
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.label} variant="nav" size="default">
                {item.label}
                <ChevronDown className="h-3 w-3 ml-0.5 opacity-50" />
              </Button>
            ))}
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
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                0
              </span>
            </Button>

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
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronDown className="h-4 w-4 opacity-50 -rotate-90" />
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
