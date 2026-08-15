import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Copy, Check, Car, Compass, Clock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const LocationSection: React.FC = () => {
  const { siteSettings } = useCMS();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${siteSettings.name}, ${siteSettings.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const travelGuides = [
    { from: 'Patan Durbar Square / Jawalakhel', time: '25–35 min', dist: '12 km', path: 'Via Godawari Road toward Lalitpur Hills' },
    { from: 'Kathmandu City / Thamel', time: '40–50 min', dist: '18 km', path: 'Via Ring Road / Satdobato toward Godawari' },
    { from: 'Godawari Botanical Garden', time: '10–15 min', dist: '4 km', path: 'Scenic drive along Godawari hill road' },
    { from: 'Lakuri Bhanjyang', time: '15–20 min', dist: '6 km', path: 'Downhill scenic route toward Lalitpur valley' },
  ];

  return (
    <section id="location" className="py-24 bg-[#FDFAF5] text-[#1F2421] relative overflow-hidden border-b border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A382B]/10 text-[#1A382B] text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#E08E45]" />
            Location & Access Guide
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#10261D] mb-4">
            Worth the Journey.
          </h2>
          <p className="text-base sm:text-lg text-[#1F2421]/80 font-light leading-relaxed">
            Located in the serene hills of {siteSettings.address} near Godawari, {siteSettings.name} is an easy 30-minute escape from Kathmandu valley's bustle.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Business Info & Direct Action */}
          <div className="lg:col-span-5 bg-[#10261D] text-[#FDFAF5] rounded-3xl p-8 border border-[#254F3D] shadow-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#254F3D] text-[#E08E45] text-xs font-semibold">
                Destination Address
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-[#FDFAF5] mb-2">
                  {siteSettings.name}
                </h3>
                <p className="text-sm text-[#EFE9DD]/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E08E45] shrink-0" />
                  <span>{siteSettings.address}</span>
                </p>
                <p className="text-xs text-[#E08E45] font-medium mt-1 ml-6">
                  {siteSettings.locationContext}
                </p>
              </div>

              <div className="pt-4 border-t border-[#254F3D] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#EFE9DD]/90">
                  <span className="font-medium text-[#EFE9DD]/70">Direct Phone:</span>
                  <a href={`tel:${siteSettings.phone}`} className="font-bold text-[#E08E45] hover:underline">
                    {siteSettings.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-[#EFE9DD]/90">
                  <span className="font-medium text-[#EFE9DD]/70">Rating:</span>
                  <span className="font-bold text-[#E08E45]">★ {siteSettings.rating} / 5 ({siteSettings.reviewCount} Reviews)</span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#EFE9DD]/90">
                  <span className="font-medium text-[#EFE9DD]/70">Parking:</span>
                  <span className="font-bold text-emerald-400">Free On-site Parking Available</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#254F3D]">
              <a
                href={siteSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#E08E45] text-[#10261D] font-bold text-sm hover:bg-[#C87D32] transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${siteSettings.phone}`}
                className="w-full py-3 px-4 rounded-2xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-sm hover:bg-[#336B53] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E08E45]" />
                <span>Call Restaurant Now</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="w-full py-2.5 px-4 rounded-2xl bg-transparent text-[#EFE9DD]/70 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Address Copied!' : 'Copy Full Address'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Travel Times & Interactive Map Box */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* Travel Times Guide */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE9DD] shadow-sm">
              <h4 className="font-serif font-bold text-xl text-[#10261D] mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-[#E08E45]" />
                <span>Estimated Driving Times</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {travelGuides.map((guide, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#EFE9DD]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#10261D]">{guide.from}</span>
                      <span className="text-xs font-bold text-[#E08E45] font-mono">{guide.time}</span>
                    </div>
                    <p className="text-[11px] text-[#6E5038]">{guide.path} ({guide.dist})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Styled Map Placeholder UI */}
            <div className="bg-[#10261D] rounded-3xl overflow-hidden border border-[#254F3D] shadow-xl relative min-h-[280px] flex flex-col items-center justify-center p-8 text-center">
              {/* Background Map Grid Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E08E45_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Pin */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#E08E45] text-[#10261D] flex items-center justify-center shadow-2xl mb-4 animate-bounce-subtle">
                <MapPin className="w-8 h-8" />
              </div>

              <div className="relative z-10 max-w-md space-y-2">
                <h4 className="font-serif font-bold text-2xl text-[#FDFAF5]">
                  {siteSettings.name} Pin
                </h4>
                <p className="text-xs text-[#EFE9DD]/80">
                  {siteSettings.address}, {siteSettings.locationContext}
                </p>
                <div className="pt-2">
                  <a
                    href={siteSettings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#254F3D] text-[#E08E45] hover:bg-[#E08E45] hover:text-[#10261D] text-xs font-bold transition-all border border-[#E08E45]/40"
                  >
                    <span>Launch GPS Navigation</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
