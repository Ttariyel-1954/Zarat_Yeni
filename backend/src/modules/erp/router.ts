import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { erpDb } from '../../config/db.js'
import { requireAuth } from '../../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// ─── Şirkətlər ───────────────────────────────────────────────────────────────
router.get('/companies', async (req: Request, res: Response) => {
  const page  = Number(req.query['page']  ?? 1)
  const limit = Number(req.query['limit'] ?? 20)
  const search = String(req.query['search'] ?? '')

  const where = search
    ? { OR: [
        { companyName: { contains: search, mode: 'insensitive' as const } },
        { taxId:       { contains: search } },
      ]}
    : {}

  const [items, total] = await Promise.all([
    erpDb.orgCompany.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { id: 'asc' } }),
    erpDb.orgCompany.count({ where }),
  ])

  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

router.get('/companies/:id', async (req: Request, res: Response) => {
  const item = await erpDb.orgCompany.findUnique({ where: { id: Number(req.params['id']) } })
  if (!item) { res.status(404).json({ ok: false, code: 'NOT_FOUND', message: 'Şirkət tapılmadı' }); return }
  res.json({ ok: true, data: item })
})

// ─── Şöbələr ─────────────────────────────────────────────────────────────────
router.get('/departments', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { deptName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total] = await Promise.all([
    erpDb.orgDepartment.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.orgDepartment.count({ where }),
  ])
  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Filiallar ────────────────────────────────────────────────────────────────
router.get('/branches', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { branchName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total] = await Promise.all([
    erpDb.orgBranch.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.orgBranch.count({ where }),
  ])
  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Tərəfdaşlar ─────────────────────────────────────────────────────────────
router.get('/partners', async (req: Request, res: Response) => {
  const page  = Number(req.query['page']  ?? 1)
  const limit = Number(req.query['limit'] ?? 20)
  const search = String(req.query['search'] ?? '')

  const where = search
    ? { OR: [
        { partnerName: { contains: search, mode: 'insensitive' as const } },
        { partnerCode: { contains: search } },
      ]}
    : {}

  const [items, total] = await Promise.all([
    erpDb.partner.findMany({ where, skip: (page - 1) * limit, take: limit }),
    erpDb.partner.count({ where }),
  ])

  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Məhsullar ────────────────────────────────────────────────────────────────
router.get('/products', async (req: Request, res: Response) => {
  const page  = Number(req.query['page']  ?? 1)
  const limit = Number(req.query['limit'] ?? 20)
  const [items, total] = await Promise.all([
    erpDb.inventoryProduct.findMany({ skip: (page - 1) * limit, take: limit }),
    erpDb.inventoryProduct.count(),
  ])
  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Köməkçilər ───────────────────────────────────────────────────────────────
function parsePaging(req: Request) {
  const page   = Number(req.query['page']  ?? 1)
  const limit  = Number(req.query['limit'] ?? 20)
  const search = String(req.query['search'] ?? '').trim()
  return { page, limit, search }
}

function buildOrderBy(req: Request, fallback: string) {
  const sortBy  = String(req.query['sortBy']  ?? fallback)
  const sortDir = req.query['sortDir'] === 'desc' ? 'desc' : 'asc'
  return { [sortBy]: sortDir } as Record<string, 'asc' | 'desc'>
}

async function nameLookup<K extends number>(
  rows: { id: K; [key: string]: unknown }[],
  nameField: string,
): Promise<Map<K, string>> {
  const map = new Map<K, string>()
  for (const row of rows) map.set(row.id, String(row[nameField] ?? ''))
  return map
}

// ─── Vəzifələr ────────────────────────────────────────────────────────────────
router.get('/positions', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { positionName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total, departments] = await Promise.all([
    erpDb.positions.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.positions.count({ where }),
    erpDb.orgDepartment.findMany({ select: { id: true, deptName: true } }),
  ])
  const deptMap = await nameLookup(departments, 'deptName')
  const enriched = items.map((it) => ({ ...it, departmentName: it.departmentId ? deptMap.get(it.departmentId) ?? null : null }))

  res.json({ ok: true, data: enriched, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Anbarlar ─────────────────────────────────────────────────────────────────
router.get('/warehouses', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { warehouseName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total] = await Promise.all([
    erpDb.inventoryWarehouse.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.inventoryWarehouse.count({ where }),
  ])
  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Anbar qalıqları ────────────────────────────────────────────────────────────
router.get('/inventory', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)

  let productFilter: number[] | undefined
  if (search) {
    const matches = await erpDb.inventoryProduct.findMany({
      where:  { productName: { contains: search, mode: 'insensitive' as const } },
      select: { id: true },
    })
    productFilter = matches.map((m) => m.id)
  }
  const where = productFilter ? { productId: { in: productFilter } } : {}

  const [items, total, products, warehouses] = await Promise.all([
    erpDb.inventory.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.inventory.count({ where }),
    erpDb.inventoryProduct.findMany({ select: { id: true, productName: true, productCode: true } }),
    erpDb.inventoryWarehouse.findMany({ select: { id: true, warehouseName: true } }),
  ])
  const productMap   = await nameLookup(products, 'productName')
  const productCodes = new Map(products.map((p) => [p.id, p.productCode ?? '']))
  const warehouseMap = await nameLookup(warehouses, 'warehouseName')
  const enriched = items.map((it) => ({
    ...it,
    productName:   it.productId   ? productMap.get(it.productId) ?? null : null,
    productCode:   it.productId   ? productCodes.get(it.productId) ?? null : null,
    warehouseName: it.warehouseId ? warehouseMap.get(it.warehouseId) ?? null : null,
  }))

  res.json({ ok: true, data: enriched, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── İşçilər (org) ────────────────────────────────────────────────────────────
router.get('/employees', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { fullName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total, departments, branches, positions] = await Promise.all([
    erpDb.org_employees.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.org_employees.count({ where }),
    erpDb.orgDepartment.findMany({ select: { id: true, deptName: true } }),
    erpDb.orgBranch.findMany({ select: { id: true, branchName: true } }),
    erpDb.positions.findMany({ select: { id: true, positionName: true } }),
  ])
  const deptMap = await nameLookup(departments, 'deptName')
  const branchMap = await nameLookup(branches, 'branchName')
  const positionMap = await nameLookup(positions, 'positionName')
  const enriched = items.map((it) => ({
    ...it,
    departmentName: it.departmentId ? deptMap.get(it.departmentId) ?? null : null,
    branchName:     it.branchId     ? branchMap.get(it.branchId) ?? null     : null,
    positionName:   it.positionId   ? positionMap.get(it.positionId) ?? null : null,
  }))

  res.json({ ok: true, data: enriched, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── İşçilər (hr) ─────────────────────────────────────────────────────────────
router.get('/hr-employees', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { fullName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total, departments] = await Promise.all([
    erpDb.hr_employees.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.hr_employees.count({ where }),
    erpDb.hr_departments.findMany({ select: { id: true, deptName: true } }),
  ])
  const deptMap = await nameLookup(departments, 'deptName')
  const enriched = items.map((it) => ({ ...it, departmentName: it.departmentId ? deptMap.get(it.departmentId) ?? null : null }))

  res.json({ ok: true, data: enriched, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Müştərilər ───────────────────────────────────────────────────────────────
router.get('/customers', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { companyName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total] = await Promise.all([
    erpDb.customers.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.customers.count({ where }),
  ])
  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Fakturalar ───────────────────────────────────────────────────────────────
router.get('/invoices', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { invoiceNumber: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total, customers] = await Promise.all([
    erpDb.invoices.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.invoices.count({ where }),
    erpDb.customers.findMany({ select: { id: true, companyName: true } }),
  ])
  const customerMap = await nameLookup(customers, 'companyName')
  const enriched = items.map((it) => ({ ...it, customerName: it.customerId ? customerMap.get(it.customerId) ?? null : null }))

  res.json({ ok: true, data: enriched, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Təchizatçılar ────────────────────────────────────────────────────────────
router.get('/suppliers', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { companyName: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total] = await Promise.all([
    erpDb.suppliers.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.suppliers.count({ where }),
  ])
  res.json({ ok: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Alış sifarişləri ─────────────────────────────────────────────────────────
router.get('/orders', async (req: Request, res: Response) => {
  const { page, limit, search } = parsePaging(req)
  const where = search
    ? { poNumber: { contains: search, mode: 'insensitive' as const } }
    : {}

  const [items, total, suppliers] = await Promise.all([
    erpDb.orders.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: buildOrderBy(req, 'id') }),
    erpDb.orders.count({ where }),
    erpDb.suppliers.findMany({ select: { id: true, companyName: true } }),
  ])
  const supplierMap = await nameLookup(suppliers, 'companyName')
  const enriched = items.map((it) => ({ ...it, supplierName: it.supplierId ? supplierMap.get(it.supplierId) ?? null : null }))

  res.json({ ok: true, data: enriched, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
})

// ─── Statistika: departament üzrə işçilər ──────────────────────────────────────
router.get('/stats/employees-by-department', async (_req: Request, res: Response) => {
  const [grouped, departments] = await Promise.all([
    erpDb.org_employees.groupBy({ by: ['departmentId'], _count: { id: true } }),
    erpDb.orgDepartment.findMany({ select: { id: true, deptName: true } }),
  ])
  const deptMap = await nameLookup(departments, 'deptName')
  const totals = new Map<string, number>()
  for (const g of grouped) {
    if (g.departmentId === null) continue
    const name = deptMap.get(g.departmentId) ?? 'Naməlum'
    totals.set(name, (totals.get(name) ?? 0) + g._count.id)
  }
  const data = [...totals.entries()]
    .map(([dept, count]) => ({ dept, count }))
    .sort((a, b) => b.count - a.count)

  res.json({ ok: true, data })
})

// ─── Statistika: filial üzrə işçilər ───────────────────────────────────────────
router.get('/stats/employees-by-branch', async (_req: Request, res: Response) => {
  const [grouped, branches] = await Promise.all([
    erpDb.org_employees.groupBy({ by: ['branchId'], _count: { id: true } }),
    erpDb.orgBranch.findMany({ select: { id: true, branchName: true } }),
  ])
  const branchMap = await nameLookup(branches, 'branchName')
  const data = grouped
    .filter((g) => g.branchId !== null)
    .map((g) => ({ branch: branchMap.get(g.branchId as number) ?? 'Naməlum', count: g._count.id }))
    .sort((a, b) => b.count - a.count)

  res.json({ ok: true, data })
})

// ─── Statistika: kateqoriya üzrə anbar dəyəri ──────────────────────────────────
router.get('/stats/inventory-by-category', async (_req: Request, res: Response) => {
  const [invRows, products, categories] = await Promise.all([
    erpDb.inventory.findMany({ select: { productId: true, quantityOnHand: true, lastCostPrice: true } }),
    erpDb.inventoryProduct.findMany({ select: { id: true, categoryId: true } }),
    erpDb.categories.findMany({ select: { id: true, categoryName: true } }),
  ])
  const productCategory = new Map(products.map((p) => [p.id, p.categoryId]))
  const categoryMap = await nameLookup(categories, 'categoryName')

  const totals = new Map<string, number>()
  for (const row of invRows) {
    const categoryId = row.productId ? productCategory.get(row.productId) : null
    const name = categoryId != null ? categoryMap.get(categoryId) ?? 'Naməlum' : 'Naməlum'
    const qty  = Number(row.quantityOnHand ?? 0)
    const cost = Number(row.lastCostPrice ?? 0)
    totals.set(name, (totals.get(name) ?? 0) + qty * cost)
  }
  const data = [...totals.entries()]
    .map(([category, value]) => ({ category, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value)

  res.json({ ok: true, data })
})

// ─── Statistika: status üzrə fakturalar ────────────────────────────────────────
router.get('/stats/invoices-by-status', async (_req: Request, res: Response) => {
  const grouped = await erpDb.invoices.groupBy({
    by: ['status'],
    _count: { id: true },
    _sum: { totalAmount: true },
  })
  const data = grouped.map((g) => ({
    status: g.status ?? 'Naməlum',
    count:  g._count.id,
    amount: Number(g._sum.totalAmount ?? 0),
  }))

  res.json({ ok: true, data })
})

// ─── Dashboard özeti ──────────────────────────────────────────────────────────
router.get('/summary', async (_req: Request, res: Response) => {
  const [companies, partners, products, warehouses] = await Promise.all([
    erpDb.orgCompany.count({ where: { isActive: true } }),
    erpDb.partner.count({ where: { isActive: true } }),
    erpDb.inventoryProduct.count({ where: { isActive: true } }),
    erpDb.inventoryWarehouse.count({ where: { isActive: true } }),
  ])
  res.json({ ok: true, data: { companies, partners, products, warehouses } })
})

export default router
