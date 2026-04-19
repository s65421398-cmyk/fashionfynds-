"use client";

import { useState, useEffect } from "react";
import { Scale, X, Plus, ShoppingCart, Heart, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useShop } from "@/contexts/ShopContext";
import { cn, formatPrice } from "@/lib/utils";
import { toast } from "sonner";

const STORAGE_KEY = "compare-products";
const MAX_COMPARE = 4;

export function addToCompare(product: Product) {
  if (typeof window === "undefined") return false;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let items: Product[] = stored ? JSON.parse(stored) : [];
    
    if (items.some((p) => p.id === product.id)) {
      toast.info("Already in comparison");
      return false;
    }
    
    if (items.length >= MAX_COMPARE) {
      toast.error(`Max ${MAX_COMPARE} products to compare`);
      return false;
    }
    
    items.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("compare-updated"));
    toast.success("Added to comparison");
    return true;
  } catch {
    return false;
  }
}

export function removeFromCompare(productId: string) {
  if (typeof window === "undefined") return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let items: Product[] = stored ? JSON.parse(stored) : [];
    items = items.filter((p) => p.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("compare-updated"));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function isInCompare(productId: string): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const items: Product[] = stored ? JSON.parse(stored) : [];
    return items.some((p) => p.id === productId);
  } catch {
    return false;
  }
}

interface CompareProductsProps {
  onProductClick?: (product: Product) => void;
}

export default function CompareProducts({ onProductClick }: CompareProductsProps) {
  const { addToCart, addToWishlist } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  const loadProducts = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setProducts(stored ? JSON.parse(stored) : []);
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
    
    const handleUpdate = () => loadProducts();
    window.addEventListener("compare-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    
    return () => {
      window.removeEventListener("compare-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts([]);
    window.dispatchEvent(new Event("compare-updated"));
  };

  const handleRemove = (productId: string) => {
    removeFromCompare(productId);
    loadProducts();
  };

  if (products.length === 0) return null;

  const compareFields = [
    { label: "Price", key: "price", format: (p: Product) => formatPrice(p.price) },
    { label: "Original Price", key: "originalPrice", format: (p: Product) => p.originalPrice ? formatPrice(p.originalPrice) : "-" },
    { label: "Brand", key: "brand", format: (p: Product) => p.brand },
    { label: "Category", key: "category", format: (p: Product) => p.category },
    { label: "Rating", key: "rating", format: (p: Product) => `${p.rating} ★ (${p.reviews})` },
    { label: "Sizes", key: "sizes", format: (p: Product) => p.sizes.join(", ") },
    { label: "Colors", key: "colors", format: (p: Product) => p.colors.join(", ") },
    { label: "In Stock", key: "inStock", format: (p: Product) => p.inStock ? "Yes" : "No" },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "fixed bottom-24 left-6 z-50 gap-2 shadow-lg transition-all",
              products.length > 0 ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
            )}
          >
            <Scale className="h-4 w-4" />
            Compare ({products.length})
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Compare Products
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3 bg-muted/50 min-w-[120px]">Product</th>
                  {products.map((product) => (
                    <th key={product.id} className="p-3 bg-muted/50 min-w-[180px]">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-1 -right-1 h-6 w-6"
                          onClick={() => handleRemove(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setOpen(false);
                            onProductClick?.(product);
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-32 object-cover rounded-lg mx-auto mb-2"
                          />
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                          <p className="font-medium text-sm line-clamp-2">{product.name}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                  {products.length < MAX_COMPARE && (
                    <th className="p-3 bg-muted/50 min-w-[180px]">
                      <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Plus className="h-8 w-8 mx-auto mb-1" />
                          <p className="text-xs">Add product</p>
                        </div>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {compareFields.map((field, index) => (
                  <tr key={field.key} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                    <td className="p-3 font-medium text-sm">{field.label}</td>
                    {products.map((product) => {
                      const value = field.format(product);
                      const isLowest = field.key === "price" && 
                        product.price === Math.min(...products.map(p => p.price));
                      const isHighestRating = field.key === "rating" && 
                        product.rating === Math.max(...products.map(p => p.rating));
                      
                      return (
                        <td key={product.id} className="p-3 text-sm text-center">
                          <span className={cn(
                            (isLowest || isHighestRating) && "text-green-600 font-semibold"
                          )}>
                            {value}
                            {isLowest && <Badge variant="secondary" className="ml-2 text-xs">Lowest</Badge>}
                            {isHighestRating && <Badge variant="secondary" className="ml-2 text-xs">Best</Badge>}
                          </span>
                        </td>
                      );
                    })}
                    {products.length < MAX_COMPARE && <td className="p-3" />}
                  </tr>
                ))}
                <tr className="bg-muted/30">
                  <td className="p-3 font-medium text-sm">Actions</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-3">
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => {
                            if (product.sizes.length > 0 && product.colors.length > 0) {
                              addToCart(product, product.sizes[0], product.colors[0]);
                              toast.success("Added to cart!");
                            } else {
                              onProductClick?.(product);
                              setOpen(false);
                            }
                          }}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={() => {
                            addToWishlist(product);
                            toast.success("Added to wishlist!");
                          }}
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Wishlist
                        </Button>
                      </div>
                    </td>
                  ))}
                  {products.length < MAX_COMPARE && <td className="p-3" />}
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}