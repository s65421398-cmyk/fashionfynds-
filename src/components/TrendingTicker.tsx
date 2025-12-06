"use client";

import { TrendingUp } from "lucide-react";

const trendingItems = [
  "🔥 Summer Sale: Up to 70% OFF",
  "⚡ Flash Deal: Nike Sneakers - Limited Stock",
  "✨ New Arrivals: Zara Spring Collection",
  "💫 Trending: Sustainable Fashion",
  "🎯 Hot Pick: Levi's Denim - 40% OFF",
  "🌟 Editor's Choice: Minimalist Watches",
  "🔥 Summer Sale: Up to 70% OFF",
  "⚡ Flash Deal: Nike Sneakers - Limited Stock",
  "✨ New Arrivals: Zara Spring Collection",
  "💫 Trending: Sustainable Fashion",
];

export default function TrendingTicker() {
  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
        {trendingItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
