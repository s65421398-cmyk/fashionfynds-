"use client";

import { useState, useEffect } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of window and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("🎉 Discount code sent to your email!");
      setIsOpen(false);
      setEmail("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
<DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Special Offer</DialogTitle>
          </VisuallyHidden>
          <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="relative bg-gradient-to-br from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] p-8 text-white">
          <div className="absolute top-4 left-4 opacity-20">
            <Sparkles className="h-24 w-24" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20">
            <Gift className="h-32 w-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Gift className="h-8 w-8" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              Wait! Don't Leave Empty-Handed
            </h2>
            <p className="text-center text-white/90 mb-6 text-lg">
              Get <span className="font-bold text-2xl">20% OFF</span> your first order
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/95 border-0 h-12 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 font-semibold text-lg"
              >
                Claim My 20% Discount
              </Button>
            </form>

            <p className="text-center text-xs text-white/70 mt-4">
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Join <span className="font-semibold text-foreground">100,000+</span> happy customers
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-[#FFD93D] text-xl">★</span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">4.9/5 from 12,543 reviews</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
