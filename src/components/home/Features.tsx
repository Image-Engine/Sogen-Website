import { Check } from "lucide-react";

export function Features() {
  const advantages = [
    "Longer lifespan",
    "Increased safety",
    "High thermal stability",
    "Low self-discharge rate",
    "Lower maintenance cost",
    "High efficiency",
  ];

  const features = [
    "Faster charging times",
    "Higher power density",
    "Longer cycle life",
    "Lighter weight",
    "No off-gassing",
    "Grade A prismatic cells",
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
            The SOK Battery Difference
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Unlock the full potential of your off-grid, RV, motorhome or home power needs with our high-performance LiFePO4 batteries.
          </p>
        </div>

        {/* Two Column Feature Lists */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Advantages
            </h3>
            <ul className="space-y-5">
              {advantages.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-background" strokeWidth={3} />
                  </div>
                  <span className="text-foreground text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Features
            </h3>
            <ul className="space-y-5">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-background" strokeWidth={3} />
                  </div>
                  <span className="text-foreground text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-20 lg:mt-28 text-center">
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            With longer lifespan, faster charging times, and superior efficiency, SOK LiFePO4 batteries are the ultimate power storage solution.
          </p>
        </div>
      </div>
    </section>
  );
}
