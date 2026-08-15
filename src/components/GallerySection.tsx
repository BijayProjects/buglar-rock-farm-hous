import React, { useState } from 'react';
import { GALLERY_ITEMS, BUSINESS_INFO } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Image as ImageIcon, Instagram, Facebook, X, ZoomIn, Info } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'farmhouse', label: 'Farmhouse Vibe' },
    { id: 'food', label: 'Food & BBQ' },
    { id: 'nature', label: 'Nature & Views' },
    { id: 'music', label: 'Music & Bonfire' },
    { id: 'people', label: 'Gatherings' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 bg-[#10261D] text-[#FDFAF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#254F3D] text-[#E08E45] text-xs font-bold uppercase tracking-widest mb-4 border border-[#E08E45]/30">
            <ImageIcon className="w-3.5 h-3.5" />
            Visual Showcase
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FDFAF5] mb-4">
            Capture the Escape.
          </h2>
          <p className="text-sm sm:text-base text-[#EFE9DD]/80 font-light max-w-xl mx-auto">
            Get a glimpse of the serene gardens, cozy evening bonfire lights, and mouthwatering farmhouse dishes at Buglay Rock.
          </p>
        </div>

        {/* Filter Category Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-[#E08E45] text-[#10261D] shadow-md'
                  : 'bg-[#1A382B] text-[#EFE9DD] hover:bg-[#254F3D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group cursor-pointer relative h-72 rounded-2xl overflow-hidden border border-[#254F3D] hover:border-[#E08E45] transition-all shadow-lg bg-[#1A382B]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10261D] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag for placeholder */}
              {item.isPlaceholder && (
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#10261D]/80 text-[#E08E45] text-[10px] font-mono border border-[#E08E45]/40 backdrop-blur-sm">
                  Preview Image
                </span>
              )}

              {/* Hover Overlay content */}
              <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h4 className="font-serif font-bold text-base text-[#FDFAF5] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#EFE9DD]/80 line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-2 text-[10px] font-bold text-[#E08E45] flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  <span>Click to view full photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow the Experience / Social Callout */}
        <div className="bg-[#1A382B] rounded-3xl p-8 border border-[#254F3D] max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45]">
            Follow the Experience
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#FDFAF5]">
            Tag @buglayrockfarmhouse on Instagram
          </h3>
          <p className="text-xs text-[#EFE9DD]/80 max-w-md mx-auto">
            Share your favorite moments, bonfire photos, and family dining memories with us.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#254F3D] hover:bg-[#E08E45] hover:text-[#10261D] text-[#FDFAF5] font-semibold text-xs transition-colors flex items-center gap-2 border border-[#E08E45]/30"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#254F3D] hover:bg-[#E08E45] hover:text-[#10261D] text-[#FDFAF5] font-semibold text-xs transition-colors flex items-center gap-2 border border-[#E08E45]/30"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 flex justify-center items-center min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxImage(null);
            }
          }}
        >
          <div className="max-w-4xl w-full bg-[#10261D] rounded-3xl overflow-hidden border-2 border-[#254F3D] shadow-2xl relative my-4 text-[#FDFAF5]">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#10261D]/90 text-white hover:bg-[#E08E45] hover:text-[#10261D] border border-[#254F3D] transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[65vh] bg-black/80 flex items-center justify-center p-2">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#10261D] border-t border-[#254F3D]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFAF5]">
                  {lightboxImage.title}
                </h3>
                <span className="text-xs uppercase font-semibold text-[#E08E45] bg-[#1A382B] px-3 py-1 rounded-full border border-[#254F3D]">
                  {lightboxImage.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#EFE9DD]/90">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
