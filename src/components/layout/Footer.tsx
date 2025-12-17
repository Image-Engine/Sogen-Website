import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
const footerLinks = {
  products: [{
    label: "Solar Systems",
    href: "#"
  }, {
    label: "Off-Grid Batteries",
    href: "#"
  }, {
    label: "RV & Marine",
    href: "#"
  }, {
    label: "Industrial",
    href: "#"
  }, {
    label: "Accessories",
    href: "#"
  }],
  support: [{
    label: "Contact Us",
    href: "#"
  }, {
    label: "Shipping Info",
    href: "#"
  }, {
    label: "Returns",
    href: "#"
  }, {
    label: "Warranty",
    href: "#"
  }, {
    label: "FAQs",
    href: "#"
  }],
  company: [{
    label: "About Us",
    href: "#"
  }, {
    label: "Our Story",
    href: "#"
  }, {
    label: "Blog",
    href: "#"
  }, {
    label: "Careers",
    href: "#"
  }]
};
export function Footer() {
  return <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        
      </div>

      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
                  <path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 16H9V6h2v2h2V6h2v14zm-3-8h2v6h-2v-6z" />
                </svg>
              </div>
              <span className="font-display text-lg font-semibold">SOK Battery</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs">
              New Zealand's trusted source for premium LiFePO4 batteries and solar power solutions.
            </p>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="tel:+6409123456" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" />
                0800 765 228
              </a>
              <a href="mailto:hello@sokbattery.co.nz" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
                hello@sokbattery.co.nz
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Auckland, New Zealand</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map(link => <li key={link.label}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => <li key={link.label}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.label}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © 2024 SOK Battery NZ. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}