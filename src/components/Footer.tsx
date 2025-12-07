"use client";

import { Facebook, Instagram, Twitter, Youtube, Mail, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "New Arrivals", href: "/categories/new-arrivals" },
    { label: "Women", href: "/categories/women" },
    { label: "Men", href: "/categories/men" },
    { label: "Accessories", href: "/categories/accessories" },
    { label: "Sale", href: "/categories/sale" },
    { label: "Brands", href: "/brands" },
    { label: "Collections", href: "/collections" }
  ];
  
  const legalSupport = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ / Help Center", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Track Order", href: "/account/orders" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand + About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Fashion<span className="text-primary">Fynds</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discover your unique style with curated fashion finds from around the world. We celebrate indie culture, independent designers, and fashion movements that break the mold. Join our community of trendsetters and style revolutionaries.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="font-semibold mb-4">Help & Info</h4>
            <ul className="space-y-2">
              {legalSupport.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Follow us on social media for style inspiration, exclusive deals, and behind-the-scenes content.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="icon" className="hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-[#1BA6A6] hover:text-white hover:border-[#1BA6A6] transition-colors">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="space-y-6">
          {/* Links Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} FashionFynds. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                Privacy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/terms" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                Terms
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/shipping" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                Shipping
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/contact" className="text-muted-foreground hover:text-[#1BA6A6] transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Payment & Security Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">We Accept:</span>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-background border rounded flex items-center justify-center text-xs font-semibold hover:border-[#1BA6A6] transition-colors">
                  VISA
                </div>
                <div className="h-8 w-12 bg-background border rounded flex items-center justify-center text-xs font-semibold hover:border-[#1BA6A6] transition-colors">
                  MC
                </div>
                <div className="h-8 w-12 bg-background border rounded flex items-center justify-center text-xs font-semibold hover:border-[#1BA6A6] transition-colors">
                  AMEX
                </div>
                <div className="h-8 w-12 bg-background border rounded flex items-center justify-center text-xs font-semibold hover:border-[#1BA6A6] transition-colors">
                  PP
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-background border rounded text-xs font-medium hover:border-[#1BA6A6] transition-colors">
                <Shield className="h-3 w-3 text-green-600" />
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-background border rounded text-xs font-medium hover:border-[#1BA6A6] transition-colors">
                <Lock className="h-3 w-3 text-green-600" />
                Secure Payments
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}