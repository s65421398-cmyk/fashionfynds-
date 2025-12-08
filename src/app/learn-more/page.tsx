"use client";

import { useState } from "react";
import { ShopProvider } from "@/contexts/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types/product";
import { 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Shield, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Package, 
  RefreshCw,
  Star,
  ArrowRight,
  Search,
  Gift,
  Users
} from "lucide-react";
import Link from "next/link";

export default function LearnMorePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const howItWorks = [
    {
      step: "01",
      icon: Search,
      title: "Discover",
      description: "Browse through 150+ curated indie brands and thousands of unique products. Use our smart filters to find exactly what you're looking for."
    },
    {
      step: "02",
      icon: Heart,
      title: "Save & Compare",
      description: "Add items to your wishlist, compare styles, and get personalized recommendations based on your preferences."
    },
    {
      step: "03",
      icon: ShoppingBag,
      title: "Shop with Confidence",
      description: "Secure checkout with multiple payment options. Every purchase is protected by our authenticity guarantee."
    },
    {
      step: "04",
      icon: Truck,
      title: "Fast Delivery",
      description: "Enjoy free shipping on orders over $100. Track your order in real-time from our warehouse to your doorstep."
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Authentic",
      description: "Every product is verified for authenticity. We partner directly with brands to ensure you get genuine items.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Not satisfied? Return within 30 days for a full refund. No questions asked, hassle-free process.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Shop safely with encrypted transactions. We accept all major credit cards, PayPal, and more.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Star,
      title: "Curated Selection",
      description: "Hand-picked by fashion experts. Only the best indie brands and highest-quality products make it to our platform.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join 100K+ fashion lovers. Read reviews, share styles, and connect with like-minded shoppers.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Gift,
      title: "Rewards Program",
      description: "Earn points with every purchase. Unlock exclusive deals, early access to sales, and special perks.",
      color: "from-red-500 to-red-600"
    }
  ];

  const benefits = [
    {
      title: "Exclusive Access",
      description: "Be the first to shop new collections and limited drops from emerging designers",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
    },
    {
      title: "Expert Curation",
      description: "Our fashion team hand-selects every brand and product for quality and style",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop"
    },
    {
      title: "Sustainable Choices",
      description: "Support ethical brands committed to environmental and social responsibility",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop"
    }
  ];

  const stats = [
    { label: "Indie Brands", value: "150+", icon: TrendingUp },
    { label: "Happy Customers", value: "100K+", icon: Users },
    { label: "Products", value: "10K+", icon: Package },
    { label: "Average Rating", value: "4.8", icon: Star }
  ];

  return (
    <ShopProvider>
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-teal-600 via-[#1BA6A6] to-cyan-600 text-white py-24 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm font-medium">How FashionFynds Works</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Shop Smarter, Style Better
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-teal-50 max-w-3xl mx-auto">
                Your complete guide to discovering, shopping, and styling indie fashion
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-5 h-5" />
                        <div className="text-3xl font-bold">{stat.value}</div>
                      </div>
                      <div className="text-sm text-teal-100">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your journey from discovery to delivery in four simple steps
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="relative">
                      {/* Connector Line */}
                      {index < howItWorks.length - 1 && (
                        <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/20 -translate-x-1/2" />
                      )}
                      
                      <div className="relative bg-gradient-to-br from-muted/50 to-background rounded-2xl p-8 border shadow-sm hover:shadow-lg transition-all">
                        <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                          <Icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose FashionFynds?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We're more than just a marketplace—we're your fashion partner
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-2xl p-8 border shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benefits with Images */}
          <section className="py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">The FashionFynds Difference</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Experience fashion shopping the way it should be
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all h-96"
                  >
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-white text-2xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-white/90 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shopping Process Details */}
          <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Your Shopping Experience</h2>
                <p className="text-muted-foreground">Everything you need to know about shopping with us</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Authenticity Guaranteed</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Every product on FashionFynds comes with our authenticity guarantee. We work directly with brands and authorized distributors to ensure you receive 100% genuine items. Each purchase includes proof of authenticity and brand verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Fast & Free Shipping</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Enjoy free standard shipping on all orders over $100. Express shipping available for faster delivery. Track your package in real-time from dispatch to doorstep. Most orders arrive within 3-5 business days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Hassle-Free Returns</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Changed your mind? No problem. Return any item within 30 days for a full refund or exchange. Simple online return process with prepaid shipping labels. We make returns as easy as your original purchase.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our dedicated support team is here to help anytime you need. Whether you have questions about sizing, shipping, or returns, we're just a message away. Live chat, email, and phone support available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-[#1BA6A6] to-teal-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 stroke-[1.5]" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
              <p className="text-lg mb-8 text-teal-50 max-w-2xl mx-auto">
                Join 100,000+ fashion lovers who've discovered their style with FashionFynds
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1BA6A6] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/explore-brands"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors border border-white/30"
                >
                  Explore Brands
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Modals and Sheets */}
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
    </ShopProvider>
  );
}
