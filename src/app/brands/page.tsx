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
import { Search, Star, MapPin, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
  tagline: string;
  description: string;
  category: string;
  image: string;
  logo: string;
  rating: number;
  reviews: number;
  products: number;
  location: string;
  trending: boolean;
  priceRange: string;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Urban Rebel",
    tagline: "Street-inspired designs for the bold",
    description: "Minimalist streetwear with an edge. Urban Rebel crafts pieces that blend comfort with attitude, perfect for those who refuse to follow the crowd.",
    category: "streetwear",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.8,
    reviews: 324,
    products: 52,
    location: "Los Angeles, CA",
    trending: true,
    priceRange: "₹2,000 - ₹6,000"
  },
  {
    id: 2,
    name: "Eco Threads",
    tagline: "Sustainable fashion for a better tomorrow",
    description: "Eco-conscious clothing made from organic and recycled materials. Every piece tells a story of sustainability and ethical production.",
    category: "sustainable",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.9,
    reviews: 512,
    products: 68,
    location: "Portland, OR",
    trending: true,
    priceRange: "₹1,800 - ₹4,500"
  },
  {
    id: 3,
    name: "Midnight Canvas",
    tagline: "Bold prints & artistic expression",
    description: "Where art meets fashion. Midnight Canvas transforms canvas into wearable art with bold prints and unique designs that make a statement.",
    category: "artistic",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.7,
    reviews: 289,
    products: 45,
    location: "Brooklyn, NY",
    trending: true,
    priceRange: "₹2,500 - ₹7,000"
  },
  {
    id: 4,
    name: "Heritage Weave",
    tagline: "Traditional craftsmanship meets modern design",
    description: "Celebrating heritage through contemporary fashion. Each piece is handcrafted using traditional techniques passed down through generations.",
    category: "ethnic",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.9,
    reviews: 421,
    products: 73,
    location: "Jaipur, India",
    trending: false,
    priceRange: "₹3,000 - ₹8,000"
  },
  {
    id: 5,
    name: "Minimalist Studio",
    tagline: "Less is more, always",
    description: "Clean lines, neutral palettes, and timeless designs. Minimalist Studio creates wardrobe essentials that never go out of style.",
    category: "minimalist",
    image: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.6,
    reviews: 198,
    products: 38,
    location: "Tokyo, Japan",
    trending: false,
    priceRange: "₹2,200 - ₹5,500"
  },
  {
    id: 6,
    name: "Wild Heart",
    tagline: "Bohemian spirits and free souls",
    description: "For the wanderers and dreamers. Wild Heart brings bohemian vibes with flowing silhouettes and earthy tones perfect for free spirits.",
    category: "bohemian",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.8,
    reviews: 367,
    products: 61,
    location: "Austin, TX",
    trending: true,
    priceRange: "₹1,900 - ₹4,800"
  },
  {
    id: 7,
    name: "Tech Wear Co.",
    tagline: "Fashion meets function",
    description: "Performance fabrics and futuristic designs. Tech Wear Co. combines cutting-edge materials with urban aesthetics for the modern explorer.",
    category: "techwear",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea1f1d74?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.7,
    reviews: 256,
    products: 42,
    location: "Seoul, Korea",
    trending: false,
    priceRange: "₹3,500 - ₹9,000"
  },
  {
    id: 8,
    name: "Vintage Revival",
    tagline: "Timeless classics reimagined",
    description: "Breathing new life into vintage styles. Each piece is carefully curated and restored to celebrate fashion's golden eras.",
    category: "vintage",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.9,
    reviews: 443,
    products: 87,
    location: "London, UK",
    trending: true,
    priceRange: "₹2,800 - ₹7,500"
  },
  {
    id: 9,
    name: "Street Soul",
    tagline: "Urban culture, global influence",
    description: "Streetwear inspired by global urban cultures. Street Soul brings together influences from cities worldwide into bold, wearable statements.",
    category: "streetwear",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.6,
    reviews: 278,
    products: 49,
    location: "Berlin, Germany",
    trending: false,
    priceRange: "₹2,100 - ₹5,800"
  }
];

const categories = [
  { id: "all", name: "All Brands" },
  { id: "streetwear", name: "Streetwear" },
  { id: "sustainable", name: "Sustainable" },
  { id: "ethnic", name: "Ethnic" },
  { id: "minimalist", name: "Minimalist" },
  { id: "bohemian", name: "Bohemian" },
  { id: "techwear", name: "Techwear" },
  { id: "vintage", name: "Vintage" },
  { id: "artistic", name: "Artistic" }
];

export default function BrandsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedBrands, setSavedBrands] = useState<number[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const toggleSaveBrand = (brandId: number) => {
    setSavedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = activeCategory === "all" || brand.category === activeCategory;
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingBrands = brands.filter(b => b.trending).slice(0, 3);

  return (
    <ShopProvider>
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          onAuthOpen={() => setAuthOpen(true)}
        />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-[#1BA6A6] via-[#007A7A] to-[#00D4D4] text-white py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Discover Indie Brands
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Real brands, real stories. Explore authentic creators who dare to be different.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search brands by name, style, or vibe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold">{brands.length}+</div>
                  <div className="text-sm text-white/80">Indie Brands</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Unique Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="text-sm text-white/80">Average Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="sticky top-16 bg-white border-b border-gray-200 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
              <div className="flex gap-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? "bg-[#1BA6A6] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Trending Brands Banner */}
          {activeCategory === "all" && (
            <section className="bg-gradient-to-r from-[#FFB347] to-[#FF6B6B] py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">Trending Now</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {trendingBrands.map((brand) => (
                    <div
                      key={brand.id}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{brand.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{brand.tagline}</p>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{brand.rating}</span>
                            <span className="text-sm text-gray-500">({brand.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Brands Grid */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {activeCategory === "all" ? "All Brands" : categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {filteredBrands.length} {filteredBrands.length === 1 ? "brand" : "brands"} found
                  </p>
                </div>
              </div>

              {filteredBrands.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-500">No brands found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchQuery("");
                    }}
                    className="mt-4 px-6 py-3 bg-[#1BA6A6] text-white rounded-full hover:bg-[#007A7A] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Brand Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Trending Badge */}
                        {brand.trending && (
                          <div className="absolute top-4 left-4 bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                        
                        {/* Save Button */}
                        <button
                          onClick={() => toggleSaveBrand(brand.id)}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              savedBrands.includes(brand.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </button>

                        {/* Logo */}
                        <div className="absolute bottom-4 left-4">
                          <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="w-16 h-16 rounded-lg border-4 border-white shadow-lg object-cover"
                          />
                        </div>
                      </div>

                      {/* Brand Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#1BA6A6] transition-colors">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 italic">{brand.tagline}</p>
                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {brand.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{brand.rating}</span>
                            <span className="text-gray-400">({brand.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{brand.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                          <div>
                            <div className="text-sm text-gray-500">Products</div>
                            <div className="font-bold">{brand.products}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Price Range</div>
                            <div className="font-bold">{brand.priceRange}</div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                          href="/"
                          className="block w-full py-3 bg-[#1BA6A6] hover:bg-[#007A7A] text-white text-center rounded-full font-medium transition-colors"
                        >
                          Explore Brand
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8080] py-16 px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Stay Updated on New Brands</h2>
              <p className="text-lg mb-8 text-white/90">
                Be the first to discover emerging indie brands and exclusive drops.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-full font-medium transition-colors whitespace-nowrap">
                  Subscribe
                </button>
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
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </ShopProvider>
  );
}
