"use client";

import { useState } from "react";
import { ShopProvider } from "@/contexts/ShopContext";
import Header from "@/components/Header";
import TrendingTicker from "@/components/TrendingTicker";
import TrendingNowBanner from "@/components/TrendingNowBanner";
import HeroCarousel from "@/components/HeroCarousel";
import CollectionsSection from "@/components/CollectionsSection";
import TodaySteals from "@/components/TodaySteals";
import BrandCarousel from "@/components/BrandCarousel";
import DealsSection from "@/components/DealsSection";
import EditorsPicks from "@/components/EditorsPicks";
import ShopByMovement from "@/components/ShopByMovement";
import Community from "@/components/Community";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import { Product } from "@/types/product";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
          onAuthOpen={() => setAuthOpen(true)}
        />
        
        <main>
          <TrendingTicker />
          <TrendingNowBanner />
          <HeroCarousel />
          <CollectionsSection />
          <TodaySteals onProductClick={handleProductClick} />
          <BrandCarousel />
          <DealsSection onProductClick={handleProductClick} />
          <EditorsPicks />
          <ShopByMovement />
          <Community />
          <Newsletter />
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