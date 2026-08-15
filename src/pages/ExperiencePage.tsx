import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { EXPERIENCES, BUSINESS_INFO } from '../data/restaurantData';
import { ExperienceItem } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, X, Phone, Music, Sun, Users, Flame, Coffee, Heart } from 'lucide-react';
import { ReservationInquiry } from '../components/ReservationInquiry';

interface ExperiencePageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  const amenities = [
    {
      icon: Sun,
      title: 'Open-Air Garden Seating',
      desc: 'Spacious lawn tables under natural pine canopies and hillside sunshine, perfect for quiet afternoon teas or family feasts.'
    },
    {
      icon: Flame,
      title: 'Charcoal BBQ & Bonfire',
      desc: 'Sizzling local Sekuwa barbecued over natural wood coals, with cozy evening bonfire circles under starlit skies.'
    },
    {
      icon: Music,
      title: 'Live Acoustic & Karaoke',
      desc: 'Weekend live unplugged music performances and dedicated high-fidelity karaoke audio systems for group celebrations.'
    },
    {
      icon: Users,
      title: 'Family & Kid Friendly',
      desc: 'Wide open lawns with safe grassy areas for children to play, group board games, and relaxing lounge spaces.'
    },
    {
      icon: Coffee,
      title: 'Fresh Hill Brews & Teas',
      desc: 'Locally sourced Himalayan tea blends, artisanal coffee, and refreshing beverages freshly prepared throughout the day.'
    },
    {
      icon: Heart,
      title: 'Attentive Farmhouse Hospitality',
      desc: 'Warm, personalized Nepali hospitality ensuring your family, friends, or corporate colleagues feel completely at home.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#10261D] text-[#FDFAF5]">
      {/* Top Banner */}
      <PageBanner
        badge="Farmhouse Experiences"
        badgeIcon={Sparkles}
        title="More Than a Meal. A Countryside Sanctuary."
        subtitle="At Buglay Rock Farm House, dining is just the beginning. Discover an open-air countryside haven in Lalitpur where fresh food, hill nature, music, and laughter unite."
        currentPageName="Experience"
        onNavigateHome={onNavigateHome}
      />

      {/* Main Experience Cards Grid */}
      <section className="py-20 bg-[#10261D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FDFAF5] mb-4">
              Signature Farmhouse Highlights
            </h2>
            <p className="text-sm sm:text-base text-[#EFE9DD]/80 font-light">
              Click on any experience below to learn more about what we offer for your visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp)}
                className="group cursor-pointer bg-[#1A382B]/90 rounded-3xl overflow-hidden border border-[#254F3D] hover:border-[#E08E45] transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Image Container with hover zoom */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A382B] via-transparent to-black/20" />
                  
                  {/* Badge Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#10261D]/80 backdrop-blur-md border border-[#E08E45]/40 text-xs font-semibold text-[#E08E45]">
                    {exp.subtitle}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#FDFAF5] mb-3 group-hover:text-[#E08E45] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-[#EFE9DD]/80 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div>
                    <div className="space-y-2 mb-6">
                      {exp.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#EFE9DD]/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E08E45] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Explore link */}
                    <div className="pt-4 border-t border-[#254F3D] flex items-center justify-between text-xs font-bold text-[#E08E45] group-hover:translate-x-1 transition-transform">
                      <span>View Full Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Amenities & Atmosphere Grid */}
      <section className="py-20 bg-[#0D1F17] border-y border-[#254F3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45] block mb-2">
              Every Little Detail
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FDFAF5]">
              Designed for Comfort & Togetherness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1A382B]/60 p-7 rounded-3xl border border-[#254F3D] hover:border-[#E08E45]/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#10261D] text-[#E08E45] border border-[#254F3D] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#FDFAF5] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EFE9DD]/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA on Experience Page */}
      <div className="py-16 bg-[#10261D]">
        <ReservationInquiry />
      </div>

      {/* Modal Detail for Experience */}
      {selectedExperience && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex justify-center items-start sm:items-center min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedExperience(null);
            }
          }}
        >
          <div className="bg-[#10261D] rounded-3xl max-w-2xl w-full border-2 border-[#254F3D] shadow-2xl overflow-hidden relative my-4 sm:my-8 text-[#FDFAF5]">
            <button
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#10261D]/90 text-[#FDFAF5] hover:bg-[#E08E45] hover:text-[#10261D] border border-[#254F3D] transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-72 relative">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10261D] via-[#10261D]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold text-[#E08E45] uppercase tracking-widest block mb-1 drop-shadow">
                  {selectedExperience.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFAF5] drop-shadow-md">
                  {selectedExperience.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-280px)] overflow-y-auto">
              <p className="text-sm sm:text-base text-[#EFE9DD]/90 leading-relaxed font-light">
                {selectedExperience.description}
              </p>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#E08E45] uppercase tracking-wider mb-3">
                  Key Highlights & Offerings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedExperience.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1A382B] border border-[#254F3D]">
                      <CheckCircle2 className="w-4 h-4 text-[#E08E45] shrink-0" />
                      <span className="text-xs font-medium text-[#FDFAF5]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#254F3D] flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-center text-sm hover:bg-[#C87D32] transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phoneDisplay} to Reserve</span>
                </a>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="py-3 px-6 rounded-xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-sm hover:bg-[#336B53] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
