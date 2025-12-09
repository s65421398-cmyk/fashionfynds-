"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockItems: number;
  pendingOrders: number;
  recentOrders: Array<{
    id: number;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
    shippingName: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch("/api/products?limit=100"),
          fetch("/api/admin/orders"),
        ]);

        const products = await productsRes.json();
        const orders = await ordersRes.json();

        const totalRevenue = orders.reduce(
          (sum: number, order: { total: number }) => sum + order.total,
          0
        );
        const lowStock = products.filter(
          (p: { inStock: boolean }) => !p.inStock
        ).length;
        const pending = orders.filter(
          (o: { status: string }) => o.status === "pending"
        ).length;

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue,
          lowStockItems: lowStock,
          pendingOrders: pending,
          recentOrders: orders.slice(0, 5),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      change: "+12%",
      trend: "up",
      href: "/admin/inventory",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      change: "+8%",
      trend: "up",
      href: "/admin/orders",
    },
    {
      title: "Revenue",
      value: `$${(stats?.totalRevenue || 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      change: "+23%",
      trend: "up",
      href: "/admin/analytics",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: Users,
      change: stats?.pendingOrders ? `${stats.pendingOrders} need action` : "All clear",
      trend: stats?.pendingOrders ? "down" : "up",
      href: "/admin/orders?status=pending",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-[#12121a] border-white/5">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-white/10 rounded w-24" />
                  <div className="h-8 bg-white/10 rounded w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="bg-[#12121a] border-white/5 hover:border-amber-500/30 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-amber-400" />
                      )}
                      <span
                        className={`text-xs ${
                          stat.trend === "up"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-[#12121a] border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Orders</CardTitle>
            <Link
              href="/admin/orders"
              className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-white/50">
                        {order.shippingName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${order.total.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : order.status === "shipped"
                            ? "bg-blue-500/20 text-blue-400"
                            : order.status === "processing"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/50 py-8">No orders yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#12121a] border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Low Stock Alert</CardTitle>
            <Link
              href="/admin/inventory?filter=low-stock"
              className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.lowStockItems && stats.lowStockItems > 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats.lowStockItems}
                </p>
                <p className="text-white/50 mt-1">
                  items marked as out of stock
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-lg font-medium text-white">
                  All products in stock
                </p>
                <p className="text-white/50 mt-1">Inventory looking good!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
