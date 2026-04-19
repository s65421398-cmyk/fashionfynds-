"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Eye, Keyboard, MousePointer, Volume2, Monitor, Mail } from "lucide-react";

export default function AccessibilityPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const features = [
    {
      icon: Keyboard,
      title: "Keyboard Navigation",
      description: "Full keyboard accessibility for all interactive elements. Use Tab to navigate, Enter to select, and Escape to close modals.",
    },
    {
      icon: Eye,
      title: "Screen Reader Support",
      description: "Semantic HTML and ARIA labels ensure compatibility with screen readers like JAWS, NVDA, and VoiceOver.",
    },
    {
      icon: Monitor,
      title: "Responsive Design",
      description: "Our website adapts to all screen sizes and supports zoom up to 200% without loss of functionality.",
    },
    {
      icon: MousePointer,
      title: "Focus Indicators",
      description: "Clear visual focus indicators help keyboard users track their position on the page.",
    },
    {
      icon: Volume2,
      title: "Media Alternatives",
      description: "Images include alt text descriptions, and videos provide captions where applicable.",
    },
  ];

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Accessibility className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                FashionFynds is committed to ensuring digital accessibility for people of all abilities
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 max-w-4xl">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Commitment</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  FashionFynds is committed to providing a website that is accessible to the widest possible audience, 
                  regardless of technology or ability. We actively work to increase the accessibility and usability 
                  of our website and in doing so adhere to many of the available standards and guidelines.
                </p>
                <p className="mt-4">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
                  These guidelines explain how to make web content more accessible for people with disabilities 
                  and more user-friendly for everyone.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <Card key={feature.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1BA6A6]/10 text-[#1BA6A6] flex items-center justify-center">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Browser & Assistive Technology Support</h2>
              <div className="bg-card rounded-xl border p-6">
                <p className="text-muted-foreground mb-4">
                  Our website is designed to be compatible with the following:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Recent versions of Chrome, Firefox, Safari, and Edge browsers</li>
                  <li>• Screen readers including JAWS, NVDA, VoiceOver, and TalkBack</li>
                  <li>• Browser zoom functionality up to 200%</li>
                  <li>• Voice control and switch devices</li>
                  <li>• High contrast and dark mode system settings</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Known Limitations</h2>
              <div className="bg-card rounded-xl border p-6">
                <p className="text-muted-foreground mb-4">
                  While we strive to ensure accessibility across all pages, some content may have limitations:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Some older product images may lack detailed alt text descriptions</li>
                  <li>• Third-party embedded content may not fully meet accessibility standards</li>
                  <li>• PDF documents from before 2024 may not be fully accessible</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We are actively working to address these issues and improve accessibility across all content.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Feedback & Contact</h2>
              <div className="bg-[#1BA6A6]/10 rounded-xl p-6">
                <p className="text-muted-foreground mb-4">
                  We welcome your feedback on the accessibility of FashionFynds. Please let us know if you 
                  encounter accessibility barriers:
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-[#1BA6A6]" />
                  <a href="mailto:accessibility@fashionfynds.com" className="text-[#1BA6A6] hover:underline">
                    accessibility@fashionfynds.com
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  We try to respond to accessibility feedback within 2 business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Continuous Improvement</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  FashionFynds is committed to continually improving the accessibility of our website. 
                  We regularly review our site to identify and fix accessibility issues, train our team 
                  on accessibility best practices, and incorporate accessibility into our development process.
                </p>
                <p className="mt-4 text-sm">
                  This statement was last updated on December 1, 2025.
                </p>
              </div>
            </section>
          </div>
        </main>

        <Footer />

        <ShoppingCart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => setCheckoutOpen(true)}
        />
        <WishlistSheet
          open={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          onProductClick={handleProductClick}
        />
        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onProductSelect={handleProductClick}
        />
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
      </div>
  );
}
