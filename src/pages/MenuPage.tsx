import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { MenuSection } from '../components/MenuSection';
import { Utensils, Flame, Leaf, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

interface MenuPageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  return (
    <div className="min-h-screen bg-[#10261D] text-[#FDFAF5]">
      {/* Top Banner */}
      <PageBanner
        badge="Digital Farmhouse Menu"
        badgeIcon={Utensils}
        title="Fresh Hill Flavours & Charcoal Delights"
        subtitle="From authentic Sekuwa sizzling over hot coals to organic farm salads and mountain herbal teas, explore our seasonal dishes prepared fresh daily."
        currentPageName="Menu"
        onNavigateHome={onNavigateHome}
      />

      {/* Culinary Quality Highlights Strip */}
      <div className="bg-[#1A382B] border-b border-[#254F3D] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#E08E45]">100%</div>
              <div className="text-xs text-[#EFE9DD]/80">Fresh Mountain Spices</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#E08E45]">Charcoal</div>
              <div className="text-xs text-[#EFE9DD]/80">Wood-Fired Grilling</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#E08E45]">Organic</div>
              <div className="text-xs text-[#EFE9DD]/80">Garden Veg & Herbs</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#E08E45]">Custom</div>
              <div className="text-xs text-[#EFE9DD]/80">Group Feast Menus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Digital Menu Section */}
      <MenuSection />

      {/* Farmhouse Kitchen Philosophy Section */}
      <section className="py-16 bg-[#0D1F17] border-t border-[#254F3D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45]">
            Our Culinary Promise
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FDFAF5]">
            Handcrafted with Heart & Local Traditions
          </h3>
          <p className="text-sm sm:text-base text-[#EFE9DD]/80 font-light leading-relaxed">
            Every dish served at Buglay Rock Farm House is prepared with attention to freshness. We work closely with local farmers in Lalitpur to source seasonal greens, fresh poultry, and mountain dairy. If you have dietary preferences or want to customize a group banquet, let us know when reserving!
          </p>
        </div>
      </section>
    </div>
  );
};
