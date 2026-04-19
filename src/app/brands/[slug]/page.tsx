"use client";

export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBrandBySlug, brands } from "@/data/brands";
import {
  ExternalLink,
  Star,
  Globe,
  Instagram,
  MapPin,
  CalendarDays,
  ArrowLeft,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BrandDetailPage({ params }: Props) {
  const { slug } = use(params);
  const brand = getBrandBySlug(slug);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  if (!brand) notFound();

  const related = brands
    .filter(
      (b) =>
        b.slug !== brand.slug &&
        b.category.some((c) => brand.category.includes(c))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          dark
        />

      {/* ── HERO BANNER ── */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <img
          src={brand.coverImage}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/80 to-transparent" />

        <div className="absolute top-6 left-4">
          <Link href="/brands">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              All Brands
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-8 left-4 md:left-10 max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-3">
            {brand.category.map((cat) => (
              <Badge
                key={cat}
                className="bg-[#1BA6A6]/20 text-[#1BA6A6] border-[#1BA6A6]/40 text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            {brand.name}
          </h1>
          <p className="text-white/70 text-lg md:text-xl mt-2 italic">
            &ldquo;{brand.tagline}&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 fill-[#FFD93D] text-[#FFD93D]" />
              <span className="font-bold">{brand.rating}</span>
              <span className="text-white/50 text-sm">({brand.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full text-sm text-white/70">
              <MapPin className="h-3.5 w-3.5" />
              {brand.country}
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full text-sm text-white/70">
              <CalendarDays className="h-3.5 w-3.5" />
              Est. {brand.founded}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY CTA BAR ── */}
      <div className="sticky top-[65px] z-40 bg-[#111]/95 backdrop-blur border-b border-white/10 shadow-xl">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-white font-semibold">{brand.name}</p>
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1BA6A6] text-sm hover:underline flex items-center gap-1"
            >
              <Globe className="h-3 w-3" />
              {brand.website.replace("https://", "")}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {brand.instagram && (
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/70 hover:border-pink-500 hover:text-pink-400 gap-1.5"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
              </a>
            )}
            <a href={brand.website} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1BA6A6] hover:bg-[#159090] text-white font-bold gap-2 px-6">
                <ShoppingBag className="h-4 w-4" />
                SHOP NOW
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: About + Highlights */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">About {brand.name}</h2>
              <p className="text-white/65 text-base leading-relaxed">{brand.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-5">What They&apos;re Known For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brand.highlights.map((h, i) => (
                  <div
                    key={h}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#1BA6A6]/40 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#1BA6A6]/20 flex items-center justify-center shrink-0 text-[#1BA6A6] font-black text-lg">
                      {i + 1}
                    </div>
                    <span className="text-white/80 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Big CTA */}
            <section className="bg-gradient-to-r from-[#1BA6A6]/20 to-[#1BA6A6]/5 border border-[#1BA6A6]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Ready to shop {brand.name}?</h3>
                <p className="text-white/55 text-sm">
                  You&apos;ll be taken directly to{" "}
                  <span className="text-[#1BA6A6]">{brand.website.replace("https://", "")}</span>
                </p>
              </div>
              <a href={brand.website} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Button
                  size="lg"
                  className="bg-[#1BA6A6] hover:bg-[#159090] text-white font-black text-base px-8 gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  SHOP ON {brand.name.toUpperCase()}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </section>
          </div>

          {/* Right: Info sidebar */}
          <aside className="space-y-6">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-lg">Brand Info</h3>

              <InfoRow icon={<Globe className="h-4 w-4 text-[#1BA6A6]" />} label="Website">
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1BA6A6] hover:underline text-sm break-all"
                >
                  {brand.website.replace("https://", "")}
                </a>
              </InfoRow>

              <InfoRow icon={<MapPin className="h-4 w-4 text-[#1BA6A6]" />} label="Country">
                <span className="text-white/70 text-sm">{brand.country}</span>
              </InfoRow>

              <InfoRow icon={<CalendarDays className="h-4 w-4 text-[#1BA6A6]" />} label="Founded">
                <span className="text-white/70 text-sm">{brand.founded}</span>
              </InfoRow>

              <InfoRow icon={<Star className="h-4 w-4 fill-[#FFD93D] text-[#FFD93D]" />} label="Rating">
                <span className="text-white/70 text-sm">
                  {brand.rating} / 5 &nbsp;·&nbsp; {brand.reviewCount.toLocaleString()} reviews
                </span>
              </InfoRow>

              {brand.instagram && (
                <InfoRow icon={<Instagram className="h-4 w-4 text-pink-400" />} label="Instagram">
                  <a
                    href={brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline text-sm"
                  >
                    @{brand.instagram.split("/").pop()}
                  </a>
                </InfoRow>
              )}

              <div className="pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs mb-3">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {brand.category.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="border-white/20 text-white/60 text-xs"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/40 leading-relaxed">
              <strong className="text-white/60">Discovery Only</strong> — FashionFynds
              is a curated brand directory. Clicking &quot;Shop Now&quot; takes you directly to{" "}
              {brand.name}&apos;s official website. We don&apos;t process payments or fulfil orders.
            </div>
          </aside>
        </div>

        {/* Related brands */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">You Might Also Like</h2>
              <Link href="/brands">
                <Button variant="ghost" size="sm" className="text-[#1BA6A6] hover:text-[#1BA6A6]/80 gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((b) => (
                <Link key={b.slug} href={`/brands/${b.slug}`}>
                  <div className="group bg-[#1a1a1a] border border-white/10 hover:border-[#1BA6A6]/50 rounded-2xl overflow-hidden transition-all hover:-translate-y-1">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={b.coverImage}
                        alt={b.name}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                      <div className="absolute bottom-2 left-3">
                        <p className="font-bold text-white text-sm">{b.name}</p>
                        <p className="text-white/50 text-xs">{b.tagline}</p>
                      </div>
                    </div>
                    <div className="px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[#FFD93D] text-[#FFD93D]" />
                        <span className="text-xs text-white/70">{b.rating}</span>
                      </div>
                      <span className="text-xs text-[#1BA6A6]">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-white/40 text-xs mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}
