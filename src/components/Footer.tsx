import React from 'react';
import { User, Heart, ArrowUp, Compass, Layers, Flame, BookOpen, MapPin } from 'lucide-react';
import { disanData } from '../data/disanData';
import { NavTabId } from './Navbar';

interface FooterProps {
  lang: 'vi' | 'en';
  onScrollTop: () => void;
  onOpenExport: () => void;
  onSelectTab: (tab: NavTabId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onScrollTop,
  onOpenExport,
  onSelectTab
}) => {
  const { projectInfo } = disanData;

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 transition-colors pt-16 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Col 1: Project Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C88A3D] text-stone-950 font-serif font-extrabold text-lg flex items-center justify-center shadow">
                F03
              </div>
              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
                  {lang === 'vi' ? 'Đồ án Số hóa Di sản Văn hóa' : 'Cultural Heritage Digitization'}
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  {lang === 'vi' ? projectInfo.titleVi : projectInfo.titleEn}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {lang === 'vi'
                ? 'Công trình số hóa kiến trúc bản địa Nhà Rông (Ba Na, Xơ Đăng, Gia Rai) và Nhà Dài mẫu hệ (Ê Đê, M\'Nông). Bảo tồn tri thức dân gian bằng công nghệ web hiện đại, sơ đồ mặt bằng tương tác và mô hình AI RAG.'
                : 'Digital preservation of vernacular Rong and Longhouse architectures across Central Highlands communities. Integrating interactive floor plans and grounded AI RAG.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded bg-stone-900 text-[#E0A96D] font-mono border border-stone-800">
                {projectInfo.projectCode}
              </span>
              <span className="px-2.5 py-1 rounded bg-stone-900 text-stone-400 border border-stone-800">
                {projectInfo.academicYear}
              </span>
            </div>
          </div>

          {/* Col 2: Author Credentials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#C88A3D]" />
              {lang === 'vi' ? 'Thông tin Tác giả & Nhóm Thực hiện' : 'Author & Team Credentials'}
            </h4>
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">{lang === 'vi' ? 'Tác giả:' : 'Author:'}</span>
                <span className="font-bold text-white text-sm">{projectInfo.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">{lang === 'vi' ? 'Mã sinh viên:' : 'Student ID:'}</span>
                <span className="font-mono font-bold text-[#E0A96D]">{projectInfo.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">{lang === 'vi' ? 'Nhóm thực hiện:' : 'Team:'}</span>
                <span className="font-semibold text-stone-200">{projectInfo.group}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-800/80">
                <span className="text-stone-400">{lang === 'vi' ? 'Khoa đào tạo:' : 'Faculty:'}</span>
                <span className="text-stone-300 text-right">{lang === 'vi' ? projectInfo.advisorVi : projectInfo.advisorEn}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation to Views */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-100 uppercase tracking-wider">
              {lang === 'vi' ? 'Điều hướng Trực quan' : 'Views Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('architecture')}
                  className="text-stone-400 hover:text-[#E0A96D] transition flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C88A3D]" />
                  <span>{lang === 'vi' ? 'Kho Kiến trúc & Cấu kiện gỗ' : 'Architecture & Elements'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('floorplan')}
                  className="text-stone-400 hover:text-[#E0A96D] transition flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-[#C88A3D]" />
                  <span>{lang === 'vi' ? 'Sơ đồ mặt bằng tương tác' : 'Interactive Floor Plan'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('rituals')}
                  className="text-stone-400 hover:text-[#E0A96D] transition flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>{lang === 'vi' ? 'Sinh hoạt & Nghi lễ cộng đồng' : 'Customs & Rituals'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('map')}
                  className="text-stone-400 hover:text-[#E0A96D] transition flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C88A3D]" />
                  <span>{lang === 'vi' ? 'Bản đồ di sản 5 tỉnh' : '5-Province Map'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('sources')}
                  className="text-stone-400 hover:text-[#E0A96D] transition flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8B5E34]" />
                  <span>{lang === 'vi' ? '7 Nguồn tư liệu khoa học' : '7 Cited Sources'}</span>
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onScrollTop}
                className="inline-flex items-center gap-1.5 text-xs text-[#C88A3D] hover:text-[#E0A96D] transition font-semibold"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2024-2026 {projectInfo.author} ({projectInfo.studentId}) - {projectInfo.group}. Đề tài {projectInfo.projectCode}.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Bảo tồn với lòng tự hào di sản văn hóa Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
