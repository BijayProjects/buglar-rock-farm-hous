import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Compass, Heart, Navigation, ExternalLink } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings } = useCMS();

  const handleLinkClick = (pageId: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
    }
  };

  return (
    <footer className="bg-[#10261D] text-[#FDFAF5] pt-16 pb-28 lg:pb-12 border-t border-[#254F3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#254F3D]">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <a
                href="#home"
                onClick={(e) => handleLinkClick('home', e)}
                className="w-11 h-11 rounded-full overflow-hidden border border-[#E08E45]/60 bg-[#10261D] flex items-center justify-center p-0.5 shrink-0 shadow-md hover:scale-105 transition-transform"
              >
                <img
                  src={siteSettings.logo}
                  alt={`${siteSettings.name} Logo`}
                  className="w-full h-full object-cover object-center rounded-full"
                  referrerPolicy="no-referrer"
                />
              </a>
              <span className="font-serif text-2xl font-bold text-[#FDFAF5]">
                {siteSettings.name}
              </span>
            </div>

            <p className="text-sm text-[#EFE9DD]/80 font-light leading-relaxed max-w-sm">
              “{siteSettings.tagline}”
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#EFE9DD]/90">
              {/* Direct Location Link on Address Text */}
              <a
                href={siteSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open exact location in Google Maps"
                className="flex items-start sm:items-center gap-2 group hover:text-[#E08E45] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#1A382B]/60"
              >
                <MapPin className="w-4 h-4 text-[#E08E45] shrink-0 mt-0.5 sm:mt-0 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-[#E08E45]/40 group-hover:decoration-[#E08E45] underline-offset-2 flex items-center gap-1.5">
                  <span>{siteSettings.address} ({siteSettings.locationContext})</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 shrink-0" />
                </span>
              </a>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E08E45] shrink-0" />
                <a href={`tel:${siteSettings.phone}`} className="hover:text-[#E08E45] transition-colors">
                  {siteSettings.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-lg text-[#E08E45]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#EFE9DD]/80">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick('home', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleLinkClick('experience', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  Farmhouse Experience
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick('menu', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  Digital Menu
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  onClick={(e) => handleLinkClick('story', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  A Little Escape in the Hills
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={(e) => handleLinkClick('events', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  Gatherings & Events
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleLinkClick('gallery', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  Photo Showcase
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => handleLinkClick('blog', e)}
                  className="hover:text-[#E08E45] transition-colors"
                >
                  Journal & Stories
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => handleLinkClick('location', e)}
                  className="hover:text-[#E08E45] transition-colors font-bold text-[#E08E45]"
                >
                  Location & Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#E08E45]">
              Connect & Visit
            </h4>
            <p className="text-xs text-[#EFE9DD]/80">
              Follow our daily specials, live music schedules, and farmhouse moments in Lalitpur.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#1A382B] text-[#EFE9DD] hover:bg-[#E08E45] hover:text-[#10261D] border border-[#254F3D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#1A382B] text-[#EFE9DD] hover:bg-[#E08E45] hover:text-[#10261D] border border-[#254F3D] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="text-xs text-[#E08E45] font-mono">{siteSettings.instagramHandle}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`tel:${siteSettings.phone}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#E08E45] text-[#10261D] font-bold text-xs shadow hover:bg-[#C87D32] transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Restaurant</span>
              </a>
              <a
                href={siteSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#254F3D] text-[#FDFAF5] font-semibold text-xs border border-[#E08E45]/40 hover:bg-[#336B53] transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E08E45]" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & local SEO tags */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-[#EFE9DD]/60">
          <p>
            © {new Date().getFullYear()} {siteSettings.name}. All rights reserved.{' '}
            <a
              href={siteSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E08E45] hover:underline"
            >
              {siteSettings.address}
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-[#E08E45]/70">
            <a
              href={siteSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FDFAF5] transition-colors"
            >
              {siteSettings.name} Lalitpur
            </a>
            <span>•</span>
            <a
              href={siteSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FDFAF5] transition-colors"
            >
              Restaurant Near Godawari
            </a>
            <span>•</span>
            <span>Family Outdoor Dining</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
