import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { submitProjectEnquiry } from '../../services/enquiryService';

interface ContactEnquiryFormProps {
  onSuccessNotice?: (msg: string) => void;
}

export const ContactEnquiryForm: React.FC<ContactEnquiryFormProps> = ({ onSuccessNotice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    timeline: '2–4 Weeks',
    budget: 'Not decided',
    projectDetails: '',
    referenceLink: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    projectType?: string;
    projectDetails?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type.';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Please tell me about your project.';
    } else if (formData.projectDetails.trim().length < 10) {
      newErrors.projectDetails = 'Please provide a little more detail about goals or deliverables.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitProjectEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
        timeline: formData.timeline,
        budget: formData.budget,
        projectDetails: formData.projectDetails.trim(),
        referenceLink: formData.referenceLink.trim() || undefined,
      });

      if (res.success) {
        setIsSuccess(true);
        if (onSuccessNotice) {
          onSuccessNotice("Thanks! Your enquiry has been received. I'll get back to you soon.");
        }
      } else {
        setSubmitError(res.message);
      }
    } catch (err) {
      setSubmitError('Something went wrong. Please try again or contact me directly at happicore.in@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: '',
      timeline: '2–4 Weeks',
      budget: 'Not decided',
      projectDetails: '',
      referenceLink: '',
    });
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
  };

  return (
    <div id="project-enquiry-form" className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8 lg:p-10 relative">
      
      {/* Section Label & Header */}
      <div className="space-y-2 pb-6 border-b border-[#17191D]">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8FB8E8]" />
          <span>01 // PROJECT ENQUIRY</span>
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-tight">
          TELL ME ABOUT YOUR PROJECT.
        </h2>
        <p className="font-body text-xs sm:text-sm text-[#A7ADB7]">
          Share a few details below and I&apos;ll get back to you with an initial workflow brief within one working day.
        </p>
      </div>

      {/* Success State */}
      {isSuccess ? (
        <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#52BD95]/15 border border-[#52BD95]/40 flex items-center justify-center text-[#52BD95]">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-heading font-extrabold text-2xl text-[#F2F4F7] uppercase">
              MESSAGE SENT
            </h3>
            <p className="font-body text-sm text-[#A7ADB7] leading-relaxed">
              Thanks! Your enquiry has been received. I&apos;ll review your requirements and get back to you soon at{' '}
              <span className="text-[#8FB8E8] font-mono">{formData.email}</span>.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#0D0D0D] hover:bg-[#15171C] border border-[#22252A] hover:border-[#8FB8E8]/50 text-[#F2F4F7] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
            >
              SEND ANOTHER INQUIRY
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="pt-6 space-y-6" noValidate>
          
          {/* Submission Error Banner */}
          {submitError && (
            <div className="p-4 bg-[#FF453A]/10 border border-[#FF453A]/30 rounded-[6px] flex items-start gap-3 text-xs font-body text-[#FF453A]">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{submitError}</p>
                <p className="text-[11px] mt-1 text-[#A7ADB7]">
                  You can also email directly to{' '}
                  <a href="mailto:happicore.in@gmail.com" className="text-[#F5A623] underline">
                    happicore.in@gmail.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7]">
                <span>YOUR FULL NAME <span className="text-[#F5A623]">*</span></span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Aarav Sharma"
                className={`w-full px-4 py-3 bg-[#0D0D0D] border ${
                  errors.name ? 'border-[#FF453A]' : 'border-[#1C1F24] focus:border-[#8FB8E8]'
                } rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] placeholder-[#6F7682] outline-none transition-colors`}
              />
              {errors.name && (
                <span className="font-mono text-[10px] text-[#FF453A] block">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7]">
                <span>WORK / DIRECT EMAIL <span className="text-[#F5A623]">*</span></span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 bg-[#0D0D0D] border ${
                  errors.email ? 'border-[#FF453A]' : 'border-[#1C1F24] focus:border-[#8FB8E8]'
                } rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] placeholder-[#6F7682] outline-none transition-colors`}
              />
              {errors.email && (
                <span className="font-mono text-[10px] text-[#FF453A] block">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Project Type */}
          <div className="space-y-1.5">
            <label htmlFor="contact-project-type" className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              <span>PRIMARY CREATIVE DISCIPLINE <span className="text-[#F5A623]">*</span></span>
            </label>
            <div className="relative">
              <select
                id="contact-project-type"
                value={formData.projectType}
                onChange={(e) => {
                  setFormData({ ...formData, projectType: e.target.value });
                  if (errors.projectType) setErrors({ ...errors, projectType: undefined });
                }}
                className={`w-full px-4 py-3 bg-[#0D0D0D] border ${
                  errors.projectType ? 'border-[#FF453A]' : 'border-[#1C1F24] focus:border-[#8FB8E8]'
                } rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] outline-none transition-colors cursor-pointer appearance-none`}
              >
                <option value="" disabled className="text-[#6F7682]">
                  Select Project Focus...
                </option>
                <option value="Video Editing">Video Editing (Aftermovies, Reels, Event Recaps)</option>
                <option value="Graphic Design">Graphic Design (Brand Identity, Posters, Systems)</option>
                <option value="Web Development">Web Development (React/Vite, UI/UX, Portfolios)</option>
                <option value="Video + Graphic">Video + Graphic Multi-Discipline</option>
                <option value="Web + Design">Web + Design Full Stack Package</option>
                <option value="Other">Other Custom Inquiries</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6F7682] text-xs">
                ▼
              </div>
            </div>
            {errors.projectType && (
              <span className="font-mono text-[10px] text-[#FF453A] block">
                {errors.projectType}
              </span>
            )}
          </div>

          {/* Row 3: Estimated Timeline & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Timeline */}
            <div className="space-y-1.5">
              <label htmlFor="contact-timeline" className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7] block">
                ESTIMATED TIMELINE
              </label>
              <select
                id="contact-timeline"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#1C1F24] focus:border-[#8FB8E8] rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] outline-none transition-colors cursor-pointer appearance-none"
              >
                <option value="ASAP (&lt; 1 Week)">ASAP (&lt; 1 Week)</option>
                <option value="1–2 Weeks">1–2 Weeks</option>
                <option value="2–4 Weeks">2–4 Weeks</option>
                <option value="1–2 Months">1–2 Months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <label htmlFor="contact-budget" className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7] block">
                BUDGET (OPTIONAL)
              </label>
              <select
                id="contact-budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#1C1F24] focus:border-[#8FB8E8] rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] outline-none transition-colors cursor-pointer appearance-none"
              >
                <option value="Not decided">Not decided</option>
                <option value="Under ₹10K">Under ₹10K</option>
                <option value="₹10K–₹25K">₹10K–₹25K</option>
                <option value="₹25K–₹50K">₹25K–₹50K</option>
                <option value="₹50K+">₹50K+</option>
                <option value="Let's discuss">Let&apos;s discuss</option>
              </select>
            </div>
          </div>

          {/* Row 4: Project Details Textarea */}
          <div className="space-y-1.5">
            <label htmlFor="contact-details" className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7]">
              <span>PROJECT SCOPE &amp; BRIEF <span className="text-[#F5A623]">*</span></span>
              <span className="text-[#6F7682] text-[9px]">MIN 10 CHARS</span>
            </label>
            <textarea
              id="contact-details"
              rows={4}
              value={formData.projectDetails}
              onChange={(e) => {
                setFormData({ ...formData, projectDetails: e.target.value });
                if (errors.projectDetails) setErrors({ ...errors, projectDetails: undefined });
              }}
              placeholder="Tell me about the project, goals, deliverables and anything else that would be useful (Drive, Figma, YouTube refs)..."
              className={`w-full px-4 py-3 bg-[#0D0D0D] border ${
                errors.projectDetails ? 'border-[#FF453A]' : 'border-[#1C1F24] focus:border-[#8FB8E8]'
              } rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] placeholder-[#6F7682] outline-none transition-colors resize-y leading-relaxed`}
            />
            {errors.projectDetails && (
              <span className="font-mono text-[10px] text-[#FF453A] block">
                {errors.projectDetails}
              </span>
            )}
          </div>

          {/* Row 5: Reference / Project Link (Optional) */}
          <div className="space-y-1.5">
            <label htmlFor="contact-reference" className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A7ADB7] block">
              REFERENCE / PROJECT LINK (OPTIONAL)
            </label>
            <input
              id="contact-reference"
              type="url"
              value={formData.referenceLink}
              onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
              placeholder="Drive / Website / Instagram / GitHub or other link"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#1C1F24] focus:border-[#8FB8E8] rounded-[6px] font-body text-xs sm:text-sm text-[#F2F4F7] placeholder-[#6F7682] outline-none transition-colors"
            />
          </div>

          {/* Form Footer Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#17191D]">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#6F7682]">
              <ShieldCheck className="w-4 h-4 text-[#52BD95]" />
              <span>Direct end-to-end client dispatch</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 py-3.5 px-7 bg-[#F2F4F7] hover:bg-[#FFFFFF] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-all cursor-pointer shadow-lg ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#000000]" />
                  <span>DISPATCHING...</span>
                </>
              ) : (
                <>
                  <span>SEND ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
