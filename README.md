# Zarat ERP — FAZA-1

Zarat Import Export MMC (Simurq toyuqçuluq brendi, Siyəzən yem zavodu) üçün
ERP sistemi və onun süni intellektlə idarə olunması layihəsi.

## Struktur

- `backend/` — Node.js + Express + Prisma API (port 3002)
- `frontend/` — Next.js interfeys (port 3000)
- `database/` — sxema sənədləri, bərpa skriptləri, dərslər
- `intake/` — məlumat toplama şablonları və 11 sxem üzrə dərslər
- `docs/` — layihə sənədləri və hesabatlar

## Verilənlər bazaları

| Baza | Port | Təyinat |
|---|---|---|
| `zarat_erp_2` | 5432 | Mərkəzi ERP (13 sxema, 61 cədvəl) |
| `zavod_edge_db` | 5433 | Zavod sensor telemetriyası (FAZA-2) |

## İşə salma

```bash
# Backend
cd backend && npm install && npx prisma generate --schema=prisma/erp/schema.prisma
npx prisma generate --schema=prisma/edge/schema.prisma && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

## Mühit dəyişənləri

`backend/.env` faylı repoda yoxdur. Nümunə üçün lazım olan açarlar:
`DATABASE_ERP_URL`, `DATABASE_EDGE_URL`, `JWT_SECRET`, `ANTHROPIC_API_KEY`.

## Mərhələlər

- **FAZA-1** — ERP təməli (tamamlanıb)
- **FAZA-2** — zavod telemetriyası (əsas quruluş hazırdır)
- **FAZA-3** — süni intellektlə idarəetmə (davam edir)
