export interface HeritageRecord {
  id: string; // e.g., REC-KT01
  category: 'architecture' | 'space' | 'ritual';
  titleVi: string;
  titleEn: string;
  indigenousName: string;
  elementOrType: string;
  culturalRegion: string;
  ethnicGroup: 'Ba Na' | 'Ê Đê' | 'Gia Rai' | 'M\'Nông' | 'Xơ Đăng';
  currentLocation: string;
  historicalLocation: string;
  descriptionVi: string;
  descriptionEn: string;
  architecturalRole?: string;
  dimensionOrMaterial?: string;
  taboosAndRules?: string;
  activityType?: string;
  context?: string;
  isRealRitual?: boolean;
  recordingDate?: string;
  permissionStatus?: string;
  usageScope?: string;
  unreleasedNotes?: string;
  informantName?: string;
  informantAge?: number;
  informantRole?: string;
  sourceId: string;
  imageUrl: string;
  audioTextVi: string;
  audioTextEn: string;
}

export interface HeritageSource {
  id: string; // SRC-01
  nameVi: string;
  nameEn: string;
  organizationVi: string;
  organizationEn: string;
  type: string;
  year: number;
  reliability: number; // 1-5
  descriptionVi: string;
  descriptionEn: string;
  citationNotice: string;
  officialUrl?: string; // official working hyperlink
  categoryGroup: 'institutional' | 'field'; // Group A: field, Group B: institutional
  sheetCode: string; // Formal archive sheet code e.g. PTT-F03/01 or HS-DSVH/2021
}

export interface FloorPlanArea {
  id: string;
  buildingType: 'nha_rong' | 'nha_dai';
  nameVi: string;
  nameEn: string;
  indigenousName: string;
  x: number; // percentage on SVG
  y: number; // percentage on SVG
  dimensions: string;
  functionsVi: string;
  functionsEn: string;
  customsVi: string;
  customsEn: string;
  rulesVi: string;
  rulesEn: string;
  taboosVi: string;
  taboosEn: string;
  sourceId: string;
  recordId: string;
  imageUrl: string;
}

export interface HeritageLocation {
  id: string;
  nameVi: string;
  nameEn: string;
  province: string;
  lat: number;
  lng: number;
  ethnicGroup: string;
  heritageType: string;
  descriptionVi: string;
  descriptionEn: string;
  imageUrl: string;
  recordRef: string;
}

export interface TimelineMilestone {
  year: string;
  titleVi: string;
  titleEn: string;
  periodVi: string;
  periodEn: string;
  descriptionVi: string;
  descriptionEn: string;
  historicalSignificanceVi: string;
  historicalSignificanceEn: string;
  sourceId: string;
}

export interface GalleryItem {
  id: string;
  titleVi: string;
  titleEn: string;
  category: 'rong' | 'dai' | 'gong' | 'ritual';
  imageUrl: string;
  locationVi: string;
  ethnicGroup: string;
  photographerOrSource: string;
}
