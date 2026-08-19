import Anthropic from '@anthropic-ai/sdk'
import { env } from './env.js'

export const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })

export const AI_MODEL  = 'claude-sonnet-4-6'
export const AI_MAX_TOKENS = 4096

export const SYSTEM_PROMPT = `Siz ZARAT GROUP ERP sisteminin AI köməkçisisiniz.
İki bazanıza çıxışınız var:
1. zarat_erp_2 — ERP (təşkilat, tərəfdaşlar, maliyyə, anbar, keyfiyyət)
2. zavod_edge_db — İstehsal telemetriyası (sensorlar, ölçmələr, xəbərdarlıqlar)

Cavablarınız:
- Azərbaycan dilində olsun
- Konkret, rəqəmlə dəstəklənmiş olsun
- Zəruri hallarda SQL-nümunəsi verin
- Anomaliya aşkar etsəniz dərhal bildirin`
