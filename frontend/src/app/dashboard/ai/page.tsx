'use client'
import { useState, useRef, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { aiApi } from '@/lib/api'
import { Send, Bot, User, Loader2, History, Clock, Coins } from 'lucide-react'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/lib/utils'

const BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001'

interface Message {
  role: 'user' | 'assistant'
  content: string
  usage?: { input_tokens: number; output_tokens: number }
  durationMs?: number
  model?: string
  error?: boolean
}

interface HistoryItem {
  id: number | string
  sorgu?: string | null
  model?: string | null
  tokenSayi?: number | null
  yaradilma?: string | null
}

const SUGGESTIONS = [
  'Neçə aktiv cihaz var?',
  'Son 24 saatda neçə xəbərdarlıq olub?',
  'Ən çox ölçmə olan cihaz hansıdır?',
  'ERP-də neçə aktiv tərəfdaş var?',
]

async function streamChat(
  messages: { role: string; content: string }[],
  context: string,
  onDelta: (text: string) => void,
  onDone: (data: { usage?: { input_tokens: number; output_tokens: number }; model?: string; durationMs?: number }) => void,
  onError: (message: string) => void,
) {
  const res = await fetch(`${BASE}/api/ai/chat`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, context }),
  })
  if (!res.body) { onError('Axın mövcud deyil'); return }

  const reader  = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const frames = buffer.split('\n\n')
    buffer = frames.pop() ?? ''
    for (const frame of frames) {
      const line = frame.trim()
      if (!line.startsWith('data:')) continue
      try {
        const msg = JSON.parse(line.slice(5).trim())
        if (msg.type === 'delta') onDelta(msg.text)
        else if (msg.type === 'done') onDone(msg)
        else if (msg.type === 'error') onError(String(msg.message ?? 'Naməlum xəta'))
      } catch { /* natamam frame, növbəti chunk-da tamamlanacaq */ }
    }
  }
}

export default function AiPage() {
  const qc = useQueryClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [context,  setContext]  = useState<'general' | 'erp' | 'telemetry'>('general')
  const bottomRef = useRef<HTMLDivElement>(null)

  const history = useQuery({ queryKey: ['ai-history'], queryFn: () => aiApi.history(20) })
  const historyItems: HistoryItem[] = history.data?.data?.data ?? []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text?: string) {
    const q = (text ?? input).trim()
    if (!q || loading) return
    setInput('')

    const next: Message[] = [...messages, { role: 'user', content: q }]
    setMessages([...next, { role: 'assistant', content: '' }])
    setLoading(true)

    let content = ''
    try {
      await streamChat(
        next.map((m) => ({ role: m.role, content: m.content })),
        context,
        (delta) => {
          content += delta
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { role: 'assistant', content }
            return copy
          })
        },
        (done) => {
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { role: 'assistant', content, usage: done.usage, durationMs: done.durationMs, model: done.model }
            return copy
          })
          qc.invalidateQueries({ queryKey: ['ai-history'] })
        },
        (errMsg) => {
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { role: 'assistant', content: errMsg, error: true }
            return copy
          })
        },
      )
    } catch {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.', error: true }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-6rem)] max-w-6xl">
      <div className="flex flex-col flex-1 min-w-0">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">AI Köməkçi</h1>
          <p className="text-sm text-gray-500">Claude ilə ERP və telemetriya haqqında sual soruşun</p>
        </div>

        {/* Kontekst seçimi */}
        <div className="flex gap-2 mb-4">
          {(['general', 'erp', 'telemetry'] as const).map((c) => (
            <button key={c} onClick={() => setContext(c)}
              className={cn(
                'px-3 py-1 text-xs rounded-full border transition-colors',
                context === c ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-500 border-gray-200 hover:border-gray-400',
              )}>
              {c === 'general' ? 'Ümumi' : c === 'erp' ? 'ERP' : 'Telemetriya'}
            </button>
          ))}
        </div>

        {/* Mesajlar */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot size={32} className="text-blue-400 mb-3" />
              <p className="text-gray-500 text-sm mb-4">Sualınızı yazın və ya aşağıdan seçin</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-gray-600 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={cn('flex gap-3', m.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse')}>
              <div className={cn(
                'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
                m.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100',
              )}>
                {m.role === 'assistant' ? <Bot size={14} className="text-blue-600" /> : <User size={14} className="text-gray-600" />}
              </div>
              <div className={cn('max-w-[85%]', m.role === 'user' && 'flex flex-col items-end')}>
                <div className={cn(
                  'rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap',
                  m.error ? 'bg-red-50 text-red-700' : m.role === 'assistant' ? 'bg-gray-50 text-gray-900' : 'bg-blue-600 text-white',
                )}>
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
                {m.role === 'assistant' && (m.usage || m.durationMs !== undefined) && !m.error && (
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    {m.usage && (
                      <span className="flex items-center gap-1">
                        <Coins size={11} />{m.usage.input_tokens + m.usage.output_tokens} token
                      </span>
                    )}
                    {m.durationMs !== undefined && (
                      <span className="flex items-center gap-1">
                        <Clock size={11} />{(m.durationMs / 1000).toFixed(1)} san
                      </span>
                    )}
                    {m.model && <span>{m.model}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot size={14} className="text-blue-600" />
              </div>
              <Loader2 size={16} className="animate-spin text-gray-400" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Giriş */}
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Sual yazın... (Enter ilə göndər)"
            disabled={loading}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 rounded-xl transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Tarixçə */}
      <div className="w-full lg:w-72 flex-shrink-0 flex flex-col">
        <div className="flex items-center gap-2 mb-4 lg:mt-[52px]">
          <History size={14} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">Tarixçə</h2>
        </div>
        <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {history.isLoading && (
            <p className="px-4 py-6 text-xs text-gray-400 text-center">Yüklənir...</p>
          )}
          {!history.isLoading && historyItems.length === 0 && (
            <p className="px-4 py-6 text-xs text-gray-400 text-center">Tarixçə yoxdur</p>
          )}
          {historyItems.map((h) => (
            <div key={h.id} className="px-4 py-3">
              <p className="text-xs text-gray-800 line-clamp-2">{h.sorgu ?? '—'}</p>
              <div className="flex items-center justify-between mt-1.5 text-[11px] text-gray-400">
                <span>{h.tokenSayi ?? 0} token</span>
                <span>{h.yaradilma ? timeAgo(h.yaradilma) : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
