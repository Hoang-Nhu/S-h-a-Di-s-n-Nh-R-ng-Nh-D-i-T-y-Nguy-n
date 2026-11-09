import React from 'react';
import { X, Volume2, VolumeX, ShieldCheck, MapPin, Tag, UserCheck, AlertTriangle, BookOpen, Layers } from 'lucide-react';
import { HeritageRecord, HeritageSource } from '../data/types';
import { disanData } from '../data/disanData';

interface RecordDetailModalProps {
  record: HeritageRecord | null;
  onClose: () => void;
  lang: 'vi' | 'en';
  isSpeaking: boolean;
  onPlayAudio: (r: HeritageRecord) => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  onClose,
  lang,
  isSpeaking,
  onPlayAudio
}) => {
  if (!record) return null;

  const source: HeritageSource | undefined = disanData.sources.find(s => s.id === record.sourceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 shadow-2xl transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-950">
          <img
            src={record.imageUrl}
            alt={record.titleVi}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-md bg-stone-900/90 text-[#E0A96D] text-xs font-mono font-bold border border-stone-700">
              {record.id}
            </span>
            <span className="px-3 py-1 rounded-md bg-[#C88A3D] text-stone-950 text-xs font-bold">
              {record.ethnicGroup}
            </span>
            <span className="px-3 py-1 rounded-md bg-stone-800/80 text-stone-300 text-xs font-medium">
              {record.culturalRegion}
            </span>
          </div>

          {/* Bottom Title on Banner */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
            <div className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
              {lang === 'vi' ? 'Tên bản địa:' : 'Indigenous Name:'} <span className="font-serif italic text-white text-sm sm:text-base">{record.indigenousName}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-white leading-tight mt-1">
              {lang === 'vi' ? record.titleVi : record.titleEn}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Quick Audio Guide Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-stone-800 dark:text-stone-200">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <Volume2 className="w-5 h-5 text-[#C88A3D] flex-shrink-0" />
              <span>
                {lang === 'vi' ? 'Thuyết minh tự động (Audio Guide)' : 'Synthesized Audio Guide'}
              </span>
            </div>
            <button
              onClick={() => onPlayAudio(record)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C88A3D] text-stone-950 text-xs sm:text-sm font-bold hover:bg-[#E0A96D] transition shadow"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? (lang === 'vi' ? 'Dừng phát' : 'Stop') : (lang === 'vi' ? '🎙 Nghe thuyết minh' : 'Listen')}</span>
            </button>
          </div>

          {/* Descriptions */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-wider font-bold text-[#8B5E34] dark:text-[#E0A96D]">
              {lang === 'vi' ? 'Mô tả chi tiết bảo tàng học' : 'Ethnographic Description'}
            </h3>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {lang === 'vi' ? record.descriptionVi : record.descriptionEn}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-stone-400">
                <Tag className="w-4 h-4 text-[#C88A3D]" />
                <span>{lang === 'vi' ? 'Loại cấu kiện / Loại hình' : 'Element Type'}</span>
              </div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{record.elementOrType}</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-stone-400">
                <MapPin className="w-4 h-4 text-[#C88A3D]" />
                <span>{lang === 'vi' ? 'Địa danh hiện nay & Lịch sử' : 'Locations'}</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                <span className="font-semibold text-stone-900 dark:text-stone-100">{record.currentLocation}</span>
                <br />
                <span className="text-stone-500 dark:text-stone-400">{lang === 'vi' ? 'Thời điểm tư liệu: ' : 'Historic: '} {record.historicalLocation}</span>
              </p>
            </div>

            {record.architecturalRole && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-stone-400">
                  <Layers className="w-4 h-4 text-[#C88A3D]" />
                  <span>{lang === 'vi' ? 'Công năng kiến trúc' : 'Architectural Role'}</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">{record.architecturalRole}</p>
              </div>
            )}

            {record.dimensionOrMaterial && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-stone-400">
                  <Layers className="w-4 h-4 text-[#C88A3D]" />
                  <span>{lang === 'vi' ? 'Kích thước & Vật liệu' : 'Dimensions & Materials'}</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">{record.dimensionOrMaterial}</p>
              </div>
            )}
          </div>

          {/* Taboos and Customary Rules */}
          {record.taboosAndRules && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>{lang === 'vi' ? 'Tập quán, Quy tắc & Điều kiêng kỵ' : 'Customary Rules & Taboos'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{record.taboosAndRules}</p>
            </div>
          )}

          {/* Ritual metadata section (if applicable) */}
          {record.category === 'ritual' && (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#8B5E34] dark:text-[#E0A96D] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#C88A3D]" />
                {lang === 'vi' ? 'Hồ sơ Kiểm kê Nghi lễ Thực địa' : 'Ritual Field Inventory Dossier'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-300">
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{lang === 'vi' ? 'Bối cảnh: ' : 'Context: '}</span>
                  {record.context}
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{lang === 'vi' ? 'Tính chất: ' : 'Type: '}</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${record.isRealRitual ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'}`}>
                    {record.isRealRitual ? (lang === 'vi' ? 'Nghi lễ thật (Nguyên bản)' : 'Authentic Ritual') : (lang === 'vi' ? 'Buổi tập / Phục dựng' : 'Rehearsal / Restaged')}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{lang === 'vi' ? 'Người cung cấp: ' : 'Informant: '}</span>
                  {record.informantName} ({record.informantAge} tuổi, {record.informantRole})
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{lang === 'vi' ? 'Ngày ghi nhận: ' : 'Date: '}</span>
                  {record.recordingDate}
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{lang === 'vi' ? 'Trạng thái xin phép: ' : 'Permission: '}</span>
                  {record.permissionStatus}
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{lang === 'vi' ? 'Phạm vi sử dụng: ' : 'Usage: '}</span>
                  {record.usageScope}
                </div>
              </div>

              {record.unreleasedNotes && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400 italic">
                  <span className="font-semibold not-italic">{lang === 'vi' ? 'Nội dung không công bố / Bảo mật: ' : 'Unreleased notes: '}</span>
                  {record.unreleasedNotes}
                </div>
              )}
            </div>
          )}

          {/* Source Citation Card */}
          {source && (
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-[#8B5E34]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C88A3D]" />
                  <span className="font-mono font-bold text-[#C88A3D]">{source.id}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{source.nameVi}</span>
                </div>
                <div className="text-stone-500 dark:text-stone-400">
                  {source.organizationVi} ({source.year}) • {source.type}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-stone-600 dark:text-stone-300 font-semibold">{lang === 'vi' ? 'Độ tin cậy:' : 'Reliability:'}</span>
                <span className="text-amber-500 font-bold">{'★'.repeat(source.reliability)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
