export interface MenuItem {
  id: string;
  name: string;
  category: 'featured' | 'starters' | 'main' | 'snacks' | 'drinks' | 'desserts';
  priceNpr: number;
  description: string;
  isVegetarian: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  image?: string;
  isPopular?: boolean;
  isSamplePlaceholder?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  comment: string;
  visitType: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'farmhouse' | 'nature' | 'people' | 'music' | 'events';
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
