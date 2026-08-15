import React, { useState, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import { MediaItem } from '../types';
import {
  UploadCloud,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Check,
  Search,
  Filter,
  LayoutGrid,
  List,
  ExternalLink,
  CheckCircle2,
  X,
  Eye,
  Info,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminMediaProps {
  onNavigateTab?: (tab: string) => void;
}

export const AdminMedia: React.FC<AdminMediaProps> = () => {
  const { mediaLibrary, addMediaItem, updateMediaItem, deleteMediaItem, uploadMediaFiles } = useCMS();

  // View state: 'grid' | 'list'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Sort order
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  // Dropzone toggle
  const [showDropzone, setShowDropzone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Selected item for Edit/Details modal
  const [activeMediaItem, setActiveMediaItem] = useState<MediaItem | null>(null);

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);

  // Notifications
  const [notice, setNotice] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showNotice('Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFilesUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded = await uploadMediaFiles(files);
      showNotice(`Successfully uploaded ${uploaded.length} image(s) to media library.`);
      setShowDropzone(false);
    } catch (err) {
      console.error(err);
      alert('Failed to process image upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Permanently delete media file "${title}"? This cannot be undone.`)) {
      deleteMediaItem(id);
      if (activeMediaItem?.id === id) {
        setActiveMediaItem(null);
      }
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showNotice(`Deleted "${title}".`);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Permanently delete ${selectedIds.length} selected media files?`)) {
      selectedIds.forEach((id) => deleteMediaItem(id));
      setSelectedIds([]);
      setIsBulkMode(false);
      showNotice(`Deleted ${selectedIds.length} media item(s).`);
    }
  };

  const toggleSelectId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter and Sort items
  const filteredItems = mediaLibrary
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.filename && item.filename.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      if (sortBy === 'oldest') return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      return a.title.localeCompare(b.title);
    });

  const categories = [
    { id: 'all', label: 'All Media Items' },
    { id: 'farmhouse', label: 'Farmhouse Vibe' },
    { id: 'food', label: 'Food & BBQ' },
    { id: 'nature', label: 'Nature & Views' },
    { id: 'events', label: 'Live Music & Events' },
    { id: 'branding', label: 'Branding & Logos' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
      />

      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Media Library</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border border-[#c3c4c7]">
              {mediaLibrary.length} Items
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Upload, browse, edit and manage all images and visual assets across your website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowDropzone(!showDropzone)}
            className="px-3.5 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Media File</span>
          </button>
        </div>
      </div>

      {/* WordPress Flash Notice Banner */}
      {notice && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expandable Upload Dropzone (WordPress "Upload New Media" Box) */}
      {showDropzone && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-8 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-3 ${
            isDragging
              ? 'border-[#2271b1] bg-blue-50/80 scale-[1.01]'
              : 'border-[#2271b1]/50 bg-blue-50/30'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white border border-blue-200 flex items-center justify-center text-[#2271b1] shadow-sm">
            <UploadCloud className={`w-7 h-7 ${isUploading ? 'animate-bounce' : ''}`} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1d2327]">
              {isDragging ? 'Drop images here to start uploading' : 'Drop files anywhere to upload'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              or select images from your local computer or device
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isUploading ? 'Uploading & Processing...' : 'Select Files from Computer'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDropzone(false)}
              className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium rounded border border-gray-300 transition-colors"
            >
              Close
            </button>
          </div>

          <div className="text-[11px] text-gray-400 border-t border-blue-100 pt-2 w-full max-w-sm">
            Supported formats: PNG, JPG, WebP, GIF, SVG. Files are automatically optimized.
          </div>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-3.5 rounded-lg border border-[#c3c4c7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, filename, or alt text..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#8c8f94] rounded bg-gray-50 focus:bg-white outline-none focus:border-[#2271b1]"
            />
          </div>
        </div>

        {/* Category & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-500 font-medium">Category:</span>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* Bulk Action Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsBulkMode(!isBulkMode);
              setSelectedIds([]);
            }}
            className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
              isBulkMode
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-white border-[#8c8f94] text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isBulkMode ? 'Cancel Bulk Selection' : 'Bulk Select'}
          </button>

          {isBulkMode && selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleBulkDelete}
              className="px-2.5 py-1.5 rounded text-xs font-semibold bg-[#d63638] text-white hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          {/* View Mode Switcher: Grid vs List */}
          <div className="flex items-center border border-[#8c8f94] rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${
                viewMode === 'grid' ? 'bg-[#2271b1] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${
                viewMode === 'list' ? 'bg-[#2271b1] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Grid vs List Table */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#c3c4c7] p-12 text-center shadow-xs">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-800">No media items found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-4">
            No images match your search or filter criteria. Click below to upload new photos directly.
          </p>
          <button
            type="button"
            onClick={() => setShowDropzone(true)}
            className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Media</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`bg-white rounded-lg border border-[#c3c4c7] shadow-xs overflow-hidden group flex flex-col transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-[#2271b1] border-[#2271b1]' : ''
                }`}
              >
                {/* Thumbnail Box */}
                <div
                  className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (isBulkMode) {
                      toggleSelectId(item.id);
                    } else {
                      setActiveMediaItem(item);
                    }
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />

                  {/* Bulk Select Checkbox */}
                  {isBulkMode && (
                    <div
                      className={`absolute top-2 left-2 w-5 h-5 rounded border flex items-center justify-center shadow ${
                        isSelected
                          ? 'bg-[#2271b1] border-[#2271b1] text-white'
                          : 'bg-white/90 border-gray-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  )}

                  {/* Category Pill */}
                  {item.category && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium capitalize">
                      {item.category}
                    </div>
                  )}

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMediaItem(item);
                      }}
                      className="p-2 bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition-colors"
                      title="View & Edit Details"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#2271b1]" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(item.url, item.id);
                      }}
                      className="p-2 bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id, item.title);
                      }}
                      className="p-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Title Footer */}
                <div className="p-2.5 border-t border-[#f0f0f1] bg-white flex flex-col justify-between flex-1">
                  <div
                    onClick={() => setActiveMediaItem(item)}
                    className="font-bold text-xs text-[#1d2327] hover:text-[#2271b1] cursor-pointer truncate"
                    title={item.title}
                  >
                    {item.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                    <span>{item.fileSize || 'Image'}</span>
                    <span className="font-mono">{new Date(item.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST TABLE VIEW */
        <div className="bg-white rounded-lg border border-[#c3c4c7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#50575e] font-semibold">
                  {isBulkMode && <th className="py-3 px-3 w-8"></th>}
                  <th className="py-3 px-4">File / Thumbnail</th>
                  <th className="py-3 px-3">Title & Alt Text</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Dimensions / Size</th>
                  <th className="py-3 px-3">Uploaded Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {filteredItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#f6f7f7] transition-colors group ${
                        isSelected ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      {isBulkMode && (
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectId(item.id)}
                            className="rounded text-[#2271b1]"
                          />
                        </td>
                      )}

                      <td className="py-3 px-4">
                        <div
                          onClick={() => setActiveMediaItem(item)}
                          className="w-16 h-16 rounded bg-gray-100 border border-gray-300 overflow-hidden cursor-pointer relative group-hover:border-[#2271b1] transition-colors shrink-0"
                        >
                          <img
                            src={item.url}
                            alt={item.altText}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div
                          onClick={() => setActiveMediaItem(item)}
                          className="font-bold text-[#2271b1] hover:underline cursor-pointer"
                        >
                          {item.title}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono mt-0.5 truncate max-w-xs">
                          {item.filename || 'media_asset'}
                        </div>
                        {item.altText && (
                          <div className="text-[11px] text-gray-400 italic mt-0.5">
                            Alt: "{item.altText}"
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-medium capitalize">
                          {item.category || 'General'}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-gray-600 font-mono text-[11px]">
                        <div>{item.dimensions || '1200 × 800'}</div>
                        <div className="text-gray-400 text-[10px]">{item.fileSize || 'JPG'}</div>
                      </td>

                      <td className="py-3 px-3 text-gray-500 font-mono text-[11px]">
                        {new Date(item.uploadedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-xs">
                          <button
                            type="button"
                            onClick={() => setActiveMediaItem(item)}
                            className="p-1.5 text-gray-600 hover:text-[#2271b1] hover:bg-blue-50 rounded"
                            title="Edit Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(item.url, item.id)}
                            className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                            title="Copy URL"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 text-gray-400 hover:text-[#d63638] hover:bg-red-50 rounded"
                            title="Delete Permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WordPress Attachment Details / Edit Modal */}
      {activeMediaItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-fade-in font-sans">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#f6f7f7] border-b border-[#dcdcde] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#2271b1]" />
                <h2 className="font-bold text-base text-[#1d2327]">Attachment Details</h2>
              </div>
              <button
                onClick={() => setActiveMediaItem(null)}
                className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split view (Image Preview on Left, Metadata form on Right) */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
              {/* Image Preview Box */}
              <div className="md:w-1/2 flex flex-col space-y-3">
                <div className="bg-[#f0f0f1] rounded-lg border border-gray-300 p-2 flex items-center justify-center overflow-hidden min-h-[260px] max-h-[360px]">
                  <img
                    src={activeMediaItem.url}
                    alt={activeMediaItem.altText}
                    className="max-h-[340px] w-auto max-w-full object-contain rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3 border text-xs text-gray-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">File Name:</span>
                    <span className="font-mono text-gray-900 truncate max-w-[200px]">
                      {activeMediaItem.filename || activeMediaItem.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">File Type:</span>
                    <span className="font-mono">{activeMediaItem.fileType || 'image/jpeg'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">File Size:</span>
                    <span>{activeMediaItem.fileSize || 'Standard'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Dimensions:</span>
                    <span className="font-mono">{activeMediaItem.dimensions || '1200 × 800 pixels'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Uploaded on:</span>
                    <span>{new Date(activeMediaItem.uploadedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Editable Fields Form on Right */}
              <div className="md:w-1/2 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={activeMediaItem.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setActiveMediaItem({ ...activeMediaItem, title: newTitle });
                      updateMediaItem(activeMediaItem.id, { title: newTitle });
                    }}
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Alternative Text (Alt Text) *
                  </label>
                  <input
                    type="text"
                    value={activeMediaItem.altText || ''}
                    onChange={(e) => {
                      const newAlt = e.target.value;
                      setActiveMediaItem({ ...activeMediaItem, altText: newAlt });
                      updateMediaItem(activeMediaItem.id, { altText: newAlt });
                    }}
                    placeholder="Describe image for SEO and screen readers..."
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                  />
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Essential for web accessibility and Google Image search ranking.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={activeMediaItem.category || 'farmhouse'}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      setActiveMediaItem({ ...activeMediaItem, category: newCat });
                      updateMediaItem(activeMediaItem.id, { category: newCat });
                    }}
                    className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none"
                  >
                    <option value="farmhouse">Farmhouse Vibe</option>
                    <option value="food">Food & BBQ</option>
                    <option value="nature">Nature & Views</option>
                    <option value="events">Live Music & Events</option>
                    <option value="branding">Branding & Logos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Caption
                  </label>
                  <textarea
                    rows={2}
                    value={activeMediaItem.caption || ''}
                    onChange={(e) => {
                      const newCaption = e.target.value;
                      setActiveMediaItem({ ...activeMediaItem, caption: newCaption });
                      updateMediaItem(activeMediaItem.id, { caption: newCaption });
                    }}
                    placeholder="Brief description displayed under the photo..."
                    className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    File URL / Permalink
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      readOnly
                      value={activeMediaItem.url}
                      className="w-full text-xs p-2 border border-gray-300 rounded bg-gray-50 text-gray-600 font-mono select-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(activeMediaItem.url, activeMediaItem.id)}
                      className="px-3 py-1.5 bg-[#f0f0f1] hover:bg-[#dcdcde] border border-[#8c8f94] rounded text-gray-800 text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      {copiedId === activeMediaItem.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === activeMediaItem.id ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleDelete(activeMediaItem.id, activeMediaItem.title)}
                    className="text-[#d63638] hover:underline font-semibold text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      showNotice('Saved media details.');
                      setActiveMediaItem(null);
                    }}
                    className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded shadow transition-colors"
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
