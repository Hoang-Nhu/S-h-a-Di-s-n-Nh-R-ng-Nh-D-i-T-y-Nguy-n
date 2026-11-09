import React from 'react';
import { Flame, ShieldCheck, Lock, Calendar, UserCheck, Volume2, VolumeX, Eye } from 'lucide-react';
import { HeritageRecord } from '../data/types';
import { disanData } from '../data/disanData';

interface RitualSectionProps {
  lang: 'vi' | 'en';
  onSelectRecord: (r: HeritageRecord) => void;
  activeAudioId: string | null;
  onPlayAudio: (r: HeritageRecord) => void;
}

export const RitualSection: React.FC<RitualSectionProps> = ({
  lang,
  onSelectRecord,
  activeAudioId,
  onPlayAudio
}) => {
  const rituals = disanData.records.filter(r => r.category === 'ritual');

  return (
    <section id="rituals" className="py-16 bg-stone-100 dark:bg-[#1f1919] transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center justify-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            {lang === 'vi' ? 'PHẦN 3 • DI SẢN VĂN HÓA PHI VẬT THỂ' : 'PART 3 • INTANGIBLE CULTURAL HERITAGE'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {lang === 'vi' ? 'Sinh hoạt & Nghi lễ Cộng đồng' : 'Community Customs & Rituals'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            {lang === 'vi'
              ? 'Hồ sơ lưu trữ khoa học về họp buôn luật tục, trao truyền cồng chiêng, hát kể sử thi Khan, lễ bỏ mả Pơ-thi, cúng bến nước và nghi lễ chu kỳ nông nghiệp.'
              : 'Ethnographic field dossiers on customary councils, oral gong transmission, epic recitations, Pothi soul liberation, and water blessing rites.'}
          </p>
        </div>

        {/* Ritual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rituals.map(rit => {
            const isSpeaking = activeAudioId === rit.id;

            return (
              <div
                key={rit.id}
                className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Real Documentary Thumbnail */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-stone-900 border border-stone-100 dark:border-stone-800">
                    <img
                      src={rit.imageUrl}
                      alt={rit.titleVi}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    
                    {/* Top Badges inside image */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/90 text-[#E0A96D] font-mono font-bold text-xs backdrop-blur-md shadow">
                        {rit.id}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#8B5E34] text-white text-xs font-semibold shadow">
                        {rit.ethnicGroup}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow ${
                        rit.isRealRitual 
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-blue-950/80 text-blue-300 border border-blue-500/40'
                      }`}>
                        {rit.isRealRitual ? (lang === 'vi' ? '● Nghi lễ thật' : '● Authentic Rite') : (lang === 'vi' ? '○ Buổi tập' : '○ Restaged')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Indigenous Name */}
                  <div className="mb-3">
                    <div className="text-xs text-[#E0A96D] font-serif italic mb-0.5">
                      {lang === 'vi' ? 'Tên bản địa: ' : 'Indigenous Name: '} {rit.indigenousName}
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-snug">
                      {lang === 'vi' ? rit.titleVi : rit.titleEn}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 mb-4 leading-relaxed">
                    {lang === 'vi' ? rit.descriptionVi : rit.descriptionEn}
                  </p>

                  {/* Scientific Metadata Grid */}
                  <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 text-xs mb-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#C88A3D] flex-shrink-0" />
                      <span className="truncate text-stone-700 dark:text-stone-300">
                        <strong className="text-stone-900 dark:text-stone-100">{rit.informantName}</strong> ({rit.informantAge}t)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C88A3D] flex-shrink-0" />
                      <span className="text-stone-700 dark:text-stone-300">{rit.recordingDate}</span>
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-stone-600 dark:text-stone-400 truncate">
                        {rit.permissionStatus}
                      </span>
                    </div>
                  </div>

                  {/* Confidentiality notice */}
                  {rit.unreleasedNotes && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 mb-4">
                      <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong>{lang === 'vi' ? 'Quy ước bảo mật: ' : 'Restricted: '}</strong>
                        {rit.unreleasedNotes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-stone-400 font-semibold">{rit.sourceId}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPlayAudio(rit)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        isSpeaking
                          ? 'bg-amber-500 text-stone-950 border-amber-600 animate-pulse'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:text-[#C88A3D]'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeaking ? (lang === 'vi' ? 'Dừng' : 'Stop') : (lang === 'vi' ? 'Thuyết minh' : 'Audio')}</span>
                    </button>

                    <button
                      onClick={() => onSelectRecord(rit)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-xs hover:bg-[#E0A96D] transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'Hồ sơ đầy đủ' : 'Full Dossier'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
