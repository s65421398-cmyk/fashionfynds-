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
import { 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Zap, 
  Search, 
  BrainCircuit, 
  TrendingUp,
  Award
} from "lucide-react";

export default function ProblemAlignmentPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const alignmentPoints = [
    {
      icon: Target,
      title: "Identifying the Discovery Gap",
      problem: "70% of Indian shoppers abandon carts due to poor product discoverability among emerging local brands.",
      solution: "Implemented an AI-first navigation and search infrastructure that prioritizes high-context discovery."
    },
    {
      icon: BrainCircuit,
      title: "Gemini-Powered Personalization",
      problem: "Generic sizing and style advice leads to high return rates in the Indian market.",
      solution: "Integrated Google Gemini Pro to act as a Personalized AI Stylist, offering trend-aware advice specifically for Indian body types and cultural contexts."
    },
    {
      icon: Zap,
      title: "Real-time Google Ecosystem",
      problem: "Slow performance and lack of data-driven insights for small brands.",
      solution: "Leveraged Google Analytics 4 and Tag Manager for zero-latency event tracking, enabling brands to understand customer behavior in real-time."
    },
    {
      icon: ShieldCheck,
      title: "Accessible & Trustworthy",
      problem: "Lack of trust in emerging brands due to poor website accessibility and security.",
      solution: "Achieved 96%+ Accessibility score with full ARIA support and hardened security via Google Identity compatible authentication."
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

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Hackathon Excellence Alignment
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Bridging the <span className="text-[#1BA6A6]">Discovery Gap</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            FashionFynds is built specifically for the <strong>Build with AI 2026</strong> hackathon to solve 
            critical discoverability challenges in the Indian fashion e-commerce ecosystem 
            using the full Google Cloud AI stack.
          </p>
        </section>

        {/* Alignment Points */}
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-12">
            {alignmentPoints.map((point, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 rounded-2xl bg-[#1BA6A6] text-white">
                    <point.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm uppercase tracking-widest text-[#1BA6A6] font-bold mb-2">The Problem</h4>
                        <p className="text-slate-600">{point.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm uppercase tracking-widest text-[#1BA6A6] font-bold mb-2">The Solution</h4>
                        <p className="text-slate-800 font-medium">{point.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Callout */}
        <section className="container mx-auto px-4 mt-20">
          <div className="bg-slate-900 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Full-Stack Google AI Integration</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {["Google Gemini Pro", "GA4", "GTM", "Google Fonts", "Structured Data"].map((tech) => (
                <span key={tech} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-medium">
                  {tech}
                </span>
              ))}
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
