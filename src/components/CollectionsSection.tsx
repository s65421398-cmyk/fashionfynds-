"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    id: "summer",
    slug: "summer-essentials",
    name: "Summer Essentials",
    description: "Light and breezy pieces for warm weather",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
  },
  {
    id: "workwear",
    slug: "office-ready",
    name: "Office Ready",
    description: "Professional looks for the workplace",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
  },
  {
    id: "weekend",
    slug: "weekend-vibes",
    name: "Weekend Vibes",
    description: "Casual comfort for your days off",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
  },
  {
    id: "athleisure",
    slug: "athleisure",
    name: "Athleisure",
    description: "Comfort meets style",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80"
  },
  {
    id: "evening",
    slug: "evening-wear",
    name: "Evening Wear",
    description: "Elegant pieces for special occasions",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80"
  },
  {
    id: "party",
    slug: "party-ready",
    name: "Party Ready",
    description: "Stand out at every celebration",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"
  }
];

export default function CollectionsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          Collections &gt; Shop by Collection
        </div>

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/categories/${collection.slug}`}>
              <div className="group relative h-[400px] rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-white/90 mb-4">{collection.description}</p>
                  <Button
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center">
          <Link href="/collections">
            <Button size="lg" variant="outline" className="hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-all">
              View All Collections
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}