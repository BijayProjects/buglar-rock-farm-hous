import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { MenuItem } from '../types';
import { ImageUploadField } from './components/ImageUploadField';
import {
  UtensilsCrossed,
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  X,
  Flame,
  Leaf,
  Star,
  ExternalLink,
  Filter,
} from 'lucide-react';

export const AdminMenu: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, duplicateMenuItem } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form fields
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    category: 'starters',
    priceNpr: 350,
    description: '',
    isVegetarian: false,
    spicyLevel: 1,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    status: 'published',
  });

  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'starters',
      priceNpr: 400,
      description: '',
      isVegetarian: false,
      spicyLevel: 1,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      isPopular: false,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      priceNpr: item.priceNpr,
      description: item.description,
      isVegetarian: item.isVegetarian,
      spicyLevel: item.spicyLevel ?? 1,
      image: item.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      isPopular: !!item.isPopular,
      status: item.status || 'published',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
      showNotice(`Dish "${formData.name}" updated successfully.`);
    } else {
      addMenuItem(formData);
      showNotice(`Dish "${formData.name}" added to menu.`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      deleteMenuItem(id);
      showNotice(`Dish "${name}" removed.`);
    }
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateMenuItem(id);
    if (dup) {
      showNotice(`Duplicated "${dup.name}".`);
    }
  };

  // Filtered menu
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVeg =
      vegFilter === 'all' ||
      (vegFilter === 'veg' && item.isVegetarian) ||
      (vegFilter === 'nonveg' && !item.isVegetarian);
    return matchesSearch && matchesCat && matchesVeg;
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'featured', label: 'Chef Specials' },
    { id: 'starters', label: 'Starters' },
    { id: 'main', label: 'Main Courses' },
    { id: 'snacks', label: 'Snacks & Khaja' },
    { id: 'drinks', label: 'Teas & Beverages' },
    { id: 'desserts', label: 'Desserts' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* WordPress Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Menu Items</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border">
              {menuItems.length} Total
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Manage your digital menu dishes, prices in NPR, spice levels, vegetarian tags, and photos.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs sm:text-sm rounded shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Notice Alert */}
      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter & Search Bar (WP Style) */}
      <div className="bg-white p-4 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu dishes..."
            className="w-full text-xs pl-8 pr-3 py-2 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Categories & Dietary Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-2 bg-white border border-[#8c8f94] rounded text-gray-800 outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            value={vegFilter}
            onChange={(e) => setVegFilter(e.target.value as any)}
            className="text-xs px-3 py-2 bg-white border border-[#8c8f94] rounded text-gray-800 outline-none"
          >
            <option value="all">All Diets (Veg & Non-Veg)</option>
            <option value="veg">🌱 Pure Vegetarian Only</option>
            <option value="nonveg">🍗 Non-Vegetarian Only</option>
          </select>

          {(searchQuery || selectedCategory !== 'all' || vegFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setVegFilter('all');
              }}
              className="text-xs text-[#d63638] hover:underline px-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* WordPress-style Data Table */}
      <div className="bg-white rounded-lg border border-[#c3c4c7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#2c3338] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-16 text-center">Photo</th>
                <th className="py-3 px-4">Dish Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                    No menu items found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fcfcfc] transition-colors group">
                    {/* Thumbnail */}
                    <td className="py-3 px-4 text-center">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden mx-auto">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>

                    {/* Title & Description */}
                    <td className="py-3 px-4 max-w-xs sm:max-w-md">
                      <div className="font-bold text-sm text-[#1d2327] group-hover:text-[#2271b1] transition-colors">
                        {item.name}
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-light">
                        {item.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="capitalize px-2.5 py-1 rounded bg-gray-100 text-gray-700 font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-bold text-[#10261D] text-xs">
                      NPR {item.priceNpr}
                    </td>

                    {/* Tags */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.isVegetarian ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <Leaf className="w-2.5 h-2.5" /> Veg
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Non-Veg
                          </span>
                        )}

                        {item.spicyLevel && item.spicyLevel > 0 ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">
                            <Flame className="w-2.5 h-2.5" /> lvl {item.spicyLevel}
                          </span>
                        ) : null}

                        {item.isPopular && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 text-[10px] font-bold">
                            <Star className="w-2.5 h-2.5 fill-current" /> Popular
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded hover:bg-gray-100 text-[#2271b1] hover:text-[#135e96]"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(item.id)}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                          title="Duplicate Dish"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 rounded hover:bg-red-50 text-[#d63638]"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal (WordPress-Style Editor Box) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-xl w-full border border-[#c3c4c7] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1d2327] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {editingItem ? 'Edit Menu Dish' : 'Add New Menu Dish'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Dish Name */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Dish Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Buglay Special Charcoal Sekuwa"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1] bg-white"
                  >
                    <option value="featured">Chef Specials (Featured)</option>
                    <option value="starters">Starters & Appetizers</option>
                    <option value="main">Main Courses & Thali</option>
                    <option value="snacks">Snacks & Momo</option>
                    <option value="drinks">Teas & Cold Beverages</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Price (NPR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.priceNpr}
                    onChange={(e) => setFormData({ ...formData, priceNpr: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Description / Ingredients
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe ingredients, cooking style, and fresh mountain herbs..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              {/* Image with Media Library & Drag-Drop */}
              <ImageUploadField
                label="Dish Image"
                value={formData.image || ''}
                onChange={(newUrl) => setFormData({ ...formData, image: newUrl })}
                placeholder="https://..."
                previewHeight="h-28"
              />

              {/* Toggles: Veg, Spicy, Popular */}
              <div className="bg-[#f6f7f7] p-3.5 rounded border border-[#dcdcde] grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVegetarian}
                    onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                    className="rounded text-[#00a32a] focus:ring-[#00a32a]"
                  />
                  <span>🌱 Pure Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="rounded text-[#E08E45] focus:ring-[#E08E45]"
                  />
                  <span>⭐ Popular Dish</span>
                </label>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Spice Meter (0 - 3)
                  </label>
                  <select
                    value={formData.spicyLevel || 0}
                    onChange={(e) => setFormData({ ...formData, spicyLevel: Number(e.target.value) as any })}
                    className="w-full text-xs p-1.5 border border-[#8c8f94] rounded bg-white"
                  >
                    <option value={0}>0 - Mild / No Spice</option>
                    <option value={1}>1 - Mild Warmth</option>
                    <option value={2}>2 - Medium Himalayan</option>
                    <option value={3}>3 - Extra Spicy (Timur)</option>
                  </select>
                </div>
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
                  {editingItem ? 'Update Dish' : 'Publish Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
