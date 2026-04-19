"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface TodayStealsProps {
  onProductClick: (product: Product) => void;
}

const stealsProducts: Product[] = [
  {
    id: "steal-1",
    name: "Vintage Denim Jacket",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    brand: "Vintage Revival",
    category: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue"],
    rating: 4.8,
    reviews: 234,
    deal: { discount: 40, endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000) },
  },
  {
    id: "steal-2",
    name: "Boho Maxi Dress",
    price: 3499,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    brand: "Wild Heart",
    category: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral"],
    rating: 4.9,
    reviews: 189,
    deal: { discount: 36, endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000) },
  },
  {
    id: "steal-3",
    name: "Streetwear Hoodie",
    price: 1499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    brand: "Urban Rebel",
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray"],
    rating: 4.7,
    reviews: 312,
    deal: { discount: 50, endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000) },
  },
  {
    id: "steal-4",
    name: "Leather Crossbody Bag",
    price: 3499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    brand: "Minimalist Studio",
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    rating: 4.6,
    reviews: 156,
    deal: { discount: 42, endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000) },
  },
];

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      <div className="bg-foreground text-background px-1.5 py-0.5 rounded">
        {String(timeLeft.hours).padStart(2, "0")}
      </div>
      <span>:</span>
      <div className="bg-foreground text-background px-1.5 py-0.5 rounded">
        {String(timeLeft.minutes).padStart(2, "0")}
      </div>
      <span>:</span>
      <div className="bg-foreground text-background px-1.5 py-0.5 rounded">
        {String(timeLeft.seconds).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function TodaySteals({ onProductClick }: TodayStealsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">TODAY'S STEALS</h2>
            <p className="text-muted-foreground">Limited Time Offers</p>
          </div>
          <Button 
            size="lg"
            className="mt-4 md:mt-0 bg-[#FF6B6B] hover:bg-[#FF5252] text-white"
          >
            HOT DEALS
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stealsProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="group cursor-pointer bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                {product.deal && (
                  <Badge className="absolute top-3 left-3 bg-[#FFD93D] hover:bg-[#FFC700] text-foreground font-bold text-base px-3 py-1">
                    {product.deal.discount}% OFF
                  </Badge>
                )}
              </div>
              
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {product.deal && (
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-muted-foreground">Ends in</span>
                    <CountdownTimer endTime={product.deal.endsAt} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}