"use client";

import { useState } from "react";
import { Ruler, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const sizeData = {
  women: {
    tops: [
      { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", bust: "31-32", waist: "23-24" },
      { size: "S", us: "4-6", uk: "8-10", eu: "36-38", bust: "33-34", waist: "25-26" },
      { size: "M", us: "8-10", uk: "12-14", eu: "40-42", bust: "35-36", waist: "27-28" },
      { size: "L", us: "12-14", uk: "16-18", eu: "44-46", bust: "37-39", waist: "29-31" },
      { size: "XL", us: "16-18", uk: "20-22", eu: "48-50", bust: "40-42", waist: "32-34" },
    ],
    bottoms: [
      { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", waist: "23-24", hip: "33-34" },
      { size: "S", us: "4-6", uk: "8-10", eu: "36-38", waist: "25-26", hip: "35-36" },
      { size: "M", us: "8-10", uk: "12-14", eu: "40-42", waist: "27-28", hip: "37-38" },
      { size: "L", us: "12-14", uk: "16-18", eu: "44-46", waist: "29-31", hip: "39-41" },
      { size: "XL", us: "16-18", uk: "20-22", eu: "48-50", waist: "32-34", hip: "42-44" },
    ],
  },
  men: {
    tops: [
      { size: "S", us: "34-36", uk: "34-36", eu: "44-46", chest: "34-36", neck: "14-14.5" },
      { size: "M", us: "38-40", uk: "38-40", eu: "48-50", chest: "38-40", neck: "15-15.5" },
      { size: "L", us: "42-44", uk: "42-44", eu: "52-54", chest: "42-44", neck: "16-16.5" },
      { size: "XL", us: "46-48", uk: "46-48", eu: "56-58", chest: "46-48", neck: "17-17.5" },
      { size: "XXL", us: "50-52", uk: "50-52", eu: "60-62", chest: "50-52", neck: "18-18.5" },
    ],
    bottoms: [
      { size: "S", us: "28-30", uk: "28-30", eu: "44-46", waist: "28-30", hip: "34-36" },
      { size: "M", us: "32-34", uk: "32-34", eu: "48-50", waist: "32-34", hip: "38-40" },
      { size: "L", us: "36-38", uk: "36-38", eu: "52-54", waist: "36-38", hip: "42-44" },
      { size: "XL", us: "40-42", uk: "40-42", eu: "56-58", waist: "40-42", hip: "46-48" },
      { size: "XXL", us: "44-46", uk: "44-46", eu: "60-62", waist: "44-46", hip: "50-52" },
    ],
  },
};

interface SizeGuideProps {
  category?: "women" | "men";
  trigger?: React.ReactNode;
}

export default function SizeGuide({ category = "women", trigger }: SizeGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<"women" | "men">(category);
  const [garmentType, setGarmentType] = useState<"tops" | "bottoms">("tops");

  const data = sizeData[selectedCategory][garmentType];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <Ruler className="h-3 w-3" />
            Size Guide
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as "women" | "men")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="women">Women</TabsTrigger>
              <TabsTrigger value="men">Men</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={garmentType} onValueChange={(v) => setGarmentType(v as "tops" | "bottoms")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tops">Tops & Dresses</TabsTrigger>
              <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Size</th>
                  <th className="text-left p-3 font-semibold">US</th>
                  <th className="text-left p-3 font-semibold">UK</th>
                  <th className="text-left p-3 font-semibold">EU</th>
                  {garmentType === "tops" && selectedCategory === "women" && (
                    <>
                      <th className="text-left p-3 font-semibold">Bust (in)</th>
                      <th className="text-left p-3 font-semibold">Waist (in)</th>
                    </>
                  )}
                  {garmentType === "tops" && selectedCategory === "men" && (
                    <>
                      <th className="text-left p-3 font-semibold">Chest (in)</th>
                      <th className="text-left p-3 font-semibold">Neck (in)</th>
                    </>
                  )}
                  {garmentType === "bottoms" && (
                    <>
                      <th className="text-left p-3 font-semibold">Waist (in)</th>
                      <th className="text-left p-3 font-semibold">Hip (in)</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.size}
                    className={cn(
                      "border-b transition-colors hover:bg-muted/30",
                      index % 2 === 0 && "bg-muted/10"
                    )}
                  >
                    <td className="p-3 font-semibold">{row.size}</td>
                    <td className="p-3">{row.us}</td>
                    <td className="p-3">{row.uk}</td>
                    <td className="p-3">{row.eu}</td>
                    {garmentType === "tops" && selectedCategory === "women" && (
                      <>
                        <td className="p-3">{(row as typeof sizeData.women.tops[0]).bust}</td>
                        <td className="p-3">{row.waist}</td>
                      </>
                    )}
                    {garmentType === "tops" && selectedCategory === "men" && (
                      <>
                        <td className="p-3">{(row as typeof sizeData.men.tops[0]).chest}</td>
                        <td className="p-3">{(row as typeof sizeData.men.tops[0]).neck}</td>
                      </>
                    )}
                    {garmentType === "bottoms" && (
                      <>
                        <td className="p-3">{row.waist}</td>
                        <td className="p-3">{(row as typeof sizeData.women.bottoms[0]).hip}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 mb-2">How to Measure</p>
                <ul className="space-y-1 text-blue-800">
                  <li><strong>Bust/Chest:</strong> Measure around the fullest part</li>
                  <li><strong>Waist:</strong> Measure around the natural waistline</li>
                  <li><strong>Hip:</strong> Measure around the fullest part of hips</li>
                  <li><strong>Neck:</strong> Measure around the base of neck</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Sizes may vary slightly between brands. When in doubt, size up.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
