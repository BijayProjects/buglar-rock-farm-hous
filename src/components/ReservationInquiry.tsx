import React, { useState } from 'react';
import { Phone, Navigation, Send, CheckCircle2, Clock, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { InquiryFormData } from '../types';

interface ReservationInquiryProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const ReservationInquiry: React.FC<ReservationInquiryProps> = ({
  isOpenModal,
  onCloseModal,
}) => {
  const { siteSettings, addInquiry } = useCMS();
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    visitDate: '',
    guestCount: 2,
    preferredSection: 'Outdoor Garden Lawn',
    occasion: 'Casual Dining & Chill',
    specialNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry(formData);
    setSubmitted(true);
  };

  // Shared Form Fields
  const renderFormFields = () => (
    <>
      {submitted ? (
        <div className="bg-[#1A382B] rounded-2xl p-6 sm:p-8 border border-[#E08E45]/40 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E08E45]/20 text-[#E08E45] flex items-center justify-center mx-auto text-2xl font-bold">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFAF5]">
            Inquiry Received!
          </h3>
          <p className="text-xs sm:text-sm text-[#EFE9DD]/80 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{formData.fullName}</strong>. Our team at {siteSettings.name} will call your phone (<span className="text-[#E08E45] font-semibold">{formData.phone}</span>) shortly to confirm your table for <strong className="text-white">{formData.visitDate || 'your requested date'}</strong>.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${siteSettings.phone}`}
              className="px-5 py-2.5 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-xs sm:text-sm hover:bg-[#C87D32] transition-colors shadow"
            >
              Call {siteSettings.phoneDisplay}
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-xs sm:text-sm hover:bg-[#336B53] transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Inputs Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Anish Maharjan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A382B] border border-[#254F3D] text-white placeholder-gray-400 focus:outline-none focus:border-[#E08E45] text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
                Phone Number (Nepal) *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +977 9800000000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A382B] border border-[#254F3D] text-white placeholder-gray-400 focus:outline-none focus:border-[#E08E45] text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Inputs Row 2: Date, Guests, Occasion */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
                Visit Date *
              </label>
              <input
                type="date"
                required
                value={formData.visitDate}
                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A382B] border border-[#254F3D] text-white focus:outline-none focus:border-[#E08E45] text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
                Number of Guests *
              </label>
              <select
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A382B] border border-[#254F3D] text-white focus:outline-none focus:border-[#E08E45] text-xs sm:text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30].map((num) => (
                  <option key={num} value={num} className="bg-[#10261D]">
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
                Occasion / Type
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A382B] border border-[#254F3D] text-white focus:outline-none focus:border-[#E08E45] text-xs sm:text-sm"
              >
                <option value="Casual Dining & Chill" className="bg-[#10261D]">Casual Dining & Chill</option>
                <option value="Family Gathering" className="bg-[#10261D]">Family Gathering</option>
                <option value="Birthday Celebration" className="bg-[#10261D]">Birthday Celebration</option>
                <option value="Group / Office Outing" className="bg-[#10261D]">Group / Office Outing</option>
                <option value="Anniversary / Date Night" className="bg-[#10261D]">Anniversary / Date Night</option>
              </select>
            </div>
          </div>

          {/* Preferred Seating Section */}
          <div>
            <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
              Preferred Seating Area
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {['Outdoor Garden Lawn', 'Indoor Farmhouse Pavilion', 'Private Group Area'].map((sec) => (
                <button
                  type="button"
                  key={sec}
                  onClick={() => setFormData({ ...formData, preferredSection: sec })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    formData.preferredSection === sec
                      ? 'bg-[#E08E45] text-[#10261D] border-[#E08E45] shadow-sm'
                      : 'bg-[#1A382B] text-[#EFE9DD]/80 border-[#254F3D] hover:bg-[#254F3D]'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-[11px] font-bold text-[#EFE9DD] uppercase tracking-wider mb-1.5">
              Special Requests (Karaoke, Charcoal Sekuwa Pre-Order, Cake, etc.)
            </label>
            <textarea
              rows={2}
              value={formData.specialNotes}
              onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
              placeholder="Tell us if you need karaoke, dietary needs, or birthday decorations..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A382B] border border-[#254F3D] text-white placeholder-gray-400 focus:outline-none focus:border-[#E08E45] text-xs sm:text-sm resize-none"
            />
          </div>

          {/* Info Notice */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1A382B]/70 border border-[#254F3D] text-[11px] text-[#EFE9DD]/80">
            <Clock className="w-3.5 h-3.5 text-[#E08E45] shrink-0" />
            <span>Table availability will be confirmed quickly via phone call.</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-sm sm:text-base hover:bg-[#C87D32] transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Visit Inquiry</span>
          </button>
        </form>
      )}
    </>
  );

  // If rendered as Modal Popup (e.g. from "Plan a Visit" button)
  if (isOpenModal) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-5 flex justify-center items-start sm:items-center min-h-screen"
        onClick={(e) => {
          if (e.target === e.currentTarget && onCloseModal) {
            onCloseModal();
          }
        }}
      >
        <div className="max-w-2xl w-full my-3 sm:my-6 relative bg-[#10261D] rounded-2xl sm:rounded-3xl border-2 border-[#254F3D] shadow-2xl overflow-hidden text-[#FDFAF5] flex flex-col max-h-[92vh]">
          {/* Fixed Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-[#254F3D] bg-[#1A382B] shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E08E45]"></span>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#FDFAF5]">
                  Plan Your Visit
                </h3>
                <p className="text-[11px] text-[#EFE9DD]/70">Buglay Rock Farm House • Lalitpur</p>
              </div>
            </div>
            <button
              onClick={onCloseModal}
              className="p-1.5 sm:p-2 rounded-xl bg-[#10261D] text-[#FDFAF5] hover:bg-[#E08E45] hover:text-[#10261D] border border-[#254F3D] transition-colors flex items-center justify-center shadow"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Scrollable Modal Body */}
          <div className="p-4 sm:p-6 md:p-7 overflow-y-auto flex-1">
            <div className="mb-4 text-xs text-[#EFE9DD]/80">
              For instant same-day table reservation, call us directly at{' '}
              <a href={`tel:${siteSettings.phone}`} className="text-[#E08E45] font-bold underline">
                {siteSettings.phoneDisplay}
              </a>
            </div>
            {renderFormFields()}
          </div>
        </div>
      </div>
    );
  }

  // Regular Page Section (at the bottom of the page)
  return (
    <section id="contact" className="py-20 bg-[#10261D] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10261D] rounded-3xl p-6 sm:p-10 border border-[#254F3D] shadow-2xl text-[#FDFAF5]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08E45] block mb-2">
              Direct Booking Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FDFAF5] mb-3">
              Ready for a Little Escape?
            </h2>
            <p className="text-sm text-[#EFE9DD]/80 font-light">
              Fill out your visit details below. For instant same-day table confirmation, please call us directly at{' '}
              <a href={`tel:${siteSettings.phone}`} className="text-[#E08E45] font-bold underline">
                {siteSettings.phoneDisplay}
              </a>
              .
            </p>
          </div>

          {renderFormFields()}

          {/* Quick Contact Buttons Row */}
          <div className="mt-8 pt-6 border-t border-[#254F3D] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`tel:${siteSettings.phone}`}
              className="p-4 rounded-2xl bg-[#1A382B] border border-[#254F3D] hover:border-[#E08E45] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E08E45]" />
                <div>
                  <span className="block text-xs text-[#EFE9DD]/70">Call Restaurant Directly</span>
                  <span className="font-bold text-sm text-[#FDFAF5]">{siteSettings.phoneDisplay}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#E08E45]">Call Now →</span>
            </a>

            <a
              href={siteSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#1A382B] border border-[#254F3D] hover:border-[#E08E45] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-[#E08E45]" />
                <div>
                  <span className="block text-xs text-[#EFE9DD]/70">Get GPS Directions</span>
                  <span className="font-bold text-sm text-[#FDFAF5]">{siteSettings.address}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#E08E45]">Map →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
