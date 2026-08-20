import React, { useState } from 'react';
import { CustomField } from '../../types';
import { ImageUploadField } from './ImageUploadField';
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Plus,
  Sparkles,
  ExternalLink,
  Info,
  Layers,
  ArrowUpDown
} from 'lucide-react';

interface DraggableAcfFieldGroupProps {
  title?: string;
  description?: string;
  fields: CustomField[];
  onUpdateField: (fieldKey: string, newValue: string) => void;
  onAddField: (field: CustomField) => void;
  onDeleteField: (fieldKey: string) => void;
  onReorderFields: (startIndex: number, endIndex: number) => void;
  onSetFields?: (fields: CustomField[]) => void;
  onShowNotice?: (message: string) => void;
}

export const DraggableAcfFieldGroup: React.FC<DraggableAcfFieldGroupProps> = ({
  title = 'Custom Fields (Custom Field Group)',
  description = "Edit the exact key-value fields powering this page's layout and content. Drag to rearrange section order.",
  fields,
  onUpdateField,
  onAddField,
  onDeleteField,
  onReorderFields,
  onSetFields,
  onShowNotice,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);

  // New field form state
  const [newLabel, setNewLabel] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newType, setNewType] = useState<CustomField['type']>('text');
  const [newDesc, setNewDesc] = useState('');

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex !== targetIndex) {
      onReorderFields(draggedIndex, targetIndex);
      if (onShowNotice) {
        onShowNotice(`Field moved to position #${targetIndex + 1}`);
      }
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Move Up 1 position
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    onReorderFields(index, index - 1);
    if (onShowNotice) {
      onShowNotice(`Moved "${fields[index]?.label}" up to position #${index}`);
    }
  };

  // Move Down 1 position
  const handleMoveDown = (index: number) => {
    if (index >= fields.length - 1) return;
    onReorderFields(index, index + 1);
    if (onShowNotice) {
      onShowNotice(`Moved "${fields[index]?.label}" down to position #${index + 2}`);
    }
  };

  // Direct Position Jump
  const handlePositionChange = (currentIndex: number, newPosition: number) => {
    const targetIndex = newPosition - 1;
    if (targetIndex === currentIndex || targetIndex < 0 || targetIndex >= fields.length) return;
    onReorderFields(currentIndex, targetIndex);
    if (onShowNotice) {
      onShowNotice(`Field positioned at #${newPosition}`);
    }
  };

  // Duplicate Field
  const handleDuplicate = (field: CustomField) => {
    const duplicatedField: CustomField = {
      ...field,
      label: `${field.label} (Copy)`,
      key: `${field.key}_copy_${Date.now().toString().slice(-4)}`,
    };
    onAddField(duplicatedField);
    if (onShowNotice) {
      onShowNotice(`Duplicated field as "${duplicatedField.label}"`);
    }
  };

  // Submit Add Field
  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newKey.trim()) return;

    onAddField({
      label: newLabel.trim(),
      key: newKey.trim(),
      type: newType,
      value: '',
      description: newDesc.trim() || undefined,
    });

    if (onShowNotice) {
      onShowNotice(`Custom Field "${newLabel}" added!`);
    }

    setNewLabel('');
    setNewKey('');
    setNewType('text');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <div id="custom-field-group-container" className="bg-white p-5 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e08e45]" />
            <span>{title}</span>
            <span className="text-[11px] font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {fields.length} {fields.length === 1 ? 'field' : 'fields'}
            </span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="add-custom-field-button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f6fc] hover:bg-[#e1edfa] text-[#2271b1] hover:text-[#135e96] border border-[#2271b1]/30 hover:border-[#2271b1] font-bold text-xs rounded transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Close Form' : 'Add Custom Field'}</span>
          </button>
        </div>
      </div>

      {/* Add New Field Form Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleCreateField}
          id="new-custom-field-form"
          className="p-4 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 rounded-lg border border-blue-200 space-y-3 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>Define New Custom Field</span>
            </span>
            <span className="text-[10px] text-blue-700 uppercase tracking-wider font-semibold">
              Field Schema
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Field Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => {
                  setNewLabel(e.target.value);
                  if (!newKey) {
                    setNewKey(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9_]/g, '_')
                        .replace(/_+/g, '_')
                    );
                  }
                }}
                placeholder="e.g. Section Header Title"
                className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Field Key / Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g. section_header_title"
                className="w-full text-xs p-2 border border-gray-300 rounded bg-white font-mono outline-none focus:border-[#2271b1]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Field Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1]"
              >
                <option value="text">Text (Single Line)</option>
                <option value="textarea">Textarea (Multi-line Body)</option>
                <option value="image">Image (Media Library & Dropzone)</option>
                <option value="number">Number</option>
                <option value="url">URL Link</option>
                <option value="boolean">Toggle / Switch</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Instructions / Description (Optional)
            </label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="e.g. Display title for this content block or section header."
              className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-xs rounded shadow"
            >
              Add Field to Group
            </button>
          </div>
        </form>
      )}

      {/* Field List: Draggable, Reorderable with Position Badge */}
      <div className="space-y-3" id="acf-draggable-fields-list">
        {fields && fields.length > 0 ? (
          fields.map((field, index) => {
            const isDragging = draggedIndex === index;
            const isOver = dragOverIndex === index && draggedIndex !== index;

            return (
              <div
                key={field.key || index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                id={`acf-field-card-${field.key}`}
                className={`p-4 rounded-lg border transition-all duration-150 ${
                  isDragging
                    ? 'opacity-40 bg-blue-50 border-dashed border-[#2271b1] scale-[0.99]'
                    : isOver
                    ? 'border-[#2271b1] ring-2 ring-[#2271b1]/20 bg-blue-50/40 translate-y-0.5'
                    : 'bg-[#fafafa] hover:bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {/* Field Top Bar: Drag Handle, Position, Labels, Actions */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-gray-100">
                  {/* Left: Drag Handle + Position Indicator + Title */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Drag Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                      title="Drag to rearrange position"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    {/* Position Selector Badge */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Pos
                      </span>
                      <select
                        value={index + 1}
                        onChange={(e) => handlePositionChange(index, parseInt(e.target.value, 10))}
                        className="text-[11px] font-bold text-[#2271b1] bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 cursor-pointer outline-none hover:bg-blue-100"
                        title="Change field position number"
                      >
                        {fields.map((_, i) => (
                          <option key={i} value={i + 1}>
                            #{i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Field Label */}
                    <span className="font-bold text-xs text-[#1d2327]">
                      {field.label}
                    </span>

                    {/* Field Key */}
                    <code className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
                      {field.key}
                    </code>

                    {/* Field Type Tag */}
                    <span className="text-[9px] uppercase font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded">
                      {field.type}
                    </span>
                  </div>

                  {/* Right: Move Up/Down Buttons, Duplicate, Delete */}
                  <div className="flex items-center gap-1">
                    {/* Move Up Button */}
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className={`p-1 rounded transition-colors ${
                        index === 0
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'
                      }`}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down Button */}
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === fields.length - 1}
                      className={`p-1 rounded transition-colors ${
                        index === fields.length - 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'
                      }`}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Duplicate Field */}
                    <button
                      type="button"
                      onClick={() => handleDuplicate(field)}
                      className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Duplicate Field"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Field with Inline Confirmation */}
                    {confirmDeleteKey === field.key ? (
                      <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2 py-0.5 rounded shadow-sm">
                        <span className="text-[10px] font-bold text-red-700">Delete?</span>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteField(field.key);
                            setConfirmDeleteKey(null);
                            if (onShowNotice) {
                              onShowNotice(`Field "${field.label}" deleted.`);
                            }
                          }}
                          className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded transition-colors"
                          title="Confirm Delete"
                        >
                          Yes, Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteKey(null)}
                          className="px-1.5 py-0.5 text-gray-500 hover:text-gray-800 text-[10px] rounded hover:bg-gray-200 transition-colors"
                          title="Cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteKey(field.key)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Delete Field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Field Description / Hint */}
                {field.description && (
                  <p className="text-[11px] text-gray-500 italic mb-2">
                    {field.description}
                  </p>
                )}

                {/* Field Input Control */}
                <div className="mt-1">
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={field.value || ''}
                      onChange={(e) => onUpdateField(field.key, e.target.value)}
                      placeholder="Enter multi-line text or markdown..."
                      className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                    />
                  ) : field.type === 'image' || field.key.includes('image') || field.key.includes('photo') || field.key.includes('banner') ? (
                    <ImageUploadField
                      value={field.value || ''}
                      onChange={(newUrl) => onUpdateField(field.key, newUrl)}
                      placeholder="https://images.unsplash.com/..."
                      previewHeight="h-28"
                    />
                  ) : field.type === 'boolean' ? (
                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={field.value === 'true' || field.value === '1'}
                        onChange={(e) => onUpdateField(field.key, e.target.checked ? 'true' : 'false')}
                        className="rounded border-gray-300 text-[#2271b1] focus:ring-[#2271b1] h-4 w-4"
                      />
                      <span className="text-xs text-gray-700 font-medium">
                        {field.value === 'true' || field.value === '1' ? 'Enabled (True)' : 'Disabled (False)'}
                      </span>
                    </label>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={field.value || ''}
                      onChange={(e) => onUpdateField(field.key, e.target.value)}
                      placeholder="Enter field value..."
                      className="w-full text-xs p-2.5 border border-[#8c8f94] rounded bg-white outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                    />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 space-y-2">
            <Layers className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-600 font-medium">
              No custom fields configured for this section yet.
            </p>
            <p className="text-[11px] text-gray-400">
              Click &quot;Add Custom ACF Field&quot; above to create dynamic content fields that you can drag and rearrange.
            </p>
          </div>
        )}
      </div>

      {/* Reordering helper footer tip */}
      {fields && fields.length > 1 && (
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
          <span className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#2271b1]" />
            <span>
              <strong>Tip:</strong> Grab the <GripVertical className="w-3 h-3 inline text-gray-500" /> icon to drag fields into any sequence, or use the <strong>Pos</strong> selector / arrows.
            </span>
          </span>
          <span className="text-gray-400 font-mono">
            {fields.length} blocks active
          </span>
        </div>
      )}
    </div>
  );
};
