"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useShop } from "@/contexts/ShopContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, cartCount, clearCart } = useShop();
  const { trackEcommerce, trackFbEvent } = useAnalytics();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const shippingCost = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleStripeCheckout = async () => {
    if (!customerEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!customerEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);

    try {
      // Track checkout initiation
      trackFbEvent('InitiateCheckout', {
        value: total,
        currency: 'USD',
        num_items: cartCount,
      });

      trackEcommerce('begin_checkout', {
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
          currency: 'USD',
          item_brand: item.brand,
          item_category: item.category,
        })),
        value: total,
        currency: 'USD',
      });

      // Create Stripe checkout session
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            brand: item.brand,
            image: item.image,
          })),
          customerEmail,
          metadata: {
            cartCount: cartCount.toString(),
            subtotal: cartTotal.toFixed(2),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('No checkout URL received');
      }

      // Handle iframe compatibility - open in new tab
      const isInIframe = window.self !== window.top;
      if (isInIframe) {
        window.parent.postMessage(
          { type: "OPEN_EXTERNAL_URL", data: { url } },
          "*"
        );
        toast.success("Opening Stripe Checkout in new tab...");
      } else {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }

      // Clear cart on redirect (will only happen if redirect succeeds)
      setTimeout(() => {
        clearCart();
      }, 1000);

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Failed to start checkout. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Secure Checkout</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
              🔒 Secure payment powered by Stripe
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Your payment information is encrypted and secure
            </p>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              disabled={isProcessing}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              We'll send your order confirmation here
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleStripeCheckout}
              disabled={isProcessing || !customerEmail}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Continue to Payment
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Items in your cart:</h4>
            <div className="space-y-2">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate flex-1">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium ml-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{cart.length - 3} more items
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}