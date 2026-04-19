"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, Package, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout/session?id=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setSession(data);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background dark:from-green-950/20 dark:to-background">
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for shopping with FashionFynds
            </p>
          </div>

          {session && (
            <div className="bg-muted rounded-lg p-6 mb-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono font-semibold">
                    {session.id?.slice(-12).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold">
                    ${((session.amount_total || 0) / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              {session.customer_email && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{session.customer_email}</p>
                </div>
              )}

              {session.customer_details?.address && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Shipping Address
                  </p>
                  <p className="font-medium">
                    {session.customer_details.address.line1}
                    {session.customer_details.address.line2 && (
                      <>, {session.customer_details.address.line2}</>
                    )}
                    <br />
                    {session.customer_details.address.city},{" "}
                    {session.customer_details.address.state}{" "}
                    {session.customer_details.address.postal_code}
                    <br />
                    {session.customer_details.address.country}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">What happens next?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Order Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for order details and receipt
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    We're preparing your items for shipment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Tracking Information</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive tracking details once shipped
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1" size="lg">
              <Link href="/account/orders">
                View Order Status
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1" size="lg">
              <Link href="/">
                Continue Shopping
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Questions about your order?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
