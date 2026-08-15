import React from 'react';
import { Calendar, Users, Music, PartyPopper, Heart, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

interface EventsSectionProps {
  onOpenInquiry: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenInquiry }) => {
  const eventCategories = [
    {
      title: 'Family Gatherings',
      icon: Users,
      desc: 'Spacious outdoor lawn tables where multi-generational families can dine, relax, and reconnect in fresh mountain air.',
      tag: 'Weekend Favorite'
    },
    {
      title: 'Birthdays & Anniversaries',
      icon: PartyPopper,
      desc: 'Celebrate your special milestone with customized group outdoor seating, karaoke setups, and barbecue platters.',
      tag: 'Festive Vibes'
    },
    {
      title: 'Private Celebrations',
      icon: Heart,
      desc: 'Reserve dedicated pavilions or garden sections for intimate reunions, engagement dinners, and milestone parties.',
      tag: 'Reserved Areas'
    },
    {
      title: 'Group & Office Outings',
      icon: Sparkles,
      desc: 'Escape the office for team-building lunches, outdoor lawn games, open-air dining, and evening bonfire acoustic sessions.',
      tag: 'Team Building'
    },
    {
      title: 'Live Music Nights',
      icon: Music,
      desc: 'Soak in the acoustic melodies of local Nepalese musicians playing under festoon lights as twilight settles.',
      tag: 'Acoustic Jam'
    },
    {
      title: 'Seasonal Celebrations',
      icon: Calendar,
      desc: 'Special festive gatherings for Dashain, Tihar, New Year, and seasonal holidays with traditional feast arrangements.',
      tag: 'Festive Holidays'
    }
  ];

  return (
    <section id="events" className="py-24 bg-[#FDFAF5] text-[#1F2421] relative overflow-hidden border-b border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A382B]/10 text-[#1A382B] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E08E45]" />
            Gatherings & Special Occasions
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#10261D] mb-6">
            Make It a Memory.
          </h2>
          <p className="text-base sm:text-lg text-[#1F2421]/80 font-light leading-relaxed">
            Whether you are hosting a lively birthday bash, a relaxed family weekend, or an office outing, Buglay Rock Farm House offers open skies and cozy spaces tailored for togetherness.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {eventCategories.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#EFE9DD] hover:border-[#E08E45] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#10261D] text-[#E08E45] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#F9F6F0] text-[#6E5038]">
                      {evt.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#10261D] mb-3 group-hover:text-[#E08E45] transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-[#1F2421]/80 leading-relaxed mb-6">
                    {evt.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F9F6F0]">
                  <button
                    onClick={onOpenInquiry}
                    className="text-xs font-bold text-[#1A382B] hover:text-[#E08E45] transition-colors flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inquire for Group Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big CTA Banner */}
        <div className="bg-[#10261D] rounded-3xl p-8 sm:p-12 text-[#FDFAF5] relative overflow-hidden shadow-2xl border border-[#254F3D]">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45]">
              Plan Your Countryside Visit
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Ready to Host Your Next Gathering in Lalitpur?
            </h3>
            <p className="text-sm sm:text-base text-[#EFE9DD]/80 font-light leading-relaxed">
              Inquire ahead for weekend group reservations, custom seating, and karaoke arrangements. Our team is ready to assist you.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E08E45] text-[#10261D] font-bold text-base hover:bg-[#C87D32] transition-colors shadow-lg"
              >
                Plan Your Visit / Send Inquiry
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#254F3D] text-[#FDFAF5] font-semibold text-base hover:bg-[#336B53] transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#E08E45]" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
