# Excel Şablonlarının Doldurulması — Müəssisə üçün Təlimat

## Ümumi qaydalar

- Hər faylda **iki vərəq** var: **«Məlumat»** (doldurursunuz) və **«Təlimat»**
  (hər sütunun izahı).
- Başlıq sətrindəki hər sütunun üzərinə kursoru gətirsəniz, **şərh** çıxır —
  sahənin tipi, məcburiliyi və əlaqəsi orada yazılıb.
- **Boz rəngli nümunə sətirləri** doğru formatı göstərir. Öz məlumatınızı
  yazdıqdan sonra nümunə sətirlərini **silin**.

## Sütun rəngləri nə deməkdir

| Rəng | Məna |
|------|------|
| ■ Tünd göy başlıq | **Açar (PK)** — bu kod təkrarlanmamalıdır (hər sətirdə fərqli) |
| ■ Narıncı başlıq (↗) | **Əlaqə (FK)** — başqa şablondakı **koda** istinad edir |
| ■ Tünd boz başlıq | Məcburi sahə |
| ■ Açıq boz başlıq | İstəyə bağlı (boş qala bilər) |
| `*` işarəsi | Məcburi doldurulmalıdır |
| ▼ açılan siyahı | Yalnız siyahıdakı dəyərlərdən birini seçin |

## Doldurma sırası (ÇOX VACİB)

Faylların adındakı nömrə (01, 02, …, 37) **doldurma sırasıdır**.
Narıncı (FK) sütunu olan şablon, istinad etdiyi şablondan **sonra** doldurulur.

Məsələn:
1. Əvvəl **01_org_company** (şirkət kodlarını yaradırsınız: `ZRT-IMP`).
2. Sonra **05_org_site** — burada `company_code` sütununa məhz `ZRT-IMP` yazırsınız.
3. Sonra **07_org_department** — `site_code` sütununa obyekt kodunu yazırsınız.

Əgər istinad olunan kod hələ yaradılmayıbsa, FK sütununu boş qoymayın —
əvvəlcə əsas şablonu doldurun.

## Kod yaratma tövsiyəsi

- Kodlar qısa, böyük hərflə və mənalı olsun: `DIGAH`, `SIYEZEN`, `EMP-0001`,
  `YEM-START`, `601`.
- Boşluq, Azərbaycan hərfləri (ə, ı, ş…) və xüsusi simvol işlətməyin —
  yalnız `A-Z`, `0-9`, `-`, `_`.
- Bir dəfə verdiyiniz kodu sonradan dəyişməyin (bütün əlaqələr ona bağlıdır).

## Tarix və ədəd formatı

- Tarix: **GG.AA.İİİİ** (məs. `01.03.2020`).
- Onluq ədəd: nöqtə ilə (məs. `4.50`), min ayrıcı işlətməyin.
- Bəli/Xeyr sahələri: yalnız `BELI` və ya `XEYR`.

## Bitdikdən sonra

Doldurulmuş faylları `01_INTAKE/_DOLDURULMUSH` qovluğuna eyni adla qoyun.
Sual yaranarsa, hər faylın **«Təlimat»** vərəqinə baxın.
