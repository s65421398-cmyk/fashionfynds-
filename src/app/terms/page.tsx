"use client";

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
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing and using FashionFynds ("the Site"), you accept and agree to be bound by these Terms and Conditions of Use. If you do not agree to these terms, please do not use the Site. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Site after changes are posted constitutes acceptance of the modified terms.`
    },
    {
      id: "account",
      title: "2. Account Registration",
      content: `To access certain features of the Site, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`
    },
    {
      id: "purchases",
      title: "3. Purchases and Payments",
      content: `All purchases through the Site are subject to product availability. We reserve the right to refuse or cancel any order for any reason, including pricing errors, product unavailability, or suspected fraud. Prices are subject to change without notice. Payment must be received before we dispatch your order. We accept major credit cards, PayPal, and other payment methods as displayed at checkout. All transactions are processed securely using industry-standard encryption.`
    },
    {
      id: "shipping",
      title: "4. Shipping and Delivery",
      content: `Shipping times are estimates and are not guaranteed. We are not responsible for delays caused by shipping carriers or customs. Risk of loss and title for items pass to you upon delivery to the carrier. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. Please review our Shipping & Returns page for detailed information.`
    },
    {
      id: "returns",
      title: "5. Returns and Refunds",
      content: `We offer returns within 30 days of delivery for most items. Items must be unworn, unwashed, with original tags attached. Final sale items, intimate apparel, and personalized items cannot be returned. Refunds are processed to the original payment method within 5-7 business days of receiving the return. Return shipping is free for US customers. Please see our Shipping & Returns policy for complete details.`
    },
    {
      id: "intellectual",
      title: "6. Intellectual Property",
      content: `All content on the Site, including but not limited to text, graphics, logos, images, and software, is the property of FashionFynds or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without express written permission.`
    },
    {
      id: "prohibited",
      title: "7. Prohibited Activities",
      content: `You agree not to: (a) use the Site for any unlawful purpose; (b) attempt to gain unauthorized access to the Site or its systems; (c) interfere with or disrupt the Site or servers; (d) collect information about other users without consent; (e) transmit viruses or malicious code; (f) impersonate any person or entity; (g) engage in any activity that could damage our reputation or business; (h) use automated systems to access the Site without permission.`
    },
    {
      id: "product-info",
      title: "8. Product Information and Authenticity",
      content: `We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. All products sold on FashionFynds are 100% authentic and sourced from authorized distributors. If you receive a counterfeit item, we will provide a full refund and investigate the matter thoroughly.`
    },
    {
      id: "user-content",
      title: "9. User-Generated Content",
      content: `By submitting reviews, comments, or other content to the Site, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content. You represent that you own or have the necessary rights to the content you submit and that it does not violate any third-party rights or applicable laws.`
    },
    {
      id: "privacy",
      title: "10. Privacy",
      content: `Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data collection and use practices. By using the Site, you consent to the collection and use of your information as described in the Privacy Policy.`
    },
    {
      id: "disclaimer",
      title: "11. Disclaimer of Warranties",
      content: `THE SITE AND ALL CONTENT, PRODUCTS, AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.`
    },
    {
      id: "limitation",
      title: "12. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, FASHIONFYNDS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR GOODWILL. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE PRODUCT OR SERVICE THAT GAVE RISE TO THE CLAIM.`
    },
    {
      id: "indemnification",
      title: "13. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless FashionFynds, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including attorney's fees, arising out of or in any way connected with your access to or use of the Site, your violation of these Terms, or your infringement of any intellectual property or other rights of any person or entity.`
    },
    {
      id: "governing-law",
      title: "14. Governing Law and Dispute Resolution",
      content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be resolved through binding arbitration in Mumbai, Maharashtra, except that we may seek injunctive relief in any court of competent jurisdiction. You waive any right to a jury trial or to participate in a class action.`
    },
    {
      id: "termination",
      title: "15. Termination",
      content: `We reserve the right to terminate or suspend your account and access to the Site at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason in our sole discretion. Upon termination, your right to use the Site will immediately cease.`
    },
    {
      id: "miscellaneous",
      title: "16. Miscellaneous",
      content: `These Terms constitute the entire agreement between you and FashionFynds regarding the Site. If any provision is found to be unenforceable, the remaining provisions will remain in full effect. Our failure to enforce any right or provision shall not be deemed a waiver. These Terms may not be assigned by you without our prior written consent. Section headings are for convenience only and have no legal effect.`
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
                <Scale className="w-12 h-12 text-[#1BA6A6] mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Terms & Conditions
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  Last Updated: December 6, 2025
                </p>
                <p className="text-sm text-muted-foreground">
                  Please read these terms carefully before using FashionFynds
                </p>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="py-8 bg-white border-b sticky top-20 z-10 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {sections.slice(0, 6).map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-sm whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-[#1BA6A6] hover:text-white transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Important Notice */}
          <section className="py-8 bg-orange-50 border-b border-orange-200">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto flex gap-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Important Notice</h3>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    By using FashionFynds, you agree to these Terms and Conditions. Please read them carefully. 
                    If you do not agree to these terms, you should not use our website or services. 
                    We may update these terms from time to time, and your continued use signifies acceptance of any changes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Terms Content */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-12">
                  {sections.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-32">
                      <h2 className="text-2xl font-bold mb-4 text-[#1BA6A6]">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="mt-16 p-8 bg-linear-to-br from-teal-50 to-white rounded-2xl border">
                  <div className="flex gap-4">
                    <FileText className="w-8 h-8 text-[#1BA6A6] shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Questions About These Terms?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        If you have any questions or concerns about these Terms and Conditions, 
                        please contact our legal team.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          <a href="mailto:legal@fashionfynds.com" className="text-[#1BA6A6] hover:underline">
                            legal@fashionfynds.com
                          </a>
                        </p>
                        <p>
                          <span className="font-medium">Address:</span> 123 Fashion Avenue, Mumbai, MH 400001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="py-16 bg-linear-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Related Policies</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href="/privacy"
                    className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all text-center group"
                  >
                    <Shield className="w-8 h-8 text-[#1BA6A6] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-2">Privacy Policy</h3>
                    <p className="text-sm text-muted-foreground">How we protect your data</p>
                  </a>
                  <a
                    href="/shipping"
                    className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all text-center group"
                  >
                    <FileText className="w-8 h-8 text-[#1BA6A6] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-2">Shipping & Returns</h3>
                    <p className="text-sm text-muted-foreground">Delivery and return info</p>
                  </a>
                  <a
                    href="/faq"
                    className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all text-center group"
                  >
                    <FileText className="w-8 h-8 text-[#1BA6A6] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-2">FAQ</h3>
                    <p className="text-sm text-muted-foreground">Common questions</p>
                  </a>
                </div>
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
