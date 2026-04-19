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
import { Users, Target, Heart, Sparkles, Award, Globe } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring an exceptional shopping experience."
    },
    {
      icon: Sparkles,
      title: "Quality & Style",
      description: "Curating only the finest fashion pieces that combine timeless elegance with contemporary trends."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to ethical sourcing and partnering with brands that prioritize environmental responsibility."
    },
    {
      icon: Award,
      title: "Authenticity",
      description: "Every product is 100% authentic, sourced directly from trusted brands and verified suppliers."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Fashion entrepreneur with 15+ years in luxury retail"
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Former Vogue editor with an eye for emerging trends"
    },
    {
      name: "Aisha Patel",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Supply chain expert ensuring seamless delivery"
    },
    {
      name: "James Wilson",
      role: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Dedicated to making every customer interaction memorable"
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "500K+" },
    { label: "Fashion Brands", value: "200+" },
    { label: "Countries Served", value: "45+" },
    { label: "Years of Excellence", value: "8+" }
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
        <section className="relative bg-gradient-to-br from-teal-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About FashionFynds
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Where style meets authenticity. We're on a mission to make premium fashion accessible to everyone, everywhere.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg px-6 py-4 shadow-sm">
                    <div className="text-2xl font-bold text-[#1BA6A6]">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#1BA6A6]" />
                <h2 className="text-3xl font-bold">Our Story</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in 2016, FashionFynds started with a simple belief: everyone deserves access to quality fashion that makes them feel confident and empowered. What began as a small boutique has grown into a global fashion destination, serving over 500,000 happy customers across 45 countries.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our founder, Sarah Chen, recognized a gap in the market for a platform that combines curated luxury brands with emerging designers, all while maintaining competitive prices and exceptional customer service. Today, we partner with over 200 renowned brands, from timeless classics like Gucci and Prada to innovative newcomers pushing the boundaries of fashion.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every item in our collection is handpicked by our team of fashion experts, ensuring that you receive only authentic, high-quality pieces. We're not just selling clothes—we're helping you discover your unique style and express your individuality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <Target className="w-10 h-10 text-[#1BA6A6] mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize premium fashion by making it accessible, sustainable, and inclusive. We believe style is a form of self-expression that should be available to everyone, regardless of location or budget.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <Users className="w-10 h-10 text-[#1BA6A6] mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the world's most trusted fashion destination, known for our curated selection, authentic products, and commitment to sustainability and ethical practices in the fashion industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border hover:shadow-lg transition-shadow"
                    >
                      <Icon className="w-8 h-8 text-[#1BA6A6] mb-4" />
                      <h3 className="font-bold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Passionate fashion experts dedicated to bringing you the best shopping experience
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition-all group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-[#1BA6A6] mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#1BA6A6] to-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Fashion Community</h2>
              <p className="text-lg mb-8 text-teal-50">
                Discover your style with FashionFynds. Shop the latest trends from 200+ premium brands.
              </p>
              <button className="bg-white text-[#1BA6A6] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Start Shopping
              </button>
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
