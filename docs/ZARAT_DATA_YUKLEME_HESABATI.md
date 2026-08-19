# Zarat ERP — Real Datanın Yüklənməsi Hesabatı

**Tarix:** 2026-08-18
**Mənbə:** `intake/01_INTAKE_doldurulmus/` (37 fayl, 11 sxem qovluğu)
**Hədəf:** `zarat_erp_2` (13 sxem, 60 cədvəl — `database/struktur_faza1_schemas.sql`)
**Yükləyici:** `database/seed_data/load_intake.py` (bu sessiyada yazıldı, iki mərhələ)

---

## ⚠️ Əvvəlcədən aşkar edilən 3 kritik fərq (yükləmədən əvvəl istifadəçiyə bildirildi)

1. **Hədəf bazada `product` sxemi ümumiyyətlə yoxdur.** `00_INDEX` faylının nəzərdə tutduğu 37 "kanonik" cədvəldən 16-sının (aşağıda C qrupu) `zarat_erp_2`-də heç bir qarşılığı yoxdur — sadəcə adı fərqli deyil, konsepti tamamilə yoxdur.
2. **`zarat_erp_2` artıq başqa bir mənbədən (EXSELLER, 2026-07-25) yüklənmiş dataya malik idi** — fərqli kod sistemi ilə (`ZIE/ZPO/ZYF` şirkət kodları, `DEPT-ZIE-001`, `POS-0001`), bizim intake faylların (`ZRT-YEM/ZRT-IMP/ZRT-POULTRY`, `YEM-IST`, `YEM-IST-P01`) heç biri ilə üst-üstə düşmür. İstifadəçinin qərarı ilə **paralel/əlavə data kimi yükləndi** (iki dəst yan-yana mövcuddur, kodlar toqquşmadığı üçün dublikat yaratmadı).
3. **`org.department`/`org.position` üçün 15/121 sətir artıq bazada var idi (fərqli əvvəlki sessiyadan, kodlar üst-üstə düşdüyü üçün yeniləndi, dublikat yaranmadı)** — `org.branches`, `finance.chart_of_accounts`, `inventory.warehouses`, `partner.partner`, `partner.bank_account`, `quality.quality_certificate`, `asset.asset_category`, `asset.asset` cədvəllərində də eyni hal müşahidə olundu: bu kodlar artıq mövcud idi (yəqin əvvəlki, yarımçıq qalmış bir sessiyadan) və yükləyici onları **UPDATE** etdi, dublikat yaratmadı.
4. **37 fayldan yalnız 6-sı (`org.company/site/department/position`, `hr.employee/employment_contract`) 2026-07-23 tarixli `ZARAT_INTAKE_DOLDURMA_HESABATI.md` hesabatına görə həqiqi şirkət mənbəyindən (`Zarat_verdikleri/`) gəlir.** Qalan 31 fayl həmin tarixdə rəsmi olaraq "BOŞ / Mənbədə yoxdur" kimi qeyd olunub, indi isə hər birində 1-3 sətir nümunəyə-bənzər data var. İstifadəçinin qərarı ilə bu 31 fayl da yükləndi, lakin **mənşəyi təsdiqlənməmiş** olaraq işarələnir.

---

## A qrupu — Birbaşa uyğun (adı/sxemi fərqli, konsepti eyni)

| Mənbə fayl | Hədəf cədvəl | Sətir | Nəticə |
|---|---|---|---|
| org/01_org_company.xlsx | org.companies | 3 | ✅ inserted=3 |
| org/05_org_site.xlsx | org.branches | 9 | ✅ updated=9 (kodlar əvvəldən mövcud idi) |
| org/07_org_department.xlsx | org.departments | 37 | ✅ inserted=37 (parent_dept_id: 15/15 həll olundu) |
| org/09_org_position.xlsx | org.positions | 121 | ✅ inserted=121 |
| hr/16_hr_employee.xlsx | **org.employees** (hr.employees yox) | 235 | ✅ inserted=235, FK itkisi=0 |
| finance/03_finance_account.xlsx | finance.chart_of_accounts | 2 | ✅ updated=2 |
| inventory/11_inventory_warehouse.xlsx | inventory.warehouses | 2 | ✅ updated=2 (site_code → `location` mətn sahəsi, FK sütunu yoxdur) |
| asset/34_asset_asset_category.xlsx | asset.asset_category | 2 | ✅ updated=2 |
| asset/35_asset_asset.xlsx | asset.asset | 1 | ✅ updated=1 |
| quality/30_quality_certificate.xlsx | quality.quality_certificate | 2 | ✅ updated=2 |

**Qeyd — org vs hr ikili sxem:** Hədəf bazada HƏM `org.employees`/`org.departments`, HƏM DƏ `hr.employees`/`hr.departments` var (paralel, fərqli quruluşlu). İstifadəçinin seçimi ilə `org.*` istifadə olundu, çünki intake faylının sütunları (`company_code`, `site_code`, `dept_code`, `position_code`) məhz `org.employees`-in FK strukturuna uyğundur. `hr.employees`/`hr.departments` bu yükləmədə **toxunulmadı** (boş qalıb).

---

## B qrupu — Fərqli hədəf cədvələ uyğunlaşdırıldı / birləşdirildi

| Mənbə fayl(lar) | Hədəf cədvəl | Uyğunlaşdırma | Nəticə |
|---|---|---|---|
| product/04_product_item_category.xlsx | **inventory.categories** | `product` sxemi yoxdur; konsept eynidir (kateqoriya iyerarxiyası) | ✅ inserted=3 |
| product/08_product_item.xlsx + product/23_product_price_list_line.xlsx | **inventory.products** | item→product sütunları uyğunlaşdı; `unit_price` price_list_line-dan `selling_price_local`-a köçürüldü | ✅ inserted=3 |
| product/20_product_bom.xlsx + product/21_product_bom_line.xlsx | **production.recipes** | BOM başlığı (ad/versiya) üçün hədəf sahə yoxdur, yalnız `product_id`+`component_id`+`quantity`+`scrap_percent` xətti köçürüldü | ✅ inserted=1, **skipped=1** (aşağıda bax) |
| partner/24_partner_partner.xlsx | partner.partner | `partner_kind`, `is_resident` üçün sütun yoxdur → `notes`-a yazıldı; `payment_term_code` mətn kimi `payment_terms`-a | ✅ updated=2 |
| partner/27_partner_bank_account.xlsx | partner.bank_account | `account_code`, `account_holder_name` üçün sütun yoxdur | ✅ updated=1 |
| partner/24 + partner/25_partner_supplier.xlsx | **purchase.suppliers** | partner+supplier sətirləri kod üzrə birləşdirildi | ✅ inserted=1 |
| partner/24 + partner/26_partner_customer.xlsx | **sales.customers** | partner+customer sətirləri kod üzrə birləşdirildi | ✅ inserted=1 |
| quality/29_quality_test_plan.xlsx | **quality.quality_control_plan** | `stage/parameter/min/max/unit` sahələri `plan_description` mətn sahəsinə birləşdirildi (ayrı sütun yoxdur) | ✅ inserted=1 |
| finance/32_finance_budget.xlsx + finance/33_finance_budget_line.xlsx | finance.budgets | Hədəf cədvəl "yastı" (bir sətir = hesab+dövr+məbləğ); `cc_code` → `dept_code` (org.cost_center-dan, cədvəl kimi YÜKLƏNMƏDİ, yalnız axtarış üçün istifadə olundu) → `department_id` | ✅ inserted=1 |

**production.recipes skip səbəbi:** `product/21_product_bom_line.xlsx`-də 2 komponent var (`XAM-QARGIDALI`, `XAM-SOYA`), amma `product/08_product_item.xlsx`-də yalnız `XAM-QARGIDALI` təyin olunub — `XAM-SOYA` heç bir item kartında yoxdur (mənbə datasında çatışmazlıq, düzəliş tələb edir).

---

## C qrupu — Heç bir qarşılığı yoxdur (YÜKLƏNMƏDİ)

| Fayl | Sətir | Sütunlar | Niyə yoxdur | Təklif (YALNIZ təklif — icra olunmayıb) |
|---|---|---|---|---|
| org/10_org_cost_center.xlsx | 2 | cc_code, cc_name, site_code, dept_code | `org` sxemində xərc mərkəzi cədvəli yoxdur | Yeni `org.cost_centers` cədvəli (finance.budgets və asset.asset-in indi boş qalan xərc-mərkəzi əlaqəsi üçün faydalı olardı) |
| finance/06_finance_vat_code.xlsx | 2 | vat_code, vat_name, rate_percent, account_code | `finance` sxemində ƏDV cədvəli yoxdur | Yeni `finance.vat_codes` cədvəli |
| hr/14_hr_work_schedule.xlsx | 2 | schedule_code, schedule_name, days_per_week, hours_per_day, shift_type | `hr` sxemində iş qrafiki cədvəli yoxdur | Yeni `hr.work_schedules` cədvəli + `org.employees`-ə `schedule_id` FK |
| hr/15_hr_salary_component.xlsx | 3 | component_code, comp_type, calc_method, taxable, default_amount | `hr` sxemində maaş komponenti cədvəli yoxdur | Yeni `hr.salary_components` + `hr.employee_salary_lines` |
| hr/17_hr_employment_contract.xlsx | 235 | contract_no, employee_code, contract_type, start_date, end_date, base_salary, currency | `hr`/`org` sxemində müqavilə cədvəli yoxdur | Yeni `hr.employment_contracts`. **Qeyd:** `base_salary` sütunu 235 sətrin hamısında BOŞ idi (0/235 dolu) — `org.employees.salary`-ə köçürmə cəhd edildi, heç nə köçmədi |
| hr/18_hr_employee_salary.xlsx | 1 | employee_code, component_code, amount | `hr` sxemində belə cədvəl yoxdur | Yuxarıdakı `hr.salary_components`-ə bağlı. **Data problemi:** `employee_code=EMP-0001` heç bir real işçi kodu ilə (format: `YEM-EMP-0xx`) üst-üstə düşmür — orphan sətir |
| inventory/19_inventory_location.xlsx | 1 | location_code, warehouse_code, zone, bin | `inventory` sxemində zona/bin cədvəli yoxdur | Yeni `inventory.locations` |
| logistics/37_logistics_vehicle.xlsx | 1 | vehicle_code, plate_no, vehicle_type, site_code, capacity, has_cold_chain | `logistics` sxemində nəqliyyat master cədvəli yoxdur (yalnız `shipment.vehicle_id` FK-si var, hədəfsiz) | Yeni `logistics.vehicles` |
| production/12_production_work_center.xlsx | 2 | work_center_code, site_code, capacity_per_day | `production` sxemində iş mərkəzi cədvəli yoxdur | Yeni `production.work_centers` |
| production/13_production_flock.xlsx | 1 | flock_code, breed, placement_date, initial_count | `production.batches` fərqli konseptdir (istehsal partiyası, quş sürüsü yox) | Yeni `production.flocks` |
| production/28_production_routing.xlsx | 1 | routing_code, item_code, work_center_code, step_no, operation | `production` sxemində marşrut/əməliyyat ardıcıllığı cədvəli yoxdur | Yeni `production.routings` |
| sales/31_sales_sales_target.xlsx | 1 | target_code, period, site_code, item_code, customer_code, target_qty/amount | `sales` sxemində hədəf/kvota cədvəli yoxdur | Yeni `sales.sales_targets` |
| asset/36_asset_equipment.xlsx | 1 | equipment_code, asset_code, equipment_type | `asset` sxemində ayrı avadanlıq-alt-cədvəli yoxdur (yalnız maintenance_* və spare_part var) | Yeni `asset.equipment` və ya mövcud `asset.asset`-ə alt-sətir kimi (fərqli kod fəzası olduğu üçün tövsiyə olunmur) |
| partner/02_partner_payment_term.xlsx | 2 | term_code, term_name, days, type | `partner` sxemində ödəniş-şərti kod cədvəli yoxdur (yalnız sərbəst mətn `payment_terms` sütunu var) | Yeni `partner.payment_terms` + `partner.partner.payment_term_id` FK (hazırda mətn kimi saxlanılır) |
| product/22_product_price_list.xlsx | 1 | price_list_code, currency, valid_from/to | Qiymət-siyahısı başlığı üçün cədvəl yoxdur (yalnız `inventory.products.selling_price_local` tək qiymət saxlayır) | Yeni `product.price_lists` (çoxlu qiymət siyahısı [topdan/pərakəndə] lazım olarsa) |
| product/20_product_bom.xlsx (başlıq hissəsi) | 1 | bom_name, output_qty, version | Yalnız xətlər `production.recipes`-ə köçdü, başlıq məlumatı (ad, versiya) itdi | `production.recipes`-ə `bom_code`/`version` sütunları əlavə etmək |

---

## Yekun say

- **A qrupu (birbaşa):** 10 fayl → 10 hədəf cədvəl, hamısı uğurla yükləndi
- **B qrupu (uyğunlaşdırılıb/birləşdirilib):** 11 fayl → 9 hədəf cədvəl (bəziləri birləşdi), 1 sətir data-çatışmazlığı üzündən keçirildi (skip)
- **C qrupu (heç bir qarşılığı yoxdur):** 16 fayl, YÜKLƏNMƏDİ — sxem genişləndirməsi tələb edir
- **Cəmi 37 fayldan 21-i yükləndi, 16-sı yüklənmədi**

## Yükləmə sonrası son sətir sayları (zarat_erp_2)

```
org.companies              6   (3 EXSELLER + 3 bizim)
org.branches                9   (yeniləndi)
org.departments            68  (31 EXSELLER + 37 bizim)
org.positions              198 (77 EXSELLER + 121 bizim)
org.employees               470 (235 EXSELLER + 235 bizim)
finance.chart_of_accounts    2
inventory.categories         3
inventory.products           3
inventory.warehouses         2
production.recipes           1
partner.partner               2
partner.bank_account          1
purchase.suppliers            1
sales.customers                1
quality.quality_certificate    2
quality.quality_control_plan    1
asset.asset_category            2
asset.asset                     1
finance.budgets                 1
```

## Digər data-keyfiyyəti qeydləri

- **9 işçi eyni FİN ilə 2-3 fərqli şirkətdə** ayrı `employee_code` altında qeydə alınıb (2026-07-23 hesabatında sənədləşib) — normal sayılır, amma HR şöbəsi əsas iş yerini dəqiqləşdirməlidir.
- **`hr.employment_contract.base_salary`** 235 sətrin heç birində doldurulmayıb — maaş məlumatı ümumiyyətlə mənbədə yoxdur.
- **`hr.employee_salary`** cədvəlindəki tək sətir orphan referans daşıyır (`EMP-0001` real kod formatına uyğun deyil).
- **`product/21_product_bom_line.xlsx`**-dəki `XAM-SOYA` komponenti item master-də yoxdur.
- **org/hr ikili sxem** hazırda yalnız `org.*` doldurulub; `hr.employees`/`hr.departments` bilərəkdən toxunulmayıb — tətbiq (frontend/backend) hansı sxemi istifadə etdiyini yoxlamaq lazımdır.
