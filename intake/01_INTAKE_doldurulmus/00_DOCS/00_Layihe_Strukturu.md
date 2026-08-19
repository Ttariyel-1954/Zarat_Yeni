# Zarat Group ERP — Layihə Strukturu

Bu sənəd bütün ERP layihəsinin qovluq strukturunu və iş axınını izah edir.
İndiki mərhələdə (məlumat toplama) yalnız **01_INTAKE** hissəsi aktivdir —
müəssisə Excel şablonlarını doldurur, biz onları bazaya yükləyirik.

## Tam layihə strukturu

```
Zarat_ERP/
├── 00_DOCS/                         # Sənədlər və təlimatlar
│   ├── 00_Layihe_Strukturu.md       # bu sənəd
│   └── 01_Doldurma_Telimati.md      # müəssisə üçün doldurma qaydası
│
├── 01_INTAKE/                       # ▶ MÜƏSSİSƏDƏN TƏLƏB OLUNAN 37 ŞABLON
│   ├── 00_INDEX_və_əlaqələr.xlsx    # yükləmə sırası + FK xəritəsi + siyahı
│   ├── org/         (5 şablon)      # təşkilat strukturu
│   ├── finance/     (4 şablon)      # hesablar planı, ƏDV, büdcə
│   ├── product/     (6 şablon)      # nomenklatura, resept/BOM, qiymət
│   ├── partner/     (5 şablon)      # təchizatçı, müştəri, bank, şərt
│   ├── hr/          (5 şablon)      # işçi, müqavilə, maaş
│   ├── inventory/   (2 şablon)      # anbar, yerləşmə
│   ├── production/  (3 şablon)      # iş mərkəzi, marşrut, sürü
│   ├── quality/     (2 şablon)      # test planı, sertifikat
│   ├── asset/       (3 şablon)      # aktiv qrupu, aktiv, avadanlıq
│   ├── sales/       (1 şablon)      # satış hədəfi
│   ├── logistics/   (1 şablon)      # nəqliyyat
│   └── _DOLDURULMUSH/               # müəssisə doldurduqca fayllar bura qoyulur
│
├── 02_DDL/                          # PostgreSQL sxem skriptləri (növbəti mərhələ)
│   ├── 00_schemas.sql               #   14 schema (CREATE SCHEMA ...)
│   ├── 01_org.sql ... 14_sys.sql    #   hər modulun cədvəlləri
│   ├── 90_foreign_keys.sql          #   bütün FK-lər (51 əlaqə)
│   └── 95_rls_policies.sql          #   sətir səviyyəli təhlükəsizlik
│
├── 03_LOADERS/                      # Excel → PostgreSQL yükləyiciləri
│   ├── load_order.yaml              #   01_INDEX-dəki sıra ilə eyni
│   └── load_intake.py               #   kodları ID-lərə çevirib INSERT edir
│
├── 04_SEED/                         # ERP-nin ÖZÜNÜN doldurduğu istinad cədvəlləri
│   │                                #   (UoM, valyuta, incoterm, HS kod, status-lar)
│   └── reference_data.sql
│
└── 05_REPORTS/                      # Hesabat / BI şablonları
```

## İki növ cədvəl

1. **Müəssisədən gələn 37 cədvəl** (master data) — `01_INTAKE` qovluğundakı
   Excel şablonları ilə toplanır. Bunlar olmadan ERP işləyə bilməz.
2. **ERP-nin özünün yaratdığı cədvəllər** (~60 əməliyyat cədvəli) — satınalma
   sifarişləri, anbar hərəkətləri, istehsal sifarişləri, qaimələr, mühasibat
   yazılışları və s. Bunlar sistemdə gündəlik iş zamanı avtomatik yaranır;
   müəssisədən doldurulma tələb etmir.

## İş axını (indiki mərhələ)

1. Müəssisəyə `01_INTAKE` qovluğundakı şablonlar verilir.
2. Müəssisə **00_INDEX → Yükləmə_sırası** ardıcıllığı ilə şablonları doldurur.
3. Doldurulmuş fayllar `_DOLDURULMUSH` qovluğuna qoyulur.
4. Biz hər faylı yoxlayıb (FK kodları uyğunluğu) PostgreSQL-ə yükləyirik.
5. Növbəti faza: `02_DDL` və `03_LOADERS` ilə tam baza qurulur.

## FK (əlaqə) prinsipi

Şablonlar bir-birinə **rəqəm ID ilə deyil, KOD ilə** bağlanır.
Məsələn, `org.site` cədvəlindəki `company_code` sütununa `org.company`
cədvəlində yazılmış kodu (məs. `ZRT-IMP`) yazırsınız. Yükləmə zamanı bu
kodlar avtomatik daxili ID-lərə çevrilir. Buna görə şablonları **sıra ilə**
doldurmaq vacibdir — əvvəl istinad olunan cədvəl, sonra ona istinad edən.

Bütün 51 əlaqə **00_INDEX → FK_xəritəsi** vərəqində verilib.
