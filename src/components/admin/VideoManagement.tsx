import React, { useState } from 'react';
import { AdminVideoProject } from '../../types/admin';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Video,
  Star,
  Clock,
  ArrowUpDown,
  Play,
  X,
} from 'lucide-react';

interface VideoManagementProps {
  videos: AdminVideoProject[];
  onSave: (video: AdminVideoProject) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onPreviewPublic: (id: string) => void;
  showToast: (msg: string) => void;
}

export const VideoManagement: React.FC<VideoManagementProps> = ({
  videos,
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
  const [editingVideo, setEditingVideo] = useState<AdminVideoProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formGoogleDriveUrl, setFormGoogleDriveUrl] = useState('');
  const [formWherePosted, setFormWherePosted] = useState('');
  const [formSocialMediaLink, setFormSocialMediaLink] = useState('');
  const [formToolsInput, setFormToolsInput] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formOrder, setFormOrder] = useState(1);
  const [formAspectRatio, setFormAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingVideo(null);
    setFormTitle('');
    setFormDescription('');
    setFormThumbnail('');
    setFormDuration('02:30 • 1080P');
    setFormGoogleDriveUrl('');
    setFormWherePosted('YouTube / Fest Displays');
    setFormSocialMediaLink('');
    setFormToolsInput('CapCut PC, Adobe Premiere Pro');
    setFormFeatured(false);
    setFormOrder(videos.length + 1);
    setFormAspectRatio('16:9');
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (v: AdminVideoProject) => {
    setEditingVideo(v);
    setFormTitle(v.title);
    setFormDescription(v.description);
    setFormThumbnail(v.thumbnail || '');
    setFormDuration(v.duration || '');
    setFormGoogleDriveUrl(v.googleDriveUrl || '');
    setFormWherePosted(v.wherePosted || '');
    setFormSocialMediaLink(v.socialMediaLink || '');
    setFormToolsInput(v.tools?.join(', ') || '');
    setFormFeatured(!!v.featured);
    setFormOrder(v.order || 1);
    setFormAspectRatio((v.aspectRatio === '9:16' ? '9:16' : '16:9') as any);
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

    if (!formGoogleDriveUrl.trim()) {
      setFormError('Google Drive Video Link is required (used for VIEW VIDEO → stream).');
      return;
    }

    if (!formThumbnail.trim()) {
      setFormError('Thumbnail image is required (uploaded through Cloudinary).');
      return;
    }

    setIsSaving(true);
    try {
      const toolsArray = formToolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const trimmedDuration = formDuration.trim();
      const trimmedWherePosted = formWherePosted.trim();
      const trimmedSocialMediaLink = formSocialMediaLink.trim();

      const videoData: AdminVideoProject = {
        id: editingVideo ? editingVideo.id : '',
        title: formTitle.trim(),
        description: formDescription.trim(),
        thumbnail: formThumbnail.trim(),
        googleDriveUrl: formGoogleDriveUrl.trim(),
        tools: toolsArray.length ? toolsArray : ['CapCut PC'],
        featured: formFeatured,
        order: Number(formOrder) || 1,
        aspectRatio: formAspectRatio,
        ...(trimmedDuration ? { duration: trimmedDuration } : {}),
        ...(trimmedWherePosted ? { wherePosted: trimmedWherePosted } : {}),
        ...(trimmedSocialMediaLink ? { socialMediaLink: trimmedSocialMediaLink } : {}),
        ...(editingVideo?.createdAt ? { createdAt: editingVideo.createdAt } : {}),
      };

      await onSave(videoData);
      showToast(editingVideo ? 'Video work updated.' : 'New video project added.');
      setIsFormOpen(false);
    } catch (err: any) {
      console.error('[VideoManagement handleSubmit ERROR]:', err);
      const errDetail = err?.code ? `[${err.code}] ${err.message}` : (err?.message || 'Failed to save video project. Please try again.');
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
      showToast('Video project removed.');
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete video project.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredVideos = videos
    .filter((v) => {
      const matchSearch =
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.tools?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchFeatured =
        filterFeatured === 'all'
          ? true
          : filterFeatured === 'featured'
          ? v.featured
          : !v.featured;
      return matchSearch && matchFeatured;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
      return (a.order || 0) - (b.order || 0);
    });

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#F5A623] uppercase tracking-widest">
            WORK REPOSITORY // VIDEO EDITING
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            VIDEO WORK
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#F5A623] hover:bg-[#FFAE33] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + ADD VIDEO
        </button>
      </div>

      {/* Cloudinary & Drive Policy Notice Banner */}
      <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2.5 text-[#A7ADB7]">
          <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
          <span>
            <strong className="text-[#F2F4F7]">ZERO-STORAGE PROTOCOL:</strong> Video files are hosted on Google Drive. Thumbnails are handled via Cloudinary.
          </span>
        </div>
        <span className="text-[#6F7682] text-[11px]">
          VIEW VIDEO → opens Drive URL directly
        </span>
      </div>

      {/* Search & Sort Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0A0C0F] border border-[#22252A] p-3 rounded-xl font-mono text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search video titles or tools..."
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F2F4F7] placeholder:text-[#4A505C] focus:border-[#F5A623] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6F7682] text-[11px] whitespace-nowrap">STATUS:</span>
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value as any)}
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#F5A623] focus:outline-none cursor-pointer"
          >
            <option value="all">ALL VIDEOS ({videos.length})</option>
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
            className="w-full bg-[#050608] border border-[#22252A] rounded-lg px-3 py-2 text-xs text-[#F2F4F7] focus:border-[#F5A623] focus:outline-none cursor-pointer"
          >
            <option value="order">DISPLAY ORDER (1, 2, 3...)</option>
            <option value="title">TITLE (A-Z)</option>
            <option value="newest">NEWEST FIRST</option>
          </select>
        </div>
      </div>

      {/* Videos List */}
      {filteredVideos.length === 0 ? (
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-12 text-center space-y-3 font-mono text-xs text-[#6F7682]">
          <Video className="w-8 h-8 text-[#4A505C] mx-auto" />
          <p>No video projects found matching criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredVideos.map((v) => (
            <div
              key={v.id}
              className="bg-[#0A0C0F] hover:bg-[#0D1015] border border-[#22252A] hover:border-[#333844] rounded-xl p-4 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-lg bg-[#050608] border border-[#22252A] overflow-hidden flex-shrink-0 relative group flex items-center justify-center">
                  {v.thumbnail ? (
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Video className="w-6 h-6 text-[#4A505C]" />
                  )}
                  <div className="absolute inset-0 bg-[#000000]/40 flex items-center justify-center">
                    <Play className="w-4 h-4 text-[#FFFFFF]/80" />
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-[#6F7682] bg-[#14171E] px-1.5 py-0.5 rounded border border-[#22252A]">
                      ORDER #{v.order}
                    </span>
                    {v.featured && (
                      <span className="font-mono text-[10px] text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded border border-[#F5A623]/25 flex items-center gap-1 font-bold">
                        <Star className="w-3 h-3 fill-[#F5A623]" /> FEATURED
                      </span>
                    )}
                    {v.duration && (
                      <span className="font-mono text-[10px] text-[#A7ADB7] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {v.duration}
                      </span>
                    )}
                    {v.aspectRatio && (
                      <span className="font-mono text-[10px] text-[#8FB8E8] bg-[#8FB8E8]/10 px-1.5 py-0.5 rounded border border-[#8FB8E8]/20">
                        {v.aspectRatio}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F2F4F7] truncate">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#A7ADB7] line-clamp-1 font-sans">
                    {v.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px] text-[#6F7682]">
                    <span className="text-[#8FB8E8] truncate max-w-xs">
                      DRIVE: {v.googleDriveUrl}
                    </span>
                    {v.wherePosted && <span>• {v.wherePosted}</span>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center font-mono text-xs">
                {v.googleDriveUrl && (
                  <a
                    href={v.googleDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 text-xs text-[#F5A623] hover:bg-[#F5A623]/10 rounded border border-[#F5A623]/30 transition-colors flex items-center gap-1"
                    title="Open Stored Google Drive Video Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    DRIVE ↗
                  </a>
                )}

                <button
                  onClick={() => onPreviewPublic(v.id)}
                  className="px-2.5 py-1.5 text-xs text-[#8FB8E8] hover:bg-[#8FB8E8]/10 rounded border border-[#8FB8E8]/30 transition-colors cursor-pointer"
                >
                  PREVIEW
                </button>
                <button
                  onClick={() => openEditModal(v)}
                  className="px-2.5 py-1.5 text-xs text-[#F2F4F7] bg-[#14171E] hover:bg-[#1E232E] rounded border border-[#22252A] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#A7ADB7]" />
                  EDIT
                </button>
                <button
                  onClick={() => setDeletingId(v.id)}
                  className="p-1.5 text-[#FF6B6B] hover:bg-[#FF4D4D]/10 rounded border border-[#FF4D4D]/25 transition-colors cursor-pointer"
                  title="Delete Video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Video Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0D0E12] border border-[#2A2E37] rounded-xl max-w-2xl w-full p-6 my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#22252A] pb-4">
              <div>
                <div className="font-mono text-xs text-[#F5A623] uppercase tracking-wider">
                  {editingVideo ? 'UPDATE VIDEO' : 'NEW VIDEO WORK'}
                </div>
                <h2 className="text-xl font-bold font-sans text-[#F2F4F7] mt-0.5">
                  {editingVideo ? 'EDIT VIDEO WORK' : '+ ADD VIDEO WORK'}
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
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  TITLE *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Paradox 2026 Concert Aftermovie"
                  required
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
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
                  placeholder="High-octane aftermovie with synchronized sound design, dynamic speed ramps..."
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none resize-none"
                />
              </div>

              {/* Cloudinary Thumbnail */}
              <CloudinaryImageUploader
                label="THUMBNAIL (CLOUDINARY) *"
                required
                value={formThumbnail}
                onChange={(url) => setFormThumbnail(url)}
                aspectRatioGuide="16:9 for landscape, 9:16 for reel"
              />

              {/* Google Drive Video Link * */}
              <div className="space-y-1.5 bg-[#12161F] p-3 rounded-lg border border-[#1F2633]">
                <label className="font-mono text-xs text-[#F5A623] tracking-wider uppercase block font-bold flex items-center justify-between">
                  <span>GOOGLE DRIVE VIDEO LINK *</span>
                  <span className="text-[10px] text-[#A7ADB7] font-normal">STREAMED DIRECTLY ON CLICK</span>
                </label>
                <input
                  type="url"
                  value={formGoogleDriveUrl}
                  onChange={(e) => setFormGoogleDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  required
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
                <p className="font-mono text-[10px] text-[#6F7682]">
                  The actual video is stored on Google Drive. Public visitors clicking "VIEW VIDEO →" will open this link.
                </p>
              </div>

              {/* Duration & Aspect Ratio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    DURATION & RESOLUTION
                  </label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g. 03:42 • 4K 60FPS"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    ASPECT RATIO
                  </label>
                  <select
                    value={formAspectRatio}
                    onChange={(e) => setFormAspectRatio(e.target.value as any)}
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none cursor-pointer"
                  >
                    <option value="16:9">16:9 (Cinematic Horizontal)</option>
                    <option value="9:16">9:16 (Vertical Reel / Short)</option>
                  </select>
                </div>
              </div>

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
                    placeholder="e.g. YouTube & Concert Arena"
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
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
                    placeholder="https://instagram.com/p/..."
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
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
                  placeholder="CapCut PC, Adobe Premiere Pro, DaVinci Resolve"
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
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
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="videoFeatured"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#050608] border-[#22252A] text-[#F5A623] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="videoFeatured"
                    className="font-mono text-xs text-[#F2F4F7] cursor-pointer"
                  >
                    FEATURE AS TOP HERO / HOMEPAGE
                  </label>
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
                  className="px-5 py-2 bg-[#F5A623] hover:bg-[#FFAE33] text-[#000000] font-mono text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isSaving ? 'SAVING...' : editingVideo ? 'SAVE CHANGES' : 'ADD VIDEO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="DELETE THIS VIDEO PROJECT?"
        message="This action cannot be undone. The video entry will be removed from Firestore and the public Video Editing page."
        itemName={videos.find((v) => v.id === deletingId)?.title}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
