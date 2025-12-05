"use client";

import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface DealsSectionProps {
  onProductClick: (product: Product) => void;
}

export default function DealsSection({ onProductClick }: DealsSectionProps) {
  const dealProducts = products.filter((p) => p.deal);

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-background dark:from-red-950/20 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-500 text-white hover:bg-red-600">
            <Flame className="h-3 w-3 mr-1" />
            Hot Deals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Limited Time Offers
          </h2>
          <p className="text-muted-foreground">
            Don't miss out on these amazing deals - while supplies last!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
