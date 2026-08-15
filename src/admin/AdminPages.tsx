import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageItem, BlogPost, CustomField } from '../types';
import { ImageUploadField } from './components/ImageUploadField';
import { DraggableAcfFieldGroup } from './components/DraggableAcfFieldGroup';
import {
  FileText,
  BookOpen,
  Plus,
  Trash2,
  Save,
  Edit3,
  Copy,
  ExternalLink,
  CheckCircle2,
  Search,
  Filter,
  Layers,
  Sparkles,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Settings2,
  HelpCircle,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';

export const AdminPages: React.FC = () => {
  const {
    pages,
    blogPosts,
    updatePage,
    addPage,
    deletePage,
    updatePageAcfField,
    addPageAcfField,
    deletePageAcfField,
    reorderPageAcfFields,
    setPageAcfFields,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    duplicateBlogPost,
    updateBlogPostAcfField,
    addBlogPostAcfField,
    deleteBlogPostAcfField,
    reorderBlogPostAcfFields,
    setBlogPostAcfFields,
  } = useCMS();

  // Active Main Tab: 'pages' | 'blog'
  const [activeMainTab, setActiveMainTab] = useState<'pages' | 'blog'>('pages');

  // Page Editing State
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [pageSearchQuery, setPageSearchQuery] = useState('');
  const [pageStatusFilter, setPageStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Blog Editing State
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');

  // New ACF Field Modal/Row State for Page
  const [newPageFieldKey, setNewPageFieldKey] = useState('');
  const [newPageFieldLabel, setNewPageFieldLabel] = useState('');
  const [newPageFieldType, setNewPageFieldType] = useState<CustomField['type']>('text');
  const [newPageFieldDesc, setNewPageFieldDesc] = useState('');
  const [showAddPageField, setShowAddPageField] = useState(false);

  // New ACF Field Modal/Row State for Post
  const [newPostFieldKey, setNewPostFieldKey] = useState('');
  const [newPostFieldLabel, setNewPostFieldLabel] = useState('');
  const [newPostFieldType, setNewPostFieldType] = useState<CustomField['type']>('text');
  const [showAddPostField, setShowAddPostField] = useState(false);

  // New Page Modal State
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageSubtitle, setNewPageSubtitle] = useState('');

  // Notification Banner
  const [notice, setNotice] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // Currently Selected Page
  const selectedPage = pages.find((p) => p.id === selectedPageId);
  // Currently Selected Post
  const selectedPost = blogPosts.find((p) => p.id === selectedPostId);

  // Filtered Pages
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(pageSearchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(pageSearchQuery.toLowerCase()) ||
      page.navLabel.toLowerCase().includes(pageSearchQuery.toLowerCase());
    const matchesStatus = pageStatusFilter === 'all' || page.status === pageStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(postSearchQuery.toLowerCase()));
    const matchesCat = postCategoryFilter === 'all' || post.category === postCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Unique Categories from Blog Posts
  const availableCategories = Array.from(new Set(blogPosts.map((p) => p.category)));

  // Handlers for Page Creation
  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;

    const formattedSlug = newPageSlug.trim()
      ? (newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`)
      : `/${newPageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const created = addPage({
      title: newPageTitle.trim(),
      slug: formattedSlug,
      navLabel: newPageTitle.trim(),
      subtitle: newPageSubtitle.trim() || 'Buglay Rock Farm House Sanctuary',
      bannerImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      metaDescription: `Discover ${newPageTitle} at Buglay Rock Farm House.`,
      status: 'published',
      lastModified: new Date().toISOString().split('T')[0],
      template: 'standard',
      acfFields: [
        { key: 'section_header', label: 'Section Header Title', type: 'text', value: newPageTitle, description: 'Display title' },
        { key: 'main_content_body', label: 'Main Content Body', type: 'textarea', value: 'Welcome to this custom page.', description: 'Body text' },
        { key: 'featured_highlight', label: 'Featured Highlight', type: 'text', value: 'Special Farmhouse Experience', description: 'Callout text' }
      ]
    });

    setNewPageTitle('');
    setNewPageSlug('');
    setNewPageSubtitle('');
    setShowNewPageModal(false);
    setSelectedPageId(created.id);
    showNotice(`Page "${created.title}" created successfully with ACF fields!`);
  };

  // Handlers for Blog Creation
  const handleCreateNewBlogPost = () => {
    const created = addBlogPost({
      title: 'New Farmhouse Story & Journal Entry',
      slug: `farmhouse-story-${Date.now().toString().slice(-4)}`,
      excerpt: 'A brief summary of what makes this story special for our guests and travellers.',
      content: 'Write the full narrative of your article here. You can add paragraphs, insights, and stories about food, farm life, and music.',
      featuredImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      category: 'Farm Life',
      author: 'Farmhouse Admin',
      authorRole: 'Editorial Team',
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      status: 'draft',
      tags: ['Farmhouse', 'Lalitpur', 'Nature'],
      acfFields: [
        { key: 'highlight_quote', label: 'Story Quote', type: 'text', value: 'Nature is the best recipe for peaceful living.' },
        { key: 'recommended_season', label: 'Best Season to Visit', type: 'text', value: 'All Year Round' }
      ]
    });
    setSelectedPostId(created.id);
    showNotice('New draft blog post created! Customize content and ACF fields below.');
  };

  // Add ACF Field to Selected Page
  const handleAddPageAcfField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPageId || !newPageFieldKey.trim() || !newPageFieldLabel.trim()) return;

    const formattedKey = newPageFieldKey
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_');

    addPageAcfField(selectedPageId, {
      key: formattedKey,
      label: newPageFieldLabel.trim(),
      type: newPageFieldType,
      value: '',
      description: newPageFieldDesc.trim() || undefined
    });

    setNewPageFieldKey('');
    setNewPageFieldLabel('');
    setNewPageFieldDesc('');
    setShowAddPageField(false);
    showNotice(`Custom ACF Field "${newPageFieldLabel}" added to page!`);
  };

  // Add ACF Field to Selected Post
  const handleAddPostAcfField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId || !newPostFieldKey.trim() || !newPostFieldLabel.trim()) return;

    const formattedKey = newPostFieldKey
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_');

    addBlogPostAcfField(selectedPostId, {
      key: formattedKey,
      label: newPostFieldLabel.trim(),
      type: newPostFieldType,
      value: '',
    });

    setNewPostFieldKey('');
    setNewPostFieldLabel('');
    setShowAddPostField(false);
    showNotice(`Custom ACF Field "${newPostFieldLabel}" added to post!`);
  };

  return (
    <div className="space-y-6 font-sans antialiased text-[#2c3338]">
      {/* 1. Top Header & Tab Navigation (Pages vs Blog Posts) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-300">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1d2327] font-serif">
              Pages & Content Management
            </h1>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#E08E45]/15 text-[#9C5D1F] border border-[#E08E45]/30">
              WordPress ACF Engine
            </span>
          </div>
          <p className="text-xs text-gray-600 font-light mt-1">
            Dynamic lists and WordPress Advanced Custom Fields (ACF) editor for all available pages and blog posts.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          {activeMainTab === 'pages' ? (
            <button
              onClick={() => setShowNewPageModal(true)}
              className="px-3.5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs rounded shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Page</span>
            </button>
          ) : (
            <button
              onClick={handleCreateNewBlogPost}
              className="px-3.5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs rounded shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Post</span>
            </button>
          )}
        </div>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded shadow-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* 2. Top Segmented Navigation Tabs: [All Pages (8)] | [All Blog Posts (4)] */}
      <div className="flex items-center gap-2 border-b border-gray-300">
        <button
          onClick={() => {
            setActiveMainTab('pages');
            setSelectedPageId(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeMainTab === 'pages'
              ? 'border-[#2271b1] text-[#2271b1] bg-white rounded-t'
              : 'border-transparent text-gray-600 hover:text-[#1d2327]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>All Pages</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gray-200 text-gray-700 font-semibold">
            {pages.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveMainTab('blog');
            setSelectedPostId(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeMainTab === 'blog'
              ? 'border-[#2271b1] text-[#2271b1] bg-white rounded-t'
              : 'border-transparent text-gray-600 hover:text-[#1d2327]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Blog Articles & Posts</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gray-200 text-gray-700 font-semibold">
            {blogPosts.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ========================== SECTION 1: PAGES TAB ========================= */}
      {/* ========================================================================= */}
      {activeMainTab === 'pages' && (
        <>
          {/* A. PAGES LIST VIEW (When no specific page is being edited) */}
          {!selectedPageId && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="bg-white p-3.5 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={pageSearchQuery}
                      onChange={(e) => setPageSearchQuery(e.target.value)}
                      placeholder="Search pages by title, slug or nav label..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#8c8f94] rounded bg-gray-50 focus:bg-white outline-none focus:border-[#2271b1]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 font-medium">Status:</span>
                  <select
                    value={pageStatusFilter}
                    onChange={(e) => setPageStatusFilter(e.target.value as any)}
                    className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white outline-none"
                  >
                    <option value="all">All Statuses ({pages.length})</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                  </select>
                </div>
              </div>

              {/* WordPress Pages Table */}
              <div className="bg-white rounded-lg border border-[#c3c4c7] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#50575e] font-semibold">
                        <th className="py-3 px-4">Page Title & Slug</th>
                        <th className="py-3 px-3">Template</th>
                        <th className="py-3 px-3">ACF Custom Fields</th>
                        <th className="py-3 px-3">Nav Label</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Modified</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      {filteredPages.map((page) => (
                        <tr
                          key={page.id}
                          className="hover:bg-[#f6f7f7] transition-colors group"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#2271b1] hover:underline cursor-pointer flex items-center gap-1.5"
                                 onClick={() => setSelectedPageId(page.id)}>
                              <span>{page.title}</span>
                              {page.id === 'home' && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">
                                  Front Page
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                              Permalink: {page.slug}
                            </div>
                            {/* WordPress Quick Action Links on Hover */}
                            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#2271b1]">
                              <button
                                onClick={() => setSelectedPageId(page.id)}
                                className="hover:underline font-semibold flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit ACF Fields</span>
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={() => {
                                  updatePage(page.id, {
                                    status: page.status === 'published' ? 'draft' : 'published',
                                  });
                                  showNotice(`Status updated to ${page.status === 'published' ? 'Draft' : 'Published'}`);
                                }}
                                className="hover:underline text-gray-600"
                              >
                                {page.status === 'published' ? 'Unpublish' : 'Publish'}
                              </button>
                              {page.id !== 'home' && (
                                <>
                                  <span className="text-gray-300">|</span>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete page "${page.title}"?`)) {
                                        deletePage(page.id);
                                        showNotice(`Page "${page.title}" deleted.`);
                                      }
                                    }}
                                    className="hover:underline text-[#d63638]"
                                  >
                                    Trash
                                  </button>
                                </>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[11px] uppercase tracking-wider">
                              {page.template}
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2271b1]/10 text-[#2271b1] font-bold text-[11px]">
                              <Sparkles className="w-3 h-3" />
                              <span>{page.acfFields?.length || 0} ACF Fields</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-3 font-medium text-gray-700">
                            {page.navLabel}
                          </td>

                          <td className="py-3.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                page.status === 'published'
                                  ? 'bg-[#e7f5ea] text-[#00a32a]'
                                  : 'bg-[#fcf0db] text-[#dba617]'
                              }`}
                            >
                              {page.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-gray-500 font-mono text-[11px]">
                            {page.lastModified}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedPageId(page.id)}
                              className="px-3 py-1.5 bg-[#f0f0f1] hover:bg-[#2271b1] hover:text-white text-[#2c3338] font-semibold rounded transition-colors text-xs inline-flex items-center gap-1.5"
                            >
                              <Settings2 className="w-3.5 h-3.5" />
                              <span>Edit ACF</span>
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredPages.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500 text-xs">
                            No pages match the search query "{pageSearchQuery}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* B. PAGE ACF EDITOR VIEW (When a page is selected for editing) */}
          {selectedPage && (
            <div className="space-y-6">
              {/* Back to List Navigation Bar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPageId(null)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 rounded flex items-center gap-1 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Pages</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <div>
                    <h2 className="text-base font-bold text-[#1d2327] font-serif flex items-center gap-2">
                      <span>Editing Page:</span>
                      <span className="text-[#2271b1]">{selectedPage.title}</span>
                    </h2>
                    <div className="text-[11px] text-gray-500 font-mono">
                      Route Slug: {selectedPage.slug} (Template: {selectedPage.template})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <span className="text-gray-600">Status:</span>
                    <select
                      value={selectedPage.status}
                      onChange={(e) => {
                        updatePage(selectedPage.id, { status: e.target.value as any });
                        showNotice(`Page status set to ${e.target.value}`);
                      }}
                      className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white font-bold"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </label>

                  <button
                    onClick={() => showNotice('All ACF field values and page metadata saved to database!')}
                    className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-xs rounded shadow flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Update Page</span>
                  </button>
                </div>
              </div>

              {/* Two-Column Editor Layout: Main Content + Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Columns: Core Attributes & ACF Field Group */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Metabox 1: Page General Info */}
                  <div className="bg-white p-5 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                      <h3 className="font-bold text-sm text-[#1d2327] font-serif flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#2271b1]" />
                        <span>Page Attributes & Meta</span>
                      </h3>
                      <span className="text-[11px] text-gray-500 font-mono">ID: {selectedPage.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">Page Title</label>
                        <input
                          type="text"
                          value={selectedPage.title}
                          onChange={(e) => updatePage(selectedPage.id, { title: e.target.value })}
                          className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">URL Slug / Route</label>
                        <input
                          type="text"
                          value={selectedPage.slug}
                          onChange={(e) => updatePage(selectedPage.id, { slug: e.target.value })}
                          className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white font-mono outline-none focus:border-[#2271b1]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">Navigation Menu Label</label>
                        <input
                          type="text"
                          value={selectedPage.navLabel}
                          onChange={(e) => updatePage(selectedPage.id, { navLabel: e.target.value })}
                          className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">Subtitle / Catchphrase</label>
                        <input
                          type="text"
                          value={selectedPage.subtitle}
                          onChange={(e) => updatePage(selectedPage.id, { subtitle: e.target.value })}
                          className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        />
                      </div>
                    </div>

                    <div>
                      <ImageUploadField
                        label="Banner / Hero Image"
                        value={selectedPage.bannerImage}
                        onChange={(newUrl) => updatePage(selectedPage.id, { bannerImage: newUrl })}
                        helperText="Main hero background image for this page."
                        previewHeight="h-32"
                      />
                    </div>
                  </div>

                  {/* Metabox 2: WordPress ACF (Advanced Custom Fields) Group with Drag and Drop Position Rearranging */}
                  <DraggableAcfFieldGroup
                    title="Advanced Custom Fields (ACF Field Group)"
                    description="Edit the exact key-value fields powering this page's layout and content. Drag to rearrange position and set ordering."
                    fields={selectedPage.acfFields || []}
                    onUpdateField={(key, val) => updatePageAcfField(selectedPage.id, key, val)}
                    onAddField={(newF) => addPageAcfField(selectedPage.id, newF)}
                    onDeleteField={(key) => deletePageAcfField(selectedPage.id, key)}
                    onReorderFields={(start, end) => reorderPageAcfFields(selectedPage.id, start, end)}
                    onSetFields={(newFs) => setPageAcfFields(selectedPage.id, newFs)}
                    onShowNotice={showNotice}
                  />
                </div>

                {/* Right Sidebar: WordPress Publish & Template Attributes */}
                <div className="space-y-5">
                  {/* Publish Box */}
                  <div className="bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm space-y-3">
                    <h3 className="font-bold text-xs text-[#1d2327] pb-2 border-b border-gray-200">
                      Publish & Status
                    </h3>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Visibility:</span>
                        <strong className="text-gray-800">Public</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <strong className="text-gray-800 capitalize">{selectedPage.status}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Modified:</span>
                        <span className="font-mono text-gray-700">{selectedPage.lastModified}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Fields Defined:</span>
                        <span className="font-bold text-[#2271b1]">{selectedPage.acfFields?.length || 0}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          showNotice('Page updated successfully!');
                          setSelectedPageId(null);
                        }}
                        className="w-full py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-xs rounded shadow text-center"
                      >
                        Save & Return to Pages List
                      </button>
                    </div>
                  </div>

                  {/* Template Info Box */}
                  <div className="bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm space-y-2">
                    <h3 className="font-bold text-xs text-[#1d2327]">Page Template</h3>
                    <p className="text-[11px] text-gray-500 font-light">
                      This page uses the <strong>{selectedPage.template}</strong> template. ACF fields mapped here automatically populate the designated display components on the live site.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* ======================= SECTION 2: BLOG POSTS TAB ======================= */}
      {/* ========================================================================= */}
      {activeMainTab === 'blog' && (
        <>
          {/* A. BLOG POSTS LIST VIEW */}
          {!selectedPostId && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="bg-white p-3.5 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={postSearchQuery}
                      onChange={(e) => setPostSearchQuery(e.target.value)}
                      placeholder="Search articles by title, author, or tags..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#8c8f94] rounded bg-gray-50 focus:bg-white outline-none focus:border-[#2271b1]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-500 font-medium">Category:</span>
                    <select
                      value={postCategoryFilter}
                      onChange={(e) => setPostCategoryFilter(e.target.value)}
                      className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white outline-none"
                    >
                      <option value="all">All Categories</option>
                      {availableCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* WordPress Blog Table */}
              <div className="bg-white rounded-lg border border-[#c3c4c7] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#50575e] font-semibold">
                        <th className="py-3 px-4">Title & Article Excerpt</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Author</th>
                        <th className="py-3 px-3">ACF Meta</th>
                        <th className="py-3 px-3">Tags</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      {filteredPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="hover:bg-[#f6f7f7] transition-colors group"
                        >
                          <td className="py-3.5 px-4 max-w-sm">
                            <div className="flex items-start gap-3">
                              {post.featuredImage && (
                                <img
                                  src={post.featuredImage}
                                  alt={post.title}
                                  className="w-12 h-12 object-cover rounded shrink-0 border"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                              <div>
                                <div
                                  className="font-bold text-[#2271b1] hover:underline cursor-pointer line-clamp-1"
                                  onClick={() => setSelectedPostId(post.id)}
                                >
                                  {post.title}
                                </div>
                                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-light">
                                  {post.excerpt}
                                </p>
                                {/* Quick Action Links on Hover */}
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#2271b1]">
                                  <button
                                    onClick={() => setSelectedPostId(post.id)}
                                    className="hover:underline font-semibold"
                                  >
                                    Edit Post & ACF
                                  </button>
                                  <span className="text-gray-300">|</span>
                                  <button
                                    onClick={() => {
                                      const dup = duplicateBlogPost(post.id);
                                      if (dup) showNotice(`Post duplicated as "${dup.title}".`);
                                    }}
                                    className="hover:underline text-gray-600"
                                  >
                                    Duplicate
                                  </button>
                                  <span className="text-gray-300">|</span>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Delete post "${post.title}"?`)) {
                                        deleteBlogPost(post.id);
                                        showNotice('Post deleted from database.');
                                      }
                                    }}
                                    className="hover:underline text-[#d63638]"
                                  >
                                    Trash
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-[#E08E45]/15 text-[#9C5D1F] font-semibold text-[11px]">
                              {post.category}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-gray-700">
                            <div className="font-semibold">{post.author}</div>
                            {post.authorRole && (
                              <div className="text-[10px] text-gray-400">{post.authorRole}</div>
                            )}
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[11px]">
                              <Sparkles className="w-3 h-3" />
                              <span>{post.acfFields?.length || 0} ACF</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="flex flex-wrap gap-1 max-w-[140px]">
                              {post.tags.slice(0, 2).map((t, idx) => (
                                <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3.5 px-3 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                            {post.publishedAt}
                          </td>

                          <td className="py-3.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                post.status === 'published'
                                  ? 'bg-[#e7f5ea] text-[#00a32a]'
                                  : 'bg-[#fcf0db] text-[#dba617]'
                              }`}
                            >
                              {post.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedPostId(post.id)}
                              className="px-3 py-1.5 bg-[#f0f0f1] hover:bg-[#2271b1] hover:text-white text-[#2c3338] font-semibold rounded transition-colors text-xs inline-flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredPosts.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-gray-500 text-xs">
                            No blog articles match the current filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* B. BLOG POST ACF EDITOR VIEW */}
          {selectedPost && (
            <div className="space-y-6">
              {/* Back to List Navigation Bar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPostId(null)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 rounded flex items-center gap-1 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Posts</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <div>
                    <h2 className="text-base font-bold text-[#1d2327] font-serif flex items-center gap-2">
                      <span>Editing Post:</span>
                      <span className="text-[#2271b1]">{selectedPost.title}</span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={selectedPost.status}
                    onChange={(e) => {
                      updateBlogPost(selectedPost.id, { status: e.target.value as any });
                      showNotice(`Post status set to ${e.target.value}`);
                    }}
                    className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white font-bold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>

                  <button
                    onClick={() => {
                      showNotice('Blog post and ACF parameters saved!');
                      setSelectedPostId(null);
                    }}
                    className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-xs rounded shadow flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish</span>
                  </button>
                </div>
              </div>

              {/* Two Column WordPress Post Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Main Article Editor + Post ACF Metabox */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Post Title & Excerpt Box */}
                  <div className="bg-white p-5 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Post Title</label>
                      <input
                        type="text"
                        value={selectedPost.title}
                        onChange={(e) => updateBlogPost(selectedPost.id, { title: e.target.value })}
                        className="w-full text-sm font-bold p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        placeholder="Enter post title here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">Permalink Slug</label>
                        <input
                          type="text"
                          value={selectedPost.slug}
                          onChange={(e) => updateBlogPost(selectedPost.id, { slug: e.target.value })}
                          className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">Category</label>
                        <input
                          type="text"
                          value={selectedPost.category}
                          onChange={(e) => updateBlogPost(selectedPost.id, { category: e.target.value })}
                          className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white"
                          placeholder="e.g. Food & Recipes"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Post Excerpt / Summary</label>
                      <textarea
                        rows={2}
                        value={selectedPost.excerpt}
                        onChange={(e) => updateBlogPost(selectedPost.id, { excerpt: e.target.value })}
                        className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        placeholder="Short summary displayed on cards..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Full Article Body Content</label>
                      <textarea
                        rows={10}
                        value={selectedPost.content}
                        onChange={(e) => updateBlogPost(selectedPost.id, { content: e.target.value })}
                        className="w-full text-xs p-3 border border-[#8c8f94] rounded bg-white font-sans leading-relaxed outline-none focus:border-[#2271b1]"
                        placeholder="Write the full story narrative here..."
                      />
                    </div>
                  </div>

                  {/* Blog ACF Metabox with Drag & Drop Position Reordering */}
                  <DraggableAcfFieldGroup
                    title="Post ACF Custom Fields (Specific Highlights)"
                    description="Add custom attributes like event schedules, key recipes, coordinates, or special dish pairings. Drag to rearrange position and set ordering."
                    fields={selectedPost.acfFields || []}
                    onUpdateField={(key, val) => updateBlogPostAcfField(selectedPost.id, key, val)}
                    onAddField={(newF) => addBlogPostAcfField(selectedPost.id, newF)}
                    onDeleteField={(key) => deleteBlogPostAcfField(selectedPost.id, key)}
                    onReorderFields={(start, end) => reorderBlogPostAcfFields(selectedPost.id, start, end)}
                    onSetFields={(newFs) => setBlogPostAcfFields(selectedPost.id, newFs)}
                    onShowNotice={showNotice}
                  />
                </div>

                {/* Right Sidebar: Featured Image, Author & Tags */}
                <div className="space-y-5">
                  {/* Featured Image Box */}
                  <div className="bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm space-y-3">
                    <ImageUploadField
                      label="Featured Image"
                      value={selectedPost.featuredImage}
                      onChange={(newUrl) => updateBlogPost(selectedPost.id, { featuredImage: newUrl })}
                      helperText="Displayed in the blog archive feed and top of article."
                      previewHeight="h-36"
                    />
                  </div>

                  {/* Author & Read Time */}
                  <div className="bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm space-y-3">
                    <h3 className="font-bold text-xs text-[#1d2327] pb-2 border-b border-gray-200 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#2271b1]" />
                      <span>Author & Metrics</span>
                    </h3>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Author Name</label>
                      <input
                        type="text"
                        value={selectedPost.author}
                        onChange={(e) => updateBlogPost(selectedPost.id, { author: e.target.value })}
                        className="w-full text-xs p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Author Role</label>
                      <input
                        type="text"
                        value={selectedPost.authorRole || ''}
                        onChange={(e) => updateBlogPost(selectedPost.id, { authorRole: e.target.value })}
                        className="w-full text-xs p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Read Time Estimate</label>
                      <input
                        type="text"
                        value={selectedPost.readTime}
                        onChange={(e) => updateBlogPost(selectedPost.id, { readTime: e.target.value })}
                        className="w-full text-xs p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={selectedPost.tags.join(', ')}
                        onChange={(e) =>
                          updateBlogPost(selectedPost.id, {
                            tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                          })
                        }
                        className="w-full text-xs p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal: Add New Page */}
      {showNewPageModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl border border-[#c3c4c7] shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-[#1d2327] font-serif pb-2 border-b">
              Create New Custom Page
            </h3>
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Page Title</label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    if (!newPageSlug) {
                      setNewPageSlug('/' + e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Hillside Bonfire Guide"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Route Slug</label>
                <input
                  type="text"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  placeholder="/bonfire-guide"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Subtitle / Summary</label>
                <input
                  type="text"
                  value={newPageSubtitle}
                  onChange={(e) => setNewPageSubtitle(e.target.value)}
                  placeholder="Short description for banners..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPageModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-xs rounded shadow"
                >
                  Create Page & Edit ACF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
