"use client";

export const dynamic = "force-dynamic";


import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store } from "lucide-react";


export default function StoresPage() {
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

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Store className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Store Locator</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                FashionFynds is currently an online-only store — shop from anywhere in India!
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <Store className="h-20 w-20 mx-auto text-[#1BA6A6] mb-6" />
              <h2 className="text-3xl font-bold mb-4">We&apos;re 100% Online</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                FashionFynds delivers across India. Shop from the comfort of your home and get your order delivered to your doorstep.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
                <Card className="p-6 text-center">
                  <p className="text-2xl mb-2">🚀</p>
                  <p className="font-semibold">Pan-India Delivery</p>
                  <p className="text-sm text-muted-foreground mt-1">All states covered</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-2xl mb-2">📦</p>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-muted-foreground mt-1">On orders over ₹999</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-2xl mb-2">🔄</p>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-muted-foreground mt-1">7-day return policy</p>
                </Card>
              </div>
              <Button size="lg" asChild>
                <a href="/products">Shop Now</a>
              </Button>
            </div>
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
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
      </div>
  );
}
