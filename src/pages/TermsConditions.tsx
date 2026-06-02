import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { FileText, FileSignature, ClipboardList, DollarSign, AlertOctagon, Scale, Package, ShieldAlert, Wrench, UserCheck, ShieldCheck, AlertTriangle, HeartPulse, Lock, CloudLightning, BookOpen, Ban, Edit3, Users, Gavel } from "lucide-react";

type Section = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    icon: FileText,
    title: "1. Definitions",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">1.1</strong> <em>Sogen Energy Ltd, SOGEN, we, us</em> or <em>our</em> means Sogen Energy Ltd and all its subsidiaries, affiliates and each of their respective directors, officers, partners, employees and agents.</p>
        <p><strong className="text-foreground">1.2</strong> <em>Customer, you</em> or <em>yours</em> means SOGEN's customer as defined in the Order.</p>
        <p><strong className="text-foreground">1.3</strong> <em>Materials</em> means any goods or equipment owned by us and/or supplied by us under this Agreement including, but not limited to, electrical equipment or any other goods or equipment related to electrical equipment or installation or maintenance of such equipment and as otherwise set out in the Key Terms.</p>
      </div>
    ),
  },
  {
    icon: FileSignature,
    title: "2. Formation of Agreement",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">2.1</strong> These Terms and Conditions and your acceptance of a quotation from SOGEN, including and incorporating the Key Terms and Acceptance Form (Offer) form a binding legal agreement between you and SOGEN and constitute an order for SOGEN to supply Materials and/or services on the terms set out in our Offer (the Agreement).</p>
        <p><strong className="text-foreground">2.2</strong> You will be deemed to have accepted our Offer and these Terms of Conditions upon the earlier of:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>countersigning the Offer documentation or these Terms and Conditions where indicated and returning the signed documentation to us; or</li>
          <li>communication of your acceptance, (whether orally, in writing, by purchase order, by email or other action consistent with acceptance, subject always to clause 2.4 below) and provision of credit arrangements satisfactory to us.</li>
        </ul>
        <p><strong className="text-foreground">2.3</strong> Unless otherwise stated by us, an Offer remains open for acceptance for 30 days after the date of issue (or, if undated, the date of receipt by you), after which time SOGEN will not be bound by any quoted price(s). If, within 60 days of your acceptance of our Offer pursuant to clause 2.2 (and the formation of an Agreement between you and SOGEN):</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>we remain unable to commence the provision of the agreed Materials and/or services for whatever reason;</li>
          <li>you are unable to provide us with necessary access to any relevant sites and/or materials; or</li>
          <li>the relevant licences, permits or consents have not been granted;</li>
        </ul>
        <p>then we may, at our sole discretion, elect either to terminate this Agreement or to treat the situation as a Variation, which shall be agreed by the parties in accordance with clause 3.3.</p>
        <p><strong className="text-foreground">2.4</strong> This Agreement supersedes all previous communications in relation to the relevant Materials and/or services (whether written or oral), including without limitation any inconsistent terms (a) purported to be included in your acceptance pursuant to clause 2.2 above; (b) in any order from you (including without limitation in any purchase order); and (c) that might be implied by law, trade custom, practice or course of dealing.</p>
        <p><strong className="text-foreground">2.5</strong> Any Variation, Waiver or Cancellation of an order made by the Customer is of no effect unless accepted in writing by SOGEN. If we accept the cancellation then a handling charge of up to 10% may be charged.</p>
      </div>
    ),
  },
  {
    icon: ClipboardList,
    title: "3. Scope of Work",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">3.1</strong> We will provide the Materials and/or services described in the Offer in accordance with industry standards and all relevant legal requirements.</p>
        <p><strong className="text-foreground">3.2</strong> We will be entitled to vary the scope of work under this Agreement, which shall include, without limitation, any changes to the price, quality, scale, supply or timing of the work arising from:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>any verbal or written instruction from you or your representative;</li>
          <li>any deficiency or inaccuracy in the information supplied by you on which we have relied in preparing the Offer;</li>
          <li>any changes in law (including without limitation any statute, regulation, by-law or requirement of any relevant authority) or circumstance not reasonably foreseeable at the time of entering into this Agreement;</li>
          <li>any circumstances that prevent us from providing any Materials or services pursuant to clause 2.3; or</li>
          <li>any other reason agreed to in writing by the parties (Variation).</li>
        </ul>
        <p><strong className="text-foreground">3.3</strong> Where practicable, the parties shall agree in writing the value of any Variation, which shall be based on our standard rates at the time, and its impact on any previously agreed dates relating to the provision of the Materials and/or services. You agree that where the Variation is minor we do not need to obtain your agreement to the Variation. Where agreement is required but the parties are unable to reach agreement, then either party may terminate the Agreement with immediate effect and you shall be required to immediately pay all sums due in relation to the provision of Materials and services up until the date of termination.</p>
        <p><strong className="text-foreground">3.4</strong> If you cancel or terminate this Agreement at any time you agree to pay us any costs that we have incurred in the provision of Materials and services under this Agreement, provided that we will mitigate these costs where we can.</p>
      </div>
    ),
  },
  {
    icon: DollarSign,
    title: "4. Price and Payment",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">4.1</strong> You agree to the price, plus GST (unless otherwise specified), detailed in the Offer.</p>
        <p><strong className="text-foreground">4.2</strong> Subject to any agreed credit arrangements, all Materials and services provided by SOGEN must be paid for before they are provided to you.</p>
        <p><strong className="text-foreground">4.3</strong> If we have agreed to credit arrangements, you will pay the invoiced amounts no later than the 20th of the month following the date of the invoice (or any other date for payment agreed in writing by the parties) (the Due Date).</p>
        <p><strong className="text-foreground">4.4</strong> If you do not pay any sums due by the Due Date then you will be required to pay:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>interest on all overdue amounts, which will be charged at the rate of 2.0% per month compounding, from the Due Date to the date of payment; and</li>
          <li>all costs and expenses (including, without limitation, legal fees on a solicitor client basis, court costs, reasonable costs of administrative time spent attending to any debt collection and debt collection agency costs) reasonably incurred by SOGEN in the collection of overdue accounts and interest.</li>
        </ul>
        <p><strong className="text-foreground">4.5</strong> If you dispute any obligation to pay under any invoice in good faith, you must notify us of the nature of the dispute and the date and number of the invoice within 14 days of receipt of the invoice. If you fail to notify us in that manner, you will be required to pay for the Materials or services on the relevant Due Date. Payment of any undisputed amounts will be required by the Due Date.</p>
        <p><strong className="text-foreground">4.6</strong> Receipt of any electronic payment, cheque or other negotiable instrument shall not be deemed to be payment if dishonoured, cancelled or invalidated.</p>
        <p><strong className="text-foreground">4.7</strong> Part payment of any sums owed to us will not constitute full and final settlement of your total debts unless we have previously agreed in writing to accept the amount paid as full and final settlement of such debts.</p>
        <p><strong className="text-foreground">4.8</strong> If you fail to pay us any amount due by the Due Date, or in the event of any adverse change in your financial circumstances, we may, on notice to you, terminate or suspend the grant of credit to you, or vary the terms upon which we grant credit. If so, you must pay any outstanding debt immediately and pay in advance for any existing order.</p>
        <p><strong className="text-foreground">4.9</strong> Unless otherwise agreed in writing the quoted price is in New Zealand Dollars and is Ex Our Stores and excludes transport and delivery costs, insurance, GST and any import duties, taxes or clearance charges. These are payable by the Customer.</p>
        <p><strong className="text-foreground">4.10</strong> The quoted price may be subject to exchange rate variations up until the date in which the goods are ready for dispatch, these variations will be payable by the Customer.</p>
        <p><strong className="text-foreground">4.11</strong> SOGEN may correct any clerical errors or omissions, whether in computation or otherwise in any quotation, acknowledgements or invoice.</p>
      </div>
    ),
  },
  {
    icon: AlertOctagon,
    title: "5. Default",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">5.1</strong> You shall be in default under this Agreement (Default) if:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>subject to clause 4.5, you do not pay any invoice by the Due Date and fail to remedy this breach within 10 business days of receiving notice from us advising that the payment is overdue;</li>
          <li>you knowingly cause or allow any Materials to be, or become liable to be, removed, destroyed, damaged, endangered, disassembled, concealed from us or made subject to any lien;</li>
          <li>you sell or otherwise dispose of any Materials, or if any Materials become liable to seizure by another creditor; or</li>
          <li>you breach any of your other obligations under this Agreement and fail to remedy such breach within 10 business days of us requesting you to do so.</li>
        </ul>
        <p><strong className="text-foreground">5.2</strong> In the event of any Default, and without prejudice to any other available rights and remedies, SOGEN may:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>suspend or cease all work agreed to under this Agreement;</li>
          <li>terminate the Agreement;</li>
          <li>seize any Materials that are subject to any SOGEN security interest(s);</li>
          <li>enter without notice any premises in order to seize any Materials. You irrevocably authorise SOGEN's agents to enter the premises on which the Materials may be located in order to seize the Materials;</li>
          <li>if necessary, use your equipment to lift and transport the Materials. You indemnify SOGEN against any claim from any third party for damage caused during such entry or seizure and you agree that you have no claim whatsoever against SOGEN for any such damage;</li>
          <li>require payment by you for all completed work and non-returnable Materials received by you; and</li>
          <li>require payment by you of any reasonable costs incurred by SOGEN in association with any of the above.</li>
        </ul>
      </div>
    ),
  },
  {
    icon: Scale,
    title: "6. Set Off",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">6.1</strong> You will pay all amounts due under this Agreement in full without any set-off, counterclaim, deduction or withholding (except for any deduction or withholding required by law).</p>
        <p><strong className="text-foreground">6.2</strong> SOGEN may at any time, at our absolute discretion and without prior notice, set off any amount owing by you to us (whether or not due for payment) against any amount payable by us to you (including without limitation all or any part of any credit balance held by us), regardless of whether or not either liability arises under this Agreement. Any exercise by us of such rights of set off shall not limit or affect any other rights or remedies available to us under this Agreement or otherwise.</p>
      </div>
    ),
  },
  {
    icon: Package,
    title: "7. Ownership, Security and Delivery",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">7.1</strong> SOGEN retains ownership of all Materials supplied to you until we receive your payment in full for those Materials.</p>
        <p><strong className="text-foreground">7.2</strong> The terms "perfected", "proceeds", "purchase money security interest" and "security interest" have the respective meanings given to them in the Personal Property Securities Act 1999 (PPSA).</p>
        <p><strong className="text-foreground">7.3</strong> You grant a security interest to us in each and every part of any Materials supplied to you as security for payment by you for the Materials and for any other amounts owed by you to us from time to time. The security created under and by this Agreement will become enforceable in the event of any Default occurring pursuant to clause 5.1.</p>
        <p><strong className="text-foreground">7.4</strong> You acknowledge that a financing statement may be registered in respect of the security interest granted in the Materials and that you will do all things that we require in order to enable us to: (a) have a perfected security interest in the Materials and a purchase money security interest in each part of the Materials; and (b) exercise any of our rights or powers under this Agreement, whether on enforcement of the security interest or otherwise.</p>
        <p><strong className="text-foreground">7.5</strong> You agree to waive the right to receive a copy of a verification statement under the PPSA.</p>
        <p><strong className="text-foreground">7.6</strong> You agree that (a) your rights as a debtor under sections 116, 120(2), 121, 125, 127, 129 and 131 of the PPSA will not apply to this Agreement; and (b) nothing in sections 114(1)(a), 120(1), 133 and 134 of the PPSA will apply to this Agreement or the security interest granted under this Agreement.</p>
        <p><strong className="text-foreground">7.7</strong> If you do not pay any sums due by the Due Date then, in addition to the payment of interest and any debt collection costs detailed in clause 4.4, you will be required to pay the costs of: (a) our compliance with section 162 of the PPSA; and (b) obtaining any order maintaining registration under section 165 of the PPSA.</p>
        <p><strong className="text-foreground">7.8</strong> SOGEN is the sole owner of any intellectual property rights that arise or are created by our employees or contractors in relation to this Agreement.</p>
        <p><strong className="text-foreground">7.9</strong> All statements or forecasts of delivery times made by SOGEN are made in good faith but are estimates only, not commitments. SOGEN is not bound by any such estimate.</p>
        <p><strong className="text-foreground">7.10</strong> Claims made for damage or loss in transit must be made against the carrier in the prescribed manner.</p>
        <p><strong className="text-foreground">7.11</strong> Prior to acknowledging delivery to the carrier the Customer must ensure that the complete consignment as per the carrier's note has been received. If there is a shortage or visible damage to the outer packaging of the Goods then the Customer must endorse the carrier's note accordingly.</p>
      </div>
    ),
  },
  {
    icon: ShieldAlert,
    title: "8. Risk",
    body: (
      <p><strong className="text-foreground">8.1</strong> Notwithstanding our ownership of any Materials, the risk of damage to or loss of those Materials will fall on you from the time of delivery to your site. You will insure any such Materials for full replacement value from the time of delivery.</p>
    ),
  },
  {
    icon: Wrench,
    title: "9. Defects and Warranty",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">9.1</strong> If you become aware of any defect in any Materials or services supplied by SOGEN, you must advise us in writing as soon as you become aware of such defect.</p>
        <p><strong className="text-foreground">9.2</strong> Warranty terms, periods, and remedies for all Materials supplied by SOGEN are governed by the Sogen Energy Ltd Limited Warranty document (the "Warranty"), as amended from time to time, which is incorporated into this Agreement by reference. In the event of any conflict between these Terms and Conditions and the Warranty, the Warranty shall prevail in respect of warranty-related matters. A current copy of the Warranty is available at sogenenergy.co.nz or on request.</p>
        <p><strong className="text-foreground">9.3</strong> Without limiting the Warranty, the following warranty periods apply from the date of purchase:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>SOK LiFePO₄ batteries: 10 years;</li>
          <li>Energy Hub systems (cabinet, busbars, internal cabling, and other Sogen-supplied hardware): 3 years;</li>
          <li>Victron equipment (inverter/chargers, MPPT controllers, Cerbo GX): covered under Victron's manufacturer warranty, currently 5 years, with SOGEN providing reasonable assistance in the claims process;</li>
          <li>all other Materials: 12 months;</li>
          <li>clearance items: 3 months.</li>
        </ul>
        <p><strong className="text-foreground">9.4</strong> Where a customer connects third-party equipment (including but not limited to additional solar charge controllers, external inverters, additional battery banks, or other devices not supplied by SOGEN as part of the original order) to any Materials supplied by SOGEN, SOGEN accepts no liability for any damage, fault, or performance issue arising from or connected to such third-party equipment. SOGEN is under no obligation to provide troubleshooting, diagnostics, configuration support, or warranty remediation for any issue involving connected third-party equipment. Any such integration is carried out at the customer's sole risk and responsibility.</p>
        <p><strong className="text-foreground">9.5</strong> Energy Hub systems must be installed in accordance with the installation requirements set out in the Warranty. Where installation by a registered or licensed electrician is required and such installation has not been carried out, warranty coverage for the affected components will be void.</p>
      </div>
    ),
  },
  {
    icon: UserCheck,
    title: "10. Your Obligations",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">10.1</strong> In addition to your other obligations detailed in this Agreement, you will:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>provide, free of cost and as soon as practicable, all information in your possession or control that we may require in order to carry out the works, ensuring that any such information does not infringe the copyright or other intellectual property rights of any other person or entity;</li>
          <li>co-operate with SOGEN at all times and not obstruct the proper performance of any services; and</li>
          <li>as soon as practicable after the commencement of this Agreement, allow us to access the locations associated with the provision of the Materials and/or services.</li>
        </ul>
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: "11. Indemnity",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">11.1</strong> You indemnify SOGEN against any loss, damage, claim, demand, liability, cost or expense that we suffer or incur in relation to any claim against SOGEN by a third party (whether in contract, tort (including negligence or breach of statutory duty), misrepresentation (whether innocent or negligent), equity or otherwise) arising from any breach of your obligations under this Agreement, any deficiency in any specification or designs provided by you, your infringement of the intellectual property rights of any third party or your misuse of any Materials and services supplied by us.</p>
        <p><strong className="text-foreground">11.2</strong> This indemnity will survive termination or expiry of this Agreement.</p>
      </div>
    ),
  },
  {
    icon: AlertTriangle,
    title: "12. Limitation of Liability",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">12.1</strong> Subject to clause 12.5, SOGEN will not in any circumstances whatsoever be liable to you (whether in contract, tort (including negligence or breach of statutory duty), misrepresentation (whether innocent or negligent), equity or otherwise) for any loss of profit, revenue, contract(s) or anticipated savings; loss of use, production or loss arising from any production stoppage; costs of arranging alternative energy supply; loss or corruption of data; loss of goodwill; or any indirect, special, consequential or pure economic loss that is suffered by you, your related companies or by any third party arising under or in connection with this Agreement.</p>
        <p><strong className="text-foreground">12.2</strong> Subject to clauses 12.1 and 12.5, our total liability to you arising under or in connection with this Agreement (whether in contract, tort (including negligence or breach of statutory duty), misrepresentation (whether innocent or negligent), equity or otherwise) shall be limited to, at our discretion, either:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>subject to clause 12.3, direct loss or damage to you caused by SOGEN up to an amount not exceeding the total amounts paid by you under this Agreement; or</li>
          <li>the reasonable cost of repairing or replacing defective Materials and/or re-performing defective services provided under this Agreement.</li>
        </ul>
        <p><strong className="text-foreground">12.3</strong> If any loss or damage is caused by Sogen Energy Ltd and another party, we will only be liable for our proportionate share of the costs of replacement, repair or reperformance of the services.</p>
        <p><strong className="text-foreground">12.4</strong> Sogen Energy Ltd will have no liability in respect of any claim for loss or damage arising out of this Agreement that is notified to us three or more years after the date on which the relevant services were provided.</p>
        <p><strong className="text-foreground">12.5</strong> Nothing in this Agreement shall limit or exclude our liability for fraud or fraudulent misrepresentation or for death or personal injury caused by our negligence.</p>
        <p><strong className="text-foreground">12.6</strong> The limitations and exclusions of liability in this Agreement will survive termination or expiry of this Agreement.</p>
      </div>
    ),
  },
  {
    icon: HeartPulse,
    title: "13. Health and Safety",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">13.1</strong> We will provide our services in accordance with all relevant health, safety and environmental requirements and with any site-specific safety requirements that you notified to us at the time you ordered our Materials and/or services.</p>
        <p><strong className="text-foreground">13.2</strong> You must inform us of any workplace hazards to which we may be exposed while on your premises at the time of ordering our Materials and/or services.</p>
        <p><strong className="text-foreground">13.3</strong> We may refuse to perform work if we are not satisfied that it can be performed safely.</p>
      </div>
    ),
  },
  {
    icon: Lock,
    title: "14. Confidentiality",
    body: (
      <p><strong className="text-foreground">14.1</strong> You shall not, at any time during this Agreement and for a period of two years following completion of the services, disclose to any person any confidential information concerning SOGEN's business, affairs, pricing, customers, clients or suppliers except as may be required by law, a court of competent jurisdiction or any governmental or regulatory authority.</p>
    ),
  },
  {
    icon: CloudLightning,
    title: "15. Force Majeure",
    body: (
      <p><strong className="text-foreground">15.1</strong> We shall not in any event be liable to you as a result of any delay or failure to perform our obligations under this Agreement as a result of any strikes, lockouts or other industrial disputes; failure of a utility service or transport network; war, riot, civil commotion or malicious damage; compliance with any law or governmental order, rule, regulation or direction; accident, breakdown of plant or machinery, fire, flood, storm or other acts of God; default of suppliers or subcontractors or any other cause beyond our reasonable control.</p>
    ),
  },
  {
    icon: BookOpen,
    title: "16. Consumer Guarantees Act",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">16.1</strong> Where you acquire, or hold yourself out as acquiring, Materials or services or both for the purposes of a business, the provisions of the Consumer Guarantees Act 1993 will not apply to the supply of Materials or services under this Agreement.</p>
        <p><strong className="text-foreground">16.2</strong> The limitation of liability in clause 12 of this Agreement is not intended to limit any rights a consumer may have under the Consumer Guarantees Act 1993.</p>
      </div>
    ),
  },
  {
    icon: Ban,
    title: "17. No Assignment",
    body: (
      <p><strong className="text-foreground">17.1</strong> You may not assign, transfer, mortgage, charge, subcontract, declare a trust over or deal in any manner with any or all of your rights under this Agreement.</p>
    ),
  },
  {
    icon: Edit3,
    title: "18. Variations and Waivers",
    body: (
      <p><strong className="text-foreground">18.1</strong> Subject to clause 3.3, no variation to or waiver of any part of this Agreement shall be valid or effective unless or until agreed to in writing by SOGEN.</p>
    ),
  },
  {
    icon: Users,
    title: "19. Relationship",
    body: (
      <div className="space-y-3">
        <p><strong className="text-foreground">19.1</strong> Nothing expressed or implied in this Agreement will constitute either party as the agent, partner, employee or officer of, or as a joint venture with, the other party. Neither party will make any contrary representation to any other person nor will they have any authority to act as agent for, or to bind, the other party in any way.</p>
        <p><strong className="text-foreground">19.2</strong> A person who is not a party to this Agreement shall not have any rights to enforce its terms.</p>
      </div>
    ),
  },
  {
    icon: Gavel,
    title: "20. Severability",
    body: (
      <p><strong className="text-foreground">20.1</strong> If any condition or provision of this Agreement is prohibited or rendered invalid or unenforceable, such prohibition, invalidity or unenforceability shall not affect the validity or enforceability of any other provisions and conditions of this Agreement.</p>
    ),
  },
];

export default function TermsConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Terms & Conditions"
        description="Sogen Energy Ltd Terms and Conditions governing the supply of Materials and services, including payment, warranty, liability and delivery."
      />
      <Header />
      <PageBreadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Sogen Energy Ltd</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The terms governing the supply of Materials and services by Sogen Energy Ltd. Please read these carefully before placing an order.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {sections.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-card rounded-xl border border-border p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
                  </div>
                  <div className="text-muted-foreground leading-relaxed">{body}</div>
                </div>
              ))}

              {/* Questions */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Questions?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms and Conditions, please email us at{" "}
                  <a href="mailto:admin@sogenenergy.co.nz" className="text-primary hover:underline">
                    admin@sogenenergy.co.nz
                  </a>
                  .
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
