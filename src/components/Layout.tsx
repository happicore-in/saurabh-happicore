import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeSection = 'home',
  onNavigate,
}) => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#000000] text-[#F2F4F7] flex flex-col font-body selection:bg-[#F5A623]/20 selection:text-[#F2F4F7]">
      {/* Global Unified Header */}
      <Header activeSection={activeSection} onNavigate={onNavigate} />

      {/* Main Page Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
        {children}
      </main>

      {/* Global Unified Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
