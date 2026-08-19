-- Zarat ERP — FAZA 1: sys cədvəlləri + istinad (reference) cədvəlləri
-- Kanonik model (Mənbə A) üzərinə əlavə. İdempotent (CREATE ... IF NOT EXISTS).
-- İcra: psql -p 5433 -d zarat_erp -f 15_faza1_sys_ref.sql

-- ============ İSTİNAD (REFERENCE) CƏDVƏLLƏRİ ============

-- Ölçü vahidləri (UoM) — product.item.base_uom bu koda uyğun gəlir
CREATE TABLE IF NOT EXISTS product.uom (
    uom_code       text NOT NULL,
    uom_name       text NOT NULL,
    short_name     text,
    is_active      boolean DEFAULT true,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_uom PRIMARY KEY (uom_code)
);

-- Valyutalar (ERP istinadı)
CREATE TABLE IF NOT EXISTS trade.currency (
    currency_code  text NOT NULL,
    currency_name  text NOT NULL,
    symbol         text,
    is_active      boolean DEFAULT true,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_trade_currency PRIMARY KEY (currency_code)
);

-- Incoterm-lər (beynəlxalq təhvil şərtləri)
CREATE TABLE IF NOT EXISTS trade.incoterm (
    incoterm_code  text NOT NULL,
    incoterm_name  text NOT NULL,
    notes          text,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_trade_incoterm PRIMARY KEY (incoterm_code)
);

-- Məzuniyyət növləri (kadr istinadı)
CREATE TABLE IF NOT EXISTS hr.leave_type (
    leave_type_code text NOT NULL,
    leave_type_name text NOT NULL,
    is_paid         boolean DEFAULT true,
    max_days_year   integer,
    created_at      timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_hr_leave_type PRIMARY KEY (leave_type_code)
);

-- Sənəd nömrələmə ardıcıllığı
CREATE TABLE IF NOT EXISTS sys.doc_sequence (
    seq_code       text NOT NULL,
    seq_name       text NOT NULL,
    prefix         text,
    next_value     integer NOT NULL DEFAULT 1,
    padding        integer DEFAULT 4,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_doc_sequence PRIMARY KEY (seq_code)
);

-- ============ SYS (idarəetmə / təhlükəsizlik) CƏDVƏLLƏRİ ============

-- Rollar (DeepSeek "user_role.xlsx" əslində rol tərifidir)
CREATE TABLE IF NOT EXISTS sys.role (
    role_code      text NOT NULL,
    role_name      text NOT NULL,
    description    text,
    priority       integer,
    is_active      boolean DEFAULT true,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_role PRIMARY KEY (role_code)
);

-- İcazələr
CREATE TABLE IF NOT EXISTS sys.permission (
    permission_code text NOT NULL,
    permission_name text NOT NULL,
    module_name     text,
    description     text,
    created_at      timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_permission PRIMARY KEY (permission_code)
);

-- Rol-İcazə əlaqəsi
CREATE TABLE IF NOT EXISTS sys.role_permission (
    role_code       text NOT NULL,
    permission_code text NOT NULL,
    created_at      timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_role_permission PRIMARY KEY (role_code, permission_code)
);

-- İstifadəçilər ("user" rezerv sözdür → app_user)
CREATE TABLE IF NOT EXISTS sys.app_user (
    username       text NOT NULL,
    employee_code  text,
    email          text,
    first_name     text,
    last_name      text,
    password_hash  text,
    is_active      boolean DEFAULT true,
    is_locked      boolean DEFAULT false,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_app_user PRIMARY KEY (username)
);

-- İstifadəçi-Rol təyinatı (Faza 1-də mənbə yoxdur → boş)
CREATE TABLE IF NOT EXISTS sys.user_role (
    username       text NOT NULL,
    role_code      text NOT NULL,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_user_role PRIMARY KEY (username, role_code)
);

-- Sistem parametrləri
CREATE TABLE IF NOT EXISTS sys.setting (
    config_key     text NOT NULL,
    config_value   text,
    config_type    text,
    description    text,
    is_active      boolean DEFAULT true,
    created_at     timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sys_setting PRIMARY KEY (config_key)
);

-- Audit jurnalı (təbii surroqat açar)
CREATE TABLE IF NOT EXISTS sys.audit_log (
    log_id         bigint NOT NULL,
    user_ref       text,
    action         text,
    table_name     text,
    record_id      text,
    old_value      text,
    new_value      text,
    ip_address     text,
    created_at     timestamptz,
    CONSTRAINT pk_sys_audit_log PRIMARY KEY (log_id)
);
