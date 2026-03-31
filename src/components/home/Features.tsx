import { Clock, ShieldCheck, Battery, Bluetooth, Shield, Settings, Zap, RefreshCw } from "lucide-react";

const heroStats = [
  { icon: RefreshCw, value: "8000+", label: "Charge Cycles", accent: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Clock, value: "20 Year", label: "Lifespan", accent: "text-blue-600", bg: "bg-blue-50" },
  { icon: Zap, value: "99%", label: "Efficiency", accent: "text-amber-600", bg: "bg-amber-50" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Warranty & Support",
    desc: "Manufacturer backed warranty with dedicated technical assistance for peace of mind",
  },
  {
    icon: Battery,
    title: "Grade A Cells",
    desc: "Genuine new prismatic cells ensure superior performance and reliability",
  },
  {
    icon: Clock,
    title: "20 Year Lifespan",
    desc: "Up to 4000-8000 cycles of consistent, reliable power output",
  },
  {
    icon: Bluetooth,
    title: "Smart BMS",
    desc: "High quality Bluetooth battery management system for real-time monitoring",
  },
  {
    icon: Shield,
    title: "Premium Build",
    desc: "Superior build quality with carefully selected components",
  },
  {
    icon: Settings,
    title: "User Serviceable",
    desc: "Robust and durable enclosures designed for easy maintenance",
  },
];

export function Features() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/40 to-secondary/10">
      <div className="container max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            The SOK LiFePO4 Battery Advantage
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unlock the full potential of your off-grid, RV, motorhome or home
            power needs with our high-performance LiFePO4 batteries.
          </p>
        </div>

        {/* Hero Stats Row */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12 lg:mb-16">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-2xl border bg-background p-5 sm:p-8"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.accent}`} strokeWidth={1.5} />
              </div>
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.accent} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border bg-background p-5 sm:p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>
              <h4 className="text-foreground text-base sm:text-lg font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
