"use client";

export const dynamic = "force-dynamic";


import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import { Product } from "@/types/product";
import { Shield, Lock, Eye, UserCheck, Database, Globe, Bell, Trash2 } from "lucide-react";

export default function PrivacyPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sections = [
    {
      id: "collection",
      icon: Database,
      title: "1. Information We Collect",
      content: `We collect information that you provide directly to us, including:

• Personal Information: Name, email address, phone number, shipping and billing addresses, payment information
• Account Information: Username, password, preferences, order history
• Communication Data: Customer service inquiries, reviews, survey responses
• Automatically Collected Information: IP address, browser type, device information, cookies, usage data, location data
• Third-Party Data: Information from social media platforms when you choose to connect your account`
    },
    {
      id: "usage",
      icon: Eye,
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

• Process and fulfill your orders, including shipping and customer service
• Communicate with you about orders, products, services, and promotional offers
• Improve and personalize your shopping experience
• Detect, prevent, and address fraud, security issues, and technical problems
• Analyze usage trends and preferences to enhance our website and services
• Send marketing communications (with your consent)
• Comply with legal obligations and enforce our Terms & Conditions
• Conduct research and analysis to improve our products and services`
    },
    {
      id: "sharing",
      icon: Globe,
      title: "3. Information Sharing and Disclosure",
      content: `We may share your information with:

• Service Providers: Payment processors, shipping carriers, marketing agencies, analytics providers
• Business Partners: Brands and retailers whose products we sell (limited to what's necessary)
• Legal Requirements: When required by law, court order, or to protect our rights
• Business Transfers: In connection with a merger, acquisition, or sale of assets
• With Your Consent: When you explicitly agree to share information

We do NOT sell your personal information to third parties for their marketing purposes.`
    },
    {
      id: "security",
      icon: Lock,
      title: "4. Data Security",
      content: `We implement industry-standard security measures to protect your information:

• SSL/TLS encryption for all data transmission
• PCI DSS compliance for payment card information
• Secure servers with firewall protection
• Regular security audits and vulnerability assessments
• Employee training on data protection practices
• Access controls and authentication measures

However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`
    },
    {
      id: "cookies",
      icon: Bell,
      title: "5. Cookies and Tracking Technologies",
      content: `We use cookies and similar technologies to:

• Remember your preferences and settings
• Analyze website traffic and user behavior
• Personalize content and advertisements
• Authenticate your account and prevent fraud
• Improve website performance and functionality

You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.`
    },
    {
      id: "rights",
      icon: UserCheck,
      title: "6. Your Privacy Rights",
      content: `Depending on your location, you may have the right to:

• Access: Request a copy of the personal information we hold about you
• Correction: Request correction of inaccurate or incomplete information
• Deletion: Request deletion of your personal information (subject to legal obligations)
• Opt-Out: Unsubscribe from marketing emails at any time
• Data Portability: Receive your data in a structured, machine-readable format
• Object: Object to processing of your personal information for certain purposes
• Withdraw Consent: Withdraw consent where processing is based on consent

To exercise these rights, please contact us at privacy@fashionfynds.com`
    },
    {
      id: "retention",
      icon: Database,
      title: "7. Data Retention",
      content: `We retain your personal information for as long as necessary to:

• Fulfill the purposes for which it was collected
• Comply with legal, accounting, or reporting requirements
• Resolve disputes and enforce our agreements
• Maintain business records

When information is no longer needed, we securely delete or anonymize it. Account information is retained while your account is active and for a reasonable period thereafter.`
    },
    {
      id: "international",
      icon: Globe,
      title: "8. International Data Transfers",
      content: `FashionFynds operates globally, and your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including:

• Standard contractual clauses approved by regulatory authorities
• Privacy Shield certification (where applicable)
• Adequacy decisions for data transfers

By using our services, you consent to the transfer of your information to the United States and other countries.`
    },
    {
      id: "children",
      icon: Shield,
      title: "9. Children's Privacy",
      content: `Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.`
    },
    {
      id: "thirdparty",
      icon: Globe,
      title: "10. Third-Party Links",
      content: `Our website may contain links to third-party websites, including social media platforms and partner sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.`
    },
    {
      id: "gdpr",
      icon: Shield,
      title: "11. GDPR Compliance (EU Users)",
      content: `If you are located in the European Union, you have additional rights under GDPR:

• Right to be informed about data collection and use
• Right of access to your personal data
• Right to rectification of inaccurate data
• Right to erasure ("right to be forgotten")
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Rights related to automated decision-making

Our lawful basis for processing includes consent, contract performance, legal obligations, and legitimate interests. You may lodge a complaint with your local data protection authority.`
    },
    {
      id: "ccpa",
      icon: Shield,
      title: "12. CCPA Compliance (California Users)",
      content: `California residents have specific rights under the California Consumer Privacy Act (CCPA):

• Right to know what personal information is collected, used, shared, or sold
• Right to delete personal information
• Right to opt-out of the sale of personal information (we do not sell personal information)
• Right to non-discrimination for exercising your privacy rights

To submit a request, contact us at privacy@fashionfynds.com with "California Privacy Rights" in the subject line.`
    },
    {
      id: "changes",
      icon: Bell,
      title: "13. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:

• Posting the updated policy on our website with the "Last Updated" date
• Sending an email notification (for significant changes)
• Displaying a prominent notice on our website

Your continued use of our services after changes are posted constitutes acceptance of the updated policy.`
    },
    {
      id: "contact",
      icon: Trash2,
      title: "14. Contact Us & Data Deletion",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Email: privacy@fashionfynds.com
Phone: +1 (555) 123-4567
Mail: Privacy Team, FashionFynds, 123 Fashion Avenue, Mumbai, MH 400001

To request deletion of your data, email us with "Data Deletion Request" in the subject line. We will respond within 30 days and process your request in accordance with applicable laws.`
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Your Data is Protected",
      description: "Industry-leading security measures and encryption"
    },
    {
      icon: Lock,
      title: "We Don't Sell Your Data",
      description: "Your personal information is never sold to third parties"
    },
    {
      icon: UserCheck,
      title: "You Have Control",
      description: "Access, modify, or delete your data anytime"
    },
    {
      icon: Globe,
      title: "GDPR & CCPA Compliant",
      description: "Full compliance with international privacy laws"
    }
  ];

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          onAuthOpen={() => setAuthOpen(true)}
        />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-linear-to-br from-teal-50 to-white py-12 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Shield className="w-12 h-12 text-[#1BA6A6] mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  Last Updated: December 6, 2025
                </p>
                <p className="text-sm text-muted-foreground">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Highlights */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {highlights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="bg-linear-to-br from-teal-50 to-white rounded-xl p-6 border text-center"
                      >
                        <Icon className="w-8 h-8 text-[#1BA6A6] mx-auto mb-3" />
                        <h3 className="font-bold mb-2 text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="py-6 bg-gray-50 border-y sticky top-20 z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <p className="text-sm font-medium mb-3">Jump to Section:</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {sections.slice(0, 7).map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-white border hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors"
                    >
                      {section.title.replace(/^\d+\.\s/, "")}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Content */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-12">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <div key={section.id} id={section.id} className="scroll-mt-28">
                        <div className="flex items-start gap-4 mb-4">
                          <Icon className="w-6 h-6 text-[#1BA6A6] shrink-0 mt-1" />
                          <h2 className="text-2xl font-bold text-[#1BA6A6]">
                            {section.title}
                          </h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line pl-10">
                          {section.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 bg-linear-to-r from-[#1BA6A6] to-teal-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
                <p className="text-lg mb-8 text-teal-50">
                  Our privacy team is here to help you understand how we protect your data
                </p>
                <a
                  href="mailto:privacy@fashionfynds.com"
                  className="inline-block bg-white text-[#1BA6A6] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Privacy Team
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Modals */}
        <ShoppingCart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => setCheckoutOpen(true)}
        />
        <WishlistSheet
          open={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          onProductClick={setSelectedProduct}
        />
        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onProductSelect={setSelectedProduct}
        />
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
  );
}
