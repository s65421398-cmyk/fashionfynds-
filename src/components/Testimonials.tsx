"use client";

import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    location: "New York, NY",
    rating: 5,
    text: "I love discovering unique brands on FashionFynds! The quality is amazing and I always get compliments on my outfits. Best fashion finds online!",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Finally found a platform that curates indie brands worth checking out. Fast shipping, great customer service, and authentic products every time.",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    location: "Chicago, IL",
    rating: 5,
    text: "The deals are incredible! I've saved so much money while building my dream wardrobe. FashionFynds is my go-to for online shopping now.",
    verified: true,
  },
  {
    id: 4,
    name: "David Park",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    location: "Seattle, WA",
    rating: 5,
    text: "As someone who values sustainable fashion, I appreciate how FashionFynds highlights eco-conscious brands. Shopping with purpose has never been easier!",
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial) => (
                <Avatar key={testimonial.id} className="border-2 border-background">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved By 100,000+ Customers
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#FFD93D] text-[#FFD93D]" />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">4.9/5 from 12,543 reviews</span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow">
              <Quote className="h-8 w-8 text-[#1BA6A6] mb-4" />
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FFD93D] text-[#FFD93D]" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    {testimonial.verified && (
                      <span className="text-[#1BA6A6] text-xs font-medium bg-[#1BA6A6]/10 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
