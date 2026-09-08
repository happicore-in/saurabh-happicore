import React, { useState } from 'react';
import { AdminWebProject } from '../../types/admin';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Check,
  X,
  Globe,
  Github,
  Star,
  ArrowUpDown,
  Code,
} from 'lucide-react';

interface WebManagementProps {
  projects: AdminWebProject[];
  onSave: (project: AdminWebProject) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onPreviewPublic: (id: string) => void;
  showToast: (msg: string) => void;
}

export const WebManagement: React.FC<WebManagementProps> = ({
  projects,
  onSave,
  onDelete,
  onPreviewPublic,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'standard'>('all');
  const [sortBy, setSortBy] = useState<'order' | 'name' | 'newest'>('order');

  // Modal form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AdminWebProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formLiveUrl, setFormLiveUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formTechInput, setFormTechInput] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formOrder, setFormOrder] = useState(1);
  const [formCategory, setFormCategory] = useState('fullstack');
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormDescription('');
    setFormImage('');
    setFormLiveUrl('');
    setFormGithubUrl('');
    setFormTechInput('React, Tailwind CSS, Vite');
    setFormFeatured(false);
    setFormOrder(projects.length + 1);
    setFormCategory('fullstack');
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (p: AdminWebProject) => {
    setEditingProject(p);
    setFormTitle(p.title);
    setFormDescription(p.description);
    setFormImage(p.image || '');
    setFormLiveUrl(p.liveUrl || '');
    setFormGithubUrl(p.githubUrl || '');
    setFormTechInput(p.technologies?.join(', ') || '');
    setFormFeatured(!!p.featured);
    setFormOrder(p.order || 1);
    setFormCategory(p.category || 'fullstack');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formTitle.trim()) {
      setFormError('Project Name is required.');
      return;
    }

    setIsSaving(true);
    try {
      const techArray = formTechInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const trimmedLiveUrl = formLiveUrl.trim();
      const trimmedGithubUrl = formGithubUrl.trim();

      const projectData: AdminWebProject = {
        id: editingProject ? editingProject.id : '',
        title: formTitle.trim(),
        description: formDescription.trim(),
        image: formImage.trim(),
        technologies: techArray.length ? techArray : ['Web'],
        featured: formFeatured,
        order: Number(formOrder) || 1,
        category: formCategory,
        ...(trimmedLiveUrl ? { liveUrl: trimmedLiveUrl } : {}),
        ...(trimmedGithubUrl ? { githubUrl: trimmedGithubUrl } : {}),
        ...(editingProject?.createdAt ? { createdAt: editingProject.createdAt } : {}),
      };

      await onSave(projectData);
      showToast(editingProject ? 'Web project updated successfully.' : 'New web project created.');
      setIsFormOpen(false);
    } catch (err: any) {
      console.error('[WebManagement handleSubmit ERROR]:', err);
      const errDetail = err?.code ? `[${err.code}] ${err.message}` : (err?.message || 'Something went wrong while saving. Please try again.');
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
      showToast('Project deleted successfully.');
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter & Sort
  const filteredProjects = projects
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technologies?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchFeatured =
        filterFeatured === 'all'
          ? true
          : filterFeatured === 'featured'
          ? p.featured
          : !p.featured;
      return matchSearch && matchFeatured;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
      return (a.order || 0) - (b.order || 0);
    });

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#8FB8E8] uppercase tracking-widest">
            WORK REPOSITORY // WEB DEVELOPMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            WEB WORK
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + ADD WEB PROJECT
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0A0C0F] border border-[#22252A] p-3 rounded-xl font-mono text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search web projects or tech..."
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F2F4F7] placeholder:text-[#4A505C] focus:border-[#8FB8E8] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">STATUS:</span>
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value as any)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none cursor-pointer"
          >
            <option value="all">ALL ENTRIES ({projects.length})</option>
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
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#8FB8E8] focus:outline-none cursor-pointer"
          >
            <option value="order">DISPLAY ORDER (1, 2, 3...)</option>
            <option value="name">NAME (A-Z)</option>
            <option value="newest">NEWEST FIRST</option>
          </select>
        </div>
      </div>

      {/* Projects List / Table */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-12 text-center space-y-3 font-mono text-xs text-[#6F7682]">
          <Code className="w-8 h-8 text-[#4A505C] mx-auto" />
          <p>No web projects match your search or filter.</p>
          <button
            onClick={openCreateModal}
            className="px-3 py-1.5 bg-[#171A21] hover:bg-[#22252A] text-[#8FB8E8] rounded border border-[#22252A] cursor-pointer"
          >
            + ADD YOUR FIRST WEB PROJECT
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-[#0A0C0F] hover:bg-[#0D1015] border border-[#22252A] hover:border-[#333844] rounded-xl p-4 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Thumbnail Preview */}
                <div className="w-16 h-16 rounded-lg bg-[#050608] border border-[#22252A] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Globe className="w-6 h-6 text-[#4A505C]" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-[#6F7682] bg-[#14171E] px-1.5 py-0.5 rounded border border-[#22252A]">
                      ORDER #{p.order}
                    </span>
                    {p.featured && (
                      <span className="font-mono text-[10px] text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded border border-[#F5A623]/25 flex items-center gap-1 font-bold">
                        <Star className="w-3 h-3 fill-[#F5A623]" /> FEATURED
                      </span>
                    )}
                    {p.badgeLabel && (
                      <span className="font-mono text-[10px] text-[#8FB8E8] bg-[#8FB8E8]/10 px-1.5 py-0.5 rounded border border-[#8FB8E8]/25">
                        {p.badgeLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F2F4F7] truncate">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#A7ADB7] line-clamp-1 font-sans">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {p.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-[#6F7682] bg-[#0E1015] px-1.5 py-0.5 rounded border border-[#1A1E26]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center font-mono text-xs">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-[#A7ADB7] hover:text-[#8FB8E8] hover:bg-[#151922] rounded border border-[#22252A] transition-colors"
                    title="Visit Live Site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-[#A7ADB7] hover:text-[#F2F4F7] hover:bg-[#151922] rounded border border-[#22252A] transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => onPreviewPublic(p.id)}
                  className="px-2.5 py-1.5 text-xs text-[#8FB8E8] hover:bg-[#8FB8E8]/10 rounded border border-[#8FB8E8]/30 transition-colors cursor-pointer"
                >
                  PREVIEW
                </button>
                <button
                  onClick={() => openEditModal(p)}
                  className="px-2.5 py-1.5 text-xs text-[#F2F4F7] bg-[#14171E] hover:bg-[#1E232E] rounded border border-[#22252A] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#A7ADB7]" />
                  EDIT
                </button>
                <button
                  onClick={() => setDeletingId(p.id)}
                  className="p-1.5 text-[#FF6B6B] hover:bg-[#FF4D4D]/10 rounded border border-[#FF4D4D]/25 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-[#000000]/80 backdrop-blur-sm flex justify-center items-start min-h-screen">
          <div className="bg-[#0D0E12] border border-[#2A2E37] rounded-xl max-w-2xl w-full p-4 sm:p-6 my-4 sm:my-8 shadow-2xl space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-[#22252A] pb-4">
              <div>
                <div className="font-mono text-xs text-[#8FB8E8] uppercase tracking-wider">
                  {editingProject ? 'UPDATE ENTRY' : 'NEW CREATION'}
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-sans text-[#F2F4F7] mt-0.5">
                  {editingProject ? 'EDIT WEB PROJECT' : '+ ADD WEB PROJECT'}
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
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  PROJECT NAME *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. SPORTIFY DIGITAL PLATFORM"
                  required
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
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
                  placeholder="Detailed description of technical highlights, architecture and client impact..."
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none"
                />
              </div>

              {/* Cloudinary Image / Thumbnail Upload */}
              <CloudinaryImageUploader
                label="PROJECT IMAGE / THUMBNAIL"
                value={formImage}
                onChange={(url) => setFormImage(url)}
                aspectRatioGuide="16:9 • Desktop Browser Viewport"
              />

              {/* URLs: Live & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    LIVE WEBSITE URL
                  </label>
                  <input
                    type="url"
                    value={formLiveUrl}
                    onChange={(e) => setFormLiveUrl(e.target.value)}
                    placeholder="https://sportify.iitm.ac.in"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    GITHUB URL
                  </label>
                  <input
                    type="url"
                    value={formGithubUrl}
                    onChange={(e) => setFormGithubUrl(e.target.value)}
                    placeholder="https://github.com/happicore/sportify"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Category & Technologies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    CATEGORY (FOR FILTERING)
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none cursor-pointer"
                  >
                    <option value="fullstack">Fullstack / Platform</option>
                    <option value="portfolios">Portfolio / Showcase</option>
                    <option value="tools">Tools & Utilities</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    TECHNOLOGIES (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    value={formTechInput}
                    onChange={(e) => setFormTechInput(e.target.value)}
                    placeholder="React, Tailwind CSS, Vite, Firebase"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Order & Featured */}
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
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2 sm:pt-6">
                  <input
                    type="checkbox"
                    id="webFeatured"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#050608] border-[#22252A] text-[#F5A623] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="webFeatured"
                    className="font-mono text-xs text-[#F2F4F7] cursor-pointer"
                  >
                    FEATURE ON HOMEPAGE / TOP HIGHLIGHT
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
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                >
                  {isSaving ? 'SAVING...' : editingProject ? 'SAVE CHANGES' : 'CREATE PROJECT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="DELETE THIS WEB PROJECT?"
        message="This action cannot be undone. The project will be removed from Firestore and the public portfolio website."
        itemName={projects.find((p) => p.id === deletingId)?.title}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
