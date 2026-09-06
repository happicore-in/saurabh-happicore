import React, { useState } from 'react';
import { ProjectEnquiry } from '../../services/enquiryService';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Mail,
  Search,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Trash2,
  CheckCircle2,
  X,
  Send,
  User,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

interface ContactEnquiriesManagementProps {
  enquiries: ProjectEnquiry[];
  selectedEnquiry: ProjectEnquiry | null;
  onSelectEnquiry: (enquiry: ProjectEnquiry | null) => void;
  onUpdateStatus: (id: string, status: ProjectEnquiry['status']) => Promise<void>;
  onDeleteEnquiry: (id: string) => Promise<void>;
  showToast: (msg: string) => void;
}

export const ContactEnquiriesManagement: React.FC<ContactEnquiriesManagementProps> = ({
  enquiries,
  selectedEnquiry,
  onSelectEnquiry,
  onUpdateStatus,
  onDeleteEnquiry,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Deletion Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (id: string, newStatus: ProjectEnquiry['status']) => {
    try {
      await onUpdateStatus(id, newStatus);
      showToast(`Enquiry marked as ${newStatus.replace('_', ' ')}.`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update enquiry status.');
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await onDeleteEnquiry(deletingId);
      showToast('Enquiry deleted successfully.');
      if (selectedEnquiry?.id === deletingId) {
        onSelectEnquiry(null);
      }
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete enquiry.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: ProjectEnquiry['status']) => {
    switch (status) {
      case 'NEW':
        return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30 font-bold';
      case 'CONTACTED':
        return 'bg-[#8FB8E8]/10 text-[#8FB8E8] border-[#8FB8E8]/30 font-bold';
      case 'IN_PROGRESS':
        return 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30 font-bold';
      case 'COMPLETED':
        return 'bg-[#A7ADB7]/10 text-[#F2F4F7] border-[#A7ADB7]/30';
      case 'ARCHIVED':
      default:
        return 'bg-[#1C1F26] text-[#6F7682] border-[#2A2E38]';
    }
  };

  const filteredEnquiries = enquiries
    .filter((e) => {
      const matchSearch =
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.projectDetails.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' ? true : e.status === statusFilter;
      const matchType = typeFilter === 'all' ? true : e.projectType === typeFilter;
      return matchSearch && matchStatus && matchType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#22C55E] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            CLIENT COMMUNICATIONS // INBOUND PIPELINE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            CONTACT ENQUIRIES
          </h1>
        </div>

        <div className="font-mono text-xs text-[#A7ADB7] bg-[#0A0C0F] border border-[#22252A] px-3.5 py-2 rounded-lg">
          TOTAL SUBMISSIONS: <strong className="text-[#F2F4F7]">{enquiries.length}</strong>
        </div>
      </div>

      {/* Filters, Search & Sort Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#0A0C0F] border border-[#22252A] p-3 rounded-xl font-mono text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search client name or email..."
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F2F4F7] placeholder:text-[#4A505C] focus:border-[#22C55E] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">STATUS:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#22C55E] focus:outline-none cursor-pointer"
          >
            <option value="all">ALL STATUSES</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">TYPE:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#22C55E] focus:outline-none cursor-pointer"
          >
            <option value="all">ALL PROJECT TYPES</option>
            <option value="Web Development">Web Development</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Design + Code Full Package">Design + Code Full Package</option>
            <option value="Other / General Collaboration">Other / General Collaboration</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#6F7682]" />
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">SORT:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#22C55E] focus:outline-none cursor-pointer"
          >
            <option value="newest">NEWEST SUBMISSION</option>
            <option value="oldest">OLDEST SUBMISSION</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table & Detail Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Enquiries Table (2 Cols or Full when no detail active) */}
        <div
          className={`${
            selectedEnquiry ? 'lg:col-span-2' : 'lg:col-span-3'
          } bg-[#0A0C0F] border border-[#22252A] rounded-xl overflow-hidden`}
        >
          {filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center text-[#6F7682] font-mono text-xs space-y-2">
              <Mail className="w-8 h-8 mx-auto text-[#383E4B]" />
              <p>No enquiries found matching filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#050608] text-[#6F7682] border-b border-[#1C1F26] text-[11px]">
                    <th className="p-3.5 font-normal">NAME & EMAIL</th>
                    <th className="p-3.5 font-normal">PROJECT TYPE</th>
                    <th className="p-3.5 font-normal">TIMELINE</th>
                    <th className="p-3.5 font-normal">BUDGET</th>
                    <th className="p-3.5 font-normal">DATE</th>
                    <th className="p-3.5 font-normal">STATUS</th>
                    <th className="p-3.5 font-normal text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14171E]">
                  {filteredEnquiries.map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    return (
                      <tr
                        key={enq.id}
                        onClick={() => onSelectEnquiry(enq)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected ? 'bg-[#121620]' : 'hover:bg-[#0D1016]'
                        }`}
                      >
                        <td className="p-3.5">
                          <div className="font-medium text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-colors">
                            {enq.name}
                          </div>
                          <div className="text-[10px] text-[#6F7682] font-normal">
                            {enq.email}
                          </div>
                        </td>
                        <td className="p-3.5 text-[#A7ADB7]">
                          <span className="px-2 py-0.5 rounded bg-[#161922] border border-[#22252A] text-[10px]">
                            {enq.projectType}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#A7ADB7] text-[11px]">
                          {enq.timeline || 'Flexible'}
                        </td>
                        <td className="p-3.5 text-[#A7ADB7] text-[11px]">
                          {enq.budget || 'Not specified'}
                        </td>
                        <td className="p-3.5 text-[#6F7682] text-[11px]">
                          {new Date(enq.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded border uppercase ${getStatusBadge(
                              enq.status
                            )}`}
                          >
                            {enq.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectEnquiry(enq);
                            }}
                            className="font-mono text-[11px] text-[#8FB8E8] hover:text-[#A8CCFC] px-2 py-1 rounded bg-[#141822] border border-[#222C3D] transition-colors"
                          >
                            VIEW
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Enquiry Details Drawer / Panel */}
        {selectedEnquiry && (
          <div className="bg-[#0D0F14] border border-[#22252A] rounded-xl p-6 space-y-6 shadow-2xl relative animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[#1C1F26] pb-4">
              <div>
                <div className="font-mono text-[10px] text-[#22C55E] uppercase tracking-wider">
                  ENQUIRY DOSSIER
                </div>
                <h3 className="font-sans font-bold text-lg text-[#F2F4F7] mt-0.5">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => onSelectEnquiry(null)}
                className="text-[#6F7682] hover:text-[#F2F4F7] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                WORKFLOW STATUS
              </label>
              <select
                value={selectedEnquiry.status}
                onChange={(e) =>
                  handleStatusChange(selectedEnquiry.id, e.target.value as any)
                }
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#22C55E] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none cursor-pointer"
              >
                <option value="NEW">NEW (Awaiting review)</option>
                <option value="CONTACTED">CONTACTED (Follow-up sent)</option>
                <option value="IN_PROGRESS">IN PROGRESS (Project active)</option>
                <option value="COMPLETED">COMPLETED (Delivered)</option>
                <option value="ARCHIVED">ARCHIVED (Closed)</option>
              </select>
            </div>

            {/* Client Info Grid */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#050608] border border-[#1A1E26] rounded-lg space-y-1">
                <div className="text-[#6F7682] text-[10px] uppercase">EMAIL ADDRESS</div>
                <div className="text-[#8FB8E8] font-medium break-all select-all flex items-center justify-between">
                  <span>{selectedEnquiry.email}</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Regarding your portfolio enquiry: ${selectedEnquiry.projectType}`}
                    className="px-2 py-0.5 bg-[#8FB8E8]/10 hover:bg-[#8FB8E8]/20 text-[#8FB8E8] rounded border border-[#8FB8E8]/30 flex items-center gap-1 text-[10px]"
                  >
                    <Send className="w-2.5 h-2.5" /> REPLY
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#050608] border border-[#1A1E26] rounded-lg">
                  <div className="text-[#6F7682] text-[10px] uppercase">PROJECT TYPE</div>
                  <div className="text-[#F2F4F7] mt-0.5">{selectedEnquiry.projectType}</div>
                </div>

                <div className="p-2.5 bg-[#050608] border border-[#1A1E26] rounded-lg">
                  <div className="text-[#6F7682] text-[10px] uppercase">TIMELINE</div>
                  <div className="text-[#F2F4F7] mt-0.5">{selectedEnquiry.timeline || 'Flexible'}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#050608] border border-[#1A1E26] rounded-lg">
                  <div className="text-[#6F7682] text-[10px] uppercase">BUDGET</div>
                  <div className="text-[#F2F4F7] mt-0.5">{selectedEnquiry.budget || 'Open to discuss'}</div>
                </div>

                <div className="p-2.5 bg-[#050608] border border-[#1A1E26] rounded-lg">
                  <div className="text-[#6F7682] text-[10px] uppercase">SUBMISSION DATE</div>
                  <div className="text-[#F2F4F7] mt-0.5">
                    {new Date(selectedEnquiry.createdAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>

              {/* Reference Link if provided */}
              {selectedEnquiry.referenceLink && (
                <div className="p-3 bg-[#050608] border border-[#1A1E26] rounded-lg space-y-1">
                  <div className="text-[#6F7682] text-[10px] uppercase">REFERENCE LINK</div>
                  <a
                    href={selectedEnquiry.referenceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F5A623] hover:underline flex items-center gap-1 break-all"
                  >
                    <span>{selectedEnquiry.referenceLink}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                </div>
              )}

              {/* Project Details */}
              <div className="p-3 bg-[#050608] border border-[#1A1E26] rounded-lg space-y-1.5">
                <div className="text-[#6F7682] text-[10px] uppercase">PROJECT DETAILS & SCOPE</div>
                <p className="text-[#F2F4F7] font-sans text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.projectDetails}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1C1F26]">
              <button
                type="button"
                onClick={() => setDeletingId(selectedEnquiry.id)}
                className="px-3 py-1.5 bg-[#2D1212] hover:bg-[#3D1818] text-[#FF6B6B] font-mono text-xs rounded border border-[#501D1D] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> DELETE ENQUIRY
              </button>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: ${selectedEnquiry.projectType}`}
                className="px-4 py-2 bg-[#22C55E] hover:bg-[#2EDB6E] text-[#000000] font-mono text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> SEND REPLY
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="DELETE THIS ENQUIRY?"
        message="This will permanently delete this client submission from your database."
        itemName={enquiries.find((e) => e.id === deletingId)?.name}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
