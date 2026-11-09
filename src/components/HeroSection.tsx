import React, { useState } from 'react';
import { ArrowDown, Compass, Sparkles, MapPin, User, Award, Layers, Image as ImageIcon, X } from 'lucide-react';
import { disanData } from '../data/disanData';
import { HERITAGE_IMAGES } from '../data/images';

interface HeroSectionProps {
  lang: 'vi' | 'en';
  onExploreClick: () => void;
  onFloorPlanClick: () => void;
  onOpenAi: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreClick,
  onFloorPlanClick,
  onOpenAi
}) => {
  const { projectInfo } = disanData;
  const [showIllustrationModal, setShowIllustrationModal] = useState<boolean>(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#2D2424] text-white">
      {/* Background Image with Parallax & Dramatic Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85')`,
          filter: 'brightness(0.36) contrast(1.15)'
        }}
      />
      
      {/* Basalt and Ochre Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D2424] via-transparent to-[#2D2424]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D2424]/95 via-[#2D2424]/60 to-transparent" />

      {/* Decorative Traditional Border Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B5E34] via-[#E0A96D] to-[#8B5E34]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center sm:text-left flex flex-col justify-center">
        {/* Project Metadata Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C88A3D] text-stone-950 shadow-md">
            <Award className="w-3.5 h-3.5" />
            {projectInfo.projectCode}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-800/80 backdrop-blur-md text-[#E0A96D] border border-stone-700/60">
            <MapPin className="w-3.5 h-3.5 text-[#C88A3D]" />
            {lang === 'vi' ? 'Kon Tum • Gia Lai • Đắk Lắk • Đắk Nông • Lâm Đồng' : 'Central Highlands Region, Vietnam'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-800/80 backdrop-blur-md text-stone-300 border border-stone-700/60">
            <Layers className="w-3.5 h-3.5 text-stone-400" />
            {lang === 'vi' ? 'Bảo tàng số học 30+ Bản ghi' : '30+ Archival Records'}
          </span>
        </div>

        {/* Hero Title with Strict Anti-Break Typography & Responsive Scaling */}
        <h1 
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-stone-100 max-w-5xl drop-shadow-xl text-balance [word-break:keep-all] [overflow-wrap:normal]"
          style={{
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
            lineHeight: 1.22
          }}
        >
          {lang === 'vi' ? (
            <>
              <span className="inline-block whitespace-nowrap">Nhà Rông,</span>{' '}
              <span className="inline-block whitespace-nowrap">Nhà Dài</span>{' '}
              <span className="inline-block whitespace-nowrap">và Không gian</span>{' '}
              <span className="inline-block whitespace-nowrap">cư trú cộng đồng</span>
            </>
          ) : (
            projectInfo.titleEn
          )}
        </h1>

        {/* Project Subtitle & Academic Author Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-stone-900/85 backdrop-blur-md border border-[#8B5E34]/50 max-w-2xl text-left shadow-2xl">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#8B5E34]/40 border border-[#C88A3D]/50 flex items-center justify-center flex-shrink-0 text-[#E0A96D]">
              <User className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-stone-400">{lang === 'vi' ? 'Tác giả:' : 'Author:'}</span>
                <span className="font-bold text-stone-100 text-base">{projectInfo.author}</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-[#E0A96D] text-xs font-mono font-semibold">
                  MSSV: {projectInfo.studentId}
                </span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-xs font-medium">
                  {projectInfo.group}
                </span>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed pt-1">
                {lang === 'vi' 
                  ? 'Đồ án số hóa di sản văn hóa phi vật thể và kiến trúc gỗ dân gian Tây Nguyên. Tích hợp mô hình thông tin không gian, sơ đồ mặt bằng tương tác và Trợ lý AI Gemini RAG bản địa.'
                  : 'Digitization project on Central Highlands vernacular wooden architecture and communal living spaces. Integrating GIS, interactive floor plans, and cited Gemini AI RAG.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons & 4K Illustration Showcase */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-sm sm:text-base hover:bg-[#E0A96D] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C88A3D]/25"
          >
            <Compass className="w-4 h-4 text-stone-950" />
            <span>{lang === 'vi' ? 'Khám phá dữ liệu' : 'Explore Archive'}</span>
          </button>

          <button
            onClick={onFloorPlanClick}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 border border-stone-600/60 font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4 text-[#E0A96D]" />
            <span>{lang === 'vi' ? 'Sơ đồ mặt bằng' : 'Interactive Floor Plan'}</span>
          </button>

          <button
            onClick={() => setShowIllustrationModal(true)}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-600/50 font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
          >
            <ImageIcon className="w-4 h-4 text-[#E0A96D]" />
            <span>{lang === 'vi' ? 'Tranh minh họa 4K Nhà Dài' : '4K Longhouse Artwork'}</span>
          </button>

          <button
            onClick={onOpenAi}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#8B5E34]/90 hover:bg-[#8B5E34] text-[#F5F5F0] border border-[#C88A3D]/40 font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#E0A96D]" />
            <span>{lang === 'vi' ? 'Trợ lý AI RAG' : 'AI RAG Assistant'}</span>
          </button>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <div className="mt-12 hidden sm:flex items-center gap-2 text-stone-400 text-xs animate-bounce cursor-pointer" onClick={onExploreClick}>
          <ArrowDown className="w-4 h-4 text-[#C88A3D]" />
          <span>{lang === 'vi' ? 'Cuộn xuống để xem thống kê và bản ghi di sản' : 'Scroll down to explore archive'}</span>
        </div>
      </div>

      {/* 4K Digital Museum Illustration Modal */}
      {showIllustrationModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setShowIllustrationModal(false)}
        >
          <div 
            className="relative w-full max-w-5xl rounded-3xl bg-stone-900 border border-stone-800 p-4 sm:p-6 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowIllustrationModal(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/80 text-stone-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black">
              <img 
                src={HERITAGE_IMAGES.NHA_DAI_MINH_HOA} 
                alt="Minh họa số phục dựng Nhà Dài Ê Đê Đắk Lắk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-3 py-1 rounded-md bg-[#C88A3D] text-stone-950 text-xs font-bold font-mono">
                  NATIONAL GEOGRAPHIC STYLE • DIGITAL MUSEUM ARTWORK 4K
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-2xl mt-1.5 drop-shadow">
                  Phục dựng Không gian Nhà Dài Ê Đê Truyền Thống tại Đắk Lắk, Tây Nguyên
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl drop-shadow line-clamp-2 sm:line-clamp-none">
                  Kiến trúc nhà sàn gỗ dài trên 50 mét, mái tranh xuôi thấp che chở buôn làng, cầu thang K'pan khắc vầng trăng khuyết và đôi bầu ngực mẹ linh thiêng, vách phên tre đan hoa văn quả trám giữa buôn làng mẫu hệ cổ xưa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
