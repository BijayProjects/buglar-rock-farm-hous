import React, { useState } from 'react';
import { Star, MessageSquare, ExternalLink, X, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/restaurantData';

export const SocialProof: React.FC = () => {
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-[#FDFAF5] text-[#1F2421] border-b border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#EFE9DD] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A382B]/10 text-[#1A382B] text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E08E45]" />
              Verified Guest Feedback
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#10261D]">
              Loved by the People Who Visit
            </h2>
          </div>

          {/* Rating Summary Box */}
          <div className="flex items-center gap-4 bg-[#10261D] text-[#FDFAF5] p-4 sm:p-5 rounded-2xl shadow-md border border-[#254F3D]">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#E08E45]">
              {BUSINESS_INFO.rating}★
            </div>
            <div>
              <div className="flex text-[#E08E45] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#EFE9DD]/80 font-medium">
                Based on <span className="text-[#E08E45] font-bold">{BUSINESS_INFO.reviewCount}</span> public Google reviews
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#EFE9DD] transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#E08E45]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#6E5038] bg-[#F9F6F0] px-2.5 py-1 rounded-full">
                    {review.visitType}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-[#1F2421]/90 italic mb-6 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-[#F9F6F0] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#10261D]">{review.author}</h4>
                  <span className="text-xs text-[#6E5038]">{review.location}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => setReviewsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#10261D] text-[#FDFAF5] font-semibold text-sm hover:bg-[#1A382B] transition-all shadow-md group"
          >
            <MessageSquare className="w-4 h-4 text-[#E08E45]" />
            <span>See All Guest Reviews & Ratings</span>
          </button>
        </div>
      </div>

      {/* Reviews Modal */}
      {reviewsModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex justify-center items-start sm:items-center min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setReviewsModalOpen(false);
            }
          }}
        >
          <div className="bg-[#FDFAF5] rounded-3xl max-w-2xl w-full shadow-2xl relative my-4 sm:my-8 border border-[#EFE9DD] overflow-hidden text-[#1F2421]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#10261D] text-[#FDFAF5] border-b border-[#254F3D] sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E08E45] text-[#10261D] flex items-center justify-center font-bold text-sm">
                  4.9★
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FDFAF5]">Google Verified Reviews</h3>
                  <p className="text-[11px] text-[#EFE9DD]/80">Buglay Rock Farm House • Lalitpur, Nepal</p>
                </div>
              </div>
              <button
                onClick={() => setReviewsModalOpen(false)}
                className="p-2 rounded-full bg-[#1A382B] text-[#FDFAF5] hover:bg-[#E08E45] hover:text-[#10261D] border border-[#254F3D] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[calc(85vh-75px)] overflow-y-auto">
              <p className="text-xs sm:text-sm text-[#1F2421]/80 mb-6 bg-white p-4 rounded-2xl border border-[#EFE9DD] leading-relaxed">
                Buglay Rock Farm House holds a public rating of <strong>4.9 / 5.0</strong> stars based on over 150+ visitor ratings on Google Maps. Guests frequently praise the serene mountain scenery, open garden space, charcoal grilled dishes, live acoustic music, and welcoming family atmosphere.
              </p>

              <div className="space-y-3.5 mb-8">
                {TESTIMONIALS.map((review) => (
                  <div key={review.id} className="p-4 rounded-2xl bg-white border border-[#EFE9DD] shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-sm text-[#10261D]">{review.author}</span>
                        <span className="text-xs text-[#6E5038] ml-2">({review.location})</span>
                      </div>
                      <div className="flex text-[#E08E45]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#1F2421]/90 italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#EFE9DD]">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-center text-sm hover:bg-[#C87D32] transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span>Read Live Reviews on Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setReviewsModalOpen(false)}
                  className="py-3 px-6 rounded-xl bg-[#EFE9DD] text-[#10261D] font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
