import React from 'react';
import { History, Clock, BookOpen } from 'lucide-react';
import { timelineMilestones } from '../data/timelineData';
import { disanData } from '../data/disanData';

interface HistoricalTimelineProps {
  lang: 'vi' | 'en';
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ lang }) => {
  return (
    <section id="timeline" className="py-16 bg-stone-100 dark:bg-[#1f1919] transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center justify-center gap-1.5">
            <History className="w-4 h-4 text-[#C88A3D]" />
            {lang === 'vi' ? 'DÒNG THỜI GIAN LỊCH SỬ' : 'HISTORICAL TIMELINE'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {lang === 'vi' ? 'Tiến trình Biến đổi & Số hóa Di sản' : 'Chronicle of Transformation & Digitization'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            {lang === 'vi'
              ? 'Hành trình từ thuở sơ khai cư trú nhà sàn cổ truyền, qua các ghi chép nhân học thời kỳ thuộc địa, biến động chiến tranh, cho đến kỷ nguyên số hóa 3D và AI Knowledge Base hôm nay.'
              : 'The evolution of highland architectural heritage from prehistoric roots, colonial surveys, and wartime resilience to modern AI digital stewardship.'}
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-[#C88A3D]/40 ml-4 sm:ml-32 md:ml-48 space-y-12">
          {timelineMilestones.map((milestone, idx) => {
            const src = disanData.sources.find(s => s.id === milestone.sourceId);

            return (
              <div key={idx} className="relative pl-6 sm:pl-10 group">
                {/* Year Marker on Left for desktop */}
                <div className="hidden sm:block absolute -left-36 md:-left-52 top-0 text-right w-28 md:w-44">
                  <span className="text-xs font-mono font-bold text-[#C88A3D] uppercase block">
                    {milestone.year}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium line-clamp-1">
                    {lang === 'vi' ? milestone.periodVi : milestone.periodEn}
                  </span>
                </div>

                {/* Pulsing Timeline Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#C88A3D] border-2 border-white dark:border-stone-900 shadow group-hover:scale-125 transition-transform" />

                {/* Milestone Card */}
                <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all">
                  {/* Mobile year badge */}
                  <div className="sm:hidden flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[#C88A3D] font-mono font-bold text-xs">
                      {milestone.year}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {lang === 'vi' ? milestone.periodVi : milestone.periodEn}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug">
                    {lang === 'vi' ? milestone.titleVi : milestone.titleEn}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {lang === 'vi' ? milestone.descriptionVi : milestone.descriptionEn}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <div className="text-[11px] italic text-[#8B5E34] dark:text-[#E0A96D]">
                      <strong>{lang === 'vi' ? 'Ý nghĩa: ' : 'Significance: '}</strong>
                      {lang === 'vi' ? milestone.historicalSignificanceVi : milestone.historicalSignificanceEn}
                    </div>

                    <div className="flex items-center gap-1 font-mono font-semibold text-[11px] text-stone-400">
                      <BookOpen className="w-3.5 h-3.5 text-[#8B5E34]" />
                      <span>{milestone.sourceId}</span>
                    </div>
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
