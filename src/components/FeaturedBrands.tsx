"use client";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { brands } from "@/lib/products";

export default function FeaturedBrands() {
  return (
    <section className="py-16 border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Star className="h-3 w-3 mr-1" />
            Featured Brands
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop By Brand
          </h2>
          <p className="text-muted-foreground">
            Discover collections from the world's most loved fashion brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <button
              key={brand.name}
              className="group relative aspect-square rounded-lg overflow-hidden bg-muted hover:bg-muted/80 transition-colors"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {brand.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
