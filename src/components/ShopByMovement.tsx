"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import { movements } from "@/lib/products";

export default function ShopByMovement() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <TrendingUp className="h-3 w-3 mr-1" />
            Style Movements
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Movement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every style tells a story. Discover collections that match your
            lifestyle and express your unique personality.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movements.map((movement) => (
            <div
              key={movement.id}
              className="group relative h-[500px] rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={movement.image}
                alt={movement.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{movement.name}</h3>
                <p className="text-white/90 text-sm mb-4">
                  {movement.description}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
