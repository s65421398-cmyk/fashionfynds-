"use client";

import { useState } from "react";
import { Eye, Heart, ShoppingCart, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useShop } from "@/contexts/ShopContext";
import { cn, formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface QuickViewProps {
  product: Product;
  onViewFull: (product: Product) => void;
}

export default function QuickView({ product, onViewFull }: QuickViewProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast.success("Added to cart!");
    setIsOpen(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="relative group">
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <Eye className="h-4 w-4 mr-1" />
        Quick View
      </Button>

      {isOpen && (
        <div 
          className="absolute top-0 left-0 right-0 z-20 bg-white rounded-lg shadow-2xl border p-4 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex gap-4">
            <div className="relative w-32 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge variant="destructive" className="absolute top-1 left-1 text-xs">
                  -{discount}%
                </Badge>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase">{product.brand}</p>
              <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
              
              <div className="flex items-center gap-1 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium mb-1">Size</p>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 5).map((size) => (
                      <button
                        key={size}
                        className={cn(
                          "px-2 py-0.5 text-xs border rounded transition-colors",
                          selectedSize === size
                            ? "bg-primary text-white border-primary"
                            : "hover:border-primary"
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium mb-1">Color</p>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.slice(0, 4).map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "px-2 py-0.5 text-xs border rounded transition-colors",
                          selectedColor === color
                            ? "bg-primary text-white border-primary"
                            : "hover:border-primary"
                        )}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" className="flex-1 h-8 text-xs" onClick={handleAddToCart}>
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn("h-8 w-8 p-0", inWishlist && "text-red-500")}
                  onClick={handleWishlist}
                >
                  <Heart className={cn("h-3 w-3", inWishlist && "fill-current")} />
                </Button>
              </div>

              <Button
                variant="link"
                size="sm"
                className="w-full mt-1 h-6 text-xs"
                onClick={() => {
                  setIsOpen(false);
                  onViewFull(product);
                }}
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}