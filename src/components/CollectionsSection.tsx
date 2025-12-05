"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { collections } from "@/lib/products";

export default function CollectionsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="h-3 w-3 mr-1" />
            Curated Collections
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop By Collection
          </h2>
          <p className="text-muted-foreground">
            Handpicked styles for every occasion and mood
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative h-[400px] rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{collection.name}</h3>
                <p className="text-white/90 mb-4">{collection.description}</p>
                <Button
                  variant="secondary"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
