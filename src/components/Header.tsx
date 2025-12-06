"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShop } from "@/contexts/ShopContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface HeaderProps {
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  onSearchOpen: () => void;
  onAuthOpen: () => void;
}

export default function Header({
  onCartOpen,
  onWishlistOpen,
  onSearchOpen,
  onAuthOpen,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, wishlist } = useShop();

  const mainNavItems = [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "#" },
    { label: "Brands", href: "/brands" },
    { label: "Women", href: "#" },
    { label: "Men", href: "#" },
  ];

  const moreItems = [
    { label: "Blog", href: "/blog" },
    { label: "Sale", href: "#" },
    { label: "Accessories", href: "#" },
    { label: "Kids", href: "#" },
    { label: "Sports", href: "#" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchOpen();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free shipping on orders over $100 | Use code: FYNDS20
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">
              Fashion<span className="text-primary">Fynds</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-all hover:text-[#1BA6A6] relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1BA6A6] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm font-medium transition-all hover:text-[#1BA6A6] relative group flex items-center gap-1">
                  More
                  <ChevronDown className="h-4 w-4" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1BA6A6] transition-all duration-300 group-hover:w-full" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link 
                      href={item.href}
                      className="cursor-pointer hover:text-[#1BA6A6] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={onSearchOpen}
                className="pl-10 w-full"
              />
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Mobile search icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={onAuthOpen}>
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onWishlistOpen}
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartOpen}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-[#1BA6A6] text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {moreItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-[#1BA6A6] text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="justify-start hover:text-[#1BA6A6]"
              onClick={() => {
                onSearchOpen();
                setMobileMenuOpen(false);
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}