import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { NavMenuItem, PageItem } from '../types';
import {
  Compass,
  Sparkles,
  Utensils,
  Info,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  MapPin,
  Coffee,
  Wine,
  Music,
  Heart,
  Star,
  Phone,
  Flame,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle2,
  RotateCcw,
  Layers,
  ArrowUpDown,
  Navigation,
  Link as LinkIcon,
  HelpCircle,
} from 'lucide-react';

// Map of available icons for navigation menus
export const NAV_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Sparkles,
  Utensils,
  Info,
  Calendar,
  Image: ImageIcon,
  BookOpen,
  MapPin,
  Coffee,
  Wine,
  Music,
  Heart,
  Star,
  Phone,
  Flame,
  FileText,
  ExternalLink,
  Navigation,
  Link: LinkIcon,
};

export const AdminNavigation: React.FC = () => {
  const {
    navigationMenu,
    pages,
    siteSettings,
    addNavMenuItem,
    updateNavMenuItem,
    deleteNavMenuItem,
    reorderNavMenuItems,
    setNavMenuItems,
    resetNavMenuToDefaults,
  } = useCMS();

  // Active add tab: 'pages' | 'custom'
  const [addMode, setAddMode] = useState<'pages' | 'custom'>('pages');

  // Selected pages for bulk adding
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);

  // Custom link form state
  const [customLabel, setCustomLabel] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customIcon, setCustomIcon] = useState('Compass');
  const [customTarget, setCustomTarget] = useState<'_self' | '_blank'>('_self');
  const [customHighlight, setCustomHighlight] = useState(false);

  // Active expanded item in menu builder
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [pendingDeleteItemId, setPendingDeleteItemId] = useState<string | null>(null);

  // Drag & drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Notification message
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // Sort items by order
  const sortedItems = [...(navigationMenu || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    reorderNavMenuItems(draggedIndex, targetIndex);
    showNotice(`Menu item moved to position ${targetIndex + 1}.`);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Move up / down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sortedItems.length) return;
    reorderNavMenuItems(index, target);
    showNotice(`Item shifted ${direction}.`);
  };

  // Add items from selected pages
  const handleAddSelectedPages = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPageIds.length === 0) return;

    let addedCount = 0;
    selectedPageIds.forEach((pageId) => {
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        // Map default icon based on template
        let iconName = 'Compass';
        if (page.template === 'experience') iconName = 'Sparkles';
        else if (page.template === 'menu') iconName = 'Utensils';
        else if (page.template === 'story') iconName = 'Info';
        else if (page.template === 'events') iconName = 'Calendar';
        else if (page.template === 'gallery') iconName = 'Image';
        else if (page.template === 'blog') iconName = 'BookOpen';
        else if (page.template === 'location') iconName = 'MapPin';

        addNavMenuItem({
          label: page.navLabel || page.title,
          pageId: page.id,
          url: `#${page.slug || page.id}`,
          icon: iconName,
          isVisible: true,
          order: sortedItems.length + 1 + addedCount,
          target: '_self',
        });
        addedCount++;
      }
    });

    showNotice(`Added ${addedCount} page(s) to the navigation menu.`);
    setSelectedPageIds([]);
  };

  // Add custom link
  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel.trim() || !customUrl.trim()) return;

    addNavMenuItem({
      label: customLabel.trim(),
      url: customUrl.trim(),
      icon: customIcon,
      isVisible: true,
      order: sortedItems.length + 1,
      target: customTarget,
      highlight: customHighlight,
    });

    showNotice(`Added custom link "${customLabel.trim()}" to menu.`);
    setCustomLabel('');
    setCustomUrl('');
    setCustomTarget('_self');
    setCustomHighlight(false);
  };

  // Sync all published pages
  const handleSyncAllPages = () => {
    const existingPageIds = new Set(sortedItems.filter((i) => i.pageId).map((i) => i.pageId));
    const unaddedPages = pages.filter((p) => p.status === 'published' && !existingPageIds.has(p.id));

    if (unaddedPages.length === 0) {
      showNotice('All published pages are already included in the navigation menu.');
      return;
    }

    let addedCount = 0;
    unaddedPages.forEach((page) => {
      let iconName = 'Compass';
      if (page.template === 'experience') iconName = 'Sparkles';
      else if (page.template === 'menu') iconName = 'Utensils';
      else if (page.template === 'story') iconName = 'Info';
      else if (page.template === 'events') iconName = 'Calendar';
      else if (page.template === 'gallery') iconName = 'Image';
      else if (page.template === 'blog') iconName = 'BookOpen';
      else if (page.template === 'location') iconName = 'MapPin';

      addNavMenuItem({
        label: page.navLabel || page.title,
        pageId: page.id,
        url: `#${page.slug || page.id}`,
        icon: iconName,
        isVisible: true,
        order: sortedItems.length + 1 + addedCount,
        target: '_self',
      });
      addedCount++;
    });

    showNotice(`Synced ${addedCount} newly published page(s) into navigation.`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Toast Notice */}
      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* WordPress-style Header / Topbar */}
      <div className="bg-white p-5 rounded-lg border border-[#c3c4c7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#2271b1]" />
            <h1 className="text-xl font-bold font-serif text-[#1d2327]">
              Header Navigation Menu
            </h1>
          </div>
          <p className="text-xs text-[#50575e] mt-1 font-light">
            Manage navigation bar links, button positions, icons, visibility, and custom URLs for both desktop and mobile headers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSyncAllPages}
            className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-[#2271b1] border border-blue-200 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
            title="Automatically add any published pages missing from menu"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sync All Pages</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset navigation menu to default website structure? Any custom links will be replaced with defaults.')) {
                resetNavMenuToDefaults();
                showNotice('Navigation menu successfully reset to defaults.');
              }
            }}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>
        </div>
      </div>

      {/* Live Navbar Preview Box */}
      <div className="bg-[#10261D] p-5 rounded-xl border border-[#254F3D] shadow-lg text-[#FDFAF5] space-y-3">
        <div className="flex items-center justify-between border-b border-[#254F3D] pb-2 text-xs">
          <span className="font-semibold text-[#E08E45] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Live Header Preview
          </span>
          <span className="text-[11px] text-gray-400 font-light">
            {sortedItems.filter((i) => i.isVisible).length} visible items in header
          </span>
        </div>

        {/* Mock Desktop Bar */}
        <div className="bg-[#10261D]/90 p-3 rounded-lg border border-[#254F3D]/60 flex items-center justify-between overflow-x-auto gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E08E45]/60 bg-[#10261D] flex items-center justify-center p-0.5">
              <img
                src={siteSettings.logo}
                alt="Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-serif font-bold text-sm text-[#FDFAF5] hidden sm:inline">
              {siteSettings.name}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium overflow-x-auto py-1">
            {sortedItems.map((item) => {
              const IconComp = NAV_ICON_MAP[item.icon || 'Compass'] || Compass;
              if (!item.isVisible) return null;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-1 px-2 py-1 rounded transition-colors whitespace-nowrap ${
                    item.highlight
                      ? 'bg-[#E08E45] text-[#10261D] font-bold shadow-sm'
                      : 'text-[#FDFAF5]/90 hover:text-[#E08E45]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 opacity-80" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-2.5 py-1 rounded-full bg-[#E08E45] text-[#10261D] text-[11px] font-bold">
              Call
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Add Item (Left) & Menu Structure / Reorder (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Add to Menu (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="font-bold text-sm text-[#1d2327] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#2271b1]" />
                <span>Add Menu Items</span>
              </h2>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
              <button
                type="button"
                onClick={() => setAddMode('pages')}
                className={`py-1.5 rounded-md transition-all ${
                  addMode === 'pages'
                    ? 'bg-white text-[#2271b1] shadow-sm'
                    : 'hover:text-gray-900'
                }`}
              >
                Website Pages
              </button>
              <button
                type="button"
                onClick={() => setAddMode('custom')}
                className={`py-1.5 rounded-md transition-all ${
                  addMode === 'custom'
                    ? 'bg-white text-[#2271b1] shadow-sm'
                    : 'hover:text-gray-900'
                }`}
              >
                Custom Link / URL
              </button>
            </div>

            {/* Tab 1: Website Pages Selector */}
            {addMode === 'pages' && (
              <form onSubmit={handleAddSelectedPages} className="space-y-3">
                <p className="text-[11px] text-gray-500 font-light">
                  Select existing pages to place in the header menu:
                </p>

                <div className="max-h-60 overflow-y-auto space-y-1.5 p-2 bg-gray-50 rounded border border-gray-200 text-xs">
                  {pages.map((p) => {
                    const isAlreadyInMenu = sortedItems.some((i) => i.pageId === p.id);
                    const isChecked = selectedPageIds.includes(p.id);

                    return (
                      <label
                        key={p.id}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                          isChecked ? 'bg-blue-50 text-blue-900 font-semibold' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPageIds([...selectedPageIds, p.id]);
                              } else {
                                setSelectedPageIds(selectedPageIds.filter((id) => id !== p.id));
                              }
                            }}
                            className="rounded text-[#2271b1] focus:ring-[#2271b1]"
                          />
                          <span>{p.title}</span>
                        </div>
                        {isAlreadyInMenu && (
                          <span className="text-[10px] text-gray-400 italic">In menu</span>
                        )}
                      </label>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedPageIds.length === pages.length) {
                        setSelectedPageIds([]);
                      } else {
                        setSelectedPageIds(pages.map((p) => p.id));
                      }
                    }}
                    className="text-[11px] text-[#2271b1] hover:underline"
                  >
                    {selectedPageIds.length === pages.length ? 'Deselect All' : 'Select All'}
                  </button>

                  <button
                    type="submit"
                    disabled={selectedPageIds.length === 0}
                    className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] disabled:opacity-50 text-white font-bold text-xs rounded transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Menu</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Custom Link Form */}
            {addMode === 'custom' && (
              <form onSubmit={handleAddCustomLink} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Link Text / Label *
                  </label>
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="e.g. VIP Packages"
                    className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    URL or Section Anchor *
                  </label>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="e.g. #menu, #events or https://instagram.com/..."
                    className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1] font-mono text-[11px]"
                    required
                  />
                  <span className="text-[10px] text-gray-400 font-light mt-0.5 block">
                    Use '#name' for internal page section scroll, or full https:// URL for external.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Choose Icon
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 p-2 bg-gray-50 rounded border border-gray-200 max-h-32 overflow-y-auto">
                    {Object.keys(NAV_ICON_MAP).map((iconKey) => {
                      const IconC = NAV_ICON_MAP[iconKey];
                      const isSelected = customIcon === iconKey;
                      return (
                        <button
                          key={iconKey}
                          type="button"
                          onClick={() => setCustomIcon(iconKey)}
                          title={iconKey}
                          className={`p-1.5 rounded flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all ${
                            isSelected
                              ? 'bg-[#2271b1] text-white font-bold shadow'
                              : 'hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <IconC className="w-4 h-4" />
                          <span className="truncate w-full text-center text-[9px]">{iconKey}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={customTarget === '_blank'}
                      onChange={(e) => setCustomTarget(e.target.checked ? '_blank' : '_self')}
                      className="rounded text-[#2271b1] focus:ring-[#2271b1]"
                    />
                    <span>Open link in new tab</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={customHighlight}
                      onChange={(e) => setCustomHighlight(e.target.checked)}
                      className="rounded text-[#2271b1] focus:ring-[#2271b1]"
                    />
                    <span>Highlight button with accent badge</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Link</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Menu Structure & Draggable Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
              <div>
                <h2 className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#2271b1]" />
                  <span>Menu Structure & Order</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-light mt-0.5">
                  Drag items by the grip handle, use arrow buttons, or adjust the dropdown position to reorder.
                </p>
              </div>

              <div className="text-xs text-gray-500 font-medium">
                Total Items: {sortedItems.length}
              </div>
            </div>

            {/* List of Draggable Nav Menu Items */}
            <div className="space-y-2.5">
              {sortedItems.length > 0 ? (
                sortedItems.map((item, index) => {
                  const IconComp = NAV_ICON_MAP[item.icon || 'Compass'] || Compass;
                  const isExpanded = expandedItemId === item.id;
                  const isDragging = draggedIndex === index;
                  const isDragOver = dragOverIndex === index;

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`rounded-lg border transition-all ${
                        isDragging
                          ? 'opacity-40 border-dashed border-[#2271b1] bg-blue-50/50'
                          : isDragOver
                          ? 'border-2 border-[#2271b1] bg-blue-50/70 scale-[1.01]'
                          : 'border-gray-200 hover:border-gray-300 bg-[#fbfbfb]'
                      }`}
                    >
                      {/* Main Item Row Header */}
                      <div className="p-3 flex items-center justify-between gap-3">
                        {/* Drag Handle & Position Indicator */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div
                            className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-200"
                            title="Drag to rearrange position"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          {/* Position Selector Dropdown */}
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold text-gray-400">#</span>
                            <select
                              value={index}
                              onChange={(e) => {
                                const targetIdx = parseInt(e.target.value, 10);
                                if (!isNaN(targetIdx) && targetIdx !== index) {
                                  reorderNavMenuItems(index, targetIdx);
                                  showNotice(`Moved "${item.label}" to position ${targetIdx + 1}`);
                                }
                              }}
                              className="text-[11px] font-bold text-[#1d2327] bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-1.5 py-0.5 cursor-pointer outline-none"
                            >
                              {sortedItems.map((_, i) => (
                                <option key={i} value={i}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Title & Badge */}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-7 h-7 rounded bg-blue-50 border border-blue-100 text-[#2271b1] flex items-center justify-center shrink-0">
                            <IconComp className="w-3.5 h-3.5" />
                          </div>

                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-[#1d2327] truncate">
                                {item.label}
                              </span>
                              {item.highlight && (
                                <span className="px-1.5 py-0.2 text-[9px] bg-amber-100 text-amber-800 font-bold rounded border border-amber-200">
                                  Highlight
                                </span>
                              )}
                              {!item.isVisible && (
                                <span className="px-1.5 py-0.2 text-[9px] bg-gray-200 text-gray-600 font-semibold rounded">
                                  Hidden
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400 font-mono block truncate">
                              {item.url || `#${item.pageId}`}
                            </span>
                          </div>
                        </div>

                        {/* Quick Actions (Move Up / Down, Visibility, Edit, Delete) */}
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Move Up */}
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20 hover:bg-gray-100 rounded"
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>

                          {/* Move Down */}
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'down')}
                            disabled={index === sortedItems.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20 hover:bg-gray-100 rounded"
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>

                          {/* Visibility Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              updateNavMenuItem(item.id, { isVisible: !item.isVisible });
                              showNotice(
                                `Item "${item.label}" is now ${!item.isVisible ? 'visible' : 'hidden'}.`
                              );
                            }}
                            className={`p-1 rounded transition-colors ${
                              item.isVisible
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-gray-400 hover:bg-gray-200'
                            }`}
                            title={item.isVisible ? 'Visible (Click to Hide)' : 'Hidden (Click to Show)'}
                          >
                            {item.isVisible ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>

                          {/* Expand/Collapse Editor */}
                          <button
                            type="button"
                            onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                            className="px-2 py-1 text-xs font-semibold text-[#2271b1] hover:bg-blue-50 rounded"
                          >
                            {isExpanded ? 'Close' : 'Edit'}
                          </button>

                          {/* Delete Item */}
                          {pendingDeleteItemId === item.id ? (
                            <span className="inline-flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded text-[10px]">
                              <span className="text-red-700 font-bold">Remove?</span>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteNavMenuItem(item.id);
                                  setPendingDeleteItemId(null);
                                  showNotice(`Removed "${item.label}" from navigation.`);
                                }}
                                className="font-bold underline text-red-700 hover:text-red-900"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setPendingDeleteItemId(null)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                No
                              </button>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPendingDeleteItemId(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable Edit Accordion Body */}
                      {isExpanded && (
                        <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                Navigation Label
                              </label>
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) =>
                                  updateNavMenuItem(item.id, { label: e.target.value })
                                }
                                className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                Target URL / Anchor
                              </label>
                              <input
                                type="text"
                                value={item.url || ''}
                                onChange={(e) =>
                                  updateNavMenuItem(item.id, { url: e.target.value })
                                }
                                className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1] font-mono text-[11px]"
                              />
                            </div>
                          </div>

                          {/* Link to Existing Page Dropdown */}
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">
                              Or Link Directly to Website Page
                            </label>
                            <select
                              value={item.pageId || ''}
                              onChange={(e) => {
                                const pId = e.target.value;
                                const linkedP = pages.find((p) => p.id === pId);
                                updateNavMenuItem(item.id, {
                                  pageId: pId || undefined,
                                  url: linkedP ? `#${linkedP.slug || linkedP.id}` : item.url,
                                });
                              }}
                              className="w-full text-xs p-2 border border-gray-300 rounded bg-white outline-none focus:border-[#2271b1]"
                            >
                              <option value="">-- Custom URL (Not linked to single page) --</option>
                              {pages.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.title} (/{p.slug || p.id})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Icon Selector Grid */}
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">
                              Select Menu Icon
                            </label>
                            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 p-2 bg-gray-50 rounded border border-gray-200 max-h-28 overflow-y-auto">
                              {Object.keys(NAV_ICON_MAP).map((iconKey) => {
                                const IconC = NAV_ICON_MAP[iconKey];
                                const isSelected = item.icon === iconKey;
                                return (
                                  <button
                                    key={iconKey}
                                    type="button"
                                    onClick={() =>
                                      updateNavMenuItem(item.id, { icon: iconKey })
                                    }
                                    title={iconKey}
                                    className={`p-1.5 rounded flex flex-col items-center justify-center gap-0.5 text-[9px] transition-all ${
                                      isSelected
                                        ? 'bg-[#2271b1] text-white font-bold shadow'
                                        : 'hover:bg-gray-200 text-gray-700'
                                    }`}
                                  >
                                    <IconC className="w-3.5 h-3.5" />
                                    <span className="truncate w-full text-center">{iconKey}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Toggles */}
                          <div className="flex flex-wrap items-center gap-4 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                              <input
                                type="checkbox"
                                checked={item.target === '_blank'}
                                onChange={(e) =>
                                  updateNavMenuItem(item.id, {
                                    target: e.target.checked ? '_blank' : '_self',
                                  })
                                }
                                className="rounded text-[#2271b1] focus:ring-[#2271b1]"
                              />
                              <span>Open in new tab</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                              <input
                                type="checkbox"
                                checked={item.highlight || false}
                                onChange={(e) =>
                                  updateNavMenuItem(item.id, { highlight: e.target.checked })
                                }
                                className="rounded text-[#2271b1] focus:ring-[#2271b1]"
                              />
                              <span>Highlight with accent badge</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                              <input
                                type="checkbox"
                                checked={item.isVisible}
                                onChange={(e) =>
                                  updateNavMenuItem(item.id, { isVisible: e.target.checked })
                                }
                                className="rounded text-[#2271b1] focus:ring-[#2271b1]"
                              />
                              <span>Visible in Header</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-gray-50 border border-dashed rounded-lg text-xs text-gray-500 space-y-2">
                  <p>No navigation menu items currently added.</p>
                  <button
                    type="button"
                    onClick={resetNavMenuToDefaults}
                    className="px-3 py-1.5 bg-[#2271b1] text-white font-bold rounded shadow text-xs"
                  >
                    Restore Default Navigation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
