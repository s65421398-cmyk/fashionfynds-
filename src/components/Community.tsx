"use client";

import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    likes: 234,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    likes: 189,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    likes: 312,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&q=80",
    likes: 156,
  },
];

export default function Community() {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#1BA6A6] flex items-center justify-center">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            JOIN THE COMMUNITY
          </h2>
          <p className="text-background/80 text-lg max-w-2xl mx-auto mb-6">
            See how our community is styling their FashionFynds. Share your looks and get inspired.
          </p>
          <Button 
            size="lg"
            className="bg-[#1BA6A6] hover:bg-[#158A8A] text-white"
          >
            <Instagram className="h-5 w-5 mr-2" />
            Follow @fashionfynds
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#1BA6A6]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <Instagram className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">{post.likes} likes</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-background/70 text-sm">
            Tag <span className="font-semibold text-[#1BA6A6]">#FashionFynds</span> to be featured
          </p>
        </div>
      </div>
    </section>
  );
}