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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Gift, Share2, Copy, Mail, MessageCircle, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ReferralPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const referralCode = "FRIEND20";
  const referralLink = `https://fashionfynds.com/ref/${referralCode}`;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${email}!`);
    setEmail("");
  };

  const steps = [
    { step: 1, title: "Share Your Link", desc: "Send your unique referral link to friends and family" },
    { step: 2, title: "Friend Signs Up", desc: "They create an account using your referral link" },
    { step: 3, title: "Both Get Rewarded", desc: "You both receive $20 off your next purchase!" },
  ];

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white py-20 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Users className="h-20 w-20 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Give $20, Get $20
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Share the love! Invite friends to FashionFynds and you both get rewarded.
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Gift className="h-6 w-6" />
                <span className="text-lg">Your friend gets $20 off their first order</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
                <Gift className="h-6 w-6" />
                <span className="text-lg">You get $20 off when they make a purchase</span>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-12">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your Referral Link</CardTitle>
                <CardDescription>Share this link with friends to start earning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button onClick={copyToClipboard} variant={copied ? "secondary" : "default"}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Or invite by email directly
                  </p>
                  <form onSubmit={handleEmailInvite} className="flex gap-2">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="friend@email.com"
                    />
                    <Button type="submit">
                      Send Invite
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Referral Program Terms</h2>
              <div className="bg-card rounded-xl border p-6 space-y-4 text-muted-foreground">
                <p>• Your friend must be a new FashionFynds customer</p>
                <p>• Minimum purchase of $50 required to redeem $20 credit</p>
                <p>• Credits expire 90 days after being issued</p>
                <p>• No limit on how many friends you can refer</p>
                <p>• Cannot be combined with other promotional offers</p>
                <p>• FashionFynds reserves the right to modify or cancel this program</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-rose-500 to-purple-600 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Referring Today!</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                The more friends you refer, the more you save. There's no limit!
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Create Account to Get Your Link
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
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
