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
import { User, Mail, Phone, MapPin, Lock, ChevronLeft, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [saved, setSaved] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      street: "123 Main Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      label: "Work",
      street: "456 Office Blvd, Suite 200",
      city: "Los Angeles",
      state: "CA",
      zip: "90017",
      country: "United States",
      isDefault: false
    }
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
              <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Profile Picture */}
              <div className="bg-card rounded-xl border border-border p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Profile Picture</h2>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-border"
                    />
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <Button variant="outline" className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]">
                      Upload New Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-card rounded-xl border border-border p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="bg-card rounded-xl border border-border p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <Button variant="outline" className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]">
                    Add New Address
                  </Button>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="p-4 rounded-lg border border-border hover:border-[#1BA6A6] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#1BA6A6]" />
                          <span className="font-semibold">{address.label}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="text-sm text-[#1BA6A6] hover:underline">Edit</button>
                          <button className="text-sm text-muted-foreground hover:text-destructive">
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zip}<br />
                        {address.country}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="bg-card rounded-xl border border-border p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Security</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Password</div>
                        <div className="text-sm text-muted-foreground">
                          Last changed 3 months ago
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]">
                      Change Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="hover:border-[#1BA6A6] hover:text-[#1BA6A6]">
                      Enable
                    </Button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-card rounded-xl border border-border p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-lg border border-border cursor-pointer hover:border-[#1BA6A6] transition-colors">
                    <div>
                      <div className="font-semibold">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive updates about your orders and new products
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-[#1BA6A6]" />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-lg border border-border cursor-pointer hover:border-[#1BA6A6] transition-colors">
                    <div>
                      <div className="font-semibold">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Get text alerts for order updates
                      </div>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-[#1BA6A6]" />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-lg border border-border cursor-pointer hover:border-[#1BA6A6] transition-colors">
                    <div>
                      <div className="font-semibold">Marketing Emails</div>
                      <div className="text-sm text-muted-foreground">
                        Receive promotions and special offers
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-[#1BA6A6]" />
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={handleSave}
                  disabled={saved}
                  className="bg-primary hover:bg-primary/90"
                >
                  {saved ? (
                    <>Saved!</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
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
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
  );
}
