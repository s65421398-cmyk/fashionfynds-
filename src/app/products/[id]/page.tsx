"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShopProvider, useShop } from "@/contexts/ShopContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
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
import { Star, Heart, ShoppingCart as CartIcon, Truck, Shield, RotateCcw, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const { trackEcommerce } = useAnalytics();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
      setSelectedSize(foundProduct.sizes[0] || "");
      setSelectedColor(foundProduct.colors[0] || "");
      
      // Track product view event
      trackEcommerce('view_item', {
        items: [{
          item_id: foundProduct.id,
          item_name: foundProduct.name,
          price: foundProduct.price,
          currency: 'USD',
          item_brand: foundProduct.brand,
          item_category: foundProduct.category,
        }],
        value: foundProduct.price,
        currency: 'USD',
      });
    }
  }, [params.id, trackEcommerce]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onAuthOpen={() => setAuthOpen(true)}
      />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                {product.category}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 hover:text-[#1BA6A6]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === img
                            ? "border-[#1BA6A6]"
                            : "border-transparent hover:border-muted-foreground"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">
                    {product.brand}
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-2xl text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-semibold">Size</label>
                    <button className="text-sm text-[#1BA6A6] hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? "border-[#1BA6A6] bg-[#1BA6A6] text-white"
                            : "border-border hover:border-[#1BA6A6]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-8">
                  <label className="font-semibold block mb-3">
                    Color: <span className="text-muted-foreground font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                          selectedColor === color
                            ? "border-[#1BA6A6] bg-[#1BA6A6] text-white"
                            : "border-border hover:border-[#1BA6A6]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <label className="font-semibold block mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 border-2 border-border rounded-lg hover:border-[#1BA6A6] transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 border-2 border-border rounded-lg hover:border-[#1BA6A6] transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg"
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <CartIcon className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleWishlistToggle}
                    className={`h-14 ${
                      isInWishlist(product.id)
                        ? "bg-red-50 border-red-500 text-red-500"
                        : "hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(product.id) ? "fill-red-500" : ""
                      }`}
                    />
                  </Button>
                </div>

                {/* Features */}
                <div className="space-y-4 border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#1BA6A6]" />
                    <span className="text-sm">Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-[#1BA6A6]" />
                    <span className="text-sm">30-day easy returns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#1BA6A6]" />
                    <span className="text-sm">Secure payment guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          {relatedProduct.brand}
                        </p>
                        <h3 className="font-semibold mb-2 line-clamp-1">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">${relatedProduct.price}</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${relatedProduct.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
        onProductClick={(p) => setSelectedProduct(p)}
      />
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onProductSelect={(p) => setSelectedProduct(p)}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <ShopProvider>
      <ProductDetailContent />
    </ShopProvider>
  );
}