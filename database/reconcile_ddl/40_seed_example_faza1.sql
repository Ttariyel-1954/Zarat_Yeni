-- Zarat ERP — FAZA 1: NÜMUNƏ (seed) məlumat
-- MƏQSƏD: boş qalan master cədvəllərin strukturunu real nümunələrlə göstərmək.
-- Real göstəriciləri müəssisənin işçiləri verəcək; bunlar yalnız təsəvvür üçün nümunədir.
-- İdempotent: ON CONFLICT DO NOTHING. İcra: -f 40_seed_example_faza1.sql
\set ON_ERROR_STOP on

-- 10. org.cost_center — Xərc mərkəzləri (hansı obyektdə/şöbədə xərc toplanır)
INSERT INTO org.cost_center (cc_code, cc_name, site_code, dept_code) VALUES
 ('CC-ADM','İdarəetmə xərcləri','BR-001','DEPT-001'),
 ('CC-FIN','Maliyyə xərcləri','BR-001','DEPT-002'),
 ('CC-FEED','Yem istehsalı xərcləri','BR-004','DEPT-006'),
 ('CC-POULTRY','Quşçuluq xərcləri','BR-002','DEPT-007'),
 ('CC-SALES','Satış və marketinq xərcləri','BR-001','DEPT-004')
ON CONFLICT (cc_code) DO NOTHING;

-- 12. production.work_center — İş mərkəzləri (istehsalın fiziki mərhələləri)
INSERT INTO production.work_center (work_center_code, work_center_name, site_code, capacity_per_day, uom) VALUES
 ('WC-MILL','Taxıl üyütmə xətti','BR-004', 12000, 'KG'),
 ('WC-MIX','Yem qarışdırma xətti','BR-004', 10000, 'KG'),
 ('WC-PACK','Qablaşdırma xətti','BR-004', 8000, 'KG'),
 ('WC-BROOD','Quşçuluq broyler sahəsi','BR-002', 20000, 'EA')
ON CONFLICT (work_center_code) DO NOTHING;

-- 28. production.routing — İstehsal marşrutu (məhsulun addım-addım hazırlanması)
INSERT INTO production.routing (routing_code, routing_name, item_code, work_center_code, step_no, operation, std_time_min) VALUES
 ('RT-PR001-10','Başlanğıc yemi - üyütmə','PR-001','WC-MILL',10,'Xammalın üyüdülməsi', 20),
 ('RT-PR001-20','Başlanğıc yemi - qarışdırma','PR-001','WC-MIX',20,'Komponentlərin qarışdırılması', 30),
 ('RT-PR001-30','Başlanğıc yemi - qablaşdırma','PR-001','WC-PACK',30,'Kisələrə qablaşdırma', 15),
 ('RT-PR004-10','Ətlik yemi - üyütmə','PR-004','WC-MILL',10,'Xammalın üyüdülməsi', 20),
 ('RT-PR004-20','Ətlik yemi - qarışdırma','PR-004','WC-MIX',20,'Komponentlərin qarışdırılması', 30)
ON CONFLICT (routing_code) DO NOTHING;

-- 14. hr.work_schedule — İş qrafikləri
INSERT INTO hr.work_schedule (schedule_code, schedule_name, days_per_week, hours_per_day, shift_type, notes) VALUES
 ('SCH-STD','Standart 5 günlük', 5, 8, 'gündüz','09:00-18:00, şənbə-bazar istirahət'),
 ('SCH-SHIFT','Növbəli iş rejimi', 6, 12, 'növbəli','İstehsalat üçün 2 növbə'),
 ('SCH-PART','Yarım ştat', 5, 4, 'gündüz','Natamam iş günü')
ON CONFLICT (schedule_code) DO NOTHING;

-- 15. hr.salary_component — Əmək haqqı komponentləri (qazanc/tutulma növləri)
INSERT INTO hr.salary_component (component_code, component_name, comp_type, calc_method, taxable, default_amount, notes) VALUES
 ('SC-BASE','Vəzifə maaşı','earning','fixed', true, NULL,'Əsas aylıq maaş'),
 ('SC-BONUS','Mükafat','earning','manual', true, NULL,'Nəticəyə görə mükafat'),
 ('SC-MEAL','Yemək əlavəsi','earning','fixed', false, 200,'Aylıq yemək kompensasiyası'),
 ('SC-INCTAX','Gəlir vergisi','deduction','percent', false, NULL,'Fiziki şəxsin gəlir vergisi'),
 ('SC-SSPF','Sosial sığorta (DSMF)','deduction','percent', false, NULL,'İşçi payı')
ON CONFLICT (component_code) DO NOTHING;

-- 17. hr.employment_contract — Əmək müqavilələri
INSERT INTO hr.employment_contract (contract_no, employee_code, contract_type, start_date, end_date, base_salary, currency) VALUES
 ('CTR-2005-001','PER-001','müddətsiz','2005-03-20', NULL, 6000,'AZN'),
 ('CTR-2010-002','PER-002','müddətsiz','2010-06-01', NULL, 4000,'AZN'),
 ('CTR-2012-003','PER-003','müddətsiz','2012-09-15', NULL, 3800,'AZN'),
 ('CTR-2018-004','PER-004','müddətli','2018-02-01','2027-02-01', 2500,'AZN'),
 ('CTR-2019-005','PER-005','müddətsiz','2019-05-10', NULL, 2200,'AZN')
ON CONFLICT (contract_no) DO NOTHING;

-- 18. hr.employee_salary — İşçi üzrə maaş təyinatı (komponent-komponent)
INSERT INTO hr.employee_salary (employee_code, component_code, amount, valid_from) VALUES
 ('PER-001','SC-BASE', 6000,'2025-01-01'),
 ('PER-001','SC-MEAL', 200,'2025-01-01'),
 ('PER-002','SC-BASE', 4000,'2025-01-01'),
 ('PER-002','SC-MEAL', 200,'2025-01-01'),
 ('PER-003','SC-BASE', 3800,'2025-01-01'),
 ('PER-004','SC-BASE', 2500,'2025-01-01'),
 ('PER-005','SC-BASE', 2200,'2025-01-01')
ON CONFLICT (employee_code, component_code) DO NOTHING;

-- 31. sales.sales_target — Satış hədəfləri (obyekt/məhsul/müştəri üzrə plan)
INSERT INTO sales.sales_target (target_code, period_year, period_month, site_code, item_code, customer_code, target_qty, target_amount, currency) VALUES
 ('TGT-2026-01-BR1','2026',1,'BR-001','PR-005','PART-001', 5000, 40000,'AZN'),
 ('TGT-2026-01-BR3','2026',1,'BR-003','PR-006','PART-002', 3000, 27000,'AZN'),
 ('TGT-2026-02-BR1','2026',2,'BR-001','PR-010','PART-003', 20000, 6000,'AZN'),
 ('TGT-2026-Q1-EXP','2026',3,'BR-001','PR-005','PART-007', 10000, 85000,'AZN')
ON CONFLICT (target_code) DO NOTHING;

-- 36. asset.equipment — Avadanlıq (əsas vəsaitin texniki pasportu)
INSERT INTO asset.equipment (equipment_code, equipment_name, asset_code, site_code, equipment_type, manufacturer, install_date, capacity, notes) VALUES
 ('EQ-001','Yem qarışdırma maşını','AST-001','BR-002','qarışdırıcı','AqroMash','2025-06-01','500 kq/saat','Yem xəttinin əsas avadanlığı'),
 ('EQ-002','Taxıl üyüdən dəyirman','AST-002','BR-002','dəyirman','AqroMash','2025-06-01','1000 kq/saat',NULL),
 ('EQ-003','Qablaşdırma maşını','AST-006','BR-002','qablaşdırıcı','PackTech','2025-07-01','40 kisə/dəq',NULL)
ON CONFLICT (equipment_code) DO NOTHING;

-- sys.user_role — İstifadəçi ↔ Rol təyinatı
INSERT INTO sys.user_role (username, role_code) VALUES
 ('ali.huseynov','ADMIN'),
 ('sekine.memmedova','MANAGER'),
 ('resul.quliyev','MANAGER'),
 ('nermine.eliyeva','USER'),
 ('tural.babayev','USER')
ON CONFLICT (username, role_code) DO NOTHING;
