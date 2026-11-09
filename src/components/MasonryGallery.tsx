import React, { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';
import { galleryItems } from '../data/galleryData';
import { GalleryItem } from '../data/types';

interface MasonryGalleryProps {
  lang: 'vi' | 'en';
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelVi: 'Tất cả hình ảnh', labelEn: 'All Photos' },
    { id: 'rong', labelVi: 'Nhà Rông', labelEn: 'Rong House' },
    { id: 'dai', labelVi: 'Nhà Dài', labelEn: 'Longhouse' },
    { id: 'gong', labelVi: 'Cồng Chiêng', labelEn: 'Gong Culture' },
    { id: 'ritual', labelVi: 'Lễ hội & Sinh hoạt', labelEn: 'Rituals & Life' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-16 bg-white dark:bg-[#251e1e] transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center justify-center gap-1.5">
            <Image className="w-4 h-4 text-[#C88A3D]" />
            {lang === 'vi' ? 'BỘ SƯU TẬP HÌNH ẢNH DI SẢN' : 'PHOTOGRAPHIC ARCHIVE'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {lang === 'vi' ? 'Thư viện Ảnh Di sản (Masonry Gallery)' : 'Highland Heritage Visual Gallery'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            {lang === 'vi'
              ? 'Tư liệu nhiếp ảnh thực địa về kiến trúc gỗ, hoa văn điêu khắc, không gian cồng chiêng và vũ điệu Xoang cao nguyên.'
              : 'Field photographic collections capturing architectural details, wood carvings, gong heritage, and communal festivities.'}
          </p>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#C88A3D] text-stone-950 shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {lang === 'vi' ? cat.labelVi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.titleVi}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Hover icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center justify-between text-[11px] text-[#E0A96D] mb-1">
                  <span className="font-bold uppercase tracking-wider">{item.ethnicGroup}</span>
                  <span className="flex items-center gap-1 text-stone-300">
                    <MapPin className="w-3 h-3 text-[#C88A3D]" />
                    {item.locationVi}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm sm:text-base leading-snug drop-shadow">
                  {lang === 'vi' ? item.titleVi : item.titleEn}
                </h4>
                <div className="mt-1 text-[11px] text-stone-400">
                  {item.photographerOrSource}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image & Info */}
            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].titleVi}
                className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="mt-4 text-center text-white max-w-xl">
                <div className="text-xs font-semibold text-[#E0A96D] uppercase tracking-wider mb-1">
                  {filteredItems[lightboxIndex].ethnicGroup} • {filteredItems[lightboxIndex].locationVi}
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl">
                  {lang === 'vi' ? filteredItems[lightboxIndex].titleVi : filteredItems[lightboxIndex].titleEn}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {filteredItems[lightboxIndex].photographerOrSource}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
