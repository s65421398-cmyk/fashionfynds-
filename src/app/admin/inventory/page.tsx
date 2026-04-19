"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Filter,
  RefreshCw,
} from "lucide-react";

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
  inStock: boolean;
  featured: boolean;
  deal: boolean;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

function InventoryContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState(
    searchParams.get("filter") === "low-stock" ? "out" : "all"
  );
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        fetch("/api/products?limit=100"),
        fetch("/api/categories"),
        fetch("/api/brands"),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      product.categoryId === parseInt(categoryFilter);

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in" && product.inStock) ||
      (stockFilter === "out" && !product.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleToggleStock = async (product: Product) => {
    try {
      const res = await fetch(`/api/products?id=${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: !product.inStock }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, inStock: !p.inStock } : p
          )
        );
        toast.success(
          `Product marked as ${!product.inStock ? "in stock" : "out of stock"}`
        );
      } else {
        toast.error("Failed to update stock status");
      }
    } catch (error) {
      toast.error("Failed to update stock status");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
        setDeleteConfirm(null);
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const getCategoryName = (id: number | null) =>
    categories.find((c) => c.id === id)?.name || "—";

  const getBrandName = (id: number | null) =>
    brands.find((b) => b.id === id)?.name || "—";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
          <p className="text-white/50 mt-1">
            {filteredProducts.length} products total
          </p>
        </div>
        <Link href="/admin/inventory/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="bg-[#12121a] border-white/5">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a24] border-white/10">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
                  <Package className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a24] border-white/10">
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="in">In Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={fetchData}
                className="border-white/10 text-white/60 hover:text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-white/5 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60">Product</TableHead>
                    <TableHead className="text-white/60">Category</TableHead>
                    <TableHead className="text-white/60">Brand</TableHead>
                    <TableHead className="text-white/60 text-right">
                      Price
                    </TableHead>
                    <TableHead className="text-white/60 text-center">
                      Stock
                    </TableHead>
                    <TableHead className="text-white/60 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      className="border-white/5 hover:bg-white/5"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-white/10"
                          />
                          <div>
                            <p className="font-medium text-white">
                              {product.name}
                            </p>
                            <p className="text-xs text-white/40">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {getCategoryName(product.categoryId)}
                      </TableCell>
                      <TableCell className="text-white/70">
                        {getBrandName(product.brandId)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-white font-medium">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-white/40 text-sm line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`cursor-pointer ${
                            product.inStock
                              ? "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                              : "border-red-500/50 text-red-400 hover:bg-red-500/10"
                          }`}
                          onClick={() => handleToggleStock(product)}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/inventory/${product.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white/60 hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => setDeleteConfirm(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="bg-[#12121a] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-white/70">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="border-white/10 text-white/70"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={
        <div className="space-y-6">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          <Card className="bg-[#12121a] border-white/5">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    }>
      <InventoryContent />
    </Suspense>
  );
}
