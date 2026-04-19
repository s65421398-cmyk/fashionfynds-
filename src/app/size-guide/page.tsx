"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistSheet from "@/components/WishlistSheet";
import SearchModal from "@/components/SearchModal";
import CheckoutModal from "@/components/CheckoutModal";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Info } from "lucide-react";

export default function SizeGuidePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const womensTops = [
    { size: "XS", us: "0-2", bust: '31-32"', waist: '24-25"', hip: '34-35"' },
    { size: "S", us: "4-6", bust: '33-34"', waist: '26-27"', hip: '36-37"' },
    { size: "M", us: "8-10", bust: '35-36"', waist: '28-29"', hip: '38-39"' },
    { size: "L", us: "12-14", bust: '37-39"', waist: '30-32"', hip: '40-42"' },
    { size: "XL", us: "16-18", bust: '40-42"', waist: '33-35"', hip: '43-45"' },
  ];

  const mensTops = [
    { size: "S", us: "34-36", chest: '34-36"', waist: '28-30"', neck: '14-14.5"' },
    { size: "M", us: "38-40", chest: '38-40"', waist: '32-34"', neck: '15-15.5"' },
    { size: "L", us: "42-44", chest: '42-44"', waist: '36-38"', neck: '16-16.5"' },
    { size: "XL", us: "46-48", chest: '46-48"', waist: '40-42"', neck: '17-17.5"' },
    { size: "XXL", us: "50-52", chest: '50-52"', waist: '44-46"', neck: '18-18.5"' },
  ];

  const shoes = [
    { us: "6", uk: "5.5", eu: "36", cm: "22.5" },
    { us: "7", uk: "6.5", eu: "37", cm: "23.5" },
    { us: "8", uk: "7.5", eu: "38", cm: "24" },
    { us: "9", uk: "8.5", eu: "39", cm: "25" },
    { us: "10", uk: "9.5", eu: "40", cm: "26" },
    { us: "11", uk: "10.5", eu: "41", cm: "26.5" },
    { us: "12", uk: "11.5", eu: "42", cm: "27" },
  ];

  return (
      <div className="min-h-screen bg-background">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onWishlistOpen={() => setWishlistOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="pt-8 pb-16">
          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16 mb-12">
            <div className="container mx-auto px-4 text-center">
              <Ruler className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Size Guide</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Find your perfect fit with our comprehensive size charts
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#1BA6A6]" />
                  How to Measure
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Bust/Chest</h4>
                  <p className="text-sm text-muted-foreground">
                    Measure around the fullest part of your chest, keeping the tape horizontal.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Waist</h4>
                  <p className="text-sm text-muted-foreground">
                    Measure around your natural waistline, keeping the tape comfortably loose.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Hip</h4>
                  <p className="text-sm text-muted-foreground">
                    Measure around the fullest part of your hips, about 8" below your waist.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="women" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="women">Women</TabsTrigger>
                <TabsTrigger value="men">Men</TabsTrigger>
                <TabsTrigger value="shoes">Shoes</TabsTrigger>
              </TabsList>

              <TabsContent value="women">
                <Card>
                  <CardHeader>
                    <CardTitle>Women's Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Size</th>
                            <th className="text-left py-3 px-4 font-semibold">US Size</th>
                            <th className="text-left py-3 px-4 font-semibold">Bust</th>
                            <th className="text-left py-3 px-4 font-semibold">Waist</th>
                            <th className="text-left py-3 px-4 font-semibold">Hip</th>
                          </tr>
                        </thead>
                        <tbody>
                          {womensTops.map((row) => (
                            <tr key={row.size} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{row.size}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.us}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.bust}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.hip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="men">
                <Card>
                  <CardHeader>
                    <CardTitle>Men's Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Size</th>
                            <th className="text-left py-3 px-4 font-semibold">US Size</th>
                            <th className="text-left py-3 px-4 font-semibold">Chest</th>
                            <th className="text-left py-3 px-4 font-semibold">Waist</th>
                            <th className="text-left py-3 px-4 font-semibold">Neck</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mensTops.map((row) => (
                            <tr key={row.size} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{row.size}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.us}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.chest}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.neck}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shoes">
                <Card>
                  <CardHeader>
                    <CardTitle>Shoe Size Conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">US</th>
                            <th className="text-left py-3 px-4 font-semibold">UK</th>
                            <th className="text-left py-3 px-4 font-semibold">EU</th>
                            <th className="text-left py-3 px-4 font-semibold">CM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shoes.map((row) => (
                            <tr key={row.us} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{row.us}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.uk}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.eu}</td>
                              <td className="py-3 px-4 text-muted-foreground">{row.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <section className="mt-12 bg-muted/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Still Unsure?</h2>
              <p className="text-muted-foreground mb-4">
                Our customer service team is happy to help you find the right size. 
                You can also enjoy free returns within 30 days if the fit isn't perfect.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact us at <a href="mailto:fit@fashionfynds.com" className="text-[#1BA6A6] hover:underline">fit@fashionfynds.com</a>
              </p>
            </section>
          </div>
        </main>

        <Footer />

        <ShoppingCart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => setCheckoutOpen(true)}
        />
        <WishlistSheet
          open={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          onProductClick={handleProductClick}
        />
        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onProductSelect={handleProductClick}
        />
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
      </div>
  );
}
