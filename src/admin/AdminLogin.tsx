import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { login, siteSettings } = useCMS();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleQuickLogin = () => {
    setUsername('admin');
    setPassword('admin');
    login('admin', 'admin');
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* WordPress-style Centered Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#10261D] border-2 border-[#E08E45] shadow-xl p-1 flex items-center justify-center overflow-hidden mb-3 hover:scale-105 transition-transform">
          <img
            src={siteSettings.logo}
            alt={siteSettings.name}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#10261D]">
          {siteSettings.name}
        </h1>
        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">
          Administration Portal • WordPress-Style CMS
        </p>
      </div>

      {/* WordPress-style Login Box */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-[#c3c4c7] p-8">
        {error && (
          <div className="mb-5 p-3.5 rounded bg-[#fcf0f1] border-l-4 border-[#d63638] text-xs text-[#d63638] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span><strong>ERROR</strong>: {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#2c3338] mb-1.5 uppercase tracking-wide">
              Username or Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#8c8f94] rounded text-sm text-[#2c3338] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none transition-all"
                placeholder="admin"
              />
              <User className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c3338] mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#8c8f94] rounded text-sm text-[#2c3338] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none transition-all pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-[#50575e] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#8c8f94] text-[#2271b1] focus:ring-[#2271b1]"
              />
              <span>Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#2271b1] hover:bg-[#135e96] active:bg-[#0a4b78] text-white font-semibold text-sm rounded shadow transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Log In to Farmhouse CMS</span>
          </button>
        </form>

        {/* Quick Demo Credentials helper */}
        <div className="mt-6 pt-5 border-t border-gray-200">
          <div className="bg-[#f6f7f7] border border-[#dcdcde] rounded-lg p-3.5 text-xs text-[#50575e] space-y-2">
            <div className="flex items-center justify-between font-semibold text-[#1d2327]">
              <span>Quick Login (Demo Access):</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#00a32a]/10 text-[#00a32a] font-bold">Ready</span>
            </div>
            <p className="text-[11px] text-gray-600">
              Default Username: <code className="bg-white px-1.5 py-0.5 rounded border text-black font-mono">admin</code> | Password: <code className="bg-white px-1.5 py-0.5 rounded border text-black font-mono">admin</code>
            </p>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full mt-1 py-1.5 px-3 bg-[#10261D] hover:bg-[#254F3D] text-[#E08E45] font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Demo Admin Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Back to Public Website Link */}
      <div className="mt-6 text-center">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-1.5 text-xs text-[#2271b1] hover:text-[#135e96] font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Back to {siteSettings.name} Website</span>
        </button>
      </div>
    </div>
  );
};
