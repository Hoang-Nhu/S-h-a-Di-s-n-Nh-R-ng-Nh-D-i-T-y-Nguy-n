import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Mountain, ExternalLink, Volume2, ShieldCheck, CheckCircle2, ChevronRight, Info, Eye } from 'lucide-react';
import { heritageLocations } from '../data/locations';
import { HeritageLocation } from '../data/types';
import { HERITAGE_IMAGES } from '../data/images';

interface HeritageMapProps {
  lang: 'vi' | 'en';
  onSelectRecordById: (recordId: string) => void;
}

interface ProvinceInfo {
  id: string;
  nameVi: string;
  nameEn: string;
  capitalVi: string;
  capitalEn: string;
  ethnicities: string[];
  altitude: string;
  keyFeatureVi: string;
  keyFeatureEn: string;
  color: string;
  svgPath: string;
  labelX: number;
  labelY: number;
  routePoint: { x: number; y: number };
}

export const HeritageMap: React.FC<HeritageMapProps> = ({
  lang,
  onSelectRecordById
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [activeLocation, setActiveLocation] = useState<HeritageLocation>(heritageLocations[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // 5 Provinces of Central Highlands with vector topology paths and route points
  const provinces: ProvinceInfo[] = [
    {
      id: 'Kon Tum',
      nameVi: 'Kon Tum',
      nameEn: 'Kon Tum',
      capitalVi: 'TP. Kon Tum (Sông Đăk Bla)',
      capitalEn: 'Kon Tum City (Dak Bla River)',
      ethnicities: ['Ba Na', 'Xơ Đăng', 'Giẻ Triêng'],
      altitude: '500m - 2.598m (Đỉnh Ngọc Linh)',
      keyFeatureVi: 'Cái nôi kiến trúc Nhà Rông vút cao hình lưỡi búa và cội nguồn sử thi H\'mon',
      keyFeatureEn: 'Birthplace of soaring axe-blade Rong halls and H\'mon oral epics',
      color: '#C88A3D',
      svgPath: 'M 175 40 L 310 45 L 350 115 L 285 150 L 185 125 Z',
      labelX: 245,
      labelY: 90,
      routePoint: { x: 250, y: 80 }
    },
    {
      id: 'Gia Lai',
      nameVi: 'Gia Lai',
      nameEn: 'Gia Lai',
      capitalVi: 'TP. Pleiku (Biển Hồ T\'Nưng)',
      capitalEn: 'Pleiku City (Sea Lake T\'Nung)',
      ethnicities: ['Gia Rai', 'Ba Na'],
      altitude: '700m - 800m (Cao nguyên Pleiku)',
      keyFeatureVi: 'Quần thể làng Gia Rai Arap, nghệ thuật tạc tượng nhà mồ Pơ-thi độc mộc',
      keyFeatureEn: 'Gia Rai Arap villages and evocative monolithic Pothi funerary sculptures',
      color: '#8B5E34',
      svgPath: 'M 185 128 L 285 153 L 355 118 L 385 195 L 305 242 L 165 192 Z',
      labelX: 265,
      labelY: 180,
      routePoint: { x: 260, y: 175 }
    },
    {
      id: 'Đắk Lắk',
      nameVi: 'Đắk Lắk',
      nameEn: 'Dak Lak',
      capitalVi: 'TP. Buôn Ma Thuột (Suối Ea Tam)',
      capitalEn: 'Buon Ma Thuot (Ea Tam Stream)',
      ethnicities: ['Ê Đê', 'M\'Nông', 'Gia Rai'],
      altitude: '400m - 600m (Bồn địa sông Sêrêpôk)',
      keyFeatureVi: 'Thủ phủ Nhà Dài mẫu hệ, cầu thang K\'pan chạm đôi bầu ngực mẹ và hồ Lắk cổ sơ',
      keyFeatureEn: 'Capital of matriarchal longhouses, Kpan breast staircases, and Lake Lak',
      color: '#E0A96D',
      svgPath: 'M 165 196 L 305 246 L 375 272 L 315 360 L 195 332 L 145 252 Z',
      labelX: 255,
      labelY: 280,
      routePoint: { x: 245, y: 285 }
    },
    {
      id: 'Đắk Nông',
      nameVi: 'Đắk Nông',
      nameEn: 'Dak Nong',
      capitalVi: 'TP. Gia Nghĩa (Cao nguyên M\'Nông)',
      capitalEn: 'Gia Nghia City (M\'Nong Plateau)',
      ethnicities: ['M\'Nông', 'Mạ', 'Ê Đê'],
      altitude: '600m - 1.000m',
      keyFeatureVi: 'Không gian Sử thi Ot Ndrong đồ sộ và quần thể nhà dài Bon R\'lơm truyền thống',
      keyFeatureEn: 'Monumental Ot Ndrong epic living territory and Bon R\'lom longhouses',
      color: '#A47551',
      svgPath: 'M 125 262 L 195 336 L 175 432 L 85 382 L 95 302 Z',
      labelX: 140,
      labelY: 350,
      routePoint: { x: 145, y: 355 }
    },
    {
      id: 'Lâm Đồng',
      nameVi: 'Lâm Đồng',
      nameEn: 'Lam Dong',
      capitalVi: 'TP. Đà Lạt (Núi Mẹ Lang Biang)',
      capitalEn: 'Da Lat City (Lang Biang Mountain)',
      ethnicities: ['K\'Ho', 'Chu Ru', 'Mạ'],
      altitude: '800m - 1.500m (Cao nguyên Lâm Viên)',
      keyFeatureVi: 'Không gian buôn làng K\'Ho dưới chân Lang Biang, nghệ thuật chiêng và hát Tam Pớt',
      keyFeatureEn: 'K\'Ho forest hamlets beneath Lang Biang, gong music and Tam Pot poetry',
      color: '#6B4423',
      svgPath: 'M 200 336 L 315 365 L 345 450 L 235 480 L 180 436 Z',
      labelX: 260,
      labelY: 415,
      routePoint: { x: 260, y: 420 }
    }
  ];

  // Filter locations by selected province
  const filteredLocations = selectedProvince === 'all'
    ? heritageLocations
    : heritageLocations.filter(loc => loc.province.includes(selectedProvince));

  const activeProvinceInfo = provinces.find(p => p.id === activeLocation.province) || provinces[0];

  // Map coordinates projection for site markers
  const getMarkerCoords = (lat: number, lng: number) => {
    // Lat: 14.35 (North) to 12.08 (South) -> Y: 60 to 450
    // Lng: 107.6 (West) to 108.45 (East) -> X: 110 to 360
    const y = 60 + ((14.4 - lat) / (14.4 - 12.0)) * 390;
    const x = 110 + ((lng - 107.5) / (108.5 - 107.5)) * 250;
    return { x, y };
  };

  const activeCoords = getMarkerCoords(activeLocation.lat, activeLocation.lng);

  // Audio narration handler
  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      const textToSpeak = lang === 'vi'
        ? `${activeLocation.nameVi}. Nằm tại tỉnh ${activeLocation.province}. Dân tộc chủ thể ${activeLocation.ethnicGroup}. ${activeLocation.descriptionVi}`
        : `${activeLocation.nameEn}. Located in ${activeLocation.province} province. Indigenous group: ${activeLocation.ethnicGroup}. ${activeLocation.descriptionEn}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Top Banner Inspired by the Connected Journey Map */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-[#C88A3D] uppercase tracking-widest mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>VIỆT NAM • KHÔNG GIAN VĂN HÓA TÂY NGUYÊN</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          {lang === 'vi' ? 'HÀNH TRÌNH KẾT NỐI DI SẢN CƯ TRÚ' : 'CENTRAL HIGHLANDS HERITAGE ATLAS'}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-serif italic text-[#8B5E34] dark:text-[#E0A96D]">
          {lang === 'vi' 
            ? 'Từ Đỉnh Núi Ngọc Linh (2.598m) Đến Rừng Thông Lang Biang (1.500m)'
            : 'From Mount Ngoc Linh (2,598m) to Lang Biang Plateau (1,500m)'}
        </p>
        
        <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
          {lang === 'vi'
            ? 'Bản đồ vector địa hình số hóa 100% độc lập không dùng tile map bên ngoài: Tra cứu nhanh tọa độ GPS, độ cao, hình ảnh thực tế và phiếu tư liệu F03 của từng buôn làng cổ.'
            : '100% independent vector topographic atlas: Seamless lookups of GPS coordinates, elevation, verified photography, and F03 survey dossiers.'}
        </p>

        {/* Province Quick Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedProvince('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedProvince === 'all'
                ? 'bg-[#C88A3D] text-stone-950 shadow-md font-bold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {lang === 'vi' ? '✦ Toàn vùng 5 tỉnh' : '✦ All 5 Provinces'}
          </button>
          {provinces.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProvince(p.id);
                const first = heritageLocations.find(l => l.province.includes(p.id));
                if (first) setActiveLocation(first);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedProvince === p.id
                  ? 'bg-[#C88A3D] text-stone-950 shadow-md font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {p.nameVi}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Site Inspector Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Illustrated Topographical Vector Map (Inspired by reference attachment) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#1C1817] border border-stone-800 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Topographic Elevation Grid Texture */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #E0A96D 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Map Top Header: Title and Compass Rose */}
          <div className="flex items-start justify-between mb-2 z-10 border-b border-stone-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#C88A3D]" />
                <span className="font-serif font-bold text-stone-100 text-sm tracking-wide">
                  {lang === 'vi' ? 'Địa hình Tây Nguyên' : 'Highland Topography'}
                </span>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">
                14°N - 11°N • 107°E - 108°E
              </span>
            </div>

            {/* Classical Compass Rose (N, S, W, E) */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                {/* Outer Ring */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="#8B5E34" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#C88A3D" strokeWidth="0.8" opacity="0.6" />
                
                {/* 4 Primary Compass Points (North = #E0A96D, South = #8B5E34) */}
                <polygon points="50,12 55,45 50,50 45,45" fill="#E0A96D" />
                <polygon points="50,12 50,50 45,45" fill="#C88A3D" />
                
                <polygon points="50,88 55,55 50,50 45,55" fill="#8B5E34" />
                <polygon points="50,88 50,50 45,55" fill="#53361E" />
                
                <polygon points="12,50 45,45 50,50 45,55" fill="#8B5E34" />
                <polygon points="12,50 50,50 45,55" fill="#53361E" />
                
                <polygon points="88,50 55,45 50,50 55,55" fill="#8B5E34" />
                <polygon points="88,50 50,50 55,55" fill="#53361E" />

                {/* Compass Direction Labels */}
                <text x="50" y="8" fill="#E0A96D" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
                <text x="50" y="98" fill="#A8A29E" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>
                <text x="6" y="53" fill="#A8A29E" fontSize="7" fontWeight="bold" textAnchor="middle">W</text>
                <text x="94" y="53" fill="#A8A29E" fontSize="7" fontWeight="bold" textAnchor="middle">E</text>
              </svg>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[4/5] flex items-center justify-center z-10 py-2">
            <svg viewBox="0 0 450 510" className="w-full h-full max-h-[500px]">
              <defs>
                {/* Glow Filter for Active Sites */}
                <filter id="glowPin" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                {/* Linear gradient for connecting route line */}
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E0A96D" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#C88A3D" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5E34" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Render Province Polygonal Contours */}
              {provinces.map(p => {
                const isProvSelected = selectedProvince === 'all' || selectedProvince === p.id;
                const isProvActive = activeLocation.province.includes(p.id);

                return (
                  <g 
                    key={p.id}
                    onClick={() => {
                      setSelectedProvince(p.id);
                      const loc = heritageLocations.find(l => l.province.includes(p.id));
                      if (loc) setActiveLocation(loc);
                    }}
                    className="cursor-pointer group"
                  >
                    <path
                      d={p.svgPath}
                      fill={isProvActive ? '#C88A3D' : isProvSelected ? '#3E3430' : '#25201E'}
                      stroke={isProvActive ? '#E0A96D' : '#8B5E34'}
                      strokeWidth={isProvActive ? '3' : '1.5'}
                      className="transition-all duration-300 group-hover:fill-[#53433C]"
                    />
                    <text
                      x={p.labelX}
                      y={p.labelY}
                      fill={isProvActive ? '#1c1917' : '#E0A96D'}
                      fontSize={isProvActive ? '13' : '12'}
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none select-none font-serif tracking-wider drop-shadow"
                    >
                      {p.nameVi}
                    </text>
                  </g>
                );
              })}

              {/* Connecting Heritage Journey Route (Inspired by the Reference Map's Orange S-Line) */}
              <path
                d="M 250 80 Q 260 130 260 175 Q 265 230 245 285 Q 185 320 145 355 Q 190 390 260 420"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6,4"
                className="opacity-80"
              />

              {/* Province Waypoint Beads along the route */}
              {provinces.map(p => (
                <circle
                  key={`route-${p.id}`}
                  cx={p.routePoint.x}
                  cy={p.routePoint.y}
                  r="4"
                  fill="#E0A96D"
                  stroke="#1C1817"
                  strokeWidth="1.5"
                />
              ))}

              {/* Interactive Survey Site Markers (GPS Nodes) */}
              {heritageLocations.map((loc) => {
                const isSelected = activeLocation.id === loc.id;
                const { x: mapX, y: mapY } = getMarkerCoords(loc.lat, loc.lng);

                return (
                  <g
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for active location */}
                    {isSelected && (
                      <circle
                        cx={mapX}
                        cy={mapY}
                        r="18"
                        fill="none"
                        stroke="#E0A96D"
                        strokeWidth="2"
                        className="animate-ping origin-center opacity-75"
                      />
                    )}

                    {/* Outer marker pin */}
                    <circle
                      cx={mapX}
                      cy={mapY}
                      r={isSelected ? '9' : '6'}
                      fill={isSelected ? '#F5F5F0' : '#C88A3D'}
                      stroke="#1C1817"
                      strokeWidth="2"
                      filter={isSelected ? 'url(#glowPin)' : undefined}
                      className="transition-all group-hover:scale-125"
                    />

                    {/* Site Name Label */}
                    <text
                      x={mapX + 11}
                      y={mapY + 4}
                      fill={isSelected ? '#FFF' : '#A8A29E'}
                      fontSize={isSelected ? '11' : '9.5'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {loc.nameVi.split('&')[0].replace('Làng', '').replace('Buôn', '').trim()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Scale Bar and Legend (Matching Reference Image) */}
          <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C88A3D]"></span>
              <span>{lang === 'vi' ? 'Điểm khảo sát F03' : 'F03 Survey Site'}</span>
              <span className="mx-1 text-stone-600">|</span>
              <span className="w-4 h-0.5 border-t border-dashed border-[#E0A96D]"></span>
              <span>{lang === 'vi' ? 'Trục kết nối 480km' : '480km Highway'}</span>
            </div>

            {/* Visual Distance Scale Bar */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-stone-400">
              <span>0</span>
              <div className="w-10 h-1 bg-stone-700 relative">
                <div className="w-1/2 h-full bg-[#C88A3D]"></div>
              </div>
              <span>100km</span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Active Site Showcase & Survey List */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Site Detailed Card with Verified Image */}
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xl transition-all">
            {/* Header Image Banner with Real Photography */}
            <div className="relative h-56 sm:h-64 w-full bg-stone-950 overflow-hidden">
              <img
                src={activeLocation.imageUrl}
                alt={activeLocation.nameVi}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = HERITAGE_IMAGES.NHA_RONG;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-black/30" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-stone-900/90 text-[#E0A96D] text-xs font-mono font-bold border border-stone-700 shadow">
                  {activeLocation.id}
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#C88A3D] text-stone-950 text-xs font-bold shadow">
                  {activeLocation.province}
                </span>
                <span className="px-3 py-1 rounded-lg bg-stone-800/80 text-stone-200 text-xs font-medium backdrop-blur-sm">
                  {activeLocation.ethnicGroup}
                </span>
              </div>

              {/* Record Ref Badge on Top Right */}
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-md bg-stone-900/90 text-stone-300 text-xs font-mono border border-stone-700">
                  {lang === 'vi' ? 'Hồ sơ: ' : 'Ref: '} {activeLocation.recordRef}
                </span>
              </div>

              {/* Bottom Title on Image */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[11px] uppercase tracking-wider text-[#E0A96D] font-bold">
                  {activeLocation.heritageType}
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-0.5 leading-snug drop-shadow">
                  {lang === 'vi' ? activeLocation.nameVi : activeLocation.nameEn}
                </h3>
              </div>
            </div>

            {/* Detailed Body Information */}
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {lang === 'vi' ? activeLocation.descriptionVi : activeLocation.descriptionEn}
              </p>

              {/* Geographical Coordinates & Cultural Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 text-xs">
                <div>
                  <span className="text-stone-400 block">{lang === 'vi' ? 'Tọa độ GPS chuẩn:' : 'GPS Coordinates:'}</span>
                  <span className="font-mono font-bold text-[#C88A3D] text-xs">
                    {activeLocation.lat.toFixed(4)}°N, {activeLocation.lng.toFixed(4)}°E
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block">{lang === 'vi' ? 'Địa bàn cư trú:' : 'Settlement Area:'}</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {activeProvinceInfo.capitalVi}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block">{lang === 'vi' ? 'Độ cao cao nguyên:' : 'Elevation Range:'}</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {activeProvinceInfo.altitude}
                  </span>
                </div>
              </div>

              {/* Cultural Context Insight */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Đặc trưng văn hóa tỉnh ' + activeLocation.province + ':' : 'Cultural Context: ' + activeLocation.province}</span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'vi' ? activeProvinceInfo.keyFeatureVi : activeProvinceInfo.keyFeatureEn}
                </p>
              </div>

              {/* Action Buttons: Audio Narration & Open Full Dossier */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handlePlayAudio}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                    isPlayingAudio
                      ? 'bg-amber-600 text-white border-amber-500'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                  <span>{isPlayingAudio ? (lang === 'vi' ? 'Đang đọc...' : 'Reading...') : (lang === 'vi' ? 'Thuyết minh giọng đọc' : 'Listen Narration')}</span>
                </button>

                <button
                  onClick={() => onSelectRecordById(activeLocation.recordRef)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-xs sm:text-sm hover:bg-[#E0A96D] transition shadow-md"
                >
                  <span>{lang === 'vi' ? 'Mở hồ sơ chi tiết bản ghi' : 'Open Full Record Dossier'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Survey Sites Quick Switcher Grid */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-200 uppercase tracking-wider">
              {lang === 'vi' ? 'Danh sách các điểm di tích khảo sát thực địa (' + filteredLocations.length + ')' : 'Field Survey Heritage Sites (' + filteredLocations.length + ')'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredLocations.map(loc => {
                const isActive = activeLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-amber-500/10 dark:bg-stone-800 border-[#C88A3D] shadow'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#C88A3D] font-bold">
                        <span>{loc.province}</span>
                        <span>•</span>
                        <span>{loc.ethnicGroup}</span>
                      </div>
                      <div className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 truncate mt-0.5">
                        {loc.nameVi}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#C88A3D]' : 'text-stone-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Highland Journey Summary Ribbon (Directly inspired by bottom callout card in reference image) */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#C88A3D] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-400">{lang === 'vi' ? 'Khoảng cách hành trình:' : 'Journey Distance:'}</div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">~ 480 km dọc Trường Sơn</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#C88A3D] shrink-0">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-400">{lang === 'vi' ? 'Biên độ cao độ:' : 'Elevation Gradient:'}</div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">500m - 2.598m (Ngọc Linh)</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#C88A3D] shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-400">{lang === 'vi' ? 'Dân tộc chủ thể:' : 'Key Ethnicities:'}</div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">Ba Na, Gia Rai, Ê Đê, K'Ho</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#C88A3D] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-400">{lang === 'vi' ? 'Đề tài số hóa F03:' : 'Digitized Project F03:'}</div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100">7 Điểm di tích & 30+ Bản ghi</div>
          </div>
        </div>
      </div>
    </div>
  );
};
