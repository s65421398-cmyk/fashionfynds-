"use client";

import { useState, useEffect } from "react";
import { X, Heart, Star, ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product";
import { useShop } from "@/contexts/ShopContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { cn, formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import SizeGuide from "@/components/SizeGuide";
import StockNotification from "@/components/StockNotification";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, open, onClose }: ProductModalProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const { trackEcommerce, trackEvent } = useAnalytics();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  // Track product view when modal opens
  useEffect(() => {
    if (open && product) {
      trackEcommerce('view_item', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          currency: 'USD',
          item_brand: product.brand,
          item_category: product.category,
        }],
        value: product.price,
        currency: 'USD',
      });

      trackEvent('product_view', {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        product_price: product.price,
      });
    }
  }, [open, product, trackEcommerce, trackEvent]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    toast.success("Added to cart!");
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <VisuallyHidden>
            <DialogTitle>{product.name}</DialogTitle>
          </VisuallyHidden>
          <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.deal && discount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-4 left-4 font-semibold"
                >
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      currentImage === index
                        ? "border-primary"
                        : "border-transparent"
                    )}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h2 className="text-3xl font-bold mt-1">{product.name}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={cn(inWishlist && "text-red-500")}
                >
                  <Heart
                    className={cn("h-6 w-6", inWishlist && "fill-current")}
                  />
                </Button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">
                  Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                </label>
                <SizeGuide />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {selectedSize === size && <Check className="h-4 w-4 mr-1" />}
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && <Check className="h-4 w-4 mr-1" />}
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Add to Cart Button */}
            {product.inStock ? (
              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>
            ) : (
              <StockNotification 
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
            )}

            {/* Product Info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              {product.movement && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Movement</span>
                  <span className="font-medium">{product.movement}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Free Shipping</span>
                <span className="font-medium">Orders over ₹8,300</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}