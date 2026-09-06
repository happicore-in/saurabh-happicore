import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WorkPageProps {
  initialCategory?: string;
  onContactClick?: () => void;
  onNavigate?: (id: string) => void;
}

interface CategoryCard {
  number: string;
  id: 'video' | 'web' | 'graphic';
  navId: string;
  route: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    number: '01',
    id: 'video',
    navId: 'video',
    route: '/video',
    title: 'VIDEO',
    subtitle: 'Video Editing',
    description: 'Aftermovies • Promotional Videos • Short-form Content',
    actionText: 'VIEW VIDEO WORK',
  },
  {
    number: '02',
    id: 'web',
    navId: 'web',
    route: '/web',
    title: 'WEB',
    subtitle: 'Web Development',
    description: 'Websites • Digital Experiences • Frontend',
    actionText: 'VIEW WEB WORK',
  },
  {
    number: '03',
    id: 'graphic',
    navId: 'graphic',
    route: '/graphic',
    title: 'GRAPHIC',
    subtitle: 'Graphic Design',
    description: 'Posters • Social Creatives • Visual Systems',
    actionText: 'VIEW GRAPHIC WORK',
  },
];

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const handleSelect = (navId: string) => {
    if (onNavigate) {
      onNavigate(navId);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#000000] text-[#F2F4F7] flex flex-col justify-between">
      <main className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
        {/* ========================================================
            PAGE HEADER: MINIMAL, BLACK, EDITORIAL
            ======================================================== */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F2F4F7] uppercase leading-none mb-4 sm:mb-5">
            WORK
          </h1>

          <p className="font-body text-base sm:text-lg lg:text-xl text-[#A7ADB7] max-w-xl leading-relaxed">
            Explore my work across video editing, web development and graphic design.
          </p>
        </div>

        {/* ========================================================
            CATEGORY OPTIONS: ONLY THREE EDITORIAL TILES
            Desktop: Horizontal 3-column (VIDEO | WEB | GRAPHIC)
            Mobile: Vertical stack
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.id}
              id={`work-category-${card.id}`}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(card.navId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(card.navId);
                }
              }}
              className="group relative flex flex-col justify-between min-h-[360px] sm:min-h-[400px] p-8 sm:p-10 lg:p-12 bg-[#080808] hover:bg-[#0D0D0D] border border-[#22252A] hover:border-[#8FB8E8]/70 rounded-[8px] transition-all duration-200 hover:-translate-y-1.5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#8FB8E8]/40 shadow-sm hover:shadow-xl"
            >
              {/* TOP: Small Number */}
              <div>
                <span className="font-mono text-sm sm:text-base text-[#8FB8E8] font-bold tracking-[0.16em]">
                  {card.number}
                </span>
              </div>

              {/* MIDDLE: Category name, subtitle, one-line description */}
              <div className="my-8 sm:my-10">
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F2F4F7] tracking-tight uppercase group-hover:text-[#FFFFFF] transition-colors mb-3">
                  {card.title}
                </h2>

                <div className="font-heading font-semibold text-base sm:text-lg text-[#F2F4F7]/90 mb-2">
                  {card.subtitle}
                </div>

                <p className="font-body text-sm sm:text-[15px] text-[#A7ADB7] leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* BOTTOM: Action with animated arrow */}
              <div className="pt-6 border-t border-[#17191D] group-hover:border-[#22252A] flex items-center justify-between transition-colors">
                <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#F2F4F7] group-hover:text-[#8FB8E8] transition-colors flex items-center gap-2">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-[#8FB8E8] transition-transform duration-200 group-hover:translate-x-1.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
