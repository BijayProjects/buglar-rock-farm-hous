import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, MapPin, Menu as MenuIcon, X, Sparkles, Compass, Utensils, Calendar, CalendarCheck, Image as ImageIcon, Info, BookOpen } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  onOpenInquiry: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  currentPage,
  onNavigate,
}) => {
  const { siteSettings } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', name: 'Home', href: '#home', icon: Compass },
    { id: 'experience', name: 'Experience', href: '#experience', icon: Sparkles },
    { id: 'menu', name: 'Menu', href: '#menu', icon: Utensils },
    { id: 'story', name: 'Story', href: '#story', icon: Info },
    { id: 'events', name: 'Events', href: '#events', icon: Calendar },
    { id: 'gallery', name: 'Gallery', href: '#gallery', icon: ImageIcon },
    { id: 'blog', name: 'Blog', href: '#blog', icon: BookOpen },
    { id: 'location', name: 'Location', href: '#location', icon: MapPin },
  ];

  const handleNavClick = (pageId: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#10261D]/90 backdrop-blur-md shadow-lg border-b border-[#254F3D]/50 py-3'
            : 'bg-gradient-to-b from-[#10261D]/80 via-[#10261D]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">
            {/* Left: Logo */}
            <div className="flex items-center shrink-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick('home', e)}
                className="group flex items-center"
                aria-label="Buglay Rock Farm House Home"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#E08E45]/60 bg-[#10261D] shadow-md group-hover:scale-105 group-hover:border-[#E08E45] transition-all flex items-center justify-center p-0.5 shrink-0">
                  <img
                    src={siteSettings.logo}
                    alt="Buglay Rock Farm House Logo"
                    className="w-full h-full object-cover object-center rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.id, e)}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#E08E45] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#E08E45]'
                        : 'text-[#FDFAF5]/90 hover:text-[#E08E45] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E08E45] hover:after:w-full after:transition-all'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right: Desktop Action CTAs */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenInquiry}
                title="Plan a Visit"
                aria-label="Plan a Visit"
                className="p-2.5 rounded-full border border-[#E08E45]/40 text-[#FDFAF5] bg-[#254F3D]/60 hover:bg-[#E08E45]/20 hover:border-[#E08E45] transition-all flex items-center justify-center shadow-sm"
              >
                <CalendarCheck className="w-4 h-4 text-[#E08E45]" />
              </button>

              <a
                href={`tel:${siteSettings.phone}`}
                title={`Call ${siteSettings.phoneDisplay}`}
                aria-label={`Call ${siteSettings.phoneDisplay}`}
                className="p-2.5 rounded-full bg-[#E08E45] text-[#10261D] hover:bg-[#C87D32] transition-colors shadow-md flex items-center justify-center"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile / Tablet Header Controls (strictly visible below lg screen width) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenInquiry}
                title="Plan a Visit"
                aria-label="Plan a Visit"
                className="w-10 h-10 rounded-full text-[#FDFAF5] bg-[#254F3D]/80 hover:bg-[#254F3D] border border-[#E08E45]/20 transition-colors flex items-center justify-center shrink-0"
              >
                <CalendarCheck className="w-4 h-4 text-[#E08E45]" />
              </button>

              <a
                href={`tel:${siteSettings.phone}`}
                title={`Call ${siteSettings.phoneDisplay}`}
                aria-label={`Call ${siteSettings.phoneDisplay}`}
                className="w-10 h-10 rounded-full bg-[#E08E45] text-[#10261D] hover:bg-[#C87D32] transition-colors shadow-sm flex items-center justify-center shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-full text-[#FDFAF5] bg-[#254F3D]/80 hover:bg-[#254F3D] border border-[#E08E45]/20 transition-colors flex items-center justify-center shrink-0"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="w-5 h-5 text-[#FDFAF5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Drawer with High Z-Index Layering */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-[320px] sm:max-w-sm h-full bg-[#10261D] text-[#FDFAF5] shadow-2xl flex flex-col justify-between z-10 border-l border-[#254F3D] overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#254F3D]/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E08E45]/60 bg-[#10261D] flex items-center justify-center p-0.5 shrink-0 shadow-md">
                    <img
                      src={siteSettings.logo}
                      alt="Buglay Rock Farm House Logo"
                      className="w-full h-full object-cover object-center rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-base sm:text-lg text-[#FDFAF5] leading-tight">
                      {siteSettings.name}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider text-[#E08E45] font-medium">
                      Farm House & Restro
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#254F3D]/60 hover:bg-[#254F3D] text-[#FDFAF5]/80 hover:text-white flex items-center justify-center transition-colors shrink-0"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links list */}
              <nav className="space-y-1.5" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPage === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(link.id, e)}
                      className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-base font-medium transition-all group ${
                        isActive
                          ? 'bg-[#254F3D] text-[#E08E45] font-semibold border border-[#E08E45]/30'
                          : 'text-[#FDFAF5] hover:bg-[#254F3D] hover:text-[#E08E45]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#E08E45] text-[#10261D]'
                            : 'bg-[#254F3D]/60 text-[#E08E45] group-hover:bg-[#E08E45]/20'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="tracking-wide">{link.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-5 sm:p-6 space-y-3 bg-[#0B1A14] border-t border-[#254F3D]">
              <a
                href={`tel:${siteSettings.phone}`}
                className="w-full py-3 px-4 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-[#C87D32] transition-colors shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {siteSettings.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-sm text-center hover:bg-[#336B53] transition-colors flex items-center justify-center gap-2 border border-[#E08E45]/30"
              >
                <CalendarCheck className="w-4 h-4 text-[#E08E45]" />
                <span>Plan a Visit / Event</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
