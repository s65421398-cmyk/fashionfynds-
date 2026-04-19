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
import { products } from "@/lib/products";
import { SlidersHorizontal, Grid3x3, LayoutGrid, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  { slug: "all", name: "All Products", description: "Browse our complete collection" },
  { slug: "new-arrivals", name: "New Arrivals", description: "Fresh styles just landed" },
  { slug: "women", name: "Women", description: "Fashion-forward pieces for her" },
  { slug: "men", name: "Men", description: "Timeless styles for him" },
  { slug: "accessories", name: "Accessories", description: "Complete your look" },
  { slug: "shoes", name: "Shoes", description: "Step up your style" },
  { slug: "bags", name: "Bags", description: "Carry your essentials in style" },
  { slug: "activewear", name: "Activewear", description: "Move with confidence" },
  { slug: "outerwear", name: "Outerwear", description: "Layer up in style" },
  { slug: "dresses", name: "Dresses", description: "Elegant pieces for any occasion" },
  { slug: "sale", name: "Sale", description: "Limited time deals" }
];

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [sortBy, setSortBy] = useState("featured");
  const [gridView, setGridView] = useState<"4" | "3">("4");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categorySlug = params.slug as string;
  const category = categories.find((c) => c.slug === categorySlug);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Filter products based on category
  let filteredProducts = products;
  
  if (categorySlug !== "all") {
    if (categorySlug === "new-arrivals") {
      filteredProducts = products.filter((p) => p.featured);
    } else if (categorySlug === "sale") {
      filteredProducts = products.filter((p) => p.deal || p.originalPrice);
    } else {
      filteredProducts = products.filter((p) => 
        p.category.toLowerCase() === categorySlug.toLowerCase()
      );
    }
  }

  // Apply brand filter
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedBrands.includes(p.brand)
    );
  }

  // Apply price range filter
  if (priceRange !== "all") {
    const ranges = {
      "under-50": [0, 50],
      "50-100": [50, 100],
      "100-200": [100, 200],
      "over-200": [200, Infinity],
    };
    const [min, max] = ranges[priceRange as keyof typeof ranges] || [0, Infinity];
    filteredProducts = filteredProducts.filter((p) => p.price >= min && p.price <= max);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0; // Would use createdAt in real app
      default:
        return 0;
    }
  });

  const allBrands = Array.from(new Set(products.map((p) => p.brand)));

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category not found</h2>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
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

        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-muted py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {category.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Link href="/" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                  Home
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">{category.name}</span>
              </div>
            </div>
          </section>

          {/* Filters and Products */}
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {sortedProducts.length} Products
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* Grid View Toggle */}
                  <div className="hidden md:flex items-center gap-2">
                    <button
                      onClick={() => setGridView("4")}
                      className={`p-2 rounded-lg transition-colors ${
                        gridView === "4"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setGridView("3")}
                      className={`p-2 rounded-lg transition-colors ${
                        gridView === "3"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <LayoutGrid className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside
                  className={`lg:w-64 space-y-6 ${
                    showFilters ? "block" : "hidden lg:block"
                  }`}
                >
                  {/* Price Range */}
                  <div>
                    <h3 className="font-bold mb-4">Price Range</h3>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Prices" },
                        { value: "under-50", label: "Under $50" },
                        { value: "50-100", label: "$50 - $100" },
                        { value: "100-200", label: "$100 - $200" },
                        { value: "over-200", label: "Over $200" },
                      ].map((range) => (
                        <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            value={range.value}
                            checked={priceRange === range.value}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-4 h-4 text-[#1BA6A6] focus:ring-[#1BA6A6]"
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-bold mb-4">Brands</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {allBrands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 text-[#1BA6A6] focus:ring-[#1BA6A6] rounded"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(priceRange !== "all" || selectedBrands.length > 0) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPriceRange("all");
                        setSelectedBrands([]);
                      }}
                      className="w-full hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                  {sortedProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-xl text-muted-foreground mb-4">
                        No products found matching your criteria.
                      </p>
                      <Button
                        onClick={() => {
                          setPriceRange("all");
                          setSelectedBrands([]);
                        }}
                        className="hover:bg-primary/90"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`grid gap-6 ${
                        gridView === "4"
                          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                          : "grid-cols-2 md:grid-cols-3"
                      }`}
                    >
                      {sortedProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="group"
                        >
                          <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border">
                            <div className="aspect-square overflow-hidden relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {(product.deal || product.originalPrice) && (
                                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold">
                                  SALE
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <p className="text-xs text-muted-foreground mb-1">
                                {product.brand}
                              </p>
                              <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-[#1BA6A6] transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
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
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
  );
}
