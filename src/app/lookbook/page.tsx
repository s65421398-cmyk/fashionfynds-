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
import { Badge } from "@/components/ui/badge";
import { Camera, Heart, Share2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const lookbookItems = [
  {
    id: 1,
    title: "Urban Minimalist",
    description: "Clean lines and neutral tones for the modern professional",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    products: ["Tailored Blazer", "Wide-leg Trousers", "Leather Loafers"],
    season: "Fall/Winter",
  },
  {
    id: 2,
    title: "Boho Dreams",
    description: "Free-spirited looks with flowing fabrics and earthy hues",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
    products: ["Maxi Dress", "Fringe Bag", "Layered Necklaces"],
    season: "Spring/Summer",
  },
  {
    id: 3,
    title: "Street Style",
    description: "Bold and edgy combinations for the urban explorer",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    products: ["Oversized Hoodie", "Cargo Pants", "High-top Sneakers"],
    season: "All Season",
  },
  {
    id: 4,
    title: "Evening Elegance",
    description: "Sophisticated ensembles for special occasions",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    products: ["Silk Gown", "Statement Earrings", "Clutch Bag"],
    season: "All Season",
  },
  {
    id: 5,
    title: "Weekend Casual",
    description: "Relaxed yet put-together looks for off-duty days",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    products: ["Denim Jacket", "Basic Tee", "White Sneakers"],
    season: "Spring/Summer",
  },
  {
    id: 6,
    title: "Power Dressing",
    description: "Command attention with bold silhouettes and rich colors",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800",
    products: ["Power Suit", "Pointed Heels", "Structured Bag"],
    season: "Fall/Winter",
  },
];

export default function LookbookPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [likedLooks, setLikedLooks] = useState<number[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const toggleLike = (id: number) => {
    setLikedLooks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white py-20 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Camera className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Lookbook</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Get inspired by our curated style guides and outfit ideas
              </p>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Updated seasonally with fresh inspiration</span>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lookbookItems.map((look) => (
                <div
                  key={look.id}
                  className="group bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={look.image}
                      alt={look.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-black">
                      {look.season}
                    </Badge>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/90 hover:bg-white"
                        onClick={() => toggleLike(look.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedLooks.includes(look.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/90 hover:bg-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{look.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{look.description}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                      Shop the Look
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {look.products.map((product) => (
                        <Badge key={product} variant="outline">
                          {product}
                        </Badge>
                      ))}
                    </div>
                    <Link href="/products">
                      <Button className="w-full group/btn">
                        Shop This Look
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Share Your Style</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Tag @fashionfynds on Instagram for a chance to be featured in our lookbook
              </p>
              <Button size="lg" variant="secondary">
                #FashionFyndsStyle
              </Button>
            </section>
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
