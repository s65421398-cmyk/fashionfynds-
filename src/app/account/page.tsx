"use client";

export const dynamic = "force-dynamic";


import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import ProductModal from "@/components/ProductModal";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import { Product } from "@/types/product";
import { User, Package, Heart, Settings, LogOut, ShoppingBag, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Mock user data - would come from auth in real app
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    memberSince: "January 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  };

  const stats = [
    { label: "Total Orders", value: "12", icon: Package, color: "text-blue-500" },
    { label: "Wishlist Items", value: "8", icon: Heart, color: "text-red-500" },
    { label: "Total Spent", value: "$2,459", icon: CreditCard, color: "text-green-500" },
    { label: "Rewards Points", value: "450", icon: TrendingUp, color: "text-purple-500" }
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      date: "Dec 1, 2024",
      total: 189.99,
      status: "Delivered",
      items: 3,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80"
    },
    {
      id: "ORD-002",
      date: "Nov 28, 2024",
      total: 249.99,
      status: "In Transit",
      items: 2,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80"
    },
    {
      id: "ORD-003",
      date: "Nov 15, 2024",
      total: 129.99,
      status: "Delivered",
      items: 1,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80"
    }
  ];

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
          <section className="bg-muted py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                />
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Member since {user.memberSince}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-8 px-4 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar */}
                <aside className="md:col-span-1">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-bold text-lg mb-4">Account Menu</h2>
                    <nav className="space-y-2">
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
                      >
                        <User className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Package className="w-5 h-5" />
                        Orders
                      </Link>
                      <button
                        onClick={() => setWishlistOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        Wishlist
                      </button>
                      <Link
                        href="/account/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        Settings
                      </Link>
                    </nav>
                  </div>
                </aside>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                  {/* Recent Orders */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Recent Orders</h2>
                      <Link
                        href="/account/orders"
                        className="text-sm text-[#1BA6A6] hover:underline font-medium"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <Link
                          key={order.id}
                          href={`/account/orders`}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-[#1BA6A6] transition-colors"
                        >
                          <img
                            src={order.image}
                            alt={`Order ${order.id}`}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">{order.id}</span>
                              <span
                                className={`text-xs px-3 py-1 rounded-full font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">
                              {order.items} items • {order.date}
                            </div>
                            <div className="font-bold">${order.total}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-24 flex-col gap-2 hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                        onClick={() => setCartOpen(true)}
                      >
                        <ShoppingBag className="w-6 h-6" />
                        <span>View Cart</span>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-24 flex-col gap-2 hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                        onClick={() => setWishlistOpen(true)}
                      >
                        <Heart className="w-6 h-6" />
                        <span>Wishlist</span>
                      </Button>
                      <Link href="/account/orders">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full h-24 flex-col gap-2 hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                        >
                          <Package className="w-6 h-6" />
                          <span>Track Order</span>
                        </Button>
                      </Link>
                      <Link href="/account/profile">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full h-24 flex-col gap-2 hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                        >
                          <Settings className="w-6 h-6" />
                          <span>Settings</span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="bg-gradient-to-r from-[#1BA6A6] to-[#159999] text-white rounded-xl p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Rewards Program</h3>
                        <p className="text-white/90 mb-4">
                          You have <span className="font-bold">450 points</span>
                        </p>
                        <p className="text-sm text-white/80">
                          50 more points to unlock $10 reward!
                        </p>
                      </div>
                      <TrendingUp className="w-16 h-16 text-white/20" />
                    </div>
                    <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
                      <div className="bg-white h-full w-[90%]" />
                    </div>
                  </div>
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
