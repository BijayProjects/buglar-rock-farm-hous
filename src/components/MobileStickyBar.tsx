import React from 'react';
import { Phone, Navigation, Utensils } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#10261D]/95 backdrop-blur-md border-t border-[#254F3D] px-4 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-xs shadow transition-transform active:scale-95"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span>Call Now</span>
        </a>

        {/* Directions Button */}
        <a
          href={BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-xs border border-[#E08E45]/40 transition-transform active:scale-95"
        >
          <Navigation className="w-4 h-4 text-[#E08E45] mb-0.5" />
          <span>Directions</span>
        </a>

        {/* Menu Button */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#1A382B] text-[#FDFAF5] font-semibold text-xs border border-[#254F3D] transition-transform active:scale-95"
        >
          <Utensils className="w-4 h-4 text-[#E08E45] mb-0.5" />
          <span>Menu</span>
        </a>
      </div>
    </div>
  );
};
