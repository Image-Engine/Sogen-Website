import { Shield, Truck, Headphones, Award, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "10-Year Warranty",
    description: "Industry-leading protection on all batteries. Peace of mind guaranteed.",
  },
  {
    icon: Truck,
    title: "Free NZ Shipping",
    description: "Complimentary delivery on orders over $500 throughout New Zealand.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Our battery specialists are here to help you find the perfect solution.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "A-grade LiFePO4 cells with advanced BMS for maximum performance.",
  },
  {
    icon: Clock,
    title: "Fast Dispatch",
    description: "Same-day shipping on orders placed before 2pm (Mon-Fri).",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Afterpay, Laybuy, and interest-free options available.",
  },
];

export function Features() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-caption uppercase tracking-widest text-muted-foreground mb-3">
            Why Choose Us
          </p>
          <h2 className="text-display-md text-foreground mb-4">
            The SOK Battery Difference
          </h2>
          <p className="text-body-md text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing New Zealand with the highest quality battery solutions and exceptional service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="flex gap-5 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
