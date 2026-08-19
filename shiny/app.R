# ══════════════════════════════════════════════════════════════════════════
#  ZARAT ERP — İdarəetmə Paneli (Shiny)
#  Zarat Import Export MMC · «Simurq» toyuqçuluq brendi · Siyəzən yem zavodu
#
#  Bu tətbiq zarat_erp_2 PostgreSQL bazasına qoşulur. Əgər bağlantı mövcud
#  deyilsə (məs. təqdimat başqa kompüterdə edilirsə), avtomatik olaraq
#  DEMO rejiminə keçir və sintetik (nümunəvi) data ilə işləyir — beləliklə
#  təqdimat zamanı bağlantı problemi tətbiqi dayandırmır.
#
#  AI Köməkçisi tabı Anthropic Claude API-yə qoşulur (Hybrid Approach:
#  AI özü SQL yazmır, əvvəlcədən hesablanmış real KPI-ları izah edir).
#
#  ──────────────────────────────────────────────────────────────────────
#  BAXILAN SXEMALAR (zarat_erp_2 bazasında 14 sxemadan 13-ü əhatə olunub)
#  ──────────────────────────────────────────────────────────────────────
#   1. inventory  — Anbar (dashboard modulu + AI)
#   2. finance    — Maliyyə (dashboard modulu + AI)
#   3. hr         — HR / Əmək haqqı (dashboard modulu + AI)
#   4. trade      — İdxal-İxrac (dashboard modulu + AI)
#   5. production — İstehsalat (yalnız AI kontekst)
#   6. sales      — Satış (yalnız AI kontekst)
#   7. logistics  — Logistika (yalnız AI kontekst)
#   8. asset      — Əsas Vəsaitlər (yalnız AI kontekst)
#   9. purchase   — Təchizat (yalnız AI kontekst)
#  10. quality    — Keyfiyyət (yalnız AI kontekst)
#  11. org        — Təşkilati Struktur (yalnız AI kontekst)
#  12. partner    — Tərəfdaşlar (yalnız AI kontekst)
#  13. system     — Sistem / Təhlükəsizlik (yalnız AI kontekst)
#  ──────────────────────────────────────────────────────────────────────
#  HƏLƏ ƏHATƏ OLUNMAYIB:
#  14. public  — yalnız test_table (real biznes məlumatı deyil, əhəmiyyətsiz)
#  ──────────────────────────────────────────────────────────────────────
# ══════════════════════════════════════════════════════════════════════════

# ---- 1. PAKETLƏR --------------------------------------------------------
# Əvvəlcə bir dəfə qurun (əgər qurulu deyilsə):
# install.packages(c("shiny","bslib","bsicons","DT","DBI","RPostgres",
#                     "dplyr","plotly","scales","httr2","jsonlite","tibble","htmltools","commonmark"))

library(shiny)
library(bslib)
library(bsicons)
library(DT)
library(DBI)
library(RPostgres)
library(dplyr)
library(plotly)
library(scales)
library(httr2)
library(jsonlite)
library(tibble)
library(htmltools)
library(commonmark)

# ---- .env faylından açarların oxunması -----------------------------------
# Sizin ~/Desktop/arti_ess_api/.env faylınızdan ANTHROPIC_API_KEY oxunur.
# Kodun özündə heç bir şifrə/açar saxlanmır.

load_env_file <- function(path) {
  path <- path.expand(path)
  if (!file.exists(path)) {
    message("Qeyd: .env faylı tapılmadı (", path, ") — mühit dəyişənlərinə etibar edilir.")
    return(invisible(NULL))
  }
  lines <- readLines(path, warn = FALSE)
  lines <- lines[nzchar(trimws(lines)) & !startsWith(trimws(lines), "#")]
  for (ln in lines) {
    parts <- strsplit(ln, "=", fixed = TRUE)[[1]]
    if (length(parts) >= 2) {
      key <- trimws(parts[1])
      value <- trimws(paste(parts[-1], collapse = "="))
      value <- gsub('^["\']|["\']$', "", value)  # başında/sonunda dırnaq varsa təmizlə
      do.call(Sys.setenv, setNames(list(value), key))
    }
  }
  invisible(NULL)
}

load_env_file("~/Desktop/arti_ess_api/.env")

# ---- 2. KONFİQURASİYA ----------------------------------------------------
# Real dəyərləri mühit dəyişənləri ilə verin (.Renviron faylında saxlayın,
# heç vaxt kodun içinə şifrə yazmayın):
#   ZARAT_DB_HOST=localhost
#   ZARAT_DB_PORT=5432
#   ZARAT_DB_NAME=zarat_erp_2
#   ZARAT_DB_USER=royatalibova
#   ZARAT_DB_PASSWORD=...
#   ANTHROPIC_API_KEY=sk-ant-...

DB_CONFIG <- list(
  host     = Sys.getenv("ZARAT_DB_HOST", "localhost"),
  port     = as.integer(Sys.getenv("ZARAT_DB_PORT", "5432")),
  dbname   = Sys.getenv("ZARAT_DB_NAME", "zarat_erp_2"),
  user     = Sys.getenv("ZARAT_DB_USER", "royatalibova"),
  password = Sys.getenv("ZARAT_DB_PASSWORD", "")
)

ANTHROPIC_API_KEY <- Sys.getenv("ANTHROPIC_API_KEY", "")
CLAUDE_MODEL <- "claude-sonnet-5"

# Claude Sonnet 5 qiymətləri (1 milyon token üçün, USD).
# 31 avqust 2026-a qədər tanıtım qiyməti keçərlidir, ondan sonra standart.
get_claude_pricing <- function() {
  if (Sys.Date() <= as.Date("2026-08-31")) {
    list(input = 2, output = 10)
  } else {
    list(input = 3, output = 15)
  }
}

BRAND <- list(
  primary   = "#B9852F",   # kəhrəba/qızılı — Simurq brendinə istinad
  secondary = "#2FA79A",   # tünd teal — data/analitika aksenti
  success   = "#3E8E5E",
  danger    = "#C0453B",
  bg        = "#F7F8FA",
  fg        = "#1C2230",
  card_bg   = "#FFFFFF"
)

# AI Köməkçisinin əhatə etdiyi bütün sxemalar (sidebar-da göstərmək üçün)
ALL_SCHEMAS <- c(
  "Anbar", "Maliyyə", "HR", "İdxal-İxrac", "İstehsalat", "Satış",
  "Logistika", "Əsas Vəsaitlər", "Təchizat", "Keyfiyyət",
  "Təşkilati Struktur", "Tərəfdaşlar", "Sistem"
)

# ---- 3. BAZA QOŞULMASI (uğursuz olarsa DEMO rejiminə keçir) --------------

get_db_connection <- function() {
  tryCatch({
    con <- DBI::dbConnect(
      RPostgres::Postgres(),
      host = DB_CONFIG$host, port = DB_CONFIG$port,
      dbname = DB_CONFIG$dbname, user = DB_CONFIG$user,
      password = DB_CONFIG$password, connect_timeout = 5
    )
    con
  }, error = function(e) {
    message("Baza bağlantısı alınmadı, DEMO rejiminə keçilir: ", conditionMessage(e))
    NULL
  })
}

CON <- get_db_connection()
DEMO_MODE <- is.null(CON)

# Sorğunu təhlükəsiz işlət: uğurlu olsa real nəticəni, olmasa demo_fn()-i qaytar
safe_query <- function(sql, demo_fn) {
  if (DEMO_MODE) return(demo_fn())
  tryCatch({
    res <- DBI::dbGetQuery(CON, sql)
    if (nrow(res) == 0) return(demo_fn())
    res
  }, error = function(e) {
    message("Sorğu xətası (demo dataya keçilir): ", conditionMessage(e))
    demo_fn()
  })
}

# ---- 4. DEMO DATA GENERATORLARI ------------------------------------------
set.seed(42)

demo_inventory_by_category <- function() {
  tibble(
    category = c("Yem xammalı", "Hazır yem", "Ehtiyat hissələr", "Qablaşdırma", "Baytarlıq"),
    total_value = round(runif(5, 40000, 320000))
  )
}

demo_inventory_trend <- function() {
  tibble(
    day = seq(Sys.Date() - 29, Sys.Date(), by = "day"),
    movements = round(runif(30, 20, 140))
  )
}

demo_low_stock <- function() {
  tibble(
    sku = sprintf("SKU-%04d", sample(1000:9999, 6)),
    name = c("Qarğıdalı unu", "Soya kunjarası", "Vitamin premiksi", "Plastik torba 25kg",
             "Baytarlıq preparatı A", "Metal konteyner"),
    quantity = c(120, 340, 45, 890, 12, 30),
    reorder_level = c(500, 400, 100, 1000, 50, 60)
  )
}

demo_finance_kpis <- function() {
  tibble(income = 842000, expense = 611000, profit = 231000)
}

demo_income_expense <- function() {
  months <- format(seq(Sys.Date() - 335, Sys.Date(), by = "month"), "%Y-%m")
  tibble(
    month = months,
    income = round(runif(length(months), 550000, 950000)),
    expense = round(runif(length(months), 400000, 750000))
  )
}

demo_overdue_invoices <- function() {
  tibble(
    invoice_no = sprintf("INV-%05d", sample(10000:99999, 5)),
    client_name = c("Baku Trade LLC", "Siyəzən Aqro", "Xəzər Logistics", "Şimal Ticarət", "Cənub İxrac"),
    amount = round(runif(5, 5000, 45000)),
    days_overdue = sample(3:60, 5)
  )
}

demo_salary_by_department <- function() {
  tibble(
    department = c("İstehsalat", "Anbar", "Maliyyə", "İnzibati", "Satış", "Baytarlıq"),
    avg_salary = round(runif(6, 650, 1450)),
    employees = sample(15:120, 6)
  )
}

demo_hiring_trend <- function() {
  months <- format(seq(Sys.Date() - 335, Sys.Date(), by = "month"), "%Y-%m")
  tibble(
    month = rep(months, 2),
    type = rep(c("İşə qəbul", "İşdən çıxma"), each = length(months)),
    count = c(round(runif(length(months), 3, 18)), round(runif(length(months), 1, 9)))
  )
}

demo_employees <- function() {
  tibble(
    full_name = paste("İşçi", 1:120),
    department = sample(c("İstehsalat","Anbar","Maliyyə","İnzibati","Satış","Baytarlıq"), 120, replace = TRUE),
    position = sample(c("Operator","Mütəxəssis","Baş mütəxəssis","Şöbə müdiri","Köməkçi"), 120, replace = TRUE),
    hired_at = sample(seq(as.Date("2018-01-01"), Sys.Date(), by = "day"), 120)
  )
}

demo_export_by_country <- function() {
  tibble(
    country = c("Gürcüstan", "Rusiya", "Türkiyə", "İran", "BƏƏ"),
    value_usd = round(runif(5, 80000, 520000))
  )
}

demo_delayed_shipments <- function() {
  tibble(
    shipment_no = sprintf("SHP-%05d", sample(10000:99999, 4)),
    country = c("Rusiya", "İran", "Gürcüstan", "Türkiyə"),
    days_late = sample(2:20, 4)
  )
}

demo_shipments <- function() {
  tibble(
    shipment_no = sprintf("SHP-%05d", sample(10000:99999, 60)),
    country = sample(c("Gürcüstan","Rusiya","Türkiyə","İran","BƏƏ"), 60, replace = TRUE),
    status = sample(c("gözləmədə","yoldadır","çatdırılıb","gecikib"), 60, replace = TRUE),
    value_usd = round(runif(60, 4000, 60000))
  )
}

# ---- Production (istehsalat) demo data ----
demo_production_by_status <- function() {
  tibble(status = c("planlaşdırılıb","icra olunur","tamamlanıb","dayandırılıb"),
         cnt = c(8, 5, 42, 2))
}
demo_production_batches <- function() {
  tibble(
    batch_number = sprintf("BATCH-%04d", sample(1000:9999, 10)),
    planned_quantity = round(runif(10, 500, 3000)),
    actual_quantity = round(runif(10, 450, 2900)),
    rejected_quantity = round(runif(10, 5, 90)),
    reject_pct = round(runif(10, 1, 6), 1)
  )
}
demo_production_kpis <- function() {
  tibble(produced = 48200, planned = 51000, rejected = 1380)
}

# ---- Sales (satış) demo data ----
demo_top_customers <- function() {
  tibble(
    company_name = c("Baku Trade LLC","Xəzər Group","Aran Aqro","Şirvan Ticarət","Muğan Distribütor"),
    total_sales = round(runif(5, 60000, 420000))
  )
}
demo_sales_segment <- function() {
  tibble(customer_segment = c("Topdansatış","Pərakəndə","Korporativ","İxrac tərəfdaşı"),
         cnt = c(24, 58, 11, 7))
}
demo_payment_ratio <- function() {
  tibble(status = c("paid","unpaid","partial"), cnt = c(140, 22, 15),
         amt = c(820000, 96000, 41000))
}

# ---- Logistics (logistika) demo data ----
demo_logi_status <- function() {
  tibble(status = c("gözləmədə","yoldadır","çatdırılıb","gecikib"), cnt = c(14, 22, 96, 9))
}
demo_logi_ontime <- function() {
  tibble(on_time_pct = 87.4, total = 141)
}

# ---- Asset (əsas vəsaitlər) demo data ----
demo_asset_kpis <- function() {
  tibble(active_count = 186, total_value = 1420000)
}
demo_asset_upcoming_maintenance <- function() {
  tibble(
    asset_name = c("Yem qarışdırıcı xətti #2","Soyuducu kamera A","Yükləyici forklift #1","Generator (ehtiyat)"),
    next_maintenance_date = Sys.Date() + c(3, 7, 14, 25),
    priority = c("yüksək","orta","orta","aşağı")
  )
}
demo_asset_by_status <- function() {
  tibble(status = c("aktiv","təmirdə","istismardan çıxarılıb"), cnt = c(162, 14, 10))
}
demo_asset_maintenance_cost <- function() {
  tibble(total_cost_12m = 38400)
}

# ---- Purchase (təchizat) demo data ----
demo_purchase_by_supplier <- function() {
  tibble(
    company_name = c("AgroSupply LLC","Baltic Grain Trading","Anadolu Yem","Xəzər Kimya","Global Feed Ingredients"),
    total_purchased = round(runif(5, 45000, 260000))
  )
}
demo_purchase_by_status <- function() {
  tibble(status = c("gözləmədə","təsdiqlənib","çatdırılıb","ləğv edilib"), cnt = c(9, 15, 62, 3))
}
demo_purchase_fulfillment <- function() {
  tibble(fulfillment_pct = 94.2)
}
demo_purchase_avg_rating <- function() {
  tibble(avg_rating = 4.1)
}

# ---- Quality (keyfiyyət) demo data ----
demo_quality_inspection_summary <- function() {
  tibble(overall_result = c("keçib","qismən keçib","rədd edilib"), cnt = c(210, 18, 7))
}
demo_quality_rejection_rate <- function() {
  tibble(reject_pct = 3.2)
}
demo_quality_expiring_certs <- function() {
  tibble(
    certificate_name = c("HACCP Sertifikatı","Halal Sertifikatı","ISO 22000"),
    expiry_date = Sys.Date() + c(18, 45, 58)
  )
}
demo_quality_audit_ratings <- function() {
  tibble(
    audit_name = c("Daxili keyfiyyət auditi Q2","Təchizatçı auditi - AgroSupply","İstehsal xətti auditi"),
    audit_date = Sys.Date() - c(10, 40, 70),
    overall_rating = c(4.5, 3.8, 4.2)
  )
}

# ---- Org (təşkilati struktur) demo data ----
demo_org_by_branch <- function() {
  tibble(branch_name = c("Bakı Baş Ofis","Siyəzən Yem Zavodu","Simurq İstehsalat Sahəsi"),
         emp_count = c(64, 118, 96))
}
demo_org_companies <- function() {
  tibble(company_name = c("Zarat Import Export MMC","Simurq Quşçuluq MMC"),
         country = c("Azərbaycan","Azərbaycan"), industry = c("İdxal-İxrac","Kənd təsərrüfatı"))
}
demo_org_salary_violations <- function() {
  tibble(full_name = c("Elvin M.","Aygün S."), salary = c(2400, 480),
         position_name = c("Mütəxəssis","Operator"), salary_min = c(900,500), salary_max = c(1800,900))
}
demo_org_dept_budget <- function() {
  tibble(dept_name = c("İstehsalat","Maliyyə","Satış","İnzibati","Anbar"),
         budget = c(420000, 180000, 150000, 90000, 110000))
}

# ---- Partner (tərəfdaşlar) demo data ----
demo_partner_by_type <- function() {
  tibble(type_name = c("Müştəri","Təchizatçı","Distribütor","Strateji tərəfdaş"), cnt = c(58, 34, 12, 4))
}
demo_partner_expiring_contracts <- function() {
  tibble(contract_name = c("Çərçivə müqaviləsi - AgroSupply","İxrac müqaviləsi - Gürcüstan distribütoru"),
         end_date = Sys.Date() + c(22, 51))
}
demo_partner_avg_rating <- function() {
  tibble(avg_rating = 4.0)
}
demo_partner_recent_activity <- function() {
  tibble(activity_type = c("zəng","görüş","email","müqavilə yenilənməsi"), cnt = c(34, 12, 61, 3))
}

# ---- System (sistem/təhlükəsizlik) demo data ----
demo_system_user_kpis <- function() {
  tibble(active_users = 42, locked_users = 2)
}
demo_system_failed_logins <- function() {
  tibble(failed_count = 7)
}
demo_system_error_summary <- function() {
  tibble(severity = c("critical","high","medium","low"), unresolved = c(0, 2, 5, 11))
}
demo_system_last_backup <- function() {
  tibble(backup_type = "full", status = "completed",
         start_time = Sys.time() - 3600*20, end_time = Sys.time() - 3600*19.5)
}
demo_system_activity_by_module <- function() {
  tibble(module = c("sales","inventory","finance","hr","trade"), cnt = c(412, 298, 187, 96, 74))
}

# ---- 5. KÖMƏKÇİ FORMATLAŞDIRMA FUNKSİYALARI -------------------------------

fmt_azn <- function(x) paste0(format(round(x), big.mark = " ", scientific = FALSE), " ₼")
fmt_usd <- function(x) paste0("$", format(round(x), big.mark = " ", scientific = FALSE))
fmt_num <- function(x) format(round(x), big.mark = " ", scientific = FALSE)
fmt_cost <- function(x) sprintf("$%.4f", x)
fmt_secs <- function(x) sprintf("%.1f san.", x)

# ---- 20 hazır sual, 4 modul üzrə (5+5+5+5) --------------------------------
QUESTION_BANK <- list(
  inventory = c(
    "Anbarımızda hansı kateqoriya ən çox dəyər saxlayır və niyə diqqət tələb edir?",
    "Kritik səviyyədən aşağı olan məhsullar üzrə hansı təcili addımlar atılmalıdır?",
    "Son 30 gündə anbara daxil olan məhsul sayına əsasən tədarük tempimiz normaldırmı?",
    "Anbar dəyərimizin ümumi məbləği neçədir və bu, şirkət üçün nə deməkdir?",
    "Hansı kateqoriyalarda ehtiyat həddi risklidir və niyə?"
  ),
  finance = c(
    "Bu ayın gəlir və xərc balansı necədir, mənfəət marjası qənaətbəxşdirmi?",
    "Vaxtı keçmiş fakturalarımızın ümumi məbləği neçədir və bu kassa axınına necə təsir edir?",
    "Ən çox gecikən müştəri/faktura hansıdır və risk səviyyəsi nədir?",
    "Gəlir və xərc arasındakı fərqə əsasən hansı maliyyə strategiyası tövsiyə olunur?",
    "Cari maliyyə göstəricilərinə əsasən bu rüb üçün ümumi qiymətləndirməniz nədir?"
  ),
  hr = c(
    "Hansı departamentdə orta əmək haqqı ən yüksəkdir və bu büdcəyə necə təsir edir?",
    "İşçi sayı departamentlər üzrə balanslıdırmı, hansı departamentə əlavə resurs lazımdır?",
    "Ümumi işçi heyətinin orta maaş səviyyəsinə dair ümumi qiymətləndirməniz nədir?",
    "Kadr strukturuna əsasən hansı departament ən çox işçiyə malikdir və səbəbi nə ola bilər?",
    "Əmək haqqı xərclərini optimallaşdırmaq üçün hansı departamentlərə diqqət yetirilməlidir?"
  ),
  trade = c(
    "Hansı ölkə ilə ixracımız ən yüksəkdir və bu tərəfdaşlığı necə gücləndirə bilərik?",
    "Gecikmiş göndərişlərimizin sayı nə qədərdir və bu müştəri münasibətlərinə necə təsir edə bilər?",
    "İxrac coğrafiyamız kifayət qədər diversifikasiya olunubmu, yoxsa bir neçə ölkədən asılıyıq?",
    "Gecikmə tendensiyasına əsasən logistika prosesimizdə hansı zəif nöqtələr ola bilər?",
    "Ümumi ixrac dəyərimizə əsasən bu ay üçün beynəlxalq ticarət performansımızı necə qiymətləndirirsiniz?"
  ),
  production = c(
    "İstehsal partiyalarımızda rədd edilmə (rejected) faizi normaldırmı, hansı həddən narahat olmalıyıq?",
    "İstehsal sifarişlərinin statusuna görə hazırkı əməliyyat yükümüz necədir?",
    "Son partiyalarda planlaşdırılan və faktiki istehsal arasındakı fərq nə qədərdir?",
    "Rədd faizi yüksək olan partiyalar üçün hansı keyfiyyət tədbirləri tövsiyə olunur?",
    "İstehsal gücümüzdən nə dərəcədə səmərəli istifadə edirik?"
  ),
  sales = c(
    "Ən böyük müştərilərimiz kimlərdir və onlarla münasibətləri necə gücləndirə bilərik?",
    "Müştəri seqmentləri üzrə satış bölgüsü balanslıdırmı?",
    "Fakturalarımızın neçə faizi tam ödənilib, neçə faizi hələ açıqdır?",
    "Satış gəlirimiz hansı müştəri seqmentindən asılıdır və bu risk yaradırmı?",
    "Ödəniş strukturuna əsasən kassa axınını yaxşılaşdırmaq üçün nə tövsiyə edərdiniz?"
  ),
  logistics = c(
    "Göndərişlərimizin neçə faizi planlaşdırılan tarixdə çatdırılıb?",
    "Hansı göndəriş statusu ən çox rast gəlinir və bu, əməliyyat səmərəliliyini necə əks etdirir?",
    "Vaxtında çatdırılma faizimiz sənaye standartları ilə müqayisədə necədir?",
    "Gecikmələrin əsas səbəbi logistika, yoxsa istehsal tərəfində ola bilər?",
    "Çatdırılma performansımızı yaxşılaşdırmaq üçün hansı addımlar atıla bilər?"
  ),
  asset = c(
    "Yaxınlaşan (30 gün ərzində) baxım tələb edən avadanlıqlarımız hansılardır və prioritet necədir?",
    "Əsas vəsaitlərimizin ümumi cari dəyəri neçədir, amortizasiya vəziyyəti necədir?",
    "Son 12 ayda təmir/baxım xərclərimiz nə qədər olub və bu, büdcəyə necə təsir edir?",
    "Hansı avadanlıqlar hazırda təmirdədir və bu, istehsala necə təsir edə bilər?",
    "Baxım qrafikinə uyğunluğumuz nə dərəcədədir — gecikmiş baxımlar varmı?"
  ),
  purchase = c(
    "Ən çox alış etdiyimiz təchizatçılar kimlərdir və bu asılılıq risk yaradırmı?",
    "Sifarişlərimizin statusuna görə hazırkı təchizat zənciri vəziyyəti necədir?",
    "Sifariş icra faizimiz (ordered vs received) nə qədərdir, çatışmazlıq varmı?",
    "Təchizatçılarımızın orta reytinqi necədir və bu, seçim strategiyamıza necə təsir etməlidir?",
    "Hansı təchizatçılarla münasibəti gücləndirmək, hansılardan uzaqlaşmaq məsləhətdir?"
  ),
  quality = c(
    "Keyfiyyət yoxlamalarımızın nəticələrinə görə ümumi rədd faizi neçədir və bu qəbul edilən səviyyədədir?",
    "Yaxınlaşan müddəti bitən sertifikatlarımız hansılardır və bu, ixraca necə təsir edə bilər?",
    "Son keyfiyyət auditlərinin nəticələri necədir, hansı sahələrdə zəiflik var?",
    "Rədd edilmə tendensiyasına əsasən hansı proseslərdə yoxlama sərtləşdirilməlidir?",
    "HACCP/Halal/ISO kimi sertifikatların vəziyyəti beynəlxalq ixrac tələblərinə uyğundurmu?"
  ),
  org = c(
    "Filiallarımız üzrə işçi sayı bölgüsü necədir, hansı filial ən böyükdür?",
    "Vəzifə maaş diapazonundan kənar ödəniş alan işçilər varmı, bu risk yaradırmı?",
    "Qrup daxilindəki hüquqi şəxslər (companies) hansılardır və fəaliyyət sahələri nədir?",
    "Departament büdcələri arasında bölgü balanslıdırmı, hansı departament daha çox resurs alır?",
    "Təşkilati struktura əsasən idarəetmə iyerarxiyası nə dərəcədə mürəkkəbdir?"
  ),
  partner = c(
    "Tərəfdaşlarımızın (müştəri/təchizatçı/distribütor) növ üzrə bölgüsü necədir?",
    "Yaxın 60 gündə müddəti bitən müqavilələrimiz hansılardır və bu risk yaradırmı?",
    "Tərəfdaşlarımızın orta reytinqi necədir, münasibətlərin keyfiyyətini necə əks etdirir?",
    "Son 30 gündə tərəfdaşlarla hansı aktivlik növləri daha çox olub?",
    "Ən dəyərli tərəfdaşlarımızla münasibətləri necə daha da gücləndirə bilərik?"
  ),
  system = c(
    "Sistemdə kilidlənmiş hesablar və uğursuz giriş cəhdləri təhlükəsizlik riski yaradırmı?",
    "Son 30 gündə həll olunmamış xətaların səviyyəsinə görə bölgüsü necədir, təcili müdaxilə tələb olunurmu?",
    "Son ehtiyat nüsxə (backup) əməliyyatı uğurla tamamlanıbmı?",
    "Sistemdə ən aktiv istifadə olunan modullar hansılardır və bu, iş yükünü necə əks etdirir?",
    "Ümumi sistem sağlamlığına (təhlükəsizlik + xətalar + backup) əsasən hazırkı vəziyyət necədir?"
  ),
  general = c(
    # ---- 1. Zarat Group üçün strateji kontekst ----
    "Zarat Group kimi bir quşçuluq və yem istehsalı şirkəti üçün ən böyük strateji risklər hansılardır?",
    "Zarat Group-un Simurq brendi kimi yerli brendlər beynəlxalq bazarda necə rəqabətqabiliyyətli ola bilər?",
    "Siyəzən kimi regional yem zavodlarının strateji üstünlükləri nələrdir?",
    "Zarat Group-un idxal-ixrac fəaliyyətini genişləndirmək üçün hansı yeni bazarlar nəzərdən keçirilməlidir?",
    "Yerli istehsalçı kimi Zarat Group xarici yem xammalı asılılığını necə azalda bilər?",
    "Zarat Group üçün brend diferensasiyası (halal, keyfiyyət sertifikatları) hansı üstünlükləri təmin edə bilər?",
    "Regional yem zavodu olan Zarat Group üçün logistika xərclərini optimallaşdırmaq üçün hansı strategiyalar mövcuddur?",
    "Zarat Group kimi orta ölçülü aqrar şirkətlər üçün rəqəmsallaşma (ERP, AI) hansı əlavə dəyər yaradır?",
    
    # ---- 2. Azərbaycanda quşçuluq sənayesi və rəqiblər ----
    "Azərbaycanda Zarat Group-dan başqa hansı əsas quşçuluq müəssisələri fəaliyyət göstərir?",
    "Azərbaycan quşçuluq bazarında rəqabət mühiti necədir, bazar payı təxminən necə bölünür?",
    "Azərbaycanda broyler istehsalında ən böyük oyunçular hansılardır?",
    "Yerli yem istehsalçıları arasında Zarat Group kimi şirkətlərin mövqeyi necə qiymətləndirilə bilər?",
    "Azərbaycan hökumətinin quşçuluq sənayesinə dəstək siyasəti yerli rəqabətə necə təsir edir?",
    "Azərbaycanda quşçuluq məhsullarına daxili tələbatın artım tempi necədir?",
    "Regional (Siyəzən, Abşeron və s.) yem zavodları arasında rəqabət üstünlükləri nələrdir?",
    "Azərbaycanda idxal olunan toyuq əti ilə yerli istehsal arasındakı rəqabət necədir?",
    
    # ---- 3. Dünya və yaxın coğrafiya (Türkiyə, Rusiya, İran, Gürcüstan, Mərkəzi Asiya) ----
    "Türkiyənin quşçuluq sənayesi dünya bazarında hansı mövqedədir və Azərbaycan üçün nümunə ola bilərmi?",
    "Rusiyanın quşçuluq və yem istehsalı sənayesi son illərdə necə inkişaf edib?",
    "İranın quşçuluq sənayesi Azərbaycan üçün rəqabət, yoxsa əməkdaşlıq imkanı yaradır?",
    "Gürcüstanın kənd təsərrüfatı ixracatında quşçuluq məhsullarının yeri nədir?",
    "Mərkəzi Asiya ölkələrində (Qazaxıstan, Özbəkistan) quşçuluq sənayesinin inkişaf potensialı necədir?",
    "Dünyada ən böyük toyuq əti istehsalçısı ölkələr hansılardır və onların uğur sirri nədir?",
    "Braziliya və ABŞ kimi qlobal liderlərin quşçuluq modelindən hansı dərslər çıxarıla bilər?",
    "Avropa Birliyinin quşçuluq standartları regional istehsalçılara necə təsir göstərir?",
    
    # ---- 4. Sənayenin gələcəyi / perspektivi ----
    "Dünyada quşçuluq sənayesinin növbəti 10 il ərzində gözlənilən böyümə tempi necədir?",
    "Alternativ zülal mənbələri (bitki əsaslı, həşərat unları) ənənəvi yem sənayesinə hansı təhdidi yaradır?",
    "Presizyon kənd təsərrüfatı (precision farming) texnologiyaları quşçuluqda necə tətbiq olunur?",
    "İqlim dəyişikliyi qlobal yem xammalı (qarğıdalı, soya) qiymətlərinə gələcəkdə necə təsir edəcək?",
    "Dünyada \"vertical farming\" və qapalı istehsal sistemlərinin quşçuluğa təsiri nə ola bilər?",
    "Gələcəkdə ət istehlakı tendensiyaları (laboratoriya əti, bitki əsaslı əvəzedicilər) sənayeni necə dəyişəcək?",
    "Dövriyyə iqtisadiyyatı (circular economy) prinsipləri yem istehsalında necə tətbiq oluna bilər?",
    "Qlobal tədarük zənciri böhranları (pandemiya, münaqişələr) gələcəkdə quşçuluq sənayesinə necə təsir edə bilər?",
    
    # ---- 5. Süni intellektin sənaye ilə əlaqəsi ----
    "Süni intellekt quşçuluq təsərrüfatlarında xəstəliyin erkən aşkarlanmasında necə istifadə olunur?",
    "AI əsaslı proqnozlaşdırma yem tələbatının planlaşdırılmasını necə yaxşılaşdıra bilər?",
    "Kompüter görməsi (computer vision) texnologiyaları quş sağlamlığının monitorinqində necə tətbiq olunur?",
    "Zarat ERP kimi AI-əsaslı ERP sistemləri gələcəkdə hansı əlavə imkanlara malik ola bilər?",
    "Maşın öyrənməsi yem reseptlərinin optimallaşdırılmasında necə kömək edə bilər?",
    "Süni intellektin kənd təsərrüfatında tətbiqi ilə bağlı Azərbaycanda hansı imkanlar və maneələr var?",
    "AI əsaslı proqnozlaşdırma modelləri ixrac bazarlarının seçimində necə kömək edə bilər?",
    "Gələcəkdə AI-nin quşçuluq və yem sənayesində insan əməyini əvəz etmə potensialı nə dərəcədədir?"
  )
)

# Ümumi sənaye sualları üçün ayrı çağırış — daxili DB göstəricilərinə
# bağlı deyil, AI-nin ümumi (sənaye/bazar) bilik bazasından cavab verir.
# Bu, real-vaxt internet məlumatı deyil — AI-nin təlim məlumatları əsasındadır,
# ona görə cavabda bu aydın qeyd olunur.
call_claude_general <- function(question) {
  if (nchar(ANTHROPIC_API_KEY) == 0) {
    return(list(
      text = "⚠️ ANTHROPIC_API_KEY tapılmadı. ~/Desktop/arti_ess_api/.env faylını yoxlayın.",
      input_tokens = 0, output_tokens = 0, elapsed = 0, cost = 0, ok = FALSE
    ))
  }
  
  system_prompt <- paste0(
    "Sən Zarat Group (Simurq toyuqçuluq brendi, Siyəzən yem zavodu, idxal-ixrac) ",
    "şirkətinin rəhbərliyi üçün işləyən sənaye analitik köməkçisən. ",
    "Quşçuluq, yem istehsalı, kənd təsərrüfatı ixracı və beynəlxalq ticarət mövzularında ",
    "həm Azərbaycan, həm dünya təcrübəsinə dair ümumi bilik və kontekst ver. ",
    "Bu, real-vaxt data deyil, ümumi sənaye biliyidir — lazım gəldikdə bunu qısaca qeyd et.\n\n",
    "Cavab formatı:\n",
    "- Markdown istifadə et: qısa başlıqlar (##), qalın mətn (**vacib məqamlar**), siyahılar (-).\n",
    "- Ətraflı və çoxaspektli cavab ver: kontekst/arxa plan, əsas məqamlar, ",
    "Zarat Group üçün praktiki əhəmiyyəti, sonda konkret tövsiyələr.\n",
    "- Azərbaycan dilində, rəhbərlik üçün peşəkar və anlaşıqlı tərzdə yaz."
  )
  
  t0 <- Sys.time()
  result <- tryCatch({
    do_request <- function() {
      request("https://api.anthropic.com/v1/messages") |>
        req_headers(
          "x-api-key" = ANTHROPIC_API_KEY,
          "anthropic-version" = "2023-06-01",
          "content-type" = "application/json"
        ) |>
        req_body_json(list(
          model = CLAUDE_MODEL, max_tokens = 1800,
          system = system_prompt,
          messages = list(list(role = "user", content = question))
        )) |>
        req_error(is_error = \(resp) FALSE) |>
        req_perform()
    }
    
    resp <- do_request()
    # 429 (rate limit) və ya 529 (server məşğuldur) olarsa, 3 saniyə gözləyib bir dəfə təkrar cəhd et
    if (resp_status(resp) %in% c(429, 529)) {
      Sys.sleep(3)
      resp <- do_request()
    }
    
    if (resp_status(resp) >= 400) {
      err_body <- tryCatch(resp_body_json(resp), error = function(e) NULL)
      msg <- err_body$error$message %||% paste("HTTP", resp_status(resp))
      stop(msg)
    }
    
    body <- resp_body_json(resp)
    elapsed <- as.numeric(difftime(Sys.time(), t0, units = "secs"))
    in_tok  <- body$usage$input_tokens %||% 0
    out_tok <- body$usage$output_tokens %||% 0
    price <- get_claude_pricing()
    cost <- (in_tok / 1e6) * price$input + (out_tok / 1e6) * price$output
    
    list(text = extract_answer_text(body$content), input_tokens = in_tok, output_tokens = out_tok,
         elapsed = elapsed, cost = cost, ok = TRUE)
  }, error = function(e) {
    list(text = paste0("⚠️ AI sorğusunda xəta: ", conditionMessage(e)),
         input_tokens = 0, output_tokens = 0,
         elapsed = as.numeric(difftime(Sys.time(), t0, units = "secs")), cost = 0, ok = FALSE)
  })
  result
}

brand_plot_theme <- function(p) {
  p |>
    layout(
      font = list(family = "Inter, sans-serif", color = BRAND$fg),
      paper_bgcolor = "rgba(0,0,0,0)",
      plot_bgcolor = "rgba(0,0,0,0)",
      margin = list(t = 30, r = 20, b = 40, l = 50),
      legend = list(orientation = "h", y = -0.2)
    )
}

# ---- 6. CLAUDE API İNTEQRASİYASI (AI Köməkçisi) --------------------------
# Hybrid Approach: AI özü bazaya sorğu yazmır — biz artıq hesabladığımız
# real rəqəmləri (KPI-ları) ona kontekst kimi veririk, o isə bunları
# rəhbərlik üçün anlaşıqlı, Azərbaycan dilində şərh edir.

call_claude <- function(question, context_summary) {
  if (nchar(ANTHROPIC_API_KEY) == 0) {
    return(list(
      text = "⚠️ ANTHROPIC_API_KEY tapılmadı. ~/Desktop/arti_ess_api/.env faylını yoxlayın.",
      input_tokens = 0, output_tokens = 0, elapsed = 0, cost = 0, ok = FALSE
    ))
  }
  
  system_prompt <- paste0(
    "Sən Zarat Group (Simurq toyuqçuluq brendi, Siyəzən yem zavodu, idxal-ixrac) ",
    "şirkətinin ERP sistemində işləyən analitik köməkçisən. ",
    "Sənə əvvəlcədən hesablanmış REAL biznes göstəriciləri verilir. ",
    "Bu rəqəmlərdən kənara çıxma, uydurma, yalnız verilən datanı şərh et.\n\n",
    "Cavab formatı:\n",
    "- Markdown istifadə et: qısa başlıqlar (##), qalın mətn (**vacib rəqəmlər**), siyahılar (-).\n",
    "- Ətraflı və çoxaspektli cavab ver: əvvəlcə qısa xülasə, sonra rəqəmlərin təhlili, ",
    "sonra riskləri/fürsətləri qeyd et, sonda konkret tövsiyələr siyahısı ver.\n",
    "- Azərbaycan dilində, rəhbərlik üçün peşəkar və anlaşıqlı tərzdə yaz."
  )
  
  user_message <- paste0(
    "Hazırkı göstəricilər:\n", context_summary,
    "\n\nSual: ", question
  )
  
  t0 <- Sys.time()
  
  result <- tryCatch({
    do_request <- function() {
      request("https://api.anthropic.com/v1/messages") |>
        req_headers(
          "x-api-key" = ANTHROPIC_API_KEY,
          "anthropic-version" = "2023-06-01",
          "content-type" = "application/json"
        ) |>
        req_body_json(list(
          model = CLAUDE_MODEL,
          max_tokens = 1400,
          system = system_prompt,
          messages = list(list(role = "user", content = user_message))
        )) |>
        req_error(is_error = \(resp) FALSE) |>
        req_perform()
    }
    
    resp <- do_request()
    if (resp_status(resp) %in% c(429, 529)) {
      Sys.sleep(3)
      resp <- do_request()
    }
    
    if (resp_status(resp) >= 400) {
      err_body <- tryCatch(resp_body_json(resp), error = function(e) NULL)
      msg <- err_body$error$message %||% paste("HTTP", resp_status(resp))
      stop(msg)
    }
    
    body <- resp_body_json(resp)
    elapsed <- as.numeric(difftime(Sys.time(), t0, units = "secs"))
    
    in_tok  <- body$usage$input_tokens %||% 0
    out_tok <- body$usage$output_tokens %||% 0
    price <- get_claude_pricing()
    cost <- (in_tok / 1e6) * price$input + (out_tok / 1e6) * price$output
    
    list(
      text = extract_answer_text(body$content),
      input_tokens = in_tok, output_tokens = out_tok,
      elapsed = elapsed, cost = cost, ok = TRUE
    )
  }, error = function(e) {
    list(
      text = paste0("⚠️ AI sorğusunda xəta: ", conditionMessage(e)),
      input_tokens = 0, output_tokens = 0,
      elapsed = as.numeric(difftime(Sys.time(), t0, units = "secs")),
      cost = 0, ok = FALSE
    )
  })
  
  result
}

`%||%` <- function(a, b) if (is.null(a)) b else a

# Claude bəzən cavabdan əvvəl "thinking" (düşünmə) bloku qaytarır.
# Buna görə content massivindən məhz type == "text" olan İLK bloku tapırıq,
# sadəcə content[[1]]-i "əsl cavab" deyə güman etmirik.
extract_answer_text <- function(content_blocks) {
  for (block in content_blocks) {
    if (!is.null(block$type) && block$type == "text" && nzchar(block$text %||% "")) {
      return(block$text)
    }
  }
  # Ehtiyat variant: heç bir "text" tipli blok tapılmasa, ilk mövcud mətni qaytar
  for (block in content_blocks) {
    if (!is.null(block$text)) return(block$text)
  }
  ""
}

# Modul üzrə KPI-ları AI-ya veriləcək qısa mətn xülasəsinə çevirir
build_context_summary <- function(module, data_list) {
  switch(module,
         "inventory" = paste0(
           "Anbar dəyəri kateqoriya üzrə: ",
           paste(sprintf("%s: %s", data_list$by_category$category,
                         fmt_azn(data_list$by_category$total_value)), collapse = "; "),
           ". Kritik səviyyədən aşağı ", nrow(data_list$low_stock), " məhsul var."
         ),
         "finance" = paste0(
           "Cari dövr gəlir: ", fmt_azn(data_list$kpis$income),
           ", xərc: ", fmt_azn(data_list$kpis$expense),
           ", xalis mənfəət: ", fmt_azn(data_list$kpis$profit),
           ". Vaxtı keçmiş ", nrow(data_list$overdue), " faktura mövcuddur, cəmi ",
           fmt_azn(sum(data_list$overdue$amount)), "."
         ),
         "hr" = paste0(
           "Departament üzrə orta maaş və işçi sayı: ",
           paste(sprintf("%s: %s işçi, orta %s", data_list$salary$department,
                         data_list$salary$employees, fmt_azn(data_list$salary$avg_salary)),
                 collapse = "; "), "."
         ),
         "trade" = paste0(
           "Ölkə üzrə ixrac dəyəri: ",
           paste(sprintf("%s: %s", data_list$by_country$country, fmt_usd(data_list$by_country$value_usd)),
                 collapse = "; "),
           ". ", nrow(data_list$delayed), " göndəriş gecikib."
         ),
         "production" = paste0(
           "Son 30 gün istehsal sifarişləri: planlaşdırılan ", fmt_num(data_list$kpis$planned[1]),
           " vahid, faktiki istehsal olunan ", fmt_num(data_list$kpis$produced[1]),
           ", rədd edilən ", fmt_num(data_list$kpis$rejected[1]), " vahid. ",
           "Sifariş statusları üzrə bölgü: ",
           paste(sprintf("%s: %s", data_list$by_status$status, data_list$by_status$cnt), collapse = "; "),
           ". Son partiyalarda orta rədd faizi: ",
           round(mean(data_list$batches$reject_pct, na.rm = TRUE), 1), "%."
         ),
         "sales" = paste0(
           "Ən böyük müştərilər üzrə satış: ",
           paste(sprintf("%s: %s", data_list$top_customers$company_name, fmt_azn(data_list$top_customers$total_sales)),
                 collapse = "; "),
           ". Müştəri seqmentləri üzrə say: ",
           paste(sprintf("%s: %s", data_list$by_segment$customer_segment, data_list$by_segment$cnt), collapse = "; "),
           ". Faktura statusları üzrə: ",
           paste(sprintf("%s: %s ədəd (%s)", data_list$payment_ratio$status, data_list$payment_ratio$cnt,
                         fmt_azn(data_list$payment_ratio$amt)), collapse = "; "), "."
         ),
         "logistics" = paste0(
           "Göndəriş statusları üzrə bölgü: ",
           paste(sprintf("%s: %s", data_list$status_breakdown$status, data_list$status_breakdown$cnt), collapse = "; "),
           ". Vaxtında çatdırılma faizi: ", data_list$ontime$on_time_pct[1], "% (cəmi ",
           fmt_num(data_list$ontime$total[1]), " göndəriş üzrə)."
         ),
         "asset" = paste0(
           "Aktiv əsas vəsait sayı: ", fmt_num(data_list$kpis$active_count[1]),
           ", ümumi cari dəyər: ", fmt_azn(data_list$kpis$total_value[1]), ". ",
           "Status üzrə bölgü: ",
           paste(sprintf("%s: %s", data_list$by_status$status, data_list$by_status$cnt), collapse = "; "),
           ". Yaxınlaşan (30 gün) baxımlar: ",
           paste(sprintf("%s (%s, prioritet: %s)", data_list$upcoming_maintenance$asset_name,
                         data_list$upcoming_maintenance$next_maintenance_date,
                         data_list$upcoming_maintenance$priority), collapse = "; "),
           ". Son 12 ay təmir xərci: ", fmt_azn(data_list$maintenance_cost$total_cost_12m[1]), "."
         ),
         "purchase" = paste0(
           "Ən çox alış edilən təchizatçılar: ",
           paste(sprintf("%s: %s", data_list$by_supplier$company_name, fmt_azn(data_list$by_supplier$total_purchased)),
                 collapse = "; "),
           ". Sifariş statusları: ",
           paste(sprintf("%s: %s", data_list$by_status$status, data_list$by_status$cnt), collapse = "; "),
           ". Sifariş icra faizi (ordered vs received): ", data_list$fulfillment$fulfillment_pct[1], "%. ",
           "Təchizatçıların orta reytinqi: ", data_list$avg_rating$avg_rating[1], "/5."
         ),
         "quality" = paste0(
           "Yoxlama nəticələri üzrə bölgü: ",
           paste(sprintf("%s: %s", data_list$inspection_summary$overall_result, data_list$inspection_summary$cnt),
                 collapse = "; "),
           ". Ümumi rədd faizi: ", data_list$rejection_rate$reject_pct[1], "%. ",
           "Müddəti yaxınlaşan sertifikatlar: ",
           paste(sprintf("%s (bitmə tarixi: %s)", data_list$expiring_certs$certificate_name,
                         data_list$expiring_certs$expiry_date), collapse = "; "),
           ". Son auditlər: ",
           paste(sprintf("%s (%s): reytinq %s/5", data_list$audit_ratings$audit_name,
                         data_list$audit_ratings$audit_date, data_list$audit_ratings$overall_rating), collapse = "; "), "."
         ),
         "org" = paste0(
           "Filial üzrə aktiv işçi sayı: ",
           paste(sprintf("%s: %s", data_list$by_branch$branch_name, data_list$by_branch$emp_count), collapse = "; "),
           ". Qrup şirkətləri: ",
           paste(sprintf("%s (%s, %s)", data_list$companies$company_name, data_list$companies$country,
                         data_list$companies$industry), collapse = "; "),
           ". Vəzifə maaş diapazonundan kənar ödəniş alan işçi sayı: ", nrow(data_list$salary_violations),
           ". Ən böyük departament büdcələri: ",
           paste(sprintf("%s: %s", data_list$dept_budget$dept_name, fmt_azn(data_list$dept_budget$budget)),
                 collapse = "; "), "."
         ),
         "partner" = paste0(
           "Tərəfdaş növü üzrə say: ",
           paste(sprintf("%s: %s", data_list$by_type$type_name, data_list$by_type$cnt), collapse = "; "),
           ". Tərəfdaşların orta reytinqi: ", data_list$avg_rating$avg_rating[1], "/5. ",
           "Yaxın 60 gündə bitən müqavilələr: ",
           paste(sprintf("%s (bitmə tarixi: %s)", data_list$expiring_contracts$contract_name,
                         data_list$expiring_contracts$end_date), collapse = "; "),
           ". Son 30 gün aktivlik növləri: ",
           paste(sprintf("%s: %s", data_list$recent_activity$activity_type, data_list$recent_activity$cnt),
                 collapse = "; "), "."
         ),
         "system" = paste0(
           "Aktiv istifadəçi sayı: ", data_list$kpis$active_users[1],
           ", kilidlənmiş hesab sayı: ", data_list$kpis$locked_users[1], ". ",
           "Son 7 gün uğursuz giriş cəhdi: ", data_list$failed_logins$failed_count[1], ". ",
           "Son 30 gün həll olunmamış xətalar (səviyyə üzrə): ",
           paste(sprintf("%s: %s", data_list$error_summary$severity, data_list$error_summary$unresolved),
                 collapse = "; "),
           ". Son ehtiyat nüsxə: ", data_list$last_backup$backup_type[1], " tipli, status: ",
           data_list$last_backup$status[1], ", başlama vaxtı: ", data_list$last_backup$start_time[1],
           ". Son 30 gün ən aktiv modullar: ",
           paste(sprintf("%s: %s", data_list$activity_by_module$module, data_list$activity_by_module$cnt),
                 collapse = "; "), "."
         ),
         "Ümumi məlumat yoxdur."
  )
}

# ══════════════════════════════════════════════════════════════════════════
#  UI
# ══════════════════════════════════════════════════════════════════════════

zarat_theme <- bs_theme(
  version = 5,
  bg = BRAND$bg,
  fg = BRAND$fg,
  primary = BRAND$primary,
  secondary = BRAND$secondary,
  success = BRAND$success,
  danger = BRAND$danger,
  base_font = font_google("Inter"),
  heading_font = font_google("Manrope"),
  "navbar-bg" = "#141824",
  "card-border-radius" = "0.9rem",
  "card-box-shadow" = "0 1px 3px rgba(20,24,36,0.08)"
) |>
  bs_add_rules("
    .navbar-brand { font-weight: 700; letter-spacing: .02em; }
    .bslib-value-box .value-box-title { font-size: .8rem; text-transform: uppercase;
      letter-spacing: .05em; opacity: .75; }
    .bslib-value-box .value-box-value { font-size: 1.7rem; font-weight: 700; }
    .demo-banner { background: #FFF4E5; border: 1px solid #F0C36D; color: #7A5200;
      padding: 8px 14px; border-radius: 8px; font-size: .85rem; margin-bottom: 12px; }
    .chat-bubble-user { background: #1C2230; color: white; padding: 11px 16px;
      border-radius: 14px 14px 3px 14px; margin: 10px 0; max-width: 78%; margin-left: auto;
      font-size: .92rem; box-shadow: 0 2px 6px rgba(28,34,48,.15); }
    .chat-bubble-ai { background: linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%);
      border: 1px solid #BAE6FD; border-left: 4px solid #0EA5E9;
      padding: 16px 20px 14px; margin: 14px 0; max-width: 96%; border-radius: 4px 14px 14px 14px;
      box-shadow: 0 4px 14px rgba(14,165,233,.10);
      animation: fadeInUp .4s ease; }
    .ai-bubble-header { display:flex; align-items:center; gap:8px; margin-bottom:8px;
      font-family:'Manrope', sans-serif; font-weight:700; font-size:.8rem;
      color:#0369A1; letter-spacing:.03em; text-transform:uppercase; }
    @keyframes fadeInUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .ai-answer-body { font-size: 1.2rem; line-height: 1.75; color:#1E293B; }
    .ai-answer-body h2, .ai-answer-body h3 { font-family:'Manrope', sans-serif; font-weight:700;
      font-size: 1.25rem; color:#0C4A6E; margin: 14px 0 6px; border-bottom: 1px solid #BAE6FD; padding-bottom:4px; }
    .ai-answer-body h2:first-child, .ai-answer-body h3:first-child { margin-top: 0; }
    .ai-answer-body p { margin: 8px 0; }
    .ai-answer-body strong { color: #0369A1; font-weight: 700; }
    .ai-answer-body ul, .ai-answer-body ol { margin: 8px 0 8px 4px; padding-left: 20px; }
    .ai-answer-body li { margin-bottom: 6px; }
    .ai-answer-body li::marker { color: #0EA5E9; }
    .ai-answer-body code { background:#E0F2FE; color:#0C4A6E; padding:1px 6px; border-radius:4px; font-size:.88em; }
    .ai-answer-body table { border-collapse:collapse; width:100%; margin:10px 0; font-size:1.1rem; }
    .ai-answer-body th { background:#E0F2FE; color:#0C4A6E; text-align:left; padding:6px 10px;
      border:1px solid #BAE6FD; font-weight:700; }
    .ai-answer-body td { padding:6px 10px; border:1px solid #E0F2FE; }

    .ai-meta { display:flex; gap:10px; margin-top:14px; padding-top:12px;
      border-top: 1px solid #E0F2FE; flex-wrap: wrap; }
    .ai-stat-chip { display:inline-flex; align-items:center; gap:7px; background:#F0F9FF;
      border:1px solid #BAE6FD; padding:6px 13px; border-radius:10px; font-size:.76rem; color:#0369A1; }
    .ai-stat-chip .bi { color:#0EA5E9; }
    .ai-stat-chip b { color:#0C4A6E; font-weight:700; }

    .ai-thinking-bubble { background: linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%);
      border: 1px solid #BAE6FD; border-left: 4px solid #0EA5E9;
      padding: 14px 20px; margin: 14px 0; max-width: 96%; border-radius: 4px 14px 14px 14px;
      box-shadow: 0 4px 14px rgba(14,165,233,.10); animation: fadeInUp .3s ease; }
    .ai-thinking { display:flex; align-items:center; gap:10px; color:#0369A1;
      font-size:.85rem; padding:4px 0; }
    .ai-thinking .dot { width:7px; height:7px; border-radius:50%; background:#0EA5E9;
      animation: pulse 1.1s infinite ease-in-out; }
    .ai-thinking .dot:nth-child(2) { animation-delay: .15s; }
    .ai-thinking .dot:nth-child(3) { animation-delay: .3s; }
    @keyframes pulse { 0%,80%,100% { opacity:.25; transform:scale(.8);} 40% { opacity:1; transform:scale(1);} }
    .custom-q-box { background:#FCFBF8; border:1px solid #ECE4D6; border-radius:10px;
      padding:14px 16px; margin-top:14px; }
    .custom-q-box .label { font-family:'Manrope', sans-serif; font-weight:700; font-size:.82rem;
      color:#1C2230; margin-bottom:8px; display:flex; align-items:center; gap:6px; }
    .schema-chips-title { font-family:'Manrope', sans-serif; font-weight:700; font-size:.72rem;
      text-transform:uppercase; letter-spacing:.04em; color:#9A9481; margin-bottom:8px; }
    .schema-chips { display:flex; flex-wrap:wrap; gap:5px; }
    .btn-ai-send { background:#0EA5E9; border-color:#0EA5E9; color:#fff; }
    .btn-ai-send:hover { background:#0284C7; border-color:#0284C7; color:#fff; }
    .shiny-notification { background:#F0F9FF !important; border:1px solid #BAE6FD !important;
      border-left:4px solid #0EA5E9 !important; border-radius:10px !important;
      color:#0369A1 !important; box-shadow: 0 4px 14px rgba(14,165,233,.18) !important; }
    .schema-chip { background:#1B2338; border:1px solid #2A3450; color:#D8DCE8;
      font-size:.68rem; padding:3px 8px; border-radius:999px; white-space:nowrap; }
  ")

# ---- Modul UI funksiyaları -------------------------------------------------

overview_ui <- function() {
  nav_panel(
    "İdarə Paneli", icon = bs_icon("speedometer2"),
    if (DEMO_MODE) div(class = "demo-banner",
                       bs_icon("info-circle"), " Demo rejimi: baza bağlantısı tapılmadı, göstərilən rəqəmlər nümunəvidir.") ,
    layout_columns(
      value_box("Aktiv işçi sayı", textOutput("ov_employees"), showcase = bs_icon("people-fill"), theme = "primary"),
      value_box("Ödənilməmiş fakturalar", textOutput("ov_unpaid"), showcase = bs_icon("receipt"), theme = "danger"),
      value_box("30 günlük yem istehsalı", textOutput("ov_feed"), showcase = bs_icon("basket3-fill"), theme = "secondary"),
      value_box("30 günlük ixrac dəyəri", textOutput("ov_export"), showcase = bs_icon("box-arrow-up-right"), theme = "success"),
      col_widths = c(3,3,3,3)
    ),
    layout_columns(
      card(card_header("Gəlir vs Xərc (son 12 ay)"), plotlyOutput("ov_finance_chart", height = "320px")),
      card(card_header("Departament üzrə işçi sayı"), plotlyOutput("ov_hr_chart", height = "320px")),
      col_widths = c(7,5)
    )
  )
}

inventory_ui <- function() {
  nav_panel(
    "Anbar / İstehsalat", icon = bs_icon("box-seam"),
    layout_columns(
      value_box("Ümumi anbar dəyəri", textOutput("inv_total_value"), showcase = bs_icon("cash-stack"), theme = "primary"),
      value_box("Kritik səviyyəli məhsul", textOutput("inv_low_count"), showcase = bs_icon("exclamation-triangle-fill"), theme = "danger"),
      value_box("30 günlük hərəkət", textOutput("inv_movements"), showcase = bs_icon("arrow-left-right"), theme = "secondary"),
      col_widths = c(4,4,4)
    ),
    layout_columns(
      card(card_header("Kateqoriya üzrə anbar dəyəri"), plotlyOutput("inv_category_chart", height = "300px")),
      card(card_header("Son 30 gün hərəkət trendi"), plotlyOutput("inv_trend_chart", height = "300px")),
      col_widths = c(6,6)
    ),
    card(
      card_header(bs_icon("exclamation-triangle-fill"), " Kritik səviyyədən aşağı məhsullar"),
      DTOutput("inv_low_stock_table")
    )
  )
}

finance_ui <- function() {
  nav_panel(
    "Maliyyə", icon = bs_icon("cash-coin"),
    layout_columns(
      value_box("Gəlir (cari dövr)", textOutput("fin_income"), showcase = bs_icon("graph-up-arrow"), theme = "success"),
      value_box("Xərc (cari dövr)", textOutput("fin_expense"), showcase = bs_icon("graph-down-arrow"), theme = "danger"),
      value_box("Xalis mənfəət", textOutput("fin_profit"), showcase = bs_icon("piggy-bank-fill"), theme = "primary"),
      col_widths = c(4,4,4)
    ),
    card(card_header("Gəlir vs Xərc (aylıq)"), plotlyOutput("fin_income_expense_chart", height = "320px")),
    card(
      card_header(bs_icon("clock-history"), " Vaxtı keçmiş fakturalar"),
      DTOutput("fin_overdue_table")
    )
  )
}

hr_ui <- function() {
  nav_panel(
    "HR / Əmək haqqı", icon = bs_icon("people"),
    layout_columns(
      value_box("Aktiv işçi sayı", textOutput("hr_active"), showcase = bs_icon("person-badge-fill"), theme = "primary"),
      value_box("Orta əmək haqqı", textOutput("hr_avg_salary"), showcase = bs_icon("wallet2"), theme = "secondary"),
      col_widths = c(6,6)
    ),
    layout_columns(
      card(card_header("Departament üzrə orta maaş"), plotlyOutput("hr_salary_chart", height = "300px")),
      card(card_header("İşə qəbul / işdən çıxma trendi"), plotlyOutput("hr_hiring_chart", height = "300px")),
      col_widths = c(6,6)
    ),
    card(
      card_header(bs_icon("search"), " İşçi axtarışı"),
      div(style = "max-width:320px;", textInput("hr_search", NULL, placeholder = "Ad üzrə axtar…")),
      DTOutput("hr_employees_table")
    )
  )
}

trade_ui <- function() {
  nav_panel(
    "İdxal-İxrac", icon = bs_icon("truck"),
    layout_columns(
      value_box("30 günlük ixrac dəyəri", textOutput("tr_export_value"), showcase = bs_icon("box-arrow-up-right"), theme = "success"),
      value_box("Gecikmiş göndərişlər", textOutput("tr_delayed_count"), showcase = bs_icon("exclamation-octagon-fill"), theme = "danger"),
      col_widths = c(6,6)
    ),
    card(card_header("Ölkə üzrə ixrac dəyəri"), plotlyOutput("tr_country_chart", height = "300px")),
    card(
      card_header(bs_icon("hourglass-split"), " Gecikmiş göndərişlər"),
      DTOutput("tr_delayed_table")
    ),
    card(
      card_header(bs_icon("list-check"), " Bütün göndərişlər"),
      uiOutput("tr_status_filter_ui"),
      DTOutput("tr_shipments_table")
    )
  )
}

production_ui <- function() {
  nav_panel(
    "İstehsalat", icon = bs_icon("gear-wide-connected"),
    layout_columns(
      value_box("30 gün planlaşdırılan", textOutput("prod_planned"), showcase = bs_icon("clipboard-data"), theme = "secondary"),
      value_box("30 gün istehsal olunan", textOutput("prod_produced"), showcase = bs_icon("box-seam"), theme = "primary"),
      value_box("30 gün rədd edilən", textOutput("prod_rejected"), showcase = bs_icon("x-octagon-fill"), theme = "danger"),
      col_widths = c(4,4,4)
    ),
    card(card_header("Sifariş statusları üzrə bölgü"), plotlyOutput("prod_status_chart", height = "300px")),
    card(
      card_header(bs_icon("clipboard2-pulse"), " Son partiyalar (rədd faizi ilə)"),
      DTOutput("prod_batches_table")
    )
  )
}

sales_ui <- function() {
  nav_panel(
    "Satış", icon = bs_icon("graph-up"),
    layout_columns(
      value_box("Ümumi satış (top müştərilər)", textOutput("sales_total"), showcase = bs_icon("cash-stack"), theme = "success"),
      value_box("Müştəri seqmenti sayı", textOutput("sales_segments"), showcase = bs_icon("people-fill"), theme = "secondary"),
      col_widths = c(6,6)
    ),
    layout_columns(
      card(card_header("Ən böyük müştərilər"), plotlyOutput("sales_customers_chart", height = "300px")),
      card(card_header("Müştəri seqmentləri"), plotlyOutput("sales_segment_chart", height = "300px")),
      col_widths = c(7,5)
    ),
    card(
      card_header(bs_icon("receipt-cutoff"), " Faktura ödəniş statusları"),
      DTOutput("sales_payment_table")
    )
  )
}

logistics_ui <- function() {
  nav_panel(
    "Logistika", icon = bs_icon("signpost-split"),
    layout_columns(
      value_box("Vaxtında çatdırılma", textOutput("logi_ontime"), showcase = bs_icon("check-circle-fill"), theme = "success"),
      value_box("Cəmi göndəriş (tarixli)", textOutput("logi_total"), showcase = bs_icon("truck"), theme = "secondary"),
      col_widths = c(6,6)
    ),
    card(card_header("Göndəriş statusları üzrə bölgü"), plotlyOutput("logi_status_chart", height = "320px"))
  )
}

asset_ui <- function() {
  nav_panel(
    "Əsas Vəsaitlər", icon = bs_icon("tools"),
    layout_columns(
      value_box("Aktiv vəsait sayı", textOutput("asset_active"), showcase = bs_icon("box-fill"), theme = "primary"),
      value_box("Ümumi cari dəyər", textOutput("asset_value"), showcase = bs_icon("cash-coin"), theme = "secondary"),
      value_box("Son 12 ay təmir xərci", textOutput("asset_maint_cost"), showcase = bs_icon("wrench-adjustable"), theme = "danger"),
      col_widths = c(4,4,4)
    ),
    card(card_header("Status üzrə bölgü"), plotlyOutput("asset_status_chart", height = "300px")),
    card(
      card_header(bs_icon("calendar-event"), " Yaxınlaşan baxımlar (30 gün)"),
      DTOutput("asset_maintenance_table")
    )
  )
}

purchase_ui <- function() {
  nav_panel(
    "Təchizat", icon = bs_icon("cart-check"),
    layout_columns(
      value_box("Sifariş icra faizi", textOutput("purch_fulfillment"), showcase = bs_icon("check2-square"), theme = "success"),
      value_box("Təchizatçı orta reytinqi", textOutput("purch_rating"), showcase = bs_icon("star-fill"), theme = "secondary"),
      col_widths = c(6,6)
    ),
    card(card_header("Ən çox alış edilən təchizatçılar"), plotlyOutput("purch_supplier_chart", height = "300px")),
    card(
      card_header(bs_icon("list-ol"), " Sifariş statusları"),
      DTOutput("purch_status_table")
    )
  )
}

quality_ui <- function() {
  nav_panel(
    "Keyfiyyət", icon = bs_icon("patch-check-fill"),
    layout_columns(
      value_box("Ümumi rədd faizi", textOutput("qual_reject_pct"), showcase = bs_icon("exclamation-triangle-fill"), theme = "danger"),
      col_widths = c(12)
    ),
    card(card_header("Yoxlama nəticələri üzrə bölgü"), plotlyOutput("qual_inspection_chart", height = "300px")),
    layout_columns(
      card(card_header(bs_icon("file-earmark-medical"), " Müddəti yaxınlaşan sertifikatlar"), DTOutput("qual_certs_table")),
      card(card_header(bs_icon("clipboard-check"), " Son auditlər"), DTOutput("qual_audits_table")),
      col_widths = c(6,6)
    )
  )
}

org_ui <- function() {
  nav_panel(
    "Təşkilati Struktur", icon = bs_icon("diagram-3-fill"),
    layout_columns(
      value_box("Maaş diapazonundan kənar", textOutput("org_violations"), showcase = bs_icon("exclamation-octagon-fill"), theme = "danger"),
      col_widths = c(12)
    ),
    layout_columns(
      card(card_header("Filial üzrə işçi sayı"), plotlyOutput("org_branch_chart", height = "300px")),
      card(card_header("Departament büdcələri"), plotlyOutput("org_budget_chart", height = "300px")),
      col_widths = c(6,6)
    ),
    card(
      card_header(bs_icon("building"), " Qrup şirkətləri"),
      DTOutput("org_companies_table")
    )
  )
}

partner_ui <- function() {
  nav_panel(
    "Tərəfdaşlar", icon = bs_icon("briefcase-fill"),
    layout_columns(
      value_box("Orta tərəfdaş reytinqi", textOutput("partner_rating"), showcase = bs_icon("star-fill"), theme = "secondary"),
      col_widths = c(12)
    ),
    card(card_header("Tərəfdaş növü üzrə bölgü"), plotlyOutput("partner_type_chart", height = "300px")),
    layout_columns(
      card(card_header(bs_icon("file-earmark-text"), " Yaxınlaşan müqavilələr"), DTOutput("partner_contracts_table")),
      card(card_header(bs_icon("activity"), " Son 30 gün aktivlik"), DTOutput("partner_activity_table")),
      col_widths = c(6,6)
    )
  )
}

system_ui <- function() {
  nav_panel(
    "Sistem / Təhlükəsizlik", icon = bs_icon("shield-lock-fill"),
    layout_columns(
      value_box("Aktiv istifadəçi", textOutput("sys_active_users"), showcase = bs_icon("person-check-fill"), theme = "primary"),
      value_box("Kilidlənmiş hesab", textOutput("sys_locked_users"), showcase = bs_icon("lock-fill"), theme = "danger"),
      value_box("Uğursuz giriş (7 gün)", textOutput("sys_failed_logins"), showcase = bs_icon("shield-exclamation"), theme = "secondary"),
      col_widths = c(4,4,4)
    ),
    card(card_header("Son 30 gün ən aktiv modullar"), plotlyOutput("sys_activity_chart", height = "300px")),
    card(
      card_header(bs_icon("bug-fill"), " Həll olunmamış xətalar (səviyyə üzrə)"),
      DTOutput("sys_errors_table")
    )
  )
}

ai_ui <- function() {
  
  nav_panel(
    "AI Köməkçisi", icon = bs_icon("stars"),
    layout_columns(
      col_widths = c(4, 8),
      card(
        card_header(bs_icon("gear-fill"), " Kontekst seçimi"),
        p("AI köməkçisi yalnız aşağıda seçdiyiniz modulun REAL göstəriciləri əsasında cavab verir — özündən rəqəm uydurmur."),
        selectInput("ai_module", "Hansı mövzuda sual?",
                    choices = c("Anbar / İstehsalat" = "inventory", "Maliyyə" = "finance",
                                "HR / Əmək haqqı" = "hr", "İdxal-İxrac" = "trade",
                                "İstehsalat (Production)" = "production", "Satış (Sales)" = "sales",
                                "Logistika" = "logistics", "Əsas Vəsaitlər (Asset)" = "asset",
                                "Təchizat (Purchase)" = "purchase", "Keyfiyyət (Quality)" = "quality",
                                "Təşkilati Struktur (Org)" = "org", "Tərəfdaşlar (Partner)" = "partner",
                                "Sistem / Təhlükəsizlik" = "system",
                                "Ümumi Sənaye Məlumatı (AZ + Dünya)" = "general")),
        selectInput("ai_preset", "Hazır sual seçin (istəyə görə)", choices = character(0)),
        conditionalPanel(
          condition = "input.ai_module == 'general'",
          div(style = "font-size:.8rem; opacity:.75; margin-top:-4px;",
              "Bu rejimdə AI daxili baza göstəricilərini yox, ümumi sənaye biliyini istifadə edir.")
        ),
        if (nchar(ANTHROPIC_API_KEY) == 0)
          div(class = "demo-banner", bs_icon("key-fill"),
              " ANTHROPIC_API_KEY tapılmadı — ~/Desktop/arti_ess_api/.env yoxlayın.")
      ),
      card(
        card_header(bs_icon("chat-dots-fill"), " Söhbət"),
        div(id = "chat_history", style = "min-height:320px; max-height:460px; overflow-y:auto; padding:8px;",
            uiOutput("ai_chat_ui")),
        div(class = "custom-q-box",
            div(class = "label", bs_icon("pencil-fill"), "Öz sualınızı sərbəst yazın"),
            div(style = "display:flex; gap:8px;",
                textInput("ai_question", NULL, placeholder = "Buraya istənilən sualınızı yazın…", width = "100%"),
                actionButton("ai_send", "Göndər", icon = icon("paper-plane"), class = "btn btn-ai-send")
            )
        )
      )
    ),
    tags$script(HTML("
      Shiny.addCustomMessageHandler('scrollChatToBottom', function(msg) {
        setTimeout(function() {
          var el = document.getElementById('chat_history');
          if (el) { el.scrollTop = el.scrollHeight; }
        }, 60);
      });
    "))
  )
}

# ---- Ana UI ----------------------------------------------------------------

ui <- page_navbar(
  title = tagList(bs_icon("hexagon-fill"), " Zarat ERP"),
  id = "main_nav",
  theme = zarat_theme,
  sidebar = sidebar(
    title = "Zarat Group",
    width = 230,
    div(style="font-size:.8rem; opacity:.7; margin-bottom:14px;", "Simurq · Siyəzən yem zavodu · İdxal-İxrac"),
    hr(),
    tags$div(
      style = "font-size:.78rem;",
      tags$b(if (DEMO_MODE) "🟡 Demo rejimi" else "🟢 Bazaya qoşuludur"),
      tags$br(),
      tags$span(format(Sys.time(), "%d.%m.%Y %H:%M"))
    ),
    hr(),
    actionButton("refresh_all", "Məlumatları yenilə", icon = icon("rotate"), class = "btn-outline-primary btn-sm w-100")
  ),
  overview_ui(),
  inventory_ui(),
  finance_ui(),
  hr_ui(),
  trade_ui(),
  nav_menu(
    "Digər Modullar", icon = bs_icon("grid-3x3-gap-fill"),
    production_ui(),
    sales_ui(),
    logistics_ui(),
    asset_ui(),
    purchase_ui(),
    quality_ui(),
    org_ui(),
    partner_ui(),
    system_ui()
  ),
  nav_spacer(),
  ai_ui()
)

# ══════════════════════════════════════════════════════════════════════════
#  SERVER
# ══════════════════════════════════════════════════════════════════════════

server <- function(input, output, session) {
  
  # ---- Reaktiv trigger: "Məlumatları yenilə" düyməsi ----
  refresh_trigger <- reactiveVal(0)
  observeEvent(input$refresh_all, refresh_trigger(refresh_trigger() + 1))
  
  # ================= ANBAR / İSTEHSALAT =================
  inv_data <- reactive({
    refresh_trigger()
    by_category <- safe_query(
      "SELECT c.category_name AS category,
              SUM(i.quantity_on_hand *
                  COALESCE(i.last_selling_price, p.selling_price_local, p.standard_cost, 0)) AS total_value
       FROM inventory.inventory i
       JOIN inventory.products p ON i.product_id = p.id
       LEFT JOIN inventory.categories c ON p.category_id = c.id
       GROUP BY c.category_name ORDER BY total_value DESC",
      demo_inventory_by_category
    )
    # Qeyd: ayrıca "hərəkət" (movement) cədvəli mövcud olmadığı üçün,
    # son 30 gündə anbara DAXİL OLAN məhsul sayını trend kimi göstəririk.
    trend <- safe_query(
      "SELECT received_date AS day, COUNT(*) AS movements
       FROM inventory.inventory
       WHERE received_date >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY day ORDER BY day",
      demo_inventory_trend
    )
    low_stock <- safe_query(
      "SELECT p.product_code AS sku, p.product_name AS name,
              SUM(i.quantity_on_hand) AS quantity, MAX(p.reorder_point) AS reorder_level
       FROM inventory.inventory i
       JOIN inventory.products p ON i.product_id = p.id
       GROUP BY p.product_code, p.product_name
       HAVING SUM(i.quantity_on_hand) < MAX(p.reorder_point)",
      demo_low_stock
    )
    list(by_category = by_category, trend = trend, low_stock = low_stock)
  })
  
  output$inv_total_value <- renderText(fmt_azn(sum(inv_data()$by_category$total_value)))
  output$inv_low_count   <- renderText(fmt_num(nrow(inv_data()$low_stock)))
  output$inv_movements   <- renderText(fmt_num(sum(inv_data()$trend$movements)))
  
  output$inv_category_chart <- renderPlotly({
    d <- inv_data()$by_category
    plot_ly(d, x = ~reorder(category, total_value), y = ~total_value, type = "bar",
            marker = list(color = BRAND$primary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Dəyər (₼)")) |>
      brand_plot_theme()
  })
  
  output$inv_trend_chart <- renderPlotly({
    d <- inv_data()$trend
    plot_ly(d, x = ~day, y = ~movements, type = "scatter", mode = "lines+markers",
            line = list(color = BRAND$secondary), marker = list(color = BRAND$secondary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Hərəkət sayı")) |>
      brand_plot_theme()
  })
  
  output$inv_low_stock_table <- renderDT({
    datatable(inv_data()$low_stock, rownames = FALSE,
              colnames = c("SKU","Ad","Miqdar","Yenidən sifariş həddi"),
              options = list(pageLength = 5, dom = "tp"))
  })
  
  # ================= MALİYYƏ =================
  # Qeyd: finance schema-sında hazır "gəlir/xərc" cədvəli yoxdur — mühasibat
  # kitabı (general_ledger) məntiqi istifadə olunur: gəlir hesabları (revenue)
  # normalda kredit-artımlı, xərc hesabları (expense) debit-artımlıdır.
  fin_data <- reactive({
    refresh_trigger()
    kpis <- safe_query(
      "SELECT
         COALESCE(SUM(CASE WHEN coa.account_type = 'revenue' THEN gl.credit - gl.debit ELSE 0 END), 0) AS income,
         COALESCE(SUM(CASE WHEN coa.account_type = 'expense' THEN gl.debit - gl.credit ELSE 0 END), 0) AS expense
       FROM finance.general_ledger gl
       JOIN finance.chart_of_accounts coa ON gl.account_id = coa.id
       WHERE gl.transaction_date >= DATE_TRUNC('month', CURRENT_DATE)",
      demo_finance_kpis
    )
    if (!"profit" %in% names(kpis)) kpis$profit <- kpis$income - kpis$expense
    income_expense <- safe_query(
      "SELECT TO_CHAR(DATE_TRUNC('month', gl.transaction_date), 'YYYY-MM') AS month,
              COALESCE(SUM(CASE WHEN coa.account_type = 'revenue' THEN gl.credit - gl.debit ELSE 0 END), 0) AS income,
              COALESCE(SUM(CASE WHEN coa.account_type = 'expense' THEN gl.debit - gl.credit ELSE 0 END), 0) AS expense
       FROM finance.general_ledger gl
       JOIN finance.chart_of_accounts coa ON gl.account_id = coa.id
       WHERE gl.transaction_date >= CURRENT_DATE - INTERVAL '12 months'
       GROUP BY month ORDER BY month",
      demo_income_expense
    )
    overdue <- safe_query(
      "SELECT i.invoice_number AS invoice_no, c.company_name AS client_name,
              (i.total_amount - COALESCE(i.paid_amount,0)) AS amount,
              (CURRENT_DATE - i.due_date) AS days_overdue
       FROM sales.invoices i
       JOIN sales.customers c ON i.customer_id = c.id
       WHERE i.status <> 'paid' AND i.due_date < CURRENT_DATE
         AND (i.total_amount - COALESCE(i.paid_amount,0)) > 0
       ORDER BY days_overdue DESC",
      demo_overdue_invoices
    )
    list(kpis = kpis, income_expense = income_expense, overdue = overdue)
  })
  
  output$fin_income  <- renderText(fmt_azn(fin_data()$kpis$income[1]))
  output$fin_expense <- renderText(fmt_azn(fin_data()$kpis$expense[1]))
  output$fin_profit  <- renderText(fmt_azn(fin_data()$kpis$profit[1]))
  
  output$fin_income_expense_chart <- renderPlotly({
    d <- fin_data()$income_expense
    plot_ly(d, x = ~month, y = ~income, type = "bar", name = "Gəlir", marker = list(color = BRAND$success)) |>
      add_trace(y = ~expense, name = "Xərc", marker = list(color = BRAND$danger)) |>
      layout(barmode = "group", xaxis = list(title = ""), yaxis = list(title = "Məbləğ (₼)")) |>
      brand_plot_theme()
  })
  
  output$fin_overdue_table <- renderDT({
    datatable(fin_data()$overdue, rownames = FALSE,
              colnames = c("Faktura №","Müştəri","Məbləğ","Gecikmə (gün)"),
              options = list(pageLength = 5, dom = "tp")) |>
      formatStyle("days_overdue", backgroundColor = styleInterval(c(15,30), c("#FFF4E5","#FFE0DC","#FFC9C2")))
  })
  
  # ================= HR =================
  hr_data <- reactive({
    refresh_trigger()
    salary <- safe_query(
      "SELECT d.dept_name AS department, ROUND(AVG(e.monthly_salary),2) AS avg_salary, COUNT(*) AS employees
       FROM hr.employees e
       JOIN hr.departments d ON e.department_id = d.id
       WHERE e.is_active = true
       GROUP BY d.dept_name ORDER BY avg_salary DESC",
      demo_salary_by_department
    )
    hiring <- safe_query(
      "SELECT TO_CHAR(DATE_TRUNC('month', hire_date),'YYYY-MM') AS month, COUNT(*) AS count, 'İşə qəbul' AS type
       FROM hr.employees GROUP BY month
       UNION ALL
       SELECT TO_CHAR(DATE_TRUNC('month', termination_date),'YYYY-MM'), COUNT(*), 'İşdən çıxma'
       FROM hr.employees WHERE termination_date IS NOT NULL GROUP BY 1",
      demo_hiring_trend
    )
    employees <- safe_query(
      "SELECT e.full_name, d.dept_name AS department, e.position, e.hire_date AS hired_at
       FROM hr.employees e
       LEFT JOIN hr.departments d ON e.department_id = d.id
       WHERE e.is_active = true",
      demo_employees
    )
    list(salary = salary, hiring = hiring, employees = employees)
  })
  
  output$hr_active      <- renderText(fmt_num(sum(hr_data()$salary$employees)))
  output$hr_avg_salary  <- renderText(fmt_azn(mean(hr_data()$salary$avg_salary)))
  
  output$hr_salary_chart <- renderPlotly({
    d <- hr_data()$salary
    plot_ly(d, x = ~reorder(department, avg_salary), y = ~avg_salary, type = "bar",
            marker = list(color = BRAND$primary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Orta maaş (₼)")) |>
      brand_plot_theme()
  })
  
  output$hr_hiring_chart <- renderPlotly({
    d <- hr_data()$hiring
    plot_ly(d, x = ~month, y = ~count, color = ~type, type = "scatter", mode = "lines+markers",
            colors = c(BRAND$success, BRAND$danger)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Sayı")) |>
      brand_plot_theme()
  })
  
  output$hr_employees_table <- renderDT({
    d <- hr_data()$employees
    if (nchar(input$hr_search) > 0) {
      d <- d[grepl(input$hr_search, d$full_name, ignore.case = TRUE), ]
    }
    datatable(d, rownames = FALSE,
              colnames = c("Ad Soyad","Departament","Vəzifə","İşə başlama tarixi"),
              options = list(pageLength = 8, dom = "tp"))
  })
  
  # ================= İDXAL-İXRAC =================
  # Qeyd: "value_usd" adlı ayrıca sütun yoxdur — total_amount müxtəlif
  # valyutalarda ola bilər (currency sütunu). Sadəlik üçün burada total_amount
  # birbaşa göstərilir; dəqiq USD konversiyası üçün gələcəkdə currency-yə görə
  # çevrilmə əlavə edilməlidir.
  trade_data <- reactive({
    refresh_trigger()
    by_country <- safe_query(
      "SELECT customer_country AS country, SUM(total_amount) AS value_usd
       FROM trade.export_order
       GROUP BY customer_country ORDER BY value_usd DESC",
      demo_export_by_country
    )
    delayed <- safe_query(
      "SELECT export_number AS shipment_no, customer_country AS country,
              (CURRENT_DATE - expected_delivery) AS days_late
       FROM trade.export_order
       WHERE actual_delivery IS NULL AND expected_delivery < CURRENT_DATE
         AND status <> 'cancelled'",
      demo_delayed_shipments
    )
    shipments <- safe_query(
      "SELECT export_number AS shipment_no, customer_country AS country, status, total_amount AS value_usd
       FROM trade.export_order
       UNION ALL
       SELECT import_number, supplier_country, status, total_amount
       FROM trade.import_order",
      demo_shipments
    )
    list(by_country = by_country, delayed = delayed, shipments = shipments)
  })
  
  # ================= İSTEHSALAT (Production) — yalnız AI kontekst üçün =====
  prod_data <- reactive({
    refresh_trigger()
    by_status <- safe_query(
      "SELECT status, COUNT(*) AS cnt FROM production.production_orders
       GROUP BY status ORDER BY cnt DESC",
      demo_production_by_status
    )
    batches <- safe_query(
      "SELECT batch_number, planned_quantity, actual_quantity, rejected_quantity,
              ROUND(100.0 * rejected_quantity / NULLIF(actual_quantity,0), 1) AS reject_pct
       FROM production.batches ORDER BY batch_date DESC LIMIT 10",
      demo_production_batches
    )
    kpis <- safe_query(
      "SELECT COALESCE(SUM(produced_quantity),0) AS produced,
              COALESCE(SUM(planned_quantity),0) AS planned,
              COALESCE(SUM(rejected_quantity),0) AS rejected
       FROM production.production_orders WHERE start_date >= CURRENT_DATE - INTERVAL '30 days'",
      demo_production_kpis
    )
    list(by_status = by_status, batches = batches, kpis = kpis)
  })
  
  # ================= SATIŞ (Sales) — yalnız AI kontekst üçün ===============
  sales_data <- reactive({
    refresh_trigger()
    top_customers <- safe_query(
      "SELECT c.company_name, SUM(i.total_amount) AS total_sales
       FROM sales.invoices i JOIN sales.customers c ON i.customer_id = c.id
       GROUP BY c.company_name ORDER BY total_sales DESC LIMIT 10",
      demo_top_customers
    )
    by_segment <- safe_query(
      "SELECT customer_segment, COUNT(*) AS cnt FROM sales.customers GROUP BY customer_segment",
      demo_sales_segment
    )
    payment_ratio <- safe_query(
      "SELECT status, COUNT(*) AS cnt, SUM(total_amount) AS amt FROM sales.invoices GROUP BY status",
      demo_payment_ratio
    )
    list(top_customers = top_customers, by_segment = by_segment, payment_ratio = payment_ratio)
  })
  
  # ================= LOGİSTİKA — yalnız AI kontekst üçün ====================
  logi_data <- reactive({
    refresh_trigger()
    status_breakdown <- safe_query(
      "SELECT status, COUNT(*) AS cnt FROM logistics.shipment GROUP BY status ORDER BY cnt DESC",
      demo_logi_status
    )
    ontime <- safe_query(
      "SELECT ROUND(100.0 * SUM(CASE WHEN actual_delivery_date <= planned_delivery_date THEN 1 ELSE 0 END)
              / NULLIF(COUNT(*),0), 1) AS on_time_pct, COUNT(*) AS total
       FROM logistics.shipment WHERE actual_delivery_date IS NOT NULL",
      demo_logi_ontime
    )
    list(status_breakdown = status_breakdown, ontime = ontime)
  })
  
  # ================= ƏSAS VƏSAİTLƏR (Asset) — yalnız AI kontekst üçün ======
  asset_data <- reactive({
    refresh_trigger()
    kpis <- safe_query(
      "SELECT COUNT(*) FILTER (WHERE is_active) AS active_count, COALESCE(SUM(current_value),0) AS total_value
       FROM asset.asset",
      demo_asset_kpis
    )
    upcoming_maintenance <- safe_query(
      "SELECT a.asset_name, ms.next_maintenance_date, ms.priority
       FROM asset.maintenance_schedule ms
       JOIN asset.asset a ON ms.asset_id = a.id
       WHERE ms.is_active AND ms.next_maintenance_date <= CURRENT_DATE + INTERVAL '30 days'
       ORDER BY ms.next_maintenance_date",
      demo_asset_upcoming_maintenance
    )
    by_status <- safe_query(
      "SELECT status, COUNT(*) AS cnt FROM asset.asset GROUP BY status ORDER BY cnt DESC",
      demo_asset_by_status
    )
    maintenance_cost <- safe_query(
      "SELECT COALESCE(SUM(cost),0) AS total_cost_12m FROM asset.maintenance_history
       WHERE maintenance_date >= CURRENT_DATE - INTERVAL '12 months'",
      demo_asset_maintenance_cost
    )
    list(kpis = kpis, upcoming_maintenance = upcoming_maintenance,
         by_status = by_status, maintenance_cost = maintenance_cost)
  })
  
  # ================= TƏCHİZAT (Purchase) — yalnız AI kontekst üçün =========
  purchase_data <- reactive({
    refresh_trigger()
    by_supplier <- safe_query(
      "SELECT s.company_name, SUM(o.total_amount) AS total_purchased
       FROM purchase.orders o JOIN purchase.suppliers s ON o.supplier_id = s.id
       GROUP BY s.company_name ORDER BY total_purchased DESC LIMIT 10",
      demo_purchase_by_supplier
    )
    by_status <- safe_query(
      "SELECT status, COUNT(*) AS cnt FROM purchase.orders GROUP BY status ORDER BY cnt DESC",
      demo_purchase_by_status
    )
    fulfillment <- safe_query(
      "SELECT ROUND(100.0 * SUM(received_qty) / NULLIF(SUM(ordered_qty),0), 1) AS fulfillment_pct
       FROM purchase.order_lines",
      demo_purchase_fulfillment
    )
    avg_rating <- safe_query(
      "SELECT ROUND(AVG(rating),1) AS avg_rating FROM purchase.suppliers WHERE is_active",
      demo_purchase_avg_rating
    )
    list(by_supplier = by_supplier, by_status = by_status,
         fulfillment = fulfillment, avg_rating = avg_rating)
  })
  
  # ================= KEYFİYYƏT (Quality) — yalnız AI kontekst üçün =========
  quality_data <- reactive({
    refresh_trigger()
    inspection_summary <- safe_query(
      "SELECT overall_result, COUNT(*) AS cnt FROM quality.quality_inspection
       GROUP BY overall_result ORDER BY cnt DESC",
      demo_quality_inspection_summary
    )
    rejection_rate <- safe_query(
      "SELECT ROUND(100.0 * SUM(rejected_qty) / NULLIF(SUM(accepted_qty + rejected_qty),0), 1) AS reject_pct
       FROM quality.quality_inspection",
      demo_quality_rejection_rate
    )
    expiring_certs <- safe_query(
      "SELECT certificate_name, expiry_date FROM quality.quality_certificate
       WHERE status = 'active' AND expiry_date <= CURRENT_DATE + INTERVAL '60 days'
       ORDER BY expiry_date",
      demo_quality_expiring_certs
    )
    audit_ratings <- safe_query(
      "SELECT audit_name, audit_date, overall_rating FROM quality.quality_audit
       ORDER BY audit_date DESC LIMIT 5",
      demo_quality_audit_ratings
    )
    list(inspection_summary = inspection_summary, rejection_rate = rejection_rate,
         expiring_certs = expiring_certs, audit_ratings = audit_ratings)
  })
  
  # ================= TƏŞKİLATİ STRUKTUR (Org) — yalnız AI kontekst üçün ====
  org_data <- reactive({
    refresh_trigger()
    by_branch <- safe_query(
      "SELECT b.branch_name, COUNT(e.id) AS emp_count
       FROM org.employees e JOIN org.branches b ON e.branch_id = b.id
       WHERE e.is_active GROUP BY b.branch_name ORDER BY emp_count DESC",
      demo_org_by_branch
    )
    companies <- safe_query(
      "SELECT company_name, country, industry FROM org.companies WHERE is_active",
      demo_org_companies
    )
    salary_violations <- safe_query(
      "SELECT e.full_name, e.salary, p.position_name, p.salary_min, p.salary_max
       FROM org.employees e JOIN org.positions p ON e.position_id = p.id
       WHERE e.is_active AND (e.salary < p.salary_min OR e.salary > p.salary_max)",
      demo_org_salary_violations
    )
    dept_budget <- safe_query(
      "SELECT dept_name, budget FROM org.departments WHERE is_active
       ORDER BY budget DESC LIMIT 10",
      demo_org_dept_budget
    )
    list(by_branch = by_branch, companies = companies,
         salary_violations = salary_violations, dept_budget = dept_budget)
  })
  
  # ================= TƏRƏFDAŞLAR (Partner) — yalnız AI kontekst üçün =======
  partner_data <- reactive({
    refresh_trigger()
    by_type <- safe_query(
      "SELECT pt.type_name, COUNT(*) AS cnt
       FROM partner.partner p LEFT JOIN partner.partner_type pt ON p.type_id = pt.id
       GROUP BY pt.type_name ORDER BY cnt DESC",
      demo_partner_by_type
    )
    expiring_contracts <- safe_query(
      "SELECT contract_name, end_date FROM partner.contract
       WHERE status = 'active' AND end_date <= CURRENT_DATE + INTERVAL '60 days'
       ORDER BY end_date",
      demo_partner_expiring_contracts
    )
    avg_rating <- safe_query(
      "SELECT ROUND(AVG(overall_rating),1) AS avg_rating FROM partner.partner_rating",
      demo_partner_avg_rating
    )
    recent_activity <- safe_query(
      "SELECT activity_type, COUNT(*) AS cnt FROM partner.partner_activity_log
       WHERE activity_date >= NOW() - INTERVAL '30 days'
       GROUP BY activity_type ORDER BY cnt DESC",
      demo_partner_recent_activity
    )
    list(by_type = by_type, expiring_contracts = expiring_contracts,
         avg_rating = avg_rating, recent_activity = recent_activity)
  })
  
  # ================= SİSTEM / TƏHLÜKƏSİZLİK — yalnız AI kontekst üçün =====
  system_data <- reactive({
    refresh_trigger()
    kpis <- safe_query(
      "SELECT COUNT(*) FILTER (WHERE is_active) AS active_users,
              COUNT(*) FILTER (WHERE is_locked) AS locked_users
       FROM system.user",
      demo_system_user_kpis
    )
    failed_logins <- safe_query(
      "SELECT COUNT(*) AS failed_count FROM system.login_history
       WHERE NOT is_successful AND login_time >= NOW() - INTERVAL '7 days'",
      demo_system_failed_logins
    )
    error_summary <- safe_query(
      "SELECT severity, COUNT(*) FILTER (WHERE NOT resolved) AS unresolved
       FROM system.error_log WHERE created_at >= NOW() - INTERVAL '30 days'
       GROUP BY severity ORDER BY unresolved DESC",
      demo_system_error_summary
    )
    last_backup <- safe_query(
      "SELECT backup_type, status, start_time, end_time
       FROM system.backup_log ORDER BY start_time DESC LIMIT 1",
      demo_system_last_backup
    )
    activity_by_module <- safe_query(
      "SELECT module, COUNT(*) AS cnt FROM system.audit_log
       WHERE created_at >= NOW() - INTERVAL '30 days'
       GROUP BY module ORDER BY cnt DESC LIMIT 5",
      demo_system_activity_by_module
    )
    list(kpis = kpis, failed_logins = failed_logins, error_summary = error_summary,
         last_backup = last_backup, activity_by_module = activity_by_module)
  })
  
  output$tr_export_value  <- renderText(fmt_usd(sum(trade_data()$by_country$value_usd)))
  output$tr_delayed_count <- renderText(fmt_num(nrow(trade_data()$delayed)))
  
  output$tr_country_chart <- renderPlotly({
    d <- trade_data()$by_country
    plot_ly(d, x = ~reorder(country, value_usd), y = ~value_usd, type = "bar",
            marker = list(color = BRAND$secondary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Dəyər (USD)")) |>
      brand_plot_theme()
  })
  
  output$tr_delayed_table <- renderDT({
    datatable(trade_data()$delayed, rownames = FALSE,
              colnames = c("Göndəriş №","Ölkə","Gecikmə (gün)"), options = list(pageLength = 5, dom = "tp"))
  })
  
  output$tr_status_filter_ui <- renderUI({
    statuses <- sort(unique(trade_data()$shipments$status))
    selectInput("tr_status_filter", "Status filtri", choices = c("Hamısı", statuses))
  })
  
  output$tr_shipments_table <- renderDT({
    d <- trade_data()$shipments
    if (!is.null(input$tr_status_filter) && input$tr_status_filter != "Hamısı") {
      d <- d[d$status == input$tr_status_filter, ]
    }
    datatable(d, rownames = FALSE, colnames = c("Göndəriş №","Ölkə","Status","Dəyər (USD)"),
              options = list(pageLength = 8, dom = "tp"))
  })
  
  # ================= İSTEHSALAT (Production) — vizual modul =================
  output$prod_planned  <- renderText(fmt_num(prod_data()$kpis$planned[1]))
  output$prod_produced <- renderText(fmt_num(prod_data()$kpis$produced[1]))
  output$prod_rejected <- renderText(fmt_num(prod_data()$kpis$rejected[1]))
  
  output$prod_status_chart <- renderPlotly({
    d <- prod_data()$by_status
    plot_ly(d, x = ~reorder(status, cnt), y = ~cnt, type = "bar",
            marker = list(color = BRAND$primary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Sifariş sayı")) |>
      brand_plot_theme()
  })
  
  output$prod_batches_table <- renderDT({
    datatable(prod_data()$batches, rownames = FALSE,
              colnames = c("Partiya №","Planlaşdırılan","Faktiki","Rədd edilən","Rədd %"),
              options = list(pageLength = 8, dom = "tp"))
  })
  
  # ================= SATIŞ (Sales) — vizual modul ===========================
  output$sales_total <- renderText(fmt_azn(sum(sales_data()$top_customers$total_sales)))
  output$sales_segments <- renderText(fmt_num(nrow(sales_data()$by_segment)))
  
  output$sales_customers_chart <- renderPlotly({
    d <- sales_data()$top_customers
    plot_ly(d, x = ~reorder(company_name, total_sales), y = ~total_sales, type = "bar",
            marker = list(color = BRAND$success)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Satış (₼)")) |>
      brand_plot_theme()
  })
  
  output$sales_segment_chart <- renderPlotly({
    d <- sales_data()$by_segment
    plot_ly(d, labels = ~customer_segment, values = ~cnt, type = "pie", hole = 0.5,
            marker = list(colors = colorRampPalette(c(BRAND$primary, BRAND$secondary))(nrow(d)))) |>
      brand_plot_theme()
  })
  
  output$sales_payment_table <- renderDT({
    datatable(sales_data()$payment_ratio, rownames = FALSE,
              colnames = c("Status","Faktura sayı","Məbləğ"), options = list(pageLength = 5, dom = "tp"))
  })
  
  # ================= LOGİSTİKA — vizual modul ================================
  output$logi_ontime <- renderText(paste0(logi_data()$ontime$on_time_pct[1], "%"))
  output$logi_total  <- renderText(fmt_num(logi_data()$ontime$total[1]))
  
  output$logi_status_chart <- renderPlotly({
    d <- logi_data()$status_breakdown
    plot_ly(d, x = ~reorder(status, cnt), y = ~cnt, type = "bar",
            marker = list(color = BRAND$secondary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Göndəriş sayı")) |>
      brand_plot_theme()
  })
  
  # ================= ƏSAS VƏSAİTLƏR (Asset) — vizual modul ===================
  output$asset_active <- renderText(fmt_num(asset_data()$kpis$active_count[1]))
  output$asset_value  <- renderText(fmt_azn(asset_data()$kpis$total_value[1]))
  output$asset_maint_cost <- renderText(fmt_azn(asset_data()$maintenance_cost$total_cost_12m[1]))
  
  output$asset_status_chart <- renderPlotly({
    d <- asset_data()$by_status
    plot_ly(d, labels = ~status, values = ~cnt, type = "pie", hole = 0.5,
            marker = list(colors = colorRampPalette(c(BRAND$primary, BRAND$secondary, BRAND$danger))(nrow(d)))) |>
      brand_plot_theme()
  })
  
  output$asset_maintenance_table <- renderDT({
    datatable(asset_data()$upcoming_maintenance, rownames = FALSE,
              colnames = c("Avadanlıq","Növbəti baxım tarixi","Prioritet"),
              options = list(pageLength = 6, dom = "tp"))
  })
  
  # ================= TƏCHİZAT (Purchase) — vizual modul =======================
  output$purch_fulfillment <- renderText(paste0(purchase_data()$fulfillment$fulfillment_pct[1], "%"))
  output$purch_rating <- renderText(paste0(purchase_data()$avg_rating$avg_rating[1], "/5"))
  
  output$purch_supplier_chart <- renderPlotly({
    d <- purchase_data()$by_supplier
    plot_ly(d, x = ~reorder(company_name, total_purchased), y = ~total_purchased, type = "bar",
            marker = list(color = BRAND$primary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Alış dəyəri (₼)")) |>
      brand_plot_theme()
  })
  
  output$purch_status_table <- renderDT({
    datatable(purchase_data()$by_status, rownames = FALSE,
              colnames = c("Status","Sifariş sayı"), options = list(pageLength = 6, dom = "tp"))
  })
  
  # ================= KEYFİYYƏT (Quality) — vizual modul ========================
  output$qual_reject_pct <- renderText(paste0(quality_data()$rejection_rate$reject_pct[1], "%"))
  
  output$qual_inspection_chart <- renderPlotly({
    d <- quality_data()$inspection_summary
    plot_ly(d, x = ~reorder(overall_result, cnt), y = ~cnt, type = "bar",
            marker = list(color = BRAND$secondary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Yoxlama sayı")) |>
      brand_plot_theme()
  })
  
  output$qual_certs_table <- renderDT({
    datatable(quality_data()$expiring_certs, rownames = FALSE,
              colnames = c("Sertifikat", "Bitmə tarixi"), options = list(pageLength = 5, dom = "tp"))
  })
  
  output$qual_audits_table <- renderDT({
    datatable(quality_data()$audit_ratings, rownames = FALSE,
              colnames = c("Audit adı", "Tarix", "Reytinq"), options = list(pageLength = 5, dom = "tp"))
  })
  
  # ================= TƏŞKİLATİ STRUKTUR (Org) — vizual modul ===================
  output$org_violations <- renderText(fmt_num(nrow(org_data()$salary_violations)))
  
  output$org_branch_chart <- renderPlotly({
    d <- org_data()$by_branch
    plot_ly(d, x = ~reorder(branch_name, emp_count), y = ~emp_count, type = "bar",
            marker = list(color = BRAND$primary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "İşçi sayı")) |>
      brand_plot_theme()
  })
  
  output$org_budget_chart <- renderPlotly({
    d <- org_data()$dept_budget
    plot_ly(d, x = ~reorder(dept_name, budget), y = ~budget, type = "bar",
            marker = list(color = BRAND$secondary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Büdcə (₼)")) |>
      brand_plot_theme()
  })
  
  output$org_companies_table <- renderDT({
    datatable(org_data()$companies, rownames = FALSE,
              colnames = c("Şirkət", "Ölkə", "Sənaye"), options = list(pageLength = 5, dom = "tp"))
  })
  
  # ================= TƏRƏFDAŞLAR (Partner) — vizual modul ======================
  output$partner_rating <- renderText(paste0(partner_data()$avg_rating$avg_rating[1], "/5"))
  
  output$partner_type_chart <- renderPlotly({
    d <- partner_data()$by_type
    plot_ly(d, labels = ~type_name, values = ~cnt, type = "pie", hole = 0.5,
            marker = list(colors = colorRampPalette(c(BRAND$primary, BRAND$secondary))(nrow(d)))) |>
      brand_plot_theme()
  })
  
  output$partner_contracts_table <- renderDT({
    datatable(partner_data()$expiring_contracts, rownames = FALSE,
              colnames = c("Müqavilə", "Bitmə tarixi"), options = list(pageLength = 5, dom = "tp"))
  })
  
  output$partner_activity_table <- renderDT({
    datatable(partner_data()$recent_activity, rownames = FALSE,
              colnames = c("Aktivlik növü", "Sayı"), options = list(pageLength = 5, dom = "tp"))
  })
  
  # ================= SİSTEM / TƏHLÜKƏSİZLİK — vizual modul ======================
  output$sys_active_users   <- renderText(fmt_num(system_data()$kpis$active_users[1]))
  output$sys_locked_users   <- renderText(fmt_num(system_data()$kpis$locked_users[1]))
  output$sys_failed_logins  <- renderText(fmt_num(system_data()$failed_logins$failed_count[1]))
  
  output$sys_activity_chart <- renderPlotly({
    d <- system_data()$activity_by_module
    plot_ly(d, x = ~reorder(module, cnt), y = ~cnt, type = "bar",
            marker = list(color = BRAND$primary)) |>
      layout(xaxis = list(title = ""), yaxis = list(title = "Əməliyyat sayı")) |>
      brand_plot_theme()
  })
  
  output$sys_errors_table <- renderDT({
    datatable(system_data()$error_summary, rownames = FALSE,
              colnames = c("Səviyyə", "Həll olunmamış sayı"), options = list(pageLength = 5, dom = "tp"))
  })
  
  # ================= İDARƏ PANELİ (Overview) =================
  feed_30d <- reactive({
    refresh_trigger()
    safe_query(
      "SELECT COALESCE(SUM(actual_quantity),0) AS qty
       FROM production.batches
       WHERE batch_date >= CURRENT_DATE - INTERVAL '30 days'",
      function() tibble(qty = 38400)
    )
  })
  
  output$ov_employees <- renderText(fmt_num(sum(hr_data()$salary$employees)))
  output$ov_unpaid    <- renderText(fmt_azn(sum(fin_data()$overdue$amount)))
  output$ov_feed       <- renderText(paste0(fmt_num(feed_30d()$qty[1] / 1000), " ton"))
  output$ov_export    <- renderText(fmt_usd(sum(trade_data()$by_country$value_usd)))
  
  output$ov_finance_chart <- renderPlotly({
    d <- fin_data()$income_expense
    plot_ly(d, x = ~month, y = ~income, type = "bar", name = "Gəlir", marker = list(color = BRAND$success)) |>
      add_trace(y = ~expense, name = "Xərc", marker = list(color = BRAND$danger)) |>
      layout(barmode = "group", xaxis = list(title = "")) |>
      brand_plot_theme()
  })
  
  output$ov_hr_chart <- renderPlotly({
    d <- hr_data()$salary
    plot_ly(d, labels = ~department, values = ~employees, type = "pie", hole = 0.5,
            marker = list(colors = colorRampPalette(c(BRAND$primary, BRAND$secondary))(nrow(d)))) |>
      brand_plot_theme()
  })
  
  # ================= AI KÖMƏKÇİSİ =================
  chat_log <- reactiveVal(list())
  
  # Modul dəyişəndə hazır sual siyahısını yenilə
  observeEvent(input$ai_module, {
    qs <- QUESTION_BANK[[input$ai_module]]
    updateSelectInput(session, "ai_preset",
                      choices = c("— hazır sual seçin —" = "", setNames(qs, qs)))
  }, ignoreNULL = FALSE)
  
  # Hazır sual seçiləndə mətn qutusuna köçür
  observeEvent(input$ai_preset, {
    if (nzchar(input$ai_preset)) {
      updateTextInput(session, "ai_question", value = input$ai_preset)
    }
  }, ignoreInit = TRUE)
  
  observeEvent(input$ai_send, {
    q <- trimws(input$ai_question)
    if (!nzchar(q)) return(invisible(NULL))
    
    # İstifadəçi mesajını dərhal göstər
    log <- chat_log()
    log[[length(log) + 1]] <- list(role = "user", text = q)
    chat_log(log)
    updateTextInput(session, "ai_question", value = "")
    
    # Canlı "düşünür" bildirişi — showNotification() Shiny-nin rəsmi, təminatlı
    # "uzun proses davam edir" mexanizmidir; insertUI-dən fərqli olaraq, bu,
    # R bloklanmış olsa belə brauzerə DƏRHAL çatdırılması TƏMİN OLUNAN yeganə üsuldur.
    showNotification(
      ui = div(class = "ai-thinking",
               span(class = "dot"), span(class = "dot"), span(class = "dot"),
               span("AI göstəriciləri təhlil edir, cavab hazırlanır…")
      ),
      duration = NULL, closeButton = FALSE, id = "ai_thinking_notif", type = "default"
    )
    
    result <- NULL
    result <- tryCatch({
      if (identical(input$ai_module, "general")) {
        call_claude_general(q)
      } else {
        module_data <- switch(input$ai_module,
                              "inventory"  = inv_data(),
                              "finance"    = fin_data(),
                              "hr"         = hr_data(),
                              "trade"      = trade_data(),
                              "production" = prod_data(),
                              "sales"      = sales_data(),
                              "logistics"  = logi_data(),
                              "asset"      = asset_data(),
                              "purchase"   = purchase_data(),
                              "quality"    = quality_data(),
                              "org"        = org_data(),
                              "partner"    = partner_data(),
                              "system"     = system_data()
        )
        context <- build_context_summary(input$ai_module, module_data)
        call_claude(q, context)
      }
    }, error = function(e) {
      list(text = paste0("⚠️ Daxili xəta baş verdi: ", conditionMessage(e)),
           input_tokens = 0, output_tokens = 0, elapsed = 0, cost = 0, ok = FALSE)
    })
    
    # Bildirişi qaldır
    removeNotification("ai_thinking_notif")
    
    if (is.null(result)) {
      result <- list(text = "⚠️ Naməlum xəta: server heç bir cavab qaytarmadı.",
                     input_tokens = 0, output_tokens = 0, elapsed = 0, cost = 0, ok = FALSE)
    }
    
    log <- chat_log()
    log[[length(log) + 1]] <- list(
      role = "ai", text = result$text %||% "⚠️ Naməlum xəta (cavab boş qayıtdı).",
      ok = isTRUE(result$ok),
      input_tokens = result$input_tokens %||% 0, output_tokens = result$output_tokens %||% 0,
      elapsed = result$elapsed %||% 0, cost = result$cost %||% 0
    )
    chat_log(log)
    session$sendCustomMessage("scrollChatToBottom", list())
  })
  
  output$ai_chat_ui <- renderUI({
    log <- chat_log()
    if (length(log) == 0) {
      return(p(style = "opacity:.6;", "Sual yazın və ya sol paneldən hazır sual seçin — cavab yalnız real göstəricilər əsasında veriləcək."))
    }
    tagList(lapply(log, function(m) {
      if (m$role == "user") {
        div(class = "chat-bubble-user", m$text)
      } else {
        div(class = "chat-bubble-ai",
            div(class = "ai-bubble-header", bs_icon("stars"), "Zarat AI"),
            div(class = "ai-answer-body", HTML(commonmark::markdown_html(m$text))),
            if (isTRUE(m$ok)) div(class = "ai-meta",
                                  span(class = "ai-stat-chip", bs_icon("cpu"),
                                       HTML(paste0("<b>", fmt_num(m$input_tokens), "</b>&nbsp;giriş&nbsp;/&nbsp;<b>",
                                                   fmt_num(m$output_tokens), "</b>&nbsp;çıxış token"))),
                                  span(class = "ai-stat-chip", bs_icon("stopwatch"),
                                       HTML(paste0("<b>", fmt_secs(m$elapsed), "</b>"))),
                                  span(class = "ai-stat-chip", bs_icon("cash-coin"),
                                       HTML(paste0("<b>", fmt_cost(m$cost), "</b>")))
            )
        )
      }
    }))
  })
  
  # ---- Session bitəndə baza bağlantısını bağla ----
  session$onSessionEnded(function() {
    if (!is.null(CON)) tryCatch(DBI::dbDisconnect(CON), error = function(e) NULL)
  })
}

# ══════════════════════════════════════════════════════════════════════════
shinyApp(ui, server)