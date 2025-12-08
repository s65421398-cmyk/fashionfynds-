"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, ChevronRight, Clock, TrendingUp } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";

interface DealsSectionProps {
  onProductClick: (product: Product) => void;
}

export default function DealsSection({ onProductClick }: DealsSectionProps) {
  const dealProducts = products.filter((p) => p.deal);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-pulse">
            <Flame className="h-3 w-3 mr-1" />
            Hot Deals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Limited Time Offers
          </h2>
          <p className="text-muted-foreground mb-4">
            Don't miss out on these amazing deals - while supplies last!
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-[#FF6B6B]" />
              <span className="font-semibold">Flash Sale Ends Today</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-[#FFD93D]" />
              <span className="font-semibold">234 people viewing now</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Flame className="h-4 w-4 text-[#FF8E53]" />
              <span className="font-semibold">Limited Stock Available</span>
            </div>
          </div>

          <Link href="/deals">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7043] text-white shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              View All Deals - Save Up to 70%
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
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