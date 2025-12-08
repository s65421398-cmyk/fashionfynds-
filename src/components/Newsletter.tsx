"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Send, Check, Lock, Gift, Clock, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus email input on page load
    if (inputRef.current && !isSubscribed) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSubscribed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Check your email for your welcome code!");
    }
  };

  const handleShopNow = () => {
    setEmail("");
    setIsSubscribed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinue = () => {
    setEmail("");
    setIsSubscribed(false);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#FF6B6B] to-[#FF8080] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {!isSubscribed ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>

              {/* Social proof */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-white font-medium">Join 150K+ Fashionistas</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Join The Revolution
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-8">
                Get 15% off your first order + exclusive perks
              </p>

              {/* Benefit callouts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Mail className="h-6 w-6 text-white" />
                  <span className="text-white text-sm font-medium">Exclusive deals</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Clock className="h-6 w-6 text-white" />
                  <span className="text-white text-sm font-medium">Early access</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Gift className="h-6 w-6 text-white" />
                  <span className="text-white text-sm font-medium">Member discounts</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Package className="h-6 w-6 text-white" />
                  <span className="text-white text-sm font-medium">Free shipping</span>
                </div>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type="email"
                    placeholder="Your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 md:h-16 text-lg bg-white border-2 border-white text-foreground placeholder:text-muted-foreground pr-36 rounded-xl shadow-xl"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white hover:bg-black/90 h-10 md:h-12"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Lock className="h-4 w-4 text-white/80" />
                  <span className="text-sm text-white/80 font-medium">Secure & Safe</span>
                </div>
              </form>

              {/* Verification messaging */}
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Check className="h-4 w-4" />
                <span className="text-sm">We never spam. Unsubscribe anytime.</span>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
              {/* Success icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Check your email for your 15% code!
              </h2>

              {/* Welcome code display */}
              <div className="max-w-md mx-auto mb-8">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Your Welcome Code</p>
                  <div className="text-4xl md:text-5xl font-bold text-[#FF6B6B] mb-3 tracking-wider">
                    WELCOME15
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Valid for 7 days</span>
                  </div>
                </div>
              </div>

              <p className="text-white/90 text-lg mb-8">
                Use this code at checkout to save 15% on your first order!
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  onClick={handleShopNow}
                  size="lg" 
                  className="bg-white text-[#FF6B6B] hover:bg-white/90 font-semibold flex-1"
                >
                  Shop Now
                </Button>
                <Button 
                  onClick={handleContinue}
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold flex-1"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}