"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShop } from "@/contexts/ShopContext";
import { Badge } from "@/components/ui/badge";

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
  const { cartCount, wishlist } = useShop();

  const navItems = ["New Arrivals", "Women", "Men", "Accessories", "Sale"];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free shipping on orders over $100 | Use code: FYNDS20
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
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
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Fashion<span className="text-primary">Fynds</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className="hidden sm:flex"
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
            {navItems.map((item) => (
              <button
                key={item}
                className="text-sm font-medium transition-colors hover:text-primary text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </button>
            ))}
            <Button
              variant="outline"
              className="justify-start"
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
