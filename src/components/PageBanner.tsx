import React from 'react';
import { ArrowLeft, Home, LucideIcon } from 'lucide-react';

interface PageBannerProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle: string;
  currentPageName: string;
  onNavigateHome: () => void;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  currentPageName,
  onNavigateHome,
}) => {
  return (
    <div className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 bg-[#10261D] text-[#FDFAF5] overflow-hidden border-b border-[#254F3D]">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#254F3D]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E08E45]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E08E45_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#EFE9DD]/70 mb-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 hover:text-[#E08E45] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-[#E08E45] font-semibold">{currentPageName}</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#254F3D]/80 border border-[#E08E45]/40 text-[#E08E45] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
          <span>{badge}</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFAF5] mb-4 max-w-3xl leading-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-[#EFE9DD]/85 font-light max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
