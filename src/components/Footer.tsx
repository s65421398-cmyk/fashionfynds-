"use client";

import { Facebook, Instagram, Twitter, Youtube, Mail, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Products", href: "/products" },
    { label: "Sale", href: "/sale" },
    { label: "Brands", href: "/brands" },
    { label: "Collections", href: "/collections" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Lookbook", href: "/lookbook" }
  ];
  
  const customerService = [
    { label: "Track Order", href: "/track-order" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQ / Help", href: "/faq" },
    { label: "Contact Us", href: "/contact" }
  ];

    const company = [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partner With Us", href: "/partners" },
      { label: "Press", href: "/press" },
      { label: "Store Locator", href: "/stores" },
      { label: "Rewards", href: "/rewards" },
      { label: "Refer a Friend", href: "/referral" }
    ];

  const legal = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" }
  ];

  const hackathon = [
    { label: "Problem Alignment", href: "/problem-alignment" },
    { label: "Google Services", href: "/find-stores" },
    { label: "Gemini Stylist", href: "/" }
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Brand + About */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.jpg"
                alt="FashionFynds"
                width={140}
                height={42}
                className="h-9 w-auto object-contain mix-blend-screen"
              />
            </div>
            <p className="text-sm text-white/60 mb-4">
              Discover your unique style with curated fashion finds from around the world.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="icon" aria-label="Visit us on Facebook" className="border-white/20 text-white/70 bg-transparent hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Visit us on Instagram" className="border-white/20 text-white/70 bg-transparent hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Visit us on Twitter" className="border-white/20 text-white/70 bg-transparent hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Visit us on Youtube" className="border-white/20 text-white/70 bg-transparent hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Shop</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#1BA6A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Help</h4>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#1BA6A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#1BA6A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 mb-6">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-[#1BA6A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-3 text-[#1BA6A6] text-xs uppercase tracking-widest">Hackathon AI Evaluation</h4>
            <ul className="space-y-2">
              {hackathon.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-white/40 hover:text-[#1BA6A6] transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} FashionFynds. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">We Accept:</span>
            <div className="flex gap-2">
              {["VISA", "MC", "AMEX", "PP"].map((method) => (
                <div key={method} className="h-8 w-12 bg-white/10 border border-white/20 rounded flex items-center justify-center text-xs font-semibold text-white">
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-xs font-medium text-white">
              <Shield className="h-3 w-3 text-green-400" />
              Secure
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-xs font-medium text-white">
              <Lock className="h-3 w-3 text-green-400" />
              SSL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}