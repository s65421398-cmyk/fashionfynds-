"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types/product";
import { Sparkles, Heart, TrendingUp, Award, Globe, Users, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const featuredBrands = [
  {
    id: 1,
    name: "Urban Rebel",
    slug: "urban-rebel",
    tagline: "Street-inspired designs for the bold",
    story: "Born on the streets of LA, Urban Rebel transforms urban culture into wearable art. Founded by street artists, each piece tells a story of rebellion and self-expression.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=150&fit=crop",
    category: "Streetwear",
    featured: true,
    trending: true,
    values: ["Authentic", "Bold", "Urban"]
  },
  {
    id: 2,
    name: "Eco Threads",
    slug: "eco-threads",
    tagline: "Sustainable fashion for a better tomorrow",
    story: "Eco Threads is pioneering the sustainable fashion movement. Using only organic materials and ethical production, they prove that fashion can be both beautiful and responsible.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=150&fit=crop",
    category: "Sustainable",
    featured: true,
    trending: true,
    values: ["Eco-Friendly", "Ethical", "Organic"]
  },
  {
    id: 3,
    name: "Heritage Weave",
    slug: "heritage-weave",
    tagline: "Traditional craftsmanship meets modern design",
    story: "Celebrating 300 years of textile heritage, Heritage Weave partners with artisan communities to create contemporary pieces using traditional handloom techniques.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=150&fit=crop",
    category: "Heritage",
    featured: true,
    trending: false,
    values: ["Handcrafted", "Traditional", "Artisan"]
  }
];

const brandCategories = [
  {
    name: "Streetwear Pioneers",
    description: "Bold, urban-inspired brands breaking fashion norms",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop",
    brands: 28
  },
  {
    name: "Sustainable Leaders",
    description: "Eco-conscious brands creating fashion with purpose",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop",
    brands: 34
  },
  {
    name: "Heritage Makers",
    description: "Traditional craftsmanship in contemporary designs",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=300&fit=crop",
    brands: 19
  },
  {
    name: "Minimalist Studios",
    description: "Clean lines and timeless elegance",
    image: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400&h=300&fit=crop",
    brands: 22
  },
  {
    name: "Bold Innovators",
    description: "Pushing boundaries with experimental designs",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea1f1d74?w=400&h=300&fit=crop",
    brands: 15
  },
  {
    name: "Vintage Revival",
    description: "Celebrating fashion's timeless classics",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop",
    brands: 26
  }
];

const brandSpotlight = [
  {
    name: "Midnight Canvas",
    spotlight: "Brand of the Month",
    description: "Transforming art into wearable masterpieces with bold prints and creative designs",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=400&fit=crop",
    badge: "Featured"
  },
  {
    name: "Wild Heart",
    spotlight: "Rising Star",
    description: "Bohemian-inspired pieces for free spirits and wanderers",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=400&fit=crop",
    badge: "New"
  }
];

export default function ExploreBrandsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-24 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Discover Unique Brands</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Explore Indie Brands
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
                Meet the creators, discover their stories, and find fashion that speaks to your soul
              </p>
              <div className="flex flex-wrap gap-6 justify-center items-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">150+</div>
                  <div className="text-sm text-muted-foreground">Independent Brands</div>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl font-bold">100K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Brands Stories */}
          <section className="py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Brand Stories</h2>
                  <p className="text-muted-foreground">Get to know the brands making waves in fashion</p>
                </div>
                <Link href="/brands" className="hidden md:flex items-center gap-2 text-primary hover:gap-3 transition-all">
                  View All Brands
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="space-y-12">
                {featuredBrands.map((brand, index) => (
                  <div
                    key={brand.id}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-gradient-to-br from-muted/50 to-background rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition-all`}
                  >
                    <div className="lg:w-1/2 relative h-[400px] w-full">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {brand.trending && (
                        <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                          <TrendingUp className="w-4 h-4" />
                          Trending Now
                        </div>
                      )}
                      <div className="absolute bottom-6 left-6">
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="w-20 h-20 rounded-xl border-4 border-white shadow-xl"
                        />
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {brand.category}
                      </div>
                      <h3 className="text-3xl font-bold mb-3">{brand.name}</h3>
                      <p className="text-lg text-muted-foreground italic mb-4">"{brand.tagline}"</p>
                      <p className="text-foreground/90 mb-6 leading-relaxed">{brand.story}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {brand.values.map((value) => (
                          <span key={value} className="px-3 py-1 bg-background border rounded-full text-sm">
                            {value}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/brands"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                      >
                        Explore {brand.name}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/brands"
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium text-lg"
                >
                  Discover More Brand Stories
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Brand Spotlights */}
          <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Brand Spotlights</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">This Month's Highlights</h2>
                <p className="text-muted-foreground">Celebrating exceptional brands that deserve your attention</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {brandSpotlight.map((brand, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute top-4 right-4 bg-white text-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {brand.badge}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-amber-400 text-sm font-semibold mb-2">{brand.spotlight}</div>
                        <h3 className="text-white text-2xl font-bold mb-2">{brand.name}</h3>
                        <p className="text-white/90 text-sm">{brand.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <Link
                        href="/brands"
                        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                      >
                        Explore Collection
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Browse by Category */}
          <section className="py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse by Style</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Find brands that match your aesthetic and values
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandCategories.map((category, index) => (
                  <Link
                    key={index}
                    href="/brands"
                    className="group relative bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all h-64"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">{category.brands} brands</span>
                        <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Why Shop Indie Brands */}
          <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Indie Brands?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Support independent creators and discover fashion with a story
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Unique & Authentic</h3>
                  <p className="text-muted-foreground">
                    Each brand brings its own unique perspective, creating pieces you won't find anywhere else
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sustainable & Ethical</h3>
                  <p className="text-muted-foreground">
                    Independent brands prioritize ethical production and environmental responsibility
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Support Creators</h3>
                  <p className="text-muted-foreground">
                    Your purchase directly supports independent designers and their creative vision
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-[#1BA6A6] to-teal-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <Star className="w-12 h-12 mx-auto mb-6 fill-white" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Brand Discovery Journey</h2>
              <p className="text-lg mb-8 text-teal-50 max-w-2xl mx-auto">
                Join thousands of fashion lovers who've found their style through independent brands
              </p>
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 bg-white text-[#1BA6A6] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse All Brands
                <ArrowRight className="w-5 h-5" />
              </Link>
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
  );
}
