import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Wilson",
    location: "Auckland",
    rating: 5,
    text: "Excellent quality batteries and fantastic customer service. The team helped me choose the perfect setup for my off-grid cabin.",
    product: "200Ah Solar Battery",
  },
  {
    name: "Sarah Mitchell",
    location: "Wellington",
    rating: 5,
    text: "Fast shipping and the battery exceeded my expectations. Perfect for my campervan conversion. Highly recommend!",
    product: "100Ah RV Battery",
  },
  {
    name: "David Chen",
    location: "Christchurch",
    rating: 5,
    text: "Third purchase from SOK Battery. Consistent quality and the best prices in NZ. The warranty gives me total peace of mind.",
    product: "Server Rack Battery",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-surface-sunken">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-caption uppercase tracking-widest text-muted-foreground mb-3">
            Customer Reviews
          </p>
          <h2 className="text-display-md text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.9 out of 5 based on 500+ reviews
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-6 lg:p-8 rounded-2xl bg-card border border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-muted/50" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Purchased</p>
                  <p className="text-xs font-medium text-foreground">{testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
