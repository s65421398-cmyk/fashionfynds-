"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Users, RefreshCw, ShoppingBag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      } else {
        toast.error("Failed to load customers");
      }
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            Customers
          </h2>
          <p className="text-white/50 mt-1">
            {filteredCustomers.length} registered customers
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchCustomers}
          className="border-white/10 text-white/60 hover:text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="bg-[#12121a] border-white/5">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-14 bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No customers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60">Customer</TableHead>
                    <TableHead className="text-white/60">Email</TableHead>
                    <TableHead className="text-white/60 text-center">Orders</TableHead>
                    <TableHead className="text-white/60 text-right">Total Spent</TableHead>
                    <TableHead className="text-white/60">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="border-white/5 hover:bg-white/5">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                            <span className="text-black font-semibold text-xs">
                              {customer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-white">{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/60">{customer.email}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="border-white/20 text-white/70">
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          {customer.orderCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-white font-medium">
                        ₹{customer.totalSpent.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-white/50 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
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
    </div>
  );
}
