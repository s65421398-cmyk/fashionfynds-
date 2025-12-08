"use client";

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
import { ShopProvider } from "@/contexts/ShopContext";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Clock, TrendingDown, Sparkles, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DealsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
      
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch deals");
      }
      
      const data = await response.json();
      // Filter only products with deals
      const dealProducts = data.products.filter((p: Product) => p.deal);
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

  return (
    <ShopProvider>
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[#FF6B6B] to-[#FF5252] text-white py-16">
            <div className="container mx-auto px-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center justify-center mb-4">
                <Badge className="bg-white text-[#FF6B6B] hover:bg-white/90 text-lg px-4 py-2">
                  <Flame className="h-5 w-5 mr-2" />
                  Limited Time Offers
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
                Hot Deals & Steals
              </h1>
              
              <p className="text-center text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Don't miss out on these incredible offers - available while supplies last!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <TrendingDown className="h-10 w-10 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Up to 70% Off</h3>
                  <p className="text-white/80 text-sm">Massive discounts on selected items</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Flash Sales</h3>
                  <p className="text-white/80 text-sm">Limited time offers expire soon</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <Sparkles className="h-10 w-10 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">New Deals Daily</h3>
                  <p className="text-white/80 text-sm">Fresh offers added every day</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                </>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="bg-destructive/10 text-destructive rounded-lg p-8 max-w-md mx-auto">
                    <p className="text-lg font-semibold mb-2">Oops! Something went wrong</p>
                    <p className="text-sm mb-4">{error}</p>
                    <Button onClick={fetchDeals} variant="outline">
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                    <Flame className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-semibold mb-2">No Active Deals</p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Check back soon for new limited time offers!
                    </p>
                    <Button onClick={() => router.push("/")}>
                      Browse All Products
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      All Deals ({products.length})
                    </h2>
                    <Badge variant="outline" className="text-[#FF6B6B] border-[#FF6B6B]">
                      <Clock className="h-3 w-3 mr-1" />
                      Limited Time
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
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
    </ShopProvider>
  );
}
