import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import sokLogo from "@/assets/sogen-energy-logo.png";

const footerLinks = {
  products: [{
    label: "Solar Systems",
    href: "/collections/solar-systems"
  }, {
    label: "Off-Grid Batteries",
    href: "/collections/off-grid-batteries"
  }, {
    label: "RV & Marine",
    href: "/collections/rv-marine"
  }, {
    label: "Industrial",
    href: "/collections/industrial"
  }, {
    label: "Accessories",
    href: "/collections/accessories"
  }],
  support: [{
    label: "Contact Us",
    href: "/contact"
  }, {
    label: "Shipping & Returns",
    href: "/shipping-returns"
  }, {
    label: "Warranty",
    href: "/warranty"
  }, {
    label: "FAQs",
    href: "/faq"
  }, {
    label: "Blog",
    href: "/blog"
  }],
  b2b: [{
    label: "Reseller Application",
    href: "https://forms.gle/TuujWLemKf3UsSqRA"
  }, {
    label: "Reseller Login",
    href: "https://solagen.qblue.biz/login"
  }]
};

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* Main Footer */}
      <div className="container px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-5 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <img src={sokLogo} alt="Sogen Energy" className="h-8 sm:h-10 lg:h-12 w-auto mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-xs sm:text-sm max-w-[280px]">
              New Zealand's trusted source for premium LiFePO4 batteries and solar power solutions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 text-foreground">
              Products
            </h4>
            <ul className="space-y-2">
              {footerLinks.products.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 text-foreground">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* B2B */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 text-foreground">
              B2B
            </h4>
            <ul className="space-y-2">
              {footerLinks.b2b.map(link => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 text-foreground">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
              {/* HIDDEN - Phone numbers temporarily removed
              <a href="tel:098710505" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                09 871 0505
              </a>
              <a href="tel:0225022377" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                022 502 2377
              </a>
              */}
              <Link to="/contact" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                Contact Form
              </Link>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Nelson, NZ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {new Date().getFullYear()} SOK Battery NZ. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
