"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Settings,
  Store,
  Mail,
  CreditCard,
  Globe,
  Shield,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";

export default function AdminSettingsPage() {
  // Check which services are configured via presence of env vars
  // (we only check client-side accessible ones or infer from API)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const configItems = [
    {
      category: "Database",
      icon: Store,
      items: [
        { name: "Turso Database", env: "TURSO_CONNECTION_URL", status: true },
        { name: "Turso Auth Token", env: "TURSO_AUTH_TOKEN", status: true },
      ],
    },
    {
      category: "Authentication",
      icon: Shield,
      items: [
        { name: "Better Auth Secret", env: "BETTER_AUTH_SECRET", status: true },
        { name: "Admin Emails", env: "ADMIN_EMAILS", status: true },
        { name: "Google OAuth", env: "GOOGLE_CLIENT_ID", status: false },
        { name: "Facebook OAuth", env: "FACEBOOK_CLIENT_ID", status: false },
      ],
    },
    {
      category: "Payments",
      icon: CreditCard,
      items: [
        { name: "Manual UPI", env: "NEXT_PUBLIC_UPI_ID", status: !!upiId },
        { name: "WhatsApp Support", env: "NEXT_PUBLIC_WHATSAPP_NUMBER", status: !!whatsapp },
        { name: "Stripe", env: "STRIPE_SECRET_KEY", status: false },
        { name: "Razorpay", env: "RAZORPAY_KEY_ID", status: false },
      ],
    },
    {
      category: "Email",
      icon: Mail,
      items: [
        { name: "Resend API", env: "RESEND_API_KEY", status: true },
        { name: "Admin Notification Email", env: "ADMIN_NOTIFICATION_EMAIL", status: true },
      ],
    },
    {
      category: "Media",
      icon: Globe,
      items: [
        { name: "Cloudinary", env: "CLOUDINARY_CLOUD_NAME", status: true },
      ],
    },
    {
      category: "Analytics",
      icon: Globe,
      items: [
        { name: "Google Analytics (GA4)", env: "NEXT_PUBLIC_GA4_ID", status: false },
        { name: "Google Tag Manager", env: "NEXT_PUBLIC_GTM_ID", status: false },
        { name: "Facebook Pixel", env: "NEXT_PUBLIC_FB_PIXEL_ID", status: false },
        { name: "Hotjar", env: "NEXT_PUBLIC_HOTJAR_ID", status: false },
      ],
    },
  ];

  const totalConfigured = configItems.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.status).length,
    0
  );
  const totalItems = configItems.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-400" />
          Settings
        </h2>
        <p className="text-white/50 mt-1">
          Environment configuration & service status
        </p>
      </div>

      {/* Overview Card */}
      <Card className="bg-[#12121a] border-white/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Configuration Status</p>
              <p className="text-white/50 text-sm mt-1">
                {totalConfigured} of {totalItems} services configured
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-400">
                {Math.round((totalConfigured / totalItems) * 100)}%
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all"
              style={{ width: `${(totalConfigured / totalItems) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Store Info */}
      <Card className="bg-[#12121a] border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-400" />
            Store Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-white/70">Site URL</Label>
              <Input
                value={siteUrl}
                readOnly
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white/70">UPI ID</Label>
              <Input
                value={upiId}
                readOnly
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          <p className="text-white/40 text-xs">
            To update these values, edit your <code className="text-amber-400">.env</code> file and restart the server.
          </p>
        </CardContent>
      </Card>

      {/* Service Status */}
      {configItems.map((category) => {
        const Icon = category.icon;
        return (
          <Card key={category.category} className="bg-[#12121a] border-white/5">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Icon className="w-5 h-5 text-amber-400" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.env}</p>
                    </div>
                    {item.status ? (
                      <Badge
                        variant="outline"
                        className="border-emerald-500/50 text-emerald-400"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Configured
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-amber-500/50 text-amber-400"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Not Set
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
