import React, { useState } from 'react';
import { AdminTestimonial } from '../../types/admin';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Quote,
  ShieldCheck,
  CheckCircle2,
  X,
  MessageSquare,
} from 'lucide-react';

interface TestimonialsManagementProps {
  testimonials: AdminTestimonial[];
  onSave: (testimonial: AdminTestimonial) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  showToast: (msg: string) => void;
}

export const TestimonialsManagement: React.FC<TestimonialsManagementProps> = ({
  testimonials,
  onSave,
  onDelete,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Modal Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminTestimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formSlotLabel, setFormSlotLabel] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formOrganization, setFormOrganization] = useState('');
  const [formVerified, setFormVerified] = useState(true);
  const [formIsPublic, setFormIsPublic] = useState(true);
  const [formOrder, setFormOrder] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormSlotLabel(`SLOT 0${testimonials.length + 1}`);
    setFormQuote('');
    setFormName('');
    setFormRole('');
    setFormOrganization('');
    setFormVerified(true);
    setFormIsPublic(true);
    setFormOrder(testimonials.length + 1);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (t: AdminTestimonial) => {
    setEditingItem(t);
    setFormSlotLabel(t.slotLabel || `SLOT 0${t.order || 1}`);
    setFormQuote(t.quote || '');
    setFormName(t.name || '');
    setFormRole(t.role || '');
    setFormOrganization(t.organization || '');
    setFormVerified(t.verified !== false);
    setFormIsPublic(t.isPublic !== false);
    setFormOrder(t.order || 1);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuote.trim()) {
      setFormError('Testimonial quote text is required.');
      return;
    }
    if (!formName.trim()) {
      setFormError('Name / client title is required.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const id = editingItem ? editingItem.id : `testimonial-${Date.now()}`;
      const payload: AdminTestimonial = {
        id,
        slotLabel: formSlotLabel.trim() || undefined,
        quote: formQuote.trim(),
        name: formName.trim(),
        role: formRole.trim(),
        organization: formOrganization.trim(),
        verified: formVerified,
        isPublic: formIsPublic,
        order: Number(formOrder) || 1,
      };

      await onSave(payload);
      showToast(editingItem ? 'Testimonial updated successfully' : 'New testimonial added');
      setIsFormOpen(false);
    } catch (err: any) {
      console.error('Failed to save testimonial:', err);
      setFormError(err.message || 'Failed to save testimonial. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await onDelete(deletingId);
      showToast('Testimonial removed successfully');
      setDeletingId(null);
    } catch (err: any) {
      console.error('Failed to delete testimonial:', err);
      showToast('Error deleting testimonial');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = testimonials.filter((t) => {
    const q = searchTerm.toLowerCase();
    return (
      (t.name || '').toLowerCase().includes(q) ||
      (t.quote || '').toLowerCase().includes(q) ||
      (t.organization || '').toLowerCase().includes(q) ||
      (t.role || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080808] border border-[#22252A] p-6 rounded-[8px]">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#8FB8E8]" />
            <span className="font-mono text-[10px] text-[#8FB8E8] uppercase tracking-[0.16em]">
              CLIENT & COLLABORATOR FEEDBACK
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#F2F4F7] uppercase tracking-tight mt-1">
            TESTIMONIALS MANAGEMENT
          </h2>
          <p className="font-body text-xs text-[#A7ADB7] mt-1">
            Curate quotes from directors, event leads, and founders displayed on the homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#8FB8E8] hover:bg-[#A3C8F2] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD TESTIMONIAL</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6F7682] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter testimonials by quote text, name, or organization..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#080808] border border-[#22252A] rounded-[6px] font-mono text-xs text-[#F2F4F7] placeholder-[#6F7682] focus:outline-none focus:border-[#8FB8E8]"
        />
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`p-5 bg-[#080808] border ${
              t.isPublic ? 'border-[#22252A]' : 'border-amber-900/40 opacity-75'
            } rounded-[8px] flex flex-col justify-between space-y-4 hover:border-[#383E4A] transition-colors`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#8FB8E8] uppercase tracking-[0.14em]">
                  {t.slotLabel || `SLOT ${t.order || 1}`}
                </span>
                <div className="flex items-center gap-2">
                  {t.verified && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#55B378] bg-[#55B378]/10 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      VERIFIED
                    </span>
                  )}
                  {!t.isPublic && (
                    <span className="font-mono text-[9px] text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded">
                      HIDDEN
                    </span>
                  )}
                </div>
              </div>

              <div className="relative pl-3 border-l-2 border-[#22252A]">
                <p className="font-body text-xs text-[#F2F4F7] italic line-clamp-4 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-1">
                <div className="font-heading font-bold text-sm text-[#F2F4F7]">{t.name}</div>
                {(t.role || t.organization) && (
                  <div className="font-mono text-[10px] text-[#A7ADB7]">
                    {t.role}
                    {t.role && t.organization ? ' • ' : ''}
                    {t.organization}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#17191D] flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#6F7682]">ORDER: {t.order || 1}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(t)}
                  className="p-1.5 text-[#A7ADB7] hover:text-[#8FB8E8] hover:bg-[#141414] rounded transition-colors cursor-pointer"
                  title="Edit Testimonial"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingId(t.id)}
                  className="p-1.5 text-[#A7ADB7] hover:text-[#FF5252] hover:bg-[#141414] rounded transition-colors cursor-pointer"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-[#080808] border border-[#22252A] rounded-[8px] space-y-3">
          <Quote className="w-8 h-8 text-[#6F7682] mx-auto" />
          <p className="font-mono text-xs text-[#A7ADB7]">No testimonials found.</p>
        </div>
      )}

      {/* Edit / Create Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0A0A0A] border border-[#22252A] rounded-[8px] p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#17191D]">
              <h3 className="font-heading font-extrabold text-lg text-[#F2F4F7] uppercase tracking-tight">
                {editingItem ? 'EDIT TESTIMONIAL' : 'ADD NEW TESTIMONIAL'}
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-[#A7ADB7] hover:text-[#F2F4F7] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-red-400 font-mono text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[10px] text-[#A7ADB7] uppercase tracking-wider block mb-1">
                  Slot Label (optional)
                </label>
                <input
                  type="text"
                  value={formSlotLabel}
                  onChange={(e) => setFormSlotLabel(e.target.value)}
                  placeholder="e.g. SLOT 01 or FESTIVAL FEEDBACK"
                  className="w-full px-3 py-2 bg-[#000000] border border-[#22252A] rounded text-[#F2F4F7] focus:outline-none focus:border-[#8FB8E8]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#A7ADB7] uppercase tracking-wider block mb-1">
                  Quote Text *
                </label>
                <textarea
                  rows={4}
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="Client words and feedback..."
                  className="w-full px-3 py-2 bg-[#000000] border border-[#22252A] rounded text-[#F2F4F7] focus:outline-none focus:border-[#8FB8E8]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#A7ADB7] uppercase tracking-wider block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Event Lead"
                    className="w-full px-3 py-2 bg-[#000000] border border-[#22252A] rounded text-[#F2F4F7] focus:outline-none focus:border-[#8FB8E8]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#A7ADB7] uppercase tracking-wider block mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Festival Producer"
                    className="w-full px-3 py-2 bg-[#000000] border border-[#22252A] rounded text-[#F2F4F7] focus:outline-none focus:border-[#8FB8E8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#A7ADB7] uppercase tracking-wider block mb-1">
                  Organization / Agency
                </label>
                <input
                  type="text"
                  value={formOrganization}
                  onChange={(e) => setFormOrganization(e.target.value)}
                  placeholder="e.g. Cultural Festival Organization"
                  className="w-full px-3 py-2 bg-[#000000] border border-[#22252A] rounded text-[#F2F4F7] focus:outline-none focus:border-[#8FB8E8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] text-[#A7ADB7] uppercase tracking-wider block mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-[#000000] border border-[#22252A] rounded text-[#F2F4F7] focus:outline-none focus:border-[#8FB8E8]"
                    min={1}
                  />
                </div>

                <div className="flex flex-col justify-end space-y-2 pt-2 sm:pt-0">
                  <label className="inline-flex items-center gap-2 text-[#F2F4F7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formVerified}
                      onChange={(e) => setFormVerified(e.target.checked)}
                      className="accent-[#8FB8E8]"
                    />
                    <span>Verified Badge</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-[#F2F4F7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsPublic}
                      onChange={(e) => setFormIsPublic(e.target.checked)}
                      className="accent-[#8FB8E8]"
                    />
                    <span>Show on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#17191D] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-[#141414] hover:bg-[#1E1E1E] text-[#A7ADB7] rounded cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#8FB8E8] hover:bg-[#A3C8F2] text-[#000000] font-bold rounded cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'SAVING...' : editingItem ? 'UPDATE TESTIMONIAL' : 'SAVE TESTIMONIAL'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingId)}
        title="DELETE TESTIMONIAL"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
