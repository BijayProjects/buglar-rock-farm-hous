import { MenuItem, Testimonial, ExperienceItem, GalleryItem } from '../types';

import heroImg from '../assets/images/buglay_hero_farmhouse_1786634689647.jpg';
import diningImg from '../assets/images/buglay_farmhouse_dining_1786634704805.jpg';
import outdoorsImg from '../assets/images/buglay_nature_outdoors_1786634718702.jpg';
import musicImg from '../assets/images/buglay_live_music_1786634729507.jpg';
import logoImg from '../assets/images/buglay_rock_logo_1786776583027.jpg';

export const BUSINESS_INFO = {
  name: "Buglay Rock Farm House",
  tagline: "Escape the ordinary. Eat well. Relax in nature. Make memories.",
  heroSubheadline: "Good food, fresh air, music and unforgettable moments at Buglay Rock Farm House.",
  address: "Lalitpur 44709, Nepal",
  locationContext: "Near Godawari & Lakuri Bhanjyang, Lalitpur Hills",
  phone: "+977 9801000007",
  phoneDisplay: "+977 9801000007",
  rating: 4.9,
  reviewCount: "150+",
  googleMapsUrl: "https://maps.google.com/?q=Buglay+Rock+Farm+House+Lalitpur+44709+Nepal",
  instagramHandle: "@buglayrockfarmhouse",
  instagramUrl: "https://www.instagram.com/explore/tags/buglayrockfarmhouse/",
  facebookPage: "Buglay Rock Farm House",
  facebookUrl: "https://www.facebook.com/search/top?q=Buglay%20Rock%20Farm%20House",
  logo: logoImg,
  images: {
    logo: logoImg,
    hero: heroImg,
    dining: diningImg,
    outdoors: outdoorsImg,
    music: musicImg,
  }
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'dining',
    title: 'Farmhouse Dining',
    subtitle: 'Fresh flavours, authentic spice',
    description: 'Savour hearty traditional Nepali meals, charcoal-grilled delicacies, and fresh local dishes in open-air wooden pavilions.',
    image: diningImg,
    highlights: ['Outdoor wooden pavilions', 'Fresh local ingredients', 'Charcoal BBQ & Sekuwa', 'Family-style sharing platters']
  },
  {
    id: 'nature',
    title: 'Nature & Outdoors',
    subtitle: 'Fresh hill air & scenic greenery',
    description: 'Breathe in mountain air, walk among manicured hill lawns, and let kids safely play in an expansive natural garden setting.',
    image: outdoorsImg,
    highlights: ['Lush garden seating', 'Panoramic hill vistas', 'Cool mountain breeze', 'Safe open space for families']
  },
  {
    id: 'music',
    title: 'Live Music',
    subtitle: 'Acoustic sessions & sunset tunes',
    description: 'Enjoy soul-stirring live acoustic performances by local talent as the sun dips below the Lalitpur hilltops.',
    image: musicImg,
    highlights: ['Acoustic live band nights', 'Evening bonfire ambience', 'Festoon lit courtyard', 'Unplugged acoustic sets']
  },
  {
    id: 'karaoke',
    title: 'Karaoke',
    subtitle: 'Sing your heart out with friends',
    description: 'Unleash your inner star! High quality audio equipment for group sing-alongs, party tracks, and evening laughs.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    highlights: ['High-definition mic & sound', 'Private group sessions', 'Nepali & International song hits', 'Fun party atmosphere']
  },
  {
    id: 'games',
    title: 'Games & Entertainment',
    subtitle: 'Fun for all ages & groups',
    description: 'Unplug from screens with lawn games, carrom, table games, badminton, and outdoor recreational fun.',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Lawn games & sports', 'Kid-friendly recreation', 'Board games & carrom', 'Social group challenges']
  },
  {
    id: 'celebrations',
    title: 'Celebrations & Gatherings',
    subtitle: 'Birthdays, reunions & outings',
    description: 'The ultimate destination for family weekend get-togethers, birthday celebrations, office retreats, and private reunions.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Custom group dining setups', 'Dedicated event lawns', 'Flexible group menus', 'Memorable photo backdrops']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Rohan Shrestha',
    location: 'Kathmandu',
    rating: 5,
    date: '1 month ago',
    comment: 'The perfect escape from busy Lalitpur city! The outdoor atmosphere is magical, food was hot and delicious, and the live music made our family gathering unforgettable.',
    visitType: 'Family Outing'
  },
  {
    id: '2',
    author: 'Prashna Thapa',
    location: 'Patan',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Buglay Rock Farm House is a hidden gem near Godawari. Beautiful mountain views, super friendly staff, and great karaoke setup for my birthday party.',
    visitType: 'Birthday Celebration'
  },
  {
    id: '3',
    author: 'Bikash & Friends',
    location: 'Lalitpur',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Amazing place for weekend hangouts. Fresh air, charcoal Sekuwa, cool games, and a small farm vibe. We stayed till dusk enjoying the bonfire!',
    visitType: 'Weekend Hangout'
  },
  {
    id: '4',
    author: 'Saraswati Maharjan',
    location: 'Jawalakhel',
    rating: 5,
    date: '1 month ago',
    comment: '4.9 stars well deserved. Kids loved playing outdoors freely, while adults relaxed over local teas and grilled barbecue. Will definitely come back!',
    visitType: 'Family Dinner'
  }
];

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Buglay Special Charcoal Sekuwa',
    category: 'featured',
    priceNpr: 650,
    description: 'Tender marinated meat grilled over wood charcoal with house mountain spices, served with fresh mint chutney.',
    isVegetarian: false,
    spicyLevel: 2,
    isPopular: true,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm2',
    name: 'Authentic Nepali Farmhouse Khaja Set',
    category: 'featured',
    priceNpr: 850,
    description: 'Traditional beaten rice (Chiura), spiced bhatmas, sukuti, Aloo Sadeko, fresh pickles, and seasonal greens.',
    isVegetarian: false,
    spicyLevel: 2,
    isPopular: true,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm3',
    name: 'Fresh Mountain Trout Fish Fry',
    category: 'featured',
    priceNpr: 1200,
    description: 'Crispy pan-fried local river trout seasoned with garlic, timur (Nepali pepper), and lemon.',
    isVegetarian: false,
    spicyLevel: 1,
    isPopular: true,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    name: 'Charcoal Grilled Paneer Tikka',
    category: 'starters',
    priceNpr: 450,
    description: 'Fresh cottage cheese cubes marinated in spiced yogurt and grilled in clay tandoor with veggies.',
    isVegetarian: true,
    spicyLevel: 1,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm5',
    name: 'Spicy Timur Chicken Wings',
    category: 'starters',
    priceNpr: 520,
    description: 'Crispy fried wings tossed in authentic Himalayan Szechuan pepper (Timur) and honey glaze.',
    isVegetarian: false,
    spicyLevel: 3,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm6',
    name: 'Organic Farmhouse Green Salad',
    category: 'starters',
    priceNpr: 280,
    description: 'Crisp garden vegetables freshly harvested from local Lalitpur farms with citrus dressing.',
    isVegetarian: true,
    spicyLevel: 0,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm7',
    name: 'Traditional Nepali Khas ko Masu Curry',
    category: 'main',
    priceNpr: 780,
    description: 'Slow-cooked mutton curry in rich onion, tomato, and traditional whole spices gravies.',
    isVegetarian: false,
    spicyLevel: 2,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm8',
    name: 'Special Farmhouse Vegetable Thali',
    category: 'main',
    priceNpr: 550,
    description: 'Steamed aromatic rice, yellow lentil soup (Dal), seasonal veg curry, Gundruk pickle, and papad.',
    isVegetarian: true,
    spicyLevel: 1,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm9',
    name: 'Pan-Fried Steam Chicken Momo',
    category: 'snacks',
    priceNpr: 320,
    description: 'Juicy minced chicken dumplings wrapped in thin dough, served with spicy tomato sesame chutney.',
    isVegetarian: false,
    spicyLevel: 2,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm10',
    name: 'Aloo Sadeko & Wai Wai Sandeko',
    category: 'snacks',
    priceNpr: 220,
    description: 'Boiled potatoes and crisp noodles tossed with green chili, mustard oil, coriander, and lemon juice.',
    isVegetarian: true,
    spicyLevel: 2,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm11',
    name: 'Godawari Rhododendron Special Iced Tea',
    category: 'drinks',
    priceNpr: 180,
    description: 'Refreshing cold tea infused with hill flower extracts, mint, and fresh lemon.',
    isVegetarian: true,
    spicyLevel: 0,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm12',
    name: 'Fresh Lemon Soda & Mountain Spring Juices',
    category: 'drinks',
    priceNpr: 150,
    description: 'Sparkling soda with rock salt, mint leaves, and fresh lime.',
    isVegetarian: true,
    spicyLevel: 0,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm13',
    name: 'Warm Gulab Jamun with Cream',
    category: 'desserts',
    priceNpr: 220,
    description: 'Soft milk dumplings soaked in cardamom sugar syrup, served warm with dairy cream.',
    isVegetarian: true,
    spicyLevel: 0,
    isSamplePlaceholder: true,
    image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Farmhouse Evening Vibe',
    category: 'farmhouse',
    imageUrl: heroImg,
    caption: 'Cozy outdoor seating illuminated by warm festoon lights at twilight.',
    isPlaceholder: true
  },
  {
    id: 'g2',
    title: 'Fresh Charcoal BBQ Sekuwa',
    category: 'food',
    imageUrl: diningImg,
    caption: 'Sizzling local delicacies cooked over open wood fire.',
    isPlaceholder: true
  },
  {
    id: 'g3',
    title: 'Serene Garden & Mountain View',
    category: 'nature',
    imageUrl: outdoorsImg,
    caption: 'Lush green lawns surrounded by the peaceful hills of Lalitpur 44709.',
    isPlaceholder: true
  },
  {
    id: 'g4',
    title: 'Live Acoustic Music Nights',
    category: 'music',
    imageUrl: musicImg,
    caption: 'Sunset jam sessions and acoustic tunes in the courtyard.',
    isPlaceholder: true
  },
  {
    id: 'g5',
    title: 'Family Gathering & Celebrations',
    category: 'people',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    caption: 'Unforgettable smiles and celebrations in fresh mountain air.',
    isPlaceholder: true
  },
  {
    id: 'g6',
    title: 'Karaoke & Birthday Parties',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    caption: 'Sing-alongs and night-time celebrations under starry skies.',
    isPlaceholder: true
  },
  {
    id: 'g7',
    title: 'Traditional Nepali Khaja Platter',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    caption: 'Authentic local flavours prepared with fresh hill spices.',
    isPlaceholder: true
  },
  {
    id: 'g8',
    title: 'Relaxing Lawn & Outdoor Games',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1000&q=80',
    caption: 'Spacious lawns for kids and adults to play carrom, badminton and lawn games.',
    isPlaceholder: true
  }
];
