import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Battery, Zap, Settings, HelpCircle, Truck } from "lucide-react";

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    questions: [
      {
        q: "How do I change over from lead-acid to lithium batteries?",
        a: "Switching to lithium batteries involves evaluating your current system's voltage and capacity requirements, ensuring your charger is compatible with LiFePO4 chemistry, and potentially upgrading your DC-DC charger. SOK batteries are designed as drop-in replacements for most applications, but we recommend reviewing your charging equipment settings."
      },
      {
        q: "What should I do when I first receive my SOK battery?",
        a: "When you receive your SOK battery, unpack it carefully and inspect for any shipping damage. Before first use, charge the battery fully using a compatible LiFePO4 charger. This initial charge helps calibrate the Battery Management System (BMS) and ensures optimal performance."
      },
      {
        q: "How do I install and calibrate the SOK Bluetooth module?",
        a: "The SOK Bluetooth module connects to your battery's BMS port. Download the SOK Battery app from your app store, power on your battery, and follow the in-app pairing instructions. After connection, perform a full charge cycle to calibrate the State of Charge (SOC) readings."
      },
      {
        q: "Why do I need a DC-DC charger for lithium batteries?",
        a: "DC-DC chargers are essential because lithium batteries have different charging profiles than lead-acid. They require specific voltage and current curves. A DC-DC charger isolates the battery from the alternator and provides the correct charging algorithm, protecting both your battery investment and vehicle's electrical system."
      },
      {
        q: "How do I size my MPPT solar charge controller?",
        a: "To size your MPPT controller, calculate your solar panel array's total wattage and divide by your battery voltage to get the required amperage. Add a 25% safety margin. For example, 400W of solar at 12V needs at least a 40A controller. SOK batteries can accept high charge rates, so don't undersize your controller."
      }
    ]
  },
  {
    id: "batteries-charging",
    title: "Batteries & Charging",
    icon: Battery,
    questions: [
      {
        q: "What are the recommended charger and inverter settings for SOK batteries?",
        a: "For SOK LiFePO4 batteries, set your charger to: Bulk/Absorption voltage: 14.2-14.6V (12V) or 28.4-29.2V (24V). Float voltage: 13.6V (12V) or 27.2V (24V). Charge current: Up to 0.5C (e.g., 100A for 206Ah battery). Disable temperature compensation and equalization."
      },
      {
        q: "Can I charge lithium batteries while driving my vehicle?",
        a: "Yes, but use a proper DC-DC charger designed for lithium batteries. Never connect directly to your alternator as this can damage both the battery and alternator. Modern DC-DC chargers regulate the charge properly and protect against voltage spikes during engine start/stop."
      },
      {
        q: "How do I set up batteries in series correctly?",
        a: "Before connecting batteries in series, ensure all batteries are at the same voltage (within 0.1V). Charge each battery individually to 100% SOC. Connect positive of one battery to negative of the next. Use a balancer for long-term series operation to prevent capacity drift between batteries."
      },
      {
        q: "How do I wake up a sleeping LiFePO4 battery?",
        a: "If your battery's BMS has entered sleep mode due to low voltage, apply a brief charging voltage to 'wake' it. Connect your charger for 30-60 seconds. If the battery doesn't respond, try a low-current charger (1-2A) first. Never force-charge a deeply discharged battery without monitoring."
      },
      {
        q: "What are the Victron settings for SOK batteries?",
        a: "For Victron equipment with SOK batteries: Absorption voltage: 14.2V, Float: 13.5V, Equalization: OFF, Temperature compensation: OFF, Low voltage disconnect: 12.0V, Rebulk offset: 0.4V. Enable DVCC and set SVS/SCS if using multiple charge sources."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: Settings,
    questions: [
      {
        q: "How do I calculate the correct fuse size for my system?",
        a: "Calculate your maximum expected current draw and add 25-50% safety margin. For example, a 2000W inverter at 12V draws about 167A, so use a 200-250A fuse. Place the fuse as close to the battery positive terminal as possible. Use ANL, MEGA, or Class T fuses rated for DC applications."
      },
      {
        q: "How do I integrate SOK batteries with Solar Assistant?",
        a: "Solar Assistant supports SOK batteries via Bluetooth or serial connection. Configure your SOK battery's communication port, connect to your Solar Assistant device, and select the SOK battery profile in the app. This enables detailed monitoring and logging of battery performance."
      },
      {
        q: "How do I configure Victron Smart Shunt for SOK batteries?",
        a: "In VictronConnect, set: Battery capacity to your SOK battery's Ah rating, Charged voltage: 14.0V, Discharge floor: 20%, Peukert exponent: 1.05, Charge efficiency: 99%, Current threshold: 0.04A. These settings optimize SOC accuracy for lithium chemistry."
      },
      {
        q: "How do I manage Victron over-voltage alarms with DVCC?",
        a: "Enable DVCC (Distributed Voltage and Current Control) in your Victron GX device. Set the 'Limit charge voltage' option and specify your maximum voltage. This coordinates all chargers to prevent over-voltage situations that can trigger BMS protection."
      },
      {
        q: "How do I set up generator start/stop with Victron?",
        a: "Use Victron's Virtual Switch or Generator Start/Stop function in the GX device. Configure start conditions (SOC percentage, battery voltage, load) and stop conditions. Set appropriate delays to prevent short cycling. This automates backup power management."
      }
    ]
  },
  {
    id: "general",
    title: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        q: "Are SOK batteries certified for use in New Zealand?",
        a: "Yes, SOK batteries meet AS/NZS3004.2 certification requirements for electrical installations in caravans and boats in Australia and New Zealand. This ensures they meet local safety and performance standards for mobile applications."
      },
      {
        q: "What warranty do SOK batteries come with?",
        a: "SOK batteries come with an industry-leading warranty. The exact terms depend on the model and application. All warranties cover manufacturing defects and premature capacity loss under normal use conditions. Register your battery after purchase to activate your warranty."
      },
      {
        q: "Can I use SOK batteries in extreme temperatures?",
        a: "SOK batteries feature built-in low-temperature protection. They can discharge from -20°C to 60°C. Charging should occur between 0°C and 45°C. The internal BMS will prevent charging below 0°C to protect cell health. For extreme cold climates, consider models with internal heating."
      },
      {
        q: "How long do SOK batteries last?",
        a: "SOK LiFePO4 batteries are rated for 4000+ cycles at 80% depth of discharge, which equates to over 10 years of daily cycling. Lifespan can be extended by avoiding full discharges and storing at 50% SOC when not in use for extended periods."
      }
    ]
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    icon: Truck,
    questions: [
      {
        q: "How is shipping calculated for batteries?",
        a: "Due to the weight of lithium batteries, shipping is calculated based on your delivery address. We offer free shipping on orders over $500 within New Zealand. Rural delivery may incur additional charges. You'll see the exact shipping cost at checkout."
      },
      {
        q: "What is your returns policy?",
        a: "We accept returns of unused, unopened batteries within 30 days of purchase. Due to safety regulations, batteries that have been installed or show signs of use cannot be returned. Faulty batteries are covered under warranty and will be replaced or repaired."
      },
      {
        q: "How are batteries shipped safely?",
        a: "All SOK batteries are shipped in compliance with lithium battery transport regulations. They're packed in protective materials and shipped via approved carriers. Batteries are shipped at partial charge (approximately 50% SOC) as required by shipping regulations."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
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
                          {item.a}
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