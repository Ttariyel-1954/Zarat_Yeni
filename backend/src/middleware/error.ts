import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Giriş məlumatları səhvdir',
      details: err.flatten().fieldErrors,
    })
    return
  }

  const error = err instanceof Error ? err : new Error(String(err))
  console.error('[ERROR]', error.message)

  res.status(500).json({
    ok:      false,
    code:    'INTERNAL_ERROR',
    message: process.env['NODE_ENV'] === 'development' ? error.message : 'Server xətası',
  })
}
