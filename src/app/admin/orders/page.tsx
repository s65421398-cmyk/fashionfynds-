"use client";

import { useEffect, useState, Suspense } from "react";
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
  Search,
  Eye,
  Package,
  Filter,
  RefreshCw,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Smartphone,
} from "lucide-react";

interface Order {
  id: number;
  orderNumber: string;
  userId: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  paymentMethod: string;
  paymentScreenshot?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  selectedSize: string;
  selectedColor: string;
}

interface OrderWithItems extends Order {
  items: OrderItem[];
  paymentScreenshot?: string | null;
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearch = () => {
    fetchOrders();
  };

  const viewOrderDetails = async (orderId: number) => {
    setDetailsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`);
      const data = await res.json();
      setSelectedOrder(data);
    } catch (error) {
      toast.error("Failed to load order details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const res = await fetch(`/api/admin/orders?id=${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        toast.success(`Order status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "pending_verification":
        return <Smartphone className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "pending_verification":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "delivered":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Management</h2>
          <p className="text-white/50 mt-1">{orders.length} orders total</p>
        </div>
      </div>

      <Card className="bg-[#12121a] border-white/5">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search by order #, name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a24] border-white/10">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="pending_verification">Awaiting Verification</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={fetchOrders}
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
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60">Order</TableHead>
                    <TableHead className="text-white/60">Customer</TableHead>
                    <TableHead className="text-white/60">Date</TableHead>
                    <TableHead className="text-white/60 text-right">
                      Total
                    </TableHead>
                    <TableHead className="text-white/60 text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-white/60 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-white/5 hover:bg-white/5"
                    >
                      <TableCell>
                        <p className="font-medium text-white">
                          {order.orderNumber}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white">{order.shippingName}</p>
                          <p className="text-xs text-white/50">
                            {order.shippingEmail}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {formatDate(order.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-white font-medium">
                          ${order.total.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">
                              {order.status === "pending_verification" ? "Verify UPI" : order.status}
                            </span>
                          </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/60 hover:text-white"
                            onClick={() => viewOrderDetails(order.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Select
                            value={order.status}
                            onValueChange={(v) =>
                              updateOrderStatus(order.id, v)
                            }
                            disabled={updatingStatus === order.id}
                          >
                            <SelectTrigger className="w-[130px] h-8 bg-white/5 border-white/10 text-white text-xs">
                              {updatingStatus === order.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <SelectValue />
                              )}
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a24] border-white/10">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="pending_verification">Awaiting Verification</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                          </Select>
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
        open={selectedOrder !== null}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="bg-[#12121a] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              Order {selectedOrder?.orderNumber}
            </DialogTitle>
          </DialogHeader>

          {detailsLoading ? (
            <div className="py-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-400" />
            </div>
          ) : selectedOrder ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(selectedOrder.status)}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1 capitalize">
                      {selectedOrder.status === "pending_verification" ? "Verify UPI" : selectedOrder.status}
                    </span>
                  </Badge>
                <span className="text-sm text-white/50">
                  {formatDate(selectedOrder.createdAt)}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="text-sm font-medium text-white/60 mb-2">
                    Customer
                  </h4>
                  <p className="text-white">{selectedOrder.shippingName}</p>
                  <p className="text-sm text-white/70">
                    {selectedOrder.shippingEmail}
                  </p>
                  <p className="text-sm text-white/70">
                    {selectedOrder.shippingPhone}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="text-sm font-medium text-white/60 mb-2">
                    Shipping Address
                  </h4>
                  <p className="text-sm text-white/70">
                    {selectedOrder.shippingAddress}
                  </p>
                  <p className="text-sm text-white/70">
                    {selectedOrder.shippingCity}, {selectedOrder.shippingState}{" "}
                    {selectedOrder.shippingZip}
                  </p>
                  <p className="text-sm text-white/70">
                    {selectedOrder.shippingCountry}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/60 mb-3">
                  Order Items
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/5"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover bg-white/10"
                      />
                      <div className="flex-1">
                        <p className="text-white">{item.productName}</p>
                        <p className="text-xs text-white/50">
                          {item.selectedSize} / {item.selectedColor} x{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="text-white font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Payment</span>
                      <span className="text-white font-mono text-xs">
                        {selectedOrder.paymentMethod.startsWith("upi_manual")
                          ? "UPI Manual"
                          : selectedOrder.paymentMethod}
                      </span>
                    </div>

                    {/* Payment screenshot */}
                    {selectedOrder.paymentScreenshot && (
                      <div className="mt-2">
                        <p className="text-xs text-white/60 mb-2">Payment Screenshot</p>
                        <img
                          src={selectedOrder.paymentScreenshot}
                          alt="Payment screenshot"
                          className="w-full max-h-64 object-contain rounded-lg border border-white/10 bg-white/5 cursor-pointer"
                          onClick={() => window.open(selectedOrder.paymentScreenshot!, "_blank")}
                        />
                        <p className="text-xs text-white/40 mt-1">Click to view full size</p>
                      </div>
                    )}

                    {/* WhatsApp confirm button */}
                    {selectedOrder.paymentMethod.startsWith("upi_manual") && (
                      <a
                        href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hi ${selectedOrder.shippingName}! 🎉 Your order ${selectedOrder.orderNumber} has been confirmed. Amount: ₹${selectedOrder.total.toFixed(0)}. We will ship your items soon and share the tracking details. Thank you for shopping with FashionFynds! 🛍️`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full mt-3 bg-green-600 hover:bg-green-500 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Confirm Order on WhatsApp
                      </a>
                    )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">
                    ${selectedOrder.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">
                    ${selectedOrder.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Tax</span>
                  <span className="text-white">
                    ${selectedOrder.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          <Card className="bg-[#12121a] border-white/5">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-white/5 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
