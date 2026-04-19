"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(scrollPercent);
      setVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-24 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300",
        "bg-primary hover:bg-primary/90 hover:scale-110",
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      )}
      size="icon"
    >
      <div className="relative flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray={`${(progress / 100) * 125.6} 125.6`}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="h-5 w-5 text-white" />
      </div>
    </Button>
  );
}
