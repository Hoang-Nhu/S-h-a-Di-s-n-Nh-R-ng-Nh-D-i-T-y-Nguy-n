import React, { useState } from 'react';
import { BookOpen, ShieldCheck, FileText, ExternalLink, Globe, Layers, Award, CheckCircle } from 'lucide-react';
import { heritageSources } from '../data/sources';

interface SourcesRegistryProps {
  lang: 'vi' | 'en';
}

export const SourcesRegistry: React.FC<SourcesRegistryProps> = ({ lang }) => {
  const [filterGroup, setFilterGroup] = useState<'all' | 'institutional' | 'field'>('all');

  const filteredSources = filterGroup === 'all'
    ? heritageSources
    : heritageSources.filter(s => s.categoryGroup === filterGroup);

  return (
    <section id="sources" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center justify-center gap-1.5">
          <BookOpen className="w-4 h-4 text-[#C88A3D]" />
          {lang === 'vi' ? 'HỆ THỐNG NGUỒN TƯ LIỆU KHOA HỌC CHÍNH THỐNG' : 'OFFICIAL ACADEMIC SOURCES REGISTRY'}
        </span>
        <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          {lang === 'vi' ? 'Danh mục Nguồn Tư liệu & Phiếu Thực địa F03' : 'Archival Sources & F03 Field Dossiers'}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {lang === 'vi'
            ? 'Cung cấp liên kết trực tiếp tới các cổng thông tin di sản chính thống của quốc gia và mã số phiếu tư liệu khảo sát thực địa của đề tài F03.'
            : 'Direct hyperlinks to official national heritage portals and field survey questionnaire record codes.'}
        </p>

        {/* Filter Tabs by Source Type */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilterGroup('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filterGroup === 'all'
                ? 'bg-[#C88A3D] text-stone-950 shadow-md font-bold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {lang === 'vi' ? 'Tất cả 7 nguồn tư liệu' : 'All 7 Sources'}
          </button>
          <button
            onClick={() => setFilterGroup('institutional')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filterGroup === 'institutional'
                ? 'bg-[#C88A3D] text-stone-950 shadow-md font-bold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {lang === 'vi' ? 'Nhóm B: Nguồn cơ quan quốc gia & Viện nghiên cứu' : 'Group B: National Institutional Portals'}
          </button>
          <button
            onClick={() => setFilterGroup('field')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filterGroup === 'field'
                ? 'bg-[#C88A3D] text-stone-950 shadow-md font-bold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {lang === 'vi' ? 'Nhóm A: Phiếu tư liệu tự thu thập thực địa F03' : 'Group A: F03 Field Questionnaires'}
          </button>
        </div>
      </div>

      {/* Official Government Portals Quick Links Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-stone-900 border border-[#8B5E34]/40 text-stone-100 shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#C88A3D]" />
            <h3 className="font-serif font-bold text-sm sm:text-base text-white">
              {lang === 'vi' ? 'Cổng Thông tin Di sản Chính thống được Trích dẫn trong Đề tài:' : 'Official Cited Heritage Portals:'}
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">
            {lang === 'vi' ? 'Xác thực chuẩn mực pháp lý' : 'Legally Verified Portals'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <a
            href="https://dsvh.gov.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 hover:border-[#C88A3D] transition group flex items-center justify-between text-xs"
          >
            <div>
              <div className="font-bold text-white group-hover:text-[#E0A96D] transition-colors">Cục Di sản Văn hóa</div>
              <div className="text-[11px] text-stone-400 font-mono">dsvh.gov.vn</div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#C88A3D] transition-colors" />
          </a>

          <a
            href="https://bvhttdl.gov.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 hover:border-[#C88A3D] transition group flex items-center justify-between text-xs"
          >
            <div>
              <div className="font-bold text-white group-hover:text-[#E0A96D] transition-colors">Bộ VHTTDL</div>
              <div className="text-[11px] text-stone-400 font-mono">bvhttdl.gov.vn</div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#C88A3D] transition-colors" />
          </a>

          <a
            href="https://vme.org.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 hover:border-[#C88A3D] transition group flex items-center justify-between text-xs"
          >
            <div>
              <div className="font-bold text-white group-hover:text-[#E0A96D] transition-colors">Bảo tàng Dân tộc học VN</div>
              <div className="text-[11px] text-stone-400 font-mono">vme.org.vn</div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#C88A3D] transition-colors" />
          </a>

          <a
            href="https://vicas.org.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 hover:border-[#C88A3D] transition group flex items-center justify-between text-xs"
          >
            <div>
              <div className="font-bold text-white group-hover:text-[#E0A96D] transition-colors">Viện VHNT Quốc gia (VICAS)</div>
              <div className="text-[11px] text-stone-400 font-mono">vicas.org.vn</div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#C88A3D] transition-colors" />
          </a>
        </div>
      </div>

      {/* Sources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSources.map(source => (
          <div
            key={source.id}
            className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header with Source ID, Group Badge and Reliability Stars */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-[#C88A3D] font-mono font-bold text-xs border border-amber-500/20">
                    {source.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    source.categoryGroup === 'field'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  }`}>
                    {source.categoryGroup === 'field' 
                      ? (lang === 'vi' ? 'Phiếu Thực địa F03' : 'F03 Field Survey') 
                      : (lang === 'vi' ? 'Cơ quan Quốc gia' : 'National Portal')}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                  <span>{'★'.repeat(source.reliability)}</span>
                </div>
              </div>

              {/* Source Title */}
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug mb-2">
                {lang === 'vi' ? source.nameVi : source.nameEn}
              </h3>

              {/* Formal Archive Sheet Code */}
              <div className="inline-block px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-xs font-semibold mb-3">
                <span className="text-stone-400 mr-1">{lang === 'vi' ? 'Mã phiếu:' : 'Sheet Code:'}</span>
                <span className="text-[#C88A3D]">{source.sheetCode}</span>
              </div>

              {/* Organization & Year */}
              <div className="text-xs text-[#8B5E34] dark:text-[#E0A96D] font-semibold mb-3">
                {lang === 'vi' ? source.organizationVi : source.organizationEn} ({source.year})
              </div>

              {/* Type Badge */}
              <div className="text-xs text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C88A3D] flex-shrink-0" />
                <span>{source.type}</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {lang === 'vi' ? source.descriptionVi : source.descriptionEn}
              </p>
            </div>

            {/* Card Footer: Citation Legal Notice & Clickable Hyperlink */}
            <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
              <div className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                <span className="font-semibold not-italic text-stone-700 dark:text-stone-300">
                  {lang === 'vi' ? 'Pháp lý trích dẫn: ' : 'Legal Citation: '}
                </span>
                {source.citationNotice}
              </div>

              {/* Official Link Button */}
              {source.officialUrl && (
                <a
                  href={source.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C88A3D] text-stone-800 dark:text-stone-200 hover:text-stone-950 font-bold text-xs transition border border-stone-200 dark:border-stone-700 group"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C88A3D] group-hover:text-stone-950 transition-colors" />
                  <span>{lang === 'vi' ? 'Truy cập cổng thông tin chính thống' : 'Visit Official Portal'}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
