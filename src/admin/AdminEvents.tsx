import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { EventPackage } from '../types';
import { Calendar, Plus, Edit2, Trash2, CheckCircle2, X, Star, Users } from 'lucide-react';

export const AdminEvents: React.FC = () => {
  const { eventPackages, addEventPackage, updateEventPackage, deleteEventPackage } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<EventPackage | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('10 to 30 Guests');
  const [ideal, setIdeal] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [recommended, setRecommended] = useState(false);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingPkg(null);
    setName('');
    setCapacity('10 to 40 Guests');
    setIdeal('Family Gatherings, Birthday Parties');
    setFeaturesInput('Reserved garden pavilion\nBarbecue & buffet arrangements\nAudio sound setup\nDedicated server team');
    setRecommended(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: EventPackage) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setCapacity(pkg.capacity);
    setIdeal(pkg.ideal);
    setFeaturesInput(pkg.features.join('\n'));
    setRecommended(pkg.recommended);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload = {
      name,
      capacity,
      ideal,
      features,
      recommended,
      status: 'published' as const,
    };

    if (editingPkg) {
      updateEventPackage(editingPkg.id, payload);
      showNotice(`Package "${name}" updated.`);
    } else {
      addEventPackage(payload);
      showNotice(`Package "${name}" added.`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, pkgName: string) => {
    if (window.confirm(`Delete event package "${pkgName}"?`)) {
      deleteEventPackage(id);
      showNotice(`Package "${pkgName}" deleted.`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Event & Gathering Packages</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border">
              {eventPackages.length} Packages
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Configure custom gathering, corporate retreat, and party packages showcased in the Gatherings section.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs sm:text-sm rounded shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-lg border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden ${
              pkg.recommended ? 'border-[#E08E45] ring-2 ring-[#E08E45]/20' : 'border-[#c3c4c7]'
            }`}
          >
            {pkg.recommended && (
              <div className="bg-[#E08E45] text-[#10261D] text-[10px] font-bold uppercase tracking-wider text-center py-1 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-current" /> Most Popular Package
              </div>
            )}

            <div className="p-5 space-y-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#2271b1] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {pkg.capacity}
                </span>
                <h3 className="font-bold text-lg text-[#1d2327] font-serif mt-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-gray-500 italic mt-0.5">
                  Ideal for: {pkg.ideal}
                </p>
              </div>

              {/* Features */}
              <div className="pt-2 border-t border-gray-100">
                <div className="text-[11px] font-bold uppercase text-gray-400 mb-2">
                  Included Features:
                </div>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00a32a] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 bg-[#f6f7f7] border-t border-[#dcdcde] flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-mono">ID: {pkg.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-gray-300 text-xs font-medium text-[#2271b1] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(pkg.id, pkg.name)}
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
                {editingPkg ? 'Edit Event Package' : 'Add Event Package'}
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
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Celebration & Karaoke Night"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Guest Capacity *
                  </label>
                  <input
                    type="text"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 15 to 50 Guests"
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Ideal Occasion
                  </label>
                  <input
                    type="text"
                    value={ideal}
                    onChange={(e) => setIdeal(e.target.value)}
                    placeholder="e.g. Milestone Birthdays, Reunions"
                    className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Package Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Reserved pavilion with lights&#10;Karaoke setup with dual mics&#10;Barbecue grill station"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1] font-mono"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer p-3 bg-amber-50 rounded border border-amber-200">
                <input
                  type="checkbox"
                  checked={recommended}
                  onChange={(e) => setRecommended(e.target.checked)}
                  className="rounded text-[#E08E45] focus:ring-[#E08E45]"
                />
                <span className="font-bold text-amber-900">Mark as "Most Popular / Recommended" Package</span>
              </label>

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
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
