import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { erpDb } from '../../config/db.js'
import { env }   from '../../config/env.js'
import { requireAuth } from '../../middleware/auth.js'

const router = Router()

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = loginSchema.parse(req.body)

  const user = await erpDb.systemUser.findFirst({ where: { username, isActive: true } })

  if (!user || !user.passwordHash) {
    res.status(401).json({ ok: false, code: 'INVALID_CREDENTIALS', message: 'İstifadəçi adı və ya şifrə yanlışdır' })
    return
  }

  if (user.isLocked) {
    res.status(403).json({ ok: false, code: 'ACCOUNT_LOCKED', message: 'Hesab bloklanmışdır' })
    return
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    res.status(401).json({ ok: false, code: 'INVALID_CREDENTIALS', message: 'İstifadəçi adı və ya şifrə yanlışdır' })
    return
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username, roleId: user.roleId },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions,
  )

  res
    .cookie('zarat_token', token, {
      httpOnly: true,
      secure:   env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   7 * 24 * 60 * 60 * 1000,
    })
    .json({
      ok:   true,
      data: {
        token,
        user: {
          id:       user.id,
          username: user.username,
          email:    user.email,
          fullName: user.fullName,
          roleId:   user.roleId,
          isActive: user.isActive,
        },
      },
    })
})

// POST /api/auth/logout
router.post('/logout', (_req, res: Response) => {
  res.clearCookie('zarat_token').json({ ok: true, data: null })
})

// GET /api/auth/me
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  const user = await erpDb.systemUser.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, username: true, email: true, fullName: true, roleId: true, isActive: true },
  })
  res.json({ ok: true, data: user })
})

export default router
