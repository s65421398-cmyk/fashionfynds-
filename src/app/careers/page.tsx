"use client";

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
import { Briefcase, MapPin, Clock, Heart, Sparkles, Users, Rocket, ArrowRight } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    description: "Build beautiful, performant user interfaces for our e-commerce platform.",
  },
  {
    id: 2,
    title: "Fashion Buyer",
    department: "Merchandising",
    location: "Los Angeles, CA",
    type: "Full-time",
    description: "Source and select the hottest trends for our curated collections.",
  },
  {
    id: 3,
    title: "Customer Experience Lead",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description: "Lead a team dedicated to delivering exceptional customer service.",
  },
  {
    id: 4,
    title: "Social Media Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "Create engaging content and grow our social media presence.",
  },
  {
    id: 5,
    title: "Warehouse Associate",
    department: "Operations",
    location: "Chicago, IL",
    type: "Full-time",
    description: "Help fulfill orders and maintain inventory accuracy.",
  },
  {
    id: 6,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive shopping experiences that delight customers.",
  },
];

const perks = [
  { icon: Heart, title: "Health & Wellness", desc: "Comprehensive medical, dental, and vision" },
  { icon: Sparkles, title: "Employee Discount", desc: "50% off all FashionFynds products" },
  { icon: Users, title: "Flexible Work", desc: "Remote and hybrid options available" },
  { icon: Rocket, title: "Growth", desc: "Learning budget and career development" },
];

export default function CareersPage() {
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
          <section className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white py-20 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Briefcase className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Help us shape the future of fashion. We're looking for passionate people to join our mission.
              </p>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                {jobs.length} Open Positions
              </Badge>
            </div>
          </section>

          <div className="container mx-auto px-4">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">Why FashionFynds?</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {perks.map((perk) => (
                  <div key={perk.title} className="bg-card rounded-xl border p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-4">
                      <perk.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold mb-2">{perk.title}</h3>
                    <p className="text-sm text-muted-foreground">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-center mb-10">Open Positions</h2>
              <div className="space-y-4 max-w-4xl mx-auto">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="mt-1">{job.department}</CardDescription>
                        </div>
                        <Button>
                          Apply Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mt-16 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Don't See the Right Fit?</h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button size="lg" variant="secondary">
                Submit Your Resume
              </Button>
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
