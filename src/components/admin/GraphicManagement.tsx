import React, { useState } from 'react';
import { AdminGraphicProject } from '../../types/admin';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Layers,
  Star,
  ArrowUpDown,
  Image as ImageIcon,
  X,
} from 'lucide-react';

interface GraphicManagementProps {
  graphics: AdminGraphicProject[];
  onSave: (graphic: AdminGraphicProject) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onPreviewPublic: (id: string) => void;
  showToast: (msg: string) => void;
}

export const GraphicManagement: React.FC<GraphicManagementProps> = ({
  graphics,
  onSave,
  onDelete,
  onPreviewPublic,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'standard'>('all');
  const [sortBy, setSortBy] = useState<'order' | 'title' | 'newest'>('order');

  // Modal Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGraphic, setEditingGraphic] = useState<AdminGraphicProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formWherePosted, setFormWherePosted] = useState('');
  const [formSocialMediaLink, setFormSocialMediaLink] = useState('');
  const [formToolsInput, setFormToolsInput] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formOrder, setFormOrder] = useState(1);
  const [formCategory, setFormCategory] = useState('posters');
  const [formBadgeLabel, setFormBadgeLabel] = useState('3:4 PRINT POSTER');
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingGraphic(null);
    setFormTitle('');
    setFormDescription('');
    setFormImage('');
    setFormWherePosted('Behance / Print');
    setFormSocialMediaLink('');
    setFormToolsInput('Adobe Photoshop, Adobe Illustrator');
    setFormFeatured(false);
    setFormOrder(graphics.length + 1);
    setFormCategory('posters');
    setFormBadgeLabel('3:4 PRINT POSTER');
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (g: AdminGraphicProject) => {
    setEditingGraphic(g);
    setFormTitle(g.title);
    setFormDescription(g.description);
    setFormImage(g.image || '');
    setFormWherePosted(g.wherePosted || '');
    setFormSocialMediaLink(g.socialMediaLink || '');
    setFormToolsInput(g.tools?.join(', ') || '');
    setFormFeatured(!!g.featured);
    setFormOrder(g.order || 1);
    setFormCategory(g.category || 'posters');
    setFormBadgeLabel(g.badgeLabel || '3:4 PRINT POSTER');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formTitle.trim()) {
      setFormError('Title is required.');
      return;
    }

    if (!formImage.trim()) {
      setFormError('Image is required (upload through Cloudinary).');
      return;
    }

    setIsSaving(true);
    try {
      const toolsArray = formToolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const trimmedWherePosted = formWherePosted.trim();
      const trimmedSocialMediaLink = formSocialMediaLink.trim();
      const trimmedBadgeLabel = formBadgeLabel.trim();

      const graphicData: AdminGraphicProject = {
        id: editingGraphic ? editingGraphic.id : '',
        title: formTitle.trim(),
        description: formDescription.trim(),
        image: formImage.trim(),
        tools: toolsArray.length ? toolsArray : ['Adobe Photoshop', 'Illustrator'],
        featured: formFeatured,
        order: Number(formOrder) || 1,
        category: formCategory,
        ...(trimmedWherePosted ? { wherePosted: trimmedWherePosted } : {}),
        ...(trimmedSocialMediaLink ? { socialMediaLink: trimmedSocialMediaLink } : {}),
        ...(trimmedBadgeLabel ? { badgeLabel: trimmedBadgeLabel } : {}),
        ...(editingGraphic?.createdAt ? { createdAt: editingGraphic.createdAt } : {}),
      };

      await onSave(graphicData);
      showToast(editingGraphic ? 'Graphic work updated.' : 'New graphic work created.');
      setIsFormOpen(false);
    } catch (err: any) {
      console.error('[GraphicManagement handleSubmit ERROR]:', err);
      const errDetail = err?.code ? `[${err.code}] ${err.message}` : (err?.message || 'Failed to save graphic design item.');
      setFormError(errDetail);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await onDelete(deletingId);
      showToast('Graphic item deleted.');
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete graphic item.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredGraphics = graphics
    .filter((g) => {
      const matchSearch =
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.tools?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchFeatured =
        filterFeatured === 'all'
          ? true
          : filterFeatured === 'featured'
          ? g.featured
          : !g.featured;
      return matchSearch && matchFeatured;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
      return (a.order || 0) - (b.order || 0);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#A8CCFC] uppercase tracking-widest">
            WORK REPOSITORY // GRAPHIC DESIGN
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            GRAPHIC WORK
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#A8CCFC] hover:bg-[#BEDBFF] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + ADD GRAPHIC
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0A0C0F] border border-[#22252A] p-3 rounded-xl font-mono text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posters or branding..."
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F2F4F7] placeholder:text-[#4A505C] focus:border-[#A8CCFC] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">STATUS:</span>
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value as any)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#A8CCFC] focus:outline-none cursor-pointer"
          >
            <option value="all">ALL GRAPHICS ({graphics.length})</option>
            <option value="featured">FEATURED ONLY</option>
            <option value="standard">STANDARD</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#6F7682]" />
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#A8CCFC] focus:outline-none cursor-pointer"
          >
            <option value="order">DISPLAY ORDER (1, 2, 3...)</option>
            <option value="title">TITLE (A-Z)</option>
            <option value="newest">NEWEST FIRST</option>
          </select>
        </div>
      </div>

      {/* Graphics List */}
      {filteredGraphics.length === 0 ? (
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-12 text-center space-y-3 font-mono text-xs text-[#6F7682]">
          <Layers className="w-8 h-8 text-[#4A505C] mx-auto" />
          <p>No graphic items found matching search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGraphics.map((g) => (
            <div
              key={g.id}
              className="bg-[#0A0C0F] hover:bg-[#0D1015] border border-[#22252A] hover:border-[#333844] rounded-xl p-4 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Visual Thumbnail */}
                <div className="w-14 h-18 rounded-lg bg-[#050608] border border-[#22252A] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {g.image ? (
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-[#4A505C]" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-[#6F7682] bg-[#14171E] px-1.5 py-0.5 rounded border border-[#22252A]">
                      ORDER #{g.order}
                    </span>
                    {g.featured && (
                      <span className="font-mono text-[10px] text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded border border-[#F5A623]/25 flex items-center gap-1 font-bold">
                        <Star className="w-3 h-3 fill-[#F5A623]" /> FEATURED
                      </span>
                    )}
                    {g.badgeLabel && (
                      <span className="font-mono text-[10px] text-[#A8CCFC] bg-[#A8CCFC]/10 px-1.5 py-0.5 rounded border border-[#A8CCFC]/20">
                        {g.badgeLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F2F4F7] truncate">
                    {g.title}
                  </h3>
                  <p className="text-xs text-[#A7ADB7] line-clamp-1 font-sans">
                    {g.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px] text-[#6F7682]">
                    {g.wherePosted && <span>POSTED: {g.wherePosted}</span>}
                    {g.tools?.map((tool, i) => (
                      <span
                        key={i}
                        className="bg-[#0E1015] px-1.5 py-0.5 rounded border border-[#1A1E26] text-[#A7ADB7]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center font-mono text-xs">
                {g.socialMediaLink && (
                  <a
                    href={g.socialMediaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-[#A7ADB7] hover:text-[#A8CCFC] hover:bg-[#151922] rounded border border-[#22252A] transition-colors"
                    title="Open External Post Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => onPreviewPublic(g.id)}
                  className="px-2.5 py-1.5 text-xs text-[#8FB8E8] hover:bg-[#8FB8E8]/10 rounded border border-[#8FB8E8]/30 transition-colors cursor-pointer"
                >
                  PREVIEW
                </button>
                <button
                  onClick={() => openEditModal(g)}
                  className="px-2.5 py-1.5 text-xs text-[#F2F4F7] bg-[#14171E] hover:bg-[#1E232E] rounded border border-[#22252A] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#A7ADB7]" />
                  EDIT
                </button>
                <button
                  onClick={() => setDeletingId(g.id)}
                  className="p-1.5 text-[#FF6B6B] hover:bg-[#FF4D4D]/10 rounded border border-[#FF4D4D]/25 transition-colors cursor-pointer"
                  title="Delete Graphic"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-[#000000]/80 backdrop-blur-sm flex justify-center items-start min-h-screen">
          <div className="bg-[#0D0E12] border border-[#2A2E37] rounded-xl max-w-2xl w-full p-4 sm:p-6 my-4 sm:my-8 shadow-2xl space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-[#22252A] pb-4">
              <div>
                <div className="font-mono text-xs text-[#A8CCFC] uppercase tracking-wider">
                  {editingGraphic ? 'UPDATE GRAPHIC' : 'NEW CREATIVE ASSET'}
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-sans text-[#F2F4F7] mt-0.5">
                  {editingGraphic ? 'EDIT GRAPHIC WORK' : '+ ADD GRAPHIC'}
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-[#6F7682] hover:text-[#F2F4F7] p-1.5 cursor-pointer rounded hover:bg-[#14171E] transition-colors"
                aria-label="Close modal"
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
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  TITLE *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. CampusRun 2025 Flagship Marathon Poster"
                  required
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  DESCRIPTION
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  placeholder="Typographic identity, vector cartography route map, print specifications..."
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none"
                />
              </div>

              {/* Cloudinary Graphic Image */}
              <CloudinaryImageUploader
                label="GRAPHIC IMAGE (CLOUDINARY) *"
                required
                value={formImage}
                onChange={(url) => setFormImage(url)}
                aspectRatioGuide="3:4 for posters, 1:1 for social graphics"
              />

              {/* Where Posted & Social Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    WHERE POSTED
                  </label>
                  <input
                    type="text"
                    value={formWherePosted}
                    onChange={(e) => setFormWherePosted(e.target.value)}
                    placeholder="e.g. Behance / Campus A1 Print"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    SOCIAL MEDIA LINK
                  </label>
                  <input
                    type="url"
                    value={formSocialMediaLink}
                    onChange={(e) => setFormSocialMediaLink(e.target.value)}
                    placeholder="https://behance.net/gallery/..."
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Category & Badge Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    CATEGORY (FOR FILTERING)
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none cursor-pointer"
                  >
                    <option value="posters">Posters & Print</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="social">Social Media Creatives</option>
                    <option value="merchandise">Merchandise & Apparel</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    BADGE LABEL / FORMAT
                  </label>
                  <input
                    type="text"
                    value={formBadgeLabel}
                    onChange={(e) => setFormBadgeLabel(e.target.value)}
                    placeholder="e.g. 3:4 PRINT POSTER"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  TOOLS (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={formToolsInput}
                  onChange={(e) => setFormToolsInput(e.target.value)}
                  placeholder="Adobe Photoshop, Adobe Illustrator, Canva"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              {/* Display Order & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    DISPLAY ORDER
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#A8CCFC] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2 sm:pt-6">
                  <input
                    type="checkbox"
                    id="graphicFeatured"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#050608] border-[#22252A] text-[#F5A623] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="graphicFeatured"
                    className="font-mono text-xs text-[#F2F4F7] cursor-pointer"
                  >
                    FEATURE AS TOP EXHIBIT / HOMEPAGE
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-[#22252A]">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-[#14171E] hover:bg-[#1E232E] text-[#A7ADB7] hover:text-[#F2F4F7] font-mono text-xs rounded border border-[#22252A] transition-colors cursor-pointer text-center"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-[#A8CCFC] hover:bg-[#BEDBFF] text-[#000000] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                >
                  {isSaving ? 'SAVING...' : editingGraphic ? 'SAVE CHANGES' : 'ADD GRAPHIC'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="DELETE THIS GRAPHIC WORK?"
        message="This action cannot be undone. The design will be removed from Firestore and the public Graphic Design page."
        itemName={graphics.find((g) => g.id === deletingId)?.title}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
