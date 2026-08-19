'use client'
import { Loader2 } from 'lucide-react'

interface ChartCardProps {
  title:      string
  isLoading?: boolean
  children:   React.ReactNode
  className?: string
}

export function ChartCard({ title, isLoading, children, className }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 ${className ?? ''}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </div>
  )
}
