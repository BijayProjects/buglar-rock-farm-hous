import React from 'react';
import { Compass, Sun, Heart, Music2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Story: React.FC = () => {
  const { siteSettings } = useCMS();
  const story = siteSettings.storyContent;

  return (
    <section id="story" className="py-24 bg-[#F9F6F0] text-[#1F2421] relative overflow-hidden border-y border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Story Image Cluster */}
          <div className="lg:col-span-6 relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={siteSettings.images.outdoors}
                alt="Countryside Garden at Buglay Rock Farm House"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 sm:max-w-[62%] text-white z-0">
                <span className="text-xs uppercase tracking-widest text-[#E08E45] font-bold block mb-1 drop-shadow">
                  {siteSettings.address}
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold leading-snug drop-shadow-md">
                  {story.subtitle}
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-4 lg:-right-6 bg-[#10261D] text-[#FDFAF5] p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#254F3D] max-w-[280px] items-center gap-3.5 z-10">
              <div className="w-11 h-11 rounded-full bg-[#E08E45]/20 text-[#E08E45] flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#EFE9DD]/80 truncate">Away from Kathmandu traffic</p>
                <p className="font-serif font-bold text-sm sm:text-base text-[#E08E45] leading-tight">A Scenic Hill Retreat</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A382B]/10 text-[#1A382B] text-xs font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#E08E45]" />
              Our Concept & Atmosphere
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#10261D] tracking-tight leading-tight">
              {story.title}
            </h2>

            <p className="text-base sm:text-lg text-[#1F2421]/90 font-light leading-relaxed">
              {story.paragraph1}
            </p>

            <p className="text-base text-[#1F2421]/80 leading-relaxed">
              {story.paragraph2}
            </p>

            {/* Core Values / Pillar Icons */}
            <div className="pt-6 border-t border-[#EFE9DD] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#EFE9DD]">
                <div className="w-8 h-8 rounded-full bg-[#E08E45]/20 text-[#E08E45] flex items-center justify-center mb-2 font-bold">
                  🌿
                </div>
                <h4 className="font-bold text-sm text-[#10261D] mb-1">Outdoor Freedom</h4>
                <p className="text-xs text-[#1F2421]/70">Wide lawns, fresh hill air, and natural views.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EFE9DD]">
                <div className="w-8 h-8 rounded-full bg-[#E08E45]/20 text-[#E08E45] flex items-center justify-center mb-2 font-bold">
                  🍲
                </div>
                <h4 className="font-bold text-sm text-[#10261D] mb-1">Authentic Food</h4>
                <p className="text-xs text-[#1F2421]/70">Hearty meals & charcoal-grilled delights.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EFE9DD]">
                <div className="w-8 h-8 rounded-full bg-[#E08E45]/20 text-[#E08E45] flex items-center justify-center mb-2 font-bold">
                  🎶
                </div>
                <h4 className="font-bold text-sm text-[#10261D] mb-1">Shared Joy</h4>
                <p className="text-xs text-[#1F2421]/70">Music, karaoke, games and family smiles.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
