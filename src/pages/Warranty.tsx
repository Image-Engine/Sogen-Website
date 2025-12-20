import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Clock, Battery, Wrench, AlertTriangle, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Warranty() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">SOK Battery Warranty</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Limited Warranty
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This Limited Warranty covers any defects in material, workmanship or hardware under normal use during the Warranty Period.
            </p>
          </div>
        </section>

        {/* Warranty Overview */}
        <section className="py-12 md:py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card rounded-xl border border-border p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                During the Warranty Period, SOK Battery will repair or replace, at no charge, products or parts of a product that proves defective because of faulty materials, workmanship or hardware under normal use and maintenance.
              </p>
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-foreground font-medium">
                  Please note: We do not cover the cost of return shipping for any warranty claim. This Limited Warranty is not transferable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              
              {/* What will we do */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">What will we do to correct problems?</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>SOK Battery will:</p>
                  <ul className="list-disc list-inside space-y-3 ml-4">
                    <li>
                      Subject to the terms and conditions herein, should the Product be found defective and irreparable, SOK commits to either replace or repair the Product at no cost to the customer, utilizing either new or reconditioned replacement components.
                    </li>
                    <li>
                      In instances involving programmable devices such as charge controllers, chargers and inverters, SOK pledges support to the customer in ensuring accurate configuration of the inverter. Where necessary, SOK will coordinate with the inverter's distributor to address any issues not directly resolvable by SOK.
                    </li>
                    <li>
                      Should the distributor ascertain the hardware has a malfunction and cannot be repaired, the warranty terms of the distributor will then apply.
                    </li>
                  </ul>
                  <p className="text-sm">
                    SOK bears no liability for any expenses borne by the customer or their contractors in the process of diagnosing or substituting the Product. If the returned product is tested and no fault is found, SOK reserves the right to charge the customer for any associated costs, including but not limited to testing, handling, and return freight.
                  </p>
                </div>
              </div>

              {/* Coverage Duration */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">How long does the coverage last?</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>The Warranty Period for batteries purchased from SOK Battery is <strong className="text-foreground">7 or 10 years</strong> depending on model type, from the date of purchase.</li>
                    <li>For all other items excluding batteries have a warranty period of <strong className="text-foreground">12 months</strong> from date of purchase.</li>
                    <li>For all items on clearance a warranty period of <strong className="text-foreground">3 months</strong> applies from the date of purchase.</li>
                  </ul>
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <p className="text-sm">
                      <strong className="text-foreground">Diminished Value:</strong> It is understood that lithium iron phosphate batteries are subject to natural wear and tear over time, and their performance may diminish gradually with use. Therefore, the warrantable value of the product diminishes proportionally over the warranty period. This warranty covers defects that arise during normal use and does not extend to any reduction in battery capacity that occurs as a result of regular usage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Battery Warranty Periods */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Battery className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Battery Warranty Periods</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">7 Years Warranty</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SK12V100</li>
                      <li>• SK12V206</li>
                      <li>• SK12V280</li>
                      <li>• SK24V100</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">10 Years Warranty</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SK48V100</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  A replacement physical goods or part assumes the remaining warranty of the original Physical Good or 1 Year from the date of replacement or repair, whichever is longer.
                </p>
                <div className="mt-4 bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Inverters</h3>
                  <p className="text-sm text-muted-foreground">As per the manufacturers hardware warranties.</p>
                </div>
              </div>

              {/* Clearance Items */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Clearance Items</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>1. Clearance items are strictly limited while stocks last.</li>
                  <li>2. Clearance items may not be eligible for any additional discounts, promotions, or offers unless otherwise stated.</li>
                  <li>3. Clearance items are sold on a first come, first served basis and cannot be reserved, or held. In the event a product is oversold due to technology limitations a refund will be issued.</li>
                  <li>4. All prices are as shown on the site.</li>
                  <li>5. Clearance items are not eligible for a refund if:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>You changed your mind</li>
                      <li>The wrong size or type was ordered</li>
                      <li>You damaged the product yourself</li>
                      <li>Misusing the product and causing a fault</li>
                      <li>Knowing about the defect at purchase</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* What warranty doesn't cover */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">What does this limited warranty not cover?</h2>
                </div>
                <p className="text-muted-foreground mb-4">This Limited Warranty does not cover any problem that is caused by:</p>
                <ol className="text-muted-foreground space-y-3 list-decimal list-inside">
                  <li>Environmental conditions, incorrect installation, malfunctions or damage not resulting from defects in material or workmanship.</li>
                  <li>Damage or malfunctions of batteries arising from a failure to install an appropriate battery balancer and/or neglecting to pre-balance batteries when 12v or 24v batteries are installed in 24v and 48v series configurations.</li>
                  <li>Conditions, malfunctions or damage resulting from negligence, improper maintenance or modification - Damaged or destroyed by natural causes including but not limited to lightning, flood, or other natural disaster - Theft or loss of the Physical Goods.</li>
                  <li>Damage due to improper or inappropriate installation; loose terminal connections, under-sized cabling, incorrect connections (series and parallel) for desired voltage and AH requirements, or reverse polarity connections.</li>
                  <li>Environmental damage; inappropriate storage conditions as defined by the Manufacturer; exposure to extreme hot or cold temperatures, fire or freezing, or water damage.</li>
                  <li>Damage caused by collision or vibration.</li>
                  <li>Damage due to improper maintenance; under- or over-charging the Product, dirty terminal connections.</li>
                  <li>Product that has been opened, modified or tampered with without the express permission of the distributor.</li>
                  <li>Product that was used for applications other than which it was designed and intended for, including repeated engine starting.</li>
                  <li>Product that was used on an over-sized inverter/charger (any inverter/charger that is rated to 3500 Watts or greater) without the use of a Manufacturer-approved current surge limiting device.</li>
                  <li>Product that was under-sized for the application, including an Air Conditioner or similar device having a locked rotor startup current that is not used in conjunction with a Manufacturer-approved surge-limiting device.</li>
                  <li>Product not stored in adherence to the Manufacturer's storage guidelines, including storage of the Product at low state-of-charge.</li>
                </ol>
              </div>

              {/* Download Warranty */}
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 md:p-8 text-center">
                <FileDown className="h-10 w-10 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Download Full Warranty Document</h2>
                <p className="text-muted-foreground mb-6">
                  Get the complete warranty terms and conditions in PDF format.
                </p>
                <Button asChild>
                  <a 
                    href="https://sokbattery.co.nz/wp-content/uploads/2024/07/SOK-Warranty.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Warranty PDF
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
