"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredBrands = [
  {
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
    tagline: "Just Do It",
  },
  {
    name: "Adidas",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80",
    tagline: "Impossible is Nothing",
  },
  {
    name: "Zara",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    tagline: "Love Your Curves",
  },
  {
    name: "H&M",
    logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80",
    tagline: "Fashion & Quality",
  },
  {
    name: "Levi's",
    logo: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    tagline: "Original Since 1873",
  },
  {
    name: "Gucci",
    logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    tagline: "Luxury & Craftsmanship",
  },
];

export default function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4);
      } else {
        setItemsPerView(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= featuredBrands.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, featuredBrands.length - itemsPerView) : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [itemsPerView]);

  return (
    <section className="py-16 bg-background border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Premium Selection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">FEATURED BRANDS</h2>
          <p className="text-muted-foreground">
            Discover collections from the world's most iconic fashion brands
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              }}
            >
              {featuredBrands.map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group relative aspect-square rounded-lg overflow-hidden bg-muted hover:shadow-xl transition-all cursor-pointer">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-white/80 text-center">
                        {brand.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(featuredBrands.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={`h-2 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
