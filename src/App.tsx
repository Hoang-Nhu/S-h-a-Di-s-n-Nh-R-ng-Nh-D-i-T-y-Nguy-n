/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MuseumDashboard } from './components/MuseumDashboard';
import { SearchFilterBar } from './components/SearchFilterBar';
import { RecordCard } from './components/RecordCard';
import { RecordDetailModal } from './components/RecordDetailModal';
import { InteractiveFloorPlan } from './components/InteractiveFloorPlan';
import { RitualSection } from './components/RitualSection';
import { HeritageMap } from './components/HeritageMap';
import { HistoricalTimeline } from './components/HistoricalTimeline';
import { MasonryGallery } from './components/MasonryGallery';
import { SourcesRegistry } from './components/SourcesRegistry';
import { GeminiAIAssistantModal } from './components/GeminiAIAssistantModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { Footer } from './components/Footer';
import { disanData } from './data/disanData';
import { HeritageRecord } from './data/types';
import { audioGuide } from './utils/audioGuide';
import { Layers, Sparkles, Compass, Flame, MapPin, History, Image, BookOpen, ArrowRight, Home } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'vi' | 'en'>(() => {
    return (localStorage.getItem('f03_lang') as 'vi' | 'en') || 'vi';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('f03_dark');
    return saved !== null ? saved === 'true' : true; // Default dark museum style
  });

  // Active View / Tab State: SPA View Switcher
  const [activeTab, setActiveTab] = useState<NavTabId>('home');

  // Audio Guide State
  const [audioState, setAudioState] = useState<{ isSpeaking: boolean; activeId: string | null }>({
    isSpeaking: false,
    activeId: null
  });

  // Modals
  const [selectedRecord, setSelectedRecord] = useState<HeritageRecord | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEthnic, setSelectedEthnic] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('f03_lang', lang);
  }, [lang]);

  // Sync dark mode class with html element
  useEffect(() => {
    localStorage.setItem('f03_dark', String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Subscribe to Audio Guide state
  useEffect(() => {
    const unsubscribe = audioGuide.subscribe(setAudioState);
    return () => unsubscribe();
  }, []);

  const handlePlayAudio = (record: HeritageRecord) => {
    const textToSpeak = lang === 'vi' ? record.audioTextVi : record.audioTextEn;
    audioGuide.speak(record.id, textToSpeak, lang);
  };

  const handlePlayAudioForText = (id: string, text: string) => {
    audioGuide.speak(id, text, lang);
  };

  const handleStopAudio = () => {
    audioGuide.stop();
  };

  // Filter architecture & spaces records
  const filteredRecords = useMemo(() => {
    return disanData.records.filter(r => {
      // Category filter
      if (selectedCategory !== 'all' && r.category !== selectedCategory) {
        return false;
      }
      // Ethnic filter
      if (selectedEthnic !== 'all' && r.ethnicGroup !== selectedEthnic) {
        return false;
      }
      // Province filter
      if (selectedProvince !== 'all' && !r.currentLocation.includes(selectedProvince) && !r.culturalRegion.includes(selectedProvince)) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesId = r.id.toLowerCase().includes(query);
        const matchesTitle = r.titleVi.toLowerCase().includes(query) || r.titleEn.toLowerCase().includes(query);
        const matchesIndigenous = r.indigenousName.toLowerCase().includes(query);
        const matchesDesc = r.descriptionVi.toLowerCase().includes(query) || r.descriptionEn.toLowerCase().includes(query);
        const matchesElement = r.elementOrType.toLowerCase().includes(query);
        if (!matchesId && !matchesTitle && !matchesIndigenous && !matchesDesc && !matchesElement) {
          return false;
        }
      }
      return true;
    });
  }, [searchTerm, selectedCategory, selectedEthnic, selectedProvince]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedEthnic('all');
    setSelectedProvince('all');
  };

  const handleSelectRecordById = (recordId: string) => {
    const found = disanData.records.find(r => r.id === recordId);
    if (found) {
      setSelectedRecord(found);
    }
  };

  const portalCards: { id: NavTabId; titleVi: string; titleEn: string; descVi: string; descEn: string; icon: React.FC<{ className?: string }>; count: string }[] = [
    {
      id: 'architecture',
      titleVi: 'Kiến trúc & Cấu kiện gỗ',
      titleEn: 'Folk Architecture & Elements',
      descVi: 'Mái vút hình lưỡi búa, cột cái Jơng rông, mộng đan lạt mây, cầu thang Cái mẫu hệ',
      descEn: 'Axe-blade soaring roofs, sacred columns, rattan joinery, matriarchal ladders',
      icon: Compass,
      count: '10 ' + (lang === 'vi' ? 'cấu kiện' : 'elements')
    },
    {
      id: 'floorplan',
      titleVi: 'Sơ đồ mặt bằng tương tác',
      titleEn: 'Interactive Floor Plans',
      descVi: 'Khám phá mặt bằng Nhà Rông Ba Na & Nhà Dài Ê Đê với điểm hotspot nhấp nháy',
      descEn: 'Interactive SVG floor plans of Ba Na Rong and E De Longhouses with hotspots',
      icon: Layers,
      count: '10 ' + (lang === 'vi' ? 'khu vực' : 'zones')
    },
    {
      id: 'rituals',
      titleVi: 'Sinh hoạt & Nghi lễ cộng đồng',
      titleEn: 'Community Rituals & Life',
      descVi: 'Họp buôn luật tục, truyền dạy chiêng, kể Khan sử thi, lễ mừng lúa mới, bỏ mả Pơ-thi',
      descEn: 'Customary councils, oral gong learning, chanting epics, soul liberation Pothi',
      icon: Flame,
      count: '10 ' + (lang === 'vi' ? 'nghi lễ' : 'rituals')
    },
    {
      id: 'map',
      titleVi: 'Bản đồ di sản 5 tỉnh Tây Nguyên',
      titleEn: '5-Province Geospatial Map',
      descVi: 'Định vị vệ tinh OpenStreetMap miễn phí tại Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng',
      descEn: 'Satellite OSM positioning across 5 highland provinces without API keys',
      icon: MapPin,
      count: '5 ' + (lang === 'vi' ? 'tỉnh thành' : 'provinces')
    },
    {
      id: 'timeline',
      titleVi: 'Tiến trình lịch sử & số hóa',
      titleEn: 'Historical Timeline & AI Era',
      descVi: 'Từ cư trú tiền sử đến ghi chép thuộc địa, kháng chiến và kỷ nguyên số hóa AI 2024–2026',
      descEn: 'From prehistoric stilt origins to colonial surveys and AI RAG digitization',
      icon: History,
      count: '6 ' + (lang === 'vi' ? 'mốc thời gian' : 'milestones')
    },
    {
      id: 'sources',
      titleVi: '7 Nguồn tư liệu khoa học',
      titleEn: '7 Cited Scientific Sources',
      descVi: 'Cục Di sản, Bảo tàng DTHVN, Viện VICAS, SVHTTDL địa phương và phỏng vấn nghệ nhân',
      descEn: 'National Heritage Dept, Ethnology Museum, VICAS, and field interview dossiers',
      icon: BookOpen,
      count: '7 ' + (lang === 'vi' ? 'nguồn tư liệu' : 'sources')
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#2D2424] text-stone-900 dark:text-stone-100 transition-colors duration-300 font-sans selection:bg-[#C88A3D] selection:text-stone-950 flex flex-col justify-between">
      
      <div>
        {/* Top Academic Sub-Banner */}
        <div className="bg-[#8B5E34] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
          ✦ {lang === 'vi' ? 'ĐỒ ÁN SỐ HÓA DI SẢN: “Nhà Rông, Nhà Dài và Không gian cư trú cộng đồng” (Mã đề tài: F03 - Vùng văn hóa Tây Nguyên) • Tác giả: Nguyễn Văn Hoàng - PH64335 - Nhóm 2' : 'HERITAGE DIGITIZATION: "Rong & Longhouses of Central Highlands" (Code: F03) • Author: Nguyen Van Hoang - PH64335 - Group 2'} ✦
        </div>

        {/* Main Navbar with SPA Tab Switcher (No redundant export button) */}
        <Navbar
          lang={lang}
          setLang={setLang}
          isDark={isDark}
          setIsDark={setIsDark}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAudioSpeaking={audioState.isSpeaking}
          onStopAudio={handleStopAudio}
        />

        {/* =========================================================================
            VIEW 1: TRANG CHỦ & TỔNG QUAN (HOME)
        ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <HeroSection
              lang={lang}
              onExploreClick={() => {
                setActiveTab('architecture');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onFloorPlanClick={() => {
                setActiveTab('floorplan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAi={() => {
                setActiveTab('ai');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Portal Cards Navigation Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D]">
                  {lang === 'vi' ? 'HỆ THỐNG PHÂN HỆ DI SẢN F03' : 'F03 HERITAGE SECTIONS'}
                </span>
                <h2 className="mt-1.5 text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {lang === 'vi' ? 'Khám phá theo Chuyên đề Độc lập' : 'Explore by Dedicated Heritage Modules'}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  {lang === 'vi'
                    ? 'Nhấp chọn từng phân hệ để xem nội dung chuyên sâu độc lập, không bị cuộn dài.'
                    : 'Select any module below to inspect focused digital museum records without long scrolling.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {portalCards.map(card => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setActiveTab(card.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-[#C88A3D] transition-all cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#C88A3D] flex items-center justify-center group-hover:bg-[#C88A3D] group-hover:text-stone-950 transition-colors shadow">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] font-mono font-semibold text-stone-600 dark:text-stone-300">
                            {card.count}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-[#C88A3D] transition-colors">
                          {lang === 'vi' ? card.titleVi : card.titleEn}
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                          {lang === 'vi' ? card.descVi : card.descEn}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-[#8B5E34] dark:text-[#E0A96D] group-hover:translate-x-1 transition-transform">
                        <span>{lang === 'vi' ? 'Xem phân hệ →' : 'Enter Module →'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Museum Dashboard Statistics */}
            <MuseumDashboard lang={lang} />
          </div>
        )}

        {/* =========================================================================
            VIEW 2: KIẾN TRÚC & CẤU KIỆN (ARCHITECTURE)
        ========================================================================= */}
        {activeTab === 'architecture' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
            {/* Header & Breadcrumb */}
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                <button onClick={() => setActiveTab('home')} className="hover:text-[#C88A3D] flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Trang chủ' : 'Home'}</span>
                </button>
                <span>/</span>
                <span className="text-[#C88A3D] font-semibold">{lang === 'vi' ? 'Kiến trúc & Cấu kiện' : 'Architecture'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {lang === 'vi' ? 'Kho Bản ghi Di sản & Cấu kiện Gỗ Dân gian' : 'Folk Architecture & Timber Elements Archive'}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                {lang === 'vi'
                  ? 'Tra cứu 30 bản ghi chi tiết với thông số cấu kiện, loại hình gỗ, tập quán chằng mây và kiêng kỵ bản địa.'
                  : 'Search and inspect 30 detailed architectural records, timber specifications, rattan binding, and taboos.'}
              </p>
            </div>

            {/* Realtime Search & Multi-criteria Filters */}
            <SearchFilterBar
              lang={lang}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedEthnic={selectedEthnic}
              setSelectedEthnic={setSelectedEthnic}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              resultCount={filteredRecords.length}
              onReset={handleResetFilters}
            />

            {/* Records Grid */}
            {filteredRecords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRecords.map(record => (
                  <RecordCard
                    key={record.id}
                    record={record}
                    lang={lang}
                    onSelect={setSelectedRecord}
                    isSpeaking={audioState.activeId === record.id}
                    onPlayAudio={handlePlayAudio}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500">
                <p className="text-base font-medium">
                  {lang === 'vi' ? 'Không tìm thấy bản ghi nào phù hợp với bộ lọc hiện tại.' : 'No matching records found for the current filter.'}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-xs"
                >
                  {lang === 'vi' ? 'Đặt lại bộ lọc' : 'Reset filters'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SƠ ĐỒ MẶT BẰNG TƯƠNG TÁC (FLOOR PLAN)
        ========================================================================= */}
        {activeTab === 'floorplan' && (
          <div className="animate-fade-in">
            <InteractiveFloorPlan
              lang={lang}
              onPlayAudioForText={handlePlayAudioForText}
            />
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SINH HOẠT & NGHI LỄ (RITUALS)
        ========================================================================= */}
        {activeTab === 'rituals' && (
          <div className="animate-fade-in">
            <RitualSection
              lang={lang}
              onSelectRecord={setSelectedRecord}
              activeAudioId={audioState.activeId}
              onPlayAudio={handlePlayAudio}
            />
          </div>
        )}

        {/* =========================================================================
            VIEW 5: BẢN ĐỒ 5 TỈNH TÂY NGUYÊN (MAP)
        ========================================================================= */}
        {activeTab === 'map' && (
          <div className="animate-fade-in">
            <HeritageMap
              lang={lang}
              onSelectRecordById={handleSelectRecordById}
            />
          </div>
        )}

        {/* =========================================================================
            VIEW 6: DÒNG THỜI GIAN LỊCH SỬ (TIMELINE)
        ========================================================================= */}
        {activeTab === 'timeline' && (
          <div className="animate-fade-in">
            <HistoricalTimeline lang={lang} />
          </div>
        )}

        {/* =========================================================================
            VIEW 7: THƯ VIỆN ẢNH (GALLERY)
        ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="animate-fade-in">
            <MasonryGallery lang={lang} />
          </div>
        )}

        {/* =========================================================================
            VIEW 8: NGUỒN TƯ LIỆU (SOURCES)
        ========================================================================= */}
        {activeTab === 'sources' && (
          <div className="animate-fade-in">
            <SourcesRegistry lang={lang} />
          </div>
        )}

        {/* =========================================================================
            VIEW 9: TRỢ LÝ AI GEMINI RAG (DEDICATED FULL-PAGE VIEW)
        ========================================================================= */}
        {activeTab === 'ai' && (
          <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C88A3D]" />
                {lang === 'vi' ? 'TRỢ LÝ DI SẢN SỐ HỌC TÂY NGUYÊN' : 'DIGITAL HERITAGE RAG ASSISTANT'}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {lang === 'vi' ? 'Trò chuyện Trí tuệ Nhân tạo Gemini RAG' : 'Grounded Gemini RAG Consultation'}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                {lang === 'vi'
                  ? 'Trợ lý AI hoạt động theo cơ chế RAG mini: chỉ tra cứu và trích dẫn dựa trên 30+ bản ghi và 7 nguồn tư liệu có trong kho dữ liệu F03.'
                  : 'Operating via mini RAG: answers solely using retrieved context from the 30+ verified records and 7 archival sources.'}
              </p>
            </div>

            <GeminiAIAssistantModal
              isOpen={true}
              onClose={() => setActiveTab('home')}
              lang={lang}
              onSelectRecord={setSelectedRecord}
              isEmbedded={true}
            />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer
        lang={lang}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenExport={() => setIsExportOpen(true)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Action Button for AI Assistant (visible on other views) */}
      {activeTab !== 'ai' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setActiveTab('ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#C88A3D] via-[#E0A96D] to-[#8B5E34] text-stone-950 font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5 fill-stone-950 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-serif tracking-wide">{lang === 'vi' ? 'Trợ lý AI F03' : 'AI Assistant'}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        lang={lang}
        isSpeaking={selectedRecord ? audioState.activeId === selectedRecord.id : false}
        onPlayAudio={handlePlayAudio}
      />

      {/* Standalone Export Modal (can be opened from footer if desired) */}
      <ExportHtmlModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        lang={lang}
      />
    </div>
  );
}
