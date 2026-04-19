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
import { 
  MapPin, 
  Search, 
  Navigation, 
  Phone, 
  Clock, 
  ExternalLink,
  Info
} from "lucide-react";

export default function FindStoresPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const stores = [
    {
      name: "FashionFynds Flagship - Mumbai",
      address: "123 Fashion Avenue, Bandra West, Mumbai, MH 400050",
      phone: "+91 22 2640 1234",
      hours: "10:00 AM - 9:00 PM",
      distance: "2.4 km"
    },
    {
      name: "FashionFynds - New Delhi",
      address: "Select Citywalk, Saket, New Delhi, DL 110017",
      phone: "+91 11 4265 5678",
      hours: "11:00 AM - 10:00 PM",
      distance: "5.1 km"
    },
    {
      name: "FashionFynds - Bengaluru",
      address: "Indiranagar 100 Feet Rd, Bengaluru, KA 560038",
      phone: "+91 80 4123 9876",
      hours: "10:00 AM - 9:30 PM",
      distance: "8.7 km"
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
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <div className="w-full lg:w-[400px] border-r bg-white overflow-y-auto">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-[#1BA6A6]" />
                Find a Store
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Enter city or pincode..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1BA6A6]/20 transition-all"
                />
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 mb-6 flex gap-3">
                <Info className="w-5 h-5 text-[#1BA6A6] shrink-0" />
                <p className="text-sm text-teal-800">
                  Showing 3 stores near your current location. Powered by <strong>Google Maps Platform</strong>.
                </p>
              </div>

              {stores.map((store, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-[#1BA6A6] hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold group-hover:text-[#1BA6A6] transition-colors">{store.name}</h3>
                    <span className="text-xs font-medium text-slate-400">{store.distance}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{store.address}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone className="w-3 h-3" />
                      {store.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {store.hours}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-[#1BA6A6] text-white text-xs font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-1">
                      <Navigation className="w-3 h-3" />
                      Get Directions
                    </button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-slate-100 relative overflow-hidden">
            {/* Mock Map Background using an Unsplash image of a map/cityscape */}
            <div className="absolute inset-0 grayscale opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80')] bg-cover bg-center" />
            
            {/* Mock Google Maps UI Elements */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
                <button className="p-2 hover:bg-slate-50 rounded">+</button>
                <div className="h-px bg-slate-100" />
                <button className="p-2 hover:bg-slate-50 rounded">-</button>
              </div>
              <button className="bg-white rounded-lg shadow-lg p-3 hover:bg-slate-50">
                <Navigation className="w-5 h-5 text-[#1BA6A6]" />
              </button>
            </div>

            {/* Custom Markers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-[#1BA6A6]/20 rounded-full animate-ping absolute -inset-0" />
                <div className="w-8 h-8 bg-[#1BA6A6] text-white rounded-full flex items-center justify-center shadow-2xl relative border-2 border-white">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Google Services Branding (Bottom Left) */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/40 text-[10px] uppercase tracking-widest font-bold text-slate-500 shadow-sm">
                Powered by Google Maps Platform
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/40 text-[10px] uppercase tracking-widest font-bold text-[#1BA6A6] shadow-sm">
                Google Cloud AI Integrated
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trackers are automatically handled by Root Layout environment guards */}

      {/* Modals */}
      <ShoppingCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <WishlistSheet
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onProductClick={setSelectedProduct}
      />
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onProductSelect={setSelectedProduct}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
