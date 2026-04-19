"use client";

import { useState } from "react";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  type: "checkbox" | "color" | "size";
  options: FilterOption[];
}

interface Filters {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  categories?: FilterOption[];
  brands?: FilterOption[];
  sizes?: FilterOption[];
  colors?: FilterOption[];
  minPrice?: number;
  maxPrice?: number;
}

const defaultCategories: FilterOption[] = [
  { value: "dresses", label: "Dresses", count: 156 },
  { value: "tops", label: "Tops & Blouses", count: 243 },
  { value: "pants", label: "Pants & Jeans", count: 189 },
  { value: "skirts", label: "Skirts", count: 87 },
  { value: "outerwear", label: "Outerwear", count: 124 },
  { value: "activewear", label: "Activewear", count: 98 },
];

const defaultBrands: FilterOption[] = [
  { value: "zara", label: "Zara", count: 89 },
  { value: "hm", label: "H&M", count: 124 },
  { value: "mango", label: "Mango", count: 67 },
  { value: "asos", label: "ASOS", count: 156 },
  { value: "reformation", label: "Reformation", count: 45 },
];

const defaultSizes: FilterOption[] = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
];

const defaultColors: FilterOption[] = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "pink", label: "Pink" },
  { value: "yellow", label: "Yellow" },
  { value: "brown", label: "Brown" },
  { value: "gray", label: "Gray" },
  { value: "navy", label: "Navy" },
];

const colorMap: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#EF4444",
  blue: "#3B82F6",
  green: "#22C55E",
  pink: "#EC4899",
  yellow: "#EAB308",
  brown: "#A3703B",
  gray: "#6B7280",
  navy: "#1E3A5F",
};

export function FilterSidebar({
  filters,
  onFilterChange,
  categories = defaultCategories,
  brands = defaultBrands,
  sizes = defaultSizes,
  colors = defaultColors,
  minPrice = 0,
  maxPrice = 500,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    sizes: true,
    colors: true,
    brands: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter((s) => s !== size);
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter((c) => c !== color);
    onFilterChange({ ...filters, colors: newColors });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: [minPrice, maxPrice],
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-4">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} applied
          </span>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Categories */}
      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4"
          onClick={() => toggleSection("categories")}
        >
          <span className="font-semibold">Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="px-4 pb-4 space-y-3">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={filters.categories.includes(category.value)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category.value}`} className="cursor-pointer">
                    {category.label}
                  </Label>
                </div>
                {category.count && (
                  <span className="text-xs text-muted-foreground">({category.count})</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4"
          onClick={() => toggleSection("price")}
        >
          <span className="font-semibold">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.price && (
          <div className="px-4 pb-4 space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              min={minPrice}
              max={maxPrice}
              step={10}
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4"
          onClick={() => toggleSection("sizes")}
        >
          <span className="font-semibold">Sizes</span>
          {expandedSections.sizes ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.sizes && (
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() =>
                    handleSizeChange(size.value, !filters.sizes.includes(size.value))
                  }
                  className={cn(
                    "min-w-[40px] h-10 px-3 rounded-md border text-sm font-medium transition-colors",
                    filters.sizes.includes(size.value)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4"
          onClick={() => toggleSection("colors")}
        >
          <span className="font-semibold">Colors</span>
          {expandedSections.colors ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.colors && (
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() =>
                    handleColorChange(color.value, !filters.colors.includes(color.value))
                  }
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    filters.colors.includes(color.value)
                      ? "ring-2 ring-offset-2 ring-primary"
                      : "hover:scale-110"
                  )}
                  style={{ backgroundColor: colorMap[color.value] || color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4"
          onClick={() => toggleSection("brands")}
        >
          <span className="font-semibold">Brands</span>
          {expandedSections.brands ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.brands && (
          <div className="px-4 pb-4 space-y-3">
            {brands.map((brand) => (
              <div key={brand.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.value}`}
                    checked={filters.brands.includes(brand.value)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`brand-${brand.value}`} className="cursor-pointer">
                    {brand.label}
                  </Label>
                </div>
                {brand.count && (
                  <span className="text-xs text-muted-foreground">({brand.count})</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default FilterSidebar;