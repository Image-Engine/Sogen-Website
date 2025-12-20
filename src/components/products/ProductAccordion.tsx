import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Package, Truck, HelpCircle } from "lucide-react";

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
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {description || "No description available for this product."}
          </p>
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
              <p>Free standard shipping on orders over $100. Most orders ship within 1-2 business days.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Returns</h4>
              <p>We offer a 30-day return policy for unused items in original packaging. Return shipping is free for defective products.</p>
            </div>
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
              <p>All products come with a 1-year manufacturer warranty covering defects in materials and workmanship.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Do you offer bulk pricing?</h4>
              <p>Yes! Contact us for orders of 10+ units to receive special pricing.</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
