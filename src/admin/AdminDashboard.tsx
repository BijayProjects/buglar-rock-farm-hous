import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  UtensilsCrossed,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Star,
  Inbox,
  Clock,
  ArrowRight,
  Plus,
  CheckCircle2,
  Phone,
  FileText,
  Settings,
  ExternalLink,
  ShieldCheck,
  Flame,
  Bell,
  CheckCheck,
  Check,
  Trash2,
  Eye,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onVisitSite: () => void;
}

function formatRelativeTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recent';
  }
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onVisitSite,
}) => {
  const {
    siteSettings,
    menuItems,
    experiences,
    eventPackages,
    galleryItems,
    testimonials,
    inquiries,
    pages,
    blogPosts,
    mediaLibrary,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markNotificationAsUnread,
    markAllNotificationsAsRead,
    deleteNotification,
    updateInquiryStatus,
  } = useCMS();

  const [quickNote, setQuickNote] = useState('');
  const [savedNote, setSavedNote] = useState<string | null>(() => {
    return localStorage.getItem('buglay_admin_quick_note') || null;
  });
  const [noteNotice, setNoteNotice] = useState(false);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNote.trim()) return;
    localStorage.setItem('buglay_admin_quick_note', quickNote.trim());
    setSavedNote(quickNote.trim());
    setQuickNote('');
    setNoteNotice(true);
    setTimeout(() => setNoteNotice(false), 3000);
  };

  const pendingInquiries = inquiries.filter((i) => i.status === 'new');
  const recentInquiries = inquiries.slice(0, 4);
  const recentNotifications = (notifications || []).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* WordPress-style Welcome Banner */}
      <div className="bg-white rounded-lg border border-[#c3c4c7] p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E08E45]">
                Live Synced Database • Real-Time Control Center
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d2327]">
              Welcome to {siteSettings.name} CMS
            </h1>
            <p className="text-sm text-[#50575e] mt-1 max-w-2xl font-light">
              Manage your real-time customer inquiries, live custom page fields, food and beverage menu items, and guest ratings with instant database persistence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onVisitSite}
              className="px-4 py-2.5 bg-[#10261D] hover:bg-[#254F3D] text-[#E08E45] font-bold text-xs sm:text-sm rounded shadow transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Site Preview</span>
            </button>
          </div>
        </div>

        {/* 3 Onboarding Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-[#dcdcde]">
          <div>
            <h3 className="font-bold text-sm text-[#1d2327] mb-2 flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-[#2271b1]" />
              <span>Culinary Menu</span>
            </h3>
            <p className="text-xs text-[#50575e] mb-3">
              Add new Himalayan dishes, update prices, adjust spice levels, or toggle vegetarian tags.
            </p>
            <button
              onClick={() => onNavigateTab('menu')}
              className="text-xs font-semibold text-[#2271b1] hover:text-[#135e96] flex items-center gap-1"
            >
              Manage Digital Menu →
            </button>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#1d2327] mb-2 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#E08E45]" />
              <span>Booking Inquiries</span>
            </h3>
            <p className="text-xs text-[#50575e] mb-3">
              Review customer reservation submissions, update statuses (Contacted/Confirmed), and save notes.
            </p>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-semibold text-[#2271b1] hover:text-[#135e96] flex items-center gap-1"
            >
              View Inquiries ({pendingInquiries.length} New) →
            </button>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#1d2327] mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#00a32a]" />
              <span>Brand & Site Identity</span>
            </h3>
            <p className="text-xs text-[#50575e] mb-3">
              Update phone numbers, Google Maps location, Instagram links, and opening hours instantly.
            </p>
            <button
              onClick={() => onNavigateTab('settings')}
              className="text-xs font-semibold text-[#2271b1] hover:text-[#135e96] flex items-center gap-1"
            >
              Customize Settings →
            </button>
          </div>
        </div>
      </div>

      {/* Grid: At a Glance + Quick Draft & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: At a Glance + Recent Inquiries */}
        <div className="lg:col-span-8 space-y-6">
          {/* At a Glance Box */}
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-5 shadow-sm">
            <h2 className="font-bold text-sm text-[#1d2327] pb-3 border-b border-[#dcdcde] flex items-center justify-between">
              <span>At a Glance</span>
              <span className="text-xs font-normal text-[#00a32a] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00a32a] inline-block animate-pulse" />
                Live Synced Database
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              <div
                onClick={() => onNavigateTab('media')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#10261D]">{mediaLibrary?.length || 10}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <ImageIcon className="w-3 h-3 text-[#2271b1]" />
                  <span>Media Files</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('pages')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#10261D]">{pages?.length || 8}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <FileText className="w-3 h-3 text-[#2271b1]" />
                  <span>Pages & Content</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('pages')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#10261D]">{blogPosts?.length || 4}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <Flame className="w-3 h-3 text-[#E08E45]" />
                  <span>Blog Posts</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('menu')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#10261D]">{menuItems.length}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <UtensilsCrossed className="w-3 h-3 text-[#2271b1]" />
                  <span>Dishes</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('inquiries')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#E08E45]">{inquiries.length}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <Inbox className="w-3 h-3 text-[#E08E45]" />
                  <span>Inquiries ({pendingInquiries.length})</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('experiences')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#10261D]">{experiences.length}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-[#00a32a]" />
                  <span>Experiences</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('gallery')}
                className="cursor-pointer p-3 rounded bg-[#f6f7f7] hover:bg-[#edf2f7] border border-[#dcdcde] transition-all"
              >
                <div className="text-xl font-bold font-serif text-[#10261D]">{galleryItems.length}</div>
                <div className="text-[11px] text-[#50575e] font-medium flex items-center gap-1 mt-1">
                  <ImageIcon className="w-3 h-3 text-[#2271b1]" />
                  <span>Photos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Live Notification Stream Widget */}
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcdcde]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#E08E45]" />
                <h2 className="font-bold text-sm text-[#1d2327]">Real-Time Notifications Stream</h2>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-[#E08E45] text-[#10261D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadNotificationsCount} Unread
                  </span>
                )}
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs font-semibold text-[#00a32a] hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {recentNotifications.length === 0 ? (
                <div className="py-6 text-center text-gray-500 text-xs">
                  <p className="font-medium text-gray-600">No active notifications.</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Real table reservations submitted on the website will be logged here in real time.
                  </p>
                </div>
              ) : (
                recentNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`py-3 flex items-start justify-between gap-3 text-xs ${
                      !notif.isRead ? 'bg-amber-50/60 -mx-5 px-5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <div className="mt-1">
                        {!notif.isRead ? (
                          <span className="block w-2 h-2 rounded-full bg-[#E08E45]" />
                        ) : (
                          <span className="block w-2 h-2 rounded-full bg-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-semibold ${!notif.isRead ? 'text-[#1d2327]' : 'text-gray-600'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {formatRelativeTime(notif.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-[11px] mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          {notif.linkTab && (
                            <button
                              onClick={() => onNavigateTab(notif.linkTab!)}
                              className="text-[11px] font-semibold text-[#2271b1] hover:underline flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View in {notif.linkTab}</span>
                            </button>
                          )}
                          {!notif.isRead ? (
                            <button
                              onClick={() => markNotificationAsRead(notif.id)}
                              className="text-[11px] text-gray-500 hover:text-gray-800 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3 text-[#00a32a]" />
                              <span>Mark as read</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => markNotificationAsUnread(notif.id)}
                              className="text-[11px] text-gray-400 hover:text-gray-700"
                            >
                              Mark as unread
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="text-gray-300 hover:text-red-500 p-1 shrink-0"
                      title="Remove notification"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Inquiries List */}
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcdcde]">
              <h2 className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#2271b1]" />
                <span>Recent Booking Inquiries</span>
              </h2>
              <button
                onClick={() => onNavigateTab('inquiries')}
                className="text-xs font-semibold text-[#2271b1] hover:text-[#135e96]"
              >
                View All ({inquiries.length}) →
              </button>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {recentInquiries.length === 0 ? (
                <div className="py-6 text-center text-gray-500 text-xs">
                  <p className="font-medium text-gray-600">No booking inquiries logged yet.</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Customer reservations submitted on the website will be recorded here immediately.
                  </p>
                </div>
              ) : (
                recentInquiries.map((inq) => (
                  <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#1d2327]">{inq.fullName}</strong>
                        <span className="text-xs font-mono text-gray-500">({inq.phone})</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            inq.status === 'new'
                              ? 'bg-[#d63638]/10 text-[#d63638] border border-[#d63638]/30'
                              : inq.status === 'confirmed'
                              ? 'bg-[#00a32a]/10 text-[#00a32a]'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span>Date: <strong>{inq.visitDate || 'Flexible'}</strong></span> • 
                        <span className="ml-1">Guests: <strong>{inq.guestCount}</strong></span> • 
                        <span className="ml-1">Occasion: <em>{inq.occasion}</em></span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${inq.phone}`}
                        className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs font-medium text-[#2c3338] flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#00a32a]" />
                        <span>Call</span>
                      </a>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="text-xs px-2 py-1 bg-white border border-[#8c8f94] rounded text-gray-800"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Draft & Site Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Draft Box */}
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-5 shadow-sm">
            <h2 className="font-bold text-sm text-[#1d2327] pb-3 border-b border-[#dcdcde]">
              Quick Staff Scratchpad
            </h2>

            {noteNotice && (
              <div className="my-2 p-2 rounded bg-[#f0f6fc] border border-[#2271b1]/30 text-xs text-[#2271b1]">
                ✓ Note saved locally.
              </div>
            )}

            <form onSubmit={handleSaveNote} className="space-y-3 pt-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Internal Manager Notes / Prep List
                </label>
                <textarea
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  rows={3}
                  placeholder="e.g., Saturday evening acoustic band arriving at 4:30 PM..."
                  className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 px-3 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow-sm transition-colors"
              >
                Save Scratchpad Note
              </button>
            </form>

            {savedNote && (
              <div className="mt-4 p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <div className="font-bold text-[11px] uppercase tracking-wider text-amber-800 mb-1">
                  Current Note:
                </div>
                <p className="whitespace-pre-line">{savedNote}</p>
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-lg border border-[#c3c4c7] p-5 shadow-sm space-y-2">
            <h2 className="font-bold text-sm text-[#1d2327] pb-2 border-b border-[#dcdcde]">
              Quick Shortcuts
            </h2>
            <div className="space-y-1.5 pt-1 text-xs">
              <button
                onClick={() => onNavigateTab('menu')}
                className="w-full text-left p-2 rounded hover:bg-[#f6f7f7] text-[#2271b1] font-medium flex items-center justify-between group"
              >
                <span>+ Add / Edit Menu Item</span>
                <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2271b1]" />
              </button>
              <button
                onClick={() => onNavigateTab('gallery')}
                className="w-full text-left p-2 rounded hover:bg-[#f6f7f7] text-[#2271b1] font-medium flex items-center justify-between group"
              >
                <span>+ Upload / Add Photos</span>
                <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2271b1]" />
              </button>
              <button
                onClick={() => onNavigateTab('pages')}
                className="w-full text-left p-2 rounded hover:bg-[#f6f7f7] text-[#2271b1] font-medium flex items-center justify-between group"
              >
                <span>Edit Pages & Custom ACF Fields</span>
                <FileText className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2271b1]" />
              </button>
              <button
                onClick={() => onNavigateTab('backup')}
                className="w-full text-left p-2 rounded hover:bg-[#f6f7f7] text-[#2271b1] font-medium flex items-center justify-between group"
              >
                <span>Download / Backup Data JSON</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2271b1]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

