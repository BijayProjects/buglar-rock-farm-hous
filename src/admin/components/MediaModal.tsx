import React, { useState, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaItem } from '../../types';
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Check,
  Search,
  Trash2,
  Copy,
  Link,
  Plus,
  Filter,
  CheckCircle2,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, mediaItem?: MediaItem) => void;
  title?: string;
  selectedUrl?: string;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Select or Upload Media',
  selectedUrl,
}) => {
  const { mediaLibrary, addMediaItem, updateMediaItem, deleteMediaItem, uploadMediaFiles } = useCMS();

  // Active Tab: 'upload' | 'library' | 'url'
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('library');

  // Library State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(() => {
    if (selectedUrl) {
      const match = mediaLibrary.find((m) => m.url === selectedUrl);
      return match ? match.id : (mediaLibrary[0]?.id || null);
    }
    return mediaLibrary[0]?.id || null;
  });

  // URL Tab State
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customAlt, setCustomAlt] = useState('');

  // Drag & Drop / Uploading State
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const selectedItem = mediaLibrary.find((m) => m.id === selectedMediaId);

  // Filtered Library Items
  const filteredItems = mediaLibrary.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.filename && item.filename.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleFilesChosen = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded = await uploadMediaFiles(files);
      if (uploaded.length > 0) {
        setSelectedMediaId(uploaded[0].id);
        setActiveTab('library');
        setUploadNotice(`Successfully uploaded ${uploaded.length} image(s)!`);
        setTimeout(() => setUploadNotice(null), 3000);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image files.');
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
      handleFilesChosen(e.dataTransfer.files);
    }
  };

  const handleConfirmSelect = () => {
    if (activeTab === 'url') {
      if (!customUrl.trim()) return;
      // Add to media library as well
      const newItem = addMediaItem({
        title: customTitle.trim() || 'Custom Web Image',
        url: customUrl.trim(),
        altText: customAlt.trim() || customTitle.trim() || 'Imported Web Image',
        fileType: 'image/jpeg',
        category: 'farmhouse',
      });
      onSelectImage(customUrl.trim(), newItem);
      onClose();
      return;
    }

    if (selectedItem) {
      onSelectImage(selectedItem.url, selectedItem);
      onClose();
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Permanently delete "${name}" from your media library?`)) {
      deleteMediaItem(id);
      if (selectedMediaId === id) {
        const remaining = mediaLibrary.filter((m) => m.id !== id);
        setSelectedMediaId(remaining[0]?.id || null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 animate-fade-in font-sans">
      <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* WordPress Modal Header */}
        <div className="px-5 py-3.5 bg-[#f6f7f7] border-b border-[#dcdcde] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#2271b1]" />
            <h2 className="font-bold text-base text-[#1d2327]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Navigation Tabs */}
        <div className="px-5 bg-white border-b border-[#dcdcde] flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-[#2271b1] text-[#2271b1] bg-blue-50/40'
                : 'border-transparent text-[#50575e] hover:text-[#1d2327]'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload files</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'library'
                ? 'border-[#2271b1] text-[#2271b1] bg-blue-50/40'
                : 'border-transparent text-[#50575e] hover:text-[#1d2327]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media Library</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-gray-100 text-gray-600 font-bold">
              {mediaLibrary.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-[#2271b1] text-[#2271b1] bg-blue-50/40'
                : 'border-transparent text-[#50575e] hover:text-[#1d2327]'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Insert from URL</span>
          </button>
        </div>

        {uploadNotice && (
          <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadNotice}</span>
          </div>
        )}

        {/* Modal Main Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* TAB 1: UPLOAD FILES */}
          {activeTab === 'upload' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex-1 flex flex-col items-center justify-center p-8 text-center transition-colors overflow-y-auto ${
                isDragging ? 'bg-blue-50 border-2 border-dashed border-[#2271b1]' : 'bg-[#f6f7f7]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFilesChosen(e.target.files)}
              />

              <div className="max-w-md w-full p-8 bg-white rounded-xl border-2 border-dashed border-[#c3c4c7] shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#2271b1]">
                  <UploadCloud className="w-8 h-8 animate-pulse" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1d2327]">Drop files anywhere to upload</h3>
                  <p className="text-xs text-gray-500 mt-1">or click below to browse from your device</p>
                </div>

                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isUploading ? 'Processing upload...' : 'Select Files'}</span>
                </button>

                <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-3 w-full">
                  Maximum upload file size: 64 MB. Supports PNG, JPG, WebP, GIF, SVG.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
              {/* Left Main: Filter Toolbar & Thumbnails Grid */}
              <div className="flex-1 flex flex-col overflow-hidden border-r border-[#dcdcde] bg-[#f6f7f7]">
                {/* Search & Category Filter Header */}
                <div className="p-3 bg-white border-b border-[#dcdcde] flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <div className="relative w-full max-w-xs">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search media items..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#8c8f94] rounded bg-gray-50 focus:bg-white outline-none focus:border-[#2271b1]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-medium">Category:</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="text-xs p-1.5 border border-[#8c8f94] rounded bg-white outline-none"
                    >
                      <option value="all">All media items ({mediaLibrary.length})</option>
                      <option value="farmhouse">Farmhouse Vibe</option>
                      <option value="food">Food & BBQ</option>
                      <option value="nature">Nature & Views</option>
                      <option value="events">Live Music & Events</option>
                      <option value="branding">Branding & Logo</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setActiveTab('upload')}
                      className="px-2.5 py-1.5 bg-[#f0f0f1] hover:bg-[#dcdcde] text-gray-700 text-xs font-semibold rounded border border-[#8c8f94] flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#2271b1]" />
                      <span>Upload New</span>
                    </button>
                  </div>
                </div>

                {/* Media Thumbnails Grid */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex-1 p-4 overflow-y-auto ${
                    isDragging ? 'bg-blue-50/80 border-2 border-dashed border-[#2271b1]' : ''
                  }`}
                >
                  {filteredItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                      <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
                      <p className="text-sm font-semibold">No media items found.</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try searching with another keyword or drag-and-drop new photos here!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {filteredItems.map((item) => {
                        const isSelected = item.id === selectedMediaId;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedMediaId(item.id)}
                            className={`relative group aspect-square rounded bg-gray-200 border-2 overflow-hidden cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#2271b1] ring-2 ring-[#2271b1]/40 shadow-md'
                                : 'border-transparent hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={item.url}
                              alt={item.altText || item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              referrerPolicy="no-referrer"
                            />

                            {/* Checkmark badge when selected */}
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#2271b1] text-white rounded-full flex items-center justify-center shadow-md">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}

                            {/* Title overlay on hover */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-[10px] text-white font-medium truncate">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar: WordPress Attachment Details */}
              <div className="w-full md:w-80 lg:w-96 bg-white flex flex-col overflow-y-auto p-4 shrink-0 border-t md:border-t-0 md:border-l border-[#dcdcde]">
                {selectedItem ? (
                  <div className="space-y-4 text-xs">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#50575e] pb-2 border-b border-[#dcdcde]">
                      Attachment Details
                    </h3>

                    {/* Preview Box */}
                    <div className="flex gap-3">
                      <div className="w-24 h-24 rounded bg-gray-100 border border-gray-300 overflow-hidden shrink-0">
                        <img
                          src={selectedItem.url}
                          alt={selectedItem.altText}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1 text-gray-600">
                        <p className="font-bold text-gray-900 truncate" title={selectedItem.filename || selectedItem.title}>
                          {selectedItem.filename || selectedItem.title}
                        </p>
                        <p className="text-[11px] text-gray-500">{new Date(selectedItem.uploadedAt).toLocaleDateString()}</p>
                        {selectedItem.fileSize && (
                          <p className="text-[11px] text-gray-500">{selectedItem.fileSize}</p>
                        )}
                        {selectedItem.dimensions && (
                          <p className="text-[11px] text-gray-500 font-mono">{selectedItem.dimensions}</p>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(selectedItem.id, selectedItem.title)}
                          className="text-[#d63638] hover:underline font-semibold text-[11px] flex items-center gap-1 pt-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete permanently</span>
                        </button>
                      </div>
                    </div>

                    {/* Editable Attachment Fields */}
                    <div className="space-y-3 pt-2 border-t border-[#dcdcde]">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Alt Text (Alternative Text)
                        </label>
                        <input
                          type="text"
                          value={selectedItem.altText || ''}
                          onChange={(e) => updateMediaItem(selectedItem.id, { altText: e.target.value })}
                          placeholder="Describe the purpose of the image..."
                          className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Read by screen readers and search engines for accessibility and SEO.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={selectedItem.title || ''}
                          onChange={(e) => updateMediaItem(selectedItem.id, { title: e.target.value })}
                          className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Caption
                        </label>
                        <textarea
                          rows={2}
                          value={selectedItem.caption || ''}
                          onChange={(e) => updateMediaItem(selectedItem.id, { caption: e.target.value })}
                          placeholder="Optional caption displayed under image..."
                          className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          File URL / Permalink
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            readOnly
                            value={selectedItem.url}
                            className="w-full text-xs p-2 border border-gray-300 rounded bg-gray-50 text-gray-600 font-mono select-all"
                          />
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(selectedItem.url)}
                            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-gray-700 font-medium shrink-0 flex items-center gap-1"
                            title="Copy URL"
                          >
                            {copiedNotice ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {copiedNotice && (
                          <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                            ✓ Copied to clipboard!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-6">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                    <p className="text-xs">No media item selected.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INSERT FROM URL */}
          {activeTab === 'url' && (
            <div className="flex-1 p-6 bg-[#f6f7f7] overflow-y-auto">
              <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-[#c3c4c7] shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200 text-[#1d2327]">
                  <Link className="w-5 h-5 text-[#2271b1]" />
                  <h3 className="font-bold text-sm">Insert Image from External URL</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Image Web Address (URL) *
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white font-mono outline-none focus:border-[#2271b1]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Image Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="e.g. Garden Pavilion"
                      className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Alt Text (SEO & Accessibility)
                    </label>
                    <input
                      type="text"
                      value={customAlt}
                      onChange={(e) => setCustomAlt(e.target.value)}
                      placeholder="e.g. Garden Pavilion at dusk"
                      className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1]"
                    />
                  </div>
                </div>

                {customUrl && (
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-700">Live Preview:</span>
                    <div className="h-44 rounded-lg bg-gray-100 border overflow-hidden">
                      <img
                        src={customUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://placehold.co/600x400?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* WordPress Modal Footer Bar */}
        <div className="px-5 py-3 bg-[#f6f7f7] border-t border-[#dcdcde] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {activeTab === 'library' && selectedItem && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="font-semibold text-gray-900">Selected:</span>
                <span className="truncate max-w-[200px] font-mono">{selectedItem.title}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-gray-100 border border-[#8c8f94] rounded text-xs font-semibold text-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={activeTab === 'library' ? !selectedItem : activeTab === 'url' ? !customUrl.trim() : true}
              onClick={handleConfirmSelect}
              className="px-5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Select / Insert into Field</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
