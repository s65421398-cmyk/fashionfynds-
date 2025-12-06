"use client";

import { useState } from "react";
import { Mail, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Successfully subscribed!");
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#FF6B6B] to-[#FF8080]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {!isSubscribed ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Join The Revolution
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Subscribe to our newsletter for exclusive deals, style tips, and early access to new collections.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border-white text-foreground placeholder:text-muted-foreground"
                  required
                />
                <Button type="submit" size="lg" className="bg-black text-white hover:bg-black/90">
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-white/80">
                We respect your privacy. Unsubscribe anytime with one click.
              </p>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Successfully Subscribed!
              </h2>
              <p className="text-white/90 text-lg mt-4">
                Check your inbox for exclusive offers.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}