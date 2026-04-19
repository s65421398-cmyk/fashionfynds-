"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  brandId: number | null;
  categoryId: number | null;
  price: number;
  originalPrice: number | null;
  description: string | null;
  image: string;
  sizes: string[] | null;
  colors: string[] | null;
  inStock: boolean;
  featured: boolean;
  deal: boolean;
  dealDiscount: number | null;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    image: "",
    categoryId: "",
    brandId: "",
    sizes: "",
    colors: "",
    inStock: true,
    featured: false,
    deal: false,
    dealDiscount: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, catRes, brandRes] = await Promise.all([
          fetch(`/api/products?id=${id}`),
          fetch("/api/categories"),
          fetch("/api/brands"),
        ]);

        if (!productRes.ok) {
          toast.error("Product not found");
          router.push("/admin/inventory");
          return;
        }

        const product: Product = await productRes.json();
        setCategories(await catRes.json());
        setBrands(await brandRes.json());

        setFormData({
          name: product.name,
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() || "",
          description: product.description || "",
          image: product.image,
          categoryId: product.categoryId?.toString() || "",
          brandId: product.brandId?.toString() || "",
          sizes: product.sizes?.join(", ") || "",
          colors: product.colors?.join(", ") || "",
          inStock: product.inStock,
          featured: product.featured,
          deal: product.deal,
          dealDiscount: product.dealDiscount?.toString() || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load product");
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : null,
        description: formData.description || null,
        image: formData.image,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        brandId: formData.brandId ? parseInt(formData.brandId) : null,
        sizes: formData.sizes
          ? formData.sizes.split(",").map((s) => s.trim())
          : null,
        colors: formData.colors
          ? formData.colors.split(",").map((c) => c.trim())
          : null,
        inStock: formData.inStock,
        featured: formData.featured,
        deal: formData.deal,
        dealDiscount: formData.dealDiscount
          ? parseInt(formData.dealDiscount)
          : null,
      };

      const res = await fetch(`/api/products?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Product updated successfully");
        router.push("/admin/inventory");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#12121a] border-white/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-white/5 rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/inventory">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Product</h2>
          <p className="text-white/50 mt-1">Update product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#12121a] border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white/70">Product Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <Label className="text-white/70">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1 bg-white/5 border-white/10 text-white min-h-[120px]"
                    placeholder="Enter product description"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-white/70">Category</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, categoryId: v })
                      }
                    >
                      <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a24] border-white/10">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white/70">Brand</Label>
                    <Select
                      value={formData.brandId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, brandId: v })
                      }
                    >
                      <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a24] border-white/10">
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id.toString()}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#12121a] border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-white/70">Price *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="mt-1 bg-white/5 border-white/10 text-white"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Original Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: e.target.value,
                        })
                      }
                      className="mt-1 bg-white/5 border-white/10 text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#12121a] border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white/70">
                    Sizes (comma-separated)
                  </Label>
                  <Input
                    value={formData.sizes}
                    onChange={(e) =>
                      setFormData({ ...formData, sizes: e.target.value })
                    }
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    placeholder="S, M, L, XL"
                  />
                </div>
                <div>
                  <Label className="text-white/70">
                    Colors (comma-separated)
                  </Label>
                  <Input
                    value={formData.colors}
                    onChange={(e) =>
                      setFormData({ ...formData, colors: e.target.value })
                    }
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    placeholder="Black, White, Navy"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-[#12121a] border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white/70">Image URL *</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    placeholder="https://..."
                    required
                  />
                </div>
                {formData.image && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#12121a] border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white/70">In Stock</Label>
                  <Switch
                    checked={formData.inStock}
                    onCheckedChange={(v) =>
                      setFormData({ ...formData, inStock: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white/70">Featured</Label>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(v) =>
                      setFormData({ ...formData, featured: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white/70">On Deal</Label>
                  <Switch
                    checked={formData.deal}
                    onCheckedChange={(v) =>
                      setFormData({ ...formData, deal: v })
                    }
                  />
                </div>
                {formData.deal && (
                  <div>
                    <Label className="text-white/70">Deal Discount %</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.dealDiscount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dealDiscount: e.target.value,
                        })
                      }
                      className="mt-1 bg-white/5 border-white/10 text-white"
                      placeholder="20"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Product
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
