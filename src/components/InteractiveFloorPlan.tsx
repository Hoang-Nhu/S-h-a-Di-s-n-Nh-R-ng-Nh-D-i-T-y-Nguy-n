import React, { useState } from 'react';
import { Layers, Info, X, ShieldAlert, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { floorPlanAreas } from '../data/floorPlanData';
import { FloorPlanArea } from '../data/types';
import { disanData } from '../data/disanData';

interface InteractiveFloorPlanProps {
  lang: 'vi' | 'en';
  onPlayAudioForText: (id: string, text: string) => void;
}

export const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({
  lang,
  onPlayAudioForText
}) => {
  const [activeBuilding, setActiveBuilding] = useState<'nha_dai' | 'nha_rong'>('nha_dai');
  const [selectedArea, setSelectedArea] = useState<FloorPlanArea | null>(null);

  const currentAreas = floorPlanAreas.filter(a => a.buildingType === activeBuilding);

  return (
    <section id="floorplan" className="py-16 bg-white dark:bg-[#251e1e] transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D]">
            {lang === 'vi' ? 'PHẦN 2 • KHÔNG GIAN CƯ TRÚ CỘNG ĐỒNG' : 'PART 2 • COMMUNAL LIVING SPACES'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {lang === 'vi' ? 'Sơ đồ Mặt bằng Tương tác (Interactive Floor Plan)' : 'Interactive Architectural Floor Plans'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            {lang === 'vi'
              ? 'Nhấp chuột vào các điểm nóng (hotspot) nhấp nháy trên sơ đồ mặt bằng để giải mã công năng, tập quán mẫu hệ, quy tắc phân định không gian và điều kiêng kỵ.'
              : 'Click on pulsating hotspots to decrypt spatial functions, matrilineal customs, behavioral etiquette, and sacred taboos.'}
          </p>

          {/* Building Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => {
                setActiveBuilding('nha_dai');
                setSelectedArea(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeBuilding === 'nha_dai'
                  ? 'bg-[#C88A3D] text-stone-950 shadow-md'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Mặt bằng Nhà Dài Ê Đê (Mẫu hệ)' : 'E De Longhouse Plan'}</span>
            </button>
            <button
              onClick={() => {
                setActiveBuilding('nha_rong');
                setSelectedArea(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeBuilding === 'nha_rong'
                  ? 'bg-[#C88A3D] text-stone-950 shadow-md'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Mặt bằng Nhà Rông Ba Na (Cộng đồng)' : 'Ba Na Rong House Plan'}</span>
            </button>
          </div>
        </div>

        {/* Floor Plan Display Canvas */}
        <div className="relative rounded-3xl bg-stone-900 border-2 border-[#8B5E34]/40 p-4 sm:p-8 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center">
          {/* Subtle blueprint grid overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #8B5E34 1px, transparent 1px), linear-gradient(to bottom, #8B5E34 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* SVG Vector Floor Plan Representation */}
          <div className="relative w-full max-w-5xl aspect-[21/9] bg-stone-950/80 rounded-2xl border border-stone-800 p-4 sm:p-6 shadow-inner flex flex-col justify-between">
            {/* SVG Floor Architecture Illustration */}
            <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
              {activeBuilding === 'nha_dai' ? (
                // Longhouse SVG Structure
                <g>
                  {/* Outer Longhouse Boundary */}
                  <rect x="50" y="60" width="900" height="280" rx="20" fill="#1c1917" stroke="#8B5E34" strokeWidth="4" />
                  
                  {/* Sân hiên Drip (Left) */}
                  <rect x="55" y="65" width="120" height="270" rx="15" fill="#292524" stroke="#C88A3D" strokeWidth="2" strokeDasharray="6 6" />
                  <text x="115" y="200" fill="#E0A96D" fontSize="14" textAnchor="middle" fontWeight="bold">DRIP (Hiên)</text>

                  {/* Gian Gah (Middle Left) */}
                  <rect x="180" y="65" width="300" height="270" fill="#262220" stroke="#8B5E34" strokeWidth="2" />
                  <text x="330" y="100" fill="#C88A3D" fontSize="16" textAnchor="middle" fontWeight="bold">GIAN GAH (Tiếp khách & Lễ hội)</text>
                  
                  {/* Ghế Kpan line */}
                  <rect x="195" y="80" width="270" height="25" rx="4" fill="#8B5E34" />
                  <text x="330" y="97" fill="#F5F5F0" fontSize="11" textAnchor="middle">GHẾ DÀI K'PAN (16M)</text>

                  {/* Bếp khách */}
                  <circle cx="330" cy="270" r="28" fill="#442a1b" stroke="#E0A96D" strokeWidth="2" />
                  <text x="330" y="275" fill="#E0A96D" fontSize="10" textAnchor="middle">BẾP GAH</text>

                  {/* Gian Ok Partition Wall */}
                  <line x1="485" y1="65" x2="485" y2="335" stroke="#E0A96D" strokeWidth="4" />

                  {/* Dãy buồng Ok (Middle Right) */}
                  <rect x="490" y="65" width="330" height="270" fill="#1f1c1a" stroke="#8B5E34" strokeWidth="2" />
                  <text x="655" y="100" fill="#C88A3D" fontSize="16" textAnchor="middle" fontWeight="bold">GIAN OK (Buồng các con gái mẫu hệ)</text>
                  
                  {/* Compartment dividers */}
                  <line x1="490" y1="200" x2="820" y2="200" stroke="#44403c" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="655" y="220" fill="#78716c" fontSize="12" textAnchor="middle">Hành lang giao thông nội bộ</text>

                  <line x1="600" y1="65" x2="600" y2="200" stroke="#57534e" strokeWidth="2" />
                  <line x1="710" y1="65" x2="710" y2="200" stroke="#57534e" strokeWidth="2" />

                  {/* Kho thóc & Hiên sau */}
                  <rect x="825" y="65" width="120" height="270" rx="15" fill="#292524" stroke="#8B5E34" strokeWidth="2" />
                  <text x="885" y="200" fill="#E0A96D" fontSize="13" textAnchor="middle" fontWeight="bold">SANG BA</text>
                  <text x="885" y="220" fill="#A8A29E" fontSize="11" textAnchor="middle">(Kho thóc)</text>
                </g>
              ) : (
                // Rong House SVG Structure
                <g>
                  {/* Outer Rong Boundary */}
                  <rect x="80" y="60" width="840" height="280" rx="30" fill="#1c1917" stroke="#8B5E34" strokeWidth="4" />
                  
                  {/* Thang & Hiên Đrông */}
                  <rect x="85" y="130" width="90" height="140" rx="10" fill="#292524" stroke="#C88A3D" strokeWidth="2" />
                  <text x="130" y="205" fill="#E0A96D" fontSize="12" textAnchor="middle" fontWeight="bold">ĐRÔNG</text>
                  
                  {/* Main Hall */}
                  <rect x="180" y="70" width="730" height="260" fill="#241e1c" stroke="#8B5E34" strokeWidth="2" />
                  
                  {/* 8 Main Pillars Jơng rông */}
                  <circle cx="280" cy="120" r="14" fill="#C88A3D" />
                  <circle cx="280" cy="280" r="14" fill="#C88A3D" />
                  <circle cx="430" cy="120" r="14" fill="#C88A3D" />
                  <circle cx="430" cy="280" r="14" fill="#C88A3D" />
                  <circle cx="580" cy="120" r="14" fill="#C88A3D" />
                  <circle cx="580" cy="280" r="14" fill="#C88A3D" />
                  <circle cx="730" cy="120" r="14" fill="#C88A3D" />
                  <circle cx="730" cy="280" r="14" fill="#C88A3D" />
                  <text x="500" y="100" fill="#E0A96D" fontSize="14" textAnchor="middle" fontWeight="bold">HỆ 8 CỘT CÁI JƠNG RÔNG CHỊU LỰC</text>

                  {/* Bếp thiêng trung tâm */}
                  <rect x="460" y="165" width="80" height="70" rx="6" fill="#442a1b" stroke="#E0A96D" strokeWidth="3" />
                  <text x="500" y="205" fill="#F5F5F0" fontSize="12" textAnchor="middle" fontWeight="bold">BẾP THIÊNG</text>

                  {/* Cột thiêng Gưng Kơ-dơr */}
                  <circle cx="780" cy="200" r="22" fill="#8B5E34" stroke="#E0A96D" strokeWidth="2" />
                  <text x="780" y="205" fill="#FFF" fontSize="10" textAnchor="middle">GƯNG</text>
                  <text x="780" y="240" fill="#C88A3D" fontSize="11" textAnchor="middle">CỘT TẾ THẦN</text>

                  {/* Sàn ngủ nam thanh niên */}
                  <rect x="250" y="300" width="500" height="25" rx="4" fill="#292524" stroke="#44403c" />
                  <text x="500" y="317" fill="#A8A29E" fontSize="11" textAnchor="middle">KHU SÀN NGỦ THANH NIÊN (ĐAK MƠ-NO)</text>
                </g>
              )}
            </svg>

            {/* Glowing Hotspot Markers Overlaid by Percentage */}
            {currentAreas.map(area => {
              const isSelected = selectedArea?.id === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  style={{ left: `${area.x}%`, top: `${area.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20`}
                  title={`${area.nameVi} (${area.indigenousName})`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <div className={`w-8 h-8 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-[#C88A3D]'} pulse-hotspot absolute`} />
                    {/* Hotspot Core */}
                    <div className={`w-4 h-4 rounded-full border-2 border-stone-900 ${isSelected ? 'bg-white' : 'bg-amber-300'} shadow-lg group-hover:scale-125 transition-transform`} />
                  </div>

                  {/* Label tooltip */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-stone-950/90 text-[11px] font-bold text-[#E0A96D] border border-[#8B5E34] opacity-80 group-hover:opacity-100 transition shadow pointer-events-none">
                    {area.indigenousName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hotspot Detail Drawer / Card when clicked */}
        {selectedArea && (
          <div className="mt-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl animate-fade-in">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#C88A3D]">
                  {selectedArea.id} • {selectedArea.indigenousName}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 mt-1">
                  {lang === 'vi' ? selectedArea.nameVi : selectedArea.nameEn}
                </h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {lang === 'vi' ? 'Kích thước tiêu chuẩn: ' : 'Standard Dimensions: '} {selectedArea.dimensions}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPlayAudioForText(selectedArea.id, `${selectedArea.nameVi}. ${selectedArea.functionsVi}. ${selectedArea.customsVi}`)}
                  className="p-2.5 rounded-xl bg-amber-500/10 text-[#C88A3D] hover:bg-amber-500/20 transition"
                  title="Nghe thuyết minh khu vực này"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedArea(null)}
                  className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid 4 columns of museum ethnography */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#C88A3D] uppercase text-xs">
                  <Info className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Công năng sử dụng' : 'Functional Purpose'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {lang === 'vi' ? selectedArea.functionsVi : selectedArea.functionsEn}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 uppercase text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Tập quán & Văn hóa' : 'Customs & Culture'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {lang === 'vi' ? selectedArea.customsVi : selectedArea.customsEn}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 uppercase text-xs">
                  <Info className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Quy tắc ứng xử' : 'Social Etiquette'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {lang === 'vi' ? selectedArea.rulesVi : selectedArea.rulesEn}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5 text-rose-900 dark:text-rose-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400 uppercase text-xs">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Điều kiêng kỵ nghiêm ngặt' : 'Strict Taboos'}</span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'vi' ? selectedArea.taboosVi : selectedArea.taboosEn}
                </p>
              </div>
            </div>

            {/* Source citation */}
            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8B5E34]" />
                <span>{lang === 'vi' ? 'Nguồn tư liệu trích dẫn: ' : 'Cited Source: '}</span>
                <span className="font-mono font-bold text-[#C88A3D]">{selectedArea.sourceId}</span>
                <span>({disanData.sources.find(s => s.id === selectedArea.sourceId)?.nameVi})</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
