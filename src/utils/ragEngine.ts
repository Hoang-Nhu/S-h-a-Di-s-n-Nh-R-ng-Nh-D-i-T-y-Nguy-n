import { disanData } from '../data/disanData';
import { HeritageRecord, HeritageSource } from '../data/types';

export interface RagSearchResult {
  answer: string;
  citedRecords: HeritageRecord[];
  citedSources: HeritageSource[];
  contextChunks: string[];
}

/**
 * Mini RAG search across disanData records and sources
 */
export function retrieveRelevantContext(query: string, maxResults = 5) {
  const normalizedQuery = query.toLowerCase().trim();
  const tokens = normalizedQuery.split(/\s+/).filter(t => t.length > 1);

  const scoredRecords = disanData.records.map(rec => {
    let score = 0;
    const textBlob = `${rec.id} ${rec.indigenousName} ${rec.titleVi} ${rec.titleEn} ${rec.ethnicGroup} ${rec.currentLocation} ${rec.descriptionVi} ${rec.descriptionEn} ${rec.taboosAndRules || ''} ${rec.activityType || ''} ${rec.architecturalRole || ''}`.toLowerCase();

    // Check exact id match
    if (normalizedQuery.includes(rec.id.toLowerCase())) score += 100;

    // Check indigenous name
    if (rec.indigenousName && normalizedQuery.includes(rec.indigenousName.toLowerCase())) score += 50;

    // Token frequency
    tokens.forEach(token => {
      if (textBlob.includes(token)) {
        score += 5;
        // High bonus if found in title or ethnic group
        if (rec.titleVi.toLowerCase().includes(token) || rec.ethnicGroup.toLowerCase().includes(token)) {
          score += 15;
        }
      }
    });

    return { record: rec, score };
  });

  scoredRecords.sort((a, b) => b.score - a.score);
  const topRecords = scoredRecords.filter(item => item.score > 0).slice(0, maxResults).map(i => i.record);

  // If query is broad, return top 3 default relevant records
  const finalRecords = topRecords.length > 0 ? topRecords : disanData.records.slice(0, 3);

  // Find associated sources
  const sourceIds = Array.from(new Set(finalRecords.map(r => r.sourceId)));
  const matchedSources = disanData.sources.filter(s => sourceIds.includes(s.id));

  // Build context chunks
  const contextChunks = finalRecords.map(rec => {
    const src = disanData.sources.find(s => s.id === rec.sourceId);
    return `[Record ID: ${rec.id}]
- Tên tiếng Việt: ${rec.titleVi}
- Tên bản địa: ${rec.indigenousName}
- Dân tộc: ${rec.ethnicGroup}
- Loại hình: ${rec.category} (${rec.elementOrType})
- Địa phương: ${rec.currentLocation}
- Mô tả: ${rec.descriptionVi}
- Quy tắc & Kiêng kỵ: ${rec.taboosAndRules || 'Không ghi nhận kiêng kỵ đặc biệt'}
${rec.informantName ? `- Người cung cấp thông tin: ${rec.informantName} (${rec.informantAge} tuổi, ${rec.informantRole})` : ''}
${rec.unreleasedNotes ? `- Ghi chú bảo mật/không công bố: ${rec.unreleasedNotes}` : ''}
- Nguồn tư liệu: [Source ID: ${rec.sourceId}] - ${src?.nameVi || 'Tư liệu F03'}`;
  });

  return {
    records: finalRecords,
    sources: matchedSources,
    contextChunks
  };
}

/**
 * Call Gemini API using RAG with provided API Key
 */
export async function askGeminiRag(query: string, apiKey: string, lang: 'vi' | 'en' = 'vi'): Promise<RagSearchResult> {
  const retrieval = retrieveRelevantContext(query);

  const contextText = retrieval.contextChunks.join('\n\n---\n\n');

  const systemInstructionVi = `Bạn là Chuyên gia Di sản Số học Tây Nguyên thuộc đề tài F03 của tác giả Nguyễn Văn Hoàng (PH64335) - Nhóm 2.
BẠN CHỈ ĐƯỢC PHÉP TRẢ LỜI DỰA TRÊN DỮ LIỆU TƯ LIỆU ĐƯỢC CUNG CẤP DƯỚI ĐÂY.
Tuyệt đối không tự suy diễn hoặc bịa đặt thông tin ngoài kho tư liệu.
Nếu trong dữ liệu cung cấp không có thông tin cần tìm, bạn BẮT BUỘC trả lời chính xác câu: "Không tìm thấy thông tin trong kho tư liệu hiện tại".
MỌI CÂU TRẢ LỜI BẮT BUỘC PHẢI TRÍCH DẪN RÕ RÀNG Record ID (ví dụ: [REC-KT01]) và Source ID (ví dụ: [SRC-01]). Trình bày mạch lạc, sang trọng, đúng phong cách bảo tàng số.`;

  const systemInstructionEn = `You are the Digital Heritage Specialist for Central Highlands Project F03 authored by Nguyen Van Hoang (PH64335) - Group 2.
YOU ARE STRICTLY REQUIRED TO ANSWER SOLELY BASED ON THE ARCHIVAL DATA PROVIDED BELOW.
Never extrapolate, hallucinate, or fabricate information outside the provided repository.
If the information cannot be found in the provided archival dataset, you MUST reply verbatim: "Không tìm thấy thông tin trong kho tư liệu hiện tại" (or in English: "No relevant information found in the current archival repository").
EVERY ANSWER MUST EXPLICITLY CITE the Record ID (e.g. [REC-KT01]) and Source ID (e.g. [SRC-01]). Maintain a refined, academic museum tone.`;

  const systemInstruction = lang === 'vi' ? systemInstructionVi : systemInstructionEn;

  const promptText = `KHO DỮ LIỆU TƯ LIỆU TRÍCH XUẤT (CONTEXT):
${contextText}

---
CÂU HỎI CỦA NGƯỜI DÙNG:
${query}

HÃY TRẢ LỜI DỰA THEO HƯỚNG DẪN HỆ THỐNG (BẮT BUỘC TRÍCH DẪN RECORD ID VÀ SOURCE ID):`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\n${promptText}` }]
          }
        ],
        generationConfig: {
          temperature: 0.1, // very low temperature to guarantee groundedness
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMsg = errData.error?.message || `Lỗi API (${response.status})`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Không nhận được nội dung phản hồi từ mô hình.');
    }

    return {
      answer: candidateText,
      citedRecords: retrieval.records,
      citedSources: retrieval.sources,
      contextChunks: retrieval.contextChunks
    };
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || 'Không thể kết nối đến Gemini API. Vui lòng kiểm tra API Key và đường truyền.');
  }
}
