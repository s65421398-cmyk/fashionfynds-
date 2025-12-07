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
import AuthModal from "@/components/AuthModal";
import { Product } from "@/types/product";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@fashionfynds.com",
      description: "We'll respond within 24 hours",
      action: "mailto:support@fashionfynds.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
      action: "tel:+15551234567"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Chat with our team",
      description: "Available 24/7",
      action: "#"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Fashion Avenue, New York, NY 10001",
      description: "Headquarters & Showroom",
      action: "#"
    }
  ];

  return (
    <ShopProvider>
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
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                <p className="text-lg text-muted-foreground">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.action}
                        className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border hover:shadow-lg transition-all group"
                      >
                        <Icon className="w-8 h-8 text-[#1BA6A6] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold mb-1">{method.title}</h3>
                        <p className="text-sm text-foreground font-medium mb-1">
                          {method.content}
                        </p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </a>
                    );
                  })}
                </div>

                {/* Contact Form and Info */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-8 border shadow-sm">
                      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                      {submitted ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                          <div className="text-green-600 text-4xl mb-2">✓</div>
                          <h3 className="font-bold text-green-900 mb-2">Message Sent!</h3>
                          <p className="text-green-700">
                            Thank you for contacting us. We'll get back to you within 24 hours.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BA6A6]"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BA6A6]"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Subject *</label>
                            <input
                              type="text"
                              required
                              value={formData.subject}
                              onChange={(e) =>
                                setFormData({ ...formData, subject: e.target.value })
                              }
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BA6A6]"
                              placeholder="How can we help you?"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Message *</label>
                            <textarea
                              required
                              rows={6}
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                              }
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BA6A6]"
                              placeholder="Tell us more about your inquiry..."
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-[#1BA6A6] text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Send Message
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-6">
                    {/* Business Hours */}
                    <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 border">
                      <Clock className="w-8 h-8 text-[#1BA6A6] mb-4" />
                      <h3 className="font-bold mb-4">Business Hours</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium">9AM - 6PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="font-medium">10AM - 4PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium">Closed</span>
                        </div>
                        <div className="pt-2 mt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            All times are in EST. Live chat available 24/7.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Link */}
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border">
                      <h3 className="font-bold mb-2">Need Quick Answers?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Check out our FAQ section for instant answers to common questions.
                      </p>
                      <a
                        href="/faq"
                        className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Visit FAQ
                      </a>
                    </div>

                    {/* Order Support */}
                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border">
                      <h3 className="font-bold mb-2">Order Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        For order-specific inquiries, please include your order number in the message.
                      </p>
                      <a
                        href="/account/orders"
                        className="text-sm font-semibold text-[#1BA6A6] hover:text-teal-600"
                      >
                        Track Your Order →
                      </a>
                    </div>
                  </div>
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
    </ShopProvider>
  );
}
