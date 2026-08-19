'use client'
import { useQuery } from '@tanstack/react-query'
import { erpApi, telemetryApi } from '@/lib/api'
import { Activity, Building2, Package, Users, AlertTriangle, Wifi } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { StatCard } from '@/components/shared/StatCard'

export default function DashboardPage() {
  const erp  = useQuery({ queryKey: ['erp-summary'],  queryFn: () => erpApi.summary()  })
  const tele = useQuery({ queryKey: ['tele-stats'],   queryFn: () => telemetryApi.stats() })
  const alerts = useQuery({ queryKey: ['alerts'], queryFn: () => telemetryApi.alerts(true) })

  const e = erp.data?.data?.data  ?? {}
  const t = tele.data?.data?.data ?? {}
  const a = alerts.data?.data?.data ?? []

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">İdarə Paneli</h1>
        <p className="text-sm text-gray-500">ZARAT GROUP — Vahid baxış</p>
      </div>

      {/* ERP kartları */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">ERP</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Şirkətlər"   value={e.companies  ?? '—'} icon={Building2} color="bg-blue-500" />
          <StatCard label="Tərəfdaşlar" value={e.partners   ?? '—'} icon={Users}     color="bg-indigo-500" />
          <StatCard label="Məhsullar"   value={e.products   ?? '—'} icon={Package}   color="bg-purple-500" />
          <StatCard label="Anbarlar"    value={e.warehouses ?? '—'} icon={Activity}  color="bg-violet-500" />
        </div>
      </div>

      {/* Telemetriya kartları */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Telemetriya</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Cihazlar"       value={t.totalDevices  ?? '—'} icon={Wifi}          color="bg-emerald-500" />
          <StatCard label="Aktiv"          value={t.activeDevices ?? '—'} icon={Activity}      color="bg-green-500" />
          <StatCard label="Ölçmələr"       value={t.totalReadings ?? '—'} icon={Activity}      color="bg-teal-500" />
          <StatCard label="Xəbərdarlıqlar" value={t.activeAlerts  ?? '—'} icon={AlertTriangle} color="bg-amber-500" />
        </div>
      </div>

      {/* Oxunmamış xəbərdarlıqlar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Son Xəbərdarlıqlar</h2>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
            {a.length} oxunmamış
          </span>
        </div>
        <div className="divide-y divide-gray-50">
          {a.length === 0 && (
            <p className="px-5 py-6 text-sm text-gray-400 text-center">Xəbərdarlıq yoxdur</p>
          )}
          {a.slice(0, 8).map((alert: { id: string | number; cihazKod?: string; seviye?: string; mesaj?: string; yaradilma?: string }) => (
            <div key={String(alert.id)} className="px-5 py-3 flex items-start gap-3">
              <AlertTriangle size={16} className={
                alert.seviye === 'kritik' ? 'text-red-500 mt-0.5' : 'text-amber-500 mt-0.5'
              } />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{alert.mesaj}</p>
                <p className="text-xs text-gray-400">
                  {alert.cihazKod} · {alert.yaradilma ? formatDateTime(alert.yaradilma) : ''}
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                alert.seviye === 'kritik' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {alert.seviye}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
