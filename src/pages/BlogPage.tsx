import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { useCMS } from '../context/CMSContext';
import { BlogPost } from '../types';
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  Tag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Search,
  Share2,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

interface BlogPageProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateHome,
  onOpenInquiry,
}) => {
  const { blogPosts, siteSettings } = useCMS();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Only show published articles on the client-facing website
  const publishedPosts = blogPosts.filter((p) => p.status === 'published');

  const categories = ['all', ...Array.from(new Set(publishedPosts.map((p) => p.category)))];

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedPost = blogPosts.find((p) => p.id === selectedPostId);

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1F2421]">
      {/* Top Banner */}
      <PageBanner
        badge="Journal & Stories"
        badgeIcon={BookOpen}
        title="Stories from Buglay Rock"
        subtitle="Explore culinary secrets, hillside trail guides, local farm harvests, and upcoming acoustic music nights."
        currentPageName="Blog & Stories"
        onNavigateHome={onNavigateHome}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* If viewing a single post detail */}
        {selectedPost ? (
          <article className="max-w-4xl mx-auto space-y-8">
            <button
              onClick={() => setSelectedPostId(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#254F3D] hover:text-[#E08E45] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Stories</span>
            </button>

            {/* Post Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E08E45]/15 text-[#9C5D1F] border border-[#E08E45]/30 uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.publishedAt}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#10261D] leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 pt-2 pb-4 border-b border-[#EFE9DD]">
                <div className="w-10 h-10 rounded-full bg-[#10261D] text-[#E08E45] font-bold flex items-center justify-center font-serif text-sm">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#10261D]">{selectedPost.author}</div>
                  <div className="text-xs text-gray-500">{selectedPost.authorRole || 'Editorial Contributor'}</div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {selectedPost.featuredImage && (
              <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EFE9DD] aspect-video">
                <img
                  src={selectedPost.featuredImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* ACF Highlights Section (Dynamic Custom Fields Display) */}
            {selectedPost.acfFields && selectedPost.acfFields.length > 0 && (
              <div className="p-6 sm:p-8 bg-[#FDFAF5] rounded-3xl border border-[#E08E45]/30 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E08E45]">
                  <Sparkles className="w-4 h-4" />
                  <span>Story Highlights & Custom Notes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedPost.acfFields.map((field) => (
                    <div key={field.key} className="p-4 bg-white rounded-2xl border border-[#EFE9DD]">
                      <span className="block text-xs font-semibold text-gray-500 uppercase">
                        {field.label}
                      </span>
                      <span className="block font-serif text-base font-bold text-[#10261D] mt-0.5">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Content Body */}
            <div className="prose prose-lg max-w-none text-[#1F2421]/90 font-light leading-relaxed text-base sm:text-lg whitespace-pre-line space-y-6">
              {selectedPost.content}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[#EFE9DD] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase mr-1">Tags:</span>
              {selectedPost.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs bg-white text-[#254F3D] border border-[#EFE9DD]"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="p-8 rounded-3xl bg-[#10261D] text-[#FDFAF5] text-center space-y-4 shadow-xl">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Experience Buglay Rock Farm House
              </h3>
              <p className="text-sm sm:text-base text-[#EFE9DD]/80 max-w-xl mx-auto font-light">
                Come for the peaceful nature, fresh organic flavours, acoustic melodies, and stunning Godawari hillside breezes.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onOpenInquiry}
                  className="px-6 py-3 rounded-full bg-[#E08E45] text-[#10261D] font-bold text-xs sm:text-sm hover:bg-[#C87D32] transition-colors"
                >
                  Plan Your Visit
                </button>
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="px-6 py-3 rounded-full bg-[#254F3D] text-[#FDFAF5] font-semibold text-xs sm:text-sm hover:bg-[#336B53] transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#E08E45]" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </article>
        ) : (
          /* Blog Grid & Directory */
          <div className="space-y-10">
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#EFE9DD] shadow-sm">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors capitalize ${
                      selectedCategory === cat
                        ? 'bg-[#10261D] text-[#E08E45]'
                        : 'bg-[#F9F6F0] text-[#1F2421]/70 hover:bg-[#EFE9DD]'
                    }`}
                  >
                    {cat === 'all' ? 'All Stories' : cat}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#EFE9DD] bg-[#F9F6F0] focus:bg-white outline-none focus:border-[#E08E45]"
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPostId(post.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#EFE9DD] hover:border-[#E08E45] shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer"
                >
                  {/* Card Thumbnail */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#10261D]/80 backdrop-blur-md text-[#E08E45] border border-[#E08E45]/30 uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#E08E45]" />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#E08E45]" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="font-serif text-xl font-bold text-[#10261D] group-hover:text-[#E08E45] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#1F2421]/75 line-clamp-3 font-light leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EFE9DD] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#10261D] text-[#E08E45] text-[10px] font-bold flex items-center justify-center">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{post.author}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#254F3D] group-hover:text-[#E08E45] group-hover:translate-x-1 transition-all">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="py-16 text-center text-gray-500 bg-white rounded-3xl border border-[#EFE9DD] p-8">
                <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="font-serif text-lg font-bold text-[#10261D]">No stories found</p>
                <p className="text-xs text-gray-500 mt-1">Try resetting your search or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
