-- Zarat ERP — 51 xarici açar (FK). Hamısı DEFERRABLE INITIALLY DEFERRED.
-- İcra: psql -p 5433 -d zarat_erp -f 90_foreign_keys.sql
-- (Cədvəllər yaradıldıqdan SONRA işə salın.)

ALTER TABLE finance.account DROP CONSTRAINT IF EXISTS fk_finance_account_parent_account_code;
ALTER TABLE finance.account ADD CONSTRAINT fk_finance_account_parent_account_code
    FOREIGN KEY (parent_account_code) REFERENCES finance.account (account_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.item_category DROP CONSTRAINT IF EXISTS fk_product_item_category_parent_category_code;
ALTER TABLE product.item_category ADD CONSTRAINT fk_product_item_category_parent_category_code
    FOREIGN KEY (parent_category_code) REFERENCES product.item_category (category_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE org.site DROP CONSTRAINT IF EXISTS fk_org_site_company_code;
ALTER TABLE org.site ADD CONSTRAINT fk_org_site_company_code
    FOREIGN KEY (company_code) REFERENCES org.company (company_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE finance.vat_code DROP CONSTRAINT IF EXISTS fk_finance_vat_code_account_code;
ALTER TABLE finance.vat_code ADD CONSTRAINT fk_finance_vat_code_account_code
    FOREIGN KEY (account_code) REFERENCES finance.account (account_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE org.department DROP CONSTRAINT IF EXISTS fk_org_department_site_code;
ALTER TABLE org.department ADD CONSTRAINT fk_org_department_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE org.department DROP CONSTRAINT IF EXISTS fk_org_department_parent_dept_code;
ALTER TABLE org.department ADD CONSTRAINT fk_org_department_parent_dept_code
    FOREIGN KEY (parent_dept_code) REFERENCES org.department (dept_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.item DROP CONSTRAINT IF EXISTS fk_product_item_category_code;
ALTER TABLE product.item ADD CONSTRAINT fk_product_item_category_code
    FOREIGN KEY (category_code) REFERENCES product.item_category (category_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE org.position DROP CONSTRAINT IF EXISTS fk_org_position_dept_code;
ALTER TABLE org.position ADD CONSTRAINT fk_org_position_dept_code
    FOREIGN KEY (dept_code) REFERENCES org.department (dept_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE org.cost_center DROP CONSTRAINT IF EXISTS fk_org_cost_center_site_code;
ALTER TABLE org.cost_center ADD CONSTRAINT fk_org_cost_center_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE org.cost_center DROP CONSTRAINT IF EXISTS fk_org_cost_center_dept_code;
ALTER TABLE org.cost_center ADD CONSTRAINT fk_org_cost_center_dept_code
    FOREIGN KEY (dept_code) REFERENCES org.department (dept_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE inventory.warehouse DROP CONSTRAINT IF EXISTS fk_inventory_warehouse_site_code;
ALTER TABLE inventory.warehouse ADD CONSTRAINT fk_inventory_warehouse_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE production.work_center DROP CONSTRAINT IF EXISTS fk_production_work_center_site_code;
ALTER TABLE production.work_center ADD CONSTRAINT fk_production_work_center_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE production.flock DROP CONSTRAINT IF EXISTS fk_production_flock_site_code;
ALTER TABLE production.flock ADD CONSTRAINT fk_production_flock_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee DROP CONSTRAINT IF EXISTS fk_hr_employee_company_code;
ALTER TABLE hr.employee ADD CONSTRAINT fk_hr_employee_company_code
    FOREIGN KEY (company_code) REFERENCES org.company (company_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee DROP CONSTRAINT IF EXISTS fk_hr_employee_site_code;
ALTER TABLE hr.employee ADD CONSTRAINT fk_hr_employee_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee DROP CONSTRAINT IF EXISTS fk_hr_employee_dept_code;
ALTER TABLE hr.employee ADD CONSTRAINT fk_hr_employee_dept_code
    FOREIGN KEY (dept_code) REFERENCES org.department (dept_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee DROP CONSTRAINT IF EXISTS fk_hr_employee_position_code;
ALTER TABLE hr.employee ADD CONSTRAINT fk_hr_employee_position_code
    FOREIGN KEY (position_code) REFERENCES org.position (position_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee DROP CONSTRAINT IF EXISTS fk_hr_employee_schedule_code;
ALTER TABLE hr.employee ADD CONSTRAINT fk_hr_employee_schedule_code
    FOREIGN KEY (schedule_code) REFERENCES hr.work_schedule (schedule_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employment_contract DROP CONSTRAINT IF EXISTS fk_hr_employment_contract_employee_code;
ALTER TABLE hr.employment_contract ADD CONSTRAINT fk_hr_employment_contract_employee_code
    FOREIGN KEY (employee_code) REFERENCES hr.employee (employee_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee_salary DROP CONSTRAINT IF EXISTS fk_hr_employee_salary_employee_code;
ALTER TABLE hr.employee_salary ADD CONSTRAINT fk_hr_employee_salary_employee_code
    FOREIGN KEY (employee_code) REFERENCES hr.employee (employee_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE hr.employee_salary DROP CONSTRAINT IF EXISTS fk_hr_employee_salary_component_code;
ALTER TABLE hr.employee_salary ADD CONSTRAINT fk_hr_employee_salary_component_code
    FOREIGN KEY (component_code) REFERENCES hr.salary_component (component_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE inventory.location DROP CONSTRAINT IF EXISTS fk_inventory_location_warehouse_code;
ALTER TABLE inventory.location ADD CONSTRAINT fk_inventory_location_warehouse_code
    FOREIGN KEY (warehouse_code) REFERENCES inventory.warehouse (warehouse_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.bom DROP CONSTRAINT IF EXISTS fk_product_bom_output_item_code;
ALTER TABLE product.bom ADD CONSTRAINT fk_product_bom_output_item_code
    FOREIGN KEY (output_item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.bom DROP CONSTRAINT IF EXISTS fk_product_bom_work_center_code;
ALTER TABLE product.bom ADD CONSTRAINT fk_product_bom_work_center_code
    FOREIGN KEY (work_center_code) REFERENCES production.work_center (work_center_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.bom_line DROP CONSTRAINT IF EXISTS fk_product_bom_line_bom_code;
ALTER TABLE product.bom_line ADD CONSTRAINT fk_product_bom_line_bom_code
    FOREIGN KEY (bom_code) REFERENCES product.bom (bom_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.bom_line DROP CONSTRAINT IF EXISTS fk_product_bom_line_component_item_code;
ALTER TABLE product.bom_line ADD CONSTRAINT fk_product_bom_line_component_item_code
    FOREIGN KEY (component_item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.price_list_line DROP CONSTRAINT IF EXISTS fk_product_price_list_line_price_list_code;
ALTER TABLE product.price_list_line ADD CONSTRAINT fk_product_price_list_line_price_list_code
    FOREIGN KEY (price_list_code) REFERENCES product.price_list (price_list_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE product.price_list_line DROP CONSTRAINT IF EXISTS fk_product_price_list_line_item_code;
ALTER TABLE product.price_list_line ADD CONSTRAINT fk_product_price_list_line_item_code
    FOREIGN KEY (item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE partner.partner DROP CONSTRAINT IF EXISTS fk_partner_partner_payment_term_code;
ALTER TABLE partner.partner ADD CONSTRAINT fk_partner_partner_payment_term_code
    FOREIGN KEY (payment_term_code) REFERENCES partner.payment_term (term_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE partner.supplier DROP CONSTRAINT IF EXISTS fk_partner_supplier_partner_code;
ALTER TABLE partner.supplier ADD CONSTRAINT fk_partner_supplier_partner_code
    FOREIGN KEY (partner_code) REFERENCES partner.partner (partner_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE partner.customer DROP CONSTRAINT IF EXISTS fk_partner_customer_partner_code;
ALTER TABLE partner.customer ADD CONSTRAINT fk_partner_customer_partner_code
    FOREIGN KEY (partner_code) REFERENCES partner.partner (partner_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE partner.customer DROP CONSTRAINT IF EXISTS fk_partner_customer_price_list_code;
ALTER TABLE partner.customer ADD CONSTRAINT fk_partner_customer_price_list_code
    FOREIGN KEY (price_list_code) REFERENCES product.price_list (price_list_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE partner.bank_account DROP CONSTRAINT IF EXISTS fk_partner_bank_account_partner_code;
ALTER TABLE partner.bank_account ADD CONSTRAINT fk_partner_bank_account_partner_code
    FOREIGN KEY (partner_code) REFERENCES partner.partner (partner_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE production.routing DROP CONSTRAINT IF EXISTS fk_production_routing_item_code;
ALTER TABLE production.routing ADD CONSTRAINT fk_production_routing_item_code
    FOREIGN KEY (item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE production.routing DROP CONSTRAINT IF EXISTS fk_production_routing_work_center_code;
ALTER TABLE production.routing ADD CONSTRAINT fk_production_routing_work_center_code
    FOREIGN KEY (work_center_code) REFERENCES production.work_center (work_center_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE quality.test_plan DROP CONSTRAINT IF EXISTS fk_quality_test_plan_item_code;
ALTER TABLE quality.test_plan ADD CONSTRAINT fk_quality_test_plan_item_code
    FOREIGN KEY (item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE quality.certificate DROP CONSTRAINT IF EXISTS fk_quality_certificate_site_code;
ALTER TABLE quality.certificate ADD CONSTRAINT fk_quality_certificate_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE quality.certificate DROP CONSTRAINT IF EXISTS fk_quality_certificate_item_code;
ALTER TABLE quality.certificate ADD CONSTRAINT fk_quality_certificate_item_code
    FOREIGN KEY (item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sales.sales_target DROP CONSTRAINT IF EXISTS fk_sales_sales_target_site_code;
ALTER TABLE sales.sales_target ADD CONSTRAINT fk_sales_sales_target_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sales.sales_target DROP CONSTRAINT IF EXISTS fk_sales_sales_target_item_code;
ALTER TABLE sales.sales_target ADD CONSTRAINT fk_sales_sales_target_item_code
    FOREIGN KEY (item_code) REFERENCES product.item (item_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sales.sales_target DROP CONSTRAINT IF EXISTS fk_sales_sales_target_customer_code;
ALTER TABLE sales.sales_target ADD CONSTRAINT fk_sales_sales_target_customer_code
    FOREIGN KEY (customer_code) REFERENCES partner.partner (partner_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE finance.budget_line DROP CONSTRAINT IF EXISTS fk_finance_budget_line_budget_code;
ALTER TABLE finance.budget_line ADD CONSTRAINT fk_finance_budget_line_budget_code
    FOREIGN KEY (budget_code) REFERENCES finance.budget (budget_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE finance.budget_line DROP CONSTRAINT IF EXISTS fk_finance_budget_line_account_code;
ALTER TABLE finance.budget_line ADD CONSTRAINT fk_finance_budget_line_account_code
    FOREIGN KEY (account_code) REFERENCES finance.account (account_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE finance.budget_line DROP CONSTRAINT IF EXISTS fk_finance_budget_line_cc_code;
ALTER TABLE finance.budget_line ADD CONSTRAINT fk_finance_budget_line_cc_code
    FOREIGN KEY (cc_code) REFERENCES org.cost_center (cc_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE asset.asset_category DROP CONSTRAINT IF EXISTS fk_asset_asset_category_account_code;
ALTER TABLE asset.asset_category ADD CONSTRAINT fk_asset_asset_category_account_code
    FOREIGN KEY (account_code) REFERENCES finance.account (account_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE asset.asset DROP CONSTRAINT IF EXISTS fk_asset_asset_asset_category_code;
ALTER TABLE asset.asset ADD CONSTRAINT fk_asset_asset_asset_category_code
    FOREIGN KEY (asset_category_code) REFERENCES asset.asset_category (asset_category_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE asset.asset DROP CONSTRAINT IF EXISTS fk_asset_asset_site_code;
ALTER TABLE asset.asset ADD CONSTRAINT fk_asset_asset_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE asset.asset DROP CONSTRAINT IF EXISTS fk_asset_asset_cc_code;
ALTER TABLE asset.asset ADD CONSTRAINT fk_asset_asset_cc_code
    FOREIGN KEY (cc_code) REFERENCES org.cost_center (cc_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE asset.equipment DROP CONSTRAINT IF EXISTS fk_asset_equipment_asset_code;
ALTER TABLE asset.equipment ADD CONSTRAINT fk_asset_equipment_asset_code
    FOREIGN KEY (asset_code) REFERENCES asset.asset (asset_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE asset.equipment DROP CONSTRAINT IF EXISTS fk_asset_equipment_site_code;
ALTER TABLE asset.equipment ADD CONSTRAINT fk_asset_equipment_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE logistics.vehicle DROP CONSTRAINT IF EXISTS fk_logistics_vehicle_site_code;
ALTER TABLE logistics.vehicle ADD CONSTRAINT fk_logistics_vehicle_site_code
    FOREIGN KEY (site_code) REFERENCES org.site (site_code)
    DEFERRABLE INITIALLY DEFERRED;

-- ============ SYS FK-ləri (FAZA 1 əlavəsi) ============

ALTER TABLE sys.role_permission DROP CONSTRAINT IF EXISTS fk_sys_role_permission_role_code;
ALTER TABLE sys.role_permission ADD CONSTRAINT fk_sys_role_permission_role_code
    FOREIGN KEY (role_code) REFERENCES sys.role (role_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sys.role_permission DROP CONSTRAINT IF EXISTS fk_sys_role_permission_permission_code;
ALTER TABLE sys.role_permission ADD CONSTRAINT fk_sys_role_permission_permission_code
    FOREIGN KEY (permission_code) REFERENCES sys.permission (permission_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sys.app_user DROP CONSTRAINT IF EXISTS fk_sys_app_user_employee_code;
ALTER TABLE sys.app_user ADD CONSTRAINT fk_sys_app_user_employee_code
    FOREIGN KEY (employee_code) REFERENCES hr.employee (employee_code)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sys.user_role DROP CONSTRAINT IF EXISTS fk_sys_user_role_username;
ALTER TABLE sys.user_role ADD CONSTRAINT fk_sys_user_role_username
    FOREIGN KEY (username) REFERENCES sys.app_user (username)
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE sys.user_role DROP CONSTRAINT IF EXISTS fk_sys_user_role_role_code;
ALTER TABLE sys.user_role ADD CONSTRAINT fk_sys_user_role_role_code
    FOREIGN KEY (role_code) REFERENCES sys.role (role_code)
    DEFERRABLE INITIALLY DEFERRED;

-- product.item.base_uom → product.uom (istinad; NOT NULL data mövcud olduğundan etibarlı)
ALTER TABLE product.item DROP CONSTRAINT IF EXISTS fk_product_item_base_uom;
ALTER TABLE product.item ADD CONSTRAINT fk_product_item_base_uom
    FOREIGN KEY (base_uom) REFERENCES product.uom (uom_code)
    DEFERRABLE INITIALLY DEFERRED;

