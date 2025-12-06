"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "All Products",
  "New Arrivals",
  "Women",
  "Men",
  "Accessories",
  "Shoes",
  "Bags",
  "Activewear",
  "Outerwear",
  "Dresses",
  "Sale"
];

export default function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState("All Products");

  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Desktop Categories - Horizontal scrollable */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
            <div className="flex items-center space-x-1 flex-nowrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? "text-[#1BA6A6]"
                      : "text-muted-foreground hover:text-[#1BA6A6]"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1BA6A6] animate-in slide-in-from-left duration-300" />
                  )}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-4 shrink-0 hover:text-[#1BA6A6]"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Mobile Categories - Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            <div className="flex space-x-2 flex-nowrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-[#1BA6A6] text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                View All
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
