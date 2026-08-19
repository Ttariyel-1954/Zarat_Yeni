'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

export default function LoginPage() {
  const router   = useRouter()
  const setAuth  = useAuthStore((s) => s.setAuth)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await authApi.login({
        username: fd.get('username') as string,
        password: fd.get('password') as string,
      })
      setAuth(res.data.data.user, res.data.data.token)
      router.push('/dashboard')
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message
      setErr(msg ?? 'Giriş uğursuz oldu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">ZARAT GROUP</h1>
          <p className="text-sm text-gray-500 mt-1">Vahid İdarəetmə Sistemi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">İstifadəçi adı</label>
            <input
              name="username" type="text" required autoFocus
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifrə</label>
            <input
              name="password" type="password" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {err && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{err}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Yüklənir...' : 'Daxil ol'}
          </button>
        </form>
      </div>
    </div>
  )
}
