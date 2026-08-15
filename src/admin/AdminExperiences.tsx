import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ExperienceItem } from '../types';
import { Sparkles, Plus, Edit2, Trash2, CheckCircle2, X, Image as ImageIcon } from 'lucide-react';
import { ImageUploadField } from './components/ImageUploadField';

export const AdminExperiences: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingExp(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80');
    setHighlightsInput('Outdoor seating\nScenic mountain view\nFresh air');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: ExperienceItem) => {
    setEditingExp(exp);
    setTitle(exp.title);
    setSubtitle(exp.subtitle);
    setDescription(exp.description);
    setImage(exp.image);
    setHighlightsInput(exp.highlights.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const highlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const payload = {
      title,
      subtitle,
      description,
      image,
      highlights,
      status: 'published' as const,
    };

    if (editingExp) {
      updateExperience(editingExp.id, payload);
      showNotice(`Experience "${title}" updated.`);
    } else {
      addExperience(payload);
      showNotice(`Experience "${title}" added.`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete experience "${name}"?`)) {
      deleteExperience(id);
      showNotice(`Experience "${name}" deleted.`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Farmhouse Experiences</span>
            <span className="text-xs font-sans font-normal text-gray-500 bg-white px-2 py-0.5 rounded border">
              {experiences.length} Experiences
            </span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Customize the 6 signature countryside experience cards shown on the website and experience page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs sm:text-sm rounded shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-lg border border-[#c3c4c7] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Image Preview */}
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#10261D]/80 backdrop-blur-md border border-[#E08E45]/40 text-[#E08E45] text-xs font-semibold">
                  {exp.subtitle}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2.5">
                <h3 className="font-bold text-base text-[#1d2327] font-serif">
                  {exp.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase text-gray-500 mb-1.5">
                    Highlights ({exp.highlights.length}):
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exp.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium"
                      >
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 bg-[#f6f7f7] border-t border-[#dcdcde] flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-mono">ID: {exp.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-gray-300 text-xs font-medium text-[#2271b1] flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.title)}
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

      {/* Modal Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-lg w-full border border-[#c3c4c7] shadow-2xl overflow-hidden">
            <div className="bg-[#1d2327] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {editingExp ? 'Edit Farmhouse Experience' : 'Add New Experience'}
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
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Farmhouse Dining"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Subtitle / Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Fresh flavours, authentic spice"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the atmosphere and offerings..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>

              <ImageUploadField
                label="Experience Photo"
                value={image}
                onChange={(newUrl) => setImage(newUrl)}
                previewHeight="h-28"
              />

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Highlights (One per line)
                </label>
                <textarea
                  rows={4}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="Outdoor pavilions&#10;Fresh local ingredients&#10;Charcoal BBQ"
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1] font-mono"
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
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
