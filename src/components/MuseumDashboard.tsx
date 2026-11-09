import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Database, Users, BookOpen, Home, Flame } from 'lucide-react';
import { disanData } from '../data/disanData';

ChartJS.register(...registerables);

interface MuseumDashboardProps {
  lang: 'vi' | 'en';
}

export const MuseumDashboard: React.FC<MuseumDashboardProps> = ({ lang }) => {
  const ethnicChartRef = useRef<HTMLCanvasElement | null>(null);
  const categoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const provinceChartRef = useRef<HTMLCanvasElement | null>(null);

  const ethnicInstance = useRef<ChartJS | null>(null);
  const categoryInstance = useRef<ChartJS | null>(null);
  const provinceInstance = useRef<ChartJS | null>(null);

  // Statistics calculation
  const totalRecords = disanData.records.length;
  const ethnicGroups = Array.from(new Set(disanData.records.map(r => r.ethnicGroup)));
  const totalSources = disanData.sources.length;
  const totalSpaces = disanData.records.filter(r => r.category === 'space').length;
  const totalRituals = disanData.records.filter(r => r.category === 'ritual').length;

  useEffect(() => {
    // 1. Ethnic breakdown chart
    if (ethnicChartRef.current) {
      if (ethnicInstance.current) ethnicInstance.current.destroy();

      const ethnicCounts: Record<string, number> = {};
      disanData.records.forEach(r => {
        ethnicCounts[r.ethnicGroup] = (ethnicCounts[r.ethnicGroup] || 0) + 1;
      });

      ethnicInstance.current = new ChartJS(ethnicChartRef.current, {
        type: 'doughnut',
        data: {
          labels: Object.keys(ethnicCounts),
          datasets: [
            {
              data: Object.values(ethnicCounts),
              backgroundColor: ['#C88A3D', '#8B5E34', '#E0A96D', '#6B4423', '#A47551'],
              borderWidth: 2,
              borderColor: '#2D2424'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#A8A29E',
                font: { family: 'Inter', size: 12 },
                boxWidth: 12
              }
            }
          }
        }
      });
    }

    // 2. Category distribution chart
    if (categoryChartRef.current) {
      if (categoryInstance.current) categoryInstance.current.destroy();

      const categories = [
        { labelVi: 'Kiến trúc & Cấu kiện', labelEn: 'Architecture', count: disanData.records.filter(r => r.category === 'architecture').length },
        { labelVi: 'Không gian cư trú', labelEn: 'Living Spaces', count: disanData.records.filter(r => r.category === 'space').length },
        { labelVi: 'Sinh hoạt & Nghi lễ', labelEn: 'Rituals & Life', count: disanData.records.filter(r => r.category === 'ritual').length }
      ];

      categoryInstance.current = new ChartJS(categoryChartRef.current, {
        type: 'bar',
        data: {
          labels: categories.map(c => lang === 'vi' ? c.labelVi : c.labelEn),
          datasets: [
            {
              label: lang === 'vi' ? 'Số bản ghi' : 'Record Count',
              data: categories.map(c => c.count),
              backgroundColor: '#C88A3D',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#A8A29E', stepSize: 2 },
              grid: { color: '#44403C' }
            },
            x: {
              ticks: { color: '#A8A29E', font: { family: 'Inter', size: 11 } },
              grid: { display: false }
            }
          }
        }
      });
    }

    // 3. Province distribution chart
    if (provinceChartRef.current) {
      if (provinceInstance.current) provinceInstance.current.destroy();

      const provinces = ['Kon Tum', 'Đắk Lắk', 'Gia Lai', 'Đắk Nông', 'Lâm Đồng'];
      const provinceCounts = provinces.map(p => {
        return disanData.records.filter(r => r.currentLocation.includes(p) || r.culturalRegion.includes(p)).length;
      });

      provinceInstance.current = new ChartJS(provinceChartRef.current, {
        type: 'bar',
        data: {
          labels: provinces,
          datasets: [
            {
              label: lang === 'vi' ? 'Bản ghi' : 'Records',
              data: provinceCounts,
              backgroundColor: '#8B5E34',
              borderRadius: 4
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { color: '#A8A29E', stepSize: 2 },
              grid: { color: '#44403C' }
            },
            y: {
              ticks: { color: '#A8A29E', font: { family: 'Inter', size: 11 } },
              grid: { display: false }
            }
          }
        }
      });
    }

    return () => {
      if (ethnicInstance.current) ethnicInstance.current.destroy();
      if (categoryInstance.current) categoryInstance.current.destroy();
      if (provinceInstance.current) provinceInstance.current.destroy();
    };
  }, [lang]);

  return (
    <section id="dashboard" className="py-16 bg-stone-100 dark:bg-[#251e1e] transition-colors border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8B5E34] dark:text-[#E0A96D]">
            {lang === 'vi' ? 'Hệ thống Dữ liệu Di sản F03' : 'Heritage System Statistics'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {lang === 'vi' ? 'Thống kê Tổng quan Kho Tư liệu Số' : 'Digital Archive Overview'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
            {lang === 'vi'
              ? 'Số liệu chuẩn hóa từ 7 nguồn tư liệu khảo sát thực địa, bảo tàng học và viện nghiên cứu chuyên ngành.'
              : 'Standardized data compiled from 7 academic museum archives, field surveys, and ethnographic institutes.'}
          </p>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-amber-500/10 text-[#C88A3D]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{totalRecords}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">{lang === 'vi' ? 'Tổng số bản ghi' : 'Total Records'}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{ethnicGroups.length}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">{lang === 'vi' ? 'Dân tộc chủ thể' : 'Ethnic Groups'}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{totalSources}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">{lang === 'vi' ? 'Nguồn tư liệu' : 'Cited Sources'}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{totalSpaces}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">{lang === 'vi' ? 'Không gian cư trú' : 'Living Spaces'}</div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">{totalRituals}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">{lang === 'vi' ? 'Nghi lễ & Sinh hoạt' : 'Rituals & Life'}</div>
            </div>
          </div>
        </div>

        {/* 3 Visual Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ethnic Doughnut */}
          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-4 text-center">
              {lang === 'vi' ? 'Phân bố theo Dân tộc' : 'Ethnic Group Distribution'}
            </h3>
            <div className="h-56 relative">
              <canvas ref={ethnicChartRef}></canvas>
            </div>
          </div>

          {/* Category Bar */}
          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-4 text-center">
              {lang === 'vi' ? 'Phân loại Dữ liệu' : 'Data Category Distribution'}
            </h3>
            <div className="h-56 relative">
              <canvas ref={categoryChartRef}></canvas>
            </div>
          </div>

          {/* Province Bar */}
          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-4 text-center">
              {lang === 'vi' ? 'Phân bố theo Địa phương' : 'Geographic Distribution'}
            </h3>
            <div className="h-56 relative">
              <canvas ref={provinceChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
