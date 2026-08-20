export interface MenuItem {
  id: string;
  name: string;
  category: 'featured' | 'starters' | 'main' | 'snacks' | 'drinks' | 'desserts' | string;
  priceNpr: number;
  description: string;
  isVegetarian: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  image?: string;
  isPopular?: boolean;
  isSamplePlaceholder?: boolean;
  status?: 'published' | 'draft' | 'archived';
}

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  comment: string;
  visitType: string;
  status?: 'published' | 'pending';
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  status?: 'published' | 'draft';
}

export interface EventPackage {
  id: string;
  name: string;
  capacity: string;
  ideal: string;
  features: string[];
  recommended: boolean;
  status?: 'published' | 'draft';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'farmhouse' | 'nature' | 'people' | 'music' | 'events' | string;
  imageUrl: string;
  caption: string;
  isPlaceholder?: boolean;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  visitDate: string;
  guestCount: number;
  preferredSection: string;
  occasion: string;
  specialNotes: string;
}

export interface InquiryRecord extends InquiryFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  adminNotes?: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'inquiry' | 'booking' | 'system' | 'review' | 'menu' | 'page';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
  metadata?: {
    inquiryId?: string;
    customerName?: string;
    phone?: string;
    itemTitle?: string;
  };
}

export interface SiteSettings {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubheadline: string;
  address: string;
  locationContext: string;
  phone: string;
  phoneDisplay: string;
  rating: number;
  reviewCount: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookPage: string;
  facebookUrl: string;
  logo: string;
  images: {
    logo: string;
    hero: string;
    dining: string;
    outdoors: string;
    music: string;
  };
  storyContent: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
  };
  openingHours: {
    days: string;
    hours: string;
    notes?: string;
  }[];
}

export interface CustomField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'number' | 'boolean' | 'url' | 'select';
  value: string;
  description?: string;
  options?: string[];
}

export interface PageItem {
  id: string;
  title: string;
  slug: string;
  navLabel: string;
  subtitle: string;
  bannerImage: string;
  metaDescription: string;
  status: 'published' | 'draft';
  lastModified: string;
  template: 'home' | 'experience' | 'menu' | 'story' | 'events' | 'gallery' | 'location' | 'blog' | 'standard';
  acfFields: CustomField[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: string;
  status: 'published' | 'draft';
  tags: string[];
  acfFields: CustomField[];
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  altText: string;
  caption?: string;
  description?: string;
  fileType: string;
  fileSize?: string;
  dimensions?: string;
  uploadedAt: string;
  filename?: string;
  category?: 'all' | 'food' | 'farmhouse' | 'nature' | 'events' | 'branding' | string;
}

export interface NavMenuItem {
  id: string;
  label: string;
  pageId?: string;
  url?: string;
  target?: '_self' | '_blank';
  icon?: string;
  isVisible: boolean;
  order: number;
  highlight?: boolean;
}

export interface CMSDataState {
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
}
