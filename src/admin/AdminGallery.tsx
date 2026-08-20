import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { GalleryItem } from '../types';
import { Image as ImageIcon, Plus, Edit2, Trash2, CheckCircle2, X, Filter, ZoomIn } from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useCMS();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('farmhouse');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('farmhouse');
    setImageUrl('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80');
    setCaption('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setCaption(item.caption);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const payload = {
      title,
      category,
      imageUrl,
      caption,
    };

    if (editingItem) {
      updateGalleryItem(editingItem.id, payload);
      showNotice(`Photo "${title}" updated.`);
    } else {
      addGalleryItem(payload);
      showNotice(`Photo "${title}" added to gallery.`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deleteGalleryItem(id);
    showNotice(`Photo "${name}" deleted.`);
  };

  const filteredItems = galleryItems.filter(
    (i) => activeCategory === 'all' || i.category === activeCategory
  );

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'farmhouse', label: 'Farmhouse Vibe' },
    { id: 'food', label: 'Food & BBQ' },
    { id: 'nature', label: 'Nature & Views' },
    { id: 'music', label: 'Music & Bonfire' },
    { id: 'people', label: 'Gatherings' },
    { id: 'events', label: 'Parties & Events' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Media & Gallery</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border">
              {galleryItems.length} Photos
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Manage your visual showcase photos, category tags, and lightbox captions.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs sm:text-sm rounded shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Add Photo</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-wrap gap-1.5 items-center">
        <Filter className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-[#2271b1] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-[#c3c4c7] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] uppercase font-bold tracking-wider">
                  {item.category}
                </span>
              </div>

              <div className="p-3">
                <h4 className="font-bold text-xs text-[#1d2327] truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="p-2 bg-[#f6f7f7] border-t border-[#dcdcde] flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-mono truncate max-w-[100px]">
                {item.id}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1 rounded hover:bg-gray-200 text-[#2271b1]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1 rounded hover:bg-red-50 text-[#d63638]"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
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
                {editingItem ? 'Edit Photo' : 'Add Photo to Gallery'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Farmhouse Evening Lights"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1] bg-white"
                >
                  <option value="farmhouse">Farmhouse Vibe</option>
                  <option value="food">Food & BBQ</option>
                  <option value="nature">Nature & Views</option>
                  <option value="music">Music & Bonfire</option>
                  <option value="people">Gatherings & Families</option>
                  <option value="events">Parties & Occasions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-36 object-cover rounded border"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Short descriptive caption..."
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
