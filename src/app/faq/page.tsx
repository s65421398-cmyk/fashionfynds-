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
import { ChevronDown, Search, Package, CreditCard, RefreshCw, Truck, Shield, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "orders", label: "Orders & Shipping", icon: Truck },
    { id: "returns", label: "Returns & Refunds", icon: RefreshCw },
    { id: "payment", label: "Payment & Billing", icon: CreditCard },
    { id: "products", label: "Products & Sizing", icon: Package },
    { id: "account", label: "Account & Security", icon: Shield }
  ];

  const faqs = [
    {
      category: "orders",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 days) and international shipping (7-14 days) are also available. You'll receive a tracking number once your order ships."
    },
    {
      category: "orders",
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive an email with a tracking number. You can also track orders by logging into your account and visiting the Orders page."
    },
    {
      category: "orders",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 45 countries worldwide. International shipping costs and delivery times vary by location. Customs fees may apply and are the responsibility of the recipient."
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, with original tags attached. Simply initiate a return from your account, print the prepaid label, and ship it back."
    },
    {
      category: "returns",
      question: "How long do refunds take?",
      answer: "Refunds are processed within 5-7 business days after we receive your return. The refund will go back to your original payment method. Please allow 3-5 additional days for it to appear in your account."
    },
    {
      category: "returns",
      question: "Can I exchange an item?",
      answer: "Yes! For faster service, we recommend returning the original item and placing a new order for the replacement. If you prefer a direct exchange, please contact our support team."
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted."
    },
    {
      category: "payment",
      question: "Is it safe to use my credit card?",
      answer: "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your full card details on our servers. All payments are processed through secure PCI-compliant payment gateways."
    },
    {
      category: "payment",
      question: "Do you offer payment plans?",
      answer: "Yes! We partner with Klarna and Afterpay to offer buy-now-pay-later options. You can split your purchase into 4 interest-free payments. Simply select this option at checkout."
    },
    {
      category: "products",
      question: "How do I find my size?",
      answer: "Each product page has a detailed size guide. Click the 'Size Guide' link near the size selector. We recommend measuring yourself and comparing to our charts for the best fit. Sizes may vary by brand."
    },
    {
      category: "products",
      question: "Are all products authentic?",
      answer: "Yes, 100%! We source all products directly from authorized distributors and verified brand partners. Every item is guaranteed authentic or your money back."
    },
    {
      category: "products",
      question: "How do I care for my items?",
      answer: "Care instructions are included on the product tag and in the product description. Generally, we recommend following the washing instructions carefully, using cold water, and air drying when possible to maintain quality."
    },
    {
      category: "products",
      question: "Will items look like the photos?",
      answer: "We photograph all items professionally to show accurate colors and details. However, screen settings may affect how colors appear. If you're not satisfied, we offer free returns within 30 days."
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer: "Click 'Sign In' in the header, then select 'Create Account'. You'll need to provide your email, create a password, and verify your email address. Accounts give you order tracking, saved addresses, and faster checkout."
    },
    {
      category: "account",
      question: "I forgot my password. What do I do?",
      answer: "Click 'Sign In', then 'Forgot Password'. Enter your email and we'll send you a reset link. Follow the link to create a new password. If you don't receive the email, check your spam folder."
    },
    {
      category: "account",
      question: "How do I update my account information?",
      answer: "Log into your account and go to 'Profile Settings'. There you can update your name, email, password, shipping addresses, and payment methods. Changes are saved automatically."
    },
    {
      category: "account",
      question: "Is my personal information secure?",
      answer: "Yes! We take security seriously. Your data is encrypted and stored securely. We never sell your information to third parties. Read our Privacy Policy for complete details on how we protect your data."
    }
  ];

  const sizeGuides = [
    {
      title: "Women's Clothing",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      measurements: [
        { size: "XS", bust: "30-32\"", waist: "23-25\"", hips: "33-35\"" },
        { size: "S", bust: "32-34\"", waist: "25-27\"", hips: "35-37\"" },
        { size: "M", bust: "34-36\"", waist: "27-29\"", hips: "37-39\"" },
        { size: "L", bust: "36-38\"", waist: "29-31\"", hips: "39-41\"" },
        { size: "XL", bust: "38-40\"", waist: "31-33\"", hips: "41-43\"" },
        { size: "XXL", bust: "40-42\"", waist: "33-35\"", hips: "43-45\"" }
      ]
    },
    {
      title: "Men's Clothing",
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
      measurements: [
        { size: "S", chest: "34-36\"", waist: "28-30\"", hips: "35-37\"" },
        { size: "M", chest: "38-40\"", waist: "32-34\"", hips: "38-40\"" },
        { size: "L", chest: "42-44\"", waist: "36-38\"", hips: "41-43\"" },
        { size: "XL", chest: "46-48\"", waist: "40-42\"", hips: "44-46\"" },
        { size: "XXL", chest: "50-52\"", waist: "44-46\"", hips: "47-49\"" },
        { size: "XXXL", chest: "54-56\"", waist: "48-50\"", hips: "50-52\"" }
      ]
    },
    {
      title: "Shoes",
      note: "US sizing. Half sizes available for most styles.",
      measurements: [
        { size: "US 5", eu: "35-36", uk: "3", cm: "22.5" },
        { size: "US 6", eu: "36-37", uk: "4", cm: "23.5" },
        { size: "US 7", eu: "37-38", uk: "5", cm: "24.5" },
        { size: "US 8", eu: "38-39", uk: "6", cm: "25.5" },
        { size: "US 9", eu: "39-40", uk: "7", cm: "26.5" },
        { size: "US 10", eu: "40-41", uk: "8", cm: "27.5" }
      ]
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Find answers to common questions about shopping with FashionFynds
                </p>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for answers..."
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1BA6A6]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                        activeCategory === cat.id
                          ? "bg-[#1BA6A6] text-white"
                          : "bg-gray-100 text-foreground hover:bg-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ Items */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"}
                  </p>
                </div>
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-start justify-between p-6 text-left"
                      >
                        <span className="font-semibold pr-8">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#1BA6A6] flex-shrink-0 transition-transform ${
                            openItems.includes(index) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openItems.includes(index) && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No questions found matching your search.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="text-[#1BA6A6] font-semibold hover:text-teal-600"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Size Guides */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Size Guides</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sizeGuides.map((guide, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border shadow-sm">
                      <h3 className="font-bold mb-4">{guide.title}</h3>
                      {guide.note && (
                        <p className="text-sm text-muted-foreground mb-4">{guide.note}</p>
                      )}
                      <div className="space-y-2">
                        {guide.measurements.map((m, i) => (
                          <div key={i} className="text-sm border-b pb-2">
                            <div className="font-semibold text-[#1BA6A6] mb-1">{m.size}</div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              {Object.entries(m)
                                .filter(([key]) => key !== "size")
                                .map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="capitalize">{key}:</span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 bg-gradient-to-r from-[#1BA6A6] to-teal-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-lg mb-8 text-teal-50">
                  Our customer support team is here to help you 24/7
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-[#1BA6A6] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
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
