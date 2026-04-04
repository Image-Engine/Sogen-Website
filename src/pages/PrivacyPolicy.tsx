import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Shield, User, Cookie, Lock, Share2, FileText, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Privacy Policy" description="Privacy policy for SOK Battery NZ. How we collect, use, and protect your personal information." />
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How SOK Battery New Zealand collects, uses, and protects your personal information.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              
              {/* Personal Information */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Personal Identification Information</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, fill out a form, subscribe to the newsletter and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and credit card information.
                  </p>
                  <p>
                    We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.
                  </p>
                </div>
              </div>

              {/* Non-personal Information */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Non-personal Identification Information</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
                </p>
              </div>

              {/* Cookies */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Web Browser Cookies</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.
                </p>
              </div>

              {/* How we use information */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">How We Use Collected Information</h2>
                </div>
                <p className="text-muted-foreground mb-4">SOK Battery New Zealand collects and uses Users personal information for the following purposes:</p>
                <ul className="space-y-4 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">To improve customer service</strong>
                    <p className="mt-1">Your information helps us to more effectively respond to your customer service requests and support needs.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">To personalize user experience</strong>
                    <p className="mt-1">We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">To improve our Site</strong>
                    <p className="mt-1">We continually strive to improve our website offerings based on the information and feedback we receive from you.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">To process transactions</strong>
                    <p className="mt-1">We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">To administer a content, promotion, survey or other Site feature</strong>
                    <p className="mt-1">To send Users information they agreed to receive about topics we think will be of interest to them.</p>
                  </li>
                  <li>
                    <strong className="text-foreground">To send periodic emails</strong>
                    <p className="mt-1">The email address Users provide for order processing, will only be used to send them information and updates pertaining to their order. It may also be used to respond to their inquiries, and/or other requests or questions. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Site.</p>
                  </li>
                </ul>
              </div>

              {/* How we protect information */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">How We Protect Your Information</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.
                  </p>
                  <p>
                    Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.
                  </p>
                </div>
              </div>

              {/* Sharing information */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Sharing Your Personal Information</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.
                </p>
              </div>

              {/* Policy changes */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  SOK Battery New Zealand has the discretion to update this privacy policy at any time. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
                </p>
              </div>

              {/* Acceptance */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Acceptance of These Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Contacting Us</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-semibold text-foreground">SOK Battery New Zealand</p>
                  <p>
                    <a href="https://www.sokbattery.co.nz" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      www.sokbattery.co.nz
                    </a>
                  </p>
                  <p>Nelson, New Zealand</p>
                  {/* HIDDEN - Phone temporarily removed
                  <p>
                    <a href="tel:098710505" className="text-primary hover:underline">09 871 0505</a>
                  </p>
                  */}
                  <p>
                    <a href="mailto:sales@sokbattery.co.nz" className="text-primary hover:underline">sales@sokbattery.co.nz</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
