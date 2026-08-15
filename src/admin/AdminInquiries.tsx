import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { InquiryRecord } from '../types';
import {
  Inbox,
  Search,
  Phone,
  Calendar,
  Users,
  CheckCircle2,
  X,
  Trash2,
  Download,
  Clock,
  FileText,
  AlertCircle,
  Eye,
  Check,
} from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const { inquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenDetails = (inq: InquiryRecord) => {
    setSelectedInquiry(inq);
    setAdminNotesInput(inq.adminNotes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryNotes(selectedInquiry.id, adminNotesInput);
    setSelectedInquiry({
      ...selectedInquiry,
      adminNotes: adminNotesInput,
    });
    showNotice('Internal staff note saved.');
  };

  const handleStatusChange = (id: string, newStatus: InquiryRecord['status']) => {
    updateInquiryStatus(id, newStatus);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    showNotice(`Inquiry marked as ${newStatus}.`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete inquiry record for "${name}"?`)) {
      deleteInquiry(id);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      showNotice(`Inquiry for "${name}" removed.`);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Full Name', 'Phone', 'Visit Date', 'Guest Count', 'Preferred Section', 'Occasion', 'Status', 'Special Notes', 'Admin Notes', 'Created At'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.fullName.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      i.visitDate,
      i.guestCount,
      `"${i.preferredSection}"`,
      `"${i.occasion}"`,
      i.status,
      `"${(i.specialNotes || '').replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`,
      i.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `buglay_rock_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('CSV export generated successfully.');
  };

  // Filtering
  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.specialNotes || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: InquiryRecord['status']) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Booking Inquiries & CRM</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border">
              {inquiries.length} Total Records
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Track and manage guest reservation requests submitted via the website booking form in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white hover:bg-gray-50 border border-[#8c8f94] text-xs font-semibold text-gray-700 rounded shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, or notes..."
            className="w-full text-xs pl-8 pr-3 py-2 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['all', 'new', 'contacted', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors ${
                selectedStatus === st
                  ? 'bg-[#2271b1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st} {st === 'new' && inquiries.filter((i) => i.status === 'new').length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#d63638] text-white text-[10px]">
                  {inquiries.filter((i) => i.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#c3c4c7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#2c3338] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Guest Info</th>
                <th className="py-3 px-4">Date & Pax</th>
                <th className="py-3 px-4">Section & Occasion</th>
                <th className="py-3 px-4">Special Requests</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                    No booking inquiries found matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#fcfcfc] transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-[#1d2327]">
                        {inq.fullName}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`tel:${inq.phone}`}
                          className="font-mono text-xs text-[#2271b1] hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </a>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{inq.visitDate || 'Flexible'}</span>
                      </div>
                      <div className="text-gray-500 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span>{inq.guestCount} Guests</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[180px]">
                      <div className="font-medium text-gray-800 truncate">
                        {inq.preferredSection}
                      </div>
                      <div className="text-gray-500 text-[11px] truncate mt-0.5 italic">
                        {inq.occasion}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        {inq.specialNotes || '— No notes provided —'}
                      </p>
                      {inq.adminNotes && (
                        <div className="mt-1 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Staff Note: {inq.adminNotes}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                        className={`text-xs px-2.5 py-1 rounded border font-semibold outline-none cursor-pointer ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetails(inq)}
                          className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#2271b1] font-medium flex items-center gap-1"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id, inq.fullName)}
                          className="p-1 rounded hover:bg-red-50 text-[#d63638]"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Staff Notes Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-xl w-full border border-[#c3c4c7] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1d2327] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">
                  Inquiry: {selectedInquiry.fullName}
                </h3>
                <span className="text-xs text-gray-400 font-mono">ID: {selectedInquiry.id}</span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {/* Quick Contact & Date Bar */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[11px] text-gray-400 uppercase block font-bold">Phone Number</span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="font-mono font-bold text-sm text-[#2271b1] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 uppercase block font-bold">Visit Date</span>
                  <span className="font-bold text-sm text-gray-800 block mt-0.5">
                    {selectedInquiry.visitDate || 'Flexible'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 uppercase block font-bold">Guest Count</span>
                  <span className="font-bold text-sm text-gray-800 block mt-0.5">
                    {selectedInquiry.guestCount} People
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 uppercase block font-bold">Current Status</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                    className="mt-0.5 text-xs px-2 py-1 bg-white border border-gray-300 rounded font-semibold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Section & Occasion */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white border rounded">
                  <span className="text-gray-400 text-[11px] font-bold uppercase block mb-1">Preferred Section</span>
                  <p className="font-semibold text-gray-800 text-sm">{selectedInquiry.preferredSection}</p>
                </div>

                <div className="p-3 bg-white border rounded">
                  <span className="text-gray-400 text-[11px] font-bold uppercase block mb-1">Occasion / Event</span>
                  <p className="font-semibold text-gray-800 text-sm">{selectedInquiry.occasion}</p>
                </div>
              </div>

              {/* Guest Notes */}
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded">
                <span className="text-amber-900 text-[11px] font-bold uppercase block mb-1">
                  Customer's Special Notes / Dietary Requests
                </span>
                <p className="text-gray-800 text-xs leading-relaxed">
                  {selectedInquiry.specialNotes || 'No special requirements specified by guest.'}
                </p>
              </div>

              {/* Staff Notes Box */}
              <div className="p-4 bg-white border border-gray-300 rounded-lg space-y-2">
                <label className="block text-xs font-bold text-[#1d2327]">
                  Internal Management / Kitchen Notes:
                </label>
                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="e.g. Spoke to guest, assigned table 4 in garden lawn, 4 chicken sekuwa platters ordered..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow-sm"
                >
                  Save Internal Note
                </button>
              </div>

              <div className="pt-3 border-t flex items-center justify-between">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="px-4 py-2 bg-[#00a32a] hover:bg-[#008a20] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedInquiry.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
