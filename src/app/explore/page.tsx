"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Compass,
  Search,
  SlidersHorizontal,
  Grid3x3,
  LayoutGrid,
  X,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Star,
  Filter,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "all", name: "All", icon: "🛍️" },
  { id: "women", name: "Women", icon: "👗" },
  { id: "men", name: "Men", icon: "👔" },
  { id: "accessories", name: "Accessories", icon: "💎" },
  { id: "shoes", name: "Shoes", icon: "👟" },
  { id: "bags", name: "Bags", icon: "👜" },
  { id: "activewear", name: "Activewear", icon: "🏃" },
  { id: "outerwear", name: "Outerwear", icon: "🧥" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "popular", label: "Most Popular" },
];

interface DBProduct {
  id: number;
  name: string;
  slug: string;
  brandId: number | null;
  categoryId: number | null;
  price: number;
  originalPrice: number | null;
  description: string | null;
  image: string;
  images: string[] | null;
  sizes: string[] | null;
  colors: string[] | null;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  deal: boolean;
  dealDiscount: number | null;
  dealEndsAt: string | null;
  movement: string | null;
}

function transformProduct(dbProduct: DBProduct): Product {
  return {
    id: String(dbProduct.id),
    name: dbProduct.name,
    brand: "FashionFynds",
    price: dbProduct.price,
    originalPrice: dbProduct.originalPrice ?? undefined,
    image: dbProduct.image,
    images: dbProduct.images ?? undefined,
    category: "Fashion",
    description: dbProduct.description ?? "",
    sizes: dbProduct.sizes ?? ["S", "M", "L"],
    colors: dbProduct.colors ?? ["Black"],
    rating: dbProduct.rating ?? 0,
    reviews: dbProduct.reviews ?? 0,
    inStock: dbProduct.inStock ?? true,
    featured: dbProduct.featured ?? false,
    deal: dbProduct.deal ?? false,
    movement: dbProduct.movement ?? undefined,
  };
}

export default function ExplorePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<"4" | "3">("4");
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(true);
  const [minRating, setMinRating] = useState(0);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, onlyOnSale, onlyInStock, minRating]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      const allProducts = Array.isArray(data) 
        ? data.map(transformProduct)
        : (data.products || []).map(transformProduct);
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (onlyOnSale) {
      result = result.filter((p) => p.deal || p.originalPrice);
    }

    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.reviews - a.reviews;
        case "newest":
          return 0;
        default:
          return b.featured ? 1 : -1;
      }
    });

    setFilteredProducts(result);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 500]);
    setOnlyOnSale(false);
    setOnlyInStock(true);
    setMinRating(0);
    setSortBy("featured");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    priceRange[0] > 0 || priceRange[1] < 500,
    onlyOnSale,
    !onlyInStock,
    minRating > 0,
  ].filter(Boolean).length;

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-20">
          <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 text-white py-20 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Compass className="h-8 w-8" />
                </div>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 px-4 py-2 text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Discover Your Style
                </Badge>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 tracking-tight">
                Explore
              </h1>

              <p className="text-center text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
                Discover curated fashion from the world's best brands
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-foreground placeholder:text-muted-foreground shadow-xl focus-visible:ring-2 focus-visible:ring-white/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? "bg-white text-purple-600 shadow-lg scale-105"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 bg-muted/30 border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="bg-purple-600 text-white ml-1">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} products found
                  </span>

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
                    <button
                      onClick={() => setGridView("4")}
                      className={`p-2 rounded transition-colors ${
                        gridView === "4"
                          ? "bg-purple-600 text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setGridView("3")}
                      className={`p-2 rounded transition-colors ${
                        gridView === "3"
                          ? "bg-purple-600 text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {showFilters && (
                <div className="mt-6 p-6 bg-background rounded-xl border shadow-sm animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Price Range
                      </h4>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        step={10}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Minimum Rating
                      </h4>
                      <div className="flex gap-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setMinRating(rating)}
                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                              minRating === rating
                                ? "bg-purple-600 text-white"
                                : "bg-muted hover:bg-muted/80"
                            }`}
                          >
                            {rating === 0 ? "All" : `${rating}+`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Availability</h4>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={onlyInStock}
                            onCheckedChange={(checked) => setOnlyInStock(checked as boolean)}
                          />
                          <span className="text-sm">In Stock Only</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={onlyOnSale}
                            onCheckedChange={(checked) => setOnlyOnSale(checked as boolean)}
                          />
                          <span className="text-sm">On Sale</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <div
                  className={`grid gap-6 ${
                    gridView === "4"
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="aspect-square w-full rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-muted rounded-3xl p-12 max-w-md mx-auto">
                    <Compass className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
                    <h2 className="text-2xl font-bold mb-3">No Products Found</h2>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button onClick={clearFilters} className="bg-purple-600 hover:bg-purple-700">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    gridView === "4"
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={handleProductClick}
                    />
                  ))}
                </div>
              )}

              {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8"
                    onClick={() => {}}
                  >
                    Load More Products
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </section>

          <section className="py-16 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Browse our curated collections or contact our style experts for personalized recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold"
                  onClick={() => router.push("/collections")}
                >
                  View Collections
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-white border-white hover:bg-white/20"
                  onClick={() => router.push("/contact")}
                >
                  Contact Us
                </Button>
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
        <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </div>
  );
}
