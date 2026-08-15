import React, { useState, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaModal } from './MediaModal';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Edit2,
  Link,
  ExternalLink,
  Copy,
  Check,
  Plus
} from 'lucide-react';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  helperText?: string;
  previewHeight?: string;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://...',
  helperText,
  previewHeight = 'h-36',
  className = '',
}) => {
  const { uploadMediaFiles } = useCMS();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded = await uploadMediaFiles(files);
      if (uploaded.length > 0) {
        onChange(uploaded[0].url);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file.');
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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-800">
          {label}
        </label>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      {/* When Image is Present */}
      {value ? (
        <div className="bg-white rounded-lg border border-gray-300 p-3 shadow-xs space-y-2.5">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-md overflow-hidden bg-gray-100 border border-gray-200 group ${previewHeight} ${
              isDragging ? 'ring-2 ring-[#2271b1] bg-blue-50/70' : ''
            }`}
          >
            <img
              src={value}
              alt="Field preview"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/600x400?text=Invalid+Image+URL';
              }}
            />

            {/* Hover overlay with quick actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded shadow flex items-center gap-1.5 transition-colors"
                title="Select from Media Library"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#2271b1]" />
                <span>Media Library</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow flex items-center gap-1.5 transition-colors"
                title="Upload New Image File"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload New</span>
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded shadow transition-colors"
                title="Remove Image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Drag drop hint banner when dragged over */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-600/80 text-white flex flex-col items-center justify-center gap-1">
                <UploadCloud className="w-8 h-8 animate-bounce" />
                <span className="text-xs font-bold">Drop new image here to replace</span>
              </div>
            )}
          </div>

          {/* Action Row below preview */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="px-2.5 py-1 bg-[#f0f0f1] hover:bg-[#dcdcde] text-gray-800 text-xs font-semibold rounded border border-[#8c8f94] flex items-center gap-1 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#2271b1]" />
                <span>Select from Media</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 bg-[#f0f0f1] hover:bg-[#dcdcde] text-gray-800 text-xs font-semibold rounded border border-[#8c8f94] flex items-center gap-1 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#2271b1]" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                title="Edit Direct URL"
              >
                <Link className="w-3 h-3" />
                <span className="text-[11px]">{showUrlInput ? 'Hide URL' : 'Edit URL'}</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded"
                title="Copy Image URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                className="text-[11px] text-[#d63638] hover:underline font-medium"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Collapsible Direct URL input */}
          {showUrlInput && (
            <div className="pt-2 border-t border-gray-200">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-gray-50 font-mono text-gray-700 outline-none focus:bg-white focus:border-[#2271b1]"
              />
            </div>
          )}
        </div>
      ) : (
        /* When No Image is Selected: Dropzone & Selector */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-5 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-3 bg-[#f6f7f7] ${
            isDragging
              ? 'border-[#2271b1] bg-blue-50/80 scale-[1.01]'
              : 'border-[#c3c4c7] hover:border-[#8c8f94]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#2271b1] shadow-xs">
            {isUploading ? (
              <UploadCloud className="w-6 h-6 animate-pulse text-[#2271b1]" />
            ) : (
              <ImageIcon className="w-6 h-6 text-[#2271b1]" />
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-[#1d2327]">
              {isDragging ? 'Drop image file here to upload' : 'Drag & drop image file here'}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              or select from existing media / direct link
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => setIsMediaModalOpen(true)}
              className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Select from Media</span>
            </button>

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded border border-[#8c8f94] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#2271b1]" />
              <span>{isUploading ? 'Uploading...' : 'Upload New File'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <Link className="w-3 h-3" />
              <span>Paste URL</span>
            </button>
          </div>

          {/* Direct URL input if expanded */}
          {showUrlInput && (
            <div className="w-full max-w-md pt-2 border-t border-gray-200">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs p-2 border border-[#8c8f94] rounded bg-white font-mono outline-none focus:border-[#2271b1]"
              />
            </div>
          )}
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-gray-500 font-light italic">
          {helperText}
        </p>
      )}

      {/* WordPress Media Modal */}
      <MediaModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={(url) => onChange(url)}
        selectedUrl={value}
        title={label ? `Select Image for ${label}` : 'Select or Upload Media'}
      />
    </div>
  );
};
