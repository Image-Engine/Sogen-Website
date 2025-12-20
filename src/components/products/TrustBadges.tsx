import { Shield, RotateCcw, Award } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      label: "Secure Checkout",
      sublabel: "SSL Encrypted",
    },
    {
      icon: RotateCcw,
      label: "Easy Returns",
      sublabel: "30-day policy",
    },
    {
      icon: Award,
      label: "Warranty",
      sublabel: "1 Year Coverage",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <badge.icon className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{badge.label}</p>
            <p className="text-xs text-muted-foreground truncate">{badge.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
