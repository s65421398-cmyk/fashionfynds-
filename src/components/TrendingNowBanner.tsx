"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const trendingProducts = [
  {
    name: "Vintage Denim Jacket",
    brand: "Levi's",
    price: "$89.99",
    badge: "🔥 Selling Fast",
  },
  {
    name: "Minimalist Leather Bag",
    brand: "Fossil",
    price: "$129.99",
    badge: "⚡ Top Rated",
  },
  {
    name: "Sustainable Cotton Tee",
    brand: "Patagonia",
    price: "$45.00",
    badge: "🌿 Eco-Friendly",
  },
  {
    name: "Urban Streetwear Hoodie",
    brand: "Nike",
    price: "$79.99",
    badge: "🔥 Best Seller",
  },
  {
    name: "Classic White Sneakers",
    brand: "Adidas",
    price: "$95.00",
    badge: "⭐ Trending",
  },
];

export default function TrendingNowBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length);
  };

  return (
    <div className="bg-muted text-foreground py-6 relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-background hover:bg-accent flex-shrink-0"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Content */}
          <div className="flex-1 mx-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Flame className="h-5 w-5 text-destructive" />
                <span>TRENDING NOW</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="text-center">
                <p className="font-semibold text-base">
                  {trendingProducts[currentIndex].name}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-muted-foreground">{trendingProducts[currentIndex].brand}</span>
                  <span>•</span>
                  <span className="font-bold">{trendingProducts[currentIndex].price}</span>
                  <span>•</span>
                  <span>{trendingProducts[currentIndex].badge}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-background hover:bg-accent flex-shrink-0"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5 mt-3">
          {trendingProducts.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-foreground w-6"
                  : "bg-muted-foreground/30 w-1.5 hover:bg-muted-foreground/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}