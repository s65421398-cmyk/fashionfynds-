"use client";

import { useState } from "react";
import { Gift, Mail, CreditCard, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface GiftCardProps {
  onPurchase?: (data: GiftCardPurchase) => void;
}

interface GiftCardPurchase {
  type: "email" | "physical";
  amount: number;
  customAmount?: number;
  recipientName: string;
  recipientEmail?: string;
  senderName: string;
  message: string;
  deliveryDate?: string;
  design: string;
}

const presetAmounts = [25, 50, 75, 100, 150, 200];

const designs = [
  { id: "classic", name: "Classic", gradient: "from-zinc-800 to-zinc-900" },
  { id: "rose", name: "Rose Gold", gradient: "from-rose-400 to-pink-600" },
  { id: "ocean", name: "Ocean", gradient: "from-cyan-500 to-blue-600" },
  { id: "sunset", name: "Sunset", gradient: "from-orange-400 to-rose-500" },
  { id: "forest", name: "Forest", gradient: "from-emerald-500 to-teal-700" },
  { id: "midnight", name: "Midnight", gradient: "from-indigo-600 to-purple-800" },
];

export function GiftCard({ onPurchase }: GiftCardProps) {
  const [type, setType] = useState<"email" | "physical">("email");
  const [amount, setAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState("");
  const [design, setDesign] = useState("classic");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const selectedDesign = designs.find((d) => d.id === design);
  const finalAmount = amount === "custom" ? Number(customAmount) || 0 : amount;

  const handlePurchase = () => {
    if (!recipientName || !senderName || finalAmount < 10) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (type === "email" && !recipientEmail) {
      toast.error("Please enter recipient email");
      return;
    }

    const purchaseData: GiftCardPurchase = {
      type,
      amount: finalAmount,
      recipientName,
      recipientEmail: type === "email" ? recipientEmail : undefined,
      senderName,
      message,
      deliveryDate: type === "email" ? deliveryDate : undefined,
      design,
    };

    onPurchase?.(purchaseData);
    toast.success("Gift card added to cart!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Preview Card */}
      <div className="order-2 lg:order-1">
        <div className="sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div
            className={cn(
              "relative aspect-[1.6/1] rounded-2xl p-8 text-white overflow-hidden",
              "bg-gradient-to-br",
              selectedDesign?.gradient
            )}
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  <span className="font-semibold tracking-wide">FASHIONFYNDS</span>
                </div>
                <Gift className="h-8 w-8" />
              </div>

              <div>
                <p className="text-sm opacity-80 mb-1">Gift Card</p>
                <p className="text-4xl font-bold">${finalAmount || "0"}</p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  {recipientName && (
                    <p className="text-sm">
                      <span className="opacity-70">To:</span> {recipientName}
                    </p>
                  )}
                  {senderName && (
                    <p className="text-sm">
                      <span className="opacity-70">From:</span> {senderName}
                    </p>
                  )}
                </div>
                <CreditCard className="h-8 w-8 opacity-50" />
              </div>
            </div>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground italic">&quot;{message}&quot;</p>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="order-1 lg:order-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Purchase Gift Card
            </CardTitle>
            <CardDescription>
              Give the gift of style with a FashionFynds gift card
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Delivery Type */}
            <Tabs value={type} onValueChange={(v) => setType(v as "email" | "physical")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="h-4 w-4" />
                  E-Gift Card
                </TabsTrigger>
                <TabsTrigger value="physical" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Physical Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Delivered instantly via email. Perfect for last-minute gifts!
                </p>
              </TabsContent>
              <TabsContent value="physical" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Beautiful physical card shipped in gift packaging. Allow 3-5 business days.
                </p>
              </TabsContent>
            </Tabs>

            {/* Amount Selection */}
            <div>
              <Label className="text-base font-semibold">Select Amount</Label>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={cn(
                      "h-12 rounded-lg border-2 font-semibold transition-all",
                      amount === preset
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => setAmount("custom")}
                  className={cn(
                    "w-full h-12 rounded-lg border-2 font-semibold transition-all",
                    amount === "custom"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {amount === "custom" ? (
                    <Input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="h-full text-center border-0 bg-transparent"
                      min={10}
                      max={500}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    "Custom Amount"
                  )}
                </button>
                {amount === "custom" && (
                  <p className="text-xs text-muted-foreground mt-1">Min $10, Max $500</p>
                )}
              </div>
            </div>

            {/* Card Design */}
            <div>
              <Label className="text-base font-semibold">Choose Design</Label>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {designs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDesign(d.id)}
                    className={cn(
                      "relative h-16 rounded-lg overflow-hidden border-2 transition-all",
                      "bg-gradient-to-br",
                      d.gradient,
                      design === d.id ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                    )}
                  >
                    {design === d.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="sr-only">{d.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient-name">Recipient Name *</Label>
                <Input
                  id="recipient-name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who is this gift for?"
                  className="mt-1"
                />
              </div>

              {type === "email" && (
                <>
                  <div>
                    <Label htmlFor="recipient-email">Recipient Email *</Label>
                    <Input
                      id="recipient-email"
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="recipient@email.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="delivery-date">Delivery Date (Optional)</Label>
                    <Input
                      id="delivery-date"
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to send immediately
                    </p>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="sender-name">Your Name *</Label>
                <Input
                  id="sender-name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a personal message..."
                  maxLength={200}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {message.length}/200 characters
                </p>
              </div>
            </div>

            <Button
              onClick={handlePurchase}
              className="w-full h-12 text-lg"
              disabled={finalAmount < 10}
            >
              <Gift className="h-5 w-5 mr-2" />
              Add Gift Card to Cart - ${finalAmount}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Gift cards never expire and can be used on any purchase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GiftCard;
