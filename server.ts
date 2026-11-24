import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';

const PORT = Number(process.env.PORT) || 3000;
const PRIMARY_GEMINI_MODEL = 'gemini-4-hydrogen';
const CANDIDATE_MODELS = [
  PRIMARY_GEMINI_MODEL,
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
];

interface KeyEntry {
  key: string;
  source: 'GEMINI_API_KEY' | 'Gemini_key_api';
  keyType: 'AQ_ACCOUNT_BOUND' | 'AIZA_AI_STUDIO' | 'OTHER';
}

interface WorkingRoute {
  key: string;
  source: KeyEntry['source'];
  vertex: boolean;
  apiVersion?: string;
  model: string;
}

let cachedWorkingRoute: WorkingRoute | null = null;

function classifyKeyType(apiKey: string): KeyEntry['keyType'] {
  if (apiKey.startsWith('AQ.')) return 'AQ_ACCOUNT_BOUND';
  if (apiKey.startsWith('AIza')) return 'AIZA_AI_STUDIO';
  return 'OTHER';
}

function redactSecrets(text: string): string {
  return text.replace(/(AIza[0-9A-Za-z_-]{15,}|AQ\.[0-9A-Za-z._-]{15,})/g, '[REDACTED]');
}

function getConfiguredKeys(): KeyEntry[] {
  const candidates: Array<{ raw?: string; source: KeyEntry['source'] }> = [
    { raw: process.env.GEMINI_API_KEY, source: 'GEMINI_API_KEY' },
    { raw: process.env.Gemini_key_api, source: 'Gemini_key_api' },
  ];

  const entries: KeyEntry[] = [];
  const seen = new Set<string>();

  for (const item of candidates) {
    const trimmed = item.raw?.trim() || '';
    if (!trimmed || trimmed === 'MY_GEMINI_API_KEY' || seen.has(trimmed)) {
      continue;
    }
    seen.add(trimmed);
    entries.push({
      key: trimmed,
      source: item.source,
      keyType: classifyKeyType(trimmed),
    });
  }

  return entries;
}

function createGeminiClient(apiKey: string, useVertexExpress: boolean, apiVersion?: string): GoogleGenAI {
  return new GoogleGenAI({
    ...(useVertexExpress ? { vertexai: true } : {}),
    ...(apiVersion ? { apiVersion } : {}),
    apiKey,
    httpOptions: {
      timeout: 15000,
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function isAuthError(errStatus: number | undefined, msg: string): boolean {
  return (
    errStatus === 401 ||
    errStatus === 403 ||
    msg.includes('UNAUTHENTICATED') ||
    msg.includes('PERMISSION_DENIED') ||
    msg.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED') ||
    msg.includes('API_KEY_INVALID') ||
    msg.includes('API key not valid')
  );
}

function errorPriority(error: unknown): number {
  const errObj = error as { status?: number; message?: string };
  const status = typeof errObj?.status === 'number' ? errObj.status : 0;
  const msg = errObj?.message || '';
  if (status === 503 || msg.includes('UNAVAILABLE')) return 5;
  if (status === 429 || msg.includes('RESOURCE_EXHAUSTED')) return 4;
  if (status === 404 || msg.includes('NOT_FOUND')) return 3;
  if (status === 403 || msg.includes('PERMISSION_DENIED')) return 2;
  if (status === 401 || msg.includes('UNAUTHENTICATED')) return 1;
  return 3;
}

function buildSystemInstruction(lang: 'vi' | 'en'): string {
  if (lang === 'en') {
    return `You are the Digital Heritage Specialist for Central Highlands Project F03 authored by Nguyen Van Hoang (PH64335) - Group 2.
YOU ARE STRICTLY REQUIRED TO ANSWER SOLELY BASED ON THE ARCHIVAL DATA PROVIDED BELOW.
Never extrapolate, hallucinate, or fabricate information outside the provided repository.
If the information cannot be found in the provided archival dataset, you MUST reply verbatim: "Không tìm thấy thông tin trong kho tư liệu hiện tại" (or in English: "No relevant information found in the current archival repository").
EVERY ANSWER MUST EXPLICITLY CITE the Record ID (e.g. [REC-KT01]) and Source ID (e.g. [SRC-01]). Maintain a refined, academic museum tone.`;
  }

  return `Bạn là Chuyên gia Di sản Số học Tây Nguyên thuộc đề tài F03 của tác giả Nguyễn Văn Hoàng (PH64335) - Nhóm 2.
BẠN CHỈ ĐƯỢC PHÉP TRẢ LỜI DỰA TRÊN DỮ LIỆU TƯ LIỆU ĐƯỢC CUNG CẤP DƯỚI ĐÂY.
Tuyệt đối không tự suy diễn hoặc bịa đặt thông tin ngoài kho tư liệu.
Nếu trong dữ liệu cung cấp không có thông tin cần tìm, bạn BẮT BUỘC trả lời chính xác câu: "Không tìm thấy thông tin trong kho tư liệu hiện tại".
MỌI CÂU TRẢ LỜI BẮT BUỘC PHẢI TRÍCH DẪN RÕ RÀNG Record ID (ví dụ: [REC-KT01]) và Source ID (ví dụ: [SRC-01]). Trình bày mạch lạc, sang trọng, đúng phong cách bảo tàng số.`;
}

function parseApiError(error: unknown): { status: number; message: string; code: string } {
  const errObj = error as { status?: number; message?: string };
  const rawMsg = redactSecrets(errObj?.message || 'Lỗi kết nối Gemini API.');
  const numericStatus = typeof errObj?.status === 'number' ? errObj.status : 0;
  console.error('[Gemini API Error]', { status: numericStatus, message: rawMsg });

  if (numericStatus === 503 || rawMsg.includes('503') || rawMsg.includes('UNAVAILABLE')) {
    return {
      status: 503,
      code: 'GEMINI_MODEL_OVERLOADED',
      message: 'Mô hình Gemini đang quá tải tạm thời (503). Vui lòng thử gửi lại sau vài giây.',
    };
  }

  if (
    numericStatus === 401 ||
    rawMsg.includes('401') ||
    rawMsg.includes('UNAUTHENTICATED') ||
    rawMsg.includes('API_KEY_INVALID') ||
    rawMsg.includes('API key not valid') ||
    rawMsg.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED')
  ) {
    return {
      status: 401,
      code: 'GEMINI_AUTH_ERROR',
      message: 'API key không hợp lệ hoặc không được endpoint hỗ trợ. Vui lòng kiểm tra lại cấu hình GEMINI_API_KEY trong Settings > Secrets.',
    };
  }

  if (numericStatus === 403 || rawMsg.includes('403') || rawMsg.includes('PERMISSION_DENIED')) {
    return {
      status: 403,
      code: 'GEMINI_PERMISSION_DENIED',
      message: 'API key không có quyền truy cập dịch vụ hoặc model Gemini. Vui lòng kiểm tra lại key trong Settings > Secrets.',
    };
  }

  if (numericStatus === 404 || rawMsg.includes('404') || rawMsg.includes('NOT_FOUND')) {
    return {
      status: 404,
      code: 'GEMINI_MODEL_NOT_FOUND',
      message: `Không tìm thấy model khả dụng (${CANDIDATE_MODELS.join(', ')}). Vui lòng kiểm tra lại cấu hình API.`,
    };
  }

  if (numericStatus === 429 || rawMsg.includes('429') || rawMsg.includes('RESOURCE_EXHAUSTED')) {
    return {
      status: 429,
      code: 'GEMINI_QUOTA_EXCEEDED',
      message: 'Đã vượt giới hạn lượt gọi Gemini API (429). Vui lòng thử lại sau ít phút hoặc kiểm tra hạn mức API key.',
    };
  }

  return {
    status: numericStatus >= 400 && numericStatus < 600 ? numericStatus : 502,
    code: 'GEMINI_UPSTREAM_ERROR',
    message: rawMsg,
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/gemini/health', (_req: Request, res: Response) => {
    const keys = getConfiguredKeys();
    const primary = keys[0];

    res.json({
      ok: true,
      model: cachedWorkingRoute?.model || PRIMARY_GEMINI_MODEL,
      configured: keys.length > 0,
      keyType: primary?.keyType || 'NONE',
      authMode: cachedWorkingRoute
        ? cachedWorkingRoute.vertex
          ? 'vertex_ai_express'
          : 'gemini_developer_api'
        : primary?.keyType === 'AQ_ACCOUNT_BOUND'
          ? 'aq_auto_negotiate'
          : primary
            ? 'gemini_developer_api'
            : 'unconfigured',
      sources: keys.map((k) => k.source),
    });
  });

  app.post('/api/gemini/rag', async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        query?: unknown;
        lang?: unknown;
        contextChunks?: unknown;
      };

      const query = typeof body?.query === 'string' ? body.query.trim() : '';
      if (!query || query.length > 1500) {
        res.status(400).json({
          error: 'Câu hỏi không hợp lệ (cần từ 1 đến 1500 ký tự).',
          code: 'INVALID_QUERY',
        });
        return;
      }

      const lang: 'vi' | 'en' = body?.lang === 'en' ? 'en' : 'vi';
      const rawChunks = Array.isArray(body?.contextChunks) ? body.contextChunks : [];
      const contextChunks = rawChunks
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        .slice(0, 8)
        .map((chunk) => chunk.slice(0, 4000));

      const keys = getConfiguredKeys();
      if (keys.length === 0) {
        res.status(503).json({
          error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng thiết lập API key trong Settings > Secrets để sử dụng Hỏi đáp AI.',
          code: 'API_KEY_MISSING',
        });
        return;
      }

      const contextText = contextChunks.length > 0
        ? contextChunks.join('\n\n---\n\n')
        : 'Không có dữ liệu phù hợp được trích xuất.';

      const promptText = `KHO DỮ LIỆU TƯ LIỆU TRÍCH XUẤT (CONTEXT):
${contextText}

---
CÂU HỎI CỦA NGƯỜI DÙNG:
${query}

HÃY TRẢ LỜI DỰA THEO HƯỚNG DẪN HỆ THỐNG (BẮT BUỘC TRÍCH DẪN RECORD ID VÀ SOURCE ID):`;

      type TryResult =
        | { status: 'ok'; answer: string; route: WorkingRoute }
        | { status: 'auth_failed' | 'model_failed' };

      const preferVertex = process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true';
      const attemptLogs: string[] = [];
      let successResult: { answer: string; route: WorkingRoute } | null = null;
      let bestError: unknown = null;

      const tryRoute = async (route: WorkingRoute): Promise<TryResult> => {
        try {
          const ai = createGeminiClient(route.key, route.vertex, route.apiVersion);
          const result = await ai.models.generateContent({
            model: route.model,
            contents: promptText,
            config: {
              systemInstruction: buildSystemInstruction(lang),
              temperature: 0.1,
            },
          });
          cachedWorkingRoute = route;
          return {
            status: 'ok',
            answer: result.text?.trim() || '',
            route,
          };
        } catch (err: unknown) {
          if (!bestError || errorPriority(err) >= errorPriority(bestError)) {
            bestError = err;
          }
          const errStatus = (err as { status?: number })?.status;
          const msg = redactSecrets((err as { message?: string })?.message || '');
          const epTag = `${route.source}_${route.vertex ? 'vertex' : 'dev'}`;
          attemptLogs.push(`${epTag}[${route.model}]: ${errStatus || 'ERR'} ${msg.slice(0, 160)}`);
          return { status: isAuthError(errStatus, msg) ? 'auth_failed' : 'model_failed' };
        }
      };

      // 1. Fast path: try cached working endpoint/model first
      if (cachedWorkingRoute && keys.some((k) => k.key === cachedWorkingRoute?.key)) {
        const cached = cachedWorkingRoute;
        const attempt = await tryRoute(cached);
        if (attempt.status === 'ok') {
          successResult = { answer: attempt.answer, route: attempt.route };
        } else if (attempt.status === 'auth_failed') {
          cachedWorkingRoute = null;
        } else {
          // Endpoint is authenticated! Try other models on the exact same endpoint first.
          for (const model of CANDIDATE_MODELS) {
            if (model === cached.model) continue;
            const resModel = await tryRoute({ ...cached, model });
            if (resModel.status === 'ok') {
              successResult = { answer: resModel.answer, route: resModel.route };
              break;
            }
            if (resModel.status === 'auth_failed') break;
          }
        }
      }

      // 2. Discovery path if not resolved via cache
      if (!successResult) {
        outer: for (const entry of keys) {
          const endpoints: Array<{ vertex: boolean; apiVersion?: string; tag: string }> =
            preferVertex
              ? [
                  { vertex: true, apiVersion: 'v1', tag: 'vertex_v1' },
                  { vertex: true, apiVersion: 'v1beta1', tag: 'vertex_v1beta1' },
                  { vertex: false, tag: 'dev_v1beta' },
                ]
              : [
                  { vertex: false, tag: 'dev_v1beta' },
                  { vertex: true, apiVersion: 'v1', tag: 'vertex_v1' },
                ];

          for (const ep of endpoints) {
            let endpointAuthenticated = false;
            for (const model of CANDIDATE_MODELS) {
              const attempt = await tryRoute({
                key: entry.key,
                source: entry.source,
                vertex: ep.vertex,
                apiVersion: ep.apiVersion,
                model,
              });

              if (attempt.status === 'ok') {
                successResult = { answer: attempt.answer, route: attempt.route };
                break outer;
              }
              if (attempt.status === 'auth_failed') {
                break;
              }
              // model_failed (404 / 503 / 429) proves this endpoint authenticated the key
              endpointAuthenticated = true;
            }

            // If Developer API already authenticated this key, don't try Vertex Express for the same key
            if (endpointAuthenticated && !ep.vertex) {
              break;
            }
          }
        }
      }

      if (!successResult) {
        console.error('[Gemini RAG Failed Attempts]', attemptLogs);
        const parsed = parseApiError(bestError);
        res.status(parsed.status).json({
          error: parsed.message,
          code: parsed.code,
        });
        return;
      }

      if (!successResult.answer) {
        res.status(502).json({
          error: 'Mô hình Gemini không trả về nội dung phản hồi.',
          code: 'EMPTY_RESPONSE',
        });
        return;
      }

      res.json({
        answer: successResult.answer,
        model: successResult.route.model,
      });
    } catch (error: unknown) {
      const parsed = parseApiError(error);
      res.status(parsed.status).json({
        error: parsed.message,
        code: parsed.code,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(import.meta.dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (Primary Gemini model: ${PRIMARY_GEMINI_MODEL})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
