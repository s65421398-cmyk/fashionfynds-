"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import { useShop } from "@/contexts/ShopContext";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingBag, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

function WishlistContent() {
  const router = useRouter();
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || "M",
      selectedColor: product.colors?.[0] || "Black",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Heart className="h-8 w-8 text-[#1BA6A6]" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground mt-2">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-24 w-24 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start adding items you love to your wishlist. Click the heart icon on any product to save it here.
              </p>
              <Link href="/">
                <Button size="lg">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="relative aspect-square cursor-pointer overflow-hidden"
                    onClick={() => handleProductClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{item.brand}</p>
                    <h3
                      className="font-semibold line-clamp-1 cursor-pointer hover:text-[#1BA6A6] transition-colors"
                      onClick={() => handleProductClick(item)}
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        className="flex-1"
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

export default function WishlistPage() {
  return (
      <WishlistContent />
  );
}