import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Star,
  Inbox,
  FileText,
  Palette,
  Settings,
  Database,
  Navigation,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  Menu as MenuIcon,
  X,
  UserCheck,
  CheckCircle,
  AlertCircle,
  CheckCheck,
  Trash2,
  Eye,
  Check,
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onVisitSite: () => void;
  children: React.ReactNode;
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

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onVisitSite,
  children,
}) => {
  const {
    siteSettings,
    adminUser,
    logout,
    inquiries,
    menuItems,
    mediaLibrary,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markNotificationAsUnread,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useCMS();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');

  const pendingInquiriesCount = inquiries.filter((inq) => inq.status === 'new').length;
  const filteredNotifications = notifFilter === 'unread'
    ? (notifications || []).filter((n) => !n.isRead)
    : (notifications || []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'media', label: 'Media Library', icon: ImageIcon, count: (mediaLibrary || []).length },
    { id: 'pages', label: 'Pages & Content', icon: FileText },
    { id: 'navigation', label: 'Navigation Menu', icon: Navigation },
    { id: 'menu', label: 'Menu Items', icon: UtensilsCrossed, count: menuItems.length },
    { id: 'experiences', label: 'Experiences', icon: Sparkles },
    { id: 'events', label: 'Events & Packages', icon: Calendar },
    { id: 'gallery', label: 'Website Gallery', icon: Palette },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'inquiries', label: 'Inquiries & CRM', icon: Inbox, count: pendingInquiriesCount, alert: pendingInquiriesCount > 0 },
    { id: 'settings', label: 'Settings & Branding', icon: Settings },
    { id: 'backup', label: 'Tools & Backup', icon: Database },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#2c3338] font-sans flex flex-col antialiased">
      {/* 1. WordPress-Style Top Admin Bar */}
      <header className="h-11 bg-[#1d2327] text-[#c3c4c7] px-3 sm:px-4 flex items-center justify-between text-xs sticky top-0 z-50 select-none border-b border-[#2c3338] shadow-sm">
        {/* Left: Brand / Home Link + Quick Actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden text-[#c3c4c7] hover:text-white p-1"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          {/* Logo Mark & Site Title */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={onVisitSite}>
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E08E45] bg-[#10261D] shrink-0 flex items-center justify-center p-0.5">
              <img
                src={siteSettings.logo}
                alt="Buglay Rock"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-white tracking-wide hidden sm:inline group-hover:text-[#E08E45] transition-colors">
              {siteSettings.name}
            </span>
          </div>

          {/* "Visit Site" button */}
          <button
            onClick={onVisitSite}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-white hover:text-[#E08E45] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="font-medium">Visit Site</span>
          </button>

          {/* "+ New" Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setNewDropdownOpen(!newDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-[#c3c4c7] hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>

            {newDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-1 w-44 bg-[#1d2327] border border-[#2c3338] rounded shadow-xl py-1 z-50"
                onMouseLeave={() => setNewDropdownOpen(false)}
              >
                <button
                  onClick={() => { onSelectTab('menu'); setNewDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors block text-xs"
                >
                  + Menu Dish
                </button>
                <button
                  onClick={() => { onSelectTab('experiences'); setNewDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors block text-xs"
                >
                  + Experience
                </button>
                <button
                  onClick={() => { onSelectTab('events'); setNewDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors block text-xs"
                >
                  + Event Package
                </button>
                <button
                  onClick={() => { onSelectTab('gallery'); setNewDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors block text-xs"
                >
                  + Media / Photo
                </button>
                <button
                  onClick={() => { onSelectTab('reviews'); setNewDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors block text-xs"
                >
                  + Guest Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Real-Time Notification Center & User Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Real Notification Bell Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="flex items-center gap-1.5 p-1 rounded hover:bg-[#2c3338] text-[#c3c4c7] hover:text-white transition-colors relative"
              title={`${unreadNotificationsCount} Unread Notifications`}
            >
              <Bell className={`w-4 h-4 ${unreadNotificationsCount > 0 ? 'text-[#E08E45] animate-pulse' : ''}`} />
              {unreadNotificationsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#d63638] text-white text-[10px] font-bold">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Real-Time Notification Center Modal / Dropdown */}
            {notificationsOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white text-[#2c3338] border border-[#c3c4c7] rounded-lg shadow-2xl py-0 z-50 overflow-hidden"
              >
                {/* Notification Center Header */}
                <div className="bg-[#1d2327] text-white px-4 py-3 flex items-center justify-between border-b border-[#2c3338]">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#E08E45]" />
                    <span className="font-bold text-xs">Real-Time Notifications</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="bg-[#E08E45] text-[#10261D] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {unreadNotificationsCount} New
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <>
                        <button
                          onClick={markAllNotificationsAsRead}
                          title="Mark all as read"
                          className="text-[11px] text-gray-300 hover:text-white flex items-center gap-1 hover:underline"
                        >
                          <CheckCheck className="w-3.5 h-3.5 text-[#00a32a]" />
                          <span>Read All</span>
                        </button>
                        <button
                          onClick={clearAllNotifications}
                          title="Clear all notifications"
                          className="text-gray-400 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Filter Tabs (All vs Unread) */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#f6f7f7] border-b border-[#dcdcde] text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNotifFilter('all')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        notifFilter === 'all'
                          ? 'bg-[#2271b1] text-white'
                          : 'text-[#50575e] hover:text-[#1d2327]'
                      }`}
                    >
                      All ({notifications.length})
                    </button>
                    <button
                      onClick={() => setNotifFilter('unread')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        notifFilter === 'unread'
                          ? 'bg-[#2271b1] text-white'
                          : 'text-[#50575e] hover:text-[#1d2327]'
                      }`}
                    >
                      Unread ({unreadNotificationsCount})
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Live Sync</span>
                </div>

                {/* Notification List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                        <Bell className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        {notifFilter === 'unread'
                          ? 'All caught up! No unread notifications.'
                          : 'No notifications yet.'}
                      </p>
                      <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                        Real customer reservation inquiries and live website activity will arrive here in real time.
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((n) => {
                      return (
                        <div
                          key={n.id}
                          className={`p-3.5 text-xs transition-colors hover:bg-[#f6f7f7] flex items-start justify-between gap-3 ${
                            !n.isRead ? 'bg-amber-50/50' : 'bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            {/* Unread indicator dot */}
                            <div className="mt-1 shrink-0">
                              {!n.isRead ? (
                                <span className="block w-2 h-2 rounded-full bg-[#E08E45] ring-2 ring-[#E08E45]/20" />
                              ) : (
                                <span className="block w-2 h-2 rounded-full bg-gray-300" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`font-semibold text-xs ${!n.isRead ? 'text-[#1d2327]' : 'text-gray-600'}`}>
                                  {n.title}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono shrink-0">
                                  {formatRelativeTime(n.timestamp)}
                                </span>
                              </div>

                              <p className="text-gray-600 text-[11px] mt-0.5 leading-relaxed break-words">
                                {n.message}
                              </p>

                              {/* Action row */}
                              <div className="flex items-center gap-3 mt-2">
                                {n.linkTab && (
                                  <button
                                    onClick={() => {
                                      markNotificationAsRead(n.id);
                                      onSelectTab(n.linkTab!);
                                      setNotificationsOpen(false);
                                    }}
                                    className="text-[11px] font-semibold text-[#2271b1] hover:underline flex items-center gap-1"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>View in {n.linkTab.charAt(0).toUpperCase() + n.linkTab.slice(1)}</span>
                                  </button>
                                )}

                                {!n.isRead ? (
                                  <button
                                    onClick={() => markNotificationAsRead(n.id)}
                                    className="text-[11px] text-gray-500 hover:text-gray-800 flex items-center gap-1"
                                    title="Mark this notification as read"
                                  >
                                    <Check className="w-3 h-3 text-[#00a32a]" />
                                    <span>Mark as read</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => markNotificationAsUnread(n.id)}
                                    className="text-[11px] text-gray-400 hover:text-gray-700"
                                    title="Mark as unread"
                                  >
                                    Mark as unread
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Delete single notification */}
                          <button
                            onClick={() => deleteNotification(n.id)}
                            className="text-gray-300 hover:text-red-500 p-1 shrink-0"
                            title="Remove notification"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Link */}
                <div className="p-2.5 bg-[#f6f7f7] border-t border-[#dcdcde] text-center">
                  <button
                    onClick={() => { onSelectTab('inquiries'); setNotificationsOpen(false); }}
                    className="text-xs font-semibold text-[#2271b1] hover:text-[#135e96]"
                  >
                    Go to Inquiries & CRM Center →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Howdy */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 hover:text-white text-[#c3c4c7] transition-colors"
            >
              <span className="hidden sm:inline">
                Howdy, <strong className="text-white">{adminUser?.displayName || 'Admin'}</strong>
              </span>
              <div className="w-6 h-6 rounded-full bg-[#E08E45] text-[#10261D] font-bold text-xs flex items-center justify-center">
                A
              </div>
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-48 bg-[#1d2327] border border-[#2c3338] rounded shadow-xl py-2 z-50"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="px-3 py-1 border-b border-[#2c3338] mb-1">
                  <div className="font-bold text-white">{adminUser?.displayName}</div>
                  <div className="text-[11px] text-gray-400">{adminUser?.email}</div>
                </div>
                <button
                  onClick={() => { onSelectTab('settings'); setUserDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors block text-xs"
                >
                  Edit Profile & Security
                </button>
                <button
                  onClick={() => { logout(); setUserDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#d63638] text-[#f87171] hover:text-white transition-colors block text-xs flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Admin Workspace Layout with Left Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left WordPress Sidebar */}
        <aside
          className={`bg-[#1d2327] text-[#c3c4c7] select-none transition-all duration-200 z-40 flex flex-col justify-between shrink-0 ${
            sidebarCollapsed ? 'w-14' : 'w-56'
          } ${
            mobileSidebarOpen
              ? 'fixed inset-y-11 left-0 shadow-2xl flex z-50'
              : 'hidden md:flex'
          }`}
        >
          <div className="py-2 overflow-y-auto flex-1">
            <nav className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium transition-colors relative group ${
                      isActive
                        ? 'bg-[#2271b1] text-white font-semibold'
                        : 'hover:bg-[#135e96] hover:text-white text-[#c3c4c7]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E08E45]" />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-[#c3c4c7] group-hover:text-white'
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left tracking-wide truncate">
                        {item.label}
                      </span>
                    )}
                    {!sidebarCollapsed && item.count !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.alert
                            ? 'bg-[#d63638] text-white animate-pulse'
                            : isActive
                            ? 'bg-black/30 text-white'
                            : 'bg-[#2c3338] text-[#c3c4c7]'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Collapse Toggle */}
          <div className="p-2 border-t border-[#2c3338] hidden md:block">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 py-2 px-2 rounded hover:bg-[#2c3338] text-[#c3c4c7] hover:text-white transition-colors text-xs"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Collapse menu</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f0f0f1]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
