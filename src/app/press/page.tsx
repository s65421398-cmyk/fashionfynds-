"use client";

export const dynamic = "force-dynamic";


import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Download, Mail, ExternalLink, Calendar } from "lucide-react";

const pressReleases = [
  {
    id: 1,
    date: "December 5, 2025",
    title: "FashionFynds Launches Sustainable Collection",
    excerpt: "New eco-friendly line features recycled materials and ethical manufacturing practices.",
    category: "Product Launch",
  },
  {
    id: 2,
    date: "November 20, 2025",
    title: "FashionFynds Raises $50M Series B",
    excerpt: "Funding to expand into international markets and enhance technology platform.",
    category: "Company News",
  },
  {
    id: 3,
    date: "October 15, 2025",
    title: "Partnership with Top Fashion Designers Announced",
    excerpt: "Exclusive collaborations bringing high fashion to accessible price points.",
    category: "Partnership",
  },
  {
    id: 4,
    date: "September 8, 2025",
    title: "FashionFynds App Downloads Surpass 1 Million",
    excerpt: "Mobile shopping experience continues to drive growth and engagement.",
    category: "Milestone",
  },
];

const mediaFeatures = [
  { publication: "Vogue", quote: "The future of online fashion shopping" },
  { publication: "Forbes", quote: "One of the fastest-growing e-commerce platforms" },
  { publication: "TechCrunch", quote: "Revolutionizing the fashion industry" },
  { publication: "WWD", quote: "A fresh approach to curated fashion" },
];

export default function PressPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Newspaper className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Press & Media</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Latest news, press releases, and media resources
              </p>
              <Button variant="secondary" size="lg">
                <Mail className="h-5 w-5 mr-2" />
                Press Inquiries: press@fashionfynds.com
              </Button>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">As Featured In</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaFeatures.map((feature) => (
                  <Card key={feature.publication} className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold mb-3">{feature.publication}</h3>
                      <p className="text-muted-foreground italic">"{feature.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">Press Releases</h2>
              <div className="space-y-4 max-w-4xl mx-auto">
                {pressReleases.map((release) => (
                  <Card key={release.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {release.category}
                          </Badge>
                          <CardTitle className="text-xl">{release.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-2">
                            <Calendar className="h-4 w-4" />
                            {release.date}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                      <Button variant="outline" size="sm">
                        Read More
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">Media Resources</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-[#1BA6A6]/10 text-[#1BA6A6] flex items-center justify-center mx-auto mb-4">
                      <Download className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">Brand Assets</h3>
                    <p className="text-sm text-muted-foreground mb-4">Logos, colors, and brand guidelines</p>
                    <Button variant="outline" size="sm">Download Kit</Button>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-[#1BA6A6]/10 text-[#1BA6A6] flex items-center justify-center mx-auto mb-4">
                      <Newspaper className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">Fact Sheet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Company overview and key facts</p>
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-[#1BA6A6]/10 text-[#1BA6A6] flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">Press Contact</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get in touch with our PR team</p>
                    <Button variant="outline" size="sm">Contact Us</Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-muted/50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                For press inquiries, interview requests, or additional information, please contact our communications team.
              </p>
              <p className="font-semibold">
                <a href="mailto:press@fashionfynds.com" className="text-[#1BA6A6] hover:underline">
                  press@fashionfynds.com
                </a>
              </p>
            </section>
          </div>
        </main>

        <Footer />

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
      </div>
  );
}
