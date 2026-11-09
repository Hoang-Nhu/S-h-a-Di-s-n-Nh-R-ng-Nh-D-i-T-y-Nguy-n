import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Globe, Volume2, VolumeX, Menu, X, Home, Compass, Layers, Flame, MapPin, History, Image, BookOpen } from 'lucide-react';

export type NavTabId = 'home' | 'architecture' | 'floorplan' | 'rituals' | 'map' | 'timeline' | 'gallery' | 'sources' | 'ai';

interface NavbarProps {
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  isAudioSpeaking: boolean;
  onStopAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  isDark,
  setIsDark,
  activeTab,
  setActiveTab,
  isAudioSpeaking,
  onStopAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTabId; labelVi: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelVi: 'Trang chủ', labelEn: 'Home', icon: Home },
    { id: 'architecture', labelVi: 'Kiến trúc', labelEn: 'Architecture', icon: Compass },
    { id: 'floorplan', labelVi: 'Sơ đồ mặt bằng', labelEn: 'Floor Plan', icon: Layers },
    { id: 'rituals', labelVi: 'Sinh hoạt & Nghi lễ', labelEn: 'Rituals', icon: Flame },
    { id: 'map', labelVi: 'Bản đồ 5 tỉnh', labelEn: '5-Province Map', icon: MapPin },
    { id: 'timeline', labelVi: 'Lịch sử', labelEn: 'Timeline', icon: History },
    { id: 'gallery', labelVi: 'Thư viện ảnh', labelEn: 'Gallery', icon: Image },
    { id: 'sources', labelVi: 'Nguồn tư liệu', labelEn: 'Sources', icon: BookOpen },
  ];

  const handleTabClick = (tabId: NavTabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-900/95 text-stone-100 border-b border-[#8B5E34]/30 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Project Title */}
          <button 
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C88A3D] to-[#8B5E34] flex items-center justify-center shadow-md text-stone-950 font-bold text-lg font-serif group-hover:scale-105 transition-transform">
              F03
            </div>
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
                {lang === 'vi' ? 'Bảo tàng số di sản' : 'Digital Heritage Museum'}
              </div>
              <div className="font-serif font-bold text-sm sm:text-base tracking-wide text-stone-100 group-hover:text-[#E0A96D] transition-colors leading-tight">
                {lang === 'vi' ? 'Nhà Rông • Nhà Dài Tây Nguyên' : 'Rong & Longhouses of Highlands'}
              </div>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#C88A3D] text-stone-950 shadow-md font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-[#E0A96D]'}`} />
                  <span>{lang === 'vi' ? link.labelVi : link.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Audio Playing Indicator */}
            {isAudioSpeaking && (
              <button
                onClick={onStopAudio}
                title={lang === 'vi' ? 'Dừng đọc thuyết minh' : 'Stop Audio Narration'}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse hover:bg-amber-500/30"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'vi' ? 'Đang đọc...' : 'Playing...'}</span>
                <VolumeX className="w-3 h-3 text-amber-200" />
              </button>
            )}

            {/* Bilingual Switcher */}
            <button
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-stone-800 hover:bg-stone-700 text-[#E0A96D] border border-stone-700 transition"
              title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700 transition"
              title={lang === 'vi' ? 'Chuyển đổi giao diện' : 'Toggle Theme'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-300" />}
            </button>

            {/* AI Assistant Navigation Button */}
            <button
              onClick={() => handleTabClick('ai')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95 ${
                activeTab === 'ai'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-[#C88A3D]/40'
                  : 'bg-gradient-to-r from-[#C88A3D] to-[#8B5E34] text-stone-950 hover:brightness-110'
              }`}
            >
              <Sparkles className="w-4 h-4 text-stone-950 fill-stone-950 animate-spin-slow" />
              <span>{lang === 'vi' ? 'Trợ lý AI' : 'Gemini AI'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-1.5 animate-fade-in">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition text-left ${
                  isActive
                    ? 'bg-[#C88A3D] text-stone-950 font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-[#E0A96D]'}`} />
                <span>{lang === 'vi' ? link.labelVi : link.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
