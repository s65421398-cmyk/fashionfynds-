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
import { Sparkles, ArrowLeft, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewArrivalsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      const allProducts = data.products || data;
      setProducts(allProducts.slice(0, 16));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-16 mb-12">
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
                <Badge className="bg-white text-emerald-600 hover:bg-white/90 text-lg px-4 py-2">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Just Dropped
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
                New Arrivals
              </h1>

              <p className="text-center text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Be the first to shop the latest trends and freshest styles
              </p>

              <div className="flex items-center justify-center gap-2 text-white/80">
                <Clock className="h-5 w-5" />
                <span>Updated daily with new styles</span>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <Sparkles className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No New Arrivals</h2>
                <p className="text-muted-foreground mb-6">Check back soon for new products!</p>
                <Button onClick={() => router.push("/products")}>Browse All Products</Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Fresh Drops ({products.length})
                  </h2>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    This Week
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
        <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </div>
  );
}
