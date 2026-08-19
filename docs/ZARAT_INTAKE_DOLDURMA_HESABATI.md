# Zarat ERP — 01_INTAKE Doldurma Hesabatı
**Tarix:** 2026-07-23  
**Mənbə fayllar:** 3 Excel (Zarat_verdikleri/)  
**Çıxış qovluğu:** `~/Desktop/Zarat_ERP/01_INTAKE_DOLDURULMUS/`

---

## Xülasə cədvəli

| # | Sxem | Cədvəl | Status | Doldurulma |
|---|------|--------|--------|------------|
| 1 | ORG | org.company | ✅ TAM HAZIR | 3/3 sütun |
| 2 | ORG | org.site | ✅ TAM HAZIR | 9 obyekt |
| 3 | ORG | org.department | ✅ TAM HAZIR | 37 şöbə |
| 4 | ORG | org.position | ✅ TAM HAZIR | 121 vəzifə |
| 5 | ORG | org.cost_center | ⚪ BOŞ | Mənbədə yoxdur |
| 6 | FINANCE | finance.account | ⚪ BOŞ | Mənbədə yoxdur |
| 7 | FINANCE | finance.vat_code | ⚪ BOŞ | Mənbədə yoxdur |
| 8 | FINANCE | finance.budget | ⚪ BOŞ | Mənbədə yoxdur |
| 9 | FINANCE | finance.budget_line | ⚪ BOŞ | Mənbədə yoxdur |
| 10 | PARTNER | partner.payment_term | ⚪ BOŞ | Mənbədə yoxdur |
| 11 | PARTNER | partner.partner | ⚪ BOŞ | Mənbədə yoxdur |
| 12 | PARTNER | partner.supplier | ⚪ BOŞ | Mənbədə yoxdur |
| 13 | PARTNER | partner.customer | ⚪ BOŞ | Mənbədə yoxdur |
| 14 | PARTNER | partner.bank_account | ⚪ BOŞ | Mənbədə yoxdur |
| 15 | PRODUCT | product.item_category | ⚪ BOŞ | Mənbədə yoxdur |
| 16 | PRODUCT | product.item | ⚪ BOŞ | Mənbədə yoxdur |
| 17 | PRODUCT | product.bom | ⚪ BOŞ | Mənbədə yoxdur |
| 18 | PRODUCT | product.bom_line | ⚪ BOŞ | Mənbədə yoxdur |
| 19 | PRODUCT | product.price_list | ⚪ BOŞ | Mənbədə yoxdur |
| 20 | PRODUCT | product.price_list_line | ⚪ BOŞ | Mənbədə yoxdur |
| 21 | INVENTORY | inventory.warehouse | ⚪ BOŞ | Mənbədə yoxdur |
| 22 | INVENTORY | inventory.location | ⚪ BOŞ | Mənbədə yoxdur |
| 23 | PRODUCTION | production.work_center | ⚪ BOŞ | Mənbədə yoxdur |
| 24 | PRODUCTION | production.flock | ⚪ BOŞ | Mənbədə yoxdur |
| 25 | PRODUCTION | production.routing | ⚪ BOŞ | Mənbədə yoxdur |
| 26 | LOGISTICS | logistics.vehicle | ⚪ BOŞ | Mənbədə yoxdur |
| 27 | HR | hr.work_schedule | ⚪ BOŞ | Mənbədə yoxdur |
| 28 | HR | hr.salary_component | ⚪ BOŞ | Mənbədə yoxdur |
| 29 | HR | hr.employee | ✅ TAM HAZIR | 235 işçi |
| 30 | HR | hr.employment_contract | 🟡 QİSMƏN HAZIR | 235 müqavilə (maaş yoxdur) |
| 31 | HR | hr.employee_salary | ⚪ BOŞ | Maaş məbləği mənbədə yoxdur |
| 32 | ASSET | asset.asset_category | ⚪ BOŞ | Mənbədə yoxdur |
| 33 | ASSET | asset.asset | ⚪ BOŞ | Mənbədə yoxdur |
| 34 | ASSET | asset.equipment | ⚪ BOŞ | Mənbədə yoxdur |
| 35 | QUALITY | quality.test_plan | ⚪ BOŞ | Mənbədə yoxdur |
| 36 | QUALITY | quality.certificate | ⚪ BOŞ | Mənbədə yoxdur |
| 37 | SALES | sales.sales_target | ⚪ BOŞ | Mənbədə yoxdur |

---

## ORG Sxemi

### org.company — ✅ TAM HAZIR
- Doldurulan sətir sayı: 3
- Doldurulan sütunlar: company_code, legal_name, short_name, legal_form, is_active
- BOŞ qalan sütunlar: voen, reg_date, address, phone, email
- Mənbə: Fayl adlarından çıxarıldı (Fiziki şəxs / MMC)
- Qeyd: VÖEN nömrələri, qeydiyyat tarixi, ünvan mənbə fayllarında yoxdur — şirkətdən tələb olunmalıdır. `ZRT-YEM` hüquqi forması "Fiziki şəxs" (Qardaşov Vüqar adına qeydiyyatlı).

| company_code | legal_name | legal_form |
|---|---|---|
| ZRT-IMP | Zarat Import Export MMC | MMC |
| ZRT-POULTRY | Zarat Poultry MMC | MMC |
| ZRT-YEM | Qardaşov Vüqar (Zarat Yem Fabriki) | Fiziki şəxs |

### org.site — ✅ TAM HAZIR
- Doldurulan sətir sayı: 9
- Doldurulan sütunlar: site_code, company_code, site_name, site_type, region, is_active
- BOŞ qalan sütunlar: address, phone
- Mənbə: `Struktur bölmə` sütunundan çıxarılan unikal fiziki yerlər
- Qeyd: Dəqiq ünvanlar bilinmir — şirkətdən tələb olunmalıdır. 9 obyekt: 2 YEM, 6 IMP, 1 POL.

### org.department — ✅ TAM HAZIR
- Doldurulan sətir sayı: 37
- Doldurulan sütunlar: dept_code, dept_name, site_code, parent_dept_code, is_active
- BOŞ qalan sütunlar: yoxdur
- Mənbə: `Struktur bölmə` sütunundan unikal şöbələr çıxarıldı
- Qeyd: İyerarxik quruluş qorunub — məs. `IMP-ANL-BEYL` → parent: `IMP-ANL`.

### org.position — ✅ TAM HAZIR
- Doldurulan sətir sayı: 121
- Doldurulan sütunlar: position_code, position_name, dept_code, is_active
- BOŞ qalan sütunlar: grade
- Mənbə: `Vəzifənin adı` sütunundan çıxarıldı, hər şöbə+vəzifə kombinasiyası üçün unikal kod yaradıldı
- Qeyd: Eyni vəzifə adı (məs. "Fəhlə") fərqli şöbələrdə fərqli position_code alıb — bu düzgündür. Hərflər böyük/kiçik uyğunsuzluğuna diqqət: "fəhlə" və "Fəhlə" hər ikisi mövcuddur (mənbə faylındakı kimi saxlanıldı, birləşdirilməyib).

### org.cost_center — ⚪ BOŞ
- Doldurulan sətir sayı: 0
- Mənbə: Göndərilən fayllarda xərc mərkəzi məlumatı yoxdur
- Qeyd: Xərc mərkəzlərini (CC) şirkətin maliyyə/mühasibat şöbəsi doldurmalıdır.

---

## FINANCE Sxemi

### finance.account — ⚪ BOŞ
- Mənbə: Yoxdur
- Qeyd: Mühasibat hesablar planı (AZS 26/MHBS) şirkətin baş mühasibi tərəfindən doldurulmalıdır.

### finance.vat_code — ⚪ BOŞ
- Mənbə: Yoxdur

### finance.budget — ⚪ BOŞ
- Mənbə: Yoxdur

### finance.budget_line — ⚪ BOŞ
- Mənbə: Yoxdur

---

## PARTNER Sxemi

### Bütün 5 cədvəl — ⚪ BOŞ
- Mənbə: Göndərilən fayllarda təchizatçı, müştəri, ödəniş şərti məlumatı yoxdur
- Qeyd: Satınalma/satış şöbəsi bu sxemi doldurmaqdan məsuldur.

---

## PRODUCT Sxemi

### Bütün 6 cədvəl — ⚪ BOŞ
- Mənbə: Göndərilən fayllarda məhsul, BOM, qiymət məlumatı yoxdur
- Qeyd: İstehsalat və texnoloji şöbə məsuliyyətindədir.

---

## INVENTORY Sxemi

### inventory.warehouse — ⚪ BOŞ
- Mənbə: Yoxdur
- Qeyd: Anbar kodları (site_code-a əsaslı) maliyyə/anbar müdiri tərəfindən doldurulmalıdır.
  Mövcut obyekt kodları: `SIYEZEN`, `YEM-CEL`, `IMP-BAKI`, `IMP-GENCE`, `IMP-BEYL`, `IMP-CEL`, `IMP-AGCAB`, `IMP-ZARAT`, `DIGAH` — hər birinin anbarda növü (XAMMAL/HAZIR/SOYUDUCU) bilinmir.

### inventory.location — ⚪ BOŞ
- Mənbə: Yoxdur

---

## PRODUCTION Sxemi

### Bütün 3 cədvəl — ⚪ BOŞ
- Mənbə: Yoxdur
- Qeyd: İş mərkəzləri (xətlər), quş sürüləri, istehsal marşrutu — texnoloji şöbə məsuliyyətidir.

---

## LOGISTICS Sxemi

### logistics.vehicle — ⚪ BOŞ
- Mənbə: Yoxdur
- Qeyd: Nəqliyyat parkı məlumatı (dövlət nişanı, növ, soyuq zəncir) şirkətin nəqliyyat/logistika şöbəsindən tələb olunmalıdır.

---

## HR Sxemi

### hr.work_schedule — ⚪ BOŞ
- Mənbə: İş qrafiki məlumatı göndərilən fayllarda yoxdur
- Qeyd: 2 ən azı standart qrafik yaradılmalıdır: əsas iş rejimi (5×8 və ya 6×1) və növbəli rejim. HR şöbəsi bu cədvəli doldurmalı, sonra `hr.employee.schedule_code` sütunu yenilənməlidir.

### hr.salary_component — ⚪ BOŞ
- Mənbə: Maaş komponentləri (vəzifə maaşı, gəlir vergisi, DSMF) mənbə fayllarında yoxdur
- Qeyd: Azərbaycan əmək haqqı hesablaması üçün ən azı: VEZIFE-MAAS (QAZANC/SABİT), GELIR-VERGISI (TUTULMA/%20), DSMF-ISCI (TUTULMA/%3), DSMF-ISVERENM (TUTULMA/%22) komponentləri yaradılmalıdır.

### hr.employee — ✅ TAM HAZIR
- Doldurulan sətir sayı: **235 işçi**
  - Zarat Yem Fabriki: 52 işçi
  - Zarat Import Export MMC: 79 işçi
  - Zarat Poultry MMC: 104 işçi
- Doldurulan sütunlar: employee_code, first_name, last_name, father_name, fin, birth_date, gender, hire_date, company_code, site_code, dept_code, position_code, is_active
- BOŞ qalan sütunlar: phone, email, schedule_code
- Mənbə: 3 mənbə faylından birbaşa köçürüldü
- ⚠ Qeyd — **9 işçi birdən çox şirkətdə çalışır** (eyni FİN, fərqli fayllar):

| FİN | Ad | Şirkətlər |
|---|---|---|
| 1PCSZL5 | Ömər İlyasov | YEM + IMP + POL (3 şirkət) |
| 4HCV9LB | Vasif Quliyev | YEM + IMP |
| 5GMWKC7 | Röyal Sultanov | YEM + IMP |
| 6FJ3UFY | Əşrəf İmanov | YEM + IMP |
| 5V89YSM | Rövşən Rzayev | YEM + IMP |
| 1YLXKB5 | Hamlet Nəsibov | YEM + IMP |
| 1TGB24H | Nizami Adgözəlov | YEM + IMP |
| 4Z3GMMF | Nemət Musayev | YEM + IMP |
| 55R7V3K | Emin Səfərov | IMP + POL |

Bu işçilər üçün **hər şirkətdə ayrı employee_code** verilmişdir (ERP-də normaldır: hər şirkət öz işçi kartını aparır). Şirkətin HR şöbəsi hansının əsas (ƏSAS) işyeri olduğunu dəqiqləşdirsin.

### hr.employment_contract — 🟡 QİSMƏN HAZIR
- Doldurulan sətir sayı: 235
- Doldurulan sütunlar: contract_no, employee_code, contract_type, start_date, end_date, currency
- BOŞ qalan sütunlar: **base_salary** (mənbə fayllarında maaş rəqəmi yoxdur)
- Mənbə: Müqavilə başlama/bitmə tarixi hər fayldan köçürüldü
- Qeyd: Bütün müqavilələr `MÜDDƏTLİ` olaraq işarələndi (end_date dolu). Bəzi müqavilələrin tarixi artıq keçib (məs. 2025-ci il sonu bitmiş müqavilələr) — HR şöbəsi bu işçilərin yenilənmiş müqavilələrini göndərməlidir.

### hr.employee_salary — ⚪ BOŞ
- Mənbə: Maaş məbləğləri göndərilən fayllarda yoxdur
- Qeyd: hr.salary_component doldurulduqdan sonra hər işçi üçün maaş komponent məbləğlərini HR/Mühasibat şöbəsi doldurmalıdır.

---

## ASSET, QUALITY, SALES Sxemləri — ⚪ BOŞ
- Mənbə: Göndərilən fayllarda bu sxemlərə uyğun heç bir məlumat yoxdur.

---

## Uyğunlaşdırma xəritəsi (Mapping)

Mənbə fayl sütunları → Hədəf sxem/sütun:

| Mənbə sütun | Hədəf cədvəl.sütun | Uyğunluq |
|---|---|---|
| FİN | hr.employee.fin | Dəqiq |
| Doğum tarixi | hr.employee.birth_date | Dəqiq (format çevrildi DD.MM.YYYY) |
| Tam adı | hr.employee.first_name + last_name + father_name | Məna üzrə (parsinq: AD SOYAD ATA OĞLU/QIZI) |
| Tam adı → sondakı OĞLU/QIZI | hr.employee.gender | Çıxarıldı (KISI/QADIN) |
| Vəzifənin adı | org.position.position_name + hr.employee.position_code | Məna üzrə |
| Struktur bölmə | org.site.site_code + org.department.dept_code + hr.employee.site_code/dept_code | Məna üzrə (iyerarxik parsinq) |
| Əsas müqavilənin başlama tarixi | hr.employment_contract.start_date + hr.employee.hire_date | Dəqiq |
| Müqavilənin bitmə tarixi | hr.employment_contract.end_date | Dəqiq |
| Fayl adı (şirkət) | hr.employee.company_code | Çıxarıldı (ZRT-YEM/IMP/POULTRY) |
| İş yeri: əsas/əlavə | (hr.employment_contract-a qeyd kimi əlavə edildi) | Məlumat saxlanıldı |
| ssn (DSMF nömrəsi) | (bu sxemdə sütun yoxdur) | Itirildi — şirkətdən soruşun |

---

## Şirkətdən əlavə tələb olunan məlumatlar

Aşağıdakı cədvəllər/sütunlar göndərilən fayllarda heç tapılmadı. Bu məlumatlar olmadan ERP-in maliyyə, satış, istehsal və anbar modulları işləyə bilməz:

### 🔴 TƏCİLİ (Baza yükləməsindən əvvəl mütləq lazımdır)

**1. ORG / org.company:** Zarat İmport Export MMC, Zarat Poultry MMC və Qardaşov Vüqar (Yem Fabriki) üçün VÖEN nömrələri, hüquqi qeydiyyat tarixi və rəsmi ünvanlar — bu məlumatlar vergi hesabatları və sənəd dövriyyəsi üçün məcburidir.

**2. HR / hr.work_schedule:** İş qrafikləri (standart 5×8, növbəli 12 saat, 6×1 həftə) — işçi kartları `schedule_code`-a istinad edir; bu cədvəl boş olarsa işçiləri bazaya yükləmək mümkün olmayacaq.

**3. HR / hr.salary_component:** Maaş komponentlərinin siyahısı (ən azı: vəzifə maaşı, gəlir vergisi, DSMF işçi payı, DSMF işəgötürən payı) — `hr.employee_salary` bu siyahıya istinad edir.

**4. HR / hr.employment_contract.base_salary:** Hər 235 işçi üçün əsas maaş rəqəmi göndərilmiş faylda yoxdur — bu məlumat müqavilə kartının ən vacib sahəsidir. Zəhmət olmasa HR şöbəsindən hər işçinin aylıq maaş məbləğini ayrıca sütun kimi göndərməyinizi xahiş edirik.

### 🟡 MÜHÜMLİ (Birinci həftədə lazımdır)

**5. FINANCE / finance.account:** Mühasibat hesablar planı — büdcə, aktiv amortizasiyası, ƏDV hesablamaları üçün. Baş mühasibdən "hesablar planı" sənədi alınmalıdır.

**6. INVENTORY / inventory.warehouse:** Hər obyektdəki anbarların adı, növü (xammal/hazır/soyuducu) — 9 obyekt üçün anbar siyahısı. Anbar müdirindən alınmalıdır.

**7. PARTNER / partner.partner:** Aktiv təchizatçı və müştərilərin siyahısı (ad, VÖEN, ödəniş şərtləri, əlaqə məlumatları) — satınalma və satış modulları üçün məcburidir.

### 🟢 VACIBLƏR (İlk ay ərzində lazımdır)

**8. PARTNER / partner.bank_account:** Təchizatçı/müştərilərin IBAN, SWIFT, bank adı — ödəniş sənədləri üçün. Bank müdirindən rəsmi rekvizit məktubu alınmalıdır.

**9. PRODUCT / product.item:** Bütün məhsul, xammal, qablaşdırma materiallarının siyahısı (məhsul kodu, ad, ölçü vahidi, kateqoriya) — istehsalat, anbar və satış modulları bu cədvəlsiz işləyə bilməz.

**10. LOGISTICS / logistics.vehicle:** Şirkətin nəqliyyat parkı (dövlət nişanı, marka/model, soyuq zəncir var/yox) — ərzaq daşıması üçün soyuq zəncir sertifikasiyası vacibdir. Nəqliyyat şöbəsindən alınmalıdır.

**11. HR / hr.employee_salary:** Artıq keçmiş tarixli müqavilə olan işçilər (2025-ci ildə bitmiş müqavilələr) — bunlar üçün ya yeni müqavilə göndərilməli, ya da `is_active=XEYR` təsdiqlənməlidir. Cəmi bu kateqoriyaya aid bir neçə onlarla işçi aşkarlanmışdır.

---

## Texniki qeydlər

- **Dublikat FİN:** 9 işçi 2 və ya 3 şirkətdə qeydiyyatda görünür. Bu Azərbaycan əmək qanunvericiliyinə görə normaldır (əlavə iş yeri), amma hər şirkətin öz müqaviləsi ayrı işlənilməlidir.
- **Müqavilə növü:** Bütün müqavilələr `MÜDDƏTLİ` — mənbə faylında müddətsiz müqavilə yoxdur.
- **Mənbə izləmə:** Hər işçi sətirinin mənbə faylı `_mənbə` sütununda yazılmışdır.
- **VÖEN sütunu (ssn):** Mənbə faylda `ssn` sütunu var (DSMF şəxs kodu?) — bizim sxemdə bu sütun yoxdur; bu məlumat itirilmişdir. Şirkətdən aydınlaşdırın.
- **Tarix formatı:** Bütün tarixlər `DD.MM.YYYY` formatına çevrilmişdir.

---

*Bu hesabat avtomatik olaraq Python skripti ilə yaradılmışdır. Yoxlama üçün `01_INTAKE_DOLDURULMUS/` qovluğundakı doldurulmuş faylları açın.*
