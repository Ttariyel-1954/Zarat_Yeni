#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Zarat ERP — FAZA 1 yükləyicisi.
DeepSeek Excel (Mənbə B) -> kanonik `zarat_erp` (Mənbə A struktur).
- Sürroqat integer id -> biznes kod (resolver dict).
- Bir tranzaksiya, SET CONSTRAINTS ALL DEFERRED, upsert (ON CONFLICT DO UPDATE).
- --dry-run: heç nə yazılmır, yalnız hesabat.
İstifadə:
  python3 load_faza1.py --src ~/Desktop/postgres_dersleri \
     --dsn "host=localhost port=5433 dbname=zarat_erp user=muessise_admin" [--dry-run]
"""
import argparse, os, sys, datetime
import openpyxl
import psycopg2

# ---------- köməkçi funksiyalar ----------
def read_xlsx(path):
    """Tək vərəqli xlsx -> (başlıqlar, [dict,...])."""
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    wb.close()
    if not rows:
        return [], []
    hdr = [str(h).strip() if h is not None else h for h in rows[0]]
    out = []
    for r in rows[1:]:
        if r is None or all(c is None for c in r):
            continue
        d = dict(zip(hdr, r))
        # NÜMUNƏ/boş kod sətirlərini at
        out.append(d)
    return hdr, out

def s(v):
    if v is None: return None
    if isinstance(v, str):
        v = v.strip()
        return v if v != "" else None
    return v

def d(v):
    """datetime/date -> date."""
    if v is None: return None
    if isinstance(v, datetime.datetime): return v.date()
    if isinstance(v, datetime.date): return v
    return v

def b(v):
    if v is None: return None
    if isinstance(v, bool): return v
    t = str(v).strip().lower()
    if t in ("true","bəli","beli","1","yes","hə","he"): return True
    if t in ("false","xeyr","0","no","yox"): return False
    return None

def num(v):
    if v is None: return None
    try: return float(v)
    except: return None

def i(v):
    if v is None: return None
    try: return int(v)
    except: return None

# ---------- əsas ----------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--dsn", required=True)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    SRC = os.path.expanduser(args.src)
    DRY = args.dry_run
    log = []
    def L(m):
        log.append(m); print(m)

    def F(rel):
        return os.path.join(SRC, rel)

    # ---- mənbələri oxu ----
    _, companies   = read_xlsx(F("ORG/company.xlsx"))
    _, branches    = read_xlsx(F("ORG/branch.xlsx"))
    _, departments = read_xlsx(F("ORG/department.xlsx"))
    _, positions   = read_xlsx(F("ORG/position.xlsx"))
    _, employees   = read_xlsx(F("ORG/employee.xlsx"))
    _, emp_details = read_xlsx(F("HR/employee_detail.xlsx"))
    _, categories  = read_xlsx(F("Product/product_category.xlsx"))
    _, subcats     = read_xlsx(F("Product/product_subcategory.xlsx"))
    _, products    = read_xlsx(F("Product/product.xlsx"))
    _, units       = read_xlsx(F("Product/product_unit.xlsx"))
    _, prices      = read_xlsx(F("Product/product_price.xlsx"))
    _, recipes     = read_xlsx(F("Production/feed_recipe.xlsx"))
    _, recipe_items= read_xlsx(F("Production/feed_recipe_item.xlsx"))
    _, batches     = read_xlsx(F("Production/poultry_batch.xlsx"))
    _, partners    = read_xlsx(F("Partner/partner.xlsx"))
    _, ptypes      = read_xlsx(F("Partner/partner_type.xlsx"))
    _, pbanks      = read_xlsx(F("Partner/bank_account.xlsx"))
    _, warehouses  = read_xlsx(F("Inventory/warehouse.xlsx"))
    _, zones       = read_xlsx(F("Inventory/warehouse_zone.xlsx"))
    _, accounts    = read_xlsx(F("Finance/chart_of_accounts.xlsx"))
    _, taxes       = read_xlsx(F("Finance/tax.xlsx"))
    _, budgets     = read_xlsx(F("Finance/budget.xlsx"))
    _, budget_items= read_xlsx(F("Finance/budget_item.xlsx"))
    _, acats       = read_xlsx(F("Asset/asset_category.xlsx"))
    _, assets      = read_xlsx(F("Asset/asset.xlsx"))
    _, vehicles    = read_xlsx(F("Logistics/vehicle.xlsx"))
    _, qplans      = read_xlsx(F("Quality/quality_control_plan.xlsx"))
    _, qcerts      = read_xlsx(F("Quality/quality_certificate.xlsx"))
    _, roles       = read_xlsx(F("Sistem/user_role.xlsx"))
    _, perms       = read_xlsx(F("Sistem/permission.xlsx"))
    _, roleperms   = read_xlsx(F("Sistem/role_permission.xlsx"))
    _, susers      = read_xlsx(F("Sistem/user.xlsx"))
    _, sconfig     = read_xlsx(F("Sistem/system_config.xlsx"))
    _, saudit      = read_xlsx(F("Sistem/audit_log.xlsx"))

    # ---- resolver-lər (id -> kod) ----
    R_company = {r["id"]: "CMP-%03d" % r["id"] for r in companies}
    R_site    = {r["id"]: s(r["code"]) for r in branches}           # branch -> site
    R_dept    = {r["id"]: s(r["code"]) for r in departments}
    R_pos     = {r["id"]: s(r["code"]) for r in positions}
    R_cat     = {r["id"]: s(r["code"]) for r in categories}         # product_category
    R_subcat  = {r["id"]: s(r["code"]) for r in subcats}
    R_item    = {r["id"]: s(r["code"]) for r in products}
    R_unit    = {r["id"]: s(r["code"]) for r in units}
    R_acct    = {r["id"]: s(r["account_code"]) for r in accounts}
    R_wh      = {r["id"]: s(r["code"]) for r in warehouses}
    R_partner = {r["id"]: s(r["code"]) for r in partners}
    R_ptype   = {r["id"]: r for r in ptypes}                        # id -> tam sətir
    R_budget  = {r["id"]: s(r["budget_number"]) for r in budgets}
    R_acat    = {r["id"]: s(r["code"]) for r in acats}
    R_recipe  = {r["id"]: s(r["code"]) for r in recipes}
    R_emp     = {r["id"]: s(r["personal_number"]) for r in employees}
    R_role    = {r["id"]: s(r["role_code"]) for r in roles}
    R_perm    = {r["id"]: s(r["permission_code"]) for r in perms}

    # company -> əsas sayt (ən kiçik branch id)
    main_site = {}
    for r in sorted(branches, key=lambda x: x["id"]):
        cid = r["company_id"]
        if cid not in main_site:
            main_site[cid] = s(r["code"])
    default_site = R_site[min(R_site)] if R_site else None

    # employee_detail: employee_id -> fin_code
    emp_fin = {r["employee_id"]: s(r.get("fin_code")) for r in emp_details}

    # position -> dept (işçilərdən; ilk tapılan)
    pos_dept = {}
    for e in employees:
        pid, did = e.get("position_id"), e.get("department_id")
        if pid in R_pos and did in R_dept and pid not in pos_dept:
            pos_dept[pid] = R_dept[did]
    default_dept = R_dept[min(R_dept)] if R_dept else None

    # payment_term: distinct günlərdən kod
    def term_code(days):
        days = i(days)
        if days is None: return None
        return "CASH" if days == 0 else "NET%d" % days
    pt_days = sorted({i(p.get("payment_term_days")) for p in partners if i(p.get("payment_term_days")) is not None})

    # recipe -> output item (ad tokenlərinə görə uyğunlaşma; yem məhsulları arasında)
    import re
    STOP = {"yemi","yem","resepti","resept","premium","the","və","ve"}
    def tokens(name):
        return {w for w in re.split(r"[^0-9A-Za-zĞğİıÖöÜüÇçŞşƏə]+", (name or "").lower()) if w and w not in STOP}
    feed_products = [p for p in products if p.get("category_id") == 1]  # kateqoriya 1 = Yem
    recipe_output = {}
    for rc in recipes:
        rt = tokens(rc.get("name"))
        best, best_score = None, 0
        for p in feed_products:
            sc = len(rt & tokens(p.get("name")))
            if sc > best_score:
                best, best_score = p, sc
        if best is None and feed_products:
            best = feed_products[0]  # fallback
        recipe_output[rc["id"]] = (R_item.get(best["id"]) if best else None, best_score)

    # ---------- transformasiyalar ----------
    # hər element: (schema.table, [columns], [pk_cols], [row_tuples])
    tasks = []
    def T(tbl, cols, pk, rows):
        tasks.append((tbl, cols, pk, rows))

    # payment_term (seed, derive)
    ptrows = [("CASH","Nağd / dərhal",0,"cash",None)]
    for dd in pt_days:
        if dd == 0: continue
        ptrows.append(("NET%d"%dd, "%d gün möhlət"%dd, dd, "credit", None))
    T("partner.payment_term", ["term_code","term_name","days","type","notes"],
      ["term_code"], ptrows)

    # uom (product_unit -> upsert; standartlar DDL seed-dədir)
    T("product.uom", ["uom_code","uom_name","short_name"], ["uom_code"],
      [(s(u["code"]), s(u["name"]), s(u.get("short_name"))) for u in units])

    # org.company
    T("org.company",
      ["company_code","legal_name","short_name","voen","legal_form","reg_date","address","phone","email","is_active"],
      ["company_code"],
      [(R_company[c["id"]], s(c["name"]), None, s(c.get("tax_id")), None, d(c.get("founded_date")),
        s(c.get("address")), s(c.get("phone")), s(c.get("email")), b(c.get("is_active"))) for c in companies])

    # finance.account
    T("finance.account",
      ["account_code","account_name","parent_account_code","account_type","is_postable","currency","is_active"],
      ["account_code"],
      [(s(a["account_code"]), s(a["account_name"]), R_acct.get(a.get("parent_account_id")),
        s(a.get("account_type")) or "GENERAL", None, None, b(a.get("is_active"))) for a in accounts])

    # product.item_category (kateqoriya + alt-kateqoriya[parent])
    cat_rows = [(s(c["code"]), s(c["name"]), None, s(c.get("description"))) for c in categories]
    cat_rows += [(s(sc["code"]), s(sc["name"]), R_cat.get(sc.get("category_id")), s(sc.get("description"))) for sc in subcats]
    T("product.item_category", ["category_code","category_name","parent_category_code","notes"],
      ["category_code"], cat_rows)

    # org.site (branch)
    T("org.site",
      ["site_code","company_code","site_name","site_type","region","address","phone","is_active"],
      ["site_code"],
      [(s(x["code"]), R_company.get(x["company_id"]), s(x["name"]), "branch", None,
        s(x.get("address")), s(x.get("phone")), b(x.get("is_active"))) for x in branches])

    # finance.vat_code (tax)
    T("finance.vat_code", ["vat_code","vat_name","rate_percent","account_code","is_active"],
      ["vat_code"],
      [(s(t["tax_code"]), s(t["tax_name"]), num(t.get("tax_rate")) or 0, None, b(t.get("is_active"))) for t in taxes])

    # org.department (site = company əsas saytı)
    T("org.department", ["dept_code","dept_name","site_code","parent_dept_code","is_active"],
      ["dept_code"],
      [(s(x["code"]), s(x["name"]), main_site.get(x["company_id"]) or default_site,
        R_dept.get(x.get("parent_id")), b(x.get("is_active"))) for x in departments])

    # product.item
    def uom_of(p):
        return R_unit.get(p.get("unit_id")) or "EA"
    T("product.item",
      ["item_code","item_name","category_code","item_type","base_uom","is_lot_tracked","shelf_life_days","hs_code","is_active"],
      ["item_code"],
      [(s(p["code"]), s(p["name"]), R_cat.get(p.get("category_id")), "GENERAL",
        uom_of(p), None, None, None, b(p.get("is_active"))) for p in products])

    # org.position (dept işçilərdən derive)
    T("org.position", ["position_code","position_name","dept_code","grade","is_active"],
      ["position_code"],
      [(s(x["code"]), s(x["name"]), pos_dept.get(x["id"]) or default_dept,
        s(x.get("category")), b(x.get("is_active"))) for x in positions])

    # inventory.warehouse
    T("inventory.warehouse", ["warehouse_code","warehouse_name","site_code","wh_type","is_active"],
      ["warehouse_code"],
      [(s(x["code"]), s(x["name"]), R_site.get(x.get("branch_id")) or default_site,
        s(x.get("warehouse_type")), b(x.get("is_active"))) for x in warehouses])

    # production.flock (poultry_batch)
    T("production.flock",
      ["flock_code","flock_name","site_code","breed","placement_date","initial_count","status","notes"],
      ["flock_code"],
      [(s(x["batch_number"]), s(x.get("poultry_type")) or s(x.get("breed")),
        main_site.get(x["company_id"]) or default_site, s(x.get("breed")), d(x.get("arrival_date")),
        i(x.get("initial_count")), s(x.get("status")), s(x.get("notes"))) for x in batches])

    # hr.employee
    def gender(g):
        g = s(g)
        if g is None: return None
        return {"male":"M","female":"F","kişi":"M","qadın":"F"}.get(g.lower(), g)
    T("hr.employee",
      ["employee_code","first_name","last_name","father_name","fin","birth_date","gender","phone","email",
       "hire_date","company_code","site_code","dept_code","position_code","schedule_code","is_active"],
      ["employee_code"],
      [(s(e["personal_number"]), s(e["first_name"]), s(e["last_name"]), s(e.get("father_name")),
        emp_fin.get(e["id"]), d(e.get("birth_date")), gender(e.get("gender")), s(e.get("phone")), s(e.get("email")),
        d(e.get("hire_date")), R_company.get(e.get("company_id")), R_site.get(e.get("branch_id")) or default_site,
        R_dept.get(e.get("department_id")) or default_dept, R_pos.get(e.get("position_id")), None,
        b(e.get("is_active"))) for e in employees])

    # inventory.location (warehouse_zone)
    T("inventory.location", ["location_code","location_name","warehouse_code","zone","bin","is_active"],
      ["location_code"],
      [(s(x["code"]), s(x["name"]), R_wh.get(x.get("warehouse_id")), s(x.get("name")), None, b(x.get("is_active")))
       for x in zones])

    # product.price_list (seed) + price_list_line
    T("product.price_list", ["price_list_code","price_list_name","currency","valid_from","valid_to","is_active"],
      ["price_list_code"],
      [("PL-SALE","Satış qiymət siyahısı","AZN",None,None,True),
       ("PL-PURCHASE","Alış qiymət siyahısı","AZN",None,None,True)])

    # product.bom (feed_recipe; output derive)
    T("product.bom",
      ["bom_code","bom_name","output_item_code","output_qty","output_uom","work_center_code","version","is_active"],
      ["bom_code"],
      [(s(rc["code"]), s(rc["name"]), recipe_output.get(rc["id"],(None,0))[0], num(rc.get("total_weight")),
        "KG", None, None, b(rc.get("is_active"))) for rc in recipes])

    # product.bom_line (feed_recipe_item; line_no sıra ilə)
    bl_rows, seen = [], {}
    for it in sorted(recipe_items, key=lambda x: x["id"]):
        bc = R_recipe.get(it.get("recipe_id"))
        if not bc: continue
        seen[bc] = seen.get(bc, 0) + 1
        bl_rows.append((bc, seen[bc], R_item.get(it.get("product_id")), num(it.get("quantity")) or 0,
                        "KG", None, s(it.get("notes"))))
    T("product.bom_line", ["bom_code","line_no","component_item_code","quantity","uom","scrap_percent","notes"],
      ["bom_code","line_no"], bl_rows)

    # product.price_list_line (sale + purchase)
    pll = []
    for pr in prices:
        item = R_item.get(pr.get("product_id"))
        if not item: continue
        if num(pr.get("sale_price")) is not None:
            pll.append(("PL-SALE", item, num(pr.get("sale_price")), None, None))
        if num(pr.get("purchase_price")) is not None:
            pll.append(("PL-PURCHASE", item, num(pr.get("purchase_price")), None, None))
    # eyni (list,item) təkrarını sonuncu ilə əvəzlə
    dedup = {}
    for row in pll: dedup[(row[0], row[1])] = row
    T("product.price_list_line", ["price_list_code","item_code","unit_price","min_qty","uom"],
      ["price_list_code","item_code"], list(dedup.values()))

    # partner.partner
    def kind_of(p):
        pt = R_ptype.get(p.get("partner_type_id"))
        return s(pt["code"]) if pt else "OTHER"
    T("partner.partner",
      ["partner_code","partner_name","partner_kind","voen","country","is_resident","address","phone","email","payment_term_code","is_active"],
      ["partner_code"],
      [(s(p["code"]), s(p["name"]), kind_of(p), s(p.get("tax_id")), "AZ", True, None, s(p.get("phone")),
        s(p.get("email")), term_code(p.get("payment_term_days")), b(p.get("is_active"))) for p in partners])

    # partner.supplier (tip SUPP) / partner.customer (tip CUST, DIST)
    CUST_TYPES = {"CUST","DIST"}; SUPP_TYPES = {"SUPP"}
    sup_rows, cust_rows = [], []
    for p in partners:
        pt = R_ptype.get(p.get("partner_type_id"))
        code = s(pt["code"]) if pt else None
        if code in SUPP_TYPES:
            sup_rows.append((s(p["code"]), None, "AZN", None, False, None))
        if code in CUST_TYPES:
            cust_rows.append((s(p["code"]), code, num(p.get("credit_limit")), "AZN", "PL-SALE", True))
    T("partner.supplier", ["partner_code","supply_category","default_currency","lead_time_days","is_import","rating"],
      ["partner_code"], sup_rows)
    T("partner.customer", ["partner_code","customer_category","credit_limit","default_currency","price_list_code","is_active"],
      ["partner_code"], cust_rows)

    # partner.bank_account (code yox -> PBA-{id})
    T("partner.bank_account", ["account_code","partner_code","bank_name","iban","currency","swift","is_default"],
      ["account_code"],
      [("PBA-%03d"%x["id"], R_partner.get(x.get("partner_id")), s(x.get("bank_name")), s(x.get("iban")),
        s(x.get("currency")), s(x.get("bank_code")), b(x.get("is_primary"))) for x in pbanks])

    # quality.test_plan (quality_control_plan)
    T("quality.test_plan",
      ["test_plan_code","test_plan_name","item_code","stage","parameter","min_value","max_value","unit","is_active"],
      ["test_plan_code"],
      [(s(x["plan_number"]), (s(x.get("plan_number")) + " nəzarət planı"), R_item.get(x.get("product_id")),
        s(x.get("control_frequency")), s(x.get("acceptance_criteria")), None, None, None,
        (s(x.get("status"))=="Active")) for x in qplans])

    # quality.certificate
    T("quality.certificate",
      ["certificate_code","certificate_name","cert_type","issued_by","issue_date","expiry_date","site_code","item_code","document_ref"],
      ["certificate_code"],
      [(s(x["certificate_number"]), s(x.get("description")) or s(x["certificate_number"]), s(x.get("certificate_type")),
        s(x.get("issuing_body")), d(x.get("issue_date")), d(x.get("expiry_date")), None,
        R_item.get(x.get("product_id")), None) for x in qcerts])

    # finance.budget
    T("finance.budget", ["budget_code","budget_name","fiscal_year","currency","status","notes"],
      ["budget_code"],
      [(s(x["budget_number"]), s(x["budget_name"]), i(x.get("budget_year")), "AZN", s(x.get("status")), None)
       for x in budgets])

    # finance.budget_line
    bg_rows, bseen = [], {}
    for it in sorted(budget_items, key=lambda x: x["id"]):
        bc = R_budget.get(it.get("budget_id"))
        if not bc: continue
        bseen[bc] = bseen.get(bc, 0) + 1
        bg_rows.append((bc, bseen[bc], R_acct.get(it.get("account_id")), None, None, num(it.get("planned_amount")) or 0))
    T("finance.budget_line", ["budget_code","line_no","account_code","cc_code","period_month","amount"],
      ["budget_code","line_no"], bg_rows)

    # asset.asset_category
    T("asset.asset_category", ["asset_category_code","category_name","depreciation_method","useful_life_years","account_code"],
      ["asset_category_code"],
      [(s(x["code"]), s(x["name"]), None, None, None) for x in acats])

    # asset.asset
    T("asset.asset",
      ["asset_code","asset_name","asset_category_code","site_code","acquisition_date","acquisition_cost","currency","cc_code","status","is_active"],
      ["asset_code"],
      [(s(x["asset_code"]), s(x["asset_name"]), R_acat.get(x.get("category_id")),
        R_site.get(x.get("branch_id")) or default_site, d(x.get("purchase_date")), num(x.get("purchase_price")),
        "AZN", None, s(x.get("status")), b(x.get("is_active"))) for x in assets])

    # logistics.vehicle
    T("logistics.vehicle", ["vehicle_code","plate_no","vehicle_type","site_code","capacity","has_cold_chain","is_active"],
      ["vehicle_code"],
      [(s(x["vehicle_code"]), s(x["plate_number"]), s(x.get("brand")),
        main_site.get(x["company_id"]) or default_site,
        (str(i(x.get("capacity_kg")))+" kg" if x.get("capacity_kg") is not None else None),
        None, b(x.get("is_active"))) for x in vehicles])

    # ---- sys ----
    T("sys.role", ["role_code","role_name","description","priority","is_active"], ["role_code"],
      [(s(x["role_code"]), s(x["role_name"]), s(x.get("description")), i(x.get("priority")), b(x.get("is_active")))
       for x in roles])
    T("sys.permission", ["permission_code","permission_name","module_name","description"], ["permission_code"],
      [(s(x["permission_code"]), s(x["permission_name"]), s(x.get("module_name")), s(x.get("description")))
       for x in perms])
    T("sys.role_permission", ["role_code","permission_code"], ["role_code","permission_code"],
      [(R_role.get(x.get("role_id")), R_perm.get(x.get("permission_id"))) for x in roleperms
       if R_role.get(x.get("role_id")) and R_perm.get(x.get("permission_id"))])
    T("sys.app_user", ["username","employee_code","email","first_name","last_name","password_hash","is_active","is_locked"],
      ["username"],
      [(s(x["username"]), R_emp.get(x.get("employee_id")), s(x.get("email")), s(x.get("first_name")),
        s(x.get("last_name")), s(x.get("password_hash")), b(x.get("is_active")), b(x.get("is_locked")))
       for x in susers])
    T("sys.setting", ["config_key","config_value","config_type","description","is_active"], ["config_key"],
      [(s(x["config_key"]), s(x.get("config_value")), s(x.get("config_type")), s(x.get("description")), b(x.get("is_active")))
       for x in sconfig])
    T("sys.audit_log", ["log_id","user_ref","action","table_name","record_id","old_value","new_value","ip_address","created_at"],
      ["log_id"],
      [(i(x["id"]), str(x.get("user_id")), s(x.get("action")), s(x.get("table_name")), str(x.get("record_id")),
        s(x.get("old_value")), s(x.get("new_value")), s(x.get("ip_address")), x.get("created_at")) for x in saudit])

    # ---- açıq sual / diaqnostika ----
    L("== BOM output uyğunlaşması (recipe -> item, skor) ==")
    for rc in recipes:
        oc, sc = recipe_output.get(rc["id"], (None,0))
        L("   %s '%s' -> %s (skor %d)" % (s(rc["code"]), s(rc.get("name")), oc, sc))

    # ---- yerinə yetir ----
    total = 0
    if DRY:
        L("\n== DRY-RUN: yükləmə sırası və sətir sayları ==")
        for tbl, cols, pk, rows in tasks:
            L("   %-28s %4d sətir" % (tbl, len(rows)))
            total += len(rows)
        L("CƏMİ: %d sətir (yazılmadı)" % total)
        # sadə validasiya: NOT NULL / açar boşluğu
        return

    conn = psycopg2.connect(args.dsn)
    conn.set_client_encoding("UTF8")
    try:
        cur = conn.cursor()
        cur.execute("SET CONSTRAINTS ALL DEFERRED;")
        for tbl, cols, pk, rows in tasks:
            if not rows:
                L("   %-28s 0 sətir (boş)" % tbl); continue
            collist = ",".join(cols)
            ph = ",".join(["%s"]*len(cols))
            updates = ",".join(["%s=EXCLUDED.%s"%(c,c) for c in cols if c not in pk])
            conflict = ",".join(pk)
            if updates:
                sql = "INSERT INTO %s (%s) VALUES (%s) ON CONFLICT (%s) DO UPDATE SET %s" % (tbl, collist, ph, conflict, updates)
            else:
                sql = "INSERT INTO %s (%s) VALUES (%s) ON CONFLICT (%s) DO NOTHING" % (tbl, collist, ph, conflict)
            cur.executemany(sql, rows)
            L("   %-28s %4d sətir yükləndi" % (tbl, len(rows)))
            total += len(rows)
        conn.commit()
        L("\nCOMMIT OK. CƏMİ: %d sətir." % total)
    except Exception as ex:
        conn.rollback()
        L("XƏTA -> ROLLBACK: %s" % ex)
        sys.exit(1)
    finally:
        conn.close()

if __name__ == "__main__":
    main()
