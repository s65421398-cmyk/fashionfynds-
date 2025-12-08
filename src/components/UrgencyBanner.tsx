"use client";

import { useState, useEffect } from "react";
import { Clock, TrendingUp, Users, Zap } from "lucide-react";

export default function UrgencyBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const urgencyMessages = [
    {
      icon: Clock,
      text: "⚡ Flash Sale Ends Today! Don't Miss Out",
      color: "text-[#FF6B6B]",
    },
    {
      icon: TrendingUp,
      text: "🔥 1,234 items sold in the last 24 hours",
      color: "text-[#FFD93D]",
    },
    {
      icon: Users,
      text: "👥 523 people viewing deals right now",
      color: "text-[#1BA6A6]",
    },
    {
      icon: Zap,
      text: "⏰ Limited Stock Alert: Popular items selling fast!",
      color: "text-[#FF8E53]",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % urgencyMessages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [urgencyMessages.length]);

  const currentMessage = urgencyMessages[activeIndex];
  const Icon = currentMessage.icon;

  return (
    <div className="bg-foreground text-background py-3 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-center">
          <Icon className={`h-5 w-5 ${currentMessage.color} animate-pulse`} />
          <p className="text-sm md:text-base font-semibold animate-fade-in">
            {currentMessage.text}
          </p>
        </div>
      </div>
    </div>
  );
}
