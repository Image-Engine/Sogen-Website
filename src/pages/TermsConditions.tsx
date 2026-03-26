import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export default function TermsConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms & Conditions of Sale
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our website or making a purchase.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card rounded-xl border border-border p-6 md:p-10 space-y-8">
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing the website at sokbattery.co.nz, you are agreeing to be bound by the Terms and Conditions of Solagen NZ Ltd, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Use Licence</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials (information or software) on Solagen NZ Ltd's website for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
                  <li>Attempt to decompile or reverse engineer any software contained on Solagen NZ Ltd's website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  This licence shall automatically terminate if you violate any of these restrictions and may be terminated by Solagen NZ Ltd at any time. Upon terminating your viewing of these materials or upon the termination of this licence, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on Solagen NZ Ltd's website are provided on an 'as is' basis. Solagen NZ Ltd makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Further, Solagen NZ Ltd does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. This disclaimer relates only to the use of the website and its content. It does not affect any manufacturer warranties or guarantees that apply to physical products, such as batteries, which are covered separately under their stated warranty terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">4. Limitations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Solagen NZ Ltd or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials and products on Solagen NZ Ltd's website, even if Solagen NZ Ltd or a Solagen NZ Ltd authorised representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">5. Accuracy of Materials</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials and information appearing on Solagen NZ Ltd's website could include technical, typographical, or photographic errors. Solagen NZ Ltd does not warrant that any of the materials or information on its website are accurate, complete, or current. Solagen NZ Ltd may make changes to the materials contained on its website at any time without notice. Solagen NZ Ltd does not make any commitment to update the materials or information. In the event of a price change from a drop-shipped supplier, Solagen NZ Ltd reserves the right to adjust pricing accordingly and is not obligated to honour previously listed prices.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">6. Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Solagen NZ Ltd has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Solagen NZ Ltd of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">7. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Solagen NZ Ltd may revise these Terms and Conditions for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">8. Shipping</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We ship the next day after receiving an online order using either Mainfreight or Parcel Express, depending on the weight of product or the location of the delivery address.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">9. Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In the unlikely event of a dispute or any claim arising from these Terms of Trade, it shall be resolved through arbitration under the provisions of the Arbitration Act 1996. If the parties involved are unable to resolve the dispute within one month after providing written notification, arbitration will be pursued. However, it is important to note that this clause does not restrict either party from seeking immediate equitable relief through the NZ courts.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and interpreted in accordance with the Consumer Guarantees Act and the laws of New Zealand.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground">Questions?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any further questions regarding our return policy or our terms and conditions, please feel free to email us at{" "}
                  {/* HIDDEN - Phone temporarily removed: <a href="tel:098710505" className="text-primary hover:underline">09 871 0505</a> or */}
                  <a href="mailto:admin@sokbattery.co.nz" className="text-primary hover:underline">admin@sokbattery.co.nz</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
