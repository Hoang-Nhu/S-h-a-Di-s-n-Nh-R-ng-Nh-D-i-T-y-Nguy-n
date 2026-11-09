import React, { useState } from 'react';
import { Download, Copy, Check, X, FileCode, Sparkles } from 'lucide-react';
import { generateSingleFileHtml } from '../utils/singleFileGenerator';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateSingleFileHtml();

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nha-rong-nha-dai-tay-nguyen-f03.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 text-stone-900 dark:text-stone-100 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#C88A3D]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl">
                {lang === 'vi' ? 'Xuất Single File HTML Độc Lập' : 'Export Standalone Single HTML'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {lang === 'vi' ? 'Đầy đủ <!DOCTYPE html> đến </html>, chạy ngay khi lưu file .html' : 'Self-contained standalone single file, ready to run offline'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-700 dark:text-stone-300 space-y-2">
          <div className="font-bold text-[#8B5E34] dark:text-[#E0A96D] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Thông tin tệp xuất:' : 'Export Specifications:'}</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-stone-600 dark:text-stone-300">
            <li>{lang === 'vi' ? 'Mã đề tài: F03 - Vùng văn hóa Tây Nguyên' : 'Topic Code: F03 - Central Highlands Cultural Region'}</li>
            <li>{lang === 'vi' ? 'Tác giả: Nguyễn Văn Hoàng - PH64335 - Nhóm 2' : 'Author: Nguyen Van Hoang - PH64335 - Group 2'}</li>
            <li>{lang === 'vi' ? 'Nhúng 100% dữ liệu JSON disanData (30 bản ghi + 7 nguồn tư liệu)' : 'Embedded 100% JSON disanData (30 records + 7 sources)'}</li>
            <li>{lang === 'vi' ? 'Tích hợp Tailwind CSS CDN + Chart.js CDN + Leaflet.js CDN' : 'Tailwind CSS CDN + Chart.js CDN + Leaflet.js CDN'}</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-sm hover:bg-[#E0A96D] transition shadow-lg shadow-[#C88A3D]/20"
          >
            <Download className="w-4 h-4 text-stone-950" />
            <span>{lang === 'vi' ? 'Tải tệp HTML về máy (.html)' : 'Download Standalone .html File'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-semibold text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (lang === 'vi' ? 'Đã sao chép mã!' : 'Copied!') : (lang === 'vi' ? 'Sao chép mã HTML' : 'Copy HTML Code')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
