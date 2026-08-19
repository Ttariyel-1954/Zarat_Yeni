'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Activity, Building2, Users, Package,
  MessageSquareText, LogOut, Zap,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'

const nav = [
  { href: '/dashboard',            label: 'Panel',          icon: LayoutDashboard },
  { href: '/dashboard/telemetriya',label: 'Telemetriya',    icon: Activity },
  { href: '/dashboard/erp',        label: 'ERP',            icon: Building2 },
  { href: '/dashboard/ai',         label: 'AI Köməkçi',     icon: MessageSquareText },
]

export function Sidebar() {
  const pathname   = usePathname()
  const clearAuth  = useAuthStore((s) => s.clearAuth)
  const user       = useAuthStore((s) => s.user)
  const router     = useRouter()

  async function logout() {
    try { await authApi.logout() } catch { /* ignore */ }
    clearAuth()
    router.push('/login')
  }

  return (
    <aside className="w-60 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      <div className="px-4 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Zap className="text-blue-400" size={20} />
          <span className="font-bold text-sm tracking-wide">ZARAT GROUP</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">ERP v2.0</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href} href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800',
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-400 mb-1 truncate">{user?.fullName ?? user?.username}</p>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <LogOut size={14} /> Çıxış
        </button>
      </div>
    </aside>
  )
}
