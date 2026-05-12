import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Package, Truck, HelpCircle, ArrowRight } from "lucide-react";
import { RichTextDisplay } from "./RichTextDisplay";

interface ProductAccordionProps {
  description: string;
  specifications?: Record<string, string>;
}

export function ProductAccordion({ description, specifications }: ProductAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="description">
      {/* Description */}
      <AccordionItem value="description" className="border-border">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold">Description</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <RichTextDisplay html={description} />
        </AccordionContent>
      </AccordionItem>

      {/* Specifications */}
      {specifications && Object.keys(specifications).length > 0 && (
        <AccordionItem value="specifications" className="border-border">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-semibold">Specifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-3">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Shipping & Returns */}
      <AccordionItem value="shipping" className="border-border">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-semibold">Shipping & Returns</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-1">Shipping</h4>
              <p>Shipping rates are calculated at checkout. Most orders ship within 1-2 business days. Pickup is available from our Nelson warehouse by appointment.</p>
              <p className="mt-2 text-sm">Note: Rural and island deliveries may have restrictions for LiFePO4 batteries.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Returns</h4>
              <p>Returns accepted within 14 days of receiving your order. Items must be unused, unopened, and in original packaging. A 20% restocking fee applies to change-of-mind returns.</p>
            </div>
            <Link 
              to="/shipping-returns"
              className="inline-flex items-center gap-1.5 mt-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View full shipping & returns policy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* FAQ */}
      <AccordionItem value="faq" className="border-border border-b-0">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold">FAQ</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-1">What is the warranty?</h4>
              <p>All SOK batteries carry a 7-year warranty, and SOK rack batteries are covered for 10 years. Warranty covers defects in materials and workmanship.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Need help with installation?</h4>
              <p>Check our comprehensive FAQ section for guides on charger settings, DC-DC chargers, battery balancing, and more.</p>
            </div>
            <Link 
              to="/faq"
              className="inline-flex items-center gap-1.5 mt-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
