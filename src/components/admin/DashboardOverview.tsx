import React from 'react';
import {
  AdminWebProject,
  AdminVideoProject,
  AdminGraphicProject,
  AdminExperience,
} from '../../types/admin';
import { ProjectEnquiry } from '../../services/enquiryService';
import {
  Globe,
  Video,
  Layers,
  Briefcase,
  Mail,
  ArrowRight,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface DashboardOverviewProps {
  webProjects: AdminWebProject[];
  videoProjects: AdminVideoProject[];
  graphicProjects: AdminGraphicProject[];
  experiences: AdminExperience[];
  enquiries: ProjectEnquiry[];
  onNavigateTab: (tab: string) => void;
  onSelectEnquiry: (enquiry: ProjectEnquiry) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  webProjects,
  videoProjects,
  graphicProjects,
  experiences,
  enquiries,
  onNavigateTab,
  onSelectEnquiry,
}) => {
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const recentEnquiries = enquiries.slice(0, 5);

  const stats = [
    {
      label: 'TOTAL WEB PROJECTS',
      value: webProjects.length,
      icon: Globe,
      color: '#8FB8E8',
      tab: 'work-web',
    },
    {
      label: 'TOTAL VIDEO PROJECTS',
      value: videoProjects.length,
      icon: Video,
      color: '#F5A623',
      tab: 'work-video',
    },
    {
      label: 'TOTAL GRAPHIC PROJECTS',
      value: graphicProjects.length,
      icon: Layers,
      color: '#A8CCFC',
      tab: 'work-graphic',
    },
    {
      label: 'TOTAL EXPERIENCE ENTRIES',
      value: experiences.length,
      icon: Briefcase,
      color: '#E0E4EC',
      tab: 'experience',
    },
    {
      label: 'NEW CONTACT ENQUIRIES',
      value: newEnquiriesCount,
      icon: Mail,
      color: newEnquiriesCount > 0 ? '#22C55E' : '#6F7682',
      badge: newEnquiriesCount > 0 ? 'ACTION NEEDED' : undefined,
      tab: 'contact',
    },
  ];

  const getStatusBadge = (status: ProjectEnquiry['status']) => {
    switch (status) {
      case 'NEW':
        return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
      case 'CONTACTED':
        return 'bg-[#8FB8E8]/10 text-[#8FB8E8] border-[#8FB8E8]/30';
      case 'IN_PROGRESS':
        return 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30';
      case 'COMPLETED':
        return 'bg-[#A7ADB7]/10 text-[#F2F4F7] border-[#A7ADB7]/30';
      case 'ARCHIVED':
      default:
        return 'bg-[#1C1F26] text-[#6F7682] border-[#2A2E38]';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22252A] pb-6">
        <div>
          <div className="font-mono text-xs text-[#8FB8E8] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            LIVE PORTFOLIO OVERVIEW
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#F2F4F7] mt-1">
            DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#6F7682]">SYNC ENGINE:</span>
          <span className="text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded">
            FIREBASE FIRESTORE ONLINE
          </span>
        </div>
      </div>

      {/* Compact Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigateTab(stat.tab)}
              className="bg-[#0A0C0F] hover:bg-[#101318] border border-[#22252A] hover:border-[#383E4B] rounded-xl p-4 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#22252A]"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {stat.badge && (
                  <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                    {stat.badge}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-mono text-[#F2F4F7]">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] text-[#A7ADB7] tracking-wider uppercase mt-1 group-hover:text-[#8FB8E8] transition-colors flex items-center justify-between">
                <span>{stat.label}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Launchpad & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C1F26] pb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F5A623]" />
              <h2 className="font-mono text-sm font-bold tracking-wider text-[#F2F4F7] uppercase">
                RECENT ENQUIRIES
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('contact')}
              className="font-mono text-xs text-[#8FB8E8] hover:text-[#A8CCFC] flex items-center gap-1 transition-colors cursor-pointer"
            >
              VIEW ALL ({enquiries.length}) <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-[#6F7682] font-mono text-xs">
              No client enquiries submitted yet. Submissions from the public Contact page will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[#6F7682] border-b border-[#1C1F26] text-[11px]">
                    <th className="pb-3 font-normal">NAME</th>
                    <th className="pb-3 font-normal">PROJECT TYPE</th>
                    <th className="pb-3 font-normal">DATE</th>
                    <th className="pb-3 font-normal">STATUS</th>
                    <th className="pb-3 font-normal text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14171E]">
                  {recentEnquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      className="hover:bg-[#101318] transition-colors cursor-pointer group"
                      onClick={() => onSelectEnquiry(enq)}
                    >
                      <td className="py-3 font-medium text-[#F2F4F7]">
                        <div>{enq.name}</div>
                        <div className="text-[10px] text-[#6F7682] font-normal">{enq.email}</div>
                      </td>
                      <td className="py-3 text-[#A7ADB7]">
                        <span className="px-2 py-0.5 rounded bg-[#161922] border border-[#22252A] text-[10px]">
                          {enq.projectType}
                        </span>
                      </td>
                      <td className="py-3 text-[#6F7682] text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-3">
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border uppercase ${getStatusBadge(
                            enq.status
                          )}`}
                        >
                          {enq.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEnquiry(enq);
                          }}
                          className="font-mono text-[11px] text-[#8FB8E8] hover:text-[#A8CCFC] transition-colors"
                        >
                          DETAILS →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Panel / Fast Links (1 Col) */}
        <div className="space-y-6">
          <div className="bg-[#0A0C0F] border border-[#22252A] rounded-xl p-6 space-y-4">
            <h3 className="font-mono text-xs font-bold tracking-wider text-[#F2F4F7] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8FB8E8]" />
              QUICK ACTIONS
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('work-web')}
                className="w-full py-2.5 px-3 bg-[#11141A] hover:bg-[#181D26] border border-[#22252A] rounded-lg text-left font-mono text-xs text-[#F2F4F7] flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span>+ ADD NEW WEB PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6F7682] group-hover:text-[#8FB8E8] transition-colors" />
              </button>

              <button
                onClick={() => onNavigateTab('work-video')}
                className="w-full py-2.5 px-3 bg-[#11141A] hover:bg-[#181D26] border border-[#22252A] rounded-lg text-left font-mono text-xs text-[#F2F4F7] flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span>+ ADD NEW VIDEO WORK</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6F7682] group-hover:text-[#F5A623] transition-colors" />
              </button>

              <button
                onClick={() => onNavigateTab('work-graphic')}
                className="w-full py-2.5 px-3 bg-[#11141A] hover:bg-[#181D26] border border-[#22252A] rounded-lg text-left font-mono text-xs text-[#F2F4F7] flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span>+ ADD NEW GRAPHIC POSTER</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6F7682] group-hover:text-[#A8CCFC] transition-colors" />
              </button>

              <button
                onClick={() => onNavigateTab('settings')}
                className="w-full py-2.5 px-3 bg-[#11141A] hover:bg-[#181D26] border border-[#22252A] rounded-lg text-left font-mono text-xs text-[#F2F4F7] flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span>UPDATE AVAILABILITY / CONTACT</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6F7682] group-hover:text-[#22C55E] transition-colors" />
              </button>
            </div>
          </div>

          <div className="bg-[#080A0E] border border-[#22252A] rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="text-[#A7ADB7] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#8FB8E8]" />
              ACTIVE DEPLOYMENT
            </div>
            <p className="text-[11px] text-[#6F7682] leading-relaxed">
              All dashboard updates synchronize with Firebase Firestore. Cloudinary handles visual media storage while video streams reference Google Drive URLs directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
