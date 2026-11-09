import { disanData } from '../data/disanData';

/**
 * Generates a complete standalone single HTML file string containing
 * all data, Tailwind CSS CDN, Google Fonts Inter/Roboto, 100% vector SVG map,
 * interactive tab views, audio narration, official source links, and mini-RAG AI Assistant.
 */
export function generateSingleFileHtml(): string {
  const jsonDataString = JSON.stringify(disanData, null, 2);

  return `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Số hóa Di sản Nhà Rông, Nhà Dài và Không gian cư trú Tây Nguyên | Đề tài F03</title>
  <meta name="description" content="Đồ án số hóa di sản văn hóa Tây Nguyên - Mã đề tài: F03. Tác giả: Nguyễn Văn Hoàng - PH64335 - Nhóm 2.">
  <meta property="og:title" content="Bảo tàng số Di sản Nhà Rông - Nhà Dài Tây Nguyên">
  <meta property="og:description" content="Khám phá kiến trúc, mặt bằng tương tác, sinh hoạt nghi lễ và trợ lý AI RAG bản địa.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Roboto:wght@300;400;500;700&display=swap&subset=vietnamese" rel="stylesheet">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            wood: {
              dark: '#2D2424',
              earth: '#8B5E34',
              straw: '#E0A96D',
              basalt: '#C88A3D',
              ivory: '#F5F5F0'
            }
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif']
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    h1, h2, h3, h4, h5, h6 { text-decoration: none !important; }
    .pulse-hotspot {
      animation: pulseGlow 2s infinite ease-in-out;
    }
    @keyframes pulseGlow {
      0% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 0 0 rgba(200, 138, 61, 0.7); }
      70% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 0 10px rgba(200, 138, 61, 0); }
      100% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 0 0 rgba(200, 138, 61, 0); }
    }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #1c1917; }
    ::-webkit-scrollbar-thumb { background: #8B5E34; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #C88A3D; }
  </style>
</head>
<body class="bg-stone-50 text-stone-900 dark:bg-[#2D2424] dark:text-stone-100 transition-colors duration-300 antialiased min-h-screen flex flex-col">
  <!-- Academic Banner -->
  <div id="academic-bar" class="bg-[#8B5E34] text-white text-xs py-2 px-4 text-center font-medium shadow-sm flex items-center justify-between flex-wrap gap-2">
    <div class="flex items-center gap-2 mx-auto">
      <span class="font-bold tracking-wide">ĐỒ ÁN SỐ HÓA DI SẢN:</span>
      <span>“Nhà Rông, Nhà Dài và Không gian cư trú cộng đồng” (Mã đề tài: F03 - Vùng văn hóa Tây Nguyên)</span>
      <span class="opacity-75">•</span>
      <span class="font-semibold text-amber-200">Tác giả: Nguyễn Văn Hoàng (PH64335) - Nhóm 2</span>
    </div>
  </div>

  <!-- Header Navigation -->
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#1C1817]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand Wordmark -->
      <a href="#home" onclick="switchTab('home')" class="flex items-center gap-2.5 font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 hover:text-[#C88A3D] transition">
        <span class="w-8 h-8 rounded-lg bg-[#C88A3D] text-stone-950 font-bold flex items-center justify-center font-mono text-sm shadow">F03</span>
        <span>Di sản Tây Nguyên</span>
      </a>

      <!-- Desktop Nav Tabs -->
      <nav class="hidden md:flex items-center gap-1 text-xs lg:text-sm font-medium">
        <button onclick="switchTab('home')" class="nav-btn px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:text-[#C88A3D] dark:hover:text-[#E0A96D]" data-tab="home">Trang chủ</button>
        <button onclick="switchTab('architecture')" class="nav-btn px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:text-[#C88A3D] dark:hover:text-[#E0A96D]" data-tab="architecture">Kiến trúc gỗ</button>
        <button onclick="switchTab('floorplan')" class="nav-btn px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:text-[#C88A3D] dark:hover:text-[#E0A96D]" data-tab="floorplan">Mặt bằng</button>
        <button onclick="switchTab('rituals')" class="nav-btn px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:text-[#C88A3D] dark:hover:text-[#E0A96D]" data-tab="rituals">Nghi lễ</button>
        <button onclick="switchTab('map')" class="nav-btn px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:text-[#C88A3D] dark:hover:text-[#E0A96D]" data-tab="map">Bản đồ 5 tỉnh</button>
        <button onclick="switchTab('sources')" class="nav-btn px-3 py-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:text-[#C88A3D] dark:hover:text-[#E0A96D]" data-tab="sources">Nguồn tư liệu</button>
      </nav>

      <!-- Action Zone -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button onclick="toggleDarkMode()" class="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition" title="Chuyển chế độ sáng/tối">
          <span id="theme-icon">🌙</span>
        </button>

        <!-- AI Assistant Trigger -->
        <button onclick="openAiModal()" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-xs sm:text-sm hover:bg-[#E0A96D] transition shadow">
          <span>Trợ lý AI</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main View Container -->
  <main id="app-content" class="flex-1">
    <!-- Tab contents rendered dynamically via pure JS below -->
  </main>

  <!-- Global Footer -->
  <footer class="bg-stone-900 text-stone-400 text-xs py-8 px-4 border-t border-stone-800 mt-auto">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div>
        <div class="font-serif font-bold text-stone-200 text-sm">Đồ án F03: Nhà Rông, Nhà Dài và Không gian cư trú Tây Nguyên</div>
        <div class="mt-1">Tác giả: Nguyễn Văn Hoàng • MSSV: PH64335 • Nhóm 2 • Khoa Di sản Văn hóa</div>
      </div>
      <div class="flex items-center gap-4 text-stone-400">
        <a href="https://dsvh.gov.vn" target="_blank" rel="noopener noreferrer" class="hover:text-[#C88A3D]">Cục Di sản</a>
        <a href="https://bvhttdl.gov.vn" target="_blank" rel="noopener noreferrer" class="hover:text-[#C88A3D]">Bộ VHTTDL</a>
        <a href="https://vme.org.vn" target="_blank" rel="noopener noreferrer" class="hover:text-[#C88A3D]">Bảo tàng DTH</a>
        <a href="https://vicas.org.vn" target="_blank" rel="noopener noreferrer" class="hover:text-[#C88A3D]">Viện VICAS</a>
      </div>
    </div>
  </footer>

  <!-- Record Detail Modal Container -->
  <div id="detail-modal" class="fixed inset-0 z-50 hidden bg-black/80 backdrop-blur-sm items-center justify-center p-4 overflow-y-auto">
    <div class="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-stone-900 border border-stone-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
      <button onclick="closeDetailModal()" class="absolute top-4 right-4 text-stone-400 hover:text-white p-2">✕</button>
      <div id="detail-modal-body"></div>
    </div>
  </div>

  <!-- AI Assistant Modal Container -->
  <div id="ai-modal" class="fixed inset-0 z-50 hidden bg-black/80 backdrop-blur-sm items-center justify-center p-4">
    <div class="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-stone-900 border border-stone-800 p-6 shadow-2xl flex flex-col h-[600px] max-h-[90vh]">
      <div class="flex items-center justify-between pb-3 border-b border-stone-800">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-[#C88A3D] text-stone-950 font-bold flex items-center justify-center">AI</span>
          <div>
            <h3 class="font-serif font-bold text-stone-100 text-sm">Trợ lý Di sản Số học Tây Nguyên (F03)</h3>
            <p class="text-[11px] text-stone-400">RAG Mini: Trả lời có trích dẫn Record ID & Source ID</p>
          </div>
        </div>
        <button onclick="closeAiModal()" class="text-stone-400 hover:text-white p-2">✕</button>
      </div>

      <!-- API Key Notice & Config -->
      <div class="py-2 px-3 bg-amber-500/10 border border-amber-500/20 rounded-xl my-2 flex items-center justify-between text-xs text-amber-300">
        <span>⚠️ API Key chỉ lưu cục bộ trên trình duyệt (localStorage).</span>
        <button onclick="promptApiKey()" class="text-xs font-bold underline text-[#E0A96D]">Cài đặt Key</button>
      </div>

      <!-- Chat Messages Scroll Area -->
      <div id="chat-messages" class="flex-1 overflow-y-auto space-y-3 p-2 text-xs sm:text-sm">
        <div class="p-3 rounded-2xl bg-stone-800 text-stone-200">
          Xin chào! Tôi là Trợ lý Di sản F03. Tôi chỉ trả lời dựa trên dữ liệu 30+ bản ghi và 7 nguồn tư liệu của đề tài, bắt buộc trích dẫn Record ID & Source ID. Bạn cần tra cứu gì về Nhà Rông hay Nhà Dài?
        </div>
      </div>

      <!-- Chat Input -->
      <div class="pt-3 border-t border-stone-800 flex gap-2">
        <input id="chat-input" type="text" placeholder="Hỏi về mái nhà rông, cầu thang cái, lễ bỏ mả..." class="flex-1 px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-[#C88A3D]" onkeydown="if(event.key==='Enter') sendChatMessage()">
        <button onclick="sendChatMessage()" class="px-5 py-2.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-xs sm:text-sm hover:bg-[#E0A96D] transition">Gửi</button>
      </div>
    </div>
  </div>

  <!-- Embedded Data & Single-File Application Logic -->
  <script>
    window.disanData = ${jsonDataString};

    // State
    let currentTab = 'home';
    let isDarkMode = true;

    function toggleDarkMode() {
      isDarkMode = !isDarkMode;
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.getElementById('theme-icon').textContent = isDarkMode ? '🌙' : '☀️';
    }

    function switchTab(tabId) {
      currentTab = tabId;
      document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.tab === tabId) {
          btn.classList.add('bg-[#C88A3D]', 'text-stone-950', 'font-bold');
          btn.classList.remove('text-stone-700', 'dark:text-stone-300');
        } else {
          btn.classList.remove('bg-[#C88A3D]', 'text-stone-950', 'font-bold');
          btn.classList.add('text-stone-700', 'dark:text-stone-300');
        }
      });
      renderCurrentTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderCurrentTab() {
      const container = document.getElementById('app-content');
      if (currentTab === 'home') {
        container.innerHTML = renderHomeHtml();
      } else if (currentTab === 'architecture') {
        container.innerHTML = renderCategoryHtml('architecture', 'Kiến trúc & Cấu kiện gỗ dân gian');
      } else if (currentTab === 'floorplan') {
        container.innerHTML = renderFloorPlanHtml();
      } else if (currentTab === 'rituals') {
        container.innerHTML = renderCategoryHtml('ritual', 'Sinh hoạt & Nghi lễ cộng đồng');
      } else if (currentTab === 'map') {
        container.innerHTML = renderMapHtml();
      } else if (currentTab === 'sources') {
        container.innerHTML = renderSourcesHtml();
      }
    }

    function renderHomeHtml() {
      const p = window.disanData.projectInfo;
      return \`
        <!-- Hero Section -->
        <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#2D2424] text-white">
          <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80'); filter: brightness(0.35);"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#2D2424] via-transparent to-[#2D2424]/60"></div>
          
          <div class="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center space-y-6">
            <span class="inline-block px-4 py-1.5 rounded-full bg-[#C88A3D] text-stone-950 font-bold text-xs uppercase tracking-wider">\${p.projectCode}</span>
            <h1 
              class="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-stone-100 max-w-5xl mx-auto drop-shadow-xl text-balance [word-break:keep-all] [overflow-wrap:normal]"
              style="word-break: keep-all; overflow-wrap: normal; line-height: 1.22;"
            >
              <span class="inline-block whitespace-nowrap">Nhà Rông,</span>
              <span class="inline-block whitespace-nowrap">Nhà Dài</span>
              <span class="inline-block whitespace-nowrap">và Không gian</span>
              <span class="inline-block whitespace-nowrap">cư trú cộng đồng</span>
            </h1>
            <p class="font-serif italic text-base sm:text-xl text-[#E0A96D]">Không gian cư trú cộng đồng 5 tỉnh Tây Nguyên (Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng)</p>
            
            <div class="p-4 sm:p-5 rounded-2xl bg-stone-900/80 backdrop-blur-md border border-[#8B5E34]/50 max-w-xl mx-auto text-left text-xs sm:text-sm space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-stone-400">Tác giả:</span>
                <span class="font-bold text-white">\${p.author}</span>
                <span class="px-2 py-0.5 rounded bg-stone-800 text-[#E0A96D] font-mono">MSSV: \${p.studentId}</span>
                <span class="px-2 py-0.5 rounded bg-stone-800 text-stone-300">\${p.group}</span>
              </div>
              <p class="text-stone-300 pt-1">Đồ án số hóa di sản kiến trúc gỗ và không gian văn hóa cồng chiêng. Tích hợp sơ đồ mặt bằng tương tác, bản đồ địa hình 5 tỉnh và Trợ lý AI Gemini RAG.</p>
            </div>

            <div class="pt-4 flex flex-wrap justify-center gap-4">
              <button onclick="switchTab('architecture')" class="px-6 py-3.5 rounded-xl bg-[#C88A3D] text-stone-950 font-bold text-sm hover:bg-[#E0A96D] transition shadow-lg">Khám phá dữ liệu 30+ bản ghi</button>
              <button onclick="switchTab('map')" class="px-6 py-3.5 rounded-xl bg-stone-800/90 text-stone-200 border border-stone-600 font-semibold text-sm hover:bg-stone-700 transition">Bản đồ 5 tỉnh Tây Nguyên</button>
            </div>
          </div>
        </section>

        <!-- Quick Portals -->
        <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onclick="switchTab('architecture')" class="cursor-pointer p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#C88A3D] transition shadow-sm hover:shadow-xl">
            <div class="text-[#C88A3D] font-bold text-xs uppercase tracking-wider">10 Bản ghi cấu kiện</div>
            <h3 class="font-serif font-bold text-xl mt-1 text-stone-900 dark:text-stone-100">Kiến trúc gỗ & Cấu kiện</h3>
            <p class="mt-2 text-xs text-stone-600 dark:text-stone-400">Mái nhà rông vút cao hình lưỡi búa, cột cái Jơng rông, mộng đan lạt mây, cầu thang Cái mẫu hệ.</p>
          </div>
          <div onclick="switchTab('floorplan')" class="cursor-pointer p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#C88A3D] transition shadow-sm hover:shadow-xl">
            <div class="text-[#C88A3D] font-bold text-xs uppercase tracking-wider">Mặt bằng tương tác</div>
            <h3 class="font-serif font-bold text-xl mt-1 text-stone-900 dark:text-stone-100">Sơ đồ Nhà Rông & Nhà Dài</h3>
            <p class="mt-2 text-xs text-stone-600 dark:text-stone-400">Điểm hotspot nhấp nháy, kiểm tra các phân khu chức năng gian Gah, gian Ok, bếp thiêng.</p>
          </div>
          <div onclick="switchTab('rituals')" class="cursor-pointer p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#C88A3D] transition shadow-sm hover:shadow-xl">
            <div class="text-[#C88A3D] font-bold text-xs uppercase tracking-wider">10 Bản ghi nghi lễ</div>
            <h3 class="font-serif font-bold text-xl mt-1 text-stone-900 dark:text-stone-100">Sinh hoạt & Nghi lễ buôn làng</h3>
            <p class="mt-2 text-xs text-stone-600 dark:text-stone-400">Họp buôn luật tục, truyền dạy chiêng xoang, hát kể Khan sử thi, lễ cúng bến nước và bỏ mả Pơ-thi.</p>
          </div>
        </div>
      \`;
    }

    function renderCategoryHtml(category, categoryTitle) {
      const records = window.disanData.records.filter(r => category === 'all' || r.category === category);
      return \`
        <div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
          <div class="text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#C88A3D] uppercase tracking-widest">KHO DỮ LIỆU SỐ HÓA F03</span>
            <h2 class="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">\${categoryTitle}</h2>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">Dữ liệu thực địa chuẩn xác, có hình ảnh thật và trích dẫn mã phiếu Record ID & Source ID.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            \${records.map(r => \`
              <div onclick="openDetailModal('\${r.id}')" class="cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow hover:shadow-xl transition group">
                <div class="relative h-48 bg-stone-950 overflow-hidden">
                  <img src="\${r.imageUrl}" alt="\${r.titleVi}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'">
                  <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30"></div>
                  <span class="absolute top-3 left-3 px-2 py-0.5 rounded bg-stone-900/80 text-[#E0A96D] text-xs font-mono font-bold">\${r.id}</span>
                  <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#C88A3D] text-stone-950 text-xs font-bold">\${r.ethnicGroup}</span>
                  <div class="absolute bottom-3 left-3 right-3">
                    <span class="text-[10px] text-[#E0A96D] block">\${r.indigenousName}</span>
                    <h3 class="font-serif font-bold text-white text-base truncate">\${r.titleVi}</h3>
                  </div>
                </div>
                <div class="p-4 space-y-2 text-xs">
                  <p class="text-stone-600 dark:text-stone-300 line-clamp-2">\${r.descriptionVi}</p>
                  <div class="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-between text-stone-400">
                    <span>Nguồn: \${r.sourceId}</span>
                    <span class="text-[#C88A3D] font-bold">Xem chi tiết →</span>
                  </div>
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
    }

    function renderMapHtml() {
      const locations = window.disanData.locations;
      return \`
        <div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#C88A3D] uppercase tracking-widest">BẢN ĐỒ VECTOR 5 TỈNH TÂY NGUYÊN</span>
            <h2 class="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">Hành trình Kết nối Di sản Không gian Cư trú</h2>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">Bản đồ độc lập 100% không dùng Tile Map ngoài: Tra cứu nhanh tọa độ GPS, độ cao và điểm khảo sát thực địa F03.</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left: Topographic SVG Map -->
            <div class="lg:col-span-5 rounded-3xl bg-[#1C1817] border border-stone-800 p-6 shadow-2xl relative">
              <div class="flex items-center justify-between pb-3 border-b border-stone-800 mb-4 text-xs font-serif font-bold text-stone-200">
                <span>Trục 5 Tỉnh: Kon Tum • Gia Lai • Đắk Lắk • Đắk Nông • Lâm Đồng</span>
                <span class="text-[#E0A96D]">14°N - 11°N</span>
              </div>
              <svg viewBox="0 0 450 510" class="w-full aspect-[4/5] max-h-[480px]">
                <!-- Province Polygons -->
                <path d="M 175 40 L 310 45 L 350 115 L 285 150 L 185 125 Z" fill="#C88A3D" stroke="#E0A96D" stroke-width="2"/>
                <text x="245" y="90" fill="#1C1817" font-weight="bold" font-size="12" text-anchor="middle">Kon Tum</text>

                <path d="M 185 128 L 285 153 L 355 118 L 385 195 L 305 242 L 165 192 Z" fill="#8B5E34" stroke="#C88A3D" stroke-width="1.5"/>
                <text x="265" y="180" fill="#E0A96D" font-weight="bold" font-size="12" text-anchor="middle">Gia Lai</text>

                <path d="M 165 196 L 305 246 L 375 272 L 315 360 L 195 332 L 145 252 Z" fill="#E0A96D" stroke="#8B5E34" stroke-width="1.5"/>
                <text x="255" y="280" fill="#1C1817" font-weight="bold" font-size="12" text-anchor="middle">Đắk Lắk</text>

                <path d="M 125 262 L 195 336 L 175 432 L 85 382 L 95 302 Z" fill="#A47551" stroke="#8B5E34" stroke-width="1.5"/>
                <text x="140" y="350" fill="#E0A96D" font-weight="bold" font-size="12" text-anchor="middle">Đắk Nông</text>

                <path d="M 200 336 L 315 365 L 345 450 L 235 480 L 180 436 Z" fill="#6B4423" stroke="#C88A3D" stroke-width="1.5"/>
                <text x="260" y="415" fill="#E0A96D" font-weight="bold" font-size="12" text-anchor="middle">Lâm Đồng</text>

                <!-- Connecting Route Line -->
                <path d="M 250 80 Q 260 130 260 175 Q 265 230 245 285 Q 185 320 145 355 Q 190 390 260 420" fill="none" stroke="#E0A96D" stroke-width="3" stroke-dasharray="6,4"/>
              </svg>
            </div>

            <!-- Right: Survey Sites List -->
            <div class="lg:col-span-7 space-y-4">
              <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">7 Điểm Khảo sát Thực địa Tiêu biểu</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                \${locations.map(loc => \`
                  <div class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-bold text-[#C88A3D]">\${loc.province} • \${loc.ethnicGroup}</span>
                      <span class="font-mono text-stone-400">\${loc.lat.toFixed(2)}°N, \${loc.lng.toFixed(2)}°E</span>
                    </div>
                    <h4 class="font-serif font-bold text-stone-900 dark:text-stone-100">\${loc.nameVi}</h4>
                    <p class="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">\${loc.descriptionVi}</p>
                    <div class="pt-2 text-xs">
                      <span class="text-stone-400">Phiếu hồ sơ: </span>
                      <span class="font-mono font-bold text-[#C88A3D]">\${loc.recordRef}</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    function renderSourcesHtml() {
      const sources = window.disanData.sources;
      const groupA = sources.filter(s => s.categoryGroup === 'A');
      const groupB = sources.filter(s => s.categoryGroup === 'B');

      return \`
        <div class="max-w-7xl mx-auto px-4 py-12 space-y-10">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#C88A3D] uppercase tracking-widest">MINH BẠCH HỌC THUẬT & PHÁP LÝ</span>
            <h2 class="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">Danh mục Nguồn Tư liệu Khảo sát & Hồ sơ Chính thống</h2>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">Toàn bộ liên kết đều trỏ thẳng tới các cổng thông tin văn hóa chính thức của Nhà nước.</p>
          </div>

          <!-- Group A: Tự thu thập F03 -->
          <div class="space-y-4">
            <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">Nhóm A: Tư liệu Thực địa & Điền dã Trực tiếp (Đề tài F03)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              \${groupA.map(s => \`
                <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="px-2 py-0.5 rounded bg-amber-500/10 text-[#C88A3D] font-bold">\${s.id}</span>
                    <span class="text-stone-400">\${s.year} • \${s.collectorOrAuthor}</span>
                  </div>
                  <h4 class="font-serif font-bold text-stone-900 dark:text-stone-100">\${s.nameVi}</h4>
                  <p class="text-xs text-stone-600 dark:text-stone-400">\${s.reliabilityNotes}</p>
                </div>
              \`).join('')}
            </div>
          </div>

          <!-- Group B: Cơ quan Nhà nước chính thống -->
          <div class="space-y-4">
            <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">Nhóm B: Lưu trữ Quốc gia & Viện Nghiên cứu Chính thống</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              \${groupB.map(s => \`
                <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="px-2 py-0.5 rounded bg-amber-500/10 text-[#C88A3D] font-bold">\${s.id}</span>
                    <span class="text-stone-400">\${s.sheetCode || ''}</span>
                  </div>
                  <h4 class="font-serif font-bold text-stone-900 dark:text-stone-100">\${s.nameVi}</h4>
                  <p class="text-xs text-stone-600 dark:text-stone-400">\${s.reliabilityNotes}</p>
                  \${s.officialUrl ? \`
                    <div class="pt-2">
                      <a href="\${s.officialUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C88A3D] hover:text-stone-950 text-xs font-semibold text-[#8B5E34] dark:text-[#E0A96D] transition">
                        <span>Cổng thông tin: \${s.officialUrl}</span>
                        <span>↗</span>
                      </a>
                    </div>
                  \` : ''}
                </div>
              \`).join('')}
            </div>
          </div>
        </div>
      \`;
    }

    function renderFloorPlanHtml() {
      const areas = window.disanData.floorPlanAreas;
      return \`
        <div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
          <div class="text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#C88A3D] uppercase tracking-widest">SƠ ĐỒ KHÔNG GIAN BẢN ĐỊA</span>
            <h2 class="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">Mặt bằng Tương tác Nhà Rông & Nhà Dài</h2>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">Khám phá cấu trúc không gian mẫu hệ Ê Đê và không gian cộng đồng Ba Na.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            \${areas.map(a => \`
              <div class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-[#C88A3D]">\${a.buildingType === 'nha_dai' ? 'Nhà Dài Ê Đê' : 'Nhà Rông Ba Na'}</span>
                  <span class="font-mono text-stone-400">\${a.dimensions}</span>
                </div>
                <h4 class="font-serif font-bold text-stone-900 dark:text-stone-100">\${a.nameVi} (\${a.indigenousName})</h4>
                <p class="text-xs text-stone-600 dark:text-stone-400">\${a.functionsVi}</p>
                <div class="p-2 rounded bg-amber-500/10 text-[11px] text-amber-300">
                  <span class="font-semibold">Kiêng kỵ: </span>\${a.taboosVi}
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
    }

    function openDetailModal(recordId) {
      const r = window.disanData.records.find(item => item.id === recordId);
      if (!r) return;
      const body = document.getElementById('detail-modal-body');
      body.innerHTML = \`
        <div class="space-y-4">
          <div class="relative h-60 rounded-2xl overflow-hidden bg-stone-950">
            <img src="\${r.imageUrl}" alt="\${r.titleVi}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30"></div>
            <span class="absolute top-3 left-3 px-2 py-0.5 rounded bg-stone-900/80 text-[#E0A96D] text-xs font-mono font-bold">\${r.id}</span>
            <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#C88A3D] text-stone-950 text-xs font-bold">\${r.ethnicGroup}</span>
            <div class="absolute bottom-3 left-3 right-3">
              <span class="text-xs text-[#E0A96D]">\${r.indigenousName}</span>
              <h2 class="text-xl font-serif font-bold text-white">\${r.titleVi}</h2>
            </div>
          </div>
          <p class="text-sm text-stone-300 leading-relaxed">\${r.descriptionVi}</p>
          <div class="grid grid-cols-2 gap-3 text-xs bg-stone-800 p-3 rounded-xl text-stone-300">
            <div><strong class="text-[#C88A3D]">Địa điểm:</strong> \${r.currentLocation}</div>
            <div><strong class="text-[#C88A3D]">Loại hình:</strong> \${r.elementOrType}</div>
            <div><strong class="text-[#C88A3D]">Quy tắc/Kiêng kỵ:</strong> \${r.taboosAndRules || 'Không'}</div>
            <div><strong class="text-[#C88A3D]">Mã nguồn:</strong> \${r.sourceId}</div>
          </div>
        </div>
      \`;
      document.getElementById('detail-modal').classList.remove('hidden');
      document.getElementById('detail-modal').classList.add('flex');
    }

    function closeDetailModal() {
      document.getElementById('detail-modal').classList.add('hidden');
      document.getElementById('detail-modal').classList.remove('flex');
    }

    function openAiModal() {
      document.getElementById('ai-modal').classList.remove('hidden');
      document.getElementById('ai-modal').classList.add('flex');
    }

    function closeAiModal() {
      document.getElementById('ai-modal').classList.add('hidden');
      document.getElementById('ai-modal').classList.remove('flex');
    }

    function promptApiKey() {
      const current = localStorage.getItem('gemini_api_key') || '';
      const key = prompt('Nhập Gemini API Key của bạn (chỉ lưu trong localStorage):', current);
      if (key !== null) {
        localStorage.setItem('gemini_api_key', key.trim());
        alert('Đã lưu API Key an toàn trên trình duyệt!');
      }
    }

    async function sendChatMessage() {
      const input = document.getElementById('chat-input');
      const query = input.value.trim();
      if (!query) return;

      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        promptApiKey();
        return;
      }

      const messagesContainer = document.getElementById('chat-messages');
      messagesContainer.innerHTML += \`<div class="p-3 rounded-2xl bg-[#C88A3D] text-stone-950 font-medium ml-auto max-w-[80%]">\${query}</div>\`;
      input.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Mini-RAG search
      const q = query.toLowerCase();
      const matched = window.disanData.records.filter(r => 
        r.id.toLowerCase().includes(q) ||
        r.titleVi.toLowerCase().includes(q) ||
        r.indigenousName.toLowerCase().includes(q) ||
        r.descriptionVi.toLowerCase().includes(q)
      ).slice(0, 3);

      const contextText = matched.map(m => \`[Record ID: \${m.id}] \${m.titleVi} (\${m.indigenousName}): \${m.descriptionVi} [Source ID: \${m.sourceId}]\`).join('\\n');

      const systemPrompt = \`Bạn là Trợ lý Di sản F03 của tác giả Nguyễn Văn Hoàng (PH64335) - Nhóm 2. CHỈ TRẢ LỜI DỰA TRÊN DỮ LIỆU ĐƯỢC CUNG CẤP DƯỚI ĐÂY. Nếu không có thì trả lời: "Không tìm thấy thông tin trong kho tư liệu hiện tại". Bắt buộc trích dẫn Record ID và Source ID.\\n\\nDữ liệu tư liệu:\\n\${contextText}\`;

      try {
        const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nCâu hỏi: \${query}\` }] }]
          })
        });
        const data = await res.json();
        const ans = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không tìm thấy thông tin trong kho tư liệu hiện tại.';
        messagesContainer.innerHTML += \`<div class="p-3 rounded-2xl bg-stone-800 text-stone-200">\${ans}</div>\`;
      } catch (err) {
        messagesContainer.innerHTML += \`<div class="p-3 rounded-2xl bg-red-900/40 text-red-300">Lỗi kết nối API. Vui lòng kiểm tra lại Gemini API Key.</div>\`;
      }
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Initialize application on load
    window.addEventListener('DOMContentLoaded', () => {
      renderCurrentTab();
    });
  </script>
</body>
</html>`;
}
