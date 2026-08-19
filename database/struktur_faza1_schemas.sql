--
-- PostgreSQL database dump
--

\restrict ztkx9slW5SvKh7fjRQHoJ6E8aR7VHsgifmIW9mixHcqnWADbhopzPBaCb8Mm1qO

-- Dumped from database version 18.4 (Homebrew)
-- Dumped by pg_dump version 18.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: asset; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA asset;


ALTER SCHEMA asset OWNER TO royatalibova;

--
-- Name: finance; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA finance;


ALTER SCHEMA finance OWNER TO royatalibova;

--
-- Name: hr; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA hr;


ALTER SCHEMA hr OWNER TO royatalibova;

--
-- Name: inventory; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA inventory;


ALTER SCHEMA inventory OWNER TO royatalibova;

--
-- Name: logistics; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA logistics;


ALTER SCHEMA logistics OWNER TO royatalibova;

--
-- Name: org; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA org;


ALTER SCHEMA org OWNER TO royatalibova;

--
-- Name: partner; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA partner;


ALTER SCHEMA partner OWNER TO royatalibova;

--
-- Name: production; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA production;


ALTER SCHEMA production OWNER TO royatalibova;

--
-- Name: purchase; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA purchase;


ALTER SCHEMA purchase OWNER TO royatalibova;

--
-- Name: quality; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA quality;


ALTER SCHEMA quality OWNER TO royatalibova;

--
-- Name: sales; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA sales;


ALTER SCHEMA sales OWNER TO royatalibova;

--
-- Name: system; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA system;


ALTER SCHEMA system OWNER TO royatalibova;

--
-- Name: trade; Type: SCHEMA; Schema: -; Owner: royatalibova
--

CREATE SCHEMA trade;


ALTER SCHEMA trade OWNER TO royatalibova;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asset; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.asset (
    id integer NOT NULL,
    asset_code character varying,
    asset_name character varying,
    asset_description text,
    category_id integer,
    serial_number character varying,
    barcode character varying,
    manufacturer character varying,
    model character varying,
    manufacturer_year integer,
    purchase_date date,
    purchase_price numeric,
    current_value numeric,
    depreciation_method character varying,
    location character varying,
    status character varying,
    assigned_to integer,
    department_id integer,
    branch_id integer,
    warranty_expiry_date date,
    insurance_policy_number character varying,
    insurance_expiry_date date,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE asset.asset OWNER TO royatalibova;

--
-- Name: asset_category; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.asset_category (
    id integer NOT NULL,
    category_code character varying,
    category_name character varying,
    category_description text,
    parent_category_id integer,
    depreciation_rate numeric,
    useful_life_years integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE asset.asset_category OWNER TO royatalibova;

--
-- Name: asset_category_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.asset_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.asset_category_id_seq OWNER TO royatalibova;

--
-- Name: asset_category_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.asset_category_id_seq OWNED BY asset.asset_category.id;


--
-- Name: asset_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.asset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.asset_id_seq OWNER TO royatalibova;

--
-- Name: asset_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.asset_id_seq OWNED BY asset.asset.id;


--
-- Name: maintenance_history; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.maintenance_history (
    id integer NOT NULL,
    task_id integer,
    asset_id integer,
    maintenance_date date,
    maintenance_type character varying,
    description text,
    technician character varying,
    downtime_hours numeric,
    cost numeric,
    status character varying,
    resolution text,
    part_replaced text,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE asset.maintenance_history OWNER TO royatalibova;

--
-- Name: maintenance_history_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.maintenance_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.maintenance_history_id_seq OWNER TO royatalibova;

--
-- Name: maintenance_history_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.maintenance_history_id_seq OWNED BY asset.maintenance_history.id;


--
-- Name: maintenance_schedule; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.maintenance_schedule (
    id integer NOT NULL,
    schedule_code character varying,
    asset_id integer,
    maintenance_type character varying,
    frequency_days integer,
    next_maintenance_date date,
    estimated_cost numeric,
    priority character varying,
    is_recurring boolean,
    assigned_team character varying,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE asset.maintenance_schedule OWNER TO royatalibova;

--
-- Name: maintenance_schedule_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.maintenance_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.maintenance_schedule_id_seq OWNER TO royatalibova;

--
-- Name: maintenance_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.maintenance_schedule_id_seq OWNED BY asset.maintenance_schedule.id;


--
-- Name: maintenance_task; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.maintenance_task (
    id integer NOT NULL,
    task_number character varying,
    asset_id integer,
    schedule_id integer,
    task_title character varying,
    task_description text,
    task_type character varying,
    priority character varying,
    status character varying,
    reported_by integer,
    assigned_to integer,
    approved_by integer,
    start_date date,
    end_date date,
    actual_start_date date,
    actual_end_date date,
    estimated_hours numeric,
    actual_hours numeric,
    estimated_cost numeric,
    actual_cost numeric,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE asset.maintenance_task OWNER TO royatalibova;

--
-- Name: maintenance_task_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.maintenance_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.maintenance_task_id_seq OWNER TO royatalibova;

--
-- Name: maintenance_task_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.maintenance_task_id_seq OWNED BY asset.maintenance_task.id;


--
-- Name: spare_part; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.spare_part (
    id integer NOT NULL,
    part_code character varying,
    part_name character varying,
    part_description text,
    category_id integer,
    manufacturer character varying,
    model character varying,
    manufacturer_part_number character varying,
    supplier_id integer,
    unit character varying,
    min_stock_qty numeric,
    max_stock_qty numeric,
    current_stock_qty numeric,
    reorder_point numeric,
    unit_cost numeric,
    last_purchase_price numeric,
    location character varying,
    shelf_location character varying,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE asset.spare_part OWNER TO royatalibova;

--
-- Name: spare_part_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.spare_part_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.spare_part_id_seq OWNER TO royatalibova;

--
-- Name: spare_part_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.spare_part_id_seq OWNED BY asset.spare_part.id;


--
-- Name: spare_part_usage; Type: TABLE; Schema: asset; Owner: royatalibova
--

CREATE TABLE asset.spare_part_usage (
    id integer NOT NULL,
    part_id integer,
    task_id integer,
    asset_id integer,
    usage_date date,
    quantity_used numeric,
    unit character varying,
    unit_price numeric,
    total_cost numeric,
    reason character varying,
    used_by integer,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE asset.spare_part_usage OWNER TO royatalibova;

--
-- Name: spare_part_usage_id_seq; Type: SEQUENCE; Schema: asset; Owner: royatalibova
--

CREATE SEQUENCE asset.spare_part_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE asset.spare_part_usage_id_seq OWNER TO royatalibova;

--
-- Name: spare_part_usage_id_seq; Type: SEQUENCE OWNED BY; Schema: asset; Owner: royatalibova
--

ALTER SEQUENCE asset.spare_part_usage_id_seq OWNED BY asset.spare_part_usage.id;


--
-- Name: budgets; Type: TABLE; Schema: finance; Owner: royatalibova
--

CREATE TABLE finance.budgets (
    id integer NOT NULL,
    budget_code character varying,
    budget_name character varying,
    budget_type character varying,
    account_id integer,
    department_id integer,
    fiscal_year integer,
    period integer,
    planned_amount numeric,
    actual_amount numeric,
    status character varying,
    created_by integer,
    approved_by integer,
    approval_date date,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE finance.budgets OWNER TO royatalibova;

--
-- Name: budgets_id_seq; Type: SEQUENCE; Schema: finance; Owner: royatalibova
--

CREATE SEQUENCE finance.budgets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE finance.budgets_id_seq OWNER TO royatalibova;

--
-- Name: budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: finance; Owner: royatalibova
--

ALTER SEQUENCE finance.budgets_id_seq OWNED BY finance.budgets.id;


--
-- Name: chart_of_accounts; Type: TABLE; Schema: finance; Owner: royatalibova
--

CREATE TABLE finance.chart_of_accounts (
    id integer NOT NULL,
    account_code character varying,
    account_name character varying,
    account_type character varying,
    parent_account_id integer,
    normal_balance character varying,
    account_level integer,
    is_active boolean,
    description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE finance.chart_of_accounts OWNER TO royatalibova;

--
-- Name: chart_of_accounts_id_seq; Type: SEQUENCE; Schema: finance; Owner: royatalibova
--

CREATE SEQUENCE finance.chart_of_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE finance.chart_of_accounts_id_seq OWNER TO royatalibova;

--
-- Name: chart_of_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: finance; Owner: royatalibova
--

ALTER SEQUENCE finance.chart_of_accounts_id_seq OWNED BY finance.chart_of_accounts.id;


--
-- Name: general_ledger; Type: TABLE; Schema: finance; Owner: royatalibova
--

CREATE TABLE finance.general_ledger (
    id integer NOT NULL,
    transaction_date date,
    account_id integer,
    debit numeric,
    credit numeric,
    description text,
    reference_number character varying,
    source_type character varying,
    source_id integer,
    source_table character varying,
    posted_by integer,
    approved_by integer,
    is_reconciled boolean,
    reconciliation_date date,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE finance.general_ledger OWNER TO royatalibova;

--
-- Name: general_ledger_id_seq; Type: SEQUENCE; Schema: finance; Owner: royatalibova
--

CREATE SEQUENCE finance.general_ledger_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE finance.general_ledger_id_seq OWNER TO royatalibova;

--
-- Name: general_ledger_id_seq; Type: SEQUENCE OWNED BY; Schema: finance; Owner: royatalibova
--

ALTER SEQUENCE finance.general_ledger_id_seq OWNED BY finance.general_ledger.id;


--
-- Name: attendance; Type: TABLE; Schema: hr; Owner: royatalibova
--

CREATE TABLE hr.attendance (
    id integer NOT NULL,
    employee_id integer,
    attendance_date date,
    check_in time without time zone,
    check_out time without time zone,
    work_hours numeric,
    overtime_hours numeric,
    status character varying,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE hr.attendance OWNER TO royatalibova;

--
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: hr; Owner: royatalibova
--

CREATE SEQUENCE hr.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hr.attendance_id_seq OWNER TO royatalibova;

--
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: royatalibova
--

ALTER SEQUENCE hr.attendance_id_seq OWNED BY hr.attendance.id;


--
-- Name: departments; Type: TABLE; Schema: hr; Owner: royatalibova
--

CREATE TABLE hr.departments (
    id integer NOT NULL,
    dept_code character varying,
    dept_name character varying,
    dept_head_id integer,
    location character varying,
    budget numeric,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE hr.departments OWNER TO royatalibova;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: hr; Owner: royatalibova
--

CREATE SEQUENCE hr.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hr.departments_id_seq OWNER TO royatalibova;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: royatalibova
--

ALTER SEQUENCE hr.departments_id_seq OWNED BY hr.departments.id;


--
-- Name: employees; Type: TABLE; Schema: hr; Owner: royatalibova
--

CREATE TABLE hr.employees (
    id integer NOT NULL,
    employee_code character varying,
    full_name character varying,
    "position" character varying,
    department_id integer,
    manager_id integer,
    hire_date date,
    termination_date date,
    monthly_salary numeric,
    email character varying,
    phone character varying,
    birth_date date,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE hr.employees OWNER TO royatalibova;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: hr; Owner: royatalibova
--

CREATE SEQUENCE hr.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hr.employees_id_seq OWNER TO royatalibova;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: royatalibova
--

ALTER SEQUENCE hr.employees_id_seq OWNED BY hr.employees.id;


--
-- Name: leave_requests; Type: TABLE; Schema: hr; Owner: royatalibova
--

CREATE TABLE hr.leave_requests (
    id integer NOT NULL,
    employee_id integer,
    leave_type character varying,
    start_date date,
    end_date date,
    total_days integer,
    status character varying,
    approved_by integer,
    request_date date,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE hr.leave_requests OWNER TO royatalibova;

--
-- Name: leave_requests_id_seq; Type: SEQUENCE; Schema: hr; Owner: royatalibova
--

CREATE SEQUENCE hr.leave_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hr.leave_requests_id_seq OWNER TO royatalibova;

--
-- Name: leave_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: royatalibova
--

ALTER SEQUENCE hr.leave_requests_id_seq OWNED BY hr.leave_requests.id;


--
-- Name: categories; Type: TABLE; Schema: inventory; Owner: royatalibova
--

CREATE TABLE inventory.categories (
    id integer NOT NULL,
    category_code character varying,
    category_name character varying,
    category_description text,
    parent_category_id integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE inventory.categories OWNER TO royatalibova;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: inventory; Owner: royatalibova
--

CREATE SEQUENCE inventory.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventory.categories_id_seq OWNER TO royatalibova;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: inventory; Owner: royatalibova
--

ALTER SEQUENCE inventory.categories_id_seq OWNED BY inventory.categories.id;


--
-- Name: inventory; Type: TABLE; Schema: inventory; Owner: royatalibova
--

CREATE TABLE inventory.inventory (
    id integer NOT NULL,
    product_id integer,
    warehouse_id integer,
    shelf_location character varying,
    batch_number character varying,
    serial_number character varying,
    quantity_on_hand numeric,
    reserved_quantity numeric,
    damaged_quantity numeric,
    last_cost_price numeric,
    last_selling_price numeric,
    expiration_date date,
    received_date date,
    last_count_date date,
    last_updated timestamp without time zone
);


ALTER TABLE inventory.inventory OWNER TO royatalibova;

--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: inventory; Owner: royatalibova
--

CREATE SEQUENCE inventory.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventory.inventory_id_seq OWNER TO royatalibova;

--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: inventory; Owner: royatalibova
--

ALTER SEQUENCE inventory.inventory_id_seq OWNED BY inventory.inventory.id;


--
-- Name: products; Type: TABLE; Schema: inventory; Owner: royatalibova
--

CREATE TABLE inventory.products (
    id integer NOT NULL,
    product_code character varying,
    product_name character varying,
    description text,
    product_type character varying,
    category_id integer,
    unit_id integer,
    weight_kg numeric,
    length_cm numeric,
    width_cm numeric,
    height_cm numeric,
    standard_cost numeric,
    selling_price_local numeric,
    selling_price_export numeric,
    min_stock_qty numeric,
    max_stock_qty numeric,
    reorder_point numeric,
    lead_time_days integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE inventory.products OWNER TO royatalibova;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: inventory; Owner: royatalibova
--

CREATE SEQUENCE inventory.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventory.products_id_seq OWNER TO royatalibova;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: inventory; Owner: royatalibova
--

ALTER SEQUENCE inventory.products_id_seq OWNED BY inventory.products.id;


--
-- Name: warehouses; Type: TABLE; Schema: inventory; Owner: royatalibova
--

CREATE TABLE inventory.warehouses (
    id integer NOT NULL,
    warehouse_code character varying,
    warehouse_name character varying,
    warehouse_type character varying,
    location character varying,
    manager_id integer,
    capacity_m2 numeric,
    capacity_volume numeric,
    temperature_min numeric,
    temperature_max numeric,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE inventory.warehouses OWNER TO royatalibova;

--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: inventory; Owner: royatalibova
--

CREATE SEQUENCE inventory.warehouses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventory.warehouses_id_seq OWNER TO royatalibova;

--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: inventory; Owner: royatalibova
--

ALTER SEQUENCE inventory.warehouses_id_seq OWNED BY inventory.warehouses.id;


--
-- Name: delivery_tracking; Type: TABLE; Schema: logistics; Owner: royatalibova
--

CREATE TABLE logistics.delivery_tracking (
    id integer NOT NULL,
    shipment_id integer,
    tracking_number character varying,
    tracking_date timestamp without time zone,
    tracking_status character varying,
    location character varying,
    latitude numeric,
    longitude numeric,
    location_description text,
    event_description text,
    actual_time timestamp without time zone,
    driver_notes text,
    created_by integer,
    created_at timestamp without time zone
);


ALTER TABLE logistics.delivery_tracking OWNER TO royatalibova;

--
-- Name: delivery_tracking_id_seq; Type: SEQUENCE; Schema: logistics; Owner: royatalibova
--

CREATE SEQUENCE logistics.delivery_tracking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE logistics.delivery_tracking_id_seq OWNER TO royatalibova;

--
-- Name: delivery_tracking_id_seq; Type: SEQUENCE OWNED BY; Schema: logistics; Owner: royatalibova
--

ALTER SEQUENCE logistics.delivery_tracking_id_seq OWNED BY logistics.delivery_tracking.id;


--
-- Name: shipment; Type: TABLE; Schema: logistics; Owner: royatalibova
--

CREATE TABLE logistics.shipment (
    id integer NOT NULL,
    shipment_number character varying,
    shipment_type character varying,
    order_id integer,
    order_type character varying,
    customer_id integer,
    supplier_id integer,
    vehicle_id integer,
    driver_id integer,
    route_id integer,
    shipment_date date,
    planned_delivery_date date,
    actual_delivery_date date,
    pickup_address text,
    delivery_address text,
    total_weight_kg numeric,
    total_volume_m3 numeric,
    total_items integer,
    status character varying,
    priority character varying,
    handling_instructions text,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE logistics.shipment OWNER TO royatalibova;

--
-- Name: shipment_id_seq; Type: SEQUENCE; Schema: logistics; Owner: royatalibova
--

CREATE SEQUENCE logistics.shipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE logistics.shipment_id_seq OWNER TO royatalibova;

--
-- Name: shipment_id_seq; Type: SEQUENCE OWNED BY; Schema: logistics; Owner: royatalibova
--

ALTER SEQUENCE logistics.shipment_id_seq OWNED BY logistics.shipment.id;


--
-- Name: branches; Type: TABLE; Schema: org; Owner: royatalibova
--

CREATE TABLE org.branches (
    id integer NOT NULL,
    branch_code character varying,
    branch_name character varying,
    company_id integer,
    branch_type character varying,
    country character varying,
    city character varying,
    address text,
    phone character varying,
    email character varying,
    manager_id integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE org.branches OWNER TO royatalibova;

--
-- Name: branches_id_seq; Type: SEQUENCE; Schema: org; Owner: royatalibova
--

CREATE SEQUENCE org.branches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE org.branches_id_seq OWNER TO royatalibova;

--
-- Name: branches_id_seq; Type: SEQUENCE OWNED BY; Schema: org; Owner: royatalibova
--

ALTER SEQUENCE org.branches_id_seq OWNED BY org.branches.id;


--
-- Name: companies; Type: TABLE; Schema: org; Owner: royatalibova
--

CREATE TABLE org.companies (
    id integer NOT NULL,
    company_code character varying,
    company_name character varying,
    legal_name character varying,
    tax_id character varying,
    registration_number character varying,
    country character varying,
    city character varying,
    address text,
    phone character varying,
    email character varying,
    website character varying,
    industry character varying,
    founded_date date,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE org.companies OWNER TO royatalibova;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: org; Owner: royatalibova
--

CREATE SEQUENCE org.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE org.companies_id_seq OWNER TO royatalibova;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: org; Owner: royatalibova
--

ALTER SEQUENCE org.companies_id_seq OWNED BY org.companies.id;


--
-- Name: departments; Type: TABLE; Schema: org; Owner: royatalibova
--

CREATE TABLE org.departments (
    id integer NOT NULL,
    dept_code character varying,
    dept_name character varying,
    dept_type character varying,
    parent_dept_id integer,
    branch_id integer,
    manager_id integer,
    budget numeric,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE org.departments OWNER TO royatalibova;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: org; Owner: royatalibova
--

CREATE SEQUENCE org.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE org.departments_id_seq OWNER TO royatalibova;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: org; Owner: royatalibova
--

ALTER SEQUENCE org.departments_id_seq OWNED BY org.departments.id;


--
-- Name: employees; Type: TABLE; Schema: org; Owner: royatalibova
--

CREATE TABLE org.employees (
    id integer NOT NULL,
    employee_code character varying,
    first_name character varying,
    last_name character varying,
    middle_name character varying,
    full_name character varying,
    position_id integer,
    department_id integer,
    branch_id integer,
    manager_id integer,
    company_id integer,
    email character varying,
    phone character varying,
    personal_email character varying,
    birth_date date,
    hire_date date,
    termination_date date,
    employment_type character varying,
    salary numeric,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE org.employees OWNER TO royatalibova;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: org; Owner: royatalibova
--

CREATE SEQUENCE org.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE org.employees_id_seq OWNER TO royatalibova;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: org; Owner: royatalibova
--

ALTER SEQUENCE org.employees_id_seq OWNED BY org.employees.id;


--
-- Name: org_structure; Type: TABLE; Schema: org; Owner: royatalibova
--

CREATE TABLE org.org_structure (
    id integer NOT NULL,
    org_code character varying,
    org_name character varying,
    org_type character varying,
    parent_id integer,
    level integer,
    company_id integer,
    branch_id integer,
    department_id integer,
    manager_id integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE org.org_structure OWNER TO royatalibova;

--
-- Name: org_structure_id_seq; Type: SEQUENCE; Schema: org; Owner: royatalibova
--

CREATE SEQUENCE org.org_structure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE org.org_structure_id_seq OWNER TO royatalibova;

--
-- Name: org_structure_id_seq; Type: SEQUENCE OWNED BY; Schema: org; Owner: royatalibova
--

ALTER SEQUENCE org.org_structure_id_seq OWNED BY org.org_structure.id;


--
-- Name: positions; Type: TABLE; Schema: org; Owner: royatalibova
--

CREATE TABLE org.positions (
    id integer NOT NULL,
    position_code character varying,
    position_name character varying,
    position_level character varying,
    job_description text,
    department_id integer,
    salary_min numeric,
    salary_max numeric,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE org.positions OWNER TO royatalibova;

--
-- Name: positions_id_seq; Type: SEQUENCE; Schema: org; Owner: royatalibova
--

CREATE SEQUENCE org.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE org.positions_id_seq OWNER TO royatalibova;

--
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: org; Owner: royatalibova
--

ALTER SEQUENCE org.positions_id_seq OWNED BY org.positions.id;


--
-- Name: address; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.address (
    id integer NOT NULL,
    partner_id integer,
    address_type character varying,
    address_line1 text,
    address_line2 text,
    country character varying,
    city character varying,
    state character varying,
    postal_code character varying,
    latitude numeric,
    longitude numeric,
    is_primary boolean,
    is_active boolean,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.address OWNER TO royatalibova;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.address_id_seq OWNER TO royatalibova;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.address_id_seq OWNED BY partner.address.id;


--
-- Name: bank_account; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.bank_account (
    id integer NOT NULL,
    partner_id integer,
    account_number character varying,
    iban character varying,
    swift_bic character varying,
    bank_name character varying,
    bank_address text,
    account_holder_name character varying,
    account_type character varying,
    currency character varying,
    is_default boolean,
    is_active boolean,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.bank_account OWNER TO royatalibova;

--
-- Name: bank_account_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.bank_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.bank_account_id_seq OWNER TO royatalibova;

--
-- Name: bank_account_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.bank_account_id_seq OWNED BY partner.bank_account.id;


--
-- Name: contact_person; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.contact_person (
    id integer NOT NULL,
    partner_id integer,
    full_name character varying,
    "position" character varying,
    department character varying,
    email character varying,
    phone character varying,
    mobile character varying,
    whatsapp character varying,
    telegram character varying,
    linkedin character varying,
    is_primary boolean,
    is_decision_maker boolean,
    can_approve_orders boolean,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.contact_person OWNER TO royatalibova;

--
-- Name: contact_person_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.contact_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.contact_person_id_seq OWNER TO royatalibova;

--
-- Name: contact_person_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.contact_person_id_seq OWNED BY partner.contact_person.id;


--
-- Name: contract; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.contract (
    id integer NOT NULL,
    contract_number character varying,
    partner_id integer,
    contract_name character varying,
    contract_type character varying,
    start_date date,
    end_date date,
    renewal_date date,
    total_value numeric,
    currency character varying,
    payment_terms character varying,
    delivery_terms character varying,
    incoterms character varying,
    status character varying,
    signed_by_partner integer,
    signed_by_company integer,
    signed_date date,
    document_url text,
    special_conditions text,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.contract OWNER TO royatalibova;

--
-- Name: contract_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.contract_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.contract_id_seq OWNER TO royatalibova;

--
-- Name: contract_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.contract_id_seq OWNED BY partner.contract.id;


--
-- Name: partner; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.partner (
    id integer NOT NULL,
    partner_code character varying,
    partner_name character varying,
    legal_name character varying,
    trade_name character varying,
    type_id integer,
    category_id integer,
    tax_id character varying,
    registration_number character varying,
    registration_date date,
    country character varying,
    city character varying,
    address text,
    postal_code character varying,
    phone character varying,
    email character varying,
    website character varying,
    industry character varying,
    employee_count integer,
    annual_revenue numeric,
    currency character varying,
    payment_terms character varying,
    credit_limit numeric,
    status character varying,
    customer_segment character varying,
    sales_rep_id integer,
    account_manager_id integer,
    preferred_contact_method character varying,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.partner OWNER TO royatalibova;

--
-- Name: partner_activity_log; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.partner_activity_log (
    id integer NOT NULL,
    partner_id integer,
    activity_type character varying,
    activity_date timestamp without time zone,
    subject character varying,
    description text,
    performed_by integer,
    duration_minutes integer,
    outcome character varying,
    next_action_date date,
    next_action_description text,
    attached_documents text[],
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE partner.partner_activity_log OWNER TO royatalibova;

--
-- Name: partner_activity_log_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.partner_activity_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.partner_activity_log_id_seq OWNER TO royatalibova;

--
-- Name: partner_activity_log_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.partner_activity_log_id_seq OWNED BY partner.partner_activity_log.id;


--
-- Name: partner_category; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.partner_category (
    id integer NOT NULL,
    category_code character varying,
    category_name character varying,
    category_description text,
    parent_category_id integer,
    priority_level integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.partner_category OWNER TO royatalibova;

--
-- Name: partner_category_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.partner_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.partner_category_id_seq OWNER TO royatalibova;

--
-- Name: partner_category_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.partner_category_id_seq OWNED BY partner.partner_category.id;


--
-- Name: partner_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.partner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.partner_id_seq OWNER TO royatalibova;

--
-- Name: partner_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.partner_id_seq OWNED BY partner.partner.id;


--
-- Name: partner_rating; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.partner_rating (
    id integer NOT NULL,
    partner_id integer,
    rating_date date,
    overall_rating numeric,
    criteria jsonb,
    reviewer_id integer,
    reviewer_notes text,
    status character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.partner_rating OWNER TO royatalibova;

--
-- Name: partner_rating_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.partner_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.partner_rating_id_seq OWNER TO royatalibova;

--
-- Name: partner_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.partner_rating_id_seq OWNED BY partner.partner_rating.id;


--
-- Name: partner_type; Type: TABLE; Schema: partner; Owner: royatalibova
--

CREATE TABLE partner.partner_type (
    id integer NOT NULL,
    type_code character varying,
    type_name character varying,
    type_description text,
    category character varying,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE partner.partner_type OWNER TO royatalibova;

--
-- Name: partner_type_id_seq; Type: SEQUENCE; Schema: partner; Owner: royatalibova
--

CREATE SEQUENCE partner.partner_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE partner.partner_type_id_seq OWNER TO royatalibova;

--
-- Name: partner_type_id_seq; Type: SEQUENCE OWNED BY; Schema: partner; Owner: royatalibova
--

ALTER SEQUENCE partner.partner_type_id_seq OWNED BY partner.partner_type.id;


--
-- Name: batches; Type: TABLE; Schema: production; Owner: royatalibova
--

CREATE TABLE production.batches (
    id integer NOT NULL,
    batch_number character varying,
    production_order_id integer,
    batch_date date,
    planned_quantity numeric,
    actual_quantity numeric,
    rejected_quantity numeric,
    supervisor_id integer,
    status character varying,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE production.batches OWNER TO royatalibova;

--
-- Name: batches_id_seq; Type: SEQUENCE; Schema: production; Owner: royatalibova
--

CREATE SEQUENCE production.batches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.batches_id_seq OWNER TO royatalibova;

--
-- Name: batches_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: royatalibova
--

ALTER SEQUENCE production.batches_id_seq OWNED BY production.batches.id;


--
-- Name: production_orders; Type: TABLE; Schema: production; Owner: royatalibova
--

CREATE TABLE production.production_orders (
    id integer NOT NULL,
    order_number character varying,
    product_id integer,
    recipe_id integer,
    planned_quantity numeric,
    produced_quantity numeric,
    rejected_quantity numeric,
    start_date date,
    end_date date,
    status character varying,
    priority integer,
    created_by integer,
    approved_by integer,
    sales_order_id integer,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE production.production_orders OWNER TO royatalibova;

--
-- Name: production_orders_id_seq; Type: SEQUENCE; Schema: production; Owner: royatalibova
--

CREATE SEQUENCE production.production_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.production_orders_id_seq OWNER TO royatalibova;

--
-- Name: production_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: royatalibova
--

ALTER SEQUENCE production.production_orders_id_seq OWNED BY production.production_orders.id;


--
-- Name: recipes; Type: TABLE; Schema: production; Owner: royatalibova
--

CREATE TABLE production.recipes (
    id integer NOT NULL,
    product_id integer,
    component_id integer,
    quantity_per_unit numeric,
    waste_percent numeric,
    scrap_percent numeric,
    is_critical boolean,
    alternative_component_id integer,
    valid_from date,
    valid_to date,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE production.recipes OWNER TO royatalibova;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: production; Owner: royatalibova
--

CREATE SEQUENCE production.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.recipes_id_seq OWNER TO royatalibova;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: royatalibova
--

ALTER SEQUENCE production.recipes_id_seq OWNED BY production.recipes.id;


--
-- Name: order_lines; Type: TABLE; Schema: purchase; Owner: royatalibova
--

CREATE TABLE purchase.order_lines (
    id integer NOT NULL,
    po_id integer,
    line_number integer,
    product_id integer,
    product_name character varying,
    product_code character varying,
    ordered_qty numeric,
    received_qty numeric,
    unit_price numeric,
    discount_percent numeric,
    line_total numeric,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE purchase.order_lines OWNER TO royatalibova;

--
-- Name: order_lines_id_seq; Type: SEQUENCE; Schema: purchase; Owner: royatalibova
--

CREATE SEQUENCE purchase.order_lines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE purchase.order_lines_id_seq OWNER TO royatalibova;

--
-- Name: order_lines_id_seq; Type: SEQUENCE OWNED BY; Schema: purchase; Owner: royatalibova
--

ALTER SEQUENCE purchase.order_lines_id_seq OWNED BY purchase.order_lines.id;


--
-- Name: orders; Type: TABLE; Schema: purchase; Owner: royatalibova
--

CREATE TABLE purchase.orders (
    id integer NOT NULL,
    po_number character varying,
    supplier_id integer,
    order_date date,
    delivery_date date,
    total_amount numeric,
    currency character varying,
    status character varying,
    created_by integer,
    approved_by integer,
    shipping_address text,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE purchase.orders OWNER TO royatalibova;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: purchase; Owner: royatalibova
--

CREATE SEQUENCE purchase.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE purchase.orders_id_seq OWNER TO royatalibova;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: purchase; Owner: royatalibova
--

ALTER SEQUENCE purchase.orders_id_seq OWNED BY purchase.orders.id;


--
-- Name: supplier_contacts; Type: TABLE; Schema: purchase; Owner: royatalibova
--

CREATE TABLE purchase.supplier_contacts (
    id integer NOT NULL,
    supplier_id integer,
    full_name character varying,
    "position" character varying,
    email character varying,
    phone character varying,
    mobile character varying,
    is_primary boolean,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE purchase.supplier_contacts OWNER TO royatalibova;

--
-- Name: supplier_contacts_id_seq; Type: SEQUENCE; Schema: purchase; Owner: royatalibova
--

CREATE SEQUENCE purchase.supplier_contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE purchase.supplier_contacts_id_seq OWNER TO royatalibova;

--
-- Name: supplier_contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: purchase; Owner: royatalibova
--

ALTER SEQUENCE purchase.supplier_contacts_id_seq OWNED BY purchase.supplier_contacts.id;


--
-- Name: suppliers; Type: TABLE; Schema: purchase; Owner: royatalibova
--

CREATE TABLE purchase.suppliers (
    id integer NOT NULL,
    supplier_code character varying,
    company_name character varying,
    tax_id character varying,
    country character varying,
    city character varying,
    address text,
    postal_code character varying,
    website character varying,
    payment_terms character varying,
    currency character varying,
    rating integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE purchase.suppliers OWNER TO royatalibova;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: purchase; Owner: royatalibova
--

CREATE SEQUENCE purchase.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE purchase.suppliers_id_seq OWNER TO royatalibova;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: purchase; Owner: royatalibova
--

ALTER SEQUENCE purchase.suppliers_id_seq OWNED BY purchase.suppliers.id;


--
-- Name: quality_audit; Type: TABLE; Schema: quality; Owner: royatalibova
--

CREATE TABLE quality.quality_audit (
    id integer NOT NULL,
    audit_number character varying,
    audit_name character varying,
    audit_type character varying,
    audit_scope text,
    standard_id integer,
    audit_lead integer,
    audit_team text[],
    audit_date date,
    start_date date,
    end_date date,
    location character varying,
    findings text,
    non_conformances text,
    observations text,
    overall_rating numeric,
    status character varying,
    report_url text,
    corrective_actions text,
    follow_up_date date,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE quality.quality_audit OWNER TO royatalibova;

--
-- Name: quality_audit_id_seq; Type: SEQUENCE; Schema: quality; Owner: royatalibova
--

CREATE SEQUENCE quality.quality_audit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE quality.quality_audit_id_seq OWNER TO royatalibova;

--
-- Name: quality_audit_id_seq; Type: SEQUENCE OWNED BY; Schema: quality; Owner: royatalibova
--

ALTER SEQUENCE quality.quality_audit_id_seq OWNED BY quality.quality_audit.id;


--
-- Name: quality_certificate; Type: TABLE; Schema: quality; Owner: royatalibova
--

CREATE TABLE quality.quality_certificate (
    id integer NOT NULL,
    certificate_number character varying,
    certificate_name character varying,
    standard_id integer,
    product_id integer,
    batch_number character varying,
    issue_date date,
    expiry_date date,
    issued_by character varying,
    issued_to character varying,
    certificate_type character varying,
    status character varying,
    document_url text,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE quality.quality_certificate OWNER TO royatalibova;

--
-- Name: quality_certificate_id_seq; Type: SEQUENCE; Schema: quality; Owner: royatalibova
--

CREATE SEQUENCE quality.quality_certificate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE quality.quality_certificate_id_seq OWNER TO royatalibova;

--
-- Name: quality_certificate_id_seq; Type: SEQUENCE OWNED BY; Schema: quality; Owner: royatalibova
--

ALTER SEQUENCE quality.quality_certificate_id_seq OWNED BY quality.quality_certificate.id;


--
-- Name: quality_control_plan; Type: TABLE; Schema: quality; Owner: royatalibova
--

CREATE TABLE quality.quality_control_plan (
    id integer NOT NULL,
    plan_code character varying,
    plan_name character varying,
    plan_description text,
    product_id integer,
    product_category_id integer,
    plan_type character varying,
    frequency character varying,
    sample_size integer,
    acceptance_criteria text,
    rejection_criteria text,
    responsible_department_id integer,
    approved_by integer,
    approval_date date,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE quality.quality_control_plan OWNER TO royatalibova;

--
-- Name: quality_control_plan_id_seq; Type: SEQUENCE; Schema: quality; Owner: royatalibova
--

CREATE SEQUENCE quality.quality_control_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE quality.quality_control_plan_id_seq OWNER TO royatalibova;

--
-- Name: quality_control_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: quality; Owner: royatalibova
--

ALTER SEQUENCE quality.quality_control_plan_id_seq OWNED BY quality.quality_control_plan.id;


--
-- Name: quality_inspection; Type: TABLE; Schema: quality; Owner: royatalibova
--

CREATE TABLE quality.quality_inspection (
    id integer NOT NULL,
    inspection_number character varying,
    control_plan_id integer,
    inspection_type character varying,
    product_id integer,
    batch_number character varying,
    order_id integer,
    order_type character varying,
    inspection_date date,
    inspector_id integer,
    sample_size integer,
    accepted_qty numeric,
    rejected_qty numeric,
    status character varying,
    overall_result character varying,
    report_url text,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE quality.quality_inspection OWNER TO royatalibova;

--
-- Name: quality_inspection_id_seq; Type: SEQUENCE; Schema: quality; Owner: royatalibova
--

CREATE SEQUENCE quality.quality_inspection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE quality.quality_inspection_id_seq OWNER TO royatalibova;

--
-- Name: quality_inspection_id_seq; Type: SEQUENCE OWNED BY; Schema: quality; Owner: royatalibova
--

ALTER SEQUENCE quality.quality_inspection_id_seq OWNED BY quality.quality_inspection.id;


--
-- Name: customers; Type: TABLE; Schema: sales; Owner: royatalibova
--

CREATE TABLE sales.customers (
    id integer NOT NULL,
    customer_code character varying,
    company_name character varying,
    tax_id character varying,
    country character varying,
    city character varying,
    address text,
    postal_code character varying,
    website character varying,
    industry character varying,
    payment_terms character varying,
    credit_limit numeric,
    currency character varying,
    customer_segment character varying,
    sales_rep_id integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE sales.customers OWNER TO royatalibova;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: sales; Owner: royatalibova
--

CREATE SEQUENCE sales.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE sales.customers_id_seq OWNER TO royatalibova;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: royatalibova
--

ALTER SEQUENCE sales.customers_id_seq OWNED BY sales.customers.id;


--
-- Name: invoices; Type: TABLE; Schema: sales; Owner: royatalibova
--

CREATE TABLE sales.invoices (
    id integer NOT NULL,
    invoice_number character varying,
    order_id integer,
    customer_id integer,
    invoice_date date,
    due_date date,
    total_amount numeric,
    paid_amount numeric,
    currency character varying,
    status character varying,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE sales.invoices OWNER TO royatalibova;

--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: sales; Owner: royatalibova
--

CREATE SEQUENCE sales.invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE sales.invoices_id_seq OWNER TO royatalibova;

--
-- Name: invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: royatalibova
--

ALTER SEQUENCE sales.invoices_id_seq OWNED BY sales.invoices.id;


--
-- Name: audit_log; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.audit_log (
    id integer NOT NULL,
    user_id integer,
    username character varying,
    action character varying,
    resource character varying,
    resource_id character varying,
    module character varying,
    ip_address character varying,
    user_agent text,
    old_values jsonb,
    new_values jsonb,
    additional_info jsonb,
    status character varying,
    created_at timestamp without time zone
);


ALTER TABLE system.audit_log OWNER TO royatalibova;

--
-- Name: audit_log_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.audit_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.audit_log_id_seq OWNER TO royatalibova;

--
-- Name: audit_log_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.audit_log_id_seq OWNED BY system.audit_log.id;


--
-- Name: backup_log; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.backup_log (
    id integer NOT NULL,
    backup_id character varying,
    backup_type character varying,
    backup_method character varying,
    backup_location text,
    backup_size_bytes bigint,
    duration_seconds integer,
    status character varying,
    started_by integer,
    completed_by integer,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    error_message text,
    notes text,
    created_at timestamp without time zone
);


ALTER TABLE system.backup_log OWNER TO royatalibova;

--
-- Name: backup_log_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.backup_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.backup_log_id_seq OWNER TO royatalibova;

--
-- Name: backup_log_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.backup_log_id_seq OWNED BY system.backup_log.id;


--
-- Name: error_log; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.error_log (
    id integer NOT NULL,
    error_code character varying,
    error_type character varying,
    severity character varying,
    module character varying,
    method character varying,
    url character varying,
    ip_address character varying,
    user_id integer,
    username character varying,
    error_message text,
    stack_trace text,
    request_data jsonb,
    response_data jsonb,
    resolved boolean,
    resolved_at timestamp without time zone,
    resolved_by integer,
    resolution_note text,
    created_at timestamp without time zone
);


ALTER TABLE system.error_log OWNER TO royatalibova;

--
-- Name: error_log_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.error_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.error_log_id_seq OWNER TO royatalibova;

--
-- Name: error_log_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.error_log_id_seq OWNED BY system.error_log.id;


--
-- Name: login_history; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.login_history (
    id integer NOT NULL,
    user_id integer,
    username character varying,
    login_time timestamp without time zone,
    logout_time timestamp without time zone,
    ip_address character varying,
    user_agent text,
    login_method character varying,
    session_id character varying,
    is_successful boolean,
    failure_reason text,
    created_at timestamp without time zone
);


ALTER TABLE system.login_history OWNER TO royatalibova;

--
-- Name: login_history_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.login_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.login_history_id_seq OWNER TO royatalibova;

--
-- Name: login_history_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.login_history_id_seq OWNED BY system.login_history.id;


--
-- Name: notification; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.notification (
    id integer NOT NULL,
    user_id integer,
    notification_type character varying,
    title character varying,
    message text,
    link character varying,
    priority character varying,
    is_read boolean,
    read_at timestamp without time zone,
    is_dismissed boolean,
    dismissed_at timestamp without time zone,
    created_by integer,
    expires_at timestamp without time zone,
    created_at timestamp without time zone
);


ALTER TABLE system.notification OWNER TO royatalibova;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.notification_id_seq OWNER TO royatalibova;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.notification_id_seq OWNED BY system.notification.id;


--
-- Name: permission; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.permission (
    id integer NOT NULL,
    permission_code character varying,
    permission_name character varying,
    permission_description text,
    resource character varying,
    action character varying,
    module character varying,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE system.permission OWNER TO royatalibova;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.permission_id_seq OWNER TO royatalibova;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.permission_id_seq OWNED BY system.permission.id;


--
-- Name: role_permission; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.role_permission (
    id integer NOT NULL,
    role_id integer,
    permission_id integer,
    is_granted boolean,
    created_at timestamp without time zone
);


ALTER TABLE system.role_permission OWNER TO royatalibova;

--
-- Name: role_permission_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.role_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.role_permission_id_seq OWNER TO royatalibova;

--
-- Name: role_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.role_permission_id_seq OWNED BY system.role_permission.id;


--
-- Name: system_config; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.system_config (
    id integer NOT NULL,
    config_key character varying,
    config_value text,
    config_type character varying,
    config_group character varying,
    is_encrypted boolean,
    description text,
    created_by integer,
    updated_by integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE system.system_config OWNER TO royatalibova;

--
-- Name: system_config_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.system_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.system_config_id_seq OWNER TO royatalibova;

--
-- Name: system_config_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.system_config_id_seq OWNED BY system.system_config.id;


--
-- Name: user; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system."user" (
    id integer NOT NULL,
    username character varying,
    password_hash character varying,
    email character varying,
    full_name character varying,
    employee_id integer,
    role_id integer,
    language character varying,
    timezone character varying,
    last_login timestamp without time zone,
    last_ip character varying,
    failed_attempts integer,
    is_locked boolean,
    lock_reason text,
    is_active boolean,
    must_change_password boolean,
    last_password_change date,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE system."user" OWNER TO royatalibova;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.user_id_seq OWNER TO royatalibova;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.user_id_seq OWNED BY system."user".id;


--
-- Name: user_role; Type: TABLE; Schema: system; Owner: royatalibova
--

CREATE TABLE system.user_role (
    id integer NOT NULL,
    role_code character varying,
    role_name character varying,
    role_description text,
    role_level integer,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE system.user_role OWNER TO royatalibova;

--
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: system; Owner: royatalibova
--

CREATE SEQUENCE system.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.user_role_id_seq OWNER TO royatalibova;

--
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: royatalibova
--

ALTER SEQUENCE system.user_role_id_seq OWNED BY system.user_role.id;


--
-- Name: export_order; Type: TABLE; Schema: trade; Owner: royatalibova
--

CREATE TABLE trade.export_order (
    id integer NOT NULL,
    export_number character varying,
    contract_id integer,
    customer_id integer,
    customer_name character varying,
    customer_country character varying,
    order_date date,
    expected_delivery date,
    actual_delivery date,
    total_amount numeric,
    currency character varying,
    status character varying,
    shipping_method character varying,
    port_of_loading character varying,
    port_of_discharge character varying,
    incoterms character varying,
    responsible_employee_id integer,
    approved_by integer,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE trade.export_order OWNER TO royatalibova;

--
-- Name: export_order_id_seq; Type: SEQUENCE; Schema: trade; Owner: royatalibova
--

CREATE SEQUENCE trade.export_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE trade.export_order_id_seq OWNER TO royatalibova;

--
-- Name: export_order_id_seq; Type: SEQUENCE OWNED BY; Schema: trade; Owner: royatalibova
--

ALTER SEQUENCE trade.export_order_id_seq OWNED BY trade.export_order.id;


--
-- Name: import_order; Type: TABLE; Schema: trade; Owner: royatalibova
--

CREATE TABLE trade.import_order (
    id integer NOT NULL,
    import_number character varying,
    contract_id integer,
    supplier_id integer,
    supplier_name character varying,
    supplier_country character varying,
    order_date date,
    expected_delivery date,
    actual_delivery date,
    total_amount numeric,
    currency character varying,
    status character varying,
    shipping_method character varying,
    port_of_loading character varying,
    port_of_discharge character varying,
    incoterms character varying,
    responsible_employee_id integer,
    approved_by integer,
    notes text,
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE trade.import_order OWNER TO royatalibova;

--
-- Name: import_order_id_seq; Type: SEQUENCE; Schema: trade; Owner: royatalibova
--

CREATE SEQUENCE trade.import_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE trade.import_order_id_seq OWNER TO royatalibova;

--
-- Name: import_order_id_seq; Type: SEQUENCE OWNED BY; Schema: trade; Owner: royatalibova
--

ALTER SEQUENCE trade.import_order_id_seq OWNED BY trade.import_order.id;


--
-- Name: asset id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.asset ALTER COLUMN id SET DEFAULT nextval('asset.asset_id_seq'::regclass);


--
-- Name: asset_category id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.asset_category ALTER COLUMN id SET DEFAULT nextval('asset.asset_category_id_seq'::regclass);


--
-- Name: maintenance_history id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.maintenance_history ALTER COLUMN id SET DEFAULT nextval('asset.maintenance_history_id_seq'::regclass);


--
-- Name: maintenance_schedule id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.maintenance_schedule ALTER COLUMN id SET DEFAULT nextval('asset.maintenance_schedule_id_seq'::regclass);


--
-- Name: maintenance_task id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.maintenance_task ALTER COLUMN id SET DEFAULT nextval('asset.maintenance_task_id_seq'::regclass);


--
-- Name: spare_part id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.spare_part ALTER COLUMN id SET DEFAULT nextval('asset.spare_part_id_seq'::regclass);


--
-- Name: spare_part_usage id; Type: DEFAULT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.spare_part_usage ALTER COLUMN id SET DEFAULT nextval('asset.spare_part_usage_id_seq'::regclass);


--
-- Name: budgets id; Type: DEFAULT; Schema: finance; Owner: royatalibova
--

ALTER TABLE ONLY finance.budgets ALTER COLUMN id SET DEFAULT nextval('finance.budgets_id_seq'::regclass);


--
-- Name: chart_of_accounts id; Type: DEFAULT; Schema: finance; Owner: royatalibova
--

ALTER TABLE ONLY finance.chart_of_accounts ALTER COLUMN id SET DEFAULT nextval('finance.chart_of_accounts_id_seq'::regclass);


--
-- Name: general_ledger id; Type: DEFAULT; Schema: finance; Owner: royatalibova
--

ALTER TABLE ONLY finance.general_ledger ALTER COLUMN id SET DEFAULT nextval('finance.general_ledger_id_seq'::regclass);


--
-- Name: attendance id; Type: DEFAULT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.attendance ALTER COLUMN id SET DEFAULT nextval('hr.attendance_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.departments ALTER COLUMN id SET DEFAULT nextval('hr.departments_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.employees ALTER COLUMN id SET DEFAULT nextval('hr.employees_id_seq'::regclass);


--
-- Name: leave_requests id; Type: DEFAULT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.leave_requests ALTER COLUMN id SET DEFAULT nextval('hr.leave_requests_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.categories ALTER COLUMN id SET DEFAULT nextval('inventory.categories_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.inventory ALTER COLUMN id SET DEFAULT nextval('inventory.inventory_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.products ALTER COLUMN id SET DEFAULT nextval('inventory.products_id_seq'::regclass);


--
-- Name: warehouses id; Type: DEFAULT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.warehouses ALTER COLUMN id SET DEFAULT nextval('inventory.warehouses_id_seq'::regclass);


--
-- Name: delivery_tracking id; Type: DEFAULT; Schema: logistics; Owner: royatalibova
--

ALTER TABLE ONLY logistics.delivery_tracking ALTER COLUMN id SET DEFAULT nextval('logistics.delivery_tracking_id_seq'::regclass);


--
-- Name: shipment id; Type: DEFAULT; Schema: logistics; Owner: royatalibova
--

ALTER TABLE ONLY logistics.shipment ALTER COLUMN id SET DEFAULT nextval('logistics.shipment_id_seq'::regclass);


--
-- Name: branches id; Type: DEFAULT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.branches ALTER COLUMN id SET DEFAULT nextval('org.branches_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.companies ALTER COLUMN id SET DEFAULT nextval('org.companies_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.departments ALTER COLUMN id SET DEFAULT nextval('org.departments_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.employees ALTER COLUMN id SET DEFAULT nextval('org.employees_id_seq'::regclass);


--
-- Name: org_structure id; Type: DEFAULT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.org_structure ALTER COLUMN id SET DEFAULT nextval('org.org_structure_id_seq'::regclass);


--
-- Name: positions id; Type: DEFAULT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.positions ALTER COLUMN id SET DEFAULT nextval('org.positions_id_seq'::regclass);


--
-- Name: address id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.address ALTER COLUMN id SET DEFAULT nextval('partner.address_id_seq'::regclass);


--
-- Name: bank_account id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.bank_account ALTER COLUMN id SET DEFAULT nextval('partner.bank_account_id_seq'::regclass);


--
-- Name: contact_person id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.contact_person ALTER COLUMN id SET DEFAULT nextval('partner.contact_person_id_seq'::regclass);


--
-- Name: contract id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.contract ALTER COLUMN id SET DEFAULT nextval('partner.contract_id_seq'::regclass);


--
-- Name: partner id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner ALTER COLUMN id SET DEFAULT nextval('partner.partner_id_seq'::regclass);


--
-- Name: partner_activity_log id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_activity_log ALTER COLUMN id SET DEFAULT nextval('partner.partner_activity_log_id_seq'::regclass);


--
-- Name: partner_category id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_category ALTER COLUMN id SET DEFAULT nextval('partner.partner_category_id_seq'::regclass);


--
-- Name: partner_rating id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_rating ALTER COLUMN id SET DEFAULT nextval('partner.partner_rating_id_seq'::regclass);


--
-- Name: partner_type id; Type: DEFAULT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_type ALTER COLUMN id SET DEFAULT nextval('partner.partner_type_id_seq'::regclass);


--
-- Name: batches id; Type: DEFAULT; Schema: production; Owner: royatalibova
--

ALTER TABLE ONLY production.batches ALTER COLUMN id SET DEFAULT nextval('production.batches_id_seq'::regclass);


--
-- Name: production_orders id; Type: DEFAULT; Schema: production; Owner: royatalibova
--

ALTER TABLE ONLY production.production_orders ALTER COLUMN id SET DEFAULT nextval('production.production_orders_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: production; Owner: royatalibova
--

ALTER TABLE ONLY production.recipes ALTER COLUMN id SET DEFAULT nextval('production.recipes_id_seq'::regclass);


--
-- Name: order_lines id; Type: DEFAULT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.order_lines ALTER COLUMN id SET DEFAULT nextval('purchase.order_lines_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.orders ALTER COLUMN id SET DEFAULT nextval('purchase.orders_id_seq'::regclass);


--
-- Name: supplier_contacts id; Type: DEFAULT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.supplier_contacts ALTER COLUMN id SET DEFAULT nextval('purchase.supplier_contacts_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.suppliers ALTER COLUMN id SET DEFAULT nextval('purchase.suppliers_id_seq'::regclass);


--
-- Name: quality_audit id; Type: DEFAULT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_audit ALTER COLUMN id SET DEFAULT nextval('quality.quality_audit_id_seq'::regclass);


--
-- Name: quality_certificate id; Type: DEFAULT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_certificate ALTER COLUMN id SET DEFAULT nextval('quality.quality_certificate_id_seq'::regclass);


--
-- Name: quality_control_plan id; Type: DEFAULT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_control_plan ALTER COLUMN id SET DEFAULT nextval('quality.quality_control_plan_id_seq'::regclass);


--
-- Name: quality_inspection id; Type: DEFAULT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_inspection ALTER COLUMN id SET DEFAULT nextval('quality.quality_inspection_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: sales; Owner: royatalibova
--

ALTER TABLE ONLY sales.customers ALTER COLUMN id SET DEFAULT nextval('sales.customers_id_seq'::regclass);


--
-- Name: invoices id; Type: DEFAULT; Schema: sales; Owner: royatalibova
--

ALTER TABLE ONLY sales.invoices ALTER COLUMN id SET DEFAULT nextval('sales.invoices_id_seq'::regclass);


--
-- Name: audit_log id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.audit_log ALTER COLUMN id SET DEFAULT nextval('system.audit_log_id_seq'::regclass);


--
-- Name: backup_log id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.backup_log ALTER COLUMN id SET DEFAULT nextval('system.backup_log_id_seq'::regclass);


--
-- Name: error_log id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.error_log ALTER COLUMN id SET DEFAULT nextval('system.error_log_id_seq'::regclass);


--
-- Name: login_history id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.login_history ALTER COLUMN id SET DEFAULT nextval('system.login_history_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.notification ALTER COLUMN id SET DEFAULT nextval('system.notification_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.permission ALTER COLUMN id SET DEFAULT nextval('system.permission_id_seq'::regclass);


--
-- Name: role_permission id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.role_permission ALTER COLUMN id SET DEFAULT nextval('system.role_permission_id_seq'::regclass);


--
-- Name: system_config id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.system_config ALTER COLUMN id SET DEFAULT nextval('system.system_config_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system."user" ALTER COLUMN id SET DEFAULT nextval('system.user_id_seq'::regclass);


--
-- Name: user_role id; Type: DEFAULT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.user_role ALTER COLUMN id SET DEFAULT nextval('system.user_role_id_seq'::regclass);


--
-- Name: export_order id; Type: DEFAULT; Schema: trade; Owner: royatalibova
--

ALTER TABLE ONLY trade.export_order ALTER COLUMN id SET DEFAULT nextval('trade.export_order_id_seq'::regclass);


--
-- Name: import_order id; Type: DEFAULT; Schema: trade; Owner: royatalibova
--

ALTER TABLE ONLY trade.import_order ALTER COLUMN id SET DEFAULT nextval('trade.import_order_id_seq'::regclass);


--
-- Name: asset_category asset_category_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.asset_category
    ADD CONSTRAINT asset_category_pkey PRIMARY KEY (id);


--
-- Name: asset asset_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.asset
    ADD CONSTRAINT asset_pkey PRIMARY KEY (id);


--
-- Name: maintenance_history maintenance_history_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.maintenance_history
    ADD CONSTRAINT maintenance_history_pkey PRIMARY KEY (id);


--
-- Name: maintenance_schedule maintenance_schedule_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.maintenance_schedule
    ADD CONSTRAINT maintenance_schedule_pkey PRIMARY KEY (id);


--
-- Name: maintenance_task maintenance_task_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.maintenance_task
    ADD CONSTRAINT maintenance_task_pkey PRIMARY KEY (id);


--
-- Name: spare_part spare_part_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.spare_part
    ADD CONSTRAINT spare_part_pkey PRIMARY KEY (id);


--
-- Name: spare_part_usage spare_part_usage_pkey; Type: CONSTRAINT; Schema: asset; Owner: royatalibova
--

ALTER TABLE ONLY asset.spare_part_usage
    ADD CONSTRAINT spare_part_usage_pkey PRIMARY KEY (id);


--
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: finance; Owner: royatalibova
--

ALTER TABLE ONLY finance.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: chart_of_accounts chart_of_accounts_pkey; Type: CONSTRAINT; Schema: finance; Owner: royatalibova
--

ALTER TABLE ONLY finance.chart_of_accounts
    ADD CONSTRAINT chart_of_accounts_pkey PRIMARY KEY (id);


--
-- Name: general_ledger general_ledger_pkey; Type: CONSTRAINT; Schema: finance; Owner: royatalibova
--

ALTER TABLE ONLY finance.general_ledger
    ADD CONSTRAINT general_ledger_pkey PRIMARY KEY (id);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: leave_requests leave_requests_pkey; Type: CONSTRAINT; Schema: hr; Owner: royatalibova
--

ALTER TABLE ONLY hr.leave_requests
    ADD CONSTRAINT leave_requests_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: inventory; Owner: royatalibova
--

ALTER TABLE ONLY inventory.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (id);


--
-- Name: delivery_tracking delivery_tracking_pkey; Type: CONSTRAINT; Schema: logistics; Owner: royatalibova
--

ALTER TABLE ONLY logistics.delivery_tracking
    ADD CONSTRAINT delivery_tracking_pkey PRIMARY KEY (id);


--
-- Name: shipment shipment_pkey; Type: CONSTRAINT; Schema: logistics; Owner: royatalibova
--

ALTER TABLE ONLY logistics.shipment
    ADD CONSTRAINT shipment_pkey PRIMARY KEY (id);


--
-- Name: branches branches_pkey; Type: CONSTRAINT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: org_structure org_structure_pkey; Type: CONSTRAINT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.org_structure
    ADD CONSTRAINT org_structure_pkey PRIMARY KEY (id);


--
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: org; Owner: royatalibova
--

ALTER TABLE ONLY org.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: bank_account bank_account_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.bank_account
    ADD CONSTRAINT bank_account_pkey PRIMARY KEY (id);


--
-- Name: contact_person contact_person_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.contact_person
    ADD CONSTRAINT contact_person_pkey PRIMARY KEY (id);


--
-- Name: contract contract_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.contract
    ADD CONSTRAINT contract_pkey PRIMARY KEY (id);


--
-- Name: partner_activity_log partner_activity_log_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_activity_log
    ADD CONSTRAINT partner_activity_log_pkey PRIMARY KEY (id);


--
-- Name: partner_category partner_category_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_category
    ADD CONSTRAINT partner_category_pkey PRIMARY KEY (id);


--
-- Name: partner partner_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner
    ADD CONSTRAINT partner_pkey PRIMARY KEY (id);


--
-- Name: partner_rating partner_rating_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_rating
    ADD CONSTRAINT partner_rating_pkey PRIMARY KEY (id);


--
-- Name: partner_type partner_type_pkey; Type: CONSTRAINT; Schema: partner; Owner: royatalibova
--

ALTER TABLE ONLY partner.partner_type
    ADD CONSTRAINT partner_type_pkey PRIMARY KEY (id);


--
-- Name: batches batches_pkey; Type: CONSTRAINT; Schema: production; Owner: royatalibova
--

ALTER TABLE ONLY production.batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (id);


--
-- Name: production_orders production_orders_pkey; Type: CONSTRAINT; Schema: production; Owner: royatalibova
--

ALTER TABLE ONLY production.production_orders
    ADD CONSTRAINT production_orders_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: production; Owner: royatalibova
--

ALTER TABLE ONLY production.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: order_lines order_lines_pkey; Type: CONSTRAINT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.order_lines
    ADD CONSTRAINT order_lines_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: supplier_contacts supplier_contacts_pkey; Type: CONSTRAINT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.supplier_contacts
    ADD CONSTRAINT supplier_contacts_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: purchase; Owner: royatalibova
--

ALTER TABLE ONLY purchase.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: quality_audit quality_audit_pkey; Type: CONSTRAINT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_audit
    ADD CONSTRAINT quality_audit_pkey PRIMARY KEY (id);


--
-- Name: quality_certificate quality_certificate_pkey; Type: CONSTRAINT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_certificate
    ADD CONSTRAINT quality_certificate_pkey PRIMARY KEY (id);


--
-- Name: quality_control_plan quality_control_plan_pkey; Type: CONSTRAINT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_control_plan
    ADD CONSTRAINT quality_control_plan_pkey PRIMARY KEY (id);


--
-- Name: quality_inspection quality_inspection_pkey; Type: CONSTRAINT; Schema: quality; Owner: royatalibova
--

ALTER TABLE ONLY quality.quality_inspection
    ADD CONSTRAINT quality_inspection_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: sales; Owner: royatalibova
--

ALTER TABLE ONLY sales.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: sales; Owner: royatalibova
--

ALTER TABLE ONLY sales.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: audit_log audit_log_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.audit_log
    ADD CONSTRAINT audit_log_pkey PRIMARY KEY (id);


--
-- Name: backup_log backup_log_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.backup_log
    ADD CONSTRAINT backup_log_pkey PRIMARY KEY (id);


--
-- Name: error_log error_log_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.error_log
    ADD CONSTRAINT error_log_pkey PRIMARY KEY (id);


--
-- Name: login_history login_history_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.login_history
    ADD CONSTRAINT login_history_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (id);


--
-- Name: system_config system_config_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.system_config
    ADD CONSTRAINT system_config_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: system; Owner: royatalibova
--

ALTER TABLE ONLY system.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: export_order export_order_pkey; Type: CONSTRAINT; Schema: trade; Owner: royatalibova
--

ALTER TABLE ONLY trade.export_order
    ADD CONSTRAINT export_order_pkey PRIMARY KEY (id);


--
-- Name: import_order import_order_pkey; Type: CONSTRAINT; Schema: trade; Owner: royatalibova
--

ALTER TABLE ONLY trade.import_order
    ADD CONSTRAINT import_order_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict ztkx9slW5SvKh7fjRQHoJ6E8aR7VHsgifmIW9mixHcqnWADbhopzPBaCb8Mm1qO

