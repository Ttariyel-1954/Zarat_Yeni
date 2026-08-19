import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export interface JwtPayload {
  userId:   number
  username: string
  roleId:   number
}

declare global {
  namespace Express {
    interface Request { user?: JwtPayload }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies?.['zarat_token'] ??
    req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ ok: false, code: 'UNAUTHORIZED', message: 'Giriş tələb olunur' })
    return
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    next()
  } catch {
    res.status(401).json({ ok: false, code: 'TOKEN_INVALID', message: 'Token etibarsızdır' })
  }
}
