"use client";

import { Shield, Truck, RotateCcw, Award, Lock, HeadphonesIcon } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Verified brands only",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ₹999",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day guarantee",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Premium selection",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    description: "SSL encrypted",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-8 bg-muted/30 border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-[#1BA6A6]/10 flex items-center justify-center mb-3 group-hover:bg-[#1BA6A6]/20 transition-colors">
                <badge.icon className="h-6 w-6 text-[#1BA6A6]" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
