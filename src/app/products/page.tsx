"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Grid3X3, List, SlidersHorizontal, X, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["Women", "Men", "Kids", "Accessories", "Shoes", "Sports"];
  const brands = ["Nike", "Adidas", "Zara", "H&M", "Gucci", "Prada", "Levi's", "Calvin Klein"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, sortBy, priceRange, selectedCategories, selectedBrands, inStockOnly, onSaleOnly]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProducts(data.products || data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    if (onSaleOnly) {
      filtered = filtered.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0) +
    selectedCategories.length +
    selectedBrands.length +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">
          Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={500}
          step={10}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, cat]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                  }
                }}
              />
              <Label htmlFor={`cat-${cat}`} className="cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Brands</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={(c) => setInStockOnly(!!c)} />
          <Label htmlFor="in-stock" className="cursor-pointer">In Stock Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="on-sale" checked={onSaleOnly} onCheckedChange={(c) => setOnSaleOnly(!!c)} />
          <Label htmlFor="on-sale" className="cursor-pointer">On Sale</Label>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 bg-card rounded-xl border p-6">
                  <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </h2>
                  <FilterContent />
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                        {activeFilterCount > 0 && (
                          <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                            {activeFilterCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-4 ml-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="hidden sm:flex border rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                    <h2 className="text-2xl font-semibold mb-3">No products found</h2>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onQuickView={handleProductClick} />
                    ))}
                  </div>
                )}
              </div>
            </div>
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
        <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}