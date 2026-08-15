import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { GallerySection } from '../components/GallerySection';
import { Image as ImageIcon, Instagram, Facebook, Camera } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

interface GalleryPageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  return (
    <div className="min-h-screen bg-[#10261D] text-[#FDFAF5]">
      {/* Top Banner */}
      <PageBanner
        badge="Photo & Atmosphere Showcase"
        badgeIcon={ImageIcon}
        title="Capture the Rustic Magic & Mountain Skies"
        subtitle="Explore snapshots of our garden seating, smoky barbecue grills, acoustic guitar evenings, and joyful family gatherings at Buglay Rock Farm House."
        currentPageName="Gallery"
        onNavigateHome={onNavigateHome}
      />

      {/* Main Gallery Section with Lightbox */}
      <GallerySection />
    </div>
  );
};
