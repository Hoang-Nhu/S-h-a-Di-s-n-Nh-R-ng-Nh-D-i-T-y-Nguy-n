import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';

interface SearchFilterBarProps {
  lang: 'vi' | 'en';
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedEthnic: string;
  setSelectedEthnic: (e: string) => void;
  selectedProvince: string;
  setSelectedProvince: (p: string) => void;
  resultCount: number;
  onReset: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  lang,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedEthnic,
  setSelectedEthnic,
  selectedProvince,
  setSelectedProvince,
  resultCount,
  onReset
}) => {
  const categories = [
    { id: 'all', labelVi: 'Tất cả dữ liệu', labelEn: 'All Categories' },
    { id: 'architecture', labelVi: 'Kiến trúc & Cấu kiện', labelEn: 'Architecture' },
    { id: 'space', labelVi: 'Không gian cư trú', labelEn: 'Spaces' },
    { id: 'ritual', labelVi: 'Sinh hoạt & Nghi lễ', labelEn: 'Rituals' }
  ];

  const ethnicOptions = ['all', 'Ba Na', 'Ê Đê', 'Gia Rai', 'M\'Nông', 'Xơ Đăng'];
  const provinceOptions = ['all', 'Kon Tum', 'Đắk Lắk', 'Gia Lai', 'Đắk Nông', 'Lâm Đồng'];

  const hasFilter = searchTerm !== '' || selectedCategory !== 'all' || selectedEthnic !== 'all' || selectedProvince !== 'all';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-md border border-stone-200 dark:border-stone-800 p-4 sm:p-6 mb-8 transition-colors">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-stone-100 dark:border-stone-800 pb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#C88A3D] text-stone-950 shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {lang === 'vi' ? cat.labelVi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Search Input and Select Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Keyword Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={lang === 'vi' ? 'Tìm theo tên, mã REC-*, tên bản địa (Kpan, Jơng rông...)...' : 'Search by title, code, indigenous name...'}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#C88A3D]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ethnic Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedEthnic}
            onChange={e => setSelectedEthnic(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#C88A3D]"
          >
            <option value="all">{lang === 'vi' ? 'Dân tộc: Tất cả' : 'All Ethnicities'}</option>
            {ethnicOptions.filter(e => e !== 'all').map(eth => (
              <option key={eth} value={eth}>{eth}</option>
            ))}
          </select>
        </div>

        {/* Province Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedProvince}
            onChange={e => setSelectedProvince(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#C88A3D]"
          >
            <option value="all">{lang === 'vi' ? 'Địa phương: Tất cả' : 'All Provinces'}</option>
            {provinceOptions.filter(p => p !== 'all').map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Status Bar */}
      <div className="mt-4 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div>
          {lang === 'vi' ? 'Tìm thấy ' : 'Found '}
          <span className="font-bold text-[#C88A3D] text-sm">{resultCount}</span>
          {lang === 'vi' ? ' bản ghi phù hợp' : ' matching records'}
        </div>

        {hasFilter && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[#8B5E34] dark:text-[#E0A96D] hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Xóa bộ lọc' : 'Reset Filters'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
