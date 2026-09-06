import React, { useState, useEffect } from 'react';
import { ExperienceCard } from './ExperienceCard';
import { EXPERIENCE_ITEMS } from '../../data/experienceData';
import { ExperienceItem } from '../../types';
import { getPublicExperiences } from '../../services/portfolioDataService';
import { ExperienceTimelineSkeleton } from '../common/Skeletons';

export const ExperienceTimeline: React.FC = () => {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadExperiences = async (silent = false) => {
      try {
        const list = await getPublicExperiences();
        if (isMounted) {
          setItems(list && list.length > 0 ? list : EXPERIENCE_ITEMS);
          if (!silent) {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.warn('ExperienceTimeline load notice:', err);
        if (isMounted && !silent) {
          setItems(EXPERIENCE_ITEMS);
          setIsLoading(false);
        }
      }
    };

    loadExperiences(false);

    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent;
      if (!ce.detail || ce.detail.type === 'experience') {
        loadExperiences(true);
      }
    };
    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  if (isLoading) {
    return <ExperienceTimelineSkeleton count={3} />;
  }

  return (
    <div className="relative">
      {/* Subtle vertical timeline line connecting roles */}
      <div className="hidden sm:block absolute left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-[#8FB8E8]/40 via-[#22252A] to-transparent pointer-events-none" />

      <div className="space-y-6 sm:space-y-8">
        {items.map((item, idx) => (
          <div key={item.id} className="relative sm:pl-10">
            {/* Timeline node dot on sm+ screens */}
            <div className="hidden sm:flex absolute left-0 top-7 w-[31px] h-[31px] rounded-full bg-[#000000] border-2 border-[#22252A] items-center justify-center -translate-x-1/2 z-10">
              <span className="w-2 h-2 rounded-full bg-[#8FB8E8]" />
            </div>

            <ExperienceCard item={item} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};
