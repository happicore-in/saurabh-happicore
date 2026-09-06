import React from 'react';

/**
 * Base Shimmer Skeleton primitive.
 * Strictly adheres to the portfolio's dark aesthetic (#000000, #080808, #14171E, #22252A).
 */
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-[#12151B] animate-pulse rounded-[4px] ${className}`}
    aria-hidden="true"
  />
);

/**
 * Skeleton for Project Cards (Web, Video, Graphic)
 * Matches exact padding, borders, and aspect ratios to prevent CLS.
 */
export const ProjectCardSkeleton: React.FC<{ aspectRatio?: '16:9' | '16:10' | '9:16' }> = ({
  aspectRatio = '16:10',
}) => {
  const aspectClass =
    aspectRatio === '9:16'
      ? 'aspect-[9/16]'
      : aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : 'aspect-[16/10]';

  return (
    <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-4 sm:p-5 flex flex-col justify-between space-y-4">
      {/* Media thumbnail area */}
      <div className={`w-full ${aspectClass} bg-[#111319] border border-[#1A1D24] rounded-[4px] relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1E232E]/30 to-transparent animate-pulse" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Metadata & title */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>

      {/* Tech tags and CTA */}
      <div className="pt-3 border-t border-[#17191D] flex items-center justify-between">
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-14" />
        </div>
        <Skeleton className="h-7 w-20" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Featured Hero Work (Flagship Web, Featured Video, Featured Graphic)
 */
export const FeaturedHeroSkeleton: React.FC<{ aspect?: '16:9' | '16:10' | '4:3' }> = ({
  aspect = '16:9',
}) => {
  const aspectClass =
    aspect === '16:10' ? 'aspect-[16/10]' : aspect === '4:3' ? 'aspect-[4/3]' : 'aspect-[16/9]';

  return (
    <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8 lg:p-10 mb-12">
      <div className="flex items-center justify-between pb-4 border-b border-[#17191D] mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left media block */}
        <div className="lg:col-span-7">
          <div className={`w-full ${aspectClass} bg-[#111319] border border-[#1A1D24] rounded-[6px] relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1E232E]/30 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Right info block */}
        <div className="lg:col-span-5 space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-4/5" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-11/12" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>

          <div className="pt-4 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="pt-4 flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for Selected Work Section on Home Page
 */
export const SelectedWorkSectionSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      {/* Hero card skeleton */}
      <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#17191D] mb-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 aspect-[16/9] bg-[#111319] rounded-[4px] border border-[#1A1D24]" />
          <div className="lg:col-span-5 space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-4 flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-36 mt-4" />
          </div>
        </div>
      </div>

      {/* Grid of 2 secondary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCardSkeleton aspectRatio="16:9" />
        <ProjectCardSkeleton aspectRatio="16:9" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Experience Timeline
 */
export const ExperienceTimelineSkeleton: React.FC = () => {
  return (
    <div className="relative">
      <div className="hidden sm:block absolute left-[15px] top-6 bottom-6 w-px bg-[#22252A]" />
      <div className="space-y-6 sm:space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative sm:pl-10">
            <div className="hidden sm:flex absolute left-0 top-7 w-[31px] h-[31px] rounded-full bg-[#000000] border-2 border-[#22252A] items-center justify-center -translate-x-1/2 z-10">
              <span className="w-2 h-2 rounded-full bg-[#2A2E35] animate-pulse" />
            </div>
            <div className="bg-[#080808] border border-[#22252A] rounded-[8px] p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#17191D]">
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-3.5 w-36" />
                </div>
                <Skeleton className="h-6 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-11/12" />
                <Skeleton className="h-3.5 w-4/5" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton for About Main Profile Section
 */
export const AboutMainSkeleton: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left portrait skeleton */}
        <div className="lg:col-span-5 space-y-4">
          <div className="w-full aspect-[4/5] bg-[#0D0D0D] border border-[#22252A] rounded-[6px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1E232E]/30 to-transparent animate-pulse" />
          </div>
          <div className="p-4 bg-[#080808] border border-[#22252A] rounded-[6px] space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3.5 w-48" />
          </div>
        </div>

        {/* Right bio text skeleton */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-3/4" />
          </div>
          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-[#080808] border border-[#22252A] rounded-[6px] space-y-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="p-4 bg-[#080808] border border-[#22252A] rounded-[6px] space-y-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-5 w-36" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
