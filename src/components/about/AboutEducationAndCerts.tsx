import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, GraduationCap, Trophy, Sparkles } from 'lucide-react';
import { ABOUT_PROFILE } from '../../data/aboutData';
import { getAboutData, BASELINE_ABOUT_CERTIFICATIONS } from '../../services/portfolioDataService';
import { AdminAboutData } from '../../types/admin';

export const AboutEducationAndCerts: React.FC = () => {
  const [about, setAbout] = useState<AdminAboutData | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const a = await getAboutData();
        if (isMounted && a) setAbout(a);
      } catch (err) {
        console.warn('AboutEducationAndCerts load error:', err);
      }
    };

    load();

    const handleUpdate = () => {
      load();
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  const institution = about?.education?.institution || ABOUT_PROFILE.education.institution;
  const degree = about?.education?.degree || ABOUT_PROFILE.education.degree;
  const details = about?.education?.details || ABOUT_PROFILE.education.details;
  const focusAreas =
    about?.focusAreas && about.focusAreas.length > 0
      ? about.focusAreas
      : ABOUT_PROFILE.education.focusAreas;

  // Source certifications from Firestore aboutData/main document, falling back to BASELINE_ABOUT_CERTIFICATIONS
  const rawCertifications =
    about?.certifications && about.certifications.length > 0
      ? about.certifications
      : BASELINE_ABOUT_CERTIFICATIONS;

  // Filter out unpublished items and sort by order
  const publishedCertifications = rawCertifications
    .filter((cert) => cert.isPublished !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D] space-y-14">
      
      {/* ========================================================
          1. ACADEMIC EXCELLENCE // EDUCATION
          ======================================================== */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#F5A623] block mb-2 font-semibold">
              ACADEMIC EXCELLENCE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight">
              EDUCATION
            </h2>
          </div>
          <span className="font-mono text-[11px] text-[#6F7682] uppercase tracking-wider">
            {institution.toUpperCase()} // ONGOING DEGREE
          </span>
        </div>

        {/* Education Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8">
          {/* Left: Institute & Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] rounded font-mono text-[10px] font-bold uppercase tracking-wider">
                PRESTIGIOUS INSTITUTION
              </span>
              <span className="px-2.5 py-1 bg-[#17191D] border border-[#22252A] text-[#A7ADB7] rounded font-mono text-[10px] uppercase tracking-wider">
                ONGOING SINCE 2025
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2F4F7] tracking-tight">
                {institution}
              </h3>
              <p className="font-mono text-sm text-[#F5A623] font-semibold">
                {degree}
              </p>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#A7ADB7] leading-relaxed">
              {details}
            </p>

            {/* Key Focus Areas */}
            <div className="pt-2 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682] block">
                KEY FOCUS AREAS:
              </span>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 bg-[#0D0D0D] border border-[#22252A] rounded text-[#8FB8E8] font-mono text-[11px]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Focus Bars / Metrics */}
          <div className="lg:col-span-5 bg-[#0D0D0D] border border-[#1C1F24] rounded-[6px] p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1F24] font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F7682]">
              <span>CURRICULUM SYLLABUS</span>
              <span className="text-[#8FB8E8]">CHENNAI // IITM</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[#A7ADB7] mb-1.5 text-[11px]">
                  <span>Data Science &amp; Math Modeling</span>
                  <span className="text-[#8FB8E8]">Rigorous</span>
                </div>
                <div className="w-full h-1.5 bg-[#17191D] rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-[#8FB8E8] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#A7ADB7] mb-1.5 text-[11px]">
                  <span>Full Stack &amp; Digital Systems</span>
                  <span className="text-[#F5A623]">Modern</span>
                </div>
                <div className="w-full h-1.5 bg-[#17191D] rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-[#F5A623] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#A7ADB7] mb-1.5 text-[11px]">
                  <span>Visual Communication &amp; UX</span>
                  <span className="text-[#8FB8E8]">High-End</span>
                </div>
                <div className="w-full h-1.5 bg-[#17191D] rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-[#8FB8E8] rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-start gap-2 text-[11px] font-body text-[#6F7682]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623] flex-shrink-0 mt-0.5" />
              <span>
                {institution} BS Program is globally recognized for shaping analytical and product-first technologists.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. RECOGNITION & SKILLS // CERTIFICATIONS & ACHIEVEMENTS
          ======================================================== */}
      {publishedCertifications.length > 0 && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block mb-2 font-semibold">
                RECOGNITION &amp; SKILLS
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2F4F7] uppercase tracking-tight">
                CERTIFICATIONS &amp; ACHIEVEMENTS
              </h2>
            </div>
            <span className="font-mono text-[11px] text-[#F5A623] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>
                {publishedCertifications.length}{' '}
                {publishedCertifications.length === 1 ? 'VERIFIED CREDENTIAL' : 'VERIFIED CREDENTIALS'}
              </span>
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {publishedCertifications.map((cert) => {
              const statusLabel = cert.status || (cert.verified !== false ? 'Verified' : 'Active');
              const categoryLabel = cert.category || cert.type || 'RECOGNITION';

              return (
                <div
                  key={cert.id}
                  className="p-5 sm:p-6 bg-[#080808] hover:bg-[#0B0C0E] border border-[#22252A] hover:border-[#343842] rounded-[8px] space-y-3 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7682]">
                      {categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#8FB8E8] uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-[#8FB8E8]" />
                      <span>{statusLabel}</span>
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#F2F4F7] uppercase tracking-tight">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="font-body text-xs text-[#A7ADB7] leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {(cert.issuer || cert.period || cert.credentialUrl) && (
                    <div className="pt-2 border-t border-[#17191D] flex items-center justify-between font-mono text-[10px] text-[#6F7682]">
                      <span>{cert.issuer || ''}</span>
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8FB8E8] hover:text-[#A8CCFC] underline"
                        >
                          CREDENTIAL ↗
                        </a>
                      ) : cert.period ? (
                        <span>{cert.period}</span>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
