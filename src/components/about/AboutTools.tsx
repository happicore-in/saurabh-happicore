import React, { useState, useEffect } from 'react';
import { Film, Palette, Terminal, Wrench } from 'lucide-react';
import { TOOLS_CATEGORIES, ToolCategory } from '../../data/aboutData';
import { getAboutData } from '../../services/portfolioDataService';

export const AboutTools: React.FC = () => {
  const [categories, setCategories] = useState<ToolCategory[]>(TOOLS_CATEGORIES);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const about = await getAboutData();
        if (isMounted && about?.tools && about.tools.length > 0) {
          const videoTools = about.tools
            .filter((t) => t.category === 'video')
            .map((t) => ({ name: t.name, tag: 'Video Suite' }));
          const designTools = about.tools
            .filter((t) => t.category === 'design')
            .map((t) => ({ name: t.name, tag: 'Design Suite' }));
          const webTools = about.tools
            .filter((t) => t.category === 'web' || t.category === 'core')
            .map((t) => ({ name: t.name, tag: 'Web & Code' }));

          const dynamicCategories: ToolCategory[] = [
            {
              category: 'VIDEO',
              tools: videoTools.length > 0 ? videoTools : TOOLS_CATEGORIES[0].tools,
            },
            {
              category: 'DESIGN',
              tools: designTools.length > 0 ? designTools : TOOLS_CATEGORIES[1].tools,
            },
            {
              category: 'WEB',
              tools: webTools.length > 0 ? webTools : TOOLS_CATEGORIES[2].tools,
            },
          ];
          setCategories(dynamicCategories);
        }
      } catch (err) {
        console.warn('AboutTools load error:', err);
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

  return (
    <div className="py-12 sm:py-16 border-b border-[#17191D]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#8FB8E8] block mb-2 font-semibold">
            ENGINEERING &amp; SOFTWARE STACK
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F2F4F7] uppercase tracking-tight">
            TOOLS I USE
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-[#A7ADB7] max-w-md">
          A focused stack of modern creative production suites and full-stack web technologies.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.category}
            className="p-6 bg-[#080808] border border-[#22252A] rounded-[8px] space-y-4 hover:border-[#343842] transition-colors"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#17191D]">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F2F4F7] uppercase tracking-wider">
                {cat.category === 'VIDEO' ? (
                  <Film className="w-4 h-4 text-[#F5A623]" />
                ) : cat.category === 'DESIGN' ? (
                  <Palette className="w-4 h-4 text-[#8FB8E8]" />
                ) : (
                  <Terminal className="w-4 h-4 text-[#F2F4F7]" />
                )}
                <span>{cat.category}</span>
              </div>
              <span className="font-mono text-[10px] text-[#6F7682] uppercase tracking-wider">
                {cat.tools.length} SUITES
              </span>
            </div>

            {/* Tool Items */}
            <div className="space-y-2.5">
              {cat.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#1C1F24] rounded-[6px] hover:border-[#2A2E36] transition-colors"
                >
                  <span className="font-heading font-semibold text-xs sm:text-sm text-[#F2F4F7]">
                    {tool.name}
                  </span>
                  {tool.tag && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#17191D] text-[#A7ADB7] rounded">
                      {tool.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
