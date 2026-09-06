import React, { useState } from 'react';
import { AdminExperience } from '../../types/admin';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Briefcase,
  Calendar,
  MapPin,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  ListPlus,
  X,
} from 'lucide-react';

interface ExperienceManagementProps {
  experiences: AdminExperience[];
  onSave: (exp: AdminExperience) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (reordered: AdminExperience[]) => Promise<void>;
  showToast: (msg: string) => void;
}

export const ExperienceManagement: React.FC<ExperienceManagementProps> = ({
  experiences,
  onSave,
  onDelete,
  onReorder,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Modal Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<AdminExperience | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formRole, setFormRole] = useState('');
  const [formOrganization, setFormOrganization] = useState('');
  const [formOrgSubtext, setFormOrgSubtext] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formCurrent, setFormCurrent] = useState(false);
  const [formLocation, setFormLocation] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState<string[]>(['']);
  const [formTagsInput, setFormTagsInput] = useState('');
  const [formOrder, setFormOrder] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingExp(null);
    setFormRole('');
    setFormOrganization('');
    setFormOrgSubtext('IIT Madras BS Degree Sports Society');
    setFormStartDate('Nov 2025');
    setFormEndDate('Present');
    setFormCurrent(true);
    setFormLocation('Chennai / Hybrid');
    setFormDescription('');
    setFormResponsibilities(['Led end-to-end visual direction and media campaigns.']);
    setFormTagsInput('Art Direction, Media Production, Typography');
    setFormOrder(experiences.length + 1);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (e: AdminExperience) => {
    setEditingExp(e);
    setFormRole(e.role);
    setFormOrganization(e.organization);
    setFormOrgSubtext(e.organizationSubtext || '');
    setFormStartDate(e.startDate || '');
    setFormEndDate(e.endDate || '');
    setFormCurrent(!!e.current);
    setFormLocation(e.location || '');
    setFormDescription(e.description || '');
    setFormResponsibilities(
      e.responsibilities && e.responsibilities.length > 0 ? [...e.responsibilities] : ['']
    );
    setFormTagsInput(e.tags?.join(', ') || '');
    setFormOrder(e.order || 1);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleAddResponsibility = () => {
    setFormResponsibilities([...formResponsibilities, '']);
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormResponsibilities(formResponsibilities.filter((_, i) => i !== index));
  };

  const handleResponsibilityChange = (index: number, text: string) => {
    const updated = [...formResponsibilities];
    updated[index] = text;
    setFormResponsibilities(updated);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formRole.trim()) {
      setFormError('Role is required.');
      return;
    }

    if (!formOrganization.trim()) {
      setFormError('Organization is required.');
      return;
    }

    setIsSaving(true);
    try {
      const cleanResponsibilities = formResponsibilities
        .map((r) => r.trim())
        .filter(Boolean);

      const tagsArray = formTagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const expData: AdminExperience = {
        id: editingExp ? editingExp.id : '',
        role: formRole.trim(),
        organization: formOrganization.trim(),
        organizationSubtext: formOrgSubtext.trim() || undefined,
        startDate: formStartDate.trim(),
        endDate: formCurrent ? 'Present' : formEndDate.trim(),
        current: formCurrent,
        location: formLocation.trim(),
        description: formDescription.trim() || cleanResponsibilities.join('\n\n'),
        responsibilities: cleanResponsibilities,
        tags: tagsArray.length ? tagsArray : ['Design'],
        order: Number(formOrder) || 1,
        createdAt: editingExp?.createdAt,
      };

      await onSave(expData);
      showToast(editingExp ? 'Experience record updated.' : 'New experience added.');
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
      setFormError('Failed to save experience entry.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await onDelete(deletingId);
      showToast('Experience deleted.');
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete experience.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    const list = [...experiences];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Recalculate order numbers
    const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    await onReorder(updated);
    showToast('Display order updated.');
  };

  const filtered = experiences.filter(
    (e) =>
      e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#E0E4EC] uppercase tracking-widest">
            CAREER TIMELINE // TENURE & ROLES
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            EXPERIENCE
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#E0E4EC] hover:bg-[#FFFFFF] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + ADD EXPERIENCE
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-[#0A0C0F] border border-[#22252A] p-3 rounded-xl font-mono text-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roles, organizations or skills..."
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F2F4F7] placeholder:text-[#4A505C] focus:border-[#E0E4EC] focus:outline-none"
          />
        </div>
        <span className="text-[#6F7682] text-[11px] whitespace-nowrap">
          {experiences.length} TOTAL ROLES
        </span>
      </div>

      {/* Experience Timeline Cards */}
      {filtered.length === 0 ? (
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-12 text-center space-y-3 font-mono text-xs text-[#6F7682]">
          <Briefcase className="w-8 h-8 text-[#4A505C] mx-auto" />
          <p>No experiences match the query.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((exp, idx) => (
            <div
              key={exp.id}
              className="bg-[#0A0C0F] hover:bg-[#0D1015] border border-[#22252A] hover:border-[#333844] rounded-xl p-5 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[#6F7682] bg-[#050608] border border-[#1A1D24] p-1 rounded-lg">
                  <button
                    onClick={() => handleMoveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 hover:text-[#F2F4F7] disabled:opacity-20 cursor-pointer"
                    title="Move Higher"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-[#A7ADB7]">#{exp.order}</span>
                  <button
                    onClick={() => handleMoveOrder(idx, 'down')}
                    disabled={idx === experiences.length - 1}
                    className="p-1 hover:text-[#F2F4F7] disabled:opacity-20 cursor-pointer"
                    title="Move Lower"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {exp.current && (
                      <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/30 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> CURRENT TENURE
                      </span>
                    )}
                    <span className="font-mono text-[11px] text-[#A7ADB7] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#6F7682]" />
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                    </span>
                    {exp.location && (
                      <span className="font-mono text-[11px] text-[#6F7682] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-bold text-base text-[#F2F4F7]">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs text-[#8FB8E8]">
                    {exp.organization} {exp.organizationSubtext && `• ${exp.organizationSubtext}`}
                  </p>

                  {/* Bullet Responsibilities Preview */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-[#A7ADB7] space-y-0.5 pt-1 font-sans">
                      {exp.responsibilities.slice(0, 2).map((r, i) => (
                        <li key={i} className="line-clamp-1">
                          {r}
                        </li>
                      ))}
                      {exp.responsibilities.length > 2 && (
                        <li className="list-none font-mono text-[10px] text-[#6F7682]">
                          +{exp.responsibilities.length - 2} more bullet items
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {exp.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-[#8FB8E8] bg-[#0E1015] px-2 py-0.5 rounded border border-[#1E2533]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center font-mono text-xs">
                <button
                  onClick={() => openEditModal(exp)}
                  className="px-3 py-1.5 text-xs text-[#F2F4F7] bg-[#14171E] hover:bg-[#1E232E] rounded border border-[#22252A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#A7ADB7]" />
                  EDIT
                </button>
                <button
                  onClick={() => setDeletingId(exp.id)}
                  className="p-1.5 text-[#FF6B6B] hover:bg-[#FF4D4D]/10 rounded border border-[#FF4D4D]/25 transition-colors cursor-pointer"
                  title="Delete Experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Experience Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0D0E12] border border-[#2A2E37] rounded-xl max-w-2xl w-full p-6 my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#22252A] pb-4">
              <div>
                <div className="font-mono text-xs text-[#E0E4EC] uppercase tracking-wider">
                  {editingExp ? 'UPDATE TENURE' : 'NEW POSITION'}
                </div>
                <h2 className="text-xl font-bold font-sans text-[#F2F4F7] mt-0.5">
                  {editingExp ? 'EDIT EXPERIENCE' : '+ ADD EXPERIENCE'}
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-[#6F7682] hover:text-[#F2F4F7] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="bg-[#2D1212] border border-[#501D1D] rounded-lg p-3 text-xs font-mono text-[#FF8080]">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Role & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    ROLE *
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. DEPUTY HEAD — DESIGN & MEDIA"
                    required
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    value={formOrganization}
                    onChange={(e) => setFormOrganization(e.target.value)}
                    placeholder="e.g. The Sportify"
                    required
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Organization Subtext */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  ORGANIZATION SUBTEXT / AFFILIATION
                </label>
                <input
                  type="text"
                  value={formOrgSubtext}
                  onChange={(e) => setFormOrgSubtext(e.target.value)}
                  placeholder="e.g. IIT Madras BS Degree Sports Society"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              {/* Dates & Current Position Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    START DATE
                  </label>
                  <input
                    type="text"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    placeholder="e.g. Nov 2025"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    END DATE
                  </label>
                  <input
                    type="text"
                    value={formCurrent ? 'Present' : formEndDate}
                    disabled={formCurrent}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    placeholder="e.g. Jun 2026"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] disabled:opacity-50 rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pb-2.5">
                  <input
                    type="checkbox"
                    id="currentPos"
                    checked={formCurrent}
                    onChange={(e) => setFormCurrent(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#050608] border-[#22252A] text-[#22C55E] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="currentPos"
                    className="font-mono text-xs text-[#F2F4F7] cursor-pointer whitespace-nowrap"
                  >
                    CURRENT POSITION
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  LOCATION
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Chennai / Hybrid"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              {/* Key Responsibilities (Dynamic Bullet Points) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase">
                    RESPONSIBILITIES (BULLET POINTS)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="font-mono text-[11px] text-[#8FB8E8] hover:text-[#A8CCFC] flex items-center gap-1 cursor-pointer"
                  >
                    <ListPlus className="w-3.5 h-3.5" /> + ADD BULLET
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {formResponsibilities.map((resp, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#6F7682]">{i + 1}.</span>
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleResponsibilityChange(i, e.target.value)}
                        placeholder="Key milestone, deliverable or operational leadership..."
                        className="flex-1 bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-1.5 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                      />
                      {formResponsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveResponsibility(i)}
                          className="text-[#6F7682] hover:text-[#FF6B6B] p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    TAGS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    value={formTagsInput}
                    onChange={(e) => setFormTagsInput(e.target.value)}
                    placeholder="Art Direction, After Effects, Leadership"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    DISPLAY ORDER
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#E0E4EC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22252A]">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#14171E] hover:bg-[#1E232E] text-[#A7ADB7] hover:text-[#F2F4F7] font-mono text-xs rounded border border-[#22252A] transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#E0E4EC] hover:bg-[#FFFFFF] text-[#000000] font-mono text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isSaving ? 'SAVING...' : editingExp ? 'SAVE CHANGES' : 'ADD POSITION'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="DELETE THIS EXPERIENCE?"
        message="This action cannot be undone. The role will be removed from Firestore and the public Experience page."
        itemName={experiences.find((e) => e.id === deletingId)?.role}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
