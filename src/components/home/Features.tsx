import { Battery, Zap, Shield, ThermometerSun, Gauge, Recycle, RefreshCw, Clock, Bluetooth, Settings, Award } from "lucide-react";
import featuresBg from "@/assets/features-bg.webp";

const heroStats = [
  {
    icon: RefreshCw,
    title: "8000+",
    subtitle: "Charge Cycles",
    badge: "Industry Leading",
  },
  {
    icon: Clock,
    title: "20 Year",
    subtitle: "Lifespan",
    badge: "Long-Term Value",
  },
  {
    icon: Zap,
    title: "99%",
    subtitle: "Efficiency",
    badge: "Maximum Power",
  },
];

const features = [
  {
    icon: Award,
    title: "Warranty & Support",
    description: "Manufacturer backed warranty with dedicated technical assistance",
  },
  {
    icon: Battery,
    title: "Grade A Cells",
    description: "Genuine new prismatic cells for superior performance",
  },
  {
    icon: Shield,
    title: "Built-in BMS",
    description: "Advanced battery management system protection",
  },
  {
    icon: Bluetooth,
    title: "Smart Monitoring",
    description: "Bluetooth BMS for real-time battery monitoring",
  },
  {
    icon: Gauge,
    title: "Lightweight",
    description: "Up to 70% lighter than lead-acid alternatives",
  },
  {
    icon: Settings,
    title: "User Serviceable",
    description: "Robust enclosures designed for easy maintenance",
  },
];

export function Features() {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${featuresBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The SOK LiFePO4 Battery Advantage
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover why SOK batteries are the preferred choice for off-grid, marine, and RV applications
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Hero Stats (Vertical Stack) */}
          <div className="flex flex-col gap-4">
            {heroStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative group rounded-2xl backdrop-blur-xl p-6 bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300"
                >
                  {/* Badge */}
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                    {stat.badge}
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white">
                        {stat.title}
                      </h3>
                      <p className="text-white/70 text-sm sm:text-base">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group rounded-2xl backdrop-blur-xl p-5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-white/80 group-hover:text-amber-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
