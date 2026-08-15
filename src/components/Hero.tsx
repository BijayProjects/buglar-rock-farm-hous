import React from 'react';
import { Star, MapPin, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

interface HeroProps {
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { siteSettings } = useCMS();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#10261D]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={siteSettings.images.hero}
          alt="Buglay Rock Farm House Atmosphere in Lalitpur"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10261D] via-[#10261D]/60 to-[#10261D]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#10261D]/30 to-[#10261D]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10261D]/80 border border-[#E08E45]/40 backdrop-blur-md mb-6 shadow-xl"
        >
          <div className="flex text-[#E08E45]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#FDFAF5]">
            ★ {siteSettings.rating} / 5 • {siteSettings.reviewCount} Guest Reviews
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#FDFAF5] tracking-tight leading-[1.08] mb-6 drop-shadow-md"
        >
          {siteSettings.heroHeadline}{' '}
          <span className="italic font-normal text-[#E08E45]">
            {siteSettings.heroHeadlineHighlight || 'Ordinary.'}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg sm:text-2xl text-[#EFE9DD]/90 font-light leading-relaxed mb-10 text-shadow"
        >
          {siteSettings.heroSubheadline}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14"
        >
          <a
            href="#experience"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E08E45] text-[#10261D] font-bold text-base hover:bg-[#C87D32] transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 group"
          >
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>Explore the Experience</span>
          </a>

          <a
            href="#location"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#254F3D]/80 hover:bg-[#254F3D] text-[#FDFAF5] font-semibold text-base border border-[#FDFAF5]/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5 text-[#E08E45]" />
            <span>Get Directions</span>
          </a>
        </motion.div>

        {/* Key Highlights Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-[#FDFAF5]/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center max-w-3xl mx-auto"
        >
          <div className="p-3 rounded-2xl bg-[#10261D]/50 border border-[#254F3D]/40 backdrop-blur-sm">
            <span className="block text-xl">🏔️</span>
            <span className="text-xs font-medium text-[#FDFAF5]">Hillside Escape</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#10261D]/50 border border-[#254F3D]/40 backdrop-blur-sm">
            <span className="block text-xl">🔥</span>
            <span className="text-xs font-medium text-[#FDFAF5]">Charcoal Sekuwa</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#10261D]/50 border border-[#254F3D]/40 backdrop-blur-sm">
            <span className="block text-xl">🎵</span>
            <span className="text-xs font-medium text-[#FDFAF5]">Live Music & Karaoke</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#10261D]/50 border border-[#254F3D]/40 backdrop-blur-sm">
            <span className="block text-xl">🌿</span>
            <span className="text-xs font-medium text-[#FDFAF5]">Outdoor Lawn & Games</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
