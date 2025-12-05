"use client";

import { useState } from "react";
import { ShopProvider } from "@/contexts/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const categories = ["All", "Trends", "Style Tips", "Sustainability", "Indie Brands", "Behind the Scenes"];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Indie Fashion: Why Small Brands Are Taking Over",
    excerpt: "Discover how independent fashion brands are revolutionizing the industry with authentic stories and unique designs that challenge mainstream fashion.",
    category: "Indie Brands",
    author: "Sarah Mitchell",
    date: "Dec 4, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Fashion: More Than Just a Trend",
    excerpt: "Explore the real impact of sustainable fashion choices and how eco-conscious brands are making a difference in the industry.",
    category: "Sustainability",
    author: "Emma Green",
    date: "Dec 3, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Winter 2025: Top 10 Street Style Trends You Need to Know",
    excerpt: "From oversized coats to bold accessories, here's what's dominating street fashion this winter season.",
    category: "Trends",
    author: "Marcus Chen",
    date: "Dec 2, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  },
  {
    id: 4,
    title: "How to Build a Capsule Wardrobe That Actually Works",
    excerpt: "Master the art of minimalist fashion with our guide to creating a versatile wardrobe with fewer pieces.",
    category: "Style Tips",
    author: "Lisa Johnson",
    date: "Dec 1, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  },
  {
    id: 5,
    title: "Behind the Seams: Interview with Urban Rebel Founder",
    excerpt: "Get an exclusive look into the creative process and inspiration behind one of our most popular indie brands.",
    category: "Behind the Scenes",
    author: "David Kim",
    date: "Nov 30, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
  },
  {
    id: 6,
    title: "Color Theory: Mastering Bold Fashion Combinations",
    excerpt: "Learn how to mix and match colors like a pro and create eye-catching outfits that express your personality.",
    category: "Style Tips",
    author: "Rachel Adams",
    date: "Nov 29, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
  },
  {
    id: 7,
    title: "The Vintage Revival: Why Retro Fashion Is Back",
    excerpt: "Explore the resurgence of vintage aesthetics and how modern brands are reimagining classic styles.",
    category: "Trends",
    author: "Tom Harrison",
    date: "Nov 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    id: 8,
    title: "Ethical Production: What Really Goes Into Your Clothes",
    excerpt: "An in-depth look at the manufacturing process and why ethical production matters now more than ever.",
    category: "Sustainability",
    author: "Nina Patel",
    date: "Nov 27, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  },
  {
    id: 9,
    title: "Accessorize Like a Pro: Elevate Any Outfit",
    excerpt: "From statement jewelry to bold bags, learn how the right accessories can transform your entire look.",
    category: "Style Tips",
    author: "Julia Martinez",
    date: "Nov 26, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
  },
];

export default function BlogPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <ShopProvider>
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          onAuthOpen={() => setAuthOpen(true)}
        />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Badge className="mb-4 bg-white text-black hover:bg-white/90">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Fashion Insights
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  The Fashion<span className="text-primary">Fynds</span> Blog
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Real stories, style inspiration, and insider tips from the world of indie fashion.
                  Not your average fashion blog.
                </p>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="border-b bg-white sticky top-[112px] z-40">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Posts */}
          {selectedCategory === "All" && searchQuery === "" && (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Featured Stories</h2>
                    <p className="text-muted-foreground">Must-read articles handpicked by our editors</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white text-black hover:bg-white/90">
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>{post.author}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <Button className="mt-4 group/btn" variant="ghost">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                </h2>
                <p className="text-muted-foreground">
                  {regularPosts.length} {regularPosts.length === 1 ? "article" : "articles"} found
                </p>
              </div>

              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                          <span className="font-medium text-foreground">{post.author}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" className="group/btn w-full">
                          Read Article
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No articles found matching your search.
                  </p>
                  <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Load More Button */}
              {regularPosts.length > 0 && (
                <div className="text-center mt-12">
                  <Button size="lg" variant="outline">
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-16 bg-black text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">
                  Never Miss a Story
                </h2>
                <p className="text-gray-300 mb-8">
                  Subscribe to get the latest fashion insights, indie brand features, and style tips delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
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
    </ShopProvider>
  );
}
