"use client";

import { useState } from "react";
import { Bell, CheckCircle, Loader2, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface StockNotificationProps {
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  trigger?: React.ReactNode;
}

export default function StockNotification({ 
  product, 
  selectedSize, 
  selectedColor,
  trigger 
}: StockNotificationProps) {
  const [email, setEmail] = useState("");
  const [size, setSize] = useState(selectedSize || "");
  const [color, setColor] = useState(selectedColor || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const notifications = JSON.parse(localStorage.getItem("stock-notifications") || "[]");
    notifications.push({
      productId: product.id,
      productName: product.name,
      email,
      size,
      color,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("stock-notifications", JSON.stringify(notifications));

    setLoading(false);
    setSuccess(true);
    toast.success("You'll be notified when back in stock!");

    setTimeout(() => {
      setOpen(false);
      setSuccess(false);
      setEmail("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full gap-2">
            <Bell className="h-4 w-4" />
            Notify When Available
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Get Notified
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">You&apos;re on the list!</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll email you when {product.name} is back in stock.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 items-center p-3 bg-muted/50 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-20 object-cover rounded"
              />
              <div>
                <p className="text-xs text-muted-foreground uppercase">{product.brand}</p>
                <p className="font-medium text-sm">{product.name}</p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="notify-size" className="text-xs">Size (optional)</Label>
                <select
                  id="notify-size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-background"
                >
                  <option value="">Any size</option>
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="notify-color" className="text-xs">Color (optional)</Label>
                <select
                  id="notify-color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-background"
                >
                  <option value="">Any color</option>
                  {product.colors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="notify-email" className="text-xs">Email address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="notify-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              We&apos;ll only use your email to notify you about this product.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
