import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import sokLogo from "@/assets/sok-logo.webp";

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
  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* Main Footer */}
      <div className="container py-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Brand Column - Left */}
          <div className="flex-shrink-0">
            <img src={sokLogo} alt="SOK Battery" className="h-16 w-auto mb-4" />
            <p className="text-muted-foreground text-sm max-w-[280px]">
              New Zealand's trusted source for premium LiFePO4 batteries and solar power solutions.
            </p>
          </div>

          {/* Links and Contact - Right */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 lg:gap-x-16">
            {/* Products */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">
                Products
              </h4>
              <ul className="space-y-2">
                {footerLinks.products.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">
                Support
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">
                Contact
              </h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="tel:+6409123456" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  0800 765 228
                </a>
                <a href="mailto:hello@sokbattery.co.nz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  hello@sokbattery.co.nz
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Auckland, New Zealand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              © 2024 SOK Battery NZ. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}