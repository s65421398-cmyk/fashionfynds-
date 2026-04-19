"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Search, ArrowRight, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    id: "summer-essentials",
    slug: "summer-essentials",
    name: "Summer Essentials",
    description: "Light and breezy pieces for warm weather",
    longDescription: "Embrace the sunshine with our carefully curated summer collection. From flowing dresses to lightweight tops, discover pieces that keep you cool and stylish all season long.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    productCount: 48,
    trending: true,
    season: "Summer",
    tags: ["Light", "Breezy", "Casual", "Comfortable"]
  },
  {
    id: "office-ready",
    slug: "office-ready",
    name: "Office Ready",
    description: "Professional looks for the workplace",
    longDescription: "Command attention in the boardroom with our professional collection. Tailored pieces that blend sophistication with modern style, perfect for the ambitious professional.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    productCount: 62,
    trending: true,
    season: "All Season",
    tags: ["Professional", "Tailored", "Elegant", "Business"]
  },
  {
    id: "weekend-vibes",
    slug: "weekend-vibes",
    name: "Weekend Vibes",
    description: "Casual comfort for your days off",
    longDescription: "Unwind in style with our weekend collection. Comfortable yet chic pieces that take you from brunch to evening walks, perfect for those precious days off.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    productCount: 55,
    trending: false,
    season: "All Season",
    tags: ["Casual", "Relaxed", "Comfortable", "Versatile"]
  },
  {
    id: "athleisure",
    slug: "athleisure",
    name: "Athleisure",
    description: "Comfort meets style",
    longDescription: "Move seamlessly from gym to street with our athleisure collection. Performance fabrics meet fashion-forward designs for the active lifestyle.",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80",
    productCount: 71,
    trending: true,
    season: "All Season",
    tags: ["Active", "Sporty", "Functional", "Modern"]
  },
  {
    id: "evening-wear",
    slug: "evening-wear",
    name: "Evening Wear",
    description: "Elegant pieces for special occasions",
    longDescription: "Make every entrance unforgettable with our evening collection. Luxurious fabrics and sophisticated silhouettes designed to turn heads at any special event.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    productCount: 39,
    trending: false,
    season: "All Season",
    tags: ["Elegant", "Formal", "Luxurious", "Sophisticated"]
  },
  {
    id: "party-ready",
    slug: "party-ready",
    name: "Party Ready",
    description: "Stand out at every celebration",
    longDescription: "Own the night with our party collection. Bold designs, statement pieces, and show-stopping outfits that ensure you're the life of every celebration.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    productCount: 44,
    trending: true,
    season: "All Season",
    tags: ["Bold", "Vibrant", "Statement", "Festive"]
  },
  {
    id: "cozy-layers",
    slug: "cozy-layers",
    name: "Cozy Layers",
    description: "Warmth and style for cooler days",
    longDescription: "Stay warm without sacrificing style. Our layering collection features cozy knits, versatile jackets, and timeless pieces perfect for transitional weather.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    productCount: 58,
    trending: false,
    season: "Fall/Winter",
    tags: ["Warm", "Layered", "Cozy", "Versatile"]
  },
  {
    id: "minimalist-chic",
    slug: "minimalist-chic",
    name: "Minimalist Chic",
    description: "Less is more - timeless simplicity",
    longDescription: "Embrace the power of simplicity with our minimalist collection. Clean lines, neutral palettes, and timeless designs that form the foundation of any wardrobe.",
    image: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&q=80",
    productCount: 52,
    trending: true,
    season: "All Season",
    tags: ["Minimalist", "Clean", "Timeless", "Neutral"]
  },
  {
    id: "bohemian-dreams",
    slug: "bohemian-dreams",
    name: "Bohemian Dreams",
    description: "Free-spirited and artistic",
    longDescription: "Channel your inner wanderer with our bohemian collection. Flowing fabrics, earthy tones, and artistic prints that celebrate individuality and freedom.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    productCount: 46,
    trending: false,
    season: "Spring/Summer",
    tags: ["Bohemian", "Artistic", "Free-spirited", "Earthy"]
  },
  {
    id: "streetwear-edge",
    slug: "streetwear-edge",
    name: "Streetwear Edge",
    description: "Urban style with attitude",
    longDescription: "Make a statement on the streets with our urban collection. Bold graphics, oversized fits, and contemporary designs inspired by global street culture.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    productCount: 67,
    trending: true,
    season: "All Season",
    tags: ["Urban", "Bold", "Contemporary", "Edgy"]
  },
  {
    id: "date-night",
    slug: "date-night",
    name: "Date Night",
    description: "Romantic and memorable looks",
    longDescription: "Make every date unforgettable with our romantic collection. Flattering silhouettes and elegant details designed to make you feel confident and beautiful.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    productCount: 41,
    trending: false,
    season: "All Season",
    tags: ["Romantic", "Elegant", "Flattering", "Special"]
  },
  {
    id: "festival-ready",
    slug: "festival-ready",
    name: "Festival Ready",
    description: "Bold and expressive festival fashion",
    longDescription: "Stand out at every festival with our expressive collection. Vibrant colors, unique textures, and eye-catching pieces perfect for music festivals and outdoor celebrations.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    productCount: 35,
    trending: true,
    season: "Spring/Summer",
    tags: ["Festival", "Vibrant", "Bold", "Expressive"]
  }
];

const seasonFilters = ["All Season", "Spring/Summer", "Fall/Winter", "Summer"];

export default function CollectionsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("All Season");
  const [savedCollections, setSavedCollections] = useState<Set<string>>(new Set());

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const toggleSaveCollection = (collectionId: string) => {
    setSavedCollections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSeason = selectedSeason === "All Season" || collection.season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  const trendingCollections = filteredCollections.filter(c => c.trending);

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          onAuthOpen={() => setAuthOpen(true)}
        />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-[#1BA6A6]/10 to-[#1BA6A6]/5 py-16 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                {/* Breadcrumb */}
                <div className="text-sm text-muted-foreground mb-4">
                  Collections &gt; Shop by Collection
                </div>

                <Badge className="mb-4" variant="outline">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Curated Collections
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Shop By Collection
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Handpicked styles for every occasion and mood. Discover your perfect look from our expertly curated collections.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search collections by name, mood, or style..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Season Filters */}
          <section className="border-b bg-background sticky top-16 z-30">
            <div className="container mx-auto px-4 py-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {seasonFilters.map((season) => (
                  <Button
                    key={season}
                    variant={selectedSeason === season ? "default" : "outline"}
                    onClick={() => setSelectedSeason(season)}
                    className={selectedSeason === season ? "bg-[#1BA6A6] hover:bg-[#158989]" : "hover:border-[#1BA6A6] hover:text-[#1BA6A6]"}
                  >
                    {season}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Trending Collections Section */}
          {trendingCollections.length > 0 && (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-[#1BA6A6]" />
                  <h2 className="text-2xl font-bold">Trending Collections</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingCollections.slice(0, 3).map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/categories/${collection.slug}`}
                      className="group relative h-[350px] rounded-lg overflow-hidden cursor-pointer border bg-card hover:shadow-xl transition-all"
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Gradient overlay for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      <Badge className="absolute top-4 right-4 bg-[#1BA6A6]" variant="default">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>

                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                        <p className="text-white/90 mb-3">{collection.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/80">{collection.productCount} items</span>
                          <Button
                            variant="secondary"
                            size="sm"
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
              </div>
            </section>
          )}

          {/* All Collections Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  All Collections
                  <span className="text-muted-foreground ml-2">
                    ({filteredCollections.length})
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((collection) => (
                  <div
                    key={collection.id}
                    className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                  >
                    <Link href={`/categories/${collection.slug}`}>
                      <div className="relative h-[300px] overflow-hidden">
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40" />
                        {/* Gradient overlay for text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {collection.trending && (
                          <Badge className="absolute top-3 right-3 bg-[#1BA6A6]">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}

                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                          <p className="text-sm text-white/90">{collection.description}</p>
                        </div>
                      </div>
                    </Link>

                    <div className="p-5">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {collection.longDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {collection.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="text-muted-foreground">{collection.season}</span>
                        <span className="font-medium">{collection.productCount} items</span>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/categories/${collection.slug}`} className="flex-1">
                          <Button className="w-full bg-[#1BA6A6] hover:bg-[#158989]">
                            Shop Collection
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleSaveCollection(collection.id)}
                        >
                          <Heart
                            className={`h-4 w-4 transition-all ${
                              savedCollections.has(collection.id)
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground hover:text-red-500"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCollections.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No collections found matching your criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSeason("All Season");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8080] py-16">
            <div className="container mx-auto px-4 text-center text-white">
              <Sparkles className="h-8 w-8 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Never Miss a New Collection</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Be the first to explore our newest curated collections and exclusive style drops
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white text-foreground border-0 h-12"
                />
                <Button className="bg-black hover:bg-black/90 text-white h-12 px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Modals and Sheets */}
        <ShoppingCart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => setCheckoutOpen(true)}
        />
        <WishlistSheet
          open={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          onProductClick={handleProductClick}
        />
        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onProductSelect={handleProductClick}
        />
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
  );
}
