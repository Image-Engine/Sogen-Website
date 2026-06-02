import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Shield, Clock, Battery, Wrench, AlertTriangle, FileDown, User, Scale, Truck, Zap, Tag, Gauge, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Warranty() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Warranty" description="Sogen Energy warranty information. Coverage for SOK LiFePO4 batteries, Energy Hub systems, Victron equipment and more." />
      <Header />
      <PageBreadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Sogen Energy Warranty</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Limited Warranty
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This Limited Warranty covers defects in materials, workmanship, or hardware under normal use and maintenance during the Warranty Period.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">

              {/* 1. Coverage */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">1. Coverage</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  This Limited Warranty covers defects in materials, workmanship, or hardware under normal use and maintenance during the Warranty Period.
                </p>
              </div>

              {/* 2. Who Is Covered */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">2. Who Is Covered</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  This Limited Warranty applies only to the original purchaser and is not transferable. Proof of purchase is required for all claims.
                </p>
              </div>

              {/* 3. What We Will Do */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">3. What We Will Do to Correct Problems</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Subject to the terms below, if a Product is found to be defective during the Warranty Period, Sogen Energy Ltd will, at its option:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Repair the Product; or</li>
                    <li>Replace the Product (or defective component) with a new or reconditioned equivalent; or</li>
                    <li>Where repair or replacement is not reasonably available, provide a remedy consistent with this warranty.</li>
                  </ul>
                  <p>
                    Sogen Energy Ltd bears no liability for any expenses borne by the customer or their contractors in the process of diagnosing, removing, reinstalling, commissioning, or substituting the Product.
                  </p>
                  <p className="text-sm">
                    If a returned Product is tested and found not to be faulty, Sogen Energy Ltd reserves the right to charge the customer for reasonable associated costs, including but not limited to testing, handling, and return freight.
                  </p>
                </div>
              </div>

              {/* 4. Pro-rata Remedy */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Battery className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">4. Batteries – Pro-rata Remedy</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Lithium iron phosphate batteries experience normal wear over time. Any remedy provided for a battery claim may be provided on a pro-rata basis based on time in service, rather than a like-for-like brand new replacement.
                  </p>
                  <p>Depending on the age of the battery and the nature of the defect, the remedy may be:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A repair; or</li>
                    <li>A reconditioned replacement; or</li>
                    <li>A partial credit or contribution toward a replacement battery.</li>
                  </ul>
                  <p>
                    Any pro-rata value will be calculated based on the remaining portion of the applicable Warranty Period. This warranty does not cover normal capacity reduction over time (see section 7).
                  </p>
                </div>
              </div>

              {/* 5. Coverage Duration */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">5. How Long Does the Coverage Last?</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Warranty periods from the date of purchase are as follows:</p>
                  <ul className="list-disc list-inside space-y-3 ml-4">
                    <li><strong className="text-foreground">SOK LiFePO₄ Batteries:</strong> 10-year Warranty Period.</li>
                    <li><strong className="text-foreground">Energy Hub Systems</strong> (cabinet, busbars, internal cabling, and other Sogen-manufactured or supplied hardware): 3 years from date of purchase.</li>
                    <li><strong className="text-foreground">Victron Equipment</strong> (inverter/chargers, MPPT solar charge controllers, Cerbo GX and related Victron devices): covered under Victron's applicable manufacturer warranty (currently 5 years). Sogen Energy Ltd will assist with the warranty process where reasonably required; however, Victron's warranty terms and assessment outcomes apply.</li>
                    <li><strong className="text-foreground">All other items</strong> (excluding batteries): 12 months from the date of purchase, unless otherwise stated.</li>
                    <li><strong className="text-foreground">Clearance items:</strong> 3 months from the date of purchase.</li>
                    <li><strong className="text-foreground">Repairs and replacements:</strong> A repaired or replaced Product assumes the remaining warranty of the original Product or 1 year from the date of replacement or repair, whichever is longer.</li>
                  </ul>
                </div>
              </div>

              {/* 6. Energy Hub Systems */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">6. Energy Hub Systems – Specific Terms</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">6.1 What Is Covered</h3>
                    <p className="mb-3">
                      The Energy Hub warranty covers defects in the Sogen Energy-supplied cabinet, internal busbars, internal DC cabling, and any other hardware shipped as part of the standard Energy Hub configuration. Standard shipped components include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Cabinet enclosure</li>
                      <li>Internal DC busbars and cabling</li>
                      <li>Victron inverter/charger (warranty per section 5)</li>
                      <li>Victron MPPT solar charge controller (warranty per section 5)</li>
                      <li>Victron Cerbo GX (warranty per section 5)</li>
                      <li>SOK LiFePO₄ rack batteries (warranty per section 5)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">6.2 Installation Requirements</h3>
                    <p className="mb-3">The following installation requirements apply as a condition of this warranty:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Energy Hub units that require internal electrical connections or hardwired installation must be installed by a registered or licensed electrician.</li>
                      <li>Units shipped with pre-wired internal components and external input/output connection points only, and which carry a valid Code of Compliance (CoC) for the pre-wired assembly, may be connected by the purchaser without a licensed electrician, provided no internal wiring is modified or extended.</li>
                      <li>Notwithstanding clause 6.2(b), connection of any solar array operating above 120V DC must be performed by a registered electrician or suitably qualified person in accordance with applicable local regulations.</li>
                      <li>Any modification to internal wiring or installation that is inconsistent with the original CoC will void warranty coverage for affected components.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">6.3 Third-Party Equipment Integration – Exclusions</h3>
                    <p className="mb-3">
                      The Energy Hub is designed to operate as a complete, pre-configured system. Where a customer elects to connect third-party equipment to the Energy Hub — including but not limited to additional solar charge controllers, external inverters, additional battery banks, generator interfaces, or building management systems — the following exclusions apply:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Sogen Energy Ltd provides no warranty, support, or liability in relation to the performance, compatibility, or safe operation of third-party equipment connected to the Energy Hub.</li>
                      <li>Sogen Energy Ltd is not obligated to provide troubleshooting, diagnostics, configuration support, or remediation for any system issues arising from or involving connected third-party equipment.</li>
                      <li>Any damage to the Energy Hub or its components caused directly or indirectly by connected third-party equipment will not be covered under this warranty.</li>
                      <li>Integration issues between the Energy Hub and third-party equipment are the sole responsibility of the customer and/or their installing contractor.</li>
                    </ul>
                    <div className="bg-muted/50 rounded-lg p-4 mt-4">
                      <p className="text-sm">
                        For customers requiring integration support, Sogen Energy Ltd may offer paid professional services at its discretion. Contact <a href="mailto:support@sogenenergy.co.nz" className="text-primary hover:underline">support@sogenenergy.co.nz</a> for enquiries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Capacity */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">7. Capacity and Normal Wear</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Lithium iron phosphate batteries naturally experience gradual capacity reduction over time with normal use. This Limited Warranty covers defects and does not cover normal capacity reduction due to wear and tear.
                </p>
              </div>

              {/* 8. Inverter/Charger */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">8. Inverter / Charger Support and Warranty (Including Victron)</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p><strong className="text-foreground">Configuration support:</strong> For programmable devices such as charge controllers, chargers, and inverter/chargers, Sogen Energy Ltd may provide reasonable support to help confirm the correct configuration.</p>
                  <p><strong className="text-foreground">Hardware warranty:</strong> Inverter/charger hardware warranties (including Victron products) are covered under the applicable manufacturer/distributor warranty terms. Sogen Energy Ltd will assist with the warranty process where reasonably required; however, the distributor/manufacturer warranty terms and assessment outcomes apply.</p>
                </div>
              </div>

              {/* 9. Shipping */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">9. Shipping and Other Costs</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    To the extent permitted by law, this Limited Warranty does not cover shipping charges, handling charges, taxes, or any costs associated with removal or reinstallation of Products.
                  </p>
                  <p>Return freight for warranty claims is the customer's responsibility unless required by applicable law.</p>
                </div>
              </div>

              {/* 10. Clearance */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">10. Clearance Items – Sales Terms</h2>
                </div>
                <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Clearance items are strictly limited while stocks last.</li>
                  <li>Clearance items may not be eligible for any additional discounts, promotions, or offers unless otherwise stated.</li>
                  <li>Clearance items are sold on a first come, first served basis and cannot be reserved or held. If a product is oversold due to technology limitations, a refund will be issued.</li>
                  <li>All prices are as shown on the site.</li>
                  <li>Clearance items are not eligible for a change-of-mind refund if you changed your mind, ordered the wrong size/type, damaged the product, misused the product causing a fault, or were aware of a defect at purchase. This does not affect your rights in relation to faulty or misdescribed goods.</li>
                </ol>
              </div>

              {/* 11. Exclusions */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">11. What This Limited Warranty Does Not Cover</h2>
                </div>
                <p className="text-muted-foreground mb-4">This Limited Warranty does not cover any problem that is caused by:</p>
                <ol className="text-muted-foreground space-y-3 list-decimal list-inside">
                  <li>Environmental conditions, incorrect installation, malfunctions or damage not resulting from defects in material or workmanship.</li>
                  <li>Damage or malfunctions of batteries arising from a failure to install an appropriate battery balancer and/or neglecting to pre-balance batteries when 12V or 24V batteries are installed in 24V and 48V series configurations.</li>
                  <li>Negligence, improper maintenance or modification; damage or destruction by natural causes including but not limited to lightning, flood, or other natural disasters; theft or loss of the Products.</li>
                  <li>Damage due to improper or inappropriate installation; loose terminal connections, under-sized cabling, incorrect connections (series and parallel) for desired voltage and Ah requirements, or reverse polarity connections.</li>
                  <li>Environmental damage; inappropriate storage conditions as defined by the manufacturer; exposure to extreme hot or cold temperatures, fire or freezing, or water damage.</li>
                  <li>Damage caused by collision, impact, or excessive vibration.</li>
                  <li>Damage due to improper maintenance; under- or over-charging the Product, dirty terminal connections.</li>
                  <li>Product that has been opened, modified or tampered with without the express written permission of Sogen Energy Ltd or an authorised distributor.</li>
                  <li>Product used for applications other than which it was designed and intended for, including repeated engine starting unless specifically specified as suitable.</li>
                  <li>Product used with loads or inverter/charger configurations that exceed the Product's specifications, including high locked-rotor / high inrush appliances (for example air conditioners) without an appropriate, manufacturer-approved surge-limiting solution.</li>
                  <li>Any damage, fault, or system issue arising from the connection of third-party equipment not supplied by Sogen Energy Ltd as part of the original system.</li>
                </ol>
              </div>

              {/* 12. Statutory Rights */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">12. Statutory Rights (New Zealand)</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  This Limited Warranty is in addition to, and does not exclude, restrict, or modify, any rights or remedies you may have under applicable consumer laws, including the New Zealand Consumer Guarantees Act 1993 where applicable.
                </p>
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
