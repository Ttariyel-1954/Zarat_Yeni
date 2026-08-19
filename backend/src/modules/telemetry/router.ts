import { Router, Request, Response } from 'express'
import { edgeDb, erpDb } from '../../config/db.js'
import { requireAuth }   from '../../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// ─── Sensor tipləri ───────────────────────────────────────────────────────────
router.get('/sensor-types', async (_req: Request, res: Response) => {
  const items = await edgeDb.sensorTipi.findMany({ orderBy: { kod: 'asc' } })
  res.json({ ok: true, data: items })
})

// ─── Cihazlar ────────────────────────────────────────────────────────────────
router.get('/devices', async (req: Request, res: Response) => {
  const status = Array.isArray(req.query['status']) ? undefined : req.query['status'] as string | undefined
  const items  = await edgeDb.cihaz.findMany({
    where:   status ? { status } : {},
    include: { sensorTipi: true },
    orderBy: { kod: 'asc' },
  })
  res.json({ ok: true, data: items })
})

router.get('/devices/:kod', async (req: Request, res: Response) => {
  const device = await edgeDb.cihaz.findUnique({
    where:   { kod: String(req.params['kod']) },
    include: { sensorTipi: true },
  })
  if (!device) { res.status(404).json({ ok: false, code: 'NOT_FOUND', message: 'Cihaz tapılmadı' }); return }
  res.json({ ok: true, data: device })
})

// ─── Son ölçmələr ─────────────────────────────────────────────────────────────
router.get('/measurements', async (req: Request, res: Response) => {
  const cihazKod = req.query['cihazKod'] as string | undefined
  const limit    = Number(req.query['limit'] ?? 100)
  const hours    = Number(req.query['hours']  ?? 24)
  const since    = new Date(Date.now() - hours * 3600 * 1000)

  const items = await edgeDb.olcme.findMany({
    where: {
      ...(cihazKod ? { cihazKod } : {}),
      olcmeVaxti: { gte: since },
    },
    orderBy: { olcmeVaxti: 'desc' },
    take: limit,
  })
  res.json({ ok: true, data: items })
})

// ─── Hər cihaz üçün son dəyər ────────────────────────────────────────────────
router.get('/latest', async (_req: Request, res: Response) => {
  const devices = await edgeDb.cihaz.findMany({ where: { status: 'aktiv' } })
  const results = await Promise.all(
    devices.map(async (d) => {
      const last = await edgeDb.olcme.findFirst({
        where:   { cihazKod: d.kod },
        orderBy: { olcmeVaxti: 'desc' },
      })
      return { ...d, lastMeasurement: last }
    }),
  )
  res.json({ ok: true, data: results })
})

// ─── Xəbərdarlıqlar ───────────────────────────────────────────────────────────
router.get('/alerts', async (req: Request, res: Response) => {
  const oxunmamis = req.query['unread'] === 'true'
  const limit     = Number(req.query['limit'] ?? 50)
  const items     = await edgeDb.xeberdarliq.findMany({
    where:   oxunmamis ? { hellOlundu: false } : {},
    orderBy: { yaradilma: 'desc' },
    take:    limit,
    include: { cihaz: { include: { sensorTipi: true } } },
  })
  res.json({ ok: true, data: items })
})

router.patch('/alerts/:id/read', async (req: Request, res: Response) => {
  const item = await edgeDb.xeberdarliq.update({
    where: { id: BigInt(String(req.params['id'])) },
    data:  { hellOlundu: true },
  })
  res.json({ ok: true, data: { id: item.id.toString() } })
})

// ─── Statistika ───────────────────────────────────────────────────────────────
router.get('/stats', async (_req: Request, res: Response) => {
  const [totalDevices, activeDevices, alertsCount, erpReadings] = await Promise.all([
    edgeDb.cihaz.count(),
    edgeDb.cihaz.count({ where: { status: 'aktiv' } }),
    edgeDb.xeberdarliq.count({ where: { hellOlundu: false } }),
    edgeDb.olcme.count(),
  ])

  const lastMeasurement = await edgeDb.olcme.findFirst({ orderBy: { olcmeVaxti: 'desc' } })

  res.json({
    ok: true,
    data: {
      totalDevices,
      activeDevices,
      totalReadings:  erpReadings,
      activeAlerts:   alertsCount,
      lastUpdate:     lastMeasurement?.olcmeVaxti ?? null,
    },
  })
})

// ─── SSE — real-vaxt axın ────────────────────────────────────────────────────
router.get('/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type',  'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection',    'keep-alive')
  res.flushHeaders()

  const send = (data: object) => res.write(`data: ${JSON.stringify(data)}\n\n`)

  const poll = async () => {
    try {
      const items = await edgeDb.xeberdarliq.findMany({
        where:   { hellOlundu: false },
        orderBy: { yaradilma: 'desc' },
        take:    5,
      })
      send({ type: 'alerts', payload: items.map(i => ({ ...i, id: i.id.toString() })) })
    } catch { /* bağlantı kəsilib */ }
  }

  poll()
  const timer = setInterval(poll, 5000)
  req.on('close', () => clearInterval(timer))
})

export default router
