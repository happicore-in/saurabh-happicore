import React, { useState } from 'react';
import { AdminAboutData } from '../../types/admin';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import {
  User,
  GraduationCap,
  Wrench,
  Sparkles,
  MapPin,
  CheckCircle2,
  Plus,
  X,
  Layers,
} from 'lucide-react';

interface AboutManagementProps {
  aboutData: AdminAboutData;
  onSave: (data: AdminAboutData) => Promise<void>;
  showToast: (msg: string) => void;
}

export const AboutManagement: React.FC<AboutManagementProps> = ({
  aboutData,
  onSave,
  showToast,
}) => {
  const [formData, setFormData] = useState<AdminAboutData>({ ...aboutData });
  const [isSaving, setIsSaving] = useState(false);

  // New tool & focus area temporary inputs
  const [newToolName, setNewToolName] = useState('');
  const [newToolCategory, setNewToolCategory] = useState<'video' | 'design' | 'web' | 'core'>('video');
  const [newFocusArea, setNewFocusArea] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      showToast('About page settings updated successfully.');
    } catch (err) {
      console.error(err);
      showToast('Failed to save About configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTool = () => {
    if (!newToolName.trim()) return;
    const exists = formData.tools.some(
      (t) => t.name.toLowerCase() === newToolName.trim().toLowerCase()
    );
    if (exists) {
      showToast('Tool already in list.');
      return;
    }
    setFormData({
      ...formData,
      tools: [...formData.tools, { name: newToolName.trim(), category: newToolCategory }],
    });
    setNewToolName('');
  };

  const handleRemoveTool = (toolName: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((t) => t.name !== toolName),
    });
  };

  const handleAddFocusArea = () => {
    if (!newFocusArea.trim()) return;
    if (formData.focusAreas.includes(newFocusArea.trim())) return;
    setFormData({
      ...formData,
      focusAreas: [...formData.focusAreas, newFocusArea.trim()],
    });
    setNewFocusArea('');
  };

  const handleRemoveFocusArea = (tag: string) => {
    setFormData({
      ...formData,
      focusAreas: formData.focusAreas.filter((f) => f !== tag),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#8FB8E8] uppercase tracking-widest">
            PROFILE & CAPABILITIES // BIO & STACK
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            ABOUT MANAGEMENT
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-lg"
        >
          {isSaving ? 'SAVING...' : 'SAVE ALL ABOUT CHANGES'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Profile & Identity */}
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#1C1F26] pb-3">
            <User className="w-4 h-4 text-[#8FB8E8]" />
            <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider">
              PROFILE IDENTITY & BIO
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Cloudinary Profile Image */}
            <div className="lg:col-span-1">
              <CloudinaryImageUploader
                label="PROFILE PHOTO (CLOUDINARY)"
                value={formData.profileImage}
                onChange={(url) => setFormData({ ...formData, profileImage: url })}
                aspectRatioGuide="1:1 Square Avatar"
              />
            </div>

            {/* Intro & Narrative */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  SHORT INTRO HEADLINE
                </label>
                <input
                  type="text"
                  value={formData.shortIntro}
                  onChange={(e) => setFormData({ ...formData, shortIntro: e.target.value })}
                  placeholder="Creative video editor, graphic designer & front-end developer based in Mau, UP."
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2.5 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                  ABOUT DESCRIPTION / NARRATIVE
                </label>
                <textarea
                  rows={6}
                  value={formData.aboutDescription}
                  onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
                  placeholder="Comprehensive professional backstory, design philosophies, and multidisciplinary capabilities..."
                  className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2.5 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    LOCATION
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#6F7682] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Mau, Uttar Pradesh, India"
                      className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 pl-9 pr-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                    AVAILABILITY STATUS
                  </label>
                  <select
                    value={formData.availabilityStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availabilityStatus: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#050608] border border-[#22252A] focus:border-[#8FB8E8] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none cursor-pointer"
                  >
                    <option value="AVAILABLE FOR WORK">AVAILABLE FOR WORK (Green)</option>
                    <option value="LIMITED AVAILABILITY">LIMITED AVAILABILITY (Amber)</option>
                    <option value="NOT AVAILABLE">NOT AVAILABLE (Red / Grey)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Areas Tag Manager */}
          <div className="border-t border-[#1C1F26] pt-4 space-y-3">
            <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
              FOCUS AREAS
            </label>

            <div className="flex flex-wrap gap-2">
              {formData.focusAreas.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#141822] border border-[#222C3D] text-[#8FB8E8] text-xs font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveFocusArea(tag)}
                    className="hover:text-[#FF4D4D] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                value={newFocusArea}
                onChange={(e) => setNewFocusArea(e.target.value)}
                placeholder="Add focus area (e.g. Kinetic Type)"
                className="flex-1 bg-[#050608] border border-[#22252A] text-xs text-[#F2F4F7] px-3 py-1.5 rounded font-mono focus:border-[#8FB8E8] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFocusArea}
                className="px-3 py-1.5 bg-[#171A21] hover:bg-[#222733] text-[#8FB8E8] text-xs font-mono rounded border border-[#22252A] cursor-pointer"
              >
                + ADD
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Education */}
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1C1F26] pb-3">
            <GraduationCap className="w-4 h-4 text-[#F5A623]" />
            <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider">
              EDUCATION & ACADEMICS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                INSTITUTION
              </label>
              <input
                type="text"
                value={formData.education.institution}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...formData.education, institution: e.target.value },
                  })
                }
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                DEGREE
              </label>
              <input
                type="text"
                value={formData.education.degree}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...formData.education, degree: e.target.value },
                  })
                }
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
                ACADEMIC STATUS
              </label>
              <input
                type="text"
                value={formData.education.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...formData.education, status: e.target.value },
                  })
                }
                className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#A7ADB7] tracking-wider uppercase block">
              ACADEMIC FOCUS & HIGHLIGHTS
            </label>
            <input
              type="text"
              value={formData.education.details}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  education: { ...formData.education, details: e.target.value },
                })
              }
              className="w-full bg-[#050608] border border-[#22252A] focus:border-[#F5A623] rounded-lg py-2 px-3 text-xs text-[#F2F4F7] font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Tools Management (Live updates without source changes) */}
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1C1F26] pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#22C55E]" />
              <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider">
                ACTIVE TOOLS & STACK ({formData.tools.length})
              </h2>
            </div>
            <span className="font-mono text-[10px] text-[#6F7682]">
              UPDATE INSTANTLY WITHOUT CODE EDIT
            </span>
          </div>

          {/* Current tools grouped by category */}
          <div className="flex flex-wrap gap-2">
            {formData.tools.map((tool) => (
              <div
                key={tool.name}
                className="bg-[#0D1016] border border-[#22252A] text-xs font-mono text-[#F2F4F7] px-3 py-1.5 rounded-lg flex items-center gap-2 group hover:border-[#383E4C] transition-colors"
              >
                <span>{tool.name}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#161B24] text-[#6F7682] border border-[#242A36]">
                  {tool.category}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveTool(tool.name)}
                  className="text-[#6F7682] hover:text-[#FF4D4D] transition-colors cursor-pointer"
                  title="Remove Tool"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add new tool form */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#1C1F26] max-w-xl">
            <input
              type="text"
              value={newToolName}
              onChange={(e) => setNewToolName(e.target.value)}
              placeholder="e.g. Blender 3D, DaVinci Resolve, Next.js..."
              className="flex-1 bg-[#050608] border border-[#22252A] text-xs text-[#F2F4F7] px-3 py-2 rounded-lg font-mono focus:border-[#22C55E] focus:outline-none"
            />
            <select
              value={newToolCategory}
              onChange={(e) => setNewToolCategory(e.target.value as any)}
              className="bg-[#050608] border border-[#22252A] text-xs text-[#F2F4F7] px-3 py-2 rounded-lg font-mono focus:border-[#22C55E] focus:outline-none cursor-pointer"
            >
              <option value="video">VIDEO EDITING</option>
              <option value="design">GRAPHIC DESIGN</option>
              <option value="web">WEB DEVELOPMENT</option>
              <option value="core">GENERAL / CORE</option>
            </select>
            <button
              type="button"
              onClick={handleAddTool}
              className="px-4 py-2 bg-[#22C55E] hover:bg-[#2EDB6E] text-[#000000] text-xs font-mono font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> ADD TOOL
            </button>
          </div>
        </div>

        {/* Section 4: Services Offered */}
        <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1C1F26] pb-3">
            <Layers className="w-4 h-4 text-[#8FB8E8]" />
            <h2 className="font-mono text-sm font-bold text-[#F2F4F7] uppercase tracking-wider">
              PRIMARY SERVICES OFFERED
            </h2>
          </div>

          <div className="space-y-4">
            {formData.services.map((service, index) => (
              <div
                key={index}
                className="bg-[#06080B] border border-[#22252A] p-4 rounded-lg space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#A7ADB7] uppercase">
                      SERVICE TITLE
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].title = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full bg-[#050608] border border-[#22252A] rounded px-3 py-1.5 text-xs text-[#F2F4F7] font-mono focus:border-[#8FB8E8] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#A7ADB7] uppercase">
                      BADGE / FOCUS
                    </label>
                    <input
                      type="text"
                      value={service.badge || ''}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].badge = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full bg-[#050608] border border-[#22252A] rounded px-3 py-1.5 text-xs text-[#F2F4F7] font-mono focus:border-[#8FB8E8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#A7ADB7] uppercase">
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) => {
                      const updated = [...formData.services];
                      updated[index].description = e.target.value;
                      setFormData({ ...formData, services: updated });
                    }}
                    className="w-full bg-[#050608] border border-[#22252A] rounded px-3 py-1.5 text-xs text-[#F2F4F7] font-mono focus:border-[#8FB8E8] focus:outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22252A]">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-[#8FB8E8] hover:bg-[#A8CCFC] text-[#000000] font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
          >
            {isSaving ? 'SAVING...' : 'SAVE ALL ABOUT CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
};
