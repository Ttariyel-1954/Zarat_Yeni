'use client'
import { useEffect, useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { telemetryApi } from '@/lib/api'
import { formatDateTime, timeAgo } from '@/lib/utils'
import { Activity, AlertTriangle, CheckCircle, Wifi, WifiOff } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { StatCard } from '@/components/shared/StatCard'
import { ChartCard } from '@/components/shared/ChartCard'

const BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001'

type Device = {
  kod: string; ad: string; status: string; yer?: string | null
  sensorTipi?: { vahid?: string } | null
  lastMeasurement?: { qiymet?: string | number; olcmeVaxti?: string } | null
}
type Alert = {
  id: string; seviye?: string; mesaj?: string; cihazKod?: string; yaradilma?: string; oxundu?: boolean
}
type Measurement = { qiymet: string | number; olcmeVaxti: string }

function timeLabel(iso: string): string {
  return new Date(iso).toLocaleString('az-AZ', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function TelemetriyaPage() {
  const qc      = useQueryClient()
  const stats   = useQuery({ queryKey: ['tele-stats'],  queryFn: () => telemetryApi.stats(),         refetchInterval: 15000 })
  const devices = useQuery({ queryKey: ['devices'],     queryFn: () => telemetryApi.latest(),         refetchInterval: 15000 })
  const alerts  = useQuery({ queryKey: ['alerts-all'],  queryFn: () => telemetryApi.alerts(false) })
  const markRead = useMutation({
    mutationFn: (id: string) => telemetryApi.markRead(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: ['alerts-all'] }),
  })

  const s = stats.data?.data?.data ?? {}
  const devList: Device[] = devices.data?.data?.data ?? []
  const alertList: Alert[] = alerts.data?.data?.data ?? []

  const [selectedDevice, setSelectedDevice] = useState<string>('')
  useEffect(() => {
    if (!selectedDevice && devList.length > 0) setSelectedDevice(devList[0].kod)
  }, [devList, selectedDevice])

  const measurements = useQuery({
    queryKey: ['measurements', selectedDevice],
    queryFn:  () => telemetryApi.measurements({ cihazKod: selectedDevice, hours: 24 * 90, limit: 200 }),
    enabled:  !!selectedDevice,
    refetchInterval: 15000,
  })

  const chartData = useMemo(() => {
    const rows: Measurement[] = measurements.data?.data?.data ?? []
    return [...rows].reverse().map((r) => ({
      time:  timeLabel(r.olcmeVaxti),
      value: Number(r.qiymet),
    }))
  }, [measurements.data])

  const selectedDeviceInfo = devList.find((d) => d.kod === selectedDevice)

  // ─── Canlı yenilənmə (SSE) ─────────────────────────────────────────────────
  useEffect(() => {
    const source = new EventSource(`${BASE}/api/telemetry/stream`, { withCredentials: true })
    source.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        if (msg.type === 'alerts') qc.invalidateQueries({ queryKey: ['alerts-all'] })
      } catch { /* etibarsız SSE paketi */ }
    }
    return () => source.close()
  }, [qc])

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Telemetriya</h1>
        <p className="text-sm text-gray-500">Real-vaxt sensor monitorinqi</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Cihazlar"       value={s.totalDevices  ?? '—'} icon={Wifi}          color="bg-emerald-500" />
        <StatCard label="Aktiv"          value={s.activeDevices ?? '—'} icon={Activity}      color="bg-green-500" />
        <StatCard label="Ölçmələr"       value={s.totalReadings ?? '—'} icon={Activity}      color="bg-teal-500" />
        <StatCard label="Xəbərdarlıqlar" value={s.activeAlerts  ?? '—'} icon={AlertTriangle} color="bg-amber-500" />
      </div>

      <ChartCard
        title={selectedDeviceInfo ? `Son ölçmələr — ${selectedDeviceInfo.ad}` : 'Son ölçmələr'}
        isLoading={measurements.isLoading}
      >
        <div className="flex justify-end mb-2">
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {devList.map((d) => (
              <option key={d.kod} value={d.kod}>{d.ad} ({d.kod})</option>
            ))}
          </select>
        </div>
        {chartData.length === 0 ? (
          <p className="h-64 flex items-center justify-center text-sm text-gray-400">Ölçmə yoxdur</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} width={40} unit={selectedDeviceInfo?.sensorTipi?.vahid ?? ''} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2a78d6" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Cihaz kartları */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Cihazlar ({devList.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devList.map((d) => (
            <button
              key={d.kod}
              onClick={() => setSelectedDevice(d.kod)}
              className={`text-left bg-white rounded-xl border shadow-sm p-4 transition-colors ${
                selectedDevice === d.kod ? 'border-blue-400 ring-1 ring-blue-100' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{d.ad}</p>
                  <p className="text-xs text-gray-400">{d.kod} · {d.yer ?? '—'}</p>
                </div>
                {d.status === 'aktiv'
                  ? <Wifi size={16} className="text-emerald-500 mt-0.5" />
                  : <WifiOff size={16} className="text-gray-400 mt-0.5" />}
              </div>
              {d.lastMeasurement ? (
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-2xl font-bold text-gray-900">
                    {Number(d.lastMeasurement.qiymet).toFixed(2)}
                    <span className="text-sm font-normal text-gray-400 ml-1">
                      {d.sensorTipi?.vahid}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {d.lastMeasurement.olcmeVaxti ? timeAgo(d.lastMeasurement.olcmeVaxti) : '—'}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-3">Ölçmə yoxdur</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Xəbərdarlıqlar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Xəbərdarlıqlar</h2>
        </div>
        <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
          {alertList.length === 0 && (
            <p className="px-5 py-8 text-sm text-gray-400 text-center">Xəbərdarlıq yoxdur</p>
          )}
          {alertList.map((alert) => (
            <div key={alert.id} className={`px-5 py-3 flex items-start gap-3 ${alert.oxundu ? 'opacity-50' : ''}`}>
              <AlertTriangle size={16} className={
                alert.seviye === 'kritik' ? 'text-red-500 mt-0.5' : 'text-amber-500 mt-0.5'
              } />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alert.mesaj}</p>
                <p className="text-xs text-gray-400">
                  {alert.cihazKod} · {alert.yaradilma ? formatDateTime(alert.yaradilma) : ''}
                </p>
              </div>
              {!alert.oxundu && (
                <button
                  onClick={() => markRead.mutate(alert.id)}
                  className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800"
                >
                  <CheckCircle size={14} /> Oxundu
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
