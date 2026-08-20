import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Testimonial } from '../types';
import { Star, Plus, Edit2, Trash2, CheckCircle2, X, MessageSquare, Quote } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState('Recently');
  const [comment, setComment] = useState('');
  const [visitType, setVisitType] = useState('Family Outing');

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingTest(null);
    setAuthor('');
    setLocation('Kathmandu');
    setRating(5);
    setDate('1 week ago');
    setComment('');
    setVisitType('Family Outing');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTest(t);
    setAuthor(t.author);
    setLocation(t.location || '');
    setRating(t.rating);
    setDate(t.date);
    setComment(t.comment);
    setVisitType(t.visitType);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const payload = {
      author,
      location,
      rating,
      date,
      comment,
      visitType,
      status: 'published' as const,
    };

    if (editingTest) {
      updateTestimonial(editingTest.id, payload);
      showNotice(`Review from "${author}" updated.`);
    } else {
      addTestimonial(payload);
      showNotice(`Review from "${author}" published.`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deleteTestimonial(id);
    showNotice(`Review from "${name}" deleted.`);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Customer Reviews & Testimonials</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border">
              {testimonials.length} Reviews
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Manage public guest feedback, ratings, visit types, and testimonials on the social proof section.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs sm:text-sm rounded shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Reviews Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-[#E08E45]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 font-medium text-gray-700">
                  {t.visitType}
                </span>
              </div>

              <p className="text-xs text-gray-700 italic leading-relaxed">
                "{t.comment}"
              </p>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div>
                  <strong className="text-[#1d2327]">{t.author}</strong>
                  {t.location && <span className="ml-1 text-gray-400">({t.location})</span>}
                </div>
                <span className="text-[11px]">{t.date}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dcdcde] flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(t)}
                className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-gray-300 text-xs font-medium text-[#2271b1] flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(t.id, t.author)}
                className="p-1 rounded hover:bg-red-50 text-[#d63638]"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-lg w-full border border-[#c3c4c7] shadow-2xl overflow-hidden">
            <div className="bg-[#1d2327] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {editingTest ? 'Edit Review' : 'Add Guest Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Author / Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Rohan Shrestha"
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Guest Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kathmandu / Patan"
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Star Rating (1-5) *
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1] bg-white"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Visit Type
                  </label>
                  <input
                    type="text"
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    placeholder="e.g. Family Outing"
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Timeframe / Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 2 weeks ago"
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Comment / Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did the customer say about their experience, food, and views..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              <div className="pt-4 border-t border-[#dcdcde] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow-sm transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
