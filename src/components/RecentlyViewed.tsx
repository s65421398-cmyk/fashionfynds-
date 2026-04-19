"use client";

import { useEffect, useState } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils";

interface RecentlyViewedProps {
  onProductClick: (product: Product) => void;
  currentProductId?: string;
}

const STORAGE_KEY = "recently-viewed";
const MAX_ITEMS = 12;

export function addToRecentlyViewed(product: Product) {
  if (typeof window === "undefined") return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let items: Product[] = stored ? JSON.parse(stored) : [];
    
    items = items.filter((p) => p.id !== product.id);
    items.unshift(product);
    items = items.slice(0, MAX_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export default function RecentlyViewed({ onProductClick, currentProductId }: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items: Product[] = JSON.parse(stored);
        const filtered = currentProductId 
          ? items.filter((p) => p.id !== currentProductId)
          : items;
        setProducts(filtered);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentProductId]);

  if (products.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("recently-viewed-scroll");
    if (container) {
      const scrollAmount = 280;
      const newPosition = direction === "left" 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Recently Viewed</h2>
              <p className="text-sm text-muted-foreground">Continue where you left off</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          id="recently-viewed-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: "smooth" }}
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[200px] group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
              <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}