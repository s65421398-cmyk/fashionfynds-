"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import ProductModal from "@/components/ProductModal";
import { GiftCard } from "@/components/GiftCard";
import { Product } from "@/types/product";
import { Gift, CheckCircle, Clock, CreditCard, Shield } from "lucide-react";

export default function GiftCardsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Perfect Gift",
      description: "Let them choose exactly what they want",
    },
    {
      icon: Clock,
      title: "Never Expires",
      description: "Gift cards are valid forever",
    },
    {
      icon: CreditCard,
      title: "Flexible Amounts",
      description: "From $25 to $500, or custom amounts",
    },
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "Balance is protected if card is lost",
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
          <section className="bg-gradient-to-br from-[#1BA6A6] to-[#158888] text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Gift className="h-16 w-16 mx-auto mb-6 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                FashionFynds Gift Cards
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Give the gift of style. Perfect for birthdays, holidays, or just because.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="text-center p-6 bg-card rounded-xl border"
                >
                  <benefit.icon className="h-10 w-10 mx-auto mb-4 text-[#1BA6A6]" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            <GiftCard />

            <section className="mt-16 bg-muted/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1BA6A6] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Choose Amount & Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Select from preset amounts or enter a custom value
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1BA6A6] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Personalize Your Message</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a heartfelt message for the recipient
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1BA6A6] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Send or Print</h3>
                  <p className="text-sm text-muted-foreground">
                    Email instantly or receive a physical card
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "Do gift cards expire?",
                    a: "No, FashionFynds gift cards never expire and have no fees.",
                  },
                  {
                    q: "Can I check my gift card balance?",
                    a: "Yes, you can check your balance at checkout or in your account settings.",
                  },
                  {
                    q: "Can I use multiple gift cards on one order?",
                    a: "Absolutely! You can combine multiple gift cards with other payment methods.",
                  },
                  {
                    q: "What if I lose my gift card?",
                    a: "Contact our support team with your purchase confirmation and we'll help recover your balance.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="bg-card rounded-lg border p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
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
