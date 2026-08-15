import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { EventsSection } from '../components/EventsSection';
import { Calendar, Users, Music, PartyPopper, CheckCircle2, Clock, PhoneCall, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { ReservationInquiry } from '../components/ReservationInquiry';

interface EventsPageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  const packages = [
    {
      name: 'Family & Group Feast',
      capacity: '8 to 30 Guests',
      ideal: 'Birthdays, Family Weekends, Anniversaries',
      features: [
        'Reserved outdoor lawn tables with scenic hill view',
        'Custom sharing platters & charcoal Sekuwa',
        'Complimentary sound system / background music',
        'Dedicated server team',
      ],
      recommended: false,
    },
    {
      name: 'Celebration & Karaoke Night',
      capacity: '15 to 50 Guests',
      ideal: 'Milestone Birthdays, Reunions, Festive Parties',
      features: [
        'Dedicated pavilion area with evening festoon lights',
        'High-definition Karaoke audio setup with dual mics',
        'Barbecue grill station & beverage service',
        'Cozy evening bonfire arrangement',
      ],
      recommended: true,
    },
    {
      name: 'Corporate & Team Retreat',
      capacity: '20 to 100+ Guests',
      ideal: 'Company Offsites, Team Lunches, Private Buyouts',
      features: [
        'Full or partial lawn reservation for team activities',
        'Buffet lunch & afternoon tea/snacks package',
        'Free spacious vehicle parking on-site',
        'Flexible schedule & tailored dining plans',
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#1F2421]">
      {/* Top Banner */}
      <PageBanner
        badge="Events & Celebrations"
        badgeIcon={Calendar}
        title="Make Every Gathering an Unforgettable Memory"
        subtitle="Host your next birthday, family reunion, corporate team lunch, or acoustic bonfire night amid the tranquil hills of Lalitpur."
        currentPageName="Events"
        onNavigateHome={onNavigateHome}
      />

      {/* Events Feature Section */}
      <EventsSection onOpenInquiry={onOpenInquiry} />

      {/* Group Event Packages Breakdown */}
      <section className="py-20 bg-[#F9F6F0] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45] block mb-2">
              Tailored Arrangements
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#10261D] mb-4">
              Event Package Options
            </h2>
            <p className="text-sm sm:text-base text-[#1F2421]/80 font-light">
              We customize menus, seating arrangements, and entertainment to match your group size and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 transition-all flex flex-col justify-between ${
                  pkg.recommended
                    ? 'bg-[#10261D] text-[#FDFAF5] border-2 border-[#E08E45] shadow-2xl scale-105 lg:-translate-y-2'
                    : 'bg-white text-[#1F2421] border border-[#EFE9DD] shadow-md'
                }`}
              >
                <div>
                  {pkg.recommended && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E08E45] text-[#10261D] text-xs font-bold uppercase tracking-wider mb-4">
                      <Sparkles className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <h3
                    className={`font-serif text-2xl font-bold mb-2 ${
                      pkg.recommended ? 'text-[#FDFAF5]' : 'text-[#10261D]'
                    }`}
                  >
                    {pkg.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold">
                    <Users
                      className={`w-4 h-4 ${
                        pkg.recommended ? 'text-[#E08E45]' : 'text-[#E08E45]'
                      }`}
                    />
                    <span className={pkg.recommended ? 'text-[#E08E45]' : 'text-[#6E5038]'}>
                      Capacity: {pkg.capacity}
                    </span>
                  </div>

                  <p
                    className={`text-xs mb-6 leading-relaxed ${
                      pkg.recommended ? 'text-[#EFE9DD]/80' : 'text-[#1F2421]/70'
                    }`}
                  >
                    <strong>Ideal for:</strong> {pkg.ideal}
                  </p>

                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#E08E45] shrink-0 mt-0.5" />
                        <span
                          className={
                            pkg.recommended ? 'text-[#EFE9DD]/90' : 'text-[#1F2421]/80'
                          }
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={onOpenInquiry}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors text-center shadow ${
                      pkg.recommended
                        ? 'bg-[#E08E45] text-[#10261D] hover:bg-[#C87D32]'
                        : 'bg-[#10261D] text-[#FDFAF5] hover:bg-[#254F3D]'
                    }`}
                  >
                    Inquire for this Package
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Direct Booking Form Section */}
      <div className="bg-[#10261D] text-[#FDFAF5]">
        <ReservationInquiry />
      </div>
    </div>
  );
};
