import { Router, Request, Response } from 'express'
import { z }                          from 'zod'
import { anthropic, AI_MODEL, AI_MAX_TOKENS, SYSTEM_PROMPT } from '../../config/ai.js'
import { erpDb, edgeDb } from '../../config/db.js'
import { requireAuth }   from '../../middleware/auth.js'

const router = Router()
router.use(requireAuth)

const chatSchema = z.object({
  messages: z.array(z.object({
    role:    z.enum(['user', 'assistant']),
    content: z.string(),
  })).min(1),
  context: z.enum(['erp', 'telemetry', 'general']).default('general'),
})

// ─── Kontekst məlumatlarını topla ───────────────────────────────────────────
async function buildContext(context: string): Promise<string> {
  if (context === 'telemetry') {
    const [devices, alerts, stats] = await Promise.all([
      edgeDb.cihaz.count(),
      edgeDb.xeberdarliq.count({ where: { hellOlundu: false } }),
      edgeDb.olcme.findFirst({ orderBy: { olcmeVaxti: 'desc' } }),
    ])
    return `\nCari telemetriya vəziyyəti: ${devices} cihaz, ${alerts} oxunmamış xəbərdarlıq. Son ölçmə: ${stats?.olcmeVaxti?.toISOString() ?? 'yoxdur'}.`
  }

  if (context === 'erp') {
    const [companies, partners, products] = await Promise.all([
      erpDb.orgCompany.count({ where: { isActive: true } }),
      erpDb.partner.count({ where: { isActive: true } }),
      erpDb.inventoryProduct.count({ where: { isActive: true } }),
    ])
    return `\nCari ERP vəziyyəti: ${companies} şirkət, ${partners} tərəfdaş, ${products} məhsul.`
  }

  return ''
}

// POST /api/ai/chat — streaming
router.post('/chat', async (req: Request, res: Response) => {
  const { messages, context } = chatSchema.parse(req.body)
  const ctxInfo = await buildContext(context)
  const startedAt = Date.now()

  res.setHeader('Content-Type',  'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection',    'keep-alive')
  res.flushHeaders()

  const send = (data: object) => res.write(`data: ${JSON.stringify(data)}\n\n`)

  try {
    const stream = anthropic.messages.stream({
      model:      AI_MODEL,
      max_tokens: AI_MAX_TOKENS,
      system:     SYSTEM_PROMPT + ctxInfo,
      messages,
    })

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        send({ type: 'delta', text: chunk.delta.text })
      }
    }

    const final = await stream.finalMessage()
    send({ type: 'done', usage: final.usage, model: AI_MODEL, durationMs: Date.now() - startedAt })

    // Jurnala yaz
    await erpDb.zavodAiJurnal.create({
      data: {
        sorgu:     messages[messages.length - 1]?.content,
        model:     AI_MODEL,
        tokenSayi: final.usage.input_tokens + final.usage.output_tokens,
      },
    })
  } catch (err) {
    send({ type: 'error', message: String(err) })
  }

  res.end()
})

// POST /api/ai/chat/sync — sinxron (streaming olmadan)
router.post('/chat/sync', async (req: Request, res: Response) => {
  const { messages, context } = chatSchema.parse(req.body)
  const ctxInfo = await buildContext(context)
  const startedAt = Date.now()

  let response
  try {
    response = await anthropic.messages.create({
      model:      AI_MODEL,
      max_tokens: AI_MAX_TOKENS,
      system:     SYSTEM_PROMPT + ctxInfo,
      messages,
    })
  } catch (err) {
    res.status(502).json({ ok: false, code: 'AI_PROVIDER_ERROR', message: 'AI xidmətinə qoşulmaq mümkün olmadı: ' + String(err) })
    return
  }

  const text = response.content[0]?.type === 'text' ? response.content[0].text : ''
  const durationMs = Date.now() - startedAt

  await erpDb.zavodAiJurnal.create({
    data: {
      sorgu:     messages[messages.length - 1]?.content,
      cavab:     text,
      model:     AI_MODEL,
      tokenSayi: response.usage.input_tokens + response.usage.output_tokens,
    },
  })

  res.json({ ok: true, data: { text, usage: response.usage, model: AI_MODEL, durationMs } })
})

// GET /api/ai/history — AI danışıq tarixçəsi
router.get('/history', async (req: Request, res: Response) => {
  const limit = Number(req.query['limit'] ?? 20)
  const items = await erpDb.zavodAiJurnal.findMany({
    orderBy: { yaradilma: 'desc' },
    take:    limit,
  })
  res.json({ ok: true, data: items })
})

export default router
