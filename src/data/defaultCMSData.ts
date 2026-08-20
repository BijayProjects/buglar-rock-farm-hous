import { CMSDataState, EventPackage, InquiryRecord, PageItem, BlogPost, SiteSettings, MediaItem, NavMenuItem } from '../types';
import { BUSINESS_INFO, EXPERIENCES, SAMPLE_MENU, GALLERY_ITEMS, TESTIMONIALS } from './restaurantData';

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'media-hero-01',
    title: 'Buglay Rock Farm House - Panoramic Overview',
    filename: 'buglay_hero_farmhouse.jpg',
    url: BUSINESS_INFO.images.hero,
    altText: 'Lush green panoramic view of Buglay Rock Farm House in Lalitpur hills',
    caption: 'The main farmhouse sanctuary nestled in the Lalitpur hilltops near Godawari.',
    description: 'High resolution aerial overview photograph showing outdoor pavilions and lawn seating.',
    fileType: 'image/jpeg',
    fileSize: '820 KB',
    dimensions: '1920 × 1080',
    uploadedAt: '2026-08-10T08:30:00Z',
    category: 'farmhouse',
  },
  {
    id: 'media-dining-02',
    title: 'Outdoor Wooden Pavilions & Dining',
    filename: 'buglay_farmhouse_dining.jpg',
    url: BUSINESS_INFO.images.dining,
    altText: 'Guests dining outdoors under wooden pavilions with mountain valley view',
    caption: 'Comfortable family tables nestled among flowers and stone pathways.',
    description: 'Outdoor seating pavilion with warm timber finishes, picnic tables, and scenic views.',
    fileType: 'image/jpeg',
    fileSize: '640 KB',
    dimensions: '1600 × 1066',
    uploadedAt: '2026-08-10T09:15:00Z',
    category: 'food',
  },
  {
    id: 'media-outdoors-03',
    title: 'Green Lawns & Nature Trails',
    filename: 'buglay_nature_outdoors.jpg',
    url: BUSINESS_INFO.images.outdoors,
    altText: 'Manicured green lawn with children playing and mountain backdrop',
    caption: 'Spacious open garden lawns safe for kids and group games.',
    description: 'Wide grass lawn area with picnic benches, mountain wildflowers, and clear blue skies.',
    fileType: 'image/jpeg',
    fileSize: '710 KB',
    dimensions: '1600 × 1066',
    uploadedAt: '2026-08-11T11:00:00Z',
    category: 'nature',
  },
  {
    id: 'media-music-04',
    title: 'Acoustic Live Music & Evening Bonfire',
    filename: 'buglay_live_music.jpg',
    url: BUSINESS_INFO.images.music,
    altText: 'Live guitar acoustic session around a warm evening fire pit under festoon lights',
    caption: 'Unplugged acoustic performances and warm campfire chats.',
    description: 'Night ambiance photography showcasing festoon lighting, guitar players, and cozy campfire glow.',
    fileType: 'image/jpeg',
    fileSize: '590 KB',
    dimensions: '1600 × 1066',
    uploadedAt: '2026-08-12T18:45:00Z',
    category: 'events',
  },
  {
    id: 'media-logo-05',
    title: 'Buglay Rock Official Brand Logo',
    filename: 'buglay_rock_logo.jpg',
    url: BUSINESS_INFO.images.logo,
    altText: 'Buglay Rock Farm House gold and timber emblem logo badge',
    caption: 'Official vector emblem and signage badge.',
    description: 'High-definition brand mark featuring traditional Nepali mountain rock and tree motif.',
    fileType: 'image/jpeg',
    fileSize: '185 KB',
    dimensions: '800 × 800',
    uploadedAt: '2026-08-01T12:00:00Z',
    category: 'branding',
  },
  {
    id: 'media-food-bbq',
    title: 'Charcoal Sekuwa & Smoked Barbecue Platter',
    filename: 'charcoal_bbq_platter.jpg',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    altText: 'Freshly grilled skewers with mountain herbs and fire coals',
    caption: 'Authentic Nepali spiced skewers sizzling over local wood charcoals.',
    description: 'Close up photo of smoked chicken and pork sekuwa served with radish pickle and beaten rice.',
    fileType: 'image/jpeg',
    fileSize: '450 KB',
    dimensions: '1200 × 800',
    uploadedAt: '2026-08-13T14:20:00Z',
    category: 'food',
  },
  {
    id: 'media-food-khaja',
    title: 'Authentic Nepali Khaja Set',
    filename: 'nepali_khaja_set.jpg',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    altText: 'Traditional Nepali bronze platter with chiura, bhatmas, sadeko and chhoyela',
    caption: 'Hearty traditional hill snacking set prepared with fresh stone-ground spices.',
    description: 'Traditional bronze brass plate presentation with beaten rice and spicy local sides.',
    fileType: 'image/jpeg',
    fileSize: '520 KB',
    dimensions: '1200 × 800',
    uploadedAt: '2026-08-13T15:00:00Z',
    category: 'food',
  },
  {
    id: 'media-karaoke-setup',
    title: 'Karaoke & Party Soundstage',
    filename: 'karaoke_soundstage.jpg',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    altText: 'Wireless karaoke microphones with sound stage lighting in party pavilion',
    caption: 'HD Sound system ready for weekend parties and friend sing-alongs.',
    description: 'Party stage setup with dual wireless mics and LED ambient lights.',
    fileType: 'image/jpeg',
    fileSize: '410 KB',
    dimensions: '1200 × 800',
    uploadedAt: '2026-08-14T10:30:00Z',
    category: 'events',
  },
  {
    id: 'media-garden-games',
    title: 'Lawn Sports & Outdoor Recreation',
    filename: 'lawn_sports_games.jpg',
    url: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1000&q=80',
    altText: 'Outdoor garden games and recreational area in grass meadow',
    caption: 'Carrom, badminton and lawn games for all ages.',
    description: 'Fun outdoor recreation lawn with games setup for families and friend groups.',
    fileType: 'image/jpeg',
    fileSize: '480 KB',
    dimensions: '1200 × 800',
    uploadedAt: '2026-08-14T11:45:00Z',
    category: 'nature',
  },
  {
    id: 'media-cocktail-sunset',
    title: 'Himalayan Herbal Mocktails & Sunset Drinks',
    filename: 'sunset_herbal_drinks.jpg',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    altText: 'Chilled iced mocktail glass with fresh mint and citrus garnish against sunset hills',
    caption: 'Refreshing signature beverages infused with local mint, ginger and lemon.',
    description: 'Sunset drinks glass with ice cubes, fresh herbs, and fruit slice garnish.',
    fileType: 'image/jpeg',
    fileSize: '360 KB',
    dimensions: '1000 × 1500',
    uploadedAt: '2026-08-15T07:15:00Z',
    category: 'food',
  }
];

export const INITIAL_PAGES: PageItem[] = [
  {
    id: 'home',
    title: 'Home / Landing Page',
    slug: '/',
    navLabel: 'Home',
    subtitle: 'Escape the ordinary. Eat well. Relax in nature.',
    bannerImage: BUSINESS_INFO.images.hero,
    metaDescription: 'Buglay Rock Farm House is a premier countryside dining sanctuary near Godawari, Lalitpur.',
    status: 'published',
    lastModified: '2026-08-15',
    template: 'home',
    acfFields: [
      { key: 'hero_headline', label: 'Hero Main Headline', type: 'text', value: 'Escape the', description: 'First line of display banner' },
      { key: 'hero_highlight', label: 'Hero Highlight Word', type: 'text', value: 'Ordinary.', description: 'Accent gold text' },
      { key: 'hero_subheadline', label: 'Hero Subheadline', type: 'textarea', value: 'Good food, fresh air, music and unforgettable moments at Buglay Rock Farm House.', description: 'Brief introductory sentence' },
      { key: 'hero_badge_rating', label: 'Google Rating Badge Text', type: 'text', value: '4.9 ★ (150+ Google Reviews)', description: 'Trust indicator on top banner' },
      { key: 'cta_primary_label', label: 'Primary Button Label', type: 'text', value: 'View Menu & Specialties', description: 'Main CTA button' },
      { key: 'cta_secondary_label', label: 'Secondary Button Label', type: 'text', value: 'Book a Table', description: 'Table inquiry button' },
      { key: 'announcement_badge', label: 'Top Notice Bar Text', type: 'text', value: '🌿 Weekend Special: Live Charcoal BBQ & Acoustic Bonfire Sessions', description: 'Top promo notice' }
    ]
  },
  {
    id: 'experience',
    title: 'Experiences & Activities',
    slug: '/experience',
    navLabel: 'Experience',
    subtitle: 'Fresh flavours, open hill air, soulful music & cozy gatherings.',
    bannerImage: BUSINESS_INFO.images.dining,
    metaDescription: 'Discover authentic outdoor dining, live acoustic music, karaoke, and nature games in Lalitpur.',
    status: 'published',
    lastModified: '2026-08-14',
    template: 'experience',
    acfFields: [
      { key: 'experience_hero_title', label: 'Section Header Title', type: 'text', value: 'Moments That Matter', description: 'Top section title' },
      { key: 'experience_subtitle', label: 'Section Subtitle', type: 'text', value: 'More Than Just Dining', description: 'Top decorative badge' },
      { key: 'intro_paragraph', label: 'Introduction Narrative', type: 'textarea', value: 'At Buglay Rock Farm House, dining is part of a larger countryside rhythm. Whether you are gathered around a crackling wood fire or singing karaoke with childhood friends, every corner is designed for joy.', description: 'Intro paragraph' },
      { key: 'family_friendly_badge', label: 'Family Atmosphere Note', type: 'text', value: 'Safe open lawn space for kids & family recreation', description: 'Safety & comfort tag' },
      { key: 'sound_system_spec', label: 'Karaoke & Audio Quality', type: 'text', value: 'HD Wireless Mics & Dedicated Acoustic Courtyard', description: 'Audio setup highlight' }
    ]
  },
  {
    id: 'menu',
    title: 'Menu & Farmhouse Dining',
    slug: '/menu',
    navLabel: 'Food Menu',
    subtitle: 'From local hill spices to sizzling charcoal grills, explore hearty dishes.',
    bannerImage: BUSINESS_INFO.images.dining,
    metaDescription: 'Explore authentic charcoal Sekuwa, Nepali Khaja sets, mountain trout fish fry, and local specialties.',
    status: 'published',
    lastModified: '2026-08-15',
    template: 'menu',
    acfFields: [
      { key: 'menu_header_title', label: 'Menu Header Title', type: 'text', value: 'Farmhouse Flavours & Feasts', description: 'Page header text' },
      { key: 'menu_subtitle', label: 'Menu Subtitle', type: 'text', value: 'Prepared Fresh With Mountain Spices & Passion', description: 'Subtitle tag' },
      { key: 'chef_special_note', label: 'Chef Signature Dish Callout', type: 'text', value: 'Try our Buglay Special Charcoal Sekuwa marinated in mountain herbs!', description: 'Highlight callout' },
      { key: 'dietary_notice', label: 'Dietary Options Notice', type: 'textarea', value: 'All meals are cooked to order using local organic vegetables and clean mountain water. Pure vegetarian options available.', description: 'Dietary note' },
      { key: 'currency_unit', label: 'Currency Unit Label', type: 'text', value: 'NPR (Nepalese Rupees)', description: 'Pricing format label' }
    ]
  },
  {
    id: 'story',
    title: 'Our Story & Philosophy',
    slug: '/story',
    navLabel: 'Our Story',
    subtitle: 'A humble sanctuary carved into the green hills of Lalitpur near Godawari.',
    bannerImage: BUSINESS_INFO.images.outdoors,
    metaDescription: 'Read about the inspiration and heritage behind Buglay Rock Farm House in Lalitpur 44709.',
    status: 'published',
    lastModified: '2026-08-12',
    template: 'story',
    acfFields: [
      { key: 'story_title', label: 'Story Headline', type: 'text', value: 'A Little Escape in the Hills', description: 'Main narrative heading' },
      { key: 'story_subtitle', label: 'Story Subheading / Badge', type: 'text', value: 'Fresh Air, Open Skies & Mountain Silence', description: 'Badge line' },
      { key: 'narrative_para_1', label: 'Story Paragraph 1', type: 'textarea', value: 'Nestled in the peaceful greenery of Lalitpur near Godawari, Buglay Rock Farm House was created as a gentle sanctuary away from the hustle of urban life. Here, time slows down to the rhythm of mountain breezes and sizzling fires.', description: 'First story block' },
      { key: 'narrative_para_2', label: 'Story Paragraph 2', type: 'textarea', value: 'We set out to craft a relaxed environment where families, friends, and travellers can sit together, enjoy authentic food made with fresh spices, and share stories while surrounded by nature.', description: 'Second story block' },
      { key: 'philosophy_quote', label: 'Philosophy Signature Quote', type: 'textarea', value: '“Good food, fresh hill breeze, soulful acoustic music, and the warmth of genuine farmhouse hospitality.”', description: 'Highlighted quote' },
      { key: 'founded_year', label: 'Farmhouse Established Date', type: 'text', value: 'Est. Lalitpur Hills', description: 'Heritage marker' }
    ]
  },
  {
    id: 'events',
    title: 'Events & Celebrations',
    slug: '/events',
    navLabel: 'Celebrations',
    subtitle: 'Host your unforgettable birthday, reunion, office retreat or family picnic.',
    bannerImage: BUSINESS_INFO.images.music,
    metaDescription: 'Reserve dedicated pavilions, karaoke setups, barbecue stations, and private lawns for group gatherings.',
    status: 'published',
    lastModified: '2026-08-13',
    template: 'events',
    acfFields: [
      { key: 'events_title', label: 'Events Page Title', type: 'text', value: 'Celebrate Life’s Special Milestones', description: 'Top section header' },
      { key: 'events_subtitle', label: 'Events Badge Text', type: 'text', value: 'Group Packages & Custom Gatherings', description: 'Decorative badge' },
      { key: 'venue_capacity_info', label: 'Max Venue Capacity', type: 'text', value: 'Accommodates up to 150+ guests across open lawns and pavilions', description: 'Capacity details' },
      { key: 'custom_decor_allowed', label: 'Custom Decoration Policy', type: 'text', value: 'Balloon styling, birthday arches & photo booths welcomed', description: 'Decor policy' },
      { key: 'booking_notice', label: 'Booking Advisory', type: 'textarea', value: 'For large parties exceeding 20 guests, advance reservation 2-3 days prior is recommended to secure preferred pavilion and custom sharing menus.', description: 'Advisory notice' }
    ]
  },
  {
    id: 'gallery',
    title: 'Photo & Atmosphere Gallery',
    slug: '/gallery',
    navLabel: 'Gallery',
    subtitle: 'Moments of warmth, delicious food, scenic hills, and joyful smiles.',
    bannerImage: BUSINESS_INFO.images.hero,
    metaDescription: 'Photo gallery of Buglay Rock Farm House food, sunsets, live music, and family moments.',
    status: 'published',
    lastModified: '2026-08-10',
    template: 'gallery',
    acfFields: [
      { key: 'gallery_title', label: 'Gallery Title', type: 'text', value: 'Glimpses of Farmhouse Life', description: 'Gallery page heading' },
      { key: 'gallery_subtitle', label: 'Gallery Subtitle', type: 'text', value: 'Sunsets, Sizzling Sekuwa & Soulful Acoustics', description: 'Gallery tagline' },
      { key: 'instagram_tag_prompt', label: 'Social Media Tag Prompt', type: 'text', value: 'Tag @buglayrockfarmhouse on Instagram to get featured in our guest gallery!', description: 'Guest upload callout' }
    ]
  },
  {
    id: 'location',
    title: 'Location & Visit Guide',
    slug: '/location',
    navLabel: 'Visit Us',
    subtitle: 'Located in the scenic hills of Lalitpur 44709, near Godawari & Lakuri Bhanjyang.',
    bannerImage: BUSINESS_INFO.images.outdoors,
    metaDescription: 'Find directions, GPS map links, contact phone, and operating hours for Buglay Rock Farm House.',
    status: 'published',
    lastModified: '2026-08-15',
    template: 'location',
    acfFields: [
      { key: 'location_title', label: 'Location Heading', type: 'text', value: 'Getting Here & Practical Info', description: 'Location heading' },
      { key: 'location_subtitle', label: 'Location Subtitle', type: 'text', value: 'Scenic Hillside Retreat in Lalitpur 44709', description: 'Subtitle' },
      { key: 'distance_from_patan', label: 'Approximate Travel Distance', type: 'text', value: '30–35 minutes scenic drive from Gwarko / Patan', description: 'Drive estimate' },
      { key: 'parking_facility', label: 'Parking Facility Note', type: 'text', value: 'Ample Free Parking for 25+ Cars & 50+ Motorbikes on-site', description: 'Parking info' },
      { key: 'road_condition', label: 'Road Condition Details', type: 'text', value: 'Paved blacktop roads with well-graded countryside approach', description: 'Access info' },
      { key: 'pet_policy', label: 'Pet Friendly Status', type: 'text', value: 'Pet-friendly outdoor garden lawns with leash courtesy', description: 'Pet policy' }
    ]
  },
  {
    id: 'blog',
    title: 'Farmhouse Stories & Blog',
    slug: '/blog',
    navLabel: 'Blog & Stories',
    subtitle: 'Read about countryside recipes, event highlights, farm life, and travel tips.',
    bannerImage: BUSINESS_INFO.images.dining,
    metaDescription: 'Read the latest stories, barbecue guides, and events at Buglay Rock Farm House.',
    status: 'published',
    lastModified: '2026-08-15',
    template: 'blog',
    acfFields: [
      { key: 'blog_header_title', label: 'Blog Section Title', type: 'text', value: 'Farmhouse Journal & Stories', description: 'Blog page header' },
      { key: 'blog_header_subtitle', label: 'Blog Subtitle', type: 'text', value: 'Tales of Mountain Living, Live Music, and Culinary Traditions', description: 'Tagline' },
      { key: 'featured_author', label: 'Editor in Chief', type: 'text', value: 'Buglay Rock Editorial Team', description: 'Author spotlight' }
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'A Cozy Sunset & Acoustic Music Night in the Lalitpur Hills',
    slug: 'cozy-sunset-acoustic-music-night',
    excerpt: 'How acoustic melodies, crackling wood bonfires, and mountain sunsets turn ordinary weekends into unforgettable memories.',
    content: `When the sun begins its descent behind the southern ridge of the Kathmandu Valley, Buglay Rock Farm House takes on a magical amber glow. The crisp mountain breeze rolls in from the Godawari hills, carrying with it the aroma of sizzling charcoal barbecue and woodsmoke.

Every weekend, local acoustic artists gather under our festoon-lit courtyard to strum unplugged Nepali classics, folk harmonies, and indie favorites. Guests gather around stone fire pits with warm mugs of spiced tea or cold beverages, singing along with friends and family.

### Why Hill Acoustics Feel Different
Unlike loud city bars, the natural open topography here creates a warm, gentle reverberation that lets you hold intimate conversations while immersing yourself in soul-stirring music. 

> "There is something timeless about sharing a warm meal under starlight while listening to an acoustic guitar echo through the trees."

Whether you are celebrating a birthday milestone or simply unwinding after a long work week, our evening acoustic sessions offer the peaceful hill escape you have been searching for.`,
    featuredImage: BUSINESS_INFO.images.music,
    category: 'Events & Celebrations',
    author: 'Farmhouse Host',
    authorRole: 'Experience Curator',
    publishedAt: 'Aug 12, 2026',
    readTime: '4 min read',
    status: 'published',
    tags: ['Acoustic Music', 'Sunset', 'Bonfire', 'Lalitpur Events'],
    acfFields: [
      { key: 'event_schedule', label: 'Event Schedule', type: 'text', value: 'Every Saturday & Sunday from 4:30 PM' },
      { key: 'live_talent', label: 'Featured Musicians', type: 'text', value: 'Local Independent Duos & Soloists' },
      { key: 'vibe_highlight', label: 'Atmosphere Style', type: 'text', value: 'Festoon Courtyard & Warm Fire Pit' },
      { key: 'recommended_pairing', label: 'Recommended Drink', type: 'text', value: 'Godawari Rhododendron Hill Iced Tea' }
    ]
  },
  {
    id: 'post-2',
    title: 'The Secret to Buglay’s Sizzling Charcoal Sekuwa & Spices',
    slug: 'secret-to-buglays-charcoal-sekuwa',
    excerpt: 'A deep dive into our slow-marination process, wild Himalayan timur pepper, and the wood charcoal that makes our Sekuwa extraordinary.',
    content: `Sekuwa is not merely grilled meat in Nepal; it is a revered culinary craft honed across generations. At Buglay Rock Farm House, we take immense pride in elevating this national favorite to its purest farmhouse form.

### 1. Marinated with Wild Hill Spices
We begin by marinating fresh, locally sourced meat in an authentic blend of garlic, cold-pressed mustard oil, roasted cumin, ground coriander, and wild Himalayan Timur (Nepali Szechuan pepper). The meat is left to infuse for hours so that every fiber absorbs the zesty, tingling warmth of the spices.

### 2. Searing Over Hardwood Charcoal
We do not use gas or artificial lava rocks. Our grill masters prepare natural wood charcoal every afternoon, waiting until the embers turn a steady incandescent white-grey. This ensures an even high-temperature sear that caramelizes the outer edges while locking in all the savory natural juices.

### 3. The Perfect Countryside Platter
Served smoking hot straight from the grill onto wooden platters, our Sekuwa is accompanied by crisp beaten rice (Chiura), spicy Aloo Sadeko, and our signature fresh mint-coriander chutney. It is the definitive taste of a Nepali hill afternoon.`,
    featuredImage: BUSINESS_INFO.images.dining,
    category: 'Food & Recipes',
    author: 'Chef Bikash Tamang',
    authorRole: 'Head Grill Master',
    publishedAt: 'Aug 05, 2026',
    readTime: '5 min read',
    status: 'published',
    tags: ['Sekuwa', 'Charcoal BBQ', 'Nepali Food', 'Timur Pepper'],
    acfFields: [
      { key: 'key_spice', label: 'Hero Spice', type: 'text', value: 'Wild Himalayan Timur (Szechuan Pepper)' },
      { key: 'cooking_method', label: 'Cooking Method', type: 'text', value: '100% Wood Charcoal Slow Ember' },
      { key: 'portion_style', label: 'Serving Size', type: 'text', value: 'Generous Sharing Platters' }
    ]
  },
  {
    id: 'post-3',
    title: 'Top 5 Family Weekend Outing Spots Near Godawari & Lalitpur',
    slug: 'top-family-weekend-outing-spots-godawari',
    excerpt: 'Looking for the best weekend day trips with kids and elders? Here is our curated guide to the serene Godawari and Lalitpur hills.',
    content: `When the weekend arrives, escaping the traffic and dust of the inner ring road becomes essential for health and well-being. Fortunately, southern Lalitpur offers some of the most scenic and accessible green retreats in Nepal.

### 1. Godawari Botanical Gardens
Home to hundreds of native Himalayan plant species, orchid houses, and gentle stone pathways, Godawari is the ideal morning walk for families with children and elderly parents.

### 2. Buglay Rock Farm House
Just a short drive upward from Godawari, Buglay Rock Farm House is the ultimate dining destination to conclude your morning excursion. With sprawling lawns, outdoor recreational games, delicious freshly cooked meals, and panoramic hill viewpoints, everyone in the family finds their own quiet joy.

### 3. Lakuri Bhanjyang Viewpoint
For those who enjoy early morning sunrises and panoramic views of the Langtang and Ganesh Himal mountain ranges, Lakuri Bhanjyang is just further up the hill ridge.

### Practical Tips for Visiting:
* **Timing:** Morning between 10:00 AM and 2:00 PM offers the brightest skies and warmest mountain sunshine.
* **Parking:** Ensure your destination provides safe off-road parking (Buglay Rock offers space for 25+ cars).
* **Dress Warmly:** Hilltops can be 3–4°C cooler than downtown Lalitpur, so keep a light jacket for late afternoons.`,
    featuredImage: BUSINESS_INFO.images.outdoors,
    category: 'Nature & Trails',
    author: 'Buglay Rock Travel Desk',
    authorRole: 'Local Guide',
    publishedAt: 'Jul 28, 2026',
    readTime: '6 min read',
    status: 'published',
    tags: ['Family Outing', 'Godawari', 'Lalitpur Hills', 'Weekend Guide'],
    acfFields: [
      { key: 'travel_distance', label: 'Travel Distance', type: 'text', value: '35 mins from Patan / Gwarko' },
      { key: 'parking_availability', label: 'On-site Parking', type: 'text', value: 'Free On-Site Dedicated Parking' },
      { key: 'ideal_for', label: 'Best Suited For', type: 'text', value: 'Families, Kids & Elderly Friendly' }
    ]
  },
  {
    id: 'post-4',
    title: 'Farm-to-Table: How We Source Local Organic Produce in Lalitpur',
    slug: 'farm-to-table-local-organic-produce',
    excerpt: 'Discover our relationship with smallholder farmers in Godawari and Lubhu, ensuring nutrient-dense seasonal ingredients.',
    content: `True hospitality begins with respecting the soil and the hands that harvest the food we eat. At Buglay Rock Farm House, we prioritize local partnerships with community farmers in the fertile valleys surrounding Godawari.

Every morning before our kitchen fires are stoked, crates of crisp leafy greens, fresh radishes, mountain herbs, and farm-fresh dairy arrive at our kitchen doors. 

### Why Fresh Matters:
* **No Long Cold Storage:** Vegetables harvested at dawn retain their natural sweetness, vitamins, and crisp texture.
* **Supporting Local Economy:** By purchasing directly from cooperative hill growers, we empower local farming families.
* **Pure Mountain Flavours:** Our seasonal salads and traditional Gundruk curries carry the authentic mineral depth of Lalitpur hill soil.

Next time you enjoy our Fresh Farmhouse Thali or Green Salad, know that you are part of a vibrant, sustainable agricultural story.`,
    featuredImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    category: 'Farm Life',
    author: 'Suman Maharjan',
    authorRole: 'Farm Coordinator',
    publishedAt: 'Jul 15, 2026',
    readTime: '4 min read',
    status: 'published',
    tags: ['Organic Farming', 'Farm to Table', 'Sustainability', 'Local Produce'],
    acfFields: [
      { key: 'harvest_frequency', label: 'Harvest Frequency', type: 'text', value: 'Daily Morning Deliveries' },
      { key: 'partner_regions', label: 'Partner Communities', type: 'text', value: 'Godawari, Lubhu & Lele Valleys' }
    ]
  }
];

export const INITIAL_EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'pkg-1',
    name: 'Family & Group Feast',
    capacity: '8 to 30 Guests',
    ideal: 'Birthdays, Family Weekends, Anniversaries',
    features: [
      'Reserved outdoor lawn tables with scenic hill view',
      'Custom sharing platters & charcoal Sekuwa',
      'Complimentary sound system / background music',
      'Dedicated server team for your group'
    ],
    recommended: false,
    status: 'published'
  },
  {
    id: 'pkg-2',
    name: 'Celebration & Karaoke Night',
    capacity: '15 to 50 Guests',
    ideal: 'Milestone Birthdays, Reunions, Festive Parties',
    features: [
      'Dedicated pavilion area with evening festoon lights',
      'High-definition Karaoke audio setup with dual wireless mics',
      'Barbecue grill station & beverage service',
      'Cozy evening bonfire arrangement'
    ],
    recommended: true,
    status: 'published'
  },
  {
    id: 'pkg-3',
    name: 'Corporate & Team Retreat',
    capacity: '20 to 100+ Guests',
    ideal: 'Company Offsites, Team Lunches, Private Buyouts',
    features: [
      'Full or partial lawn reservation for team activities',
      'Buffet lunch & afternoon tea/snacks package',
      'Free spacious vehicle parking on-site',
      'Flexible schedule & tailored dining plans'
    ],
    recommended: false,
    status: 'published'
  }
];

export const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-101',
    fullName: 'Siddhartha Gautam',
    phone: '9841234567',
    visitDate: '2026-08-22',
    guestCount: 16,
    preferredSection: 'Dedicated Event Pavilion',
    occasion: 'Birthday Celebration & Karaoke',
    specialNotes: 'Looking forward to the evening bonfire and Sekuwa platters. Would like vegetarian options for 4 guests.',
    createdAt: '2026-08-14T14:32:00Z',
    status: 'new',
    adminNotes: 'Spoke briefly on phone, requested quotation for 16 pax.'
  },
  {
    id: 'inq-102',
    fullName: 'Anjali Shrestha',
    phone: '9813987654',
    visitDate: '2026-08-20',
    guestCount: 8,
    preferredSection: 'Outdoor Garden Lawn',
    occasion: 'Family Gathering & Dining',
    specialNotes: 'Family lunch with elderly parents and kids. Need easily accessible shaded table.',
    createdAt: '2026-08-13T10:15:00Z',
    status: 'contacted',
    adminNotes: 'Table reserved in lower lawn near garden pergola.'
  },
  {
    id: 'inq-103',
    fullName: 'Kiran Thapa',
    phone: '9851122334',
    visitDate: '2026-08-18',
    guestCount: 25,
    preferredSection: 'Bonfire & Acoustic Courtyard',
    occasion: 'Corporate / Team Outing',
    specialNotes: 'Tech team retreat. Will arrive around 2 PM and stay till 7 PM for dinner.',
    createdAt: '2026-08-11T16:45:00Z',
    status: 'confirmed',
    adminNotes: 'Advance payment received, barbecue grill master assigned.'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  name: BUSINESS_INFO.name,
  tagline: BUSINESS_INFO.tagline,
  heroHeadline: "Escape the",
  heroHeadlineHighlight: "Ordinary.",
  heroSubheadline: BUSINESS_INFO.heroSubheadline,
  address: BUSINESS_INFO.address,
  locationContext: BUSINESS_INFO.locationContext,
  phone: BUSINESS_INFO.phone,
  phoneDisplay: BUSINESS_INFO.phoneDisplay,
  rating: BUSINESS_INFO.rating,
  reviewCount: BUSINESS_INFO.reviewCount,
  googleMapsUrl: BUSINESS_INFO.googleMapsUrl,
  instagramHandle: BUSINESS_INFO.instagramHandle,
  instagramUrl: BUSINESS_INFO.instagramUrl,
  facebookPage: BUSINESS_INFO.facebookPage,
  facebookUrl: BUSINESS_INFO.facebookUrl,
  logo: BUSINESS_INFO.logo,
  images: {
    logo: BUSINESS_INFO.images.logo,
    hero: BUSINESS_INFO.images.hero,
    dining: BUSINESS_INFO.images.dining,
    outdoors: BUSINESS_INFO.images.outdoors,
    music: BUSINESS_INFO.images.music,
  },
  storyContent: {
    title: "A Little Escape in the Hills",
    subtitle: "Fresh Air, Open Skies & Mountain Silence",
    paragraph1: "Nestled in the peaceful greenery of Lalitpur near Godawari, Buglay Rock Farm House was created as a gentle sanctuary away from the hustle of urban life. Here, time slows down to the rhythm of mountain breezes and sizzling fires.",
    paragraph2: "We set out to craft a relaxed environment where families, friends, and travellers can sit together, enjoy authentic food made with fresh spices, and share stories while surrounded by nature.",
    quote: "Good food, fresh hill breeze, soulful acoustic music, and the warmth of genuine farmhouse hospitality."
  },
  openingHours: [
    { days: 'Monday – Friday', hours: '10:00 AM – 8:30 PM', notes: 'Day & Evening dining' },
    { days: 'Saturday – Sunday', hours: '9:00 AM – 9:30 PM', notes: 'Live Music & BBQ Weekends' },
    { days: 'Public Holidays', hours: '9:00 AM – 9:30 PM', notes: 'Advance booking advised' }
  ]
};

export const INITIAL_NAV_MENU: NavMenuItem[] = [
  { id: 'nav-home', label: 'Home', pageId: 'home', url: '#home', icon: 'Compass', isVisible: true, order: 1 },
  { id: 'nav-experience', label: 'Experience', pageId: 'experience', url: '#experience', icon: 'Sparkles', isVisible: true, order: 2 },
  { id: 'nav-menu', label: 'Menu', pageId: 'menu', url: '#menu', icon: 'Utensils', isVisible: true, order: 3 },
  { id: 'nav-story', label: 'Story', pageId: 'story', url: '#story', icon: 'Info', isVisible: true, order: 4 },
  { id: 'nav-events', label: 'Events', pageId: 'events', url: '#events', icon: 'Calendar', isVisible: true, order: 5 },
  { id: 'nav-gallery', label: 'Gallery', pageId: 'gallery', url: '#gallery', icon: 'Image', isVisible: true, order: 6 },
  { id: 'nav-blog', label: 'Blog', pageId: 'blog', url: '#blog', icon: 'BookOpen', isVisible: true, order: 7 },
  { id: 'nav-location', label: 'Location', pageId: 'location', url: '#location', icon: 'MapPin', isVisible: true, order: 8 },
];

export const DEFAULT_CMS_STATE: CMSDataState = {
  siteSettings: INITIAL_SITE_SETTINGS,
  menuItems: SAMPLE_MENU.map(item => ({ ...item, status: 'published' })),
  experiences: EXPERIENCES.map(item => ({ ...item, status: 'published' })),
  eventPackages: INITIAL_EVENT_PACKAGES,
  galleryItems: GALLERY_ITEMS,
  testimonials: TESTIMONIALS.map(item => ({ ...item, status: 'published' })),
  inquiries: INITIAL_INQUIRIES,
  pages: INITIAL_PAGES,
  blogPosts: INITIAL_BLOG_POSTS,
  notifications: [],
  mediaLibrary: INITIAL_MEDIA_LIBRARY,
  navigationMenu: INITIAL_NAV_MENU,
};
