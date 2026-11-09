import React from 'react';
import { Volume2, VolumeX, Eye, BookOpen, MapPin, Tag } from 'lucide-react';
import { HeritageRecord } from '../data/types';

interface RecordCardProps {
  record: HeritageRecord;
  lang: 'vi' | 'en';
  onSelect: (r: HeritageRecord) => void;
  isSpeaking: boolean;
  onPlayAudio: (r: HeritageRecord) => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({
  record,
  lang,
  onSelect,
  isSpeaking,
  onPlayAudio
}) => {
  return (
    <div className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-[#C88A3D]/60 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
      {/* Thumbnail with overlay badges */}
      <div className="relative h-52 w-full overflow-hidden bg-stone-800">
        <img
          src={record.imageUrl}
          alt={record.titleVi}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

        {/* Record ID Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-[#E0A96D] text-xs font-mono font-bold border border-stone-700/60 shadow">
          {record.id}
        </div>

        {/* Ethnic Group Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#C88A3D] text-stone-950 text-xs font-bold shadow">
          {record.ethnicGroup}
        </div>

        {/* Indigenous Name on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] uppercase tracking-wider text-[#E0A96D] font-semibold block drop-shadow">
            {lang === 'vi' ? 'Tên bản địa:' : 'Indigenous Name:'} {record.indigenousName}
          </span>
          <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-tight drop-shadow truncate">
            {lang === 'vi' ? record.titleVi : record.titleEn}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#C88A3D]" />
              <span className="font-medium text-stone-700 dark:text-stone-300">{record.elementOrType}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{record.currentLocation.split(',')[0]}</span>
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
            {lang === 'vi' ? record.descriptionVi : record.descriptionEn}
          </p>

          {/* Architectural role or taboo highlight */}
          {record.taboosAndRules && (
            <div className="text-[11px] p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
              <span className="font-semibold">{lang === 'vi' ? 'Quy tắc/Kiêng kỵ: ' : 'Rule/Taboo: '}</span>
              <span className="line-clamp-1">{record.taboosAndRules}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-stone-400">
            <BookOpen className="w-3.5 h-3.5 text-[#8B5E34]" />
            <span className="font-mono text-[11px] font-semibold text-stone-500 dark:text-stone-400">{record.sourceId}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Guide Button */}
            <button
              onClick={() => onPlayAudio(record)}
              className={`p-2 rounded-lg border transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-stone-950 border-amber-600 animate-pulse'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:text-[#C88A3D]'
              }`}
              title={lang === 'vi' ? 'Nghe thuyết minh audio' : 'Listen to Audio Guide'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* View Detail Button */}
            <button
              onClick={() => onSelect(record)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-[#E0A96D] dark:bg-stone-800 dark:hover:bg-stone-700 font-semibold text-xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Chi tiết' : 'Details'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
