"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Clock, TrendingDown, Sparkles, ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DBProduct {
  id: number;
  name: string;
  slug: string;
  brandId: number | null;
  categoryId: number | null;
  price: number;
  originalPrice: number | null;
  description: string | null;
  image: string;
  images: string[] | null;
  sizes: string[] | null;
  colors: string[] | null;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  deal: boolean;
  dealDiscount: number | null;
  dealEndsAt: string | null;
  movement: string | null;
}

function transformProduct(dbProduct: DBProduct): Product {
  return {
    id: String(dbProduct.id),
    name: dbProduct.name,
    brand: "FashionFynds",
    price: dbProduct.price,
    originalPrice: dbProduct.originalPrice ?? undefined,
    image: dbProduct.image,
    images: dbProduct.images ?? undefined,
    category: "Fashion",
    description: dbProduct.description ?? "",
    sizes: dbProduct.sizes ?? ["S", "M", "L"],
    colors: dbProduct.colors ?? ["Black"],
    rating: dbProduct.rating ?? 0,
    reviews: dbProduct.reviews ?? 0,
    inStock: dbProduct.inStock ?? true,
    featured: dbProduct.featured ?? false,
    deal: dbProduct.deal ?? false,
    movement: dbProduct.movement ?? undefined,
  };
}

export default function DealsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("discount");
  
  // Modal states
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/products?deal=true");
      if (!response.ok) {
        throw new Error("Failed to fetch deals");
      }
      
      const data = await response.json();
      const dealProducts = Array.isArray(data) 
        ? data.map(transformProduct)
        : (data.products || []).map(transformProduct);
      setProducts(dealProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load deals");
      console.error("Error fetching deals:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
        const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
        return discountB - discountA;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[#FF6B6B] via-[#FF5252] to-[#D32F2F] text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h40v40H0V0zm20%2020v20h20V20H20zm0-20v20h20V0H20z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />
            
            <div className="container mx-auto px-4 relative z-10">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center justify-center mb-6">
                <Badge className="bg-white text-[#FF6B6B] hover:bg-white/90 text-lg px-6 py-3 animate-pulse shadow-lg">
                  <Flame className="h-5 w-5 mr-2" />
                  Limited Time Offers
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 tracking-tight">
                Hot Deals & Steals
              </h1>
              
              <p className="text-center text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light">
                Unbeatable prices on premium fashion - grab them before they're gone!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Up to 70% Off</h3>
                  <p className="text-white/80 text-sm">Massive discounts on selected items</p>
                </div>
                
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Flash Sales</h3>
                  <p className="text-white/80 text-sm">Limited time offers expire soon</p>
                </div>
                
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">New Deals Daily</h3>
                  <p className="text-white/80 text-sm">Fresh offers added every day</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-40" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                </>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="bg-destructive/10 text-destructive rounded-2xl p-10 max-w-md mx-auto">
                    <Flame className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-semibold mb-2">Oops! Something went wrong</p>
                    <p className="text-sm mb-6 opacity-80">{error}</p>
                    <Button onClick={fetchDeals} variant="outline" size="lg">
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-muted rounded-2xl p-10 max-w-md mx-auto">
                    <Flame className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
                    <p className="text-xl font-semibold mb-2">No Active Deals</p>
                    <p className="text-muted-foreground text-sm mb-6">
                      Check back soon for new limited time offers!
                    </p>
                    <Button onClick={() => router.push("/")} size="lg">
                      Browse All Products
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        All Deals
                      </h2>
                      <p className="text-muted-foreground">
                        {sortedProducts.length} {sortedProducts.length === 1 ? "deal" : "deals"} available
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[#FF6B6B] border-[#FF6B6B] px-4 py-2">
                        <Clock className="h-3 w-3 mr-2" />
                        Limited Time
                      </Badge>
                      
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discount">Biggest Discount</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Top Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={handleProductClick}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* CTA Section */}
          {sortedProducts.length > 0 && (
            <section className="py-16 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white">
              <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-4">Don't Miss Out!</h3>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  These deals won't last forever. Subscribe to get notified about new flash sales and exclusive offers.
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="font-semibold"
                  onClick={() => router.push("/#newsletter")}
                >
                  Get Deal Alerts
                </Button>
              </div>
            </section>
          )}
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