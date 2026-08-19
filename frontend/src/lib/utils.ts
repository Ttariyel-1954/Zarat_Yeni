import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNum(n: number, decimals = 2): string {
  return n.toLocaleString('az-AZ', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function formatDate(d: string | Date): string {
  return new Date(d).toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateTime(d: string | Date): string {
  return new Date(d).toLocaleString('az-AZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function timeAgo(d: string | Date): string {
  const diff = Date.now() - new Date(d).getTime()
  const mins  = Math.floor(diff / 60000)
  if (mins < 1)   return 'indi'
  if (mins < 60)  return `${mins} dəq əvvəl`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs} saat əvvəl`
  return `${Math.floor(hrs / 24)} gün əvvəl`
}
