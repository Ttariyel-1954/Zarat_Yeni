import { z } from 'zod'

const schema = z.object({
  PORT:               z.string().default('3001').transform(Number),
  NODE_ENV:           z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_ERP_URL:   z.string().min(1),
  DATABASE_EDGE_URL:  z.string().min(1),
  JWT_SECRET:         z.string().min(16),
  JWT_EXPIRES_IN:     z.string().default('7d'),
  ANTHROPIC_API_KEY:  z.string().default(''),
  CORS_ORIGIN:        z.string().default('http://localhost:3000'),
})

export const env = schema.parse(process.env)
