import { architectureRecords } from './recordsArchitecture';
import { spaceRecords } from './recordsSpace';
import { ritualRecords } from './recordsRitual';
import { heritageSources } from './sources';
import { floorPlanAreas } from './floorPlanData';
import { heritageLocations } from './locations';
import { timelineMilestones } from './timelineData';
import { galleryItems } from './galleryData';
import { HeritageRecord, HeritageSource, FloorPlanArea, HeritageLocation, TimelineMilestone, GalleryItem } from './types';

export interface FullHeritageData {
  projectInfo: {
    titleVi: string;
    titleEn: string;
    projectCode: string;
    culturalRegionVi: string;
    culturalRegionEn: string;
    author: string;
    studentId: string;
    group: string;
    academicYear: string;
    advisorVi: string;
    advisorEn: string;
  };
  records: HeritageRecord[];
  sources: HeritageSource[];
  floorPlanAreas: FloorPlanArea[];
  locations: HeritageLocation[];
  timeline: TimelineMilestone[];
  gallery: GalleryItem[];
}

export const disanData: FullHeritageData = {
  projectInfo: {
    titleVi: 'Nhà Rông, Nhà Dài và Không gian cư trú cộng đồng',
    titleEn: 'Rong House, Longhouse and Communal Living Spaces',
    projectCode: 'F03 - Vùng văn hóa Tây Nguyên',
    culturalRegionVi: 'Vùng văn hóa Tây Nguyên (Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng)',
    culturalRegionEn: 'Central Highlands Cultural Region (Vietnam)',
    author: 'Nguyễn Văn Hoàng',
    studentId: 'PH64335',
    group: 'Nhóm 2',
    academicYear: '2024 - 2026',
    advisorVi: 'Khoa Di sản Văn hóa & Truyền thông Đa phương tiện',
    advisorEn: 'Faculty of Cultural Heritage & Multimedia'
  },
  records: [...architectureRecords, ...spaceRecords, ...ritualRecords],
  sources: heritageSources,
  floorPlanAreas: floorPlanAreas,
  locations: heritageLocations,
  timeline: timelineMilestones,
  gallery: galleryItems
};

export default disanData;
