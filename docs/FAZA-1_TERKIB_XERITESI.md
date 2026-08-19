# FAZA-1 Tərkib Xəritəsi

**Hazırlanma tarixi:** 2026-08-09  
**Hazırlayan:** Claude Code (konsolidasiya sessiyası)  
**Əsas baza:** `zarat_erp_2` (localhost:5432, PostgreSQL 18)

---

## 1. Nə haradan gəldi

| `FAZA-1/` alt-qovluğu | Orijinal mənbə | Məzmun |
|---|---|---|
| `backend/` | `~/ZaratGroup/Zarat_api/` | Node.js + Express + TypeScript; iki Prisma sxemi (erp + edge); `src/modules/` altında auth, erp, ai, telemetry routerları |
| `frontend/` | `~/ZaratGroup/Zarat_web/` | Next.js 15 + React 19; `src/app/` altında login, dashboard, erp, ai, telemetriya səhifələri |
| `database/schema_prisma_erp.prisma` | `~/ZaratGroup/Zarat_api/prisma/erp/schema.prisma` | Aktiv ERP Prisma sxemi: 13 Faza-1 sxemi + 8 zavod sxemi bir arada |
| `database/struktur_faza1_schemas.sql` | `pg_dump --schema-only` → `zarat_erp_2` | 3879 sətir DDL; yalnız Faza-1 sxemləri: org, partner, inventory, hr, finance, asset, production, purchase, quality, sales, trade, logistics, system |
| `database/reconcile_ddl/` | `~/ZaratGroup/01_faza1_erp/reconcile/03_DDL/` | Kanonik reconcile DDL (köhnə `zarat_erp` sxemi üçün — tarixi ref; cədvəl adları fərqlidir) |
| `database/muessise_db_backup_20260701.dump` | `reconcile/_LOG/muessise_db_backup_20260701_1330.dump` | Mənbə B-nin orijinal bazasının pg_dump (552 KB, Faza-1 reconcile-ın başlangıc nöqtəsi) |
| `database/seed_data/faza1_excel_import_20260725.sql` | `~/ZaratGroup/01_faza1_erp/faza1_excel_import_20260725.sql` | Zarat-ın 3 real Excel-indən üretilmiş INSERT SQL: 3 şirkət, 31 şöbə, 235 işçi, 77 vəzifə |
| `database/seed_data/load_faza1.py` | `reconcile/04_LOAD/load_faza1.py` | Reconcile yükləyici (köhnə `zarat_erp` sxeminə uyğunlaşdırılmalıdır — bax Bölmə 5) |
| `database/seed_data/reconcile_Faza1_excel/` | `reconcile/Faza_1/` | 7 modul × n Excel: ORG, Sales, Asset, Quality, Product, Partner, Sistem (muessise_db ixracı) |
| `intake/01_INTAKE_orijinal/` | `_ARXIV_2026_07/Zarat_ERP_Desktop_esli/01_INTAKE/` | Orijinal intake şablon strukturu (sxem başlıqlı Excel-lər, dersler) |
| `intake/01_INTAKE_doldurulmus/` | `_ARXIV_2026_07/Zarat_ERP_Desktop_esli/01_INTAKE_DOLDURULMUS/` | Real data ilə doldurulmuş Excel şablonları (11 sxem, 37+ cədvəl) |
| `intake/Zarat_verdikleri/` | `_ARXIV_2026_07/Zarat_ERP_Desktop_esli/Zarat_verdikleri/` | Şirkətin göndərdiyi 3 orijinal Excel (ZIE MMC, ZPO MMC, ZYF/Qardaşov Vüqar) |
| `intake/dersler/` | `_ARXIV_2026_07/.../01_INTAKE_DOLDURULMUS/dersler/` | 11 HTML doldurma dərsi + ZARAT_INTAKE_ELAQE_XERITESI.html |
| `docs/ZARAT_INTAKE_DOLDURMA_HESABATI.md` | `_ARXIV_2026_07/Zarat_ERP_Desktop_esli/ZARAT_INTAKE_DOLDURMA_HESABATI.md` | Mapping hesabatı (14 KB, 2026-07-23) |

---

## 2. Baza vəziyyəti (`zarat_erp_2`, port 5432)

### 2.1 Arxitektura qeydi — vacib!

`zarat_erp_2` iki paralel sxem qatını birlikdə saxlayır:
- **Faza-1 sxemləri** (13 ədəd): `org`, `partner`, `inventory`, `hr`, `finance`, `asset`, `production`, `purchase`, `quality`, `sales`, `trade`, `logistics`, `system`
- **Faza-2 sxemləri** (8 ədəd): `zavod`, `zavod_ai`, `zavod_anbar`, `zavod_istehsal`, `zavod_maliyye`, `zavod_media`, `zavod_sened`, `zavod_telemetriya`

Cədvəl adları Prisma konvensiyası ilə **cəm** formadadır (`org.companies`, `org.employees`) — köhnə reconcile kanonik modelindən (`org.company`, `org.employee`) FƏRQLƏNIR.

### 2.2 Cədvəllərdə mövcud data

| Cədvəl | Sətir sayı | Qeyd |
|---|---|---|
| `org.companies` | **3** | ZIE, ZPO, ZYF — `faza1_excel_import_20260725.sql`-dən |
| `org.departments` | **31** | 3 şirkət üzrə şöbə iyerarxiyası |
| `org.employees` | **235** | Şirkətin real işçi heyəti (3 Excel-dən) |
| `org.positions` | **77** | Vəzifə siyahısı |
| `system.user` | **1** | Admin hesabı |
| org.branches | 0 | |
| partner.* (9 cədvəl) | **hamısı 0** | Doldurulmamış |
| inventory.* (4 cədvəl) | **hamısı 0** | Doldurulmamış |
| hr.* (4 cədvəl) | **hamısı 0** | Doldurulmamış (hr.employees ≠ org.employees!) |
| finance.* (3 cədvəl) | **hamısı 0** | Doldurulmamış |
| asset.* (7 cədvəl) | **hamısı 0** | Doldurulmamış |
| production.* (3 cədvəl) | **hamısı 0** | Doldurulmamış |
| purchase.* (4 cədvəl) | **hamısı 0** | Doldurulmamış |
| quality.* (4 cədvəl) | **hamısı 0** | Doldurulmamış |
| sales.* (2 cədvəl) | **hamısı 0** | Doldurulmamış |
| trade.* (2 cədvəl) | **hamısı 0** | Doldurulmamış |
| logistics.* (2 cədvəl) | **hamısı 0** | Doldurulmamış |

### 2.3 Mövcud backup-lar

| Fayl | Yer | Məzmun | Tarix |
|---|---|---|---|
| `zarat_erp_2_m4_20260725_110913.dump` | `~/ZARAT_ILKIN_EHTIYAT_20260725_110913/` | `zarat_erp_2`-nin tam backup-ı (2.4 MB) | 2026-07-25 |
| `muessise_db_backup_20260701.dump` | `FAZA-1/database/` | Mənbə B-nin orijinal backupı (552 KB) | 2026-07-01 |

---

## 3. Faza-2 materialı (TOXUNULMAYIB)

Faza-2 işi "zavod" kompüterində aparılıb. Bu kompüterdə aşağıdakılar **olduğu yerdə qalır, heç nəyə toxunulmayıb:**

| Yer | Məzmun | Status |
|---|---|---|
| `~/ZaratGroup/02_faza2_zavod/` | Zavod kodu: Python MQTT publisher/subscriber, R Shiny idarə paneli, MinIO media, AI server | Toxunulmayıb |
| `~/ZaratGroup/_ARXIV_2026_07/Zarat_Faza2_Zavod_esli` | Faza-2 arxiv versiyası | Toxunulmayıb |
| `~/ZaratGroup/_ARXIV_2026_07/ZAVOD_EHTIYAT_kok_kohne.sh` | Köhnə ehtiyat skripti | Toxunulmayıb |
| `~/ZaratGroup/_ARXIV_2026_07/ZAVOD_SON_kok_kohne.sh` | Köhnə son versiya skripti | Toxunulmayıb |
| `~/ZaratGroup/_ARXIV_2026_07/Zarat_ERP_Desktop_esli/09_ehtiyat/nusxeler/zavod_edge_db_M4_20260724_173040.dump` | Zavod edge DB backup-ı (başqa kompüterdən, 40 KB) | Toxunulmayıb |
| `~/ZARAT_ILKIN_EHTIYAT_20260725_110913/zavod_edge_db_m4_20260725_110913.dump` | zavod_edge_db tam backup | Toxunulmayıb |
| `zarat_erp_2`-dəki `zavod_*` sxemləri (8 ədəd) | Faza-2 zavod sxemləri eyni bazada — Prisma migration ilə yaradılıb | Toxunulmayıb |

**Zavod ünvanı:** Faza-2-nin əsas işi başqa bir kompüterdə (zavod şəbəkəsi) görülüb. Bu kompüterin IP/hostname-i `02_faza2_zavod/.env` faylında ola bilər.

---

## 4. Faza-3 ilə əlaqə

`~/ZaratGroup/01_faza1_erp/reconcile/` altında `Faza_2/` və `Faza_3/` qovluqları boşdur — plan sənədlərindən planlaşdırma əsasən bu qovluqda olacaqdı.

Reconcile `FAZA1_HESABAT.md`-ə görə Faza-2 məzmunu:
- Əməliyyat dövrü: satınalma sifarişləri, inventar hərəkətləri, satış, mühasibat jurnalları, HR maaş
- Faza-1 master kodları (item, partner, site, account) Faza-2 FK-ləri üçün hazır bazadır
- Boş master-lar (cost_center, work_center, work_schedule...) Faza-2 əməliyyatlarından əvvəl minimal seed tələb edə bilər

**Hazırkı FAZA-1 vəziyyəti Faza-3-ə necə hazırdır:**
- Struktur tam mövcuddur (60 Faza-1 cədvəli, Prisma migration-la)
- Org data yüklənib (3 şirkət, 235 işçi, 77 vəzifə, 31 şöbə)
- Qalan master-ların (partner, inventory, finance, asset...) doldurulması Faza-3-ün başlanğıc şərtidir

---

## 5. Növbəti addımlar

### 5.1 Zəruri (Faza-1-i tam tamamlamaq üçün)

1. **Qalan Faza-1 masterlarını yüklə:**  
   `database/seed_data/faza1_excel_import_20260725.sql` yalnız org sxemini əhatə edir. Partner, inventory, finance, asset, quality, production üçün ya:
   - `01_INTAKE_doldurulmus/` Excel-lərindən yeni INSERT SQL-lər yaz (Prisma sxeminə — `org.companies` kimi cəm adlarla), ya da
   - `reconcile/load_faza1.py`-ni `zarat_erp_2` sxeminə uyğunlaşdır (ad mapingi lazımdır)

2. **org.branches boşdur:**  
   `faza1_excel_import_20260725.sql`-də branch data yoxdur. `01_INTAKE_doldurulmus/org/05_org_site.xlsx`-dən İNSERT yazılmalıdır.

3. **hr.employees boşdur (org.employees ilə qarışdırma!):**  
   `org.employees` = HR olmayan sadə işçi siyahısı; `hr.employees` = HR modulu üçün genişləndirilmiş işçi profili. `hr.employees`-i ayrıca doldurmaq lazımdır.

### 5.2 Zavoddan alınması lazım olan

1. Zavod kompüterinin hazırkı `zavod_edge_db` dump-ı (ən son versiya)
2. Zavod `02_faza2_zavod/` kodunun son versiyası (əgər bu kompüterdəkindən fərqlənibsə)
3. Zavod üçün işlənmiş Faza-2 Excel məlumatları (əgər varsa)

### 5.3 Backend konfiqurasiyası

`backend/.env` faylında `DATABASE_ERP_URL` artıq düzgün `zarat_erp_2`-yə işarə edir.  
`DATABASE_EDGE_URL` zavod üçün — zavod kompüteri şəbəkəyə qoşulduqda aktiv olur.  
⚠️ `.env` faylında Anthropic API açarı var — bu faylı ictimaiyə açmayın.

---

---

## 6. Yenilənmə: Struktur təsdiqi + intake data yüklənməsi (2026-08-18)

### 6.1 Struktur statusu (bu bölmə əvvəlki fərziyyəni düzəldir)

Əvvəlki tapşırıq sənədi trigger/view/data-nın hamısının əskik olduğunu
fərz edirdi. Manual `psql` yoxlaması göstərdi ki, bu artıq düzgün deyil —
struktur Prisma migration vasitəsilə tam tətbiq olunub:

| Element | Say | Qeyd |
|---|---|---|
| Faza-1 sxema | 13/13 | dəyişməyib |
| Faza-1 cədvəl | 60/60 | `struktur_faza1_schemas.sql`-ə uyğun |
| Trigger (`set_updated_at`) | 45 | artıq tətbiq olunub (Prisma migration) |
| Faza-1 hesabat view-u | 8/8 | `v_upcoming_maintenance`, `v_monthly_pl`, `v_department_headcount`, `v_low_stock`, `v_stock_valuation`, `v_supplier_performance`, `v_expiring_certificates`, `v_all_shipments` |
| Faza-2 (`zavod_*`) view-u | 7 | toxunulmayıb, ayrıca say (cəmi 15 view) |

`database/struktur.sql` adlı fayl yoxdur — mövcud fayl
`struktur_faza1_schemas.sql`-dir və artıq canlı bazaya bərabərdir,
üzərinə yazmağa ehtiyac yoxdur.

### 6.2 Intake Excel-lərindən yüklənən real data

`intake/01_INTAKE_doldurulmus/00_INDEX_və_əlaqələr.xlsx` köhnə
"reconcile" modelini (`org.company`, `org.site`, `product.item` və s.)
istifadə edir — canlı Prisma sxemindən (`org.companies`, cədvəl adları
fərqli) FƏRQLİ bir modeldir. Bu səbəbdən sadə fayl köçürməsi mümkün
olmadı, sütun-sütuna uyğunlaşdırma tələb olundu. Yüklənənlər:

| Cədvəl | Sətir | Mənbə | Qeyd |
|---|---|---|---|
| `asset.asset_category` | 2 | `34_asset_asset_category.xlsx` | |
| `finance.chart_of_accounts` | 2 | `03_finance_account.xlsx` | parent_account_id resolve edilib |
| `org.branches` | 9 | `05_org_site.xlsx` (site→branch) | company_code (ZRT-IMP/ZRT-POULTRY/ZRT-YEM) → mövcud company_id (ZIE/ZPO/ZYF) əl ilə uyğunlaşdırılıb (adlara görə eyni 3 şirkət təsdiqləndi) |
| `hr.departments` | 37 | `07_org_department.xlsx` | `org.departments`-dən **ayrı** saxlanıldı (istifadəçi qərarı — dublikat riski) |
| `asset.asset` | 1 | `35_asset_asset.xlsx` | category_id, branch_id resolve edilib |
| `hr.employees` | 235 | `16_hr_employee.xlsx` + `17_hr_employment_contract.xlsx` (maaş) | `org.employees`-dən **ayrı** saxlanıldı; FIN, gender, ata adı yüklənmədi (canlı sxemdə yoxdur); `monthly_salary` contract mənbəyindən 0 dolu çıxdı (mənbədə 235/235 boşdur) |
| `partner.partner` | 2 | `24_partner_partner.xlsx` | |
| `partner.bank_account` | 1 | `27_partner_bank_account.xlsx` | partner_id resolve edilib |
| `inventory.warehouses` | 2 | `11_inventory_warehouse.xlsx` | |
| `quality.quality_certificate` | 2 | `30_quality_certificate.xlsx` | |

**Vacib qeyd — iki paralel org/hr məlumat dəsti var:**
`org.companies/departments/employees/positions` (əvvəlki sessiyadan,
`faza1_excel_import_20260725.sql`) və indi yüklənən
`hr.departments/hr.employees` (bu sessiyadan, intake Excel-lərindən)
**eyni 3 şirkəti** təsvir edir, amma fərqli kod sxemləri və fərqli
şöbə/vəzifə sayı ilə (31 vs 37 şöbə, 77 vs 121 vəzifə). 235 işçi hər
iki tərəfdə də var, amma eyni insanlar olub-olmadığı ada görə
qarşılaşdırılmayıb (real FIN/doğum tarixi olan həssas data — istifadəçi
qərarı ilə bu addım keçildi). **Faza-3-dən əvvəl bu iki dəstin
üst-üstə düşüb-düşmədiyi araşdırılmalıdır.**

### 6.3 Yüklənməyən (sxem uyğunsuzluğu) — Faza-3 üçün qeyd

Aşağıdakı 15 intake cədvəli canlı sxemdə qarşılığı olmadığı üçün
yüklənmədi (istifadəçi qərarı — "sxemi genişləndirmə, sadəcə qeyd et"):

`product.bom`, `product.bom_line`, `product.price_list`,
`product.price_list_line`, `inventory.location`,
`production.work_center`, `production.flock`, `production.routing`,
`hr.work_schedule`, `hr.salary_component`, `hr.employment_contract`
(yalnız `base_salary` `hr.employees.monthly_salary`-ə köçürüldü, qalan
sütunlar itdi), `hr.employee_salary`, `org.cost_center`,
`quality.test_plan`, `logistics.vehicle`, `sales.sales_target`,
`finance.vat_code`, `finance.budget_line`, `partner.payment_term`,
`partner.supplier`, `partner.customer`.

Bu cədvəllər üçün canlı sxemdə uyğun struktur yoxdur (məs. anbar
lokasiyası, iş qrafiki, əmək haqqı komponenti, xərc mərkəzi kimi
konseptlər). Faza-3 planlaşdırılanda ya sxem genişləndirilməli, ya da
bu data fərqli formada (məs. `notes` sahələrində) saxlanmalıdır.

### 6.4 Digər tapıntılar

- `~/Downloads/Zarat_baza-B.html` adlı, layihədəki
  `database/Zarat_Baza-B.html`-dən 1 bayt fərqli, bugünkü tarixli
  (2026-08-18) bir kopya aşkarlandı — mənbəyi aydın deyil,
  toxunulmadı.

---

*Bu sənəd FAZA-1 konsolidasiya sessiyasında (2026-08-09) avtomatik yaradılmışdır.*
