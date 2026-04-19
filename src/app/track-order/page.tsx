"use client";

export const dynamic = "force-dynamic";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, MapPin, CheckCircle, Clock, Search, Box, Home } from "lucide-react";
import { toast } from "sonner";

interface TrackingInfo {
  orderId: string;
  status: "processing" | "shipped" | "in_transit" | "out_for_delivery" | "delivered";
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  events: { date: string; status: string; location: string }[];
}

export default function TrackOrderPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) {
      toast.error("Please enter an order ID");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    setTrackingInfo({
      orderId: orderId.toUpperCase(),
      status: "in_transit",
      estimatedDelivery: "December 15, 2025",
      carrier: "FedEx",
      trackingNumber: "794644790458",
      events: [
        { date: "Dec 11, 2025 - 8:30 AM", status: "In Transit", location: "Chicago, IL" },
        { date: "Dec 10, 2025 - 6:15 PM", status: "Departed Facility", location: "Indianapolis, IN" },
        { date: "Dec 10, 2025 - 2:00 PM", status: "Arrived at Facility", location: "Indianapolis, IN" },
        { date: "Dec 9, 2025 - 11:30 AM", status: "Shipped", location: "Memphis, TN" },
        { date: "Dec 8, 2025 - 3:45 PM", status: "Order Processed", location: "FashionFynds Warehouse" },
      ],
    });
    setIsLoading(false);
  };

  const statusSteps = [
    { key: "processing", label: "Processing", icon: Box },
    { key: "shipped", label: "Shipped", icon: Package },
    { key: "in_transit", label: "In Transit", icon: Truck },
    { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
    { key: "delivered", label: "Delivered", icon: Home },
  ];

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((s) => s.key === status);
  };

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
              <Truck className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Enter your order ID to see real-time shipping updates
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Your Order
                </CardTitle>
                <CardDescription>
                  Enter your order ID and email to track your shipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="orderId" className="sr-only">Order ID</Label>
                    <Input
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Order ID (e.g., FF-12345)"
                      className="h-12"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="email" className="sr-only">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address (optional)"
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12" disabled={isLoading}>
                    {isLoading ? "Tracking..." : "Track Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {trackingInfo && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Order {trackingInfo.orderId}</CardTitle>
                        <CardDescription>
                          {trackingInfo.carrier} • {trackingInfo.trackingNumber}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                        <p className="text-lg font-semibold text-[#1BA6A6]">
                          {trackingInfo.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="flex justify-between mb-2">
                        {statusSteps.map((step, index) => {
                          const currentIndex = getStatusIndex(trackingInfo.status);
                          const isActive = index <= currentIndex;
                          const isCurrent = index === currentIndex;

                          return (
                            <div
                              key={step.key}
                              className={`flex flex-col items-center z-10 ${
                                isActive ? "text-[#1BA6A6]" : "text-muted-foreground"
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                  isActive
                                    ? "bg-[#1BA6A6] text-white"
                                    : "bg-muted"
                                } ${isCurrent ? "ring-4 ring-[#1BA6A6]/20" : ""}`}
                              >
                                <step.icon className="h-5 w-5" />
                              </div>
                              <span className="text-xs font-medium hidden sm:block">
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
                        <div
                          className="h-full bg-[#1BA6A6] transition-all duration-500"
                          style={{
                            width: `${(getStatusIndex(trackingInfo.status) / (statusSteps.length - 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Tracking History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingInfo.events.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="relative">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0 ? "bg-[#1BA6A6]" : "bg-muted-foreground/30"
                              }`}
                            />
                            {index < trackingInfo.events.length - 1 && (
                              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-full bg-muted" />
                            )}
                          </div>
                          <div className="pb-6">
                            <p className="font-semibold">{event.status}</p>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                            <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {!trackingInfo && (
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: Package, title: "Order Confirmation", desc: "Check your email for order confirmation and tracking details" },
                  { icon: Clock, title: "Processing Time", desc: "Orders are processed within 1-2 business days" },
                  { icon: Truck, title: "Shipping Time", desc: "Standard shipping takes 3-7 business days" },
                ].map((item) => (
                  <div key={item.title} className="text-center p-6 bg-card rounded-xl border">
                    <item.icon className="h-10 w-10 mx-auto mb-4 text-[#1BA6A6]" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
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
