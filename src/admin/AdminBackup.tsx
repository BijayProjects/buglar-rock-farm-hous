import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Database, Download, Upload, RefreshCw, CheckCircle2, AlertTriangle, FileJson, Copy, Check } from 'lucide-react';

export const AdminBackup: React.FC = () => {
  const { exportJSON, importJSON, resetToDefaults } = useCMS();

  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buglay_rock_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('success', 'Backup JSON file downloaded to your computer.');
  };

  const handleCopyJSON = () => {
    const jsonStr = exportJSON();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showNotice('success', 'Complete database JSON copied to clipboard.');
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;

    if (window.confirm('Importing will overwrite your current site data with the provided backup. Do you want to proceed?')) {
      const res = importJSON(importText.trim());
      if (res.success) {
        showNotice('success', res.message);
        setImportText('');
      } else {
        showNotice('error', res.message);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all CMS content to factory default demo data? All custom edits will be reverted.')) {
      resetToDefaults();
      showNotice('success', 'All site data reset to factory demo defaults.');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Tools, Import & Export</span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Download full site backups, restore from a JSON file, or reset to original demo seed content.
          </p>
        </div>
      </div>

      {notice && (
        <div
          className={`p-3.5 rounded border-l-4 text-xs font-medium flex items-center gap-2 ${
            notice.type === 'success'
              ? 'bg-[#e7f5ea] border-[#00a32a] text-[#00a32a]'
              : 'bg-red-50 border-red-600 text-red-700'
          }`}
        >
          {notice.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      {/* 3 Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#1d2327] font-serif flex items-center gap-2 pb-2 border-b">
              <Download className="w-4 h-4 text-[#2271b1]" />
              <span>Export Database (Backup)</span>
            </h2>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Generate a snapshot containing all menu dishes, experiences, event packages, photos, customer reviews, booking leads, and general settings.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-2">
            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs rounded shadow flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .JSON Backup File</span>
            </button>
            <button
              onClick={handleCopyJSON}
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded border flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00a32a]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
          </div>
        </div>

        {/* Reset Card */}
        <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#d63638] font-serif flex items-center gap-2 pb-2 border-b">
              <RefreshCw className="w-4 h-4 text-[#d63638]" />
              <span>Reset to Default Data</span>
            </h2>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Restore the initial Buglay Rock Farm House dataset (authentic Nepali menu, hill experiences, sample gallery photos, verified reviews).
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-[#d63638] border border-red-200 font-semibold text-xs rounded flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore Factory Default Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Import Card */}
      <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
        <h2 className="text-base font-bold text-[#1d2327] font-serif flex items-center gap-2 pb-2 border-b">
          <Upload className="w-4 h-4 text-[#00a32a]" />
          <span>Import / Restore from Backup</span>
        </h2>

        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Select Backup .JSON File:
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#2271b1] file:text-white hover:file:bg-[#135e96] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Or Paste Backup JSON Raw String:
            </label>
            <textarea
              rows={4}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='{"siteSettings": {...}, "menuItems": [...]}'
              className="w-full text-xs font-mono p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
            />
          </div>

          <button
            type="submit"
            disabled={!importText.trim()}
            className="px-5 py-2.5 bg-[#00a32a] hover:bg-[#008a20] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded shadow transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Restore & Overwrite Site Content</span>
          </button>
        </form>
      </div>
    </div>
  );
};
