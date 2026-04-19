"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const editorsPicks = [
  {
    id: 1,
    brand: "Nike",
    title: "The Return of Retro Running",
    story: "Nike's latest collection brings back the iconic designs of the 80s with modern performance technology. These aren't just shoes—they're a statement.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "Sneakers",
    featured: true,
  },
  {
    id: 2,
    brand: "Zara",
    title: "Sustainable Elegance",
    story: "Zara's new eco-conscious line proves that sustainability and style go hand in hand. Crafted from recycled materials without compromising on design.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    category: "Sustainable",
    featured: false,
  },
  {
    id: 3,
    brand: "Levi's",
    title: "Denim Reimagined",
    story: "The iconic American brand redefines denim with their latest collection featuring vintage washes and modern cuts that celebrate individuality.",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80",
    category: "Denim",
    featured: false,
  },
];

export default function EditorsPicks() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Curated by Experts
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">EDITOR'S PICKS</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real brands, real stories. Our editors handpick the most compelling pieces
            that are making waves in fashion right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorsPicks.map((pick) => (
            <div
              key={pick.id}
              className={`group relative overflow-hidden rounded-lg ${
                pick.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${pick.featured ? "h-[600px]" : "h-[400px]"} overflow-hidden`}>
                <img
                  src={pick.image}
                  alt={pick.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {pick.category}
                  </Badge>
                  <span className="text-sm font-semibold">{pick.brand}</span>
                </div>
                
                <h3 className={`font-bold mb-3 ${pick.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                  {pick.title}
                </h3>
                
                <p className={`text-white/90 mb-4 ${pick.featured ? "text-base md:text-lg max-w-2xl" : "text-sm line-clamp-2"}`}>
                  {pick.story}
                </p>

                  <Link href="/blog">
                    <Button
                      variant="secondary"
                      size={pick.featured ? "lg" : "default"}
                      className="transition-all"
                    >
                      Read Story
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
