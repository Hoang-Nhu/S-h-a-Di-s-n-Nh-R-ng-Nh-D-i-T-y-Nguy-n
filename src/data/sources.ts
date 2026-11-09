import { HeritageSource } from './types';

export const heritageSources: HeritageSource[] = [
  // =========================================================================
  // NHÓM B: PHIẾU NGUỒN CÓ SẴN (CƠ QUAN QUỐC GIA & VIỆN NGHIÊN CỨU CHÍNH THỐNG)
  // =========================================================================
  {
    id: 'SRC-01',
    nameVi: 'Cục Di sản Văn hóa - Hồ sơ Di sản Văn hóa Phi vật thể Quốc gia',
    nameEn: 'Department of Cultural Heritage - National Intangible Cultural Heritage Dossier',
    organizationVi: 'Bộ Văn hóa, Thể thao và Du lịch Việt Nam',
    organizationEn: 'Ministry of Culture, Sports and Tourism of Vietnam',
    type: 'Văn bản quy phạm & Hồ sơ khoa học quốc gia',
    year: 2021,
    reliability: 5,
    descriptionVi: 'Hồ sơ pháp lý và tư liệu chuẩn quốc gia về kiến trúc nhà Rông các dân tộc Ba Na, Xơ Đăng và Không gian văn hóa Cồng chiêng Tây Nguyên.',
    descriptionEn: 'Official legal documents and national scientific research dossiers on communal Rong house architecture and Central Highlands cultural space.',
    citationNotice: 'Trích dẫn theo quyết định công nhận và tài liệu khoa học lưu trữ tại Cục Di sản Văn hóa.',
    officialUrl: 'https://dsvh.gov.vn',
    categoryGroup: 'institutional',
    sheetCode: 'HS-QG/DSVH-2021/TN'
  },
  {
    id: 'SRC-02',
    nameVi: 'Bảo tàng Dân tộc học Việt Nam - Bộ sưu tập Kiến trúc Dân gian Ngoài trời',
    nameEn: 'Vietnam Museum of Ethnology - Outdoor Folk Architecture Collection',
    organizationVi: 'Bảo tàng Dân tộc học Việt Nam (Hà Nội)',
    organizationEn: 'Vietnam Museum of Ethnology (Hanoi)',
    type: 'Bản vẽ kỹ thuật, đo đạc thực tế & Hiện vật bảo tàng',
    year: 2018,
    reliability: 5,
    descriptionVi: 'Bộ hồ sơ đo vẽ phục dựng nhà Rông Ba Na (Kon Tum) và nhà Dài Ê Đê (Đắk Lắk) theo tỷ lệ 1:1 ngoài trời, lưu giữ thông số cấu kiện gỗ và kỹ thuật chằng buộc mây tre.',
    descriptionEn: 'Full 1:1 scale architectural drawings, timber joinery specifications, and rattan binding techniques of Ba Na Rong house and Ede Longhouse.',
    citationNotice: 'Tư liệu đo vẽ lưu trữ tại Phòng Trưng bày & Lưu trữ Bảo tàng Dân tộc học Việt Nam.',
    officialUrl: 'https://vme.org.vn',
    categoryGroup: 'institutional',
    sheetCode: 'BV-BTH/KT-2018/1:1'
  },
  {
    id: 'SRC-03',
    nameVi: 'Viện Văn hóa Nghệ thuật Quốc gia Việt Nam (VICAS)',
    nameEn: 'Vietnam National Institute of Culture and Arts Studies (VICAS)',
    organizationVi: 'Viện Văn hóa Nghệ thuật Quốc gia Việt Nam',
    organizationEn: 'Vietnam National Institute of Culture and Arts Studies',
    type: 'Đề tài nghiên cứu khoa học cấp Nhà nước',
    year: 2020,
    reliability: 5,
    descriptionVi: 'Công trình nghiên cứu toàn diện: "Biến đổi không gian cư trú và thiết chế văn hóa buôn làng Tây Nguyên trong bối cảnh hiện đại hóa".',
    descriptionEn: 'Comprehensive scientific monograph on the transformation of living spaces and community institutions in the Central Highlands.',
    citationNotice: 'Mã số đề tài VICAS-TN-2020/09, Chủ nhiệm: PGS.TS. Nguyễn Thị Thu Trang.',
    officialUrl: 'https://vicas.org.vn',
    categoryGroup: 'institutional',
    sheetCode: 'NC-VICAS/TN-2020/09'
  },
  {
    id: 'SRC-04',
    nameVi: 'Bộ Văn hóa, Thể thao và Du lịch & Sở VHTTDL Đắk Lắk - Kon Tum',
    nameEn: 'Ministry of Culture, Sports & Tourism and Provincial Departments',
    organizationVi: 'Bộ Văn hóa, Thể thao và Du lịch (Cổng TTĐT) & Sở VHTTDL địa phương',
    organizationEn: 'Ministry of Culture, Sports and Tourism (Portal) & Local Culture Depts',
    type: 'Báo cáo kiểm kê thực địa cấp tỉnh & Cổng thông tin Bộ',
    year: 2022,
    reliability: 5,
    descriptionVi: 'Số liệu kiểm kê hiện trạng số lượng nhà rông truyền thống tại các huyện Đắk Hà, Sa Thầy, Kon Rẫy và nhà dài mẫu hệ tại TP. Buôn Ma Thuột, huyện Cư M\'gar.',
    descriptionEn: 'Field inventory on the preservation status of traditional Rong houses and matriarchal longhouses across districts.',
    citationNotice: 'Báo cáo số 142/BC-SVHTTDL về hiện trạng thiết chế văn hóa cơ sở vùng đồng bào DTTS.',
    officialUrl: 'https://bvhttdl.gov.vn',
    categoryGroup: 'institutional',
    sheetCode: 'KK-BVHTTDL/BC-142'
  },

  // =========================================================================
  // NHÓM A: PHIẾU TƯ LIỆU TỰ THU THẬP THỰC ĐỊA (ĐỒ ÁN F03)
  // =========================================================================
  {
    id: 'SRC-05',
    nameVi: 'Phiếu khảo sát thực địa kiến trúc dân gian F03',
    nameEn: 'Field Survey Architectural Questionnaire F03',
    organizationVi: 'Nhóm nghiên cứu F03 - Nguyễn Văn Hoàng (PH64335)',
    organizationEn: 'Research Team F03 - Nguyen Van Hoang (PH64335)',
    type: 'Khảo sát thực địa, ảnh chụp độ phân giải cao & Đo vẽ kỹ thuật',
    year: 2024,
    reliability: 5,
    descriptionVi: 'Khảo sát trực tiếp tại làng Kon Kơ Tu (Kon Tum), buôn Akô Dhông (Đắk Lắk), buôn Jun (hồ Lắk), đo đạc chi tiết nhịp cột, độ dốc mái và ghi chép cấu trúc khung gỗ.',
    descriptionEn: 'Direct fieldwork at Kon Ko Tu village, Ako Dhong hamlet, and Jun hamlet: column spans, roof pitches, structural wood photography.',
    citationNotice: 'Hồ sơ khảo sát thực địa Đồ án số hóa di sản F03 - Lưu trữ nhóm nghiên cứu.',
    officialUrl: 'https://dsvh.gov.vn',
    categoryGroup: 'field',
    sheetCode: 'PTT-F03/KT-01'
  },
  {
    id: 'SRC-06',
    nameVi: 'Phiếu phỏng vấn sâu Nghệ nhân Ưu tú A Lăng Blang (Ba Na)',
    nameEn: 'In-depth Interview Record: Meritorious Artisan A Lang Blang (Ba Na)',
    organizationVi: 'Làng Kon Kơ Tu, xã Đắk Rơ Wa, TP. Kon Tum',
    organizationEn: 'Kon Ko Tu Village, Dak Ro Wa Commune, Kon Tum City',
    type: 'Lời kể nhân chứng & Nghệ nhân chế tác kiến trúc truyền thống',
    year: 2024,
    reliability: 5,
    descriptionVi: 'Bản ghi âm 120 phút về kỹ thuật tìm gỗ Cà Chít dựng cột Jơng rông, kỹ thuật bện mây rơm mái vòm hình lưỡi búa và quy tắc ứng xử của nam thanh niên trong nhà Rông.',
    descriptionEn: '120-minute audio interview on sacred timber selection, axe-blade roof weaving, and customary youth etiquette inside the Rong house.',
    citationNotice: 'Biên bản phỏng vấn số PV-01/F03 thực hiện ngày 14/03/2024 tại làng Kon Kơ Tu.',
    officialUrl: 'https://vicas.org.vn',
    categoryGroup: 'field',
    sheetCode: 'PV-F03/NN-BLANG'
  },
  {
    id: 'SRC-07',
    nameVi: 'Phiếu phỏng vấn Già làng Y Kông Niê (Dân tộc Ê Đê)',
    nameEn: 'Elder Interview Record: Village Elder Y Kong Nie (E De)',
    organizationVi: 'Buôn Akô Dhông, phường Tân Lợi, TP. Buôn Ma Thuột',
    organizationEn: 'Ako Dhong Hamlet, Tan Loi Ward, Buon Ma Thuot City',
    type: 'Lời kể nhân chứng, Trưởng buôn truyền thống & Nghệ nhân kể Khan',
    year: 2024,
    reliability: 5,
    descriptionVi: 'Phỏng vấn sâu về chế độ mẫu hệ, biểu tượng bầu ngực mẹ trên cầu thang K\'pan, nghi thức tiếp khách quý tại gian Gah và sự nối dài của căn nhà khi con gái lấy chồng.',
    descriptionEn: 'In-depth interview on matrilineal social structure, maternal breast motifs on stairs, guest reception etiquette at Gah space.',
    citationNotice: 'Biên bản phỏng vấn số PV-02/F03 thực hiện ngày 18/03/2024 tại buôn Akô Dhông.',
    officialUrl: 'https://vme.org.vn',
    categoryGroup: 'field',
    sheetCode: 'PV-F03/GL-YKONG'
  }
];
