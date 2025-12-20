import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - replace with actual API call when backend is ready
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Subscribed!",
      description: "Thanks for signing up. You'll receive our latest updates.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-12 sm:py-16 bg-muted/50">
      <div className="container px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Get the latest news, exclusive offers, and energy tips delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 text-base flex-1"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              size="lg"
              className="h-11 px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
