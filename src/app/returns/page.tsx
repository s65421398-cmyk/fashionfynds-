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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Package, Clock, CheckCircle, AlertCircle, ArrowRight, Truck } from "lucide-react";
import { toast } from "sonner";

export default function ReturnsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    orderId: "",
    email: "",
    reason: "",
    returnType: "refund",
    items: "",
    comments: "",
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orderId || !formData.email || !formData.reason) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Return request submitted! Check your email for instructions.");
    setFormData({
      orderId: "",
      email: "",
      reason: "",
      returnType: "refund",
      items: "",
      comments: "",
    });
  };

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-zinc-800 to-zinc-900 text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
              <RotateCcw className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Returns & Refunds
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Hassle-free returns within 30 days. We want you to love every purchase.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Package, title: "30-Day Returns", desc: "Free returns within 30 days" },
                { icon: Clock, title: "Fast Processing", desc: "Refunds in 3-5 business days" },
                { icon: Truck, title: "Free Return Shipping", desc: "On all orders over $50" },
                { icon: CheckCircle, title: "Easy Exchange", desc: "Swap for different size/color" },
              ].map((item) => (
                <div key={item.title} className="text-center p-6 bg-card rounded-xl border">
                  <item.icon className="h-10 w-10 mx-auto mb-4 text-[#1BA6A6]" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Return Policy</h2>
                <div className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Eligible for Return
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Items within 30 days of delivery</li>
                      <li>• Unworn, unwashed items with tags attached</li>
                      <li>• Items in original packaging</li>
                      <li>• Defective or damaged items</li>
                      <li>• Wrong item received</li>
                    </ul>
                  </div>

                  <div className="bg-card rounded-lg border p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Non-Returnable Items
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Swimwear & intimate apparel</li>
                      <li>• Personalized/customized items</li>
                      <li>• Final sale items</li>
                      <li>• Gift cards</li>
                      <li>• Items worn, washed, or altered</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Return Process</h3>
                    <ol className="space-y-3">
                      {[
                        "Submit return request using the form",
                        "Receive prepaid shipping label via email",
                        "Pack items securely with original tags",
                        "Drop off at any shipping carrier location",
                        "Refund processed within 3-5 business days",
                      ].map((step, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#1BA6A6] text-white flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RotateCcw className="h-5 w-5" />
                      Request a Return
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below to start your return process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="orderId">Order ID *</Label>
                          <Input
                            id="orderId"
                            value={formData.orderId}
                            onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                            placeholder="e.g., FF-12345"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="reason">Reason for Return *</Label>
                        <Select
                          value={formData.reason}
                          onValueChange={(value) => setFormData({ ...formData, reason: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="size">Wrong Size</SelectItem>
                            <SelectItem value="color">Color Not as Expected</SelectItem>
                            <SelectItem value="quality">Quality Issue</SelectItem>
                            <SelectItem value="defective">Defective Item</SelectItem>
                            <SelectItem value="wrong">Wrong Item Received</SelectItem>
                            <SelectItem value="changed">Changed My Mind</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-3 block">Return Type *</Label>
                        <RadioGroup
                          value={formData.returnType}
                          onValueChange={(value) => setFormData({ ...formData, returnType: value })}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="refund" id="refund" />
                            <Label htmlFor="refund" className="cursor-pointer">Refund</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="exchange" id="exchange" />
                            <Label htmlFor="exchange" className="cursor-pointer">Exchange</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit" id="credit" />
                            <Label htmlFor="credit" className="cursor-pointer">Store Credit</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="items">Items to Return</Label>
                        <Textarea
                          id="items"
                          value={formData.items}
                          onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                          placeholder="List the items you want to return..."
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="comments">Additional Comments</Label>
                        <Textarea
                          id="comments"
                          value={formData.comments}
                          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                          placeholder="Any additional details..."
                          className="mt-1"
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        Submit Return Request
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
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
