import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ExperiencePage } from './pages/ExperiencePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { LocationPage } from './pages/LocationPage';
import { BlogPage } from './pages/BlogPage';
import { ReservationInquiry } from './components/ReservationInquiry';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';
import { FadeInSection } from './components/FadeInSection';
import { AdminApp } from './admin/AdminApp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    const parseRoute = () => {
      const rawPath = window.location.pathname.replace('/', '').toLowerCase();
      const rawHash = window.location.hash.replace('#', '').toLowerCase();

      // Check for admin / login URL patterns
      const adminRoutes = ['admin', 'wp-admin', 'login', 'dashboard'];
      if (adminRoutes.includes(rawPath) || adminRoutes.includes(rawHash)) {
        setCurrentPage('admin');
        return;
      }

      const validPages = ['home', 'experience', 'menu', 'story', 'events', 'gallery', 'blog', 'location'];
      if (validPages.includes(rawHash)) {
        setCurrentPage(rawHash);
      } else if (validPages.includes(rawPath)) {
        setCurrentPage(rawPath);
      } else if (rawHash === 'hero' || rawHash === '' || rawPath === '') {
        setCurrentPage('home');
      }
    };

    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    window.addEventListener('popstate', parseRoute);

    // Discreet Admin Shortcut for site owners: Ctrl + Shift + A / Cmd + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentPage((prev) => (prev === 'admin' ? 'home' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', parseRoute);
      window.removeEventListener('popstate', parseRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    if (page === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = page === 'home' ? 'home' : page;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // If in Admin Mode, render the full WordPress-Style CMS Portal
  if (currentPage === 'admin') {
    return <AdminApp onBackToSite={() => navigateTo('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1F2421] font-sans antialiased selection:bg-[#E08E45]/30 selection:text-[#10261D]">
      {/* Fixed Header Navbar with Active State and Page Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      {/* Dynamic Page Views */}
      {currentPage === 'home' && (
        <HomePage onOpenInquiry={() => setInquiryModalOpen(true)} />
      )}

      {currentPage === 'experience' && (
        <ExperiencePage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {currentPage === 'menu' && (
        <MenuPage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {currentPage === 'story' && (
        <StoryPage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {currentPage === 'events' && (
        <EventsPage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {currentPage === 'gallery' && (
        <GalleryPage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {currentPage === 'blog' && (
        <BlogPage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {currentPage === 'location' && (
        <LocationPage
          onNavigateHome={() => navigateTo('home')}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />
      )}

      {/* Shared Footer across all views */}
      <FadeInSection>
        <Footer onNavigate={navigateTo} />
      </FadeInSection>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileStickyBar onNavigate={navigateTo} />

      {/* Standalone Visit Inquiry Modal */}
      {inquiryModalOpen && (
        <ReservationInquiry
          isOpenModal={true}
          onCloseModal={() => setInquiryModalOpen(false)}
        />
      )}
    </div>
  );
}


