import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Settings, Save, CheckCircle2, Shield, Lock, Eye, EyeOff, Globe, Phone, MapPin, Sparkles } from 'lucide-react';
import { ImageUploadField } from './components/ImageUploadField';

export const AdminSettings: React.FC = () => {
  const { siteSettings, updateSiteSettings, updateAdminPassword } = useCMS();

  // General Settings
  const [name, setName] = useState(siteSettings.name);
  const [tagline, setTagline] = useState(siteSettings.tagline);
  const [phone, setPhone] = useState(siteSettings.phone);
  const [phoneDisplay, setPhoneDisplay] = useState(siteSettings.phoneDisplay);
  const [address, setAddress] = useState(siteSettings.address);
  const [locationContext, setLocationContext] = useState(siteSettings.locationContext);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(siteSettings.googleMapsUrl);
  const [rating, setRating] = useState(siteSettings.rating);
  const [reviewCount, setReviewCount] = useState(siteSettings.reviewCount);
  const [instagramHandle, setInstagramHandle] = useState(siteSettings.instagramHandle);
  const [instagramUrl, setInstagramUrl] = useState(siteSettings.instagramUrl);
  const [facebookPage, setFacebookPage] = useState(siteSettings.facebookPage);
  const [facebookUrl, setFacebookUrl] = useState(siteSettings.facebookUrl);
  const [logo, setLogo] = useState(siteSettings.logo);

  // Security / Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      name,
      tagline,
      phone,
      phoneDisplay,
      address,
      locationContext,
      googleMapsUrl,
      rating,
      reviewCount,
      instagramHandle,
      instagramUrl,
      facebookPage,
      facebookUrl,
      logo,
      images: {
        ...siteSettings.images,
        logo,
      },
    });
    showNotice('General business settings and branding saved successfully.');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityNotice(null);
    if (!newPassword || newPassword.length < 4) {
      setSecurityNotice('Error: Password must be at least 4 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityNotice('Error: Passwords do not match.');
      return;
    }
    const success = updateAdminPassword(newPassword);
    if (success) {
      setSecurityNotice('✓ Admin password updated successfully! Use your new password on next login.');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2 font-serif">
            <span>Site Settings & Branding</span>
          </h1>
          <p className="text-xs text-gray-600 font-light mt-1">
            Configure core contact details, phone numbers, Google Maps GPS links, social profiles, and admin security credentials.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs sm:text-sm rounded shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-[#e7f5ea] border-l-4 border-[#00a32a] text-xs text-[#00a32a] font-medium flex items-center gap-2 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Business Identity */}
        <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#1d2327] pb-3 border-b border-gray-200 font-serif flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#2271b1]" />
            <span>Business Identity & Tagline</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Farmhouse / Restaurant Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>

            <div>
              <ImageUploadField
                label="Site Logo Image"
                value={logo}
                onChange={(newUrl) => setLogo(newUrl)}
                helperText="Brand icon displayed across the website navbar and admin bar."
                previewHeight="h-20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Tagline / Slogan
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Rating (e.g. 4.9)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Total Review Count (e.g. "150+")
              </label>
              <input
                type="text"
                value={reviewCount}
                onChange={(e) => setReviewCount(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Map Location */}
        <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#1d2327] pb-3 border-b border-gray-200 font-serif flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#E08E45]" />
            <span>Contact Numbers & Location Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Raw Dial Phone (e.g. +977 9801000007)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Display Phone Formatted
              </label>
              <input
                type="text"
                value={phoneDisplay}
                onChange={(e) => setPhoneDisplay(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Official Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Lalitpur 44709, Nepal"
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Location Context / Area Landmarks
              </label>
              <input
                type="text"
                value={locationContext}
                onChange={(e) => setLocationContext(e.target.value)}
                placeholder="Near Godawari & Lakuri Bhanjyang"
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Google Maps GPS Direct Link
            </label>
            <input
              type="text"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#1d2327] pb-3 border-b border-gray-200 font-serif flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00a32a]" />
            <span>Social Media Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder="@buglayrockfarmhouse"
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Facebook Page Name
              </label>
              <input
                type="text"
                value={facebookPage}
                onChange={(e) => setFacebookPage(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-sm rounded shadow transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save General Settings</span>
          </button>
        </div>
      </form>

      {/* Admin Security Credentials Box */}
      <div className="bg-white p-6 rounded-lg border border-[#c3c4c7] shadow-sm space-y-4 mt-8">
        <h2 className="text-base font-bold text-[#1d2327] pb-3 border-b border-gray-200 font-serif flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#d63638]" />
          <span>Admin Account Security & Password</span>
        </h2>

        <p className="text-xs text-gray-600 font-light">
          Change the master password used to authenticate into the WordPress Admin CMS portal.
        </p>

        {securityNotice && (
          <div
            className={`p-3 rounded text-xs font-medium ${
              securityNotice.startsWith('Error')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {securityNotice}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              New Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 4 characters)"
                className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full text-xs p-2.5 border border-[#8c8f94] rounded outline-none focus:border-[#2271b1]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#10261D] hover:bg-[#254F3D] text-[#E08E45] font-bold text-xs rounded transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Update Master Admin Password</span>
          </button>
        </form>
      </div>
    </div>
  );
};
