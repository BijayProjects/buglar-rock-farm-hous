import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { Story } from '../components/Story';
import { Info, Heart, Sun, Music2, ShieldCheck, MapPin, Sparkles, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

interface StoryPageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  const values = [
    {
      title: 'Tranquil Natural Setting',
      desc: 'Perched in the lush green foothills of Lalitpur near Godawari, offering clean mountain air and panoramic hillside views away from urban smog and traffic.',
      icon: Sun,
    },
    {
      title: 'Rock Spirit & Acoustic Soul',
      desc: 'Buglay Rock stands for genuine authenticity, soulful acoustic rhythms, rock-solid hospitality, and vibrant evening gatherings with acoustic jam sessions.',
      icon: Music2,
    },
    {
      title: 'Family & Community First',
      desc: 'A place where generations come together—parents relaxing with herbal tea, kids playing on open lawns, and friends laughing over charcoal Sekuwa.',
      icon: Heart,
    },
    {
      title: 'Local Farm Freshness',
      desc: 'Supporting local hillside agriculture and utilizing fresh local mountain spices for authentic, hearty Nepali farmhouse meals.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1F2421]">
      {/* Top Banner */}
      <PageBanner
        badge="Our Heritage & Philosophy"
        badgeIcon={Info}
        title="A Little Escape in the Hills"
        subtitle="Discover how a dream of rustic open-air dining, acoustic music, and tranquil hillside nature became Buglay Rock Farm House in Lalitpur."
        currentPageName="Story"
        onNavigateHome={onNavigateHome}
      />

      {/* Main Editorial Story Component */}
      <Story />

      {/* Deep-Dive Philosophy & Origins */}
      <section className="py-20 bg-[#FDFAF5] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45] block mb-2">
              Our Core Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#10261D] mb-4">
              What Defines Buglay Rock Farm House
            </h2>
            <p className="text-sm sm:text-base text-[#1F2421]/80 font-light">
              We built Buglay Rock Farm House on four foundational commitments to our guests and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-[#EFE9DD] hover:border-[#E08E45] shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#10261D] text-[#E08E45] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#10261D] mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#1F2421]/80 leading-relaxed font-light">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Founder's Invitation Section */}
      <section className="py-20 bg-[#10261D] text-[#FDFAF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#E08E45]/20 text-[#E08E45] flex items-center justify-center mx-auto text-2xl">
            ⛰️
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFAF5]">
            “We Invite You to Experience the Hillside Warmth”
          </h3>
          <p className="text-base sm:text-lg text-[#EFE9DD]/85 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you are visiting for a scenic weekend afternoon lunch, planning a birthday under festoon lights, or just taking a peaceful break from Kathmandu, we look forward to welcoming you to Buglay Rock Farm House.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E08E45] text-[#10261D] font-bold text-sm hover:bg-[#C87D32] transition-colors shadow-lg"
            >
              Plan Your Visit
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#254F3D] text-[#FDFAF5] font-semibold text-sm hover:bg-[#336B53] transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#E08E45]" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
