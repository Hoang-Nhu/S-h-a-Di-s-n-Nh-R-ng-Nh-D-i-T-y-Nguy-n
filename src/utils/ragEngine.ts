import { disanData } from '../data/disanData';
import { HeritageRecord, HeritageSource } from '../data/types';

export interface RagSearchResult {
  answer: string;
  model?: string;
  citedRecords: HeritageRecord[];
  citedSources: HeritageSource[];
  contextChunks: string[];
}

/**
 * Mini RAG search across disanData records and sources
 */
export function retrieveRelevantContext(query: string, maxResults = 5) {
  const normalizedQuery = query.toLowerCase().trim();
  const tokens = normalizedQuery
    .replace(/[?!.,;:()"'“”]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);

  const scoredRecords = disanData.records.map((rec) => {
    let score = 0;
    const textBlob = `${rec.id} ${rec.indigenousName} ${rec.titleVi} ${rec.titleEn} ${rec.ethnicGroup} ${rec.currentLocation} ${rec.descriptionVi} ${rec.descriptionEn} ${rec.taboosAndRules || ''} ${rec.activityType || ''} ${rec.architecturalRole || ''}`.toLowerCase();

    // Check exact id match
    if (normalizedQuery.includes(rec.id.toLowerCase())) score += 100;

    // Check indigenous name
    if (rec.indigenousName && normalizedQuery.includes(rec.indigenousName.toLowerCase())) score += 50;

    // Token frequency
    tokens.forEach((token) => {
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
  const topRecords = scoredRecords.filter((item) => item.score > 0).slice(0, maxResults).map((i) => i.record);

  // If query is broad, return top 3 default relevant records
  const finalRecords = topRecords.length > 0 ? topRecords : disanData.records.slice(0, 3);

  // Find associated sources
  const sourceIds = Array.from(new Set(finalRecords.map((r) => r.sourceId)));
  const matchedSources = disanData.sources.filter((s) => sourceIds.includes(s.id));

  // Build context chunks
  const contextChunks = finalRecords.map((rec) => {
    const src = disanData.sources.find((s) => s.id === rec.sourceId);
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
    contextChunks,
  };
}

/**
 * Query server-side Gemini 2.5 Flash RAG endpoint (/api/gemini/rag)
 */
export async function askGeminiRag(query: string, lang: 'vi' | 'en' = 'vi'): Promise<RagSearchResult> {
  const retrieval = retrieveRelevantContext(query);

  const response = await fetch('/api/gemini/rag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      lang,
      contextChunks: retrieval.contextChunks,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    answer?: string;
    model?: string;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || `Lỗi máy chủ (${response.status})`);
  }

  if (!data.answer) {
    throw new Error('Không nhận được nội dung phản hồi từ mô hình Gemini.');
  }

  return {
    answer: data.answer,
    model: data.model,
    citedRecords: retrieval.records,
    citedSources: retrieval.sources,
    contextChunks: retrieval.contextChunks,
  };
}
