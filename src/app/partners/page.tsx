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
import { Store, TrendingUp, Users, Sparkles, CheckCircle, Send, Package, Globe, DollarSign, Loader2 } from "lucide-react";

export function PartnerPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    brandName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    description: "",
    instagram: "",
    productsCount: "",
    established: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "Massive Reach",
      description: "Connect with 500K+ fashion-forward shoppers across 45+ countries"
    },
    {
      icon: TrendingUp,
      title: "Boost Sales",
      description: "Average partner brands see 40% increase in revenue within first 6 months"
    },
    {
      icon: Globe,
      title: "Global Exposure",
      description: "Expand your market reach with our international shipping network"
    },
    {
      icon: Sparkles,
      title: "Marketing Support",
      description: "Featured promotions, email campaigns, and social media spotlights"
    },
    {
      icon: DollarSign,
      title: "Competitive Terms",
      description: "Fair commission structure with no hidden fees or upfront costs"
    },
    {
      icon: Package,
      title: "Logistics Made Easy",
      description: "We handle fulfillment, customer service, and returns management"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Apply",
      description: "Submit your brand details through our simple application form"
    },
    {
      number: "02",
      title: "Review",
      description: "Our team reviews your application within 3-5 business days"
    },
    {
      number: "03",
      title: "Onboard",
      description: "Get set up with our partner portal and upload your products"
    },
    {
      number: "04",
      title: "Launch",
      description: "Go live and start selling to our global customer base"
    }
  ];

  const categories = [
    "Women's Apparel",
    "Men's Apparel",
    "Accessories",
    "Footwear",
    "Jewelry",
    "Beauty & Cosmetics",
    "Activewear",
    "Bags & Luggage",
    "Other"
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
        <section className="relative bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Store className="w-16 h-16 mx-auto mb-6 animate-bounce" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Partner With Us
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Join 200+ brands selling to fashion lovers worldwide. Grow your business with FashionFynds.
              </p>
              <button
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Why Partner With FashionFynds?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We provide everything you need to succeed in the competitive fashion marketplace
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-purple-100"
                    >
                      <Icon className="w-12 h-12 text-purple-600 mb-4" />
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-linear-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground">
                  Get started in 4 simple steps
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all">
                      <div className="text-5xl font-bold text-purple-200 mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-0.5 bg-purple-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Apply to Become a Partner</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and our partnerships team will get back to you within 3-5 business days
                </p>
              </div>

              {submitted ? (
                <div className="bg-linear-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-12 text-center">
                  <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-green-900 mb-4">Application Submitted!</h3>
                  <p className="text-lg text-green-700 mb-6">
                    Thank you for your interest in partnering with FashionFynds. Our team will review your application and get back to you within 3-5 business days.
                  </p>
                  <p className="text-sm text-green-600">
                    Check your email ({formData.email}) for a confirmation message.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border">
                  <div className="space-y-6">
                    {/* Brand Information */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Store className="w-5 h-5 text-purple-600" />
                        Brand Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Brand Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.brandName}
                            onChange={(e) =>
                              setFormData({ ...formData, brandName: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Your Brand Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Category *
                          </label>
                          <select
                            required
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Year Established *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.established}
                            onChange={(e) =>
                              setFormData({ ...formData, established: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="e.g., 2020"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Number of Products *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.productsCount}
                            onChange={(e) =>
                              setFormData({ ...formData, productsCount: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Approximate count"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Contact Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Contact Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.contactName}
                            onChange={(e) =>
                              setFormData({ ...formData, contactName: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Full Name"
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
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="contact@yourbrand.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) =>
                              setFormData({ ...formData, website: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="https://yourbrand.com"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">
                            Instagram Handle
                          </label>
                          <input
                            type="text"
                            value={formData.instagram}
                            onChange={(e) =>
                              setFormData({ ...formData, instagram: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="@yourbrand"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Brand Story */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        Tell Us About Your Brand
                      </h3>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Brand Description *
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder="Tell us about your brand's story, values, target audience, and what makes your products unique..."
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Minimum 100 characters. Help us understand what makes your brand special.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {submitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                        {submitting ? "Submitting..." : "Submit Application"}
                      </button>
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        By submitting this form, you agree to our{" "}
                        <a href="/terms" className="text-purple-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-purple-600 hover:underline">
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-linear-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "What are the requirements to become a partner?",
                    a: "We look for established brands with authentic, quality products. You should have a registered business, product inventory, and the ability to fulfill orders. Both emerging designers and established brands are welcome."
                  },
                  {
                    q: "What are the costs involved?",
                    a: "There are no upfront fees or monthly charges. We work on a commission-based model where we take a percentage of each sale. Exact terms are discussed during the onboarding process."
                  },
                  {
                    q: "How long does the application process take?",
                    a: "Our team reviews applications within 3-5 business days. If approved, the onboarding and setup process typically takes 1-2 weeks."
                  },
                  {
                    q: "Do you handle shipping and customer service?",
                    a: "Yes! We provide end-to-end support including order fulfillment, customer service, and returns management. You focus on creating great products, we handle the rest."
                  },
                  {
                    q: "Can I sell on other platforms?",
                    a: "Absolutely! We encourage our partners to sell through multiple channels. There's no exclusivity requirement."
                  }
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow group"
                  >
                    <summary className="font-bold text-lg cursor-pointer list-none flex items-center justify-between">
                      {faq.q}
                      <span className="text-purple-600 text-2xl group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Brand?</h2>
              <p className="text-xl text-white/90 mb-8">
                Join FashionFynds and reach fashion lovers worldwide. Let's build something amazing together.
              </p>
              <button
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Your Application
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

export default PartnerPage;
