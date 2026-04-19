"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  { name: "All Products", slug: "all" },
  { name: "Women", slug: "women" },
  { name: "Men", slug: "men" },
  { name: "Kids", slug: "kids" },
  { name: "Shoes", slug: "shoes" },
  { name: "Bags", slug: "bags" },
  { name: "Accessories", slug: "accessories" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Beauty", slug: "beauty" },
  { name: "Activewear", slug: "activewear" },
  { name: "Vintage", slug: "vintage" },
  { name: "Sustainable", slug: "sustainable" },
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
                <Link
                  key={category.slug}
                  href={category.slug === "all" ? "/explore" : `/categories/${category.slug}`}
                  onClick={() => setActiveCategory(category.name)}
                  className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.name
                      ? "text-[#1BA6A6]"
                      : "text-muted-foreground hover:text-[#1BA6A6]"
                  }`}
                >
                  {category.name}
                  {activeCategory === category.name && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1BA6A6] animate-in slide-in-from-left duration-300" />
                  )}
                </Link>
              ))}
            </div>
            <Link href="/explore">
              <Button
                variant="ghost"
                size="sm"
                className="ml-4 shrink-0 hover:text-[#1BA6A6]"
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Categories - Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            <div className="flex space-x-2 flex-nowrap">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.slug === "all" ? "/explore" : `/categories/${category.slug}`}
                  onClick={() => setActiveCategory(category.name)}
                  className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 ${
                    activeCategory === category.name
                      ? "bg-[#1BA6A6] text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                href="/explore"
                className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full bg-muted text-muted-foreground flex items-center gap-1"
              >
                View All
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}