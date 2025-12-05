"use client";

import { Heart, MessageCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const communityPosts = [
  {
    id: 1,
    user: "Sarah M.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    likes: 234,
    comments: 45,
    caption: "Perfect summer outfit! #FashionFynds",
  },
  {
    id: 2,
    user: "Alex K.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    likes: 189,
    comments: 32,
    caption: "Loving my new wardrobe essentials",
  },
  {
    id: 3,
    user: "Emma L.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    likes: 312,
    comments: 67,
    caption: "Street style inspiration ✨",
  },
  {
    id: 4,
    user: "Michael R.",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&q=80",
    likes: 156,
    comments: 28,
    caption: "Casual Friday vibes",
  },
];

export default function Community() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Users className="h-3 w-3 mr-1" />
            Community
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join The Style Movement
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how our community is styling their FashionFynds. Share your looks and get inspired.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white">
                <p className="text-sm font-semibold mb-2">{post.user}</p>
                <p className="text-xs text-center mb-3 line-clamp-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Join Our Community
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Tag <span className="font-semibold">#FashionFynds</span> to be featured
          </p>
        </div>
      </div>
    </section>
  );
}
