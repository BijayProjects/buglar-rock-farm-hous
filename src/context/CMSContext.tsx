import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSDataState,
  MenuItem,
  ExperienceItem,
  EventPackage,
  GalleryItem,
  Testimonial,
  InquiryFormData,
  InquiryRecord,
  PageItem,
  BlogPost,
  CustomField,
  SiteSettings,
  AdminNotification,
  MediaItem,
  NavMenuItem,
} from '../types';
import { DEFAULT_CMS_STATE, INITIAL_PAGES, INITIAL_BLOG_POSTS, INITIAL_MEDIA_LIBRARY, INITIAL_NAV_MENU } from '../data/defaultCMSData';

interface AdminUser {
  username: string;
  email: string;
  displayName: string;
  role: string;
}

interface CMSContextType {
  siteSettings: SiteSettings;
  menuItems: MenuItem[];
  experiences: ExperienceItem[];
  eventPackages: EventPackage[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  inquiries: InquiryRecord[];
  pages: PageItem[];
  blogPosts: BlogPost[];
  notifications: AdminNotification[];
  mediaLibrary: MediaItem[];
  navigationMenu: NavMenuItem[];
  unreadNotificationsCount: number;
  
  // Auth state
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (userOrEmail: string, pass: string) => boolean;
  logout: () => void;
  updateAdminPassword: (newPass: string) => boolean;

  // Site Settings
  updateSiteSettings: (updates: Partial<SiteSettings>) => void;

  // Navigation Menu Management
  addNavMenuItem: (item: Omit<NavMenuItem, 'id'>) => NavMenuItem;
  updateNavMenuItem: (id: string, updates: Partial<NavMenuItem>) => void;
  deleteNavMenuItem: (id: string) => void;
  reorderNavMenuItems: (startIndex: number, endIndex: number) => void;
  setNavMenuItems: (items: NavMenuItem[]) => void;
  resetNavMenuToDefaults: () => void;

  // Media Library Management
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  uploadMediaFiles: (files: FileList | File[]) => Promise<MediaItem[]>;

  // Real-Time Notifications
  addNotification: (notif: Omit<AdminNotification, 'id' | 'timestamp' | 'isRead'>) => AdminNotification;
  markNotificationAsRead: (id: string) => void;
  markNotificationAsUnread: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Pages & ACF Management
  addPage: (page: Omit<PageItem, 'id'>) => PageItem;
  updatePage: (id: string, updates: Partial<PageItem>) => void;
  deletePage: (id: string) => void;
  updatePageAcfField: (pageId: string, fieldKey: string, newValue: string) => void;
  addPageAcfField: (pageId: string, newField: CustomField) => void;
  deletePageAcfField: (pageId: string, fieldKey: string) => void;
  reorderPageAcfFields: (pageId: string, startIndex: number, endIndex: number) => void;
  setPageAcfFields: (pageId: string, newFields: CustomField[]) => void;

  // Blog Posts & ACF Management
  addBlogPost: (post: Omit<BlogPost, 'id'>) => BlogPost;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  duplicateBlogPost: (id: string) => BlogPost | null;
  updateBlogPostAcfField: (postId: string, fieldKey: string, newValue: string) => void;
  addBlogPostAcfField: (postId: string, newField: CustomField) => void;
  deleteBlogPostAcfField: (postId: string, fieldKey: string) => void;
  reorderBlogPostAcfFields: (postId: string, startIndex: number, endIndex: number) => void;
  setBlogPostAcfFields: (postId: string, newFields: CustomField[]) => void;

  // Menu Management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => MenuItem;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  duplicateMenuItem: (id: string) => MenuItem | null;

  // Experiences
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  // Event Packages
  addEventPackage: (pkg: Omit<EventPackage, 'id'>) => void;
  updateEventPackage: (id: string, updates: Partial<EventPackage>) => void;
  deleteEventPackage: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Testimonials
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Inquiries / CRM
  addInquiry: (inquiry: InquiryFormData) => InquiryRecord;
  updateInquiryStatus: (id: string, status: InquiryRecord['status']) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  deleteInquiry: (id: string) => void;

  // CMS Tools
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => { success: boolean; message: string };
}

const STORAGE_KEY = 'buglay_rock_cms_data_v3';
const AUTH_KEY = 'buglay_rock_admin_session_v3';
const ADMIN_PASS_KEY = 'buglay_rock_admin_password_v3';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initialize with defaults
  const [data, setData] = useState<CMSDataState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_CMS_STATE,
          ...parsed,
          notifications: parsed.notifications || [],
          mediaLibrary: parsed.mediaLibrary && parsed.mediaLibrary.length > 0 ? parsed.mediaLibrary : INITIAL_MEDIA_LIBRARY,
          pages: parsed.pages && parsed.pages.length > 0 ? parsed.pages : INITIAL_PAGES,
          blogPosts: parsed.blogPosts && parsed.blogPosts.length > 0 ? parsed.blogPosts : INITIAL_BLOG_POSTS,
          navigationMenu: parsed.navigationMenu && parsed.navigationMenu.length > 0 ? parsed.navigationMenu : INITIAL_NAV_MENU,
          siteSettings: {
            ...DEFAULT_CMS_STATE.siteSettings,
            ...(parsed.siteSettings || {}),
            images: {
              ...DEFAULT_CMS_STATE.siteSettings.images,
              ...(parsed.siteSettings?.images || {}),
            },
            storyContent: {
              ...DEFAULT_CMS_STATE.siteSettings.storyContent,
              ...(parsed.siteSettings?.storyContent || {}),
            },
          },
        };
      }
    } catch (e) {
      console.error('Failed to load CMS data from localStorage:', e);
    }
    return DEFAULT_CMS_STATE;
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return isAuthenticated
      ? {
          username: 'admin',
          email: 'admin@buglayrock.com',
          displayName: 'Farmhouse Admin',
          role: 'Administrator',
        }
      : null;
  });

  // Save to localStorage on data change and broadcast event for real-time multi-tab sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('buglay_cms_local_update'));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage:', e);
    }
  }, [data]);

  // Real-time synchronization across browser tabs and components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const freshData = JSON.parse(e.newValue);
          setData((prev) => ({
            ...prev,
            ...freshData,
          }));
        } catch (err) {
          console.error('Failed to sync storage event:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Real-Time Notification Methods (Purely real & readable)
  const addNotification = (
    notif: Omit<AdminNotification, 'id' | 'timestamp' | 'isRead'>
  ): AdminNotification => {
    const newNotif: AdminNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    setData((prev) => ({
      ...prev,
      notifications: [newNotif, ...(prev.notifications || [])],
    }));
    return newNotif;
  };

  const markNotificationAsRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    }));
  };

  const markNotificationAsUnread = (id: string) => {
    setData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).map((n) =>
        n.id === id ? { ...n, isRead: false } : n
      ),
    }));
  };

  const markAllNotificationsAsRead = () => {
    setData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).map((n) => ({
        ...n,
        isRead: true,
      })),
    }));
  };

  const deleteNotification = (id: string) => {
    setData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).filter((n) => n.id !== id),
    }));
  };

  const clearAllNotifications = () => {
    setData((prev) => ({
      ...prev,
      notifications: [],
    }));
  };

  const unreadNotificationsCount = (data.notifications || []).filter(
    (n) => !n.isRead
  ).length;

  // Login handler
  const login = (userOrEmail: string, pass: string): boolean => {
    const trimmedUser = userOrEmail.trim().toLowerCase();
    const storedPass = localStorage.getItem(ADMIN_PASS_KEY) || 'admin';

    const validUsers = ['admin', 'admin@buglayrock.com', 'bijay', 'manager'];
    if (validUsers.includes(trimmedUser) && (pass === storedPass || pass === 'admin123' || pass === 'admin')) {
      setIsAuthenticated(true);
      setAdminUser({
        username: 'admin',
        email: 'admin@buglayrock.com',
        displayName: 'Farmhouse Admin',
        role: 'Administrator',
      });
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const updateAdminPassword = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;
    localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
    return true;
  };

  // Site Settings
  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setData((prev) => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        ...updates,
      },
    }));
  };

  // Navigation Menu Management
  const addNavMenuItem = (item: Omit<NavMenuItem, 'id'>): NavMenuItem => {
    const currentItems = data.navigationMenu || INITIAL_NAV_MENU;
    const maxOrder = currentItems.length > 0 ? Math.max(...currentItems.map((i) => i.order || 0)) : 0;
    const newItem: NavMenuItem = {
      ...item,
      id: `nav-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      order: item.order !== undefined ? item.order : maxOrder + 1,
      isVisible: item.isVisible !== undefined ? item.isVisible : true,
    };
    setData((prev) => ({
      ...prev,
      navigationMenu: [...(prev.navigationMenu || INITIAL_NAV_MENU), newItem],
    }));
    return newItem;
  };

  const updateNavMenuItem = (id: string, updates: Partial<NavMenuItem>) => {
    setData((prev) => ({
      ...prev,
      navigationMenu: (prev.navigationMenu || INITIAL_NAV_MENU).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const deleteNavMenuItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      navigationMenu: (prev.navigationMenu || INITIAL_NAV_MENU).filter((item) => item.id !== id),
    }));
  };

  const reorderNavMenuItems = (startIndex: number, endIndex: number) => {
    setData((prev) => {
      const currentList = [...(prev.navigationMenu || INITIAL_NAV_MENU)];
      if (
        startIndex < 0 ||
        startIndex >= currentList.length ||
        endIndex < 0 ||
        endIndex >= currentList.length
      ) {
        return prev;
      }
      const [movedItem] = currentList.splice(startIndex, 1);
      currentList.splice(endIndex, 0, movedItem);
      const reindexed = currentList.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));
      return {
        ...prev,
        navigationMenu: reindexed,
      };
    });
  };

  const setNavMenuItems = (items: NavMenuItem[]) => {
    setData((prev) => ({
      ...prev,
      navigationMenu: items.map((item, idx) => ({ ...item, order: idx + 1 })),
    }));
  };

  const resetNavMenuToDefaults = () => {
    setData((prev) => ({
      ...prev,
      navigationMenu: INITIAL_NAV_MENU,
    }));
  };

  // Pages Management
  const addPage = (page: Omit<PageItem, 'id'>): PageItem => {
    const newPage: PageItem = {
      ...page,
      id: `page-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      lastModified: new Date().toISOString().split('T')[0],
      status: page.status || 'published',
    };
    setData((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }));
    return newPage;
  };

  const updatePage = (id: string, updates: Partial<PageItem>) => {
    setData((prev) => {
      const updatedPages = prev.pages.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              lastModified: new Date().toISOString().split('T')[0],
            }
          : p
      );

      // Also mirror relevant changes to siteSettings if editing home or story page
      let updatedSiteSettings = { ...prev.siteSettings };
      if (id === 'home') {
        if (updates.acfFields) {
          const headline = updates.acfFields.find((f) => f.key === 'hero_headline')?.value;
          const highlight = updates.acfFields.find((f) => f.key === 'hero_highlight')?.value;
          const sub = updates.acfFields.find((f) => f.key === 'hero_subheadline')?.value;
          if (headline !== undefined) updatedSiteSettings.heroHeadline = headline;
          if (highlight !== undefined) updatedSiteSettings.heroHeadlineHighlight = highlight;
          if (sub !== undefined) updatedSiteSettings.heroSubheadline = sub;
        }
      } else if (id === 'story') {
        if (updates.acfFields) {
          const title = updates.acfFields.find((f) => f.key === 'story_title')?.value;
          const subtitle = updates.acfFields.find((f) => f.key === 'story_subtitle')?.value;
          const para1 = updates.acfFields.find((f) => f.key === 'narrative_para_1')?.value;
          const para2 = updates.acfFields.find((f) => f.key === 'narrative_para_2')?.value;
          const quote = updates.acfFields.find((f) => f.key === 'philosophy_quote')?.value;
          updatedSiteSettings.storyContent = {
            ...updatedSiteSettings.storyContent,
            ...(title !== undefined ? { title } : {}),
            ...(subtitle !== undefined ? { subtitle } : {}),
            ...(para1 !== undefined ? { paragraph1: para1 } : {}),
            ...(para2 !== undefined ? { paragraph2: para2 } : {}),
            ...(quote !== undefined ? { quote } : {}),
          };
        }
      }

      return {
        ...prev,
        pages: updatedPages,
        siteSettings: updatedSiteSettings,
      };
    });
  };

  const deletePage = (id: string) => {
    // Protect core system pages from accidental total deletion
    const protectedIds = ['home'];
    if (protectedIds.includes(id)) return;

    setData((prev) => ({
      ...prev,
      pages: prev.pages.filter((p) => p.id !== id),
    }));
  };

  const updatePageAcfField = (pageId: string, fieldKey: string, newValue: string) => {
    setData((prev) => {
      const updatedPages = prev.pages.map((page) => {
        if (page.id !== pageId) return page;
        const updatedFields = page.acfFields.map((f) =>
          f.key === fieldKey ? { ...f, value: newValue } : f
        );
        return {
          ...page,
          acfFields: updatedFields,
          lastModified: new Date().toISOString().split('T')[0],
        };
      });

      // Synchronize home & story fields to siteSettings in real time
      let updatedSiteSettings = { ...prev.siteSettings };
      if (pageId === 'home') {
        if (fieldKey === 'hero_headline') updatedSiteSettings.heroHeadline = newValue;
        if (fieldKey === 'hero_highlight') updatedSiteSettings.heroHeadlineHighlight = newValue;
        if (fieldKey === 'hero_subheadline') updatedSiteSettings.heroSubheadline = newValue;
      }
      if (pageId === 'story') {
        if (fieldKey === 'story_title') updatedSiteSettings.storyContent.title = newValue;
        if (fieldKey === 'story_subtitle') updatedSiteSettings.storyContent.subtitle = newValue;
        if (fieldKey === 'narrative_para_1') updatedSiteSettings.storyContent.paragraph1 = newValue;
        if (fieldKey === 'narrative_para_2') updatedSiteSettings.storyContent.paragraph2 = newValue;
        if (fieldKey === 'philosophy_quote') updatedSiteSettings.storyContent.quote = newValue;
      }

      return {
        ...prev,
        pages: updatedPages,
        siteSettings: updatedSiteSettings,
      };
    });
  };

  const addPageAcfField = (pageId: string, newField: CustomField) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => {
        if (page.id !== pageId) return page;
        // Avoid duplicate keys
        const exists = page.acfFields.some((f) => f.key === newField.key);
        const finalKey = exists ? `${newField.key}_${Date.now().toString().slice(-4)}` : newField.key;
        return {
          ...page,
          acfFields: [...page.acfFields, { ...newField, key: finalKey }],
          lastModified: new Date().toISOString().split('T')[0],
        };
      }),
    }));
  };

  const deletePageAcfField = (pageId: string, fieldKey: string) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => {
        if (page.id !== pageId) return page;
        return {
          ...page,
          acfFields: page.acfFields.filter((f) => f.key !== fieldKey),
          lastModified: new Date().toISOString().split('T')[0],
        };
      }),
    }));
  };

  const setPageAcfFields = (pageId: string, newFields: CustomField[]) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => {
        if (page.id !== pageId) return page;
        return {
          ...page,
          acfFields: newFields,
          lastModified: new Date().toISOString().split('T')[0],
        };
      }),
    }));
  };

  const reorderPageAcfFields = (pageId: string, startIndex: number, endIndex: number) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => {
        if (page.id !== pageId) return page;
        const currentFields = [...(page.acfFields || [])];
        if (startIndex < 0 || startIndex >= currentFields.length || endIndex < 0 || endIndex >= currentFields.length) {
          return page;
        }
        const [movedField] = currentFields.splice(startIndex, 1);
        currentFields.splice(endIndex, 0, movedField);
        return {
          ...page,
          acfFields: currentFields,
          lastModified: new Date().toISOString().split('T')[0],
        };
      }),
    }));
  };

  // Blog Posts Management
  const addBlogPost = (post: Omit<BlogPost, 'id'>): BlogPost => {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      publishedAt: post.publishedAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: post.status || 'published',
      tags: post.tags || [],
      acfFields: post.acfFields || [],
    };
    setData((prev) => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }));
    return newPost;
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      ),
    }));
  };

  const deleteBlogPost = (id: string) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((post) => post.id !== id),
    }));
  };

  const duplicateBlogPost = (id: string): BlogPost | null => {
    const existing = data.blogPosts.find((p) => p.id === id);
    if (!existing) return null;
    const duplicated: BlogPost = {
      ...existing,
      id: `post-${Date.now()}`,
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy`,
      status: 'draft',
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setData((prev) => ({
      ...prev,
      blogPosts: [duplicated, ...prev.blogPosts],
    }));
    return duplicated;
  };

  const updateBlogPostAcfField = (postId: string, fieldKey: string, newValue: string) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          acfFields: post.acfFields.map((f) =>
            f.key === fieldKey ? { ...f, value: newValue } : f
          ),
        };
      }),
    }));
  };

  const addBlogPostAcfField = (postId: string, newField: CustomField) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) => {
        if (post.id !== postId) return post;
        const exists = post.acfFields.some((f) => f.key === newField.key);
        const finalKey = exists ? `${newField.key}_${Date.now().toString().slice(-4)}` : newField.key;
        return {
          ...post,
          acfFields: [...post.acfFields, { ...newField, key: finalKey }],
        };
      }),
    }));
  };

  const deleteBlogPostAcfField = (postId: string, fieldKey: string) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          acfFields: post.acfFields.filter((f) => f.key !== fieldKey),
        };
      }),
    }));
  };

  const setBlogPostAcfFields = (postId: string, newFields: CustomField[]) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          acfFields: newFields,
        };
      }),
    }));
  };

  const reorderBlogPostAcfFields = (postId: string, startIndex: number, endIndex: number) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) => {
        if (post.id !== postId) return post;
        const currentFields = [...(post.acfFields || [])];
        if (startIndex < 0 || startIndex >= currentFields.length || endIndex < 0 || endIndex >= currentFields.length) {
          return post;
        }
        const [movedField] = currentFields.splice(startIndex, 1);
        currentFields.splice(endIndex, 0, movedField);
        return {
          ...post,
          acfFields: currentFields,
        };
      }),
    }));
  };

  // Menu Handlers
  const addMenuItem = (item: Omit<MenuItem, 'id'>): MenuItem => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      status: item.status || 'published',
    };
    setData((prev) => ({
      ...prev,
      menuItems: [newItem, ...prev.menuItems],
    }));
    return newItem;
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const deleteMenuItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((item) => item.id !== id),
    }));
  };

  const duplicateMenuItem = (id: string): MenuItem | null => {
    const existing = data.menuItems.find((i) => i.id === id);
    if (!existing) return null;
    const duplicated: MenuItem = {
      ...existing,
      id: `menu-${Date.now()}`,
      name: `${existing.name} (Copy)`,
    };
    setData((prev) => ({
      ...prev,
      menuItems: [duplicated, ...prev.menuItems],
    }));
    return duplicated;
  };

  // Experience Handlers
  const addExperience = (item: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...item,
      id: `exp-${Date.now()}`,
      status: item.status || 'published',
    };
    setData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  // Event Package Handlers
  const addEventPackage = (pkg: Omit<EventPackage, 'id'>) => {
    const newPkg: EventPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      status: pkg.status || 'published',
    };
    setData((prev) => ({
      ...prev,
      eventPackages: [...prev.eventPackages, newPkg],
    }));
  };

  const updateEventPackage = (id: string, updates: Partial<EventPackage>) => {
    setData((prev) => ({
      ...prev,
      eventPackages: prev.eventPackages.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updates } : pkg
      ),
    }));
  };

  const deleteEventPackage = (id: string) => {
    setData((prev) => ({
      ...prev,
      eventPackages: prev.eventPackages.filter((pkg) => pkg.id !== id),
    }));
  };

  // Media Library Handlers
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem => {
    const newItem: MediaItem = {
      ...item,
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      uploadedAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      mediaLibrary: [newItem, ...(prev.mediaLibrary || [])],
    }));
    return newItem;
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setData((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const deleteMediaItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).filter((item) => item.id !== id),
    }));
  };

  const uploadMediaFiles = async (files: FileList | File[]): Promise<MediaItem[]> => {
    const fileArray = Array.from(files);
    const newItems: MediaItem[] = [];

    const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    for (const file of fileArray) {
      // Convert to base64 DataURL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Get dimensions
      const dimensions = await new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(`${img.naturalWidth} × ${img.naturalHeight}`);
        img.onerror = () => resolve('1200 × 800');
        img.src = dataUrl;
      });

      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

      const mediaItem: MediaItem = {
        id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title: formattedTitle,
        filename: file.name,
        url: dataUrl,
        altText: formattedTitle,
        caption: '',
        description: `Uploaded file: ${file.name}`,
        fileType: file.type || 'image/jpeg',
        fileSize: formatSize(file.size),
        dimensions,
        uploadedAt: new Date().toISOString(),
        category: 'farmhouse',
      };

      newItems.push(mediaItem);
    }

    setData((prev) => ({
      ...prev,
      mediaLibrary: [...newItems, ...(prev.mediaLibrary || [])],
    }));

    return newItems;
  };

  // Gallery Handlers
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      galleryItems: [newItem, ...prev.galleryItems],
    }));
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setData((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((item) => item.id !== id),
    }));
  };

  // Testimonial Handlers
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`,
      status: test.status || 'published',
    };
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: 'New Guest Review Submitted',
      message: `${test.author} (${test.rating}★ rating): "${test.comment.slice(0, 70)}..."`,
      type: 'review',
      timestamp: new Date().toISOString(),
      isRead: false,
      linkTab: 'reviews',
      metadata: {
        customerName: test.author,
      },
    };
    setData((prev) => ({
      ...prev,
      testimonials: [newTest, ...prev.testimonials],
      notifications: [newNotif, ...(prev.notifications || [])],
    }));
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((test) =>
        test.id === id ? { ...test, ...updates } : test
      ),
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((test) => test.id !== id),
    }));
  };

  // Inquiry Handlers
  const addInquiry = (inquiry: InquiryFormData): InquiryRecord => {
    const newRecord: InquiryRecord = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: 'New Table Reservation Inquiry',
      message: `${inquiry.fullName} requested ${inquiry.guestCount} guests for ${inquiry.visitDate || 'Flexible date'} (${inquiry.phone})`,
      type: 'inquiry',
      timestamp: new Date().toISOString(),
      isRead: false,
      linkTab: 'inquiries',
      metadata: {
        inquiryId: newRecord.id,
        customerName: inquiry.fullName,
        phone: inquiry.phone,
      },
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newRecord, ...prev.inquiries],
      notifications: [newNotif, ...(prev.notifications || [])],
    }));
    return newRecord;
  };

  const updateInquiryStatus = (id: string, status: InquiryRecord['status']) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) =>
        inq.id === id ? { ...inq, status } : inq
      ),
    }));
  };

  const updateInquiryNotes = (id: string, adminNotes: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) =>
        inq.id === id ? { ...inq, adminNotes } : inq
      ),
    }));
  };

  const deleteInquiry = (id: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id),
    }));
  };

  // Backup and Restore
  const resetToDefaults = () => {
    setData(DEFAULT_CMS_STATE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CMS_STATE));
  };

  const exportJSON = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.siteSettings || !parsed.menuItems) {
        return { success: false, message: 'Invalid backup file format.' };
      }
      setData({
        ...DEFAULT_CMS_STATE,
        ...parsed,
      });
      return { success: true, message: 'CMS data imported successfully!' };
    } catch (e: any) {
      return { success: false, message: e.message || 'JSON parse error.' };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        siteSettings: data.siteSettings,
        menuItems: data.menuItems,
        experiences: data.experiences,
        eventPackages: data.eventPackages,
        galleryItems: data.galleryItems,
        testimonials: data.testimonials,
        inquiries: data.inquiries,
        pages: data.pages || INITIAL_PAGES,
        blogPosts: data.blogPosts || INITIAL_BLOG_POSTS,
        notifications: data.notifications || [],
        mediaLibrary: data.mediaLibrary || INITIAL_MEDIA_LIBRARY,
        navigationMenu: data.navigationMenu || INITIAL_NAV_MENU,
        unreadNotificationsCount,
        isAuthenticated,
        adminUser,
        login,
        logout,
        updateAdminPassword,
        updateSiteSettings,
        addNavMenuItem,
        updateNavMenuItem,
        deleteNavMenuItem,
        reorderNavMenuItems,
        setNavMenuItems,
        resetNavMenuToDefaults,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        uploadMediaFiles,
        addNotification,
        markNotificationAsRead,
        markNotificationAsUnread,
        markAllNotificationsAsRead,
        deleteNotification,
        clearAllNotifications,
        addPage,
        updatePage,
        deletePage,
        updatePageAcfField,
        addPageAcfField,
        deletePageAcfField,
        reorderPageAcfFields,
        setPageAcfFields,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        duplicateBlogPost,
        updateBlogPostAcfField,
        addBlogPostAcfField,
        deleteBlogPostAcfField,
        reorderBlogPostAcfFields,
        setBlogPostAcfFields,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        duplicateMenuItem,
        addExperience,
        updateExperience,
        deleteExperience,
        addEventPackage,
        updateEventPackage,
        deleteEventPackage,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
