import axios from 'axios'

const BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001'

export const api = axios.create({
  baseURL:        `${BASE}/api`,
  withCredentials: true,
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  login:  (data: { username: string; password: string }) => api.post('/auth/login', data),
  logout: ()                                              => api.post('/auth/logout'),
  me:     ()                                              => api.get('/auth/me'),
}

// ─── ERP ─────────────────────────────────────────────────────────────────────
export interface ListParams {
  page?:    number
  limit?:   number
  search?:  string
  sortBy?:  string
  sortDir?: 'asc' | 'desc'
}

export const erpApi = {
  summary:     ()               => api.get('/erp/summary'),
  companies:   (p?: ListParams) => api.get('/erp/companies', { params: p }),
  company:     (id: number)     => api.get(`/erp/companies/${id}`),
  departments: (p?: ListParams) => api.get('/erp/departments', { params: p }),
  branches:    (p?: ListParams) => api.get('/erp/branches', { params: p }),
  partners:    (p?: ListParams) => api.get('/erp/partners', { params: p }),
  products:    (p?: ListParams) => api.get('/erp/products', { params: p }),
  employees:   (p?: ListParams) => api.get('/erp/employees', { params: p }),
  hrEmployees: (p?: ListParams) => api.get('/erp/hr-employees', { params: p }),
  positions:   (p?: ListParams) => api.get('/erp/positions', { params: p }),
  warehouses:  (p?: ListParams) => api.get('/erp/warehouses', { params: p }),
  inventory:   (p?: ListParams) => api.get('/erp/inventory', { params: p }),
  customers:   (p?: ListParams) => api.get('/erp/customers', { params: p }),
  invoices:    (p?: ListParams) => api.get('/erp/invoices', { params: p }),
  suppliers:   (p?: ListParams) => api.get('/erp/suppliers', { params: p }),
  orders:      (p?: ListParams) => api.get('/erp/orders', { params: p }),
  stats: {
    employeesByDepartment: () => api.get('/erp/stats/employees-by-department'),
    employeesByBranch:     () => api.get('/erp/stats/employees-by-branch'),
    inventoryByCategory:   () => api.get('/erp/stats/inventory-by-category'),
    invoicesByStatus:      () => api.get('/erp/stats/invoices-by-status'),
  },
}

// ─── Telemetriya ─────────────────────────────────────────────────────────────
export const telemetryApi = {
  stats:        ()                                        => api.get('/telemetry/stats'),
  devices:      (status?: string)                        => api.get('/telemetry/devices', { params: { status } }),
  device:       (kod: string)                            => api.get(`/telemetry/devices/${kod}`),
  latest:       ()                                       => api.get('/telemetry/latest'),
  measurements: (p?: { cihazKod?: string; hours?: number; limit?: number }) =>
                                                            api.get('/telemetry/measurements', { params: p }),
  alerts:       (unread?: boolean)                       => api.get('/telemetry/alerts', { params: { unread } }),
  markRead:     (id: string)                             => api.patch(`/telemetry/alerts/${id}/read`),
}

// ─── AI ──────────────────────────────────────────────────────────────────────
export const aiApi = {
  chatSync: (data: { messages: { role: string; content: string }[]; context?: string }) =>
                  api.post('/ai/chat/sync', data),
  history:  (limit?: number) => api.get('/ai/history', { params: { limit } }),
}
