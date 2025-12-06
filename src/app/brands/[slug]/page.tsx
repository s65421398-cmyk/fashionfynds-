"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { products } from "@/lib/products";
import { Star, MapPin, TrendingUp, ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BrandDetail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  founded: string;
  category: string;
  trending: boolean;
}

const brandsData: BrandDetail[] = [
  {
    slug: "nike",
    name: "Nike",
    tagline: "Just Do It",
    description: "Global leader in athletic footwear and apparel",
    story: "Nike has been inspiring athletes around the world for decades with innovative designs and cutting-edge technology. From professional sports to everyday fitness, Nike empowers everyone to push their limits.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    rating: 4.7,
    reviews: 1245,
    location: "Portland, OR",
    founded: "1964",
    category: "Athletic",
    trending: true
  },
  {
    slug: "levis",
    name: "Levi's",
    tagline: "The Original Jean",
    description: "Iconic denim brand since 1853",
    story: "Levi's invented the blue jean in 1873 and has been perfecting it ever since. Our denim is worn by individuals who stand for freedom, self-expression, and progress.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
    rating: 4.8,
    reviews: 892,
    location: "San Francisco, CA",
    founded: "1853",
    category: "Denim",
    trending: true
  },
  {
    slug: "coach",
    name: "Coach",
    tagline: "Modern Luxury",
    description: "American luxury fashion house",
    story: "Coach has been a symbol of accessible luxury since 1941. We believe that luxury is about quality, craftsmanship, and timeless style that transcends trends.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
    rating: 4.6,
    reviews: 673,
    location: "New York, NY",
    founded: "1941",
    category: "Luxury",
    trending: false
  },
  {
    slug: "reformation",
    name: "Reformation",
    tagline: "Being naked is the #1 most sustainable option",
    description: "Sustainable fashion for the conscious consumer",
    story: "Reformation makes killer clothes that don't kill the environment. We're a sustainable fashion brand that proves you don't have to choose between style and sustainability.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80",
    rating: 4.9,
    reviews: 534,
    location: "Los Angeles, CA",
    founded: "2009",
    category: "Sustainable",
    trending: true
  },
  {
    slug: "everlane",
    name: "Everlane",
    tagline: "Radical Transparency",
    description: "Modern basics with transparent pricing",
    story: "At Everlane, we want the right choice to be as easy as putting on a great T-shirt. That's why we partner with ethical factories, use radically transparent pricing, and obsess over quality.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80",
    rating: 4.7,
    reviews: 421,
    location: "San Francisco, CA",
    founded: "2010",
    category: "Sustainable",
    trending: false
  },
  {
    slug: "lululemon",
    name: "Lululemon",
    tagline: "Sweat Life",
    description: "Technical athletic apparel for yoga and running",
    story: "Lululemon creates components for people to live longer, healthier, and more fun lives. We started with yoga pants that helped people feel comfortable and confident.",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&q=80",
    rating: 4.8,
    reviews: 987,
    location: "Vancouver, BC",
    founded: "1998",
    category: "Athletic",
    trending: true
  }
];

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [saved, setSaved] = useState(false);

  const brandSlug = params.slug as string;
  const brand = brandsData.find((b) => b.slug === brandSlug);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Filter products by brand
  const brandProducts = brand
    ? products.filter((p) => p.brand.toLowerCase() === brand.name.toLowerCase())
    : [];

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Brand not found</h2>
          <Button onClick={() => router.push("/brands")}>View All Brands</Button>
        </div>
      </div>
    );
  }

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
          {/* Brand Hero */}
          <section className="relative h-96 overflow-hidden">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-7xl mx-auto">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/brands")}
                  className="mb-4 text-white hover:text-[#1BA6A6] hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Brands
                </Button>

                <div className="flex items-end gap-6">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-24 h-24 rounded-xl border-4 border-white shadow-lg object-cover"
                  />
                  <div className="flex-1 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <h1 className="text-4xl md:text-5xl font-bold">{brand.name}</h1>
                      {brand.trending && (
                        <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-xl italic mb-4">{brand.tagline}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{brand.rating}</span>
                        <span className="text-white/70">({brand.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{brand.location}</span>
                      </div>
                      <div>
                        <span className="text-white/70">Founded:</span> {brand.founded}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={() => setSaved(!saved)}
                    variant={saved ? "default" : "outline"}
                    className={saved ? "bg-red-500 hover:bg-red-600" : "border-white text-white hover:bg-white/10"}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${saved ? "fill-white" : ""}`} />
                    {saved ? "Saved" : "Save Brand"}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Story */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">About {brand.name}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{brand.description}</p>
                  <p className="text-foreground leading-relaxed">{brand.story}</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold">{brandProducts.length}</div>
                      <div className="text-sm text-muted-foreground">Products Available</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{brand.rating}</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-6">Brand Values</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#1BA6A6] rounded-full mt-2" />
                      <div>
                        <div className="font-semibold mb-1">Quality Craftsmanship</div>
                        <div className="text-sm text-muted-foreground">
                          Every product is crafted with attention to detail and quality materials.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#1BA6A6] rounded-full mt-2" />
                      <div>
                        <div className="font-semibold mb-1">Sustainable Practices</div>
                        <div className="text-sm text-muted-foreground">
                          Committed to reducing environmental impact through responsible sourcing.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#1BA6A6] rounded-full mt-2" />
                      <div>
                        <div className="font-semibold mb-1">Customer First</div>
                        <div className="text-sm text-muted-foreground">
                          Dedicated to providing exceptional products and service experiences.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="py-16 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Shop {brand.name}</h2>
                <span className="text-muted-foreground">
                  {brandProducts.length} Products
                </span>
              </div>

              {brandProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    No products available from this brand at the moment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {brandProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group"
                    >
                      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border">
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {(product.deal || product.originalPrice) && (
                            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold">
                              SALE
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-[#1BA6A6] transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
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
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </ShopProvider>
  );
}
