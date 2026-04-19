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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Gift, Crown, Sparkles, ShoppingBag, Percent, Truck, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function RewardsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const tiers = [
    {
      name: "Bronze",
      icon: Star,
      points: "0 - 499",
      color: "from-amber-600 to-amber-800",
      benefits: ["1 point per ₹100 spent", "Birthday surprise", "Early access to sales"],
    },
    {
      name: "Silver",
      icon: Sparkles,
      points: "500 - 1,999",
      color: "from-slate-400 to-slate-600",
      benefits: ["1.5 points per ₹100", "Free shipping on orders ₹999+", "Exclusive member events"],
    },
    {
      name: "Gold",
      icon: Crown,
      points: "2,000 - 4,999",
      color: "from-yellow-400 to-yellow-600",
      benefits: ["2 points per ₹100", "Free shipping all orders", "Priority customer service"],
    },
    {
      name: "Platinum",
      icon: Gift,
      points: "5,000+",
      color: "from-purple-400 to-purple-700",
      benefits: ["3 points per ₹100", "VIP early access", "Exclusive gifts & experiences"],
    },
  ];

  const rewards = [
    { points: 100, value: "₹50 off", icon: Percent },
    { points: 200, value: "₹100 off", icon: Percent },
    { points: 500, value: "₹250 off", icon: Gift },
    { points: 750, value: "Free shipping (1 year)", icon: Truck },
    { points: 1000, value: "₹500 off", icon: Percent },
    { points: 2000, value: "₹1,000 off", icon: Gift },
  ];

  const howToEarn = [
    { action: "Make a purchase", points: "1 point per ₹100", icon: ShoppingBag },
    { action: "Write a review", points: "50 points", icon: Star },
    { action: "Refer a friend", points: "200 points", icon: Gift },
    { action: "Birthday bonus", points: "100 points", icon: Sparkles },
  ];

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white py-20 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Crown className="h-20 w-20 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                FashionFynds Rewards
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Earn points on every purchase. Unlock exclusive perks. Get rewarded for being you.
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join Free Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">Membership Tiers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tiers.map((tier, index) => (
                  <Card key={tier.name} className="relative overflow-hidden">
                    <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${tier.color}`} />
                    <CardHeader className="text-center pt-8">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tier.color} text-white flex items-center justify-center mx-auto mb-4`}>
                        <tier.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.points} points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">How to Earn Points</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {howToEarn.map((item) => (
                  <div key={item.action} className="bg-card rounded-xl border p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#1BA6A6]/10 text-[#1BA6A6] flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.action}</h3>
                    <Badge variant="secondary" className="text-[#1BA6A6]">
                      {item.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">Redeem Your Points</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.points} className="hover:shadow-lg transition-shadow">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1BA6A6] to-[#158888] text-white flex items-center justify-center flex-shrink-0">
                        <reward.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">{reward.value}</p>
                        <p className="text-sm text-muted-foreground">{reward.points} points</p>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        <Lock className="h-4 w-4 mr-1" />
                        Redeem
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-6">
                Sign in to view your points balance and redeem rewards
              </p>
            </section>

            <section className="bg-gradient-to-br from-[#1BA6A6] to-[#158888] text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Join thousands of members already earning rewards on every purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Create Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
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
