"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, ShoppingBag, Users, DollarSign, Package, Eye, ArrowUp, ArrowDown } from "lucide-react";

interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: { date: string; count: number; revenue: number }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const stats = data
    ? [
        {
          label: "Total Revenue",
          value: `₹${data.totalRevenue.toLocaleString("en-IN")}`,
          icon: DollarSign,
          color: "text-emerald-400",
          bg: "bg-emerald-500/10",
        },
        {
          label: "Total Orders",
          value: data.totalOrders.toString(),
          icon: ShoppingBag,
          color: "text-blue-400",
          bg: "bg-blue-500/10",
        },
        {
          label: "Customers",
          value: data.totalCustomers.toString(),
          icon: Users,
          color: "text-purple-400",
          bg: "bg-purple-500/10",
        },
        {
          label: "Products",
          value: data.totalProducts.toString(),
          icon: Package,
          color: "text-amber-400",
          bg: "bg-amber-500/10",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-amber-400" />
          Analytics
        </h2>
        <p className="text-white/50 mt-1">Overview of your store performance</p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-[#12121a] rounded-xl animate-pulse border border-white/5" />
          ))}
        </div>
      ) : data ? (
        <>
          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="bg-[#12121a] border-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bg}`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          {data.recentOrders.length > 0 && (
            <Card className="bg-[#12121a] border-white/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Recent Daily Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentOrders.map((day, i) => (
                    <div
                      key={day.date}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                    >
                      <span className="text-white/70 text-sm">{day.date}</span>
                      <div className="flex items-center gap-6">
                        <span className="text-white/50 text-sm">
                          {day.count} order{day.count !== 1 ? "s" : ""}
                        </span>
                        <span className="text-white font-medium">
                          ₹{day.revenue.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Banner */}
          <Card className="bg-[#12121a] border-white/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Advanced Analytics</h3>
                  <p className="text-white/50 text-sm">
                    For detailed traffic analytics, conversion funnels, and user behavior tracking,
                    connect Google Analytics by adding your <code className="text-amber-400">NEXT_PUBLIC_GA4_ID</code> to
                    the environment variables.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">Failed to load analytics</p>
        </div>
      )}
    </div>
  );
}
