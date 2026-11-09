import { HeritageLocation } from './types';
import { HERITAGE_IMAGES } from './images';

export const heritageLocations: HeritageLocation[] = [
  {
    id: 'LOC-KT01',
    nameVi: 'Làng Kon Kơ Tu & Nhà Rông Ba Na cổ',
    nameEn: 'Kon Ko Tu Village & Ancient Ba Na Rong House',
    province: 'Kon Tum',
    lat: 14.3315,
    lng: 108.0432,
    ethnicGroup: 'Ba Na',
    heritageType: 'Kiến trúc Nhà Rông & Di sản Cồng chiêng',
    descriptionVi: 'Ngôi làng cổ nhất của người Ba Na ven bờ sông Đăk Bla thơ mộng, lưu giữ nhà Rông bằng gỗ cà chít cao 15m với mái hình lưỡi búa vút cao nguyên bản.',
    descriptionEn: 'The oldest Ba Na village along the Dak Bla river, preserving an authentic 15m high ironwood Rong house with traditional thatched roof.',
    imageUrl: HERITAGE_IMAGES.NHA_RONG,
    recordRef: 'REC-KT01'
  },
  {
    id: 'LOC-KT02',
    nameVi: 'Nhà Rông Kon Klor - Biểu tượng Bắc Tây Nguyên',
    nameEn: 'Kon Klor Rong House - North Highland Icon',
    province: 'Kon Tum',
    lat: 14.3512,
    lng: 108.0267,
    ethnicGroup: 'Ba Na',
    heritageType: 'Nhà Rông văn hóa cộng đồng',
    descriptionVi: 'Nhà rông lớn nhất Kon Tum, dài 17m, rộng 6m và mái cao tới 22m, nằm cạnh cầu treo Kon Klor soi bóng bên sông Đăk Bla.',
    descriptionEn: 'The grandest communal hall in Kon Tum: 17m long, 6m wide, and 22m soaring roof towering beside the historic Kon Klor suspension bridge.',
    imageUrl: HERITAGE_IMAGES.KIEN_TRUC_GO,
    recordRef: 'REC-KT08'
  },
  {
    id: 'LOC-GL01',
    nameVi: 'Làng Đê Ktu & Quần thể Kiến trúc Gia Rai Arap',
    nameEn: 'De Ktu Village & Gia Rai Arap Architecture',
    province: 'Gia Lai',
    lat: 14.0042,
    lng: 108.2115,
    ethnicGroup: 'Gia Rai',
    heritageType: 'Kiến trúc Nhà Rông & Tượng Nhà mồ Pơ-thi',
    descriptionVi: 'Nằm tại huyện Mang Yang, bảo lưu hoàn hảo nhà rông truyền thống với vách nứa đan hoa văn quả trám cùng khu tượng nhà mồ Pơ-thi kỳ vĩ.',
    descriptionEn: 'Preserving customary Gia Rai architecture with rhombus-patterned wicker walls and evocative Pothi funerary sculptures.',
    imageUrl: HERITAGE_IMAGES.NHA_RONG,
    recordRef: 'REC-KT05'
  },
  {
    id: 'LOC-DL01',
    nameVi: 'Buôn Akô Dhông - Thủ phủ Nhà Dài mẫu hệ Ê Đê',
    nameEn: 'Ako Dhong Hamlet - Capital of E De Matrilineal Longhouses',
    province: 'Đắk Lắk',
    lat: 12.7011,
    lng: 108.0489,
    ethnicGroup: 'Ê Đê',
    heritageType: 'Quần thể Nhà Dài truyền thống & Cầu thang K\'pan',
    descriptionVi: 'Được mệnh danh là buôn làng đẹp nhất Buôn Ma Thuột với hơn 30 ngôi nhà dài cổ hàng chục mét, rợp bóng cây xanh và tiếng suối Ea Kram róc rách.',
    descriptionEn: 'Known as the most pristine hamlet in Buon Ma Thuot with over 30 traditional longhouses, lush gardens, and living matrilineal customs.',
    imageUrl: HERITAGE_IMAGES.BEP_LUA,
    recordRef: 'REC-KT03'
  },
  {
    id: 'LOC-DL02',
    nameVi: 'Buôn Jun & Không gian cư trú ven hồ Lắk',
    nameEn: 'Jun Village & Matriarchal Living Space by Lake Lak',
    province: 'Đắk Lắk',
    lat: 12.4289,
    lng: 108.1756,
    ethnicGroup: 'M\'Nông',
    heritageType: 'Nhà Dài M\'Nông & Nghề gốm cổ truyền',
    descriptionVi: 'Quần thể nhà sàn dài của người M\'Nông Rlâm soi bóng xuống mặt nước mênh mông của hồ Lắk nguyên sơ, nơi thuần dưỡng voi rừng và gìn giữ kho lúa Sang ba.',
    descriptionEn: 'Traditional M\'Nong Rlam longhouses reflected in pristine Lake Lak, known for elephant stewardship and elevated grain barns.',
    imageUrl: HERITAGE_IMAGES.KIEN_TRUC_GO,
    recordRef: 'REC-KG07'
  },
  {
    id: 'LOC-DN01',
    nameVi: 'Bon R\'lơm - Đắk Song & Không gian Sử thi M\'Nông',
    nameEn: 'Bon R\'lom - Dak Song & M\'Nong Epic Territory',
    province: 'Đắk Nông',
    lat: 12.1833,
    lng: 107.6167,
    ethnicGroup: 'M\'Nông',
    heritageType: 'Nhà Dài truyền thống & Hát kể sử thi Ot Ndrong',
    descriptionVi: 'Cái nôi của bộ sử thi Ot Ndrong đồ sộ với hàng chục vạn câu thơ, lưu giữ không gian sinh hoạt quanh bếp lửa thiêng của đồng bào M\'Nông Preh.',
    descriptionEn: 'Birthplace of monumental Ot Ndrong oral epics, preserving communal fireside storytelling traditions in Dak Nong plateau.',
    imageUrl: HERITAGE_IMAGES.BEP_LUA,
    recordRef: 'REC-NL03'
  },
  {
    id: 'LOC-LD01',
    nameVi: 'Làng Đưng K\'nớ - Dưới chân núi Mẹ Lang Biang',
    nameEn: 'Dung K\'no Hamlet - Beneath Mother Mount Lang Biang',
    province: 'Lâm Đồng',
    lat: 12.0833,
    lng: 108.4333,
    ethnicGroup: 'K\'Ho',
    heritageType: 'Kiến trúc nhà sàn K\'Ho Chil & Đội cồng chiêng sơn cước',
    descriptionVi: 'Không gian cư trú truyền thống của người K\'Ho dưới tán thông ngàn, nơi tiếng chiêng ngân hòa vào điệu hát Tam Pớt trong những đêm sương lạnh.',
    descriptionEn: 'Traditional K\'Ho mountain dwellings under pine canopies, where gongs harmonize with lyrical Tam Pot chants during foggy highland nights.',
    imageUrl: HERITAGE_IMAGES.CONG_CHIENG,
    recordRef: 'REC-NL02'
  }
];
