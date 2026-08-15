import React, { useState } from 'react';
import { SAMPLE_MENU, BUSINESS_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { Utensils, Flame, Leaf, Sparkles, Info, Plus, Check, ShoppingBag, PhoneCall } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [wishlist, setWishlist] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'featured', label: '⭐ Featured Specials' },
    { id: 'starters', label: 'Starters & Grills' },
    { id: 'main', label: 'Main Courses' },
    { id: 'snacks', label: 'Snacks & Bites' },
    { id: 'drinks', label: 'Drinks & Teas' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const filteredItems = SAMPLE_MENU.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet =
      dietFilter === 'all' ||
      (dietFilter === 'veg' && item.isVegetarian) ||
      (dietFilter === 'nonveg' && !item.isVegetarian);
    return matchesCategory && matchesDiet;
  });

  const toggleWishlist = (item: MenuItem) => {
    const existingIndex = wishlist.findIndex((w) => w.item.id === item.id);
    if (existingIndex > -1) {
      setWishlist(wishlist.filter((w) => w.item.id !== item.id));
    } else {
      setWishlist([...wishlist, { item, qty: 1 }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setWishlist(
      wishlist
        .map((w) => {
          if (w.item.id === id) {
            const newQty = w.qty + delta;
            return newQty > 0 ? { ...w, qty: newQty } : null;
          }
          return w;
        })
        .filter(Boolean) as { item: MenuItem; qty: number }[]
    );
  };

  const totalEstimate = wishlist.reduce((acc, curr) => acc + curr.item.priceNpr * curr.qty, 0);

  return (
    <section id="menu" className="py-24 bg-[#10261D] text-[#FDFAF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#254F3D] text-[#E08E45] text-xs font-bold uppercase tracking-widest mb-3 border border-[#E08E45]/30">
              <Utensils className="w-3.5 h-3.5" />
              Digital Farmhouse Menu
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FDFAF5]">
              Come Hungry.
            </h2>
            <p className="text-sm sm:text-base text-[#EFE9DD]/80 font-light mt-2 max-w-xl">
              From sizzled charcoal Sekuwa to fresh hill teas and organic salads, explore authentic farmhouse flavours prepared with local mountain spices.
            </p>
          </div>

          {/* Group Bill / Wishlist Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative px-5 py-3 rounded-2xl bg-[#E08E45] text-[#10261D] font-bold text-sm hover:bg-[#C87D32] transition-colors shadow-lg flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Group Meal Wishlist ({wishlist.length})</span>
              {totalEstimate > 0 && (
                <span className="bg-[#10261D] text-[#FDFAF5] px-2 py-0.5 rounded-md text-xs font-mono ml-1">
                  NPR {totalEstimate}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Tabs & Diet Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#254F3D]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#E08E45] text-[#10261D] shadow-md'
                    : 'bg-[#1A382B] text-[#EFE9DD] hover:bg-[#254F3D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Diet Toggle */}
          <div className="flex items-center gap-1.5 bg-[#1A382B] p-1 rounded-full border border-[#254F3D] self-start lg:self-auto">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                dietFilter === 'all' ? 'bg-[#254F3D] text-white shadow' : 'text-[#EFE9DD]/70'
              }`}
            >
              All Diets
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                dietFilter === 'veg' ? 'bg-emerald-800 text-emerald-100 shadow' : 'text-emerald-400'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietFilter('nonveg')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                dietFilter === 'nonveg' ? 'bg-amber-900 text-amber-100 shadow' : 'text-amber-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => {
            const inWishlist = wishlist.some((w) => w.item.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-[#1A382B] rounded-2xl p-5 border border-[#254F3D] hover:border-[#E08E45]/50 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  {/* Image thumbnail if present */}
                  {item.image && (
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.isVegetarian ? (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-400 text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1">
                            <Leaf className="w-3 h-3" /> VEG
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-amber-950/90 text-amber-400 text-[10px] font-bold border border-amber-500/40 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> NON-VEG
                          </span>
                        )}
                        {item.spicyLevel && item.spicyLevel > 0 ? (
                          <span className="px-2 py-1 rounded-md bg-red-950/90 text-red-400 text-[10px] font-bold border border-red-500/40">
                            {'🌶️'.repeat(item.spicyLevel)}
                          </span>
                        ) : null}
                      </div>

                      {item.isPopular && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#E08E45] text-[#10261D] text-[10px] font-bold shadow-md">
                          Popular
                        </span>
                      )}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif font-bold text-lg text-[#FDFAF5] group-hover:text-[#E08E45] transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-[#E08E45] font-mono">
                        NPR {item.priceNpr}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#EFE9DD]/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-[#254F3D] flex items-center justify-between">
                  <span className="text-[10px] text-[#E08E45]/80 font-mono italic">
                    Sample Dish
                  </span>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      inWishlist
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#254F3D] text-[#FDFAF5] hover:bg-[#E08E45] hover:text-[#10261D]'
                    }`}
                  >
                    {inWishlist ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Wishlist</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Menu Call to Action */}
        <div className="text-center bg-[#1A382B] rounded-3xl p-8 border border-[#254F3D] max-w-3xl mx-auto shadow-xl">
          <h3 className="font-serif text-2xl font-bold text-[#FDFAF5] mb-2">
            Planning a Group Meal or Special BBQ Feast?
          </h3>
          <p className="text-sm text-[#EFE9DD]/80 mb-6">
            Call our team directly to customize family platters, barbecue feasts, or custom dietary requests for your group visit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E08E45] text-[#10261D] font-bold text-sm hover:bg-[#C87D32] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +977 9801000007</span>
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#254F3D] text-[#FDFAF5] font-semibold text-sm hover:bg-[#336B53] transition-colors text-center border border-[#E08E45]/30"
            >
              Send Visit Inquiry
            </a>
          </div>
        </div>
      </div>

      {/* Wishlist Drawer / Modal */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#10261D] rounded-3xl max-w-lg w-full p-6 border border-[#254F3D] shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#254F3D] mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E08E45]" />
                <h3 className="font-serif text-xl font-bold text-[#FDFAF5]">
                  Group Meal Estimator
                </h3>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-1 rounded-lg text-[#FDFAF5]/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-[#EFE9DD]/70 mb-4">
                  Your wishlist is empty. Select sample dishes from the menu to estimate your group meal budget!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-1">
                {wishlist.map(({ item, qty }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#1A382B] border border-[#254F3D]"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#FDFAF5]">{item.name}</h4>
                      <span className="text-xs text-[#E08E45] font-mono">
                        NPR {item.priceNpr * qty} (NPR {item.priceNpr} ea)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#10261D] px-2 py-1 rounded-lg border border-[#254F3D]">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="text-sm font-bold text-[#FDFAF5] px-2 hover:text-[#E08E45]"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-[#E08E45]">{qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="text-sm font-bold text-[#FDFAF5] px-2 hover:text-[#E08E45]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {wishlist.length > 0 && (
              <div className="p-4 rounded-xl bg-[#1A382B] border border-[#254F3D] mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-[#EFE9DD]">Estimated Total:</span>
                <span className="text-xl font-bold font-mono text-[#E08E45]">
                  NPR {totalEstimate}
                </span>
              </div>
            )}

            <div className="space-y-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-3 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-center block text-sm shadow-md"
              >
                Call Restaurant to Reserve & Pre-Order
              </a>
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-xs text-center"
              >
                Close Estimator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
