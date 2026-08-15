import React from 'react';
import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { Experience } from '../components/Experience';
import { Story } from '../components/Story';
import { MenuSection } from '../components/MenuSection';
import { EventsSection } from '../components/EventsSection';
import { GallerySection } from '../components/GallerySection';
import { LocationSection } from '../components/LocationSection';
import { ReservationInquiry } from '../components/ReservationInquiry';
import { FadeInSection } from '../components/FadeInSection';

interface HomePageProps {
  onOpenInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry }) => {
  return (
    <main>
      {/* Full-Screen Hero */}
      <Hero onOpenInquiry={onOpenInquiry} />

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
        <EventsSection onOpenInquiry={onOpenInquiry} />
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
  );
};
