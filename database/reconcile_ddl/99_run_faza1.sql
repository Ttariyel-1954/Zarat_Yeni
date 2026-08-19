-- Zarat ERP — FAZA 1 DDL-i ardıcıl işə salır.
-- İcra (03_DDL qovluğundan): psql -p 5433 -d zarat_erp -f 99_run_faza1.sql
\set ON_ERROR_STOP on

\echo '>> 1/5 Sxemlər...'
\i 00_schemas.sql
\echo '>> 2/5 Master cədvəllər (37)...'
\i 10_faza1_tables.sql
\echo '>> 3/5 sys + istinad cədvəlləri...'
\i 15_faza1_sys_ref.sql
\echo '>> 4/5 Xarici açarlar (FK)...'
\i 20_faza1_foreign_keys.sql
\echo '>> 5/5 İstinad seed...'
\i 30_seed_reference.sql
\echo '6/8 Nümunə (illüstrativ) seed...'
\i 40_seed_example_faza1.sql
\echo '>> 7/8 İzahlar (COMMENT)...'
\i 50_comments_faza1.sql
\echo '>> FAZA 1 DDL hazırdır.'
