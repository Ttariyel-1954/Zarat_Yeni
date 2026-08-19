# FAZA-1 Mənbə Qeydləri

Kopyalanma tarixi: 2026-08-09

## Köçürülən elementlər

| FAZA-1 yolu | Orijinal mənbə | Qeyd |
|---|---|---|
| `backend/` | `~/ZaratGroup/Zarat_api/` | node_modules, .next, src/generated istisna; aktiv backend |
| `frontend/` | `~/ZaratGroup/Zarat_web/` | node_modules, .next istisna; Next.js 15 frontend |
| `database/schema_prisma_erp.prisma` | `~/ZaratGroup/Zarat_api/prisma/erp/schema.prisma` | Aktiv ERP Prisma sxemi (Faza 1 + zavod sxemləri birlikdə) |
| `database/struktur_faza1_schemas.sql` | `pg_dump` → `zarat_erp_2` (port 5432) | Yalnız Faza 1 sxemləri: org, partner, inventory, hr, finance, asset, production, purchase, quality, sales, trade, logistics, system |
| `database/reconcile_ddl/` | `~/ZaratGroup/01_faza1_erp/reconcile/03_DDL/` | Kanonik reconcile DDL faylları (köhnə `zarat_erp` bazası üçün — tarixi ref) |
| `database/muessise_db_backup_20260701.dump` | `~/ZaratGroup/01_faza1_erp/reconcile/_LOG/muessise_db_backup_20260701_1330.dump` | Mənbə B-nin orijinal bazasının pg_dump (552 KB, Faza 1 reconcile-ın başlangıc nöqtəsi) |
| `database/seed_data/faza1_excel_import_20260725.sql` | `~/ZaratGroup/01_faza1_erp/faza1_excel_import_20260725.sql` | Zarat-ın real Excel məlumatından yaradılmış INSERT SQL (302 sətir, 2026-07-25) |
| `database/seed_data/load_faza1.py` | `~/ZaratGroup/01_faza1_erp/reconcile/04_LOAD/load_faza1.py` | Reconcile yükləyici Python skripti |
| `database/seed_data/reconcile_Faza1_excel/` | `~/ZaratGroup/01_faza1_erp/reconcile/Faza_1/` | Faza 1 Excel data faylları (muessise_db-dən çıxarılmış, 7 modul × n xlsx) |
| `intake/01_INTAKE_orijinal/` | `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/01_INTAKE/` | Orijinal intake şablonları + dərslərin ilkin nüsxəsi |
| `intake/01_INTAKE_doldurulmus/` | `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/01_INTAKE_DOLDURULMUS/` | Real data doldurulmuş Excel şablonları (11 sxem, dersler daxil) |
| `intake/Zarat_verdikleri/` | `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/Zarat_verdikleri/` | Şirkətdən gələn 3 orijinal Excel (ZIE MMC, ZPO MMC, ZYF — Vüqar Qardaşov) |
| `intake/dersler/` | `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/01_INTAKE_DOLDURULMUS/dersler/` | 11 HTML doldurma dərsi + əlaqə xəritəsi |
| `docs/ZARAT_INTAKE_DOLDURMA_HESABATI.md` | `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/ZARAT_INTAKE_DOLDURMA_HESABATI.md` | Əvvəlki sessiyada hazırlanmış mapping hesabatı (14535 bayt, 2026-07-23) |

## Toxunulmayan Faza 2 materialları

| Yer | Məzmun |
|---|---|
| `~/ZaratGroup/02_faza2_zavod/` | Faza 2 zavod kodu (Python, MQTT, Minio, R Shiny panel) |
| `~/ZaratGroup/_ARXIV_2026_07/Zarat_Faza2_Zavod_esli` | Faza 2 arxiv versiyası |
| `~/ZaratGroup/_ARXIV_2026_07/ZAVOD_EHTIYAT_kok_kohne.sh` | Faza 2 ehtiyat skripti |
| `~/ZaratGroup/_ARXIV_2026_07/ZAVOD_SON_kok_kohne.sh` | Faza 2 son versiya skripti |
| `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/09_ehtiyat/nusxeler/zavod_edge_db_M4_20260724_173040.dump` | Zavod edge DB backup (2026-07-24, başqa kompüterdən) |
| `~/ZARAT_ILKIN_EHTIYAT_20260725_110913/zavod_edge_db_m4_20260725_110913.dump` | zavod_edge_db tam backup (40 KB) |
| `zarat_erp_2`-dəki `zavod_*` sxemləri | 8 zavod sxemi eyni bazada mövcuddur (toxunulmadı) |
