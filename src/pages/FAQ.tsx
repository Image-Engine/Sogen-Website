import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Battery, Zap, ExternalLink, ArrowRight, HelpCircle, MoreHorizontal } from "lucide-react";

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    questions: [
      {
        q: "Changing over to Lithium",
        a: "Transitioning from lead-acid to lithium batteries is one of the best upgrades you can make for your caravan, motorhome, or off-grid setup. LiFePO4 batteries offer 3-4x more usable capacity, are 60% lighter, and last 10+ years with proper care. The key considerations are: ensuring your charger supports lithium profiles (14.2-14.6V absorption for 12V systems), upgrading to a DC-DC charger if charging from your vehicle, and verifying your inverter settings. SOK batteries are designed as drop-in replacements with built-in BMS protection, making the switch straightforward for most applications.",
        link: "/blog/FAQ/changing-over-to-lithium",
        linkText: "Read our complete guide"
      },
      {
        q: "DC-DC Chargers and why we need them",
        a: "DC-DC chargers are essential when charging lithium batteries from your vehicle's alternator. Unlike lead-acid batteries, lithium batteries have very low internal resistance and can draw excessive current, potentially damaging your alternator. A DC-DC charger acts as an intelligent intermediary—it regulates voltage and current to match the lithium charging profile, isolates the batteries to prevent voltage spikes during engine start/stop, and protects against reverse current flow. Modern DC-DC chargers like those from Victron, Redarc, or Renogy also support solar input, giving you a dual-charging solution. For most setups, we recommend sizing your DC-DC charger to match your driving habits—a 40A unit charges approximately 40Ah per hour of driving.",
        link: "/blog/FAQ/dc-dc-chargers-and-why-we-need-them",
        linkText: "Read our complete guide"
      },
      {
        q: "SOK Battery Unpacking and Initial Charging",
        a: "When your SOK battery arrives, carefully unpack and inspect for any shipping damage—document and photograph anything concerning before proceeding. Batteries are shipped at approximately 50% state of charge per shipping regulations. Before first use: 1) Check the voltage with a multimeter (should read 13.0-13.2V for 12V batteries at 50% SOC), 2) Perform a full charge using a LiFePO4-compatible charger set to 14.2-14.6V absorption and 13.6V float, 3) Allow the battery to rest for 1-2 hours after charging, then check voltage again (should settle around 13.4V). This initial full charge calibrates the BMS and ensures accurate state-of-charge readings going forward.",
        link: "/blog/FAQ/sok-battery-unpacking-and-initial-charging",
        linkText: "Read our complete guide"
      },
      {
        q: "SOK Bluetooth Install & Calibration",
        a: "The SOK Bluetooth module provides real-time monitoring of your battery's voltage, current, temperature, and state of charge directly on your smartphone. Installation is simple: 1) Locate the BMS communication port on your SOK battery (usually near the terminals), 2) Connect the Bluetooth module's cable to the port—it only fits one way, 3) Download the 'SOK Battery' app from the Apple App Store or Google Play, 4) Enable Bluetooth on your phone and open the app to pair with your battery. For accurate SOC calibration, perform a complete charge-discharge-charge cycle after installation. The app will display real-time data including individual cell voltages, which is invaluable for monitoring battery health and diagnosing any issues.",
        link: "/blog/FAQ/sok-bluetooth-install-calibration",
        linkText: "Read our complete guide"
      },
      {
        q: "Understanding MPPT Solar Charge Controller Sizing",
        a: "Properly sizing your MPPT (Maximum Power Point Tracking) solar charge controller ensures you capture maximum energy from your panels without damaging your equipment. The calculation involves two factors: 1) Amperage rating—divide your total solar panel wattage by your battery voltage, then add 25% margin. Example: 400W of solar ÷ 12V = 33A, so choose at least a 40A controller. 2) Voltage rating—ensure the controller's maximum input voltage exceeds your panels' open-circuit voltage (Voc), especially in cold weather when Voc increases by 10-15%. SOK batteries can accept high charge rates (up to 100A for the 206Ah model), so don't undersize your controller. MPPT controllers are 20-30% more efficient than PWM types, making them worth the investment for systems over 200W.",
        link: "/blog/FAQ/understanding-mppt-solar-charge-controller-sizing",
        linkText: "Read our complete guide"
      }
    ]
  },
  {
    id: "batteries-charging",
    title: "Batteries & Charging",
    icon: Battery,
    questions: [
      {
        q: "Charger and Inverter Settings",
        a: "Overview of recommended voltage and current settings for SOK LiFePO4 batteries with common chargers and inverters. Proper configuration ensures safe charging and maximizes battery lifespan.",
        link: "/blog/FAQ/charger-and-inverter-settings",
        linkText: "Read our complete guide"
      },
      {
        q: "Charging Lithium Batteries in Vehicles: Considerations and Safeguards",
        a: "Key considerations for safely charging lithium batteries from your vehicle's electrical system, including alternator compatibility and protection measures.",
        link: "/blog/FAQ/charging-lithium-batteries-in-vehicles-considerations-and-safeguards",
        linkText: "Read our complete guide"
      },
      {
        q: "DC-DC Chargers and why we need them",
        a: "Why DC-DC chargers are essential for protecting both your lithium batteries and vehicle alternator when charging on the road.",
        link: "/blog/FAQ/dc-dc-chargers-and-why-we-need-them",
        linkText: "Read our complete guide"
      },
      {
        q: "Growatt Communication",
        a: "How to establish communication between your SOK batteries and Growatt inverters for integrated monitoring and control.",
        link: "/blog/FAQ/growatt-communication",
        linkText: "Read our complete guide"
      },
      {
        q: "How to Correctly Balance & Setup Your Batteries in Series",
        a: "Step-by-step guide to safely connecting SOK batteries in series while maintaining proper balance across all cells.",
        link: "/blog/FAQ/how-to-correctly-balance-setup-your-batteries-in-series",
        linkText: "Read our complete guide"
      },
      {
        q: "How to Wake Up A Sleeping LIFePO4 Battery",
        a: "Methods to safely reactivate a lithium battery whose BMS has entered protection mode due to low voltage.",
        link: "/blog/FAQ/how-to-wake-up-a-sleeping-lifepo4-battery",
        linkText: "Read our complete guide"
      },
      {
        q: "Managing Victron Over Voltage Alarms with DVCC",
        a: "How to use Victron's DVCC feature to coordinate charging sources and prevent over-voltage alarms with SOK batteries.",
        link: "/blog/FAQ/managing-victron-over-voltage-alarms-with-dvcc",
        linkText: "Read our complete guide"
      },
      {
        q: "SOK - Victron settings",
        a: "Recommended configuration settings for integrating SOK batteries with Victron charge controllers and inverters.",
        link: "/blog/FAQ/sok-victron-settings",
        linkText: "Read our complete guide"
      },
      {
        q: "Understanding MPPT Solar Charge Controller Sizing",
        a: "How to calculate the correct MPPT controller size for your solar array and SOK battery bank.",
        link: "/blog/FAQ/understanding-mppt-solar-charge-controller-sizing",
        linkText: "Read our complete guide"
      },
      {
        q: "Victron Smart Shunt settings for SOK",
        a: "Optimal Smart Shunt configuration for accurate state-of-charge monitoring with SOK LiFePO4 batteries.",
        link: "/blog/FAQ/victron-smart-shunt-settings-for-sok",
        linkText: "Read our complete guide"
      }
    ]
  },
  {
    id: "faqs",
    title: "FAQs",
    icon: HelpCircle,
    questions: [
      {
        q: "Charger and Inverter Settings",
        a: "Recommended voltage and current settings for SOK LiFePO4 batteries with common chargers and inverters.",
        link: "/blog/FAQ/charger-and-inverter-settings",
        linkText: "Read our complete guide",
      },
      {
        q: "Charging Lithium Batteries in Vehicles: Considerations and Safeguards",
        a: "Key considerations for safely charging lithium batteries from your vehicle's electrical system.",
        link: "/blog/FAQ/charging-lithium-batteries-in-vehicles-considerations-and-safeguards",
        linkText: "Read our complete guide",
      },
      {
        q: "DC-DC Chargers and why we need them",
        a: "Why DC-DC chargers are essential for protecting your batteries and vehicle alternator.",
        link: "/blog/FAQ/dc-dc-chargers-and-why-we-need-them",
        linkText: "Read our complete guide",
      },
      {
        q: "How to Correctly Balance & Setup Your Batteries in Series",
        a: "Step-by-step guide to safely connecting SOK batteries in series.",
        link: "/blog/FAQ/how-to-correctly-balance-setup-your-batteries-in-series",
        linkText: "Read our complete guide",
      },
      {
        q: "How to Wake Up A Sleeping LIFePO4 Battery",
        a: "Methods to safely reactivate a battery whose BMS has entered protection mode.",
        link: "/blog/FAQ/how-to-wake-up-a-sleeping-lifepo4-battery",
        linkText: "Read our complete guide",
      },
      {
        q: "SOK - Victron settings",
        a: "Recommended configuration settings for integrating SOK batteries with Victron equipment.",
        link: "/blog/FAQ/sok-victron-settings",
        linkText: "Read our complete guide",
      },
      {
        q: "SOK and AS/NZS3004.2 Certification",
        a: "Information about SOK battery compliance with Australian and New Zealand caravan and motorhome electrical standards.",
        link: "/blog/FAQ/sok-and-as-nzs3004-2-certification",
        linkText: "Read our complete guide",
      },
      {
        q: "SOK Bluetooth Install & Calibration",
        a: "How to install and calibrate the Bluetooth module for real-time battery monitoring.",
        link: "/blog/FAQ/sok-bluetooth-install-calibration",
        linkText: "Read our complete guide",
      },
    ],
  },
  {
    id: "others",
    title: "Others",
    icon: MoreHorizontal,
    questions: [
      {
        q: "Calculating Fuse Sizes",
        a: "How to correctly calculate and select fuse sizes for your SOK battery installation to ensure safety and protection.",
        link: "/blog/FAQ/calculating-fuse-sizes",
        linkText: "Read our complete guide",
      },
      {
        q: "Shipping and Returns",
        a: "Information about our shipping policies, delivery times, and returns process.",
        link: "/blog/FAQ/shipping-and-returns",
        linkText: "Read our complete guide",
      },
      {
        q: "SOK and AS/NZS3004.2 Certification",
        a: "Information about SOK battery compliance with Australian and New Zealand caravan and motorhome electrical standards.",
        link: "/blog/FAQ/sok-and-as-nzs3004-2-certification",
        linkText: "Read our complete guide",
      },
      {
        q: "Solar Assistant Integration",
        a: "How to connect and configure Solar Assistant for monitoring your SOK battery system.",
        link: "/blog/FAQ/solar-assistant-integration",
        linkText: "Read our complete guide",
      },
      {
        q: "Victron - Generator Start/Stop using the Virtual Switch",
        a: "How to configure automatic generator start/stop based on battery state using Victron's Virtual Switch feature.",
        link: "/blog/FAQ/victron-generator-start-stop-using-the-virtual-switch",
        linkText: "Read our complete guide",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="FAQ" description="Frequently asked questions about SOK Battery LiFePO4 lithium batteries, solar solutions, shipping, warranty, and more." />
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about SOK batteries, installation, charging, and technical support.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {faqCategories.map((category) => (
                <div key={category.id} className="bg-card rounded-xl border border-border p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.id}-${index}`}
                        className="border-border"
                      >
                        <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                          <p>{item.a}</p>
                          {item.link && (
                            item.link.startsWith('/') ? (
                              <Link 
                                to={item.link}
                                className="inline-flex items-center gap-1.5 mt-3 text-primary hover:text-primary/80 font-medium transition-colors"
                              >
                                {item.linkText || "Read more"}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            ) : (
                              <a 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-3 text-primary hover:text-primary/80 font-medium transition-colors"
                              >
                                {item.linkText || "Read more"}
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center bg-muted/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our team is here to help with any questions about SOK batteries.
              </p>
              <a 
                href="mailto:info@sokbattery.co.nz" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}