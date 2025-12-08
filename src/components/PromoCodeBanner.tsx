"use client";

import { useState } from "react";
import { Copy, Check, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PromoCodeBanner() {
  const [copied, setCopied] = useState(false);
  const promoCode = "FYNDS20";

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    toast.success("Promo code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] text-white py-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <Tag className="h-6 w-6" />
          </div>
          
          <div className="flex-1">
            <p className="text-lg md:text-xl font-bold mb-1">
              🎉 Special Offer: Get 20% OFF Your First Order!
            </p>
            <p className="text-sm text-white/90">
              Limited time only • Use code at checkout • Minimum purchase $50
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg px-6 py-3">
              <p className="text-xs text-white/80 mb-1">Promo Code</p>
              <p className="text-2xl font-bold font-mono tracking-wider">{promoCode}</p>
            </div>
            
            <Button
              onClick={handleCopy}
              size="lg"
              className="bg-white text-[#FF6B6B] hover:bg-white/90 font-semibold"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
