-- Zarat ERP — FAZA 1: Azərbaycanca izahlar (COMMENT). Baza öz-özünü sənədləşdirir.
-- Görmək üçün: psql-də \dn+ (sxemlər), \dt+ sxem.* (cədvəllər), \d+ cədvəl (sütunlar).
\set ON_ERROR_STOP on

-- ===== SXEMLƏR =====
COMMENT ON SCHEMA org        IS 'Təşkilati struktur: hüquqi şəxslər, obyektlər, şöbələr, vəzifələr, xərc mərkəzləri';
COMMENT ON SCHEMA hr         IS 'Kadrlar: işçilər, müqavilələr, maaş komponentləri, iş qrafikləri, məzuniyyət növləri';
COMMENT ON SCHEMA partner    IS 'Tərəfdaşlar: müştəri/təchizatçı kartları, bank hesabları, ödəniş şərtləri';
COMMENT ON SCHEMA product    IS 'Nomenklatura: məhsul/material kartları, kateqoriyalar, reseptlər (BOM), qiymət siyahıları, ölçü vahidləri';
COMMENT ON SCHEMA inventory  IS 'Anbar təsərrüfatı: anbarlar və anbar yerləşmələri (Faza 2-də hərəkətlər)';
COMMENT ON SCHEMA production  IS 'İstehsal master-i: iş mərkəzləri, marşrutlar, quş sürüləri (Faza 3-də əməliyyatlar)';
COMMENT ON SCHEMA quality    IS 'Keyfiyyət master-i: test planları və sertifikatlar (Faza 3-də yoxlama nəticələri)';
COMMENT ON SCHEMA sales      IS 'Satış master-i: satış hədəfləri (Faza 2-də sifariş/faktura)';
COMMENT ON SCHEMA finance    IS 'Maliyyə: hesablar planı, ƏDV kodları, büdcə (Faza 2-də jurnal/kitab)';
COMMENT ON SCHEMA asset      IS 'Əsas vəsaitlər: aktiv kateqoriyaları, aktivlər, avadanlıq (Faza 3-də təmir/EAM)';
COMMENT ON SCHEMA logistics  IS 'Logistika master-i: nəqliyyat vasitələri (Faza 2/3-də daşımalar)';
COMMENT ON SCHEMA sys        IS 'Sistem/təhlükəsizlik: istifadəçilər, rollar, icazələr, parametrlər, audit';
COMMENT ON SCHEMA trade      IS 'İdxal-ixrac istinadı: valyuta, incoterm (Faza 2-də idxal/ixrac əməliyyatları)';
COMMENT ON SCHEMA procure    IS 'Satınalma (Faza 2) — hazırda boş sxem';

-- ===== MASTER CƏDVƏLLƏR =====
COMMENT ON TABLE org.company            IS '01. Hüquqi şəxslər (holdinqə daxil şirkətlər). Açar: company_code';
COMMENT ON TABLE partner.payment_term   IS '02. Ödəniş şərtləri (NET30, nağd və s.). Açar: term_code';
COMMENT ON TABLE finance.account        IS '03. Hesablar planı (ağac struktur, öz-özünə valideyn). Açar: account_code';
COMMENT ON TABLE product.item_category  IS '04. Məhsul/material qrupları (kateqoriya + alt-kateqoriya). Açar: category_code';
COMMENT ON TABLE org.site               IS '05. Obyektlər/saytlar (ofis, zavod, ferma). Açar: site_code → company_code';
COMMENT ON TABLE finance.vat_code       IS '06. ƏDV/vergi kodları və dərəcələri. Açar: vat_code';
COMMENT ON TABLE org.department         IS '07. Şöbələr (obyektə bağlı, ağac struktur). Açar: dept_code → site_code';
COMMENT ON TABLE product.item           IS '08. Əmtəə/material kartı (nomenklaturanın əsası). Açar: item_code → category_code, base_uom';
COMMENT ON TABLE org.position           IS '09. Vəzifələr/ştat. Açar: position_code → dept_code';
COMMENT ON TABLE org.cost_center        IS '10. Xərc mərkəzləri (maliyyə analitikası). Açar: cc_code → site_code, dept_code';
COMMENT ON TABLE inventory.warehouse    IS '11. Anbarlar. Açar: warehouse_code → site_code';
COMMENT ON TABLE production.work_center  IS '12. İş mərkəzləri (istehsal mərhələləri). Açar: work_center_code → site_code';
COMMENT ON TABLE production.flock        IS '13. Quş sürüləri/partiyaları. Açar: flock_code → site_code';
COMMENT ON TABLE hr.work_schedule       IS '14. İş qrafikləri (növbə, saat). Açar: schedule_code';
COMMENT ON TABLE hr.salary_component    IS '15. Əmək haqqı komponentləri (qazanc/tutulma). Açar: component_code';
COMMENT ON TABLE hr.employee            IS '16. İşçi kartı. Açar: employee_code → company/site/dept/position/schedule';
COMMENT ON TABLE hr.employment_contract IS '17. Əmək müqavilələri. Açar: contract_no → employee_code';
COMMENT ON TABLE hr.employee_salary     IS '18. İşçi üzrə maaş təyinatı. Açar: (employee_code, component_code)';
COMMENT ON TABLE inventory.location     IS '19. Anbar yerləşmələri (zona/rəf). Açar: location_code → warehouse_code';
COMMENT ON TABLE product.bom            IS '20. Resept/BOM başlığı (çıxış məhsulu). Açar: bom_code → output_item_code';
COMMENT ON TABLE product.bom_line       IS '21. Resept tərkibi (komponentlər). Açar: (bom_code, line_no) → component_item_code';
COMMENT ON TABLE product.price_list     IS '22. Qiymət siyahısı başlığı. Açar: price_list_code';
COMMENT ON TABLE product.price_list_line IS '23. Qiymət sətirləri (məhsul-qiymət). Açar: (price_list_code, item_code)';
COMMENT ON TABLE partner.partner        IS '24. Tərəfdaş kartı (müştəri/təchizatçı/bank...). Açar: partner_code';
COMMENT ON TABLE partner.supplier       IS '25. Təchizatçı əlavə məlumatı. Açar: partner_code → partner';
COMMENT ON TABLE partner.customer       IS '26. Müştəri əlavə məlumatı. Açar: partner_code → partner, price_list_code';
COMMENT ON TABLE partner.bank_account   IS '27. Tərəfdaş bank hesabları. Açar: account_code → partner_code';
COMMENT ON TABLE production.routing      IS '28. İstehsal marşrutu (addımlar). Açar: routing_code → item_code, work_center_code';
COMMENT ON TABLE quality.test_plan      IS '29. Keyfiyyət test planları. Açar: test_plan_code → item_code';
COMMENT ON TABLE quality.certificate    IS '30. Sertifikatlar. Açar: certificate_code → site_code, item_code';
COMMENT ON TABLE sales.sales_target     IS '31. Satış hədəfləri (dövr/obyekt/məhsul/müştəri). Açar: target_code';
COMMENT ON TABLE finance.budget         IS '32. Büdcə başlığı. Açar: budget_code';
COMMENT ON TABLE finance.budget_line    IS '33. Büdcə sətirləri. Açar: (budget_code, line_no) → account_code, cc_code';
COMMENT ON TABLE asset.asset_category   IS '34. Aktiv qrupları (amortizasiya). Açar: asset_category_code';
COMMENT ON TABLE asset.asset            IS '35. Əsas vəsaitlər. Açar: asset_code → asset_category_code, site_code, cc_code';
COMMENT ON TABLE asset.equipment        IS '36. Avadanlıq (texniki pasport). Açar: equipment_code → asset_code, site_code';
COMMENT ON TABLE logistics.vehicle      IS '37. Nəqliyyat vasitələri. Açar: vehicle_code → site_code';

-- ===== SYS + İSTİNAD =====
COMMENT ON TABLE product.uom            IS 'İstinad: Ölçü vahidləri (kq, ton, ədəd...). Açar: uom_code';
COMMENT ON TABLE trade.currency         IS 'İstinad: Valyutalar (AZN, USD, EUR, RUB). Açar: currency_code';
COMMENT ON TABLE trade.incoterm         IS 'İstinad: Incoterm-lər (EXW, FOB, CIF...). Açar: incoterm_code';
COMMENT ON TABLE hr.leave_type          IS 'İstinad: Məzuniyyət növləri. Açar: leave_type_code';
COMMENT ON TABLE sys.doc_sequence       IS 'Sənəd nömrələmə ardıcıllığı. Açar: seq_code';
COMMENT ON TABLE sys.role               IS 'Rollar (ADMIN, MANAGER...). Açar: role_code';
COMMENT ON TABLE sys.permission         IS 'İcazələr (modul-əməliyyat). Açar: permission_code';
COMMENT ON TABLE sys.role_permission    IS 'Rol↔İcazə əlaqəsi. Açar: (role_code, permission_code)';
COMMENT ON TABLE sys.app_user           IS 'İstifadəçilər. Açar: username → employee_code';
COMMENT ON TABLE sys.user_role          IS 'İstifadəçi↔Rol təyinatı. Açar: (username, role_code)';
COMMENT ON TABLE sys.setting            IS 'Sistem parametrləri. Açar: config_key';
COMMENT ON TABLE sys.audit_log          IS 'Audit jurnalı (dəyişiklik izi). Açar: log_id';
