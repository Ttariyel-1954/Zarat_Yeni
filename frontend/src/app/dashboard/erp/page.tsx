'use client'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { erpApi, ListParams } from '@/lib/api'
import {
  Building2, Users, Package, ShoppingCart, Truck, Handshake,
} from 'lucide-react'
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { StatCard } from '@/components/shared/StatCard'
import { ChartCard } from '@/components/shared/ChartCard'
import { DataTable, Column } from '@/components/shared/DataTable'
import { formatDate, formatNum } from '@/lib/utils'

// Kateqorik palet (dataviz təlimatına uyğun, sabit sıra)
const SERIES = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948']

type MainTab = 'org' | 'hr' | 'inventory' | 'sales' | 'purchase' | 'partners'

const MAIN_TABS: { key: MainTab; label: string; icon: React.ElementType }[] = [
  { key: 'org',       label: 'Təşkilat',    icon: Building2   },
  { key: 'hr',        label: 'Kadrlar',     icon: Users       },
  { key: 'inventory', label: 'Anbar',       icon: Package     },
  { key: 'sales',     label: 'Satış',       icon: ShoppingCart},
  { key: 'purchase',  label: 'Təchizat',    icon: Truck       },
  { key: 'partners',  label: 'Tərəfdaşlar', icon: Handshake   },
]

function fmtMoney(v: unknown, currency?: string | null): string {
  if (v === null || v === undefined) return '—'
  return `${formatNum(Number(v), 0)}${currency ? ` ${currency}` : ''}`
}

function StatusBadge({ active }: { active: unknown }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
      {active ? 'Aktiv' : 'Deaktiv'}
    </span>
  )
}

// ─── Ümumi cədvəl hook-u (server pagination) ──────────────────────────────────
function useListQuery(key: string, fetcher: (p: ListParams) => ReturnType<typeof erpApi.companies>, pageSize = 20) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const query = useQuery({
    queryKey: [key, page, search],
    queryFn:  () => fetcher({ page, limit: pageSize, search }),
  })

  const rows: Record<string, unknown>[] = query.data?.data?.data ?? []
  const total = query.data?.data?.meta?.total ?? 0

  function onSearchChange(s: string) { setSearch(s); setPage(1) }

  return { rows, total, page, setPage, search, onSearchChange, isLoading: query.isLoading, pageSize }
}

// KPI kartları üçün ümumi say (cədvəlin axtarış filtrindən asılı olmayaraq)
function useCount(key: string, fetcher: (p: ListParams) => ReturnType<typeof erpApi.companies>) {
  const query = useQuery({ queryKey: [key, 'total'], queryFn: () => fetcher({ page: 1, limit: 1 }) })
  return query.data?.data?.meta?.total ?? 0
}

// ─── Təşkilat ──────────────────────────────────────────────────────────────
type OrgSub = 'companies' | 'branches' | 'departments' | 'positions'

function OrgTab() {
  const [sub, setSub] = useState<OrgSub>('companies')

  const companies   = useListQuery('org-companies',   erpApi.companies,   10)
  const branches    = useListQuery('org-branches',    erpApi.branches,    10)
  const departments = useListQuery('org-departments', erpApi.departments, 15)
  const positions   = useListQuery('org-positions',   erpApi.positions,   15)

  const branchesTotal    = useCount('org-branches',    erpApi.branches)
  const departmentsTotal = useCount('org-departments', erpApi.departments)
  const positionsTotal   = useCount('org-positions',   erpApi.positions)

  const summary = useQuery({ queryKey: ['erp-summary'], queryFn: () => erpApi.summary() })
  const s = summary.data?.data?.data ?? {}

  const subTabs: { key: OrgSub; label: string }[] = [
    { key: 'companies',   label: 'Şirkətlər'     },
    { key: 'branches',    label: 'Filiallar'     },
    { key: 'departments', label: 'Departamentlər'},
    { key: 'positions',   label: 'Vəzifələr'     },
  ]

  const companyCols: Column<Record<string, unknown>>[] = [
    { key: 'companyCode', label: 'Kod' },
    { key: 'companyName', label: 'Ad' },
    { key: 'taxId',       label: 'VÖEN' },
    { key: 'city',        label: 'Şəhər' },
    { key: 'isActive',    label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const branchCols: Column<Record<string, unknown>>[] = [
    { key: 'branchCode', label: 'Kod' },
    { key: 'branchName', label: 'Ad' },
    { key: 'branchType', label: 'Tip' },
    { key: 'city',       label: 'Şəhər' },
    { key: 'isActive',   label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const deptCols: Column<Record<string, unknown>>[] = [
    { key: 'deptCode', label: 'Kod' },
    { key: 'deptName', label: 'Ad' },
    { key: 'deptType', label: 'Tip' },
    { key: 'budget',   label: 'Büdcə', align: 'right', render: (r) => fmtMoney(r['budget']) },
    { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const posCols: Column<Record<string, unknown>>[] = [
    { key: 'positionCode',   label: 'Kod' },
    { key: 'positionName',   label: 'Ad' },
    { key: 'departmentName', label: 'Departament', render: (r) => String(r['departmentName'] ?? '—') },
    { key: 'salaryMin',      label: 'Min maaş', align: 'right', render: (r) => fmtMoney(r['salaryMin']) },
    { key: 'salaryMax',      label: 'Maks maaş', align: 'right', render: (r) => fmtMoney(r['salaryMax']) },
  ]

  const active = { companies, branches, departments, positions }[sub]
  const cols   = { companies: companyCols, branches: branchCols, departments: deptCols, positions: posCols }[sub]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Şirkətlər"      value={s.companies  ?? '—'} icon={Building2} color="bg-blue-500" />
        <StatCard label="Filiallar"      value={branchesTotal || '—'} icon={Building2} color="bg-indigo-500" />
        <StatCard label="Departamentlər" value={departmentsTotal || '—'} icon={Users} color="bg-violet-500" />
        <StatCard label="Vəzifələr"      value={positionsTotal || '—'} icon={Users} color="bg-purple-500" />
      </div>

      <SubTabs tabs={subTabs} active={sub} onChange={(k) => setSub(k)} />

      <DataTable
        columns={cols}
        data={active.rows}
        total={active.total}
        page={active.page}
        pageSize={active.pageSize}
        onPageChange={active.setPage}
        search={active.search}
        onSearchChange={active.onSearchChange}
        isLoading={active.isLoading}
        getRowKey={(r) => String(r['id'])}
      />
    </div>
  )
}

// ─── Kadrlar ───────────────────────────────────────────────────────────────
type HrSub = 'org' | 'hr'

function HrTab() {
  const [sub, setSub] = useState<HrSub>('org')
  const orgEmployees = useListQuery('org-employees', erpApi.employees, 15)
  const hrEmployees  = useListQuery('hr-employees',  erpApi.hrEmployees, 15)

  const orgEmployeesTotal = useCount('org-employees', erpApi.employees)
  const hrEmployeesTotal  = useCount('hr-employees',  erpApi.hrEmployees)

  const byDept = useQuery({ queryKey: ['stats-employees-by-department'], queryFn: () => erpApi.stats.employeesByDepartment() })
  const chartData = useMemo(() => {
    const rows: { dept: string; count: number }[] = byDept.data?.data?.data ?? []
    const top = rows.slice(0, 8)
    const rest = rows.slice(8).reduce((sum, r) => sum + r.count, 0)
    return rest > 0 ? [...top, { dept: 'Digər', count: rest }] : top
  }, [byDept.data])

  const orgCols: Column<Record<string, unknown>>[] = [
    { key: 'fullName',       label: 'Ad Soyad', sortable: true },
    { key: 'employeeCode',   label: 'Kod' },
    { key: 'departmentName', label: 'Departament', render: (r) => String(r['departmentName'] ?? '—') },
    { key: 'branchName',     label: 'Filial', render: (r) => String(r['branchName'] ?? '—') },
    { key: 'positionName',   label: 'Vəzifə', render: (r) => String(r['positionName'] ?? '—') },
    { key: 'hireDate',       label: 'İşə qəbul', render: (r) => r['hireDate'] ? formatDate(String(r['hireDate'])) : '—' },
    { key: 'isActive',       label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const hrCols: Column<Record<string, unknown>>[] = [
    { key: 'fullName',       label: 'Ad Soyad', sortable: true },
    { key: 'employeeCode',   label: 'Kod' },
    { key: 'departmentName', label: 'Departament', render: (r) => String(r['departmentName'] ?? '—') },
    { key: 'monthlySalary',  label: 'Aylıq maaş', align: 'right', render: (r) => fmtMoney(r['monthlySalary']) },
    { key: 'hireDate',       label: 'İşə qəbul', render: (r) => r['hireDate'] ? formatDate(String(r['hireDate'])) : '—' },
    { key: 'isActive',       label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]

  const active = sub === 'org' ? orgEmployees : hrEmployees
  const cols   = sub === 'org' ? orgCols : hrCols

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="ORG işçilər" value={orgEmployeesTotal || '—'} icon={Users} color="bg-blue-500" />
        <StatCard label="HR işçilər"  value={hrEmployeesTotal  || '—'} icon={Users} color="bg-indigo-500" />
      </div>

      <ChartCard title="Departament üzrə işçi sayı" isLoading={byDept.isLoading}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="dept" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} height={70} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name="İşçi sayı" fill={SERIES[0]} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <SubTabs
        tabs={[{ key: 'org', label: 'ORG işçilər' }, { key: 'hr', label: 'HR işçilər' }]}
        active={sub}
        onChange={(k) => setSub(k)}
      />

      <DataTable
        columns={cols}
        data={active.rows}
        total={active.total}
        page={active.page}
        pageSize={active.pageSize}
        onPageChange={active.setPage}
        search={active.search}
        onSearchChange={active.onSearchChange}
        isLoading={active.isLoading}
        getRowKey={(r) => String(r['id'])}
      />
    </div>
  )
}

// ─── Anbar ─────────────────────────────────────────────────────────────────
type InvSub = 'products' | 'warehouses' | 'stock'

function InventoryTab() {
  const [sub, setSub] = useState<InvSub>('products')
  const products   = useListQuery('inv-products',   erpApi.products,   15)
  const warehouses = useListQuery('inv-warehouses', erpApi.warehouses, 15)
  const stock      = useListQuery('inv-stock',      erpApi.inventory,  15)

  const productsTotal   = useCount('inv-products',   erpApi.products)
  const warehousesTotal = useCount('inv-warehouses', erpApi.warehouses)

  const byCategory = useQuery({ queryKey: ['stats-inventory-by-category'], queryFn: () => erpApi.stats.inventoryByCategory() })
  const pieData: { category: string; value: number }[] = byCategory.data?.data?.data ?? []
  const totalValue = pieData.reduce((s, r) => s + r.value, 0)

  const productCols: Column<Record<string, unknown>>[] = [
    { key: 'productCode',        label: 'Kod' },
    { key: 'productName',        label: 'Ad' },
    { key: 'productType',        label: 'Tip' },
    { key: 'standardCost',       label: 'Maya dəyəri', align: 'right', render: (r) => fmtMoney(r['standardCost']) },
    { key: 'sellingPriceLocal',  label: 'Satış qiyməti', align: 'right', render: (r) => fmtMoney(r['sellingPriceLocal']) },
    { key: 'isActive',           label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const warehouseCols: Column<Record<string, unknown>>[] = [
    { key: 'warehouseCode', label: 'Kod' },
    { key: 'warehouseName', label: 'Ad' },
    { key: 'warehouseType', label: 'Tip' },
    { key: 'location',      label: 'Yer' },
    { key: 'isActive',      label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const stockCols: Column<Record<string, unknown>>[] = [
    { key: 'productName',      label: 'Məhsul', render: (r) => String(r['productName'] ?? '—') },
    { key: 'warehouseName',    label: 'Anbar',  render: (r) => String(r['warehouseName'] ?? '—') },
    { key: 'quantityOnHand',   label: 'Mövcud', align: 'right', render: (r) => formatNum(Number(r['quantityOnHand'] ?? 0), 0) },
    { key: 'reservedQuantity', label: 'Rezerv', align: 'right', render: (r) => formatNum(Number(r['reservedQuantity'] ?? 0), 0) },
    { key: 'lastCostPrice',    label: 'Maya dəyəri', align: 'right', render: (r) => fmtMoney(r['lastCostPrice']) },
  ]

  const active = { products, warehouses, stock }[sub]
  const cols   = { products: productCols, warehouses: warehouseCols, stock: stockCols }[sub]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Məhsullar" value={productsTotal   || '—'} icon={Package}  color="bg-blue-500" />
        <StatCard label="Anbarlar"  value={warehousesTotal || '—'} icon={Building2} color="bg-indigo-500" />
        <StatCard label="Anbar dəyəri" value={fmtMoney(totalValue)} icon={Package} color="bg-violet-500" />
      </div>

      <ChartCard title="Kateqoriya üzrə anbar dəyəri" isLoading={byCategory.isLoading}>
        {pieData.length === 0 ? (
          <p className="h-64 flex items-center justify-center text-sm text-gray-400">Məlumat yoxdur</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={(d) => String(d.name)} isAnimationActive={false}>
                {pieData.map((_, i) => <Cell key={i} fill={SERIES[i % SERIES.length]} />)}
              </Pie>
              <Tooltip formatter={(v: unknown) => fmtMoney(v as number)} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <SubTabs
        tabs={[
          { key: 'products',   label: 'Məhsullar' },
          { key: 'warehouses', label: 'Anbarlar' },
          { key: 'stock',      label: 'Qalıqlar' },
        ]}
        active={sub}
        onChange={(k) => setSub(k)}
      />

      <DataTable
        columns={cols}
        data={active.rows}
        total={active.total}
        page={active.page}
        pageSize={active.pageSize}
        onPageChange={active.setPage}
        search={active.search}
        onSearchChange={active.onSearchChange}
        isLoading={active.isLoading}
        getRowKey={(r) => String(r['id'])}
      />
    </div>
  )
}

// ─── Satış ─────────────────────────────────────────────────────────────────
type SalesSub = 'customers' | 'invoices'

function SalesTab() {
  const [sub, setSub] = useState<SalesSub>('customers')
  const customers = useListQuery('sales-customers', erpApi.customers, 15)
  const invoices  = useListQuery('sales-invoices',  erpApi.invoices,  15)

  const customersTotal = useCount('sales-customers', erpApi.customers)
  const invoicesTotal  = useCount('sales-invoices',  erpApi.invoices)

  const byStatus = useQuery({ queryKey: ['stats-invoices-by-status'], queryFn: () => erpApi.stats.invoicesByStatus() })
  const pieData: { status: string; count: number; amount: number }[] = byStatus.data?.data?.data ?? []

  const customerCols: Column<Record<string, unknown>>[] = [
    { key: 'customerCode',     label: 'Kod' },
    { key: 'companyName',      label: 'Şirkət' },
    { key: 'country',          label: 'Ölkə' },
    { key: 'customerSegment',  label: 'Seqment' },
    { key: 'creditLimit',      label: 'Kredit limiti', align: 'right', render: (r) => fmtMoney(r['creditLimit'], String(r['currency'] ?? '')) },
    { key: 'isActive',         label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const invoiceCols: Column<Record<string, unknown>>[] = [
    { key: 'invoiceNumber', label: 'Faktura №' },
    { key: 'customerName',  label: 'Müştəri', render: (r) => String(r['customerName'] ?? '—') },
    { key: 'invoiceDate',   label: 'Tarix', render: (r) => r['invoiceDate'] ? formatDate(String(r['invoiceDate'])) : '—' },
    { key: 'totalAmount',   label: 'Məbləğ', align: 'right', render: (r) => fmtMoney(r['totalAmount'], String(r['currency'] ?? '')) },
    { key: 'status',        label: 'Status', render: (r) => String(r['status'] ?? '—') },
  ]

  const active = sub === 'customers' ? customers : invoices
  const cols   = sub === 'customers' ? customerCols : invoiceCols

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Müştərilər" value={customersTotal || '—'} icon={Users} color="bg-blue-500" />
        <StatCard label="Fakturalar" value={invoicesTotal  || '—'} icon={ShoppingCart} color="bg-indigo-500" />
      </div>

      <ChartCard title="Status üzrə fakturalar" isLoading={byStatus.isLoading}>
        {pieData.length === 0 ? (
          <p className="h-64 flex items-center justify-center text-sm text-gray-400">Məlumat yoxdur</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={90} label={(d) => `${d.name} (${d.value})`} isAnimationActive={false}>
                {pieData.map((_, i) => <Cell key={i} fill={SERIES[i % SERIES.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <SubTabs
        tabs={[{ key: 'customers', label: 'Müştərilər' }, { key: 'invoices', label: 'Fakturalar' }]}
        active={sub}
        onChange={(k) => setSub(k)}
      />

      <DataTable
        columns={cols}
        data={active.rows}
        total={active.total}
        page={active.page}
        pageSize={active.pageSize}
        onPageChange={active.setPage}
        search={active.search}
        onSearchChange={active.onSearchChange}
        isLoading={active.isLoading}
        getRowKey={(r) => String(r['id'])}
      />
    </div>
  )
}

// ─── Təchizat ──────────────────────────────────────────────────────────────
type PurchaseSub = 'suppliers' | 'orders'

function PurchaseTab() {
  const [sub, setSub] = useState<PurchaseSub>('suppliers')
  const suppliers = useListQuery('purchase-suppliers', erpApi.suppliers, 15)
  const orders    = useListQuery('purchase-orders',    erpApi.orders,    15)

  const suppliersTotal = useCount('purchase-suppliers', erpApi.suppliers)
  const ordersTotal    = useCount('purchase-orders',    erpApi.orders)

  const supplierCols: Column<Record<string, unknown>>[] = [
    { key: 'supplierCode',  label: 'Kod' },
    { key: 'companyName',   label: 'Şirkət' },
    { key: 'country',       label: 'Ölkə' },
    { key: 'paymentTerms',  label: 'Ödəniş şərti' },
    { key: 'rating',        label: 'Reytinq', align: 'right' },
    { key: 'isActive',      label: 'Status', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]
  const orderCols: Column<Record<string, unknown>>[] = [
    { key: 'poNumber',     label: 'Sifariş №' },
    { key: 'supplierName', label: 'Təchizatçı', render: (r) => String(r['supplierName'] ?? '—') },
    { key: 'orderDate',    label: 'Tarix', render: (r) => r['orderDate'] ? formatDate(String(r['orderDate'])) : '—' },
    { key: 'totalAmount',  label: 'Məbləğ', align: 'right', render: (r) => fmtMoney(r['totalAmount'], String(r['currency'] ?? '')) },
    { key: 'status',       label: 'Status', render: (r) => String(r['status'] ?? '—') },
  ]

  const active = sub === 'suppliers' ? suppliers : orders
  const cols   = sub === 'suppliers' ? supplierCols : orderCols

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Təchizatçılar" value={suppliersTotal || '—'} icon={Truck} color="bg-blue-500" />
        <StatCard label="Sifarişlər"    value={ordersTotal    || '—'} icon={ShoppingCart} color="bg-indigo-500" />
      </div>

      <SubTabs
        tabs={[{ key: 'suppliers', label: 'Təchizatçılar' }, { key: 'orders', label: 'Sifarişlər' }]}
        active={sub}
        onChange={(k) => setSub(k)}
      />

      <DataTable
        columns={cols}
        data={active.rows}
        total={active.total}
        page={active.page}
        pageSize={active.pageSize}
        onPageChange={active.setPage}
        search={active.search}
        onSearchChange={active.onSearchChange}
        isLoading={active.isLoading}
        getRowKey={(r) => String(r['id'])}
      />
    </div>
  )
}

// ─── Tərəfdaşlar ────────────────────────────────────────────────────────────
function PartnersTab() {
  const partners = useListQuery('partners', erpApi.partners, 15)
  const partnersTotal = useCount('partners', erpApi.partners)

  const cols: Column<Record<string, unknown>>[] = [
    { key: 'partnerCode', label: 'Kod' },
    { key: 'partnerName', label: 'Ad' },
    { key: 'taxId',       label: 'VÖEN' },
    { key: 'country',     label: 'Ölkə' },
    { key: 'industry',    label: 'Sahə' },
    { key: 'status',      label: 'Status' },
    { key: 'isActive',    label: 'Aktivlik', render: (r) => <StatusBadge active={r['isActive']} /> },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tərəfdaşlar" value={partnersTotal || '—'} icon={Handshake} color="bg-blue-500" />
      </div>

      <DataTable
        columns={cols}
        data={partners.rows}
        total={partners.total}
        page={partners.page}
        pageSize={partners.pageSize}
        onPageChange={partners.setPage}
        search={partners.search}
        onSearchChange={partners.onSearchChange}
        isLoading={partners.isLoading}
        getRowKey={(r) => String(r['id'])}
      />
    </div>
  )
}

// ─── Kiçik alt-tab seçici ────────────────────────────────────────────────────
function SubTabs<K extends string>({ tabs, active, onChange }: {
  tabs: { key: K; label: string }[]; active: K; onChange: (k: K) => void
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
            active === t.key
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-500 border-gray-200 hover:border-gray-400'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ─── Əsas səhifə ─────────────────────────────────────────────────────────────
export default function ErpPage() {
  const [tab, setTab] = useState<MainTab>('org')

  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">ERP</h1>
        <p className="text-sm text-gray-500">Müəssisə resurslarının idarəsi</p>
      </div>

      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {MAIN_TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              tab === key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {tab === 'org'       && <OrgTab />}
      {tab === 'hr'        && <HrTab />}
      {tab === 'inventory' && <InventoryTab />}
      {tab === 'sales'     && <SalesTab />}
      {tab === 'purchase'  && <PurchaseTab />}
      {tab === 'partners'  && <PartnersTab />}
    </div>
  )
}
