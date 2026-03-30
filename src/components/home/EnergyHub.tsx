import { ArrowRight, Zap, Sun, Shield, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
const collections = [{
  name: "Solar Panels",
  handle: "solar-panels",
  image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop"
}, {
  name: "Bundles",
  handle: "bundles",
  image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=400&h=300&fit=crop"
}, {
  name: "Solar Accessories",
  handle: "solar-accessories",
  image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=400&h=300&fit=crop"
}, {
  name: "Charge Controllers",
  handle: "solar-charge-controllers",
  image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop"
}];
const specs = [{
  value: "5-8",
  unit: "kVa",
  label: "Victron Inverter",
  description: "Powers your entire home, even during peak demand"
}, {
  value: "25",
  unit: "kWh",
  label: "Max Capacity",
  description: "Store enough energy to run overnight and through cloudy days"
}, {
  value: "IP55",
  unit: "",
  label: "Weather Rated",
  description: "Built tough for New Zealand's outdoor conditions"
}, {
  value: "NZ",
  unit: "",
  label: "Certified",
  description: "Ready to install with full electrical compliance"
}];
const features = ["Serviceable SOK LiFePO4 batteries with genuine Grade A cells", "Victron EasySolar-II inverter with integrated MPPT controller", "IP-rated aluminium cabinet for outdoor installations", "Pre-configured and tested for plug-and-play installation", "Scalable from 10kWh to 25kWh battery capacity", "NZ Electrical Code of Compliance Certificate included"];
export function EnergyHub() {
  return <section className="py-24 lg:py-32 bg-gradient-to-b from-secondary/50 to-background overflow-hidden">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Complete Power Solution
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            Energy Hub 2
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reliable off and on-grid power built for New Zealand
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20">
          {specs.map((spec, index) => <div key={index} className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-1">
                {spec.value}
                {spec.unit && <span className="text-xl lg:text-2xl text-primary ml-1">
                    {spec.unit}
                  </span>}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {spec.label}
              </div>
              <div className="text-xs text-muted-foreground/70 mt-2 leading-relaxed">
                {spec.description}
              </div>
            </div>)}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                Professional Off-Grid Power Systems
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                The Energy Hub 2 represents the latest generation of professional 
                off-grid power systems, combining proven Victron technology with 
                high-performance SOK lithium batteries in a weatherproof, 
                installer-friendly package.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm">
                    {feature}
                  </span>
                </div>)}
            </div>

          </div>

          {/* Right - Visual Card */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-success/5 rounded-full blur-3xl" />
            
            {/* Main Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 p-8 lg:p-10 text-primary-foreground overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>

                <h4 className="text-2xl lg:text-3xl font-semibold mb-4">
                  The SOK Energy Hub 2 Advantage
                </h4>
                <p className="text-white/70 leading-relaxed mb-8">
                  SOK batteries and Victron hardware are renowned for their 
                  durability, serviceability and reliability, making them the 
                  preferred choice for solar energy storage and off-grid systems.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center lg:text-left">
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold">20+</div>
                    <div className="text-xs text-white/60">Year Lifespan</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold">8000</div>
                    <div className="text-xs text-white/60">Charge Cycles</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold">99%</div>
                    <div className="text-xs text-white/60">Efficiency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Cards - Full Width Below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-16 lg:mt-20">
          {collections.map(collection => <Link key={collection.handle} to={`/collections/${collection.handle}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl active:scale-[0.98] transition-all duration-500">
              {/* Background Image */}
              <img src={collection.image} alt={collection.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center">
                <h4 className="text-white font-semibold text-base md:text-lg">
                  {collection.name}
                </h4>
                <div className="flex items-center gap-1 text-white/70 text-sm mt-1 group-hover:text-white transition-colors">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>)}
        </div>
      </div>
    </section>;
}