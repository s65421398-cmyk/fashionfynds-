"use client";

import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShop } from "@/contexts/ShopContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/product";

interface WishlistSheetProps {
  open: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export default function WishlistSheet({
  open,
  onClose,
  onProductClick,
}: WishlistSheetProps) {
  const { wishlist, removeFromWishlist } = useShop();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({wishlist.length})
          </SheetTitle>
        </SheetHeader>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">
              Save items you love for later
            </p>
            <Button onClick={onClose}>Start Shopping</Button>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-120px)] mt-6">
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 cursor-pointer group"
                  onClick={() => {
                    onProductClick(item);
                    onClose();
                  }}
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(item.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {item.inStock ? (
                      <span className="text-xs text-green-600 font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
