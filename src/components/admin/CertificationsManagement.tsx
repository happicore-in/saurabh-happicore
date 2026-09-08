import React, { useState } from 'react';
import { AdminCertification } from '../../types/admin';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  ArrowUp,
  ArrowDown,
  X,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

interface CertificationsManagementProps {
  certifications: AdminCertification[];
  onSave: (cert: AdminCertification) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (reordered: AdminCertification[]) => Promise<void>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const CATEGORY_SUGGESTIONS = [
  'VISUAL DESIGN',
  'HACKATHON // ENGINEERING',
  'WEB ARCHITECTURE',
  'INSTITUTIONAL HONOR',
  'DATA SCIENCE',
  'LEADERSHIP',
];

const TYPE_OPTIONS = ['Certification', 'Achievement', 'Award'];

export const CertificationsManagement: React.FC<CertificationsManagementProps> = ({
  certifications,
  onSave,
  onDelete,
  onReorder,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCert, setEditingCert] = useState<AdminCertification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Deletion modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtered certifications
  const filtered = certifications
    .filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.issuer && c.issuer.toLowerCase().includes(q)) ||
        (c.type && c.type.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleOpenAdd = () => {
    setEditingCert({
      id: `cert-${Date.now()}`,
      title: '',
      category: 'VISUAL DESIGN',
      issuer: '',
      description: '',
      period: new Date().getFullYear().toString(),
      credentialId: '',
      credentialUrl: '',
      verified: true,
      status: 'Verified',
      statusType: 'verified',
      type: 'Certification',
      isPublished: true,
      order: certifications.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: AdminCertification) => {
    setEditingCert({ ...cert });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCert(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (!editingCert.title.trim()) {
      showToast('Please enter a certification or achievement title.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(editingCert);
      handleCloseModal();
    } catch (err: any) {
      console.error('Failed to save certification:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteTargetId);
      setDeleteTargetId(null);
    } catch (err: any) {
      console.error('Failed to delete certification:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (cert: AdminCertification) => {
    const updated: AdminCertification = {
      ...cert,
      isPublished: cert.isPublished === false,
    };
    try {
      await onSave(updated);
    } catch (err: any) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const handleToggleVerified = async (cert: AdminCertification) => {
    const nextVerified = !cert.verified;
    const updated: AdminCertification = {
      ...cert,
      verified: nextVerified,
      status: nextVerified ? (cert.status || 'Verified') : 'Pending',
    };
    try {
      await onSave(updated);
    } catch (err: any) {
      console.error('Failed to toggle verification:', err);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filtered.length) return;

    const list = [...filtered];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Reassign order
    const reordered = list.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    try {
      await onReorder(reordered);
    } catch (err: any) {
      console.error('Failed to reorder certifications:', err);
    }
  };

  const targetCert = certifications.find((c) => c.id === deleteTargetId);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-[#8FB8E8]" />
            <h1 className="font-mono text-base sm:text-lg font-bold text-[#F2F4F7] uppercase tracking-wide">
              CERTIFICATIONS &amp; ACHIEVEMENTS
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#151922] border border-[#8FB8E8]/30 text-[#8FB8E8] font-bold">
              {certifications.length} TOTAL
            </span>
          </div>
          <p className="font-body text-xs text-[#A7ADB7]">
            Manage credentials, hackathon awards, and institutional honors displayed on the public About page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD CERTIFICATION</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F7682]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, category, issuer..."
            className="w-full bg-[#08090C] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#F2F4F7] focus:outline-none"
          />
        </div>

        <div className="font-mono text-[11px] text-[#6F7682] self-end sm:self-auto">
          Showing {filtered.length} of {certifications.length} items
        </div>
      </div>

      {/* Certifications List */}
      {filtered.length === 0 ? (
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-12 text-center space-y-3">
          <Award className="w-10 h-10 text-[#6F7682] mx-auto opacity-50" />
          <h3 className="font-mono text-sm text-[#F2F4F7] font-semibold uppercase">
            No Certifications Found
          </h3>
          <p className="font-body text-xs text-[#6F7682] max-w-sm mx-auto">
            {searchQuery
              ? 'No certifications matching your search query. Try clearing the search filter.'
              : 'You have not added any certifications or achievements yet. Click "Add Certification" to begin.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-[#8FB8E8] underline hover:text-[#A8CCFC]"
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cert, index) => {
            const isPublished = cert.isPublished !== false;
            return (
              <div
                key={cert.id}
                className={`bg-[#08090C] border rounded-xl p-4 sm:p-5 transition-colors ${
                  isPublished ? 'border-[#22252A] hover:border-[#343842]' : 'border-[#1C1F26] opacity-75'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left block: Order & Info */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Reorder Buttons & Badge */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                      <button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-[#6F7682] hover:text-[#8FB8E8] disabled:opacity-20 disabled:hover:text-[#6F7682] transition-colors cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 h-6 rounded bg-[#12151C] border border-[#22252A] font-mono text-[10px] font-bold text-[#8FB8E8] flex items-center justify-center">
                        {cert.order || index + 1}
                      </span>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === filtered.length - 1}
                        className="p-1 text-[#6F7682] hover:text-[#8FB8E8] disabled:opacity-20 disabled:hover:text-[#6F7682] transition-colors cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {cert.category && (
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8FB8E8] bg-[#8FB8E8]/10 border border-[#8FB8E8]/30 px-2 py-0.5 rounded">
                            {cert.category}
                          </span>
                        )}
                        {cert.type && (
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#A7ADB7] bg-[#12151C] border border-[#22252A] px-2 py-0.5 rounded">
                            {cert.type}
                          </span>
                        )}
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${
                            cert.verified
                              ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]'
                              : 'bg-[#6F7682]/10 border-[#6F7682]/30 text-[#6F7682]'
                          }`}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{cert.status || (cert.verified ? 'Verified' : 'Pending')}</span>
                        </span>
                        {!isPublished && (
                          <span className="font-mono text-[9px] uppercase tracking-wider bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 text-[#FF4D4D] px-2 py-0.5 rounded">
                            DRAFT / HIDDEN
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-sm sm:text-base text-[#F2F4F7] uppercase tracking-wide">
                        {cert.title}
                      </h3>

                      {cert.description && (
                        <p className="font-body text-xs text-[#A7ADB7] line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-[#6F7682] pt-1">
                        {cert.issuer && (
                          <span>
                            ISSUER: <strong className="text-[#A7ADB7]">{cert.issuer}</strong>
                          </span>
                        )}
                        {cert.period && (
                          <span>
                            YEAR: <strong className="text-[#A7ADB7]">{cert.period}</strong>
                          </span>
                        )}
                        {cert.credentialId && (
                          <span>
                            ID: <strong className="text-[#A7ADB7]">{cert.credentialId}</strong>
                          </span>
                        )}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8FB8E8] hover:text-[#A8CCFC] inline-flex items-center gap-1 underline"
                          >
                            <span>CREDENTIAL LINK</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right block: Action buttons */}
                  <div className="flex items-center gap-2 self-end lg:self-center pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1C1F26]">
                    {/* Toggle Verified */}
                    <button
                      type="button"
                      onClick={() => handleToggleVerified(cert)}
                      className={`p-2 rounded-lg border font-mono text-[10px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                        cert.verified
                          ? 'border-[#22C55E]/30 text-[#22C55E] bg-[#22C55E]/10 hover:bg-[#22C55E]/20'
                          : 'border-[#22252A] text-[#6F7682] bg-[#0A0C0F] hover:text-[#A7ADB7]'
                      }`}
                      title={cert.verified ? 'Mark as Unverified' : 'Mark as Verified'}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {cert.verified ? 'VERIFIED' : 'UNVERIFIED'}
                      </span>
                    </button>

                    {/* Toggle Published */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(cert)}
                      className={`p-2 rounded-lg border font-mono text-[10px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isPublished
                          ? 'border-[#8FB8E8]/30 text-[#8FB8E8] bg-[#8FB8E8]/10 hover:bg-[#8FB8E8]/20'
                          : 'border-[#22252A] text-[#6F7682] bg-[#0A0C0F] hover:text-[#A7ADB7]'
                      }`}
                      title={isPublished ? 'Hide from public About page' : 'Publish to About page'}
                    >
                      {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">
                        {isPublished ? 'PUBLIC' : 'HIDDEN'}
                      </span>
                    </button>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cert)}
                      className="p-2 bg-[#0A0C0F] hover:bg-[#12151C] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] rounded-lg transition-colors cursor-pointer"
                      title="Edit Certification"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#8FB8E8]" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(cert.id)}
                      className="p-2 bg-[#0A0C0F] hover:bg-[#FF4D4D]/10 border border-[#22252A] hover:border-[#FF4D4D]/40 text-[#6F7682] hover:text-[#FF4D4D] rounded-lg transition-colors cursor-pointer"
                      title="Delete Certification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8FB8E8]" />
                <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider">
                  {editingCert.id && certifications.some((c) => c.id === editingCert.id)
                    ? 'EDIT CERTIFICATION / ACHIEVEMENT'
                    : 'ADD NEW CERTIFICATION / ACHIEVEMENT'}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-[#6F7682] hover:text-[#F2F4F7] transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title (Required) */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  CERTIFICATION / ACHIEVEMENT TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. Canva Essentials Certified"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              {/* Category & Suggestions */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  CATEGORY (OR AREA OF EXCELLENCE)
                </label>
                <input
                  type="text"
                  value={editingCert.category || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value })}
                  placeholder="e.g. VISUAL DESIGN, HACKATHON // ENGINEERING"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
                {/* Category Suggestion Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {CATEGORY_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setEditingCert({ ...editingCert, category: sug })}
                      className="px-2 py-0.5 bg-[#12151C] hover:bg-[#1A1E27] border border-[#22252A] rounded font-mono text-[9px] text-[#8FB8E8] transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type, Status Label & Issuing Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    TYPE
                  </label>
                  <select
                    value={editingCert.type || 'Certification'}
                    onChange={(e) => setEditingCert({ ...editingCert, type: e.target.value })}
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  >
                    {TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#050608]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    STATUS LABEL
                  </label>
                  <input
                    type="text"
                    value={editingCert.status || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value })}
                    placeholder="e.g. Verified, Participant, Honored"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    PERIOD / YEAR
                  </label>
                  <input
                    type="text"
                    value={editingCert.period || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, period: e.target.value })}
                    placeholder="e.g. 2025 or 2025–2026"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Issuing Organization */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  ISSUING ORGANIZATION / FIELD
                </label>
                <input
                  type="text"
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. Canva Design School, IIT Madras BS Degree Sports Society"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              {/* Description (Summary for About card) */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  DESCRIPTION / SUMMARY (DISPLAYED ON CARD)
                </label>
                <textarea
                  rows={3}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  placeholder="Comprehensive mastery in rapid asset production, brand consistency, layout structuring, and modern marketing graphics."
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Credential ID & Credential URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    CREDENTIAL ID (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={editingCert.credentialId || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                    placeholder="e.g. CERT-01 or RIFT-2026"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    CREDENTIAL URL (OPTIONAL VERIFICATION LINK)
                  </label>
                  <input
                    type="url"
                    value={editingCert.credentialUrl || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles: Verified & Published & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#1C1F26]">
                <label className="flex items-center gap-2 p-2.5 bg-[#050608] border border-[#22252A] rounded-lg font-mono text-xs text-[#F2F4F7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCert.verified}
                    onChange={(e) => setEditingCert({ ...editingCert, verified: e.target.checked })}
                    className="rounded bg-[#0A0C0F] border-[#22252A] text-[#8FB8E8]"
                  />
                  <span>VERIFIED BADGE</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-[#050608] border border-[#22252A] rounded-lg font-mono text-xs text-[#F2F4F7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCert.isPublished !== false}
                    onChange={(e) => setEditingCert({ ...editingCert, isPublished: e.target.checked })}
                    className="rounded bg-[#0A0C0F] border-[#22252A] text-[#8FB8E8]"
                  />
                  <span>PUBLISHED (ACTIVE)</span>
                </label>

                <div className="flex items-center gap-2 p-2.5 bg-[#050608] border border-[#22252A] rounded-lg">
                  <span className="font-mono text-xs text-[#A7ADB7]">ORDER:</span>
                  <input
                    type="number"
                    min={1}
                    value={editingCert.order || 1}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, order: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-16 bg-[#0A0C0F] border border-[#22252A] rounded px-2 py-0.5 text-xs text-[#F2F4F7] font-mono text-center focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C1F26]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-[#12151C] hover:bg-[#1A1E27] text-[#A7ADB7] hover:text-[#F2F4F7] font-mono text-xs rounded-lg transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSaving ? 'SAVING...' : 'SAVE CERTIFICATION'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Certification?"
        message="Are you sure you want to delete this certification? It will be removed from your portfolio's About page."
        itemName={targetCert?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
