import 'dotenv/config'
import express from 'express'
import helmet  from 'helmet'
import cors    from 'cors'
import morgan  from 'morgan'
import cookieParser from 'cookie-parser'

import { env }          from './config/env.js'
import { erpDb, edgeDb } from './config/db.js'
import { errorHandler } from './middleware/error.js'

import authRouter      from './modules/auth/router.js'
import erpRouter       from './modules/erp/router.js'
import telemetryRouter from './modules/telemetry/router.js'
import aiRouter        from './modules/ai/router.js'

// Prisma BigInt sahələri (məs. edge.olcme.id) olmadan res.json() sinxron şəkildə
// çökür və bütün prosesi aparır — BigInt-i JSON-da seriyalaşdırıla bilən et.
declare global {
  interface BigInt {
    toJSON(): string
  }
}
BigInt.prototype.toJSON = function (this: bigint) { return this.toString() }

// async route handler-lərdə tutulmamış xəta => unhandled rejection => bütün
// prosesi aparır (Node 15+). Bunun əvəzinə logla, prosesi ayaqda saxla.
process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]', reason)
})

const app = express()

app.use(helmet())
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

// ─── Marşrutlar ───────────────────────────────────────────────────────────────
app.use('/api/auth',      authRouter)
app.use('/api/erp',       erpRouter)
app.use('/api/telemetry', telemetryRouter)
app.use('/api/ai',        aiRouter)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, data: { status: 'running', ts: new Date().toISOString() } })
})

app.use(errorHandler)

async function start() {
  await erpDb.$connect()
  await edgeDb.$connect()
  console.log('✓ ERP baza bağlantısı: OK')
  console.log('✓ Edge baza bağlantısı: OK')

  app.listen(env.PORT, () => {
    console.log(`\n🚀 Zarat API işləyir — http://localhost:${env.PORT}`)
    console.log(`   Mühit: ${env.NODE_ENV}`)
  })
}

start().catch((err) => {
  console.error('Server başlamadı:', err)
  process.exit(1)
})
