import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { LocationSection } from '../components/LocationSection';
import { MapPin, Navigation, Car, Clock, ShieldCheck, Compass, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { ReservationInquiry } from '../components/ReservationInquiry';

interface LocationPageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  const visitorTips = [
    {
      title: 'Free Spacious On-Site Parking',
      desc: 'Dedicated parking space available for cars, SUVs, and motorcycles inside the farmhouse premises.',
      icon: Car,
    },
    {
      title: 'Scenic Hill Road Access',
      desc: 'Paved road connection leading up through the peaceful green hills of Lalitpur toward Godawari.',
      icon: Compass,
    },
    {
      title: '30–45 Mins from Valley Center',
      desc: 'Quick and picturesque escape from Kathmandu, Patan, and Satdobato without long highway fatigue.',
      icon: Clock,
    },
    {
      title: 'Nearby Hill Attractions',
      desc: 'Combine your visit with trips to Godawari Botanical Gardens, Phulchowki foothills, or Lakuri Bhanjyang.',
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#1F2421]">
      {/* Top Banner */}
      <PageBanner
        badge="Location & Directions"
        badgeIcon={MapPin}
        title="Find Your Way to Buglay Rock Farm House"
        subtitle="Located in Lalitpur 44709 near Godawari, our hillside sanctuary is an effortless 30-minute drive from the Kathmandu valley."
        currentPageName="Location"
        onNavigateHome={onNavigateHome}
      />

      {/* Main Location Section */}
      <LocationSection />

      {/* Road & Travel Tips */}
      <section className="py-20 bg-[#F9F6F0] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45] block mb-2">
              Visitor Information
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#10261D] mb-4">
              Planning Your Drive
            </h2>
            <p className="text-sm sm:text-base text-[#1F2421]/80 font-light">
              Helpful details for a smooth, relaxing drive up to the farmhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitorTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-[#EFE9DD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#10261D] text-[#E08E45] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#10261D] mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-[#1F2421]/75 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              );
            })}
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
