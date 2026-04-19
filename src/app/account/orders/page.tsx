"use client";

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
import { Package, MapPin, Truck, CheckCircle, Clock, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }[];
  shipping: {
    address: string;
    method: string;
    tracking?: string;
  };
}

export default function OrdersPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD-001234",
      date: "December 1, 2024",
      status: "delivered",
      total: 189.99,
      items: [
        {
          name: "Classic White Sneakers",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&q=80",
          price: 89.99,
          quantity: 1,
          size: "10",
          color: "White"
        },
        {
          name: "Denim Jacket",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
          price: 99.99,
          quantity: 1,
          size: "L",
          color: "Blue"
        }
      ],
      shipping: {
        address: "123 Main St, Los Angeles, CA 90001",
        method: "Standard Shipping",
        tracking: "TRK123456789"
      }
    },
    {
      id: "ORD-001235",
      date: "November 28, 2024",
      status: "shipped",
      total: 249.99,
      items: [
        {
          name: "Leather Crossbody Bag",
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
          price: 249.99,
          quantity: 1,
          size: "One Size",
          color: "Brown"
        }
      ],
      shipping: {
        address: "123 Main St, Los Angeles, CA 90001",
        method: "Express Shipping",
        tracking: "TRK987654321"
      }
    },
    {
      id: "ORD-001236",
      date: "November 15, 2024",
      status: "delivered",
      total: 129.99,
      items: [
        {
          name: "Silk Slip Dress",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80",
          price: 129.99,
          quantity: 1,
          size: "M",
          color: "Black"
        }
      ],
      shipping: {
        address: "123 Main St, Los Angeles, CA 90001",
        method: "Standard Shipping",
        tracking: "TRK456789123"
      }
    },
    {
      id: "ORD-001237",
      date: "November 5, 2024",
      status: "processing",
      total: 98.00,
      items: [
        {
          name: "Yoga Leggings",
          image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&q=80",
          price: 98.00,
          quantity: 1,
          size: "M",
          color: "Black"
        }
      ],
      shipping: {
        address: "123 Main St, Los Angeles, CA 90001",
        method: "Standard Shipping"
      }
    }
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          onAuthOpen={() => setAuthOpen(true)}
        />

        <main className="pt-20">
          {/* Header */}
          <section className="bg-muted py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <Link
                href="/account"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-[#1BA6A6] transition-colors mb-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Account
              </Link>
              <h1 className="text-4xl font-bold mb-2">Order History</h1>
              <p className="text-muted-foreground">View and track all your orders</p>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 px-4 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search orders by ID or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </section>

          {/* Orders List */}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || filterStatus !== "all"
                      ? "Try adjusting your filters"
                      : "You haven't placed any orders yet"}
                  </p>
                  <Button onClick={() => window.location.href = "/"}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="bg-muted/50 p-6 border-b border-border">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{order.id}</h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-1">${order.total}</div>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} item{order.items.length > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        <div className="space-y-4 mb-6">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-1">
                                  Size: {item.size} • Color: {item.color}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">${item.price}</span> × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-muted/30 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3 mb-3">
                            <MapPin className="w-5 h-5 text-[#1BA6A6] mt-0.5" />
                            <div>
                              <div className="font-semibold mb-1">Delivery Address</div>
                              <p className="text-sm text-muted-foreground">{order.shipping.address}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Truck className="w-5 h-5 text-[#1BA6A6] mt-0.5" />
                            <div>
                              <div className="font-semibold mb-1">{order.shipping.method}</div>
                              {order.shipping.tracking && (
                                <p className="text-sm text-muted-foreground">
                                  Tracking: <span className="font-mono">{order.shipping.tracking}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          {order.shipping.tracking && (
                            <Button
                              variant="outline"
                              className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                            >
                              <Truck className="w-4 h-4 mr-2" />
                              Track Package
                            </Button>
                          )}
                          {order.status === "delivered" && (
                            <Button
                              variant="outline"
                              className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                            >
                              Buy Again
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]"
                          >
                            View Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
