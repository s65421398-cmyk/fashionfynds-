"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "popular"
  | "rating"
  | "name-asc"
  | "name-desc";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  showProductCount?: boolean;
  productCount?: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export function SortDropdown({
  value,
  onChange,
  showProductCount = false,
  productCount = 0,
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-4">
      {showProductCount && (
        <span className="text-sm text-muted-foreground hidden sm:block">
          {productCount} product{productCount !== 1 ? "s" : ""}
        </span>
      )}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
        <span className="text-sm font-medium hidden sm:block">Sort by:</span>
        <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
          <SelectTrigger className="w-[180px]">
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
      </div>
    </div>
  );
}

export default SortDropdown;
