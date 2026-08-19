-- Zarat ERP — 37 master-data cədvəli (yükləmə sırası ilə)
-- Təbii açar (kod) PRIMARY KEY kimi istifadə olunur; FK-lər kodlara istinad edir.
-- İcra: psql -p 5433 -d zarat_erp -f 10_tables.sql

-- 01. org.company  —  Hüquqi şəxslər
CREATE TABLE IF NOT EXISTS org.company (
    company_code           text NOT NULL,
    legal_name             text NOT NULL,
    short_name             text,
    voen                   text,
    legal_form             text,
    reg_date               date,
    address                text,
    phone                  text,
    email                  text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_org_company PRIMARY KEY (company_code)
);

-- 02. partner.payment_term  —  Ödəniş şərtləri
CREATE TABLE IF NOT EXISTS partner.payment_term (
    term_code              text NOT NULL,
    term_name              text NOT NULL,
    days                   integer,
    type                   text,
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_partner_payment_term PRIMARY KEY (term_code)
);

-- 03. finance.account  —  Hesablar planı
CREATE TABLE IF NOT EXISTS finance.account (
    account_code           text NOT NULL,
    account_name           text NOT NULL,
    parent_account_code    text,
    account_type           text NOT NULL,
    is_postable            boolean,
    currency               text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_finance_account PRIMARY KEY (account_code)
);

-- 04. product.item_category  —  Məhsul qrupları
CREATE TABLE IF NOT EXISTS product.item_category (
    category_code          text NOT NULL,
    category_name          text NOT NULL,
    parent_category_code   text,
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_item_category PRIMARY KEY (category_code)
);

-- 05. org.site  —  Obyektlər (müəssisə/sayt)
CREATE TABLE IF NOT EXISTS org.site (
    site_code              text NOT NULL,
    company_code           text NOT NULL,
    site_name              text NOT NULL,
    site_type              text NOT NULL,
    region                 text,
    address                text,
    phone                  text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_org_site PRIMARY KEY (site_code)
);

-- 06. finance.vat_code  —  ƏDV kodları
CREATE TABLE IF NOT EXISTS finance.vat_code (
    vat_code               text NOT NULL,
    vat_name               text NOT NULL,
    rate_percent           numeric(18,4) NOT NULL,
    account_code           text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_finance_vat_code PRIMARY KEY (vat_code)
);

-- 07. org.department  —  Şöbələr
CREATE TABLE IF NOT EXISTS org.department (
    dept_code              text NOT NULL,
    dept_name              text NOT NULL,
    site_code              text NOT NULL,
    parent_dept_code       text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_org_department PRIMARY KEY (dept_code)
);

-- 08. product.item  —  Əmtəə / material kartı
CREATE TABLE IF NOT EXISTS product.item (
    item_code              text NOT NULL,
    item_name              text NOT NULL,
    category_code          text NOT NULL,
    item_type              text NOT NULL,
    base_uom               text NOT NULL,
    is_lot_tracked         boolean,
    shelf_life_days        integer,
    hs_code                text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_item PRIMARY KEY (item_code)
);

-- 09. org.position  —  Vəzifələr / ştat
CREATE TABLE IF NOT EXISTS org.position (
    position_code          text NOT NULL,
    position_name          text NOT NULL,
    dept_code              text NOT NULL,
    grade                  text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_org_position PRIMARY KEY (position_code)
);

-- 10. org.cost_center  —  Xərc mərkəzləri
CREATE TABLE IF NOT EXISTS org.cost_center (
    cc_code                text NOT NULL,
    cc_name                text NOT NULL,
    site_code              text NOT NULL,
    dept_code              text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_org_cost_center PRIMARY KEY (cc_code)
);

-- 11. inventory.warehouse  —  Anbarlar
CREATE TABLE IF NOT EXISTS inventory.warehouse (
    warehouse_code         text NOT NULL,
    warehouse_name         text NOT NULL,
    site_code              text NOT NULL,
    wh_type                text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_inventory_warehouse PRIMARY KEY (warehouse_code)
);

-- 12. production.work_center  —  İş mərkəzləri
CREATE TABLE IF NOT EXISTS production.work_center (
    work_center_code       text NOT NULL,
    work_center_name       text NOT NULL,
    site_code              text NOT NULL,
    capacity_per_day       numeric(18,4),
    uom                    text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_production_work_center PRIMARY KEY (work_center_code)
);

-- 13. production.flock  —  Quş sürüləri
CREATE TABLE IF NOT EXISTS production.flock (
    flock_code             text NOT NULL,
    flock_name             text,
    site_code              text NOT NULL,
    breed                  text,
    placement_date         date,
    initial_count          integer,
    status                 text,
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_production_flock PRIMARY KEY (flock_code)
);

-- 14. hr.work_schedule  —  İş qrafikləri
CREATE TABLE IF NOT EXISTS hr.work_schedule (
    schedule_code          text NOT NULL,
    schedule_name          text NOT NULL,
    days_per_week          integer,
    hours_per_day          numeric(18,4),
    shift_type             text,
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_hr_work_schedule PRIMARY KEY (schedule_code)
);

-- 15. hr.salary_component  —  Əmək haqqı komponentləri
CREATE TABLE IF NOT EXISTS hr.salary_component (
    component_code         text NOT NULL,
    component_name         text NOT NULL,
    comp_type              text NOT NULL,
    calc_method            text,
    taxable                boolean,
    default_amount         numeric(18,4),
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_hr_salary_component PRIMARY KEY (component_code)
);

-- 16. hr.employee  —  İşçi kartı
CREATE TABLE IF NOT EXISTS hr.employee (
    employee_code          text NOT NULL,
    first_name             text NOT NULL,
    last_name              text NOT NULL,
    father_name            text,
    fin                    text,
    birth_date             date,
    gender                 text,
    phone                  text,
    email                  text,
    hire_date              date NOT NULL,
    company_code           text NOT NULL,
    site_code              text NOT NULL,
    dept_code              text NOT NULL,
    position_code          text NOT NULL,
    schedule_code          text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_hr_employee PRIMARY KEY (employee_code)
);

-- 17. hr.employment_contract  —  Əmək müqavilələri
CREATE TABLE IF NOT EXISTS hr.employment_contract (
    contract_no            text NOT NULL,
    employee_code          text NOT NULL,
    contract_type          text NOT NULL,
    start_date             date NOT NULL,
    end_date               date,
    base_salary            numeric(18,4) NOT NULL,
    currency               text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_hr_employment_contract PRIMARY KEY (contract_no)
);

-- 18. hr.employee_salary  —  İşçi üzrə maaş təyinatı
CREATE TABLE IF NOT EXISTS hr.employee_salary (
    employee_code          text NOT NULL,
    component_code         text NOT NULL,
    amount                 numeric(18,4) NOT NULL,
    valid_from             date,
    valid_to               date,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_hr_employee_salary PRIMARY KEY (employee_code, component_code)
);

-- 19. inventory.location  —  Anbar yerləşmələri
CREATE TABLE IF NOT EXISTS inventory.location (
    location_code          text NOT NULL,
    location_name          text,
    warehouse_code         text NOT NULL,
    zone                   text,
    bin                    text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_inventory_location PRIMARY KEY (location_code)
);

-- 20. product.bom  —  Resept / BOM başlığı
CREATE TABLE IF NOT EXISTS product.bom (
    bom_code               text NOT NULL,
    bom_name               text NOT NULL,
    output_item_code       text NOT NULL,
    output_qty             numeric(18,4),
    output_uom             text,
    work_center_code       text,
    version                text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_bom PRIMARY KEY (bom_code)
);

-- 21. product.bom_line  —  Resept tərkibi
CREATE TABLE IF NOT EXISTS product.bom_line (
    bom_code               text NOT NULL,
    line_no                integer NOT NULL,
    component_item_code    text NOT NULL,
    quantity               numeric(18,4) NOT NULL,
    uom                    text,
    scrap_percent          numeric(18,4),
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_bom_line PRIMARY KEY (bom_code, line_no)
);

-- 22. product.price_list  —  Qiymət siyahısı (başlıq)
CREATE TABLE IF NOT EXISTS product.price_list (
    price_list_code        text NOT NULL,
    price_list_name        text NOT NULL,
    currency               text,
    valid_from             date,
    valid_to               date,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_price_list PRIMARY KEY (price_list_code)
);

-- 23. product.price_list_line  —  Qiymət sətirləri
CREATE TABLE IF NOT EXISTS product.price_list_line (
    price_list_code        text NOT NULL,
    item_code              text NOT NULL,
    unit_price             numeric(18,4) NOT NULL,
    min_qty                numeric(18,4),
    uom                    text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_product_price_list_line PRIMARY KEY (price_list_code, item_code)
);

-- 24. partner.partner  —  Tərəfdaş kartı
CREATE TABLE IF NOT EXISTS partner.partner (
    partner_code           text NOT NULL,
    partner_name           text NOT NULL,
    partner_kind           text NOT NULL,
    voen                   text,
    country                text,
    is_resident            boolean,
    address                text,
    phone                  text,
    email                  text,
    payment_term_code      text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_partner_partner PRIMARY KEY (partner_code)
);

-- 25. partner.supplier  —  Təchizatçı əlavə məlumatı
CREATE TABLE IF NOT EXISTS partner.supplier (
    partner_code           text NOT NULL,
    supply_category        text,
    default_currency       text,
    lead_time_days         integer,
    is_import              boolean,
    rating                 integer,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_partner_supplier PRIMARY KEY (partner_code)
);

-- 26. partner.customer  —  Müştəri əlavə məlumatı
CREATE TABLE IF NOT EXISTS partner.customer (
    partner_code           text NOT NULL,
    customer_category      text,
    credit_limit           numeric(18,4),
    default_currency       text,
    price_list_code        text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_partner_customer PRIMARY KEY (partner_code)
);

-- 27. partner.bank_account  —  Tərəfdaş bank hesabları
CREATE TABLE IF NOT EXISTS partner.bank_account (
    account_code           text NOT NULL,
    partner_code           text NOT NULL,
    bank_name              text,
    iban                   text,
    currency               text,
    swift                  text,
    is_default             boolean,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_partner_bank_account PRIMARY KEY (account_code)
);

-- 28. production.routing  —  İstehsal marşrutu
CREATE TABLE IF NOT EXISTS production.routing (
    routing_code           text NOT NULL,
    routing_name           text,
    item_code              text NOT NULL,
    work_center_code       text NOT NULL,
    step_no                integer,
    operation              text,
    std_time_min           numeric(18,4),
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_production_routing PRIMARY KEY (routing_code)
);

-- 29. quality.test_plan  —  Keyfiyyət test planları
CREATE TABLE IF NOT EXISTS quality.test_plan (
    test_plan_code         text NOT NULL,
    test_plan_name         text NOT NULL,
    item_code              text,
    stage                  text,
    parameter              text,
    min_value              numeric(18,4),
    max_value              numeric(18,4),
    unit                   text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_quality_test_plan PRIMARY KEY (test_plan_code)
);

-- 30. quality.certificate  —  Sertifikatlar
CREATE TABLE IF NOT EXISTS quality.certificate (
    certificate_code       text NOT NULL,
    certificate_name       text NOT NULL,
    cert_type              text,
    issued_by              text,
    issue_date             date,
    expiry_date            date,
    site_code              text,
    item_code              text,
    document_ref           text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_quality_certificate PRIMARY KEY (certificate_code)
);

-- 31. sales.sales_target  —  Satış hədəfləri
CREATE TABLE IF NOT EXISTS sales.sales_target (
    target_code            text NOT NULL,
    period_year            integer NOT NULL,
    period_month           integer NOT NULL,
    site_code              text,
    item_code              text,
    customer_code          text,
    target_qty             numeric(18,4),
    target_amount          numeric(18,4),
    currency               text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_sales_sales_target PRIMARY KEY (target_code)
);

-- 32. finance.budget  —  Büdcə başlığı
CREATE TABLE IF NOT EXISTS finance.budget (
    budget_code            text NOT NULL,
    budget_name            text NOT NULL,
    fiscal_year            integer NOT NULL,
    currency               text,
    status                 text,
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_finance_budget PRIMARY KEY (budget_code)
);

-- 33. finance.budget_line  —  Büdcə sətirləri
CREATE TABLE IF NOT EXISTS finance.budget_line (
    budget_code            text NOT NULL,
    line_no                integer NOT NULL,
    account_code           text NOT NULL,
    cc_code                text,
    period_month           integer,
    amount                 numeric(18,4) NOT NULL,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_finance_budget_line PRIMARY KEY (budget_code, line_no)
);

-- 34. asset.asset_category  —  Aktiv qrupları
CREATE TABLE IF NOT EXISTS asset.asset_category (
    asset_category_code    text NOT NULL,
    category_name          text NOT NULL,
    depreciation_method    text,
    useful_life_years      integer,
    account_code           text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_asset_asset_category PRIMARY KEY (asset_category_code)
);

-- 35. asset.asset  —  Əsas vəsaitlər
CREATE TABLE IF NOT EXISTS asset.asset (
    asset_code             text NOT NULL,
    asset_name             text NOT NULL,
    asset_category_code    text NOT NULL,
    site_code              text NOT NULL,
    acquisition_date       date,
    acquisition_cost       numeric(18,4),
    currency               text,
    cc_code                text,
    status                 text,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_asset_asset PRIMARY KEY (asset_code)
);

-- 36. asset.equipment  —  Avadanlıq (texniki)
CREATE TABLE IF NOT EXISTS asset.equipment (
    equipment_code         text NOT NULL,
    equipment_name         text NOT NULL,
    asset_code             text,
    site_code              text NOT NULL,
    equipment_type         text,
    manufacturer           text,
    install_date           date,
    capacity               text,
    notes                  text,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_asset_equipment PRIMARY KEY (equipment_code)
);

-- 37. logistics.vehicle  —  Nəqliyyat vasitələri
CREATE TABLE IF NOT EXISTS logistics.vehicle (
    vehicle_code           text NOT NULL,
    plate_no               text NOT NULL,
    vehicle_type           text,
    site_code              text NOT NULL,
    capacity               text,
    has_cold_chain         boolean,
    is_active              boolean DEFAULT true,
    created_at             timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_logistics_vehicle PRIMARY KEY (vehicle_code)
);

