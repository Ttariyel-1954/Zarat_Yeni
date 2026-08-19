'use client'
import { useEffect, useState } from 'react'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'

export interface Column<T> {
  key:       string
  label:     string
  align?:    'left' | 'right'
  sortable?: boolean
  render?:   (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns:        Column<T>[]
  data:           T[]
  total?:         number
  page:           number
  pageSize:       number
  onPageChange:   (page: number) => void
  search:         string
  onSearchChange: (search: string) => void
  isLoading?:     boolean
  sortBy?:        string
  sortDir?:       'asc' | 'desc'
  onSortChange?:  (key: string) => void
  getRowKey:      (row: T) => string | number
}

export function DataTable<T>({
  columns, data, total = 0, page, pageSize, onPageChange,
  search, onSearchChange, isLoading, sortBy, sortDir, onSortChange, getRowKey,
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState(search)

  useEffect(() => {
    const t = setTimeout(() => {
      if (localSearch !== search) onSearchChange(localSearch)
    }, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch])

  useEffect(() => { setLocalSearch(search) }, [search])

  const pages = Math.max(1, Math.ceil(total / pageSize))
  const from  = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to    = Math.min(page * pageSize, total)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="relative w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Axtar..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-left'} ${col.sortable ? 'cursor-pointer select-none hover:text-gray-700' : ''}`}
                  onClick={() => col.sortable && onSortChange?.(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortBy === col.key && (
                      sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading && Array.from({ length: 6 }).map((_, i) => (
              <tr key={`skeleton-${i}`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
            {!isLoading && data.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">Nəticə tapılmadı</td></tr>
            )}
            {!isLoading && data.map((row) => (
              <tr key={getRowKey(row)} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-2.5 ${col.align === 'right' ? 'text-right' : ''}`}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>{from}-{to} / {total}</span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40">←</button>
            <span className="px-3 py-1">{page} / {pages}</span>
            <button disabled={page >= pages} onClick={() => onPageChange(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40">→</button>
          </div>
        </div>
      )}
    </div>
  )
}
