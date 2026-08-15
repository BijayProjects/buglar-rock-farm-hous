import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Experience } from './components/Experience';
import { Story } from './components/Story';
import { MenuSection } from './components/MenuSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ReservationInquiry } from './components/ReservationInquiry';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';
import { FadeInSection } from './components/FadeInSection';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1F2421] font-sans antialiased selection:bg-[#E08E45]/30 selection:text-[#10261D]">
      {/* Fixed Header Navbar */}
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      {/* Main Page Sections */}
      <main>
        {/* Full-Screen Hero */}
        <Hero onOpenInquiry={() => setInquiryModalOpen(true)} />

        {/* 4.9★ Social Proof & Testimonials */}
        <FadeInSection>
          <SocialProof />
        </FadeInSection>

        {/* Six Visual Experience Cards */}
        <FadeInSection>
          <Experience />
        </FadeInSection>

        {/* Editorial Story */}
        <FadeInSection>
          <Story />
        </FadeInSection>

        {/* Interactive Digital Menu */}
        <FadeInSection>
          <MenuSection />
        </FadeInSection>

        {/* Gatherings & Occasions */}
        <FadeInSection>
          <EventsSection onOpenInquiry={() => setInquiryModalOpen(true)} />
        </FadeInSection>

        {/* Masonry Photo Showcase */}
        <FadeInSection>
          <GallerySection />
        </FadeInSection>

        {/* Location & Directions Access Guide */}
        <FadeInSection>
          <LocationSection />
        </FadeInSection>

        {/* Visit Inquiry / Booking Form */}
        <FadeInSection>
          <ReservationInquiry />
        </FadeInSection>
      </main>

      {/* Footer */}
      <FadeInSection>
        <Footer />
      </FadeInSection>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileStickyBar />

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
