"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brands, categories, Brand } from "@/data/brands";
import { ExternalLink, Star, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const allCategories = ["All", ...categories];

  const filtered = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.tagline.toLowerCase().includes(search.toLowerCase()) ||
        brand.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || brand.category.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const featured = filtered.filter((b) => b.featured);
  const rest = filtered.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        dark
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f] py-20 px-4">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_#1BA6A6_0%,_transparent_70%)]" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-[#1BA6A6]/20 text-[#1BA6A6] border-[#1BA6A6]/40 px-4 py-1 text-sm">
            Brand Directory
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Discover &amp; Shop
            <span className="block text-[#1BA6A6]">Top Fashion Brands</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            FashionFynds curates the world's best brands. Click any brand to shop
            directly on their official website.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 bg-white/10 border-white/25 text-white placeholder:text-white/50 focus-visible:ring-[#1BA6A6] h-12 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-[65px] z-40 bg-[#0f0f0f]/95 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#1BA6A6] text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">

        {/* Featured Brands */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-5 w-5 fill-[#FFD93D] text-[#FFD93D]" />
              <h2 className="text-xl font-bold text-white">Featured Brands</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} size="large" />
              ))}
            </div>
          </section>
        )}

        {/* All Brands */}
        {rest.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <SlidersHorizontal className="h-5 w-5 text-white/70" />
              <h2 className="text-xl font-bold text-white">All Brands</h2>
              <span className="text-sm text-white/70">({rest.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {rest.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} size="small" />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-32 text-white/70">
            <p className="text-xl font-medium">No brands found for "{search}"</p>
            <p className="text-sm mt-2">Try a different search or filter.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ── BrandCard ────────────────────────────────────────────────────────────────
function BrandCard({ brand, size }: { brand: Brand; size: "large" | "small" }) {
  const isLarge = size === "large";

  return (
    <div className="group relative bg-[#1c1c1c] rounded-2xl overflow-hidden border border-white/15 hover:border-[#1BA6A6]/70 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1BA6A6]/10 hover:-translate-y-1">

      {/* Cover image */}
      <div className={`relative overflow-hidden ${isLarge ? "h-52" : "h-36"}`}>
        <img
          src={brand.coverImage}
          alt={brand.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-black/40 to-transparent" />

        {/* Country badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
          {brand.country}
        </div>

        {/* Brand name pinned to bottom-left */}
        <div className="absolute bottom-3 left-4">
          <h3 className={`font-black text-white drop-shadow-lg ${isLarge ? "text-2xl" : "text-lg"}`}>
            {brand.name}
          </h3>
          <p className="text-white/85 text-xs mt-0.5 drop-shadow">{brand.tagline}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {brand.category.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Description — large cards only */}
        {isLarge && (
          <p className="text-white/85 text-sm leading-relaxed mb-3 line-clamp-2">
            {brand.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <Star className="h-3.5 w-3.5 fill-[#FFD93D] text-[#FFD93D]" />
          <span className="text-sm font-bold text-white">{brand.rating}</span>
          <span className="text-white/70 text-xs">({brand.reviewCount.toLocaleString()} reviews)</span>
        </div>

        {/* Highlights — large cards only */}
        {isLarge && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {brand.highlights.slice(0, 2).map((h) => (
              <span key={h} className="text-xs text-[#1BA6A6] bg-[#1BA6A6]/15 border border-[#1BA6A6]/40 px-2.5 py-0.5 rounded-full font-medium">
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-2">
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full bg-[#1BA6A6] hover:bg-[#159090] text-white font-bold text-sm h-10 rounded-xl transition-all group-hover:shadow-lg group-hover:shadow-[#1BA6A6]/30">
              SHOP NOW
              <ExternalLink className="h-3.5 w-3.5 ml-2" />
            </Button>
          </a>

          <Link href={`/brands/${brand.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:border-[#1BA6A6] hover:text-[#1BA6A6] bg-transparent h-10 rounded-xl font-medium"
            >
              Details
            </Button>
          </Link>
        </div>

        {/* URL */}
        <a
          href={brand.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex items-center gap-1 text-xs text-white/60 hover:text-[#1BA6A6] transition-colors truncate"
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          {brand.website.replace("https://", "")}
        </a>
      </div>
    </div>
  );
}
