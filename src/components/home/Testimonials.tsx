import { Star, ShieldCheck, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "James Wilson",
    location: "Auckland, NZ",
    rating: 5,
    text: "Excellent quality batteries and fantastic customer service. The team helped me choose the perfect setup for my off-grid cabin.",
    product: "200Ah Solar Battery",
    productImage: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=80&h=80&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    date: "2 weeks ago",
  },
  {
    name: "Sarah Mitchell",
    location: "Wellington, NZ",
    rating: 5,
    text: "Fast shipping and the battery exceeded my expectations. Perfect for my campervan conversion. Highly recommend!",
    product: "100Ah RV Battery",
    productImage: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=80&h=80&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    date: "1 month ago",
  },
  {
    name: "David Chen",
    location: "Christchurch, NZ",
    rating: 5,
    text: "Third purchase from SOK Battery. Consistent quality and the best prices in NZ. The warranty gives me total peace of mind.",
    product: "Server Rack Battery",
    productImage: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=80&h=80&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    date: "3 weeks ago",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        {/* Trust Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 lg:mb-16 p-6 lg:p-8 rounded-2xl bg-surface-sunken border border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Trusted by Kiwis</p>
              <p className="text-display-sm font-semibold text-foreground">Customer Reviews</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                <span className="text-2xl font-bold text-foreground">4.9</span>
                <Star className="h-5 w-5 fill-rating text-rating" />
              </div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">500+</p>
              <p className="text-xs text-muted-foreground">Verified Reviews</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">98%</p>
              <p className="text-xs text-muted-foreground">Recommend Us</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header with Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-rating text-rating" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{testimonial.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-foreground leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              {/* Product Purchased */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img 
                  src={testimonial.productImage} 
                  alt={testimonial.product}
                  className="w-10 h-10 rounded-lg object-cover bg-muted"
                />
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> Verified Purchase
                  </p>
                  <p className="text-sm font-medium text-foreground">{testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
