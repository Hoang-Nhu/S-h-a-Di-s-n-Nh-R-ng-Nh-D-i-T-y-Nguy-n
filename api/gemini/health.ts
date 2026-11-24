interface ApiRequest {
  method?: string;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
  end: (chunk?: string) => void;
}

type KeySource = 'GEMINI_API_KEY' | 'Gemini_key_api';
type KeyType = 'AQ_ACCOUNT_BOUND' | 'AIZA_AI_STUDIO' | 'OTHER';

interface KeyEntry {
  key: string;
  source: KeySource;
  keyType: KeyType;
}

const PRIMARY_GEMINI_MODEL = 'gemini-4-hydrogen';

function classifyKeyType(apiKey: string): KeyType {
  if (apiKey.startsWith('AQ.')) return 'AQ_ACCOUNT_BOUND';
  if (apiKey.startsWith('AIza')) return 'AIZA_AI_STUDIO';
  return 'OTHER';
}

function getConfiguredKeys(): KeyEntry[] {
  const candidates: Array<{ raw?: string; source: KeySource }> = [
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

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({
      error: 'Method Not Allowed',
      code: 'METHOD_NOT_ALLOWED',
    });
    return;
  }

  const keys = getConfiguredKeys();
  const primary = keys[0];

  res.status(200).json({
    ok: true,
    model: PRIMARY_GEMINI_MODEL,
    configured: keys.length > 0,
    keyType: primary?.keyType || 'NONE',
    authMode:
      primary?.keyType === 'AQ_ACCOUNT_BOUND'
        ? 'aq_auto_negotiate'
        : primary
          ? 'gemini_developer_api'
          : 'unconfigured',
    sources: keys.map((k) => k.source),
  });
}
