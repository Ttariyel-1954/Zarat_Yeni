#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Zarat ERP -- 01_INTAKE_doldurulmus -> zarat_erp_2 yukleyicisi.
Real sxem (struktur_faza1_schemas.sql) ile sutun-seviyyeli uygunlasdirma.
"""
import datetime, sys
import pandas as pd
import psycopg2

SRC = "/Users/royatalibova/Desktop/FAZA-1/intake/01_INTAKE_doldurulmus"
DSN = "dbname=zarat_erp_2 user=royatalibova host=localhost port=5432"

STAGE = sys.argv[1] if len(sys.argv) > 1 else "1"

def read(rel):
    df = pd.read_excel(f"{SRC}/{rel}", header=3)
    df = df.dropna(how="all")
    df.columns = [str(c).replace("*", "").replace("↗", "").strip() for c in df.columns]
    return df

def s(v):
    if v is None or (isinstance(v, float) and pd.isna(v)):
        return None
    if isinstance(v, str):
        v = v.strip()
        return v if v != "" else None
    return v

def dt(v):
    v = s(v)
    if v is None:
        return None
    if isinstance(v, (datetime.datetime, datetime.date)):
        return v
    try:
        return datetime.datetime.strptime(str(v), "%d.%m.%Y").date()
    except Exception:
        return None

def b(v):
    v = s(v)
    if v is None:
        return None
    t = str(v).strip().upper()
    if t in ("BELI", "TRUE", "1", "YES"):
        return True
    if t in ("XEYR", "FALSE", "0", "NO"):
        return False
    return None

def num(v):
    v = s(v)
    if v is None:
        return None
    try:
        return float(v)
    except Exception:
        return None

def geti(v):
    n = num(v)
    return int(n) if n is not None else None

conn = psycopg2.connect(DSN)
conn.autocommit = False
cur = conn.cursor()

def get_id(schema_table, code_col, code_val):
    if code_val is None:
        return None
    cur.execute(f"SELECT id FROM {schema_table} WHERE {code_col}=%s", (code_val,))
    r = cur.fetchone()
    return r[0] if r else None

def upsert(schema_table, code_col, code_val, cols, vals, log):
    """code_col must be in cols. Insert if not exists (match on code_col), else update other cols."""
    if code_val is None:
        log["skipped_no_code"] += 1
        return None
    existing = get_id(schema_table, code_col, code_val)
    if existing:
        setpairs = ", ".join(f"{c}=%s" for c in cols if c != code_col)
        setvals = [v for c, v in zip(cols, vals) if c != code_col]
        if setpairs:
            cur.execute(f"UPDATE {schema_table} SET {setpairs} WHERE id=%s", setvals + [existing])
        log["updated"] += 1
        return existing
    collist = ", ".join(cols)
    ph = ", ".join(["%s"] * len(cols))
    cur.execute(f"INSERT INTO {schema_table} ({collist}) VALUES ({ph}) RETURNING id", vals)
    newid = cur.fetchone()[0]
    log["inserted"] += 1
    return newid

def report(name, log):
    print(f"  {name}: inserted={log['inserted']} updated={log['updated']} skipped_no_code={log['skipped_no_code']} skipped_fk={log.get('skipped_fk',0)}")

# ============================================================
# STAGE 1 -- confirmed-real files (org.company/site/department/position, hr.employee(+contract salary))
# ============================================================
if STAGE in ("1", "all"):
    print("== STAGE 1: org.companies / org.branches / org.departments / org.positions / org.employees ==")

    # ---- org.companies <- org/01_org_company.xlsx ----
    df = read("org/01_org_company.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    company_id = {}
    for _, r in df.iterrows():
        code = s(r["company_code"])
        cols = ["company_code", "company_name", "legal_name", "tax_id", "country", "city",
                "address", "phone", "email", "founded_date", "is_active"]
        vals = [code, s(r.get("short_name")) or s(r.get("legal_name")), s(r.get("legal_name")),
                s(r.get("voen")), None, None, s(r.get("address")), s(r.get("phone")),
                s(r.get("email")), dt(r.get("reg_date")), b(r.get("is_active"))]
        newid = upsert("org.companies", "company_code", code, cols, vals, log)
        if newid:
            company_id[code] = newid
    report("org.companies", log)

    # ---- org.branches <- org/05_org_site.xlsx ----
    df = read("org/05_org_site.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    branch_id = {}
    for _, r in df.iterrows():
        code = s(r["site_code"])
        cid = company_id.get(s(r.get("company_code")))
        cols = ["branch_code", "branch_name", "company_id", "branch_type", "country", "city",
                "address", "phone", "is_active"]
        vals = [code, s(r.get("site_name")), cid, s(r.get("site_type")), None, s(r.get("region")),
                s(r.get("address")), s(r.get("phone")), b(r.get("is_active"))]
        newid = upsert("org.branches", "branch_code", code, cols, vals, log)
        if newid:
            branch_id[code] = newid
    report("org.branches", log)

    # ---- org.departments <- org/07_org_department.xlsx (2-pass for parent) ----
    df = read("org/07_org_department.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    dept_id = {}
    dept_parent_code = {}
    for _, r in df.iterrows():
        code = s(r["dept_code"])
        bid = branch_id.get(s(r.get("site_code")))
        cols = ["dept_code", "dept_name", "branch_id", "is_active"]
        vals = [code, s(r.get("dept_name")), bid, b(r.get("is_active"))]
        newid = upsert("org.departments", "dept_code", code, cols, vals, log)
        if newid:
            dept_id[code] = newid
            pc = s(r.get("parent_dept_code"))
            if pc:
                dept_parent_code[code] = pc
    for code, pc in dept_parent_code.items():
        pid = dept_id.get(pc)
        if pid:
            cur.execute("UPDATE org.departments SET parent_dept_id=%s WHERE id=%s", (pid, dept_id[code]))
    report("org.departments", log)
    print(f"  parent links resolved: {sum(1 for c,p in dept_parent_code.items() if dept_id.get(p))}/{len(dept_parent_code)}")

    # ---- org.positions <- org/09_org_position.xlsx ----
    df = read("org/09_org_position.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    position_id = {}
    for _, r in df.iterrows():
        code = s(r["position_code"])
        did = dept_id.get(s(r.get("dept_code")))
        cols = ["position_code", "position_name", "position_level", "department_id", "is_active"]
        vals = [code, s(r.get("position_name")), s(r.get("grade")), did, b(r.get("is_active"))]
        newid = upsert("org.positions", "position_code", code, cols, vals, log)
        if newid:
            position_id[code] = newid
    report("org.positions", log)

    # ---- salary from employment_contract (base_salary), keyed by employee_code ----
    dfc = read("hr/17_hr_employment_contract.xlsx")
    salary_by_emp = {}
    nonnull_salary = 0
    for _, r in dfc.iterrows():
        emp = s(r.get("employee_code"))
        sal = num(r.get("base_salary"))
        if sal is not None:
            nonnull_salary += 1
            salary_by_emp[emp] = sal
    print(f"  hr.employment_contract base_salary non-null rows: {nonnull_salary}/{len(dfc)}")

    # ---- org.employees <- hr/16_hr_employee.xlsx ----
    df = read("hr/16_hr_employee.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    fk_miss = dict(company=0, branch=0, dept=0, position=0)
    for _, r in df.iterrows():
        code = s(r["employee_code"])
        cid = company_id.get(s(r.get("company_code")))
        bid = branch_id.get(s(r.get("site_code")))
        did = dept_id.get(s(r.get("dept_code")))
        pid = position_id.get(s(r.get("position_code")))
        if s(r.get("company_code")) and not cid: fk_miss["company"] += 1
        if s(r.get("site_code")) and not bid: fk_miss["branch"] += 1
        if s(r.get("dept_code")) and not did: fk_miss["dept"] += 1
        if s(r.get("position_code")) and not pid: fk_miss["position"] += 1
        fname = s(r.get("first_name")); lname = s(r.get("last_name")); mname = s(r.get("father_name"))
        full = " ".join(x for x in [fname, lname] if x)
        gmap = {"KISI": "M", "QADIN": "F"}
        gender = gmap.get(str(s(r.get("gender"))).upper(), s(r.get("gender"))) if s(r.get("gender")) else None
        cols = ["employee_code", "first_name", "last_name", "middle_name", "full_name",
                "position_id", "department_id", "branch_id", "company_id", "email", "phone",
                "birth_date", "hire_date", "salary", "is_active"]
        vals = [code, fname, lname, mname, full, pid, did, bid, cid, s(r.get("email")), s(r.get("phone")),
                dt(r.get("birth_date")), dt(r.get("hire_date")), salary_by_emp.get(code), b(r.get("is_active"))]
        upsert("org.employees", "employee_code", code, cols, vals, log)
    report("org.employees", log)
    print(f"  FK misses: {fk_miss}")

    conn.commit()
    print("STAGE 1 COMMIT OK\n")

# ============================================================
# STAGE 2 -- unverified-but-approved files, remapped to real target tables
# ============================================================
if STAGE in ("2", "all"):
    print("== STAGE 2: finance / inventory(product) / production / partner / purchase / sales / quality / asset ==")

    def lookup(schema_table, code_col):
        cur.execute(f"SELECT {code_col}, id FROM {schema_table}")
        return {row[0]: row[1] for row in cur.fetchall()}

    company_id = lookup("org.companies", "company_code")
    branch_id = lookup("org.branches", "branch_code")
    dept_id = lookup("org.departments", "dept_code")

    # ---- finance.chart_of_accounts <- finance/03_finance_account.xlsx (2-pass parent) ----
    df = read("finance/03_finance_account.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    acct_id, acct_parent_code = {}, {}
    for _, r in df.iterrows():
        code = s(r["account_code"])
        cols = ["account_code", "account_name", "account_type", "is_active"]
        vals = [str(code), s(r.get("account_name")), s(r.get("account_type")), b(r.get("is_active"))]
        newid = upsert("finance.chart_of_accounts", "account_code", str(code), cols, vals, log)
        if newid:
            acct_id[code] = newid
            pc = s(r.get("parent_account_code"))
            if pc:
                acct_parent_code[code] = pc
    for code, pc in acct_parent_code.items():
        pid = acct_id.get(pc)
        if pid:
            cur.execute("UPDATE finance.chart_of_accounts SET parent_account_id=%s WHERE id=%s", (pid, acct_id[code]))
    report("finance.chart_of_accounts", log)

    # ---- inventory.categories <- product/04_product_item_category.xlsx (2-pass parent) ----
    df = read("product/04_product_item_category.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    cat_id, cat_parent_code = {}, {}
    for _, r in df.iterrows():
        code = s(r["category_code"])
        cols = ["category_code", "category_name", "category_description", "is_active"]
        vals = [code, s(r.get("category_name")), s(r.get("notes")), True]
        newid = upsert("inventory.categories", "category_code", code, cols, vals, log)
        if newid:
            cat_id[code] = newid
            pc = s(r.get("parent_category_code"))
            if pc:
                cat_parent_code[code] = pc
    for code, pc in cat_parent_code.items():
        pid = cat_id.get(pc)
        if pid:
            cur.execute("UPDATE inventory.categories SET parent_category_id=%s WHERE id=%s", (pid, cat_id[code]))
    report("inventory.categories (<- product.item_category)", log)

    # ---- inventory.products <- product/08_product_item.xlsx, enriched with price_list_line.unit_price ----
    dfp = read("product/23_product_price_list_line.xlsx")
    price_by_item = {}
    for _, r in dfp.iterrows():
        it = s(r.get("item_code"))
        up = num(r.get("unit_price"))
        if it and up is not None:
            price_by_item[it] = up

    df = read("product/08_product_item.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    item_id = {}
    for _, r in df.iterrows():
        code = s(r["item_code"])
        catid = cat_id.get(s(r.get("category_code")))
        cols = ["product_code", "product_name", "description", "product_type", "category_id",
                "selling_price_local", "is_active"]
        vals = [code, s(r.get("item_name")), None, s(r.get("item_type")), catid,
                price_by_item.get(code), b(r.get("is_active"))]
        newid = upsert("inventory.products", "product_code", code, cols, vals, log)
        if newid:
            item_id[code] = newid
    report("inventory.products (<- product.item, price enriched from product.price_list_line)", log)

    # ---- inventory.warehouses <- inventory/11_inventory_warehouse.xlsx ----
    df = read("inventory/11_inventory_warehouse.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    for _, r in df.iterrows():
        code = s(r["warehouse_code"])
        site_code = s(r.get("site_code"))
        cols = ["warehouse_code", "warehouse_name", "warehouse_type", "location", "is_active"]
        vals = [code, s(r.get("warehouse_name")), s(r.get("wh_type")), site_code, b(r.get("is_active"))]
        upsert("inventory.warehouses", "warehouse_code", code, cols, vals, log)
    report("inventory.warehouses", log)

    # ---- production.recipes <- product/20_product_bom.xlsx + product/21_product_bom_line.xlsx (merged) ----
    dfbom = read("product/20_product_bom.xlsx")
    bom_output = {s(r["bom_code"]): s(r.get("output_item_code")) for _, r in dfbom.iterrows()}
    dfline = read("product/21_product_bom_line.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0, skipped_fk=0)
    for _, r in dfline.iterrows():
        bcode = s(r.get("bom_code"))
        out_item = bom_output.get(bcode)
        comp_item = s(r.get("component_item_code"))
        pid = item_id.get(out_item)
        cid = item_id.get(comp_item)
        if not pid or not cid:
            log["skipped_fk"] += 1
            continue
        cur.execute("SELECT id FROM production.recipes WHERE product_id=%s AND component_id=%s", (pid, cid))
        existing = cur.fetchone()
        qty = num(r.get("quantity"))
        scrap = num(r.get("scrap_percent"))
        if existing:
            cur.execute("UPDATE production.recipes SET quantity_per_unit=%s, scrap_percent=%s WHERE id=%s",
                        (qty, scrap, existing[0]))
            log["updated"] += 1
        else:
            cur.execute("INSERT INTO production.recipes (product_id, component_id, quantity_per_unit, scrap_percent) "
                        "VALUES (%s,%s,%s,%s)", (pid, cid, qty, scrap))
            log["inserted"] += 1
    report("production.recipes (<- product.bom + product.bom_line merged)", log)

    # ---- partner.partner <- partner/24_partner_partner.xlsx ----
    df = read("partner/24_partner_partner.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    partner_id = {}
    for _, r in df.iterrows():
        code = s(r["partner_code"])
        cols = ["partner_code", "partner_name", "tax_id", "country", "address", "phone", "email",
                "payment_terms", "notes", "is_active"]
        vals = [code, s(r.get("partner_name")), s(r.get("voen")), s(r.get("country")), s(r.get("address")),
                s(r.get("phone")), s(r.get("email")), s(r.get("payment_term_code")),
                f"partner_kind={s(r.get('partner_kind'))}" if s(r.get("partner_kind")) else None,
                b(r.get("is_active"))]
        newid = upsert("partner.partner", "partner_code", code, cols, vals, log)
        if newid:
            partner_id[code] = newid
    report("partner.partner", log)

    # ---- partner.bank_account <- partner/27_partner_bank_account.xlsx ----
    df = read("partner/27_partner_bank_account.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0, skipped_fk=0)
    for _, r in df.iterrows():
        pcode = s(r.get("partner_code"))
        pid = partner_id.get(pcode)
        if not pid:
            log["skipped_fk"] += 1
            continue
        cur.execute("SELECT id FROM partner.bank_account WHERE partner_id=%s AND iban=%s", (pid, s(r.get("iban"))))
        existing = cur.fetchone()
        vals = (pid, s(r.get("bank_name")), s(r.get("iban")), s(r.get("swift")), s(r.get("currency")),
                b(r.get("is_default")), s(r.get("account_code")))
        if existing:
            cur.execute("UPDATE partner.bank_account SET partner_id=%s, bank_name=%s, iban=%s, swift_bic=%s, "
                        "currency=%s, is_default=%s, notes=%s WHERE id=%s", vals + (existing[0],))
            log["updated"] += 1
        else:
            cur.execute("INSERT INTO partner.bank_account (partner_id, bank_name, iban, swift_bic, currency, "
                        "is_default, notes) VALUES (%s,%s,%s,%s,%s,%s,%s)", vals)
            log["inserted"] += 1
    report("partner.bank_account", log)

    # ---- purchase.suppliers <- partner.partner + partner/25_partner_supplier.xlsx (merged) ----
    dfpartner_full = read("partner/24_partner_partner.xlsx")
    partner_row = {s(r["partner_code"]): r for _, r in dfpartner_full.iterrows()}
    df = read("partner/25_partner_supplier.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0, skipped_fk=0)
    for _, r in df.iterrows():
        pcode = s(r.get("partner_code"))
        pr = partner_row.get(pcode)
        if pr is None:
            log["skipped_fk"] += 1
            continue
        cols = ["supplier_code", "company_name", "tax_id", "country", "payment_terms", "currency",
                "rating", "is_active"]
        vals = [pcode, s(pr.get("partner_name")), s(pr.get("voen")), s(pr.get("country")),
                s(pr.get("payment_term_code")), s(r.get("default_currency")), geti(r.get("rating")),
                b(pr.get("is_active"))]
        upsert("purchase.suppliers", "supplier_code", pcode, cols, vals, log)
    report("purchase.suppliers (<- partner.partner + partner.supplier merged)", log)

    # ---- sales.customers <- partner.partner + partner/26_partner_customer.xlsx (merged) ----
    df = read("partner/26_partner_customer.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0, skipped_fk=0)
    for _, r in df.iterrows():
        pcode = s(r.get("partner_code"))
        pr = partner_row.get(pcode)
        if pr is None:
            log["skipped_fk"] += 1
            continue
        cols = ["customer_code", "company_name", "tax_id", "country", "address", "payment_terms",
                "credit_limit", "currency", "customer_segment", "is_active"]
        vals = [pcode, s(pr.get("partner_name")), s(pr.get("voen")), s(pr.get("country")), s(pr.get("address")),
                s(pr.get("payment_term_code")), num(r.get("credit_limit")), s(r.get("default_currency")),
                s(r.get("customer_category")), b(r.get("is_active"))]
        upsert("sales.customers", "customer_code", pcode, cols, vals, log)
    report("sales.customers (<- partner.partner + partner.customer merged)", log)

    # ---- quality.quality_certificate <- quality/30_quality_certificate.xlsx ----
    df = read("quality/30_quality_certificate.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    for _, r in df.iterrows():
        code = s(r["certificate_code"])
        pid = item_id.get(s(r.get("item_code")))
        cols = ["certificate_number", "certificate_name", "certificate_type", "product_id", "issued_by",
                "issue_date", "expiry_date", "document_url", "is_active"]
        vals = [code, s(r.get("certificate_name")), s(r.get("cert_type")), pid, s(r.get("issued_by")),
                dt(r.get("issue_date")), dt(r.get("expiry_date")), s(r.get("document_ref")), True]
        upsert("quality.quality_certificate", "certificate_number", code, cols, vals, log)
    report("quality.quality_certificate", log)

    # ---- quality.quality_control_plan <- quality/29_quality_test_plan.xlsx ----
    df = read("quality/29_quality_test_plan.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    for _, r in df.iterrows():
        code = s(r["test_plan_code"])
        pid = item_id.get(s(r.get("item_code")))
        parts = [f"{k}={s(r.get(k))}" for k in ("stage", "parameter", "min_value", "max_value", "unit") if s(r.get(k)) is not None]
        cols = ["plan_code", "plan_name", "product_id", "plan_description", "is_active"]
        vals = [code, s(r.get("test_plan_name")), pid, "; ".join(parts) or None, b(r.get("is_active"))]
        upsert("quality.quality_control_plan", "plan_code", code, cols, vals, log)
    report("quality.quality_control_plan (<- quality.test_plan)", log)

    # ---- asset.asset_category <- asset/34_asset_asset_category.xlsx ----
    df = read("asset/34_asset_asset_category.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    acat_id = {}
    for _, r in df.iterrows():
        code = s(r["asset_category_code"])
        cols = ["category_code", "category_name", "useful_life_years", "is_active"]
        vals = [code, s(r.get("category_name")), geti(r.get("useful_life_years")), True]
        newid = upsert("asset.asset_category", "category_code", code, cols, vals, log)
        if newid:
            acat_id[code] = newid
    report("asset.asset_category", log)

    # ---- asset.asset <- asset/35_asset_asset.xlsx ----
    df = read("asset/35_asset_asset.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0)
    for _, r in df.iterrows():
        code = s(r["asset_code"])
        catid = acat_id.get(s(r.get("asset_category_code")))
        bid = branch_id.get(s(r.get("site_code")))
        cols = ["asset_code", "asset_name", "category_id", "branch_id", "purchase_date", "purchase_price",
                "status", "is_active"]
        vals = [code, s(r.get("asset_name")), catid, bid, dt(r.get("acquisition_date")), num(r.get("acquisition_cost")),
                s(r.get("status")), b(r.get("is_active"))]
        upsert("asset.asset", "asset_code", code, cols, vals, log)
    report("asset.asset", log)

    # ---- finance.budgets <- finance/32_finance_budget.xlsx + finance/33_finance_budget_line.xlsx (merged) ----
    dfcc = read("org/10_org_cost_center.xlsx")
    cc_dept_code = {s(r["cc_code"]): s(r.get("dept_code")) for _, r in dfcc.iterrows()}
    dfbudget = read("finance/32_finance_budget.xlsx")
    budget_meta = {s(r["budget_code"]): r for _, r in dfbudget.iterrows()}
    dfbl = read("finance/33_finance_budget_line.xlsx")
    log = dict(inserted=0, updated=0, skipped_no_code=0, skipped_fk=0)
    for _, r in dfbl.iterrows():
        bcode = s(r.get("budget_code"))
        bm = budget_meta.get(bcode)
        acode = s(r.get("account_code"))
        aid = acct_id.get(str(acode)) if acode is not None else None
        cc = s(r.get("cc_code"))
        did = dept_id.get(cc_dept_code.get(cc)) if cc else None
        if bm is None:
            log["skipped_fk"] += 1
            continue
        cols = ["budget_code", "budget_name", "account_id", "department_id", "fiscal_year", "period",
                "planned_amount", "status", "notes"]
        vals = [bcode, s(bm.get("budget_name")), aid, did, geti(bm.get("fiscal_year")), geti(r.get("period_month")),
                num(r.get("amount")), s(bm.get("status")), s(bm.get("notes"))]
        # budgets has no unique code constraint -> match on budget_code+period manually
        cur.execute("SELECT id FROM finance.budgets WHERE budget_code=%s AND period=%s", (bcode, geti(r.get("period_month"))))
        existing = cur.fetchone()
        if existing:
            setpairs = ", ".join(f"{c}=%s" for c in cols)
            cur.execute(f"UPDATE finance.budgets SET {setpairs} WHERE id=%s", vals + [existing[0]])
            log["updated"] += 1
        else:
            collist = ", ".join(cols)
            ph = ", ".join(["%s"] * len(cols))
            cur.execute(f"INSERT INTO finance.budgets ({collist}) VALUES ({ph})", vals)
            log["inserted"] += 1
    report("finance.budgets (<- finance.budget + finance.budget_line merged; department via cost_center->dept lookup)", log)

    conn.commit()
    print("STAGE 2 COMMIT OK\n")

cur.close()
conn.close()
print("DONE stage", STAGE)
