"use client";

import { useRef, useState } from "react";
import {
  Loader2, Smartphone, Copy, CheckCircle2, AlertCircle, Upload, ImageIcon, X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useShop } from "@/contexts/ShopContext";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const EMAIL_REGEX = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID ?? "fashionfynds@upi";

type Step = "details" | "payment" | "done";

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, cartCount, clearCart } = useShop();
  const [step, setStep] = useState<Step>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);

  // Contact / shipping
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("India");

  // Screenshot
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const VALID_COUPONS: Record<string, { type: "percent"; value: number; label: string }> = {
    FYNDS20: { type: "percent", value: 20, label: "20% off" },
    FYNDS10: { type: "percent", value: 10, label: "10% off" },
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { toast.error("Please enter a coupon code."); return; }
    const coupon = VALID_COUPONS[code];
    if (!coupon) { toast.error("Invalid coupon code."); return; }
    if (appliedCoupon === code) { toast.error("Coupon already applied."); return; }
    setAppliedCoupon(code);
    const discount = Math.round((cartTotal * coupon.value) / 100);
    setCouponDiscount(discount);
    toast.success(`Coupon applied! You save ₹${discount.toLocaleString('en-IN')}`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    toast.info("Coupon removed.");
  };

  const shippingCost = cartTotal > 999 ? 0 : 99;
  const total = cartTotal - couponDiscount + shippingCost;

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleContinueToPayment = () => {
    const sanitizedEmail = DOMPurify.sanitize(email.trim()).toLowerCase();
    if (!name.trim()) { toast.error("Please enter your full name."); return; }
    if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) { toast.error("Please enter a valid email."); return; }
    if (!phone.trim()) { toast.error("Please enter your phone number."); return; }
    if (!address.trim()) { toast.error("Please enter your street address."); return; }
    if (!city.trim()) { toast.error("Please enter your city."); return; }
    if (!stateName.trim()) { toast.error("Please enter your state."); return; }
    if (!zip.trim()) { toast.error("Please enter your PIN code."); return; }
    if (cart.length === 0) { toast.error("Your cart is empty."); return; }
    setStep("payment");
  };

  const handleSubmitOrder = async () => {
    if (!screenshotFile) {
      toast.error("Please upload your payment screenshot.");
      return;
    }

    setIsSubmitting(true);
    const sanitizedEmail = DOMPurify.sanitize(email.trim()).toLowerCase();

    try {
      // 1. Place the order
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: Number(item.id),
            productName: item.name,
            productImage: item.image,
            quantity: item.quantity,
            price: item.price,
            selectedSize: item.selectedSize ?? "One Size",
            selectedColor: item.selectedColor ?? "Default",
          })),
          subtotal: cartTotal,
          discount: couponDiscount,
          couponCode: appliedCoupon ?? undefined,
          shipping: shippingCost,
          tax: 0,
          total,
          shippingName: name.trim(),
          shippingEmail: sanitizedEmail,
          shippingPhone: phone.trim(),
          shippingAddress: address.trim(),
          shippingCity: city.trim(),
          shippingState: stateName.trim(),
          shippingZip: zip.trim(),
          shippingCountry: country.trim(),
          paymentMethod: "upi_manual",
          status: "pending_verification",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to place order");
      }

      const order = await res.json();

      // 2. Upload screenshot against the order
      const formData = new FormData();
      formData.append("screenshot", screenshotFile);
      formData.append("orderId", String(order.id));
      await fetch("/api/orders/screenshot", { method: "POST", body: formData });

      clearCart();
      setStep("done");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setStep("details");
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setUpiCopied(false);
    setCouponInput("");
    setAppliedCoupon(null);
    setCouponDiscount(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {step === "details" && "Shipping Details"}
            {step === "payment" && "Pay via UPI"}
            {step === "done" && "Order Placed!"}
          </DialogTitle>
        </DialogHeader>

        {/* ── STEP 1: Shipping details ── */}
        {step === "details" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="co-name">Full Name *</Label>
                <Input id="co-name" placeholder="Jane Smith" value={name}
                  onChange={(e) => setName(e.target.value)} className="mt-1" maxLength={100} />
              </div>
              <div>
                <Label htmlFor="co-email">Email *</Label>
                <Input id="co-email" type="email" placeholder="you@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} className="mt-1" maxLength={254} />
              </div>
              <div>
                <Label htmlFor="co-phone">Phone *</Label>
                <Input id="co-phone" type="tel" placeholder="+91 98765 43210" value={phone}
                  onChange={(e) => setPhone(e.target.value)} className="mt-1" maxLength={20} />
              </div>
              <div>
                <Label htmlFor="co-country">Country</Label>
                <Input id="co-country" placeholder="India" value={country}
                  onChange={(e) => setCountry(e.target.value)} className="mt-1" maxLength={60} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Shipping Address *</Label>
              <Input placeholder="Street address / flat / area" value={address}
                onChange={(e) => setAddress(e.target.value)} maxLength={200} />
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="City" value={city}
                  onChange={(e) => setCity(e.target.value)} maxLength={100} />
                <Input placeholder="State" value={stateName}
                  onChange={(e) => setStateName(e.target.value)} maxLength={100} />
                <Input placeholder="PIN code" value={zip}
                  onChange={(e) => setZip(e.target.value)} maxLength={20} />
              </div>
            </div>

            <Separator />

            {/* Coupon code */}
            <div className="space-y-2">
              <Label>Coupon Code</Label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                    🎉 {appliedCoupon} — {VALID_COUPONS[appliedCoupon].label} applied
                  </span>
                  <button onClick={removeCoupon} className="text-xs text-red-500 hover:text-red-700 font-medium ml-2">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    maxLength={20}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={applyCoupon} className="shrink-0">Apply</Button>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="text-sm space-y-1">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cartCount} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount ({appliedCoupon})</span>
                  <span>−{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-muted-foreground">Free shipping on orders over ₹999</p>
              )}
              <Separator className="my-1" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleContinueToPayment}>
              Continue to Payment
            </Button>
          </div>
        )}

        {/* ── STEP 2: UPI payment ── */}
        {step === "payment" && (
          <div className="space-y-5">
            {/* Amount banner */}
            <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-4 text-center">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-teal-600" />
              <p className="text-sm text-teal-700 dark:text-teal-300">Amount to pay</p>
              <p className="text-3xl font-bold text-teal-900 dark:text-teal-100 mt-1">
                {formatPrice(total)}
              </p>
            </div>

            {/* UPI ID */}
            <div className="border rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium">Step 1 — Send payment to this UPI ID</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-3 py-2.5 rounded-lg text-sm font-mono font-semibold tracking-wide">
                  {UPI_ID}
                </code>
                <Button size="sm" variant="outline" onClick={copyUpi} className="shrink-0">
                  {upiCopied ? (
                    <><CheckCircle2 className="h-4 w-4 text-green-500 mr-1" /> Copied</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Copy</>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Open GPay, PhonePe, Paytm, or any UPI app → Pay to UPI ID → Enter ₹{total.toFixed(0)} → Complete payment
              </p>
            </div>

            {/* Screenshot upload */}
            <div className="border rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium">Step 2 — Upload your payment screenshot</p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {screenshotPreview ? (
                <div className="relative">
                  <img
                    src={screenshotPreview}
                    alt="Payment screenshot"
                    className="w-full max-h-48 object-contain rounded-lg border bg-muted"
                  />
                  <button
                    onClick={() => { setScreenshotFile(null); setScreenshotPreview(null); }}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Screenshot uploaded
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 rounded-xl py-8 flex flex-col items-center gap-2 transition-colors"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                  <span className="text-sm text-muted-foreground">Tap to upload screenshot</span>
                  <span className="text-xs text-muted-foreground/60">JPG, PNG, WebP — max 5 MB</span>
                </button>
              )}
            </div>

            <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>We&apos;ll verify your payment and confirm the order on WhatsApp within 1–2 hours.</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("details")} disabled={isSubmitting}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleSubmitOrder} disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Placing Order…</>
                ) : (
                  <><Upload className="h-4 w-4 mr-2" />Submit Order</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Done ── */}
        {step === "done" && (
          <div className="space-y-5 text-center py-4">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <div>
              <h3 className="text-lg font-bold">Order Received!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We have your screenshot and will verify payment within 1–2 hours.
                You will get a WhatsApp confirmation once done.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
            </div>
            <Button className="w-full" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
