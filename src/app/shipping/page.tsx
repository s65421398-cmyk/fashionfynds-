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
import { Truck, Package, RotateCcw, MapPin, Clock, DollarSign, AlertCircle, CheckCircle } from "lucide-react";

export default function ShippingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "4-7 Business Days",
      cost: "Free on orders ₹999+",
      description: "Pan-India delivery via courier partners"
    },
    {
      name: "Express Shipping",
      time: "2-3 Business Days",
      cost: "₹199",
      description: "Fast delivery for urgent orders"
    },
    {
      name: "Same Day Delivery",
      time: "Same Day (select cities)",
      cost: "₹299",
      description: "Order by 12PM for same day delivery"
    },
    {
      name: "COD (Cash on Delivery)",
      time: "4-7 Business Days",
      cost: "₹49 handling fee",
      description: "Pay cash when your order arrives"
    }
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Log into your account and go to Orders. Select the item you want to return and click 'Return Item'."
    },
    {
      step: 2,
      title: "Print Label",
      description: "Download and print your prepaid return shipping label. No shipping fees for US customers!"
    },
    {
      step: 3,
      title: "Pack & Ship",
      description: "Package your item securely with all tags attached. Drop off at any carrier location."
    },
    {
      step: 4,
      title: "Get Refund",
      description: "Once we receive and inspect your return, we'll process your refund within 5-7 business days."
    }
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain",
    "Japan", "South Korea", "Singapore", "Hong Kong", "United Arab Emirates", "Netherlands", "Belgium",
    "Sweden", "Norway", "Denmark", "Switzerland", "Austria", "Ireland", "Portugal", "New Zealand"
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
          <section className="bg-gradient-to-br from-teal-50 to-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Truck className="w-12 h-12 text-[#1BA6A6] mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Shipping & Returns
                </h1>
                <p className="text-lg text-muted-foreground">
                  Fast, reliable delivery and hassle-free returns. Your satisfaction is our priority.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-1">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">On orders over ₹999</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <RotateCcw className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold mb-1">Easy Returns</h3>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold mb-1">Track Orders</h3>
                    <p className="text-sm text-muted-foreground">Real-time tracking</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="font-bold mb-1">Global Delivery</h3>
                    <p className="text-sm text-muted-foreground">Ships to 45+ countries</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Options */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Shipping Options</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {shippingOptions.map((option, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{option.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {option.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#1BA6A6]">{option.cost}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  ))}
                </div>

                {/* Additional Shipping Info */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Important Shipping Information</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Processing time: 1-2 business days before shipment</li>
                        <li>• Tracking number provided once order ships</li>
                        <li>• Signature may be required for orders over ₹25,000</li>
                        <li>• PO boxes accepted for standard shipping only</li>
                        <li>• Business days exclude weekends and holidays</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <MapPin className="w-8 h-8 text-[#1BA6A6]" />
                  <h2 className="text-3xl font-bold">International Shipping</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold mb-4">Countries We Ship To</h3>
                    <div className="bg-gray-50 rounded-xl p-6 max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {countries.map((country, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{country}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Don't see your country? Contact us to check availability.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Important Notes</h3>
                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <div className="flex gap-2">
                          <DollarSign className="w-5 h-5 text-orange-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-orange-900 text-sm mb-1">Customs & Duties</h4>
                            <p className="text-xs text-orange-800">
                              International orders may be subject to import duties and taxes. These fees are the responsibility of the recipient.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex gap-2">
                          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-sm mb-1">Delivery Time</h4>
                            <p className="text-xs text-blue-800">
                              International shipping typically takes 7-14 business days. Delays may occur due to customs clearance.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex gap-2">
                          <Package className="w-5 h-5 text-purple-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-purple-900 text-sm mb-1">Tracking</h4>
                            <p className="text-xs text-purple-800">
                              Full tracking provided for all international orders. Track your package from warehouse to doorstep.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Returns Policy */}
          <section className="py-16 bg-gradient-to-br from-teal-50 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <RotateCcw className="w-8 h-8 text-[#1BA6A6]" />
                  <h2 className="text-3xl font-bold">Returns & Refunds</h2>
                </div>

                <div className="bg-white rounded-2xl p-8 border mb-8">
                  <h3 className="font-bold text-xl mb-4">Our 30-Day Return Policy</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    We want you to love your purchase! If you're not completely satisfied, you can return most items within 30 days of delivery for a full refund. Returns are FREE for US customers.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">✓ Returnable Items</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>• Unworn and unwashed items</li>
                        <li>• Items with original tags attached</li>
                        <li>• Items in original packaging</li>
                        <li>• Non-personalized products</li>
                        <li>• Regular priced and sale items</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700">✗ Non-Returnable Items</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>• Final sale items</li>
                        <li>• Intimate apparel and swimwear</li>
                        <li>• Personalized or customized items</li>
                        <li>• Items without tags or packaging</li>
                        <li>• Used or worn items</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Return Steps */}
                <h3 className="font-bold text-xl mb-6">How to Return an Item</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {returnSteps.map((step) => (
                    <div key={step.step} className="bg-white rounded-xl p-6 border">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#1BA6A6] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exchanges */}
                <div className="mt-8 bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border">
                  <h4 className="font-bold mb-3">Need to Exchange?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    For the fastest service, we recommend returning the original item for a refund and placing a new order for the item you want. If you prefer a direct exchange, please contact our support team and we'll be happy to help!
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-[#1BA6A6] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ CTA */}
          <section className="py-16 bg-gradient-to-r from-[#1BA6A6] to-teal-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Have More Questions?</h2>
                <p className="text-lg mb-8 text-teal-50">
                  Check our FAQ for answers to common shipping and return questions
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="/faq"
                    className="bg-white text-[#1BA6A6] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    View FAQ
                  </a>
                  <a
                    href="/account/orders"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                  >
                    Track Order
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
