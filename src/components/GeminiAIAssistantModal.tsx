import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Key, Send, AlertTriangle, ShieldCheck, X, RefreshCw, Layers, BookOpen, ExternalLink, Bot, User } from 'lucide-react';
import { askGeminiRag, RagSearchResult } from '../utils/ragEngine';
import { HeritageRecord } from '../data/types';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  result?: RagSearchResult;
  timestamp: string;
}

interface GeminiAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
  onSelectRecord: (r: HeritageRecord) => void;
  isEmbedded?: boolean;
}

export const GeminiAIAssistantModal: React.FC<GeminiAIAssistantModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectRecord,
  isEmbedded = false
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [keyInput, setKeyInput] = useState<string>('');
  const [queryInput, setQueryInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: lang === 'vi'
        ? 'Xin chào! Tôi là Trợ lý Di sản Số học Tây Nguyên (Đề tài F03). Tôi hoạt động theo cơ chế RAG mini, chỉ trả lời dựa trên 30+ bản ghi và 7 nguồn tư liệu được cung cấp và bắt buộc trích dẫn Record ID cùng Source ID. Bạn muốn tìm hiểu gì về Nhà Rông, Nhà Dài hay các nghi lễ cao nguyên?'
        : 'Welcome! I am the Central Highlands Digital Heritage Assistant (Project F03). Operating with mini RAG, I answer strictly based on our 30+ verified records and 7 archival sources with mandatory Record ID and Source ID citations. How may I assist your research?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showRagContext, setShowRagContext] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load API Key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setKeyInput(savedKey);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    if (!keyInput.trim()) return;
    localStorage.setItem('gemini_api_key', keyInput.trim());
    setApiKey(keyInput.trim());
    setShowKeyModal(false);
    setErrorMsg(null);
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setKeyInput('');
  };

  const handleSendMessage = async (customQuery?: string) => {
    const query = (customQuery || queryInput).trim();
    if (!query) return;

    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQueryInput('');
    setLoading(true);
    setErrorMsg(null);

    try {
      const ragResult = await askGeminiRag(query, apiKey, lang);
      const assistantMsg: Message = {
        sender: 'assistant',
        text: ragResult.answer,
        result: ragResult,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Lỗi xử lý câu hỏi');
      const errorAssistantMsg: Message = {
        sender: 'assistant',
        text: lang === 'vi'
          ? `Lỗi: ${error.message || 'Không thể phản hồi'}. Vui lòng kiểm tra lại API Key.`
          : `Error: ${error.message || 'Failed to response'}. Please verify your API Key.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorAssistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    {
      vi: 'Mái nhà Rông Ba Na có cấu trúc như thế nào và kiêng kỵ điều gì?',
      en: 'What is the structure of the Ba Na Rong roof and its taboos?'
    },
    {
      vi: 'Sự phân chia không gian Gah và Ok trong nhà dài Ê Đê có ý nghĩa gì?',
      en: 'What is the significance of Gah and Ok spaces in E De longhouses?'
    },
    {
      vi: 'Nghi lễ cúng bến nước của người Ê Đê diễn ra vào thời điểm nào?',
      en: 'When does the E De water source blessing ceremony take place?'
    },
    {
      vi: 'Cầu thang đực và cầu thang cái của nhà dài tượng trưng cho điều gì?',
      en: 'What do the male and female ladders of the longhouse symbolize?'
    }
  ];

  const containerContent = (
    <div className={`relative w-full max-w-4xl ${isEmbedded ? 'h-[750px]' : 'h-[90vh]'} rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden text-stone-900 dark:text-stone-100`}>
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C88A3D] to-[#8B5E34] flex items-center justify-center text-stone-950 font-bold shadow">
              <Sparkles className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  {lang === 'vi' ? 'Trợ lý AI Gemini RAG Di sản' : 'Gemini AI Heritage RAG'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  RAG Grounded
                </span>
              </div>
              <div className="text-xs text-[#E0A96D]">
                {lang === 'vi' ? 'Đề tài F03 • Trích dẫn Record ID & Source ID' : 'Project F03 • Strictly Grounded & Cited'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Key Status Button */}
            <button
              onClick={() => setShowKeyModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                apiKey
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{apiKey ? (lang === 'vi' ? 'Key đã lưu' : 'Key Saved') : (lang === 'vi' ? 'Nhập API Key' : 'Enter Key')}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Modal Overlay */}
        {showKeyModal && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-stone-900 border border-[#8B5E34]/50 p-6 text-white space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-[#E0A96D] font-bold text-sm">
                  <Key className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Cấu hình Gemini API Key' : 'Configure Gemini API Key'}</span>
                </div>
                <button onClick={() => setShowKeyModal(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Security Warning Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase text-[11px]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Bảo mật quyền riêng tư' : 'Local Storage Security Notice'}</span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'vi'
                    ? 'API Key của bạn chỉ được lưu cục bộ trên trình duyệt (LocalStorage) và không bao giờ gửi về máy chủ bên ngoài. Bạn có thể xóa Key bất kỳ lúc nào.'
                    : 'Your API Key is stored solely in your local browser (LocalStorage) and is never sent to any external server.'}
                </p>
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1.5 font-semibold">
                  {lang === 'vi' ? 'Dán Google Gemini API Key của bạn:' : 'Paste your Google Gemini API Key:'}
                </label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={e => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C88A3D]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {apiKey && (
                  <button
                    onClick={handleClearKey}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    {lang === 'vi' ? 'Xóa Key đã lưu' : 'Delete saved key'}
                  </button>
                )}
                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700"
                  >
                    {lang === 'vi' ? 'Hủy' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSaveKey}
                    disabled={!keyInput.trim()}
                    className="px-5 py-2 rounded-xl bg-[#C88A3D] text-stone-950 text-xs font-bold hover:bg-[#E0A96D] disabled:opacity-50 transition shadow"
                  >
                    {lang === 'vi' ? 'Lưu và kích hoạt' : 'Save & Activate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/50 dark:bg-stone-950/40">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow ${
                  msg.sender === 'user'
                    ? 'bg-[#8B5E34] text-white'
                    : 'bg-gradient-to-br from-[#C88A3D] to-[#8B5E34] text-stone-950'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-2">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#8B5E34] text-white rounded-tr-none'
                      : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Cited Records & Sources Badges (if provided by RAG) */}
                  {msg.result && (
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
                      <div className="text-[11px] font-bold text-[#8B5E34] dark:text-[#E0A96D] uppercase">
                        {lang === 'vi' ? 'Trích dẫn tư liệu chuẩn:' : 'Verified Cited Records:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.result.citedRecords.map(rec => (
                          <button
                            key={rec.id}
                            onClick={() => onSelectRecord(rec)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-[#C88A3D] hover:bg-amber-500/10 font-mono text-xs font-bold transition border border-stone-200 dark:border-stone-700"
                          >
                            <span>{rec.id}</span>
                            <span className="font-sans font-normal text-stone-600 dark:text-stone-300">({rec.indigenousName})</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </button>
                        ))}
                        {msg.result.citedSources.map(src => (
                          <span
                            key={src.id}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/20"
                          >
                            {src.id}
                          </span>
                        ))}
                      </div>

                      {/* View Raw RAG Context Toggle */}
                      <button
                        onClick={() => setShowRagContext(showRagContext === msg.text ? null : msg.text)}
                        className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-[#C88A3D] flex items-center gap-1 pt-1"
                      >
                        <Layers className="w-3 h-3" />
                        <span>{showRagContext === msg.text ? (lang === 'vi' ? 'Ẩn ngữ cảnh RAG' : 'Hide RAG context') : (lang === 'vi' ? 'Xem ngữ cảnh trích xuất RAG' : 'View retrieved RAG chunks')}</span>
                      </button>

                      {showRagContext === msg.text && (
                        <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-950 font-mono text-[11px] text-stone-600 dark:text-stone-400 max-h-48 overflow-y-auto whitespace-pre-wrap border border-stone-200 dark:border-stone-800">
                          {msg.result.contextChunks.join('\n\n--- Phân đoạn tiếp theo ---\n\n')}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-stone-400 px-1">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 italic animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-[#C88A3D]" />
              <span>{lang === 'vi' ? 'Đang truy vấn RAG và tổng hợp câu trả lời từ Gemini...' : 'Retrieving archive context and querying Gemini...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-stone-100/70 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 overflow-x-auto flex gap-2 text-xs">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(lang === 'vi' ? q.vi : q.en)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#C88A3D] hover:text-[#C88A3D] transition shadow-sm"
            >
              {lang === 'vi' ? q.vi : q.en}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={queryInput}
              onChange={e => setQueryInput(e.target.value)}
              placeholder={
                !apiKey
                  ? (lang === 'vi' ? '⚠️ Vui lòng cấu hình Gemini API Key trước khi hỏi...' : '⚠️ Please configure Gemini API Key first...')
                  : (lang === 'vi' ? 'Hỏi về cấu kiện, không gian Gah/Ok, nghi lễ...' : 'Ask about architecture, Gah/Ok spaces, rituals...')
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#C88A3D]"
            />
            <button
              type="submit"
              disabled={loading || !queryInput.trim()}
              className="p-3.5 rounded-2xl bg-[#C88A3D] text-stone-950 font-bold hover:bg-[#E0A96D] disabled:opacity-40 transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
  );

  if (isEmbedded) {
    return (
      <div className="w-full flex justify-center py-2">
        {containerContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      {containerContent}
    </div>
  );
};
