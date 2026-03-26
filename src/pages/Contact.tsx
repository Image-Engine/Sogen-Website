import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about SOK batteries? Our team is here to help with sales inquiries and technical assistance.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Sales inquiries & technical assistance
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        Please use the contact form to email us
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Warehouse Pickup</h3>
                      <p className="text-muted-foreground">
                        Nelson, New Zealand
                      </p>
                      <p className="text-sm text-muted-foreground/80 mt-1">
                        By appointment only
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Pickup Hours</h3>
                      <p className="text-muted-foreground">
                        Monday – Friday: 9am – 4pm
                      </p>
                      <p className="text-sm text-muted-foreground/80 mt-1">
                        Appointment required
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tally Contact Form */}
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Email Us
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <iframe
                  data-tally-src="https://tally.so/embed/LZ7DM2?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Contact Form"
                  style={{ minHeight: '400px' }}
                ></iframe>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w;s.onload=v;s.onerror=v;d.body.appendChild(s);}
                    `
                  }}
                />
              </div>
            </div>

            {/* Additional Note */}
            <div className="mt-12 text-center bg-muted/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-muted-foreground mb-4">
                Check out our FAQ section for answers to common questions about SOK batteries.
              </p>
              <Link 
                to="/faq"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
