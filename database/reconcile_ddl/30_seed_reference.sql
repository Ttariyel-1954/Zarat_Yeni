-- Zarat ERP — FAZA 1: istinad seed (ERP-nin özü, müəssisədən gəlmir)
-- İdempotent: ON CONFLICT DO NOTHING. İcra: -f 30_seed_reference.sql

-- Valyutalar
INSERT INTO trade.currency (currency_code, currency_name, symbol) VALUES
 ('AZN','Azərbaycan manatı','₼'),
 ('USD','ABŞ dolları','$'),
 ('EUR','Avro','€'),
 ('RUB','Rusiya rublu','₽')
ON CONFLICT (currency_code) DO NOTHING;

-- Incoterm-lər (2020)
INSERT INTO trade.incoterm (incoterm_code, incoterm_name) VALUES
 ('EXW','Ex Works'),
 ('FCA','Free Carrier'),
 ('FOB','Free On Board'),
 ('CFR','Cost and Freight'),
 ('CIF','Cost, Insurance and Freight'),
 ('CPT','Carriage Paid To'),
 ('DAP','Delivered At Place'),
 ('DDP','Delivered Duty Paid')
ON CONFLICT (incoterm_code) DO NOTHING;

-- Ölçü vahidləri (standart) — loader `product_unit`-dən əlavələri upsert edə bilər
INSERT INTO product.uom (uom_code, uom_name, short_name) VALUES
 ('KG','Kiloqram','kq'),
 ('TON','Ton','t'),
 ('EA','Ədəd','əd'),
 ('L','Litr','l'),
 ('M','Metr','m'),
 ('M2','Kvadrat metr','m²'),
 ('M3','Kub metr','m³'),
 ('PACK','Bağlama','pak'),
 ('BOX','Qutu','qut')
ON CONFLICT (uom_code) DO NOTHING;

-- Məzuniyyət növləri
INSERT INTO hr.leave_type (leave_type_code, leave_type_name, is_paid, max_days_year) VALUES
 ('ANNUAL','İllik məzuniyyət', true, 21),
 ('SICK','Xəstəlik məzuniyyəti', true, NULL),
 ('UNPAID','Ödənişsiz məzuniyyət', false, NULL),
 ('MATERNITY','Analıq məzuniyyəti', true, 126)
ON CONFLICT (leave_type_code) DO NOTHING;

-- Sənəd nömrələmə ardıcıllığı
INSERT INTO sys.doc_sequence (seq_code, seq_name, prefix, next_value, padding) VALUES
 ('PO','Satınalma sifarişi','PO-', 1, 4),
 ('SO','Satış sifarişi','SO-', 1, 4),
 ('INV','Hesab-faktura','INV-', 1, 4),
 ('JE','Jurnal yazılışı','JE-', 1, 4),
 ('PROD','İstehsal sifarişi','PROD-', 1, 4)
ON CONFLICT (seq_code) DO NOTHING;
