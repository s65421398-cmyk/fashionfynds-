"use client";

import { Instagram, Users, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    likes: 234,
    username: "@sarah_styles",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    likes: 189,
    username: "@fashion_nova",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    likes: 312,
    username: "@style_maven",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&q=80",
    likes: 156,
    username: "@trendy_fits",
  },
];

export default function Community() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1BA6A6] to-[#158A8A] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-white/30">
            <Users className="h-3 w-3 mr-1" />
            100K+ Community Members
          </Badge>
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
              <Instagram className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            JOIN THE FASHIONFYNDS COMMUNITY
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-4">
            See how our community is styling their FashionFynds. Share your looks, get inspired, and connect with fashion lovers worldwide.
          </p>
          
          {/* Community stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#FFD93D]" />
              <span className="font-semibold">2M+ Likes</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#FFD93D]" />
              <span className="font-semibold">50K+ Posts</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#FFD93D]" />
              <span className="font-semibold">100K+ Members</span>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-[#1BA6A6] hover:bg-white/90 font-semibold text-lg px-8 shadow-xl"
          >
            <Instagram className="h-5 w-5 mr-2" />
            Follow @fashionfynds
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <Instagram className="h-10 w-10 text-white mb-3" />
                <div className="text-white text-center">
                  <p className="font-semibold text-lg mb-1">
                    <Heart className="h-4 w-4 inline mr-1" />
                    {post.likes} likes
                  </p>
                  <p className="text-sm text-white/80">{post.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-white/90 text-lg mb-2">
            Tag <span className="font-bold text-[#FFD93D] text-xl">#FashionFynds</span> to be featured
          </p>
          <p className="text-white/70 text-sm">
            📸 Share your style • 🎁 Win monthly prizes • ⭐ Get featured on our feed
          </p>
        </div>
      </div>
    </section>
  );
}