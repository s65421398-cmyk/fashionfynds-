"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, WishlistItem, Product } from "@/types/product";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateCartQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data on mount and when session changes
  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      // Load from database for authenticated users
      loadFromDatabase();
    } else {
      // Load from localStorage for guests
      loadFromLocalStorage();
    }
  }, [session, isPending]);

  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem("fashionfynds-cart");
    const savedWishlist = localStorage.getItem("fashionfynds-wishlist");
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  };

  const loadFromDatabase = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("bearer_token");
    
    try {
      // Load cart
      const cartRes = await fetch("/api/cart", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (cartRes.ok) {
        const cartData = await cartRes.json();
        const formattedCart: CartItem[] = cartData.map((item: any) => ({
          id: String(item.product.id),
          name: item.product.name,
          brand: "",
          price: item.product.price,
          image: item.product.image,
          category: "",
          description: "",
          sizes: [],
          colors: [],
          rating: 0,
          reviews: 0,
          inStock: item.product.inStock,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        }));
        setCart(formattedCart);
      }

      // Load wishlist
      const wishlistRes = await fetch("/api/wishlist", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (wishlistRes.ok) {
        const wishlistData = await wishlistRes.json();
        const formattedWishlist: WishlistItem[] = wishlistData.map((item: any) => ({
          id: String(item.product.id),
          name: item.product.name,
          brand: "",
          price: item.product.price,
          originalPrice: item.product.originalPrice,
          image: item.product.image,
          category: "",
          description: "",
          sizes: [],
          colors: [],
          rating: item.product.rating,
          reviews: item.product.reviews,
          inStock: item.product.inStock,
        }));
        setWishlist(formattedWishlist);
      }
    } catch (error) {
      console.error("Failed to load from database:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save to localStorage for guests
  useEffect(() => {
    if (!session?.user) {
      localStorage.setItem("fashionfynds-cart", JSON.stringify(cart));
    }
  }, [cart, session]);

  useEffect(() => {
    if (!session?.user) {
      localStorage.setItem("fashionfynds-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, session]);

  const addToCart = async (product: Product, size: string, color: string) => {
    if (session?.user) {
      // Add to database
      const token = localStorage.getItem("bearer_token");
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: Number(product.id),
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
          }),
        });

        if (res.ok) {
          await loadFromDatabase();
          toast.success("Added to cart");
        } else {
          toast.error("Failed to add to cart");
        }
      } catch (error) {
        toast.error("Failed to add to cart");
      }
    } else {
      // Add to localStorage
      setCart((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        );

        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [
          ...prev,
          { ...product, quantity: 1, selectedSize: size, selectedColor: color },
        ];
      });
      toast.success("Added to cart");
    }
  };

  const removeFromCart = async (id: string, size: string, color: string) => {
    if (session?.user) {
      // Remove from database
      const token = localStorage.getItem("bearer_token");
      const cartData = await fetch("/api/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(r => r.json());
      
      const itemToRemove = cartData.find((item: any) => 
        String(item.product.id) === id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (itemToRemove) {
        try {
          const res = await fetch(`/api/cart/${itemToRemove.id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (res.ok) {
            await loadFromDatabase();
            toast.success("Removed from cart");
          }
        } catch (error) {
          toast.error("Failed to remove from cart");
        }
      }
    } else {
      // Remove from localStorage
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedSize === size &&
              item.selectedColor === color
            )
        )
      );
      toast.success("Removed from cart");
    }
  };

  const updateCartQuantity = async (
    id: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }

    if (session?.user) {
      // Update in database
      const token = localStorage.getItem("bearer_token");
      const cartData = await fetch("/api/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(r => r.json());
      
      const itemToUpdate = cartData.find((item: any) => 
        String(item.product.id) === id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (itemToUpdate) {
        try {
          const res = await fetch(`/api/cart/${itemToUpdate.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
          });

          if (res.ok) {
            await loadFromDatabase();
          }
        } catch (error) {
          toast.error("Failed to update quantity");
        }
      }
    } else {
      // Update in localStorage
      setCart((prev) =>
        prev.map((item) =>
          item.id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = async (product: Product) => {
    if (session?.user) {
      // Add to database
      const token = localStorage.getItem("bearer_token");
      try {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: Number(product.id),
          }),
        });

        if (res.ok) {
          await loadFromDatabase();
          toast.success("Added to wishlist");
        } else {
          const data = await res.json();
          if (data.code === "DUPLICATE_ITEM") {
            toast.error("Already in wishlist");
          } else {
            toast.error("Failed to add to wishlist");
          }
        }
      } catch (error) {
        toast.error("Failed to add to wishlist");
      }
    } else {
      // Add to localStorage
      setWishlist((prev) => {
        if (prev.find((item) => item.id === product.id)) {
          toast.error("Already in wishlist");
          return prev;
        }
        toast.success("Added to wishlist");
        return [...prev, product];
      });
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (session?.user) {
      // Remove from database
      const token = localStorage.getItem("bearer_token");
      const wishlistData = await fetch("/api/wishlist", {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(r => r.json());
      
      const itemToRemove = wishlistData.find((item: any) => String(item.product.id) === id);

      if (itemToRemove) {
        try {
          const res = await fetch(`/api/wishlist/${itemToRemove.id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (res.ok) {
            await loadFromDatabase();
            toast.success("Removed from wishlist");
          }
        } catch (error) {
          toast.error("Failed to remove from wishlist");
        }
      }
    } else {
      // Remove from localStorage
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from wishlist");
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        isLoading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}