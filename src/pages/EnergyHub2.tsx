import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Shield, 
  Battery, 
  Sun, 
  Thermometer, 
  Wifi,
  CheckCircle2,
  Home,
  TreePine,
  Warehouse,
  Leaf,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Victron Power Electronics",
    description: "Choose the EasySolar 48/5000 or MultiPlus-II 48/8000 for proven reliability and performance.",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Battery,
    title: "Scalable Storage",
    description: "10 – 25 kWh capacity, compatible with 2 – 5 SOK rack batteries (Grade A LiFePO₄).",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Shield,
    title: "Pre-Wired & Certified",
    description: "Supplied with NZ Electrical Certificate of Compliance (COC). Just connect batteries and solar — plug-and-play simplicity.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Thermometer,
    title: "Built for NZ Conditions",
    description: "3mm powder-coated aluminium cabinet, lockable, corrosion-resistant, and outdoor-ready.",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  {
    icon: Sun,
    title: "Generator Ready",
    description: "16A input for automatic generator backup — seamless switching.",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Wifi,
    title: "Smart Monitoring",
    description: "Victron Cerbo GX with touchscreen and remote app access.",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10"
  }
];

const included = [
  "Powder-coated aluminium cabinet with forced cooling",
  "Suntree 125A or 200A DC MCCB main breaker",
  "PV isolator for safety during maintenance",
  "Cellular/Wi-Fi modem for remote monitoring",
  "Full internal wiring, fusing, bus bars, and terminations",
  "Electrical COC issued by licensed professionals",
  "Bench-tested and certified prior to shipping",
  "Expandable & Flexible — Start small and grow as needed"
];

const useCases = [
  { icon: Home, title: "Tiny Homes & Baches", description: "Compact, reliable power for small living", iconColor: "text-sky-500", bgColor: "bg-sky-500/10" },
  { icon: TreePine, title: "Off Grid Cabins", description: "Complete energy independence", iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { icon: Zap, title: "Backup Power", description: "Keep the lights on during outages", iconColor: "text-amber-500", bgColor: "bg-amber-500/10" },
  { icon: Warehouse, title: "Remote Farms & Sheds", description: "Power where the grid can't reach", iconColor: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Leaf, title: "Eco Builds", description: "Sustainable living made simple", iconColor: "text-green-500", bgColor: "bg-green-500/10" }
];

const specs = [
  { icon: Zap, label: "Inverter Models", value: "Victron EasySolar 48/5000 or MultiPlus-II 48/8000", iconColor: "text-amber-500" },
  { icon: Battery, label: "Battery Storage", value: "10 – 25 kWh (SOK LiFePO₄)", iconColor: "text-emerald-500" },
  { icon: Sun, label: "Solar Input", value: "Up to 5.8kW, expandable with second MPPT controller", iconColor: "text-orange-500" },
  { icon: CheckCircle2, label: "Certification", value: "NZ Electrical COC included", iconColor: "text-green-500" },
  { icon: Zap, label: "Generator Input", value: "16A or 32A PDL 56 Series input or hard wired", iconColor: "text-rose-500" },
  { icon: Shield, label: "Enclosure", value: "3mm powder-coated lockable aluminium IP54+ cabinet", iconColor: "text-blue-500" },
  { icon: Wifi, label: "Monitoring", value: "Victron GX device with cellular/Wi-Fi modem", iconColor: "text-violet-500" }
];

const EnergyHub2 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Energy Hub" description="SOK Energy Hub — all-in-one solar power system for homes, RVs, and off-grid living. Features built-in inverter, MPPT, and LiFePO4 battery." />
      <Header />
      <PageBreadcrumb />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-8 lg:py-12 overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Complete Power Solution
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Energy Hub
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground font-light">
                  Everything you need for reliable, off-grid power — in one cabinet.
                </p>
                <p className="text-base text-muted-foreground max-w-lg">
                  Turnkey, pre-wired solar power systems that combine Victron inverter technology and SOK LiFePO₄ batteries in a NZ-made, weatherproof cabinet — ready to power your home, bach, or tiny house, on-grid or off-grid.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="gap-2" onClick={() => document.getElementById('custom-quote')?.scrollIntoView({ behavior: 'smooth' })}>
                      Request a Custom Quote
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  <a 
                    href="/EnergyHub2-Brochure.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg">
                      Download Brochure
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/20 border border-border">
                  <img 
                    src="https://solagen.co.nz/wp-content/uploads/SGEH-cabinet-display800x800.jpg" 
                    alt="Energy Hub Cabinet" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose the Energy Hub?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade power systems engineered for New Zealand conditions
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Perfect For
              </h2>
              <p className="text-lg text-muted-foreground">
                One system. Endless applications.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {useCases.map((useCase, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${useCase.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className={`h-7 w-7 ${useCase.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What's Included
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Every Energy Hub system is professionally pre-wired, assembled, and tested in-house, saving you time, cost, and complexity.
                </p>
                <ul className="space-y-4">
                  {included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/20 border border-border">
                  <img 
                    src="https://solagen.co.nz/wp-content/uploads/Cabinet-electronics-1-768x768.jpg" 
                    alt="Energy Hub Electronics" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inverter Options Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Select Your Inverter Size
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Two powerful options to match your energy needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Option 1 */}
              <div className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="mb-6">
                  <span className="text-sm font-medium text-primary">Option 1</span>
                  <h3 className="text-2xl font-bold text-foreground mt-1">
                    Victron Multiplus 48/5000
                  </h3>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">5 kVA inverter/charger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Victron SmartSolar MPPT 250/100 VE.Can</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Minimum 2 × SOK 48V rack batteries (10 kWh)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Scalable 2 to 6 batteries (10-30 kWh total)</span>
                  </li>
                </ul>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="text-3xl font-bold text-foreground">$19,550 <span className="text-base font-normal text-muted-foreground">inc GST</span></p>
                </div>
              </div>

              {/* Option 2 */}
              <div className="p-8 rounded-3xl border-2 border-primary bg-card relative">
                <div className="absolute -top-3 left-8">
                  <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    Most Popular
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-sm font-medium text-primary">Option 2</span>
                  <h3 className="text-2xl font-bold text-foreground mt-1">
                    Victron MultiPlus-II 48/8000
                  </h3>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Victron 8 kVA inverter/charger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Victron SmartSolar MPPT 250/100 VE.Can</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Minimum 3 × SOK 48V rack batteries (15 kWh)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Scalable 3 to 6 batteries (15-30 kWh total)</span>
                  </li>
                </ul>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="text-3xl font-bold text-foreground">$23,990 <span className="text-base font-normal text-muted-foreground">inc GST</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Features & Specifications
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with premium components for lasting performance
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {specs.map((spec, index) => {
                const isLast = index === specs.length - 1;
                const isLonelyOnLg = specs.length % 3 === 1;
                
                return (
                  <div 
                    key={index}
                    className={`group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 ${isLast && isLonelyOnLg ? 'lg:col-start-2' : ''}`}
                  >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <spec.icon className={`h-5 w-5 ${spec.iconColor}`} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {spec.label}
                      </span>
                      <p className="text-foreground font-medium text-sm leading-relaxed">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shopify Contact Form Section */}
        <section id="custom-quote" className="py-20 lg:py-28 bg-secondary/30 scroll-mt-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to go Off-Grid the smart way?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and our team will get back to you with a tailored solution.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <iframe
                src="https://us13.list-manage.com/contact-form?u=504cd5e073b29c3e918479b94&form_id=79344e42f279d5170ce82b9b8d5b6c36"
                loading="lazy"
                width="100%"
                height="600"
                frameBorder="0"
                title="Energy Hub Enquiry Form"
                style={{ minHeight: '600px', border: 'none' }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EnergyHub2;
