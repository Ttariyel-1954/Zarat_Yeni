import { PrismaClient as ErpClient }  from '../generated/erp/index.js'
import { PrismaClient as EdgeClient } from '../generated/edge/index.js'

const globalForPrisma = globalThis as unknown as {
  erp?:  ErpClient
  edge?: EdgeClient
}

export const erpDb  = globalForPrisma.erp  ?? new ErpClient()
export const edgeDb = globalForPrisma.edge ?? new EdgeClient()

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.erp  = erpDb
  globalForPrisma.edge = edgeDb
}
