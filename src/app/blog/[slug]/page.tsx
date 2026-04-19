"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Eye, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  featured: boolean;
  readTime: string;
  image: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch the blog post by slug (this increments the view count)
        const response = await fetch(`/api/blog/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError("Blog post not found");
          } else {
            setError("Failed to load blog post");
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setPost(data);

        // Fetch related posts from the same category
        const relatedResponse = await fetch(`/api/blog?category=${encodeURIComponent(data.category)}&limit=3`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filter out the current post and limit to 3
          const filtered = relatedData.filter((p: BlogPost) => p.slug !== slug).slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("An error occurred while loading the blog post");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post?.title || '';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-background">
          <Header
            onCartOpen={() => setCartOpen(true)}
            onWishlistOpen={() => setWishlistOpen(true)}
            onSearchOpen={() => setSearchOpen(true)}
            onAuthOpen={() => setAuthOpen(true)}
          />
          <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-muted rounded w-1/4"></div>
                <div className="h-12 bg-muted rounded w-3/4"></div>
                <div className="h-96 bg-muted rounded"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
    );
  }

  if (error || !post) {
    return (
        <div className="min-h-screen bg-background">
          <Header
            onCartOpen={() => setCartOpen(true)}
            onWishlistOpen={() => setWishlistOpen(true)}
            onSearchOpen={() => setSearchOpen(true)}
            onAuthOpen={() => setAuthOpen(true)}
          />
          <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
              <Button onClick={() => router.push('/blog')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          </main>
          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          onAuthOpen={() => setAuthOpen(true)}
        />
        
        <main>
          {/* Back Button */}
          <section className="border-b bg-muted/30">
            <div className="container mx-auto px-4 py-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/blog')}
                className="hover:text-primary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          </section>

          {/* Article Header */}
          <article className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Category Badge */}
                <Badge variant="outline" className="mb-4">
                  {post.category}
                </Badge>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-muted-foreground mb-8">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {post.authorName.charAt(0)}
                    </div>
                    <span className="font-medium text-foreground">{post.authorName}</span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} views
                  </span>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2 mb-8 pb-8 border-b">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare('copy')}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-12">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none mb-12
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-12" />

                {/* Author Info */}
                <div className="bg-muted/30 rounded-lg p-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Written by {post.authorName}</h3>
                      <p className="text-muted-foreground">
                        Fashion writer and style enthusiast sharing insights on trends, sustainability, and personal style.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost.id} 
                          href={`/blog/${relatedPost.slug}`}
                          className="group"
                        >
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <CardContent className="p-4">
                              <Badge variant="outline" className="mb-2 text-xs">
                                {relatedPost.category}
                              </Badge>
                              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {relatedPost.excerpt}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {relatedPost.readTime}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

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
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
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
  );
}
