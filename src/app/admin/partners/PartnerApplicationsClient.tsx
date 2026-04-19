"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

type PartnerApp = {
  id: number;
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string | null;
  category: string;
  description: string;
  instagram: string | null;
  productsCount: string;
  established: string;
  status: string;
  createdAt: Date | string;
};

export default function PartnerApplicationsClient({
  initialApplications,
}: {
  initialApplications: PartnerApp[];
}) {
  const [applications, setApplications] = useState(initialApplications);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-[#12121a] rounded-xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-white/40">
                  No partner applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-white">{app.brandName}</div>
                    <div className="text-sm text-white/40 mt-1">
                      {app.website ? (
                        <a href={app.website} target="_blank" rel="noreferrer" className="hover:text-amber-400">Website</a>
                      ) : (
                        'No Website'
                      )}
                      {" • "}
                      {app.instagram ? (
                        <a href={`https://instagram.com/${app.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-amber-400">IG: {app.instagram}</a>
                      ) : (
                        'No IG'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm text-white/80">{app.contactName}</div>
                    <div className="text-sm text-white/40">{app.email}</div>
                    <div className="text-sm text-white/40">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {app.category}
                    </span>
                    <div className="text-xs text-white/40 mt-2">
                      Est: {app.established} <br />
                      Items: {app.productsCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      app.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60 align-top">
                    {format(new Date(app.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right align-top">
                    <div className="flex flex-col items-end gap-2">
                      <select
                        className="bg-[#1a1a24] border border-white/10 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 disabled:opacity-50"
                        value={app.status}
                        disabled={updatingId === app.id}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {updatingId === app.id && <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
