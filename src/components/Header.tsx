"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, User, ChevronDown, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShop } from "@/contexts/ShopContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface HeaderProps {
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  onSearchOpen: () => void;
}

export default function Header({
  onCartOpen,
  onWishlistOpen,
  onSearchOpen,
}: HeaderProps) {
  const router = useRouter();
  const { data: session, refetch } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, wishlist } = useShop();

  const mainNavItems = [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "#" },
    { label: "Brands", href: "/brands" },
    { label: "Collections", href: "/collections" },
    { label: "Women", href: "#" },
    { label: "Men", href: "#" },
  ];

  const moreItems = [
    { label: "Blog", href: "/blog" },
    { label: "Explore Brands", href: "/explore-brands" },
    { label: "Learn More", href: "/learn-more" },
    { label: "Sale", href: "#" },
    { label: "Accessories", href: "#" },
    { label: "Kids", href: "#" },
    { label: "Sports", href: "#" },
  ];

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error("Failed to sign out. Please try again.");
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchOpen();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top banner with promo code */}
      <div className="bg-gradient-to-r from-black via-[#1BA6A6] to-black text-white text-center py-2.5 text-sm font-medium">
        <span className="hidden sm:inline">🎉 Free shipping on orders over $100 | </span>
        <span className="font-bold">Use code: <span className="text-[#FFD93D] text-base">FYNDS20</span></span>
        <span className="hidden sm:inline"> for 20% OFF 🎁</span>
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

            {/* User Auth Section */}
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/login")}
                className="hidden sm:flex"
              >
                Sign In
              </Button>
            )}

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
            {session?.user ? (
              <>
                <div className="pb-3 border-b">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </p>
                </div>
                <Link
                  href="/account"
                  className="text-sm font-medium transition-colors hover:text-[#1BA6A6] text-left"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/account/orders"
                  className="text-sm font-medium transition-colors hover:text-[#1BA6A6] text-left"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium transition-colors hover:text-destructive text-left text-destructive"
                >
                  Sign Out
                </button>
                <div className="border-t pt-3" />
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  className="justify-start"
                  onClick={() => {
                    router.push("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <div className="border-t pt-3" />
              </>
            )}
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