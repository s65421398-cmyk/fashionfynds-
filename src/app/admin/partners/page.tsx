"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Filter,
  RefreshCw,
  Eye,
  Handshake,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Instagram,
  Calendar,
  Package,
} from "lucide-react";

interface PartnerApplication {
  id: number;
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string | null;
  category: string;
  description: string;
  instagram: string | null;
  productsCount: string | null;
  established: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPartnersPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/partners");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      } else {
        toast.error("Failed to load partner applications");
      }
    } catch {
      toast.error("Failed to load partner applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (
    id: number,
    newStatus: string,
    notes?: string
  ) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes: notes }),
      });

      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? updated : a))
        );
        toast.success(`Application ${newStatus} successfully`);
        setSelectedApp(null);
      } else {
        toast.error("Failed to update application");
      }
    } catch {
      toast.error("Failed to update application");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-amber-500/50 text-amber-400"
          >
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500/50 text-emerald-400"
          >
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="border-red-500/50 text-red-400"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Handshake className="w-6 h-6 text-amber-400" />
            Partner Applications
          </h2>
          <p className="text-white/50 mt-1">
            {filteredApplications.length} applications
            {pendingCount > 0 && (
              <span className="text-amber-400 ml-2">
                ({pendingCount} pending review)
              </span>
            )}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchApplications}
          className="border-white/10 text-white/60 hover:text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="bg-[#12121a] border-white/5">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search by brand, contact, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a24] border-white/10">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
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
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <Handshake className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60">Brand</TableHead>
                    <TableHead className="text-white/60">Contact</TableHead>
                    <TableHead className="text-white/60">Category</TableHead>
                    <TableHead className="text-white/60 text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-white/60">Date</TableHead>
                    <TableHead className="text-white/60 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow
                      key={app.id}
                      className="border-white/5 hover:bg-white/5"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-white">
                            {app.brandName}
                          </p>
                          <p className="text-xs text-white/40">
                            ID: {app.id}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white/80">{app.contactName}</p>
                          <p className="text-xs text-white/40">{app.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {app.category}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(app.status)}
                      </TableCell>
                      <TableCell className="text-white/50 text-sm">
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/60 hover:text-white"
                          onClick={() => {
                            setSelectedApp(app);
                            setAdminNotes(app.adminNotes || "");
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={selectedApp !== null}
        onOpenChange={() => setSelectedApp(null)}
      >
        <DialogContent className="bg-[#12121a] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Handshake className="w-5 h-5 text-amber-400" />
              {selectedApp?.brandName}
            </DialogTitle>
          </DialogHeader>

          {selectedApp && (
            <div className="space-y-6 mt-2">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-sm">Current Status:</span>
                {getStatusBadge(selectedApp.status)}
              </div>

              {/* Brand Info */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">
                    Brand Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Package className="w-4 h-4 text-white/40" />
                    <span>
                      <strong>Category:</strong> {selectedApp.category}
                    </span>
                  </div>
                  {selectedApp.established && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Calendar className="w-4 h-4 text-white/40" />
                      <span>
                        <strong>Established:</strong> {selectedApp.established}
                      </span>
                    </div>
                  )}
                  {selectedApp.productsCount && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Package className="w-4 h-4 text-white/40" />
                      <span>
                        <strong>Products:</strong> {selectedApp.productsCount}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Mail className="w-4 h-4 text-white/40" />
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {selectedApp.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Phone className="w-4 h-4 text-white/40" />
                    <span>{selectedApp.phone}</span>
                  </div>
                  {selectedApp.website && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Globe className="w-4 h-4 text-white/40" />
                      <a
                        href={selectedApp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-400 transition-colors flex items-center gap-1"
                      >
                        {selectedApp.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  {selectedApp.instagram && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Instagram className="w-4 h-4 text-white/40" />
                      <span>{selectedApp.instagram}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">
                    Brand Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm whitespace-pre-line leading-relaxed">
                    {selectedApp.description}
                  </p>
                </CardContent>
              </Card>

              {/* Admin Notes */}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-2">
                  Admin Notes
                </label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="bg-white/5 border-white/10 text-white min-h-[80px]"
                  placeholder="Add internal notes about this application..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                {selectedApp.status !== "rejected" && (
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    disabled={updating}
                    onClick={() =>
                      handleStatusUpdate(
                        selectedApp.id,
                        "rejected",
                        adminNotes
                      )
                    }
                  >
                    Reject
                  </Button>
                )}
                {selectedApp.status !== "approved" && (
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={updating}
                    onClick={() =>
                      handleStatusUpdate(
                        selectedApp.id,
                        "approved",
                        adminNotes
                      )
                    }
                  >
                    Approve
                  </Button>
                )}
                {selectedApp.status !== "pending" && (
                  <Button
                    variant="outline"
                    className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                    disabled={updating}
                    onClick={() =>
                      handleStatusUpdate(
                        selectedApp.id,
                        "pending",
                        adminNotes
                      )
                    }
                  >
                    Reset to Pending
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
